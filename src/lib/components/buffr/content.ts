import { caseStudies } from '$lib/data/case-studies';

const entry = caseStudies.find((study) => study.id === 'buffr');

/** Indirizzo App Store: una sola sorgente, quella della vetrina Progetti. */
export const storeUrl = entry?.storeUrl ?? 'https://apps.apple.com/it/app/buffr/id6769990725';
export const storeUrlUs = storeUrl.replace('/it/app/', '/us/app/');
export const pageUrl = 'https://www.wearerighello.com/buffr';

export interface SceneCopy {
  id: string;
  /** Etichetta breve per la barra di navigazione delle scene. */
  short: string;
  kicker: string;
  title: string;
  text: string;
  points: string[];
}

export const scenes: SceneCopy[] = [
  {
    id: 'buffer',
    short: 'Il buffer',
    kicker: 'Il buffer che torna indietro',
    title: 'Registra sempre. Salva solo quando serve.',
    text: 'Con il buffer acceso, BUFFR tiene gli ultimi secondi di quello che inquadri. Quando succede qualcosa, tocchi: i secondi appena passati diventano una clip. Non devi indovinare in anticipo.',
    points: [
      'Tocchi dopo che è successo, non prima',
      'Si salva soltanto quello che tocchi',
      'La clip parte già dal momento giusto',
    ],
  },
  {
    id: 'momenti',
    short: 'I momenti',
    kicker: 'Un tocco per momento',
    title: 'Un tocco, il momento giusto.',
    text: 'Quattro pulsanti sulla camera, uno per ogni momento della partita. Ognuno salva un numero di secondi diverso e dà un nome alla clip. Dopo un gol l’app chiede di chi è, e il punteggio si tiene da solo.',
    points: [
      'Gol, azione, fischio e inizio, senza menu',
      'Il punteggio si aggiorna a ogni gol',
      'In libreria puoi cambiare il momento di ogni clip',
    ],
  },
  {
    id: 'montaggio',
    short: 'Il montaggio',
    kicker: 'Dal campo al montaggio',
    title: 'Dalle clip al video della partita.',
    text: 'A fine partita le clip sono già in ordine nella libreria. Scegli lo stile e la testata, BUFFR monta il video con punteggio, stacchi e grafiche. Poi lo guardi, lo salvi in Foto o lo condividi.',
    points: [
      'Stili con il colore che preferisci',
      'La testata di chi trasmette negli stacchi',
      'Guarda, salva in Foto o condividi',
    ],
  },
];

export const moments = [
  { id: 'goal', name: 'Gol', label: 'GOAL', seconds: 30, color: 'var(--bf-goal)' },
  { id: 'action', name: 'Azione', label: 'AZIONE', seconds: 40, color: 'var(--bf-action)' },
  { id: 'whistle', name: 'Fischio', label: 'FISCHIO', seconds: 10, color: 'var(--bf-whistle)' },
  { id: 'start', name: 'Inizio', label: 'START', seconds: 15, color: 'var(--bf-start)' },
] as const;

export interface Feature {
  icon: string;
  title: string;
  text: string;
  wide?: boolean;
  visual?: 'ticks' | 'styles';
}

export const features: Feature[] = [
  {
    icon: 'rewind',
    title: 'Il buffer sempre acceso',
    text: 'La camera tiene gli ultimi secondi. Quando tocchi, quelli appena passati diventano una clip.',
    wide: true,
    visual: 'ticks',
  },
  {
    icon: 'flag',
    title: 'Quattro momenti',
    text: 'Gol, azione, fischio, inizio: un pulsante ciascuno.',
  },
  {
    icon: 'zoom',
    title: 'Grandangolo e zoom',
    text: '0,5×, 1× e 2× a portata di pollice.',
  },
  {
    icon: 'grid',
    title: 'Libreria in ordine',
    text: 'Clip divise per giorno, con filtri per le tue e per quelle del team.',
  },
  {
    icon: 'scissors',
    title: 'Taglio senza rischi',
    text: 'Accorci una clip quando vuoi: il file originale non si tocca.',
  },
  {
    icon: 'film',
    title: 'Montaggio con stile e testata',
    text: 'Punteggio, stacchi e grafiche nei colori che scegli. Il logo di chi trasmette negli stacchi, al posto di quello BUFFR.',
    wide: true,
    visual: 'styles',
  },
  {
    icon: 'users',
    title: 'Una partita, più telefoni',
    text: 'Più persone riprendono la stessa partita. Le clip finiscono tutte nella stessa cronologia.',
    wide: true,
  },
  {
    icon: 'share',
    title: 'Pronto da condividere',
    text: 'Orizzontale per il sito, verticale per le storie, oppure i soli gol. Poi in Foto o dove vuoi.',
    wide: true,
  },
];

export const audiences = [
  {
    icon: 'users',
    title: 'Società e squadre',
    text: 'Riprendi la partita con più telefoni e ritrovi tutto in un’unica cronologia. A fine gara il video dei gol è già pronto.',
  },
  {
    icon: 'flag',
    title: 'Chi racconta lo sport',
    text: 'Un tocco e il gol è tuo, con la squadra e il punteggio già segnati. Niente video di due ore da scorrere.',
  },
  {
    icon: 'film',
    title: 'Creator ed eventi',
    text: 'Concerti, gare, backstage: tutto quello che dura un attimo e non si ripete.',
  },
];

export const teamPoints = [
  'Ogni telefono riprende dal suo punto di vista',
  'Le clip finiscono nella stessa partita, in ordine',
  'Il montaggio della partita lo vede tutto il team',
  'Le testate si possono offrire agli altri team',
];

export const faqs = [
  {
    question: 'Che cos’è BUFFR?',
    answer:
      'BUFFR è un’app per iPhone di Righello. Tiene sempre gli ultimi secondi di quello che inquadri: quando succede qualcosa, un tocco li salva come clip. Poi le clip si organizzano in libreria e si montano in un video.',
  },
  {
    question: 'Come fa a salvare un gol che è già successo?',
    answer:
      'Con il buffer acceso la camera registra in continuo e tiene gli ultimi secondi. Quando tocchi un pulsante, BUFFR salva quei secondi appena passati. Per questo non devi premere prima: premi dopo.',
  },
  {
    question: 'Quanti secondi salva ogni tocco?',
    answer:
      'Dipende dal pulsante. Nell’esempio della camera: gol 30 secondi, azione 40, fischio 10, inizio 15. Ogni pulsante dà anche il nome alla clip.',
  },
  {
    question: 'Posso usarla con più telefoni sulla stessa partita?',
    answer:
      'Sì. Con i team, più persone riprendono la stessa partita da punti diversi e le clip finiscono nella stessa cronologia, già divise per momento.',
  },
  {
    question: 'Come si fa il montaggio?',
    answer:
      'Dalla libreria scegli la partita, lo stile e la testata. BUFFR monta il video con punteggio, stacchi e grafiche. Quando è pronto lo guardi, lo salvi in Foto o lo condividi.',
  },
  {
    question: 'BUFFR è gratis?',
    answer: 'Scaricarla dall’App Store è gratis.',
  },
  {
    question: 'Funziona su Android?',
    answer: 'Per ora BUFFR è un’app per iPhone, pubblicata sull’App Store.',
  },
  {
    question: 'BUFFR e BUFFR Live sono la stessa cosa?',
    answer:
      'No. BUFFR è la camera e il montaggio. BUFFR Live è un altro prodotto di Righello, con risultati e cronaca del calcio dilettantistico.',
  },
];
