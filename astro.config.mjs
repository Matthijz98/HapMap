import {defineConfig} from 'astro/config';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import pagefind from "vite-plugin-pagefind";
import compress from "astro-compress";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  build: {
    assets: 'assets'
    // assetsPrefix: 'https://cdn.example.com' @todo this could be cool to do later
  },
  integrations: [react(), sitemap(), compress({
    CSS: true,
    HTML: true,
    Image: false,
    JavaScript: true,
    SVG: true
  }), markdoc(), keystatic()],
  site: 'https://hapmap.nl',
  vite: {
    plugins: [pagefind(), tailwindcss()]
  },
  adapter: node({
    mode: "standalone"
  })
});