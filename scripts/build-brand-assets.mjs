/**
 * Derive the site's brand assets from the client-supplied logo PNGs.
 *
 * The supplied files are flat navy artwork on a flat white background with no
 * alpha channel, so they cannot be placed on a coloured surface as-is. Rather
 * than hand-tracing the mark — which risks shipping a logo that is subtly wrong
 * — this extracts an alpha MASK from the artwork's luminance and re-tints it.
 * The geometry stays exactly as the client drew it; only the colour changes.
 *
 *   alpha = 255 - luminance
 *
 * White background -> luminance 255 -> alpha 0 (transparent).
 * Navy artwork     -> luminance ~30 -> alpha ~225 (opaque).
 * Antialiased edges land in between, which is what keeps them smooth.
 *
 * Run: node scripts/build-brand-assets.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_BRAND = path.join(ROOT, 'public', 'brand');
const OUT_PUBLIC = path.join(ROOT, 'public');

const NAVY = { r: 0x0a, g: 0x1b, b: 0x39 };
const PAPER = { r: 0xf4, g: 0xf2, b: 0xed };

/** Anything this faint is background noise, not artwork. */
const ALPHA_FLOOR = 6;

/**
 * Read a logo PNG and return an RGBA buffer tinted to `colour`, with alpha
 * taken from the inverse luminance of the source artwork.
 */
async function tintFromLuminance(sourcePath, colour, { invert = false } = {}) {
  const image = sharp(sourcePath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i += 1) {
    const o = i * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const sourceAlpha = channels === 4 ? data[o + 3] : 255;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Logo1/Logo2 are dark artwork on white, so alpha is the inverse of
    // luminance. Logo3 is white artwork on navy, so it is luminance directly,
    // rescaled so the navy ground lands at zero rather than at ~25.
    let alpha;
    if (invert) {
      const GROUND = 40; // anything at or below the navy ground is background
      alpha = Math.round(((luminance - GROUND) / (255 - GROUND)) * 255);
      if (alpha < 0) alpha = 0;
      if (alpha > 255) alpha = 255;
    } else {
      alpha = Math.round(255 - luminance);
    }
    if (alpha < ALPHA_FLOOR) alpha = 0;

    // Respect any alpha the source already had.
    alpha = Math.round((alpha * sourceAlpha) / 255);

    const p = i * 4;
    out[p] = colour.r;
    out[p + 1] = colour.g;
    out[p + 2] = colour.b;
    out[p + 3] = alpha;
  }

  return { buffer: out, width, height };
}

/**
 * Tint, crop away the transparent margin, and resize to a target width.
 * Trimming matters: the supplied files carry a lot of dead space, and without
 * removing it the logo renders tiny inside its own bounding box.
 */
async function buildLogo({ source, colour, targetWidth, outFile, padRatio = 0.02, invert = false }) {
  const { buffer, width, height } = await tintFromLuminance(source, colour, { invert });

  // Trim to the artwork's true bounding box, then give it back a little
  // transparent breathing room. A pixel-exact crop reads as a clipped logo —
  // the terminal of the final "L" and the mark's baseline sit flush against
  // the edge — and it leaves no optical margin to align against.
  const trimmed = await sharp(buffer, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 })
    .toBuffer({ resolveWithObject: true });

  const pad = Math.max(2, Math.round(trimmed.info.width * padRatio));

  // The pipeline was fed raw pixels, so it hands raw pixels back — the
  // dimensions have to be restated for the second pass.
  await sharp(trimmed.data, {
    raw: {
      width: trimmed.info.width,
      height: trimmed.info.height,
      channels: trimmed.info.channels,
    },
  })
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize({ width: targetWidth, fit: 'inside', withoutEnlargement: false })
    .png({ compressionLevel: 9, palette: false })
    .toFile(outFile);

  const meta = await sharp(outFile).metadata();
  console.log(`  ${path.relative(ROOT, outFile)}  ${meta.width}×${meta.height}`);
}

async function main() {
  await mkdir(OUT_BRAND, { recursive: true });

  const markSource = path.join(ROOT, 'Peakhill-Capital-Logo1.png');
  const lockupSource = path.join(ROOT, 'Peakhill-Capital-Logo2.png');

  console.log('Building brand assets from client-supplied artwork…');

  // The mark alone — header on mobile, favicon, monogram cards, OG plates.
  await buildLogo({
    source: markSource,
    colour: NAVY,
    targetWidth: 512,
    outFile: path.join(OUT_BRAND, 'mark-navy.png'),
  });
  await buildLogo({
    source: markSource,
    colour: PAPER,
    targetWidth: 512,
    outFile: path.join(OUT_BRAND, 'mark-paper.png'),
  });

  // The horizontal lockup — header on desktop, footer.
  await buildLogo({
    source: lockupSource,
    colour: NAVY,
    targetWidth: 1200,
    outFile: path.join(OUT_BRAND, 'lockup-navy.png'),
  });
  await buildLogo({
    source: lockupSource,
    colour: PAPER,
    targetWidth: 1200,
    outFile: path.join(OUT_BRAND, 'lockup-paper.png'),
  });

  // The full lockup, PEAKHILL over CAPITAL. Only Logo3 carries the descriptor,
  // and it is white artwork on navy — hence the inverted mask.
  const fullLockupSource = path.join(ROOT, 'Peakhill-Capital-Logo3.png');
  await buildLogo({
    source: fullLockupSource,
    colour: NAVY,
    targetWidth: 1400,
    outFile: path.join(OUT_BRAND, 'lockup-full-navy.png'),
    invert: true,
  });
  await buildLogo({
    source: fullLockupSource,
    colour: PAPER,
    targetWidth: 1400,
    outFile: path.join(OUT_BRAND, 'lockup-full-paper.png'),
    invert: true,
  });

  // --- Favicons -------------------------------------------------------------
  // Apple touch icons must be opaque, so the paper mark is set on navy with
  // breathing room around it (iOS crops to a rounded rect).
  const markPaper = await sharp(path.join(OUT_BRAND, 'mark-paper.png'))
    .resize({ width: 120, height: 120, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: { width: 180, height: 180, channels: 4, background: { ...NAVY, alpha: 1 } },
  })
    .composite([{ input: markPaper, gravity: 'center' }])
    .png()
    .toFile(path.join(OUT_PUBLIC, 'apple-icon.png'));
  console.log('  public/apple-icon.png  180×180');

  // A 32px PNG served as favicon.ico. Browsers sniff the content type, and a
  // PNG in an .ico slot has been universally supported for well over a decade.
  await sharp(path.join(OUT_BRAND, 'mark-navy.png'))
    .resize({ width: 32, height: 32, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT_PUBLIC, 'favicon.ico'));
  console.log('  public/favicon.ico  32×32');

  await sharp(path.join(OUT_BRAND, 'mark-navy.png'))
    .resize({ width: 192, height: 192, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT_PUBLIC, 'icon-192.png'));

  await sharp(path.join(OUT_BRAND, 'mark-navy.png'))
    .resize({ width: 512, height: 512, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT_PUBLIC, 'icon-512.png'));
  console.log('  public/icon-192.png, public/icon-512.png');

  const manifest = {
    name: 'Peakhill Capital',
    short_name: 'Peakhill',
    description:
      'Commercial real estate credit and equity investments across North America.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F2ED',
    theme_color: '#0A1B39',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
  await writeFile(
    path.join(OUT_PUBLIC, 'site.webmanifest'),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  console.log('  public/site.webmanifest');

  console.log('Done.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
