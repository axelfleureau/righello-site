/**
 * Le due pagine «software house» (Pordenone e Mestre), in un punto solo: testi, domande, prove e dati per i motori di ricerca.
 * La struttura e' quella delle pagine di agenzia (`ServicePage`, vedi `softwareHouseModel` in `components/servizi/models.ts`);
 * la mappa del sito, `llms.txt`, i dati strutturati e le immagini di condivisione leggono tutti da qui.
 *
 * Regola: solo fatti che il sito gia' dimostra. Ogni frase viene dalle schede dei progetti (`case-studies.ts`, `landing/*.ts`),
 * dai recapiti (`contact.ts`, `site.ts`) o dalle pagine dei servizi. Niente anni di esperienza, numeri di clienti, premi, recensioni,
 * partner, prezzi, tempi promessi, nomi di strumenti o di Comuni clienti, e nessun indirizzo a Pordenone.
 * `software-house.test.ts` controlla lunghezze, parole vietate e che ogni prova sia una scheda vera.
 */
import type { FaqItem, Heading, LocalBlock, MethodStep, ProofItem, ScopeItem } from '$lib/components/servizi/types';
import { CONTACT } from './contact';
import type { Faq } from './faqs/types';
import { COMPANY, softwareHouseLinks } from './site';

export type SoftwareHouseZone = (typeof softwareHouseLinks)[number]['zone'];

export interface SoftwareHousePage {
  zone: SoftwareHouseZone;
  path: string;
  /** Il nome della pagina: briciole, dati strutturati, `llms.txt`. */
  name: string;
  /** Luoghi di `AREAS_SERVED` che la pagina dichiara come zona servita. */
  areas: string[];
  /** Titolo (30-60 caratteri) e descrizione (70-160) per i motori di ricerca e le anteprime. */
  seo: { title: string; description: string };
  kicker: string;
  title: string;
  highlight?: string;
  /** La risposta in apertura (40-60 parole): e' quella che un motore di risposta legge come definizione della pagina. */
  lead: string;
  panel: string[];
  scope: Heading & { items: ScopeItem[] };
  scope2: Heading & { id: string; label: string; items: ScopeItem[] };
  note: { kicker: string; title: string; text: string; link: { href: string; label: string } };
  method: Heading & { steps: MethodStep[] };
  proofHead: Heading;
  /** Le schede che dimostrano la pagina: stesso elenco per la pagina, per l'ItemList dei dati strutturati e per `llms.txt`. */
  proof: Array<ProofItem & { note: string }>;
  local: LocalBlock;
  faqs: Faq[];
  closing: { kicker: string; title: string; highlight?: string; text: string };
  /** Il percorso dopo e prima: l'altra sede, e il servizio da cui si arriva. */
  flow: { next: { href: string; name: string; sub: string }; prev: { href: string; name: string } };
}

const link = (zone: SoftwareHouseZone) => softwareHouseLinks.find((l) => l.zone === zone)!;

/** Dopo la messa online: cio' che le pagine dei servizi gia' dicono (formazione, documentazione, piani mensili), in una sola risposta per entrambe le sedi. */
const MAINTENANCE =
  'Sì. Forniamo formazione e documentazione, e chi vuole può mantenere il software da solo. Proponiamo anche piani di manutenzione mensili con hosting gestito, copie di sicurezza, aggiornamenti di sicurezza, piccole modifiche e assistenza prioritaria. Correzioni e miglioramenti dopo la messa online si concordano insieme.';

const CALL =
  'La prima chiamata è gratuita; poi Righello prepara una proposta scritta con tempi e consegne chiari, prima di iniziare.';

