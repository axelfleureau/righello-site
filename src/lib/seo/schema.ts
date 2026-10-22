/**
 * Dati strutturati (JSON-LD) di ogni pagina pubblica, generati da una sola funzione: `jsonLdFor`.
 *
 * Le pagine non scrivono JSON-LD: lo aggiunge `hooks.server.ts` al HTML che parte dal server (cosi'
 * c'e' per chi non esegue JavaScript e non pesa sul codice che il browser scarica). Qui sta tutto cio'
 * che si dichiara, e ogni dato viene dalla sua sorgente unica:
 *   societa', sedi, aree, social  -> data/site.ts, data/contact.ts, data/team.ts
 *   servizi e loro domande        -> data/service-details.ts
 *   prodotti                      -> data/case-studies.ts
 *   domande delle altre pagine    -> data/faqs/ (le stesse che la pagina mostra)
 *
 * Regola: solo fatti che il sito puo' dimostrare. Niente valutazioni, recensioni, numeri di clienti
 * o progetti, riconoscimenti: un test lo verifica su ogni pagina.
 */
import {
  faqs as buffrFaqs,
  storeUrl as buffrStoreUrl,
  storeUrlUs as buffrStoreUrlUs
} from '../components/buffr/content';
import { officialSources } from '../data/bando';
import {
  caseStudies,
  caseStudyHref,
  getCaseStudyBySlug,
  kindLabels,
  type CaseStudy
} from '../data/case-studies';
import { CONTACT, CONTACT_HOURS } from '../data/contact';
import { bandoFaqs } from '../data/faqs/bando';
import { contactFaqs } from '../data/faqs/contact';
import { homeFaqs } from '../data/faqs/home';
import { mestreFaqs } from '../data/faqs/mestre';
import { pordenoneFaqs } from '../data/faqs/pordenone';
import type { Faq } from '../data/faqs/types';
import {
  faqsForService,
  localLandingLinks,
  serviceDetails,
  type ServiceDetail
} from '../data/service-details';
import { softwareHousePages, type SoftwareHousePage } from '../data/software-house';
import { COMPANY, OG_SIZE, SITE_URL, sameAs } from '../data/site';
import { AREAS_SERVED, COMPANY_SUMMARY, KNOWS_ABOUT, LEGAL_SEAT_REGION } from '../data/profile';
import { founders } from '../data/team';
import { lastModified } from './dates';
import { ogImageUrl } from './og';
import { sitePages } from './pages';

export type Node = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export interface PageMeta {
  /** Come l'ha scritto la pagina nel suo <head>: i dati strutturati non lo riscrivono. */
  title: string;
  description: string;
  image?: string;
}

const pageUrl = (path: string) => `${SITE_URL}${path}`;
const nodeId = (path: string, part: string) => `${pageUrl(path)}#${part}`;
const ref = (id: string) => ({ '@id': id });

function area(entry: { type: string; name: string }): Node {
  return { '@type': entry.type, name: entry.name };
}
const areas = (names?: string[]) =>
  AREAS_SERVED.filter((a) => !names || names.includes(a.name)).map(area);

// ---------------------------------------------------------------------------------------------
// La societa' e il sito: gli stessi due nodi in ogni pagina, mai duplicati.
// ---------------------------------------------------------------------------------------------

