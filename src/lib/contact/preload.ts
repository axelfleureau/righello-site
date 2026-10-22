/** La parte pesante del foglio (modulo, flusso, schede): si scarica una volta, quando serve o quando c'e' tempo. */
let pending: Promise<typeof import('$lib/components/contact/ContactSheetBody.svelte')> | null = null;

export const loadSheetBody = () => (pending ??= import('$lib/components/contact/ContactSheetBody.svelte'));

/** Anticipa il download a pagina caricata, senza contendere banda a chi legge: non con il risparmio dati acceso. */
export function warmWhenIdle(): () => void {
  if ((navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData) return () => {};
  let cancelled = false;
  const run = () => {
    if (!cancelled) void loadSheetBody();
  };
  const start = () => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 8000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(run, 3000);
    return () => clearTimeout(t);
  };
  let stop = () => {};
  const go = () => (stop = start());
  if (document.readyState === 'complete') go();
  else window.addEventListener('load', go, { once: true });
  return () => {
    cancelled = true;
    stop();
    window.removeEventListener('load', go);
  };
}
