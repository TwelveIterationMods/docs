import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    site: 'https://mods.twelveiterations.com',
    output: 'hybrid',
    adapter: cloudflare(),
    integrations: [
        tailwind(),
        sitemap({
            filter: (page) => !page.includes('/items/'),
        }),
        mdx(),
        vue(),
    ],
    vite: {
        resolve: {
            alias: {
                // workaround for svgo SSR issue in astro-icons
                svgo: import.meta.env.PROD ? 'svgo/dist/svgo.browser.js' : 'svgo',
            },
        },
    },
    markdown: {
        remarkPlugins: [remarkToc],
    },
});
