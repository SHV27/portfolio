/**
 * Capture clean, well-composed screenshots of the live apps.
 *
 * Why not just use what is already in the repositories: several of those are
 * 2880×9962 full-page captures that have to be shrunk to illegibility, and a
 * few show superseded versions of the interface. These are fresh, current,
 * captured at a sensible viewport, with the page actually settled first.
 *
 * Run: node scripts/capture.mjs
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve('src/assets/shots/live');
mkdirSync(OUT, { recursive: true });

const VP = { width: 1440, height: 900 };

/** Let fonts, images and any entrance animation settle before shooting. */
async function settle(page, ms = 2200) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(ms);
}

const SHOTS = [
  {
    name: 'aaina-landing',
    url: 'https://aaina-two.vercel.app/',
    act: async (p) => { await settle(p); },
  },
  {
    name: 'aaina-science',
    url: 'https://aaina-two.vercel.app/',
    act: async (p) => {
      await settle(p, 1200);
      const link = p.getByRole('link', { name: /the science/i }).first();
      if (await link.count()) { await link.click(); await settle(p, 1800); }
    },
  },
  {
    name: 'braillix-board',
    url: 'https://braillix.vercel.app/',
    act: async (p) => {
      await settle(p, 3000);
      // Dismiss the update banner if it is showing, so the shot is clean.
      const use = p.getByRole('button', { name: /use it now/i }).first();
      if (await use.count()) { await use.click().catch(() => {}); await settle(p, 2500); }
    },
  },
  {
    name: 'gloaming-title',
    url: 'https://gloaming-murex.vercel.app/',
    act: async (p) => { await settle(p, 2600); },
  },
  {
    name: 'gloaming-board',
    url: 'https://gloaming-murex.vercel.app/',
    act: async (p) => {
      await settle(p, 1800);
      await p.mouse.click(720, 500);          // skip the title card
      await settle(p, 2200);
      for (const rx of [/begin/i, /start/i, /play/i, /new game/i, /continue/i]) {
        const b = p.getByRole('button', { name: rx }).first();
        if (await b.count()) { await b.click().catch(() => {}); await settle(p, 2000); break; }
      }
    },
  },
  {
    name: 'sifarish-gate',
    url: 'https://sifarish-shv-s-projects.vercel.app/',
    act: async (p) => { await settle(p, 1800); },
  },
  {
    name: 'sifarish-desk',
    url: 'https://sifarish-shv-s-projects.vercel.app/',
    act: async (p) => {
      await settle(p, 1500);
      const demo = p.getByRole('button', { name: /show me the demo/i }).first();
      if (await demo.count()) { await demo.click(); await settle(p, 3000); }
    },
  },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: VP,
  deviceScaleFactor: 2,                 // retina — these get downscaled on the page
  colorScheme: 'dark',
  reducedMotion: 'reduce',              // no half-finished transitions in the frame
});

for (const s of SHOTS) {
  const page = await ctx.newPage();
  try {
    await page.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await s.act(page);
    await page.screenshot({ path: `${OUT}/${s.name}.png` });
    console.log(`  ok   ${s.name}`);
  } catch (e) {
    console.log(`  FAIL ${s.name} — ${e.message.split('\n')[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('done ->', OUT);
