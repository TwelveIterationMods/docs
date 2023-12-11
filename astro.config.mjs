import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://mods.twelveiterations.com',
  integrations: [tailwind(), sitemap({
    filter: (page) => !page.includes('/items/')
  }), mdx(), vue()],
  markdown: {
    remarkPlugins: [remarkToc],
  }
});