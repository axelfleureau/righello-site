/**
 * Controlli del modulo contatti, uguali o piu' severi di quelli del server (api/contact/+server.ts).
 * Il contratto: il nome serve, e basta UN recapito (email OPPURE telefono: almeno 6 cifre);
 * il messaggio e' facoltativo. Ogni errore dice cosa fare, non solo che c'e' un errore.
 */
export interface ContactFields {
  name: string;
  /** Un solo campo per il recapito: se c'e' una chiocciola e' un'email, altrimenti un telefono. */
  contact: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

/** Ordine in cui i campi compaiono nel modulo: il primo sbagliato prende il focus. */
export const FIELD_ORDER: Array<keyof ContactFields> = ['name', 'contact', 'message'];

export const NAME_MAX = 120;
export const MESSAGE_MAX = 4000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ParsedContact = { kind: 'email'; email: string } | { kind: 'phone'; phone: string };

/** Il recapito scritto, riconosciuto: `null` se non e' ne' un'email ne' un telefono validi. */
export function parseContact(raw: string): ParsedContact | null {
  const value = raw.trim();
  if (EMAIL.test(value)) return { kind: 'email', email: value };
  if (!value.includes('@') && !/[^\d+\s().\-/]/.test(value) && value.replace(/\D/g, '').length >= 6 && value.length <= 30) {
    return { kind: 'phone', phone: value };
  }
  return null;
}

export function validateContact(raw: string): string {
  const value = raw.trim();
  if (value.length === 0) return 'Lascia un’email o un numero di telefono: è lì che ti rispondiamo.';
  if (value.includes('@')) {
    if (value.length > 254) return 'L’email è troppo lunga: controlla di averla scritta giusta.';
    if (!EMAIL.test(value)) return 'Controlla l’email: dopo la chiocciola serve un dominio, per esempio azienda.it';
    return '';
  }
  if (/[a-z]/i.test(value)) return 'Per l’email serve la chiocciola (nome@azienda.it); nel telefono vanno solo numeri.';
  if (/[^\d+\s().\-/]/.test(value)) return 'Nel telefono vanno solo numeri. Esempio: +39 333 123 4567';
  if (value.replace(/\D/g, '').length < 6) return 'Il numero sembra troppo corto. Aggiungi il prefisso, per esempio +39 333 123 4567';
  if (value.length > 30) return 'Il numero è troppo lungo: controlla di averlo scritto giusto.';
  return '';
}

export function validateField(field: keyof ContactFields, raw: string): string {
  switch (field) {
    case 'name': {
      const value = raw.trim();
      if (value.length === 0) return 'Scrivi il tuo nome, così sappiamo come chiamarti.';
      if (value.length > NAME_MAX) return `Il nome è troppo lungo (massimo ${NAME_MAX} caratteri).`;
      return '';
    }
    case 'contact':
      return validateContact(raw);
    case 'message':
      return raw.trim().length > MESSAGE_MAX ? `Il messaggio è troppo lungo (massimo ${MESSAGE_MAX} caratteri): accorcialo o scrivici via email.` : '';
  }
}

export function validateAll(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of FIELD_ORDER) {
    const message = validateField(field, fields[field]);
    if (message) errors[field] = message;
  }
  return errors;
}

/** Etichetta del campo nell'elenco "Controlla questi campi". */
export const FIELD_LABEL: Record<keyof ContactFields, string> = {
  name: 'Nome',
  contact: 'Email o telefono',
  message: 'Messaggio',
};
