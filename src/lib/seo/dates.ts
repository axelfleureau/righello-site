import dates from './page-dates.json';

/** La data (AAAA-MM-GG) dell'ultima modifica del contenuto della pagina: vedi `scripts/page-dates.ts`. */
export const lastModified = (path: string): string | undefined =>
  (dates as Record<string, string>)[path];
