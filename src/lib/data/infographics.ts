/** Dati delle infografiche animate della pagina Progetti: testi, nodi, passi e media in un punto solo. */

export type InfoIconName =
  | 'camera'
  | 'users'
  | 'flag'
  | 'megaphone'
  | 'engine'
  | 'scoreboard'
  | 'replay'
  | 'tv'
  | 'shield'
  | 'doc'
  | 'chat'
  | 'pin'
  | 'check'
  | 'pen'
  | 'globe'
  | 'alert'
  | 'lock'
  | 'search';

/** Un passo di un'infografica a tappe: lo legge la barra dei passi condivisa. */
export interface FlowStep {
  id: string;
  /** Titolo breve, a una riga. */
  title: string;
  text: string;
  /** Quanto resta il passo in riproduzione automatica, in millisecondi. */
  ms: number;
}

/** Dicitura fissa sugli schermi d'esempio: i contenuti sono segnaposto, non dati veri. */
export const exampleLabel = 'Esempio illustrativo';

/* ---------- Produzione delle partite ---------- */

export interface FlowNode {
  id: string;
  icon: InfoIconName;
  label: string;
  text: string;
}

export const matchSources: FlowNode[] = [
  {
    id: 'rigcast',
    icon: 'camera',
    label: 'iPhone in regia',
    text: 'Rig Cast: il telefono riprende dal campo e manda il video dritto in regia.',
  },
  {
    id: 'squadre',
    icon: 'users',
    label: 'Squadre e rose',
    text: 'L\'anagrafica calcistica: squadre, stemmi e giocatori sempre al loro posto.',
  },
  {
    id: 'eventi',
    icon: 'flag',
    label: 'Eventi della partita',
    text: 'Gol, cartellini e cambi arrivano mentre si gioca e diventano grafica.',
  },
  {
    id: 'sponsor',
    icon: 'megaphone',
    label: 'Sponsor e loghi',
    text: 'Marchi e messaggi pubblicitari entrano e escono in grafica al momento giusto.',
  },
];

/** Cosa si legge finché non si è scelto nessun blocco. */
export const matchHint = {
  label: 'Come nasce la partita',
  text: 'Tocca un blocco per accendere il suo percorso. Il motore, al centro, mostra le grafiche.',
};

export const matchEngine: FlowNode = {
  id: 'motore',
  icon: 'engine',
  label: 'Motore TV Studio',
  text: 'Mette insieme riprese, dati e loghi e disegna da solo le grafiche della partita.',
};

export const matchDestinations: FlowNode[] = [
  {
    id: 'partita',
    icon: 'scoreboard',
    label: 'Partita con le grafiche',
    text: 'La partita intera, con tempo e risultato, formazioni, rigori e pubblicità in sovrimpressione.',
  },
  {
    id: 'replay',
    icon: 'replay',
    label: 'Replay e highlights',
    text: 'I momenti migliori già pronti da rivedere e da far girare.',
  },
  {
    id: 'canale77',
    icon: 'tv',
    label: 'Canale 77 e televisori',
    text: 'Il risultato va in onda su Canale 77 e arriva sugli schermi di casa.',
  },
];

export interface MatchGraphic {
  id: string;
  label: string;
  poster: string;
  video?: string;
  alt: string;
}

/** Le grafiche di cui c'è un'anteprima vera. */
export const matchGraphics: MatchGraphic[] = [
  {
    id: 'gol',
    label: 'Gol',
    poster: '/progetti/regia/gol-scorebug.webp',
    video: '/progetti/regia/gol-scorebug.mp4',
    alt: 'Ripresa di una partita con lo scorebug in alto che segna il tempo e, al gol, aggiorna il risultato',
  },
  {
    id: 'sponsor',
    label: 'Sponsor',
    poster: '/progetti/regia/sponsor.webp',
    video: '/progetti/regia/sponsor.mp4',
    alt: 'Ripresa di una partita con il marchio di uno sponsor e la scritta Pubblicità in sovrimpressione',
  },
  {
    id: 'presentazione',
    label: 'Presentazione',
    poster: '/progetti/regia/presentazione.webp',
    alt: 'Grafica di presentazione della partita con gli stemmi delle due squadre, la competizione e la data',
  },
  {
    id: 'rigori',
    label: 'Rigori',
    poster: '/progetti/regia/rigori.webp',
    alt: 'Grafica dei tiri di rigore: per ogni squadra un segno per ogni tiro, segnato o sbagliato, e il conteggio',
  },
];

