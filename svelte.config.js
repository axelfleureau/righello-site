import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $assets: './src/assets',
      $components: './src/components',
      $lib: './src/lib',
      $types: './src/types',
      $styles: './src/styles',
      $root: '.'
    }
  }
};

export default config;
