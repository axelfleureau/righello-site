import type { Landing } from './types';

const A = '/progetti/landing/lumis';

/*
 * Lumis: web app e app iPhone per fotografi di eventi (sito online, app in prova su TestFlight).
 * Fatti verificati (06/10/2026) e sul sito lumis.wearerighello.com.
 * Le foto che si vedono nelle schermate sono quelle promozionali del sito, nell'account dimostrativo "Righello Demo".
 * Niente prezzi, niente commissioni, niente "import live dalla fotocamera" (non ancora validato su dispositivo vero).
 */
export default {
  tagline: 'Dallo scatto alla vendita: gallery protette, consegna sicura, il tuo marchio.',

  metrics: [
    {
      value: 0,
      label: 'registrazioni per comprare',
      note: 'il cliente inserisce solo l\'email al pagamento; il link alla gallery basta'
    },
    {
      value: 4,
      label: 'intensità di filigrana',
      note: 'lieve, forte, molto forte, invadente: si sceglie per evento'
    },
    {
      value: 0,
      label: 'selfie inviati al server',
      note: 'la ricerca con selfie confronta una firma numerica ricavata sul dispositivo'
    },
    {
      text: 'Nativa',
      label: 'app per iPhone, senza pagine web dentro',
      note: 'è un\'app vera, non un sito incorniciato'
    }
  ],

  chapters: [
    {
      id: 'gallery',
      kicker: 'La gallery',
      title: 'Una gallery che sembra tua, non di un servizio qualunque.',
      highlight: 'sembra tua',
      text:
        'Un link generico a una cartella condivisa dice poco di chi ha scattato. Con Lumis ogni evento ha la sua gallery, ordinata in album, con il tuo logo, i tuoi colori e i tuoi contatti. Il cliente apre il link, sfoglia e sceglie. Niente account da creare.',
      bullets: [
        'Gallery ordinate in album, con stato: bozza, solo link o pubblica',
        'Il tuo profilo pubblico con logo, colore, presentazione e social',
        'Link e codice QR da condividere o da stampare',
        'Più marchi o studi nello stesso account'
      ],
      media: [
        {
          type: 'image',
          src: `${A}/web-gallery.webp`,
          alt: 'Una gallery pubblica di Lumis: copertina con il titolo dell\'evento, il logo del fotografo e la griglia delle foto con la filigrana, selezionabili.',
          caption: 'La gallery del cliente: griglia ordinata, filigrana, foto selezionabili.',
          ratio: '1600/1100',
          frame: 'browser'
        }
      ],
      layout: 'full'
    },
    {
      id: 'protezione',
      kicker: 'Protezione e consegna',
      title: 'Le anteprime si guardano. Gli originali si pagano.',
      highlight: 'Gli originali si pagano.',
      text:
        'Quando carichi le foto, ogni scatto diventa un\'anteprima leggera con la filigrana: è l\'unica cosa che il pubblico vede. L\'originale va in un archivio privato che apri solo tu. Chi compra paga con carta in modo sicuro e riceve un link firmato, con scadenza, per scaricare le foto in alta risoluzione.',
      bullets: [
        'Filigrana con il tuo logo e il testo, in quattro intensità, anche diversa da evento a evento',
        'Una foto già caricata non si ricarica due volte',
        'Conferma d\'ordine al cliente, avviso al fotografo a ogni acquisto',
        'Dal sito puoi rimandare il link di download a chi lo ha perso'
      ],
      media: [
        {
          type: 'image',
          src: `${A}/app-foto.webp`,
          alt: 'Le foto di un evento nell\'app per iPhone: selezione, cartelle e stato di pubblicazione.',
          caption: 'Le foto di un evento, dal telefono.',
          ratio: '700/1521',
          frame: 'phone'
        }
      ],
      layout: 'media-right'
    },
    {
      id: 'cercami',
      kicker: 'Cercami',
      title: 'Un selfie, e il cliente trova le sue foto.',
      highlight: 'trova le sue foto',
      text:
        'Dopo un evento con migliaia di scatti, trovarsi è la parte più lenta. Nelle gallery dove il fotografo ha elaborato i volti, chi cerca carica un selfie e vede solo le foto in cui compare. Il selfie non viene mai caricato: il telefono ne ricava una firma numerica e solo quella viene confrontata.',
      bullets: [
        'Il riconoscimento gira nel browser di chi cerca, non sul server',
        'Si attiva evento per evento: il fotografo sceglie quando elaborare i volti',
        'Si vedono solo gli scatti in cui compari, da selezionare e acquistare'
      ],
      layout: 'full'
    },
    {
      id: 'telefono',
      kicker: 'Il telefono come studio',
      title: 'Tutto il lavoro dell\'evento, in tasca.',
      highlight: 'in tasca',
      text:
        'L\'app per iPhone è nativa: dall\'evento di oggi alle foto, dal link da mandare al ritratto del tuo marchio. Carichi dal telefono, selezioni con una pressione lunga, sposti negli album e pubblichi. Vendite, ordini e incassi si guardano dal sito.',
      bullets: [
        'La home mostra l\'evento di oggi e dice se le gallery sono pronte',
        'Selezione a pressione lunga e trascinamento per spostare le foto',
        'Link e codice QR in un tocco, portfolio e marchio sempre sotto mano',
        'In prova su TestFlight'
      ],
      media: [
        {
          type: 'image',
          src: `${A}/app-oggi.webp`,
          alt: 'La home dell\'app Lumis: l\'evento di oggi con il pulsante per aprirlo e i numeri di foto, eventi e gallery pubblicate.',
          caption: 'L\'evento di oggi.',
          ratio: '700/1521',
          frame: 'phone'
        },
        {
          type: 'image',
          src: `${A}/app-condividi.webp`,
          alt: 'La pagina Condividi dell\'evento: codice QR e link della gallery da copiare o condividere.',
          caption: 'Link e QR in un tocco.',
          ratio: '700/1521',
          frame: 'phone'
        }
      ],
      layout: 'media-left'
    }
  ],

  features: [
    {
      icon: 'layers',
      title: 'Gallery in album',
      text: 'Ogni evento ha i suoi album e il suo stato: bozza, solo link o pubblica.',
      wide: true,
      media: {
        type: 'image',
        src: `${A}/web-gallery.webp`,
        alt: 'La gallery pubblica con la griglia delle foto.',
        ratio: '1600/1100',
        frame: 'browser'
      }
    },
    {
      icon: 'shield',
      title: 'Filigrana su misura',
      text: 'Logo e testo sulle anteprime, in quattro intensità. Il logo si sceglie per evento.'
    },
    {
      icon: 'lock',
      title: 'Originali al sicuro',
      text: 'Gli originali stanno in un archivio privato: li legge solo chi ha l\'evento.'
    },
    {
      icon: 'cart',
      title: 'Pagamento con carta sicuro',
      text: 'Il cliente sceglie le foto, inserisce l\'email e paga. Nessuna registrazione.'
    },
    {
      icon: 'file',
      title: 'Download in alta risoluzione',
      text: 'Dopo il pagamento arriva un link firmato con scadenza. Il fotografo riceve un avviso.'
    },
    {
      icon: 'globe',
      title: 'Portfolio e link',
      text: 'Una pagina pubblica per ogni marchio, con social e contatti, e il codice QR di ogni gallery.'
    },
    {
      icon: 'search',
      title: 'Cercami con selfie',
      text: 'Il cliente ritrova le sue foto in mezzo a migliaia. Il selfie resta sul suo dispositivo.'
    },
    {
      icon: 'chart',
      title: 'Prezzi e ordini',
      text: 'Prezzo per foto con sconto oltre una soglia, oppure selezione gratuita. Ordini per evento e guadagni nella dashboard.'
    }
  ],

  demo: {
    kicker: 'Dal vero',
    title: 'Il sito e l\'app.',
    highlight: 'l\'app',
    lead: 'Schermate vere di Lumis, nell\'account dimostrativo di Righello. Le foto sono quelle promozionali del sito.',
    items: [
      {
        id: 'gallery',
        label: 'Gallery',
        media: {
          type: 'image',
          src: `${A}/web-gallery.webp`,
          alt: 'Una gallery pubblica con copertina, logo del fotografo e griglia di foto con filigrana.',
          ratio: '1600/1100',
          frame: 'browser'
        },
        note: 'Come la vede il cliente: copertina, griglia ordinata, filigrana sulle anteprime.'
      },
      {
        id: 'portfolio',
        label: 'Portfolio',
        media: {
          type: 'image',
          src: `${A}/web-portfolio.webp`,
          alt: 'La pagina pubblica di un marchio: logo, presentazione e link ai social.',
          ratio: '1600/1000',
          frame: 'browser'
        },
        note: 'La pagina pubblica del marchio, con i contatti e le gallery attive.'
      },
      {
        id: 'oggi',
        label: 'Oggi',
        media: {
          type: 'image',
          src: `${A}/app-oggi.webp`,
          alt: 'La home dell\'app con l\'evento di oggi.',
          ratio: '700/1521',
          frame: 'phone'
        },
        note: 'Apri l\'app e riparti dall\'evento su cui lavoravi.'
      },
      {
        id: 'eventi',
        label: 'Eventi',
        media: {
          type: 'image',
          src: `${A}/app-eventi.webp`,
          alt: 'L\'elenco degli eventi con copertina, stato e numero di foto.',
          ratio: '700/1521',
          frame: 'phone'
        },
        note: 'Tutti gli eventi, con copertina, stato e foto a colpo d\'occhio.'
      },
      {
        id: 'foto',
        label: 'Foto',
        media: {
          type: 'image',
          src: `${A}/app-foto.webp`,
          alt: 'Le foto di un evento con selezione e cartelle.',
          ratio: '700/1521',
          frame: 'phone'
        },
        note: 'Le foto di un evento: carichi, selezioni, sposti negli album.'
      },
      {
        id: 'condividi',
        label: 'Condividi',
        media: {
          type: 'image',
          src: `${A}/app-condividi.webp`,
          alt: 'Codice QR e link della gallery.',
          ratio: '700/1521',
          frame: 'phone'
        },
        note: 'Il codice QR e il link della gallery, pronti da mandare o da stampare.'
      },
      {
        id: 'marchio',
        label: 'Marchio',
        media: {
          type: 'image',
          src: `${A}/app-brand.webp`,
          alt: 'Il profilo pubblico del marchio: nome, logo, colore, presentazione e contatti.',
          ratio: '700/1521',
          frame: 'phone'
        },
        note: 'Logo, colore e contatti: come ti vedono i clienti.'
      }
    ]
  },

  tech: [
    {
      title: 'Veloce ovunque, non su un solo server',
      text: 'Le anteprime vengono servite vicino a chi guarda e restano pronte, così una gallery da migliaia di foto non si siede e si apre subito anche da telefono.',
      tags: ['Infrastruttura globale', 'Veloce']
    },
    {
      title: 'Le anteprime le prepara chi carica',
      text: 'Compressione e filigrana si fanno sul dispositivo del fotografo (browser o app) prima dell\'invio. Ogni file ha un\'impronta: lo stesso scatto non viene caricato due volte.',
      tags: ['Meno traffico', 'Nessun doppione']
    },
    {
      title: 'Originali mai pubblici',
      text: 'L\'originale ha un percorso a parte e lo legge solo il proprietario dell\'evento. Chi compra riceve un link firmato che scade: senza una firma valida non si scarica niente.',
      tags: ['Sicurezza', 'Link a scadenza']
    },
    {
      title: 'Un selfie che non parte',
      text: 'Il riconoscimento gira nel browser di chi cerca: dal selfie esce solo una firma numerica. Il confronto con le foto procede a blocchi, per reggere anche eventi molto grandi.',
      tags: ['Privacy', 'Sul tuo dispositivo']
    },
    {
      title: 'App nativa, non una pagina in una cornice',
      text: 'L\'app per iPhone è fatta apposta per iPhone e parla con gli stessi dati del sito. Nessuna pagina web dentro l\'app.',
      tags: ['App nativa', 'Dati sempre allineati']
    },
    {
      title: 'Incassi e posta affidabili',
      text: 'I pagamenti e le email di conferma e di avviso sono affidati a servizi specializzati. L\'ordine si registra solo quando il pagamento è confermato.',
      tags: ['Pagamenti sicuri', 'Conferme automatiche']
    }
  ],

  cta: {
    title: 'Crea la tua prima gallery.',
    highlight: 'prima gallery',
    text:
      'Il sito è online: crei il tuo spazio, carichi un evento e mandi il link. Si può cominciare senza abbonamento. L\'app per iPhone è in prova su TestFlight.',
    primary: { label: 'Apri Lumis', href: 'https://lumis.wearerighello.com', external: true }
  }
} satisfies Landing;
