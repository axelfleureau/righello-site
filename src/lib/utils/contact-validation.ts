/**
 * Controlli del modulo contatti, uguali o piu' severi di quelli del server (api/contact/+server.ts):
 * il server vuole nome, email con "@", almeno 6 cifre di telefono e un messaggio.
 * Ogni errore dice cosa fare, non solo che c'e' un errore.
 */
export interface ContactFields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

/** Ordine in cui i campi compaiono nel modulo: il primo sbagliato prende il focus. */
export const FIELD_ORDER: Array<keyof ContactFields> = ['name', 'email', 'phone', 'message'];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: keyof ContactFields, raw: string): string {
  const value = raw.trim();
  switch (field) {
    case 'name':
      return value.length === 0 ? 'Scrivi il tuo nome, così sappiamo come chiamarti.' : '';
    case 'email':
      if (value.length === 0) return 'Scrivi la tua email: è lì che ti rispondiamo.';
      if (!value.includes('@')) return 'Manca la chiocciola. Esempio: nome@azienda.it';
      if (!EMAIL.test(value)) return 'Controlla l’email: dopo la chiocciola serve un dominio, per esempio azienda.it';
      return '';
    case 'phone': {
      if (value.length === 0) return 'Scrivi un numero di telefono: serve per fissare la chiamata.';
      if (/[^\d+\s().\-\/]/.test(value)) return 'Nel telefono vanno solo numeri. Esempio: +39 333 123 4567';
      if (value.replace(/\D/g, '').length < 6) return 'Il numero sembra troppo corto. Aggiungi il prefisso, per esempio +39 333 123 4567';
      return '';
    }
    case 'message':
      return value.length === 0 ? 'Raccontaci in due righe cosa ti serve.' : '';
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
  email: 'Email',
  phone: 'Telefono',
  message: 'Messaggio',
};
