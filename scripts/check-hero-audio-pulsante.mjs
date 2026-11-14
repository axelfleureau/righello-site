#!/usr/bin/env node
/**
 * Controllo del pulsante audio della hero (AppleScrolly + PhoneMockup): pilota Chrome vero (CDP) sul sito
 * in esecuzione, con clic e rotella veri.
 *
 *   node scripts/check-hero-audio-pulsante.mjs [http://127.0.0.1:5322]
 *
 * Serve un build in esecuzione (npm run build && PORT=5322 node build) e Google Chrome (CHROME_BIN per un
 * percorso diverso). Esce con 1 se un controllo fallisce.
 *
 * Cosa verifica (le segnalazioni di Axel del 12/11/2026: «non c'e' modo di silenziarlo», «quando esce dalla viewport
 * dovrebbe zittirsi da solo», «problema di profondita» per il clic sul pulsante)
 *  1. Il pulsante sta sul telefono e un clic vero lo prende davvero (nessun livello sopra) in ogni punto di aggancio
 *     della hero e fino a quando la hero e' ancora in vista.
 *  2. Un clic sul pulsante da muto accende l'audio («Silenzia», aria-pressed = true) e non lo spegne subito: la
 *     pressione del mouse non deve togliere il muto prima del clic.
 *  3. Un secondo clic silenzia («Attiva l'audio»); un clic altrove, o un tasto, non lo riaccende.
 *  4. Con l'audio acceso, appena meno del 40 % della hero resta in vista il suono si spegne da solo e il controllo
 *     si nasconde; tornando su (se non l'aveva silenziato il visitatore) il suono riparte.
 */
import { avvia, sleep } from './lib/cdp.mjs';

const BASE = (process.argv.slice(2).find((a) => a.startsWith('http')) ?? 'http://127.0.0.1:5322').replace(/\/$/, '');
const SOGLIA_VISTA = 0.4; // = AUDIO_VISIBLE_RATIO in AppleScrolly.svelte
const PASSO_ROTELLA = 200; // px per scatto

const errori = [];
const ok = (msg) => console.log(`  ok   ${msg}`);
const ko = (msg) => { errori.push(msg); console.log(`  KO   ${msg}`); };
const check = (cond, bene, male) => (cond ? ok(bene) : ko(male));

const STATO = `(() => {
  const c = document.querySelector('.audio-cue');
  const h = document.querySelector('.apple-scrolly').getBoundingClientRect();
  const r = c.getBoundingClientRect();
  const t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  const vista = Math.max(0, Math.min(h.bottom, innerHeight) - Math.max(h.top, 0)) / Math.max(1, Math.min(h.height, innerHeight));
  return {
    label: c.textContent.trim(), pressed: c.getAttribute('aria-pressed'), nascosto: c.classList.contains('audio-cue-hidden'),
    preso: !!t && c.contains(t), sopra: t ? (typeof t.className === 'string' ? t.className.split(' ')[0] : t.tagName) : null,
    cx: r.left + r.width / 2, cy: r.top + r.height / 2, vista: +vista.toFixed(2), y: Math.round(scrollY),
  };
})()`;

