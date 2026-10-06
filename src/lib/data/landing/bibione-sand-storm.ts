import type { Landing } from './types';

const base = '/progetti/landing/bibione-sand-storm';

export default {
  tagline: 'Il sito del mondiale su sabbia: statico, bilingue, senza tracciamenti, già in produzione.',

  metrics: [
    {
      value: 23,
      label: 'indirizzi nella mappa del sito',
      note: 'voci del sitemap.xml pubblico, contate il 6 ottobre 2026',
    },
    {
      value: 58,
      label: 'vecchi indirizzi rimandati con un 301',
      note: 'righe di public/_redirects: ogni vecchio indirizzo WordPress porta alla pagina nuova',
    },
    {
      value: 2,
      label: 'lingue',
      note: 'italiano e inglese, con un tasto nella barra',
    },
    {
      value: 0,
      label: 'violazioni di accessibilità trovate',
      note: 'controllo automatico axe-core del 6 ottobre 2026 su 15 pagine, in 8 stati',
    },
  ],

  chapters: [
    {
      id: 'cambio-reversibile',
      kicker: 'Il problema',
      title: 'Cambiare sito a tre settimane dall\'evento, con il ritorno già pronto',
      highlight: 'il ritorno già pronto',
      text:
        'Il vecchio sito era un WordPress su un hosting esterno e il dominio era già in uso. Il nuovo sito è arrivato su www con una rotta di Cloudflare, senza toccare il DNS: per tornare indietro basta togliere una riga e rifare il deploy. I 58 vecchi indirizzi rimandano con un 301 alle pagine nuove, così Google non perde quello che aveva indicizzato.',
      bullets: [
        'Online dal 30 settembre 2026 su www.bibionesandstorm.it.',
        'Il dominio senza www passa da un secondo Worker che fa solo il rimando.',
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
        'Il sito è esportato come pagine statiche e servito da Cloudflare: nei giorni dell\'evento non c\'è un server da far reggere. Le animazioni a scorrimento usano GSAP, con una rete di sicurezza: se lo script non parte, la pagina è comunque completa. Il video dell\'apertura sta già nell\'HTML e parte durante il caricamento, non dopo che React ha finito di prepararsi.',
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
        'Il riquadro delle quote è lo stesso componente su tutte le pagine d\'iscrizione.',
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
        'Accanto al sito c\'è uno shop in ambiente di prova: un solo Worker con database D1 e pagamenti Stripe Connect. L\'incasso arriva direttamente sul conto degli organizzatori e Righello non trattiene commissioni. Non accetta ancora pagamenti veri: si accendono quando gli organizzatori collegano il proprio conto Stripe.',
      bullets: [
        'Una fascia «ambiente di test» resta sempre visibile.',
        'Il webhook di pagamento verifica la firma ed è idempotente: una consegna ripetuta non scala due volte le scorte.',
        'Un rimborso fatto da Stripe aggiorna da solo lo stato dell\'ordine.',
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
      text: 'Un tasto nella barra cambia lingua; l\'HTML di partenza è sempre italiano.',
    },
    {
      icon: 'play',
      title: 'Video che parte subito',
      text: 'Il video dell\'apertura è nell\'HTML e parte durante il caricamento della pagina.',
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
      text: 'Cinquantotto vecchi indirizzi rimandano con un 301 alla pagina nuova.',
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
        note: 'L\'intestazione dello shop: finché gli organizzatori non collegano Stripe, nessun pagamento è reale.',
      },
    ],
  },

  tech: [
    {
      title: 'Next.js esportato statico',
      text:
        'Il sito è un export statico di Next.js, servito dagli asset di un Worker Cloudflare. Nessun codice gira sul server a ogni visita.',
      tags: ['Next.js', 'React', 'Tailwind', 'GSAP', 'Cloudflare Workers'],
    },
    {
      title: 'Un cambio che si può disfare',
      text:
        'www arriva al Worker con una rotta, senza cambiare il DNS. Il vecchio WordPress resta consultabile in sola lettura, fuori da Google, per i confronti.',
      tags: ['Rotte Cloudflare', 'Redirect 301', 'Worker'],
    },
    {
      title: 'Immagini con un controllo prima del deploy',
      text:
        'Le foto sono su Cloudinary tramite un caricatore su misura. Prima di ogni pubblicazione uno script verifica che ogni foto citata dal sito esista davvero.',
      tags: ['Cloudinary', 'next/image'],
    },
    {
      title: 'Intestazioni e cache',
      text:
        'I file con l\'impronta nel nome restano in cache un anno. Ci sono le intestazioni di sicurezza di base, e la copia di validazione è tenuta fuori dai motori di ricerca.',
      tags: ['Cache-Control', 'Permissions-Policy', 'noindex'],
    },
    {
      title: 'Due lingue nello stesso file',
      text:
        'Ogni testo ha la versione italiana e inglese accanto, nello stesso punto del codice: una modifica non lascia indietro una lingua senza che il tipo lo segnali.',
      tags: ['TypeScript', 'i18n a mano'],
    },
    {
      title: 'Shop su Worker, D1 e Stripe Connect',
      text:
        'Un solo Worker serve l\'API e l\'app. L\'organizzatore collega il suo conto con un pulsante; il pagamento è un Direct charge senza commissione per Righello.',
      tags: ['Cloudflare D1', 'Stripe Connect', 'React', 'Vite'],
    },
  ],

  cta: {
    title: 'Un sito d\'evento fatto per restare acceso',
    highlight: 'restare acceso',
    text: 'Il sito della Bibione Sand Storm è online. Aprilo dal telefono.',
    primary: { label: 'Apri il sito', href: 'https://www.bibionesandstorm.it', external: true },
  },
} satisfies Landing;
