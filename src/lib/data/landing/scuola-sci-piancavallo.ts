import type { Landing } from './types';

const base = '/progetti/landing/scuola-sci-piancavallo';

export default {
  tagline: 'Un sito che segue la stagione: d\'inverno la neve e i corsi, d\'estate il camp.',

  metrics: [
    {
      value: 1,
      label: 'regola decide la stagione',
      note: 'la data, con un interruttore manuale per anticipare o ritardare',
    },
    {
      value: 4,
      label: 'discipline con la loro pagina',
      note: 'sci alpino, snowboard, telemark, sci di fondo',
    },
    {
      value: 2,
      label: 'lingue',
      note: 'italiano e inglese: ogni testo ha le due versioni',
    },
    {
      value: 11,
      label: 'settimane di camp nel modulo',
      note: 'settimane selezionabili nella landing del camp estivo 2026',
    },
  ],

  chapters: [
    {
      id: 'stagione',
      kicker: 'Il problema',
      title: 'Una scuola, due stagioni, un solo sito',
      highlight: 'un solo sito',
      text:
        'La Scuola Sci Piancavallo lavora sulla neve d\'inverno e sul camp, con la pista sintetica, d\'estate. Cambiare testi e pulsanti a mano due volte l\'anno è un lavoro che si dimentica. Ora la stagione è un\'informazione sola, letta da home, prezzi, corsi, prenotazione e menu.',
      bullets: [
        'D\'inverno: corsi di sci e snowboard, e la prenotazione porta al sistema Skiwork.',
        'D\'estate: camp, pista sintetica e lezioni private estive, e la prenotazione porta alla landing del camp.',
        'Un interruttore manuale permette di anticipare o ritardare il cambio, senza aspettare la data.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/home.webp`,
          alt: 'La pagina iniziale del sito in versione invernale',
          caption: 'La pagina iniziale in versione invernale.',
          ratio: '16/10',
          frame: 'browser',
        },
        {
          type: 'image',
          src: `${base}/mobile-home.webp`,
          alt: 'La pagina iniziale su telefono',
          caption: 'Su telefono (390 pixel).',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'listino',
      kicker: 'Il come',
      title: 'Il listino si filtra con due scelte',
      highlight: 'due scelte',
      text:
        'Sul listino 2026/27 si sceglie la disciplina, sci o snowboard, e il tipo di corso, VIP o Gioca la Neve. La pagina mostra solo quella sezione. Le scelte sono su due righe e non quattro in fila, perché sul telefono restano ordinate. Prezzi e testi sono in italiano e inglese.',
      bullets: [
        'Quattro combinazioni, un\'unica sezione che cambia contenuto.',
        'Le lezioni private valgono per tutte le discipline e restano fuori dal filtro.',
        'Il corso del lunedì e il Full Winter compaiono solo dove esistono.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/prezzi-chip.webp`,
          alt: 'La pagina dei prezzi con le scelte di disciplina e di tipo di corso',
          caption: 'Due file di scelte: disciplina e tipo di corso.',
          ratio: '16/10',
          frame: 'browser',
        },
        {
          type: 'image',
          src: `${base}/mobile-prezzi.webp`,
          alt: 'Il listino su telefono',
          caption: 'Il listino su telefono.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'prenotare',
      kicker: 'Prenotazione',
      title: 'Il pulsante giusto, al momento giusto',
      highlight: 'al momento giusto',
      text:
        'La prenotazione vera avviene sul sistema Skiwork, d\'inverno, e sulla landing del camp, d\'estate. Il sito porta l\'utente al punto giusto: lezioni collettive o private, con la disciplina già scelta. La landing del camp ha un modulo di preiscrizione in quattro passi e undici settimane tra cui scegliere.',
      bullets: [
        'Collegamenti diretti alla pagina giusta: collettive o private, per disciplina.',
        'In estate, ogni pulsante «Prenota» porta alla landing del camp.',
        'Il modulo del camp ricorda le settimane scelte e controlla i campi prima di andare avanti.',
      ],
    },
    {
      id: 'linktree',
      kicker: 'Anche fuori dal sito',
      title: 'Anche la pagina dei link cambia con la stagione',
      highlight: 'cambia con la stagione',
      text:
        'La pagina dei link che sta nei profili social segue la stessa regola: i pulsanti e i colori cambiano con il mese. Da settembre a marzo parla di corsi e gift card; in estate mette in cima il camp. Si aggiorna da sola, così il cambio avviene senza interventi.',
      bullets: [
        'I mesi invernali sono definiti in un punto solo.',
        'L\'ordine dei pulsanti dipende dalla stagione: il primo è quello da far cliccare.',
        'I colori sono definiti in un punto solo: cambiare palette non vuol dire toccare le pagine.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/linktree.webp`,
          alt: 'La pagina dei link nella versione invernale',
          caption: 'La pagina dei link nella versione invernale.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-right',
    },
  ],

  features: [
    {
      icon: 'calendar',
      title: 'Stagione in automatico',
      text: 'Home, prezzi, corsi, prenotazione e menu cambiano testi e pulsanti con la stagione.',
    },
    {
      icon: 'globe',
      title: 'Italiano e inglese',
      text: 'Ogni testo ha la sua versione in entrambe le lingue.',
    },
    {
      icon: 'layers',
      title: 'Quattro discipline',
      text: 'Una pagina per sci alpino, snowboard, telemark e sci di fondo.',
    },
    {
      icon: 'search',
      title: 'Listino filtrabile',
      text: 'Disciplina e tipo di corso scelgono la sezione di prezzi da mostrare.',
    },
    {
      icon: 'link',
      title: 'Prenotazione diretta',
      text: 'Link alla pagina giusta di Skiwork, con collettive o private e disciplina già scelte.',
    },
    {
      icon: 'users',
      title: 'Camp con modulo',
      text: 'Preiscrizione in quattro passi, con undici settimane tra cui scegliere.',
    },
    {
      icon: 'device',
      title: 'Chiaro e scuro',
      text: 'Un tasto nella barra passa dal tema chiaro a quello scuro.',
    },
    {
      icon: 'map',
      title: 'Trovabile in zona',
      text: 'Dati strutturati con attività, coordinate, orari e punto d\'incontro.',
    },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'Dal sito in produzione',
    highlight: 'in produzione',
    lead: 'Schermate del sito pubblico, desktop e telefono.',
    items: [
      {
        id: 'home',
        label: 'Home invernale',
        media: {
          type: 'image',
          src: `${base}/home.webp`,
          alt: 'La pagina iniziale in versione invernale',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'La pagina iniziale in versione invernale: titolo che si scrive da solo, prenotazione e servizi.',
      },
      {
        id: 'chip',
        label: 'Listino: scelte',
        media: {
          type: 'image',
          src: `${base}/prezzi-chip.webp`,
          alt: 'Le scelte di disciplina e di tipo di corso sul listino',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'Le due file di scelte: disciplina e tipo di corso.',
      },
      {
        id: 'listino',
        label: 'Listino: prezzi',
        media: {
          type: 'image',
          src: `${base}/prezzi-listino.webp`,
          alt: 'Le schede di prezzo dei corsi dei sabati',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'Le schede dei corsi del sabato, con date, orari e prezzo.',
      },
      {
        id: 'telefono',
        label: 'Su telefono',
        media: {
          type: 'image',
          src: `${base}/mobile-prezzi.webp`,
          alt: 'Il listino su telefono',
          ratio: '9/19.5',
          frame: 'phone',
        },
        note: 'Lo stesso listino su uno schermo di 390 pixel.',
      },
      {
        id: 'links',
        label: 'Pagina dei link',
        media: {
          type: 'image',
          src: `${base}/linktree.webp`,
          alt: 'La pagina dei link nella versione invernale',
          ratio: '9/19.5',
          frame: 'phone',
        },
        note: 'La pagina dei link dei profili social, nella versione invernale.',
      },
    ],
  },

  tech: [
    {
      title: 'Un interruttore, molte pagine',
      text:
        'La regola della stagione è una sola. Home, prezzi, corsi, prenotazione e menu la leggono, quindi cambiare il comportamento vuol dire cambiarla in un punto.',
      tags: ['Un solo punto di verità', 'Stagione automatica'],
    },
    {
      title: 'Stagione letta al momento della visita',
      text:
        'Le pagine valutano la stagione quando le apri, non quando sono state pubblicate: nessun cambio rimane congelato alla data dell\'ultimo aggiornamento. Anche la pagina dei link si aggiorna da sola.',
      tags: ['Sempre aggiornato'],
    },
    {
      title: 'Trovabile dai motori di ricerca',
      text:
        'Ogni pagina ha i suoi titoli e la sua descrizione. L\'attività è descritta con coordinate, orari e punto d\'incontro, e la mappa del sito resta sempre aggiornata.',
      tags: ['Visibilità locale', 'Dati strutturati'],
    },
    {
      title: 'Camp come progetto a parte',
      text:
        'La landing del camp è separata, con un modulo in quattro passi. Così si cambia o si spegne senza toccare il sito principale.',
      tags: ['Modulo in quattro passi'],
    },
  ],

  cta: {
    title: 'Un sito che cambia con la stagione',
    highlight: 'cambia con la stagione',
    text: 'Il sito della Scuola Sci Piancavallo è online: corsi, prezzi e prenotazione in un posto solo.',
    primary: { label: 'Apri il sito', href: 'https://www.scuolascipiancavallo.it', external: true },
  },
} satisfies Landing;
