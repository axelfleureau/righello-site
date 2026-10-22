/** Cosa succede dopo aver scritto: lo stesso racconto nella pagina /contatti e nella conferma del foglio. Sta a parte per non viaggiare con ogni pagina. */
import { CONTACT } from './contact';

export const CONTACT_STEPS = [
  { title: 'Leggiamo il messaggio', text: `Arriva a ${CONTACT.recipients}.` },
  { title: 'Ti rispondiamo', text: `${CONTACT.reply[0].toUpperCase()}${CONTACT.reply.slice(1)}, con alcune date per una chiamata conoscitiva gratuita.` },
  { title: 'Ricevi una proposta', text: 'Dopo la chiamata, un preventivo gratuito con tempi e consegne chiari.' },
] as const;

