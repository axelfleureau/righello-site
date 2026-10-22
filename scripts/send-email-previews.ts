import 'dotenv/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getUncachableSendGridClient } from '../src/lib/server/sendgrid';
import { analyzeLead } from '../src/lib/server/contact-analysis';
import {
  buildClientEmailHtml,
  buildClientEmailText,
  buildClientSubject,
  buildPreviewContactForm,
  buildTeamEmailHtml,
  buildTeamEmailText,
  buildTeamSubject,
  type EmailChannels,
} from '../src/lib/server/email-templates';

// Fuori da SvelteKit `$lib/data/contact` non si carica (variabili pubbliche): per l'anteprima bastano questi valori.
// Quelli veri li legge il server da `CONTACT` (src/lib/data/contact.ts).
const channels: EmailChannels = {
  reply: 'entro 72 ore lavorative',
  email: 'hello@wearerighello.com',
  whatsappHref: (text) => `https://wa.me/393393998351?text=${encodeURIComponent(text)}`,
};

const recipient = process.argv[2] || 'axel@wearerighello.com';
const form = buildPreviewContactForm();
const analysis = analyzeLead(form);
// Testo vuoto = quello di sempre, deterministico (nessun modello nel percorso del contatto).
const enhancedBody = '';

const previews = [
  {
    key: 'client-confirmation',
    subject: `[Preview Righello] ${buildClientSubject(form)}`,
    html: buildClientEmailHtml(form, enhancedBody, channels),
    text: buildClientEmailText(form, enhancedBody, channels),
    replyTo: undefined,
  },
  {
    key: 'team-notification',
    subject: `[Preview Righello] ${buildTeamSubject(form, analysis.priority)}`,
    html: buildTeamEmailHtml(form, analysis),
    text: buildTeamEmailText(form, analysis),
    replyTo: { email: form.email, name: form.name },
  },
];

const previewDir = '/tmp/righello-email-previews';
await mkdir(previewDir, { recursive: true });

for (const preview of previews) {
  await writeFile(join(previewDir, `${preview.key}.html`), preview.html, 'utf8');
}

console.log(`Wrote HTML previews to ${previewDir}`);

try {
  const { client, fromEmail } = await getUncachableSendGridClient();
  const senderEmail = fromEmail || 'hello@wearerighello.com';

  for (const preview of previews) {
    await client.send({
      to: recipient,
      from: { email: senderEmail, name: 'Righello Preview' },
      ...(preview.replyTo ? { replyTo: preview.replyTo } : {}),
      subject: preview.subject,
      html: preview.html,
      text: preview.text,
    });

    console.log(`Sent ${preview.key} preview to ${recipient}`);
  }
} catch (error) {
  const message = error instanceof Error ? error.message : 'Email provider unavailable';
  console.warn(`Email send skipped: ${message}`);
  process.exitCode = 1;
}
