import { fileURLToPath } from 'node:url';
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
    include: ['src/**/*.{test,spec}.{js,ts}'],
    // Fuori da SvelteKit le variabili pubbliche non esistono: i test usano un insieme vuoto.
    alias: { '$env/dynamic/public': fileURLToPath(new URL('./src/test/env-public.ts', import.meta.url)) }
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
  build: {
    rollupOptions: {
      output: {
        // I pezzi di codice sotto i ~10 kB si fondono col vicino: una richiesta in meno ciascuno
        // al primo caricamento (a pagina aperta il browser le fa tutte in parallelo, ma ognuna
        // costa intestazioni e una coda sulla rete lenta).
        experimentalMinChunkSize: 10_000
      }
    }
  },
  optimizeDeps: {
    exclude: process.env.NODE_ENV === 'development' ? ['@significa/svelte-ui'] : []
  }
});
