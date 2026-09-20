// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://shauryaverma.pages.dev',
  build: { inlineStylesheets: 'auto' },
  image: {
    // sharp is the default service; AVIF + WebP generated at build time.
    responsiveStyles: true,
  },
  vite: {
    build: { cssMinify: 'lightningcss' },
  },
});
