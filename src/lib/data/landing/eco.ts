import type { Landing, MediaRef } from './types';

/**
 * Eco (risposte alle recensioni di Google): fatti dalla scheda dell'App Store (versione 1.2, verificata il 26/11/2026),
 * dalle note di versione e dall'informativa pubblicata su risposte.wearerighello.com.
 * Le schermate sono quelle dello store: attivita' d'esempio inventata, «Osteria del Faro (demo)», e recensioni
 * scritte per l'esempio. Nessuna recensione, cliente o prezzo reale; nessun prezzo.
 */
const DIR = '/progetti/landing/eco';

const screen = (name: string, alt: string, caption?: string): MediaRef => ({
  type: 'image',
  src: `${DIR}/${name}.webp`,
  alt,
  caption,
  ratio: '700/1518',
  frame: 'phone',
});

const oggi = screen(
  'oggi',
  'La schermata Oggi di un’attività d’esempio: tre risposte da approvare, due sicure e una da leggere con attenzione, e il pulsante Approva 2 sicure',
  'Oggi: le risposte da approvare, con le sicure separate da quelle da leggere con attenzione.',
);
const recensioni = screen(
  'recensioni',
  'L’elenco delle recensioni, con le schede Da approvare, Programmate e Pubblicate, e sotto ogni recensione la bozza pronta',
  'Ogni recensione ha la sua bozza pronta, già nella voce dell’attività.',
);
const approva = screen(
  'approva',
  'Una recensione a cinque stelle con la risposta pronta, i pulsanti Più corta, Più calda e Più formale e il pulsante Approva e avanti',
  'Si approva una risposta alla volta, e si passa alla successiva.',
);
const negativa = screen(
  'negativa',
  'Una recensione a due stelle con la risposta pronta e l’avviso «Recensione negativa: rileggi la risposta prima di pubblicarla»',
  'Una recensione negativa chiede di rileggere la risposta prima di pubblicarla.',
);

