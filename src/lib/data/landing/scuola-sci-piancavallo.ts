import type { Landing } from './types';

const base = '/progetti/landing/scuola-sci-piancavallo';

export default {
  variant: 'caso',
  tagline: 'Un sito che segue la stagione: d\'inverno la neve e i corsi, d\'estate il camp.',

  metrics: [
    {
      value: 4,
      label: 'discipline con la loro pagina',
      note: 'sci alpino, snowboard, telemark, sci di fondo',
    },
    {
      value: 11,
      label: 'settimane di camp nel modulo',
      note: 'settimane selezionabili nella landing del camp estivo 2026',
    },
    {
      value: 2,
      label: 'lingue',
      note: 'italiano e inglese: ogni testo ha le due versioni',
    },
  ],

  chapters: [
    {
      id: 'stagione',
      kicker: 'La stagione',
      title: 'Una scuola, due stagioni, un solo sito',
      highlight: 'un solo sito',
      text:
        'La scuola lavora sulla neve d\'inverno e sul camp, con la pista sintetica, d\'estate. Cambiare testi e pulsanti a mano due volte l\'anno è un lavoro che si dimentica. Ora la stagione è un\'informazione sola, letta da home, prezzi, corsi, prenotazione e menu.',
      bullets: [
        'D\'inverno: corsi di sci e snowboard, prenotazione sul sistema della scuola.',
        'D\'estate: camp, pista sintetica e lezioni private, prenotazione dal camp.',
        'Un interruttore manuale anticipa o ritarda il cambio.',
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
      kicker: 'Il listino',
      title: 'Il listino si filtra con due scelte',
      highlight: 'due scelte',
      text:
        'Sul listino 2026/27 si sceglie la disciplina, sci o snowboard, e il tipo di corso, VIP o Gioca la Neve. La pagina mostra solo quella sezione. Le scelte stanno su due righe, non quattro in fila, così sul telefono restano ordinate.',
      bullets: [
        'Quattro combinazioni, un\'unica sezione che cambia contenuto.',
        'Le lezioni private valgono per ogni disciplina, fuori dal filtro.',
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
      id: 'linktree',
      kicker: 'Fuori dal sito',
      title: 'Anche la pagina dei link cambia con la stagione',
      highlight: 'cambia con la stagione',
      text:
        'La pagina dei link nei profili social segue la stessa regola: pulsanti e colori cambiano con il mese. Da settembre a marzo parla di corsi e gift card; in estate mette in cima il camp. Si aggiorna da sola, senza interventi.',
      bullets: [
        'I mesi invernali sono definiti in un punto solo.',
        'Il primo pulsante è sempre quello da far cliccare.',
        'I colori sono definiti in un punto solo.',
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
      icon: 'link',
      title: 'Prenotazione diretta',
      text: 'Link alla pagina giusta del sistema di prenotazione, con collettive o private e disciplina già scelte.',
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
        id: 'telefono',
        label: 'Su telefono',
        media: {
          type: 'image',
          src: `${base}/mobile-home.webp`,
          alt: 'La pagina iniziale su telefono',
          ratio: '9/19.5',
          frame: 'phone',
        },
        note: 'La stessa pagina iniziale su uno schermo di 390 pixel.',
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
        'La regola della stagione è una sola e viene letta quando apri la pagina, non quando è stata pubblicata: nessun cambio resta congelato alla data dell\'ultimo aggiornamento.',
      tags: ['Un solo punto di verità', 'Sempre aggiornato'],
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
        'La landing del camp è separata, con un modulo in quattro passi che ricorda le settimane scelte. Così si cambia o si spegne senza toccare il sito principale.',
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
