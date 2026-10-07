import type { Landing } from './types';

const A = '/progetti/landing/buffr';

export default {
  tagline: 'Registra sempre. Salva dopo che è successo.',

  metrics: [
    { value: 120, suffix: ' s', label: 'di buffer al massimo', note: 'cursore "Durata massima" in Impostazioni › Registrazione' },
    { value: 5, label: 'momenti della partita', note: 'apertura, azione, gol, intervallo, fine: i tipi di clip che il montaggio riconosce' },
    { value: 3, label: 'montaggi per ogni partita', note: 'partita intera, solo gol, story verticale' },
    { text: '4K · 60', label: 'fotogrammi al secondo al massimo', note: 'risoluzione e cadenza che si scelgono in Impostazioni (1080p o 4K; 24, 30 o 60)' },
  ],

  chapters: [
    {
      id: 'buffer',
      kicker: 'Il buffer che torna indietro',
      title: 'Premi dopo il gol, non prima.',
      highlight: 'dopo il gol',
      text:
        'In una partita le cose che contano durano un secondo. La camera registra sempre e tiene in memoria gli ultimi secondi. Quando succede qualcosa tocchi, e quei secondi appena passati diventano una clip: si salva solo quello che tocchi.',
      bullets: [
        'Fino a 120 secondi di buffer, scelti in Impostazioni',
        'Una clip non attraversa mai una pausa',
        'Uscendo dalla camera il buffer si ferma e riparte da solo',
      ],
      media: [
        {
          type: 'image',
          src: `${A}/benvenuto.webp`,
          alt: 'Il benvenuto di BUFFR: Tocchi dopo, la clip parte da prima',
          caption: 'Il benvenuto spiega l\'idea: la camera registra sempre, tu tocchi dopo.',
          ratio: '9/19.5',
          frame: 'phone',
        },
        {
          type: 'image',
          src: `${A}/camera.webp`,
          alt: 'La camera di BUFFR in modalità calcio: i quattro pulsanti dei momenti e le ottiche 0,5×, 1× e 2×',
          caption: 'La camera in modalità calcio. Nel simulatore l\'anteprima è nera: sul telefono qui c\'è la ripresa.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'momenti',
      kicker: 'Un tocco per momento',
      title: 'Un pulsante per ogni momento della partita.',
      highlight: 'ogni momento',
      text:
        'Gol, azione, fischio, inizio: un pulsante ciascuno, con i suoi secondi e il suo nome. Dopo un gol BUFFR chiede di chi è e il punteggio si aggiorna da solo. In libreria ogni clip si può correggere quando vuoi.',
      bullets: [
        'Il punteggio si calcola dai gol di tutta la partita',
        'La distinta si fotografa: iPhone la raddrizza e la legge',
        'Stelline da 1 a 5 per scegliere cosa entra nel montaggio',
      ],
      media: [
        {
          type: 'image',
          src: `${A}/clip.webp`,
          alt: 'La clip aperta: i momenti Apertura, Azione, Gol, Intervallo, Fine, la squadra del gol e le cinque stelline',
          caption: 'La clip aperta: il momento, la squadra del gol e le stelline. Clip di prova.',
          ratio: '9/19.5',
          frame: 'phone',
        },
        {
          type: 'image',
          src: `${A}/libreria.webp`,
          alt: 'La libreria: clip del giorno con il tipo, le stelline e la durata, e i filtri Gol, Stelline, Apertura',
          caption: 'La libreria: tipo, stelline e durata su ogni clip, con i filtri. Clip di prova.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'montaggio',
      kicker: 'Dal campo al video',
      title: 'Dalle clip al video della partita, anche con più telefoni.',
      highlight: 'video della partita',
      text:
        'Scegli lo stile e la testata: BUFFR monta punteggio, stacchi e grafiche, in tre uscite: la partita intera, i soli gol, la story verticale. Le clip di tutti i telefoni finiscono nella stessa partita, in ordine di tempo.',
      bullets: [
        'Il logo di chi trasmette negli stacchi, al posto di quello BUFFR',
        'Tre ruoli: proprietario, amministratore, operatore',
        'Il montaggio può girare nel cloud, con il telefono in tasca',
      ],
      media: [
        {
          type: 'image',
          src: `${A}/seleziona.webp`,
          alt: 'La libreria in modalità selezione: tre clip scelte e il pulsante Monta 3',
          caption: 'Scegli le clip e tocca Monta. Clip di prova.',
          ratio: '9/19.5',
          frame: 'phone',
        },
        {
          type: 'image',
          src: `${A}/esporta.webp`,
          alt: 'Il foglio Esporta: solo gol o tutte le clip, formato Reel 9:16, Post 4:5 o Orizzontale 16:9, colore delle grafiche',
          caption: 'Il foglio Esporta: cosa montare, in che formato e con quale colore.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'full',
    },
  ],

  features: [
    { icon: 'clock', title: 'Buffer retroattivo', text: 'La camera tiene gli ultimi secondi. Tocchi dopo, e la clip parte da prima.' },
    { icon: 'bolt', title: 'Clip al tocco', text: 'Gol, azione, fischio, inizio. Ogni pulsante salva i suoi secondi e dà il nome alla clip.' },
    { icon: 'scan', title: 'Distinta fotografata', text: 'Si fotografa il foglio: iPhone lo trova, lo raddrizza e lo legge. Le rose arrivano coi numeri.' },
    { icon: 'layers', title: 'Taglio senza rischi', text: 'Accorci una clip quando vuoi: il file originale non si tocca.' },
    { icon: 'wand', title: 'Stile e testata', text: 'Grafiche nei colori che scegli, con il logo di chi trasmette negli stacchi.' },
    { icon: 'camera', title: 'Camera da campo', text: 'Grandangolo 0,5×, 1× e 2×. Riprende anche di traverso, e le clip restano dritte.' },
  ],

  demo: {
    kicker: 'Dentro l\'app',
    title: 'Dalla camera al montaggio, schermata per schermata.',
    highlight: 'montaggio',
    lead: 'Schermate della versione attuale dell\'app (1.2.7), catturate sul simulatore. Il simulatore non ha la camera e le clip qui sono prove disegnate, non riprese vere.',
    items: [
      {
        id: 'benvenuto',
        label: 'Primo avvio',
        media: { type: 'image', src: `${A}/benvenuto.webp`, alt: 'Il benvenuto: Tocchi dopo, la clip parte da prima', ratio: '9/19.5', frame: 'phone' },
        note: 'Tre schermate spiegano l\'idea: la camera registra sempre, tu tocchi dopo.',
      },
      {
        id: 'camera',
        label: 'Camera',
        media: { type: 'image', src: `${A}/camera.webp`, alt: 'La camera con i pulsanti dei momenti', ratio: '9/19.5', frame: 'phone' },
        note: 'In modalità calcio i pulsanti sono GOAL, AZIONE, FISCHIO e START, ognuno con i suoi secondi. In basso a sinistra, la libreria con il numero di clip.',
      },
      {
        id: 'libreria',
        label: 'Libreria',
        media: { type: 'image', src: `${A}/libreria.webp`, alt: 'La libreria con le clip del giorno', ratio: '9/19.5', frame: 'phone' },
        note: 'Ogni clip mostra il tipo, le stelline e la durata. I filtri contano quante ce ne sono: Gol, Stelline, Apertura.',
      },
      {
        id: 'clip',
        label: 'Clip',
        media: { type: 'image', src: `${A}/clip.webp`, alt: 'La clip aperta con momento, squadra del gol e stelline', ratio: '9/19.5', frame: 'phone' },
        note: 'Un tocco per cambiare il momento, uno per la squadra del gol, uno per il voto. Sotto: taglia, condividi, salva in Foto.',
      },
      {
        id: 'seleziona',
        label: 'Selezione',
        media: { type: 'image', src: `${A}/seleziona.webp`, alt: 'La libreria con tre clip selezionate', ratio: '9/19.5', frame: 'phone' },
        note: 'Selezioni le clip da montare e il pulsante dice cosa succede: Monta 3.',
      },
      {
        id: 'esporta',
        label: 'Esporta',
        media: { type: 'image', src: `${A}/esporta.webp`, alt: 'Il foglio Esporta con formato e colore', ratio: '9/19.5', frame: 'phone' },
        note: 'Solo i gol o tutte le clip, in Reel 9:16, Post 4:5 o Orizzontale 16:9, con le grafiche BUFFR, rosse o azzurre.',
      },
      {
        id: 'impostazioni',
        label: 'Impostazioni',
        media: { type: 'image', src: `${A}/impostazioni.webp`, alt: 'Le impostazioni: modalità calcio, risoluzione 1080p o 4K, fotogrammi al secondo', ratio: '9/19.5', frame: 'phone' },
        note: 'Modalità calcio, risoluzione (1080p o 4K) e fotogrammi al secondo (24, 30, 60).',
      },
      {
        id: 'stelline',
        label: 'Stelline e durata',
        media: { type: 'image', src: `${A}/impostazioni-stelline.webp`, alt: 'Le impostazioni della durata massima e delle stelline', ratio: '9/19.5', frame: 'phone' },
        note: 'La durata massima del buffer e le stelline al salvataggio, che restano sullo schermo per i secondi che scegli.',
      },
    ],
  },

  tech: [
    {
      title: 'Camera nativa su iPhone',
      text:
        'Il buffer è scritto per iPhone, a livello nativo, non in una pagina web. La camera lavora solo quando è in primo piano, per non scaldare il telefono.',
      tags: ['App nativa', 'Risparmio di batteria'],
    },
    {
      title: 'Montaggio sul telefono e nel cloud',
      text:
        'Sul telefono monta l\'esportatore dell\'app; nel cloud ogni montaggio ha il suo spazio di lavoro, che si spegne a lavoro finito. Le clip si guardano in streaming, con anteprime leggere.',
      tags: ['Montaggio automatico', 'Streaming'],
    },
    {
      title: 'Regole scritte una volta sola',
      text:
        'Cosa è un gol, quale punteggio c\'era a ogni clip, come si taglia: sta in un solo posto, letto da telefono e montaggio. Squadre, stemmi e rose vengono dall\'anagrafica unica di Righello.',
      tags: ['Un solo punto di verità', 'Anagrafica Righello'],
    },
  ],

  cta: {
    title: 'Prova BUFFR alla prossima partita.',
    highlight: 'BUFFR',
    text: 'L\'app è su App Store ed è gratuita da scaricare. Serve un iPhone con iOS 17 o successivo.',
    primary: { label: 'Scarica su App Store', href: 'https://apps.apple.com/it/app/buffr/id6769990725', external: true },
  },
} satisfies Landing;
