#!/usr/bin/env node
/**
 * Controllo automatico dell'audio del video della hero (AppleScrolly + PhoneMockup).
 *
 * Pilota un Chrome VERO via DevTools Protocol, con le regole di autoplay vere del browser
 * (nessun flag tipo --autoplay-policy: sono proprio quelle regole che si verificano) e con eventi
 * di input veri (rotella, tasti, mouse, tocco). Non puo' SENTIRE l'audio: legge lo stato
 * (`muted`, `volume`, `paused` del <video>, `navigator.userActivation`, badge e controllo visibili).
 *
 *   node scripts/check-hero-audio.mjs [url]            (default http://127.0.0.1:5300)
 *   CHROME_BIN=/percorso/chrome node scripts/check-hero-audio.mjs
 *
 * Verifica:
 *   1. solo rotella/swipe/movimento: nessuna attivazione utente, video muto ma in riproduzione, controllo
 *      «Attiva l'audio» visibile, badge «Audio attivato» assente;
 *   2. dopo Spazio / freccia giu' / clic / tocco: audio attivo (non muto, volume pieno dopo l'entrata
 *      progressiva, video in riproduzione), badge visibile, controllo nascosto;
 *   3. Esc, Tab e il solo Maiusc NON attivano;
 *   4. con l'audio attivo, a ogni altezza della hero resta attivo; fuori dalla hero si muta e si ferma;
 *      al ritorno riprende col suono senza un nuovo gesto; scheda in secondo piano = pausa;
 *   5. telefono (390x844, tocco): swipe non attiva, tocco attiva;
 *   6. prefers-reduced-motion: il video non parte da solo, un clic qualunque non lo avvia,
 *      il controllo «Attiva l'audio» si';
 *   7. browser che dichiara «autoplay permesso» ma poi rifiuta (simulato): niente ciclo, il video
 *      resta in riproduzione muto, il controllo resta disponibile.
 *
 * Lo stato del <video> si legge solo con la hero in MP4 (configurazione di produzione, con le variabili
 * CLOUDINARY_*). Con la sola hero YouTube di riserva (iframe di terzi) le prove sul player si saltano e
 * lo si dice.
 */
import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const URL_ARG = process.argv[2] && !process.argv[2].startsWith('-') ? process.argv[2] : 'http://127.0.0.1:5300';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findChrome() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ];
  return candidates.find((c) => existsSync(c));
}

let portCounter = 9600 + Math.floor(Math.random() * 300);

