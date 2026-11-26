import type { Landing, MediaRef } from './types';

/**
 * Squadro (rilievo di stanze con il LiDAR dell'iPhone): fatti dalla scheda dell'App Store (versione 1.1.0, verificata il
 * 26/11/2026) e dalle sue note di versione. Le schermate sono quelle dello store, con la «stanza di esempio» dell'app:
 * nessun dato di nessuno. Le misure sono stimate dal sensore: la pagina lo dice come lo dice l'app.
 */
const DIR = '/progetti/landing/squadro';

const screen = (name: string, alt: string, caption?: string): MediaRef => ({
  type: 'image',
  src: `${DIR}/${name}.webp`,
  alt,
  caption,
  ratio: '700/1522',
  frame: 'phone',
});

const pianta = screen(
  'pianta',
  'La pianta quotata di una stanza di esempio: lati, aperture, superficie di 22 metri quadri e le misure dei muri',
  'La pianta quotata: lati, aperture, superficie e altezza.',
);
const tre_d = screen(
  '3d',
  'La stessa stanza in vista 3D, con il pavimento in legno e la finestra',
  'Dalla pianta al 3D con una transizione animata.',
);
const progetto = screen(
  'progetto',
  'La pianta di progetto con le schede Attuale, Progetto e Differenze, e i comandi Porta, Finestra, Arco e Abbatti',
  'Il progetto: si apre una porta, un arco, una finestra, si abbatte un muro.',
);
const differenze = screen(
  'differenze',
  'Il confronto fra stato attuale e progetto: le demolizioni in giallo e le costruzioni in rosso',
  'Le differenze: demolizioni in giallo, costruzioni in rosso.',
);
const arreda = screen(
  'arreda',
  'La pianta con un divano a due posti disegnato in scala, con i comandi Ruota, Duplica ed Elimina',
  'Si arreda in scala, per controllare gli spazi.',
);

