// @ts-check
import {defineConfig} from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const SITE_URL = process.env.SITE_URL || 'https://moodl.fr';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: vercel({
    webAnalytics: {enabled: true},
    imageService: true,
  }),
  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory',
  },
});
