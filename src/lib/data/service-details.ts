import type { IconName } from '$lib/data/landing/types';
import type { Faq } from './faqs/types';

/**
 * Tutto cio' che dicono le pagine /servizi e /servizi/<slug> sta qui, in un punto solo.
 * Le prove sono SOLO schede progetto vere (`proof` rimanda agli id di case-studies.ts): niente numeri o clienti che non si possano aprire.
 */

export interface ServiceItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface WorkflowStep {
  num: string;
  title: string;
  description: string;
}

export interface ServiceSeo {
  title: string;
  description: string;
}

export interface LocalProductSeo {
  eyebrow: string;
  title: string;
  copy: string;
  points: string[];
  /** Una riga di rimandi sotto il blocco (le pagine che approfondiscono: sedi, prodotti). */
  links?: Array<{ href: string; label: string }>;
}

/** Una sezione a schede in piu' di una pagina di servizio (titolo, schede senza collegamento): vedi `ServiceDetail.sections`. */
export interface ServiceSection {
  id: string;
  label: string;
  kicker: string;
  title: string;
  highlight?: string;
  lead?: string;
  items: Array<{ title: string; text: string }>;
}

export interface Outcome {
  title: string;
  text: string;
}

/** Una scheda progetto che dimostra il servizio; `note` dice in una riga quale parte del lavoro c'entra. */
export interface ProofRef {
  id: string;
  note?: string;
}

/** Un rimando discreto (non un secondo invito): una frase e un link di testo. */
export interface ServiceNote {
  kicker: string;
  title: string;
  text: string;
  href: string;
  label: string;
}

