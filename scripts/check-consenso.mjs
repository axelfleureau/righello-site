#!/usr/bin/env node
/**
 * Controllo del consenso ai cookie (GDPR / ePrivacy): pilota Chrome vero (CDP) sul sito in esecuzione, senza bloccare
 * nulla, e verifica che i servizi di tracciamento partano solo dopo un consenso.
 *
 *   node scripts/check-consenso.mjs [http://127.0.0.1:5322] [percorso ...]
 *
 * Serve un build in esecuzione (npm run build && PORT=5322 node build) e Google Chrome (CHROME_BIN per un percorso diverso).
 * Con un indirizzo diverso da quello locale (es. https://www.wearerighello.com) prova il sito in produzione.
 * Esce con 1 se un controllo fallisce.
 *
 * Per ogni pagina e per tre profili di visitatore (nessuna scelta, «Rifiuta», «Accetta») verifica:
 *  1. nessuna scelta: nessuna richiesta a Google/Meta/YouTube e nessun cookie di tracciamento (_gcl_*, _ga*, _fb*);
 *  2. «Rifiuta»: come sopra, anche dopo il clic;
 *  3. «Accetta»: il tag Google parte (altrimenti il consenso non servirebbe a niente: sarebbe rotto l'altro verso).
 * Le richieste a iubenda sono legittime: e' lo strumento che raccoglie il consenso.
 */
import { avvia, sleep } from './lib/cdp.mjs';

const args = process.argv.slice(2);
const BASE = (args.find((a) => a.startsWith('http')) ?? 'http://127.0.0.1:5322').replace(/\/$/, '');
const PAGINE = args.filter((a) => a.startsWith('/')).length ? args.filter((a) => a.startsWith('/')) : ['/', '/chi-siamo', '/contatti', '/progetti/buffr-live'];

const TRACCIAMENTO = /googletagmanager|google-analytics|googleadservices|doubleclick|google\.com\/ccm|googleads|facebook\.(com|net)|connect\.facebook|youtube\.com|ytimg|clarity\.ms|hotjar/i;
const COOKIE_TRACCIAMENTO = /^(_gcl_|_ga|_gid|_fb|IDE$|test_cookie)/;

const errori = [];
const ok = (msg) => console.log(`  ok   ${msg}`);
const ko = (msg) => { errori.push(msg); console.log(`  KO   ${msg}`); };
const check = (cond, bene, male) => (cond ? ok(bene) : ko(male));

async function profilo(pagina, scelta) {
  const c = await avvia({ bloccati: [] });
  const richieste = [];
  try {
    c.on('Network.requestWillBeSent', (p) => richieste.push(p.request.url));
    await c.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    const caricata = new Promise((r) => { const t = setTimeout(r, 25000); c.on('Page.loadEventFired', () => { clearTimeout(t); r(); }); });
    await c.send('Page.navigate', { url: BASE + pagina });
    await caricata;
    // il banner arriva da iubenda: aspetta che ci sia (fino a 20 s), poi lascia passare anche il caricamento ritardato dei tag
    for (let i = 0; i < 40 && !(await c.ev(`!!document.getElementById('iubenda-cs-banner')`)); i++) await sleep(500);
    await sleep(6000);
    if (scelta) {
      const esito = await c.ev(`(() => {
        const id = ${JSON.stringify(scelta)} === 'accetta' ? 'iubenda-cs-accept-btn' : 'iubenda-cs-reject-btn';
        const b = document.getElementById(id) || [...document.querySelectorAll('#iubenda-cs-banner button')].find((x) => new RegExp(${JSON.stringify(scelta)}, 'i').test(x.textContent));
        if (!b) return false; b.click(); return true;
      })()`);
      if (!esito) ko(`${pagina}: pulsante «${scelta}» del banner non trovato`);
      await sleep(9000);
    }
    const cookie = (await c.send('Network.getAllCookies')).cookies.map((k) => k.name).filter((n) => COOKIE_TRACCIAMENTO.test(n));
    return { terzi: richieste.filter((u) => TRACCIAMENTO.test(u)), cookie, banner: await c.ev(`!!document.getElementById('iubenda-cs-banner') || document.cookie.includes('_iub_cs')`) };
  } finally {
    await c.chiudi();
  }
}

for (const pagina of PAGINE) {
  console.log(`\n${pagina}`);
  const nessuna = await profilo(pagina, null);
  check(nessuna.banner, 'il banner del consenso compare', 'il banner del consenso non compare');
  check(nessuna.terzi.length === 0 && nessuna.cookie.length === 0, 'nessuna scelta: nessun tracciamento', `nessuna scelta: ${nessuna.terzi.length} richieste (${nessuna.terzi.slice(0, 2).map((u) => u.slice(0, 70)).join(', ')}) e cookie ${nessuna.cookie.join(',') || '-'}`);
  const rifiuto = await profilo(pagina, 'rifiuta');
  check(rifiuto.terzi.length === 0 && rifiuto.cookie.length === 0, 'dopo «Rifiuta»: nessun tracciamento', `dopo «Rifiuta»: ${rifiuto.terzi.length} richieste (${rifiuto.terzi.slice(0, 2).map((u) => u.slice(0, 70)).join(', ')}) e cookie ${rifiuto.cookie.join(',') || '-'}`);
  const accetto = await profilo(pagina, 'accetta');
  check(accetto.terzi.some((u) => /googletagmanager/.test(u)), 'dopo «Accetta»: il tag Google parte', 'dopo «Accetta»: il tag Google non parte (consenso rotto in senso contrario)');
}

console.log(errori.length ? `\n${errori.length} controlli falliti` : '\nTutto ok');
process.exit(errori.length ? 1 : 0);
