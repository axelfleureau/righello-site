import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const script = join(process.cwd(), 'scripts/check-contact-motion.mjs');
const run = (root: string) => {
  try {
    return { code: 0, out: execFileSync('node', [script, root], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) };
  } catch (e) {
    const err = e as { status: number; stderr: string };
    return { code: err.status, out: err.stderr };
  }
};

/** Una radice finta con un solo file del percorso di contatto. */
function fixture(css: string) {
  const root = mkdtempSync(join(tmpdir(), 'motion-'));
  const dir = join(root, 'src/lib/components/contact');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'Prova.svelte'), `<div class="a"></div>\n<style>\n${css}\n</style>\n`);
  return root;
}

describe('regole di movimento del percorso di contatto', () => {
  it('il codice del sito le rispetta', () => {
    const r = run('.');
    expect(r.out).toMatch(/ok/);
    expect(r.code).toBe(0);
  });

  it('boccia `transition: all`', () => {
    const r = run(fixture('.a { transition: all 0.2s; }\n@media (prefers-reduced-motion: reduce) { .a { transition: none; } }'));
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/\(a\)/);
  });

  it('boccia una transizione di colore o di bordo', () => {
    const r = run(fixture('.a { transition: background-color 0.2s, opacity 0.2s; }\n@media (prefers-reduced-motion: reduce) { .a { transition: none; } }'));
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/"background-color"/);
  });

  it('boccia un @keyframes che anima altro che transform, opacity e il tratto della spunta', () => {
    const r = run(fixture('.a { animation: k 1s; }\n@keyframes k { from { box-shadow: none; } to { opacity: 0; } }\n@media (prefers-reduced-motion: reduce) { .a { animation: none; } }'));
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/box-shadow/);
  });

  it('boccia un\'animazione senza prefers-reduced-motion, o non spenta nel blocco', () => {
    const senza = run(fixture('.a { animation: k 1s; }\n@keyframes k { from { opacity: 0; } }'));
    expect(senza.code).toBe(1);
    expect(senza.out).toMatch(/\(d\)/);
    const altra = run(fixture('.a { animation: k 1s; }\n@keyframes k { from { opacity: 0; } }\n@media (prefers-reduced-motion: reduce) { .b { animation: none; } }'));
    expect(altra.code).toBe(1);
    expect(altra.out).toMatch(/\.a/);
  });

  it('boccia backdrop-filter e will-change su altro che transform/opacity', () => {
    const r = run(fixture('.a { backdrop-filter: blur(8px); will-change: width; }'));
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/backdrop-filter/);
    expect(r.out).toMatch(/will-change/);
  });

  it('ammette transform, opacity e la spunta che si disegna', () => {
    const r = run(fixture('.a { transition: opacity 0.2s, transform 0.3s var(--e); animation: d 1s; }\n@keyframes d { to { stroke-dashoffset: 0; transform: none; } }\n@media (prefers-reduced-motion: reduce) { .a { transition: none; animation: none; } }'));
    expect(r.code).toBe(0);
  });
});
