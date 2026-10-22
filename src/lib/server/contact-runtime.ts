/** I collegamenti veri del percorso contatti: SendGrid, orologio, log, ambiente, canali del sito. Lo stato sta qui, in memoria del processo. */
import { randomUUID } from 'node:crypto';
import { CONTACT, whatsappHref } from '$lib/data/contact';
import { improveClientBody } from './contact-ai';
import { createContactState, type ContactDeps } from './contact-service';
import { getUncachableSendGridClient } from './sendgrid';

const FROM_EMAIL = 'hello@wearerighello.com';

export const contactState = createContactState();

export function createContactDeps(): ContactDeps {
  return {
    now: () => Date.now(),
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    sendMail: async ({ fromName, ...message }) => {
      const { client, fromEmail } = await getUncachableSendGridClient();
      await client.send({ ...message, from: { email: fromEmail || FROM_EMAIL, name: fromName } });
    },
    improveClientBody,
    randomId: () => randomUUID(),
    log: {
      info: (line) => console.info(line),
      warn: (line) => console.warn(line),
      error: (line) => console.error(line),
    },
    channels: { reply: CONTACT.reply, email: CONTACT.email, whatsappHref },
    env: {
      CONTACT_AI: process.env.CONTACT_AI,
      CONTACT_DRY_RUN: process.env.CONTACT_DRY_RUN,
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
  };
}
