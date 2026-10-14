/**
 * Le domande e risposte che le pagine mostrano. Pagina e dati strutturati (FAQPage) leggono dallo
 * stesso elenco: quello che si vede e quello che dichiariamo ai motori di ricerca non possono differire.
 *
 * `structured: false` tiene la domanda visibile nella pagina ma la lascia fuori dai dati strutturati:
 * contiene cifre o promesse che non sappiamo dimostrare (vedi docs/seo-audit.md).
 */
export interface Faq {
  question: string;
  answer: string;
  structured?: false;
}
