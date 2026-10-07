import type { Landing } from './types';

const A = '/progetti/landing/gusto-raffinato';

/*
 * Gusto Raffinato: l'app per chi esce a mangiare (iPhone, in prova su TestFlight).
 * Fatti verificati (06/10/2026) e sul sito pubblico gustoraffinato.com.
 * Le schermate sono del locale d'esempio "Trattoria Al Glicine", inventato.
 * Nessun prezzo, nessun cliente reale, niente sulle fonti dei dati del catalogo.
 */
const phone = (file: string, alt: string, caption?: string, ratio = '400/867') => ({
  type: 'image' as const,
  src: `${A}/${file}.webp`,
  alt,
  caption,
  ratio,
  frame: 'phone' as const
});

export default {
  tagline: 'Trova il locale, chiedi un tavolo, raccogli i timbri: tutto in un\'app.',

  metrics: [
    {
      value: 0,
      label: 'account per guardare i locali',
      note: 'catalogo, menu e mappa si sfogliano senza registrarsi'
    },
    {
      value: 14,
      label: 'allergeni riconosciuti',
      note: 'i 14 dell\'allegato II del regolamento UE'
    },
    {
      text: 'Wallet',
      label: 'tessera anche senza app',
      note: 'si aggiunge dal codice mostrato al banco e si aggiorna a ogni timbro'
    }
  ],

  chapters: [
    {
      id: 'tavolo',
      kicker: 'Dal locale al tavolo',
      title: 'Un foglio solo per chiedere un tavolo.',
      highlight: 'chiedere un tavolo',
      text:
        'Scegli il locale della tua zona, vedi gli orari liberi e scrivi giorno, ora e persone. La richiesta arriva sull\'iPad del banco e la conferma il locale. Quando conferma, ti arriva un avviso e la prenotazione diventa un biglietto.',
      bullets: [
        'Filtri semplici: aperti ora, si prenota, entro un chilometro',
        'Si prenota solo dove il locale usa Gusto',
        'Il biglietto va in calendario e si condivide'
      ],
      media: [
        phone('scopri', 'L\'app dei clienti: i locali della città con i filtri aperti ora, si prenota ed entro un chilometro.', 'Trovi il locale.'),
        phone('prenota', 'Il foglio per prenotare un tavolo: persone, giorno e orario, e il tasto Invia la richiesta.', 'Chiedi un tavolo.'),
        phone('biglietto', 'Il biglietto della prenotazione confermata, con calendario, indicazioni e condividi.', 'Ricevi il biglietto.')
      ],
      layout: 'full'
    },
    {
      id: 'timbri',
      kicker: 'Le tessere',
      title: 'Il timbro arriva da solo.',
      highlight: 'da solo',
      text:
        'Ogni locale ha la sua tessera, col suo colore e il suo premio. I timbri vengono dai consumi veri, quando il locale chiude il conto. Chi non ha l\'app mette la tessera in Wallet, e si aggiorna a ogni timbro.',
      bullets: [
        'Un solo codice per tutte le tessere',
        'Sul blocco schermo il tuo tavolo e i timbri del conto',
        'Il locale decide cosa si timbra: un caffè, un calice'
      ],
      media: [
        phone('tessera', 'La tessera del caffè: sette timbri su dieci e la strada che porta al premio.', 'Una strada di timbri fino al premio.'),
        phone('blocco-schermo', 'Il blocco schermo dell\'iPhone con il tavolo del locale e i timbri che vale il conto.', 'Il tavolo sul blocco schermo.', '302/657')
      ],
      layout: 'media-right'
    },
    {
      id: 'esigenze',
      kicker: 'Le tue esigenze',
      title: 'Dillo una volta. Il menu legge il resto.',
      highlight: 'Il menu legge il resto.',
      text:
        'Scrivi nel profilo cosa non puoi o non vuoi mangiare. L\'app legge il menu dei locali e segna ogni piatto: adatto, adattabile o non adatto, con il motivo. Dove il locale non ha confermato gli ingredienti, non dà nessun verdetto e lo dice.',
      bullets: [
        'Allergie, intolleranze, come mangi, cose che non mangio',
        'Restano sul tuo telefono; le dai al locale solo se vuoi',
        'In ogni caso, sempre: «Dillo al personale»'
      ],
      layout: 'full'
    }
  ],

  features: [
    {
      icon: 'map',
      title: 'Locali della zona',
      text: 'Il catalogo dei locali del Friuli Venezia Giulia, con mappa e una scheda per ognuno.'
    },
    {
      icon: 'calendar',
      title: 'Orari liberi',
      text: 'Giorno, ora e persone in un foglio solo. Vedi subito a che ora c\'è posto.'
    },
    {
      icon: 'bell',
      title: 'Conferma con avviso',
      text: 'Il locale conferma dall\'iPad e a te arriva un avviso. La richiesta resta «in attesa» fino ad allora.'
    },
    {
      icon: 'scan',
      title: 'Codice unico',
      text: 'Lo mostri al cameriere e i timbri vanno alla tessera giusta del locale.'
    },
    {
      icon: 'device',
      title: 'Tessera in Wallet',
      text: 'Anche chi non ha l\'app la tiene in Wallet. Si aggiorna da sola a ogni timbro.'
    },
    {
      icon: 'shield',
      title: 'Dati sotto controllo',
      text: 'Accesso con Apple o Google, consenso chiaro per le esigenze alimentari, account eliminabile dall\'app.'
    }
  ],

  demo: {
    kicker: 'Dal vero',
    title: 'Le schermate dell\'app.',
    highlight: 'dell\'app',
    lead: 'Sono le schermate vere dell\'app, con i dati di un locale d\'esempio inventato.',
    items: [
      {
        id: 'scopri',
        label: 'Scopri',
        media: phone('scopri', 'La schermata Scopri con i locali della città e i filtri.'),
        note: 'I locali della zona: chi è aperto, chi prende prenotazioni, cosa si mangia.'
      },
      {
        id: 'prenota',
        label: 'Prenota',
        media: phone('prenota', 'Il foglio per prenotare un tavolo.'),
        note: 'Persone, giorno e orario in un foglio solo. La richiesta arriva sull\'iPad del banco.'
      },
      {
        id: 'biglietto',
        label: 'Biglietto',
        media: phone('biglietto', 'Il biglietto di una prenotazione confermata.'),
        note: 'Quando il locale conferma, la prenotazione diventa un biglietto da mettere in calendario.'
      },
      {
        id: 'tessera',
        label: 'Tessera',
        media: phone('tessera', 'La tessera di un locale con i timbri raccolti.'),
        note: 'Ogni locale ha la sua tessera: sette timbri su dieci, ne mancano tre per l\'espresso.'
      },
      {
        id: 'blocco',
        label: 'Blocco schermo',
        media: phone('blocco-schermo', 'Il blocco schermo dell\'iPhone con il tavolo del locale.', undefined, '302/657'),
        note: 'Mentre sei seduto: il tuo tavolo e quanti timbri vale il conto.'
      }
    ]
  },

  tech: [
    {
      title: 'Un\'app sola, con il telefono dentro',
      text: 'La parte comune è scritta una volta; le cose che vogliono davvero l\'iPhone (Wallet, blocco schermo, notifiche, mappe) sono native. Il catalogo si carica a blocchi: scorre fluido.',
      tags: ['App nativa', 'Veloce']
    },
    {
      title: 'Niente promesse finte',
      text: 'Un locale è prenotabile solo se usa Gusto. Lo storico mostra solo prenotazioni vere, confermate dal locale.',
      tags: ['Prenotazioni', 'Conferma dal locale']
    },
    {
      title: 'Le esigenze restano al tuo telefono',
      text: 'Il profilo alimentare si salva sul telefono, dopo un consenso chiaro, e si cancella quando vuoi. Si guarda senza account; l\'account si elimina dall\'app.',
      tags: ['Consenso', 'Privacy']
    }
  ],

  cta: {
    title: 'Per i clienti, e per chi ha un locale.',
    highlight: 'chi ha un locale',
    text:
      'L\'app è in prova su TestFlight, su invito: se hai un locale e vuoi prenotazioni e timbri, parliamone.',
    primary: { label: 'Vai a gustoraffinato.com', href: 'https://gustoraffinato.com', external: true }
  }
} satisfies Landing;
