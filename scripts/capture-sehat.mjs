/** Sehat Saarthi ships no screenshots in its repository, so its case-study page
 *  was the thinnest on the site. These are captured from the live app. */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve('src/assets/shots/sehat');
mkdirSync(OUT, { recursive: true });
const URL = 'https://sehat-saarthi-punjab.vercel.app';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
const page = await ctx.newPage();

async function settle(ms = 2500) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(ms);
}

try {
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await settle(3500);
  await page.screenshot({ path: `${OUT}/home.png` });
  console.log('  ok  home');

  // First module in the list — shows the bilingual input flow.
  const link = page.locator('a, button').filter({ hasText: /ਸ਼ੁਰੂ|Start|Screen|ਜਾਂਚ/i }).first();
  if (await link.count()) {
    await link.click().catch(() => {});
    await settle(3000);
    await page.screenshot({ path: `${OUT}/module.png` });
    console.log('  ok  module');
  }
} catch (e) {
  console.log('  FAIL', e.message.split('\n')[0]);
} finally {
  await browser.close();
}
