import type { Landing } from './types';

// Landing volutamente breve: del lavoro per Elite Hotel & Spa non ci sono materiali pubblici verificati
// da mostrare (nessun sito nostro, nessun video pubblico collegato). Si scrive solo cio' che e' verificabile.

export default {
  tagline: 'Foto e video per far scegliere un hotel con spa prima ancora di prenotare.',
  metrics: [
    { text: 'Foto e video', label: 'cosa produciamo per la struttura', note: 'dalla scheda del lavoro' },
    { text: 'Instagram', label: 'dove escono i contenuti', note: 'profilo pubblico dell’hotel' },
    { text: 'Venezia', label: 'dove si trova la struttura', note: 'indicato nel profilo pubblico dell’hotel' }
  ],
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
    },
    {
      id: 'come',
      kicker: 'Il come',
      title: 'Il montaggio si guarda prima di uscire',
      highlight: 'prima di uscire',
      text:
        'I video non si consegnano come file da scaricare: si guardano in streaming su una pagina riservata e possono avere più versioni prima di essere pubblicati. Il cliente può vedere il lavoro e dire cosa cambiare prima della pubblicazione.',
      bullets: [
        'Streaming del montaggio, senza scaricare file molto grandi',
        'Più versioni numerate dello stesso video',
        'Pubblicazione sul profilo del cliente'
      ],
      layout: 'full'
    }
  ],
  features: [
    { icon: 'camera', title: 'Servizio fotografico', text: 'Camere, atmosfera e servizi della struttura.' },
    { icon: 'play', title: 'Video', text: 'Montaggi per raccontare l’esperienza di un soggiorno.' },
    { icon: 'layers', title: 'Materiali per le campagne', text: 'Immagini e video pronti per la pubblicità.' },
    { icon: 'message', title: 'Revisione con il cliente', text: 'Il montaggio si guarda su una pagina riservata prima di uscire.' },
    { icon: 'clock', title: 'Più versioni', text: 'Un montaggio può avere più versioni numerate.' },
    { icon: 'globe', title: 'Sul profilo dell’hotel', text: 'I contenuti escono su Instagram, nel profilo del cliente.' }
  ],
  tech: [
    {
      title: 'Revisione in streaming',
      text: 'I montaggi si guardano in streaming da un archivio nostro: anche un video di oltre 100 MB parte subito, senza scaricarlo.',
      tags: ['Streaming', 'Pagina riservata']
    },
    {
      title: 'Versioni',
      text: 'Ogni video ha le sue versioni numerate, così si sa sempre quale è l’ultima.',
      tags: ['Versioni']
    },
    {
      title: 'Profilo del cliente',
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
