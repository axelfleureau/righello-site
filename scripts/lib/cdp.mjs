/**
 * Chrome vero pilotato via CDP, per i controlli sul sito in esecuzione (scripts/check-hero-*.mjs).
 * Un solo punto: lo usano tutti i controlli che aprono la pagina in un browser.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function avvia({ bloccati } = {}) {
  if (!existsSync(CHROME)) throw new Error(`Chrome non trovato (${CHROME}): impostare CHROME_BIN`);
  const porta = 9800 + Math.floor(Math.random() * 150);
  const dir = mkdtempSync(join(tmpdir(), 'check-hero-'));
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
  await send('Network.setBlockedURLs', { urls: bloccati ?? ['*iubenda*', '*youtube*', '*ytimg*', '*googletagmanager*', '*google-analytics*', '*posthog*', '*cloudinary*'] });
  return { send, on, ev, chiudi };
}

