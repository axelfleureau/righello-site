import type { Landing } from './types';

/**
 * Assistenti AI per i Comuni — fatti verificati sul bot WhatsApp di un Comune del Friuli Venezia Giulia.
 * Il Comune non è nominato. Il bot non ha un'interfaccia propria: niente schermate, solo l'infografica illustrativa.
 * Non si riportano numeri di contatti, di messaggi o di costi.
 */
export default {
  variant: 'pa',
  tagline: 'Risponde ai cittadini con le pagine del Comune. Se non trova, lo dice.',
  metrics: [
    { value: 431, label: 'domande di prova', note: 'quattro elenchi di domande di collaudo: 110 + 88 + 183 + 50' },
    { value: 9, label: 'tipi di dato personale coperti da regole fisse', note: 'email, IBAN, codice fiscale, targa, documento, telefono, indirizzo, partita IVA, numeri' },
    { text: '≈ 1,2 s', label: 'per rispondere (p95) nelle prove', note: 'suite di conversazioni e di conoscenza del 15 settembre 2026' },
    { value: 5, label: 'tipi di cifra che devono stare nella fonte', note: 'tempi, costi, orari, date, telefoni' },
  ],
  chapters: [
    {
      id: 'risposte-vere',
      kicker: 'Il problema',
      title: 'Un orario sbagliato è una persona davanti a uno sportello chiuso.',
      highlight: 'sportello chiuso',
      text:
        'Un assistente generico risponde a tutto, anche quando non sa. Questo parte dalle pagine ufficiali del Comune: l\'intelligenza artificiale generativa interviene solo come ripiego. Giorni, importi e orari si scrivono solo se stanno nella fonte; se non ci sono, lo dice e rimanda all\'ufficio.',
      bullets: [
        'Prima risposte curate, poi fonti del Comune, per ultima la generazione',
        'Eventi e novità vengono letti dalle fonti ufficiali, non ricordati',
        'Il controllo guarda tempi, costi, orari, date e telefoni',
      ],
      layout: 'full',
    },
    {
      id: 'privacy',
      kicker: 'La privacy',
      title: 'I dati personali vengono coperti prima di arrivare al modello.',
      highlight: 'coperti prima',
      text:
        'Chi scrive a un Comune può indicare un telefono, un codice fiscale, un indirizzo. Prima che il testo raggiunga un modello esterno quei dati diventano segnaposto, rimessi al loro posto nella risposta. Se il riconoscitore locale non risponde, bastano le regole fisse.',
      bullets: [
        'Riconoscitore locale per nomi e indirizzi, regole fisse per i dati strutturati',
        'Se il primo non risponde in fretta, si prosegue con le regole',
        'Il consenso si registra all\'inizio e si ritira con una parola',
      ],
      layout: 'full',
    },
  ],
  graphic: 'pa-assistant',
  how: {
    title: 'Dalla domanda alla risposta con la fonte',
    highlight: 'con la fonte',
    lead: 'Il cittadino chiede, i dati personali si coprono, l\'assistente cerca nelle fonti del Comune e risponde. Esempio illustrativo: tocca un passaggio.',
  },
  features: [
    { icon: 'link', title: 'Risposte con fonte', text: 'Nascono dalle pagine del Comune e rimandano alla pagina ufficiale o all\'ufficio giusto.' },
    { icon: 'shield', title: 'Ammette i limiti', text: 'Se la pagina non contiene l\'informazione, lo dice e indica l\'ufficio, senza inventare.' },
    { icon: 'lock', title: 'Dati personali coperti', text: 'Telefoni, e-mail, codici fiscali, IBAN, targhe e indirizzi diventano segnaposto prima del modello.' },
    { icon: 'users', title: 'Consenso e revoca', text: 'Registrato al primo messaggio, revocato con una parola: un solo cancello per ogni percorso.' },
    { icon: 'calendar', title: 'Eventi aggiornati', text: 'Eventi e novità arrivano dalle fonti ufficiali, distinguendo «oggi», «stasera» e «nel fine settimana».' },
    { icon: 'message', title: 'Capisce il senso', text: 'Interpreta la domanda per significato, non per parola chiave, e ripiega su regole fisse se serve.' },
  ],
  tech: [
    {
      title: 'Una strada sola',
      text: 'Le richieste arrivano da più percorsi ma passano dallo stesso cancello del consenso e dalla stessa catena di risposta: nessun percorso salta i controlli.',
      tags: ['Pipeline unica', 'Consenso'],
    },
    {
      title: 'Pagine del Comune sempre fresche',
      text: 'L\'indice delle pagine ufficiali si aggiorna a differenze e si salva solo se un documento è cambiato. L\'assistente lavora su una copia già pronta, per questo risponde in fretta.',
      tags: ['Fonti ufficiali', 'Risposte veloci'],
    },
    {
      title: 'Collaudo che cresce da solo',
      text: 'Ogni segnalazione diventa un test permanente: quattro elenchi di domande, controlli prima del rilascio e una revisione dopo l\'invio che segnala i difetti senza toccare la risposta.',
      tags: ['Test automatici', 'Revisione AI'],
    },
    {
      title: 'Si misura, non si indovina',
      text: 'Ogni risposta registra durata e passaggi. Così si è trovato un rallentamento nascosto: tolto quello, la risposta è scesa a circa un secondo. Un controllo esterno avvisa se il servizio resta giù.',
      tags: ['Controllo continuo', 'Prestazioni'],
    },
  ],
  cta: {
    title: 'Un assistente per il tuo Comune.',
    highlight: 'per il tuo Comune',
    text: 'Il servizio è in sperimentazione (beta) per un Comune del Friuli Venezia Giulia: se vuoi un assistente così per il tuo ente, parliamone.',
  },
} satisfies Landing;