export interface ServiceDetail {
  slug: string;
  category: string;
  /** Nome breve: nel menu, nei rimandi e nel "prossimo servizio". */
  name: string;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  /** Una riga per l'indice dei servizi. */
  tagline: string;
  accent: [string, string];
  /** Cosa ottiene chi sceglie questo servizio (tre frasi, nel riquadro dell'apertura). */
  outcomes: Outcome[];
  services: ServiceItem[];
  workflow: WorkflowStep[];
  proof: ProofRef[];
  /** Titolo della sezione dei lavori, se non e' quello comune. */
  proofHead?: { title: string; highlight?: string; lead?: string };
  /** Sezioni a schede dopo «Cosa facciamo» (la pagina degli agenti AI chiarisce dove lavora e cosa non fa). */
  sections?: ServiceSection[];
  note?: ServiceNote;
  seo: ServiceSeo;
  localSeo: LocalProductSeo;
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'marketing',
    category: 'Marketing & Social Media',
    name: 'Marketing e social media',
    titleLine1: 'Strategie di marketing',
    titleHighlight: 'che generano risultati',
    subtitle:
      'Gestione completa dei social media, produzione dei contenuti e piano editoriale, pensati per creare un rapporto vero con chi ti segue e portare richieste.',
    tagline: 'Strategie che generano risultati',
    accent: ['#D6487E', '#7A2B8F'],
    outcomes: [
      { title: 'Una linea chiara', text: 'Cosa dire, a chi e con quale obiettivo, in un piano mensile con calendario e rubriche.' },
      { title: 'Contenuti fatti in casa', text: 'Foto, video e testi prodotti dallo stesso team: niente passaggi fra fornitori diversi.' },
      { title: 'Numeri che si leggono', text: 'Un report ogni mese: cosa ha funzionato, cosa cambiamo.' },
    ],
    services: [
      {
        icon: 'message',
        title: 'Gestione dei social media',
        description: 'Strategia, pianificazione editoriale e gestione dei tuoi canali, con analisi dei risultati e report mensili.',
      },
      {
        icon: 'play',
        title: 'Produzione video',
        description: 'Reel, TikTok, YouTube: video completi, dalla storia al montaggio, nei formati giusti per ogni piattaforma.',
      },
      {
        icon: 'wand',
        title: 'Testi e racconto',
        description: 'Testi per social, pubblicità e sito. Un tono di voce su misura, didascalie efficaci, storie che portano al contatto.',
      },
      {
        icon: 'camera',
        title: 'Servizi fotografici',
        description: 'Fotografia professionale per campagne, negozi online e immagine del marchio, con un team dedicato.',
      },
      {
        icon: 'users',
        title: 'Gestione della community',
        description: 'Moderazione, risposte rapide e un rapporto costruito con il tuo pubblico, giorno per giorno.',
      },
      {
        icon: 'calendar',
        title: 'Piano editoriale',
        description: 'Contenuti pianificati mese per mese, con calendario, rubriche a tema e lettura delle tendenze.',
      },
    ],
    workflow: [
      {
        num: '01',
        title: 'Analisi',
        description: 'Guardiamo la tua presenza online, il pubblico e i concorrenti. Individuiamo le opportunità e fissiamo tono di voce e obiettivi.',
      },
      {
        num: '02',
        title: 'Piano editoriale',
        description: 'Prepariamo rubriche, formati e calendario di pubblicazione, adatti a ogni piattaforma.',
      },
      {
        num: '03',
        title: 'Produzione',
        description: 'Servizi fotografici, montaggio video, testi: produciamo tutto con il nostro team creativo.',
      },
      {
        num: '04',
        title: 'Pubblicazione e community',
        description: 'Pubblichiamo, rispondiamo alla community e seguiamo i risultati mentre arrivano.',
      },
      {
        num: '05',
        title: 'Report e miglioramenti',
        description: 'Ogni mese un report con quello che abbiamo imparato, e le correzioni per il mese dopo.',
      },
    ],
    proof: [
      { id: 'reguta', note: 'Contenuti per i social di un marchio storico del vino.' },
      { id: 'elite-hotel-spa', note: 'Foto e video per il profilo e le campagne di un hotel con spa.' },
      { id: 'riviera-resort', note: 'Riprese aeree montate in un video pronto per sito e YouTube.' },
      { id: 'neura', note: 'Marchio, testi e un video verticale per i social.' },
    ],
    seo: {
      title: 'Social media marketing a Pordenone e Mestre | Righello',
      description: 'Gestione social media, video production, copywriting, piano editoriale e contenuti per aziende tra Pordenone, Mestre e Nord Italia.',
    },
    localSeo: {
      eyebrow: 'Marketing locale',
      title: 'Agenzia marketing e social media a Pordenone e Mestre',
      copy: 'Non riempiamo calendari editoriali per fare volume. Costruiamo contenuti, video e campagne social che fanno capire chi sei, fanno muovere le persone giuste e portano conversazioni utili al commerciale.',
      points: [
        'Strategia social, piano editoriale, copywriting e community management.',
        'Produzione foto e video pensata per campagne, reel, adv e sito.',
        'Presidio operativo tra Pordenone, Mestre, Friuli-Venezia Giulia e Veneto.',
      ],
    },
  },
  {
    slug: 'advertising',
    category: 'Advertising & Automazione',
    name: 'Advertising e automazione',
    titleLine1: 'Campagne advertising',
    titleHighlight: 'guidate dai dati',
    subtitle:
      'Campagne pubblicitarie con misurazione precisa e automazioni per ottimizzare ogni euro investito: più ritorno, meno spreco.',
    tagline: 'Ogni euro tracciato, ogni processo ottimizzato',
    accent: ['#06B6D4', '#0B5C73'],
    outcomes: [
      { title: 'Ogni euro tracciato', text: 'Seguiamo ogni contatto, dal clic alla richiesta, con tracciamento sul sito e cruscotti su misura.' },
      { title: 'Prove continue', text: 'Mettiamo alla prova creatività, testi e pubblici: si toglie ciò che non rende.' },
      { title: 'Il budget va dove rende', text: 'La spesa cresce sulle campagne che funzionano e si prova qualche canale nuovo.' },
    ],
    services: [
      {
        icon: 'globe',
        title: 'Meta Ads',
        description: 'Campagne su Facebook e Instagram con pubblici ben definiti, creatività curate e budget aumentato un passo alla volta.',
      },
      {
        icon: 'search',
        title: 'Google Ads',
        description: 'Ricerca, Display, Shopping e Performance Max per intercettare chi sta già cercando e portarlo a una richiesta.',
      },
      {
        icon: 'play',
        title: 'TikTok Ads',
        description: 'Campagne con formati nativi di TikTok per raggiungere nuovi pubblici e farsi ricordare.',
      },
      {
        icon: 'chart',
        title: 'Tracciamento e attribuzione',
        description: 'Pixel, tracciamento lato server, GA4 e cruscotti su misura per seguire ogni passaggio del cliente.',
      },
      {
        icon: 'layers',
        title: 'Test A/B',
        description: 'Prove continue su creatività, testi, pagine di arrivo e pubblici, per abbassare il costo di ogni richiesta.',
      },
      {
        icon: 'gear',
        title: 'Automazione del marketing',
        description: 'Flussi automatici per accompagnare i contatti, inviare email e collegarsi al CRM. Lavorano anche quando il team è offline.',
      },
    ],
    workflow: [
      {
        num: '01',
        title: 'Analisi e impostazione',
        description: 'Controlliamo l’account, impostiamo il tracciamento, definiamo i pubblici e la struttura delle campagne con obiettivi chiari.',
      },
      {
        num: '02',
        title: 'Strategia e creatività',
        description: 'Decidiamo come fare le offerte, creiamo le grafiche e i testi e costruiamo il percorso che porta alla richiesta.',
      },
      {
        num: '03',
        title: 'Lancio e prove',
        description: 'Attiviamo le campagne con test su creatività, testi e pubblici. Guardiamo i risultati ogni giorno.',
      },
      {
        num: '04',
        title: 'Ottimizzazione e crescita',
        description: 'Miglioriamo sui dati, aumentiamo la spesa dove rende e proviamo nuovi canali.',
      },
    ],
    proof: [
      { id: 'elite-hotel-spa', note: 'Foto e video pensati anche come materiale per le campagne dell’hotel.' },
    ],
    seo: {
      title: 'Google Ads e Meta Ads a Pordenone e Mestre | Righello',
      description: 'Campagne Google Ads, Meta Ads e TikTok Ads con tracking avanzato, marketing automation e ottimizzazione budget per aziende tra Pordenone e Mestre.',
    },
    localSeo: {
      eyebrow: 'Performance locale',
      title: 'Google Ads, Meta Ads e advertising a Pordenone e Mestre',
      copy: 'La pubblicità funziona quando ogni euro sa dove deve andare. Prepariamo campagne, tracciamento e landing in modo che il budget non diventi rumore, ma una macchina leggibile di dati, test e richieste reali.',
      points: [
        'Google Ads, Meta Ads, TikTok Ads e funnel di conversione.',
        'GA4, pixel, server-side tracking, dashboard e ottimizzazione continua.',
        'Campagne per aziende locali e B2B che vogliono misurare prima di scalare.',
      ],
    },
  },
  {
    slug: 'web',
    category: 'Sviluppo Web & Software',
    name: 'Siti web e software',
    titleLine1: 'Siti web, e-commerce',
    titleHighlight: 'e software su misura',
    subtitle:
      'Progettiamo e sviluppiamo siti web, negozi online, web app e software su misura per aziende a Pordenone e Mestre. Soluzioni che crescono con te, collegate ai tuoi strumenti e potenziate dall’intelligenza artificiale.',
    tagline: 'Soluzioni digitali su misura',
    accent: ['#8B5CF6', '#4C2A9A'],
    outcomes: [
      { title: 'Si fa trovare e si fa capire', text: 'Struttura, testi e SEO tecnico pensati perché chi cerca arrivi alla richiesta.' },
      { title: 'Semplice da far crescere', text: 'Veloce da caricare e facile da aggiornare quando l’azienda cambia passo.' },
      { title: 'Collegato ai tuoi strumenti', text: 'CRM, gestionale, pagamenti e servizi esterni parlano fra loro.' },
    ],
    services: [
      {
        icon: 'globe',
        title: 'Siti web',
        description: 'Siti aziendali, pagine di atterraggio e portali pensati per l’uso, la ricerca e le richieste, con un design costruito su misura.',
      },
      {
        icon: 'cart',
        title: 'E-commerce',
        description: 'Negozi online su Shopify o su misura: catalogo, pagamento semplice e collegamento al gestionale, per vendere a privati e aziende.',
      },
      {
        icon: 'device',
        title: 'Web app',
        description: 'Applicazioni web su misura, portali per i clienti, configuratori di prodotto e cruscotti per leggere l’azienda.',
      },
      {
        icon: 'search',
        title: 'SEO',
        description: 'SEO tecnico e dei contenuti per salire nei risultati di ricerca e portare più visite utili.',
      },
      {
        icon: 'layers',
        title: 'Progettazione di interfacce',
        description: 'Interfacce chiare e accessibili: schemi, prototipi da provare e componenti riutilizzabili che tengono tutto coerente.',
      },
      {
        icon: 'link',
        title: 'Integrazioni',
        description: 'Siti e app collegati a CRM, gestionali, sistemi di pagamento e servizi esterni, con dati che passano da soli.',
      },
    ],
    workflow: [
      {
        num: '01',
        title: 'Analisi e struttura',
        description: 'Capiamo cosa serve, disegniamo la struttura delle pagine e prepariamo prototipi da provare prima di costruire.',
      },
      {
        num: '02',
        title: 'Grafica',
        description: 'Disegniamo le interfacce con componenti riutilizzabili e un’immagine coerente con il marchio.',
      },
      {
        num: '03',
        title: 'Sviluppo e prove',
        description: 'Costruiamo la parte che si vede e quella che gira dietro, con prove automatiche e revisione del codice per tenere alta la qualità.',
      },
      {
        num: '04',
        title: 'Pubblicazione e assistenza',
        description: 'Mettiamo online, controlliamo che tutto vada, formiamo chi lo userà e restiamo per correzioni e miglioramenti.',
      },
    ],
    proof: [
      { id: 'portopiccolo-apartments', note: 'Prenotazione diretta collegata al calendario del gestionale.' },
      { id: 'scuola-sci-piancavallo', note: 'Corsi, prezzi e prenotazione in un sito che segue la stagione.' },
      { id: 'fiumedica', note: 'Una pagina per ogni area medica, con prenotazione e referti.' },
      { id: 'bibione-sand-storm', note: 'Sito di un evento sportivo, con animazioni a scorrimento.' },
    ],
    note: {
      kicker: 'Dal sito agli agenti',
      title: 'Gli agenti AI nascono qui',
      text: 'È il nostro team di sviluppo che progetta, integra e fa girare gli agenti digitali sui sistemi reali delle aziende. Senza una base tecnica solida, un agente resta un’idea: così diventa operativo.',
      href: '/servizi/agenti-ai',
      label: 'Scopri gli agenti AI',
    },
    seo: {
      title: 'Agenzia siti web a Pordenone e Mestre | Righello',
      description: 'Agenzia siti web a Pordenone e Mestre: siti aziendali, e-commerce, web app, software custom, UX/UI, SEO tecnico e integrazioni.',
    },
    localSeo: {
      eyebrow: 'Web agency locale',
      title: 'Agenzia siti web a Pordenone e Mestre',
      copy: 'Un sito non deve soltanto essere bello in riunione. Deve farsi trovare, caricare veloce, spiegare bene, convertire e restare semplice da far evolvere quando l\'azienda cambia passo.',
      points: [
        'Siti aziendali, landing page, e-commerce, web app e software custom.',
        'UX/UI, performance, SEO tecnico, analytics e integrazioni in un unico processo.',
        'Architettura pensata per far crescere home, servizi e contenuti senza cannibalizzarsi.',
      ],
      links: [
        { href: '/software-house-pordenone', label: 'Software house a Pordenone' },
        { href: '/software-house-mestre', label: 'Software house a Mestre' },
        { href: '/progetti', label: 'Progetti e casi studio' },
      ],
    },
  },
  {
    slug: 'agenti-ai',
    category: 'Agenti AI & Automazione Intelligente',
    name: 'Agenti AI',
    titleLine1: 'Il tuo nuovo',
    titleHighlight: 'dipendente digitale',
    subtitle:
      'Righello, studio digitale con sede legale a Pordenone e base operativa a Mestre, costruisce agenti AI su misura. Un agente AI è un programma che svolge compiti ripetitivi al posto di una persona e passa al team i casi dubbi. Risponde partendo dai dati dell’azienda, collegato a gestionale, email e documenti: lavora al fianco del team, non al suo posto.',
    tagline: 'Il tuo nuovo dipendente digitale',
    accent: ['#10B981', '#0A5C42'],
    outcomes: [
      { title: 'Meno lavoro ripetitivo', text: 'Amministrazione, assistenza di base e documenti diventano processi che girano da soli.' },
      { title: 'Dentro i tuoi sistemi', text: 'Gli agenti lavorano con gestionale, CRM, email e database che hai già, senza cambiarli.' },
      { title: 'Sempre sotto controllo', text: 'Il team capisce cosa fa l’agente e gestisce le eccezioni che chiedono una persona.' },
    ],
    services: [
      {
        icon: 'sparkle',
        title: 'Agenti AI su misura',
        description: 'Agenti progettati sui tuoi flussi reali: eseguono compiti, ricordano procedure e dati, e lavorano come vuole la tua azienda.',
      },
      {
        icon: 'gear',
        title: 'Automazione dei compiti ripetitivi',
        description: 'Amministrazione, assistenza di base e gestione dei documenti diventano processi digitali che girano senza intervento manuale.',
      },
      {
        icon: 'database',
        title: 'Collegamento a gestionale e CRM',
        description: 'Gli agenti dialogano con i sistemi interni: gestionale, CRM, email, database e servizi aziendali. Il sapere resta nella tua struttura.',
      },
      {
        icon: 'message',
        title: 'Assistenza ai clienti',
        description: 'Risposte alle richieste standard e più frequenti, con qualità costante e passaggio automatico al team per i casi complessi.',
      },
      {
        icon: 'chart',
        title: 'Report automatici',
        description: 'Report e cruscotti che si aggiornano da soli: i dati vengono raccolti, elaborati e presentati, con avvisi sulle anomalie.',
      },
      {
        icon: 'file',
        title: 'Gestione dei documenti',
        description: 'Archiviazione, classificazione e ricerca dei documenti: contratti, fatture, schede prodotto, ritrovati dall’agente giusto.',
      },
    ],
    workflow: [
      {
        num: '01',
        title: 'Mappa dei processi',
        description: 'Guardiamo come si lavora davvero: le attività ripetitive, i colli di bottiglia, dove si perde più tempo e denaro.',
      },
      {
        num: '02',
        title: 'Progetto degli agenti',
        description: 'Definiamo obiettivi, regole di comportamento, fonti dei dati e modo di collegarsi ai sistemi che già usi.',
      },
      {
        num: '03',
        title: 'Sviluppo e collegamenti',
        description: 'Costruiamo gli agenti e li colleghiamo a gestionale, CRM, email, database e servizi aziendali, in sicurezza e senza cambiare ciò che hai.',
      },
      {
        num: '04',
        title: 'Prove e formazione',
        description: 'Proviamo su casi reali. Il team impara a usare gli agenti, a leggere ciò che producono e a gestire le eccezioni.',
      },
      {
        num: '05',
        title: 'Messa in uso e controllo',
        description: 'Lo mettiamo in uso e lo teniamo d’occhio. Con i dati di lavoro veri lo miglioriamo nel tempo.',
      },
    ],
    proof: [
      { id: 'tetha', note: 'Legge i documenti di cantiere, avvisa delle scadenze e prepara il dossier.' },
      { id: 'optima', note: 'Un assistente che risponde dai dati dello studio, dentro il gestionale.' },
      { id: 'assistenti-pa', note: 'Risponde ai cittadini con le pagine del Comune e dice quando non lo sa.' },
      { id: 'dico', note: 'Scrive il messaggio settimanale nello stile dell’ente; la redazione lo approva.' },
    ],
    proofHead: {
      title: 'Cosa abbiamo già costruito',
      highlight: 'già costruito',
      lead: 'Ogni lavoro ha la sua scheda: cosa fa l’intelligenza artificiale, per chi, e a che punto è (online, in prova, in sperimentazione).',
    },
    sections: [
      {
        id: 'dove-lavora',
        label: 'Dove lavora',
        kicker: 'Dove l’AI lavora già',
        title: 'Tre posti dove gli assistenti sono già al lavoro',
        highlight: 'già al lavoro',
        items: [
          {
            title: 'Per i Comuni e gli enti',
            text: 'Un assistente WhatsApp, in sperimentazione in un Comune del Friuli-Venezia Giulia, risponde ai cittadini con le pagine ufficiali dell’ente, rimanda alla fonte e dice quando non sa. DICO prepara il messaggio settimanale nello stile dell’ente: la redazione lo approva.',
          },
          {
            title: 'Dentro i gestionali',
            text: 'In Óptima l’assistente risponde dai dati dello studio e chiede conferma prima di scrivere. In Tetha la lettura dei documenti scansionati propone tipo, persona e date: senza il sì di una persona non entra niente in archivio.',
          },
          {
            title: 'Per i processi di un’azienda',
            text: 'Si parte dai flussi reali: documenti da archiviare e ritrovare, richieste ripetitive dei clienti, report da aggiornare, dati da portare dal gestionale al CRM. Cosa automatizzare e cosa no si decide insieme, caso per caso.',
          },
        ],
      },
      {
        id: 'produzione-ai',
        label: 'Produzione e AI',
        kicker: 'Produzione AI: cosa facciamo e cosa no',
        title: 'Chi cerca «produzione AI» può intendere cose diverse',
        highlight: 'cose diverse',
        lead: 'Per dirlo chiaro: ecco dove Righello lavora con l’intelligenza artificiale e dove no.',
        items: [
          {
            title: 'AI nel lavoro di ogni giorno: sì',
            text: 'Documenti, messaggi, risposte e report: agenti che leggono i dati dell’azienda e li usano per svolgere compiti ripetitivi. È quello che costruiamo, con gli esempi che trovi in questa pagina.',
          },
          {
            title: 'AI dentro il software che usi: sì',
            text: 'Funzioni di intelligenza artificiale nei gestionali e nelle piattaforme, collegate ai dati del cliente, come in Óptima, Tetha e DICO.',
          },
          {
            title: 'AI sulle macchine di produzione: no',
            text: 'Non costruiamo sistemi per linee e macchine di fabbrica, come visione artificiale o manutenzione predittiva: tra i nostri lavori non ce n’è nessuno, e non li proponiamo come servizio.',
          },
        ],
      },
    ],
    note: {
      kicker: 'Opportunità per le aziende del Friuli Venezia Giulia',
      title: 'Bando Intelligenza Artificiale FVG 2026',
      text: 'Per i progetti di intelligenza artificiale delle piccole imprese la Regione ha previsto un contributo fino al 75% della spesa ammissibile. Lo sportello 2026 si è chiuso con le risorse esaurite: nella guida trovi come funzionava e puoi iscriverti per essere avvisato se la Regione lo riapre.',
      href: '/bando-intelligenza-artificiale-fvg-2026',
      label: 'Leggi la guida al bando',
    },
    seo: {
      title: 'Agenti AI e automazioni a Pordenone e Mestre | Righello',
      description: 'Agenti AI e automazioni per aziende tra Pordenone e Mestre: meno lavoro ripetitivo, collegati a gestionale, CRM, email e sistemi interni.',
    },
    localSeo: {
      eyebrow: 'AI operativa',
      title: 'Agenti AI e automazioni per aziende a Pordenone e Mestre',
      copy: 'L\'AI non deve restare una demo da mostrare una volta. La inseriamo nei processi veri: documenti, CRM, ERP, customer service, report e attività ripetitive che oggi consumano ore buone.',
      points: [
        'Agenti AI su misura, automazioni operative e flussi documentali.',
        'Integrazione con CRM, ERP, email, database e strumenti già in uso.',
        'Progetti pensati per ridurre lavoro ripetitivo senza perdere controllo umano.',
      ],
      links: [
        { href: '/software-house-pordenone', label: 'Software house a Pordenone' },
        { href: '/software-house-mestre', label: 'Software house a Mestre' },
        { href: '/progetti/assistenti-pa', label: 'Assistenti AI per i Comuni' },
        { href: '/servizi/web', label: 'Siti web e software' },
      ],
    },
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}