export function organization(): Node {
  const postal = (extra: Node): Node => ({
    '@type': 'PostalAddress',
    addressCountry: 'IT',
    ...extra
  });
  return {
    '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
    '@id': ORG_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    description: COMPANY_SUMMARY,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: `${SITE_URL}/logo-full.png`,
      width: 713,
      height: 176
    },
    image: ogImageUrl('/'),
    email: COMPANY.email,
    vatID: `IT${COMPANY.vat}`,
    foundingDate: COMPANY.founded,
    // La base operativa (con via e CAP) e la sede legale (di cui il sito dichiara solo la citta').
    address: [
      postal({
        streetAddress: COMPANY.street,
        postalCode: COMPANY.postalCode,
        addressLocality: COMPANY.city,
        addressRegion: COMPANY.region
      }),
      postal({ addressLocality: COMPANY.legalSeat, addressRegion: LEGAL_SEAT_REGION })
    ],
    areaServed: areas(),
    knowsAbout: [...KNOWS_ABOUT],
    // Cio' che si puo' chiedere a Righello: le quattro pagine di servizio e le due di software house (stesse pagine, stessi nomi).
    makesOffer: [
      ...serviceDetails.map((svc) => ({ name: svc.name, path: servicePath(svc) })),
      ...softwareHousePages.map((sh) => ({ name: sh.name, path: sh.path }))
    ].map((o) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: o.name, url: pageUrl(o.path) }
    })),
    sameAs,
    founder: founders.map((p) => ({ '@type': 'Person', name: p.name, jobTitle: p.role })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: CONTACT.email,
        availableLanguage: 'it',
        areaServed: 'IT',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [...CONTACT_HOURS.days],
          opens: CONTACT_HOURS.opens,
          closes: CONTACT_HOURS.closes
        }
      }
    ]
  };
}

export function webSite(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: COMPANY.name,
    alternateName: COMPANY.legalName,
    inLanguage: 'it-IT',
    publisher: ref(ORG_ID)
  };
}

// ---------------------------------------------------------------------------------------------
// Pezzi riusabili
// ---------------------------------------------------------------------------------------------

export function faqPage(path: string, faqs: Faq[]): Node | null {
  const items = faqs.filter((f) => f.structured !== false);
  if (!items.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': nodeId(path, 'faq'),
    url: pageUrl(path),
    inLanguage: 'it-IT',
    isPartOf: ref(nodeId(path, 'webpage')),
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  };
}

export function breadcrumb(path: string, trail: Array<{ name: string; path: string }>): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': nodeId(path, 'breadcrumb'),
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: pageUrl(c.path)
    }))
  };
}

export function itemList(path: string, items: Array<{ name: string; path: string }>): Node {
  return {
    '@type': 'ItemList',
    '@id': nodeId(path, 'list'),
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: pageUrl(it.path)
    }))
  };
}

// ---------------------------------------------------------------------------------------------
// Servizi
// ---------------------------------------------------------------------------------------------

const servicePath = (s: ServiceDetail) => `/servizi/${s.slug}`;

function serviceNode(s: ServiceDetail): Node {
  const path = servicePath(s);
  return {
    '@type': 'Service',
    '@id': nodeId(path, 'service'),
    name: s.name,
    serviceType: s.category,
    description: s.seo.description,
    url: pageUrl(path),
    provider: ref(ORG_ID),
    areaServed: areas(),
    mainEntityOfPage: ref(nodeId(path, 'webpage')),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: s.category,
      itemListElement: s.services.map((x) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: x.title, description: x.description }
      }))
    }
  };
}

/** Le pagine per citta': un servizio con la sua zona, che rimanda ai quattro servizi. */
const AGENCY_AREAS: Record<string, string[]> = {
  '/agenzia-marketing-pordenone': ['Pordenone', 'Friuli-Venezia Giulia'],
  '/agenzia-marketing-mestre': ['Mestre', 'Venezia', 'Veneto']
};

function agencyServiceNode(path: string, name: string): Node {
  return {
    '@type': 'Service',
    '@id': nodeId(path, 'service'),
    name,
    serviceType: 'Marketing digitale, advertising, siti web, software e agenti AI',
    url: pageUrl(path),
    provider: ref(ORG_ID),
    areaServed: areas(AGENCY_AREAS[path]),
    mainEntityOfPage: ref(nodeId(path, 'webpage')),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'I quattro servizi di Righello',
      itemListElement: serviceDetails.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': nodeId(servicePath(s), 'service'),
          name: s.name,
          url: pageUrl(servicePath(s))
        }
      }))
    }
  };
}

