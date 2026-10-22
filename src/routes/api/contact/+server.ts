import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { clientKey } from '$lib/server/contact-guard';
import { contactState, createContactDeps } from '$lib/server/contact-runtime';
import { handleContact } from '$lib/server/contact-service';
import { LIMITS } from '$lib/server/contact-validation';

/**
 * Modulo contatti (foglio sopra ogni pagina, pagina /contatti, pagina del bando). Contratto, ordine delle
 * operazioni, anti-spam, variabili d'ambiente e recupero dai log: docs/contatto.md.
 * Qui solo la parte HTTP: leggere il corpo, dare un indirizzo al limite, rispondere.
 */
export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const invalid = (error: string) => json({ success: false, code: 'invalid', error, fields: {} }, { status: 400 });

  let data: unknown;
  try {
    const text = await request.text();
    if (text.length > LIMITS.body) return invalid('La richiesta è troppo grande. Accorcia il messaggio e riprova.');
    data = JSON.parse(text);
  } catch {
    return invalid('La richiesta non è leggibile. Ricarica la pagina e riprova.');
  }

  const outcome = await handleContact(data, { ip: clientKey(request.headers, getClientAddress) }, createContactDeps(), contactState);
  return json(outcome.body, { status: outcome.status, headers: { 'Cache-Control': 'no-store', ...outcome.headers } });
};
