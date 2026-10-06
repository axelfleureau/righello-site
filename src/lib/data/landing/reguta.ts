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
      title: 'Ogni certificato scade in un momento diverso. Il controllo arriva quando serve la prova.',
      highlight: 'Il controllo arriva quando serve la prova.',
      text:
        'Per un’azienda vinicola con cantina, campo e mezzi, corsi di sicurezza, idoneità mediche, patentini, polizze e libretti sono centinaia di carte con date diverse. Il gestionale le tiene in un archivio solo e, al posto dell’inventario, mostra il lavoro da fare: cosa è fuori termine, cosa scade a breve, cosa non risulta in archivio.',
      bullets: [
        'La panoramica apre con il lavoro da sistemare, non con i totali',
        'Lo stato si legge a parole («Scaduto da 12 giorni»); il colore rinforza soltanto',
        'Le voci scadute non si smorzano: sono il lavoro da fare per primo',
      ],
      media: [
        screen('panoramica', 'La panoramica del gestionale: conformità complessiva, monitoraggio per area e il lavoro da fare', 'La panoramica, con dati di esempio.'),
        screen('scadenze', 'L’elenco unico delle scadenze con filtri e vista a calendario', 'Tutte le scadenze, con filtri e calendario.'),
      ],
      layout: 'media-right',
    },
    {
      id: 'regole',
      kicker: 'La regola',
      title: 'Le scadenze le decide la legge, non chi ricorda.',
      highlight: 'la legge',
      text:
        'Ogni corso ha la sua validità di legge: preposti ogni due anni, antincendio e primo soccorso ogni tre, RLS ogni anno, formazione generale una volta sola. Quando carichi un rinnovo conta la versione che copre più a lungo; quelle precedenti restano in elenco come «rinnovate» e non entrano nei conteggi. Chi manca di un corso obbligatorio compare tra le cose che non risultano in archivio.',
      bullets: [
        'Una sola tabella delle validità per estrazione, scadenza, filtri e registro degli obblighi',
        'La versione corrente si calcola in lettura: nessun dato da correggere a mano',
        'Il registro misura l’archivio, non il cantiere: lo dice scritto sulla pagina',
      ],
      media: [
        screen('corsi', 'I corsi di sicurezza con categoria, rilascio e scadenza', 'Corsi: categoria, rilascio e scadenza di ogni attestato.'),
        screen('medicina', 'Medicina del lavoro: stato della sorveglianza sanitaria per ogni lavoratore', 'Medicina del lavoro: chi è in regola, in scadenza o fuori termine.'),
      ],
      layout: 'media-left',
    },
    {
      id: 'traccia',
      kicker: 'La traccia',
      title: 'Dal PDF all’archivio, e ogni passaggio resta scritto.',
      highlight: 'resta scritto',
      text:
        'Libretti e certificati si importano da PDF: il gestionale legge i dati e te li mostra prima di salvare. Poi ogni documento porta con sé chi lo ha caricato e quando, e ogni fatto finisce in un registro che si aggiunge e non si modifica mai. In un’ispezione la domanda non è «cosa c’è adesso» ma «cosa c’era allora, e chi lo ha messo lì».',
      bullets: [
        'Importazione in due passi: anteprima e correzione, poi conferma',
        'Eliminare nasconde il documento, ma non lo distrugge né tocca il file',
        'La cancellazione definitiva esige un amministratore autenticato e un motivo scritto',
      ],
      media: [screen('macchinari', 'I macchinari con revisione, bollo e assicurazione di ogni mezzo', 'Macchinari: revisione, bollo e assicurazione per ogni mezzo.')],
      layout: 'media-right',
    },
  ],

  features: [
    { icon: 'calendar', title: 'Scadenze in un elenco', text: 'Corsi, idoneità, documenti, documenti aziendali e macchinari in un posto solo, in lista o a calendario.' },
    { icon: 'bell', title: 'Preavviso per tipo', text: '30 giorni per quasi tutto, 60 per le idoneità sanitarie. La regola sta in un punto solo e vale per tutte le pagine.' },
    { icon: 'file', title: 'Importazione da PDF', text: 'Il documento viene letto e mostrato prima di salvare: correggi, poi confermi. Anche in blocco.' },
    { icon: 'scan', title: 'Libretti e targhe', text: 'La targa letta dal libretto è controllata sul formato italiano; se è dubbia, scegli tra le alternative.' },
    { icon: 'search', title: 'Duplicati e nomi', text: 'Corsi e mezzi doppi vengono segnalati; i nomi dei lavoratori si abbinano anche con piccole differenze di scrittura.' },
    { icon: 'lock', title: 'Archivio tracciato', text: 'Chi ha caricato, quando, cosa è cambiato. Un registro che si aggiunge e non si modifica.' },
    { icon: 'shield', title: 'Ruoli', text: 'Amministratore, editor e sola lettura: chi è in sola lettura non può cambiare niente, e il sistema lo rifiuta.' },
    { icon: 'map', title: 'Cantina e campo', text: 'Botti, fitofarmaci, planimetrie con zoom e rotazione, inventario e segnalazione degli incidenti.' },
  ],

  demo: {
    kicker: 'Dal vivo',
    title: 'Il gestionale, con dati di esempio',
    highlight: 'dati di esempio',
    lead: 'Schermate dell’applicazione vera, riempite con persone, mezzi e documenti inventati. L’archivio del cliente è riservato e non compare.',
    items: [
      { id: 'panoramica', label: 'Panoramica', media: screen('panoramica', 'Panoramica del gestionale', 'Panoramica'), note: 'Conformità complessiva, monitoraggio per area e cosa sistemare per prime.' },
      { id: 'scadenze', label: 'Scadenze', media: screen('scadenze', 'Elenco delle scadenze', 'Scadenze'), note: 'Cinque tipi di scadenza in un elenco, con filtri col conteggio e vista a calendario.' },
      { id: 'corsi', label: 'Corsi', media: screen('corsi', 'I corsi di sicurezza', 'Corsi'), note: 'Ogni attestato con la sua categoria e la scadenza di legge.' },
      { id: 'medicina', label: 'Medicina del lavoro', media: screen('medicina', 'Medicina del lavoro', 'Medicina'), note: 'Sorveglianza sanitaria per lavoratore, con preavviso a 60 giorni.' },
      { id: 'macchinari', label: 'Macchinari', media: screen('macchinari', 'I macchinari', 'Macchinari'), note: 'Revisione, bollo e assicurazione di ogni mezzo, con stato a parole.' },
    ],
  },

  tech: [
    {
      title: 'Una regola, un punto solo',
      text: 'Stati, preavvisi, formato delle date e badge delle scadenze sono definiti in un punto solo. Prima ogni pagina rifaceva tutto a modo suo; ora cambiare una regola la cambia ovunque.',
      tags: ['Un solo punto di verità'],
    },
    {
      title: 'Registro che non si modifica',
      text: 'Ogni fatto sull’archivio è un evento che si aggiunge e non si modifica. Se la traccia non si scrive, l’operazione non va a buon fine: un registro che perde eventi in silenzio è peggio di nessun registro.',
      tags: ['Tracciabilità', 'Privacy'],
    },
    {
      title: 'Importazione con anteprima',
      text: 'La lettura dei PDF passa da un unico punto che registra uso e costo. Il risultato è una proposta da vedere accanto al documento; nulla si salva senza conferma.',
      tags: ['Lettura da PDF', 'Intelligenza artificiale', 'Conferma in due passi'],
    },
    {
      title: 'Accesso protetto, ruoli rispettati',
      text: 'L’archivio non è raggiungibile da chiunque: l’accesso è protetto e il ruolo di ognuno decide cosa può fare. Chi è in sola lettura non può cambiare niente, e il sistema rifiuta ogni tentativo.',
      tags: ['Sicurezza', 'Ruoli'],
    },
  ],

  cta: {
    title: 'Vuoi vedere quanto di quello che scade stai già controllando?',
    highlight: 'già controllando',
    text:
      'Il gestionale non ha un indirizzo pubblico: è l’archivio interno del cliente, e lo mostriamo con dati di esempio. Se vuoi un archivio di conformità fatto così, scrivici. Per lo stesso marchio, Righello cura anche i contenuti sui social.',
  },
} satisfies Landing;
