import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import 'dotenv/config';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown
			pages: 'docs',
			assets: 'docs',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: '/rollup-plugin-wit-component'
		},
		// add aliases via svelte.config.js (not vite.config.js or tsconfig.json), so that they are processed by svelte-package
		alias: {
			'rollup-plugin-wit-component': 'src/lib/index.js'
		}
	},
  preprocess: [vitePreprocess()]
};

export default config;
