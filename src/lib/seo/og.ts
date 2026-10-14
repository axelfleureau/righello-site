import { OG_SIZE, OG_VERSION, SITE_URL } from '$lib/data/site';

/** `/servizi/web` -> `servizi-web`; la home e' `home`. Nome del file in `static/og/`. */
export const ogKey = (path: string) => (path === '/' ? 'home' : path.slice(1).replace(/\//g, '-'));

/** Indirizzo dell'immagine di condivisione di una pagina (le immagini si disegnano con `scripts/og-images.ts`). */
export const ogImageUrl = (path: string) => `${SITE_URL}/og/${ogKey(path)}.jpg?v=${OG_VERSION}`;

export { OG_SIZE };