export default {
  variant: 'app',
  tagline: 'Arriva una recensione su Google, e la risposta è già pronta: la leggi, la ritocchi, la pubblichi.',

  metrics: [
    { value: 6, suffix: ' s', label: 'per annullare un’approvazione', note: 'prima che la risposta parta su Google' },
    { value: 3, label: 'elenchi per ogni attività', note: 'da approvare, programmate, pubblicate' },
    { text: 'A una persona', label: 'le risposte delicate', note: 'reclami, temi legali e di salute' },
  ],

  chapters: [
    {
      id: 'dalla-recensione',
      kicker: 'Per chi ha un’attività',
      title: 'Dalla recensione alla risposta, in un tocco.',
      highlight: 'in un tocco',
      text:
        'Eco ti avvisa quando arriva una recensione su Google e ti presenta una risposta già pronta, scritta con la voce della tua attività. La leggi, la ritocchi con un tocco se serve e la pubblichi.',
      bullets: [
        'La bozza si accorcia, si scalda o si fa più formale con un tocco',
        'Approvi, pubblichi o scarti anche dalla notifica',
        'Hai 6 secondi per annullare un’approvazione prima che la risposta parta su Google',
      ],
      media: [oggi, approva],
      layout: 'media-right',
    },
    {
      id: 'piu-clienti',
      kicker: 'Per chi ne segue più d’una',
      title: 'Tutti i clienti in un posto solo.',
      highlight: 'un posto solo',
      text:
        'Chi segue più clienti li ha tutti nella stessa app, con quello che richiede attenzione in cima. Sedi, persone, voce del brand e app collegate si gestiscono direttamente nell’app, senza pagine web.',
      bullets: [
        'Quello che richiede attenzione sta sempre in cima',
        'Un avviso quando qualcosa resta fermo, così nessuna risposta si perde',
        'Se Google chiede di rinnovare il consenso, una scheda lo fa in un tocco',
      ],
      media: [recensioni],
      layout: 'media-left',
    },
    {
      id: 'una-persona',
      kicker: 'Con giudizio',
      title: 'Le risposte delicate restano a una persona.',
      highlight: 'a una persona',
      text:
        'Per preparare le bozze usiamo un modello di intelligenza artificiale: riceve il testo della recensione, il solo primo nome dell’autore (mai il cognome), le regole e la voce dell’attività. Le risposte a reclami e a temi legali o di salute le decide una persona, e nulla va online senza l’approvazione di chi gestisce l’attività.',
      bullets: ['Il modello non pubblica: propone', 'Una recensione negativa chiede di rileggere la risposta', 'Il cognome di chi ha scritto non arriva al modello'],
      media: [negativa],
      layout: 'media-right',
    },
  ],

  features: [
    { icon: 'bell', title: 'Avviso e bozza', text: 'Quando arriva una recensione su Google, l’app ti avvisa e la bozza di risposta è già lì.' },
    { icon: 'sparkle', title: 'Nella voce dell’attività', text: 'Le regole e la voce del brand si impostano nell’app, per ogni attività.' },
    { icon: 'wand', title: 'Più corta, più calda, più formale', text: 'Tre ritocchi con un tocco, prima di approvare.' },
    { icon: 'clock', title: 'Annulla per 6 secondi', text: 'Dopo l’approvazione hai 6 secondi per ripensarci, prima che la risposta parta su Google.' },
    { icon: 'bolt', title: 'Notifiche con azioni', text: 'Approvi, pubblichi o scarti direttamente dalla notifica.' },
    { icon: 'users', title: 'Più clienti, un solo elenco', text: 'Persone e sedi di ogni attività nella stessa app, con le urgenze in cima.' },
    { icon: 'shield', title: 'Risposte delicate a una persona', text: 'Reclami e temi legali o di salute non si risolvono da soli: li decide una persona.' },
  ],

  demo: {
    kicker: 'Le schermate',
    title: 'L’app, com’è davvero',
    highlight: 'com’è davvero',
    lead: 'Schermate dell’app con un’attività d’esempio inventata e recensioni scritte per l’esempio.',
    items: [
      { id: 'oggi', label: 'Oggi', media: oggi, note: 'Quante risposte aspettano, e quali sono sicure (4-5 stelle, senza avvisi).' },
      { id: 'recensioni', label: 'Recensioni', media: recensioni, note: 'Da approvare, Programmate, Pubblicate: ogni recensione con la sua bozza.' },
      { id: 'approva', label: 'Approva e avanti', media: approva, note: 'Una risposta alla volta, con i ritocchi a portata di dito.' },
      { id: 'negativa', label: 'Recensione negativa', media: negativa, note: 'L’app chiede di rileggere prima di pubblicare.' },
    ],
  },

  tech: [
    {
      title: 'Il collegamento con Google',
      text: 'Serve un profilo Google dell’attività, che si collega dal sito risposte.wearerighello.com. Il consenso si può revocare, e l’app avvisa quando Google chiede di rinnovarlo.',
      tags: ['Profilo Google', 'Consenso revocabile'],
    },
    {
      title: 'Una bozza non è una risposta',
      text: 'Il modello prepara il testo; la risposta parte solo dopo l’approvazione di una persona, con un margine di 6 secondi per annullare.',
      tags: ['Approvazione umana', 'Annulla'],
    },
    {
      title: 'Meno dati possibile al modello',
      text: 'Al modello arrivano il testo della recensione, il primo nome dell’autore (i nomi anonimi diventano «anonimo»), le regole e la voce dell’attività.',
      tags: ['Privacy', 'Cognome escluso'],
    },
  ],

  cta: {
    title: 'La prossima recensione, con la risposta già pronta.',
    highlight: 'già pronta',
    text: 'Eco è su App Store. Per usarla serve un profilo Google dell’attività, collegato dal sito.',
    primary: { label: 'Scarica su App Store', href: 'https://apps.apple.com/it/app/eco-risposte-alle-recensioni/id6821380088', external: true },
  },
} satisfies Landing;
