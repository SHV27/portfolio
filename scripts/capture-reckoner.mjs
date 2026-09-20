import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const OUT = resolve('src/assets/shots/reckoner');
mkdirSync(OUT, { recursive: true });
const URL = 'https://reckoner-ten-eta.vercel.app';

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
const p = await ctx.newPage();
await p.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(2500);

// full text so I can describe it accurately
const text = await p.evaluate(() => document.body.innerText);
writeFileSync(resolve(OUT, '_text.txt'), text);

// the acts, captured as you scroll through them
const marks = await p.evaluate(() =>
  [...document.querySelectorAll('section, article, div')]
    .filter((e) => /ACT (ONE|TWO|THREE|FOUR|FIVE)/i.test(e.innerText || '') && e.innerText.length < 4000)
    .slice(0, 6)
    .map((e, i) => { e.id = e.id || `__act${i}`; return e.id; })
);
let n = 0;
for (const id of marks) {
  const el = p.locator(`#${id}`).first();
  if (await el.count()) {
    await el.scrollIntoViewIfNeeded();
    await p.waitForTimeout(700);
    await el.screenshot({ path: `${OUT}/act-${++n}.png` }).catch(() => {});
  }
}
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(600);
await p.screenshot({ path: `${OUT}/hero.png` });
console.log('captured acts:', n);
await b.close();
