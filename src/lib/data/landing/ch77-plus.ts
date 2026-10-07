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
        "Per guardare una partita in esclusiva bisogna accedere e pagare. Farlo sul televisore, lettera per lettera, è lento e scoraggia. CH77+ sposta tutto sul telefono, dove l'accesso e il pagamento sono già comodi, e lascia alla TV solo il compito di mostrare.",
      bullets: [
        'La TV mostra un codice e un QR',
        'Il telefono apre la pagina di attivazione, con il codice già compilato',
        'Accesso e pagamento solo dal telefono, mai dal televisore',
      ],
      media: [
        {
          type: 'image',
          src: '/progetti/landing/ch77-plus/tv-codice-qr.webp',
          alt: "Schermata dell'app Android TV di Canale 77: titolo Accedi con il telefono, un QR code, il codice di abbinamento e la scritta In attesa dell'accesso dal telefono",
          caption: 'Sulla TV: il QR e il codice. La schermata si aggiorna da sola.',
          ratio: '16/9',
          frame: 'monitor',
        },
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
        "Lo spettatore non deve imparare niente: inquadra, entra con il suo account, e la televisione se ne accorge da sola. Non c'è un pulsante da premere sul telecomando.",
      bullets: [
        'Inquadra il QR con la fotocamera del telefono',
        'Entra con il tuo account e attiva Premium',
        'La TV si sblocca da sola e mostra le dirette in esclusiva',
      ],
      layout: 'full',
    },
    {
      id: 'redazione',
      kicker: 'Per la redazione',
      title: 'Abbonamenti e omaggi, senza confonderli.',
      highlight: 'senza confonderli',
      text:
        "L'accesso può arrivare da un abbonamento, che si paga e si annulla da un portale, oppure da un omaggio deciso dalla redazione. Le due strade hanno regole diverse e dichiarate: chi guarda non vede la differenza, chi gestisce sì.",
      bullets: [
        'Abbonamento: pagamento sicuro, rinnovo mensile, annullabile da un portale',
        'Omaggio o pass partita: concesso a mano, con scadenza facoltativa e revoca',
        'Ogni addebito è registrato una volta sola',
      ],
      layout: 'media-left',
    },
    {
      id: 'esclusive',
      kicker: 'Il contenuto',
      title: 'Le dirette in esclusiva stanno dove si guarda già.',
      highlight: 'dove si guarda già',
      text:
        "Una partita in esclusiva è una riga in un elenco, con orario e stato: in programma oppure in diretta. Compare nella scheda del calcio come «Dirette esclusive · Premium», nello stesso posto su HbbTV, sito e app TV, e resta visibile finché è in corso.",
      bullets: [
        'Un elenco unico, letto da tutti gli schermi',
        'In programma: visibile fino a due ore dopo l\'inizio previsto',
        'In diretta: visibile finché non arriva l\'orario di fine',
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
      layout: 'media-right',
    },
  ],
  graphic: 'ch77-plus',
  features: [
    {
      icon: 'scan',
      title: 'Codice e QR',
      text: 'La TV mostra un codice a 8 caratteri e un QR: si inquadra con la fotocamera, senza digitare nulla.',
      wide: true,
      media: {
        type: 'image',
        src: '/progetti/landing/ch77-plus/tv-codice-qr.webp',
        alt: "La finestra Accedi con il telefono dell'app Android TV, con QR e codice",
        ratio: '16/9',
        frame: 'monitor',
      },
    },
    {
      icon: 'device',
      title: 'Accesso dal telefono',
      text: "Si entra con il proprio account dalla pagina di attivazione, già pronta con il codice.",
      wide: true,
      media: {
        type: 'image',
        src: '/progetti/landing/ch77-plus/telefono-attiva.webp',
        alt: 'La pagina di attivazione sul telefono con il riquadro del codice',
        ratio: '390/844',
        frame: 'phone',
      },
    },
    { icon: 'clock', title: 'Il codice scade', text: 'Vale pochi minuti e si usa una volta sola: scaduto, la TV ne mostra uno nuovo.' },
    { icon: 'lock', title: 'Chiuso finché non c\'è una prova', text: "Se non si riesce a verificare un abbonamento il player resta chiuso, e si apre appena c'è una conferma." },
    { icon: 'users', title: 'Omaggi e pass', text: 'La redazione concede accesso fuori dagli abbonamenti, con scadenza facoltativa e revoca.' },
    { icon: 'globe', title: 'Ogni schermo', text: 'Lo stesso abbinamento funziona su HbbTV, sito, Samsung, LG e Android TV nativa.' },
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
      text: "Il codice e' breve, senza lettere che si confondono, e vale pochi minuti: se scade la TV ne mostra uno nuovo. L'accesso sul televisore dura mesi, poi si ripete l'abbinamento.",
      tags: ['Abbinamento a tempo', 'Comodo da leggere'],
    },
    {
      title: 'Una regola, tutti gli schermi',
      text: "Abbonamento, omaggio, abbinamento e partita sono regole scritte una volta sola: sito, app e televisori le applicano allo stesso modo, senza differenze fra uno schermo e l'altro.",
      tags: ['Un solo punto di verita\'', 'Ogni schermo'],
    },
    {
      title: 'Chiuso finche\' non c\'e\' una prova',
      text: "Se non si riesce a verificare un abbonamento, il player resta chiuso e si riapre appena c'e' una conferma. Chi ha diritto a guardare non aspetta, chi non ce l'ha non entra.",
      tags: ['Accesso sicuro'],
    },
  ],
  cta: {
    title: 'Vuoi un accesso così per i tuoi contenuti?',
    highlight: 'accesso così',
    text: 'L\'attivazione Premium di Canale 77 è online. Se hai contenuti da riservare a chi si abbona e uno schermo senza tastiera, il modello è riutilizzabile.',
    primary: { label: 'Apri Canale 77', href: 'https://ch77.wearerighello.com', external: true },
  },
} satisfies Landing;
