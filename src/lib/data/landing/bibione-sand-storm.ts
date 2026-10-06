import type { Landing } from './types';

const base = '/progetti/landing/bibione-sand-storm';

export default {
  tagline: 'Il sito del mondiale su sabbia: statico, bilingue, senza tracciamenti, già in produzione.',

  metrics: [
    {
      value: 23,
      label: 'indirizzi nella mappa del sito',
      note: 'voci della mappa pubblica del sito, contate il 6 ottobre 2026',
    },
    {
      value: 58,
      label: 'vecchi indirizzi rimandati alla pagina nuova',
      note: 'ogni vecchio indirizzo del sito precedente porta alla pagina giusta',
    },
    {
      value: 2,
      label: 'lingue',
      note: 'italiano e inglese, con un tasto nella barra',
    },
    {
      value: 0,
      label: 'violazioni di accessibilità trovate',
      note: 'controllo automatico di accessibilità del 6 ottobre 2026 su 15 pagine, in 8 stati',
    },
  ],

  chapters: [
    {
      id: 'cambio-reversibile',
      kicker: 'Il problema',
      title: 'Cambiare sito a tre settimane dall\'evento, con il ritorno già pronto',
      highlight: 'il ritorno già pronto',
      text:
        'Il vecchio sito stava su un servizio esterno e il dominio era già in uso. Il nuovo sito è arrivato su www senza toccare il resto del dominio: per tornare indietro basta una sola operazione. I 58 vecchi indirizzi rimandano alle pagine nuove, così Google non perde quello che aveva indicizzato.',
      bullets: [
        'Online dal 30 settembre 2026 su www.bibionesandstorm.it.',
        'Anche l\'indirizzo senza www porta al sito nuovo.',
        'Prima del passaggio, ogni pagina è stata confrontata con la vecchia, testo per testo.',
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
      kicker: 'Il come',
      title: 'Pagine statiche, animazioni dove servono',
      highlight: 'animazioni dove servono',
      text:
        'Il sito è fatto di pagine statiche, pronte e servite da una rete globale: nei giorni dell\'evento non c\'è un server da far reggere. Le animazioni a scorrimento hanno una rete di sicurezza: se non partono, la pagina è comunque completa. Il video dell\'apertura parte durante il caricamento, non dopo che la pagina ha finito di prepararsi.',
      bullets: [
        'Ogni animazione che parte da invisibile ha un controllo che la riporta in vista: la pagina non resta mai bianca.',
        'Il video dell\'apertura è stato provato contando i fotogrammi disegnati, non il tempo del lettore.',
        'Le foto stanno su un archivio di immagini, con un controllo prima di ogni pubblicazione che nessuna manchi.',
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
      kicker: 'Fiducia',
      title: 'Informativa e consensi scritti su quello che il sito fa davvero',
      highlight: 'quello che il sito fa davvero',
      text:
        'Il sito non ha moduli e non usa cookie di tracciamento. L\'informativa sulla privacy lo dice, perché è scritta su quello che il sito fa, non copiata da un modello. Il banner ha Accetta e Rifiuta con lo stesso peso, e mostra solo categorie vere: i cookie necessari e la preferenza di lingua.',
      bullets: [
        'La lingua scelta si ricorda solo se il visitatore acconsente alle preferenze.',
        'Per aggiungere un giorno statistiche servirà una voce nel banner: lo script non si carica prima del consenso.',
        'Il riquadro delle quote è lo stesso su tutte le pagine d\'iscrizione.',
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
    {
      id: 'shop',
      kicker: 'In prova',
      title: 'Lo shop: pass e merchandising, incasso diretto agli organizzatori',
      highlight: 'incasso diretto agli organizzatori',
      text:
        'Accanto al sito c\'è uno shop in ambiente di prova, con pagamento con carta sicuro. L\'incasso arriva direttamente sul conto degli organizzatori e Righello non trattiene commissioni. Non accetta ancora pagamenti veri: si accendono quando gli organizzatori collegano il proprio conto di incasso.',
      bullets: [
        'Una fascia «ambiente di test» resta sempre visibile.',
        'Ogni conferma di pagamento è verificata e conta una volta sola: un avviso ripetuto non scala due volte le scorte.',
        'Un rimborso aggiorna da solo lo stato dell\'ordine.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/shop.webp`,
          alt: 'L\'intestazione dello shop, con la fascia «ambiente di test»',
          caption: 'Lo shop in prova: la fascia in alto dice che nessun pagamento è reale.',
          ratio: '1600/540',
          frame: 'browser',
        },
      ],
      layout: 'media-left',
    },
  ],

  features: [
    {
      icon: 'globe',
      title: 'Italiano e inglese',
      text: 'Un tasto nella barra cambia lingua; la pagina di partenza è sempre in italiano.',
    },
    {
      icon: 'play',
      title: 'Video che parte subito',
      text: 'Il video dell\'apertura parte durante il caricamento della pagina.',
    },
    {
      icon: 'clock',
      title: 'Conto alla rovescia',
      text: 'Giorni, ore, minuti e secondi alla partenza del 23 ottobre 2026.',
    },
    {
      icon: 'calendar',
      title: 'Programma a tre giorni',
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
      icon: 'lock',
      title: 'Consensi con scelta vera',
      text: 'Accetta e Rifiuta pesano uguale, e le categorie nel banner sono solo quelle reali.',
    },
    {
      icon: 'sparkle',
      title: 'Animazioni con rete',
      text: 'Se il movimento non parte, le pagine restano complete e leggibili.',
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
        label: 'Su telefono',
        media: {
          type: 'image',
          src: `${base}/mobile-home.webp`,
          alt: 'La pagina iniziale su telefono',
          ratio: '9/19.5',
          frame: 'phone',
        },
        note: 'La stessa pagina iniziale su uno schermo di 390 pixel.',
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
        'Il nuovo sito è arrivato senza modificare il dominio, quindi si può tornare indietro in un attimo. Il vecchio sito resta consultabile in sola lettura, fuori da Google, per i confronti.',
      tags: ['Passaggio reversibile', 'Indirizzi vecchi salvi'],
    },
    {
      title: 'Immagini con un controllo prima della pubblicazione',
      text:
        'Le foto sono servite da un archivio di immagini ottimizzate. Prima di ogni pubblicazione un controllo verifica che ogni foto citata dal sito esista davvero.',
      tags: ['Immagini ottimizzate', 'Controlli automatici'],
    },
    {
      title: 'Veloce e protetto',
      text:
        'I file che non cambiano restano pronti a lungo, ci sono le protezioni di base del browser, e la copia di validazione è tenuta fuori dai motori di ricerca.',
      tags: ['Sicurezza', 'Veloce'],
    },
    {
      title: 'Due lingue nello stesso punto',
      text:
        'Ogni testo ha la versione italiana e inglese accanto: una modifica non lascia indietro una lingua senza che qualcuno se ne accorga.',
      tags: ['Italiano', 'Inglese'],
    },
    {
      title: 'Shop con incasso diretto',
      text:
        'L\'organizzatore collega il suo conto con un pulsante e il pagamento va direttamente a lui, senza commissione per Righello.',
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