export const validSlugs = serviceDetails.map((s) => s.slug);

/** Percorso unico dei servizi: lo stesso nel menu a tendina, nell'indice e nel "precedente / prossimo". */
export function getNextService(slug: string): ServiceDetail {
  const i = serviceDetails.findIndex((s) => s.slug === slug);
  return serviceDetails[(i + 1) % serviceDetails.length];
}

export function getPrevService(slug: string): ServiceDetail {
  const i = serviceDetails.findIndex((s) => s.slug === slug);
  return serviceDetails[(i - 1 + serviceDetails.length) % serviceDetails.length];
}

/** Colori dell'insieme dei servizi (indice e pagine di agenzia): quelli del marchio. */
export const agencyAccent: [string, string] = ['#D6487E', '#7C5CFF'];

/** Il metodo comune a tutti i servizi: lo mostrano l'indice e le pagine di agenzia. Le durate sono quelle gia' scritte sul sito. */
export const commonMethod: Array<{ title: string; text: string; when?: string }> = [
  {
    title: 'Analisi e strategia',
    text: 'Studiamo il tuo lavoro, il pubblico e i concorrenti. Fissiamo obiettivi, tono di voce, contenuti e un piano su misura.',
    when: '1-2 settimane',
  },
  {
    title: 'Produzione creativa',
    text: 'Servizi fotografici, montaggio video, testi e immagine: creiamo tutto per i tuoi canali e per le campagne.',
    when: '2-3 settimane',
  },
  {
    title: 'Lancio e campagne',
    text: 'Pubblichiamo e attiviamo le campagne. Prove sui risultati, budget corretto strada facendo, controllo in tempo reale.',
    when: '2-4 settimane',
  },
  {
    title: 'Miglioramento e crescita',
    text: 'Report mensili, miglioramenti continui a contenuti e campagne, e più spazio a ciò che funziona.',
    when: 'Continuo',
  },
];