export default {
  variant: 'app',
  tagline: 'Inquadri la stanza con il LiDAR dell’iPhone e, in pochi minuti, hai la pianta con tutte le quote.',

  metrics: [
    { text: 'Pochi minuti', label: 'per una pianta quotata', note: 'inquadrando la stanza con il sensore LiDAR' },
    { value: 7, label: 'viste tecniche', note: 'isometrica, dimetrica, cavaliera, cabinet, planometrica, pianta e prospetto' },
    { value: 3, label: 'formati di tavola in scala', note: 'A4, A3 e A2, nel PDF' },
    { value: 0, label: 'account richiesti', note: 'le piante restano sul tuo dispositivo' },
  ],

  chapters: [
    {
      id: 'dalla-stanza',
      kicker: 'Il rilievo',
      title: 'Dalla stanza alla pianta, con il telefono in mano.',
      highlight: 'con il telefono in mano',
      text:
        'Inquadri la stanza, o l’intero appartamento, con il sensore LiDAR. La pianta arriva con tutte le quote: lati, aperture, superfici, altezze e i nomi delle stanze. Poi la guardi in 3D, anche per appartamenti interi.',
      bullets: ['Pianta quotata con superfici e altezze', 'Vista 3D con transizione animata', 'Nomi delle stanze, anche per appartamenti interi'],
      media: [pianta, tre_d],
      layout: 'media-right',
    },
    {
      id: 'dal-rilievo-al-progetto',
      kicker: 'Il progetto',
      title: 'Dallo stato attuale al progetto, e la differenza si vede.',
      highlight: 'la differenza si vede',
      text:
        'Abbatti un muro per intero, apri archi, porte e finestre, disegna i muri e le stanze che la scansione non ha potuto vedere, con agganci magnetici a spigoli, metà e quarti. La pianta dello stato attuale e quella di progetto si mettono a confronto: demolizioni in giallo, costruzioni in rosso.',
      bullets: ['Agganci magnetici a spigoli, metà e quarti', 'Demolizioni in giallo e costruzioni in rosso', 'Arredi in scala e materiali per pavimenti e pareti'],
      media: [progetto, differenze],
      layout: 'media-left',
    },
    {
      id: 'dal-telefono-al-cantiere',
      kicker: 'La consegna',
      title: 'Dal telefono al cantiere, e al CAD.',
      highlight: 'e al CAD',
      text:
        'Esporti un PDF pronto da condividere, con la tavola vettoriale in scala (A4, A3, A2), il cartiglio, le quote e la barra grafica. Per il CAD c’è il file DXF; il modello 3D si esporta in OBJ. Le misure sono stimate dal sensore e possono scostarsi di qualche centimetro: per i progetti esecutivi vanno verificate in cantiere.',
      bullets: ['PDF in scala, DXF per il CAD, OBJ per il 3D', 'Computo con superfici netta, lorda e commerciale', 'Le misure del sensore si verificano in cantiere'],
      layout: 'full',
    },
  ],

  features: [
    { icon: 'scan', title: 'Pianta quotata', text: 'Lati, aperture, superfici, altezze e nomi delle stanze, dalla scansione LiDAR.' },
    { icon: 'layers', title: 'Vista 3D', text: 'Con transizione animata, anche per appartamenti interi; finestre, porte, battiscopa, tetti, sole e ombre.' },
    { icon: 'gear', title: 'Muri e aperture', text: 'Abbatti un muro, apri archi, porte e finestre, disegna ciò che la scansione non ha visto.' },
    { icon: 'chart', title: 'Differenze', text: 'Stato attuale, progetto, demolizioni e costruzioni a confronto.' },
    { icon: 'device', title: 'Arreda e materiali', text: 'Divani, tavoli, letti e armadi in scala; pavimenti e pareti per vedere come cambia l’ambiente.' },
    { icon: 'file', title: 'PDF, DXF e OBJ', text: 'Tavola vettoriale in scala con cartiglio e quote; DXF per il CAD; OBJ per il modello 3D.' },
    { icon: 'map', title: 'Edificio e complesso', text: 'Più piani allineati automaticamente fra loro, con i controlli di vetro per guardarli.' },
    { icon: 'calendar', title: 'Scale e computo', text: 'Scale dritte, a L e a U, e computo con superficie netta, lorda e commerciale.' },
  ],

  demo: {
    kicker: 'Le schermate',
    title: 'L’app, com’è davvero',
    highlight: 'com’è davvero',
    lead: 'Schermate dell’app con la stanza di esempio: senza il sensore LiDAR si può provare l’app proprio così.',
    items: [
      { id: 'pianta', label: 'Pianta', media: pianta, note: 'Superficie, lati e aperture quotati.' },
      { id: '3d', label: '3D', media: tre_d, note: 'La stessa stanza, in tre dimensioni.' },
      { id: 'progetto', label: 'Progetto', media: progetto, note: 'Porta, finestra, arco, abbatti.' },
      { id: 'differenze', label: 'Differenze', media: differenze, note: 'Demolizioni e costruzioni a colpo d’occhio.' },
      { id: 'arreda', label: 'Arreda', media: arreda, note: 'Gli arredi in scala, da ruotare e spostare.' },
    ],
  },

  tech: [
    {
      title: 'Il sensore LiDAR',
      text: 'Serve un iPhone con sensore LiDAR (iPhone 12 Pro e successivi, modelli Pro). Senza LiDAR si può provare l’app con una stanza di esempio.',
      tags: ['LiDAR', 'iPhone Pro'],
    },
    {
      title: 'Sul tuo dispositivo',
      text: 'Le piante restano sul tuo dispositivo: nessun account, nessun tracciamento.',
      tags: ['Nessun account', 'Privacy'],
    },
    {
      title: 'Misure dichiarate per quello che sono',
      text: 'Le misure sono stimate dal sensore e possono scostarsi di qualche centimetro: lo dice l’app, e noi lo diciamo qui. Per i progetti esecutivi si verificano in cantiere.',
      tags: ['Onestà sulle misure'],
    },
  ],

  cta: {
    title: 'La prossima stanza, rilevata in pochi minuti.',
    highlight: 'rilevata in pochi minuti',
    text: 'Squadro è su App Store. Serve un iPhone con LiDAR per scansionare; senza, si prova con la stanza di esempio.',
    primary: { label: 'Scarica su App Store', href: 'https://apps.apple.com/it/app/squadro/id6821417058', external: true },
  },
} satisfies Landing;