/** Le altre grafiche del motore: senza anteprima, quindi solo elencate. */
export const matchOtherGraphics = ['Cartellini', 'Cambi', 'Replay', 'Recupero', 'Formazioni', 'Interviste', 'Intro e outro'];

/* ---------- CH77+ ---------- */

export const activationSteps: FlowStep[] = [
  {
    id: 'codice',
    title: 'La TV mostra codice e QR',
    text: 'Dal televisore si chiede l\'abbinamento: sullo schermo compare un codice e un QR.',
    ms: 4500,
  },
  {
    id: 'telefono',
    title: 'Il telefono apre /attiva',
    text: 'Sul telefono si apre la pagina /attiva e si legge il codice della TV.',
    ms: 4500,
  },
  {
    id: 'accesso',
    title: 'Si accede e si attiva Premium',
    text: 'Si entra con il proprio account e si attiva Premium, tutto dal telefono.',
    ms: 5000,
  },
  {
    id: 'controllo',
    title: 'La TV controlla e si sblocca',
    text: 'Ogni 3 secondi la TV chiede se l\'attivazione è arrivata. Appena c\'è, si sblocca da sola.',
    ms: 6500,
  },
  {
    id: 'dirette',
    title: 'Arrivano le dirette in esclusiva',
    text: 'Nella scheda del calcio compare la riga «Dirette esclusive · Premium» con le partite in esclusiva.',
    ms: 5500,
  },
];

/** Dati d'esempio dello schermo: inventati, nessun codice o titolo reale. */
export const activationDemo = {
  code: ['K7Q', '4X2'],
  path: '/attiva',
  row: 'Dirette esclusive · Premium',
  cards: ['Partita in esclusiva', 'Partita in esclusiva', 'Partita in esclusiva'],
};

/* ---------- Assistenti AI per i Comuni ---------- */

export const paSteps: FlowStep[] = [
  {
    id: 'chiede',
    title: 'Il cittadino chiede',
    text: 'Scrive una domanda al Comune su WhatsApp, come a una persona.',
    ms: 3500,
  },
  {
    id: 'anonimizza',
    title: 'I dati personali vengono coperti',
    text: 'Nome, telefono e simili vengono anonimizzati prima di arrivare al modello.',
    ms: 4000,
  },
  {
    id: 'cerca',
    title: 'Cerca nelle fonti del Comune',
    text: 'Legge le pagine ufficiali: servizi, avvisi, eventi e notizie. Solo quelle, non Internet.',
    ms: 4500,
  },
  {
    id: 'risponde',
    title: 'Risponde con la fonte',
    text: 'Dice dove ha trovato l\'informazione. Se non la trova, lo ammette e indica l\'ufficio.',
    ms: 5000,
  },
];

export const paDocs = ['Servizi', 'Avvisi', 'Eventi', 'Notizie'];

export interface PaQuestion {
  id: string;
  /** Testo della chip. */
  label: string;
  /** La domanda nel fumetto del cittadino. */
  ask: string;
  /** Indice in paDocs della fonte trovata; assente se l'informazione non c'è. */
  doc?: number;
  reply: string;
}

/** Domande e risposte d'esempio: generiche, senza orari o dati veri. */
export const paQuestions: PaQuestion[] = [
  {
    id: 'anagrafe',
    label: 'Orari dell\'anagrafe',
    ask: 'Quali sono gli orari dell\'anagrafe?',
    doc: 0,
    reply: 'Gli orari sono sulla pagina ufficiale del Comune. Te la lascio qui sotto.',
  },
  {
    id: 'rifiuti',
    label: 'Raccolta rifiuti',
    ask: 'Quando passa la raccolta rifiuti?',
    doc: 1,
    reply: 'Il calendario della raccolta è sulla pagina ufficiale del Comune. Te la lascio qui sotto.',
  },
  {
    id: 'sala',
    label: 'Sala comunale',
    ask: 'Posso prenotare una sala comunale?',
    reply: 'Nelle pagine del Comune non trovo questa informazione e non voglio inventarla. Ti indico l\'ufficio a cui chiedere.',
  },
];

