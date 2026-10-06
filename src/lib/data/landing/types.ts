/**
 * Contenuto della landing page di un prodotto (una pagina /progetti/<id>).
 * Un file per prodotto: src/lib/data/landing/<id>.ts con `export default {...} satisfies Landing`.
 * Regola d'oro: solo fatti verificabili (da codice, dati, siti in produzione). Niente superlativi
 * senza prova, niente nomi di persone, niente dati personali, niente numeri inventati.
 */

export type IconName =
  | 'bolt' | 'layers' | 'shield' | 'clock' | 'chart' | 'device' | 'sparkle' | 'link'
  | 'database' | 'camera' | 'message' | 'users' | 'map' | 'lock' | 'gear' | 'play'
  | 'calendar' | 'globe' | 'file' | 'search' | 'bell' | 'cart' | 'scan' | 'wand';

export interface MediaRef {
  type: 'image' | 'video';
  /** Percorso sotto /static, es. /progetti/landing/produzione-partite/gol.mp4 */
  src: string;
  /** Per i video: fermo immagine (webp) mostrato prima e con movimento ridotto. */
  poster?: string;
  alt: string;
  caption?: string;
  /** Proporzioni, es. '16/9', '9/19.5', '4/3'. Default 16/9. */
  ratio?: string;
  /** Telefono verticale dentro cornice iPhone / browser / iPad / monitor 16:9 / nessuna cornice. */
  frame?: 'phone' | 'browser' | 'tablet' | 'monitor' | 'none';
}

/** Un numero che si puo' dimostrare. `value` conta da zero; `text` se non e' un numero (es. "1080p50"). */
export interface Metric {
  value?: number;
  text?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Una riga che dice da dove viene il dato, es. "scene nella galleria", "test automatici". */
  note?: string;
}

/** Capitolo narrativo: titolo forte + testo + (opzionale) media e punti. */
export interface Chapter {
  id: string;
  kicker: string;
  title: string;
  /** Una parola/frase del titolo da rendere in gradiente (deve comparire in `title`). */
  highlight?: string;
  text: string;
  bullets?: string[];
  media?: MediaRef[];
  layout?: 'media-right' | 'media-left' | 'full';
}

export interface Feature {
  icon: IconName;
  title: string;
  text: string;
  /** Scheda larga (2 colonne) con media a lato. */
  wide?: boolean;
  media?: MediaRef;
}

/** Galleria interattiva di esempi veri: schede/chip che cambiano il media mostrato. */
export interface Demo {
  kicker: string;
  title: string;
  highlight?: string;
  lead?: string;
  /** `group`: categoria per raggruppare e filtrare quando le voci sono tante (da 7 in su compare il filtro). */
  items: Array<{ id: string; label: string; media: MediaRef; note?: string; group?: string }>;
}

export interface TechItem {
  title: string;
  text: string;
  /** Etichette brevi di tecnologia, es. ['Cloudflare Workers','D1','R2']. */
  tags?: string[];
}

export interface Landing {
  /** La frase del hero: breve, sicura, vera (puo' sostituire il headline del prodotto). */
  tagline?: string;
  /** Media del palco nel hero. Serve quando il palco non puo' essere l'infografica (che sta in "Come funziona"). */
  hero?: MediaRef;
  /** 3-4 numeri verificabili sotto il hero. */
  metrics: Metric[];
  /** 2-4 capitoli narrativi (il "perche'" e il "come"). */
  chapters: Chapter[];
  /** Infografica interattiva gia' esistente da mostrare nel capitolo "come funziona". */
  graphic?: 'match-production' | 'ch77-plus' | 'pa-assistant' | 'dico-flow';
  /** Titolo e spiegazione sopra l'infografica (se manca, ne usa uno generico). */
  how?: { title: string; highlight?: string; lead?: string };
  /** Bento delle funzioni (6-8 voci). */
  features: Feature[];
  /** Esempi di funzionamento reali, se ci sono (video, schermate, grafiche). */
  demo?: Demo;
  /** "Sotto il cofano": tecnologia e scelte di progetto, 3-6 voci. */
  tech: TechItem[];
  /** Chiusura: titolo + testo + pulsante (default: contatti). */
  cta?: { title: string; highlight?: string; text: string; primary?: { label: string; href: string; external?: boolean } };
}
