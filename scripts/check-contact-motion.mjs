#!/usr/bin/env node
/**
 * Regole di movimento del percorso di contatto (foglio, conferma, barra del telefono, pagina /contatti).
 * Un movimento che non rispetta queste regole su un telefono vero scatta: si controlla qui, a ogni build.
 *
 *  (a) niente `transition: all` ne' `transition-property: all` (animerebbe anche layout e colori senza dirlo);
 *  (b) le transizioni toccano solo `transform` e `opacity` (il colore e il bordo rispondono con uno strato che cambia opacita');
 *  (c) i `@keyframes` toccano solo `transform`, `opacity` e il tratto di una spunta (`stroke-dashoffset`);
 *  (d) ogni file con transizioni o animazioni dichiara `@media (prefers-reduced-motion: reduce)` e li spegne dentro;
 *      ogni `@keyframes` e' neutralizzato la', cioe' le sue animazioni compaiono con `animation: none` (o `animation-duration`)
 *      oppure il file spegne tutte le animazioni dei suoi selettori nel blocco;
 *  (e) niente `backdrop-filter` ne' `filter: blur` (su telefono e iPad li spegne il blocco touch di src/styles/index.css:
 *      qui non si ricreano), e `will-change` solo su `transform`/`opacity`.
 *
 * Uso: node scripts/check-contact-motion.mjs [radice]   (esce con codice 1 se trova qualcosa)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : join(dirname(fileURLToPath(import.meta.url)), '..');

const walk = (dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const inScope = (rel) =>
  /^src\/lib\/components\/contact\/.*\.svelte$/.test(rel) ||
  rel === 'src/lib/components/ContactForm.svelte' ||
  rel === 'src/routes/contatti/+page.svelte';

const files = walk(join(root, 'src')).map((f) => relative(root, f)).filter(inScope).map((rel) => ({ rel, text: readFileSync(join(root, rel), 'utf8') }));
const problems = [];
const fail = (rule, file, line, msg) => problems.push(`(${rule}) ${file}:${line}  ${msg}`);
const lineOf = (text, index) => text.slice(0, index).split('\n').length;

/** Il contenuto di ogni <style> del file (con l'indice di partenza, per i numeri di riga). */
const styleBlocks = (text) => [...text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => ({ css: m[1], at: m.index + m[0].indexOf(m[1]) }));

/** Divide una lista separata da virgole fuori dalle parentesi (le curve `cubic-bezier(a, b, c, d)` non si spezzano). */
const splitTop = (s) => {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { out.push(cur); cur = ''; } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out.map((x) => x.trim()).filter(Boolean);
};

/** Corpo di un blocco che comincia a `open` (la graffa di apertura), con le graffe annidate. */
const bodyAt = (css, open) => {
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i);
  }
  return css.slice(open + 1);
};

