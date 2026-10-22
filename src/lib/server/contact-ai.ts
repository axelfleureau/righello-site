/**
 * Miglioramento facoltativo del testo della mail al cliente. SPENTO di default: si accende solo con `CONTACT_AI=1`.
 * Costa a consumo (modello OpenAI), quindi non sta nel percorso normale: il contatto non lo aspetta mai
 * (il team ha gia' ricevuto tutto) e ogni chiamata ha un tempo massimo (`TIMING.aiMs`, 4 s) con annullamento.
 * Il modulo di OpenAI si carica solo qui dentro: con `CONTACT_AI` spento non viene nemmeno importato.
 */
import type { ContactForm } from './email-templates';

export async function improveClientBody(form: ContactForm, signal: AbortSignal): Promise<string> {
  const { getOpenAI } = await import('./openai');
  const completion = await getOpenAI().chat.completions.create(
    {
      model: 'gpt-5.2',
      messages: [
        {
          role: 'system',
          content:
            'Sei un copywriter senior per Righello, una growth agency italiana che lavora su marketing, advertising, siti web, automazioni e prodotti digitali. Scrivi in italiano semplice, professionale e concreto. Il tono deve sembrare umano, non commerciale in modo forzato.',
        },
        {
          role: 'user',
          content: `Un cliente di nome ${form.name} ci ha contattato${form.service ? ` per "${form.service}"` : ''}${form.budget ? ` con budget "${form.budget}"` : ''}.${form.message ? ` Il suo messaggio originale è:\n\n"${form.message}"\n\n` : '\n\n'}Riscrivi come corpo di un'email di conferma.
Regole:
- ringrazia per nome;
- se c'è un servizio, mostra comprensione specifica in una frase;
- non promettere tempi: li aggiunge il modello dell'email;
- crea fiducia senza promettere risultati non verificabili;
- non includere oggetto, saluti finali, firma o liste puntate;
- massimo 2 paragrafi brevi.`,
        },
      ],
      max_completion_tokens: 400,
    },
    { signal },
  );
  return completion.choices[0]?.message?.content?.trim() || '';
}
