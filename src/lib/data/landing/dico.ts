import type { Landing } from './types';

/**
 * DICO — fatti verificati e schermate
 * dell'interfaccia vera, avviata in locale con dati inventati ("Comune di Esempio"). Nessun Comune cliente,
 * nessun numero di iscritti o di costi, nessuna persona.
 */
export default {
  tagline: 'La redazione di un Comune in un posto solo: un messaggio a settimana, e i dettagli a un clic.',
  metrics: [
    { value: 1, label: 'messaggio per uscita', note: 'modello base della piattaforma: un solo messaggio per Comune a ogni uscita' },
    { value: 10, label: 'macro tematiche pronte', note: 'emergenze, viabilità, rifiuti, scuola, tributi, sociale, sport, cultura, servizi, avvisi' },
    { value: 5, label: 'link di fonte al massimo', note: 'per ogni comunicazione preparata dall\'assistente' },
    { value: 340, label: 'test automatici', note: 'tutti superati, controllati il 6 ottobre 2026' },
  ],
  chapters: [
    {
      id: 'redazione',
      kicker: 'Il problema',
      title: 'Ogni settimana, un Comune deve leggere dieci pagine e scriverne una.',
      highlight: 'scriverne una',
      text:
        'Le notizie di un Comune stanno sul suo sito. Chi cura le comunicazioni le apre una per una, le riassume e le riscrive per WhatsApp e Telegram. In un archivio storico di messaggi, la gran parte non aveva testo: solo un collegamento e la scritta «segui il link per le informazioni». DICO prende quel lavoro e lo trasforma in una redazione, con un assistente che prepara e una persona che decide.',
      bullets: [
        'Si incolla un testo, o si indicano fino a 5 link del sito del Comune',
        '«Prepara il messaggio» legge le pagine, compila i campi e scrive nello stile del Comune',
        'Lo stile arriva dai messaggi già usciti di quel Comune, non da un modello uguale per tutti',
        'Nulla esce senza che una persona del Comune lo approvi',
      ],
      media: [
        {
          type: 'image',
          src: '/progetti/landing/dico/nuova-comunicazione.webp',
          alt: 'La schermata Nuova comunicazione di DICO: un campo per incollare il testo, un campo per i link alle notizie, il pulsante Prepara il messaggio e a destra l\'anteprima del messaggio sul telefono',
          caption: 'Nuova comunicazione: testo e link a sinistra, l\'anteprima a destra. Dati di esempio.',
          ratio: '1280/900',
          frame: 'browser',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'un-messaggio',
      kicker: 'Il come',
      title: 'Un solo messaggio. I dettagli stanno a un clic, non nel messaggio.',
      highlight: 'a un clic',
      text:
        'Un cittadino che riceve cinque messaggi al giorno smette di leggerli. DICO ne manda uno per uscita, di norma uno a settimana, con le emergenze in cima e una riga per tematica. Ogni riga ha un link che apre una pagina del sito del Comune, dove le comunicazioni si espandono. Il messaggio resta sotto il limite dei 4.096 caratteri di WhatsApp, e un contatore lo mostra mentre si compone.',
      bullets: [
        'Le emergenze non aspettano l\'uscita settimanale: partono da sole',
        'Sezioni in ordine scelto dalla redazione, voce in evidenza raccontata per intero',
        'Quando si copia il messaggio, la settimana dei link si ferma: i link già mandati non diventano pagine vuote',
      ],
      media: [
        {
          type: 'image',
          src: '/progetti/landing/dico/uscita-settimanale.webp',
          alt: 'La schermata Uscite di DICO: a sinistra le voci raggruppate per macro tematica, a destra l\'anteprima del messaggio della settimana e in alto il contatore dei caratteri su 4.096',
          caption: 'L\'uscita della settimana: voci per tematica, messaggio composto e contatore. Dati di esempio.',
          ratio: '1280/900',
          frame: 'browser',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'pagina',
      kicker: 'Per il cittadino',
      title: 'Il link apre una conversazione, non un sito da cercare.',
      highlight: 'una conversazione',
      text:
        'Ogni Comune ha il suo indirizzo, con la forma nomecomune.dico.online/w41-cultura: settimana e tematica. La pagina si presenta come una chat, con una bolla per sezione e le voci che si aprono con un tocco. Ogni avviso ha anche un indirizzo suo, un\'anteprima con la copertina giusta e il pulsante per condividerlo. La pagina resta online dopo la settimana, e una raccolta permanente per tematica raccoglie tutto ciò che è uscito.',
      bullets: [
        'La pagina è scritta per il telefono: le righe lunghe vanno a capo, i pulsanti sono sotto il pollice',
        'Anteprima del link generata in automatico, con i colori del Comune',
        'La bacheca si apre subito e si aggiorna appena si pubblica',
      ],
      media: [
        {
          type: 'image',
          src: '/progetti/landing/dico/pagina-settimana.webp',
          alt: 'La pagina della settimana di DICO sul telefono, a forma di chat: una bolla per la sezione Cultura ed eventi con tre voci',
          caption: 'La pagina della settimana sul telefono, come una chat. Dati di esempio.',
          ratio: '390/844',
          frame: 'phone',
        },
        {
          type: 'image',
          src: '/progetti/landing/dico/avviso.webp',
          alt: 'Un singolo avviso di DICO sul telefono, con il titolo, il testo, i pulsanti Condividi e Tutte le comunicazioni e, sotto, altri avvisi della stessa tematica',
          caption: 'Un singolo avviso, con gli altri della stessa tematica sotto. Dati di esempio.',
          ratio: '390/844',
          frame: 'phone',
        },
      ],
      layout: 'media-right',
    },
  ],
  graphic: 'dico-flow',
  features: [
    { icon: 'wand', title: 'Prepara il messaggio', text: 'Legge testo e pagine, unisce le fonti, compila i campi e scrive nello stile del Comune.' },
    { icon: 'search', title: 'Controlla il messaggio', text: 'Prima dell\'uscita segnala date relative, contraddizioni e informazioni mancanti. Non riscrive: decide la persona.' },
    { icon: 'database', title: 'Memoria del Comune', text: 'Le comunicazioni già uscite guidano il tono dei nuovi testi. Ogni Comune ha la sua memoria, senza prestiti da un altro.' },
    { icon: 'users', title: 'Ruoli chiari', text: 'Base propone, Supervisore approva e decide la data, Amministratore dà i permessi. Chi scrive per un\'associazione vede solo il suo.' },
    { icon: 'calendar', title: 'Calendario e uscite', text: 'Le proposte si programmano nel calendario. Le voci approvate confluiscono nell\'uscita in preparazione.' },
    { icon: 'link', title: 'Pagine per tematica', text: 'Una raccolta per ogni settimana e una permanente per ogni macro tematica, con indirizzi che non cambiano.' },
    { icon: 'bell', title: 'Notifiche di lavoro', text: 'Chi è di turno riceve le assegnazioni, con le assenze gestite dalla piattaforma.' },
    { icon: 'globe', title: 'Quattro canali di invio', text: 'Web app, Telegram, WhatsApp ed e-mail: ognuno con le sue regole, ritentato dalla piattaforma senza duplicati.' },
  ],
  demo: {
    kicker: 'Interfaccia vera',
    title: 'Come si lavora in DICO.',
    highlight: 'si lavora',
    lead: 'Schermate dell\'applicazione vera avviata in locale, con un «Comune di Esempio» e dati inventati. Nessun invio.',
    items: [
      {
        id: 'coda',
        label: 'Coda messaggi',
        media: {
          type: 'image',
          src: '/progetti/landing/dico/coda-messaggi.webp',
          alt: 'La coda dei messaggi di DICO: elenco con titolo, tematica, stato (in lavorazione, in attesa, approvato) e da quanto sono in coda',
          caption: 'La coda: cosa aspetta una decisione, con stato e tempo di attesa.',
          ratio: '1280/900',
          frame: 'browser',
        },
      },
      {
        id: 'nuova',
        label: 'Nuova comunicazione',
        media: {
          type: 'image',
          src: '/progetti/landing/dico/nuova-comunicazione.webp',
          alt: 'Nuova comunicazione: testo incollato, link alla notizia sul sito, pulsante Prepara il messaggio e anteprima',
          caption: 'Si incolla il testo o il link e si prepara il messaggio. L\'anteprima mostra come arriverà.',
          ratio: '1280/900',
          frame: 'browser',
        },
      },
      {
        id: 'calendario',
        label: 'Calendario',
        media: {
          type: 'image',
          src: '/progetti/landing/dico/calendario.webp',
          alt: 'Il calendario di DICO in vista mensile con le comunicazioni per giorno e, a destra, la giornata selezionata',
          caption: 'Il calendario: cosa esce quando, e cosa aspetta ancora una data.',
          ratio: '1280/900',
          frame: 'browser',
        },
      },
      {
        id: 'uscita',
        label: 'Uscita della settimana',
        media: {
          type: 'image',
          src: '/progetti/landing/dico/uscita-settimanale.webp',
          alt: 'Il messaggio della settimana composto dalle voci, con il contatore dei caratteri',
          caption: 'Il messaggio unico, composto dalle voci approvate.',
          ratio: '1280/900',
          frame: 'browser',
        },
      },
      {
        id: 'bacheca',
        label: 'Bacheca del cittadino',
        media: {
          type: 'image',
          src: '/progetti/landing/dico/bacheca.webp',
          alt: 'La bacheca pubblica di un Comune con il messaggio della settimana, la ricerca, le tematiche e l\'elenco degli avvisi',
          caption: 'La bacheca pubblica: il messaggio della settimana, la ricerca e gli avvisi per tematica.',
          ratio: '1280/800',
          frame: 'browser',
        },
      },
    ],
  },
  tech: [
    {
      title: 'Pensato per non fermarsi',
      text: 'Le uscite programmate partono all’ora giusta anche se nessuno è al computer, e gli invii rimasti indietro vengono ritentati da soli, senza mai duplicare un messaggio.',
      tags: ['Automazione', 'Infrastruttura globale'],
    },
    {
      title: 'Allegati e archivio in Europa',
      text: 'Allegati e dati restano in Europa. Le credenziali di ogni canale di invio sono custodite cifrate e non sono mai visibili a chi lavora in redazione.',
      tags: ['Dati in Europa', 'Sicurezza'],
    },
    {
      title: 'Una pagina che non invecchia male',
      text: 'La pagina della settimana segue una sola regola, ovunque. Quando il messaggio esce da DICO la settimana si blocca, così i link già mandati restano validi. Le pagine pubbliche si aprono in un attimo e si aggiornano appena si pubblica.',
      tags: ['Un solo punto di verità', 'Veloce'],
    },
    {
      title: 'Lettura di siti difficili',
      text: 'Molti siti di Comuni si riempiono solo dopo il caricamento e sono difficili da leggere per un programma: DICO sa arrivare ai contenuti veri. Gli indirizzi indicati dagli operatori sono controllati: si leggono solo siti pubblici.',
      tags: ['Lettura dei siti', 'Sicurezza'],
    },
    {
      title: 'Assistente che ricorda, senza addestrarsi',
      text: 'La memoria di ogni Comune è l’archivio delle sue comunicazioni passate, ritrovate per somiglianza di significato e riviste prima dell’uso. L’assistente non viene riaddestrato: lavora sui dati del Comune a ogni richiesta, e non li mescola con quelli di altri.',
      tags: ['Intelligenza artificiale', 'Dati separati per Comune'],
    },
    {
      title: 'Costruito per reggere',
      text: 'Ogni utente appartiene a un solo Comune, e questo vincolo è imposto a ogni livello del sistema. Le password sono protette e 340 test automatici verificano l’intera catena, senza inviare nulla a nessuno.',
      tags: ['Sicurezza', 'Test automatici'],
    },
  ],
  cta: {
    title: 'Vuoi vedere la redazione dal vivo?',
    highlight: 'dal vivo',
    text: 'Ti facciamo provare DICO con un Comune di esempio: dall\'incolla del testo alla pagina che vede il cittadino.',
    primary: { label: 'Vai a dico.online', href: 'https://www.dico.online', external: true },
  },
} satisfies Landing;
