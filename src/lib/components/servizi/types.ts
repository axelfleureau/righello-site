import type { IconName } from '$lib/data/landing/types';

/** Il modello unico che le pagine dei servizi e quelle di agenzia danno a ServicePage: la struttura sta in un posto, i testi nei dati. */

export interface Link {
  href: string;
  label: string;
}

export interface Heading {
  kicker: string;
  title: string;
  highlight?: string;
  lead?: string;
}

export interface ScopeItem {
  icon?: IconName;
  title: string;
  text: string;
  /** Se c'e', la scheda e' un collegamento a un'altra pagina. */
  href?: string;
  terms?: string[];
  /** Solo per l'indice (righe): colori del servizio e i suoi punti principali. */
  accent?: [string, string];
  tagline?: string;
  bullets?: string[];
}

export interface MethodStep {
  title: string;
  text: string;
  when?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ProofItem {
  id: string;
  note?: string;
}

export interface Panel {
  title: string;
  items: Array<{ title?: string; text?: string }>;
}

export interface LocalBlock extends Heading {
  /** Paragrafi sotto il titolo. */
  paragraphs: string[];
  areas?: string[];
  signals?: Array<{ title: string; text: string }>;
  /** Tre o quattro punti numerati (le pagine di servizio, dove non ci sono segnali locali). */
  points?: string[];
  links?: Link[];
}

export interface FlowLink {
  href: string;
  name: string;
  /** Riga piccola sotto il nome. */
  sub?: string;
  accent?: [string, string];
}

export interface PageModel {
  accent: [string, string];
  /** `servizio` e `agenzia` sono modificatori della stessa struttura: cambiano le sezioni presenti, non il disegno. */
  variant: 'servizio' | 'agenzia' | 'indice';
  crumb: { trail: Link[]; current: string };
  /** Voce di ritorno nella barra delle sezioni (nell'indice, la home). */
  kicker: string;
  title: string;
  highlight?: string;
  lead: string;
  primary: Link;
  secondary?: Link;
  panel: Panel;
  scope: Heading & { items: ScopeItem[] };
  /** Seconda lista (agenzia: cosa cercano le aziende), con parole chiave a pillole. */
  scope2?: Heading & { id: string; label: string; items: ScopeItem[] };
  local?: LocalBlock;
  note?: { kicker: string; title: string; text: string; link: Link };
  method: Heading & { steps: MethodStep[] };
  proof: Heading & { items: ProofItem[]; more: Link };
  faq?: Heading & { items: FaqItem[] };
  closing: { kicker: string; title: string; highlight?: string; text: string; button: Link };
  flow: { next: FlowLink; nextKicker: string; prev?: FlowLink; all: Link };
}
