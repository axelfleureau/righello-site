import { describe, expect, it } from 'vitest';
import { serviceModel } from '$lib/components/servizi/models';
import { caseStudies, caseStudyHref } from '$lib/data/case-studies';
import { serviceDetails, serviceFaqs } from '$lib/data/service-details';
import { COMPANY, socialLinks } from '$lib/data/site';
import { founders, team } from '$lib/data/team';
import { sitePages } from './pages';
import { graphFor, jsonLdFor, ORG_ID, type Node } from './schema';

const META = {
  title: 'Titolo di prova della pagina | Righello',
  description: 'Descrizione di prova della pagina, abbastanza lunga per sembrare vera.'
};
const graph = (path: string) => graphFor(path, META)!;
const types = (n: Node) => [n['@type']].flat() as string[];
const find = (nodes: Node[], type: string) => nodes.find((n) => types(n).includes(type));

/** Tutti i nodi dentro un oggetto, a qualsiasi profondita'. */
function walk(value: unknown, visit: (key: string, v: unknown) => void) {
  if (Array.isArray(value)) return value.forEach((v) => walk(v, visit));
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      visit(k, v);
      walk(v, visit);
    }
  }
}

/** Cio' che i dati strutturati non devono mai affermare: nessuna prova pubblica. */
const FORBIDDEN_TYPES = ['AggregateRating', 'Review', 'Rating'];
const FORBIDDEN_KEYS = [
  'aggregateRating',
  'review',
  'reviewRating',
  'ratingValue',
  'numberOfEmployees',
  'priceRange',
  'award',
  'memberOf'
];
const FORBIDDEN_TEXT = [
  /\b470\b/,
  /98\s?%/,
  /ROAS/i,
  /\b340\s?%/,
  /8[.,]5x/i,
  /Google\s+Partner/i,
  /Meta\s+(Business\s+)?Partner/i,
  /5\.0 Rating/i
];

