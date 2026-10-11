import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		paths: {
			// GitHub Pages serves this repo under /<repo-name>; the deploy workflow sets BASE_PATH.
			base: process.env.BASE_PATH ?? ''
		}
	}
};

export default config;
