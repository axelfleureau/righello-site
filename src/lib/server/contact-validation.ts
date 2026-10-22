/**
 * Validazione e normalizzazione di cio' che arriva a `POST /api/contact` (contratto in docs/contatto.md).
 *
 * - Recapito: email OPPURE telefono, almeno uno, valido. Se un recapito e' scritto ma sbagliato lo si segnala
 *   (chi sbaglia l'email si aspetta la copia della richiesta: meglio dirglielo che perderla).
 * - Messaggio facoltativo (max 4000).
 * - Tutto cio' che finisce in un oggetto di email o in un link e' su una riga sola, senza caratteri di controllo
 *   (CR/LF compresi: niente iniezione di intestazioni) e senza caratteri che invertono il verso del testo.
 * - Il server NON si fida del client: i limiti qui sono quelli che contano.
 */
import type { ContactForm, ContactSource } from './email-templates';

export const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  company: 120,
  service: 120,
  budget: 120,
  message: 4000,
  requestId: 80,
  path: 200,
  cta: 60,
  from: 80,
  referrer: 200,
  utm: 80,
  body: 32_000,
} as const;

/** Cio' che il server accetta e usa, gia' normalizzato. `reference` lo aggiunge chi invia. */
export type ContactInput = Omit<ContactForm, 'reference'>;

export interface ContactRequestMeta {
  requestId: string;
  hp: string;
  openedAt: number | null;
}

export type ValidationResult =
  | { ok: true; input: ContactInput; meta: ContactRequestMeta }
  | { ok: false; error: string; fields: { name?: string; contact?: string; message?: string } };

