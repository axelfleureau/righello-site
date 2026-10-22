/**
 * L'avviso cookie e il suo pulsante (iubenda) stanno in basso e ci passano sopra a tutto (z-index massimo):
 * la barra del telefono e il foglio di contatto devono sapere dove sono per non finirci sotto.
 * Si legge cio' che c'e' davvero nella pagina (altezza dell'avviso aperto, spazio del pulsante a sinistra), non si stima.
 */
import { writable } from 'svelte/store';

export interface CookieUi {
  /** Altezza del pannello di scelta quando e' aperto, altrimenti 0. */
  bannerH: number;
  /** Bordo destro del pulsante "preferenze" fisso in basso a sinistra, altrimenti 0. */
  widgetRight: number;
}

export const cookieUi = writable<CookieUi>({ bannerH: 0, widgetRight: 0 });

export function watchCookieUi(): () => void {
  let bannerObserver: MutationObserver | null = null;
  let resizer: ResizeObserver | null = null;
  let watched: Element | null = null;
  let sized: Element | null = null;

  const read = () => {
    const banner = document.getElementById('iubenda-cs-banner');
    const panel = banner?.classList.contains('iubenda-cs-visible') ? banner.querySelector('.iubenda-cs-container') : null;
    const widget = document.querySelector('.iubenda-tp-btn.iubenda-cs-preferences-link');
    const w = widget?.getBoundingClientRect();
    const next = { bannerH: panel ? Math.ceil(panel.getBoundingClientRect().height) : 0, widgetRight: w && w.width > 0 ? Math.ceil(w.right) : 0 };
    cookieUi.update((prev) => (prev.bannerH === next.bannerH && prev.widgetRight === next.widgetRight ? prev : next));
    // L'avviso nasce dopo il caricamento e cambia classe e altezza: si osservano solo quelli.
    if (banner && banner !== watched) {
      watched = banner;
      bannerObserver?.disconnect();
      bannerObserver = new MutationObserver(read);
      bannerObserver.observe(banner, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
    } else if (!banner) watched = null;
    const container = banner?.querySelector('.iubenda-cs-container') ?? null;
    if (container !== sized) {
      resizer?.disconnect();
      sized = container;
      if (container) {
        resizer ??= new ResizeObserver(read);
        resizer.observe(container);
      }
    }
  };

  // L'avviso e il pulsante vengono aggiunti e tolti dal body.
  const bodyObserver = new MutationObserver(read);
  bodyObserver.observe(document.body, { childList: true });
  read();
  window.addEventListener('resize', read, { passive: true });
  return () => {
    bodyObserver.disconnect();
    bannerObserver?.disconnect();
    resizer?.disconnect();
    window.removeEventListener('resize', read);
  };
}
