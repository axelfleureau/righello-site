import { loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert';

const env = loadEnv('development', process.cwd()); 
const HTTPS_ENABLED = env.VITE_HTTPS_ENABLED === 'true';
const extraPlugins = HTTPS_ENABLED ? [mkcert()] : [];

export default defineConfig({
  plugins: [
    sveltekit(),
    ...extraPlugins
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  server: {
    https: HTTPS_ENABLED,
    host: '0.0.0.0',
    port: 5000,
    hmr: {
      clientPort: 443
    },
    fs: {
      allow: process.env.NODE_ENV === 'development' ? ['/'] : undefined
    }
  },
  optimizeDeps: {
    exclude: process.env.NODE_ENV === 'development' ? ['@significa/svelte-ui'] : []
  }
});
