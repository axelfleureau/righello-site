import type { Landing } from './types';

const base = '/progetti/landing/optima';

// Le schermate vengono dal gestionale vero, con utente e dati finti (Studio Aurora, Casa Verde,
// Bar Aurora: aziende inventate). Nessun cliente, collaboratore o importo reale.
const web = (file: string, alt: string, caption?: string) => ({
  type: 'image' as const,
  src: `${base}/${file}.webp`,
  alt,
  caption,
  ratio: '16/10',
  frame: 'browser' as const,
});

const phone = (file: string, alt: string, caption?: string) => ({
  type: 'image' as const,
  src: `${base}/${file}.webp`,
  alt,
  caption,
  ratio: '201/437',
  frame: 'phone' as const,
});

export default {
  tagline: 'Clienti, task, ore e crediti in un posto solo. E un’AI che ti dice cosa conta adesso.',

  metrics: [
    { value: 60, label: 'test sull’app iPhone', note: 'test di interfaccia automatici' },
    { value: 26, label: 'controlli automatici del sito', note: 'task, buoni, preventivi, presenze, AI, colori, schermi' },
    { value: 2, suffix: ' GB', label: 'per file, anche a pezzi', note: 'limite di caricamento sulle task: il caricamento riprende se cade la rete' },
  ],

  chapters: [
    {
      id: 'problema',
      kicker: 'Il problema',
      title: 'Un’agenzia vive su dieci strumenti. Óptima ne tiene uno.',
      highlight: 'Óptima ne tiene uno.',
      text:
        'Il brief arriva in chat, le task stanno su un foglio, le ore su un altro, il credito dei clienti a memoria. Ogni passaggio perde un pezzo. Óptima mette clienti, progetti, task, ore, revisioni e preventivi nello stesso spazio, e il telefono di chi lavora legge gli stessi dati del computer.',
      bullets: [
        'Oggi: le tue task, la giornata e cosa c’è da decidere',
        'Stessi account e stessi dati sul sito e sull’app iPhone',
        'Ogni ruolo vede solo quello che gli serve: chi dirige, il team, il cliente',
      ],
      media: [
        web('oggi-desktop', 'Óptima sul web: la pagina Oggi con le task in ritardo, la presenza e le cose da decidere', 'La pagina Oggi, con dati dimostrativi.'),
        phone('iphone-oggi', 'L’app Óptima per iPhone: la schermata Oggi con la sfera della giornata e le metriche', 'L’app iPhone (in prova su TestFlight), con dati dimostrativi.'),
      ],
      layout: 'media-right',
    },
    {
      id: 'consegna',
      kicker: 'La consegna',
      title: 'Dalla richiesta del cliente al lavoro consegnato e approvato.',
      highlight: 'consegnato e approvato',
      text:
        'Una task nasce completa: persona, scadenza, nota, allegati. I file grandi, video e Illustrator compresi, si caricano a pezzi e riprendono se cade la rete. Chi consegna deve allegare il lavoro o un link: senza, non si chiude. Chi approva sa sempre cosa guardare.',
      bullets: [
        'Lista o bacheca, con stato, scadenza e persona in un posto solo',
        'Anteprime vere di foto e PDF, link Canva con un tocco',
        'Chiude solo chi dirige: sito, iPhone e AI seguono la stessa regola',
      ],
      media: [web('workspace-desktop', 'Le task del team in lista, con cliente, persona e scadenza', 'Le task del team: stato, cliente, persona e scadenza.')],
      layout: 'media-left',
    },
    {
      id: 'ore-e-buoni',
      kicker: 'Ore e crediti',
      title: 'Il cartellino della giornata. Il credito dei clienti, speso con un QR.',
      highlight: 'speso con un QR',
      text:
        'Entrata, uscita e rapportino stanno nel cartellino; chi dirige non deve timbrare. Il contratto con un cliente fissa un credito che matura ogni mese: chi lavora con te lo spende alla cassa del cliente mostrando un QR, e il saldo scende da solo. Per i buoni del team serve l’approvazione di un amministratore.',
      bullets: [
        'Giornata chiusa e mandata in approvazione, con le note per chi approva',
        'Credito da contratto che matura e si accumula, con lo storico dei movimenti',
        'La cassa inquadra il QR dall’adesivo: nessuna app da installare per incassare',
      ],
      media: [
        web('cartellino-desktop', 'Il cartellino: la mia giornata, la presenza e le attività registrate', 'Il cartellino: presenza e attività della giornata.'),
        web('buoni-desktop', 'La pagina Buoni: benefit disponibile, dove spenderlo e i buoni richiesti', 'Buoni: il benefit disponibile e dove spenderlo.'),
      ],
      layout: 'media-right',
    },
    {
      id: 'ai',
      kicker: 'Óptima AI',
      title: 'Chiedi come lo chiederesti in agenzia. Decidi tu.',
      highlight: 'Decidi tu.',
      text:
        'L’assistente conosce task, clienti, preventivi e calendario di chi lo interroga, e risponde da quei dati. Prima di cambiare qualcosa chiede conferma. Chi dirige vede anche team e clienti; chi no, solo il proprio lavoro. Le domande sono contate per persona.',
      bullets: [
        'Risposte dai dati dello spazio di lavoro, non da un testo generico',
        'Propone task, assegnazioni e preventivi: le rivedi prima che diventino lavoro',
        'Le domande sono contate per persona, così il costo resta sotto controllo',
      ],
      media: [web('ai-assistant-desktop', 'Óptima AI: la schermata con le domande pronte e il campo per scrivere', 'Óptima AI con le domande pronte.')],
      layout: 'media-left',
    },
  ],

  features: [
    { icon: 'bolt', title: 'Oggi e Task', text: 'Le tue priorità, le scadenze e la bacheca del team, su web e iPhone con gli stessi numeri.' },
    { icon: 'clock', title: 'Cartellino e rapportino', text: 'Entrata, uscita, attività del giorno e chiusura con approvazione; chi dirige è presente di default.' },
    { icon: 'cart', title: 'Buoni Righello', text: 'Credito da contratto che matura ogni mese, speso con un QR alla cassa del cliente.' },
    { icon: 'file', title: 'Preventivi', text: 'Voci una tantum, ricorrenti e a tempo, fasi, rate e link per il cliente. Lo stesso importo su schermo, PDF e rate.' },
    { icon: 'message', title: 'Revisioni col cliente', text: 'Il cliente apre una pagina, commenta, approva o chiede modifiche. Non serve condividere tutto lo spazio.' },
    { icon: 'sparkle', title: 'Óptima AI', text: 'Risponde dai tuoi dati, prepara bozze e task, e chiede conferma prima di scrivere.' },
    { icon: 'device', title: 'App iPhone nativa', text: 'Fatta apposta per iPhone, non una pagina web incorniciata. Notifiche con i tasti Approva e Rivedi, e Face ID per decidere.' },
    { icon: 'shield', title: 'Pagamenti dei clienti', text: 'Il cliente salva carta o addebito SEPA da un link sicuro. I piani mensili sono gestiti da Óptima: una rata al mese per piano.' },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'L’app e il gestionale, schermata per schermata',
    highlight: 'schermata per schermata',
    lead: 'Le prime sei sono dell’app iPhone vera (build di prova con dati dimostrativi), le ultime due del gestionale sul web. Persone e aziende sono inventate.',
    items: [
      { id: 'iphone-oggi', label: 'iPhone · Oggi', media: phone('iphone-oggi', 'App iPhone, Oggi'), note: 'La giornata in una sfera: ore registrate sul previsto. Accanto task aperte, ritardi, ore e presenza.' },
      { id: 'iphone-task', label: 'iPhone · Task', media: phone('iphone-task', 'App iPhone, Task'), note: 'Le tue task, per scadenza o per progetto, con filtri rapidi.' },
      { id: 'iphone-cartellino', label: 'iPhone · Cartellino', media: phone('iphone-cartellino', 'App iPhone, Cartellino'), note: 'Il tesserino, la chiusura della giornata guidata in tre passi e il rapportino.' },
      { id: 'iphone-buoni', label: 'iPhone · Buoni', media: phone('iphone-buoni', 'App iPhone, Buoni Righello'), note: 'Per chi dirige: le richieste di buono da approvare, con importo e cliente.' },
      { id: 'iphone-inbox', label: 'iPhone · Inbox', media: phone('iphone-inbox', 'App iPhone, Inbox'), note: 'Assegnazioni e commenti, con le notifiche chieste al momento giusto.' },
      { id: 'iphone-ai', label: 'iPhone · Óptima AI', media: phone('iphone-ai', 'App iPhone, Óptima AI'), note: 'Domande pronte o a voce; prima di fare qualcosa l’assistente chiede conferma.' },
      { id: 'web-oggi', label: 'Web · Oggi', media: web('oggi-desktop', 'Il gestionale sul web: la pagina Oggi'), note: 'Lo stesso Oggi sul computer, con le cose da decidere e la squadra.' },
      { id: 'web-task', label: 'Web · Task', media: web('workspace-desktop', 'Il gestionale sul web: la lista delle task'), note: 'Lista di partenza (la bacheca è la seconda vista), con conteggi sull’insieme intero.' },
    ],
  },

  tech: [
    {
      title: 'Pensato per non fermarsi',
      text: 'Il gestionale è sempre raggiungibile, da qualunque posto. I lavori ricorrenti (pagamenti, inviti, promemoria) partono da soli, senza che qualcuno debba ricordarsene.',
      tags: ['Infrastruttura globale', 'Automazione'],
    },
    {
      title: 'App nativa, sempre allineata',
      text: 'L’app per iPhone è nativa e usa gli stessi dati del sito. Dopo una modifica ogni schermata si aggiorna da sola, senza ricaricare, e la sessione è protetta da Face ID.',
      tags: ['App nativa', 'Dati sempre allineati'],
    },
    {
      title: 'Una regola, un posto solo',
      text: 'Cosa vuol dire "fatta" lo decide un elenco solo, valido per sito e iPhone. Il preventivo ha un solo calcolo per schermo, PDF e rate. Il menu è definito in un punto. Un controllo automatico vieta i colori scritti a mano.',
      tags: ['Un solo punto di verità', 'Controlli automatici'],
    },
    {
      title: 'Numeri sempre sull’intero',
      text: 'Le liste arrivano a pagine, ma conteggi e intestazioni sono calcolati sull’insieme intero, mai sulla finestra caricata. Con centinaia di task un test di carico verifica che l’app resti fluida.',
      tags: ['Prestazioni', 'Test di carico'],
    },
    {
      title: 'Chi vede cosa',
      text: 'Ruoli per ogni persona, dall’amministratore al cliente. Il team lo vede solo chi dirige; il cliente solo il suo spazio. Le richieste all’AI sono contate per persona e ogni pagamento è protetto da doppi addebiti.',
      tags: ['Ruoli', 'Sicurezza', 'Pagamenti sicuri'],
    },
  ],

  cta: {
    title: 'Un posto solo per il lavoro dell’agenzia.',
    highlight: 'Un posto solo',
    text: 'Il gestionale è online. L’app iPhone è in prova con i primi team su TestFlight.',
    primary: { label: 'Apri Óptima', href: 'https://appbeta.wearerighello.com', external: true },
  },
} satisfies Landing;
