import type { Landing } from './types';

const base = '/progetti/landing/portopiccolo-apartments';

export default {
  tagline: 'Il sito che prenota da solo: prezzi, date e pagamento collegati al gestionale.',

  metrics: [
    {
      value: 34,
      label: 'appartamenti in catalogo',
      note: 'contati sul sito il 6 ottobre 2026',
    },
    {
      value: 4,
      label: 'lingue',
      note: 'italiano, inglese, tedesco, russo: il selettore del sito',
    },
    {
      value: 3,
      label: 'esiti di pagamento distinti',
      note: 'confermato, rifiutato, in attesa di conferma',
    },
  ],

  chapters: [
    {
      id: 'prezzo-vero',
      kicker: 'Il prezzo',
      title: 'Il prezzo che vedi è quello che puoi pagare',
      highlight: 'puoi pagare',
      text:
        'Il prezzo base non è la tariffa che l\'ospite trova davvero. Il sito legge il calendario del gestionale e mostra il costo del primo soggiorno prenotabile sul serio: stessi giorni liberi, stesso minimo di notti, stessa regola del selettore di date.',
      bullets: [
        'Un soggiorno vale solo se tutte le notti sono libere.',
        'Il prezzo è tutto incluso: alloggio, pulizie e tasse.',
        'Si calcola una volta e si tiene aggiornato.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/catalogo.webp`,
          alt: 'Il catalogo degli appartamenti con il prezzo «da» su ogni scheda',
          caption: 'Il catalogo: ogni scheda dice da quanto, per quante notti e cosa è compreso.',
          ratio: '16/10',
          frame: 'browser',
        },
        {
          type: 'image',
          src: `${base}/mobile-catalogo.webp`,
          alt: 'Il catalogo su telefono, con il prezzo sulle foto e sotto il nome',
          caption: 'Lo stesso catalogo su telefono.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-right',
    },
    {
      id: 'disponibilita',
      kicker: 'Le date',
      title: 'Date libere in tempo reale, non una vetrina',
      highlight: 'in tempo reale',
      text:
        'Calendario, preventivi e prenotazioni arrivano dal gestionale: il sito mostra lo stato del momento. Se le date scelte sono occupate lo dice e propone la richiesta di prenotazione. Se il gestionale è lento, dopo pochi secondi il sito ripiega sul catalogo.',
      bullets: [
        'Le notti occupate sono barrate; il minimo di notti è scritto prima.',
        'I neonati restano gratis e arrivano allo staff come nota.',
        'Si cerca per date e ospiti, filtrando per casa o animali.',
      ],
      media: [
        {
          type: 'image',
          src: `${base}/calendario.webp`,
          alt: 'Il calendario di disponibilità di un appartamento, con i giorni occupati barrati',
          caption: 'Il calendario di una scheda: i giorni già occupati sono barrati.',
          ratio: '16/9',
          frame: 'browser',
        },
        {
          type: 'image',
          src: `${base}/mobile-scheda.webp`,
          alt: 'Una scheda su telefono con il prezzo «da» calcolato dal calendario',
          caption: 'Su telefono: il prezzo «da» e la scelta delle date.',
          ratio: '9/19.5',
          frame: 'phone',
        },
      ],
      layout: 'media-left',
    },
    {
      id: 'pagamento',
      kicker: 'Il pagamento',
      title: 'Un pagamento non è fallito finché non lo è davvero',
      highlight: 'non lo è davvero',
      text:
        'I dati della carta restano nel circuito di pagamento: non passano dal nostro server. Dopo il pagamento il sito rilegge l\'esito più volte. Un rifiuto vero è definitivo. Se l\'esito non è chiaro, non annulla e non fa ripagare: tiene le date bloccate e avvisa lo staff.',
      bullets: [
        'Tre esiti, non due: confermato, rifiutato, in attesa.',
        'Un pagamento riuscito o in arrivo non viene mai annullato.',
        'La verifica a 3 passaggi parte quando la banca la chiede.',
      ],
      layout: 'full',
    },
  ],

  features: [
    {
      icon: 'link',
      title: 'Gestionale collegato',
      text: 'Calendari, preventivi e prenotazioni vengono dal gestionale, senza reinserire nulla.',
    },
    {
      icon: 'shield',
      title: 'Dati riservati protetti',
      text: 'I dati interni (proprietari, condizioni commerciali, codici di accesso) non escono mai verso il pubblico.',
    },
    {
      icon: 'cart',
      title: 'Extra in prenotazione',
      text: 'Parcheggio, colazione, spiaggia, culla e biancheria entrano come voci della prenotazione.',
    },
    {
      icon: 'globe',
      title: 'Quattro lingue',
      text: 'Descrizioni, regolamento e testi sul quartiere sono tradotti a mano, senza servizi esterni.',
    },
    {
      icon: 'users',
      title: 'Area ospite',
      text: 'Con codice e email l\'ospite ritrova la sua prenotazione.',
    },
    {
      icon: 'map',
      title: 'Pagine trovabili',
      text: 'Ogni pagina ha il suo indirizzo canonico e la mappa del sito è sempre aggiornata.',
    },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'Dal sito vero',
    highlight: 'sito vero',
    lead: 'Schermate del sito pubblico e della nuova versione in collaudo, senza dati di ospiti o di prenotazioni.',
    items: [
      {
        id: 'home',
        label: 'Home',
        media: {
          type: 'image',
          src: `${base}/home.webp`,
          alt: 'La pagina iniziale con la ricerca per date e ospiti',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'La pagina iniziale: da qui si cerca per date, tipo di casa e numero di ospiti.',
      },
      {
        id: 'tedesco',
        label: 'In tedesco',
        media: {
          type: 'image',
          src: `${base}/scheda-de.webp`,
          alt: 'Una scheda con il selettore di lingua su tedesco',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'La stessa scheda col selettore su DE: prezzo, pulsanti e testi cambiano lingua.',
      },
      {
        id: 'nuova-home',
        label: 'Nuova versione',
        media: {
          type: 'image',
          src: `${base}/v2-home.webp`,
          alt: 'La nuova versione del sito, in collaudo: la pagina iniziale',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'In collaudo su un indirizzo non pubblico: il movimento segue un sistema solo e, se non parte, la pagina è comunque completa.',
      },
      {
        id: 'mappa',
        label: 'Con mappa',
        media: {
          type: 'image',
          src: `${base}/v2-mappa.webp`,
          alt: 'La nuova versione del catalogo, con la mappa e i prezzi sui punti',
          ratio: '16/10',
          frame: 'browser',
        },
        note: 'Sempre dalla nuova versione: la mappa con i prezzi sui punti. Il suo pagamento in due passi è in prova e non incassa.',
      },
    ],
  },

  tech: [
    {
      title: 'Collegato al gestionale, protetto',
      text:
        'Le chiamate al gestionale passano da un unico punto protetto: le credenziali non arrivano mai al browser. Il sito resta veloce perché le pagine pesanti sono già pronte.',
      tags: ['Veloce', 'Sicurezza'],
    },
    {
      title: 'Aggiornato senza interrogare tutto',
      text:
        'Catalogo e prezzo «da» restano pronti per un po\' e si rinnovano da soli: il gestionale non è interrogato a ogni visita. Prenotazioni e registri stanno in un archivio sicuro.',
      tags: ['Dati sempre allineati'],
    },
    {
      title: 'Dati riservati che non escono',
      text:
        'Prima di uscire, ogni scheda pubblica perde i dati interni e le voci di prezzo che il sito non mostra. Vale per ogni strada che porta fuori una scheda.',
      tags: ['Sicurezza', 'Privacy'],
    },
  ],

  cta: {
    title: 'Un sito collegato al gestionale',
    highlight: 'collegato al gestionale',
    text: 'Portopiccolo Apartments è online. Guardalo da vicino.',
    primary: { label: 'Apri il sito', href: 'https://www.portopiccoloapartments.com', external: true },
  },
} satisfies Landing;
