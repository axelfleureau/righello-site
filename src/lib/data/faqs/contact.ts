import type { Faq } from './types';
import { CONTACT } from '../contact';

export const contactFaqs: Faq[] = [
  {
    question: 'Quanto ci mettete a rispondere?',
    answer: `Rispondiamo ${CONTACT.reply}. Se è urgente, scrivilo nel messaggio o mandaci un messaggio su WhatsApp.`
  },
  {
    question: 'Posso prenotare una chiamata?',
    answer:
      'Sì. La prima chiamata è gratuita: scrivici dal modulo o su WhatsApp e ti proponiamo alcune date.'
  },
  {
    question: 'Il preventivo è gratuito?',
    answer: 'Sì, è gratuito e fatto su misura, con tempi e consegne scritti chiari.'
  },
  {
    question: 'Quanto costa lavorare con voi?',
    structured: false,
    answer:
      'Dipende dal progetto. Un sito aziendale parte da qualche migliaio di euro; per social e pubblicità il costo dipende dai servizi e dal budget da gestire. Lo definiamo insieme nella prima chiamata.'
  },
  {
    question: 'Lavorate solo in Veneto?',
    answer: `No. Lavoriamo soprattutto in Friuli-Venezia Giulia, Veneto e Nord Italia, e da remoto con clienti in tutta Italia. La base operativa è a ${CONTACT.office.split(' - ')[0]}.`
  }
];
