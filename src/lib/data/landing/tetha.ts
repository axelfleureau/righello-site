import type { Landing } from './types';

const base = '/progetti/landing/tetha';

// Le schermate sono quelle della pagina pubblica di Tetha: impresa, persone, cantieri e documenti
// sono inventati (Edil Moretti S.r.l. e i suoi operai). Nessun dato di imprese o lavoratori reali.
const shot = (file: string, ratio: string, alt: string, frame: 'browser' | 'none' = 'browser', caption?: string) => ({
  type: 'image' as const,
  src: `${base}/${file}.webp`,
  alt,
  ratio,
  frame,
  caption,
});

const iphone = (file: string, alt: string, caption?: string) => ({
  type: 'image' as const,
  src: `${base}/${file}.webp`,
  alt,
  ratio: '110/239',
  frame: 'phone' as const,
  caption,
});

export default {
  tagline: 'Un documento scaduto ferma il cantiere. Tetha te lo dice prima.',

  metrics: [
    { value: 30, label: 'giorni di preavviso', note: 'su ogni scadenza' },
    { value: 37, label: 'tipi di documento riconosciuti', note: 'idoneità, attestati, UNILAV, DURC e altri, escluso "Da verificare"' },
    { text: '30–86 s', label: 'per leggere un documento', note: 'tempi misurati sulla lettura reale del 30/09/2026' },
    { value: 4, label: 'modi per caricare un documento', note: 'scansione nell’app, "Condividi con Tetha" da iPhone, trascinamento nel gestionale, bot Telegram' },
  ],

  chapters: [
    {
      id: 'problema',
      kicker: 'Il problema',
      title: 'Chi non può entrare lo scopri al cancello. O la sera prima.',
      highlight: 'la sera prima',
      text:
        'Attestati, idoneità sanitarie, UNILAV e DURC stanno in cartelle, foto su WhatsApp e fogli Excel che sono giusti solo il giorno in cui qualcuno li aggiorna. Quando un documento scade, il lavoratore non può entrare in cantiere. Tetha tiene l’archivio in ordine e guarda le date al posto tuo.',
      bullets: [
        'Avviso 30 giorni prima, con il nome e i giorni che mancano',
        'Il tesserino di ognuno diventa ambra e poi rosso, e dice perché',
        'Se tre attestati scadono nello stesso mese, Tetha propone un corso solo',
      ],
      media: [shot('gestionale-panoramica', '954/816', 'La panoramica di Tetha: lavoratori in regola, documenti in scadenza e scaduti, cosa ha notato Tetha e le cose da fare', 'browser', 'La panoramica, con un’impresa di esempio.'), iphone('iphone-oggi', 'L’app Tetha per iPhone: la schermata Oggi con le due persone che non possono entrare in cantiere', 'L’app iPhone (in prova su TestFlight), con un’impresa inventata.')],
      layout: 'media-right',
    },
    {
      id: 'come',
      kicker: 'Come funziona',
      title: 'Scansioni. Tetha legge le date. Confermi tu.',
      highlight: 'Confermi tu.',
      text:
        'Il capocantiere inquadra il foglio: l’app lo raddrizza, lo pulisce e lo trasforma in un PDF su carta bianca. Tetha legge tipo, persona e date e le mette accanto al foglio. Senza il tuo sì in archivio non entra niente. Quando carichi un rinnovo, la scadenza vecchia si spegne e la persona torna in regola.',
      bullets: [
        'La scansione avviene sul telefono, con gli strumenti del telefono',
        'Una data incerta si rilegge con più attenzione; quello che non riconosce va in "Da verificare"',
        'Il documento vecchio resta nello storico come "sostituito"',
      ],
      media: [shot('due-schermi', '118/75', 'Il gestionale e l’app: un documento letto accanto al foglio e il tesserino sul telefono', 'none', 'Stessi dati sul computer e sul telefono.')],
      layout: 'media-left',
    },
    {
      id: 'cantiere',
      kicker: 'Dal cantiere al committente',
      title: 'Il committente chiede i documenti. La risposta è già pronta.',
      highlight: 'già pronta',
      text:
        'Scegli le persone e scarichi il dossier del cantiere: documenti in ordine, un indice e lo stato di ciascuno. Se affidi lavori ad altri, mandi un link al subappaltatore: carica da telefono senza registrarsi, Tetha legge i file e tu decidi se è idoneo. Per lui è gratis.',
      bullets: [
        'Dossier di cantiere in ZIP, con indice e stato dei documenti',
        'Verifica dell’idoneità tecnico-professionale (D.Lgs. 81/2008, allegato XVII)',
        'Per il POS: 50 schede di lavorazioni e attrezzature e 10 tipi di DPI da cui partire',
      ],
      media: [
        shot('subappalti', '118/64', 'Il modulo Subappalti: i documenti dell’impresa, le persone in cantiere e il portale sul telefono del subappaltatore', 'none'),
        shot('gestionale-cantieri', '954/530', 'I cantieri e il dossier di ciascuno: POS, PSC, notifica preliminare, contratto, conteggi'),
      ],
      layout: 'media-right',
    },
    {
      id: 'chiedi',
      kicker: 'Chiedi',
      title: 'Chiedi come lo chiederesti in ufficio. Ti dice da dove l’ha preso.',
      highlight: 'da dove l’ha preso',
      text:
        'L’assistente risponde sui documenti e sui lavoratori della tua impresa, e sotto ogni risposta mostra i documenti su cui si basa. Ogni impresa ha un tetto mensile di spesa per l’intelligenza artificiale, e anche i tentativi falliti si contano.',
      bullets: [
        '«Chi non può entrare in cantiere lunedì?» con le fonti sotto la risposta',
        'Ogni impresa vede solo i propri dati',
        'La lettura automatica si spegne con un interruttore, e i documenti entrano lo stesso in coda',
      ],
      media: [shot('chiedi', '33/28', 'Chiedi a Tetha: la domanda su chi non può entrare in cantiere, la risposta e i documenti usati come fonti', 'browser', 'Domanda e risposta su dati dimostrativi.')],
      layout: 'media-left',
    },
  ],

  features: [
    { icon: 'scan', title: 'Scansione che pulisce', text: 'Il foglio storto diventa un PDF A4 su carta bianca, fatto sul telefono. Anche "Condividi con Tetha" da altre app.' },
    { icon: 'wand', title: 'Lettura dei documenti', text: 'Tipo, persona, rilascio e scadenza escono da soli. Tu guardi il foglio accanto ai campi e confermi.' },
    { icon: 'bell', title: 'Avviso a 30 giorni', text: 'Sul telefono, in panoramica e sul tesserino. Una sola regola di preavviso, per sito e app.' },
    { icon: 'users', title: 'Tesserino di cantiere', text: 'In regola, in scadenza o fermo, con il motivo. Lo vede il capocantiere sul suo telefono.' },
    { icon: 'file', title: 'Dossier in un clic', text: 'ZIP del cantiere con le persone scelte, un indice e lo stato di ogni documento.' },
    { icon: 'link', title: 'Subappalti con un link', text: 'Il subappaltatore carica da telefono senza registrarsi. Tu verifichi e decidi: idoneo o non idoneo, con il motivo.' },
    { icon: 'message', title: 'Anche da Telegram', text: 'Il capocantiere inoltra la foto al bot: Tetha riconosce il documento, chiede conferma e archivia.' },
    { icon: 'chart', title: 'Preventivi e consuntivi', text: 'Il preventivo si scrive a parole e il PDF si compone mentre scrivi. Il foglio ore incollato diventa consuntivo.' },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'L’app e il gestionale, schermata per schermata',
    highlight: 'schermata per schermata',
    lead: 'Schermate di Tetha con un’impresa inventata: persone, cantieri e documenti non sono reali. Le schermate dell’app sono quelle della scheda sullo store (30 settembre – 1 ottobre).',
    items: [
      { id: 'iphone-oggi', label: 'iPhone · Oggi', media: iphone('iphone-oggi', 'App iPhone, Oggi'), note: 'Chi non può entrare oggi, cosa scade entro il mese e le domande da fare a Tetha.' },
      { id: 'iphone-tesserino', label: 'iPhone · Tesserino', media: iphone('iphone-tesserino', 'App iPhone, il tesserino di un lavoratore'), note: 'Il tesserino di cantiere, il prossimo documento in scadenza e le carte della persona.' },
      { id: 'iphone-archivio', label: 'iPhone · Archivio', media: iphone('iphone-archivio', 'App iPhone, Archivio'), note: 'Persone e impresa, ognuna con quanti documenti ha in regola.' },
      { id: 'iphone-chiedi', label: 'iPhone · Chiedi', media: iphone('iphone-chiedi', 'App iPhone, Chiedi a Tetha'), note: 'Domande pronte sull’archivio; le risposte citano i documenti.' },
      { id: 'panoramica', label: 'Web · Panoramica', media: shot('gestionale-panoramica', '954/816', 'Panoramica di Tetha'), note: 'Chi è in regola, cosa scade entro 30 giorni, cosa è già scaduto e cosa ha notato Tetha.' },
      { id: 'archivio', label: 'Web · Archivio', media: shot('gestionale-archivio', '954/611', 'L’archivio dei documenti con i filtri'), note: 'Tutti i documenti con stato, rilascio e filtri per scaduti e in scadenza.' },
      { id: 'cantieri', label: 'Web · Cantieri', media: shot('gestionale-cantieri', '954/530', 'Cantieri e dossier'), note: 'Per ogni cantiere i documenti che il committente chiede.' },
      { id: 'subappalti', label: 'Web · Subappalti', media: shot('subappalti', '118/64', 'Il modulo Subappalti', 'none'), note: 'Documenti dell’impresa e delle persone, con l’esito di ognuno e il portale su telefono.' },
    ],
  },

  tech: [
    {
      title: 'Stesse regole su sito e app',
      text: 'Tipi di documento, calcolo delle scadenze, sostituzioni e piani sono definiti in un punto solo e usati sia dal sito sia dall’app. Cambiare una regola la cambia ovunque, e il telefono non può mai dire una cosa diversa dal computer.',
      tags: ['Un solo punto di verità', 'Dati sempre allineati'],
    },
    {
      title: 'Scansione sul telefono, anche offline',
      text: 'L’app trova il foglio, corregge la prospettiva, pulisce l’immagine, legge il testo e crea un PDF A4, tutto sul telefono. Il sistema in rete interviene solo come riserva, per galleria, gestionale e Telegram.',
      tags: ['App nativa', 'Funziona offline'],
    },
    {
      title: 'Ogni impresa vede solo la sua',
      text: 'I dati di un’impresa sono separati da quelli di tutte le altre a ogni richiesta: nessun utente può vedere o falsificare un’altra impresa. L’archivio è custodito in Europa.',
      tags: ['Sicurezza', 'Dati in Europa'],
    },
    {
      title: 'Scadenze calcolate, non salvate',
      text: 'Lo stato di un documento si ricava sempre dalla data, mai da un valore memorizzato: vale per ogni pagina e per l’app, senza correzioni a mano. Anche consigli come «un corso solo per tre persone» sono calcoli sulle date, non frasi inventate da un modello.',
      tags: ['Regola unica', 'Storico'],
    },
    {
      title: 'L’AI propone, non scrive',
      text: 'Ogni lettura è registrata con durata e costo e rispetta il tetto mensile dell’impresa. Il risultato è una proposta: senza la tua conferma niente entra in archivio.',
      tags: ['Intelligenza artificiale', 'Controllo umano'],
    },
  ],

  cta: {
    title: 'La prossima richiesta del committente, pronta in un minuto.',
    highlight: 'pronta in un minuto',
    text:
      'Quattordici giorni di prova sui tuoi documenti veri, senza carta di credito. Poi 59 € + IVA al mese di quota d’impresa e 6 € + IVA per ogni persona in forza; gli utenti sono illimitati. L’app per iPhone è compresa ed è in prova su TestFlight.',
    primary: { label: 'Vai a Tetha', href: 'https://tetha.wearerighello.com', external: true },
  },
} satisfies Landing;