describe('dati strutturati', () => {
  it('ogni pagina pubblica ha il suo grafo; le altre (area riservata, errori) no', () => {
    for (const { path } of sitePages) expect(graphFor(path, META), path).not.toBeNull();
    for (const path of [
      '/admin',
      '/admin/dashboard',
      '/coming-soon',
      '/busadelsauc',
      '/non-esiste'
    ])
      expect(graphFor(path, META), path).toBeNull();
  });

  describe.each(sitePages.map((p) => p.path))('%s', (path) => {
    const nodes = graph(path);
    const text = jsonLdFor(path, META)!;

    it("e' JSON valido, sicuro dentro il HTML e sotto i 15 kB", () => {
      expect(() => JSON.parse(text)).not.toThrow();
      expect(text).not.toMatch(/<\/?script/i);
      expect(text).not.toContain('<');
      expect(Buffer.byteLength(text)).toBeLessThan(15 * 1024);
    });

    it("ha una sola societa' e un solo sito, e gli @id sono unici", () => {
      expect(nodes.filter((n) => n['@id'] === ORG_ID)).toHaveLength(1);
      expect(nodes.filter((n) => types(n).includes('WebSite'))).toHaveLength(1);
      const ids = nodes.map((n) => n['@id']);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("ogni rimando per @id porta a un nodo che c'e' nel grafo", () => {
      const ids = new Set(nodes.map((n) => n['@id']));
      walk(nodes, (key, v) => {
        if (
          v &&
          typeof v === 'object' &&
          !Array.isArray(v) &&
          Object.keys(v).length === 1 &&
          '@id' in (v as Node)
        ) {
          expect(ids.has((v as Node)['@id']), `${key} -> ${(v as Node)['@id']}`).toBe(true);
        }
      });
    });

    it('non dichiara valutazioni, recensioni, riconoscimenti o numeri che il sito non dimostra', () => {
      walk(nodes, (key, v) => {
        expect(FORBIDDEN_KEYS, `campo ${key}`).not.toContain(key);
        if (key === '@type')
          for (const t of [v].flat() as string[])
            expect(FORBIDDEN_TYPES, `tipo ${t}`).not.toContain(t);
      });
      for (const re of FORBIDDEN_TEXT) expect(text, String(re)).not.toMatch(re);
    });

    it("la pagina rimanda al sito e alla societa', e ha la sua briciola (tranne la home)", () => {
      const page = nodes.find((n) => String(n['@id']).endsWith('#webpage'))!;
      expect(page['isPartOf']).toEqual({ '@id': expect.stringContaining('#website') });
      expect(page['about']).toEqual({ '@id': ORG_ID });
      expect(page['name']).toBe(META.title);
      expect(page['description']).toBe(META.description);
      expect(page['dateModified']).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (path === '/') expect(find(nodes, 'BreadcrumbList')).toBeUndefined();
      else {
        const crumbs = find(nodes, 'BreadcrumbList')!['itemListElement'] as Node[];
        expect(crumbs.length).toBeGreaterThanOrEqual(2);
        expect(crumbs[0]['name']).toBe('Home');
        expect(crumbs.map((c) => c['position'])).toEqual(crumbs.map((_, i) => i + 1));
      }
    });
  });

  it("la societa' dichiara solo fatti del sito", () => {
    const org = find(graph('/'), 'Organization')!;
    expect(org['legalName']).toBe(COMPANY.legalName);
    expect(org['foundingDate']).toBe('2023');
    expect(org['vatID']).toBe(`IT${COMPANY.vat}`);
    expect(types(org)).toEqual(
      expect.arrayContaining(['Organization', 'ProfessionalService', 'LocalBusiness'])
    );
    expect(org['sameAs']).toEqual(socialLinks.map((l) => l.href));
    const places = (org['address'] as Node[]).map((a) => a['addressLocality']);
    expect(places).toEqual(['Mestre', 'Pordenone']);
    const names = (org['founder'] as Node[]).map((f) => f['name']);
    expect(names).toEqual(founders.map((f) => f.name));
    for (const n of names) expect(team.map((t) => t.name)).toContain(n);
  });

  it("ogni servizio ha il suo Service con la societa' come fornitore, e il FAQPage e' quello che la pagina mostra", () => {
    for (const s of serviceDetails) {
      const nodes = graph(`/servizi/${s.slug}`);
      const service = find(nodes, 'Service')!;
      expect(service['provider']).toEqual({ '@id': ORG_ID });
      expect(service['areaServed']).toBeTruthy();
      expect(service['serviceType']).toBe(s.category);
      // La pagina mostra tutte le domande del servizio; i dati strutturati le stesse, tranne quelle con cifre o impegni da confermare.
      const shown = serviceModel(s).faq?.items ?? [];
      expect(shown.map((f) => f.q)).toEqual(
        serviceFaqs.filter((f) => f.services.includes(s.slug)).map((f) => f.q)
      );
      const kept = serviceFaqs
        .filter((f) => f.services.includes(s.slug) && f.structured !== false)
        .map((f) => f.q);
      const declared = (find(nodes, 'FAQPage')!['mainEntity'] as Node[]).map((q) => [
        q['name'],
        (q['acceptedAnswer'] as Node)['text']
      ]);
      expect(declared).toEqual(shown.filter((f) => kept.includes(f.q)).map((f) => [f.q, f.a]));
    }
  });

  it("le pagine per citta', i servizi, il bando, i contatti e la home hanno il FAQPage; la domanda con cifre non dimostrabili resta fuori", () => {
    for (const path of [
      '/',
      '/servizi',
      '/agenzia-marketing-pordenone',
      '/agenzia-marketing-mestre',
      '/bando-intelligenza-artificiale-fvg-2026',
      '/contatti',
      '/buffr'
    ]) {
      expect(find(graph(path), 'FAQPage'), path).toBeDefined();
    }
    const home = JSON.stringify(find(graph('/'), 'FAQPage'));
    expect(home).toContain('Cosa fa Righello?');
    for (const q of [
      'Quali risultati posso aspettarmi?',
      'Quanto tempo ci vuole per vedere i primi risultati?',
      'Per quali settori lavora Righello?'
    ])
      expect(home).not.toContain(q);
  });

  it("ogni prodotto e' un'app o un lavoro nel modo giusto, e il link allo store c'e' solo dove l'app e' pubblicata", () => {
    for (const study of caseStudies) {
      const path = caseStudyHref(study);
      const nodes = graph(path);
      const app = find(nodes, 'SoftwareApplication');
      const work = find(nodes, 'CreativeWork');
      const software =
        ['app', 'gestionale', 'broadcast', 'piattaforma'].includes(study.kind) && !study.clientWork;
      expect(!!app, `${study.id} app`).toBe(software);
      expect(!!work, `${study.id} lavoro`).toBe(!software);
      const node = (app ?? work)!;
      expect(node['name']).toBe(study.name);
      expect(node['description']).toBe(study.seo.description);
      const published = study.status.tone === 'store';
      expect('installUrl' in node, `${study.id} installUrl`).toBe(published);
      expect('offers' in node, `${study.id} offers`).toBe(published);
      if (published) expect(node['installUrl']).toBe(study.storeUrl);
    }
    expect(JSON.stringify(graph('/progetti/neura'))).not.toContain('SoftwareApplication');
  });

  it("il sito di un cliente e' l'opera; un profilo social no", () => {
    expect(find(graph('/progetti/portopiccolo-apartments'), 'CreativeWork')!['url']).toBe(
      'https://www.portopiccoloapartments.com'
    );
    expect(find(graph('/progetti/reguta'), 'CreativeWork')!['url']).toBeUndefined();
  });

  it('i tipi di pagina sono quelli giusti', () => {
    const type = (path: string) =>
      find(graph(path), 'WebPage') ??
      graph(path).find((n) => String(n['@id']).endsWith('#webpage'))!;
    expect(type('/chi-siamo')['@type']).toBe('AboutPage');
    expect(type('/contatti')['@type']).toBe('ContactPage');
    expect(type('/progetti')['@type']).toBe('CollectionPage');
    expect(type('/servizi')['@type']).toBe('CollectionPage');
    expect(find(graph('/progetti'), 'ItemList')!['numberOfItems']).toBe(caseStudies.length);
  });
});