for (const f of files) {
  const blocks = styleBlocks(f.text);
  let usesMotion = false;
  const keyframes = [];
  let reduced = '';

  for (const { css, at } of blocks) {
    const strip = css.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' ')); // i commenti non contano, le righe si'

    // blocchi prefers-reduced-motion
    for (const m of strip.matchAll(/@media[^{]*prefers-reduced-motion\s*:\s*reduce[^{]*\{/g)) reduced += bodyAt(strip, m.index + m[0].length - 1);

    // (c) keyframes
    for (const m of strip.matchAll(/@keyframes\s+([\w-]+)\s*\{/g)) {
      usesMotion = true;
      const body = bodyAt(strip, m.index + m[0].length - 1);
      keyframes.push(m[1]);
      for (const d of body.matchAll(/([\w-]+)\s*:/g)) {
        if (!['transform', 'opacity', 'stroke-dashoffset'].includes(d[1])) fail('c', f.rel, lineOf(f.text, at + m.index), `@keyframes ${m[1]} anima "${d[1]}": solo transform, opacity e stroke-dashoffset`);
      }
    }

    // (a)(b) transizioni
    for (const m of strip.matchAll(/(?<![\w-])transition(?:-property)?\s*:\s*([^;}]+)/g)) {
      const value = m[1].trim();
      if (/^(none|inherit|initial|unset)$/.test(value)) continue;
      usesMotion = true;
      const prop = /transition-property/.test(m[0]);
      for (const part of prop ? splitTop(value) : splitTop(value)) {
        const name = part.split(/\s+/)[0];
        if (name === 'all') fail('a', f.rel, lineOf(f.text, at + m.index), '`transition: all`: elenca le proprieta\'');
        else if (!['transform', 'opacity'].includes(name)) fail('b', f.rel, lineOf(f.text, at + m.index), `transizione su "${name}": solo transform e opacity`);
      }
    }
    if (/(?<![\w-])animation(?:-name)?\s*:/.test(strip)) usesMotion = true;

    // (e) filtri e will-change
    for (const m of strip.matchAll(/(?:-webkit-)?backdrop-filter\s*:/g)) fail('e', f.rel, lineOf(f.text, at + m.index), 'backdrop-filter: su touch lo spegne src/styles/index.css, non si ricrea qui');
    for (const m of strip.matchAll(/(?<![\w-])filter\s*:[^;}]*blur/g)) fail('e', f.rel, lineOf(f.text, at + m.index), 'filter: blur(): costoso su telefono');
    for (const m of strip.matchAll(/will-change\s*:\s*([^;}]+)/g)) {
      if (!/^(transform|opacity|transform\s*,\s*opacity|opacity\s*,\s*transform)$/.test(m[1].trim())) fail('e', f.rel, lineOf(f.text, at + m.index), `will-change: ${m[1].trim()}`);
    }
  }

  // (d) prefers-reduced-motion
  const inReduced = (cls) => new RegExp(`\\.${cls}(?![\\w-])`).test(reduced);
  if (usesMotion) {
    if (!reduced) fail('d', f.rel, 1, 'ha transizioni o animazioni ma nessun @media (prefers-reduced-motion: reduce)');
    else {
      if (!/(?<![\w-])(animation|transition)[\w-]*\s*:\s*none|animation-duration\s*:|transition-duration\s*:/.test(reduced)) fail('d', f.rel, 1, 'il blocco prefers-reduced-motion non spegne ne animazioni ne transizioni');
      // ogni animazione dichiarata nel file ha il suo selettore nel blocco: si cerca il nome della classe di ogni regola con `animation:`
      for (const { css } of blocks) {
        const strip = css.replace(/\/\*[\s\S]*?\*\//g, '');
        for (const m of strip.matchAll(/([^{}]+)\{([^{}]*?(?<![\w-])animation(?:-name)?\s*:\s*(?!\s*none\b)[^;}]+)/g)) {
          const sel = m[1].trim();
          if (sel.startsWith('@') || sel.startsWith('from') || sel.startsWith('to') || /^\d/.test(sel)) continue;
          // classi del selettore, senza pseudo-elementi, stati e :global()
          const classes = [...sel.matchAll(/\.([\w-]+)/g)].map((c) => c[1]);
          const last = classes[classes.length - 1];
          if (last && !inReduced(last)) fail('d', f.rel, 1, `l'animazione di "${sel.split('\n').pop().trim()}" non e' spenta nel blocco prefers-reduced-motion (manca .${last})`);
        }
        for (const m of strip.matchAll(/([^{}]+)\{([^{}]*?(?<![\w-])transition\s*:\s*(?!\s*none\b)[^;}]+)/g)) {
          const sel = m[1].trim();
          if (sel.startsWith('@')) continue;
          const classes = [...sel.matchAll(/\.([\w-]+)/g)].map((c) => c[1]);
          const last = classes[classes.length - 1];
          if (last && !inReduced(last)) fail('d', f.rel, 1, `la transizione di "${sel.split('\n').pop().trim()}" non e' spenta nel blocco prefers-reduced-motion (manca .${last})`);
        }
      }
    }
  }
}

if (problems.length) {
  console.error(`Movimento del contatto: ${problems.length} problemi\n` + problems.join('\n'));
  process.exit(1);
}
console.log(`Movimento del contatto: ok (${files.length} file controllati)`);
