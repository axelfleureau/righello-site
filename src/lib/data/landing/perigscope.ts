import type { Landing, MediaRef } from './types';

/**
 * Perigscope (il Mac sull'iPhone). Fatti verificati su: scheda dell'App Store (store/store.json), README del progetto
 * (maclink), protocollo v2 e ponte Righello. Schermate: build di sviluppo sul simulatore iPhone, 12/11/2026; la prova
 * senza Mac mostra il Mac finto dell'app, non uno schermo di una persona. Nessun account vero usato.
 * Stato: pubblicata su App Store (verificato con la ricerca dello store il 26/11/2026: versione 1.0.1, gratuita, prima uscita 23/11/2026).
 */
const DIR = '/progetti/landing/perigscope';

const screen = (name: string, alt: string, caption?: string): MediaRef => ({
  type: 'image',
  src: `${DIR}/${name}.webp`,
  alt,
  caption,
  ratio: '660/1434',
  frame: 'phone',
});

const prova = screen(
  'prova-senza-mac',
  'La prova senza Mac: un Mac finto con la finestra Appunti, il puntatore e il dock, sullo schermo dell’iPhone',
  'La prova senza Mac: un Mac finto, per provare i gesti prima di installare qualsiasi cosa.',
);
const tastiera = screen(
  'tastiera-mac',
  'La tastiera da Mac sull’iPhone, con esc, Spotlight, Mission Control e App Windows, sotto la finestra Appunti del Mac finto',
  'Tocchi un campo di testo e la tastiera da Mac compare da sola.',
);
const benvenuto = screen('benvenuto', 'Il benvenuto: «La tua scrivania. In tasca.» con il puntatore Perigscope');
const ovunque = screen('ovunque', 'Il benvenuto: «Ovunque. Davvero.» con un Mac e un iPhone collegati');
const soloTuo = screen('solo-tuo', 'Il benvenuto: «Solo tuo.» con lo scudo della privacy');
const accesso = screen('accesso', 'L’accesso: la tua email, un codice, niente password, e il pulsante «Prova senza Mac»');

