import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config';

// site alimenta canonical, og:url y sitemap.xml. Al comprar el dominio propio
// solo cambia SITE_URL en src/config.ts; aqui no hay nada que tocar.
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  // Sin este target el minificador reescribe las media queries a sintaxis de
  // rango (width<=760px), que Safari solo entiende desde 16.4. En iOS 15 eso
  // desactivaria el menu movil y volveria el desbordamiento del header.
  vite: {
    build: {
      cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
    },
  },
});
