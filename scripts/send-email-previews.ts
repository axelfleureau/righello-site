import 'dotenv/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getUncachableSendGridClient } from '../src/lib/server/sendgrid';
import {
  buildClientEmailHtml,
  buildClientEmailText,
  buildClientSubject,
  buildPreviewContactForm,
  buildPreviewLeadAnalysis,
  buildTeamEmailHtml,
  buildTeamEmailText,
  buildTeamSubject,
  getLeadPriority,
} from '../src/lib/server/email-templates';

const recipient = process.argv[2] || 'axel@wearerighello.com';
const form = buildPreviewContactForm();
const priority = getLeadPriority(form.budget);
const leadAnalysis = buildPreviewLeadAnalysis();
const enhancedBody = [
  `Ciao ${form.name}, grazie per averci scritto.`,
  'Il tema che ci hai indicato è interessante perché unisce sito, acquisizione lead e automazioni: sono tre pezzi che funzionano davvero solo quando vengono progettati insieme.',
  'Abbiamo ricevuto tutto e ti risponderemo entro 72 ore lavorative con un primo riscontro concreto sui prossimi passi.'
].join('\n\n');

const previews = [
  {
    key: 'client-confirmation',
    subject: `[Preview Righello] ${buildClientSubject(form)}`,
    html: buildClientEmailHtml(form, enhancedBody),
    text: buildClientEmailText(form, enhancedBody),
    replyTo: undefined,
  },
  {
    key: 'team-notification',
    subject: `[Preview Righello] ${buildTeamSubject(form, priority)}`,
    html: buildTeamEmailHtml(form, leadAnalysis, priority),
    text: buildTeamEmailText(form, leadAnalysis, priority),
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
