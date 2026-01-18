import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-static is used along with the 'prerender' export in routes/layout.ts
		// to generate only the static "map" pages as before.
		adapter: adapter({
			fallback: '404.html',
		}),

		// Using 'inline' to include all styling and javascript in the final
		// html files (this is equivalent to Darren's vanilla javascript implementation).
		output: {
			bundleStrategy: 'inline',
		}
		
	}
};

export default config;
