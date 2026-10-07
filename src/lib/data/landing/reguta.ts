import type { Landing } from './types';

const base = '/progetti/landing/reguta';

// Schermate del gestionale vero (stesso codice dell'applicazione) con dati di ESEMPIO:
// persone, mezzi e documenti sono inventati. Nessun dato dell'archivio reale del cliente.
const screen = (file: string, alt: string, caption: string) => ({
  type: 'image' as const,
  src: `${base}/${file}.webp`,
  alt,
  caption,
  ratio: '16/10',
  frame: 'browser' as const,
});

export default {
  variant: 'gestionale',
  tagline: 'Certificati, corsi e scadenze in un archivio che dice cosa fare per primo.',

  metrics: [
    { value: 23, label: 'pagine del gestionale', note: 'dalle scadenze alla cantina' },
    { value: 5, label: 'tipi di scadenza in un elenco solo', note: 'corsi, idoneità sanitarie, documenti, documenti aziendali, macchinari' },
    { value: 33, label: 'categorie di corso con validità di legge', note: 'dal RLS annuale agli attestati senza scadenza' },
    { text: '30 / 60', suffix: ' gg', label: 'di preavviso', note: '30 giorni per quasi tutto, 60 per le idoneità sanitarie' },
  ],

  chapters: [
    {
      id: 'problema',
      kicker: 'Il problema',
      title: 'Certificati con scadenze diverse. Un elenco che dice cosa fare per primo.',
      highlight: 'cosa fare per primo.',
      text:
        'Per un’azienda vinicola con cantina, campo e mezzi, corsi, idoneità, patentini, polizze e libretti sono centinaia di carte. Il gestionale le tiene in un archivio solo e apre con il lavoro da fare, non con i totali.',
      bullets: [
        'Cosa è fuori termine, cosa scade a breve, cosa manca',
        'Lo stato si legge a parole: «Scaduto da 12 giorni»',
        'Le voci scadute non si smorzano: sono il lavoro per primo',
      ],
      media: [screen('panoramica', 'La panoramica del gestionale: conformità complessiva, monitoraggio per area e il lavoro da fare', 'La panoramica, con dati di esempio.')],
      layout: 'media-right',
    },
    {
      id: 'regole',
      kicker: 'La regola',
      title: 'Le scadenze le decide la legge, non chi ricorda.',
      highlight: 'la legge',
      text:
        'Ogni corso ha la sua validità di legge: preposti ogni due anni, antincendio e primo soccorso ogni tre, RLS ogni anno. Con un rinnovo conta la versione che copre più a lungo; le precedenti restano come «rinnovate».',
      bullets: [
        'Una sola tabella delle validità per tutte le pagine',
        'La versione corrente si calcola in lettura',
        'Il registro misura l’archivio, non il cantiere: è scritto in pagina',
      ],
      media: [screen('corsi', 'I corsi di sicurezza con categoria, rilascio e scadenza', 'Corsi: categoria, rilascio e scadenza di ogni attestato.')],
      layout: 'media-left',
    },
    {
      id: 'traccia',
      kicker: 'La traccia',
      title: 'Ogni passaggio resta scritto, e ognuno fa solo il suo.',
      highlight: 'resta scritto',
      text:
        'Libretti e certificati si importano da PDF: il gestionale mostra i dati letti prima di salvare. Ogni fatto finisce in un registro che si aggiunge e non si modifica. Amministratore, editor e sola lettura: il sistema rifiuta ciò che il ruolo non permette.',
      bullets: [
        'Importazione in due passi: anteprima, poi conferma',
        'Eliminare nasconde il documento, ma non lo distrugge',
        'La cancellazione definitiva esige un amministratore e un motivo scritto',
      ],
      media: [
        screen('medicina', 'Medicina del lavoro: stato della sorveglianza sanitaria per ogni lavoratore', 'Medicina del lavoro: chi è in regola, in scadenza o fuori termine.'),
        screen('macchinari', 'I macchinari con revisione, bollo e assicurazione di ogni mezzo', 'Macchinari: revisione, bollo e assicurazione per ogni mezzo.'),
      ],
      layout: 'full',
    },
  ],

  features: [
    { icon: 'calendar', title: 'Un elenco solo', text: 'Corsi, idoneità, documenti e macchinari in un posto solo, in lista o a calendario.' },
    { icon: 'bell', title: 'Preavviso per tipo', text: 'La regola sta in un punto solo e vale per tutte le pagine.' },
    { icon: 'file', title: 'Importazione da PDF', text: 'Il documento viene letto e mostrato prima di salvare: correggi, poi confermi. Anche in blocco.' },
    { icon: 'scan', title: 'Libretti e targhe', text: 'La targa letta dal libretto è controllata sul formato italiano; se è dubbia, scegli.' },
    { icon: 'search', title: 'Duplicati e nomi', text: 'Corsi e mezzi doppi vengono segnalati; i nomi si abbinano anche con piccole differenze.' },
    { icon: 'map', title: 'Cantina e campo', text: 'Botti, fitofarmaci, planimetrie con zoom, inventario e segnalazione degli incidenti.' },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'Il gestionale, con dati di esempio',
    highlight: 'dati di esempio',
    lead: 'Schermate dell’applicazione vera, riempite con persone, mezzi e documenti inventati. L’archivio del cliente è riservato e non compare.',
    items: [
      { id: 'scadenze', label: 'Scadenze', media: screen('scadenze', 'Elenco delle scadenze', 'Scadenze'), note: 'Cinque tipi di scadenza in un elenco, con filtri col conteggio e vista a calendario.' },
      { id: 'panoramica', label: 'Panoramica', media: screen('panoramica', 'Panoramica del gestionale', 'Panoramica'), note: 'Conformità complessiva, monitoraggio per area e cosa sistemare per primo.' },
      { id: 'corsi', label: 'Corsi', media: screen('corsi', 'I corsi di sicurezza', 'Corsi'), note: 'Ogni attestato con la sua categoria e la scadenza di legge.' },
      { id: 'medicina', label: 'Medicina del lavoro', media: screen('medicina', 'Medicina del lavoro', 'Medicina'), note: 'Sorveglianza sanitaria per lavoratore, con preavviso a 60 giorni.' },
      { id: 'macchinari', label: 'Macchinari', media: screen('macchinari', 'I macchinari', 'Macchinari'), note: 'Revisione, bollo e assicurazione di ogni mezzo, con stato a parole.' },
    ],
  },

  tech: [
    {
      title: 'Una regola, un punto solo',
      text: 'Stati, preavvisi, formato delle date e badge delle scadenze sono definiti in un punto solo: cambiare una regola la cambia ovunque.',
      tags: ['Un solo punto di verità'],
    },
    {
      title: 'Registro che non si modifica',
      text: 'Ogni fatto è un evento che si aggiunge. Se la traccia non si scrive, l’operazione non va a buon fine: un registro che perde eventi in silenzio è peggio di nessuno.',
      tags: ['Tracciabilità', 'Privacy'],
    },
    {
      title: 'Accesso protetto, ruoli rispettati',
      text: 'L’archivio non è raggiungibile da chiunque e il ruolo decide cosa si può fare. La lettura dei PDF propone soltanto: nulla si salva senza conferma.',
      tags: ['Sicurezza', 'Conferma in due passi'],
    },
  ],

  cta: {
    title: 'Vuoi vedere quanto di quello che scade stai già controllando?',
    highlight: 'già controllando',
    text:
      'Il gestionale è l’archivio interno del cliente e lo mostriamo con dati di esempio: se ne vuoi uno così, scrivici.',
  },
} satisfies Landing;
