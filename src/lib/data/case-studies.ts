export type ProjectKind = 'app' | 'gestionale' | 'broadcast' | 'piattaforma' | 'sito' | 'contenuti';
export type StatusTone = 'store' | 'beta' | 'live' | 'internal';

export interface ProjectStatus {
  tone: StatusTone;
  label: string;
}

export type InfographicId = 'match-production' | 'ch77-plus' | 'pa-assistant' | 'dico-flow';

export interface ProjectStage {
  type: 'browser' | 'phones' | 'tablet' | 'infographic';
  /** Per 'infographic' è la copertina (anteprime, schede, social), non viene disegnata. */
  src: string;
  alt: string;
  screens?: string[];
  /** Solo per type 'infographic': quale infografica animata disegnare. */
  graphic?: InfographicId;
}

export interface CaseStudy {
  id: string;
  name: string;
  sector: string;
  category: 'digital' | 'web' | 'content' | 'marketing';
  kind: ProjectKind;
  status: ProjectStatus;
  platform: string[];
  audience?: string;
  accent: [string, string];
  headline: string;
  text: string;
  focus: string[];
  href?: string;
  storeUrl?: string;
  logo?: string;
  icon?: string;
  image: string;
  imagePosition?: string;
  stage?: ProjectStage;
  featured?: boolean;
}

export const categoryColors: Record<CaseStudy['category'], string> = {
  digital: '#D6487E',
  web: '#06B6D4',
  content: '#8B5CF6',
  marketing: '#10B981',
};

export const categoryLabels: Record<CaseStudy['category'], string> = {
  digital: 'Digital product',
  web: 'Sito web',
  content: 'Foto e video',
  marketing: 'Marketing',
};

export const kindLabels: Record<ProjectKind, string> = {
  app: 'App iOS',
  gestionale: 'Gestionale',
  broadcast: 'Regia e broadcast',
  piattaforma: 'Piattaforma web',
  sito: 'Sito su misura',
  contenuti: 'Foto e video',
};

