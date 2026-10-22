/**
 * Stato del foglio di contatto: aperto o chiuso, e da dove. Una sola istanza per pagina.
 * Chi lo apre e' sempre `openContactSheet`: l'intercettazione dei link (`intercept.ts`), la barra
 * del telefono e, in futuro, qualunque pulsante che voglia aprirlo senza essere un link.
 */
import { writable } from 'svelte/store';
import type { ContactContext } from '$lib/data/contact-prefill';

export interface SheetState {
  open: boolean;
  ctx: ContactContext | null;
  /** Cresce a ogni apertura: il corpo del foglio si ricrea (nuova richiesta, nuovo requestId). */
  seq: number;
}

export const contactSheet = writable<SheetState>({ open: false, ctx: null, seq: 0 });

/** Il pulsante che ha aperto il foglio (`origin`) e dove torna il fuoco alla chiusura (`trigger`: lo stesso, tranne che dal menu del telefono). */
let origin: HTMLElement | null = null;
let trigger: HTMLElement | null = null;
export const sheetTrigger = () => trigger;
export const sheetOrigin = () => origin;

export function openContactSheet(ctx: ContactContext, from?: HTMLElement | null): void {
  origin = from ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
  // dal menu del telefono (che si chiude) il fuoco torna al pulsante che lo apre
  trigger = origin?.closest('#mobile-menu') ? document.querySelector<HTMLElement>('.burger') : origin;
  contactSheet.update((s) => (s.open ? s : { open: true, ctx, seq: s.seq + 1 }));
}

export function closeContactSheet(): void {
  contactSheet.update((s) => (s.open ? { ...s, open: false } : s));
}
