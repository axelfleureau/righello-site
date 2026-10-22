#!/usr/bin/env node
/**
 * Controllo della fascia «Tra i nostri clienti» della hero (AppleScrolly): pilota Chrome vero (CDP)
 * sul sito in esecuzione e verifica che i loghi non spariscano, non diventino blocchi pieni e non
 * saltino al giro.
 *
 *   node scripts/check-hero-loghi.mjs [http://127.0.0.1:5322] [--esplora]
 *
 * Serve un build in esecuzione (npm run build && PORT=5322 node build) e Google Chrome
 * (CHROME_BIN per un percorso diverso). Esce con 1 se un controllo fallisce.
 *
 * Cosa verifica
 *  1. Ogni logo di heroPartners (+page.svelte) e' nella fascia, si carica (200, naturalWidth > 0),
 *     non e' in un formato che i Safari vecchi non leggono (AVIF) e ha width/height veri
 *     (= logo-dimensioni.json, = file reale), cosi' la corsia non si sposta mentre arrivano.
 *  2. Per ogni logo, in tema scuro e chiaro, nella modalita' in cui e' disegnato davvero (sagoma
 *     con filtro, oppure colori veri): niente blocco pieno (disco/targa senza segno) e, a colori,
 *     abbastanza inchiostro visibile sullo sfondo (non bianco su bianco).
 *  3. Proporzioni: nessun logo disegnato piu' basso di ALTEZZA_MIN px (marchio quasi invisibile).
 *  4. Larghezza: ogni troncone della corsia sta sotto il limite di texture delle GPU mobili.
 *  5. Fotogrammi (1440x900 e 390x844, scuro e chiaro, animazione portata a istanti precisi, anche
 *     a cavallo del giro): ogni logo visibile ha davvero pixel sullo schermo, nessun buco largo,
 *     nessun salto: il fotogramma a 35 s e' identico a quello a 0 s.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';

const args = process.argv.slice(2);
const BASE = (args.find((a) => a.startsWith('http')) ?? 'http://127.0.0.1:5322').replace(/\/$/, '');
const ESPLORA = args.includes('--esplora');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const ALTEZZA_MIN = 12; // px: sotto, il marchio e' un filo
const SEGMENTO_MAX = 2700; // px CSS: x3 (iPhone) = 8100 < 8192
const GAP_MAX = 80; // px: spazio massimo fra due elementi consecutivi della corsia in vista
const SPAZIO_MAX = 60; // px: vuoto massimo ai bordi della fascia (un separatore + padding)
const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const errori = [];
const ok = (msg) => console.log(`  ok   ${msg}`);
const ko = (msg) => { errori.push(msg); console.log(`  KO   ${msg}`); };
const check = (cond, bene, male) => (cond ? ok(bene) : ko(male));

/* ───────────────────────── CDP minimo ───────────────────────── */
async function avvia() {
  if (!existsSync(CHROME)) throw new Error(`Chrome non trovato (${CHROME}): impostare CHROME_BIN`);
  const porta = 9800 + Math.floor(Math.random() * 150);
  const dir = mkdtempSync(join(tmpdir(), 'check-loghi-'));
  const a = ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${dir}`, '--no-first-run', '--hide-scrollbars', '--mute-audio', '--disable-3d-apis', 'about:blank'];
  const proc = process.platform === 'darwin' && process.arch === 'arm64' ? spawn('arch', ['-arm64', CHROME, ...a], { stdio: 'ignore' }) : spawn(CHROME, a, { stdio: 'ignore' });
  let ok = false;
  for (let i = 0; i < 80 && !ok; i++) { try { await fetch(`http://127.0.0.1:${porta}/json/version`); ok = true; } catch { await sleep(250); } }
  if (!ok) { proc.kill(); throw new Error('Chrome non parte'); }
  const tgt = await (await fetch(`http://127.0.0.1:${porta}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(tgt.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const pend = new Map(); const hand = new Map();
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pend.has(d.id)) { const p = pend.get(d.id); pend.delete(d.id); d.error ? p.j(new Error(JSON.stringify(d.error))) : p.r(d.result); }
    else if (d.method && hand.has(d.method)) hand.get(d.method).forEach((h) => h(d.params));
  };
  const send = (method, params = {}) => new Promise((r, j) => { const i = ++id; pend.set(i, { r, j }); ws.send(JSON.stringify({ id: i, method, params })); });
  const on = (e, h) => { if (!hand.has(e)) hand.set(e, []); hand.get(e).push(h); };
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 500));
    return r.result.value;
  };
  const chiudi = async () => { try { ws.close(); } catch { /* gia' chiuso */ } proc.kill(); await sleep(300); try { rmSync(dir, { recursive: true, force: true }); } catch { /* ok */ } };
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  // servizi esterni (banner cookie, analytics, video) non fanno parte della prova e coprirebbero la pagina
  await send('Network.setBlockedURLs', { urls: ['*iubenda*', '*youtube*', '*ytimg*', '*googletagmanager*', '*google-analytics*', '*posthog*', '*cloudinary*'] });
  return { send, on, ev, chiudi };
}

async function apri(c, { w, h, mobile, tema }) {
  await c.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
  if (mobile) await c.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  const { identifier } = await c.send('Page.addScriptToEvaluateOnNewDocument', { source: `try{localStorage.setItem('theme','${tema}')}catch(e){}` });
  const caricata = new Promise((r) => { const t = setTimeout(r, 20000); c.on('Page.loadEventFired', () => { clearTimeout(t); r(); }); });
  await c.send('Page.navigate', { url: BASE + '/' });
  await caricata;
  await sleep(4500); // animazione di ingresso della fascia (0,8 s + 1,2 s) e idratazione
  await c.send('Page.removeScriptToEvaluateOnNewDocument', { identifier });
  if (mobile) await c.ev(`(()=>{const e=document.querySelector('.partners-strip');scrollTo(0,Math.max(0,e.getBoundingClientRect().bottom+scrollY-innerHeight+10))})()`);
  await sleep(600);
}

/* ───────────────────────── PNG → pixel (solo RGBA/RGB 8 bit, senza interlacciamento) ───────────────────────── */
function decodificaPng(buf) {
  let p = 8, w = 0, h = 0, ct = 0; const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p); const tipo = buf.toString('ascii', p + 4, p + 8); const dati = buf.subarray(p + 8, p + 8 + len);
    if (tipo === 'IHDR') { w = dati.readUInt32BE(0); h = dati.readUInt32BE(4); ct = dati[9]; }
    else if (tipo === 'IDAT') idat.push(dati);
    p += 12 + len;
  }
  const bpp = ct === 6 ? 4 : 3;
  const raw = inflateSync(Buffer.concat(idat));
  const out = Buffer.alloc(w * h * bpp); const stride = w * bpp;
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)]; const riga = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? out[y * stride + x - bpp] : 0; const b = y ? out[(y - 1) * stride + x] : 0; const cc = x >= bpp && y ? out[(y - 1) * stride + x - bpp] : 0;
      let v = riga[x];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const pp = a + b - cc; const pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - cc); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : cc; }
      out[y * stride + x] = v & 255;
    }
  }
  return { w, h, bpp, px: out };
}

async function scatta(c, clip, dpr) {
  const { data } = await c.send('Page.captureScreenshot', { format: 'png', clip: { ...clip, scale: 1 } });
  const img = decodificaPng(Buffer.from(data, 'base64'));
  img.dpr = dpr;
  return img;
}

/* ───────────────────── analisi di un logo, dentro la pagina ───────────────────── */
// Sagoma = solo alfa. Blocco pieno = una componente che occupa una parte grande del logo, quasi
// piena nel suo riquadro e senza segni dentro (disco o targa che il filtro ha reso bianco).
const ANALISI_LOGO = `(async (src, modo, bgLum, maxW, H) => {
  const img = new Image(); img.src = src; await img.decode();
  let w = Math.max(1, Math.round(img.naturalWidth * H / img.naturalHeight)), h = H;
  if (w > maxW) { w = maxW; h = Math.max(1, Math.round(img.naturalHeight * w / img.naturalWidth)); }
  const S = 2, cw = w * S, ch = h * S;
  const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch;
  const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0, cw, ch);
  const d = g.getImageData(0, 0, cw, ch).data;
  const n = cw * ch; const opaco = new Uint8Array(n); let tot = 0, inchiostro = 0;
  let x0 = cw, x1 = -1, y0 = ch, y1 = -1;
  for (let i = 0; i < n; i++) {
    if (d[i*4+3] > 128) {
      opaco[i] = 1; tot++;
      const lum = 0.299*d[i*4] + 0.587*d[i*4+1] + 0.114*d[i*4+2];
      if (modo === 'sagoma' || Math.abs(lum - bgLum) >= 45) inchiostro++;
      const x = i % cw, y = (i / cw) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  if (!tot) return { vuoto: true, w, h };
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
  // componenti connesse (4 vicini)
  const lab = new Int32Array(n); let k = 0; const comp = [];
  for (let s = 0; s < n; s++) {
    if (!opaco[s] || lab[s]) continue;
    k++; const pila = [s]; lab[s] = k; let area = 0, a0 = cw, a1 = -1, b0 = ch, b1 = -1;
    while (pila.length) {
      const i = pila.pop(); area++; const x = i % cw, y = (i / cw) | 0;
      if (x < a0) a0 = x; if (x > a1) a1 = x; if (y < b0) b0 = y; if (y > b1) b1 = y;
      for (const j of [i-1, i+1, i-cw, i+cw]) {
        if (j < 0 || j >= n) continue;
        if ((j === i-1 && x === 0) || (j === i+1 && x === cw-1)) continue;
        if (opaco[j] && !lab[j]) { lab[j] = k; pila.push(j); }
      }
    }
    comp.push({ id: k, area, bw: a1 - a0 + 1, bh: b1 - b0 + 1, a0, b0 });
  }
  // buchi interni di una componente = vuoto non raggiungibile dal bordo del suo riquadro
  const buchi = (c) => {
    const W = c.bw + 2, Hh = c.bh + 2; const m = new Uint8Array(W * Hh); // 1 = pieno
    for (let y = 0; y < c.bh; y++) for (let x = 0; x < c.bw; x++) if (lab[(c.b0 + y) * cw + c.a0 + x] === c.id) m[(y + 1) * W + x + 1] = 1;
    const vis = new Uint8Array(W * Hh); const st = [0]; vis[0] = 1;
    while (st.length) { const i = st.pop(); const x = i % W, y = (i / W) | 0;
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) { const nx = x+dx, ny = y+dy; if (nx<0||ny<0||nx>=W||ny>=Hh) continue; const j = ny*W+nx; if (!m[j] && !vis[j]) { vis[j]=1; st.push(j); } } }
    let b = 0; for (let i = 0; i < m.length; i++) if (!m[i] && !vis[i]) b++;
    return b / (c.bw * c.bh);
  };
  let blocco = null;
  for (const c of comp) {
    const quota = c.area / tot, riemp = c.area / (c.bw * c.bh), vuoti = buchi(c);
    // pieno: grande, alto almeno meta' del logo, quasi pieno nel suo riquadro, senza segni dentro
    const pieno = quota >= 0.2 && c.bh >= 0.5 * bh && c.bh >= 8 * S && c.bw >= 0.6 * c.bh && riemp >= 0.7 && (riemp + vuoti) >= 0.95 && vuoti < 0.06;
    if (pieno && (!blocco || c.area > blocco.area)) blocco = { area: c.area, quota: +quota.toFixed(2), riemp: +riemp.toFixed(2), vuoti: +vuoti.toFixed(3) };
  }
  return { w, h, rendH: Math.round(bh / S), rendW: Math.round(bw / S), riempBbox: +(tot / (bw * bh)).toFixed(2), inchiostro: +(inchiostro / tot).toFixed(2), blocco };
})`;

/* ───────────────────────── il giro ───────────────────────── */
console.log(`Fascia loghi della hero: ${BASE}`);
const dimensioni = JSON.parse(readFileSync(join(ROOT, 'src/lib/data/logo-dimensioni.json'), 'utf8'));
const pageSrc = readFileSync(join(ROOT, 'src/routes/+page.svelte'), 'utf8');
const blocco = pageSrc.slice(pageSrc.indexOf('const heroPartners'), pageSrc.indexOf('const processSteps'));
const elenco = [...blocco.matchAll(/name:\s*'([^']+)',\s*logo:\s*'([^']+)'/g)].map((m) => ({ name: m[1], logo: m[2] }));
check(elenco.length > 0, `${elenco.length} loghi in heroPartners`, 'heroPartners non trovato in +page.svelte');

const c = await avvia();
try {
  /* 1-4: struttura, file, proporzioni, segmenti (scuro, poi chiaro per gli stili) */
  const info = {};
  for (const tema of ['dark', 'light']) {
    console.log(`\n[${tema}] 1440x900`);
    await apri(c, { w: 1440, h: 900, mobile: false, tema });
    const dom = await c.ev(`(() => {
      const m = document.querySelector('.partners-marquee'); if (!m) return null;
      const segs = [...m.querySelectorAll('.partners-seg')].map((s) => Math.round(s.getBoundingClientRect().width));
      const imgs = [...m.querySelectorAll('img')].map((i) => { const cs = getComputedStyle(i); const b = i.getBoundingClientRect();
        return { alt: i.alt, src: new URL(i.currentSrc || i.src).pathname, attr: i.getAttribute('src'), wa: i.getAttribute('width'), ha: i.getAttribute('height'), filter: cs.filter, boxW: b.width, boxH: b.height, padL: parseFloat(cs.paddingLeft), noFilter: i.classList.contains('no-filter') }; });
      const nomi = [...m.querySelectorAll('.partner-name')].map((s) => s.textContent);
      return { segs, imgs, nomi, totale: Math.round(m.getBoundingClientRect().width), bg: getComputedStyle(document.body).backgroundColor };
    })()`);
    if (!dom) { ko('fascia .partners-marquee assente'); continue; }
    info[tema] = dom;
    const meta = dom.imgs.length / 2;
    const prima = dom.imgs.slice(0, meta);
    if (tema === 'dark') {
      check(dom.nomi.length === 0, 'nessun logo e\' ricaduto sul nome (tutti i file si caricano)', `logo caduto sul testo: ${dom.nomi.join(', ')}`);
      check(prima.length === elenco.length, `${prima.length} loghi nella fascia = ${elenco.length} di heroPartners`, `nella fascia ${prima.length} loghi, in heroPartners ${elenco.length}`);
      check(dom.segs.length >= 4, `corsia in ${dom.segs.length} tronconi (${dom.segs.join(' + ')} px, totale ${dom.totale} px)`, `la corsia e' un solo livello largo ${dom.totale} px`);
      const grandi = dom.segs.filter((s) => s > SEGMENTO_MAX);
      check(grandi.length === 0, `ogni troncone <= ${SEGMENTO_MAX} px (max ${Math.max(...dom.segs)})`, `tronconi troppo larghi: ${grandi.join(', ')} px (limite ${SEGMENTO_MAX})`);
      check(Math.abs(dom.segs[0] + dom.segs[1] - dom.segs[2] - dom.segs[3]) <= 1, 'le due copie hanno la stessa larghezza (nessun salto al giro)', `copie di larghezza diversa: ${dom.segs[0] + dom.segs[1]} contro ${dom.segs[2] + dom.segs[3]}`);
      // file: esistono, si caricano, formato leggibile ovunque, dimensioni vere
      for (const l of elenco) {
        const st = await c.ev(`(async () => { const r = await fetch(${JSON.stringify(l.logo)}); const t = r.headers.get('content-type'); if (!r.ok) return { st: r.status }; const im = new Image(); im.src = URL.createObjectURL(await r.blob()); try { await im.decode(); } catch { return { st: r.status, rotto: true }; } return { st: r.status, t, nw: im.naturalWidth, nh: im.naturalHeight }; })()`);
        const dim = dimensioni[l.logo];
        if (st.st !== 200 || st.rotto || !st.nw) { ko(`${l.name}: ${l.logo} non si carica (${JSON.stringify(st)})`); continue; }
        if (/\.avif$/i.test(l.logo)) ko(`${l.name}: AVIF non si legge su iOS < 16.4`);
        if (!dim) ko(`${l.name}: manca in logo-dimensioni.json (python3 scripts/logo-dimensioni.py)`);
        else if (dim[0] !== st.nw || dim[1] !== st.nh) ko(`${l.name}: logo-dimensioni.json dice ${dim.join('x')}, il file e' ${st.nw}x${st.nh}`);
        const el = prima.find((i) => i.alt === l.name);
        if (!el) ko(`${l.name}: non e' nella fascia`);
        else if (dim && (+el.wa !== dim[0] || +el.ha !== dim[1])) ko(`${l.name}: <img> senza width/height veri (${el.wa}x${el.ha}, il file e' ${dim.join('x')})`);
      }
      if (!errori.some((e) => /non si carica|AVIF|logo-dimensioni|non e' nella fascia|senza width/.test(e))) ok(`${elenco.length} loghi: file raggiungibili, formati leggibili ovunque, width/height = file reale`);
    }
    // proporzioni disegnate + modo di disegno per tema
    const bgLum = (() => { const m = dom.bg.match(/\d+/g).map(Number); return 0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]; })();
    let problemi = 0; const righe = [];
    for (const el of prima) {
      const modo = /brightness\(0\)/.test(el.filter) ? 'sagoma' : 'colori';
      const a = await c.ev(`${ANALISI_LOGO}(${JSON.stringify(el.attr)}, ${JSON.stringify(modo)}, ${tema === 'dark' ? 12 : bgLum || 250}, ${Math.round(el.boxW - 2 * el.padL)}, ${Math.round(el.boxH)})`);
      righe.push({ nome: el.alt, modo, ...a });
      if (a.vuoto) { ko(`[${tema}] ${el.alt}: logo senza pixel opachi`); problemi++; continue; }
      if (tema === 'dark' && a.rendH < ALTEZZA_MIN) { ko(`${el.alt}: disegnato alto ${a.rendH}px (< ${ALTEZZA_MIN}): quasi invisibile`); problemi++; }
      if (modo === 'sagoma' && a.blocco) { ko(`[${tema}] ${el.alt}: in sagoma e' un blocco pieno (${JSON.stringify(a.blocco)}) senza segno dentro`); problemi++; }
      if (modo === 'colori' && a.inchiostro < 0.4) { ko(`[${tema}] ${el.alt}: a colori ma solo il ${Math.round(a.inchiostro * 100)}% del logo si distingue dallo sfondo`); problemi++; }
    }
    if (ESPLORA) for (const r of righe) console.log('      ', r.nome.padEnd(26), r.modo.padEnd(7), JSON.stringify({ ...r, nome: undefined, modo: undefined }));
    if (!problemi) ok(`[${tema}] nessun logo e' un blocco pieno, illeggibile o piu' basso di ${ALTEZZA_MIN}px`);
  }

  /* 5: fotogrammi */
  for (const cfg of [
    { w: 1440, h: 900, mobile: false, tema: 'dark', minVisibili: 8 },
    { w: 1440, h: 900, mobile: false, tema: 'light', minVisibili: 8 },
    { w: 390, h: 844, mobile: true, tema: 'dark', minVisibili: 3 },
    { w: 390, h: 844, mobile: true, tema: 'light', minVisibili: 3 }
  ]) {
    console.log(`\n[${cfg.tema}] ${cfg.w}x${cfg.h} fotogrammi`);
    await apri(c, cfg);
    const dpr = cfg.mobile ? 2 : 1;
    const box = await c.ev(`(() => { const b = document.querySelector('.partners-strip').getBoundingClientRect(); return { x: 0, y: Math.round(b.y + scrollY), width: innerWidth, height: Math.round(b.height) }; })()`);
    await c.ev(`document.querySelector('.partners-marquee').style.visibility = 'hidden'`);
    await sleep(250);
    const sfondo = await scatta(c, box, dpr);
    await c.ev(`document.querySelector('.partners-marquee').style.visibility = ''`);
    const imposta = (t) => c.ev(`(() => { const a = document.getAnimations().filter((x) => x.animationName && x.animationName.includes('partners-scroll')); a.forEach((x) => { x.pause(); x.currentTime = ${t * 1000}; }); return a.length; })()`);
    const stato = () => c.ev(`(() => {
      const wr = document.querySelector('.partners-marquee-wrapper').getBoundingClientRect(); const sy = scrollY;
      const els = [...document.querySelectorAll('.partners-marquee img, .partners-marquee .partner-name')].map((e) => { const b = e.getBoundingClientRect(); return { x: b.x, r: b.right, y: b.y, h: b.height, alt: e.alt || e.textContent }; });
      const imgs = document.querySelectorAll('.partners-marquee img');
      return { wl: wr.left, wr: wr.right, sy, els, a0: imgs[0].getBoundingClientRect().x, b0: imgs[imgs.length / 2].getBoundingClientRect().x };
    })()`);
    const tempi = []; for (let t = 0; t <= 33; t += 3) tempi.push(t); tempi.push(34.99, 35, 35.01);
    let nAnim = 0; const visMin = { n: 99 }; let gapMax = 0, spazioMax = 0, vuoti = 0; const prof = {}; let A0 = null;
    for (const t of tempi) {
      nAnim = await imposta(t); await sleep(200);
      const s = await stato(); const img = await scatta(c, box, dpr);
      prof[t] = img;
      if (t === 0) A0 = s.a0;
      if (t === 34.99) prof.b0_fine = s.b0;
      // elementi interamente in vista (sotto la dissolvenza di 48 px: restano leggibili)
      const inFascia = s.els.filter((e) => e.r > s.wl && e.x < s.wr).sort((p, q) => p.x - q.x);
      const vis = inFascia.filter((e) => e.x >= s.wl + 48 && e.r <= s.wr - 48);
      if (inFascia.length < visMin.n) { visMin.n = inFascia.length; visMin.t = t; }
      for (let i = 1; i < inFascia.length; i++) gapMax = Math.max(gapMax, inFascia[i].x - inFascia[i - 1].r);
      const lead = inFascia.length ? Math.max(0, inFascia[0].x - s.wl) : 9999, trail = inFascia.length ? Math.max(0, s.wr - inFascia[inFascia.length - 1].r) : 9999;
      spazioMax = Math.max(spazioMax, lead, trail);
      // ogni elemento visibile ha pixel diversi dallo sfondo nel suo riquadro
      for (const e of vis) {
        const x0 = Math.round(e.x * dpr), x1 = Math.round(e.r * dpr), y0 = Math.round((e.y + s.sy - box.y) * dpr), y1 = y0 + Math.round(e.h * dpr);
        let diversi = 0, tot = 0;
        for (let y = Math.max(0, y0); y < Math.min(img.h, y1); y++) for (let x = Math.max(0, x0); x < Math.min(img.w, x1); x++) {
          tot++; const i = (y * img.w + x) * img.bpp, j = (y * sfondo.w + x) * sfondo.bpp;
          if (Math.max(Math.abs(img.px[i] - sfondo.px[j]), Math.abs(img.px[i + 1] - sfondo.px[j + 1]), Math.abs(img.px[i + 2] - sfondo.px[j + 2])) > 20) diversi++;
        }
        if (tot && diversi / tot < 0.01) { vuoti++; if (vuoti <= 3) console.log(`      riquadro vuoto: ${e.alt} a ${t}s (${diversi}/${tot} px)`); }
      }
    }
    check(nAnim === 1, 'una sola animazione della corsia', `animazioni partners-scroll: ${nAnim}`);
    check(visMin.n >= cfg.minVisibili, `almeno ${visMin.n} loghi in vista in ogni istante (minimo richiesto ${cfg.minVisibili})`, `solo ${visMin.n} loghi in vista a ${visMin.t}s (minimo ${cfg.minVisibili})`);
    check(vuoti === 0, `ogni logo in vista ha pixel veri sullo schermo (${tempi.length} istanti)`, `${vuoti} riquadri di logo vuoti (spariti)`);
    check(gapMax <= GAP_MAX, `spazio massimo fra due elementi: ${Math.round(gapMax)}px (<= ${GAP_MAX})`, `buco di ${Math.round(gapMax)}px nella corsia (> ${GAP_MAX})`);
    check(spazioMax <= SPAZIO_MAX, `vuoto massimo ai bordi: ${Math.round(spazioMax)}px (<= ${SPAZIO_MAX})`, `vuoto di ${Math.round(spazioMax)}px ai bordi della fascia (> ${SPAZIO_MAX})`);
    // giro: l'inizio della seconda copia, un istante prima della fine, e' dove all'istante 0 sta la prima
    check(Math.abs(prof.b0_fine - A0) <= 2, `giro continuo: la seconda copia arriva a ${prof.b0_fine.toFixed(1)}px, la prima partiva da ${A0.toFixed(1)}px`, `salto al giro: ${prof.b0_fine.toFixed(1)}px contro ${A0.toFixed(1)}px`);
    // solo la banda dei loghi: dietro c'e' lo sfondo animato della hero
    const banda = await c.ev(`(() => { const b = document.querySelector('.partners-marquee-wrapper').getBoundingClientRect(); return [b.y + scrollY, b.height]; })()`);
    const r0 = Math.max(0, Math.round((banda[0] - box.y) * dpr)), r1 = Math.min(prof[0].h, r0 + Math.round(banda[1] * dpr));
    let somma = 0, nPx = 0; const p0 = prof[0], p35 = prof[35];
    for (let y = r0; y < r1; y++) for (let x = 0; x < p0.w * p0.bpp; x++) { somma += Math.abs(p0.px[y * p0.w * p0.bpp + x] - p35.px[y * p0.w * p0.bpp + x]); nPx++; }
    const medio = somma / Math.max(1, nPx);
    check(medio < 0.5, `fotogramma a 35 s identico a quello a 0 s (differenza media ${medio.toFixed(3)} su 255)`, `il fotogramma a 35 s differisce da quello a 0 s (${medio.toFixed(2)})`);
  }
} finally {
  await c.chiudi();
}

console.log(errori.length ? `\n${errori.length} controlli falliti` : '\nTutti i controlli superati');
process.exit(errori.length ? 1 : 0);
