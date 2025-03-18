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
            filter: (page) => !page.includes('/items/') && !page.includes('/exclusives/'),
        }),
        mdx(),
        vue(),
    ],
    vite: {
        // astro-icon workaround for SSR. This works on Cloudflare but not in dev...
        resolve: {
            alias: {
                svgo: import.meta.env.PROD ? 'svgo/dist/svgo.browser.js' : undefined//'svgo',
            },
        },
    },
    markdown: {
        remarkPlugins: [remarkToc],
    },
});
