/**
 * Il comportamento "da dito e da tastiera" del foglio, che non serve al primo fotogramma e quindi
 * si scarica col modulo (non con ogni pagina): Tab che resta nel foglio, il dito che striscia senza far
 * scorrere la pagina sotto, e il trascinamento verso il basso della maniglia che chiude.
 *
 * Il trascinamento segue il dito 1:1 e il fondo scuro si schiarisce in proporzione; si chiude oltre 120 px o con un gesto veloce
 * (> 0,5 px/ms), altrimenti il foglio torna su con la stessa curva con cui e' entrato. Solo sul telefono (< 640 px), dove e' un foglio
 * dal basso; da 640 px e' una finestra e la maniglia non c'e'.
 */
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

export const DRAG_CLOSE_PX = 120;
export const FLICK_PX_PER_MS = 0.5;

/** Il foglio trascinato verso il basso si chiude oltre `DRAG_CLOSE_PX`, o con un gesto veloce (`velocity` in px/ms) purche' sia sceso almeno un poco. */
export const shouldDismiss = (dy: number, velocity: number): boolean => dy > DRAG_CLOSE_PX || (velocity > FLICK_PX_PER_MS && dy > 16);

export function attachSheetBehavior(panel: HTMLElement, grip: HTMLElement, scroller: HTMLElement, close: () => void, backdrop?: HTMLElement | null): () => void {
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden');
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (!panel.contains(active) || active === panel) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  /** Il dito che striscia sul foglio non fa scorrere la pagina sotto: si ferma qui se non c'e' niente da scorrere. */
  const onTouchMove = (e: TouchEvent) => {
    if (!scroller.contains(e.target as Node) || scroller.scrollHeight <= scroller.clientHeight + 1) e.preventDefault();
  };

  const phone = () => matchMedia('(max-width: 639px)').matches;
  let startY: number | null = null;
  let dy = 0;
  let samples: Array<{ y: number; t: number }> = [];
  let settle: ReturnType<typeof setTimeout> | undefined;
  const down = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' || !phone() || (e.target as Element).closest('button')) return;
    clearTimeout(settle);
    panel.classList.remove('is-settling');
    backdrop?.classList.remove('is-settling');
    startY = e.clientY;
    samples = [{ y: e.clientY, t: e.timeStamp }];
    grip.setPointerCapture(e.pointerId);
    panel.classList.add('is-dragging');
  };
  const move = (e: PointerEvent) => {
    if (startY === null) return;
    dy = Math.max(0, e.clientY - startY);
    samples.push({ y: e.clientY, t: e.timeStamp });
    if (samples.length > 6) samples.shift();
    panel.style.transform = dy ? `translateY(${dy}px)` : '';
    // il fondo si schiarisce man mano che il foglio scende
    if (backdrop) backdrop.style.opacity = String(Math.max(0, 1 - dy / Math.max(1, panel.offsetHeight)));
  };
  const up = () => {
    if (startY === null) return;
    const first = samples[0];
    const last = samples[samples.length - 1];
    const v = last && first && last.t > first.t ? (last.y - first.y) / (last.t - first.t) : 0;
    const far = shouldDismiss(dy, v);
    startY = null;
    panel.classList.remove('is-dragging');
    if (far) {
      // il foglio resta dov'e': l'animazione di uscita parte da qui e lo porta giu', senza uno scatto
      dy = 0;
      close();
      return;
    }
    dy = 0;
    panel.classList.add('is-settling');
    backdrop?.classList.add('is-settling');
    panel.style.transform = '';
    if (backdrop) backdrop.style.opacity = '';
    settle = setTimeout(() => (panel.classList.remove('is-settling'), backdrop?.classList.remove('is-settling')), 340);
  };

  document.addEventListener('keydown', onKeydown);
  panel.addEventListener('touchmove', onTouchMove, { passive: false });
  grip.addEventListener('pointerdown', down);
  grip.addEventListener('pointermove', move);
  grip.addEventListener('pointerup', up);
  grip.addEventListener('pointercancel', up);
  return () => {
    clearTimeout(settle);
    document.removeEventListener('keydown', onKeydown);
    panel.removeEventListener('touchmove', onTouchMove);
    grip.removeEventListener('pointerdown', down);
    grip.removeEventListener('pointermove', move);
    grip.removeEventListener('pointerup', up);
    grip.removeEventListener('pointercancel', up);
  };
}
