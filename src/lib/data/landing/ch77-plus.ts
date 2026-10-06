import type { Landing } from './types';

/**
 * CH77+ — fatti verificati, dalle schermate reali della pagina di attivazione e dell'app Android TV nativa.
 * Non si dice quante partite ci sono né quanti abbonati: non sono dati verificabili qui.
 */
export default {
  tagline: 'Il televisore si sblocca con il telefono. Niente password col telecomando.',
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
        'Per guardare una partita in esclusiva bisogna accedere e pagare. Farlo sul televisore, lettera per lettera, è lento e scoraggia. CH77+ sposta tutto sul telefono, dove l\'accesso e il pagamento sono già comodi, e lascia alla TV soltanto un codice da mostrare.',
      bullets: [
        'La TV chiede un abbinamento e mostra un codice e un QR',
        'Il telefono apre la pagina di attivazione, con il codice già compilato',
        'Accesso e pagamento si fanno solo dal telefono, mai dal televisore',
      ],
      media: [
        {
          type: 'image',
          src: '/progetti/landing/ch77-plus/tv-codice-qr.webp',
          alt: 'Schermata dell\'app Android TV di Canale 77: titolo Accedi con il telefono, un QR code, il codice di abbinamento e la scritta In attesa dell\'accesso dal telefono',
          caption: 'Sulla TV: il QR e il codice. La schermata si aggiorna da sola.',
          ratio: '16/9',
          frame: 'browser',
        },
        {
          type: 'image',
          src: '/progetti/landing/ch77-plus/telefono-attiva.webp',
          alt: 'La pagina di attivazione di Canale 77 aperta sul telefono: titolo Il calcio locale, in diretta, e il riquadro Codice mostrato sulla TV con il codice da abbinare',
          caption: 'Sul telefono: la pagina di attivazione riconosce il codice della TV.',
          ratio: '390/844',
          frame: 'phone',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'accesso',
      kicker: 'Come è fatto',
      title: 'Un abbonamento, un omaggio: lo stesso sblocco.',
      highlight: 'lo stesso sblocco',
      text:
        'L\'accesso può arrivare da un abbonamento, che si paga e si annulla da un portale, oppure da un omaggio deciso dalla redazione. Le due strade hanno regole diverse e dichiarate: un abbonamento senza una scadenza verificabile non apre il player, un omaggio può non avere scadenza ma si può revocare.',
      bullets: [
        'Il pagamento è sicuro e ogni addebito è registrato una volta sola',
        'Gli omaggi (redazionali, pass partita) sono gestiti a parte e si revocano',
        'Chi guarda non vede la differenza; la redazione sì, e non le confonde',
      ],
      layout: 'media-left',
    },
    {
      id: 'esclusive',
      kicker: 'Il contenuto',
      title: 'Le dirette in esclusiva stanno dove lo spettatore guarda già.',
      highlight: 'dove lo spettatore guarda già',
      text:
        'Una partita in esclusiva è una riga in un elenco, con orario e stato: in programma oppure in diretta. Compare nella scheda del calcio come «Dirette esclusive · Premium», nello stesso posto su HbbTV, sito e app TV, e resta visibile finché è in corso. Aggiungerne una non richiede di toccare le app.',
      bullets: [
        'Un elenco unico, letto da tutte le superfici',
        'Una partita in programma resta visibile fino a due ore dopo l\'inizio previsto',
        'Una diretta si vede finché non arriva l\'orario di fine',
      ],
      layout: 'full',
    },
  ],
  graphic: 'ch77-plus',
  features: [
    { icon: 'scan', title: 'Codice e QR', text: 'La TV mostra un codice a 8 caratteri e un QR: si inquadra con la fotocamera.' },
    { icon: 'device', title: 'Accesso dal telefono', text: 'Si entra con il proprio account dalla pagina di attivazione, senza digitare nulla sul televisore.' },
    { icon: 'clock', title: 'Il codice scade', text: 'Un codice vale 10 minuti e si usa una volta sola. Il codice non contiene lettere che si confondono.' },
    { icon: 'lock', title: 'Chiusura per default', text: 'Se non si riesce a verificare un abbonamento, il player resta chiuso. Si apre solo quando c\'è una prova.' },
    { icon: 'cart', title: 'Pagamento e portale', text: 'Pagamento con carta sicuro, rinnovo mensile, annullabile da un portale dedicato.' },
    { icon: 'users', title: 'Omaggi e pass', text: 'La redazione concede accesso fuori dagli abbonamenti, con scadenza facoltativa e revoca.' },
    { icon: 'play', title: 'Dirette in esclusiva', text: 'Le partite in esclusiva compaiono in una riga dedicata della scheda del calcio.' },
    { icon: 'globe', title: 'Ogni schermo', text: 'Lo stesso abbinamento funziona su HbbTV, sito, Samsung, LG e Android TV nativa.' },
  ],
  demo: {
    kicker: 'Schermate vere',
    title: 'Il percorso, dal televisore al telefono.',
    highlight: 'dal televisore al telefono',
    lead: 'Due schermate reali, non disegni: la prima è l\'app Android TV di Canale 77, la seconda la pagina pubblica di attivazione.',
    items: [
      {
        id: 'tv',
        label: 'Sulla TV',
        media: {
          type: 'image',
          src: '/progetti/landing/ch77-plus/tv-codice-qr.webp',
          alt: 'L\'app Android TV mostra il QR e il codice di abbinamento per accedere dal telefono',
          caption: 'L\'app Android TV in attesa dell\'accesso: codice, QR e istruzioni.',
          ratio: '16/9',
          frame: 'browser',
        },
        note: 'Il codice mostrato in questa schermata è scaduto subito dopo lo scatto.',
      },
      {
        id: 'telefono',
        label: 'Sul telefono',
        media: {
          type: 'image',
          src: '/progetti/landing/ch77-plus/telefono-attiva.webp',
          alt: 'La pagina di attivazione sul telefono con il riquadro del codice mostrato sulla TV',
          caption: 'La pagina di attivazione con il codice già inserito dal QR. Il prezzo non è mostrato in questa immagine.',
          ratio: '390/844',
          frame: 'phone',
        },
      },
    ],
  },
  tech: [
    {
      title: 'Abbinamento senza segreti sul televisore',
      text: 'La TV riceve un codice e un controllo riservato. I segreti non vengono mai conservati in chiaro. Il codice, di 8 caratteri scelti per non confondersi, scade in 10 minuti.',
      tags: ['Sicurezza', 'Abbinamento a tempo'],
    },
    {
      title: 'Pagamenti e identità affidabili',
      text: 'L\'accesso usa un sistema di identità collaudato, su un dominio nostro. Gli addebiti sono registrati una sola volta, anche se le conferme di pagamento arrivano ripetute.',
      tags: ['Accesso sicuro', 'Pagamenti sicuri'],
    },
    {
      title: 'Un solo posto per ogni regola',
      text: 'Le regole (abbonamento, omaggio, abbinamento, partita) sono scritte una volta, separate dal resto e provate con test automatici: sito, app e televisori le applicano allo stesso modo.',
      tags: ['Un solo punto di verità', 'Test automatici'],
    },
    {
      title: 'Protezioni contro l\'abuso',
      text: 'Le richieste pubbliche hanno un limite per indirizzo e la pagina di accesso consente solo ciò che serve. Se non si riesce a verificare un abbonamento, il player resta chiuso.',
      tags: ['Sicurezza', 'Chiuso per default'],
    },
  ],
  cta: {
    title: 'Vuoi un accesso così per i tuoi contenuti?',
    highlight: 'accesso così',
    text: 'L\'attivazione Premium di Canale 77 è online. Se hai contenuti da riservare a chi si abbona e uno schermo senza tastiera, il modello è riutilizzabile.',
    primary: { label: 'Apri Canale 77', href: 'https://ch77.wearerighello.com', external: true },
  },
} satisfies Landing;
