/** Dove sta il pulsante che apre il foglio: si ricava solo all'apertura, cosi' il codice non viaggia con ogni pagina. */
/**
 * Posizione del pulsante nella pagina, quando non la dichiara (`data-cta`): dal contenitore (testata, menu, piede,
 * nomi di classe come hero/chiusura) e, in mancanza, da dove si trova: in cima = hero, in fondo = chiusura.
 */
export function inferCta(el: Element): string {
  const declared = el.closest('[data-cta]')?.getAttribute('data-cta');
  if (declared) return declared;
  if (el.closest('#mobile-menu')) return 'menu';
  if (el.closest('header')) return 'testata';
  if (el.closest('footer')) return 'piede';
  for (let node: Element | null = el; node && node.tagName !== 'MAIN'; node = node.parentElement) {
    const tag = `${node.id} ${typeof node.className === 'string' ? node.className : ''}`;
    if (/hero/i.test(tag)) return 'hero';
    if (/clos|chiusur|final/i.test(tag)) return 'chiusura';
  }
  if (typeof el.getBoundingClientRect !== 'function') return 'pagina';
  const top = el.getBoundingClientRect().top + window.scrollY;
  const root = document.documentElement;
  if (top < window.innerHeight * 1.2) return 'hero';
  if (top > root.scrollHeight - window.innerHeight * 1.6) return 'chiusura';
  return 'sezione';
}