// ---------------------------------------------------------------------------------------------
// Prodotti e lavori
// ---------------------------------------------------------------------------------------------

/** App e software di Righello: tutto cio' che e' di tipo app, gestionale, regia o piattaforma, tranne il lavoro fatto per un cliente. */
const isSoftware = (s: CaseStudy) =>
  ['app', 'gestionale', 'broadcast', 'piattaforma'].includes(s.kind) && !s.clientWork;

const APP_CATEGORY: Record<string, string> = {
  buffr: 'MultimediaApplication',
  'buffr-live': 'SportsApplication',
  'regia-tv-studio': 'MultimediaApplication',
  'ch77-plus': 'EntertainmentApplication',
  canale77: 'EntertainmentApplication',
  rigcast: 'MultimediaApplication',
  'gusto-raffinato': 'LifestyleApplication',
  lumis: 'MultimediaApplication'
};

const OS_NAME: Record<string, string> = { iPhone: 'iOS', iPad: 'iPadOS', Web: 'Web' };

const absolute = (src: string) => (src.startsWith('http') ? src : `${SITE_URL}${src}`);

function softwareNode(study: CaseStudy, path: string): Node {
  const store = study.status.tone === 'store' ? study.storeUrl : undefined;
  const node: Node = {
    '@type': [
      'SoftwareApplication',
      ...(study.platform.some((p) => p === 'iPhone' || p === 'iPad') ? ['MobileApplication'] : [])
    ],
    '@id': nodeId(path, 'app'),
    name: study.name,
    description: study.seo.description,
    url: pageUrl(path),
    applicationCategory: APP_CATEGORY[study.id] ?? 'BusinessApplication',
    operatingSystem: study.platform.map((p) => OS_NAME[p] ?? p).join(', '),
    inLanguage: 'it-IT',
    image: absolute(study.image),
    author: ref(ORG_ID),
    publisher: ref(ORG_ID),
    mainEntityOfPage: ref(nodeId(path, 'webpage'))
  };
  const screens = study.stage?.screens?.slice(0, 4).map(absolute);
  if (screens?.length) node.screenshot = screens;
  // Il collegamento allo store solo se l'app e' davvero pubblicata; il prezzo solo dove il sito lo dichiara (BUFFR: "scaricarla e' gratis").
  if (store) {
    node.installUrl = store;
    node.downloadUrl = store;
    node.sameAs = [buffrStoreUrl, buffrStoreUrlUs];
    node.offers = {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: store
    };
  }
  return node;
}

function creativeWorkNode(study: CaseStudy, path: string): Node {
  const node: Node = {
    '@type': 'CreativeWork',
    '@id': nodeId(path, 'work'),
    name: study.name,
    description: study.seo.description,
    genre: kindLabels[study.kind],
    inLanguage: 'it-IT',
    image: absolute(study.image),
    creator: ref(ORG_ID),
    mainEntityOfPage: ref(nodeId(path, 'webpage'))
  };
  // Il sito del cliente e' l'opera: `url` solo se il lavoro e' un sito (non un profilo social).
  if (study.platform.includes('Web') && study.href?.startsWith('http')) node.url = study.href;
  return node;
}

// ---------------------------------------------------------------------------------------------
// Pagine «software house»
// ---------------------------------------------------------------------------------------------

function softwareHouseServiceNode(p: SoftwareHousePage): Node {
  return {
    '@type': 'Service',
    '@id': nodeId(p.path, 'service'),
    name: p.name,
    serviceType: 'Sviluppo di software su misura',
    description: p.seo.description,
    url: pageUrl(p.path),
    provider: ref(ORG_ID),
    areaServed: areas(p.areas),
    mainEntityOfPage: ref(nodeId(p.path, 'webpage')),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software, app e piattaforme su misura',
      itemListElement: p.scope.items.map((x) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: x.title }
      }))
    }
  };
}

