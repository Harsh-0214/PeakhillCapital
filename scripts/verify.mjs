/**
 * Batched verification pass.
 *
 * One run covers every route at three viewports and reports everything at once,
 * so fixes can be applied in a single batch rather than discovered one at a
 * time. It checks:
 *
 *   1. HTTP status of every route (including that /nonexistent really 404s)
 *   2. Horizontal overflow — scrollWidth must not exceed clientWidth
 *   3. axe-core accessibility violations (serious and critical)
 *   4. Internal link integrity — every href on the site must resolve
 *   5. Console errors and failed network requests
 *   6. Screenshots for visual review
 *
 * Usage: node scripts/verify.mjs [baseUrl]
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

const BASE = process.argv[2] || 'http://localhost:3211';
const SHOT_DIR = path.join(process.cwd(), 'verification', 'screenshots');

const ROUTES = [
  '/',
  '/about',
  '/investments',
  '/investments/income-opportunity',
  '/investments/opportunity-reit',
  '/investments/equity-partners',
  '/financing',
  '/financing/cmhc',
  '/financing/conventional',
  '/financing/bridge',
  '/financing/us-strategies',
  '/team',
  '/insights',
  '/insights/why-bridge-to-cmhc-exists',
  '/careers',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
  '/legal/disclosures',
];

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2 },
  { name: 'tablet', width: 768, height: 1024, deviceScaleFactor: 1 },
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
];

const findings = {
  overflow: [],
  a11y: [],
  console: [],
  network: [],
  status: [],
  links: [],
};

const discoveredLinks = new Set();

async function main() {
  await mkdir(SHOT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.deviceScaleFactor,
      // Keep the reveal animations out of the screenshots so a shot taken
      // mid-transition doesn't read as a rendering bug.
      reducedMotion: 'reduce',
    });

    const page = await context.newPage();

    page.on('console', (message) => {
      if (message.type() === 'error') {
        findings.console.push(`[${viewport.name}] ${page.url()} :: ${message.text()}`);
      }
    });
    page.on('requestfailed', (request) => {
      const failure = request.failure()?.errorText ?? 'unknown';
      // Aborted prefetches are normal navigation noise, not a defect.
      if (failure.includes('ERR_ABORTED')) return;
      findings.network.push(`[${viewport.name}] ${request.url()} :: ${failure}`);
    });

    for (const route of ROUTES) {
      const url = `${BASE}${route}`;
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });

      const status = response?.status() ?? 0;
      if (status !== 200) {
        findings.status.push(`[${viewport.name}] ${route} returned ${status}`);
      }

      // --- Horizontal overflow ---------------------------------------------
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        const overflowing = [];
        if (doc.scrollWidth > doc.clientWidth + 1) {
          // Identify the specific culprits, not just that the page is wide.
          for (const el of document.querySelectorAll('*')) {
            const rect = el.getBoundingClientRect();
            if (rect.right > doc.clientWidth + 1 && rect.width > 0) {
              const id = `${el.tagName.toLowerCase()}${
                el.className && typeof el.className === 'string'
                  ? `.${el.className.split(/\s+/).slice(0, 3).join('.')}`
                  : ''
              }`;
              overflowing.push(`${id} (right: ${Math.round(rect.right)})`);
            }
          }
        }
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          culprits: overflowing.slice(0, 5),
        };
      });

      if (overflow.scrollWidth > overflow.clientWidth + 1) {
        findings.overflow.push(
          `[${viewport.name}] ${route} :: ${overflow.scrollWidth} > ${overflow.clientWidth} :: ${overflow.culprits.join(' | ')}`
        );
      }

      // --- Accessibility ----------------------------------------------------
      await page.addScriptTag({ path: axePath });
      const axeResults = await page.evaluate(async () => {
        // @ts-expect-error injected at runtime
        return await window.axe.run(document, {
          resultTypes: ['violations'],
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
        });
      });

      for (const violation of axeResults.violations) {
        if (violation.impact === 'serious' || violation.impact === 'critical') {
          findings.a11y.push(
            `[${viewport.name}] ${route} :: ${violation.id} (${violation.impact}) :: ${violation.help} :: ${violation.nodes
              .slice(0, 2)
              .map((n) => n.target.join(' '))
              .join(' | ')}`
          );
        }
      }

      // --- Collect internal links (desktop pass only) -----------------------
      if (viewport.name === 'desktop') {
        const hrefs = await page.evaluate(() =>
          Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href'))
        );
        for (const href of hrefs) {
          if (href && href.startsWith('/')) discoveredLinks.add(href.split('#')[0]);
        }

        await page.screenshot({
          path: path.join(SHOT_DIR, `${routeSlug(route)}--desktop.png`),
          fullPage: true,
        });
      }

      if (viewport.name === 'mobile') {
        await page.screenshot({
          path: path.join(SHOT_DIR, `${routeSlug(route)}--mobile.png`),
          fullPage: true,
        });
      }
    }

    await context.close();
  }

  // --- Link integrity -------------------------------------------------------
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const link of discoveredLinks) {
    if (!link) continue;
    const response = await page.goto(`${BASE}${link}`, { waitUntil: 'commit', timeout: 30_000 });
    const status = response?.status() ?? 0;
    if (status >= 400) findings.links.push(`${link} -> ${status}`);
  }

  // --- 404 must actually 404 ------------------------------------------------
  const notFound = await page.goto(`${BASE}/this-route-does-not-exist`, { waitUntil: 'commit' });
  if (notFound?.status() !== 404) {
    findings.status.push(`/this-route-does-not-exist returned ${notFound?.status()} — expected 404`);
  }

  await context.close();
  await browser.close();

  report();
}

function routeSlug(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
}

function report() {
  const lines = [];
  let total = 0;

  for (const [category, items] of Object.entries(findings)) {
    const unique = [...new Set(items)];
    total += unique.length;
    lines.push(`\n### ${category.toUpperCase()} — ${unique.length}`);
    if (unique.length === 0) {
      lines.push('  clean');
    } else {
      for (const item of unique.slice(0, 40)) lines.push(`  - ${item}`);
      if (unique.length > 40) lines.push(`  … and ${unique.length - 40} more`);
    }
  }

  const output = lines.join('\n');
  console.log(output);
  console.log(`\n=== TOTAL FINDINGS: ${total} ===`);
  console.log(`Screenshots: ${path.relative(process.cwd(), SHOT_DIR)}`);

  writeFile(path.join(process.cwd(), 'verification', 'report.txt'), output).catch(() => {});

  if (total > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
