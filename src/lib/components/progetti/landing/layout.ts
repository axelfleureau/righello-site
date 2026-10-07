/**
 * Regole di equilibrio della landing: un solo punto che decide come si dispongono le voci
 * (funzioni, tecnologia) e i media, qualunque sia il contenuto.
 *
 * Le griglie sono a 12 unita': una scheda normale occupa 12/colonne unita', una larga il doppio.
 * Quando una riga non si riempie, le sue schede si allargano: nessun buco, mai.
 */
import type { Chapter, MediaRef } from '$lib/data/landing/types';

const UNITS = 12;

interface Packed {
  /** Indici originali, nell'ordine in cui vanno disegnati. */
  order: number[];
  /** Unita' occupate, nello stesso ordine di `order`. */
  spans: number[];
  /** Quanto e' "rattoppata" la griglia: buchi a meta' e allargamenti non pari. */
  cost: number;
  rows: number;
}

/** Riempie le righe una dopo l'altra: se la prossima scheda non ci sta, una piu' avanti passa davanti a chiudere la riga. */
function pack(weights: number[], cols: number): Packed {
  const unit = UNITS / cols;
  const w = weights.map((x) => Math.min(Math.max(1, x), cols));
  const left = w.map((_, i) => i);
  const order: number[] = [];
  const spans: number[] = [];
  let cost = 0;
  let rows = 0;
  while (left.length) {
    let free = cols;
    const row: number[] = [];
    while (left.length && free > 0) {
      const k = left.findIndex((i) => w[i] <= free);
      if (k < 0) break;
      const [i] = left.splice(k, 1);
      row.push(i);
      free -= w[i];
    }
    row.sort((a, b) => a - b);
    const extra = free * unit;
    const per = Math.floor(extra / row.length);
    const rest = extra - per * row.length;
    // l'ultima riga che si allarga in parti uguali e' una scelta di disegno (una scheda sola in fondo e' gia' meno bella);
    // un buco a meta' griglia o un allargamento disuguale sono rattoppi
    if (free > 0) cost += rest ? 3 : left.length ? 2 : row.length === 1 ? 1 : 0;
    row.forEach((i, j) => {
      order.push(i);
      spans.push(w[i] * unit + per + (j === row.length - 1 ? rest : 0));
    });
    rows += 1;
  }
  return { order, spans, cost, rows };
}

export interface Placed<T> {
  item: T;
  /** Posizione originale (serve alle entrate scaglionate). */
  i: number;
  /** Larghezza (su 12) e posto nella riga, per tre misure di schermo: largo (1180+), medio (1000-1179), due colonne (640-999). */
  sd: number;
  sm: number;
  st: number;
  od: number;
  om: number;
  ot: number;
}

export interface Placement<T> {
  cols: number;
  items: Placed<T>[];
}

/** Colonne ammesse per numero di voci: 3 in fila, 4 in 2x2, 5-6 su 3 (o 4 se cosi' si risparmia una riga), 7-8 su 4. */
const columnsFor = (n: number, max: number) => {
  const all = n <= 3 ? [3] : n === 4 ? [2] : n <= 6 ? [3, 4] : [4, 3];
  const ok = all.filter((c) => c <= max);
  return ok.length ? ok : [Math.min(max, 3)];
};

/** La disposizione migliore fra le colonne ammesse: meno rattoppi, poi meno righe; la prima (preferita) ha un piccolo vantaggio. */
function choose(weights: number[], cols: number[]) {
  const score = (r: Packed, k: number) => r.cost * 10 + r.rows + (k === 0 ? 0 : 0.9);
  let best = { ...pack(weights, cols[0]), cols: cols[0] };
  let bestScore = score(best, 0);
  cols.slice(1).forEach((c, k) => {
    const r = pack(weights, c);
    if (score(r, k + 1) < bestScore) {
      best = { ...r, cols: c };
      bestScore = score(r, k + 1);
    }
  });
  return best;
}

/**
 * Sceglie le colonne e le larghezze di ogni scheda cosi' che ogni riga sia piena, per ogni misura di schermo.
 * `isWide`: scheda a due colonne (con media a lato). L'ordine visivo e' dato da CSS `order`, il DOM resta quello scritto.
 */
export function placeGrid<T>(list: T[], isWide: (t: T) => boolean = () => false): Placement<T> {
  const n = list.length;
  const weights = list.map((t) => (isWide(t) ? 2 : 1));
  const wide = choose(weights, columnsFor(n, 4));
  const mid = choose(weights, columnsFor(n, 3));
  const two = pack(weights, 2);
  const rank = (p: Packed) => {
    const r: number[] = [];
    const s: number[] = [];
    p.order.forEach((idx, k) => {
      r[idx] = k;
      s[idx] = p.spans[k];
    });
    return { r, s };
  };
  const d = rank(wide);
  const m = rank(mid);
  const t = rank(two);
  return {
    cols: wide.cols,
    items: list.map((item, i) => ({ item, i, sd: d.s[i], sm: m.s[i], st: t.s[i], od: d.r[i], om: m.r[i], ot: t.r[i] })),
  };
}

/** Rapporto larghezza/altezza con cui un media occupa lo spazio (il telefono ha il suo, quello della cornice). */
export function ratioOf(m: MediaRef, frame: MediaRef['frame'] = m.frame): number {
  if (frame === 'phone') return 9 / 19.5;
  const r = m.ratio ?? (m.type === 'video' ? '16/9' : '16/10');
  const [a, b] = r.split('/').map(Number);
  return a > 0 && b > 0 ? a / b : 1.6;
}

export type ChapterLayout = 'media-right' | 'media-left' | 'full' | 'text';

/**
 * Il layout di ogni capitolo. Un capitolo senza media e' sempre `text` (colonna stretta centrata:
 * mai una meta' pagina vuota). Senza `layout`, il media si alterna rispetto all'ultimo capitolo con media laterale.
 */
export function resolveChapterLayouts(chapters: Chapter[]): ChapterLayout[] {
  let last: 'media-right' | 'media-left' = 'media-left';
  return chapters.map((c) => {
    if (!c.media?.length) return 'text';
    if (c.layout === 'full') return 'full';
    const layout = c.layout ?? (last === 'media-right' ? 'media-left' : 'media-right');
    last = layout;
    return layout;
  });
}

/** Come disporre piu' media nello stesso capitolo: in riga (stessa altezza) oppure uno sotto l'altro. */
export function mediaArrangement(media: MediaRef[]): 'single' | 'row' | 'stack' {
  if (media.length === 1) return 'single';
  const flat = media.filter((m) => m.frame !== 'phone').length;
  return flat >= 2 ? 'stack' : 'row';
}