const EMAIL = /^[^\s@,;<>()"[\]\\]+@[^\s@,;<>()"[\]\\]+\.[^\s@,;<>()"[\]\\]{2,}$/;
const REQUEST_ID = /^[A-Za-z0-9_-]{8,80}$/;
// Controllo, separatori di riga/paragrafo, zero-width, segni che invertono il verso (testo "specchiato" nelle intestazioni).
const INVISIBLE = /[\u0000-\u001F\u007F-\u009F\u2028\u2029\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g;

/** Una riga sola: niente a capo, niente caratteri di controllo, spazi compattati. */
export function oneLine(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.normalize('NFC').replace(INVISIBLE, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Testo libero: si tengono i paragrafi, si tolgono i caratteri di controllo e i rientri a fine riga. */
export function multiLine(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(/[\t\u000B\u000C]/g, ' ')
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F-\u009F\u2028\u2029\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g, '')
    .split('\n')
    .map((line) => line.replace(/[ ]+$/g, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function isValidEmail(email: string): boolean {
  return email.length <= LIMITS.email && EMAIL.test(email);
}

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

/** Telefono valido = almeno 6 cifre, al massimo 15 (E.164), niente lettere. Si accettano + spazi ( ) . - /. */
export function isValidPhone(phone: string): boolean {
  if (!phone || /[^\d+\s().\-/]/.test(phone)) return false;
  const digits = phoneDigits(phone).length;
  return digits >= 6 && digits <= 15;
}

/**
 * Numero in formato internazionale senza "+" (per WhatsApp), solo se si puo' dire con sicurezza:
 * "+39 333..." e "0039 333..." si leggono da soli; un cellulare italiano senza prefisso (3xx, 9-10 cifre) prende 39.
 * Altro (fissi, numeri esteri senza prefisso): `null`, nessun link WhatsApp da inventare.
 */
export function internationalDigits(phone: string): string | null {
  const digits = phoneDigits(phone);
  if (!digits) return null;
  const trimmed = phone.trim();
  if (trimmed.startsWith('+')) return digits.length >= 8 ? digits : null;
  if (digits.startsWith('00')) return digits.length >= 10 ? digits.slice(2) : null;
  if (/^3\d{8,9}$/.test(digits)) return `39${digits}`;
  return null;
}

export function telHref(phone: string): string {
  const digits = phoneDigits(phone);
  return `tel:${phone.trim().startsWith('+') ? '+' : ''}${digits}`;
}

function sanitizeSource(raw: unknown): ContactSource | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const s = raw as Record<string, unknown>;
  let path = oneLine(s.path, LIMITS.path);
  // Il percorso e' un percorso del sito (mai un indirizzo intero): si tiene solo quello che comincia con "/".
  if (!path.startsWith('/')) path = '';
  const out: ContactSource = { path };
  const cta = oneLine(s.cta, LIMITS.cta);
  const from = oneLine(s.from, LIMITS.from);
  const referrer = oneLine(s.referrer, LIMITS.referrer);
  if (cta) out.cta = cta;
  if (from) out.from = from;
  if (referrer) out.referrer = referrer;
  if (s.utm && typeof s.utm === 'object') {
    const u = s.utm as Record<string, unknown>;
    const utm: NonNullable<ContactSource['utm']> = {};
    for (const key of ['source', 'medium', 'campaign', 'term', 'content'] as const) {
      const v = oneLine(u[key], LIMITS.utm);
      if (v) utm[key] = v;
    }
    if (Object.keys(utm).length) out.utm = utm;
  }
  return out.path || out.cta || out.from || out.referrer || out.utm ? out : undefined;
}

const CONTACT_MISSING = 'Lasciaci un recapito: basta un’email oppure un numero di telefono.';

export function validateContact(data: unknown): ValidationResult {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { ok: false, error: 'La richiesta non è leggibile. Ricarica la pagina e riprova.', fields: {} };
  }
  const d = data as Record<string, unknown>;

  const rawName = typeof d.name === 'string' ? d.name : '';
  const name = oneLine(rawName, LIMITS.name + 1);
  if (!name) return { ok: false, error: 'Scrivi il tuo nome, così sappiamo come chiamarti.', fields: { name: 'Scrivi il tuo nome, così sappiamo come chiamarti.' } };
  if (name.length > LIMITS.name) {
    const error = `Il nome è troppo lungo: al massimo ${LIMITS.name} caratteri.`;
    return { ok: false, error, fields: { name: error } };
  }

  let email = oneLine(d.email, LIMITS.email + 1);
  if (email) {
    const at = email.lastIndexOf('@');
    if (at > 0) email = `${email.slice(0, at)}@${email.slice(at + 1).toLowerCase()}`;
  }
  const phone = oneLine(d.phone, LIMITS.phone + 1);

  if (!email && !phone) return { ok: false, error: CONTACT_MISSING, fields: { contact: CONTACT_MISSING } };
  if (email && !isValidEmail(email)) {
    const error = 'Controlla l’email: serve una chiocciola e un dominio, per esempio nome@azienda.it';
    return { ok: false, error, fields: { contact: error } };
  }
  if (phone && !isValidPhone(phone)) {
    const error = 'Controlla il telefono: servono da 6 a 15 cifre, con il prefisso se è estero (esempio +39 333 123 4567).';
    return { ok: false, error, fields: { contact: error } };
  }

  const message = multiLine(d.message);
  if (message.length > LIMITS.message) {
    const error = `Il messaggio è troppo lungo: al massimo ${LIMITS.message} caratteri.`;
    return { ok: false, error, fields: { message: error } };
  }

  const requestIdRaw = typeof d.requestId === 'string' ? d.requestId.trim() : '';
  const openedAt = typeof d.openedAt === 'number' && Number.isFinite(d.openedAt) ? d.openedAt : null;

  const source = sanitizeSource(d.source);
  const input: ContactInput = {
    name,
    email,
    phone,
    company: oneLine(d.company, LIMITS.company),
    service: oneLine(d.service, LIMITS.service),
    budget: oneLine(d.budget, LIMITS.budget),
    message,
    ...(source ? { source } : {}),
  };

  return {
    ok: true,
    input,
    meta: {
      // Senza un id valido (pagine che non lo mandano ancora) se ne crea uno al momento: nessuna idempotenza, ma il contatto passa.
      requestId: REQUEST_ID.test(requestIdRaw) ? requestIdRaw : '',
      // La trappola scatta con qualunque valore diverso da "assente/vuoto" (un bot puo' mandare anche numeri o oggetti).
      hp: d.hp === undefined || d.hp === null || d.hp === '' || d.hp === false ? '' : String(d.hp) || '1',
      openedAt,
    },
  };
}