/** Esempio di dati coperti prima che la domanda arrivi al modello. */
export const paMasked = ['Nome', 'Telefono'];

/* ---------- DICO: dal messaggio alle pagine per tematica ---------- */

export const dicoSteps: FlowStep[] = [
  {
    id: 'prepara',
    title: 'La redazione prepara',
    text: 'Si incolla un testo o si indicano fino a 5 link del sito del Comune. Un pulsante legge, compila i campi e riscrive nello stile dell\'ente.',
    ms: 6500,
  },
  {
    id: 'approva',
    title: 'La redazione approva',
    text: 'Il messaggio passa da Proposta a In revisione, poi viene approvato e programmato. Quando arriva il giorno, esce.',
    ms: 5000,
  },
  {
    id: 'messaggio',
    title: 'Un solo messaggio per uscita',
    text: 'Emergenze in cima, un blocco «Save the date» e una riga per tematica con il suo link. Gli argomenti sono solo citati: toccane uno.',
    ms: 5500,
  },
  {
    id: 'pagina',
    title: 'Una pagina per ogni tematica',
    text: 'Il link apre la pagina della settimana, in forma di chat. Resta viva anche quando la settimana cambia.',
    ms: 7000,
  },
];

export const dicoDemo = {
  entity: 'Comune di Esempio',
  host: 'nomecomune.dico.online',
  week: '40',
  period: '28 settembre – 4 ottobre 2026',
  sources: ['Testo incollato', 'Fino a 5 link del sito'],
  prepare: 'Prepara il messaggio',
  check: 'Controlla il messaggio',
  fields: ['Titolo', 'Testo', 'Tematica', 'Urgenza'],
  /** Cosa segnala il controllo. */
  warnings: ['Date relative', 'Cose mancanti', 'Testo lungo', 'Tono burocratico'],
  merge: 'Se più fonti parlano dello stesso fatto le unisce; se si contraddicono, prevale la pagina del Comune.',
  states: ['Proposta', 'In revisione', 'Programmata', 'Uscita'],
  days: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
  copy: 'Copia',
  copyNote: 'Copia blocca la settimana: i link non muoiono',
  emergency: 'Emergenze, se ce ne sono',
  saveDate: 'Save the date',
  saveDateItem: 'Un appuntamento di esempio',
  closing: 'Non è tutto! Tutte le comunicazioni del Comune',
  share: 'Condividi',
  pageSub: 'comunicazioni ufficiali',
};

export interface DicoTopic {
  id: string;
  emoji: string;
  label: string;
  /** Pezzo dell'indirizzo dopo «w40-». */
  slug: string;
  /** Colore della tematica. */
  color: string;
  items: string[];
}

export const dicoTopics: DicoTopic[] = [
  { id: 'cultura', emoji: '🎭', label: 'Cultura ed eventi', slug: 'cultura', color: '#8a7360', items: ['Una mostra', 'Una serata in biblioteca', 'Un concerto'] },
  { id: 'avvisi', emoji: '📣', label: 'Avvisi', slug: 'avvisi', color: '#213a59', items: ['Un cambio di orario', 'Una scadenza', 'Un servizio nuovo'] },
  { id: 'viabilita', emoji: '🚧', label: 'Viabilità', slug: 'viabilita', color: '#e9b544', items: ['Una strada chiusa', 'Un cantiere', 'Un senso unico'] },
];

/** Le tre parti dell'indirizzo di una pagina settimanale. */
export const dicoAddress = [
  { id: 'comune', text: 'Il sottodominio è quello del Comune: ogni ente ha il suo.' },
  { id: 'settimana', text: 'La lettera «w» e il numero della settimana. La 40 va da lunedì a domenica.' },
  { id: 'tematica', text: 'La tematica. Una pagina per ogni tematica e per ogni settimana.' },
];
