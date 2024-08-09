import {defineConfig} from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import pagefind from "vite-plugin-pagefind";
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
    integrations: [react(), tailwind(), sitemap(), markdoc(), keystatic()],
    site: 'https://hapmap.nl',
    vite: {
        plugins: [pagefind()]
    },
    adapter: node({
        mode: "standalone"
    })
});