import type { Landing } from './types';

// Fatti ricavati dal sito in produzione (fiumepolosanitario.it) e misurati il 6/10/2026.
// Nessuna foto di persone, nessun dato di pazienti: solo interfaccia pubblica.
const base = '/progetti/landing/fiumedica';

export default {
  tagline: 'Un sito che porta il paziente al passo giusto: prenotare, ritirare il referto, chiamare.',
  metrics: [
    {
      value: 26,
      label: 'aree mediche, una pagina ciascuna',
      note: 'pagine nella voce Area Medica del menu del sito'
    },
    {
      value: 45,
      label: 'pagine collegate dalla home',
      note: 'tutte rispondono correttamente (controllo del 6/10/2026)'
    },
    {
      text: '0,5 s',
      label: 'per mostrare il contenuto principale',
      note: 'misurato sulla home il 6/10/2026: 0,50 s su computer, 0,45 s su telefono emulato'
    }
  ],
  chapters: [
    {
      id: 'percorso',
      kicker: 'Il percorso',
      title: 'Tante specialità, un solo passo successivo',
      highlight: 'un solo passo successivo',
      text:
        'Un poliambulatorio ha molte aree mediche, esami, due sedi e orari diversi. Chi cerca una visita non deve capire come è organizzato. Il sito parte da quello che il paziente vuole fare e gli tiene sempre davanti due pulsanti: prenotare e consultare i referti.',
      bullets: [
        'Menu in cinque voci, dall’Area Medica ai Contatti.',
        'Una pagina per ogni area, con le prestazioni elencate.',
        'Un solo percorso per prenotare, uno per i referti.'
      ],
      media: [
        {
          type: 'image',
          src: `${base}/home-presentazione.webp`,
          alt: 'Il testo di presentazione della home e una ripresa aerea di Fiume Veneto con il segnaposto della sede',
          caption: 'La presentazione in home: poche parole e la sede sulla mappa vista dall’alto.',
          ratio: '1280/380',
          frame: 'browser'
        }
      ],
      layout: 'full'
    },
    {
      id: 'prenotare',
      kicker: 'Prenotare e referti',
      title: 'Prenotare e ritirare il referto senza telefonare',
      highlight: 'senza telefonare',
      text:
        'Prenota ORA porta al portale delle prenotazioni: si prenota, si disdice e si guardano le disponibilità, con accesso o registrazione. Referti Online ha due ingressi, radiologia e prelievi. Chi preferisce il telefono trova il numero in ogni schermata.',
      bullets: [
        'Avviso chiaro per chi prenota per un’altra persona.',
        'Modulo di richiesta visita con consenso privacy obbligatorio.',
        'I referti radiologici stanno su un portale a parte.'
      ],
      media: [
        {
          type: 'image',
          src: `${base}/portale-prenotazioni.webp`,
          alt: 'La pagina Portale Prenotazioni con i pulsanti Prenota un appuntamento, Accedi e Registrati',
          caption: 'Il portale delle prenotazioni, raggiunto da Prenota ORA.',
          ratio: '1220/1050',
          frame: 'browser'
        },
        {
          type: 'image',
          src: `${base}/referti-online.webp`,
          alt: 'La pagina Referti Online con i due ingressi: referti radiologici e referti prelievi',
          caption: 'Referti Online: due ingressi, uno per tipo di esame.',
          ratio: '1220/720',
          frame: 'browser'
        }
      ],
      layout: 'media-right'
    },
    {
      id: 'telefono',
      kicker: 'Da telefono',
      title: 'Si legge bene anche con una mano sola',
      highlight: 'con una mano sola',
      text:
        'Prenotazione, referti e richiesta di visita si adattano a 390 pixel di larghezza senza scorrimento laterale. Le schermate qui accanto sono catture vere del sito.',
      bullets: [
        'Nessuno scorrimento orizzontale a 390 pixel, verificato sulle pagine principali.',
        'Menu a tendina sostituito da un pulsante.',
        'Campi del modulo a tutta larghezza, testi che vanno a capo.'
      ],
      media: [
        {
          type: 'image',
          src: `${base}/mobile-prenotazioni.webp`,
          alt: 'Il portale prenotazioni su telefono',
          ratio: '9/19.5',
          frame: 'phone'
        },
        {
          type: 'image',
          src: `${base}/mobile-referti.webp`,
          alt: 'La pagina referti online su telefono',
          ratio: '9/19.5',
          frame: 'phone'
        }
      ],
      layout: 'media-left'
    }
  ],
  features: [
    {
      icon: 'layers',
      title: 'Pagina per area',
      text: 'Ventisei aree mediche, più diagnostica, sport, prelievi e servizi infermieristici.'
    },
    {
      icon: 'map',
      title: 'Due sedi',
      text: 'Fiumedica e Fiumove, con una pagina dedicata allo sport e alla riabilitazione.'
    },
    {
      icon: 'clock',
      title: 'Orari in vista',
      text: 'Orari di apertura in fondo a ogni pagina; il Punto Prelievi ha i suoi giorni.'
    },
    {
      icon: 'message',
      title: 'Richiesta di visita',
      text: 'Modulo con consenso alla privacy obbligatorio e controllo antispam.'
    },
    {
      icon: 'search',
      title: 'Esami spiegati',
      text: 'Ogni area dice cosa si fa; una pagina spiega come prepararsi agli esami di laboratorio.'
    },
    {
      icon: 'shield',
      title: 'Dati di legge',
      text: 'Autorizzazione sanitaria, direzione sanitaria, PEC e copertura assicurativa in fondo alla pagina.'
    }
  ],
  demo: {
    kicker: 'Dal vivo',
    title: 'Le pagine come le vede il paziente',
    highlight: 'come le vede il paziente',
    lead: 'Catture vere del sito in produzione, senza foto di persone né dati di pazienti.',
    items: [
      {
        id: 'telefono-richiesta',
        label: 'Richiesta su telefono',
        media: {
          type: 'image',
          src: `${base}/mobile-richiesta.webp`,
          alt: 'Modulo di richiesta visita su telefono',
          ratio: '9/19.5',
          frame: 'phone'
        },
        note: 'Il modulo di richiesta, campi a tutta larghezza.'
      },
      {
        id: 'prenotazioni',
        label: 'Prenotazioni',
        media: {
          type: 'image',
          src: `${base}/portale-prenotazioni.webp`,
          alt: 'Portale Prenotazioni con Prenota un appuntamento, Accedi e Registrati',
          ratio: '1220/1050',
          frame: 'browser'
        },
        note: 'Tre azioni chiare e un avviso per chi prenota per altri.'
      },
      {
        id: 'sport',
        label: 'Medicina dello sport',
        media: {
          type: 'image',
          src: `${base}/medicina-sport-servizi.webp`,
          alt: 'Elenco dei servizi per l’atleta',
          ratio: '1240/1080',
          frame: 'browser'
        },
        note: 'Cosa comprende la visita per attività non agonistica e agonistica.'
      },
      {
        id: 'orari',
        label: 'Orari',
        media: {
          type: 'image',
          src: `${base}/orari-footer.webp`,
          alt: 'Orari di apertura nel piè di pagina',
          ratio: '1/1',
          frame: 'browser'
        },
        note: 'Gli orari chiudono ogni pagina del sito.'
      }
    ]
  },
  tech: [
    {
      title: 'Pagine pronte, poco da caricare',
      text: 'Le pagine sono servite già pronte da una rete globale e quasi tutte le immagini si caricano solo quando servono: la home mostra il contenuto principale in mezzo secondo.',
      tags: ['Veloce', '0,5 s']
    },
    {
      title: 'Prenotazione collegata al gestionale',
      text: 'Il portale delle prenotazioni è quello del gestionale della struttura: il sito vi rimanda con un pulsante, in ogni pagina.',
      tags: ['Portale prenotazioni', 'Gestionale collegato']
    },
    {
      title: 'Referti su un portale a parte',
      text: 'I referti radiologici stanno su un portale separato, con accesso riservato: non si consultano nelle pagine pubbliche del sito.',
      tags: ['Accesso riservato', 'Privacy']
    }
  ],
  cta: {
    title: 'Guarda il sito',
    highlight: 'sito',
    text: 'È online: provalo da telefono e da computer, dalla prenotazione ai referti.',
    primary: { label: 'Apri fiumepolosanitario.it', href: 'https://www.fiumepolosanitario.it', external: true }
  }
} satisfies Landing;