async function launch({ width, height, mobile = false, reducedMotion = false, preScript = '' }) {
  const bin = findChrome();
  if (!bin) { console.error('Chrome non trovato: imposta CHROME_BIN'); process.exit(2); }
  const port = portCounter++;
  const dir = mkdtempSync(join(tmpdir(), 'hero-audio-'));
  const args = ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${dir}`, '--no-first-run',
    '--no-default-browser-check', '--disable-extensions', `--window-size=${width},${height}`, 'about:blank'];
  const useArch = process.platform === 'darwin';
  const proc = useArch ? spawn('arch', ['-arm64', bin, ...args], { stdio: 'ignore' }) : spawn(bin, args, { stdio: 'ignore' });
  let page;
  for (let i = 0; i < 80 && !page; i++) {
    try { page = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch { /* ancora in avvio */ }
    if (!page) await sleep(250);
  }
  if (!page) { proc.kill('SIGKILL'); console.error('Chrome non parte'); process.exit(2); }
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0; const pending = new Map(); const exceptions = [];
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); }
    else if (m.method === 'Runtime.exceptionThrown') exceptions.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  });
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  const cdp = {
    send, exceptions,
    async eval(expr) {
      const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
      return r.result.value;
    },
    async close() { try { ws.close(); } catch { /* gia' chiuso */ } proc.kill('SIGKILL'); await sleep(300); try { rmSync(dir, { recursive: true, force: true }); } catch { /* ok */ } },
  };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
  if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  if (reducedMotion) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  if (preScript) await send('Page.addScriptToEvaluateOnNewDocument', { source: preScript });
  await send('Page.navigate', { url: URL_ARG });
  return cdp;
}

// ----- input veri -----
const wheel = async (c, n = 6) => { for (let i = 0; i < n; i++) { await c.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 720, y: 450, deltaX: 0, deltaY: 100 }); await sleep(120); } };
const key = async (c, k, code, vk, text) => {
  await c.send('Input.dispatchKeyEvent', { type: text ? 'keyDown' : 'rawKeyDown', key: k, code, windowsVirtualKeyCode: vk, ...(text ? { text } : {}) });
  await c.send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk });
};
const click = async (c, x = 300, y = 250) => {
  await c.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await c.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
};
const swipe = async (c) => {
  await c.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 200, y: 600 }] });
  for (let i = 1; i <= 8; i++) { await c.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 200, y: 600 - i * 40 }] }); await sleep(16); }
  await c.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
};
const tap = async (c, x = 200, y = 300) => {
  await c.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  await sleep(60);
  await c.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
};

// ----- stato letto dalla pagina -----
const STATE = `(() => {
  const v = document.querySelector('.phone-screen video');
  const cue = document.querySelector('.audio-cue');
  const badge = document.querySelector('.audio-on');
  const cs = (e) => e && getComputedStyle(e);
  return {
    activation: [navigator.userActivation.isActive, navigator.userActivation.hasBeenActive],
    y: Math.round(scrollY),
    video: v && { muted: v.muted, volume: +v.volume.toFixed(2), paused: v.paused, t: +v.currentTime.toFixed(2), ready: v.readyState },
    cueVisible: !!cue && cs(cue).visibility !== 'hidden' && +cs(cue).opacity > 0.01,
    badgeVisible: !!badge && cs(badge).display !== 'none',
  };
})()`;
const state = (c) => c.eval(STATE);
async function waitFor(c, pred, ms = 4000, step = 150) {
  const t0 = Date.now(); let s;
  while (Date.now() - t0 < ms) { s = await state(c); if (pred(s)) return s; await sleep(step); }
  return s;
}
const isAudible = (s) => s.video && !s.video.muted && !s.video.paused && s.video.volume >= 0.95;
const isSilentPlaying = (s) => s.video && s.video.muted && !s.video.paused;

let failures = 0; let checks = 0;
function expect(label, ok, detail = '') {
  checks++; if (!ok) failures++;
  console.log(`  ${ok ? 'OK ' : 'ERR'} ${label}${detail && !ok ? `  -> ${detail}` : ''}`);
}

async function ready(c, reducedMotion) {
  // pagina e video avviati (con la hero in MP4); se il <video> non c'e' si e' in modalita' YouTube.
  // Col movimento ridotto il video resta fermo di proposito: basta che l'elemento ci sia.
  const first = await waitFor(c, (x) => !!x.video, 8000);
  if (!first.video) return first;
  return waitFor(c, (x) => (reducedMotion ? !!x.video : (x.video && x.video.ready >= 3 && !x.video.paused && x.video.t > 0.3)), 25000);
}

async function scenario(name, opts, fn) {
  console.log(`\n${name}`);
  const c = await launch(opts);
  try {
    const s0 = await ready(c, !!opts.reducedMotion);
    if (!s0.video) { console.log('  --  SALTATO: nessun <video> nella hero (modalita\' YouTube di riserva): servono le variabili CLOUDINARY_* per la prova completa'); return 'skip'; }
    if (!opts.reducedMotion && s0.video.paused) { expect('il video della hero parte da solo (muto)', false, JSON.stringify(s0.video)); return; }
    await fn(c, s0);
    expect('nessuna eccezione non gestita nella pagina', c.exceptions.length === 0, c.exceptions.join(' | ').slice(0, 200));
  } finally { await c.close(); }
}

const DESKTOP = { width: 1440, height: 900 };
const results = [];

results.push(await scenario('1. Solo rotella: nessuna attivazione, video muto ma vivo, controllo visibile', DESKTOP, async (c, s0) => {
  expect('al caricamento il video e\' muto', s0.video.muted);
  await wheel(c, 6); await sleep(900);
  const s = await state(c);
  expect('la rotella ha scorso la pagina', s.y > 100, `y=${s.y}`);
  expect('la rotella NON e\' un\'attivazione utente (userActivation)', !s.activation[0] && !s.activation[1], JSON.stringify(s.activation));
  expect('video ancora muto', s.video.muted);
  expect('video in riproduzione (non fermato, non nero)', !s.video.paused && s.video.t > s0.video.t, `${s0.video.t} -> ${s.video.t}`);
  expect('controllo «Attiva l\'audio» visibile', s.cueVisible);
  expect('badge «Audio attivato» assente', !s.badgeVisible);
}));

for (const [label, act] of [
  ['Spazio', (c) => key(c, ' ', 'Space', 32, ' ')],
  ['freccia giu\'', (c) => key(c, 'ArrowDown', 'ArrowDown', 40)],
  ['PagGiu', (c) => key(c, 'PageDown', 'PageDown', 34)],
  ['clic', (c) => click(c)],
]) {
  results.push(await scenario(`2. Dopo ${label}: l'audio parte`, DESKTOP, async (c) => {
    await act(c);
    const s = await waitFor(c, isAudible, 3000);
    expect('userActivation attiva', s.activation[1]);
    expect('non muto, volume pieno dopo l\'entrata progressiva, in riproduzione', isAudible(s), JSON.stringify(s.video));
    expect('badge «Audio attivato» visibile', s.badgeVisible);
    await sleep(700);
    expect('controllo «Attiva l\'audio» nascosto', !(await state(c)).cueVisible);
  }));
}