export interface ServiceFaq {
  q: string;
  a: string;
  /** Nelle pagine dei servizi si mostrano solo le domande dei servizi indicati; sull'indice, tutte. */
  services: string[];
  /** `false`: la domanda si vede nella pagina ma non entra nei dati strutturati ne' in llms.txt (cifre o impegni da far confermare: vedi docs/seo-audit.md). */
  structured?: false;
  /** `true`: la domanda e' solo della pagina di quel servizio; l'indice dei servizi non la ripete. */
  onlyOnPage?: true;
}

const all = ['marketing', 'advertising', 'web', 'agenti-ai'];

export const serviceFaqs: ServiceFaq[] = [
  {
    q: 'Cos’è un agente AI aziendale?',
    a: 'Un agente AI aziendale è un programma che svolge compiti al posto di una persona: legge email e documenti, inserisce dati nel gestionale o nel CRM, risponde alle richieste più semplici. Righello lo costruisce sui flussi dell’azienda, lo collega ai sistemi che già usa e lascia al team i casi che chiedono una persona.',
    services: ['agenti-ai'],
    onlyOnPage: true,
  },
  {
    q: 'Cosa significa produzione con l’AI?',
    a: 'Può voler dire cose diverse. L’AI nel lavoro di ogni giorno e dentro il software dell’azienda è quello che costruiamo: Óptima, Tetha, DICO e gli assistenti per i Comuni. L’AI sulle macchine di fabbrica non è un nostro servizio. Per foto, video e testi c’è il servizio di marketing, prodotto dal team di Righello.',
    services: ['agenti-ai'],
    onlyOnPage: true,
  },
  {
    q: 'Fate intelligenza artificiale per le macchine e le linee di produzione?',
    a: 'No. Tra i nostri lavori non ci sono sistemi per macchine o linee di fabbrica, come la visione artificiale o la manutenzione predittiva, e non li proponiamo come servizio. Costruiamo agenti e assistenti che lavorano su documenti, messaggi, risposte e dati di gestionale e CRM.',
    services: ['agenti-ai'],
    onlyOnPage: true,
  },
  {
    q: 'Esistono esempi di assistenti AI per i Comuni?',
    a: 'Sì. Un assistente WhatsApp è in sperimentazione in un Comune del Friuli-Venezia Giulia: risponde con le pagine ufficiali dell’ente, rimanda alla fonte e, se l’informazione non c’è, lo dice invece di inventarla. DICO.ONLINE, già online, porta le comunicazioni dei Comuni su WhatsApp e Telegram.',
    services: ['agenti-ai'],
    onlyOnPage: true,
  },
  {
    q: 'L’agente AI sostituisce il personale?',
    a: 'No: lavora al fianco del team, non al suo posto. Si occupa dei compiti ripetitivi e passa a una persona i casi che chiedono una decisione. Negli esempi che abbiamo costruito, come Tetha e Óptima, l’assistente propone e chiede conferma prima di scrivere o archiviare.',
    services: ['agenti-ai'],
    onlyOnPage: true,
  },
  {
    q: 'Come proteggete i dati?',
    a: 'Dipende dal progetto, e gli esempi che abbiamo costruito mostrano come. Nell’assistente per i Comuni i dati personali sono coperti prima di arrivare al modello. In Tetha i dati di ogni impresa sono separati da quelli delle altre e l’archivio è in Europa. DICO tiene archivio e allegati in Europa.',
    services: ['agenti-ai'],
    onlyOnPage: true,
  },
  {
    q: 'Gli agenti AI vengono addestrati con i dati dei clienti?',
    a: 'Non nel senso di un nuovo addestramento. In DICO l’assistente non è riaddestrato: a ogni richiesta lavora sui dati del Comune (recupero dei dati), e la memoria di ogni Comune è quella dei suoi messaggi già usciti, senza prestiti da un ente all’altro. L’assistente per i Comuni risponde cercando nelle pagine dell’ente.',
    services: ['agenti-ai'],
    onlyOnPage: true,
  },
  {
    q: 'Quanto costa un agente AI?',
    a: 'Non c’è un listino: il costo dipende dai flussi da automatizzare, dai sistemi da collegare e da quanti dati vanno letti. La prima chiamata è gratuita; poi Righello prepara una proposta scritta con tempi e consegne chiari, prima di iniziare, così sai cosa ricevi.',
    services: ['agenti-ai'],
    onlyOnPage: true,
  },
  {
    q: 'Quanto tempo ci vuole per vedere i risultati?',
    a: 'I primi miglioramenti si vedono dai 3 mesi. In questo periodo costruiamo le fondamenta: strategia, contenuti, campagne e tracciamento. Per i siti web, i tempi di sviluppo variano da 4 a 12 settimane a seconda della complessità.',
    services: ['marketing', 'advertising'],
    structured: false,
  },
  {
    q: 'Quanto tempo ci vuole per un sito web?',
    a: 'Siti vetrina: 4-6 settimane. E-commerce: 6-10 settimane. Web app su misura: 8-16 settimane. Includiamo sempre le fasi di strategia, progetto grafico, sviluppo e prove.',
    services: ['web'],
    structured: false,
  },
  {
    q: 'Lavorate solo con aziende del Veneto?',
    a: 'No, la nostra base è nel Nord Italia ma lavoriamo con clienti in tutta Europa. Gestiamo i progetti da remoto, con incontri regolari e strumenti condivisi, e ci spostiamo sul posto quando serve.',
    services: all,
    structured: false,
  },
  {
    q: 'Posso mantenere il sito da solo dopo il lancio?',
    a: 'Sì, forniamo formazione e documentazione. Consigliamo comunque un piano di manutenzione per aggiornamenti, sicurezza e miglioramenti continui.',
    services: ['web'],
  },
  {
    q: 'Che garanzie offrite sui risultati?',
    a: 'Definiamo obiettivi chiari all’inizio del progetto. Per l’advertising offriamo periodi di prova e ottimizzazione. Per lo sviluppo, la correzione dei difetti è inclusa per 6 mesi dopo la pubblicazione.',
    services: all,
    structured: false,
  },
  {
    q: 'Come funziona il pagamento?',
    a: 'Di norma: 30% all’avvio, 40% alla consegna del progetto grafico approvato, 30% alla pubblicazione. Per i lavori che continuano nel tempo (advertising, social) si fattura ogni mese in anticipo.',
    services: all,
  },
  {
    q: 'Posso vedere il codice sorgente?',
    a: 'Sì, il codice è tuo. Ti diamo accesso all’archivio del codice, alla documentazione e a tutti i materiali. Nessun vincolo, nessuna sorpresa.',
    services: ['web', 'agenti-ai'],
  },
  {
    q: 'Offrite assistenza dopo la pubblicazione?',
    a: 'Sì, con piani di manutenzione mensili che includono: hosting gestito, copie di sicurezza, aggiornamenti di sicurezza, piccole modifiche e assistenza prioritaria.',
    services: ['web', 'agenti-ai'],
  },
];

