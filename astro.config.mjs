// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://pasamelo.es',
	output: 'static',
	build: {
		format: 'directory',
	},
});