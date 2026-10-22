#!/usr/bin/env node
/**
 * Controlli sul percorso di contatto: se uno fallisce, un pulsante rischia di portare a un caricamento
 * di pagina invece del foglio, o un recapito di divergere dall'unica sorgente.
 *
 *  (a) nessun pulsante verso /contatti sfugge all'intercettazione (che sta nel layout) senza dichiararlo
 *      con `data-contact-link="page"`: niente `target`, `data-sveltekit-reload`, `rel="external"`,
 *      `goto('/contatti')`, `location = '/contatti'`, `window.open('/contatti')`, `<form action="/contatti">`;
 *  (b) `contactHref()` e' l'unico costruttore di indirizzi di contatto: nessun `/contatti` scritto a mano
 *      nei componenti (solo nei file che lo dichiarano per mestiere);
 *  (c) nessun recapito scritto a mano (email, WhatsApp, telefono) fuori da `contact.ts` e `site.ts`.
 *
 * Uso: node scripts/check-contact-ctas.mjs   (esce con codice 1 se trova qualcosa)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(src)
  .filter((f) => /\.(svelte|ts|js)$/.test(f) && !/\.test\.(ts|js)$/.test(f))
  .map((f) => ({ path: relative(root, f), text: readFileSync(f, 'utf8') }));

const problems = [];
const fail = (check, file, line, msg) => problems.push(`(${check}) ${file}:${line}  ${msg}`);
const lineOf = (text, index) => text.slice(0, index).split('\n').length;

/* ───────── (a) pulsanti che sfuggono all'intercettazione ───────── */
const CONTACT_TARGET = String.raw`(?:['"\`]\/contatti[^'"\`]*['"\`]|contactHref\(|NAV_CTA)`;
for (const f of files) {
  if (f.path.startsWith('src/lib/server/')) continue;
  // un tag con href verso /contatti, e dentro lo stesso tag un attributo che vieta l'intercettazione
  for (const m of f.text.matchAll(/<(?:a|ProButton|MagneticButton)\b[^>]*?>/gs)) {
    const tag = m[0];
    if (!new RegExp(String.raw`href=(?:"\/contatti[^"]*"|\{[^}]*(?:contactHref\(|NAV_CTA)[^}]*\})`).test(tag)) continue;
    if (/data-contact-link=/.test(tag)) continue;
    const bad = tag.match(/\btarget=["'{](?!_self)|data-sveltekit-reload|rel=["']external|\bdownload\b/);
    if (bad) fail('a', f.path, lineOf(f.text, m.index), `link verso /contatti che non si lascia intercettare (${bad[0].trim()}): aggiungi data-contact-link="page" se deve portare alla pagina`);
  }
  const calls = new RegExp(String.raw`(?:goto\(|location(?:\.href)?\s*=|location\.(?:assign|replace)\(|window\.open\()\s*${CONTACT_TARGET}`, 'g');
  for (const m of f.text.matchAll(calls)) fail('a', f.path, lineOf(f.text, m.index), 'navigazione in codice verso /contatti: usa openContactSheet() o un link');
  for (const m of f.text.matchAll(/<form\b[^>]*action=["']\/contatti/g)) fail('a', f.path, lineOf(f.text, m.index), 'un form con action=/contatti ricarica la pagina');
}
// l'intercettazione deve davvero essere montata
const layout = files.find((f) => f.path === 'src/routes/+layout.svelte');
const host = files.find((f) => f.path === 'src/lib/components/contact/ContactHost.svelte');
if (!layout?.text.includes('<ContactHost')) fail('a', 'src/routes/+layout.svelte', 1, 'il layout non monta <ContactHost />: nessun link aprirebbe il foglio');
if (!host?.text.includes('installContactInterception(')) fail('a', 'src/lib/components/contact/ContactHost.svelte', 1, "manca installContactInterception(): l'ascoltatore dei clic non parte");

/* ───────── (b) un solo costruttore di indirizzi di contatto ───────── */
const PATH_OWNERS = [
  /^src\/lib\/data\/(contact|site)\.ts$/, // dove si dichiarano
  /^src\/lib\/seo\//, // mappa del sito, dati strutturati, testo piano: indirizzi canonici
  /^src\/lib\/contact\/(intercept|headCss)\.ts$/, // riconoscono l'indirizzo (l'apertura dei link; la pagina che ha il modulo gia' sul server)
  /^src\/lib\/components\/contact\/ContactBar\.svelte$/, // sa di non comparire su /contatti
  /^src\/routes\/contatti\//, // la pagina stessa
  /^src\/lib\/server\//,
];
for (const f of files) {
  if (PATH_OWNERS.some((r) => r.test(f.path))) continue;
  for (const m of f.text.matchAll(/['"`]\/contatti[^'"`]*['"`]|`\/contatti/g)) {
    fail('b', f.path, lineOf(f.text, m.index), `indirizzo di contatto scritto a mano (${m[0]}): usa contactHref()`);
  }
}

/* ───────── (c) recapiti scritti a mano ───────── */
const CONTACT_OWNERS = [/^src\/lib\/data\/(contact|site)\.ts$/, /^src\/lib\/server\//, /^src\/routes\/.*\+server\.ts$/, /^src\/test\//];
// esempi che non sono recapiti: segnaposto e frasi d'aiuto del modulo
const EXAMPLES = /(@azienda\.it|@example\.|@esempio\.|nome@|mario@|\+39 333 123 4567)/;
const PATTERNS = [
  { re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}/g, what: 'email' },
  { re: /wa\.me\/|api\.whatsapp\.com/g, what: 'indirizzo WhatsApp' },
  { re: /\+39[\s.]?\d{2,3}[\s.]?\d{3}[\s.]?\d{3,4}/g, what: 'numero di telefono' },
  { re: /\b39\d{10}\b/g, what: 'numero WhatsApp' },
  { re: /tel:\+?\d/g, what: 'link tel: con numero' },
];
for (const f of files) {
  if (CONTACT_OWNERS.some((r) => r.test(f.path))) continue;
  for (const { re, what } of PATTERNS) {
    for (const m of f.text.matchAll(re)) {
      const around = f.text.slice(Math.max(0, m.index - 12), m.index + m[0].length + 4);
      if (EXAMPLES.test(around)) continue;
      // l'amministrazione e i dati di prova non sono il sito pubblico
      if (f.path.startsWith('src/routes/admin/')) continue;
      fail('c', f.path, lineOf(f.text, m.index), `${what} scritto a mano (${m[0]}): leggilo da contact.ts o site.ts`);
    }
  }
}

if (problems.length) {
  console.error(`check-contact-ctas: ${problems.length} problema/i\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`check-contact-ctas: ok (${files.length} file controllati)`);
