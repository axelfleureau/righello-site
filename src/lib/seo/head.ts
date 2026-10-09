/**
 * Valori di partenza del <head> e modo di toglierli quando una pagina dichiara i propri.
 *
 * Il layout dichiara descrizione, immagine di condivisione, indirizzo canonico... e ogni
 * pagina puo' dichiarare i suoi nel proprio <svelte:head>. Svelte li accoda entrambi: il
 * motore di ricerca troverebbe due descrizioni e il generico (che viene prima) potrebbe
 * vincere su quello della pagina. Le etichette di partenza portano l'attributo
 * `data-seo-default`; se la pagina ne dichiara una con la stessa chiave, quella di
 * partenza sparisce:
 *  - sul server `hooks.server.ts` la toglie dal HTML (lo leggono i motori di ricerca e le
 *    anteprime dei social, che non eseguono la pagina);
 *  - nel browser il layout la ritira da se' (`overriddenKeys`), cosi' anche dopo
 *    l'idratazione e a ogni cambio di pagina il documento ha una sola etichetta per chiave.
 * Nessuna pagina deve sapere dei valori di partenza.
 */

export const DEFAULT_ATTR = 'data-seo-default';

/** Chiave dell'etichetta: `description`, `og:image`, `canonical`... oppure null se non ci interessa. */
export function headTagKey(attr: (name: string) => string | null | undefined, tagName: string): string | null {
  if (tagName === 'link') return attr('rel') === 'canonical' ? 'canonical' : null;
  return attr('name') ?? attr('property') ?? null;
}

/** Chiavi che il layout dichiara di partenza (l'elenco serve a non toccare nient'altro). */
export const DEFAULTABLE_KEYS = [
  'description',
  'canonical',
  'og:url',
  'og:image',
  'og:type',
  'og:locale',
  'twitter:card',
  'twitter:image',
] as const;

const TAG = /<(meta|link)\b[^>]*>/g;
const attrOf = (tag: string) => (name: string) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? null;

/** Dal testo del HTML: toglie le etichette di partenza che la pagina ha gia' dichiarato. */
export function dropOverriddenDefaults(headHtml: string): string {
  const declared = new Set<string>();
  const defaults: { tag: string; key: string }[] = [];
  for (const match of headHtml.matchAll(TAG)) {
    const tag = match[0];
    const key = headTagKey(attrOf(tag), match[1]);
    if (!key) continue;
    if (tag.includes(DEFAULT_ATTR)) defaults.push({ tag, key });
    else declared.add(key);
  }
  let out = headHtml;
  for (const { tag, key } of defaults) if (declared.has(key)) out = out.replace(tag, '');
  return out;
}

/** Dal documento nel browser: le chiavi che la pagina corrente dichiara da se'. */
export function overriddenKeys(head: HTMLHeadElement): Set<string> {
  const keys = new Set<string>();
  for (const el of head.querySelectorAll('meta, link[rel="canonical"]')) {
    if (el.hasAttribute(DEFAULT_ATTR)) continue;
    const key = headTagKey((n) => el.getAttribute(n), el.tagName.toLowerCase());
    if (key) keys.add(key);
  }
  return keys;
}