async function main() {
  const c = await avvia();
  try {
    await c.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    const caricata = new Promise((r) => { const t = setTimeout(r, 20000); c.on('Page.loadEventFired', () => { clearTimeout(t); r(); }); });
    await c.send('Page.navigate', { url: BASE + '/' });
    await caricata;
    // Il pulsante compare quando la pagina e' idratata e la hero e' in vista: su un build freddo puo' volerci un po'.
    for (let i = 0; i < 60; i++) {
      if (await c.ev(`!!document.querySelector('.audio-cue') && !document.querySelector('.audio-cue').classList.contains('audio-cue-hidden')`)) break;
      await sleep(500);
    }
    await sleep(1500);

    const clic = async (x, y) => {
      for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) {
        await c.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mousePressed' ? 1 : 0, clickCount: type === 'mouseMoved' ? 0 : 1 });
      }
      await sleep(900);
    };
    const rotella = async (scatti) => {
      for (let i = 0; i < scatti; i++) { await c.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 700, y: 400, deltaX: 0, deltaY: PASSO_ROTELLA }); await sleep(120); }
      await sleep(1200);
    };
    const stato = () => c.ev(STATO);

    console.log('\n1. Il pulsante c\'e\' e un clic lo prende');
    let s = await stato();
    check(s.label === "Attiva l'audio" && !s.nascosto, 'in cima: «Attiva l\'audio», visibile', `in cima: label «${s.label}», nascosto ${s.nascosto}`);
    check(s.preso, 'in cima: nessun livello sopra il pulsante', `in cima: sopra il pulsante c'e' «${s.sopra}»`);

    // Safari su iPhone e iPad tratta il primo tocco di un elemento con :hover come «passaggio», non come clic:
    // «Silenzia» non silenzierebbe al primo tocco. Gli effetti al passaggio devono stare dentro @media (hover: hover).
    const hoverNudo = await c.ev(`(() => {
      const trovati = [];
      for (const sh of document.styleSheets) {
        let rules; try { rules = sh.cssRules; } catch { continue; }
        for (const r of rules) {
          if (r.type === CSSRule.STYLE_RULE && /audio-cue/.test(r.selectorText) && /:hover/.test(r.selectorText)) trovati.push(r.selectorText);
        }
      }
      return trovati;
    })()`);
    check(hoverNudo.length === 0, 'nessun :hover sul pulsante fuori da @media (hover: hover)', `:hover fuori da @media (hover: hover): ${hoverNudo.join(' | ')} (su iPhone il primo tocco non silenzia)`);

    console.log('\n2. Clic: accende, senza spegnersi da solo');
    await clic(s.cx, s.cy);
    s = await stato();
    check(s.label === 'Silenzia' && s.pressed === 'true', 'dopo il primo clic: «Silenzia», aria-pressed = true', `dopo il primo clic: «${s.label}», aria-pressed ${s.pressed} (la pressione del mouse ha tolto il muto prima del clic?)`);

    console.log('\n3. Silenzia, e non si riaccende da solo');
    await clic(s.cx, s.cy);
    s = await stato();
    check(s.label === "Attiva l'audio" && s.pressed === 'false', 'secondo clic: silenziato', `secondo clic: «${s.label}», aria-pressed ${s.pressed}`);
    await clic(150, 450);
    await c.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
    await c.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
    await sleep(900);
    s = await stato();
    check(s.label === "Attiva l'audio", 'un clic altrove e un tasto non riaccendono l\'audio silenziato', `l'audio si e' riacceso da solo («${s.label}»)`);

    console.log('\n4. Con l\'audio acceso: pulsante raggiungibile e uscita dalla viewport');
    await c.ev('scrollTo(0,0)');
    await sleep(800);
    s = await stato();
    await clic(s.cx, s.cy);
    s = await stato();
    check(s.label === 'Silenzia', 'riacceso dal pulsante', `non si riaccende: «${s.label}»`);
    let zittito = false;
    for (let i = 0; i < 40 && !zittito; i++) {
      await rotella(1);
      s = await stato();
      if (s.vista >= SOGLIA_VISTA + 0.05) {
        if (s.label !== 'Silenzia') ko(`y ${s.y}: hero in vista al ${Math.round(s.vista * 100)} % ma l'audio e' gia' spento («${s.label}»)`);
        else if (!s.preso && s.cy >= 0 && s.cy <= 900) ko(`y ${s.y}: il pulsante e' coperto da «${s.sopra}» (problema di profondita)`);
      } else if (s.vista <= SOGLIA_VISTA - 0.05) {
        zittito = true;
        check(s.label === "Attiva l'audio" && s.nascosto, `y ${s.y}: hero al ${Math.round(s.vista * 100)} % → audio spento da solo e controllo nascosto`, `y ${s.y}: hero al ${Math.round(s.vista * 100)} % ma l'audio e' ancora «${s.label}»`);
      }
    }
    check(zittito, 'la hero e\' uscita di scena durante la prova', 'la hero non e\' mai uscita di scena: prova non conclusa');
    // Con la hero fuori scena un clic su qualunque altra cosa (menu, tema) non deve riaccendere il suono né far ripartire il video.
    const bersaglio = await c.ev(`(() => { const b = [...document.querySelectorAll('button')].find((x) => { const r = x.getBoundingClientRect(); return r.width > 20 && r.top >= 0 && r.top < 140 && r.bottom < 200 && !x.closest('#iubenda-cs-banner') && !x.closest('.audio-cue'); }); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
    if (bersaglio) {
      await c.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: bersaglio.x, y: bersaglio.y });
      await c.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: bersaglio.x, y: bersaglio.y, button: 'left', buttons: 1, clickCount: 1 });
      await c.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: bersaglio.x, y: bersaglio.y, button: 'left', buttons: 0, clickCount: 1 });
      await c.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
      await c.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
      await sleep(1200);
      const dopo = await c.ev(`(() => { const v = document.querySelector('.phone-screen video'); return { label: document.querySelector('.audio-cue').textContent.trim(), video: v ? { muted: v.muted, paused: v.paused } : null, y: Math.round(scrollY) }; })()`);
      check(dopo.label === "Attiva l'audio", 'fuori scena: un clic e un tasto non riaccendono il suono', `fuori scena il suono si e' riacceso («${dopo.label}»)`);
      if (dopo.video) check(dopo.video.muted && dopo.video.paused, 'fuori scena il video resta muto e fermo', `fuori scena il video e' ripartito: ${JSON.stringify(dopo.video)}`);
    } else ko('nessun elemento cliccabile in alto per provare il clic fuori scena');
    await c.ev('scrollTo(0,0)');
    await sleep(300);
    for (let i = 0; i < 40; i++) { await c.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 700, y: 400, deltaX: 0, deltaY: -PASSO_ROTELLA }); await sleep(60); }
    await sleep(1500);
    s = await stato();
    check(s.label === 'Silenzia', 'tornando nella hero il suono riparte (l\'aveva acceso il visitatore)', `tornando su l'audio e' «${s.label}»`);
  } finally {
    await c.chiudi();
  }
  console.log(errori.length ? `\n${errori.length} controlli falliti` : '\nTutto ok');
  process.exit(errori.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
