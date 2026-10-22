import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { caseStudies } from '$lib/data/case-studies';
import { serviceDetails } from '$lib/data/service-details';
import { softwareHousePages } from '$lib/data/software-house';
import { OG_SIZE } from '$lib/data/site';
import { ogCards } from './og-cards';
import { sitePages } from './pages';

const inRange = (text: string, [min, max]: [number, number]) =>
  text.length >= min && text.length <= max;
const TITLE: [number, number] = [30, 60];
const DESCRIPTION: [number, number] = [70, 160];

/** Larghezza e altezza di un JPEG, dal primo marcatore "start of frame". */
function jpegSize(file: string): { width: number; height: number } {
  const b = readFileSync(file);
  for (let i = 2; i < b.length; ) {
    if (b[i] !== 0xff) throw new Error(`${file}: non e' un JPEG valido`);
    const marker = b[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    i += 2 + b.readUInt16BE(i + 2);
  }
  throw new Error(`${file}: dimensioni non trovate`);
}

describe('titoli e descrizioni dei dati', () => {
  it('ogni scheda progetto e ogni servizio ha titolo (30-60) e descrizione (70-160) della lunghezza giusta', () => {
    for (const s of caseStudies) {
      expect(
        inRange(s.seo.title, TITLE),
        `${s.id}: titolo di ${s.seo.title.length} caratteri`
      ).toBe(true);
      expect(
        inRange(s.seo.description, DESCRIPTION),
        `${s.id}: descrizione di ${s.seo.description.length} caratteri`
      ).toBe(true);
    }
    for (const s of serviceDetails) {
      expect(
        inRange(s.seo.title, TITLE),
        `${s.slug}: titolo di ${s.seo.title.length} caratteri`
      ).toBe(true);
      expect(
        inRange(s.seo.description, DESCRIPTION),
        `${s.slug}: descrizione di ${s.seo.description.length} caratteri`
      ).toBe(true);
    }
    for (const p of softwareHousePages) {
      expect(inRange(p.seo.title, TITLE), `${p.zone}: titolo di ${p.seo.title.length} caratteri`).toBe(true);
      expect(
        inRange(p.seo.description, DESCRIPTION),
        `${p.zone}: descrizione di ${p.seo.description.length} caratteri`
      ).toBe(true);
    }
  });

  it('nessun titolo e nessuna descrizione si ripete', () => {
    const all = [
      ...caseStudies.map((s) => s.seo),
      ...serviceDetails.map((s) => s.seo),
      ...softwareHousePages.map((p) => p.seo)
    ];
    expect(new Set(all.map((s) => s.title)).size).toBe(all.length);
    expect(new Set(all.map((s) => s.description)).size).toBe(all.length);
  });

  it('niente promesse o cifre che il sito non dimostra', () => {
    for (const { title, description } of [
      ...caseStudies.map((s) => s.seo),
      ...serviceDetails.map((s) => s.seo),
      ...softwareHousePages.map((p) => p.seo)
    ]) {
      expect(`${title} ${description}`).not.toMatch(
        /\b(470|98\s?%|340\s?%|ROAS|garantit|migliore|numero 1|leader)\b/i
      );
    }
  });
});

describe('immagini di condivisione', () => {
  it('ogni pagina pubblica ha la sua carta, e ogni carta il suo file 1200 x 630 leggero', () => {
    expect(ogCards.map((c) => c.path)).toEqual(sitePages.map((p) => p.path));
    expect(new Set(ogCards.map((c) => c.file)).size).toBe(ogCards.length);
    for (const card of ogCards) {
      const file = `static/og/${card.file}`;
      expect(jpegSize(file), card.file).toEqual(OG_SIZE);
      expect(readFileSync(file).length / 1024, `${card.file} pesa troppo`).toBeLessThan(150);
    }
  });
});
