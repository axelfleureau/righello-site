/**
 * Dice se `el` e' dentro la finestra del browser (piu' un margine in px sopra e sotto).
 *
 * Serve ai caroselli orizzontali: il loro IntersectionObserver ha come root il contenitore
 * che scorre, quindi "una scheda e' visibile" vale anche quando tutto il carosello e' a
 * 26.000 px di distanza. Senza questo controllo i video partono (e si scaricano interi) al
 * caricamento della pagina invece di quando ci si avvicina.
 */
export function watchNearViewport(
  el: Element,
  marginPx: number,
  onChange: (near: boolean) => void
): () => void {
  const io = new IntersectionObserver(
    (entries) => onChange(entries[entries.length - 1].isIntersecting),
    { rootMargin: `${marginPx}px 0px` }
  );
  io.observe(el);
  return () => io.disconnect();
}
