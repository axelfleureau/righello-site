/**
 * Come si raggiunge Righello: l'unica sorgente per canali, tempi e sedi.
 * Le pagine (contatti, chi siamo, schede prodotto) leggono da qui e non riscrivono mai un recapito.
 */
import { env } from '$env/dynamic/public';
import { getCaseStudyBySlug, type CaseStudy, type ProjectKind } from './case-studies';

export const CONTACT = {
  email: 'hello@wearerighello.com',
  /** Numero WhatsApp in formato internazionale senza il "+" (e' quello gia' pubblico sul sito). */
  whatsapp: '393393998351',
  /**
   * Telefono per le chiamate: da inserire solo quando Axel conferma un numero pubblico.
   * Finche' e' `null` la pagina non mostra nessun "Chiamaci".
   */
  phone: null as string | null,
  /** Pagina di prenotazione di una chiamata (variabile PUBLIC_SCHEDULING_URL): se non c'e', il canale "Ti chiamiamo noi" porta al modulo. */
  schedulingUrl: (env.PUBLIC_SCHEDULING_URL || null) as string | null,
  /** Tempi di risposta e orari gia' dichiarati sul sito. */
  reply: 'entro 72 ore lavorative',
  hours: 'Lun - Ven: 9:00 - 18:00',
  legalSeat: 'Pordenone',
  office: 'Mestre - Venezia',
  street: 'Via Pio X 21, 30174 Mestre (VE)',
  /** Chi riceve i messaggi del modulo: i tre fondatori (vedi TEAM_EMAILS in api/contact/+server.ts). */
  recipients: 'i tre fondatori',
  privacyUrl: 'https://www.iubenda.com/privacy-policy/47301653',
} as const;

/** "+39 339 399 8351" a partire dal formato internazionale. */
export function formatPhone(international: string): string {
  const n = international.replace(/\D/g, '');
  if (n.startsWith('39') && n.length >= 11) return `+39 ${n.slice(2, 5)} ${n.slice(5, 8)} ${n.slice(8)}`;
  return `+${n}`;
}

export const whatsappHref = (text = 'Ciao, vorrei parlare di un progetto con Righello.') =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailHref = (subject = 'Vorrei parlare di un progetto') =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

/** Servizi del modulo: `value` e' cio' che arriva al team (resta quello di sempre), `label` cio' che legge chi scrive. */
export const CONTACT_TOPICS = [
  { value: 'Sviluppo Web & Software', label: 'Sito, app o software', slug: 'web' },
  { value: 'Marketing & Social Media', label: 'Social e contenuti', slug: 'marketing' },
  { value: 'Advertising & Automazione', label: 'Pubblicità e automazioni', slug: 'advertising' },
  { value: 'Progetto Completo', label: 'Un progetto completo', slug: 'completo' },
  { value: 'Altro', label: 'Altro', slug: 'altro' },
] as const;

export const CONTACT_BUDGETS = ['Meno di 5.000€', '5.000€ - 10.000€', '10.000€ - 25.000€', 'Oltre 25.000€', 'Da definire'] as const;

const topicByKind: Record<ProjectKind, (typeof CONTACT_TOPICS)[number]['value']> = {
  app: 'Sviluppo Web & Software',
  gestionale: 'Sviluppo Web & Software',
  broadcast: 'Sviluppo Web & Software',
  piattaforma: 'Sviluppo Web & Software',
  sito: 'Sviluppo Web & Software',
  contenuti: 'Marketing & Social Media',
};

/** Link a /contatti: con un prodotto di partenza il modulo si apre gia' sul suo tema (`?da=<id>`). */
export function contactHref(from?: Pick<CaseStudy, 'id'> | string | null): string {
  const id = typeof from === 'string' ? from : from?.id;
  return id ? `/contatti?da=${encodeURIComponent(id)}` : '/contatti';
}

/** Cio' che il modulo precompila a partire dall'indirizzo. Il parametro non viene mai scritto cosi' com'e': si accetta solo un id o uno slug noto. */
export function prefillFromQuery(params: URLSearchParams): { study: CaseStudy | null; topic: string; message: string } {
  const da = params.get('da');
  const study = da ? (getCaseStudyBySlug(da) ?? null) : null;
  const slug = params.get('servizio');
  const bySlug = CONTACT_TOPICS.find((t) => t.slug === slug);
  const topic = bySlug?.value ?? (study ? topicByKind[study.kind] : '');
  const message = study ? `Mi interessa un progetto simile a ${study.name}. ` : '';
  return { study, topic, message };
}
