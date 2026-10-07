import type { Landing } from './types';

const base = '/progetti/landing/bibione-sand-storm';

export default {
  tagline: 'Il sito del mondiale su sabbia: statico, bilingue, senza tracciamenti, già in produzione.',

  metrics: [
    {
      value: 23,
      label: 'pagine pubbliche',
      note: 'voci della mappa del sito, contate il 6 ottobre 2026',
    },
    {
      value: 58,
      label: 'vecchi indirizzi rimandati alla pagina nuova',
      note: 'ogni vecchio indirizzo del sito precedente porta alla pagina giusta',
    },
    {
      value: 0,
      label: 'violazioni di accessibilità trovate',
      note: 'controllo automatico del 6 ottobre 2026 su 15 pagine, in 8 stati',
    },
  ],

  chapters: [
    {
      id: 'cambio-reversibile',
      kicker: 'Il passaggio',
      title: 'Cambiare sito a tre settimane dall\'evento, con il ritorno già pronto',
      highlight: 'il ritorno già pronto',
      text:
        'Il vecchio sito stava su un servizio esterno e il dominio era già in uso. Il nuovo è arrivato su www senza toccare il resto del dominio: per tornare indietro basta una sola operazione. I 58 vecchi indirizzi rimandano alle pagine nuove.',
      bullets: [
        'Online dal 30 settembre 2026 su www.bibionesandstorm.it.',
        'Anche l\'indirizzo senza www porta al sito nuovo.',
        'Ogni pagina è stata confrontata con la vecchia, testo per testo.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/home.webp`,
          alt: 'La pagina iniziale del sito con il titolo, la data e il conto alla rovescia',
          caption: 'La pagina iniziale: titolo, data, luogo e conto alla rovescia.',
          ratio: '16/10',
          frame: 'browser',
        },
        {
          type: 'image',
          src: `${base}/mobile-home.webp`,
          alt: 'La pagina iniziale su telefono',
          caption: 'Su telefono (390 pixel).',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'leggero',
      kicker: 'La leggerezza',
      title: 'Pagine statiche, animazioni dove servono',
      highlight: 'animazioni dove servono',
      text:
        'Il sito è fatto di pagine statiche, pronte e servite da una rete globale: nei giorni dell\'evento non c\'è un server da far reggere. Le animazioni hanno una rete di sicurezza: se non partono, la pagina è comunque completa.',
      bullets: [
        'Ogni animazione ha un controllo che la riporta in vista.',
        'Il video dell\'apertura parte durante il caricamento della pagina.',
        'Le foto sono controllate prima di ogni pubblicazione.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/programma.webp`,
          alt: 'La pagina del programma con la linea del tempo del venerdì',
          caption: 'Il programma: la linea si riempie mentre si scorre.',
          ratio: '16/10',
          frame: 'browser',
        },
        {
          type: 'image',
          src: `${base}/mobile-programma.webp`,
          alt: 'Il programma su telefono',
          caption: 'Il programma su telefono.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'informazioni-vere',
      kicker: 'La fiducia',
      title: 'Informativa e consensi scritti su quello che il sito fa davvero',
      highlight: 'quello che il sito fa davvero',
      text:
        'Il sito non ha moduli e non usa cookie di tracciamento, e l\'informativa lo dice: è scritta su quello che il sito fa, non copiata da un modello. Il banner ha Accetta e Rifiuta con lo stesso peso e mostra solo categorie vere.',
      bullets: [
        'La lingua scelta si ricorda solo se il visitatore acconsente.',
        'Le statistiche, se arriveranno, partiranno solo dopo il consenso.',
        'Nelle iscrizioni la quota scaduta è barrata, quella in vigore in evidenza.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/iscrizioni.webp`,
          alt: 'La pagina delle iscrizioni con le quote: quella scaduta è barrata',
          caption: 'Le iscrizioni: la quota scaduta è barrata, quella in vigore è in evidenza.',
          ratio: '16/10',
          frame: 'browser',
        },
      ],
      layout: 'media-right',
    },
  ],

  features: [
    {
      icon: 'globe',
      title: 'Italiano e inglese',
      text: 'Un tasto nella barra cambia lingua; la pagina di partenza è sempre in italiano.',
    },
    {
      icon: 'clock',
      title: 'Conto alla rovescia',
      text: 'Giorni, ore, minuti e secondi alla partenza del 23 ottobre 2026.',
    },
    {
      icon: 'calendar',
      title: 'Linea del tempo',
      text: 'Venerdì, sabato e domenica in una linea del tempo che si riempie con lo scorrimento.',
    },
    {
      icon: 'file',
      title: 'Iscrizioni per categoria',
      text: 'Una pagina per World Championship, Nazionale e Night Race, con quote e regolamenti da scaricare.',
    },
    {
      icon: 'link',
      title: 'Indirizzi vecchi salvi',
      text: 'Cinquantotto vecchi indirizzi rimandano alla pagina nuova.',
    },
    {
      icon: 'cart',
      title: 'Shop in prova',
      text: 'Pass e merchandising, con incasso diretto agli organizzatori: per ora in ambiente di test.',
    },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'Dal sito in produzione',
    highlight: 'in produzione',
    lead: 'Schermate del sito pubblico e dello shop in prova.',
    items: [
      {
        id: 'home',
        label: 'Home',
        media: {
          type: 'image',
          src: `${base}/home.webp`,
          alt: 'La pagina iniziale del sito',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'La pagina iniziale: date, luogo, ingresso libero e conto alla rovescia.',
      },
      {
        id: 'programma',
        label: 'Programma',
        media: {
          type: 'image',
          src: `${base}/programma.webp`,
          alt: 'Il programma del venerdì',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'Il programma del venerdì, con gli orari sulla linea del tempo.',
      },
      {
        id: 'iscrizioni',
        label: 'Iscrizioni',
        media: {
          type: 'image',
          src: `${base}/iscrizioni.webp`,
          alt: 'La pagina di iscrizione al World Championship',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'La pagina del World Championship: la quota scaduta è barrata, quella in vigore è in evidenza.',
      },
      {
        id: 'telefono',
        label: 'Programma su telefono',
        media: {
          type: 'image',
          src: `${base}/mobile-programma.webp`,
          alt: 'Il programma su telefono',
          ratio: '9/19.5',
          frame: 'phone',
        },
        note: 'Lo stesso programma su uno schermo di 390 pixel.',
      },
      {
        id: 'shop',
        label: 'Shop in prova',
        media: {
          type: 'image',
          src: `${base}/shop.webp`,
          alt: 'L\'intestazione dello shop con la fascia di ambiente di test',
          ratio: '1600/540',
          frame: 'browser',
        },
        note: 'L\'intestazione dello shop: finché gli organizzatori non collegano il proprio conto, nessun pagamento è reale.',
      },
    ],
  },

  tech: [
    {
      title: 'Pagine statiche, niente da far reggere',
      text:
        'Il sito è fatto di pagine già pronte, servite da una rete globale. Nessun programma lavora a ogni visita: per questo resta veloce anche nei giorni dell\'evento.',
      tags: ['Veloce', 'Infrastruttura globale'],
    },
    {
      title: 'Un cambio che si può disfare',
      text:
        'Il nuovo sito è arrivato senza modificare il dominio: si può tornare indietro in un attimo. Il vecchio sito resta consultabile in sola lettura, fuori dai motori di ricerca, per i confronti.',
      tags: ['Passaggio reversibile', 'Indirizzi vecchi salvi'],
    },
    {
      title: 'Shop con incasso diretto',
      text:
        'L\'organizzatore collega il suo conto con un pulsante e il pagamento va direttamente a lui, senza commissione per Righello. Ogni conferma conta una volta sola, e un rimborso aggiorna da solo l\'ordine.',
      tags: ['Pagamenti sicuri', 'Nessuna commissione'],
    },
  ],

  cta: {
    title: 'Un sito d\'evento fatto per restare acceso',
    highlight: 'restare acceso',
    text: 'Il sito della Bibione Sand Storm è online. Aprilo dal telefono.',
    primary: { label: 'Apri il sito', href: 'https://www.bibionesandstorm.it', external: true },
  },
} satisfies Landing;
