import { describe, expect, it } from 'vitest';
import { lastModified } from './dates';
import { sitePages } from './pages';
import { sitemapXml } from './sitemap';

describe('sitemap', () => {
  const xml = sitemapXml();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("elenca ogni pagina pubblica una volta sola, con l'indirizzo del sito", () => {
    expect(locs).toHaveLength(sitePages.length);
    expect(new Set(locs).size).toBe(locs.length);
    for (const loc of locs) expect(loc).toMatch(/^https:\/\/www\.wearerighello\.com\//);
  });

  it('non espone aree riservate ne rotte di servizio', () => {
    for (const loc of locs) expect(loc).not.toMatch(/\/(admin|api|busadelsauc|coming-soon)(\/|$)/);
  });

  it('ogni pagina ha la data del suo contenuto: vera, non di domani, e non una sola per tutte', () => {
    const today = new Date().toISOString().slice(0, 10);
    const all = sitePages.map((p) => lastModified(p.path));
    for (const [i, d] of all.entries()) {
      expect(d, `manca lastmod per ${sitePages[i].path}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(d! <= today, `${sitePages[i].path} ha una data futura`).toBe(true);
    }
    expect(new Set(all).size).toBeGreaterThan(1);
  });
});
