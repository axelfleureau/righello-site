import { describe, expect, it } from 'vitest';
import { caseStudies, caseStudyHref } from '$lib/data/case-studies';
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
});
