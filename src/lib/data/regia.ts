export interface RegiaNode {
  projectId: string;
  /** Il passaggio della produzione che questo prodotto copre. Il resto (nome, frase, stato) viene dalla scheda del prodotto. */
  verb: string;
  visual: 'tally' | 'device' | 'monitor';
}

export interface RegiaCallout {
  x: number;
  y: number;
  label: string;
}

export interface RegiaTab {
  id: string;
  label: string;
  /** Immagine fissa; se c'è `video` fa da copertina. */
  src: string;
  /** Breve ripresa vera dalla trasmissione, senza audio e in ripetizione. */
  video?: string;
  alt: string;
  callouts: RegiaCallout[];
}

export const regiaNodes: RegiaNode[] = [
  {
    projectId: 'rigcast',
    verb: 'Riprendi',
    visual: 'tally',
  },
  {
    projectId: 'buffr',
    verb: 'Rivedi',
    visual: 'device',
  },
  {
    projectId: 'regia-tv-studio',
    verb: 'Monta',
    visual: 'monitor',
  },
  {
    projectId: 'buffr-live',
    verb: 'Racconta',
    visual: 'device',
  },
  {
    projectId: 'canale77',
    verb: 'Manda in onda',
    visual: 'device',
  },
];

export const regiaTabs: RegiaTab[] = [
  {
    id: 'gol',
    label: 'Gol e scorebug',
    src: '/progetti/regia/gol-scorebug.webp',
    video: '/progetti/regia/gol-scorebug.mp4',
    alt: 'Ripresa di una partita con lo scorebug in alto che segna il tempo e, al gol, si accende e aggiorna il risultato',
    callouts: [{ x: 24, y: 12, label: 'Tempo, squadre e gol: si aggiorna da solo' }],
  },
  {
    id: 'sponsor',
    label: 'Sponsor in campo',
    src: '/progetti/regia/sponsor.webp',
    video: '/progetti/regia/sponsor.mp4',
    alt: 'Ripresa di una partita con il marchio di uno sponsor e la scritta Pubblicità in sovrimpressione, in basso a sinistra',
    callouts: [{ x: 17, y: 80, label: 'Lo sponsor entra e esce in grafica' }],
  },
  {
    id: 'presentazione',
    label: 'Presentazione',
    src: '/progetti/regia/presentazione.webp',
    alt: 'Grafica di presentazione della partita con gli stemmi delle due squadre, la competizione e la data',
    callouts: [{ x: 50, y: 40, label: 'Le due squadre con gli stemmi' }],
  },
  {
    id: 'rigori',
    label: 'Rigori',
    src: '/progetti/regia/rigori.webp',
    alt: 'Grafica dei tiri di rigore: per ogni squadra un segno per ogni tiro, segnato o sbagliato, e il conteggio',
    callouts: [{ x: 27, y: 35, label: 'Tiri di rigore, uno per uno' }],
  },
  {
    id: 'lanner',
    label: 'Barra pubblicitaria',
    src: '/progetti/regia/lanner.webp',
    alt: 'Cornice a L con il marchio, lo spazio per il video e il messaggio pubblicitario in barra',
    callouts: [
      { x: 14, y: 40, label: 'Marchio e sponsor' },
      { x: 55, y: 90, label: 'Messaggio in barra' },
    ],
  },
];
