/**
 * Come si disegnano i loghi dei clienti: un solo posto, usato dalla fascia della hero
 * (AppleScrolly) e dal carosello (LogoCarousel).
 *
 * Le superfici scelgono lo stile (sagoma bianca/nera con filtro, oppure colori veri); qui ci
 * sono le eccezioni dei singoli file, con il motivo.
 */
import dimensioni from './logo-dimensioni.json';

const SIZES = dimensioni as unknown as Record<string, [number, number]>;

/** Larghezza e altezza vere del file (scripts/logo-dimensioni.py), o undefined se ignoto. */
export function logoSize(src: string): { width: number; height: number } | undefined {
  const d = SIZES[src];
  return d ? { width: d[0], height: d[1] } : undefined;
}

/**
 * File da usare quando il logo e' ridotto a sagoma (filtro `brightness(0) invert(1)`, che tiene solo
 * l'alfa). Il logo a colori ha una targa piena con il simbolo bianco dentro: senza questa versione la
 * sagoma e' un disco o un quadrato senza segno. Generati da scripts/loghi-mono.py.
 */
const SAGOMA: Record<string, string> = {
  '/logos/neura.png': '/logos/mono/neura.png',
  '/logos/ricci-group.webp': '/logos/mono/ricci-group.png'
};

export function logoSagoma(src: string): string {
  return SAGOMA[src] ?? src;
}

/**
 * Loghi a colori con parti BIANCHE (scritta o simboli pensati per lo scuro): sul tema chiaro il bianco
 * sparisce e restano scritte a meta'. Su tema chiaro si usa la sagoma scura come per gli altri loghi.
 */
const BIANCO_SU_SCURO = new Set([
  '/logos/comune-pordenone.png',
  '/logos/comune-di-fanna.png',
  '/logos/tomasella.png'
]);

export function logoSagomaSuChiaro(src: string): boolean {
  return BIANCO_SU_SCURO.has(src);
}

/** Altezza minima (px) a cui un logo larghissimo e' ancora leggibile nella fascia. */
const ALTEZZA_MINIMA = 13;
/** Larghezza massima del riquadro del logo nella fascia (padding compreso), per i loghi normali. */
const LARGHEZZA_RIQUADRO_MAX = 100;
/** Padding orizzontale totale del logo nella fascia (2 x 0.75rem). */
const PADDING_X = 24;

/**
 * Larghezza massima del riquadro in px. Con il tetto fisso a 100 px un logo di proporzioni 11,7:1
 * (Barcolana) si disegna alto 6 px: un filo. Se il tetto lo ridurrebbe sotto ALTEZZA_MINIMA, lo si
 * alza quanto serve; per tutti gli altri resta 100 e l'aspetto non cambia.
 */
export function larghezzaRiquadroMax(width: number, height: number): number {
  const ar = width / height;
  const contenuto = LARGHEZZA_RIQUADRO_MAX - PADDING_X;
  if (contenuto / ar >= ALTEZZA_MINIMA - 2) return LARGHEZZA_RIQUADRO_MAX;
  return Math.ceil(ALTEZZA_MINIMA * ar + PADDING_X);
}
