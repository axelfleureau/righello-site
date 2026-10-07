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
        'Attestati, idoneità, UNILAV e DURC stanno in cartelle, foto su WhatsApp e fogli Excel giusti solo il giorno in cui qualcuno li aggiorna. Tetha tiene l’archivio in ordine e guarda le date al posto tuo.',
      bullets: [
        'Avviso 30 giorni prima, con nome e giorni che mancano',
        'Il tesserino di ognuno diventa ambra, poi rosso, e dice perché',
        'Tre attestati in scadenza nello stesso mese: un corso solo',
      ],
      media: [shot('gestionale-panoramica', '954/816', 'La panoramica di Tetha: lavoratori in regola, documenti in scadenza e scaduti, cosa ha notato Tetha e le cose da fare', 'browser', 'La panoramica, con un’impresa di esempio.')],
      layout: 'media-right',
    },
    {
      id: 'come',
      kicker: 'Come funziona',
      title: 'Scansioni. Tetha legge le date. Confermi tu.',
      highlight: 'Confermi tu.',
      text:
        'Il capocantiere inquadra il foglio: l’app lo raddrizza e lo trasforma in un PDF su carta bianca. Tetha legge tipo, persona e date. Senza il tuo sì in archivio non entra niente; un rinnovo spegne la scadenza vecchia.',
      bullets: [
        'La scansione si fa sul telefono',
        'Quello che non riconosce va in "Da verificare"',
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
        'Scegli le persone e scarichi il dossier del cantiere, con indice e stato di ciascuno. Ai subappaltatori mandi un link: caricano da telefono senza registrarsi e tu decidi se sono idonei. Per loro è gratis.',
      bullets: [
        'Dossier di cantiere in ZIP, con indice e stato',
        'Idoneità tecnico-professionale (D.Lgs. 81/2008, allegato XVII)',
        'Per il POS: 50 schede di lavorazioni e 10 tipi di DPI',
      ],
      media: [
        shot('subappalti', '118/64', 'Il modulo Subappalti: i documenti dell’impresa, le persone in cantiere e il portale sul telefono del subappaltatore', 'none'),
        shot('gestionale-cantieri', '954/530', 'I cantieri e il dossier di ciascuno: POS, PSC, notifica preliminare, contratto, conteggi'),
      ],
      layout: 'full',
    },
  ],

  features: [
    { icon: 'scan', title: 'Scansione che pulisce', text: 'Il foglio storto diventa un PDF A4 su carta bianca. Anche «Condividi con Tetha» da altre app.' },
    { icon: 'users', title: 'Tesserino di cantiere', text: 'In regola, in scadenza o fermo, con il motivo. Lo vede il capocantiere sul telefono.' },
    { icon: 'link', title: 'Subappalti via link', text: 'Il subappaltatore carica senza registrarsi. Tu verifichi e decidi: idoneo o non idoneo, con il motivo.' },
    { icon: 'message', title: 'Anche da Telegram', text: 'Il capocantiere inoltra la foto al bot: Tetha riconosce il documento, chiede conferma e archivia.' },
    { icon: 'search', title: 'Chiedi a Tetha', text: 'Risponde sui documenti dell’impresa e mostra le fonti. Ogni impresa ha un tetto mensile di spesa.' },
    { icon: 'chart', title: 'Preventivi e consuntivi', text: 'Il preventivo si scrive a parole; il foglio ore incollato diventa consuntivo.' },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'L’app e il gestionale, schermata per schermata',
    highlight: 'schermata per schermata',
    lead: 'Schermate di Tetha con un’impresa inventata: persone, cantieri e documenti non sono reali.',
    items: [
      { id: 'iphone-oggi', label: 'iPhone · Oggi', media: iphone('iphone-oggi', 'App iPhone, Oggi'), note: 'Chi non può entrare oggi, cosa scade entro il mese e le domande da fare a Tetha.' },
      { id: 'iphone-tesserino', label: 'iPhone · Tesserino', media: iphone('iphone-tesserino', 'App iPhone, il tesserino di un lavoratore'), note: 'Il tesserino di cantiere, il prossimo documento in scadenza e le carte della persona.' },
      { id: 'iphone-archivio', label: 'iPhone · Archivio', media: iphone('iphone-archivio', 'App iPhone, Archivio'), note: 'Persone e impresa, ognuna con quanti documenti ha in regola.' },
      { id: 'iphone-chiedi', label: 'iPhone · Chiedi', media: iphone('iphone-chiedi', 'App iPhone, Chiedi a Tetha'), note: 'Domande pronte sull’archivio; le risposte citano i documenti.' },
      { id: 'archivio', label: 'Web · Archivio', media: shot('gestionale-archivio', '954/611', 'L’archivio dei documenti con i filtri'), note: 'Tutti i documenti con stato, rilascio e filtri per scaduti e in scadenza.' },
      { id: 'chiedi', label: 'Web · Chiedi', media: shot('chiedi', '33/28', 'Chiedi a Tetha sul web: la risposta con i documenti usati come fonti'), note: 'La domanda sul lavoro del giorno e, sotto la risposta, i documenti su cui si basa.' },
    ],
  },

  tech: [
    {
      title: 'Stesse regole su sito e app',
      text: 'Tipi di documento, scadenze e sostituzioni sono definiti in un punto solo. Lo stato si ricava sempre dalla data, mai da un valore salvato: il telefono non contraddice il computer.',
      tags: ['Un solo punto di verità', 'Dati sempre allineati'],
    },
    {
      title: 'Scansione sul telefono, anche offline',
      text: 'L’app trova il foglio, corregge la prospettiva, legge il testo e crea il PDF A4, tutto sul telefono. La rete serve solo da riserva.',
      tags: ['App nativa', 'Funziona offline'],
    },
    {
      title: 'Ogni impresa vede solo la sua',
      text: 'I dati di un’impresa sono separati da quelli delle altre a ogni richiesta e l’archivio è custodito in Europa. La lettura automatica propone: senza la tua conferma niente entra.',
      tags: ['Sicurezza', 'Controllo umano'],
    },
  ],

  cta: {
    title: 'La prossima richiesta del committente, pronta in un minuto.',
    highlight: 'pronta in un minuto',
    text:
      'Quattordici giorni di prova sui tuoi documenti, senza carta di credito; poi 59 € + IVA al mese e 6 € + IVA a persona, app iPhone compresa.',
    primary: { label: 'Vai a Tetha', href: 'https://tetha.wearerighello.com', external: true },
  },
} satisfies Landing;
