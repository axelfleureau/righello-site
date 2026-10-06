import type { Landing } from './types';

const A = '/progetti/landing/gusto-raffinato-sala';

/*
 * Gusto Raffinato Sala: gestionale (iPad) e palmare (iPhone) per ristoranti.
 * Fatti verificati sul repository gusto_raffinato (main, 06/10/2026) e sul sito pubblico gustoraffinato.com.
 * Le schermate sono del locale d'esempio "Trattoria Al Glicine", inventato.
 * Niente prezzi, niente clienti, niente dettagli di come e' costruito il motore.
 */
export default {
  tagline: 'Tutta la sala su un iPad. E la comanda in tasca al cameriere.',

  metrics: [
    {
      value: 3,
      suffix: ' s',
      label: 'per rimettere in pari iPad e telefoni',
      note: 'intervallo di aggiornamento fra i dispositivi del locale, nel codice dell\'app'
    },
    {
      value: 14,
      label: 'allergeni dell\'allegato II UE',
      note: 'l\'elenco da cui si sceglie l\'allergia di un tavolo, nel codice dell\'app'
    },
    {
      value: 8,
      label: 'sezioni nel gestionale',
      note: 'Sala, Ranghi, Agenda, Menu, Magazzino, Personale, Giornata, Fedeltà'
    },
    {
      value: 1398,
      label: 'prove automatiche',
      note: 'nel repository: 944 sull\'app, 454 sul server della sala'
    }
  ],

  chapters: [
    {
      id: 'sala',
      kicker: 'La sala',
      title: 'Una sala che si misura da sola.',
      highlight: 'si misura da sola',
      text:
        'Cammini lungo i muri con un iPhone Pro o un iPad Pro, quelli col sensore che misura gli spazi. L\'app trova muri, porte e tavoli e ti dice cosa fare. Alla fine la sala è sull\'iPad del banco: la guardi in 3D, con i colori veri, in pianta o a tessere.',
      bullets: [
        'Un minuto o due di cammino, con la guida passo per passo',
        'Sposti, giri, dividi un tavolo lungo in tre, aggiungi quello che manca: ogni passo si annulla',
        'Le misure di muri, porte e finestre su un foglio A4 da mandare al falegname',
        'Senza sensore la sala si disegna a mano o si parte da un modello'
      ],
      media: [
        {
          type: 'image',
          src: `${A}/realistica.webp`,
          alt: 'La vista Realistica sull\'iPad: una sala con il pavimento in legno e un muro, tre tavoli numerati e le lunghezze dei muri scritte a terra.',
          caption: 'Dopo la scansione, la sala con i suoi colori. Le immagini restano sull\'iPad.',
          ratio: '700/1002',
          frame: 'tablet'
        },
        {
          type: 'image',
          src: `${A}/scansione-guida.webp`,
          alt: 'La guida della scansione sul telefono: il disegno della sala con il percorso lungo i muri e il consiglio di camminare piano.',
          caption: 'Il telefono guida la camminata.',
          ratio: '400/555',
          frame: 'phone'
        }
      ],
      layout: 'media-right'
    },
    {
      id: 'serata',
      kicker: 'La serata',
      title: 'Ogni tavolo fa il suo giro. L\'iPad lo sa.',
      highlight: 'L\'iPad lo sa.',
      text:
        'Ogni tavolo ha il colore del suo momento: libero, al tavolo, da gestire, conto. L\'app lo segue dalle comande e dai tocchi di chi lavora, senza telecamere. Quando un passaggio dura troppo, sull\'iPad diventa un avviso con i minuti scritti accanto.',
      bullets: [
        'Dalla seduta al tavolo di nuovo pronto, passo per passo',
        'L\'Agenda a elenco e a griglia, con il ritmo degli arrivi quarto d\'ora per quarto d\'ora',
        'Per chi non ha ancora un tavolo, l\'app ne propone uno: confermi tu',
        'Quello che segna un dispositivo lo vedono tutti, entro tre secondi'
      ],
      media: [
        {
          type: 'image',
          src: `${A}/sala-3d.webp`,
          alt: 'La sala in 3D sull\'iPad: i tavoli in una sala lunga, quelli da gestire in rosso con la portata che aspettano.',
          caption: 'La sala in 3D: i tavoli da gestire si vedono subito.',
          ratio: '1000/698',
          frame: 'tablet'
        },
        {
          type: 'image',
          src: `${A}/agenda.webp`,
          alt: 'L\'Agenda sull\'iPad: le prenotazioni della sera, il ritmo degli arrivi e la scheda di una prenotazione con il tasto per farla sedere.',
          caption: 'L\'Agenda: chi arriva e quando.',
          ratio: '1000/698',
          frame: 'tablet'
        }
      ],
      layout: 'media-left'
    },
    {
      id: 'palmare',
      kicker: 'Il palmare',
      title: 'Tre tocchi e la comanda è in cucina.',
      highlight: 'Tre tocchi',
      text:
        'Il palmare è il telefono del cameriere. Niente codici da imparare: si toccano i piatti e la portata la capisce dal piatto. Allergie e note restano in evidenza riga per riga. Se cambi qualcosa, in cucina arriva la variazione e tu vedi quando l\'hanno vista.',
      bullets: [
        'Antipasti subito, primi al via: lo decidi dal telefono',
        'Se la rete salta, il palmare continua a prendere le comande e le manda appena torna',
        'Il conto si divide in quattro modi: tutto insieme, in parti uguali, per voce, per posto',
        'Lo scontrino fiscale resta alla cassa del locale: l\'app prepara il conto riga per riga'
      ],
      media: [
        {
          type: 'image',
          src: `${A}/palmare-piatti.webp`,
          alt: 'Il menu sul palmare per un tavolo: i piatti con il prezzo e il tasto più.',
          caption: '1. Tocchi i piatti.',
          ratio: '400/867',
          frame: 'phone'
        },
        {
          type: 'image',
          src: `${A}/palmare-comanda.webp`,
          alt: 'La comanda di un tavolo: antipasti subito, primi al via, l\'allergia al glutine in evidenza e il tasto Invia comanda.',
          caption: '2. Controlli e invii.',
          ratio: '400/867',
          frame: 'phone'
        },
        {
          type: 'image',
          src: `${A}/palmare-avvisi.webp`,
          alt: 'Gli avvisi sul palmare: un\'allergia al tavolo, la cucina che ha visto la variazione, un altro giro.',
          caption: '3. La cucina risponde.',
          ratio: '400/867',
          frame: 'phone'
        }
      ],
      layout: 'full'
    },
    {
      id: 'intelligenza',
      kicker: 'L\'intelligenza',
      title: 'L\'AI sta dove entrano i dati, non davanti al cliente.',
      highlight: 'dove entrano i dati',
      text:
        'Al tavolo non c\'è tempo per aspettare un modello e la rete di un locale non è mai sicura. Per questo i suggerimenti al cameriere sono regole che girano sul telefono, anche senza linea. Dove serve davvero leggere (una bolla, una frase sul magazzino) l\'assistente propone le modifiche e le fai tu.',
      bullets: [
        '«Di\' alla sala»: scrivi come lo diresti a un collega, «conto al 4 e marcia i secondi al 4»',
        'L\'iPad mostra cosa ha capito e perché; niente parte senza il tuo tocco',
        'La scansione della bolla si fa sull\'iPad, anche senza rete',
        'Il messaggio per lo staff lo scrive l\'app, lo invii tu'
      ],
      media: [
        {
          type: 'image',
          src: `${A}/di-alla-sala.webp`,
          alt: 'La barra «Di\' alla sala» sull\'iPad: una frase scritta dal banco e le due azioni che l\'app propone, da confermare.',
          caption: 'La frase propone, la persona decide.',
          ratio: '1000/698',
          frame: 'tablet'
        }
      ],
      layout: 'media-right'
    }
  ],

  features: [
    {
      icon: 'layers',
      title: 'Sala in 3D',
      text: 'Ogni tavolo col colore del suo momento e il tempo scritto sopra. Anche una sala grande si legge a colpo d\'occhio.',
      wide: true,
      media: {
        type: 'image',
        src: `${A}/sala-3d.webp`,
        alt: 'La sala in 3D sull\'iPad con i tavoli colorati dal loro stato.',
        ratio: '1000/698',
        frame: 'tablet'
      }
    },
    {
      icon: 'scan',
      title: 'Rileva la sala',
      text: 'Cammini con l\'iPhone Pro o l\'iPad Pro e la pianta si fa da sola, con muri, porte e tavoli.'
    },
    {
      icon: 'file',
      title: 'Misure su foglio A4',
      text: 'Metri quadri, lunghezza di ogni parete, porte e finestre in un PDF da condividere. Sono stimate, arrotondate a 5 cm.'
    },
    {
      icon: 'calendar',
      title: 'Agenda e griglia',
      text: 'Le prenotazioni della sera a elenco o in griglia, con il tavolo proposto per chi non ce l\'ha.'
    },
    {
      icon: 'message',
      title: 'Di\' alla sala',
      text: 'Una barra in ogni sezione: scrivi cosa succede e l\'app lo trasforma in un gesto da confermare.'
    },
    {
      icon: 'database',
      title: 'Magazzino e costo dei piatti',
      text: 'Scorte, ricette e piatti esauriti. Il costo di ogni piatto e il margine si calcolano dalla ricetta.'
    },
    {
      icon: 'shield',
      title: 'Allergie in evidenza',
      text: 'L'allergia detta al tavolo resta in evidenza sulla riga del piatto e in testa alla scheda, scelta fra i 14 allergeni di legge.'
    },
    {
      icon: 'users',
      title: 'Ognuno vede il suo',
      text: 'Il banco è il gestionale, i telefoni dei camerieri sono palmari. Si entra col PIN e si vede solo ciò che serve.'
    }
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
        media: {
          type: 'image',
          src: `${A}/sala-3d.webp`,
          alt: 'La sala in 3D sull\'iPad: i tavoli colorati dal loro stato.',
          ratio: '1000/698',
          frame: 'tablet'
        },
        note: 'La sala dall\'alto: in rosso i tavoli da gestire, con la portata che aspettano.'
      },
      {
        id: 'agenda',
        label: 'Agenda',
        media: {
          type: 'image',
          src: `${A}/agenda.webp`,
          alt: 'L\'Agenda sull\'iPad con le prenotazioni della sera e la scheda di una prenotazione.',
          ratio: '1000/698',
          frame: 'tablet'
        },
        note: 'Le prenotazioni della sera, il ritmo degli arrivi e il tasto per far sedere chi è arrivato.'
      },
      {
        id: 'menu',
        label: 'Menu',
        media: {
          type: 'image',
          src: `${A}/menu.webp`,
          alt: 'Il Menu sull\'iPad: i piatti con il costo degli ingredienti in percentuale e la scheda di un piatto con prezzo e margine.',
          ratio: '1000/698',
          frame: 'tablet'
        },
        note: 'Quanto costa e quanto rende ogni piatto, dalle ricette. Così sai cosa spingere.'
      },
      {
        id: 'giornata',
        label: 'Giornata',
        media: {
          type: 'image',
          src: `${A}/giornata.webp`,
          alt: 'La Giornata sull\'iPad: incasso e coperti di ieri, i controlli di reparto e il messaggio per lo staff da approvare.',
          ratio: '1000/698',
          frame: 'tablet'
        },
        note: 'Com\'è andata ieri e cosa fare oggi. Il messaggio per lo staff parte solo quando lo approvi.'
      },
      {
        id: 'fedelta',
        label: 'Fedeltà',
        media: {
          type: 'image',
          src: `${A}/fedelta.webp`,
          alt: 'La sezione Fedeltà sull\'iPad: due tessere del locale e i suggerimenti per crearne altre.',
          ratio: '1000/698',
          frame: 'tablet'
        },
        note: 'Le tessere del locale, ognuna col suo colore e il suo premio.'
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
        media: {
          type: 'image',
          src: `${A}/palmare-comanda.webp`,
          alt: 'La comanda sul palmare con l\'allergia al glutine in evidenza.',
          ratio: '400/867',
          frame: 'phone'
        },
        note: 'La comanda di un tavolo divisa per portata, con l\'allergia in evidenza.'
      }
    ]
  },

  tech: [
    {
      title: 'Un solo codice, due mestieri',
      text: 'Gestionale e palmare sono lo stesso programma con due identità: cambiano permessi, nome e icona, non il codice. Si migliora una volta e migliorano entrambi.',
      tags: ['Flutter', 'Dart', 'Swift', 'iPad', 'iPhone']
    },
    {
      title: 'Il sensore fa la pianta',
      text: 'La scansione usa il sensore di profondità dell\'iPhone Pro e dell\'iPad Pro. Muri, porte e tavoli si riconoscono mentre cammini; poi sistemi tu quello che serve.',
      tags: ['ARKit', 'LiDAR', 'Core ML']
    },
    {
      title: 'Un muro fra il banco e la sala',
      text: 'Ogni dispositivo ha un ruolo scritto nel suo accesso. Incassi, menu, magazzino e personale sono del gestionale; il palmare vede tavoli, comande e conti. Lo decide il ruolo, non la grandezza dello schermo.',
      tags: ['Ruoli', 'PIN del responsabile', 'Accesso per dispositivo']
    },
    {
      title: 'Funziona anche se cade la rete',
      text: 'iPad e telefoni tengono da parte quello che fai e lo mandano al ritorno della linea. Le comande nuove arrivano in cucina appena possibile e il palmare lo scrive accanto alla riga.',
      tags: ['Coda locale', 'Sincronizzazione']
    },
    {
      title: 'Le comande sono righe, non testo',
      text: 'Ogni riga sa quale piatto è, quanto costava quando l\'hai presa e a quale posto va. È ciò che permette conto diviso, magazzino scalato e margine veri.',
      tags: ['Redux', 'TypeScript', 'Node.js']
    },
    {
      title: 'Provato prima di arrivare al banco',
      text: 'Le schermate e le regole della sala sono controllate da prove automatiche a ogni modifica: 1.398 in tutto, fra app e server.',
      tags: ['Prove automatiche', 'Golden test']
    }
  ],

  cta: {
    title: 'Parliamone, nel tuo locale.',
    highlight: 'nel tuo locale',
    text:
      'Lasciaci un contatto: ti richiamiamo, passiamo a vedere la sala e la mettiamo nel sistema insieme a te. L\'app è in prova su TestFlight, su invito.',
    primary: { label: 'Vai a gustoraffinato.com', href: 'https://gustoraffinato.com', external: true }
  }
} satisfies Landing;
