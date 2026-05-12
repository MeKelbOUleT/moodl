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
      filter: (page) => !/\/(cgv|cookies|confidentialite|mentions-legales)\/?$/.test(page),
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        const path = url.replace(SITE_URL.replace(/\/$/, ''), '') || '/';

        // Home
        if (path === '/' || path === '') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
          return item;
        }

        // Programmes (offre commerciale principale)
        if (path.startsWith('/programmes/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
          return item;
        }
        if (path === '/programmes') {
          item.priority = 0.9;
          return item;
        }

        // Lieux (modèles d'habitat)
        if (path.startsWith('/lieux/')) {
          item.priority = 0.8;
          return item;
        }
        if (path === '/lieux') {
          item.priority = 0.8;
          return item;
        }

        // Journal (content marketing)
        if (path.startsWith('/journal/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
          return item;
        }
        if (path === '/journal') {
          item.priority = 0.7;
          return item;
        }

        // Pages de conversion / outil
        if (['/simulateur', '/contact', '/investir'].includes(path)) {
          item.priority = 0.8;
          return item;
        }

        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory',
  },
});
