import type { Landing } from './types';

// Cosa e' Neura: Neura Education Srl e' una startup con un assistente di studio per ragazzi con difficolta'
// di apprendimento. Qui si racconta il NOSTRO lavoro (marchio, sito di presentazione, video), non l'assistente.
// Fatti ricavati dal sito in produzione e misurati il 6/10/2026. Esclusi di proposito i numeri e le
// "famiglie gia' con Neura" scritti sul sito: non sono verificabili.
const base = '/progetti/landing/neura';

export default {
  tagline: 'Una pagina che spiega a una famiglia, con calma, perché serve un aiuto allo studio.',
  metrics: [
    {
      text: '0,7 s',
      label: 'per mostrare il contenuto principale',
      note: 'misurato il 6/10/2026: 0,74 s su computer, 0,54 s su telefono emulato'
    },
    {
      value: 11,
      label: 'richieste per aprire la pagina',
      note: 'script, stile e immagini al primo caricamento, misurate il 6/10/2026'
    },
    {
      value: 3,
      label: 'blocchi di dati strutturati per i motori di ricerca',
      note: 'nella pagina: applicazione, organizzazione, domande frequenti'
    }
  ],
  chapters: [
    {
      id: 'problema',
      kicker: 'Il racconto',
      title: 'Prima il problema di una sera qualsiasi',
      highlight: 'di una sera qualsiasi',
      text:
        'La pagina non parte dalle funzioni. Parte da tre scene che un genitore riconosce: cinque strumenti che non si parlano, le 20:37 con nessuno a cui chiedere, e l’idea che non sia pigrizia ma un modo diverso di studiare. Solo dopo spiega cosa fa il prodotto.',
      bullets: [
        'Tre scene numerate, una frase ciascuna',
        'Linguaggio di tutti i giorni, rivolto al genitore',
        'Illustrazioni al posto delle foto di ragazzi'
      ],
      media: [
        {
          type: 'image',
          src: `${base}/sfida.webp`,
          alt: 'La sezione La sfida quotidiana del sito Neura con le tre scene numerate',
          caption: 'La sfida quotidiana: tre scene prima di parlare del prodotto.',
          ratio: '1200/940',
          frame: 'browser'
        }
      ],
      layout: 'media-right'
    },
    {
      id: 'metodo',
      kicker: 'Il metodo',
      title: 'Tre mosse e un prezzo scritto chiaro',
      highlight: 'un prezzo scritto chiaro',
      text:
        'Scansiona, impara, progredisce: il metodo sta in tre schede. Più in basso c’è un solo piano, 14,99 euro al mese, annullabile quando si vuole, con l’elenco di cosa comprende e con scritto «prossimamente» per ciò che non c’è ancora.',
      bullets: [
        'Un solo piano, nessuna tabella di confronto',
        'Cosa comprende e cosa è in arrivo, separati con onestà',
        'Quattro domande frequenti, anche «sostituisce un tutor?»'
      ],
      media: [
        {
          type: 'image',
          src: `${base}/metodo.webp`,
          alt: 'La sezione Come funziona Neura con le tre schede Scansiona, Impara, Progredisce',
          ratio: '1200/720',
          frame: 'browser'
        },
        {
          type: 'image',
          src: `${base}/piano.webp`,
          alt: 'Il piano Famiglia a 14,99 euro al mese con l’elenco di ciò che comprende',
          ratio: '640/670',
          frame: 'browser'
        }
      ],
      layout: 'media-left'
    },
    {
      id: 'fiducia',
      kicker: 'La fiducia',
      title: 'La privacy dei minori, detta per intero',
      highlight: 'detta per intero',
      text:
        'I dati sono di ragazzi minorenni, quindi la pagina dedica una sezione alla privacy: protezione rafforzata sotto i 18 anni, dati ridotti al necessario, controllo della famiglia, connessioni cifrate. Sotto, le risposte alle domande che un genitore fa prima di iniziare.',
      bullets: [
        'Quattro garanzie in quattro schede brevi',
        'Le domande frequenti sono riprese anche nei dati strutturati',
        'Ogni garanzia è spiegata in una riga'
      ],
      media: [
        {
          type: 'image',
          src: `${base}/privacy-faq.webp`,
          alt: 'La sezione Privacy e sicurezza e le domande frequenti del sito Neura',
          ratio: '1000/1260',
          frame: 'browser'
        }
      ],
      layout: 'media-right'
    },
    {
      id: 'tono',
      kicker: 'Il tono',
      title: 'Un marchio caldo e un po’ di movimento',
      highlight: 'caldo',
      text:
        'Marchio, illustrazioni e colori danno al sito un tono accogliente. La pagina si muove con lo scorrimento, ma rispetta la richiesta di ridurre i movimenti del sistema. Per i social abbiamo montato anche un video verticale di 43 secondi.',
      bullets: [
        'Quattro illustrazioni e un marchio coerenti con il sito',
        'Movimento morbido allo scorrimento',
        'Con «riduci movimento» attivo, le transizioni si spengono'
      ],
      media: [
        {
          type: 'image',
          src: `${base}/home.webp`,
          alt: 'La parte alta del sito Neura: titolo, illustrazione e pulsante di avvio',
          caption: 'La pagina iniziale del sito.',
          ratio: '2/1',
          frame: 'browser'
        }
      ],
      layout: 'full'
    }
  ],
  features: [
    {
      icon: 'message',
      title: 'Parte dal genitore',
      text: 'Tre scene riconoscibili prima di ogni funzione: il testo è scritto per chi compra, non per chi studia.'
    },
    {
      icon: 'layers',
      title: 'Metodo in tre schede',
      text: 'Scansiona, impara, progredisce: la sequenza sta in tre schede affiancate.'
    },
    {
      icon: 'cart',
      title: 'Un solo piano',
      text: '14,99 euro al mese, annullabile in qualsiasi momento, con le funzioni elencate.'
    },
    {
      icon: 'lock',
      title: 'Sezione privacy',
      text: 'Quattro garanzie sui dati dei minori, in schede brevi e leggibili.'
    },
    {
      icon: 'search',
      title: 'Pronto per i motori di ricerca',
      text: 'Titolo, descrizione, indirizzo canonico, tag Open Graph e tre blocchi di dati strutturati.'
    },
    {
      icon: 'wand',
      title: 'Movimento che si può spegnere',
      text: 'Animazioni allo scorrimento, ridotte quando il sistema chiede meno movimento.'
    },
    {
      icon: 'device',
      title: 'Adatto al telefono',
      text: 'Nessuno scorrimento laterale a 390 pixel; titoli e schede si riordinano in colonna.'
    },
    {
      icon: 'play',
      title: 'Video per i social',
      text: 'Un video verticale di 43 secondi, a corredo del sito.'
    }
  ],
  demo: {
    kicker: 'Dal vivo',
    title: 'Il sito, sezione per sezione',
    highlight: 'sezione per sezione',
    lead: 'Catture vere del sito in produzione, su computer e su telefono.',
    items: [
      {
        id: 'home',
        label: 'Inizio',
        media: { type: 'image', src: `${base}/home.webp`, alt: 'Parte alta del sito Neura', ratio: '2/1', frame: 'browser' },
        note: 'Titolo, illustrazione e pulsante.'
      },
      {
        id: 'sfida',
        label: 'La sfida',
        media: { type: 'image', src: `${base}/sfida.webp`, alt: 'Le tre scene della sfida quotidiana', ratio: '1200/940', frame: 'browser' },
        note: 'Le tre scene che il genitore riconosce.'
      },
      {
        id: 'metodo',
        label: 'Il metodo',
        media: { type: 'image', src: `${base}/metodo.webp`, alt: 'Le tre schede del metodo', ratio: '1200/720', frame: 'browser' },
        note: 'Scansiona, impara, progredisce.'
      },
      {
        id: 'funzioni',
        label: 'Funzioni',
        media: { type: 'image', src: `${base}/funzioni.webp`, alt: 'La griglia delle funzioni con le illustrazioni di ogni scheda', ratio: '1060/1490', frame: 'browser' },
        note: 'Ogni funzione ha una piccola animazione.'
      },
      {
        id: 'piano',
        label: 'Il piano',
        media: { type: 'image', src: `${base}/piano.webp`, alt: 'Il piano Famiglia a 14,99 euro al mese', ratio: '640/670', frame: 'browser' },
        note: 'Un solo piano, con ciò che comprende.'
      },
      {
        id: 'telefono',
        label: 'Su telefono',
        media: { type: 'image', src: `${base}/mobile-sfida.webp`, alt: 'La sfida quotidiana su telefono', ratio: '9/19.5', frame: 'phone' },
        note: 'Le stesse scene in una colonna.'
      },
      {
        id: 'telefono-piano',
        label: 'Piano su telefono',
        media: { type: 'image', src: `${base}/mobile-piano.webp`, alt: 'Il piano su telefono', ratio: '9/19.5', frame: 'phone' },
        note: 'Il prezzo resta leggibile senza ingrandire.'
      }
    ]
  },
  tech: [
    {
      title: 'Una pagina sola, leggera da aprire',
      text: 'Il sito è una pagina unica: 11 richieste al primo caricamento, e il resto sono le illustrazioni. Si apre in meno di un secondo.',
      tags: ['Veloce', 'Leggero']
    },
    {
      title: 'Movimento a scene',
      text: 'Le animazioni seguono lo scorrimento. Sono tolte quando il sistema chiede meno movimento.',
      tags: ['Animazioni', 'Accessibilità']
    },
    {
      title: 'Dati per i motori di ricerca',
      text: 'Tre blocchi di dati strutturati (applicazione, organizzazione, domande frequenti), indirizzo canonico e anteprime per i social.',
      tags: ['Dati strutturati', 'Anteprime social']
    },
    {
      title: 'Pubblicazione semplice',
      text: 'Il sito è statico, con un dominio proprio e certificato HTTPS: si apre subito e non ha niente da rompersi.',
      tags: ['Dominio proprio', 'HTTPS']
    },
    {
      title: 'Accessibile nelle basi',
      text: 'Una sola intestazione principale, titoli in ordine, lingua dichiarata, tutte le immagini con testo alternativo.',
      tags: ['Accessibilità', 'Testi alternativi']
    }
  ],
  cta: {
    title: 'Guarda il sito',
    highlight: 'sito',
    text: 'È online. Scorrilo da telefono e da computer.',
    primary: { label: 'Apri neura.wearerighello.com', href: 'https://neura.wearerighello.com', external: true }
  }
} satisfies Landing;
