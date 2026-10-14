/**
 * Le immagini di condivisione: una per pagina pubblica, 1200 x 630, in `static/og/`.
 *
 * Qui si decide cosa dice ogni immagine (titolo, riga di nota, foto vera del prodotto): lo script
 * `scripts/og-images.ts` legge questo elenco e le disegna con `scripts/og-images.py`;
 * le pagine leggono l'indirizzo da `og.ts`. Una pagina nuova in `pages.ts` deve avere la sua carta
 * (qui sotto) e il suo file: un test avvisa se manca.
 */
import { caseStudies, caseStudyHref, kindLabels, type CaseStudy } from '../data/case-studies';
import { serviceDetails, agencyAccent } from '../data/service-details';
import { COMPANY } from '../data/site';
import { ogKey } from './og';
import { sitePages } from './pages';

export interface OgCard {
  path: string;
  /** Nome del file in `static/og/`. */
  file: string;
  kicker: string;
  title: string;
  note?: string;
  /** Foto vera del prodotto (percorso dentro `static/`), se la pagina ne ha una. */
  image?: string;
  accent: [string, string];
}

const BRAND_SUFFIX = / \| Righello$/;
const place = 'Pordenone · Mestre';

type Fixed = Omit<OgCard, 'path' | 'file'>;

/** Le pagine che non nascono da un elenco di dati. */
const FIXED: Record<string, Fixed> = {
  '/': {
    kicker: 'Righello',
    title: 'Agenzia marketing a Pordenone e Mestre',
    note: 'Social, advertising, siti web, software e agenti AI',
    accent: agencyAccent
  },
  '/servizi': {
    kicker: 'Servizi',
    title: 'Quattro servizi, un solo team',
    note: 'Marketing e social media, advertising, siti web e software, agenti AI',
    accent: agencyAccent
  },
  '/agenzia-marketing-pordenone': {
    kicker: 'Agenzia',
    title: 'Agenzia marketing a Pordenone',
    note: 'Social, advertising, siti web e agenti AI per le aziende del Friuli-Venezia Giulia',
    accent: agencyAccent
  },
  '/agenzia-marketing-mestre': {
    kicker: 'Agenzia',
    title: 'Agenzia marketing a Mestre',
    note: 'Marketing, SEO locale, advertising e siti web per le aziende di Venezia e del Veneto',
    accent: agencyAccent
  },
  '/bando-intelligenza-artificiale-fvg-2026': {
    kicker: 'Guida',
    title: 'Bando AI FVG 2026',
    note: 'Requisiti, contributo e documenti, per le imprese del Friuli-Venezia Giulia',
    accent: agencyAccent
  },
  '/progetti': {
    kicker: 'Progetti',
    title: 'App, gestionali, regia delle partite e siti',
    note: 'Quello che abbiamo costruito, con lo stato vero di ognuno',
    accent: agencyAccent
  },
  '/chi-siamo': {
    kicker: 'Chi siamo',
    title: 'Studio digitale tra Pordenone e Mestre',
    note: `Prodotti nostri e software su misura, dal ${COMPANY.founded}`,
    accent: agencyAccent
  },
  '/contatti': {
    kicker: 'Contatti',
    title: 'Parliamo del tuo progetto',
    note: 'WhatsApp, email o modulo: rispondiamo entro 72 ore lavorative',
    accent: agencyAccent
  }
};

const studyOf = (path: string): CaseStudy | undefined =>
  caseStudies.find((s) => caseStudyHref(s) === path);

function fixedFor(path: string): Fixed {
  if (FIXED[path]) return FIXED[path];
  const service = serviceDetails.find((s) => `/servizi/${s.slug}` === path);
  if (service) {
    const title = service.seo.title.replace(BRAND_SUFFIX, '');
    return { kicker: 'Servizi', title, note: place, accent: service.accent };
  }
  const study = studyOf(path);
  if (study) {
    return {
      kicker: kindLabels[study.kind],
      title: study.name,
      note: study.status.label,
      image: `static${study.image}`,
      accent: study.accent
    };
  }
  throw new Error(
    `manca la carta di condivisione per ${path}: aggiungila in src/lib/seo/og-cards.ts`
  );
}

export const ogCards: OgCard[] = sitePages.map(({ path }) => ({
  path,
  file: `${ogKey(path)}.jpg`,
  ...fixedFor(path)
}));
