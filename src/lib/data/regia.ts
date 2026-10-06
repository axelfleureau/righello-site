export interface RegiaNode {
  projectId: string;
  verb: string;
  line: string;
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
  src: string;
  alt: string;
  callouts: RegiaCallout[];
}

export const regiaNodes: RegiaNode[] = [
  {
    projectId: 'rigcast',
    verb: 'Riprendi',
    line: 'L\'iPhone diventa una camera di regia: il video parte dal campo e arriva dritto in regia.',
    visual: 'tally',
  },
  {
    projectId: 'buffr',
    verb: 'Rivedi',
    line: 'Il buffer registra sempre: con un tocco l\'azione è già un replay e una clip.',
    visual: 'device',
  },
  {
    projectId: 'regia-tv-studio',
    verb: 'Monta',
    line: 'Scorebug, formazioni, classifica e replay messi in grafica in automatico.',
    visual: 'monitor',
  },
  {
    projectId: 'buffr-live',
    verb: 'Racconta',
    line: 'Il cronista aggiorna dal campo e i risultati arrivano a tutti in tempo reale.',
    visual: 'device',
  },
  {
    projectId: 'canale77',
    verb: 'Manda in onda',
    line: 'Highlights, interviste e rubriche on demand, anche sul televisore.',
    visual: 'device',
  },
];

export const regiaTabs: RegiaTab[] = [
  {
    id: 'scorebug',
    label: 'Scorebug e replay',
    src: '/progetti/regia/scorebug.webp',
    alt: 'Grafica di un gol: scorebug con tempo e risultato, replay e sponsor in sovrimpressione',
    callouts: [
      { x: 46, y: 23, label: 'Scorebug con tempo e gol' },
      { x: 7, y: 81, label: 'Didascalia della partita' },
      { x: 69, y: 81, label: 'Replay' },
      { x: 93, y: 81, label: 'Sponsor' },
    ],
  },
  {
    id: 'formazioni',
    label: 'Formazioni e classifica',
    src: '/progetti/regia/formazioni.webp',
    alt: 'Grafica pre-partita con la formazione in campo e la classifica del girone',
    callouts: [
      { x: 27, y: 52, label: 'Formazione in campo' },
      { x: 75, y: 48, label: 'Classifica del girone' },
    ],
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
