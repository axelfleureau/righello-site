import type { Landing } from './types';

const A = '/progetti/landing/buffr-live';

export default {
  tagline: 'Il calcio dei dilettanti, in diretta dal campo.',

  metrics: [
    { value: 5, suffix: ' s', label: 'per aggiornare una partita nell\'app', note: 'intervallo di aggiornamento della scheda partita (10 s per la lista)' },
    { value: 1, suffix: ' min', label: 'il giro con cui seguiamo le partite', note: 'frequenza del controllo automatico sul server' },
    { value: 1125, label: 'squadre con la loro pagina', note: 'somma delle squadre nell\'indice Squadre del sito, oggi' },
    { value: 70, label: 'test automatici', note: 'test del server che passano oggi: stato della partita, minuto, nomi, resoconti' },
  ],

  chapters: [
    {
      id: 'perche',
      kicker: 'Il problema',
      title: 'Il calcio dei dilettanti ha pochi schermi.',
      highlight: 'pochi schermi',
      text:
        'Sotto la Serie D le partite si giocano, ma il risultato si trova a fatica: pagine sparse, calendari che cambiano, niente cronaca. BUFFR Live mette in un posto solo le partite di oggi, i calendari e le classifiche, e racconta quelle dove c\'è un cronista in campo.',
      bullets: [
        'Partite per giorno, con gli stemmi delle squadre',
        'Calendario e classifica di ogni girone, con il campo e il link "portami lì"',
        'Un sito aperto a tutti e un\'app per iPhone, in prova su TestFlight',
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
      title: 'Il risultato nasce a bordo campo.',
      highlight: 'a bordo campo',
      text:
        'Il cronista segna gol, cartellini e cambi con il Palmare. BUFFR Live legge quello che il Palmare pubblica e lo ripulisce in un solo punto: decide lo stato vero della partita, calcola il minuto, toglie le prove. Quello che non è pubblico non esce.',
      bullets: [
        'Una partita dimenticata aperta non resta "in diretta": se l\'orologio è fermo da troppo, non è più ufficiale',
        'Le prove del cronista (partite finite a metà tempo, squadre "test") restano fuori dal feed',
        'Il minuto avanza sul telefono, con la stessa regola per server e app',
      ],
      layout: 'full',
    },
    {
      id: 'resoconto',
      kicker: 'Dopo il fischio',
      title: 'Il resoconto che non inventa niente.',
      highlight: 'non inventa niente',
      text:
        'Al fischio finale BUFFR Live scrive il resoconto partendo dai soli fatti registrati. Poi lo controlla: ogni punteggio, minuto e nome del testo deve stare nei fatti. Se non torna, l\'articolo non esce.',
      bullets: [
        'Nelle partite giovanili non si nominano i ragazzi: si scrive il numero di maglia',
        'Condividi con testo e anteprima disegnata: stemmi, punteggio e giorno',
        'Il link di una partita apre direttamente la scheda nell\'app',
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
        'Per mettere una partita sulla mappa serve il campo. Il Palmare non lo registra ancora, quindi BUFFR Live lo ricava dall\'indirizzo della Lega e lo controlla: se il punto cade troppo lontano dal paese della squadra di casa, non lo prende per buono. Meglio un pin dichiarato approssimato che uno preciso e sbagliato.',
      bullets: [
        'Controllo contro un\'ancora indipendente: 15 km dal paese della squadra di casa',
        'Il pin approssimato si vede come tale, con il gambo tratteggiato',
        'Mappa a tutto schermo nell\'app, con le partite in corso in evidenza',
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
    { icon: 'map', title: 'Mappa dei campi', text: 'Le partite sulla mappa, con il carosello che la guida. In lista si filtra per vicinanza, squadre seguite o regione.' },
    { icon: 'file', title: 'Resoconti verificati', text: 'Testo scritto dai fatti e controllato su punteggi, minuti e nomi prima di uscire.' },
    { icon: 'play', title: 'Il gol, ripreso dal campo', text: 'Se la squadra ha acceso la pubblicazione in BUFFR, il gol compare nella scheda partita.' },
    { icon: 'chart', title: 'Calendari e classifiche', text: 'Girone per girone, con i dati ufficiali della Lega dove sono disponibili.' },
    { icon: 'users', title: 'Pagina di ogni squadra', text: 'Stemma, rosa, partite seguite. La stessa anagrafica usata dagli altri prodotti Righello.' },
    { icon: 'link', title: 'Condividi con anteprima', text: 'Un link che mostra squadre, risultato e giorno, e che dentro l\'app apre la partita.' },
  ],

  demo: {
    kicker: 'Il sito',
    title: 'Quattro pagine, dal giorno alla squadra.',
    highlight: 'dal giorno alla squadra',
    lead: 'Schermate del sito online, prese oggi. Squadre e competizioni sono vere, i nomi dei giocatori non compaiono.',
    items: [
      {
        id: 'giorno',
        label: 'Partite del giorno',
        media: { type: 'image', src: `${A}/partite-del-giorno.webp`, alt: 'Le partite del giorno con stemmi e risultati', ratio: '990/940', frame: 'browser' },
        note: 'La diretta in cima, i giorni giocati in alto, i risultati dei gironi sotto.',
      },
      {
        id: 'partita',
        label: 'Scheda partita',
        media: { type: 'image', src: `${A}/scheda-partita.webp`, alt: 'La scheda di una partita finita', ratio: '1100/465', frame: 'browser' },
        note: 'Titolo, stemmi, punteggio, campionato e orario. Sotto: resoconto, cronaca e formazioni.',
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
      title: 'Un server che decide cosa esce',
      text:
        'Un solo punto trasforma i dati del cronista in partita pubblica: stato, minuto, posizione. Le pagine del sito sono composte sul server, così le leggono anche i motori di ricerca; al telefono il server risponde sempre senza cache, e tiene 5 secondi di cache solo al bordo.',
      tags: ['Cloudflare Workers', 'D1', 'KV'],
    },
    {
      title: 'Lo stato vero, non quello dichiarato',
      text:
        'Il Palmare segna "in diretta" anche partite lasciate aperte da settimane. Il server guarda l\'attività, l\'orologio e la durata, e decide da solo cosa è davvero in corso. Il minuto si calcola con la stessa funzione sul server e nell\'app.',
      tags: ['TypeScript', 'Test automatici'],
    },
    {
      title: 'Un archivio unico delle squadre',
      text:
        'Squadre, stemmi e ritratti stanno in un solo archivio, usato anche da Palmare, regia e BUFFR. I nomi si riconoscono con una sola graduatoria: nome senza sigle, corrispondenza, campionato, regione di chi chiede.',
      tags: ['Cloudflare D1', 'R2', 'Anagrafica Righello'],
    },
    {
      title: 'Posizioni che si controllano',
      text:
        'Il campo si cerca da indirizzo e mappe aperte, e si confronta con un punto indipendente. Un omonimo non diventa una certezza.',
      tags: ['OpenStreetMap', 'Nominatim', 'Overpass'],
    },
    {
      title: 'App leggera e rispettosa',
      text:
        'L\'app è in React Native con lo stesso stile di BUFFR, verificato a ogni build. Le animazioni rispettano "Riduci movimento". Le misure d\'uso sono anonime: un identificativo nuovo a ogni apertura, nessun profilo per persona.',
      tags: ['Expo', 'React Native', 'PostHog'],
    },
  ],

  cta: {
    title: 'Guarda le partite di oggi.',
    highlight: 'oggi',
    text: 'Il sito è online e aperto a tutti. L\'app per iPhone è in prova su TestFlight.',
    primary: { label: 'Apri BUFFR Live', href: 'https://live.wearerighello.com', external: true },
  },
} satisfies Landing;
