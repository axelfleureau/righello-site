/**
 * Misura del percorso di contatto: clic sul pulsante -> apertura -> inizio -> invio.
 * Gli eventi partono solo se `window.gtag` esiste (lo definisce `app.html`) e non portano mai
 * dati personali: niente nome, email, telefono o testo del messaggio.
 */
type Param = string | number | boolean | undefined;
type Gtag = (command: 'event', name: string, params: Record<string, Param>) => void;

export type ContactOutcome = 'ok' | 'invalid' | 'rate' | 'unavailable' | 'offline' | 'timeout' | 'network' | 'error';

export function trackContact(name: string, params: Record<string, Param> = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== 'function') return;
  const clean: Record<string, Param> = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== '') clean[k] = v;
  try {
    gtag('event', name, clean);
  } catch {
    /* la misura non deve mai rompere il percorso */
  }
}

export const contactEvents = {
  /** Un pulsante verso il contatto e' stato toccato: `position` e' dove si trovava (testata, hero, piede, barra...). */
  ctaClick: (position: string, page: string) => trackContact('contact_cta_click', { position, page }),
  /** Il foglio (o la pagina) si e' aperto: `from` e' la scheda o il servizio di provenienza. */
  open: (surface: 'sheet' | 'page', position: string, from: string) => trackContact('contact_open', { surface, position, from }),
  /** Si e' iniziato a scrivere. */
  start: (surface: 'sheet' | 'page') => trackContact('contact_start', { surface }),
  /** L'invio e' finito: `outcome` dice come. */
  submit: (surface: 'sheet' | 'page', outcome: ContactOutcome, service: string) => trackContact('contact_submit', { surface, outcome, service }),
  /** Contatto andato a buon fine: l'evento di conversione standard di GA4. */
  lead: (surface: 'sheet' | 'page', service: string) => trackContact('generate_lead', { method: surface, service }),
};