export default {
  variant: 'app',
  tagline: 'La tua scrivania. In tasca.',
  hero: prova,
  metrics: [
    { text: 'macOS 14', label: 'sul Mac', note: 'l’app per Mac è gratuita e si scarica dal sito' },
    { text: 'Da capo a capo', label: 'cifratura', note: 'schermo, audio, tastiera e mouse fra iPhone e Mac' },
    { value: 2, label: 'permessi sul Mac', note: 'Registrazione schermo e Accessibilità' },
    { text: 'Senza Mac', label: 'prova nell’app', note: 'un Mac finto per provare gesti e tastiera' },
  ],
  chapters: [
    {
      id: 'perche',
      kicker: 'Il perché',
      title: 'Il tuo Mac, anche lontano dalla scrivania.',
      highlight: 'lontano dalla scrivania',
      text: 'Un file che manca, un invio da fare, un programma da riavviare: serve il Mac, e il Mac è altrove. Perigscope ne mostra lo schermo sull’iPhone e lo comanda come se fossi seduto lì, da casa o dall’altra parte del mondo.',
      bullets: [
        'Vedi lo schermo, muovi il puntatore, clicchi, scrivi',
        'Funziona da casa e da fuori, senza configurare niente',
        'Il Mac compare nell’elenco con il suo stato',
      ],
      media: [prova],
      layout: 'media-right',
    },
    {
      id: 'tastiera',
      kicker: 'Come si usa',
      title: 'Un trackpad vero e una tastiera da Mac.',
      highlight: 'trackpad vero',
      text: 'Il dito muove subito il puntatore. Tocca per cliccare, due volte per il doppio clic, tieni premuto per il clic destro, due dita per scorrere, pizzica per ingrandire. Quando tocchi un campo di testo sul Mac, la tastiera compare da sola.',
      bullets: [
        'Esc, Tab, Controllo, Opzione, Comando e frecce',
        'Scorciatoie a un tocco: Spotlight, Mission Control, App Windows',
        'Il microfono detta e il testo si scrive sul Mac',
      ],
      media: [tastiera],
      layout: 'media-left',
    },
    {
      id: 'privato',
      kicker: 'Privato',
      title: 'Lo schermo lo vede solo chi deve.',
      highlight: 'solo chi deve',
      text: 'Schermo, audio, tastiera e mouse viaggiano cifrati da capo a capo fra il tuo iPhone e il tuo Mac. Il ponte che li fa incontrare fuori casa non può leggerli. Nessuna pubblicità, nessun tracciamento.',
      bullets: [
        'Accesso con la tua email e un codice, senza password da ricordare',
        'Ogni Mac si collega al tuo account',
      ],
      media: [soloTuo],
      layout: 'media-right',
    },
  ],
  features: [
    {
      icon: 'device',
      title: 'Trackpad e tocco diretto',
      text: 'Un dito muove il puntatore, due dita scorrono, pizzico per l’ingrandimento. Oppure tocco diretto, come un touchscreen.',
    },
    {
      icon: 'wand',
      title: 'Tastiera che arriva da sola',
      text: 'Tocca un campo di testo sul Mac e compare la tastiera, con lo schermo che scorre per tenerlo in vista.',
      wide: true,
      media: tastiera,
    },
    { icon: 'message', title: 'Dettatura', text: 'Premi il microfono e parla: il testo si scrive sul Mac.' },
    {
      icon: 'layers',
      title: 'Pensata per iPhone Duo',
      text: 'Schermo chiuso o aperto, in verticale o in orizzontale: l’app segue il dispositivo. Se il Mac non ha un monitor, ridisegna il suo schermo della forma del tuo telefono, senza bande nere.',
    },
    { icon: 'globe', title: 'Da casa e da fuori', text: 'Fuori casa non serve nessuna VPN né installazioni sul telefono.' },
    { icon: 'play', title: 'Prova senza Mac', text: 'Un Mac finto nell’app, per provare gesti, tastiera e barra dei comandi prima di installare qualsiasi cosa.' },
    { icon: 'file', title: 'Appunti, audio e più schermi', text: 'Ciò che copi sul Mac arriva negli appunti dell’iPhone, l’audio si silenzia dalla barra e, con più monitor, scegli quale vedere.' },
    { icon: 'lock', title: 'Accesso semplice', text: 'Email e codice. Se non hai un account, lo crei in quel momento.' },
  ],
  demo: {
    kicker: 'Le schermate',
    title: 'L’app, com’è davvero',
    highlight: 'com’è davvero',
    lead: 'Schermate dell’app, dal simulatore di iPhone. La prova senza Mac mostra il Mac finto dell’app, non lo schermo di nessuno.',
    items: [
      { id: 'benvenuto', label: 'Benvenuto', media: benvenuto, note: 'Tre schermate d’apertura: la scrivania in tasca, il collegamento da ovunque, la privacy.' },
      { id: 'ovunque', label: 'Ovunque', media: ovunque, note: 'Il Mac e l’iPhone collegati: dal divano o da un altro continente, si apre e funziona.' },
      { id: 'solo-tuo', label: 'Solo tuo', media: soloTuo, note: 'Il tuo schermo lo vedi tu, e nessun altro.' },
      { id: 'accesso', label: 'Accesso', media: accesso, note: 'Email e codice. Da qui si può anche provare l’app senza Mac.' },
      { id: 'prova', label: 'Prova senza Mac', media: prova, note: 'Il Mac finto: una finestra Appunti per scrivere, il puntatore e il dock.' },
      { id: 'tastiera', label: 'Tastiera da Mac', media: tastiera, note: 'Esc, Spotlight, Mission Control, App Windows e la tastiera completa con i tasti del Mac.' },
    ],
  },
  tech: [
    {
      title: 'Cifratura da capo a capo',
      text: 'Ogni Mac ha una sua chiave. L’iPhone e il Mac si accordano fra loro: il server che li mette in contatto non vede mai la chiave della sessione.',
      tags: ['Cifratura', 'Chiave del Mac'],
    },
    {
      title: 'Un ponte per il fuori casa',
      text: 'Il Mac tiene un collegamento in attesa su un ponte nel cloud: da fuori si arriva al Mac senza aprire porte sulla rete di casa.',
      tags: ['Ponte cloud', 'Senza VPN'],
    },
    {
      title: 'Video a bassa latenza',
      text: 'I fotogrammi non passano da buffer lunghi. Se l’iPhone resta indietro, il Mac salta i fotogrammi prima di codificarli: l’immagine non accumula ritardo.',
      tags: ['Bassa latenza', 'HEVC o H.264'],
    },
  ],
  cta: {
    title: 'Un Mac che ti segue ovunque',
    highlight: 'ti segue ovunque',
    text: 'Perigscope è un’app Righello, gratuita su App Store. Se hai un’idea per un controllo remoto fatto su misura, scrivici.',
    primary: { label: 'Scarica su App Store', href: 'https://apps.apple.com/it/app/perigscope/id6826381109', external: true },
  },
} satisfies Landing;
