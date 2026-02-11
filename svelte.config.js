import adapter from '@sveltejs/adapter-static';
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte';
import persist from "@macfja/svelte-persistent-runes/preprocessor"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [vitePreprocess(), persist()],
    kit: {adapter: adapter({
				fallback: 'index.html'
			})}
};

export default config;
