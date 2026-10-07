import type { Landing } from './types';

// Pagina volutamente breve: del lavoro per Elite Hotel & Spa non ci sono materiali pubblici verificati
// da mostrare (nessun sito nostro, nessun video pubblico collegato). Niente numeri, niente galleria,
// niente funzioni che ripetono il capitolo: si scrive solo cio' che e' verificabile.

export default {
  tagline: 'Foto e video per far scegliere un hotel con spa prima ancora di prenotare.',
  metrics: [],
  chapters: [
    {
      id: 'perche',
      kicker: 'Il perché',
      title: 'In un hotel si sceglie prima con gli occhi',
      highlight: 'con gli occhi',
      text:
        'Chi sceglie dove dormire guarda prima le immagini: camere, atmosfera, servizi, spa. Se non mostrano la qualità dell’esperienza, il resto conta poco. Il nostro lavoro è produrre foto e video che la raccontino bene, pensati per il profilo Instagram dell’hotel e per le campagne.',
      bullets: [
        'Servizio fotografico di camere, spazi e dettagli',
        'Video per il racconto dell’esperienza',
        'Materiali pronti da usare nella pubblicità'
      ],
      layout: 'full'
    }
  ],
  features: [],
  tech: [
    {
      title: 'Il montaggio si guarda prima di uscire',
      text: 'I video si guardano in streaming su una pagina riservata, da un archivio nostro: anche un video di oltre 100 MB parte subito, senza scaricarlo.',
      tags: ['Streaming', 'Pagina riservata']
    },
    {
      title: 'Più versioni numerate',
      text: 'Ogni video può avere più versioni, così il cliente dice cosa cambiare e si sa sempre quale è l’ultima.',
      tags: ['Versioni']
    },
    {
      title: 'Sul profilo del cliente',
      text: 'I contenuti sono pubblicati dal profilo Instagram dell’hotel e restano suoi.',
      tags: ['Instagram']
    }
  ],
  cta: {
    title: 'Guarda il profilo',
    highlight: 'profilo',
    text: 'Qui trovi i contenuti pubblicati dall’hotel.',
    primary: { label: 'Apri il profilo Instagram', href: 'https://www.instagram.com/elitehotelandspa/', external: true }
  }
} satisfies Landing;
