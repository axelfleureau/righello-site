import type { Landing } from './types';

const A = '/progetti/landing/gusto-raffinato-sala';

/*
 * Gusto Raffinato Sala: gestionale (iPad) e palmare (iPhone) per ristoranti.
 * Fatti verificati (06/10/2026) e sul sito pubblico gustoraffinato.com.
 * Le schermate sono del locale d'esempio "Trattoria Al Glicine", inventato.
 * Niente prezzi, niente clienti, niente dettagli di come e' costruito il motore.
 */
const ipad = (file: string, alt: string, caption?: string, ratio = '1000/698') => ({
  type: 'image' as const,
  src: `${A}/${file}.webp`,
  alt,
  caption,
  ratio,
  frame: 'tablet' as const
});

const phone = (file: string, alt: string, caption?: string, ratio = '400/867') => ({
  type: 'image' as const,
  src: `${A}/${file}.webp`,
  alt,
  caption,
  ratio,
  frame: 'phone' as const
});

export default {
  tagline: 'Tutta la sala su un iPad. E la comanda in tasca al cameriere.',

  metrics: [
    {
      value: 4,
      label: 'modi di guardare la sala',
      note: '3D, colori veri, pianta, tessere'
    },
    {
      value: 14,
      label: 'allergeni dell\'allegato II UE',
      note: 'l\'elenco da cui si sceglie l\'allergia di un tavolo'
    },
    {
      value: 8,
      label: 'sezioni nel gestionale',
      note: 'Sala, Ranghi, Agenda, Menu, Magazzino, Personale, Giornata, Fedeltà'
    },
    {
      value: 1398,
      label: 'prove automatiche',
      note: 'sull\'app e sul sistema della sala, controllate a ogni modifica'
    }
  ],

  chapters: [
    {
      id: 'sala',
      kicker: 'La sala',
      title: 'Una sala che si misura da sola.',
      highlight: 'si misura da sola',
      text:
        'Cammini lungo i muri con un iPhone Pro o un iPad Pro, quelli col sensore che misura gli spazi. L\'app trova muri, porte e tavoli. Alla fine la sala è sull\'iPad del banco: in 3D, con i colori veri, in pianta o a tessere.',
      bullets: [
        'Un minuto o due di cammino, con la guida passo per passo',
        'Sposti, giri, dividi un tavolo: ogni passo si annulla',
        'Misure su foglio A4 da mandare al falegname'
      ],
      media: [ipad('realistica', 'La vista Realistica sull\'iPad: una sala con il pavimento in legno e un muro, tre tavoli numerati e le lunghezze dei muri scritte a terra.', 'Dopo la scansione, la sala con i suoi colori.', '700/1002')],
      layout: 'media-right'
    },
    {
      id: 'serata',
      kicker: 'La serata',
      title: 'Ogni tavolo fa il suo giro. L\'iPad lo sa.',
      highlight: 'L\'iPad lo sa.',
      text:
        'Ogni tavolo ha il colore del suo momento: libero, al tavolo, da gestire, conto. L\'app lo segue dalle comande e dai tocchi di chi lavora, senza telecamere. Quando un passaggio dura troppo, sull\'iPad compare un avviso con i minuti.',
      bullets: [
        'Dalla seduta al tavolo di nuovo pronto, passo per passo',
        'Agenda a elenco e a griglia, con il ritmo degli arrivi',
        'Quello che segna un dispositivo lo vedono tutti, subito'
      ],
      media: [ipad('sala-3d', 'La sala in 3D sull\'iPad: i tavoli in una sala lunga, quelli da gestire in rosso con la portata che aspettano.', 'La sala in 3D: i tavoli da gestire si vedono subito.')],
      layout: 'media-left'
    },
    {
      id: 'palmare',
      kicker: 'Il palmare',
      title: 'Tre tocchi e la comanda è in cucina.',
      highlight: 'Tre tocchi',
      text:
        'Il palmare è il telefono del cameriere. Si toccano i piatti e la portata la capisce dal piatto. Allergie e note restano in evidenza riga per riga. Se cambi qualcosa, in cucina arriva la variazione e vedi quando l\'hanno vista.',
      bullets: [
        'Se la rete salta, le comande partono appena torna',
        'Il conto si divide in quattro modi',
        'Lo scontrino resta alla cassa: l\'app prepara il conto'
      ],
      media: [
        phone('palmare-piatti', 'Il menu sul palmare per un tavolo: i piatti con il prezzo e il tasto più.', '1. Tocchi i piatti.'),
        phone('palmare-comanda', 'La comanda di un tavolo: antipasti subito, primi al via, l\'allergia al glutine in evidenza e il tasto Invia comanda.', '2. Controlli e invii.'),
        phone('palmare-avvisi', 'Gli avvisi sul palmare: un\'allergia al tavolo, la cucina che ha visto la variazione, un altro giro.', '3. La cucina risponde.')
      ],
      layout: 'full'
    }
  ],

  features: [
    { icon: 'scan', title: 'Rileva la sala', text: 'Con l\'iPhone Pro o l\'iPad Pro la pianta si fa da sola. Senza sensore si disegna a mano.' },
    { icon: 'message', title: 'Di\' alla sala', text: 'Scrivi come lo diresti a un collega: l\'app propone il gesto e niente parte senza il tuo tocco.' },
    { icon: 'database', title: 'Magazzino e costi', text: 'Scorte, ricette e piatti esauriti. Costo e margine di ogni piatto si calcolano dalla ricetta.' },
    { icon: 'shield', title: 'Allergie in evidenza', text: 'L\'allergia detta al tavolo resta in testa alla scheda, scelta fra i 14 allergeni di legge.' },
    { icon: 'users', title: 'Accessi per ruolo', text: 'Il banco è il gestionale, i telefoni dei camerieri sono palmari. Si entra col PIN.' },
    { icon: 'file', title: 'Misure in A4', text: 'Metri quadri, pareti, porte e finestre in un PDF. Misure stimate, arrotondate a 5 cm.' }
  ],

  demo: {
    kicker: 'Dal vero',
    title: 'Le schermate dell\'app.',
    highlight: 'dell\'app',
    lead: 'Sono le schermate vere del gestionale e del palmare, con i dati di un locale d\'esempio inventato.',
    items: [
      {
        id: 'sala3d',
        label: 'Sala in 3D',
        media: ipad('sala-3d', 'La sala in 3D sull\'iPad: i tavoli colorati dal loro stato.'),
        note: 'La sala dall\'alto: in rosso i tavoli da gestire, con la portata che aspettano.'
      },
      {
        id: 'agenda',
        label: 'Agenda',
        media: ipad('agenda', 'L\'Agenda sull\'iPad con le prenotazioni della sera e la scheda di una prenotazione.'),
        note: 'Le prenotazioni della sera, il ritmo degli arrivi e il tasto per far sedere chi è arrivato.'
      },
      {
        id: 'menu',
        label: 'Menu',
        media: ipad('menu', 'Il Menu sull\'iPad: i piatti con il costo degli ingredienti in percentuale e la scheda di un piatto con prezzo e margine.'),
        note: 'Quanto costa e quanto rende ogni piatto, dalle ricette. Così sai cosa spingere.'
      },
      {
        id: 'giornata',
        label: 'Giornata',
        media: ipad('giornata', 'La Giornata sull\'iPad: incasso e coperti di ieri, i controlli di reparto e il messaggio per lo staff da approvare.'),
        note: 'Com\'è andata ieri e cosa fare oggi. Il messaggio per lo staff parte solo quando lo approvi.'
      },
      {
        id: 'fedelta',
        label: 'Fedeltà',
        media: ipad('fedelta', 'La sezione Fedeltà sull\'iPad: due tessere del locale e i suggerimenti per crearne altre.'),
        note: 'Le tessere del locale, ognuna col suo colore e il suo premio.'
      },
      {
        id: 'di-alla-sala',
        label: 'Di\' alla sala',
        media: ipad('di-alla-sala', 'La barra «Di\' alla sala» sull\'iPad: una frase scritta dal banco e le due azioni che l\'app propone, da confermare.'),
        note: 'Una frase scritta dal banco e le azioni che l\'app propone. La persona decide.'
      },
      {
        id: 'misure',
        label: 'Misure',
        media: {
          type: 'image',
          src: `${A}/misure.webp`,
          alt: 'Il foglio delle misure: una sala rettangolare con le lunghezze dei muri, due porte e tre finestre.',
          ratio: '2000/1110',
          frame: 'none'
        },
        note: 'Il foglio con le misure, come lo disegna un architetto. Da mandare al falegname.'
      },
      {
        id: 'comanda',
        label: 'Comanda',
        media: phone('palmare-comanda', 'La comanda sul palmare con l\'allergia al glutine in evidenza.'),
        note: 'La comanda di un tavolo divisa per portata, con l\'allergia in evidenza.'
      }
    ]
  },

  tech: [
    {
      title: 'Un solo programma, due mestieri',
      text: 'Gestionale e palmare sono lo stesso programma con due identità: cambiano permessi, nome e icona, non il resto. Il ruolo decide cosa si vede, non la grandezza dello schermo.',
      tags: ['Un solo punto di verità', 'Ruoli']
    },
    {
      title: 'Funziona anche se cade la rete',
      text: 'iPad e telefoni tengono da parte quello che fai e lo mandano al ritorno della linea. Ogni comanda è fatta di righe vere: così conto diviso e margini tornano.',
      tags: ['Funziona offline', 'Conto diviso']
    },
    {
      title: 'Il sensore fa la pianta',
      text: 'La scansione usa il sensore di profondità di iPhone Pro e iPad Pro. Le regole della sala sono controllate da 1.398 prove automatiche a ogni modifica.',
      tags: ['Sensore di profondità', 'Prove automatiche']
    }
  ],

  cta: {
    title: 'Parliamone, nel tuo locale.',
    highlight: 'nel tuo locale',
    text:
      'Lasciaci un contatto: ti richiamiamo, passiamo a vedere la sala e la mettiamo nel sistema insieme a te.',
    primary: { label: 'Vai a gustoraffinato.com', href: 'https://gustoraffinato.com', external: true }
  }
} satisfies Landing;
