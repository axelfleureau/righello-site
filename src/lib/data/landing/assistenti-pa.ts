import type { Landing } from './types';

/**
 * Assistenti AI per i Comuni — fatti dal repository del bot WhatsApp di un Comune del Friuli Venezia Giulia
 * (server.js, lib/anonymize.js, lib/grounding.js, data/*.json), dal monitor esterno e dal SAL del servizio.
 * Il Comune non è nominato. Il bot non ha un'interfaccia propria: niente schermate, solo l'infografica illustrativa.
 * Non si riportano numeri di contatti, di messaggi o di costi.
 */
export default {
  tagline: 'Risponde ai cittadini con le pagine del Comune. Se non trova, lo dice.',
  metrics: [
    { value: 431, label: 'domande di prova nel repository', note: 'quattro elenchi di domande di collaudo: 110 + 88 + 183 + 50' },
    { value: 9, label: 'tipi di dato personale coperti da regole fisse', note: 'email, IBAN, codice fiscale, targa, documento, telefono, indirizzo, partita IVA, numeri (lib/pii-redact.js)' },
    { text: '≈ 1,2 s', label: 'per rispondere (p95) nelle prove', note: 'suite di conversazioni e di conoscenza del 15 settembre 2026' },
    { value: 5, label: 'tipi di cifra che devono stare nella fonte', note: 'tempi, costi, orari, date, telefoni (lib/grounding.js)' },
  ],
  chapters: [
    {
      id: 'risposte-vere',
      kicker: 'Il problema',
      title: 'Un cittadino chiede l\'orario di un ufficio. Una risposta inventata è peggio di nessuna.',
      highlight: 'peggio di nessuna',
      text:
        'Un assistente generico risponde a tutto, anche quando non sa. Con un Comune è un rischio vero: un orario sbagliato è una persona che si presenta a uno sportello chiuso. Questo assistente parte da un altro punto: le risposte vengono dalle pagine ufficiali del Comune, e l\'intelligenza artificiale generativa interviene solo come ripiego, per ciò che le fonti non coprono.',
      bullets: [
        'Prima le risposte curate e verificate, poi le fonti del Comune, per ultima la generazione',
        'Eventi e novità vengono letti dalle fonti ufficiali, non ricordati',
        'Le risposte rimandano alla pagina ufficiale o all\'ufficio competente',
      ],
      layout: 'full',
    },
    {
      id: 'non-inventa',
      kicker: 'Il come',
      title: 'Giorni, importi e orari si scrivono solo se stanno nella fonte.',
      highlight: 'solo se stanno nella fonte',
      text:
        'Una frase scorrevole può essere sbagliata. Per questo ogni risposta generata passa da un controllo: durate, importi, orari, date e numeri di telefono devono comparire nelle pagine del Comune. Se non ci sono, la frase viene tolta e l\'assistente dice che la pagina non indica quel dato, rimandando all\'ufficio giusto.',
      bullets: [
        'Il controllo guarda le cifre, che sono ciò su cui un cittadino agisce',
        'La risposta onesta («la pagina non lo indica») batte quella plausibile',
        'Dopo l\'invio, una seconda lettura segnala i difetti senza cambiare la risposta già data',
      ],
      layout: 'full',
    },
    {
      id: 'privacy',
      kicker: 'La privacy',
      title: 'I dati personali vengono coperti prima di arrivare al modello.',
      highlight: 'coperti prima',
      text:
        'Chi scrive a un Comune può metterci un telefono, un codice fiscale, un indirizzo. Prima che il testo raggiunga un modello esterno, quei dati diventano segnaposto. Un riconoscitore locale prende anche nomi e indirizzi in forma libera; se è lento o non risponde, restano le regole fisse: il servizio non dipende mai da lui. Quando la risposta torna, i segnaposto si rimettono al loro posto.',
      bullets: [
        'Due livelli: riconoscitore locale per nomi e indirizzi, regole fisse per i dati strutturati',
        'Se il primo non risponde entro 2,5 secondi, si prosegue con le regole',
        'Il consenso si registra all\'inizio e si ritira con una parola',
      ],
      layout: 'full',
    },
  ],
  graphic: 'pa-assistant',
  features: [
    { icon: 'link', title: 'Risposte con la fonte', text: 'Le risposte nascono dalle pagine del Comune e rimandano alla pagina ufficiale o all\'ufficio giusto.' },
    { icon: 'shield', title: 'Dice quando non sa', text: 'Se la pagina non contiene l\'informazione, lo ammette e indica l\'ufficio, senza inventare.' },
    { icon: 'scan', title: 'Cifre controllate', text: 'Tempi, costi, orari, date e telefoni compaiono solo se sono nelle fonti.' },
    { icon: 'lock', title: 'Dati personali coperti', text: 'Telefoni, e-mail, codici fiscali, IBAN, targhe e indirizzi diventano segnaposto prima del modello.' },
    { icon: 'users', title: 'Consenso e revoca', text: 'Il consenso si registra al primo messaggio e si revoca scrivendo una parola. Un solo cancello per tutte le strade.' },
    { icon: 'calendar', title: 'Eventi aggiornati', text: 'Eventi e novità vengono recuperati dalle fonti ufficiali, con la differenza fra «oggi», «stasera» e «nel fine settimana».' },
    { icon: 'message', title: 'Capisce il senso', text: 'Interpreta la domanda per significato, non per parola chiave, e ripiega su regole fisse se serve.' },
    { icon: 'bell', title: 'Sorvegliato da fuori', text: 'Un controllo esterno interroga il servizio ogni minuto e manda un\'e-mail se resta giù.' },
  ],
  tech: [
    {
      title: 'Una pipeline sola, tutte le strade',
      text: 'Le richieste arrivano da più percorsi, ma passano dallo stesso cancello del consenso e dalla stessa pipeline di risposta: nessun percorso salta i controlli.',
      tags: ['Node.js', 'Pipeline unica', 'Cancello del consenso'],
    },
    {
      title: 'Le pagine del Comune, sempre fresche',
      text: 'L\'indice delle pagine ufficiali si aggiorna a differenze e si salva solo se un documento è cambiato. Il bot lavora su una copia in memoria, non rilegge il sito a ogni domanda.',
      tags: ['Indice del sito', 'Aggiornamento a delta'],
    },
    {
      title: 'Anonimizzazione che non blocca mai',
      text: 'Riconoscitore locale con tempo massimo e ripiego automatico sulle regole fisse. I segnaposto che il modello ripete vengono ripristinati e quelli residui tolti prima di rispondere.',
      tags: ['NER locale', 'Espressioni regolari', 'Fail-safe'],
    },
    {
      title: 'Collaudo che cresce da solo',
      text: 'Ogni segnalazione diventa un test permanente. Quattro elenchi di domande di collaudo, controlli prima del rilascio e una revisione dopo l\'invio, con un modello più capace, che non tocca la risposta.',
      tags: ['Test di regressione', 'Mocha', 'Revisione AI'],
    },
    {
      title: 'Si misura, non si indovina',
      text: 'Ogni risposta registra durata e stadi attraversati. Il profilo di esecuzione ha trovato una scansione ripetuta dei contatti: tolta quella, la risposta è scesa a circa un secondo. Un monitor esterno avvisa se il servizio non risponde per tre minuti.',
      tags: ['Profilo CPU', 'Monitor esterno', 'Cloudflare Workers'],
    },
  ],
  cta: {
    title: 'Un assistente per il tuo Comune.',
    highlight: 'per il tuo Comune',
    text: 'Il servizio è in sperimentazione (beta) per un Comune del Friuli Venezia Giulia, ed è provabile dal vivo scrivendogli su WhatsApp. Se vuoi un assistente così per il tuo ente, parliamone.',
  },
} satisfies Landing;
