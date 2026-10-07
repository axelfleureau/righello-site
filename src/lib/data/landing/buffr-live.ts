import type { Landing } from './types';

const A = '/progetti/landing/buffr-live';

export default {
  variant: 'gestionale',
  tagline: 'Il calcio dei dilettanti, in diretta dal campo.',

  metrics: [
    { value: 4, label: 'pagine, dal giorno alla squadra', note: 'partite del giorno, scheda partita, calendario del girone, squadre' },
    { value: 1125, label: 'squadre con la loro pagina', note: 'somma delle squadre nell\'indice Squadre del sito, oggi' },
    { value: 70, label: 'test automatici', note: 'test che passano oggi: stato della partita, minuto, nomi, resoconti' },
  ],

  chapters: [
    {
      id: 'perche',
      kicker: 'Il problema',
      title: 'Il calcio dei dilettanti ha pochi schermi.',
      highlight: 'pochi schermi',
      text:
        'Sotto la Serie D le partite si giocano, ma il risultato si trova a fatica: pagine sparse, calendari che cambiano, niente cronaca. BUFFR Live mette in un posto solo le partite di oggi, i calendari e le classifiche.',
      bullets: [
        'Partite per giorno, con gli stemmi delle squadre',
        'Calendario e classifica di ogni girone, con il campo',
        'Un sito aperto a tutti e un\'app per iPhone in prova',
      ],
      media: [
        {
          type: 'image',
          src: `${A}/partite-del-giorno.webp`,
          alt: 'Il sito BUFFR Live: le partite del giorno con stemmi, risultati e la barra dei giorni',
          caption: 'Le partite del giorno: la diretta in cima, poi i risultati dei gironi.',
          ratio: '990/940',
          frame: 'browser',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'campo',
      kicker: 'Come arriva il dato',
      title: 'Il risultato nasce a bordo campo. E non inventa niente.',
      highlight: 'non inventa niente',
      text:
        'Il cronista segna gol, cartellini e cambi con il Palmare. BUFFR Live decide lo stato vero della partita, calcola il minuto e toglie le prove. Al fischio finale scrive il resoconto dai soli fatti e lo controlla: se non tornano, non esce.',
      bullets: [
        'Una partita dimenticata aperta non resta «in diretta»',
        'Le prove del cronista restano fuori dal feed',
        'Nelle partite giovanili si scrive il numero di maglia',
      ],
      media: [
        {
          type: 'image',
          src: `${A}/scheda-partita.webp`,
          alt: 'La scheda di una partita finita: titolo, stemmi, punteggio, campionato e le schede Resoconto, Cronaca, Formazioni',
          caption: 'La scheda partita: resoconto, cronaca e formazioni.',
          ratio: '1100/465',
          frame: 'browser',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'dove',
      kicker: 'Dove si gioca',
      title: 'Il campo giusto, o nessun campo.',
      highlight: 'nessun campo',
      text:
        'Per mettere una partita sulla mappa serve il campo. BUFFR Live lo ricava dall\'indirizzo della Lega e lo controlla: se il punto cade troppo lontano dal paese della squadra di casa, non lo prende per buono. Meglio un pin approssimato dichiarato che uno preciso e sbagliato.',
      bullets: [
        'Il campo si confronta con un punto indipendente',
        'Il pin approssimato si vede come tale, tratteggiato',
        'Mappa a tutto schermo nell\'app, con le partite in corso',
      ],
      media: [
        {
          type: 'image',
          src: `${A}/campionato-calendario.webp`,
          alt: 'Il calendario di un girone di Eccellenza con risultati, orari, campo e link portami lì',
          caption: 'Il calendario del girone: orario, campo, indirizzo e "portami lì".',
          ratio: '1320/900',
          frame: 'browser',
        },
      ],
      layout: 'media-right',
    },
  ],

  features: [
    { icon: 'calendar', title: 'Partite per giorno', text: 'Una barra di giorni, la diretta in cima e i risultati dei gironi sotto.' },
    { icon: 'bolt', title: 'Diretta dal campo', text: 'Gol e cronaca appena li segna il cronista, con il minuto che avanza da solo.' },
    { icon: 'map', title: 'Mappa dei campi', text: 'In lista si filtra per vicinanza, squadre seguite o regione.' },
    { icon: 'play', title: 'Gol dal campo', text: 'Se la squadra ha acceso la pubblicazione in BUFFR, il gol compare nella scheda partita.' },
    { icon: 'users', title: 'Pagina per squadra', text: 'Stemma, rosa e partite seguite, dalla stessa anagrafica degli altri prodotti Righello.' },
    { icon: 'link', title: 'Condividi con anteprima', text: 'Un link che mostra squadre, risultato e giorno e, nell\'app, apre la partita.' },
  ],

  demo: {
    kicker: 'Il sito',
    title: 'Dal giorno alla squadra.',
    highlight: 'alla squadra',
    lead: 'Schermate del sito online, prese oggi. Squadre e competizioni sono vere, i nomi dei giocatori non compaiono.',
    items: [
      {
        id: 'giorno',
        label: 'Partite del giorno',
        media: { type: 'image', src: `${A}/partite-del-giorno-testa.webp`, alt: 'Le partite del giorno con stemmi e risultati', ratio: '990/619', frame: 'browser' },
        note: 'La diretta in cima, i giorni giocati in alto, i risultati dei gironi sotto.',
      },
      {
        id: 'girone',
        label: 'Calendario del girone',
        media: { type: 'image', src: `${A}/campionato-calendario.webp`, alt: 'Il calendario di un girone', ratio: '1320/900', frame: 'browser' },
        note: 'Ogni giornata d\'andata e di ritorno, con campo e indirizzo di ogni partita.',
      },
      {
        id: 'squadre',
        label: 'Le squadre',
        media: { type: 'image', src: `${A}/squadre.webp`, alt: 'L\'indice delle squadre per regione e campionato', ratio: '1440/1000', frame: 'browser' },
        note: 'Le squadre divise per regione e campionato, con il numero di squadre di ognuno.',
      },
    ],
  },

  tech: [
    {
      title: 'Un solo punto decide cosa esce',
      text:
        'Un solo passaggio trasforma i dati del cronista in partita pubblica: stato, minuto, posizione. Le pagine sono pronte quando arrivano, così le leggono anche i motori di ricerca.',
      tags: ['Dati sempre allineati', 'Veloce'],
    },
    {
      title: 'Lo stato vero, non quello dichiarato',
      text:
        'Il Palmare segna «in diretta» anche partite lasciate aperte da settimane. Il sistema guarda attività, orologio e durata e decide cosa è davvero in corso, con la stessa regola su sito e app.',
      tags: ['Un solo punto di verità', 'Test automatici'],
    },
    {
      title: 'Un archivio unico delle squadre',
      text:
        'Squadre, stemmi e ritratti stanno in un solo archivio, usato anche da Palmare, regia e BUFFR. Le misure d\'uso dell\'app sono anonime: nessun profilo per persona.',
      tags: ['Anagrafica Righello', 'Privacy'],
    },
  ],

  cta: {
    title: 'Guarda le partite di oggi.',
    highlight: 'oggi',
    text: 'Il sito è online e aperto a tutti; l\'app per iPhone è in prova su TestFlight.',
    primary: { label: 'Apri BUFFR Live', href: 'https://live.wearerighello.com', external: true },
  },
} satisfies Landing;
