/**
 * Come si raggiunge Righello: l'unica sorgente per canali, tempi e sedi.
 * Le pagine (contatti, chi siamo, schede prodotto) leggono da qui e non riscrivono mai un recapito.
 */
import { env } from '$env/dynamic/public';
import { COMPANY, PRIVACY_URL } from './site';
import type { CaseStudy } from './case-studies';

/** Giorni e ore in cui si risponde (la riga `CONTACT.hours` si ricava da qui; i dati strutturati la leggono cosi'). */
export const CONTACT_HOURS = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  opens: '09:00',
  closes: '18:00',
} as const;

export const CONTACT = {
  email: COMPANY.email,
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
  hours: `Lun - Ven: ${CONTACT_HOURS.opens.replace(/^0/, '')} - ${CONTACT_HOURS.closes}`,
  legalSeat: COMPANY.legalSeat,
  office: COMPANY.operationsBase,
  street: `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city} (VE)`,
  /** Chi riceve i messaggi del modulo: i tre fondatori (vedi TEAM_EMAILS in api/contact/+server.ts). */
  recipients: 'i tre fondatori',
  privacyUrl: PRIVACY_URL,
} as const;

/** "+39 339 399 8351" a partire dal formato internazionale. */
export function formatPhone(international: string): string {
  const n = international.replace(/\D/g, '');
  if (n.startsWith('39') && n.length >= 11) return `+39 ${n.slice(2, 5)} ${n.slice(5, 8)} ${n.slice(8)}`;
  return `+${n}`;
}

export const whatsappHref = (text = 'Ciao, vorrei parlare di un progetto con Righello.') =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

/** Con `body` il testo e' gia' scritto: serve quando l'invio dal sito non e' riuscito e si ripiega sulla posta. */
export const mailHref = (subject = 'Vorrei parlare di un progetto', body = '') =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

/** Servizi del modulo: `value` e' cio' che arriva al team (resta quello di sempre), `label` cio' che legge chi scrive. */
export const CONTACT_TOPICS = [
  { value: 'Sviluppo Web & Software', label: 'Sito, app o software', slug: 'web' },
  { value: 'Marketing & Social Media', label: 'Social e contenuti', slug: 'marketing' },
  { value: 'Advertising & Automazione', label: 'Pubblicità e automazioni', slug: 'advertising' },
  { value: 'Progetto Completo', label: 'Un progetto completo', slug: 'completo' },
  { value: 'Altro', label: 'Altro', slug: 'altro' },
] as const;

export const CONTACT_BUDGETS = ['Meno di 5.000€', '5.000€ - 10.000€', '10.000€ - 25.000€', 'Oltre 25.000€', 'Da definire'] as const;

/**
 * Un link verso /contatti e' un pulsante che apre il foglio. Il "Contatti" dei menu e' invece una voce di navigazione:
 * porta alla pagina, che ha anche sedi, orari e domande frequenti. Si dichiara con questo attributo.
 */
export const pageLink = (href: string) => (href === '/contatti' ? 'page' : undefined);

/** Link a /contatti: con un prodotto di partenza il modulo si apre gia' sul suo tema (`?da=<id>`). */
export function contactHref(from?: Pick<CaseStudy, 'id'> | string | null): string {
  const id = typeof from === 'string' ? from : from?.id;
  return id ? `/contatti?da=${encodeURIComponent(id)}` : '/contatti';
}
