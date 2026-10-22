/**
 * Un ascoltatore dei clic, montato una volta nel layout, che trasforma OGNI link verso /contatti
 * in "apri il foglio": nessun pulsante esistente cambia aspetto o testo, cambia solo cosa succede.
 *
 * Restano link normali (la pagina si apre davvero):
 *  - i link marcati `data-contact-link="page"`;
 *  - i clic con cmd/ctrl/maiusc/alt o col tasto centrale (aprire in un'altra scheda);
 *  - i link con `target` diverso da questa scheda o `download`;
 *  - quelli che puntano a un altro sito;
 *  - ogni link mentre si e' gia' su /contatti.
 * Senza JavaScript il link `/contatti` funziona com'e' sempre.
 */
import type { ContactContext } from '$lib/data/contact-prefill';

/** Cosa dichiara un indirizzo di contatto (`/contatti?da=tetha&servizio=web`); `null` se non e' un link di contatto. */
export function parseContactHref(href: string, base: string): { from?: string; service?: string } | null {
  let url: URL;
  let origin: URL;
  try {
    origin = new URL(base);
    url = new URL(href, origin);
  } catch {
    return null;
  }
  if (url.origin !== origin.origin) return null;
  if ((url.pathname.replace(/\/$/, '') || '/') !== '/contatti') return null;
  const from = url.searchParams.get('da') ?? undefined;
  const service = url.searchParams.get('servizio') ?? undefined;
  return { from: from?.slice(0, 80), service: service?.slice(0, 40) };
}

export interface InterceptOptions {
  open: (ctx: ContactContext, trigger: HTMLElement) => void;
  /** Un pulsante di contatto e' stato sfiorato, toccato o raggiunto da tastiera: tempo di scaricare la parte pesante. */
  warm: () => void;
}

const isContactAnchor = (a: HTMLAnchorElement | null): a is HTMLAnchorElement =>
  !!a && a.hasAttribute('href') && a.dataset.contactLink !== 'page' && !a.hasAttribute('download') && (!a.target || a.target === '_self');

export function installContactInterception({ open, warm }: InterceptOptions): () => void {
  const find = (e: Event) => {
    const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!isContactAnchor(a)) return null;
    const dest = parseContactHref(a.getAttribute('href')!, location.href);
    return dest ? { a, dest } : null;
  };

  const onClickCapture = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (location.pathname.replace(/\/$/, '') === '/contatti') return;
    const hit = find(e);
    if (!hit) return;
    e.preventDefault();
    // la posizione del pulsante (hero, chiusura...) la ricava il foglio quando si apre: qui non serve codice in piu'
    open({ path: location.pathname, ...hit.dest }, hit.a);
  };

  const onWarm = (e: Event) => {
    if (location.pathname.replace(/\/$/, '') !== '/contatti' && find(e)) warm();
  };

  // In cattura: un `stopPropagation` di un pulsante (le carte che si girano, i caroselli) non deve impedire l'apertura.
  document.addEventListener('click', onClickCapture, true);
  document.addEventListener('pointerover', onWarm, { passive: true });
  document.addEventListener('touchstart', onWarm, { passive: true });
  document.addEventListener('focusin', onWarm);
  return () => {
    document.removeEventListener('click', onClickCapture, true);
    document.removeEventListener('pointerover', onWarm);
    document.removeEventListener('touchstart', onWarm);
    document.removeEventListener('focusin', onWarm);
  };
}
