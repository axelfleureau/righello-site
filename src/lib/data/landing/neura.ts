import type { Landing } from './types';

// Cosa e' Neura: Neura Education Srl e' una startup con un assistente di studio per ragazzi con difficolta'
// di apprendimento. Qui si racconta il NOSTRO lavoro (marchio, sito di presentazione, video), non l'assistente.
// Fatti ricavati dal sito in produzione e misurati il 6/10/2026. Esclusi di proposito i numeri e le
// "famiglie gia' con Neura" scritti sul sito, e le dichiarazioni dell'azienda su privacy e funzioni del
// prodotto (la pagina le riporta, noi non le garantiamo): non sono verificabili da noi.
const base = '/progetti/landing/neura';

export default {
  variant: 'caso',
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
        'La pagina non parte dalle funzioni ma da tre scene che un genitore riconosce: cinque strumenti che non si parlano, le 20:37 con nessuno a cui chiedere, l’idea che non sia pigrizia ma un modo diverso di studiare. Solo dopo spiega cosa fa il prodotto.',
      bullets: [
        'Tre scene numerate, una frase ciascuna',
        'Una sola idea per scena, nessun elenco di funzioni',
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
        'Scansiona, impara, progredisce: il metodo sta in tre schede. Più in basso la pagina mostra un solo piano, 14,99 euro al mese, con l’elenco di cosa comprende e «prossimamente» per ciò che non c’è ancora.',
      bullets: [
        'Un solo piano, nessuna tabella di confronto',
        'Cosa comprende e cosa è in arrivo, separati con onestà',
        'Prezzo e cosa comprende stanno nella stessa scheda'
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
      title: 'Le domande di un genitore, prima che le faccia',
      highlight: 'prima che le faccia',
      text:
        'I dati sono di ragazzi minorenni, quindi la pagina dedica una sezione alla privacy, in quattro schede brevi, e risponde alle domande che un genitore si pone prima di iniziare. Cosa dichiara l’azienda lo decide Neura: noi curiamo come si legge.',
      bullets: [
        'Quattro schede brevi, una riga per ciascuna',
        'Quattro domande frequenti, anche «sostituisce un tutor?»',
        'Le domande sono riprese anche nei dati strutturati'
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
    }
  ],
  features: [
    {
      icon: 'wand',
      title: 'Marchio e illustrazioni',
      text: 'Un marchio e quattro illustrazioni coerenti con il sito danno un tono accogliente.'
    },
    {
      icon: 'device',
      title: 'Adatto al telefono',
      text: 'Nessuno scorrimento laterale a 390 pixel; titoli e schede si riordinano in colonna.'
    },
    {
      icon: 'sparkle',
      title: 'Movimento spegnibile',
      text: 'Animazioni allo scorrimento, tolte quando il sistema chiede meno movimento.'
    },
    {
      icon: 'play',
      title: 'Video per social',
      text: 'Un video verticale di 43 secondi, montato a corredo del sito.'
    },
    {
      icon: 'message',
      title: 'Testi per famiglie',
      text: 'Parole semplici, scritte per chi decide l’acquisto e non per chi studia.'
    },
    {
      icon: 'search',
      title: 'Motori di ricerca',
      text: 'Titolo, descrizione, indirizzo canonico, anteprime social e tre blocchi di dati strutturati.'
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
        id: 'per-chi',
        label: 'Per chi',
        media: { type: 'image', src: `${base}/per-chi.webp`, alt: 'Tre schede che descrivono per chi è pensato il servizio', ratio: '4/1', frame: 'browser' },
        note: 'Tre schede per riconoscersi in due righe.'
      },
      {
        id: 'telefono',
        label: 'La sfida su telefono',
        media: { type: 'image', src: `${base}/mobile-sfida.webp`, alt: 'La sfida quotidiana su telefono', ratio: '9/19.5', frame: 'phone' },
        note: 'Le stesse scene in una colonna.'
      },
      {
        id: 'telefono-piano',
        label: 'Il piano su telefono',
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
      title: 'Movimento a scene, accessibile nelle basi',
      text: 'Le animazioni seguono lo scorrimento. Una sola intestazione principale, titoli in ordine, lingua dichiarata, testi alternativi su tutte le immagini.',
      tags: ['Animazioni', 'Accessibilità']
    },
    {
      title: 'Pubblicazione semplice',
      text: 'Il sito è statico e ha un dominio proprio: si apre subito e non ha niente da rompersi.',
      tags: ['Dominio proprio']
    }
  ],
  cta: {
    title: 'Guarda il sito',
    highlight: 'sito',
    text: 'È online. Scorrilo da telefono e da computer.',
    primary: { label: 'Apri neura.wearerighello.com', href: 'https://neura.wearerighello.com', external: true }
  }
} satisfies Landing;
