/**
 * Mette in pausa le animazioni CSS infinite degli elementi fuori dallo schermo.
 *
 * Un'animazione `infinite` continua a far girare stile, ridisegno e composizione a ogni
 * fotogramma anche se l'elemento e' a 10 000 px di distanza. Misurato sulla home (iPhone
 * emulato, CPU 4x, pagina ferma a meta' scroll): 60 ricalcoli di stile al secondo e il
 * main thread occupato per ~80% del tempo, tutto dovuto a ~55 animazioni infinite fuori
 * vista; in pausa: 0 ricalcoli, ~5%.
 *
 * E' un punto solo per tutto il sito: nessun componente deve ricordarsi di pausare le
 * proprie animazioni. Si avvia una volta dal layout.
 *  - scansione iniziale di document.getAnimations();
 *  - l'evento `animationstart` (che risale fino al document) intercetta quelle che
 *    partono dopo (cambio pagina, blocchi {#if}, hydration);
 *  - un solo IntersectionObserver mette in pausa/riavvia le animazioni infinite del bersaglio.
 */
export function pauseOffscreenAnimations(): () => void {
  if (
    typeof window === 'undefined' ||
    typeof IntersectionObserver === 'undefined' ||
    typeof document.getAnimations !== 'function'
  ) {
    return () => {};
  }

  const tracked = new WeakMap<Element, Set<Animation>>();
  const pausedByUs = new WeakSet<Animation>();

  const isInfinite = (animation: Animation) => {
    try {
      return animation.effect?.getComputedTiming().iterations === Infinity;
    } catch {
      return false;
    }
  };

  const apply = (target: Element, visible: boolean) => {
    const animations = tracked.get(target);
    if (!animations) return;
    for (const animation of animations) {
      if (visible) {
        if (pausedByUs.has(animation)) {
          pausedByUs.delete(animation);
          animation.play();
        }
      } else if (animation.playState === 'running') {
        pausedByUs.add(animation);
        animation.pause();
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) apply(entry.target, entry.isIntersecting);
    },
    { rootMargin: '150px 0px' }
  );

  const track = (animation: Animation) => {
    if (!isInfinite(animation)) return;
    const target = (animation.effect as KeyframeEffect | null)?.target;
    if (!target) return;
    let set = tracked.get(target);
    if (!set) {
      set = new Set();
      tracked.set(target, set);
      observer.observe(target);
    }
    set.add(animation);
  };

  const scan = () => document.getAnimations().forEach(track);

  // piu' animazioni partono insieme (40 cerchi pulsanti): una scansione per fotogramma
  let scanQueued = false;
  const onAnimationStart = () => {
    if (scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(() => {
      scanQueued = false;
      scan();
    });
  };

  scan();
  document.addEventListener('animationstart', onAnimationStart);

  return () => {
    document.removeEventListener('animationstart', onAnimationStart);
    observer.disconnect();
  };
}
