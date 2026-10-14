#!/usr/bin/env node
/**
 * Avvisa i motori che aderiscono a IndexNow (Bing, Yandex, Seznam, Naver...) che le pagine del sito
 * sono nuove o cambiate. Si lancia a mano DOPO ogni pubblicazione che cambia dei contenuti:
 *
 *   node scripts/indexnow.mjs            invia tutte le pagine della mappa del sito
 *   node scripts/indexnow.mjs --dry-run  mostra cosa invierebbe, senza inviare
 *   node scripts/indexnow.mjs /servizi/web /buffr   invia solo queste pagine
 *
 * Non costa nulla ed e' una richiesta sola (fino a 10.000 indirizzi). La chiave e' il nome del file
 * `static/<32 caratteri esadecimali>.txt`: e' pubblica per definizione (i motori la leggono dal sito
 * per verificare che l'invio venga da chi lo gestisce). Google non aderisce a IndexNow: per Google
 * valgono la mappa del sito e Search Console.
 */
import { readdirSync, readFileSync } from 'node:fs';

const HOST = 'www.wearerighello.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const dryRun = process.argv.includes('--dry-run');
const only = process.argv.slice(2).filter((a) => a.startsWith('/'));

const keyFile = readdirSync('static').find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('nessun file chiave in static/: deve chiamarsi <32 caratteri esadecimali>.txt');
const key = keyFile.replace('.txt', '');
if (readFileSync(`static/${keyFile}`, 'utf8').trim() !== key) throw new Error(`il file ${keyFile} deve contenere la chiave stessa`);

async function pages() {
  if (only.length) return only.map((p) => `https://${HOST}${p}`);
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = await pages();
console.log(`${urlList.length} indirizzi, chiave ${key}`);
if (dryRun) {
  console.log(urlList.join('\n'));
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
// 200 e 202 = accettato. 403 = la chiave non e' ancora raggiungibile sul sito: pubblicare prima, poi inviare.
console.log(`risposta: ${res.status} ${res.statusText}`);
if (!res.ok && res.status !== 202) process.exit(1);
