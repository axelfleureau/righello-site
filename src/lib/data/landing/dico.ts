import type { Landing } from './types';

/**
 * DICO — fatti verificati e schermate
 * dell'interfaccia vera, avviata in locale con dati inventati ("Comune di Esempio"). Nessun Comune cliente,
 * nessun numero di iscritti o di costi, nessuna persona.
 */
export default {
  tagline: 'La redazione di un Comune in un posto solo: un messaggio a settimana, e i dettagli a un clic.',
  metrics: [
    { value: 10, label: 'macro tematiche pronte', note: 'emergenze, viabilità, rifiuti, scuola, tributi, sociale, sport, cultura, servizi, avvisi' },
    { value: 4, label: 'canali di invio', note: 'web app, Telegram, WhatsApp ed e-mail' },
    { value: 5, label: 'link di fonte al massimo', note: 'per ogni comunicazione preparata dall\'assistente' },
    { value: 340, label: 'test automatici', note: 'tutti superati, controllati il 6 ottobre 2026' },
  ],
  chapters: [
    {
      id: 'redazione',
      kicker: 'Per la redazione',
      title: 'Ogni settimana, un Comune deve leggere dieci pagine e scriverne una.',
      highlight: 'scriverne una',
      text:
        'Le notizie di un Comune stanno sul suo sito: chi cura le comunicazioni le apre una per una e le riscrive per WhatsApp e Telegram. DICO trasforma quel lavoro in una redazione, con un assistente che prepara e una persona che decide.',
      bullets: [
        'Si incolla un testo, o si indicano fino a 5 link del sito',
        '«Prepara il messaggio» compila i campi e scrive nello stile del Comune',
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
      id: 'pagina',
      kicker: 'Per il cittadino',
      title: 'Il link apre una conversazione, non un sito da cercare.',
      highlight: 'una conversazione',
      text:
        'Ogni Comune ha il suo indirizzo: settimana e tematica, come nomecomune.dico.online/w41-cultura. La pagina è una chat, con una bolla per sezione e le voci che si aprono con un tocco. Resta online dopo la settimana.',
      bullets: [
        'Scritta per il telefono: righe a capo, pulsanti sotto il pollice',
        'Ogni avviso ha un indirizzo suo e l\'anteprima con i colori del Comune',
        'Raccolta permanente per tematica; la settimana si ferma all\'uscita',
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
      layout: 'media-left',
    },
  ],
  graphic: 'dico-flow',
  how: {
    title: 'Dal messaggio ai dettagli',
    highlight: 'ai dettagli',
    lead: 'Un solo messaggio con una riga per tematica; ogni riga apre la pagina del Comune con i dettagli. Esempio illustrativo: scegli una tematica.',
  },
  features: [
    { icon: 'search', title: 'Controllo del messaggio', text: 'Prima dell\'uscita segnala date relative, contraddizioni e informazioni mancanti. Non riscrive: decide la persona.' },
    { icon: 'database', title: 'Memoria del Comune', text: 'Le comunicazioni già uscite guidano il tono dei nuovi testi. Ogni Comune ha la sua memoria, senza prestiti.' },
    { icon: 'users', title: 'Ruoli chiari', text: 'Base propone, Supervisore approva e decide la data, Amministratore dà i permessi.' },
    { icon: 'calendar', title: 'Calendario e uscite', text: 'Le proposte si programmano nel calendario; le voci approvate confluiscono nell\'uscita in preparazione.' },
    { icon: 'globe', title: 'Quattro canali', text: 'Web app, Telegram, WhatsApp ed e-mail, ognuno con le sue regole, ritentato senza duplicati.' },
    { icon: 'layers', title: 'Un messaggio solo', text: 'Una riga per tematica, emergenze subito, sotto i 4.096 caratteri di WhatsApp con contatore.' },
  ],
  demo: {
    kicker: 'Interfaccia vera',
    title: 'Come si lavora in DICO.',
    highlight: 'si lavora',
    lead: 'Sette schermate dell\'applicazione vera avviata in locale, con un «Comune di Esempio» e dati inventati. Nessun invio.',
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
      {
        id: 'pagina',
        label: 'Pagina della settimana',
        media: {
          type: 'image',
          src: '/progetti/landing/dico/pagina-settimana.webp',
          alt: 'La pagina della settimana di DICO sul telefono, a forma di chat: una bolla per la sezione Cultura ed eventi con tre voci',
          caption: 'Ciò che il cittadino apre dal link: una bolla per sezione, le voci si espandono con un tocco.',
          ratio: '390/844',
          frame: 'phone',
        },
      },
      {
        id: 'avviso',
        label: 'Singolo avviso',
        media: {
          type: 'image',
          src: '/progetti/landing/dico/avviso.webp',
          alt: 'Un singolo avviso di DICO sul telefono, con il titolo, il testo, i pulsanti Condividi e Tutte le comunicazioni e, sotto, altri avvisi della stessa tematica',
          caption: 'Un avviso con il suo indirizzo, il pulsante per condividerlo e gli altri della stessa tematica.',
          ratio: '390/844',
          frame: 'phone',
        },
      },
    ],
  },
  tech: [
    {
      title: 'Pensato per non fermarsi',
      text: 'Le uscite programmate partono all\'ora giusta anche se nessuno è al computer, e gli invii rimasti indietro si ritentano da soli, senza duplicare un messaggio.',
      tags: ['Automazione', 'Infrastruttura globale'],
    },
    {
      title: 'Archivio in Europa, dati separati',
      text: 'Allegati e archivio restano in Europa. Ogni utente appartiene a un solo Comune, vincolo imposto a ogni livello; le credenziali dei canali sono cifrate.',
      tags: ['Dati in Europa', 'Sicurezza'],
    },
    {
      title: 'Un assistente che ricorda',
      text: 'La memoria di ogni Comune è l\'archivio delle sue comunicazioni, ritrovate per somiglianza di significato. L\'assistente non è riaddestrato: lavora sui dati del Comune a ogni richiesta.',
      tags: ['Intelligenza artificiale', 'Dati separati per Comune'],
    },
  ],
  cta: {
    title: 'Vuoi vedere la redazione dal vivo?',
    highlight: 'dal vivo',
    text: 'Ti facciamo provare DICO con un Comune di esempio: dall\'incolla del testo alla pagina che vede il cittadino.',
    primary: { label: 'Vai a dico.online', href: 'https://www.dico.online', external: true },
  },
} satisfies Landing;
