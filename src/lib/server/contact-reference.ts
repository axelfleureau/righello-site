import { createHash } from 'node:crypto';

/** 32 simboli senza ambigui (niente 0/O/1/I): si dettano al telefono e si leggono su WhatsApp senza errori. */
export const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const REFERENCE_PATTERN = /^RH-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/;

/**
 * Codice di riferimento del contatto, `RH-` + 6 simboli, derivato dall'id della richiesta:
 * stesso id = stesso codice (il client puo' ripetere l'invio e il codice non cambia).
 * 32^6 = oltre un miliardo di codici: con migliaia di contatti l'anno una collisione e' trascurabile.
 */
export function referenceFor(requestId: string): string {
  const digest = createHash('sha256').update(`righello-contact:${requestId}`).digest();
  let out = '';
  for (let i = 0; i < 6; i++) out += REFERENCE_ALPHABET[digest[i] % 32];
  return `RH-${out}`;
}
