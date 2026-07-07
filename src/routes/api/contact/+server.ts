import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUncachableSendGridClient } from '$lib/server/sendgrid';
import { getOpenAI } from '$lib/server/openai';
import {
  buildClientEmailHtml,
  buildClientEmailText,
  buildClientSubject,
  buildTeamEmailHtml,
  buildTeamEmailText,
  buildTeamSubject,
  getLeadPriority,
  type ContactForm,
  type LeadPriority,
} from '$lib/server/email-templates';

const FROM_EMAIL = 'hello@wearerighello.com';
const TEAM_EMAILS = ['edis@wearerighello.com', 'paolo@wearerighello.com', 'axel@wearerighello.com'];

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
    phone: typeof d.phone === 'string' ? d.phone.trim() : '',
    company: typeof d.company === 'string' ? d.company.trim() : '',
    service: typeof d.service === 'string' ? d.service.trim() : '',
    budget: typeof d.budget === 'string' ? d.budget.trim() : '',
    message: d.message.trim(),
  };
}

async function enhanceClientEmail(form: ContactForm): Promise<string> {
  try {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-5.2',
      messages: [
        {
          role: 'system',
          content: `Sei un copywriter senior per Righello, una growth agency italiana che lavora su marketing, advertising, siti web, automazioni e prodotti digitali.

Scrivi in italiano semplice, professionale e concreto. Il tono deve sembrare umano, non commerciale in modo forzato.`
        },
        {
          role: 'user',
          content: `Un cliente di nome ${form.name} ci ha contattato${form.service ? ` per "${form.service}"` : ''}${form.budget ? ` con budget "${form.budget}"` : ''}. Il suo messaggio originale è:

"${form.message}"

Riscrivi come corpo di un'email di conferma.
Regole:
- ringrazia per nome;
- se c'è un servizio, mostra comprensione specifica in una frase;
- conferma risposta entro 72 ore lavorative;
- crea fiducia senza promettere risultati non verificabili;
- non includere oggetto, saluti finali, firma o liste puntate;
- massimo 3 paragrafi brevi.`
        }
      ],
      max_completion_tokens: 500,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (err) {
    console.error('OpenAI client email enhancement failed:', err instanceof Error ? err.message : err);
    return '';
  }
}

function buildFallbackAnalysis(form: ContactForm, priority: LeadPriority): string {
  const budgetNote = form.budget ? `Budget dichiarato: ${form.budget}` : 'Budget non specificato';
  const serviceNote = form.service ? `Servizio richiesto: ${form.service}` : 'Servizio non specificato';
  const msgWords = form.message.trim().split(/\s+/).length;
  const detailLevel = msgWords > 50 ? 'messaggio dettagliato' : msgWords > 20 ? 'messaggio moderato' : 'messaggio breve';
  const companyNote = form.company ? `azienda indicata: ${form.company}` : 'azienda non specificata';

  return [
    `Priorità: ${priority.label}.`,
    `Profilo: ${companyNote}; ${serviceNote}.`,
    `Segnali chiave: ${budgetNote}; ${detailLevel}.`,
    'Azione consigliata: rispondere entro 24 ore con una domanda mirata e una proposta di call breve.',
    'Nota: analisi AI non disponibile; report calcolato automaticamente dai dati del form.',
  ].join('\n');
}

async function generateLeadAnalysis(form: ContactForm, priority: LeadPriority): Promise<string> {
  const TIMEOUT_MS = 15000;

  const timeoutPromise = new Promise<string>((_, reject) =>
    setTimeout(() => reject(new Error('OpenAI timeout')), TIMEOUT_MS)
  );

  const analysisPromise = (async (): Promise<string> => {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-5.2',
      messages: [
        {
          role: 'system',
          content: 'Sei un analista commerciale senior per Righello. Produci una lettura breve, concreta e azionabile per il team sales. Rispondi sempre in italiano.'
        },
        {
          role: 'user',
          content: `Analizza questo lead e produci un report strutturato.

Dati lead:
- Nome: ${form.name}
- Email: ${form.email}
- Telefono: ${form.phone || 'Non specificato'}
- Azienda: ${form.company || 'Non specificata'}
- Servizio: ${form.service || 'Non specificato'}
- Budget: ${form.budget || 'Non specificato'}
- Messaggio: "${form.message}"

Formato richiesto:
Score: [numero da 1 a 10]/10
Priorità: [alta/media/bassa]
Profilo: [1 frase sul tipo di cliente e potenziale]
Azione consigliata: [1 frase concreta su come approcciare questo lead]
Segnali chiave: [2-3 segnali rilevanti separati da virgola]`
        }
      ],
      max_completion_tokens: 400,
    });

    return completion.choices[0]?.message?.content || '';
  })();

  try {
    const result = await Promise.race([analysisPromise, timeoutPromise]);
    if (result && result.trim().length > 0) return result;
    console.warn('OpenAI lead analysis returned empty; using fallback');
    return buildFallbackAnalysis(form, priority);
  } catch (err) {
    console.error('OpenAI lead analysis failed:', err instanceof Error ? err.message : err);
    return buildFallbackAnalysis(form, priority);
  }
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
    generateLeadAnalysis(form, priority),
  ]);

  const clientHtml = buildClientEmailHtml(form, enhancedBody);
  const clientText = buildClientEmailText(form, enhancedBody);
  const teamHtml = buildTeamEmailHtml(form, leadAnalysis, priority);
  const teamText = buildTeamEmailText(form, leadAnalysis, priority);

  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const senderEmail = fromEmail || FROM_EMAIL;

    await Promise.all([
      client.send({
        to: form.email,
        from: { email: senderEmail, name: 'Righello' },
        subject: buildClientSubject(form),
        html: clientHtml,
        text: clientText,
      }),
      client.send({
        to: TEAM_EMAILS,
        from: { email: senderEmail, name: 'Righello Contact Form' },
        replyTo: { email: form.email, name: form.name },
        subject: buildTeamSubject(form, priority),
        html: teamHtml,
        text: teamText,
      }),
    ]);

    return json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err instanceof Error ? err.message : err);
    return json({ success: false, error: 'Errore nell\'invio dell\'email. Riprova più tardi.' }, { status: 500 });
  }
};
