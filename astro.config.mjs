import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import pagefind from "vite-plugin-pagefind";
import compress from "astro-compress";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  build: {
    assets: 'assets'
    // assetsPrefix: 'https://cdn.example.com' @todo this could be cool to do later
  },
  integrations: [react(), tailwind(), sitemap(), compress({
    CSS: true,
    HTML: true,
    Image: false,
    JavaScript: true,
    SVG: true
  }), markdoc(), keystatic()],
  site: 'https://hapmap.nl',
  vite: {
    plugins: [pagefind()]
  },
  adapter: node({
    mode: "standalone"
  })
});