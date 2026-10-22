/**
 * Lettura del contatto per il team, calcolata dai dati (nessun modello, nessun costo, nessuna attesa).
 * Il punteggio (0-10) somma quattro segnali che il team puo' verificare nella mail stessa:
 *  - budget (0-4), servizio (0-2), lunghezza del messaggio (0-2), recapiti e azienda (0-2).
 */
import type { ContactForm, LeadPriority } from './email-templates';

export const PRIORITY_HIGH: LeadPriority = { label: 'Alta priorità', color: '#B42318', bg: '#FDECEC' };
export const PRIORITY_MEDIUM: LeadPriority = { label: 'Media priorità', color: '#A15C07', bg: '#FFF4D8' };
export const PRIORITY_STANDARD: LeadPriority = { label: 'Standard', color: '#047857', bg: '#E7F7EF' };

/** Il numero piu' alto scritto in un budget, con i punti come separatore di migliaia ("10.000 - 20.000 euro" = 20000, "5k" = 5000). */
export function budgetAmount(budget: string): number {
  const b = budget.toLowerCase();
  if (!b.trim() || /da definire|non so/.test(b.replace(/contributo.*$/, ''))) return 0;
  let best = 0;
  for (const m of b.matchAll(/(\d{1,3}(?:[.\s]\d{3})+|\d+)(?:[.,]\d+)?\s*(k|mila|m\b)?/g)) {
    let n = parseInt(m[1].replace(/[.\s]/g, ''), 10);
    if (m[2] === 'k' || m[2] === 'mila') n *= 1000;
    if (m[2] === 'm') n *= 1_000_000;
    if (n > best) best = n;
  }
  // "Meno di 5.000" e' un tetto, non una cifra da raggiungere.
  if (/\b(meno di|fino a|sotto|under|max)\b/.test(b) && !/contributo/.test(b)) return Math.min(best, 2999);
  return best;
}

function budgetPoints(budget: string): { points: number; note: string } {
  if (!budget) return { points: 0, note: 'budget non indicato' };
  const amount = budgetAmount(budget);
  if (amount <= 0) return { points: 0, note: `budget: ${budget}` };
  if (amount >= 25000) return { points: 4, note: `budget: ${budget}` };
  if (amount >= 10000) return { points: 3, note: `budget: ${budget}` };
  if (amount >= 5000) return { points: 2, note: `budget: ${budget}` };
  return { points: 1, note: `budget: ${budget}` };
}

function servicePoints(service: string): number {
  const s = service.toLowerCase();
  if (/progetto completo/.test(s)) return 2;
  if (/sviluppo|software|web|advertising|automazion|bando/.test(s)) return 1;
  return 0;
}

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export interface LeadAnalysis {
  score: number;
  priority: LeadPriority;
  /** Quando conviene rispondere ("entro 24 ore" per le alte priorità). */
  window: string;
  /** Righe leggibili per il pannello "Analisi operativa" della mail al team. */
  lines: string[];
}

export function analyzeLead(form: Pick<ContactForm, 'email' | 'phone' | 'company' | 'service' | 'budget' | 'message' | 'source'>): LeadAnalysis {
  const budget = budgetPoints(form.budget);
  const words = wordCount(form.message);
  const messagePoints = words >= 60 ? 2 : words >= 20 ? 1 : 0;
  const contactPoints = (form.email && form.phone ? 1 : 0) + (form.company ? 1 : 0);
  const score = Math.min(10, budget.points + servicePoints(form.service) + messagePoints + contactPoints);

  const priority = score >= 7 ? PRIORITY_HIGH : score >= 4 ? PRIORITY_MEDIUM : PRIORITY_STANDARD;
  const window = priority === PRIORITY_HIGH ? 'entro 24 ore' : 'entro 72 ore';

  const messageNote =
    words === 0 ? 'nessun messaggio (ha scelto solo il tema)' : words >= 60 ? `messaggio dettagliato (${words} parole)` : words >= 20 ? `messaggio moderato (${words} parole)` : `messaggio breve (${words} parole)`;
  const contactNote = form.email && form.phone ? 'email e telefono' : form.email ? 'solo email' : 'solo telefono';

  const where = form.source?.from
    ? `arrivato dalla scheda o dal servizio «${form.source.from}»`
    : form.source?.path
      ? `arrivato da ${form.source.path}`
      : '';

  const action = form.email
    ? form.phone
      ? 'rispondere con una domanda mirata e proporre una chiamata breve (ha lasciato anche il telefono)'
      : 'rispondere per email con una domanda mirata e una proposta di chiamata breve'
    : 'richiamare o scrivere su WhatsApp: ha lasciato solo il telefono e non riceve la copia per email';

  return {
    score,
    priority,
    window,
    lines: [
      `Priorità: ${priority.label} (punteggio ${score}/10).`,
      `Profilo: ${form.company ? `azienda ${form.company}` : 'azienda non indicata'}; ${form.service ? `tema: ${form.service}` : 'tema non indicato'}.`,
      `Segnali: ${budget.note}; ${messageNote}; recapiti: ${contactNote}${where ? `; ${where}` : ''}.`,
      `Azione consigliata: ${action}, ${window}.`,
    ],
  };
}
