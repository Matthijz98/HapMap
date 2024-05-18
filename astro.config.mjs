import {defineConfig} from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import {pagefind} from "vite-plugin-pagefind";
import compress from "astro-compress";

import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
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
    }), compressor({
        fileExtensions: [".css", ".js", ".html", ".xml", ".cjs", ".mjs", ".svg", ".txt", ".json", ".png"],
        gzip: true,
        brotli: false
    }),],
    site: 'https://hapmap.nl',
    vite: {
        plugins: [pagefind()]
    }
});