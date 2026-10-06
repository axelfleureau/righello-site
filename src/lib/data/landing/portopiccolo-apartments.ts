import type { Landing } from './types';

const base = '/progetti/landing/portopiccolo-apartments';

export default {
  tagline: 'Il sito che prenota da solo: prezzi, date e pagamento collegati al gestionale.',

  metrics: [
    {
      value: 34,
      label: 'appartamenti in catalogo',
      note: 'contati sull\'API pubblica del sito il 6 ottobre 2026',
    },
    {
      value: 4,
      label: 'lingue',
      note: 'italiano, inglese, tedesco, russo: il selettore del sito',
    },
    {
      value: 103,
      label: 'indirizzi nella mappa del sito',
      note: 'voci del sitemap.xml pubblico, contate il 6 ottobre 2026',
    },
    {
      value: 46,
      label: 'campi interni tolti dall\'API pubblica',
      note: 'elenco del filtro in functions/api: 40 campi della scheda e 6 dei prezzi',
    },
  ],

  chapters: [
    {
      id: 'prezzo-vero',
      kicker: 'Il problema',
      title: 'Il prezzo che vedi è quello che puoi pagare',
      highlight: 'puoi pagare',
      text:
        'Il prezzo base di un appartamento è un punto di partenza, non una tariffa che l\'ospite trova davvero. Il sito legge il calendario del gestionale e mostra il costo del primo soggiorno che si può prenotare sul serio: stessi giorni liberi, stesso minimo di notti, stessa regola del selettore di date.',
      bullets: [
        'Un soggiorno vale solo se tutte le notti sono libere e il giorno di partenza non è occupato.',
        'Il prezzo in catalogo è tutto incluso: alloggio, pulizie e tasse, con la tariffa non rimborsabile.',
        'Si calcola una volta e si tiene per sei ore: il catalogo non interroga il gestionale a ogni visita.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/catalogo.webp`,
          alt: 'Il catalogo degli appartamenti con il prezzo «da» su ogni scheda',
          caption: 'Il catalogo: ogni scheda dice da quanto, per quante notti e cosa è compreso.',
          ratio: '16/10',
          frame: 'browser',
        },
        {
          type: 'image',
          src: `${base}/mobile-catalogo.webp`,
          alt: 'Il catalogo su telefono, con il prezzo sulle foto e sotto il nome',
          caption: 'Lo stesso catalogo su telefono.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'disponibilita',
      kicker: 'Il come',
      title: 'Date libere in tempo reale, non una vetrina',
      highlight: 'in tempo reale',
      text:
        'Calendario, preventivi e prenotazioni arrivano dal gestionale Guesty attraverso le sue API. Quello che il sito mostra è lo stato del momento. Se le date scelte sono occupate lo dice, e propone la richiesta di prenotazione.',
      bullets: [
        'Le notti occupate sono barrate nel calendario e il minimo di notti è scritto prima della scelta.',
        'Se il gestionale è lento, il sito smette di aspettare dopo pochi secondi e ripiega sul catalogo.',
        'I neonati non entrano mai nel conto degli ospiti: restano gratis e arrivano allo staff come nota.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/calendario.webp`,
          alt: 'Il calendario di disponibilità di un appartamento, con i giorni occupati barrati',
          caption: 'Il calendario di una scheda: i giorni già occupati sono barrati.',
          ratio: '16/9',
          frame: 'browser',
        },
        {
          type: 'image',
          src: `${base}/mobile-scheda.webp`,
          alt: 'Una scheda su telefono con il prezzo «da» calcolato dal calendario',
          caption: 'Su telefono: il prezzo «da» e la scelta delle date.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'pagamento',
      kicker: 'Pagamento',
      title: 'Un pagamento non è fallito finché non lo è davvero',
      highlight: 'non lo è davvero',
      text:
        'I dati della carta si inseriscono in un riquadro del circuito di pagamento del gestionale: non passano dal nostro server. Dopo il pagamento il sito rilegge l\'esito fino a quattro volte in circa cinque secondi. Un rifiuto vero è definitivo subito. Se l\'esito non è ancora chiaro, il sito non annulla e non fa ripagare: tiene le date bloccate e avvisa lo staff.',
      bullets: [
        'Tre esiti, non due: confermato, rifiutato, in attesa di conferma.',
        'Una prenotazione con un pagamento riuscito o in arrivo non viene mai annullata dal sito.',
        'Gli extra scelti (parcheggio, colazione, spiaggia, culla, biancheria) entrano come voci della prenotazione.',
      ],
    },
    {
      id: 'versione-2',
      kicker: 'In collaudo',
      title: 'La nuova versione: movimento che aiuta, non che rallenta',
      highlight: 'movimento che aiuta',
      text:
        'Su un indirizzo non pubblico è in prova una nuova versione del sito: catalogo con mappa e prezzi sui punti, galleria, un orologio che segue il giorno. Tutto il movimento sta in un sistema solo: i tempi in un file, le scene dichiarate nelle pagine, la libreria di animazione caricata solo quando serve. Lo scorrimento resta quello del browser.',
      bullets: [
        'Se lo script di animazione non parte, la pagina è comunque completa.',
        'Date e ospiti scelti vengono ricordati e il pagamento si fa in due passi.',
        'Il checkout della nuova versione è ancora in prova: non incassa.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/v2-home.webp`,
          alt: 'La nuova versione del sito, in collaudo: la pagina iniziale',
          caption: 'La nuova versione, in collaudo: la pagina iniziale.',
          ratio: '16/10',
          frame: 'browser',
        },
      ],
      layout: 'media-right',
    },
  ],

  features: [
    {
      icon: 'calendar',
      title: 'Prezzo «da» reale',
      text: 'Calcolato dal primo soggiorno davvero prenotabile, non dalla tariffa di bassa stagione.',
    },
    {
      icon: 'link',
      title: 'Gestionale collegato',
      text: 'Calendari, preventivi e prenotazioni passano dalle API di Guesty, senza reinserire nulla.',
    },
    {
      icon: 'shield',
      title: 'API pulita',
      text: 'Ogni risposta pubblica passa da un filtro che toglie proprietari, formule e campi interni.',
    },
    {
      icon: 'cart',
      title: 'Extra in prenotazione',
      text: 'Parcheggio, colazione, spiaggia, culla e biancheria vengono aggiunti alla prenotazione.',
    },
    {
      icon: 'globe',
      title: 'Quattro lingue',
      text: 'Descrizioni, regolamento e testi sul quartiere sono tradotti a mano, senza servizi esterni.',
    },
    {
      icon: 'search',
      title: 'Ricerca per date',
      text: 'Si cerca per date e ospiti e si filtra per tipo di casa o per animali ammessi.',
    },
    {
      icon: 'users',
      title: 'Area ospite',
      text: 'Con codice e email l\'ospite ritrova la sua prenotazione.',
    },
    {
      icon: 'map',
      title: 'Pagine per i motori',
      text: 'Ogni pagina ha il suo indirizzo canonico e la mappa del sito è generata dal server.',
    },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'Dal sito vero',
    highlight: 'sito vero',
    lead: 'Schermate del sito pubblico, senza dati di ospiti o di prenotazioni.',
    items: [
      {
        id: 'home',
        label: 'Home',
        media: {
          type: 'image',
          src: `${base}/home.webp`,
          alt: 'La pagina iniziale con la ricerca per date e ospiti',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'La pagina iniziale: da qui si cerca per date, tipo di casa e numero di ospiti.',
      },
      {
        id: 'catalogo',
        label: 'Catalogo',
        media: {
          type: 'image',
          src: `${base}/catalogo.webp`,
          alt: 'Il catalogo con il prezzo «da» su ogni scheda',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'Trentaquattro appartamenti, ognuno col prezzo del primo soggiorno prenotabile.',
      },
      {
        id: 'calendario',
        label: 'Calendario',
        media: {
          type: 'image',
          src: `${base}/calendario.webp`,
          alt: 'Il calendario di una scheda, con i giorni occupati barrati',
          ratio: '16/9',
          frame: 'browser',
        },
        note: 'Il calendario di una scheda: i giorni occupati sono barrati e il minimo di notti è scritto sopra.',
      },
      {
        id: 'tedesco',
        label: 'In tedesco',
        media: {
          type: 'image',
          src: `${base}/scheda-de.webp`,
          alt: 'Una scheda con il selettore di lingua su tedesco',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'La stessa scheda col selettore su DE: prezzo, pulsanti e testi cambiano lingua.',
      },
      {
        id: 'telefono',
        label: 'Su telefono',
        media: {
          type: 'image',
          src: `${base}/mobile-scheda.webp`,
          alt: 'Una scheda su telefono, larga 390 pixel',
          ratio: '9/19.5',
          frame: 'phone',
        },
        note: 'La scheda su telefono: prezzo «da» dal calendario e scelta di date e ospiti.',
      },
      {
        id: 'mappa',
        label: 'Con mappa',
        media: {
          type: 'image',
          src: `${base}/v2-mappa.webp`,
          alt: 'La nuova versione del catalogo, con la mappa e i prezzi sui punti',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'Dalla nuova versione, in collaudo: il catalogo con la mappa e i prezzi sui punti.',
      },
    ],
  },

  tech: [
    {
      title: 'Sito statico, API sul bordo della rete',
      text:
        'Il sito è un\'app React pubblicata su Cloudflare Pages. Le chiamate al gestionale passano da un\'unica API sul bordo della rete, così le credenziali non arrivano mai al browser.',
      tags: ['React', 'TypeScript', 'Vite', 'Cloudflare Pages', 'Functions'],
    },
    {
      title: 'Cache a più livelli',
      text:
        'Il catalogo sta in cache per quindici minuti, il prezzo «da» per sei ore. Le prenotazioni e i registri restano in un database.',
      tags: ['Cloudflare D1', 'Cache sul bordo', 'Guesty Open API'],
    },
    {
      title: 'Una lista di campi vietati',
      text:
        'Prima di uscire, ogni scheda pubblica perde 40 campi interni (proprietari, formule di commissione, codici di accesso) e 6 voci di prezzo che il sito non mostra. Vale per ogni strada che porta fuori una scheda.',
      tags: ['Filtro delle risposte', 'Sicurezza API'],
    },
    {
      title: 'Pagamento a prova di incertezza',
      text:
        'La carta viene tokenizzata dal circuito di pagamento, con la verifica a 3 passaggi quando la banca la chiede. Il sito distingue tra confermato, rifiutato e non ancora chiaro, e nel terzo caso non annulla mai.',
      tags: ['GuestyPay', 'Tokenizzazione', '3-D Secure'],
    },
    {
      title: 'Traduzioni a mano',
      text:
        'Italiano, inglese, tedesco e russo stanno nel codice, scritti a mano. Nessun testo e nessun dato degli ospiti viene mandato a un servizio di traduzione.',
      tags: ['i18n', 'TypeScript'],
    },
  ],

  cta: {
    title: 'Un sito collegato al gestionale',
    highlight: 'collegato al gestionale',
    text: 'Portopiccolo Apartments è online. Guardalo da vicino.',
    primary: { label: 'Apri il sito', href: 'https://www.portopiccoloapartments.com', external: true },
  },
} satisfies Landing;
