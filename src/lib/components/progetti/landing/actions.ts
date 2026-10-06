/** Azioni condivise dalla landing: tutto cio' che si anima o si riproduce passa da qui, con un IntersectionObserver. */

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Aggiunge `is-in` alla prima volta che l'elemento entra in vista (entrata con transform/opacity). */
export function reveal(node: HTMLElement, delay = 0) {
  node.style.setProperty('--d', `${delay}ms`);
  if (reduced() || !('IntersectionObserver' in window)) {
    node.classList.add('is-in');
    return {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        node.classList.add('is-in');
        io.disconnect();
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  io.observe(node);
  return { destroy: () => io.disconnect() };
}

/** Video muto in ripetizione: parte solo se e' in vista e il movimento non e' ridotto, altrimenti resta il fermo immagine. */
export function playInView(node: HTMLVideoElement) {
  if (reduced() || !('IntersectionObserver' in window)) return {};
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (node.dataset.userPaused !== '1') node.play().catch(() => {});
      } else node.pause();
    },
    { threshold: 0.35 }
  );
  io.observe(node);
  return { destroy: () => io.disconnect() };
}

export const prefersReducedMotion = reduced;
