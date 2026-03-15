import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUncachableSendGridClient } from '$lib/server/sendgrid';
import { getOpenAI } from '$lib/server/openai';

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

function escHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getLeadPriority(budget: string): { label: string; color: string; bg: string } {
  const b = budget.toLowerCase().trim();
  const digits = b.replace(/[^0-9]/g, '');
  const numericValue = digits ? parseInt(digits, 10) : 0;
  const normalizedNum = numericValue < 100 && /k/i.test(b) ? numericValue * 1000 : numericValue;

  if (normalizedNum >= 10000 || /alto|alta|high|premium/i.test(b)) {
    return { label: 'Alta Priorità', color: '#DC2626', bg: '#FEE2E2' };
  }
  if (normalizedNum >= 3000 || /medi[oa]|medium/i.test(b)) {
    return { label: 'Media Priorità', color: '#D97706', bg: '#FEF3C7' };
  }
  return { label: 'Standard', color: '#059669', bg: '#D1FAE5' };
}

async function enhanceClientEmail(form: ContactForm): Promise<string> {
  try {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Sei un copywriter senior per Righello, una premium growth agency italiana (Marketing, Advertising, Sviluppo Web). Il tuo compito è creare email di conferma che rafforzino il brand e creino fiducia immediata.

Scrivi in italiano con tono caldo, professionale e rassicurante — come un consulente esperto che accoglie un nuovo cliente.`
        },
        {
          role: 'user',
          content: `Un cliente di nome ${form.name} ci ha contattato${form.service ? ` per "${form.service}"` : ''}${form.budget ? ` con budget "${form.budget}"` : ''}. Il suo messaggio originale è:

"${form.message}"

Riscrivi come corpo di un'email di conferma. REGOLE:
- Ringrazia per nome con calore genuino (NO frasi generiche come "siamo lieti")
- Se c'è un servizio, mostra competenza specifica su quel tema in 1 frase
- Conferma risposta entro 72 ore lavorative  
- Aggiungi 1 frase che crei aspettativa positiva (es. "abbiamo già alcune idee...")
- Tono: premium ma accessibile, come una conversazione tra professionisti
- NON includere oggetto, saluti finali, firma o liste puntate
- Scrivi in italiano fluido e naturale
- Massimo 3 paragrafi brevi`
        }
      ],
      max_tokens: 500,
    });
    return completion.choices[0]?.message?.content || '';
  } catch (err) {
    console.error('OpenAI client email enhancement failed:', err);
    return '';
  }
}

async function generateLeadAnalysis(form: ContactForm): Promise<string> {
  try {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Sei un analista commerciale senior per Righello, growth agency italiana. Produci analisi strutturate e azionabili per il team sales. Rispondi SEMPRE in italiano con formato strutturato.`
        },
        {
          role: 'user',
          content: `Analizza questo lead e produci un report strutturato in italiano.

DATI LEAD:
- Nome: ${form.name}
- Email: ${form.email}
- Azienda: ${form.company || 'Non specificata'}
- Servizio: ${form.service || 'Non specificato'}
- Budget: ${form.budget || 'Non specificato'}
- Messaggio: "${form.message}"

FORMATO RICHIESTO (rispetta esattamente):
⭐ SCORE: [numero da 1 a 10]/10
🎯 PRIORITÀ: [Alta/Media/Bassa]
💡 PROFILO: [1 frase sul tipo di cliente e potenziale]
🚀 AZIONE CONSIGLIATA: [1 frase concreta su come approcciare questo lead]
⚡ SEGNALI CHIAVE: [2-3 segnali rilevanti separati da virgola]`
        }
      ],
      max_tokens: 400,
    });
    return completion.choices[0]?.message?.content || '';
  } catch (err) {
    console.error('OpenAI lead analysis failed:', err);
    return '';
  }
}

