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
  variant: 'gestionale',
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
        'Il brief arriva in chat, le task stanno su un foglio, le ore su un altro, il credito dei clienti a memoria. Óptima mette tutto nello stesso spazio, e il telefono legge gli stessi dati del computer.',
      bullets: [
        'Oggi: le tue task, la giornata e cosa c’è da decidere',
        'Stessi account e stessi dati su sito e app iPhone',
        'Lista o bacheca, con stato, scadenza e persona',
      ],
      media: [
        web('oggi-desktop', 'Óptima sul web: la pagina Oggi con le task in ritardo, la presenza e le cose da decidere', 'La pagina Oggi, con dati dimostrativi.'),
      ],
      layout: 'media-right',
    },
    {
      id: 'consegna',
      kicker: 'La consegna',
      title: 'Dalla richiesta del cliente al lavoro consegnato e approvato.',
      highlight: 'consegnato e approvato',
      text:
        'Una task nasce completa: persona, scadenza, nota, allegati. I file grandi si caricano a pezzi e riprendono se cade la rete. Chi consegna deve allegare il lavoro o un link: senza, non si chiude.',
      bullets: [
        'Anteprime vere di foto e PDF, link Canva con un tocco',
        'Il cliente commenta e approva su una pagina sua',
        'Chiude solo chi dirige: sito, iPhone e AI seguono la regola',
      ],
      media: [web('workspace-desktop', 'Le task del team in lista, con cliente, persona e scadenza', 'Le task del team: stato, cliente, persona e scadenza.')],
      layout: 'media-left',
    },
    {
      id: 'ruoli',
      kicker: 'Chi lo usa',
      title: 'Chi dirige decide. Il team lavora. Il cliente vede il suo.',
      highlight: 'Il cliente vede il suo.',
      text:
        'Ogni persona ha il suo ruolo, dall’amministratore al cliente. Chi dirige approva ore e buoni e vede team e clienti; chi lavora vede il proprio lavoro. L’assistente AI risponde dai dati di chi lo interroga e chiede conferma prima di scrivere.',
      bullets: [
        'La giornata si chiude e va in approvazione',
        'I buoni del team vogliono l’ok di un amministratore',
        'Le domande all’AI sono contate per persona',
      ],
      media: [
        web('cartellino-desktop', 'Il cartellino: la mia giornata, la presenza e le attività registrate', 'Il cartellino: presenza e attività della giornata.'),
        web('buoni-desktop', 'La pagina Buoni: benefit disponibile, dove spenderlo e i buoni richiesti', 'Buoni: il benefit disponibile e dove spenderlo.'),
      ],
      layout: 'full',
    },
  ],

  features: [
    { icon: 'bolt', title: 'Oggi e Task', text: 'Priorità, scadenze e bacheca del team, su web e iPhone con gli stessi numeri.' },
    { icon: 'clock', title: 'Cartellino e rapportino', text: 'Entrata, uscita e attività del giorno; chi dirige è presente di default.' },
    { icon: 'cart', title: 'Buoni Righello', text: 'Credito da contratto che matura ogni mese, speso con un QR alla cassa del cliente.' },
    { icon: 'file', title: 'Preventivi e rate', text: 'Un solo calcolo per schermo, PDF e rate. Il cliente salva carta o addebito SEPA da un link.' },
    { icon: 'device', title: 'App iPhone nativa', text: 'Non una pagina web incorniciata: notifiche con Approva e Rivedi, Face ID per decidere.' },
    { icon: 'sparkle', title: 'Óptima AI', text: 'Risponde dai tuoi dati, prepara bozze e task, e chiede conferma prima di scrivere.' },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'L’app e il gestionale, schermata per schermata',
    highlight: 'schermata per schermata',
    lead: 'Le prime sei sono dell’app iPhone vera (build di prova con dati dimostrativi), l’ultima del gestionale sul web. Persone e aziende sono inventate.',
    items: [
      { id: 'iphone-oggi', label: 'iPhone · Oggi', media: phone('iphone-oggi', 'App iPhone, Oggi'), note: 'La giornata in una sfera: ore registrate sul previsto. Accanto task aperte, ritardi, ore e presenza.' },
      { id: 'iphone-task', label: 'iPhone · Task', media: phone('iphone-task', 'App iPhone, Task'), note: 'Le tue task, per scadenza o per progetto, con filtri rapidi.' },
      { id: 'iphone-cartellino', label: 'iPhone · Cartellino', media: phone('iphone-cartellino', 'App iPhone, Cartellino'), note: 'Il tesserino, la chiusura della giornata guidata in tre passi e il rapportino.' },
      { id: 'iphone-buoni', label: 'iPhone · Buoni', media: phone('iphone-buoni', 'App iPhone, Buoni Righello'), note: 'Per chi dirige: le richieste di buono da approvare, con importo e cliente.' },
      { id: 'iphone-inbox', label: 'iPhone · Inbox', media: phone('iphone-inbox', 'App iPhone, Inbox'), note: 'Assegnazioni e commenti, con le notifiche chieste al momento giusto.' },
      { id: 'iphone-ai', label: 'iPhone · Óptima AI', media: phone('iphone-ai', 'App iPhone, Óptima AI'), note: 'Domande pronte o a voce; prima di fare qualcosa l’assistente chiede conferma.' },
      { id: 'web-ai', label: 'Web · Óptima AI', media: web('ai-assistant-desktop', 'Óptima AI sul web: le domande pronte e il campo per scrivere'), note: 'Lo stesso assistente sul computer, con le domande pronte da cui partire.' },
    ],
  },

  tech: [
    {
      title: 'Pensato per non fermarsi',
      text: 'Il gestionale è sempre raggiungibile. I lavori ricorrenti (pagamenti, inviti, promemoria) partono da soli e ogni pagamento è protetto da doppi addebiti.',
      tags: ['Automazione', 'Pagamenti sicuri'],
    },
    {
      title: 'Una regola, un posto solo',
      text: 'Cosa vuol dire «fatta» lo decide un elenco solo, per sito e iPhone. Dopo una modifica ogni schermata si aggiorna da sola, senza ricaricare.',
      tags: ['Un solo punto di verità', 'Dati sempre allineati'],
    },
    {
      title: 'Numeri sempre sull’intero',
      text: 'Le liste arrivano a pagine, ma conteggi e intestazioni sono calcolati sull’insieme intero. Con centinaia di task un test di carico verifica che l’app resti fluida.',
      tags: ['Prestazioni', 'Test di carico'],
    },
  ],

  cta: {
    title: 'Un posto solo per il lavoro dell’agenzia.',
    highlight: 'Un posto solo',
    text: 'Il gestionale è online; l’app iPhone è in prova con i primi team su TestFlight.',
    primary: { label: 'Apri Óptima', href: 'https://appbeta.wearerighello.com', external: true },
  },
} satisfies Landing;
