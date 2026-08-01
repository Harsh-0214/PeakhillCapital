/**
 * Generate the site's large SVG artwork as static files under /public/art.
 *
 * WHY THIS IS A BUILD STEP AND NOT A COMPONENT
 * -------------------------------------------
 * The contour field is ~22 paths of a few thousand characters each. Rendered
 * as an inline SVG inside a React Server Component it appears TWICE in every
 * response — once in the HTML and again, escaped, in the RSC flight payload
 * that streams down for hydration. Measured at ~130KB of duplicated path data
 * on the home page alone, none of which is cacheable independently.
 *
 * Emitting it as a file instead makes it a single cacheable asset referenced by
 * a plain <img>. The HTML shrinks by two thirds, the browser caches the artwork
 * across navigations, and an SVG in an <img> tag cannot execute script — so it
 * needs nothing more than `img-src 'self'`.
 *
 * The maths is identical to the original component. Deterministic, no seed.
 *
 * Run: node scripts/build-art.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.join(process.cwd(), 'public', 'art');

const VIEW_W = 1440;
const VIEW_H = 900;

/** Peak position, in viewBox units. Off-centre so it does not read as a target. */
const PEAK_X = 980;
const PEAK_Y = 470;

const RING_COUNT = 22;
const POINTS_PER_RING = 200;

const BRASS = '#C4A052';

/**
 * Shape of the landform.
 *
 * The perturbation is MULTIPLICATIVE and uses identical coefficients at every
 * elevation, which is what guarantees the contours nest and never cross — each
 * ring is the same shape scaled up, not an independently noisy curve.
 */
function radialShape(theta) {
  return (
    1 +
    0.2 * Math.sin(3 * theta + 1.15) +
    0.115 * Math.sin(5 * theta + 2.34) +
    0.062 * Math.sin(7 * theta + 0.42) +
    0.03 * Math.sin(11 * theta + 4.1)
  );
}

function contourPath(ring) {
  const t = (ring + 1) / RING_COUNT;
  // Super-linear growth crowds the rings near the summit and spreads them
  // across the plain, which is how contour intervals behave on steep ground.
  const radius = 26 + Math.pow(t, 1.42) * 1180;

  const points = [];
  for (let i = 0; i <= POINTS_PER_RING; i += 1) {
    const theta = (i / POINTS_PER_RING) * Math.PI * 2;
    const r = radius * radialShape(theta);
    const x = PEAK_X + Math.cos(theta) * r;
    // Flattened vertically — a plan view read at an oblique angle.
    const y = PEAK_Y + Math.sin(theta) * r * 0.545;
    points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  return `M${points.join('L')}Z`;
}

/** Survey ticks. Fixed positions — decoration, not data. */
const TICKS = [
  [188, 214],
  [352, 640],
  [640, 168],
  [214, 792],
  [1256, 232],
  [1330, 726],
];

function buildContourField({ lineColour }) {
  const rings = [];
  for (let ring = 0; ring < RING_COUNT; ring += 1) {
    // Every fifth ring is an "index contour" — heavier and brass, exactly as
    // it would be on a real survey sheet.
    const isIndex = ring % 5 === 4;
    rings.push(
      `<path d="${contourPath(ring)}" stroke="${isIndex ? BRASS : lineColour}" ` +
        `stroke-width="${isIndex ? 1.15 : 0.85}" opacity="${isIndex ? 0.42 : 0.17}"/>`
    );
  }

  const ticks = TICKS.map(
    ([x, y]) =>
      `<line x1="${x - 7}" y1="${y}" x2="${x + 7}" y2="${y}"/>` +
      `<line x1="${x}" y1="${y - 7}" x2="${x}" y2="${y + 7}"/>`
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" preserveAspectRatio="xMidYMid slice" role="presentation">
<defs>
<linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
<stop offset="0%" stop-color="#fff" stop-opacity="0"/>
<stop offset="26%" stop-color="#fff" stop-opacity="0.25"/>
<stop offset="62%" stop-color="#fff" stop-opacity="0.9"/>
<stop offset="100%" stop-color="#fff" stop-opacity="1"/>
</linearGradient>
<mask id="m"><rect width="${VIEW_W}" height="${VIEW_H}" fill="url(#fade)"/></mask>
</defs>
<g mask="url(#m)">
<g fill="none" stroke-linejoin="round">${rings.join('')}</g>
<g stroke="${lineColour}" stroke-width="0.9" opacity="0.24">${ticks}</g>
<g opacity="0.6" stroke="${BRASS}" stroke-width="1.3">
<line x1="${PEAK_X - 11}" y1="${PEAK_Y}" x2="${PEAK_X + 11}" y2="${PEAK_Y}"/>
<line x1="${PEAK_X}" y1="${PEAK_Y - 11}" x2="${PEAK_X}" y2="${PEAK_Y + 11}"/>
</g>
</g>
</svg>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const variants = [
    { name: 'contour-field-navy.svg', lineColour: '#FFFFFF' },
    { name: 'contour-field-paper.svg', lineColour: '#0A1B39' },
  ];

  for (const variant of variants) {
    const svg = buildContourField({ lineColour: variant.lineColour });
    const file = path.join(OUT_DIR, variant.name);
    await writeFile(file, svg);
    console.log(`  public/art/${variant.name}  ${(svg.length / 1024).toFixed(1)} KB`);
  }

  console.log('Done.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
