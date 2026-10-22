import { describe, expect, it } from 'vitest';
import { caseStudies, caseStudyHref } from '$lib/data/case-studies';
import { softwareHousePages } from '$lib/data/software-house';
import { llmsFullTxt, llmsTxt } from './llms';
import { sitePages } from './pages';

const FORBIDDEN = [
  /\b470\b/,
  /98\s?%/,
  /ROAS/i,
  /\b340\s?%/,
  /8[.,]5x/i,
  /Google\s+Partner/i,
  /Meta\s+(Business\s+)?Partner/i,
  /5\.0 Rating/i,
  /correzione dei difetti/i,
  /clienti in tutta Europa/i
];

describe('llms.txt', () => {
  const short = llmsTxt();
  const full = llmsFullTxt();

  it('segue il formato: titolo, riassunto, elenchi di link', () => {
    expect(short).toMatch(/^# Righello\n\n> /);
    expect(short).toMatch(/^## Servizi$/m);
    expect(short).toMatch(/^- \[[^\]]+\]\(https:\/\/www\.wearerighello\.com\/[^)]*\): /m);
  });

  it('rimanda a ogni pagina pubblica che ha un contenuto proprio e dice lo stato vero dei progetti', () => {
    for (const page of sitePages.filter(
      (p) =>
        !p.path.startsWith('/progetti/') &&
        p.path !== '/' &&
        p.path !== '/contatti' &&
        p.path !== '/chi-siamo' &&
        p.path !== '/progetti'
    )) {
      expect(short, page.path).toContain(`https://www.wearerighello.com${page.path}`);
    }
    for (const study of caseStudies) {
      expect(short, study.id).toContain(`https://www.wearerighello.com${caseStudyHref(study)}`);
      expect(full, study.id).toContain(study.status.label);
    }
  });

  it('non afferma niente che il sito non dimostra', () => {
    for (const re of FORBIDDEN) {
      expect(short, String(re)).not.toMatch(re);
      expect(full, String(re)).not.toMatch(re);
    }
  });

  it("la data e' quella dell'ultimo contenuto cambiato, non quella di oggi", () => {
    expect(short).toMatch(/Ultimo aggiornamento dei contenuti: \d{4}-\d{2}-\d{2}\./);
  });

  it('ha le sezioni «Software house» e «AI», con indirizzo e una riga per ogni pagina', () => {
    const section = (name: string) => short.split(new RegExp(`^## ${name}$`, 'm'))[1].split(/^## /m)[0];
    const software = section('Software house');
    for (const p of softwareHousePages) {
      expect(software).toContain(`](https://www.wearerighello.com${p.path}): ${p.seo.description}`);
    }
    const ai = section('AI');
    for (const path of ['/servizi/agenti-ai', '/progetti/assistenti-pa', '/progetti/dico', '/progetti/optima', '/progetti/tetha']) {
      expect(ai, path).toContain(`https://www.wearerighello.com${path}`);
    }
    // Lo stato vero: l'assistente per i Comuni e' in sperimentazione, non «disponibile».
    expect(ai).toMatch(/In sperimentazione in un Comune/);
  });

  it('il testo completo contiene la risposta in apertura e le domande delle pagine «software house»', () => {
    for (const p of softwareHousePages) {
      expect(full).toContain(p.lead);
      for (const f of p.faqs) expect(full).toContain(`D: ${f.question}\nR: ${f.answer}`);
    }
  });
});
