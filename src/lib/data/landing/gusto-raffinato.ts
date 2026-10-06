import type { Landing } from './types';

const A = '/progetti/landing/gusto-raffinato';

/*
 * Gusto Raffinato: l'app per chi esce a mangiare (iPhone, in prova su TestFlight).
 * Fatti verificati (06/10/2026) e sul sito pubblico gustoraffinato.com.
 * Le schermate sono del locale d'esempio "Trattoria Al Glicine", inventato.
 * Nessun prezzo, nessun cliente reale, niente sulle fonti dei dati del catalogo.
 */
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
      value: 4,
      label: 'gruppi di esigenze alimentari',
      note: 'allergie, intolleranze, come mangi, cose che non mangio'
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
        'Scegli il locale fra quelli della tua zona, vedi gli orari liberi e scrivi giorno, ora e persone. La richiesta arriva sull\'iPad del banco e la conferma il locale. Quando conferma, ti arriva un avviso e la prenotazione diventa un biglietto.',
      bullets: [
        'Filtri semplici: aperti ora, si prenota, entro un chilometro',
        'Si prenota solo dove il locale usa Gusto: niente conferme finte',
        'Fino alla conferma la richiesta resta «in attesa»',
        'Il biglietto va in calendario, ha le indicazioni e si condivide'
      ],
      media: [
        {
          type: 'image',
          src: `${A}/scopri.webp`,
          alt: 'L\'app dei clienti: i locali della città con i filtri aperti ora, si prenota ed entro un chilometro.',
          caption: 'Trovi il locale.',
          ratio: '400/867',
          frame: 'phone'
        },
        {
          type: 'image',
          src: `${A}/prenota.webp`,
          alt: 'Il foglio per prenotare un tavolo: persone, giorno e orario, e il tasto Invia la richiesta.',
          caption: 'Chiedi un tavolo.',
          ratio: '400/867',
          frame: 'phone'
        },
        {
          type: 'image',
          src: `${A}/biglietto.webp`,
          alt: 'Il biglietto della prenotazione confermata, con calendario, indicazioni e condividi.',
          caption: 'Ricevi il biglietto.',
          ratio: '400/867',
          frame: 'phone'
        }
      ],
      layout: 'full'
    },
    {
      id: 'timbri',
      kicker: 'Le tessere',
      title: 'Il timbro arriva da solo.',
      highlight: 'da solo',
      text:
        'Ogni locale ha la sua tessera, col suo colore e il suo premio. I timbri vengono dai consumi veri, quando il locale chiude il conto: niente cartoncino da ricordarsi. Chi non ha l\'app mette la tessera in Wallet, e si aggiorna a ogni timbro.',
      bullets: [
        'Un solo codice per tutte le tessere: lo mostri al cameriere',
        'In Wallet anche senza app, con un messaggio chiaro a ogni timbro',
        'Mentre sei seduto, sul blocco schermo vedi il tuo tavolo e quanti timbri vale il conto',
        'Il locale decide cosa si timbra: un caffè, un calice, una pizza'
      ],
      media: [
        {
          type: 'image',
          src: `${A}/tessera.webp`,
          alt: 'La tessera del caffè: sette timbri su dieci e la strada che porta al premio.',
          caption: 'Una strada di timbri fino al premio.',
          ratio: '400/867',
          frame: 'phone'
        },
        {
          type: 'image',
          src: `${A}/blocco-schermo.webp`,
          alt: 'Il blocco schermo dell\'iPhone con il tavolo del locale e i timbri che vale il conto.',
          caption: 'Il tavolo sul blocco schermo.',
          ratio: '302/657',
          frame: 'phone'
        }
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
        'Allergie (i 14 allergeni di legge), intolleranze, come mangi, cose che non mangio',
        'In ogni caso, sempre: «Dillo sempre al personale»',
        "Le esigenze restano sul tuo telefono (nell'account solo se lo accendi); le dai al locale solo se lo decidi, per quella prenotazione",
        'Se le dai, il locale le vede sul tavolo: sull\'iPad e sul palmare del cameriere'
      ],
      layout: 'full'
    }
  ],

  features: [
    {
      icon: 'map',
      title: 'Locali della zona',
      text: 'Il catalogo dei locali del Friuli Venezia Giulia, con mappa, filtri semplici e una scheda per ognuno.'
    },
    {
      icon: 'calendar',
      title: 'Orari liberi',
      text: 'Giorno, ora e persone in un foglio solo. Vedi subito a che ora c\'è posto.'
    },
    {
      icon: 'bell',
      title: 'Conferma con avviso',
      text: 'Il locale conferma dall\'iPad e a te arriva un avviso. La prenotazione diventa un biglietto.'
    },
    {
      icon: 'search',
      title: 'Menu letto per te',
      text: 'Ogni piatto è segnato adatto, adattabile o non adatto alle tue esigenze, col motivo.'
    },
    {
      icon: 'scan',
      title: 'Un codice, tutte le tessere',
      text: 'Lo mostri al cameriere e i timbri vanno alla tessera giusta del locale.',
      wide: true,
      media: {
        type: 'image',
        src: `${A}/tessera.webp`,
        alt: 'La tessera del caffè con sette timbri su dieci.',
        ratio: '400/867',
        frame: 'phone'
      }
    },
    {
      icon: 'device',
      title: 'Tessera in Wallet',
      text: 'Anche chi non ha l\'app la tiene in Wallet. Si aggiorna da sola a ogni timbro.'
    },
    {
      icon: 'clock',
      title: 'Il tavolo sul blocco schermo',
      text: 'Da seduto vedi il tuo tavolo e quanti timbri vale il conto, senza aprire l\'app.'
    },
    {
      icon: 'shield',
      title: 'I tuoi dati, le tue regole',
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
        media: {
          type: 'image',
          src: `${A}/scopri.webp`,
          alt: 'La schermata Scopri con i locali della città e i filtri.',
          ratio: '400/867',
          frame: 'phone'
        },
        note: 'I locali della zona: chi è aperto, chi prende prenotazioni, cosa si mangia.'
      },
      {
        id: 'prenota',
        label: 'Prenota',
        media: {
          type: 'image',
          src: `${A}/prenota.webp`,
          alt: 'Il foglio per prenotare un tavolo.',
          ratio: '400/867',
          frame: 'phone'
        },
        note: 'Persone, giorno e orario in un foglio solo. La richiesta arriva sull\'iPad del banco.'
      },
      {
        id: 'biglietto',
        label: 'Biglietto',
        media: {
          type: 'image',
          src: `${A}/biglietto.webp`,
          alt: 'Il biglietto di una prenotazione confermata.',
          ratio: '400/867',
          frame: 'phone'
        },
        note: 'Quando il locale conferma, la prenotazione diventa un biglietto da mettere in calendario.'
      },
      {
        id: 'tessera',
        label: 'Tessera',
        media: {
          type: 'image',
          src: `${A}/tessera.webp`,
          alt: 'La tessera di un locale con i timbri raccolti.',
          ratio: '400/867',
          frame: 'phone'
        },
        note: 'Ogni locale ha la sua tessera: sette timbri su dieci, ne mancano tre per l\'espresso.'
      },
      {
        id: 'blocco',
        label: 'Blocco schermo',
        media: {
          type: 'image',
          src: `${A}/blocco-schermo.webp`,
          alt: 'Il blocco schermo dell\'iPhone con il tavolo del locale.',
          ratio: '302/657',
          frame: 'phone'
        },
        note: 'Mentre sei seduto: il tuo tavolo e quanti timbri vale il conto.'
      }
    ]
  },

  tech: [
    {
      title: 'Un\'app sola, con il telefono dentro',
      text: 'La parte comune è scritta una volta; le cose che vogliono davvero l\'iPhone (Wallet, blocco schermo, notifiche, mappe) sono native.',
      tags: ['App nativa', 'Wallet', 'Blocco schermo']
    },
    {
      title: 'Niente promesse finte',
      text: 'Un locale è prenotabile solo se usa Gusto. La richiesta resta «in attesa di conferma» finché non risponde l\'iPad del banco, e lo storico mostra solo prenotazioni vere.',
      tags: ['Prenotazioni', 'Conferma dal locale']
    },
    {
      title: 'Il catalogo arriva a blocchi',
      text: 'La lista dei locali si carica a blocchi, con il successivo già pronto: lo scorrimento resta fluido anche con centinaia di locali.',
      tags: ['Veloce', 'Mappe Apple']
    },
    {
      title: 'Le esigenze restano al tuo telefono',
      text: 'Il profilo alimentare si salva sul telefono, dopo un consenso chiaro (nell\'account solo se lo accendi). Non serve all\'ordine né alla pubblicità, e si cancella quando vuoi.',
      tags: ['Consenso', 'Dati sul dispositivo']
    },
    {
      title: 'Accesso e cancellazione fatti bene',
      text: 'Si entra con Apple o Google, si guarda senza account, e l\'account si elimina dall\'app, con la revoca dell\'accesso Apple.',
      tags: ['Accesso con Apple o Google', 'Privacy']
    }
  ],

  cta: {
    title: 'Per i clienti, e per chi ha un locale.',
    highlight: 'chi ha un locale',
    text:
      'L\'app dei clienti è in prova su TestFlight, su invito. Se hai un locale e vuoi che i tuoi clienti prenotino e raccolgano i timbri, parliamone.',
    primary: { label: 'Vai a gustoraffinato.com', href: 'https://gustoraffinato.com', external: true }
  }
} satisfies Landing;
