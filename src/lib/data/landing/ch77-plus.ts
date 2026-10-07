import type { Landing } from './types';

/**
 * CH77+ — fatti verificati, dalle schermate reali della pagina di attivazione e dell'app Android TV nativa.
 * Non si dice quante partite ci sono né quanti abbonati: non sono dati verificabili qui.
 */
export default {
  tagline: 'Il televisore si sblocca con il telefono.',
  hero: {
    type: 'image',
    src: '/progetti/landing/ch77-plus/tv-codice-qr.webp',
    alt: "L'app Android TV di Canale 77: sul catalogo, la finestra Accedi con il telefono con il QR e il codice di abbinamento",
    caption: "Sulla TV: la finestra di abbinamento con QR e codice. L'immagine e' dell'app vera.",
    ratio: '16/9',
    frame: 'monitor',
  },
  metrics: [
    { value: 8, label: 'caratteri nel codice mostrato sulla TV', note: 'senza lettere che si confondono' },
    { value: 10, suffix: ' min', label: 'validità del codice sulla TV', note: 'scaduto il tempo, la TV ne mostra uno nuovo' },
    { value: 90, suffix: ' giorni', label: 'durata dell\'accesso sul televisore', note: 'poi si ripete l\'abbinamento' },
    { value: 4, label: 'tipi di televisore abbinabili', note: 'HbbTV, Samsung, LG, Android TV' },
  ],
  chapters: [
    {
      id: 'perche',
      kicker: 'Il problema',
      title: 'Scrivere una password con il telecomando non è un accesso.',
      highlight: 'telecomando',
      text:
        "Per guardare una partita in esclusiva bisogna accedere e pagare. Farlo sul televisore, lettera per lettera, scoraggia. CH77+ sposta tutto sul telefono, dove accesso e pagamento sono già comodi, e lascia alla TV solo il compito di mostrare.",
      bullets: [
        'La TV mostra un codice e un QR',
        'Il telefono apre la pagina di attivazione, con il codice già compilato',
        'Accesso e pagamento solo dal telefono, mai dal televisore',
      ],
      media: [
        {
          type: 'image',
          src: '/progetti/landing/ch77-plus/telefono-attiva.webp',
          alt: 'La pagina di attivazione di Canale 77 aperta sul telefono, con il riquadro Codice mostrato sulla TV e il codice da abbinare',
          caption: 'Sul telefono: la pagina riconosce il codice della TV.',
          ratio: '390/844',
          frame: 'phone',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'spettatore',
      kicker: 'Per chi guarda',
      title: 'Tre mosse e la partita è sbloccata.',
      highlight: 'sbloccata',
      text:
        "Lo spettatore non deve imparare niente: inquadra, entra con il suo account, e la televisione se ne accorge da sola. Le dirette in esclusiva stanno dove si guarda già: nella scheda del calcio, come «Dirette esclusive · Premium».",
      bullets: [
        'Inquadra il QR con la fotocamera del telefono',
        'Entra con il tuo account e attiva Premium',
        'La TV si sblocca da sola e mostra le dirette',
      ],
      media: [
        {
          type: 'image',
          src: '/progetti/landing/canale77/android-tv-home.webp',
          alt: "L'app Android TV di Canale 77: sezioni Calcio FVG, Calcio Veneto, Rugby, Basket e il catalogo delle partite intere",
          caption: "Il catalogo dell'app Android TV, dove compare la riga delle dirette in esclusiva.",
          ratio: '16/9',
          frame: 'monitor',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'redazione',
      kicker: 'Per la redazione',
      title: 'Abbonamenti e omaggi, senza confonderli.',
      highlight: 'senza confonderli',
      text:
        "L'accesso arriva da un abbonamento, che si paga e si annulla da un portale, o da un omaggio deciso dalla redazione. Le regole sono diverse e dichiarate: chi guarda non vede la differenza, chi gestisce sì.",
      bullets: [
        'Abbonamento: pagamento sicuro, rinnovo mensile, annullabile dal portale',
        'Omaggio o pass partita: concesso a mano dalla redazione',
        "In programma: visibile fino a due ore dopo l'inizio previsto",
      ],
      layout: 'full',
    },
  ],
  graphic: 'ch77-plus',
  how: {
    title: 'Dal codice sulla TV allo sblocco',
    highlight: 'allo sblocco',
    lead: 'Cosa succede tra televisore, telefono e portale, passo dopo passo. Esempio illustrativo: tocca un passaggio per vederlo.',
  },
  features: [
    { icon: 'scan', title: 'Codice e QR', text: 'La TV mostra un codice a 8 caratteri e un QR: si inquadra, senza digitare nulla.' },
    { icon: 'clock', title: 'Codice a tempo', text: "Vale pochi minuti e si usa una volta sola: scaduto, la TV ne mostra uno nuovo." },
    { icon: 'lock', title: 'Chiuso senza prova', text: "Se non si verifica un abbonamento il player resta chiuso, e si apre appena arriva una conferma." },
    { icon: 'calendar', title: 'Elenco delle esclusive', text: 'Una riga per partita, con orario e stato, letta da ogni schermo: lo stesso elenco ovunque.' },
    { icon: 'globe', title: 'Ogni schermo', text: 'Lo stesso abbinamento funziona su HbbTV, sito, Samsung, LG e Android TV nativa.' },
    { icon: 'users', title: 'Omaggi con scadenza', text: 'Un omaggio può avere una data di fine e si può revocare.' },
  ],
  demo: {
    kicker: 'Schermate vere',
    title: 'Dal catalogo allo sblocco.',
    highlight: 'allo sblocco',
    lead: "Schermate reali, non disegni: l'app Android TV di Canale 77 e la pagina pubblica di attivazione.",
    items: [
      {
        id: 'catalogo',
        label: 'Il catalogo sulla TV',
        media: {
          type: 'image',
          src: '/progetti/landing/canale77/android-tv-home.webp',
          alt: "L'app Android TV di Canale 77: in alto le sezioni Calcio FVG, Calcio Veneto, Rugby, Basket e il pulsante CH77+, sotto le partite intere",
          caption: "L'app Android TV di Canale 77: sezioni, partite intere e, accanto all'icona dell'account, l'accesso con il telefono.",
          ratio: '16/9',
          frame: 'monitor',
        },
      },
      {
        id: 'tv',
        label: 'Abbinamento sulla TV',
        media: {
          type: 'image',
          src: '/progetti/landing/ch77-plus/tv-codice-qr.webp',
          alt: "L'app Android TV mostra il QR e il codice di abbinamento per accedere dal telefono",
          caption: "La finestra Accedi con il telefono: QR, codice e istruzioni. Il codice mostrato qui e' gia' scaduto.",
          ratio: '16/9',
          frame: 'monitor',
        },
      },
      {
        id: 'scheda',
        label: 'La scheda di un contenuto',
        media: {
          type: 'image',
          src: '/progetti/landing/canale77/android-tv-scheda.webp',
          alt: 'App Android TV nativa: scheda di un contenuto con anteprima, titolo, data, tipo e i pulsanti Guarda ora, Lista e Chiudi',
          caption: 'La scheda di un contenuto: guarda ora, aggiungi alla lista, chiudi.',
          ratio: '16/9',
          frame: 'monitor',
        },
      },
      {
        id: 'telefono',
        label: 'Attivazione sul telefono',
        media: {
          type: 'image',
          src: '/progetti/landing/ch77-plus/telefono-attiva.webp',
          alt: 'La pagina di attivazione sul telefono con il riquadro del codice mostrato sulla TV',
          caption: 'La pagina di attivazione con il codice gia\' inserito dal QR. Il prezzo non e\' mostrato in questa immagine.',
          ratio: '390/844',
          frame: 'phone',
        },
      },
    ],
  },
  tech: [
    {
      title: 'Un codice che dura il giusto',
      text: "Il codice è breve, senza lettere che si confondono, e vale pochi minuti: scaduto, la TV ne mostra uno nuovo. L'accesso sul televisore dura mesi, poi si ripete l'abbinamento.",
      tags: ['Abbinamento a tempo', 'Comodo da leggere'],
    },
    {
      title: 'Una regola, tutti gli schermi',
      text: "Abbonamento, omaggio, abbinamento e partita sono regole scritte una volta sola: sito, app e televisori le applicano allo stesso modo.",
      tags: ["Un solo punto di verità", 'Ogni schermo'],
    },
    {
      title: 'Conti giusti, porta chiusa',
      text: "Ogni addebito è registrato una sola volta. Senza prova di abbonamento il player resta chiuso e si riapre alla conferma: chi ha diritto non aspetta, chi non ce l'ha non entra.",
      tags: ['Accesso sicuro'],
    },
  ],
  cta: {
    title: 'Vuoi un accesso così per i tuoi contenuti?',
    highlight: 'accesso così',
    text: "L'attivazione Premium di Canale 77 è online, e il modello si riusa per ogni contenuto riservato su uno schermo senza tastiera.",
    primary: { label: 'Apri Canale 77', href: 'https://ch77.wearerighello.com', external: true },
  },
} satisfies Landing;
