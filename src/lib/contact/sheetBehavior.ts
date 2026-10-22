/**
 * Il comportamento "da dito e da tastiera" del foglio, che non serve al primo fotogramma e quindi
 * si scarica col modulo (non con ogni pagina): Tab che resta nel foglio, il dito che striscia senza far
 * scorrere la pagina sotto, e il trascinamento verso il basso della maniglia che chiude.
 */
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

export function attachSheetBehavior(panel: HTMLElement, grip: HTMLElement, scroller: HTMLElement, close: () => void): () => void {
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

  let startY: number | null = null;
  let dy = 0;
  const down = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' || (e.target as Element).closest('button')) return;
    startY = e.clientY;
    grip.setPointerCapture(e.pointerId);
    panel.classList.add('is-dragging');
  };
  const move = (e: PointerEvent) => {
    if (startY === null) return;
    dy = Math.max(0, e.clientY - startY);
    panel.style.transform = dy ? `translateY(${dy}px)` : '';
  };
  const up = () => {
    if (startY === null) return;
    const far = dy > 90;
    startY = null;
    dy = 0;
    panel.classList.remove('is-dragging');
    panel.style.transform = '';
    if (far) close();
  };

  document.addEventListener('keydown', onKeydown);
  panel.addEventListener('touchmove', onTouchMove, { passive: false });
  grip.addEventListener('pointerdown', down);
  grip.addEventListener('pointermove', move);
  grip.addEventListener('pointerup', up);
  grip.addEventListener('pointercancel', up);
  return () => {
    document.removeEventListener('keydown', onKeydown);
    panel.removeEventListener('touchmove', onTouchMove);
    grip.removeEventListener('pointerdown', down);
    grip.removeEventListener('pointermove', move);
    grip.removeEventListener('pointerup', up);
    grip.removeEventListener('pointercancel', up);
  };
}
