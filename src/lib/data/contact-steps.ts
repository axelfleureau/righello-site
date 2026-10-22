/**
 * Cosa succede dopo aver scritto: lo stesso racconto nella pagina /contatti e nella conferma del foglio. Sta a parte per non viaggiare con ogni pagina.
 * `when` e' il tempo di ciascun passo e dice solo cio' che il sito dichiara gia' (la risposta entro `CONTACT.reply`; la richiesta arriva al team
 * nel momento dell'invio, perche' il server la consegna prima di rispondere): niente tempi inventati.
 */
import { CONTACT } from './contact';

export const CONTACT_STEPS = [
  { when: 'Adesso', title: 'Leggiamo il messaggio', text: `Arriva ${CONTACT.recipientsTo}.` },
  { when: CONTACT.reply[0].toUpperCase() + CONTACT.reply.slice(1), title: 'Ti rispondiamo', text: 'Con alcune date per una chiamata conoscitiva gratuita.' },
  { when: 'Dopo la chiamata', title: 'Ricevi una proposta', text: 'Un preventivo gratuito con tempi e consegne chiari.' },
] as const;
