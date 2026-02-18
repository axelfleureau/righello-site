import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUncachableSendGridClient } from '$lib/server/sendgrid';
import { openai } from '$lib/server/openai';

const FROM_EMAIL = 'hello@wearerighello.com';
const TEAM_EMAILS = ['edis@wearerighello.com', 'paolo@wearerighello.com', 'axel@wearerighello.com'];

interface ContactForm {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

function validateForm(data: unknown): ContactForm | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (
    typeof d.name !== 'string' || d.name.trim().length === 0 ||
    typeof d.email !== 'string' || d.email.trim().length === 0 || !d.email.includes('@') ||
    typeof d.message !== 'string' || d.message.trim().length === 0
  ) {
    return null;
  }
  return {
    name: d.name.trim(),
    email: d.email.trim(),
    company: typeof d.company === 'string' ? d.company.trim() : '',
    service: typeof d.service === 'string' ? d.service.trim() : '',
    budget: typeof d.budget === 'string' ? d.budget.trim() : '',
    message: d.message.trim(),
  };
}

async function enhanceClientEmail(form: ContactForm): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-5.2',
      messages: [
        {
          role: 'system',
          content: `Sei un copywriter professionale per Righello, una premium growth agency italiana. Scrivi in italiano con tono caldo, professionale e rassicurante.`
        },
        {
          role: 'user',
          content: `Un cliente di nome ${form.name} ci ha contattato${form.service ? ` per "${form.service}"` : ''}${form.budget ? ` con budget "${form.budget}"` : ''}. Il suo messaggio originale è:

"${form.message}"

Riscrivi questo messaggio come corpo di un'email di conferma inviata al cliente. Deve:
- Ringraziare il cliente per nome
- Riconoscere il servizio di interesse (se presente)
- Confermare che il team risponderà entro 72 ore lavorative
- Essere caloroso ma professionale, coerente con un'agenzia premium
- NON includere oggetto, saluti finali o firma — solo i paragrafi del corpo
- Scrivi in italiano
- Mantieni il testo breve (3-4 paragrafi massimo)`
        }
      ],
      max_completion_tokens: 500,
    });
    return completion.choices[0]?.message?.content || '';
  } catch (err) {
    console.error('OpenAI client email enhancement failed:', err);
    return '';
  }
}

async function generateLeadAnalysis(form: ContactForm): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-5.2',
      messages: [
        {
          role: 'system',
          content: `Sei un analista commerciale per Righello, una growth agency italiana. Rispondi in italiano.`
        },
        {
          role: 'user',
          content: `Analizza questo lead in 2-3 frasi in italiano. Valuta: valore potenziale, segnali di urgenza, approccio consigliato.

Nome: ${form.name}
Email: ${form.email}
Azienda: ${form.company || 'Non specificata'}
Servizio: ${form.service || 'Non specificato'}
Budget: ${form.budget || 'Non specificato'}
Messaggio: "${form.message}"`
        }
      ],
      max_completion_tokens: 300,
    });
    return completion.choices[0]?.message?.content || '';
  } catch (err) {
    console.error('OpenAI lead analysis failed:', err);
    return '';
  }
}