/** Un lavoro dentro un elenco: l'app o l'opera com'e' descritta nella sua scheda, senza rimandi a nodi di un'altra pagina. */
function listedWork(study: CaseStudy): Node {
  const path = caseStudyHref(study);
  const node = isSoftware(study) ? softwareNode(study, path) : creativeWorkNode(study, path);
  // Nell'elenco basta il necessario per riconoscere l'opera (nome, tipo, indirizzo, stato dello store): il resto sta nella sua pagina.
  for (const key of ['mainEntityOfPage', 'screenshot', 'image', 'inLanguage', 'description', 'publisher']) delete node[key];
  return node;
}

/** Le schede che dimostrano la pagina, come elenco: i prodotti sono `SoftwareApplication` (il collegamento allo store solo per quelli pubblicati). */
function proofList(p: SoftwareHousePage): Node {
  const items = p.proof
    .map((it) => getCaseStudyBySlug(it.id))
    .filter((study): study is CaseStudy => !!study);
  return {
    '@type': 'ItemList',
    '@id': nodeId(p.path, 'list'),
    name: 'Lavori e prodotti che dimostrano la pagina',
    numberOfItems: items.length,
    itemListElement: items.map((study, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: pageUrl(caseStudyHref(study)),
      item: listedWork(study)
    }))
  };
}

/** Le pagine con una risposta in apertura pensata per essere letta ad alta voce o citata: titolo e primo paragrafo (`.sh__lead`). */
const SPEAKABLE_PATHS = new Set([...softwareHousePages.map((p) => p.path), '/servizi/agenti-ai']);
const SPEAKABLE = {
  '@type': 'SpeakableSpecification',
  cssSelector: ['#titolo-pagina', '.sh__lead']
};

// ---------------------------------------------------------------------------------------------
// Una pagina
// ---------------------------------------------------------------------------------------------

const BANDO_PATH = '/bando-intelligenza-artificiale-fvg-2026';

const TYPE_BY_PATH: Record<string, string> = {
  '/servizi': 'CollectionPage',
  '/progetti': 'CollectionPage',
  '/chi-siamo': 'AboutPage',
  '/contatti': 'ContactPage'
};

const STATIC_CRUMBS: Record<string, Array<{ name: string; path: string }>> = {
  '/servizi': [{ name: 'Servizi', path: '/servizi' }],
  '/progetti': [{ name: 'Progetti', path: '/progetti' }],
  '/buffr': [
    { name: 'Progetti', path: '/progetti' },
    { name: 'BUFFR', path: '/buffr' }
  ],
  '/chi-siamo': [{ name: 'Chi siamo', path: '/chi-siamo' }],
  '/contatti': [{ name: 'Contatti', path: '/contatti' }]
};

function trailFor(path: string): Array<{ name: string; path: string }> {
  if (STATIC_CRUMBS[path]) return STATIC_CRUMBS[path];
  const service = serviceDetails.find((s) => servicePath(s) === path);
  if (service)
    return [
      { name: 'Servizi', path: '/servizi' },
      { name: service.name, path }
    ];
  const software = softwareHousePages.find((p) => p.path === path);
  if (software)
    return [
      { name: 'Servizi', path: '/servizi' },
      { name: software.name, path }
    ];
  const local = localLandingLinks.find((l) => l.href === path);
  if (local)
    return [
      { name: 'Servizi', path: '/servizi' },
      { name: local.label, path }
    ];
  const study = caseStudies.find((s) => caseStudyHref(s) === path);
  if (study)
    return [
      { name: 'Progetti', path: '/progetti' },
      { name: study.name, path }
    ];
  return [];
}