results.push(await scenario('3. Esc, Tab e solo Maiusc non attivano', DESKTOP, async (c) => {
  await key(c, 'Escape', 'Escape', 27); await key(c, 'Shift', 'ShiftLeft', 16); await key(c, 'Tab', 'Tab', 9); await sleep(1200);
  const s = await state(c);
  expect('video ancora muto e in riproduzione', isSilentPlaying(s), JSON.stringify(s.video));
  expect('controllo ancora visibile', s.cueVisible);
}));

results.push(await scenario('4. Altezze della hero, uscita, ritorno, scheda in secondo piano', DESKTOP, async (c) => {
  await key(c, ' ', 'Space', 32, ' ');
  await waitFor(c, isAudible, 3000);
  const H = DESKTOP.height;
  for (const k of [0, 2, 4, 6]) {
    await c.eval(`window.scrollTo(0, ${k * H})`); await sleep(700);
    const s = await state(c);
    expect(`a ${k} altezze (y=${s.y}) l'audio e' ancora attivo`, isAudible(s), JSON.stringify(s.video));
  }
  const far = await c.eval('Math.round(document.documentElement.scrollHeight / 2)');
  await c.eval(`window.scrollTo(0, ${far})`);
  const out = await waitFor(c, (s) => s.video.muted && s.video.paused, 3000);
  expect('fuori dalla hero il video e\' muto e fermo', out.video.muted && out.video.paused, JSON.stringify(out.video));
  await c.eval('window.scrollTo(0, 0)');
  const back = await waitFor(c, isAudible, 4000);
  expect('tornando alla hero l\'audio riprende da solo (attivazione persistente)', isAudible(back), JSON.stringify(back.video));
  await c.eval(`Object.defineProperty(document, 'hidden', { get: () => true, configurable: true }); document.dispatchEvent(new Event('visibilitychange'))`);
  await sleep(500);
  expect('scheda in secondo piano: video in pausa', (await state(c)).video.paused);
  await c.eval(`delete document.hidden; document.dispatchEvent(new Event('visibilitychange'))`);
  const vis = await waitFor(c, isAudible, 3000);
  expect('scheda di nuovo in primo piano: riprende col suono', isAudible(vis), JSON.stringify(vis.video));
}));

results.push(await scenario('5. Telefono (390x844, tocco): lo swipe non attiva, il tocco si', { width: 390, height: 844, mobile: true }, async (c) => {
  await swipe(c); await sleep(900);
  let s = await state(c);
  expect('lo swipe non e\' un\'attivazione', !s.activation[0] && !s.activation[1], JSON.stringify(s.activation));
  expect('video ancora muto e in riproduzione', isSilentPlaying(s), JSON.stringify(s.video));
  await c.eval('window.scrollTo(0, 0)'); await sleep(500);
  await tap(c);
  s = await waitFor(c, isAudible, 3000);
  expect('dopo il tocco: audio attivo', isAudible(s), JSON.stringify(s.video));
  expect('badge «Audio attivato» visibile', s.badgeVisible);
}));

results.push(await scenario('6. Movimento ridotto: il video non parte da solo; il controllo lo avvia col suono', { ...DESKTOP, reducedMotion: true }, async (c) => {
  await sleep(1500);
  let s = await state(c);
  expect('video fermo al caricamento', s.video.paused, JSON.stringify(s.video));
  expect('controllo visibile', s.cueVisible);
  await click(c, 300, 250); await sleep(1000);
  s = await state(c);
  expect('un clic qualunque non avvia il video', s.video.paused && s.video.muted, JSON.stringify(s.video));
  await c.eval(`document.querySelector('.audio-cue').click()`);
  s = await waitFor(c, isAudible, 3000);
  expect('il controllo avvia il video col suono', isAudible(s), JSON.stringify(s.video));
}));

results.push(await scenario('7. Browser che dice «autoplay permesso» ma rifiuta: niente cicli, video vivo', {
  ...DESKTOP,
  preScript: `(() => {
    navigator.getAutoplayPolicy = () => 'allowed';
    window.__unmutes = 0;
    const d = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'muted');
    Object.defineProperty(HTMLMediaElement.prototype, 'muted', { configurable: true, get() { return d.get.call(this); }, set(v) { if (v === false) window.__unmutes++; d.set.call(this, v); } });
  })()`,
}, async (c) => {
  await sleep(5000);
  const s = await state(c);
  const n = await c.eval('window.__unmutes');
  expect('tentativi di togliere il muto limitati (nessun ciclo)', n <= 6, `${n}`);
  expect('video comunque in riproduzione e muto, controllo visibile', isSilentPlaying(s) && s.cueVisible, JSON.stringify(s));
}));

console.log(`\n${checks} controlli, ${failures} falliti${results.every((r) => r === 'skip') ? ' (tutte le prove saltate: hero non in MP4)' : ''}`);
if (checks === 0) { console.log('Nessuna prova eseguita: non e\' un esito positivo.'); process.exit(3); }
process.exit(failures ? 1 : 0);