/** Le domande di un servizio; senza argomento, tutte (l'indice dei servizi le mostra tutte). */
export const faqsForService = (slug?: string): Faq[] =>
  serviceFaqs.filter((f) => (slug ? f.services.includes(slug) : !f.onlyOnPage)).map(toFaq);

/** Una domanda di servizio nella forma comune a tutte le pagine (`structured` compreso). */
export function toFaq(f: ServiceFaq): Faq {
  return { question: f.q, answer: f.a, ...(f.structured === false ? { structured: false as const } : {}) };
}

/** Le pagine per citta' e il bando: raggiungibili dall'indice dei servizi. */
export const localLandingLinks = [
  {
    href: '/agenzia-marketing-pordenone',
    label: 'Agenzia marketing a Pordenone',
    description: 'Il sistema Righello per aziende in Friuli-Venezia Giulia: contenuti, advertising, web, software e AI.',
  },
  {
    href: '/agenzia-marketing-mestre',
    label: 'Agenzia marketing a Mestre',
    description: 'Strategia, campagne, siti e automazioni per aziende tra Mestre, Venezia, Veneto e Nord Italia.',
  },
  {
    href: '/bando-intelligenza-artificiale-fvg-2026',
    label: 'Bando Intelligenza Artificiale FVG 2026',
    description: 'Come funzionava il bando regionale per i progetti AI delle piccole imprese del Friuli Venezia Giulia, e come essere avvisati se riapre.',
  },
];