/** I nodi propri di una pagina (oltre a societa' e sito). */
function nodesFor(path: string): Node[] {
  const faq = (faqs: Faq[]) => faqPage(path, faqs);
  const out: Array<Node | null> = [];

  if (path === '/') out.push(faq(homeFaqs));
  else if (path === '/servizi')
    out.push(
      itemList(
        path,
        serviceDetails.map((s) => ({ name: s.name, path: servicePath(s) }))
      ),
      faq(faqsForService())
    );
  else if (path === '/progetti')
    out.push(
      itemList(
        path,
        caseStudies.map((s) => ({ name: s.name, path: caseStudyHref(s) }))
      )
    );
  else if (path === '/contatti') out.push(faq(contactFaqs));
  else if (path === BANDO_PATH) out.push(faq(bandoFaqs));
  else if (path === '/agenzia-marketing-mestre' || path === '/agenzia-marketing-pordenone') {
    const label = localLandingLinks.find((l) => l.href === path)!.label;
    out.push(
      agencyServiceNode(path, label),
      faq(path === '/agenzia-marketing-mestre' ? mestreFaqs : pordenoneFaqs)
    );
  } else if (path === '/buffr') {
    out.push(softwareNode(getCaseStudyBySlug('buffr')!, path), faq(buffrFaqs));
  } else if (softwareHousePages.some((p) => p.path === path)) {
    const sh = softwareHousePages.find((p) => p.path === path)!;
    out.push(softwareHouseServiceNode(sh), proofList(sh), faq(sh.faqs));
  } else {
    const service = serviceDetails.find((s) => servicePath(s) === path);
    const study = caseStudies.find((s) => caseStudyHref(s) === path);
    if (service) out.push(serviceNode(service), faq(faqsForService(service.slug)));
    else if (study)
      out.push(isSoftware(study) ? softwareNode(study, path) : creativeWorkNode(study, path));
  }
  return out.filter((n): n is Node => !!n);
}

/** La pagina pubblica: nome e descrizione sono quelli che la pagina mostra nel suo <head>. */
function webPage(path: string, meta: PageMeta, main: Node[]): Node {
  const image = meta.image ?? ogImageUrl(path);
  const entity = main.find((n) =>
    ['Service', 'SoftwareApplication', 'CreativeWork', 'ItemList'].some((t) =>
      [n['@type']].flat().includes(t)
    )
  );
  return {
    '@type': TYPE_BY_PATH[path] ?? 'WebPage',
    '@id': nodeId(path, 'webpage'),
    url: pageUrl(path),
    name: meta.title,
    description: meta.description,
    inLanguage: 'it-IT',
    isPartOf: ref(WEBSITE_ID),
    about: ref(ORG_ID),
    primaryImageOfPage: { '@type': 'ImageObject', url: image, ...OG_SIZE },
    ...(path === '/' ? {} : { breadcrumb: ref(nodeId(path, 'breadcrumb')) }),
    ...(lastModified(path) ? { dateModified: lastModified(path) } : {}),
    ...(path === BANDO_PATH ? { citation: officialSources.map((s) => s.href) } : {}),
    ...(SPEAKABLE_PATHS.has(path) ? { speakable: SPEAKABLE } : {}),
    ...(path === '/chi-siamo'
      ? { mainEntity: ref(ORG_ID) }
      : entity
        ? { mainEntity: ref(entity['@id'] as string) }
        : {})
  };
}

/** Tutti i nodi di una pagina pubblica; `null` per le pagine che non lo sono (area riservata, errori). */
export function graphFor(path: string, meta: PageMeta): Node[] | null {
  if (!sitePages.some((p) => p.path === path)) return null;
  const own = nodesFor(path);
  return [
    organization(),
    webSite(),
    webPage(path, meta, own),
    ...(path === '/' ? [] : [breadcrumb(path, trailFor(path))]),
    ...own
  ];
}

/** Il testo del tag <script type="application/ld+json">: una sola riga, sicura dentro il HTML. */
export function jsonLdFor(path: string, meta: PageMeta): string | null {
  const graph = graphFor(path, meta);
  if (!graph) return null;
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