// Schermate della build attuale (1.2.7) dal simulatore. L'ordine serve alla scena a ventaglio:
// [0] centro, [1] sinistra, [3] destra ([2] non e' usata: tienila comunque, serve almeno 4 voci).
const phonesBuffr = [
  '/products/buffr/libreria-v2.webp',
  '/products/buffr/campo-v2.webp',
  '/progetti/landing/buffr/clip.webp',
  '/products/buffr/montaggio-v2.webp',
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'buffr',
    name: 'BUFFR',
    sector: 'Prodotto iOS',
    category: 'digital',
    kind: 'app',
    status: { tone: 'store', label: 'Pubblicata su App Store' },
    platform: ['iPhone'],
    audience: 'Sport, eventi live, creator e redazioni',
    accent: ['#D6487E', '#7A2B8F'],
    headline: 'Registra sempre. Salva dopo che è successo.',
    text:
      'La camera tiene gli ultimi secondi: quando succede qualcosa, un tocco li salva come clip, con il momento e il punteggio. Poi BUFFR monta il video della partita, anche con più telefoni.',
    focus: ['Buffer retroattivo', 'Montaggio automatico', 'Team e partite', 'App Store'],
    href: '/buffr',
    storeUrl: 'https://apps.apple.com/it/app/buffr/id6769990725',
    logo: '/logo-icon.png',
    icon: '/progetti/icons/buffr.webp',
    image: '/products/buffr/replay-in-un-tap.jpg',
    imagePosition: 'center top',
    stage: {
      type: 'phones',
      src: phonesBuffr[0],
      alt: 'BUFFR: la camera con il pulsante Avvia buffer e le schermate di libreria e montaggio',
      screens: phonesBuffr,
    },
    featured: true,
  },
  {
    id: 'buffr-live',
    name: 'BUFFR Live',
    sector: 'App e sito per il calcio dilettantistico',
    category: 'digital',
    kind: 'app',
    status: { tone: 'beta', label: 'Sito online · app in prova' },
    platform: ['iPhone', 'Web'],
    audience: 'Chi segue il calcio dilettantistico di Veneto e Friuli',
    accent: ['#E5446D', '#6C2BD9'],
    headline: 'Il calcio dei dilettanti, in diretta.',
    text:
      'Risultati live, cronaca, formazioni, calendari e mappa dei campi per il calcio dilettantistico di Veneto e Friuli. I dati nascono dal Palmare dei cronisti, direttamente dal campo.',
    focus: ['Dati live', 'App iOS', 'Sito web', 'Palmare dei cronisti'],
    href: 'https://live.wearerighello.com',
    icon: '/progetti/icons/buffr-live.webp',
    image: '/progetti/stage/buffr-live.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/buffr-live.webp',
      alt: 'BUFFR Live: la pagina delle partite del giorno con i risultati in diretta',
    },
    featured: true,
  },
  {
    id: 'regia-tv-studio',
    name: 'Produzione delle partite',
    sector: 'Regia automatica per lo sport',
    category: 'digital',
    kind: 'broadcast',
    status: { tone: 'internal', label: 'Motore interno in uso' },
    platform: ['Render automatico'],
    audience: 'Produzione televisiva sportiva',
    accent: ['#E11D2E', '#F5C400'],
    headline: 'Le riprese entrano, la partita da televisione esce.',
    text:
      'Il Motore TV Studio mette insieme il video dal campo, le squadre, gli eventi della partita e gli sponsor, e ne fa una partita da televisione con le grafiche già al loro posto: tempo e risultato, formazioni, rigori, pubblicità e replay.',
    focus: ['Grafiche automatiche', 'Replay e highlights', 'Formazioni e rigori', 'Sponsor in campo'],
    icon: '/progetti/icons/produzione-partite.webp',
    image: '/progetti/regia/gol-scorebug.webp',
    imagePosition: 'center center',
    stage: {
      type: 'infographic',
      graphic: 'match-production',
      src: '/progetti/regia/gol-scorebug.webp',
      alt: 'Schema animato della produzione delle partite: riprese, squadre, eventi e sponsor entrano nel Motore TV Studio e escono come partita con le grafiche, replay e highlights, e programmi per Canale 77 e i televisori',
    },
    featured: true,
  },
  {
    id: 'ch77-plus',
    name: 'CH77+',
    sector: 'Canale 77 Premium e dirette in esclusiva',
    category: 'digital',
    kind: 'broadcast',
    status: { tone: 'live', label: 'Attivazione Premium online' },
    platform: ['Web', 'HbbTV', 'Smart TV', 'Android TV'],
    audience: 'Spettatori di sport locale',
    accent: ['#4F7CFF', '#FACC15'],
    headline: 'Il televisore si sblocca con il telefono, in pochi secondi.',
    text:
      'Il televisore mostra un codice e un QR, il telefono apre la pagina di attivazione, si accede e si attiva Premium: la TV se ne accorge da sola e sblocca le dirette in esclusiva, a partire dalle partite.',
    focus: ['Abbinamento TV e telefono', 'Accesso con account', 'Dirette in esclusiva', 'HbbTV e Android TV'],
    href: 'https://ch77.wearerighello.com',
    logo: '/logos/canale-77.webp',
    icon: '/progetti/icons/ch77-plus.webp',
    image: '/progetti/stage/canale77.webp',
    stage: {
      type: 'infographic',
      graphic: 'ch77-plus',
      src: '/progetti/stage/canale77.webp',
      alt: 'Schema animato dell\'attivazione di CH77+: la TV mostra codice e QR, il telefono apre la pagina di attivazione, si accede, la TV controlla ogni tre secondi e si sblocca, e compaiono le dirette in esclusiva',
    },
    featured: true,
  },
  {
    id: 'optima',
    name: 'Óptima',
    sector: 'Gestionale per agenzie e studi',
    category: 'digital',
    kind: 'gestionale',
    status: { tone: 'live', label: 'Online · app iPhone in prova' },
    platform: ['Web', 'iPhone'],
    audience: 'Agenzie e studi professionali',
    accent: ['#D6487E', '#7C5CFF'],
    headline: 'Brief alle 9. Approvato alle 18. Óptima tiene il ritmo.',
    text:
      'Il gestionale con intelligenza artificiale per agenzie e studi: clienti, task, revisioni con il cliente, preventivi, ore e buoni, sul web e su iPhone.',
    focus: ['Gestionale AI', 'Web e iPhone', 'Video review', 'Preventivi'],
    href: 'https://appbeta.wearerighello.com',
    icon: '/progetti/icons/optima.webp',
    image: '/progetti/stage/optima.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/optima.webp',
      alt: 'Óptima: la pagina iniziale con l\'assistente che risponde dai dati dello studio',
    },
    featured: true,
  },
  {
    id: 'tetha',
    name: 'Tetha',
    sector: 'SaaS per l\'edilizia',
    category: 'digital',
    kind: 'gestionale',
    status: { tone: 'live', label: 'Online · app iPhone in prova' },
    platform: ['Web', 'iPhone'],
    audience: 'Imprese edili, lattonieri e subappaltatori',
    accent: ['#1FBF8F', '#0E4D45'],
    headline: 'Un software che tiene il cantiere in regola prima che un documento scaduto lo fermi.',
    text:
      'Imprese edili, lattonieri e subappaltatori tenevano scadenze e idoneità sanitarie su fogli Excel sparsi. Tetha legge i documenti scansionati dal telefono o mandati su Telegram, avvisa trenta giorni prima di ogni scadenza e prepara in un clic il dossier che il committente chiede al cancello del cantiere.',
    focus: ['Software per l\'edilizia', 'Bot Telegram', 'Automazione documentale', 'Dashboard'],
    href: 'https://tetha.wearerighello.com',
    icon: '/progetti/icons/tetha.webp',
    image: '/progetti/stage/tetha.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/tetha.webp',
      alt: 'Tetha: la scadenza dei documenti di cantiere su telefono e su web',
    },
    featured: true,
  },
  {
    id: 'gusto-raffinato',
    name: 'Gusto Raffinato',
    sector: 'App per chi esce a mangiare',
    category: 'digital',
    kind: 'app',
    status: { tone: 'beta', label: 'App iPhone in prova' },
    platform: ['iPhone'],
    audience: 'Chi cerca un locale in Friuli Venezia Giulia',
    accent: ['#F0A33A', '#8A4B12'],
    headline: 'Trovi il locale, chiedi un tavolo, e i timbri arrivano da soli.',
    text:
      'L\'app per i clienti: il catalogo dei locali del Friuli Venezia Giulia, la prenotazione dove il locale usa Gusto, le tessere fedeltà che si riempiono dai consumi veri (anche in Wallet) e il menu letto sulle tue esigenze alimentari.',
    focus: ['iPhone', 'Catalogo dei locali', 'Prenotazione', 'Tessere fedeltà', 'Menu e allergie'],
    href: 'https://gustoraffinato.com',
    icon: '/progetti/icons/gusto-raffinato.webp',
    image: '/progetti/stage/gusto-raffinato.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/gusto-raffinato.webp',
      alt: 'Gusto Raffinato: il sito e l\'app per i clienti dei locali',
    },
    featured: true,
  },
  {
    id: 'gusto-raffinato-sala',
    name: 'Gusto Raffinato Sala',
    sector: 'Gestionale per ristoranti e locali',
    category: 'digital',
    kind: 'gestionale',
    status: { tone: 'beta', label: 'App iPad e iPhone in prova' },
    platform: ['iPad', 'iPhone'],
    audience: 'Ristoratori e personale di sala',
    accent: ['#F0A33A', '#8A4B12'],
    headline: 'Tutta la sala su un iPad. Il cameriere, nel telefono.',
    text:
      'Il gestionale per chi ha un locale: la sala in 3D con tavoli e conti, l\'agenda della serata, le comande dal palmare del cameriere, il magazzino e il costo dei piatti.',
    focus: ['iPad e iPhone', 'Sala in 3D', 'Palmare per i camerieri', 'Magazzino e costo dei piatti'],
    href: 'https://gustoraffinato.com',
    icon: '/progetti/icons/gusto-raffinato-sala.webp',
    image: '/progetti/stage/gusto-sala-ipad.webp',
    stage: {
      type: 'tablet',
      src: '/progetti/stage/gusto-sala-ipad.webp',
      alt: 'Gusto Raffinato Sala: la sala di un locale in 3D su iPad, con il palmare del cameriere',
      screens: ['/progetti/stage/gusto-sala-palmare-1.webp'],
    },
    featured: true,
  },
  {
    id: 'lumis',
    name: 'Lumis',
    sector: 'Web app e media workflow',
    category: 'digital',
    kind: 'piattaforma',
    status: { tone: 'live', label: 'Sito online' },
    platform: ['Web'],
    audience: 'Fotografi di eventi',
    accent: ['#FF7A1A', '#E11D74'],
    headline: 'Dallo scatto alla vendita: gallery con il tuo marchio, consegna sicura.',
    text:
      'La piattaforma per fotografi di eventi: gallery ordinate in album, anteprime con filigrana, pagamento con carta sicuro e download in alta risoluzione. Sul sito e, in prova, su iPhone.',
    focus: ['Web app', 'Gallery brandizzate', 'Filigrana e originali protetti', 'Pagamenti sicuri', 'App iPhone'],
    href: 'https://lumis.wearerighello.com',
    icon: '/progetti/icons/lumis.webp',
    image: '/progetti/stage/lumis.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/lumis.webp',
      alt: 'Lumis: la pagina iniziale della piattaforma per vendere le foto degli eventi',
    },
    featured: true,
  },
  {
    id: 'rigcast',
    name: 'Rig Cast',
    sector: 'Camera di regia su iPhone',
    category: 'digital',
    kind: 'broadcast',
    status: { tone: 'beta', label: 'App in prova' },
    platform: ['iPhone'],
    audience: 'Regie e troupe video',
    accent: ['#3B82F6', '#22C55E'],
    headline: 'L\'iPhone diventa una camera di regia.',
    text:
      'Il video va dritto dal telefono alla regia in RTMP, RTMPS o SRT, con ottiche, fuoco ed esposizione manuali e controlli rapidi. L\'app è tutta in orizzontale, pensata per stare sul treppiede.',
    focus: ['Streaming dal vivo', 'Controlli manuali', 'SRT e RTMP', 'iPhone'],
    icon: '/progetti/icons/rigcast.webp',
    image: '/progetti/icons/rigcast.webp',
    imagePosition: 'center center',
  },
  {
    id: 'canale77',
    name: 'Canale 77 On Demand',
    sector: 'Piattaforma video on demand e diretta',
    category: 'digital',
    kind: 'broadcast',
    status: { tone: 'live', label: 'Online' },
    platform: ['Web', 'HbbTV', 'Smart TV'],
    audience: 'Spettatori di sport locale',
    accent: ['#4F7CFF', '#FACC15'],
    headline: 'Le partite, quando vuoi, anche sul televisore.',
    text:
      'Il catalogo di Canale 77, CalcioFVG Live e CalcioVeneto Live in un posto solo: highlights, interviste, rubriche e partite, sul sito, sull\'HbbTV del digitale terrestre, sulle smart TV e sull\'app Android TV.',
    focus: ['Video on demand', 'Diretta', 'HbbTV', 'Smart TV'],
    href: 'https://ch77.wearerighello.com',
    logo: '/logos/canale-77.webp',
    image: '/progetti/stage/canale77.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/canale77.webp',
      alt: 'Canale 77 On Demand: la pagina iniziale con highlights, interviste e rubriche',
    },
  },
  {
    id: 'dico',
    name: 'DICO.ONLINE',
    sector: 'Piattaforma comunicazione PA',
    category: 'digital',
    kind: 'piattaforma',
    status: { tone: 'live', label: 'Online' },
    platform: ['Web'],
    audience: 'Comuni, enti e pubblica amministrazione',
    accent: ['#F2B83B', '#1E3A5F'],
    headline: 'Un solo messaggio per uscita, e i dettagli a un clic.',
    text:
      'DICO porta le comunicazioni dei Comuni dove le persone guardano davvero: WhatsApp e Telegram. La piattaforma è una redazione: si incolla un testo o si indicano fino a cinque link del sito del Comune, e un pulsante, «Prepara il messaggio», legge le pagine, compila i campi e riscrive nello stile dell\'ente, usando i messaggi già pubblicati. Poi si controlla, la redazione ritocca e approva. Esce un solo messaggio per volta, di norma uno a settimana, con le emergenze in cima e una riga per tematica: ogni link apre la pagina della settimana sul sito del Comune, che resta online anche dopo. L\'archivio e gli allegati sono ospitati in Europa.',
    focus: ['Messaggio settimanale', 'Pagine per tematica', 'Redazione con IA', 'Portale enti'],
    href: 'https://www.dico.online',
    logo: '/logos/dico-online.webp',
    icon: '/progetti/icons/dico.webp',
    image: '/progetti/stage/dico.webp',
    stage: {
      type: 'infographic',
      graphic: 'dico-flow',
      src: '/progetti/stage/dico.webp',
      alt: 'Schema animato di DICO: la redazione prepara il messaggio, lo approva, esce un solo messaggio a settimana con un link per tematica e ogni link apre la pagina dedicata di quella tematica',
    },
  },
  {
    id: 'assistenti-pa',
    name: 'Assistenti AI per i Comuni',
    sector: 'Assistenti automatici per i cittadini',
    category: 'digital',
    kind: 'piattaforma',
    status: { tone: 'beta', label: 'In sperimentazione in un Comune del Friuli Venezia Giulia' },
    platform: ['WhatsApp', 'Web'],
    audience: 'Comuni e pubblica amministrazione',
    accent: ['#F2B83B', '#1E3A5F'],
    headline: 'Rispondono ai cittadini con le pagine del Comune, e dicono quando non lo sanno.',
    text:
      'Assistenti alimentati dai dati di ciascun ente. Il bot WhatsApp di un Comune legge le pagine ufficiali (servizi, eventi, notizie) e risponde rimandando alla fonte; i dati personali vengono anonimizzati prima di essere elaborati; se l\'informazione non c\'è, lo dice onestamente invece di inventarla. Anche DICO ha una memoria per ogni Comune: i messaggi già pubblicati, usati per scrivere i nuovi nello stile dell\'ente, sempre con il controllo della redazione.',
    focus: ['Assistente su WhatsApp', 'Risposte con la fonte', 'Dati personali anonimizzati', 'Memoria di ogni Comune'],
    icon: '/progetti/icons/assistenti-pa.webp',
    image: '/progetti/icons/assistenti-pa.webp',
    imagePosition: 'center center',
    stage: {
      type: 'infographic',
      graphic: 'pa-assistant',
      src: '/progetti/icons/assistenti-pa.webp',
      alt: 'Schema animato di un assistente del Comune: il cittadino chiede su WhatsApp, i dati personali vengono coperti, l\'assistente cerca nelle fonti del Comune e risponde indicando la fonte oppure dicendo che non lo sa',
    },
  },
  {
    id: 'neura',
    name: 'Neura',
    sector: 'EdTech per famiglie',
    category: 'digital',
    kind: 'piattaforma',
    status: { tone: 'live', label: 'Sito online' },
    platform: ['Web'],
    audience: 'Famiglie di studenti con difficoltà di apprendimento',
    accent: ['#8B3DFF', '#E040FB'],
    headline: 'Marchio, sito e video per una startup che aiuta chi studia con difficoltà di apprendimento.',
    text:
      'Neura Education propone un assistente di studio per ragazzi con difficoltà di apprendimento. Noi abbiamo curato come si presenta: il marchio, un sito di una pagina che spiega problema, metodo e prezzo a un genitore, e un video verticale per i social.',
    focus: ['Marchio', 'Sito di presentazione', 'Video per i social', 'Testi per le famiglie'],
    href: 'https://neura.wearerighello.com',
    logo: '/logos/neura.png',
    image: '/progetti/stage/neura.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/neura.webp',
      alt: 'Neura: la pagina iniziale dell\'assistente di studio per ragazzi con difficoltà di apprendimento',
    },
  },
  {
    id: 'portopiccolo-apartments',
    name: 'Portopiccolo Apartments',
    sector: 'Short-term rental & Hospitality',
    category: 'web',
    kind: 'sito',
    status: { tone: 'live', label: 'Online' },
    platform: ['Web'],
    audience: 'Ospiti del borgo di Portopiccolo',
    accent: ['#C9A66B', '#1F6F8B'],
    headline: 'Un sito che prenota da solo, collegato in tempo reale al calendario del gestionale, non una vetrina.',
    text:
      'Trentaquattro appartamenti nel borgo di Portopiccolo: prezzo "da" calcolato sul primo soggiorno davvero prenotabile, non sulla tariffa di bassa stagione, e prenotazione diretta senza passare dal telefono.',
    focus: ['Prenotazione diretta', 'Gestionale collegato', 'Prezzi dinamici', 'Esperienza di prenotazione'],
    href: 'https://www.portopiccoloapartments.com',
    logo: '/logos/portopiccolo-apartments.webp',
    image: '/progetti/stage/portopiccolo-apartments.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/portopiccolo-apartments.webp',
      alt: 'Portopiccolo Apartments: la pagina iniziale con la ricerca delle date',
    },
  },
  {
    id: 'bibione-sand-storm',
    name: 'Bibione Sand Storm',
    sector: 'Sito di un evento sportivo',
    category: 'web',
    kind: 'sito',
    status: { tone: 'live', label: 'Online' },
    platform: ['Web'],
    audience: 'Pubblico e piloti dell\'evento',
    accent: ['#F5C400', '#1A1A1A'],
    headline: 'Motocross e quad sulla sabbia, con un sito che ha la stessa energia.',
    text:
      'Rifacimento completo del sito dell\'evento: diciassette pagine, animazioni a scorrimento e sezioni sagomate. Online dal 30 settembre 2026.',
    focus: ['17 pagine', 'Animazioni a scorrimento', 'Sito di evento', 'Bilingue'],
    href: 'https://www.bibionesandstorm.it',
    logo: '/logos/bibione-sand-storm.webp',
    image: '/progetti/stage/bibione-sand-storm.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/bibione-sand-storm.webp',
      alt: 'Bibione Sand Storm: la pagina iniziale del campionato del mondo su sabbia',
    },
  },
  {
    id: 'scuola-sci-piancavallo',
    name: 'Scuola Sci Piancavallo',
    sector: 'Sport e turismo di montagna',
    category: 'web',
    kind: 'sito',
    status: { tone: 'live', label: 'Online' },
    platform: ['Web'],
    audience: 'Sciatori e famiglie',
    accent: ['#2F6BFF', '#0B1B3F'],
    headline: 'Un sito che segue la stagione: neve e corsi d\'inverno, camp d\'estate.',
    text:
      'Corsi, prezzi e prenotazione in un unico sito. La stagione decide testi e pulsanti: in inverno corsi di sci e snowboard, in estate camp e pista sintetica.',
    focus: ['Prenotazione corsi', 'Listino filtrabile', 'Sito stagionale', 'Bilingue'],
    href: 'https://www.scuolascipiancavallo.it',
    logo: '/logos/scuola-sci-piancavallo.png',
    image: '/progetti/stage/scuola-sci-piancavallo.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/scuola-sci-piancavallo.webp',
      alt: 'Scuola Sci Piancavallo: la pagina iniziale con i corsi e la prenotazione',
    },
  },
  {
    id: 'fiumedica',
    name: 'Fiumedica',
    sector: 'Medical & healthcare',
    category: 'web',
    kind: 'sito',
    status: { tone: 'live', label: 'Online' },
    platform: ['Web'],
    audience: 'Pazienti di Fiume Veneto e dintorni',
    accent: ['#1F6FD6', '#0B2A5A'],
    headline: 'Un sito che porta il paziente al passo giusto: prenotare, ritirare il referto, chiamare.',
    text:
      'Ventisei aree mediche, diagnostica, sport e prelievi in un sito chiaro: una pagina per ogni area, orari sempre in vista, prenotazione e referti a un pulsante di distanza.',
    focus: ['Sito', 'Prenotazione online', 'Referti online', 'Da telefono'],
    href: 'https://www.fiumepolosanitario.it',
    image: '/progetti/stage/fiumedica.webp',
    stage: {
      type: 'browser',
      src: '/progetti/stage/fiumedica.webp',
      alt: 'Fiumedica: la pagina iniziale del polo sanitario',
    },
  },
  {
    id: 'reguta',
    name: 'Reguta 1928',
    sector: 'Wine & lifestyle',
    category: 'marketing',
    kind: 'contenuti',
    status: { tone: 'live', label: 'Gestionale in prova · social attivi' },
    platform: ['Social'],
    audience: 'Clienti, ospiti e mercati export',
    accent: ['#B3263E', '#3B0D18'],
    headline: 'Il marchio sui social e, dietro le quinte, un gestionale che tiene in regola certificati e scadenze.',
    text:
      'Per un brand storico il punto non è pubblicare di più: è costruire un’immagine coerente, e tenere in ordine anche ciò che non si vede. Righello cura i contenuti social e ha costruito il gestionale di conformità che raccoglie corsi, idoneità, mezzi e documenti e dice cosa scade e cosa manca.',
    focus: ['Gestionale di conformità', 'Scadenze', 'Archivio tracciato', 'Contenuti social'],
    href: 'https://www.instagram.com/reguta.1928/',
    logo: '/logos/reguta.png',
    image: '/thumbnails/thumb-f89791b0c4c7.jpg',
  },
  {
    id: 'elite-hotel-spa',
    name: 'Elite Hotel & Spa',
    sector: 'Hospitality',
    category: 'content',
    kind: 'contenuti',
    status: { tone: 'live', label: 'Pubblicati sui social' },
    platform: ['Social'],
    audience: 'Ospiti e prenotazioni dirette',
    accent: ['#8B5CF6', '#2E1A5C'],
    headline: 'Foto e video per far scegliere un hotel con spa prima ancora di prenotare.',
    text:
      'Chi sceglie dove dormire guarda prima le immagini. Produciamo foto e video che raccontano camere, atmosfera e servizi, per il profilo Instagram dell’hotel e per le campagne.',
    focus: ['Servizio fotografico', 'Video', 'Materiali per le campagne', 'Hotel e spa'],
    href: 'https://www.instagram.com/elitehotelandspa/',
    logo: '/logos/hotel-elite.png',
    image: '/thumbnails/thumb-ca926bab868e.jpg',
  },
  {
    id: 'riviera-resort',
    name: 'Riviera Resort',
    sector: 'Hospitality',
    category: 'content',
    kind: 'contenuti',
    status: { tone: 'live', label: 'Video online' },
    platform: ['Social'],
    audience: 'Ospiti e campagne stagionali',
    accent: ['#0EA5E9', '#0B3A52'],
    headline: 'Il resort di Lignano Sabbiadoro visto dall’alto, tra mare e pineta, in 36 secondi.',
    text:
      'Riprese aeree della struttura e dell’area intorno, dal mare alla terrazza, montate in un video Full HD pronto per il sito e per YouTube.',
    focus: ['Riprese aeree', 'Video', 'Full HD'],
    href: 'https://www.instagram.com/rivieraresorthotel/',
    logo: '/logos/riviera-resort.png',
    image: '/thumbnails/thumb-8424e05df0ca.jpg',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === slug);
}

export const validCaseStudySlugs = caseStudies.map((study) => study.id);

export function getRelatedCaseStudies(current: CaseStudy, count = 3): CaseStudy[] {
  const pool = caseStudies.filter((study) => study.id !== current.id);
  const sameKind = pool.filter((study) => study.kind === current.kind);
  const rest = pool.filter((study) => study.kind !== current.kind);
  return [...sameKind, ...rest].slice(0, count);
}

export function getNextCaseStudy(current: CaseStudy): CaseStudy {
  const index = caseStudies.findIndex((study) => study.id === current.id);
  return caseStudies[(index + 1) % caseStudies.length];
}

export function caseStudyHref(study: CaseStudy): string {
  if (study.id === 'buffr') return '/buffr';
  return `/progetti/${study.id}`;
}

export const showcaseStudies = caseStudies.filter((study) => study.featured);