export const softwareHousePages: SoftwareHousePage[] = [
  {
    zone: 'pordenone',
    path: link('pordenone').href,
    name: link('pordenone').label,
    areas: ['Pordenone', 'Friuli-Venezia Giulia'],
    seo: {
      title: 'Software house a Pordenone: software su misura | Righello',
      description:
        'Software house a Pordenone e in Friuli-Venezia Giulia: software su misura, gestionali, app per iPhone e iPad, piattaforme web e integrazioni.',
    },
    kicker: 'Pordenone e Friuli-Venezia Giulia',
    title: 'Software house a Pordenone',
    highlight: 'e Friuli-Venezia Giulia',
    lead: `Righello è una software house con sede legale a ${COMPANY.legalSeat} e base operativa a ${COMPANY.city}. Costruisce software su misura, gestionali, app per iPhone e iPad, piattaforme web e integrazioni, con funzioni di AI dove servono. Ha prodotti propri: BUFFR è su App Store, Óptima e Tetha sono online. Lavora con aziende, studi ed enti del Friuli-Venezia Giulia e del Veneto.`,
    panel: [
      'Prodotti nostri, che teniamo in piedi ogni giorno: BUFFR è su App Store, Óptima e Tetha sono online.',
      'Ogni scheda dice lo stato vero del lavoro: online, in prova o in uso interno.',
      'Un solo team dal progetto alla messa online, con un solo referente.',
      'Per il software su misura il codice e il progetto grafico sono del cliente.',
    ],
    scope: {
      kicker: 'Cosa costruiamo',
      title: 'Software su misura, dalla richiesta alla messa online.',
      highlight: 'dalla richiesta alla messa online',
      items: [
        {
          icon: 'database',
          title: 'Software su misura e gestionali',
          text: 'Programmi per il lavoro di ogni giorno di un’azienda o di uno studio: clienti, scadenze, documenti, ore e preventivi. Óptima è per agenzie e studi, Tetha per le imprese edili.',
          href: '/progetti/optima',
        },
        {
          icon: 'device',
          title: 'App per iPhone e iPad',
          text: 'App per chi lavora sul campo o in sala. BUFFR è su App Store; Gusto Raffinato Sala porta la sala di un ristorante su iPad ed è in prova.',
          href: '/buffr',
        },
        {
          icon: 'globe',
          title: 'Piattaforme web',
          text: 'Sistemi sul web usati da molte persone: DICO porta le comunicazioni dei Comuni su WhatsApp e Telegram, Lumis gestisce gallery e vendita delle foto degli eventi.',
          href: '/progetti/dico',
        },
        {
          icon: 'link',
          title: 'Integrazioni',
          text: 'Siti e app collegati ai sistemi che l’azienda già usa. Il sito di Portopiccolo Apartments prenota da solo, collegato al calendario del gestionale; Tetha riceve i documenti anche da Telegram.',
          href: '/progetti/portopiccolo-apartments',
        },
        {
          icon: 'gear',
          title: 'Automazioni',
          text: 'Compiti ripetitivi che girano da soli: Tetha avvisa trenta giorni prima di ogni scadenza e prepara in un clic il dossier del cantiere; DICO fa partire le uscite programmate.',
          href: '/progetti/tetha',
        },
        {
          icon: 'sparkle',
          title: 'Funzioni di intelligenza artificiale',
          text: 'Assistenti che rispondono dai dati del cliente e chiedono conferma prima di scrivere, dentro Óptima, Tetha e DICO. Per gli agenti AI delle aziende c’è una pagina dedicata.',
          href: '/servizi/agenti-ai',
        },
      ],
    },
    scope2: {
      id: 'per-chi',
      label: 'Per chi',
      kicker: 'Per chi lavoriamo',
      title: 'Aziende, studi ed enti con un lavoro da far girare meglio.',
      highlight: 'far girare meglio',
      items: [
        {
          title: 'Aziende e studi professionali',
          text: 'Chi tiene clienti, ore, preventivi o scadenze su fogli e strumenti diversi. Óptima è nato per agenzie e studi, Tetha per imprese edili, lattonieri e subappaltatori.',
        },
        {
          title: 'Comuni ed enti',
          text: 'DICO è online e porta le comunicazioni dei Comuni su WhatsApp e Telegram. L’assistente per i cittadini è in sperimentazione in un Comune del Friuli-Venezia Giulia.',
        },
        {
          title: 'Turismo, sport e locali',
          text: 'Siti con prenotazione diretta come Portopiccolo Apartments, la sala di un ristorante su iPad, il calcio dilettantistico di Veneto e Friuli con BUFFR Live.',
        },
      ],
    },
    note: {
      kicker: 'Prodotti nostri',
      title: 'Costruiamo software e lo teniamo in piedi ogni giorno',
      text: 'BUFFR è su App Store. Óptima, il gestionale per agenzie e studi, e Tetha, per le imprese edili, sono online; le loro app per iPhone sono in prova. Aggiornamenti, store, pagamenti e assistenza li facciamo noi: è quello che portiamo nei lavori per i clienti.',
      link: { href: '/progetti', label: 'Tutti i prodotti e i lavori' },
    },
    method: {
      kicker: 'Come lavoriamo',
      title: 'Dalla richiesta alla messa online, passo dopo passo',
      highlight: 'passo dopo passo',
      steps: [
        { title: 'Una chiamata per capire', text: 'Partiamo da cosa deve fare il software e per chi. La prima chiamata è gratuita.' },
        { title: 'Una proposta scritta', text: 'Un preventivo su misura, con tempi e consegne chiari prima di partire.' },
        {
          title: 'Schermate da provare',
          text: 'Disegniamo le schermate con componenti riutilizzabili e le facciamo provare prima di costruire.',
        },
        {
          title: 'Sviluppo e prove',
          text: 'Costruiamo la parte che si vede e quella che gira dietro, con prove automatiche e revisione del codice per tenere alta la qualità.',
        },
        {
          title: 'Messa online e assistenza',
          text: 'Mettiamo online, formiamo chi lo userà e consegniamo la documentazione. Restiamo per correzioni e miglioramenti, con piani di manutenzione mensili.',
        },
      ],
    },
    proofHead: {
      kicker: 'Lavori',
      title: 'Lavori veri, con lo stato di ognuno',
      highlight: 'lo stato di ognuno',
      lead: 'Ogni scheda dice cosa abbiamo fatto, per chi e a che punto è: online, in prova o in uso interno.',
    },
    proof: [
      { id: 'buffr', note: 'La nostra app per iPhone, su App Store: la camera salva gli ultimi secondi e monta il video della partita.' },
      { id: 'optima', note: 'Gestionale con intelligenza artificiale per agenzie e studi: online; l’app iPhone è in prova.' },
      { id: 'tetha', note: 'Software per scadenze e documenti di cantiere: online; l’app iPhone è in prova.' },
      { id: 'dico', note: 'Piattaforma online che porta le comunicazioni dei Comuni su WhatsApp e Telegram.' },
      { id: 'portopiccolo-apartments', note: 'Sito con prenotazione diretta, collegato al calendario del gestionale.' },
      { id: 'fiumedica', note: 'Il sito di un polo sanitario di Fiume Veneto: ventisei aree mediche, prenotazione e referti.' },
    ],
    local: {
      kicker: 'Dove lavoriamo',
      title: 'Sede legale a Pordenone, base operativa a Mestre.',
      highlight: 'Pordenone',
      paragraphs: [
        `La sede legale di ${COMPANY.legalName} è a ${COMPANY.legalSeat}; la base operativa è in ${CONTACT.street}. Da lì lavoriamo con aziende, studi ed enti del Friuli-Venezia Giulia e del Veneto.`,
        'I progetti si seguono da remoto, con incontri regolari e strumenti condivisi, e sul posto quando serve. In Friuli-Venezia Giulia abbiamo costruito, tra gli altri, il sito di Fiumedica a Fiume Veneto, il sito della Scuola Sci Piancavallo e il sito di Portopiccolo Apartments.',
      ],
      areas: ['Pordenone', 'Friuli-Venezia Giulia', 'Mestre e Venezia', 'Veneto'],
      links: [
        { href: link('mestre').href, label: link('mestre').label },
        { href: '/servizi/web', label: 'Siti web e software' },
        { href: '/servizi/agenti-ai', label: 'Agenti AI e automazioni' },
        { href: '/agenzia-marketing-pordenone', label: 'Agenzia marketing a Pordenone' },
        { href: '/progetti', label: 'Progetti e casi studio' },
      ],
    },
    faqs: [
      {
        question: 'Righello è una software house di Pordenone?',
        answer: `La sede legale di ${COMPANY.legalName} è a ${COMPANY.legalSeat}; la base operativa è a ${COMPANY.city}, in ${COMPANY.street}. Costruiamo software su misura, gestionali, app per iPhone e iPad, piattaforme web e integrazioni per aziende, studi ed enti del Friuli-Venezia Giulia e del Veneto, con un solo team.`,
      },
      {
        question: 'Che software sviluppate?',
        answer:
          'Gestionali e software su misura, app per iPhone e iPad, piattaforme web, siti con prenotazione, integrazioni e automazioni. Alcuni esempi sono Óptima per agenzie e studi, Tetha per le imprese edili, DICO per i Comuni e BUFFR, l’app per iPhone che salva gli ultimi secondi di un video.',
      },
      {
        question: 'Sviluppate app per iPhone e iPad?',
        answer:
          'Sì. BUFFR, la nostra app per iPhone, è su App Store. Óptima, Tetha, BUFFR Live, Rig Cast e Gusto Raffinato hanno app per iPhone o iPad in prova, e ogni scheda dice a che punto è. Per un’app su misura si parte dalla chiamata gratuita e da una proposta scritta.',
      },
      {
        question: 'Quanto costa un software su misura?',
        answer: `Non c’è un listino: il prezzo dipende da cosa deve fare il software, da quanti sistemi deve collegare e da quante persone lo useranno. ${CALL}`,
      },
      {
        question: 'Quanto tempo serve per costruire un software?',
        answer:
          'Dipende da cosa si costruisce e da quanti sistemi vanno collegati. Il tempo non si promette a occhio: lo scriviamo nella proposta, dopo la prima chiamata, insieme alle consegne. Prima di costruire facciamo provare le schermate, così si correggono le idee quando costa ancora poco.',
      },
      {
        question: 'Fate anche manutenzione dopo la messa online?',
        answer: MAINTENANCE,
      },
      {
        question: 'Il codice del software è nostro?',
        answer:
          'Per il software costruito su misura sì: il codice è del cliente, che riceve l’accesso all’archivio del codice, la documentazione e tutti i materiali. Codice, design e materiali sono del cliente, senza vincoli e senza sorprese. È un principio che vale per ogni progetto su misura.',
      },
      {
        question: 'Lavorate anche fuori Pordenone?',
        answer:
          'Sì. La sede legale è a Pordenone e la base operativa a Mestre. Lavoriamo con aziende del Friuli-Venezia Giulia e del Veneto e seguiamo i progetti da remoto, con incontri regolari e strumenti condivisi, anche in tutta Italia. Ci spostiamo sul posto quando serve.',
      },
      {
        question: 'Usate l’intelligenza artificiale nei vostri software?',
        answer:
          'Dove serve, sì. Óptima AI risponde dai dati dello studio e chiede conferma prima di scrivere. Tetha legge i documenti scansionati e propone: senza il sì di una persona non entra niente in archivio. L’assistente per i Comuni risponde con le pagine dell’ente e dice quando non lo sa.',
      },
      {
        question: 'Meglio un software su misura o un gestionale già pronto?',
        answer:
          'Un gestionale pronto va bene quando il tuo lavoro coincide con quello che prevede. Il software su misura serve quando lavori in modo diverso o quando i dati stanno già in più strumenti da collegare. Nella prima chiamata guardiamo come lavori e ti diciamo cosa conviene.',
      },
    ],
    closing: {
      kicker: 'Software su misura',
      title: 'Parliamo del software che ti serve',
      highlight: 'software che ti serve',
      text: 'Raccontaci cosa deve fare e per chi. La prima chiamata è gratuita; poi ti mandiamo una proposta scritta con tempi e consegne.',
    },
    flow: {
      next: { href: link('mestre').href, name: link('mestre').label, sub: 'Base operativa a Mestre · Venezia e Veneto' },
      prev: { href: '/servizi/web', name: 'Siti web e software' },
    },
  },
  {
    zone: 'mestre',
    path: link('mestre').href,
    name: link('mestre').label,
    areas: ['Mestre', 'Venezia', 'Veneto'],
    seo: {
      title: 'Software house a Mestre: app, gestionali e siti | Righello',
      description:
        'Software house a Mestre per Venezia e il Veneto: software su misura, app per iPhone e iPad, piattaforme web e siti per sport, eventi e turismo.',
    },
    kicker: 'Mestre, Venezia e Veneto',
    title: 'Software house a Mestre',
    highlight: 'per Venezia e il Veneto',
    lead: `Righello ha la base operativa a ${COMPANY.city}, in ${COMPANY.street}, e la sede legale a ${COMPANY.legalSeat}. Da Mestre costruisce software su misura, app per iPhone e iPad, piattaforme web e integrazioni per aziende, studi ed enti di Venezia e del Veneto. Sport, eventi e turismo sono già nei suoi lavori.`,
    panel: [
      `Base operativa a Mestre, in ${COMPANY.street}: ${CONTACT.hours.toLowerCase().replace('lun - ven', 'dal lunedì al venerdì')}.`,
      `Rispondiamo ${CONTACT.reply}; la prima chiamata è gratuita.`,
      'Il calcio dilettantistico del Veneto è già nei nostri prodotti: BUFFR Live e Canale 77.',
      'Prodotti nostri, che teniamo in piedi ogni giorno: BUFFR è su App Store.',
    ],
    scope: {
      kicker: 'Cosa abbiamo costruito',
      title: 'Software per lo sport, gli eventi e il lavoro di ogni giorno.',
      highlight: 'sport, gli eventi',
      items: [
        {
          icon: 'play',
          title: 'Sport e dirette',
          text: 'BUFFR, su App Store, salva gli ultimi secondi di una partita. BUFFR Live porta risultati e cronaca del calcio dilettantistico di Veneto e Friuli. Canale 77 On Demand mette le partite su sito, HbbTV e smart TV.',
          href: '/progetti/buffr-live',
        },
        {
          icon: 'globe',
          title: 'Siti di eventi e di turismo',
          text: 'Bibione Sand Storm: diciassette pagine con animazioni a scorrimento, online dal 30 settembre 2026. Portopiccolo Apartments: prenotazione diretta, collegata al calendario del gestionale.',
          href: '/progetti/bibione-sand-storm',
        },
        {
          icon: 'database',
          title: 'Gestionali e app per il lavoro di ogni giorno',
          text: 'Óptima per agenzie e studi, Tetha per scadenze e documenti di cantiere, Gusto Raffinato Sala per la sala di un ristorante su iPad.',
          href: '/progetti/optima',
        },
        {
          icon: 'message',
          title: 'Comunicazione e assistenti per gli enti',
          text: 'DICO porta le comunicazioni dei Comuni su WhatsApp e Telegram. Gli assistenti AI rispondono con le pagine dell’ente: uno è in sperimentazione in un Comune del Friuli-Venezia Giulia.',
          href: '/progetti/dico',
        },
      ],
    },
    scope2: {
      id: 'da-mestre',
      label: 'Da Mestre',
      kicker: 'Da Mestre',
      title: 'Dove siamo, quando rispondiamo, come si parte.',
      highlight: 'come si parte',
      items: [
        { title: 'Dove siamo', text: `${CONTACT.street}. La sede legale è a ${COMPANY.legalSeat}: è la stessa società (${COMPANY.legalName}).` },
        { title: 'Quando rispondiamo', text: `${CONTACT.hours}. Scrivi su WhatsApp, per email o dal modulo: rispondiamo ${CONTACT.reply}.` },
        { title: 'Come si parte', text: 'Una chiamata gratuita, poi una proposta scritta con tempi e consegne. Incontri da remoto con strumenti condivisi; ci spostiamo da te quando serve.' },
      ],
    },
    note: {
      kicker: 'Il Veneto nei nostri lavori',
      title: 'Dallo sport ai siti di evento',
      text: 'BUFFR Live segue il calcio dilettantistico di Veneto e Friuli, Canale 77 On Demand raccoglie CalcioVeneto Live e CalcioFVG Live, e il sito di Bibione Sand Storm è stato rifatto da zero. Sono lavori veri: ogni scheda dice a che punto sono.',
      link: { href: '/progetti', label: 'Tutti i progetti' },
    },
    method: {
      kicker: 'Come si parte',
      title: 'Dal primo messaggio al software in uso',
      highlight: 'al software in uso',
      steps: [
        { title: 'Scrivici', text: 'Un messaggio su WhatsApp, un’email o il modulo. La prima chiamata è gratuita.' },
        { title: 'Capiamo il lavoro', text: 'Guardiamo come lavori oggi e cosa deve fare il software, anche quando i dati stanno già in più strumenti da collegare.' },
        { title: 'Proposta e prova', text: 'Una proposta scritta con tempi e consegne; poi schermate da provare prima di costruire.' },
        { title: 'Costruzione e assistenza', text: 'Sviluppo con prove automatiche, messa online, formazione e documentazione; manutenzione con piani mensili.' },
      ],
    },
    proofHead: {
      kicker: 'Lavori',
      title: 'Lavori con il Veneto dentro',
      highlight: 'il Veneto',
      lead: 'Ogni scheda dice cosa abbiamo fatto, per chi e a che punto è.',
    },
    proof: [
      { id: 'bibione-sand-storm', note: 'Il sito dell’evento di motocross e quad sulla sabbia di Bibione: diciassette pagine, online dal 30 settembre 2026.' },
      { id: 'buffr-live', note: 'Risultati live, cronaca, formazioni e mappa dei campi per il calcio dilettantistico di Veneto e Friuli: sito online, app in prova.' },
      { id: 'canale77', note: 'Highlights, interviste e partite di Canale 77, CalcioFVG Live e CalcioVeneto Live su sito, HbbTV e smart TV.' },
      { id: 'buffr', note: 'La nostra app per iPhone, su App Store: salva gli ultimi secondi di una partita.' },
    ],
    local: {
      kicker: 'Presenza locale',
      title: 'Mestre è la base, il Veneto è il territorio.',
      highlight: 'la base',
      paragraphs: [
        `La base operativa di Righello è in ${CONTACT.street}. La sede legale è a ${COMPANY.legalSeat}: un solo team su due sedi.`,
        'Per chi cerca una software house a Venezia e nel Veneto contano due cose: vedere lavori veri e sapere chi risponde. I lavori sono qui sopra, con il loro stato; chi risponde sono i tre fondatori, a cui arrivano i messaggi del modulo.',
      ],
      areas: ['Mestre', 'Venezia', 'Veneto'],
      links: [
        { href: link('pordenone').href, label: link('pordenone').label },
        { href: '/servizi/web', label: 'Siti web e software' },
        { href: '/agenzia-marketing-mestre', label: 'Agenzia marketing a Mestre' },
        { href: '/chi-siamo', label: 'Chi siamo' },
      ],
    },
    faqs: [
      {
        question: 'Righello è una software house di Mestre?',
        answer: `La base operativa di Righello è a ${COMPANY.city}, in ${COMPANY.street}; la sede legale di ${COMPANY.legalName} è a ${COMPANY.legalSeat}. Da Mestre costruiamo software su misura, app per iPhone e iPad, piattaforme web e integrazioni per aziende, studi ed enti di Venezia e del Veneto.`,
      },
      {
        question: 'Avete già lavorato nel Veneto?',
        answer:
          'Sì. Abbiamo rifatto il sito di Bibione Sand Storm, un evento di motocross e quad sulla sabbia. BUFFR Live segue il calcio dilettantistico di Veneto e Friuli e Canale 77 On Demand raccoglie le partite di CalcioVeneto Live. Ogni scheda dice a che punto è il lavoro.',
      },
      {
        question: 'Quando e come rispondete?',
        answer: `Rispondiamo ${CONTACT.reply}. Gli orari sono ${CONTACT.hours.replace('Lun - Ven: ', 'dal lunedì al venerdì, ')}. Puoi scrivere su WhatsApp, per email o dal modulo: i messaggi del modulo li leggono ${CONTACT.recipients}. La prima chiamata è gratuita; poi arriva una proposta scritta con tempi e consegne.`,
      },
      {
        question: 'Si può lavorare da remoto o serve venire a Mestre?',
        answer:
          'Si può fare tutto da remoto: incontri regolari, strumenti condivisi, prove delle schermate prima di costruire. Ci spostiamo da te quando serve, per esempio per formare chi userà il software, e la documentazione resta a tua disposizione. Il primo contatto è sempre una chiamata gratuita, anche per chi abita lontano.',
      },
      {
        question: 'Fate app per iPhone e iPad e piattaforme per lo sport?',
        answer:
          'Sì. BUFFR è la nostra app per iPhone su App Store: salva gli ultimi secondi di una partita e monta il video. BUFFR Live, Rig Cast e la produzione delle partite completano la filiera dello sport: ogni scheda dice se è online, in prova o in uso interno.',
      },
      {
        question: 'Righello di Mestre e Righello di Pordenone sono la stessa azienda?',
        answer: `Sì: è ${COMPANY.legalName}, con sede legale a ${COMPANY.legalSeat} e base operativa a ${COMPANY.city}. Un solo team segue i progetti in Friuli-Venezia Giulia e nel Veneto, con un solo referente. La pagina della software house di Pordenone racconta gli stessi prodotti dal punto di vista del Friuli.`,
      },
      {
        question: 'Fate anche manutenzione dopo la messa online?',
        answer: MAINTENANCE,
      },
    ],
    closing: {
      kicker: 'Software su misura',
      title: 'Hai un software da costruire a Venezia o nel Veneto?',
      highlight: 'da costruire',
      text: 'Scrivici cosa ti serve. La prima chiamata è gratuita; poi una proposta scritta con tempi e consegne.',
    },
    flow: {
      next: { href: link('pordenone').href, name: link('pordenone').label, sub: 'Sede legale a Pordenone · Friuli-Venezia Giulia' },
      prev: { href: '/servizi/web', name: 'Siti web e software' },
    },
  },
];

export const getSoftwareHouse = (zone: string): SoftwareHousePage | undefined => softwareHousePages.find((p) => p.zone === zone);

export const getSoftwareHouseByPath = (path: string): SoftwareHousePage | undefined => softwareHousePages.find((p) => p.path === path);
