# Portfolio

My personal site. Every number on it opens to the code that produced it.

**Live:** _(deploying — link goes here)_

---

## Why it is built this way

The site makes one argument: that I build systems which cannot lie. It would be strange to make that argument on
a page full of unverifiable claims, so the page follows the same rule as the projects it describes — every
figure and every capability statement carries a receipt linking to the exact file and line in the repository
that proves it. An uncited claim does not type-check as publishable.

## Stack

| | |
|---|---|
| Framework | Astro 7 — **zero client framework**, no React |
| JavaScript shipped | Three small inline modules: scroll reveal, starfield parallax, and the black hole |
| Styling | Plain CSS with a single token source (`src/styles/tokens.css`) |
| Images | Astro's build-time pipeline via sharp — AVIF with WebP fallback, responsive `srcset` |
| Type | Self-hosted variable fonts, latin subset preloaded |
| Build | `npm run build` → static files |

React was deliberately removed. The content is fixed, so reconciliation buys nothing, and measuring it showed a
single `client:load` island costing ~66 KB gzipped for no functional gain.

## Notable pieces

- **`src/components/BlackHole.astro`** — an interactive black hole on a 2D canvas. Star positions are displaced
  by a 1/r deflection law, so the Einstein ring emerges from the maths rather than being drawn. Pauses when
  scrolled out of view, keyboard operable, renders one static frame under `prefers-reduced-motion`.
- **`src/components/Cosmos.astro`** — three star layers at three depths, translated at different rates on
  scroll. Generated with layered radial-gradients: zero network bytes, and it stays sharp at any zoom.
- **`src/components/Receipt.astro`** — the evidence affordance. Built on `<details>`, so it works with
  JavaScript disabled and is keyboard-operable and screen-reader-announced by default.
- **`src/content/types.ts`** — the claim model, with a build gate that refuses to publish an uncited claim.

## Running it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
```

Node 22.12 or newer.

## Credits

Deep-field imagery courtesy of **ESA/Hubble** and **ESA/Webb**, used under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Each plate carries its full credit line visibly on
the page, as the licence requires:

- Rho Ophiuchi cloud complex — NASA, ESA, CSA, STScI, K. Pontoppidan (STScI), A. Pagan (STScI)
- The Pillars of Creation — NASA, ESA and the Hubble Heritage Team (STScI/AURA)
- Westerlund 2 — NASA, ESA, the Hubble Heritage Team (STScI/AURA), A. Nota (ESA/STScI) and the Westerlund 2 Science Team
- The Horsehead Nebula — NASA, ESA and the Hubble Heritage Team (STScI/AURA)

Typefaces: Bodoni Moda, Schibsted Grotesk, JetBrains Mono and Tiro Devanagari Hindi, all under the SIL Open Font
License 1.1.

Reference images in `src/assets/aura/` are third-party film and television stills used as personal reference
material on a personal site.

---

**Shaurya Verma** · [github.com/SHV27](https://github.com/SHV27) ·
[LinkedIn](https://www.linkedin.com/in/shaurya-verma-94a607329/) · shaurya.verma2705@gmail.com