function buildClientEmailHtml(form: ContactForm, enhancedBody: string): string {
  const bodyContent = enhancedBody || `
    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">Ciao ${escHtml(form.name)},</p>
    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio${form.service ? ` riguardo a "${escHtml(form.service)}"` : ''} e il nostro team lo sta già esaminando.</p>
    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">Ti risponderemo entro 72 ore lavorative con una proposta personalizzata.</p>
  `;

  const formattedBody = enhancedBody
    ? enhancedBody.split('\n').filter(p => p.trim()).map(p => `<p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">${p}</p>`).join('')
    : bodyContent;

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    @media only screen and (max-width: 480px) {
      .email-body-cell { padding: 24px 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <span style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">Il team Righello sta gi\u00e0 lavorando alla tua richiesta. Ti ricontatteremo entro 72 ore.&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</span>
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
            <td class="email-body-cell" style="background-color: #ffffff; padding: 40px;">
              <!-- Confirmation Icon -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 0 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;"><tr><td style="width: 56px; height: 56px; line-height: 56px; border-radius: 50%; background-color: #E8F5E9; color: #2E7D32; font-size: 28px; text-align: center;" width="56" height="56">&#10003;</td></tr></table>
                  </td>
                </tr>
              </table>
              <!-- Confirmation Heading -->
              <h1 style="text-align: center; font-size: 24px; color: #1a1a1a; font-weight: 700; margin: 16px 0 8px;">Messaggio Ricevuto!</h1>
              ${formattedBody}
              <!-- Prossimi Step -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0 0 0;">
                <tr>
                  <td style="background-color: #F8F9FA; border-radius: 12px; padding: 24px;">
                    <p style="font-size: 16px; font-weight: 700; color: #1a1a1a; margin: 0 0 16px;">\u{1F4CB} Prossimi Step</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 0 12px 0;" valign="middle">
                          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                            <td style="width: 28px; height: 28px; border-radius: 50%; background-color: #FFF0F5; color: #D6487E; text-align: center; font-weight: 700; font-size: 14px; line-height: 28px;" width="28">1</td>
                            <td style="font-size: 14px; color: #555555; padding-left: 12px;">Il nostro team analizza la tua richiesta</td>
                          </tr></table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 12px 0;" valign="middle">
                          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                            <td style="width: 28px; height: 28px; border-radius: 50%; background-color: #FFF0F5; color: #D6487E; text-align: center; font-weight: 700; font-size: 14px; line-height: 28px;" width="28">2</td>
                            <td style="font-size: 14px; color: #555555; padding-left: 12px;">Ti contattiamo entro 72 ore lavorative</td>
                          </tr></table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0;" valign="middle">
                          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                            <td style="width: 28px; height: 28px; border-radius: 50%; background-color: #FFF0F5; color: #D6487E; text-align: center; font-weight: 700; font-size: 14px; line-height: 28px;" width="28">3</td>
                            <td style="font-size: 14px; color: #555555; padding-left: 12px;">Prepariamo una proposta su misura per te</td>
                          </tr></table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!-- Social Proof -->
              <p style="font-size: 13px; color: #999999; text-align: center; font-style: italic; margin: 24px 0 0;">Oltre 50 aziende cresciute con noi in tutta Europa</p>
              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td style="background-color: #D6487E; border-radius: 8px; text-align: center;">
                    <a href="https://www.wearerighello.com/progetti" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px;">Vedi i Risultati dei Nostri Clienti \u2192</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 32px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #eeeeee;">
              <p style="margin: 0 0 12px 0; font-size: 13px; text-align: center;">
                <a href="https://www.instagram.com/righello_agency/" style="color: #D6487E; text-decoration: none; font-size: 13px;">Instagram</a>
                <span style="color: #cccccc;"> &middot; </span>
                <a href="https://www.linkedin.com/company/righello" style="color: #D6487E; text-decoration: none; font-size: 13px;">LinkedIn</a>
              </p>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #999999; text-align: center;">Righello — Growth Agency</p>
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #bbbbbb; text-align: center;">Via Pio X 21, Mestre - Venezia</p>
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #bbbbbb; text-align: center;">
                <a href="mailto:hello@wearerighello.com" style="color: #D6487E; text-decoration: none;">hello@wearerighello.com</a>
              </p>
              <p style="margin: 0; font-size: 13px; text-align: center;">
                <a href="https://www.wearerighello.com/privacy" style="color: #bbbbbb; text-decoration: none;">Privacy Policy</a>
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

function buildTeamEmailHtml(form: ContactForm, leadAnalysis: string, priority: { label: string; color: string; bg: string }): string {
  const now = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const analysisSection = leadAnalysis
    ? `<tr>
        <td style="padding: 24px; background-color: #FFF5F8; border-radius: 12px; border-left: 4px solid #D6487E; margin-top: 24px;">
          <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #D6487E; font-weight: 700;">Analisi Automatica</h3>
          ${leadAnalysis.split('\n').filter(p => p.trim()).map(p => `<p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.6; color: #555555;">${p}</p>`).join('')}
        </td>
      </tr>`
    : '';

  const budgetDisplay = form.budget
    ? `<span style="display:inline-block; padding: 4px 12px; border-radius: 6px; background: #FFF0F5; color: #D6487E; font-weight: 700; font-size: 15px;">${escHtml(form.budget)}</span>`
    : `<span style="font-size: 16px; color: #333333; font-weight: 600;">\u2014</span>`;

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width: 480px) {
      .team-body-cell { padding: 24px 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <span style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">Servizio: ${escHtml(form.service || 'N/D')} | Budget: ${form.budget || 'N/D'} | ${escHtml(form.message.substring(0, 60))}...&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background-color: #050505; padding: 24px 40px; border-radius: 16px 16px 0 0; text-align: center;">
              <img src="https://www.wearerighello.com/logo-white.png" alt="Righello" height="28" style="height: 28px; width: auto;" />
              <p style="margin: 8px 0 0 0; font-size: 13px; color: #D6487E; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Nuovo Contatto</p>
              <span style="display:inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; background: ${priority.bg}; color: ${priority.color}; margin-top: 8px;">${priority.label}</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td class="team-body-cell" style="background-color: #ffffff; padding: 32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Ricevuto</span><br/>
                    <span style="font-size: 14px; color: #666666;">${now}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Nome</span><br/>
                    <span style="font-size: 16px; color: #333333; font-weight: 500;">${escHtml(form.name)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Email</span><br/>
                    <a href="mailto:${encodeURIComponent(form.email)}" style="font-size: 16px; color: #D6487E; text-decoration: none; font-weight: 500;">${escHtml(form.email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Azienda</span><br/>
                    <span style="font-size: 16px; color: #333333; font-weight: 500;">${escHtml(form.company || '\u2014')}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Servizio</span><br/>
                    <span style="font-size: 16px; color: #333333; font-weight: 500;">${escHtml(form.service || '\u2014')}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Budget</span><br/>
                    ${budgetDisplay}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <span style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Messaggio</span><br/>
                    <p style="margin: 8px 0 0 0; font-size: 15px; line-height: 1.6; color: #333333; background-color: #f9f9f9; padding: 16px; border-radius: 8px;">${escHtml(form.message)}</p>
                  </td>
                </tr>
                ${analysisSection}
              </table>
              <!-- Quick Action Buttons -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0 0 0;">
                <tr>
                  <td align="center">
                    <a href="mailto:${encodeURIComponent(form.email)}?subject=Re: Richiesta da ${encodeURIComponent(form.name)} %E2%80%94 Righello" style="display: inline-block; background-color: #D6487E; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none;">\u21A9\uFE0F Rispondi al Cliente</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 8px;">
                    <a href="mailto:${encodeURIComponent(form.email)}" style="font-size: 13px; color: #D6487E; text-decoration: none;">\u{1F4E7} ${escHtml(form.email)}</a>
                  </td>
                </tr>
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

  const priority = getLeadPriority(form.budget);

  const [enhancedBody, leadAnalysis] = await Promise.all([
    enhanceClientEmail(form),
    generateLeadAnalysis(form),
  ]);

  const clientHtml = buildClientEmailHtml(form, enhancedBody);
  const teamHtml = buildTeamEmailHtml(form, leadAnalysis, priority);

  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const senderEmail = fromEmail || FROM_EMAIL;

    await Promise.all([
      client.send({
        to: form.email,
        from: { email: senderEmail, name: 'Righello' },
        subject: `${escHtml(form.name)}, messaggio ricevuto \u2713 \u2014 Righello`,
        html: clientHtml,
      }),
      client.send({
        to: TEAM_EMAILS,
        from: { email: senderEmail, name: 'Righello Contact Form' },
        replyTo: { email: form.email, name: form.name },
        subject: `\u{1F4E9} ${priority.label} | ${escHtml(form.name)}${form.company ? ` \u2014 ${escHtml(form.company)}` : ''}`,
        html: teamHtml,
      }),
    ]);

    return json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    return json({ success: false, error: 'Errore nell\'invio dell\'email. Riprova più tardi.' }, { status: 500 });
  }
};
