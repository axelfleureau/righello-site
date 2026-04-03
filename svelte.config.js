import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

const isVercel = process.env.VERCEL === '1'; 

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: isVercel 
      ? adapterVercel({
          runtime: 'nodejs20.x'
        })
      : adapterNode({
          out: 'build'
        }),
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
