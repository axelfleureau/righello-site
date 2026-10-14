/**
 * Barra e orario di avanzamento sulle schede video dei caroselli (home).
 *
 * Il rAF che li aggiorna gira a ogni fotogramma mentre una scheda e' in riproduzione.
 * Riscrivere ogni volta lo stesso testo ricrea il nodo di testo (e invalida il layout)
 * anche quando l'orario cambia una volta al secondo: qui si scrive solo cio' che cambia.
 * Una sola implementazione per tutti i caroselli.
 */

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Porta la barra alla posizione del video, senza toccare il DOM se e' gia' li'. */
export function paintVideoBar(bar: HTMLElement, video: HTMLVideoElement): void {
  const next = `scaleX(${video.currentTime / video.duration})`;
  if (bar.style.transform !== next) bar.style.transform = next;
}

/** Barra + etichetta "0:03 / 0:15". */
export function paintVideoProgress(
  bar: HTMLElement,
  label: HTMLElement | null | undefined,
  video: HTMLVideoElement
): void {
  paintVideoBar(bar, video);
  if (label) {
    const text = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    if (label.textContent !== text) label.textContent = text;
  }
}
