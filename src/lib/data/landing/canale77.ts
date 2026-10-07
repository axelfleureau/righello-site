import type { Landing } from './types';

/**
 * Canale 77 On Demand — fatti verificati e schermate vere (sito di produzione, app Android TV nativa su emulatore).
 * Niente nomi di persone, credenziali, indirizzi di server.
 */
export default {
  variant: 'broadcast',
  tagline: 'Lo stesso catalogo sul sito, sul digitale terrestre e sulle app TV. Anche su quelle vecchie.',
  metrics: [
    { value: 5, label: 'piattaforme, un solo catalogo', note: 'web, HbbTV, Samsung, LG, Android TV' },
    { value: 3, label: 'testate in un posto solo', note: 'Canale 77, CalcioFVG Live, CalcioVeneto Live' },
    { text: '21,8 s → 0,2 s', label: 'avvio su un Samsung del 2019', note: 'stesso video: MP4 contro HLS a pezzi corti, misura del 28 settembre' },
    { value: 479, label: 'test automatici', note: 'tutti superati, controllati il 6 ottobre 2026' },
  ],
  chapters: [
    {
      id: 'un-catalogo',
      kicker: 'Per chi guarda',
      title: 'Lo sport locale sta in tre siti. Lo spettatore vuole un posto.',
      highlight: 'un posto',
      text:
        'Highlights, interviste, rubriche e partite di Canale 77, CalcioFVG Live e CalcioVeneto Live vivono su siti diversi, con titoli scritti in modi diversi. La piattaforma li legge, li pulisce e li riordina in un solo catalogo, per sport e tipo di contenuto, con le novità in alto.',
      bullets: [
        'Il catalogo si rifà da solo, di continuo',
        'Sport, sezione e doppioni seguono regole scritte una volta e provate',
        'Sito, HbbTV e app TV leggono lo stesso catalogo',
      ],
      media: [
        {
          type: 'image',
          src: '/progetti/landing/canale77/sito-web.webp',
          alt: 'La pagina iniziale di Canale 77 On Demand sul sito: barra con Home, Calcio FVG, Calcio Veneto, Rugby, Basket, TG e programmi, in alto il contenuto in evidenza',
          caption: 'Il sito: sezioni per sport e contenuto in evidenza.',
          ratio: '1600/860',
          frame: 'browser',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'ogni-televisore',
      kicker: 'Su ogni schermo',
      title: 'Funziona anche sul televisore di qualche anno fa.',
      highlight: 'qualche anno fa',
      text:
        'Un televisore del digitale terrestre ha un solo profilo video obbligatorio: se il flusso è fuori standard, resta nero senza dare errore. La compatibilità si applica solo dove serve: l\'HbbTV riceve la copia adatta, sito e app ricevono sempre l\'originale.',
      bullets: [
        'La scelta è in un punto solo, e ogni eccezione va dichiarata',
        'Sui Samsung del 2019 l\'HLS a pezzi corti parte in 0,2 s, non in 21,8',
        'Una partita lunga parte in flusso adattivo, non come file da gigabyte',
      ],
      media: [
        {
          type: 'image',
          src: '/progetti/landing/canale77/android-tv-home.webp',
          alt: 'La schermata iniziale dell\'app Android TV nativa di Canale 77: barra delle sezioni, contenuto in evidenza e la riga Partite intere',
          caption: 'L\'app Android TV nativa: stesso catalogo, pensata per il telecomando.',
          ratio: '16/9',
          frame: 'browser',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'solido',
      kicker: 'Per la redazione',
      title: 'Ogni segnalazione dei telespettatori diventa un controllo automatico.',
      highlight: 'controllo automatico',
      text:
        'Un televisore che non parte è un guasto difficile da vedere da fuori. Così ogni app manda eventi di visione, compreso il momento della prima immagine vera. Quando una segnalazione trova un difetto, la regola entra nel cancello di rilascio e non si rompe più in silenzio.',
      bullets: [
        'Misure di visione per famiglia di televisore e per formato',
        'Il cancello blocca il rilascio se il catalogo è fuori regola',
        'Una routine rifà le copie per i televisori e porta l\'audio a −23 LUFS',
      ],
      layout: 'full',
    },
  ],
  features: [
    { icon: 'layers', title: 'Catalogo unico', text: 'Tre testate, sezioni per sport (calcio, basket, rugby) e una riga di rubriche e programmi.' },
    { icon: 'play', title: 'Diretta', text: 'Si prova in HLS e, se serve, in DASH. Se il nostro player non mostra un fotogramma, passa a quello ufficiale.' },
    { icon: 'clock', title: 'Continua a guardare', text: 'Ogni contenuto riparte da dove si era rimasti, con la barra di avanzamento, e c\'è una lista personale.' },
    { icon: 'search', title: 'Ricerca', text: 'Si cerca per squadra, data, campionato o tipo di contenuto, con suggerimenti pronti.' },
    { icon: 'chart', title: 'Spot e rendiconto', text: 'Spot per campagna, con finestra di date e zone, e rendiconto per chi investe.' },
    { icon: 'lock', title: 'Premium', text: 'Le dirette in esclusiva si sbloccano con il telefono: CH77+ è nella sua pagina.' },
  ],
  demo: {
    kicker: 'Schermate vere',
    title: 'Dal sito al televisore.',
    highlight: 'televisore',
    lead: 'Fotografie dell\'applicazione in esecuzione: il sito di produzione e l\'app Android TV nativa.',
    items: [
      {
        id: 'sito',
        label: 'Sito',
        media: {
          type: 'image',
          src: '/progetti/landing/canale77/sito-web.webp',
          alt: 'Il sito di Canale 77 On Demand sul computer: barra delle sezioni e contenuto in evidenza',
          caption: 'Il sito sul computer: sezioni, contenuto in evidenza e le novità subito sotto.',
          ratio: '1600/860',
          frame: 'browser',
        },
      },
      {
        id: 'tv-home',
        label: 'TV: pagina iniziale',
        media: {
          type: 'image',
          src: '/progetti/landing/canale77/android-tv-home.webp',
          alt: 'App Android TV nativa: pagina iniziale con in evidenza un contenuto e la riga Partite intere',
          caption: 'L\'app Android TV: contenuto in evidenza e righe da scorrere con le frecce del telecomando.',
          ratio: '16/9',
          frame: 'browser',
        },
        note: 'Fotografata su emulatore Android TV, con il catalogo vero in produzione.',
      },
      {
        id: 'tv-scheda',
        label: 'TV: scheda',
        media: {
          type: 'image',
          src: '/progetti/landing/canale77/android-tv-scheda.webp',
          alt: 'App Android TV nativa: scheda di un contenuto con anteprima, titolo, data, tipo e i pulsanti Guarda ora, Lista e Chiudi',
          caption: 'La scheda di un contenuto: guarda ora, aggiungi alla lista, chiudi.',
          ratio: '16/9',
          frame: 'browser',
        },
      },
      {
        id: 'tv-accesso',
        label: 'TV: accesso',
        media: {
          type: 'image',
          src: '/progetti/landing/ch77-plus/tv-codice-qr.webp',
          alt: 'App Android TV nativa: schermata Accedi con il telefono con QR e codice di abbinamento',
          caption: 'Accedere non richiede la tastiera: QR e codice, e si finisce dal telefono.',
          ratio: '16/9',
          frame: 'browser',
        },
      },
    ],
  },
  tech: [
    {
      title: 'Un solo sistema, tutti gli schermi',
      text: 'Sito, app e televisori parlano con lo stesso sistema: catalogo sempre pronto, clip in streaming adattivo, campagne e misure di visione nello stesso posto.',
      tags: ['Infrastruttura globale', 'Dati sempre allineati'],
    },
    {
      title: 'Regole pure, provate a tavolino',
      text: 'Sezioni, sport, doppioni, righe, scadenze: regole semplici e indipendenti, usate da sito, app e strumenti interni. 479 test le tengono ferme.',
      tags: ['Un solo punto di verità', 'Test automatici'],
    },
    {
      title: 'Un\'app per ogni schermo',
      text: 'L\'HbbTV è una pagina leggerissima dentro il televisore, Samsung e LG hanno il loro pacchetto, Android TV un\'app nativa. Tutte leggono lo stesso catalogo.',
      tags: ['HbbTV', 'Smart TV', 'Android TV'],
    },
    {
      title: 'Misurare cosa vede il televisore',
      text: 'La prima immagine vera conta più dell\'annuncio del lettore: è così che si sono trovati i difetti di alcune marche. Gli eventi hanno limiti anti-abuso.',
      tags: ['Misure di visione', 'Sicurezza'],
    },
  ],
  cta: {
    title: 'Guardalo sul tuo schermo.',
    highlight: 'sul tuo schermo',
    text: 'Apri il sito dal computer o dal telefono: il catalogo è lo stesso che arriva sugli schermi di casa.',
    primary: { label: 'Apri Canale 77', href: 'https://ch77.wearerighello.com', external: true },
  },
} satisfies Landing;
