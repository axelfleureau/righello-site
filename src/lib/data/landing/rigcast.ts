import type { Landing } from './types';

const A = '/progetti/landing/rigcast';
const WIDE = '1400/643';

export default {
  variant: 'app',
  tagline: 'Il video va dritto dal telefono alla regia. Niente nel mezzo.',

  metrics: [
    { value: 3, label: 'protocolli di invio', note: 'RTMP, RTMPS e SRT, con chiave e passphrase' },
    { text: '1080p50', label: 'la qualità "Sport"', note: 'una delle tre qualità pronte: Rete debole 720p25, Standard 1080p25, Sport 1080p50' },
    { value: 28, label: 'voci spiegate nell\'app', note: 'ogni voce ha la sua "i" con una spiegazione e uno schema' },
    { value: 48, label: 'test automatici sul nucleo', note: 'test del nucleo dell\'app (indirizzi, stato, riconnessione) che passano oggi' },
  ],

  chapters: [
    {
      id: 'perche',
      kicker: 'Il perché',
      title: 'Una camera di regia che hai già in tasca.',
      highlight: 'già in tasca',
      text:
        'Per una diretta serve una camera in più, spesso in un punto scomodo. L\'iPhone ha già ottiche e sensore buoni. Rig Cast manda il video direttamente alla regia e non lo fa passare da nessun cloud.',
      bullets: [
        'RTMP, RTMPS o SRT, a scelta di chi riceve',
        'L\'app è tutta in orizzontale, pensata per un treppiede',
        'Il cloud servirà solo per controllo, mai per il video',
      ],
      media: [
        {
          type: 'image',
          src: `${A}/home.webp`,
          alt: 'La schermata iniziale di Rig Cast con Quick Stream e Join Director (presto)',
          caption: 'La schermata iniziale: Quick Stream per partire subito. Join Director, il collegamento con la regia, arriverà dopo.',
          ratio: WIDE,
          frame: 'none',
        },
        {
          type: 'image',
          src: `${A}/benvenuto-2.webp`,
          alt: 'Il benvenuto: il segnale va dritto in regia, in RTMP, RTMPS o SRT, senza passaggi nel mezzo',
          caption: 'Il benvenuto lo dice in una schermata: video dritto in regia, nessun passaggio nel mezzo.',
          ratio: WIDE,
          frame: 'none',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'partenza',
      kicker: 'Pronti in pochi tocchi',
      title: 'Scegli dove, scegli come, vai in onda.',
      highlight: 'vai in onda',
      text:
        'La destinazione è una scheda con nome, protocollo e indirizzo: puoi incollare direttamente il link ricevuto dalla regia. La qualità si sceglie per situazione, non a numeri. Un solo pulsante verde: Go Live.',
      bullets: [
        'Tre qualità pronte: Rete debole, Standard, Sport',
        'Oppure su misura, da 1 a 20 Mb/s',
        'Prima della diretta, i controlli: per esempio l\'alimentazione',
      ],
      media: [
        {
          type: 'image',
          src: `${A}/quick-stream.webp`,
          alt: 'Quick Stream: Dove mandiamo il segnale, le tre qualità e il pulsante Go Live',
          caption: 'Quick Stream: la destinazione da aggiungere o incollare, le tre qualità e Go Live (si accende con una destinazione).',
          ratio: WIDE,
          frame: 'none',
        },
        {
          type: 'image',
          src: `${A}/su-misura.webp`,
          alt: 'La qualità su misura: risoluzione, bitrate, fotogrammi al secondo e bitrate adattivo spento',
          caption: 'Su misura: risoluzione, bitrate e fotogrammi, con il bitrate adattivo spento di partenza.',
          ratio: WIDE,
          frame: 'none',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'controllo',
      kicker: 'Il controllo',
      title: 'Una camera vera. E una diretta che regge.',
      highlight: 'che regge',
      text:
        'Ottiche, zoom, fuoco ed esposizione si governano a mano, con comandi su una corsia loro. In onda il bitrate scelto si tiene: se la rete cade l\'app riprova da sola, e a fine diretta un riepilogo dice com\'è andata.',
      bullets: [
        'Ottiche e zoom continuo, stabilizzazione su tre livelli',
        'Fuoco, esposizione e bianco bloccati a mano',
        'Registrazione in Foto mentre sei in onda',
      ],
      layout: 'full',
    },
  ],

  features: [
    { icon: 'link', title: 'RTMP, RTMPS, SRT', text: 'I protocolli della regia. Con SRT scegli il margine contro le perdite: Stretto, Normale o Largo.' },
    { icon: 'bolt', title: 'Go Live subito', text: 'Destinazione e qualità già pronte. Riprendi riparte dall\'ultima diretta con un tocco.' },
    { icon: 'chart', title: 'Telemetria', text: 'Bitrate, rete, batteria e temperatura del telefono, a portata di tocco.' },
    { icon: 'bell', title: 'Avvisi utili', text: 'Calore, batteria sotto il 20% senza carica, rete assente: te lo dice mentre sei in onda.' },
    { icon: 'lock', title: 'Chiavi al sicuro', text: 'Chiave e passphrase custodite in modo sicuro sul telefono. Il registro degli eventi le oscura.' },
    { icon: 'file', title: 'Riepilogo e diagnosi', text: 'A fine diretta un riepilogo. Se serve, la diagnosi si invia con un tocco.' },
  ],

  demo: {
    kicker: 'Dentro l\'app',
    title: 'Dal benvenuto alla qualità del segnale.',
    highlight: 'qualità del segnale',
    lead: 'Schermate dell\'app vera, nella versione di prova, catturate sul simulatore. Il simulatore non ha la camera: le schermate con l\'immagine in onda non sono qui, e non le abbiamo disegnate.',
    items: [
      {
        id: 'benvenuto-1',
        label: 'Benvenuto 1',
        media: { type: 'image', src: `${A}/benvenuto-1.webp`, alt: 'Il tuo iPhone diventa una camera da regia', ratio: WIDE, frame: 'none' },
        note: 'Il tuo iPhone diventa una camera da regia: formato, bitrate e rete sempre davanti agli occhi; nel segnale finisce solo l\'immagine.',
      },
      {
        id: 'benvenuto-2',
        label: 'Benvenuto 2',
        media: { type: 'image', src: `${A}/benvenuto-2.webp`, alt: 'Il segnale va dritto in regia', ratio: WIDE, frame: 'none' },
        note: 'Il segnale va dritto in regia: RTMP, RTMPS o SRT verso il mixer di regia o il server che usi.',
      },
      {
        id: 'benvenuto-3',
        label: 'Benvenuto 3',
        media: { type: 'image', src: `${A}/benvenuto-3.webp`, alt: 'Sai sempre quando sei in onda', ratio: WIDE, frame: 'none' },
        note: 'La cornice dice se sei in onda. Il collegamento con la regia, che la accende, è in sviluppo.',
      },
      {
        id: 'home',
        label: 'Schermata iniziale',
        media: { type: 'image', src: `${A}/home.webp`, alt: 'La schermata iniziale di Rig Cast', ratio: WIDE, frame: 'none' },
        note: 'Quick Stream per partire. In alto, le informazioni e le impostazioni.',
      },
      {
        id: 'quick-stream',
        label: 'Quick Stream',
        media: { type: 'image', src: `${A}/quick-stream.webp`, alt: 'Quick Stream con le tre qualità', ratio: WIDE, frame: 'none' },
        note: 'Destinazione da aggiungere o incollare, qualità per situazione, audio. Go Live resta spento finché manca la destinazione.',
      },
      {
        id: 'spiegazione',
        label: 'Spiegazione',
        media: { type: 'image', src: `${A}/spiegazione-qualita.webp`, alt: 'La spiegazione della qualità del segnale', ratio: WIDE, frame: 'none' },
        note: 'Ogni voce ha la sua "i". Qui: Rete debole per i campi di provincia, Standard quasi sempre, Sport per il movimento veloce.',
      },
      {
        id: 'su-misura',
        label: 'Su misura',
        media: { type: 'image', src: `${A}/su-misura.webp`, alt: 'Risoluzione, bitrate e fotogrammi su misura', ratio: WIDE, frame: 'none' },
        note: 'Risoluzione, bitrate e fotogrammi a scelta. Il bitrate adattivo parte spento.',
      },
      {
        id: 'impostazioni',
        label: 'Impostazioni',
        media: { type: 'image', src: `${A}/impostazioni.webp`, alt: 'Le impostazioni: B/N fuori onda, statistiche, griglia e area sicura, nome camera', ratio: WIDE, frame: 'none' },
        note: 'Bianco e nero fuori onda, statistiche, griglia e area sicura, nome della camera.',
      },
    ],
  },

  tech: [
    {
      title: 'Video e controllo separati',
      text:
        'Il video non passa mai dal cloud: va dal telefono alla regia. Il cloud, quando ci sarà, gestirà solo account, sessioni e comandi. È il principio da cui è partito il progetto.',
      tags: ['Video diretto', 'Nessun cloud per il video'],
    },
    {
      title: 'Un motore pensato per la regia',
      text:
        'Codifica a bitrate costante, senza fotogrammi B e con un fotogramma chiave al secondo, come vogliono i decoder di regia. I comandi all\'obiettivo hanno una corsia loro: lo zoom risponde mentre il video corre.',
      tags: ['Bitrate costante', 'Reattività'],
    },
    {
      title: 'Il nucleo si prova senza camera',
      text:
        'Indirizzi, stato, permessi e riconnessione sono una parte indipendente, che si prova senza camera né rete. 48 test automatici la tengono ferma.',
      tags: ['Test automatici', 'App nativa'],
    },
  ],

  cta: {
    title: 'Vuoi provare Rig Cast nella tua regia?',
    highlight: 'Rig Cast',
    text: 'L\'app è in prova su TestFlight, per iPhone; il collegamento con la regia (permessi, tally, ritorno video) è in sviluppo.',
  },
} satisfies Landing;
