import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";
import {pagefind} from "vite-plugin-pagefind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), sitemap()],
  site: 'https://hapmap.nl',
  vite: {
    plugins: [
      pagefind(),
        ],
    },
});