/**
 * Le pagine pubbliche del sito, in un punto solo: la mappa del sito, `llms.txt`, l'audit e le
 * immagini di condivisione leggono tutte da qui. Aggiungere una pagina si fa una volta.
 *
 * `sources` dice da quali file dipende il contenuto della pagina: lo script `scripts/page-dates.ts`
 * ne legge l'ultima modifica in git e scrive `page-dates.json`, da cui viene il `lastmod` vero.
 */
import { caseStudies, caseStudyHref, type CaseStudy } from '../data/case-studies';
import { serviceDetails, type ServiceDetail } from '../data/service-details';
import { softwareHouseLinks } from '../data/site';

/** Un file intero, oppure solo il blocco di un elemento dentro un file di dati (si cerca la riga d'apertura). */
export type Source = string | { file: string; opens: string };

export interface SitePage {
  path: string;
  priority: string;
  changefreq: 'weekly' | 'monthly';
  sources: Source[];
}

const SERVICE_DATA = 'src/lib/data/service-details.ts';
const CASE_DATA = 'src/lib/data/case-studies.ts';
const SOFTWARE_DATA = 'src/lib/data/software-house.ts';

const STATIC_PAGES: SitePage[] = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    sources: ['src/routes/+page.svelte', 'src/lib/components/FAQ.svelte', 'src/lib/components/home']
  },
  {
    path: '/servizi',
    priority: '0.9',
    changefreq: 'monthly',
    sources: ['src/routes/servizi/+page.svelte', SERVICE_DATA]
  },
  {
    path: '/buffr',
    priority: '0.95',
    changefreq: 'weekly',
    sources: [
      'src/routes/buffr/+page.svelte',
      'src/lib/components/buffr/content.ts',
      { file: CASE_DATA, opens: "id: 'buffr'," }
    ]
  },
  {
    path: '/bando-intelligenza-artificiale-fvg-2026',
    priority: '0.9',
    changefreq: 'weekly',
    sources: ['src/routes/bando-intelligenza-artificiale-fvg-2026/+page.svelte']
  },
  {
    path: '/agenzia-marketing-pordenone',
    priority: '0.9',
    changefreq: 'monthly',
    sources: ['src/routes/agenzia-marketing-pordenone/+page.svelte', SERVICE_DATA]
  },
  {
    path: '/agenzia-marketing-mestre',
    priority: '0.95',
    changefreq: 'weekly',
    sources: ['src/routes/agenzia-marketing-mestre/+page.svelte', SERVICE_DATA]
  },
  {
    path: '/progetti',
    priority: '0.9',
    changefreq: 'weekly',
    sources: ['src/routes/progetti/+page.svelte', CASE_DATA]
  },
  {
    path: '/chi-siamo',
    priority: '0.8',
    changefreq: 'monthly',
    sources: ['src/routes/chi-siamo/+page.svelte', 'src/lib/data/team.ts']
  },
  {
    path: '/contatti',
    priority: '0.8',
    changefreq: 'monthly',
    sources: ['src/routes/contatti/+page.svelte', 'src/lib/data/contact.ts']
  }
];

export const servicePath = (service: ServiceDetail) => `/servizi/${service.slug}`;

const servicePages = (): SitePage[] =>
  serviceDetails.map((s) => ({
    path: servicePath(s),
    priority: '0.85',
    changefreq: 'monthly',
    sources: [{ file: SERVICE_DATA, opens: `slug: '${s.slug}',` }]
  }));

/** Le due pagine «software house»: indirizzi da `site.ts`, contenuto da `software-house.ts` (un blocco per sede). */
const softwareHouseSitePages = (): SitePage[] =>
  softwareHouseLinks.map((l) => ({
    path: l.href,
    priority: '0.9',
    changefreq: 'monthly',
    sources: [{ file: SOFTWARE_DATA, opens: `zone: '${l.zone}',` }]
  }));

/** BUFFR e' escluso: la sua pagina e' `/buffr`, gia' fra quelle fisse. */
const projectPages = (): SitePage[] =>
  caseStudies
    .filter((s: CaseStudy) => s.id !== 'buffr')
    .map((s) => ({
      path: caseStudyHref(s),
      priority: '0.7',
      changefreq: 'monthly',
      sources: [{ file: CASE_DATA, opens: `id: '${s.id}',` }, `src/lib/data/landing/${s.id}.ts`]
    }));

export const sitePages: SitePage[] = [
  ...STATIC_PAGES,
  ...servicePages(),
  ...softwareHouseSitePages(),
  ...projectPages()
];
