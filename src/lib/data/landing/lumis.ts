import type { Landing } from './types';

const A = '/progetti/landing/lumis';

/*
 * Lumis: web app e app iPhone per fotografi di eventi (sito online, app in prova su TestFlight).
 * Fatti verificati (06/10/2026) e sul sito lumis.wearerighello.com.
 * Le foto che si vedono nelle schermate sono quelle promozionali del sito, nell'account dimostrativo "Righello Demo".
 * Niente prezzi, niente commissioni, niente "import live dalla fotocamera" (non ancora validato su dispositivo vero).
 */
const web = (file: string, ratio: string, alt: string, caption?: string) => ({
  type: 'image' as const,
  src: `${A}/${file}.webp`,
  alt,
  caption,
  ratio,
  frame: 'browser' as const,
});

const app = (file: string, alt: string, caption?: string) => ({
  type: 'image' as const,
  src: `${A}/${file}.webp`,
  alt,
  caption,
  ratio: '700/1521',
  frame: 'phone' as const,
});

export default {
  variant: 'gestionale',
  tagline: 'Dallo scatto alla vendita: gallery protette, consegna sicura, il tuo marchio.',

  metrics: [
    {
      value: 0,
      label: 'registrazioni per comprare',
      note: 'il cliente inserisce solo l\'email al pagamento; il link alla gallery basta'
    },
    {
      value: 0,
      label: 'selfie inviati al server',
      note: 'la ricerca con selfie confronta una firma numerica ricavata sul dispositivo'
    },
    {
      value: 4,
      label: 'intensità di filigrana',
      note: 'lieve, forte, molto forte, invadente: si sceglie per evento'
    }
  ],

  chapters: [
    {
      id: 'gallery',
      kicker: 'La gallery',
      title: 'Una gallery che sembra tua, non di un servizio qualunque.',
      highlight: 'sembra tua',
      text:
        'Un link a una cartella condivisa dice poco di chi ha scattato. Con Lumis ogni evento ha la sua gallery in album, con il tuo logo, i tuoi colori e i tuoi contatti. Il cliente apre il link e sceglie, senza account.',
      bullets: [
        'Album con stato: bozza, solo link o pubblica',
        'Profilo pubblico con logo, colore e social',
        'Link e codice QR da condividere o stampare'
      ],
      media: [web('web-gallery', '1600/1100', 'Una gallery pubblica di Lumis: copertina con il titolo dell\'evento, il logo del fotografo e la griglia delle foto con la filigrana, selezionabili.', 'La gallery del cliente: griglia ordinata, filigrana, foto selezionabili.')],
      layout: 'media-right'
    },
    {
      id: 'protezione',
      kicker: 'Protezione e consegna',
      title: 'Le anteprime si guardano. Gli originali si pagano.',
      highlight: 'Gli originali si pagano.',
      text:
        'Quando carichi, ogni scatto diventa un\'anteprima leggera con la filigrana: è l\'unica cosa che il pubblico vede. L\'originale resta in un archivio privato. Chi compra paga con carta e riceve un link firmato, con scadenza, per scaricare in alta risoluzione.',
      bullets: [
        'Filigrana con logo e testo, in quattro intensità',
        'Conferma d\'ordine al cliente, avviso al fotografo',
        'Dal sito rimandi il link di download a chi lo perde'
      ],
      media: [app('app-foto', 'Le foto di un evento nell\'app per iPhone: selezione, cartelle e stato di pubblicazione.', 'Le foto di un evento, dal telefono.')],
      layout: 'media-left'
    },
    {
      id: 'cercami',
      kicker: 'Cercami',
      title: 'Un selfie, e il cliente trova le sue foto.',
      highlight: 'trova le sue foto',
      text:
        'Dopo un evento con migliaia di scatti, trovarsi è la parte più lenta. Dove il fotografo ha elaborato i volti, chi cerca scatta un selfie e vede solo le foto in cui compare. Il selfie non viene mai caricato: il telefono ne ricava una firma numerica e confronta solo quella.',
      bullets: [
        'Il riconoscimento gira nel browser di chi cerca',
        'Si attiva evento per evento, a scelta del fotografo',
        'Si vedono, si selezionano e si comprano solo i propri scatti'
      ],
      layout: 'full'
    }
  ],

  features: [
    { icon: 'lock', title: 'Originali al sicuro', text: 'Gli originali stanno in un archivio privato: li legge solo chi ha l\'evento.' },
    { icon: 'cart', title: 'Pagamento sicuro', text: 'Il cliente sceglie le foto, inserisce l\'email e paga con carta. Nessuna registrazione.' },
    { icon: 'file', title: 'Download sicuro', text: 'Dopo il pagamento arriva un link firmato con scadenza, per scaricare in alta risoluzione.' },
    { icon: 'globe', title: 'Portfolio e link', text: 'Una pagina pubblica per ogni marchio, con social, contatti e il codice QR di ogni gallery.' },
    { icon: 'chart', title: 'Prezzi e ordini', text: 'Prezzo per foto con sconto oltre una soglia, o selezione gratuita. Guadagni nella dashboard.' },
    { icon: 'device', title: 'App iPhone nativa', text: 'Carichi, selezioni, sposti negli album e pubblichi dal telefono. In prova su TestFlight.' }
  ],

  demo: {
    kicker: 'Dal vero',
    title: 'Il sito e l\'app.',
    highlight: 'l\'app',
    lead: 'Schermate vere di Lumis, nell\'account dimostrativo di Righello. Le foto sono quelle promozionali del sito.',
    items: [
      {
        id: 'oggi',
        label: 'Oggi',
        group: 'App iPhone',
        media: app('app-oggi', 'La home dell\'app con l\'evento di oggi.'),
        note: 'Apri l\'app e riparti dall\'evento su cui lavoravi, con i numeri di foto, eventi e gallery pubblicate.'
      },
      {
        id: 'eventi',
        label: 'Eventi',
        group: 'App iPhone',
        media: app('app-eventi', 'L\'elenco degli eventi con copertina, stato e numero di foto.'),
        note: 'Tutti gli eventi, con copertina, stato e foto a colpo d\'occhio.'
      },
      {
        id: 'condividi',
        label: 'Condividi',
        group: 'App iPhone',
        media: app('app-condividi', 'Codice QR e link della gallery.'),
        note: 'Il codice QR e il link della gallery, pronti da mandare o da stampare.'
      },
      {
        id: 'marchio',
        label: 'Marchio',
        group: 'App iPhone',
        media: app('app-brand', 'Il profilo pubblico del marchio: nome, logo, colore, presentazione e contatti.'),
        note: 'Logo, colore e contatti: come ti vedono i clienti.'
      },
      {
        id: 'portfolio-app',
        label: 'Portfolio',
        group: 'App iPhone',
        media: app('app-portfolio', 'Il portfolio del fotografo nell\'app: le gallery attive.'),
        note: 'Il portfolio sempre sotto mano, con le gallery attive.'
      },
      {
        id: 'gallery',
        label: 'Gallery',
        group: 'Sito',
        media: web('web-gallery', '1600/1100', 'Una gallery pubblica con copertina, logo del fotografo e griglia di foto con filigrana.'),
        note: 'Come la vede il cliente: copertina, griglia ordinata, filigrana sulle anteprime.'
      },
      {
        id: 'portfolio',
        label: 'Pagina del marchio',
        group: 'Sito',
        media: web('web-portfolio', '1600/1000', 'La pagina pubblica di un marchio: logo, presentazione e link ai social.'),
        note: 'La pagina pubblica del marchio, con i contatti e le gallery attive.'
      }
    ]
  },

  tech: [
    {
      title: 'Anteprime pronte, nessun doppione',
      text: 'Compressione e filigrana si fanno sul dispositivo di chi carica, prima dell\'invio. Ogni file ha un\'impronta: lo stesso scatto non si carica due volte.',
      tags: ['Veloce', 'Meno traffico']
    },
    {
      title: 'Originali mai pubblici',
      text: 'L\'originale ha un percorso a parte e lo legge solo il proprietario dell\'evento. Chi compra riceve un link firmato che scade: senza firma valida non si scarica niente.',
      tags: ['Sicurezza', 'Link a scadenza']
    },
    {
      title: 'Incassi e posta affidabili',
      text: 'Pagamenti ed email di conferma sono affidati a servizi specializzati. L\'ordine si registra solo quando il pagamento è confermato.',
      tags: ['Pagamenti sicuri', 'Conferme automatiche']
    }
  ],

  cta: {
    title: 'Crea la tua prima gallery.',
    highlight: 'prima gallery',
    text: 'Il sito è online: crei il tuo spazio, carichi un evento e mandi il link.',
    primary: { label: 'Apri Lumis', href: 'https://lumis.wearerighello.com', external: true }
  }
} satisfies Landing;