function buildClientEmailHtml(form: ContactForm, enhancedBody: string): string {
  const bodyContent = enhancedBody || `
    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">Ciao ${form.name},</p>
    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio${form.service ? ` riguardo a "${form.service}"` : ''} e il nostro team lo sta già esaminando.</p>
    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">Ti risponderemo entro 72 ore lavorative con una proposta personalizzata.</p>
  `;

  const formattedBody = enhancedBody
    ? enhancedBody.split('\n').filter(p => p.trim()).map(p => `<p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">${p}</p>`).join('')
    : bodyContent;

  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background-color: #050505; padding: 32px 40px; border-radius: 16px 16px 0 0; text-align: center;">
              <img src="https://www.wearerighello.com/logo-white.png" alt="Righello" height="36" style="height: 36px; width: auto;" />
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px;">
              ${formattedBody}
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td style="background-color: #D6487E; border-radius: 8px; text-align: center;">
                    <a href="https://www.wearerighello.com" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px;">Scopri i Nostri Progetti</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 32px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #eeeeee;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #999999; text-align: center;">Righello — Growth Agency</p>
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #bbbbbb; text-align: center;">Via Pio X 21, Mestre - Venezia</p>
              <p style="margin: 0; font-size: 13px; color: #bbbbbb; text-align: center;">
                <a href="mailto:hello@wearerighello.com" style="color: #D6487E; text-decoration: none;">hello@wearerighello.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildTeamEmailHtml(form: ContactForm, leadAnalysis: string): string {
  const analysisSection = leadAnalysis
    ? `<tr>
        <td style="padding: 24px; background-color: #FFF5F8; border-radius: 12px; border-left: 4px solid #D6487E; margin-top: 24px;">
          <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #D6487E; font-weight: 700;">🤖 Analisi AI del Lead</h3>
          ${leadAnalysis.split('\n').filter(p => p.trim()).map(p => `<p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.6; color: #555555;">${p}</p>`).join('')}
        </td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background-color: #050505; padding: 24px 40px; border-radius: 16px 16px 0 0; text-align: center;">
              <img src="https://www.wearerighello.com/logo-white.png" alt="Righello" height="28" style="height: 28px; width: auto;" />
              <p style="margin: 8px 0 0 0; font-size: 13px; color: #D6487E; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Nuovo Contatto</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Nome</span><br/>
                    <span style="font-size: 16px; color: #333333; font-weight: 500;">${form.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Email</span><br/>
                    <a href="mailto:${form.email}" style="font-size: 16px; color: #D6487E; text-decoration: none; font-weight: 500;">${form.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Azienda</span><br/>
                    <span style="font-size: 16px; color: #333333; font-weight: 500;">${form.company || '—'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Servizio</span><br/>
                    <span style="font-size: 16px; color: #333333; font-weight: 500;">${form.service || '—'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Budget</span><br/>
                    <span style="font-size: 16px; color: #333333; font-weight: 600;">${form.budget || '—'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Messaggio</span><br/>
                    <p style="margin: 8px 0 0 0; font-size: 15px; line-height: 1.6; color: #333333; background-color: #f9f9f9; padding: 16px; border-radius: 8px;">${form.message}</p>
                  </td>
                </tr>
                ${analysisSection}
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 24px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; font-size: 13px; color: #bbbbbb; text-align: center;">Righello — Via Pio X 21, Mestre - Venezia</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const POST: RequestHandler = async ({ request }) => {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, error: 'Dati non validi' }, { status: 400 });
  }

  const form = validateForm(data);
  if (!form) {
    return json({ success: false, error: 'Compila tutti i campi obbligatori (nome, email, messaggio)' }, { status: 400 });
  }

  const [enhancedBody, leadAnalysis] = await Promise.all([
    enhanceClientEmail(form),
    generateLeadAnalysis(form),
  ]);

  const clientHtml = buildClientEmailHtml(form, enhancedBody);
  const teamHtml = buildTeamEmailHtml(form, leadAnalysis);

  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const senderEmail = fromEmail || FROM_EMAIL;

    await Promise.all([
      client.send({
        to: form.email,
        from: { email: senderEmail, name: 'Righello' },
        subject: `Grazie ${form.name}! Abbiamo ricevuto il tuo messaggio — Righello`,
        html: clientHtml,
      }),
      client.send({
        to: TEAM_EMAILS,
        from: { email: senderEmail, name: 'Righello Contact Form' },
        replyTo: { email: form.email, name: form.name },
        subject: `📩 Nuovo contatto: ${form.name}${form.company ? ` — ${form.company}` : ''}`,
        html: teamHtml,
      }),
    ]);

    return json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    return json({ success: false, error: 'Errore nell\'invio dell\'email. Riprova più tardi.' }, { status: 500 });
  }
};
