/**
 * Il percorso di un contatto, dal modulo alla casella del team (contratto in docs/contatto.md).
 *
 *   validazione -> trappola/tempo/testo -> idempotenza -> limite per indirizzo
 *     -> MAIL AL TEAM (due tentativi) -> mail al cliente (best effort) -> risposta
 *
 * Regole che non si toccano:
 *  - il team riceve il contatto prima di qualunque altra cosa; nessun servizio a consumo nel percorso;
 *  - al visitatore non arriva mai un'eccezione: o un esito del contratto, o 503 solo se il team non ha ricevuto nulla;
 *  - se il team non riceve nulla il contatto completo finisce in una riga `[lead-recovery]` dei log.
 *
 * Tutto cio' che tocca il mondo (orologio, posta, log, ambiente) entra da `ContactDeps`: i test lo sostituiscono.
 */
import { createHash } from 'node:crypto';
import { analyzeLead } from './contact-analysis';
import { IdempotencyCache, RateLimiter, detectSpam } from './contact-guard';
import { referenceFor } from './contact-reference';
import { validateContact, type ContactInput } from './contact-validation';
import {
  buildClientEmailHtml,
  buildClientEmailText,
  buildClientSubject,
  buildTeamEmailHtml,
  buildTeamEmailText,
  buildTeamSubject,
  type ContactForm,
  type EmailChannels,
} from './email-templates';

export const TEAM_EMAILS = ['edis@wearerighello.com', 'paolo@wearerighello.com', 'axel@wearerighello.com'];

export interface MailMessage {
  to: string | string[];
  fromName: string;
  replyTo?: { email: string; name: string };
  subject: string;
  html: string;
  text: string;
}

export interface ContactDeps {
  now: () => number;
  sleep: (ms: number) => Promise<void>;
  sendMail: (message: MailMessage) => Promise<void>;
  /** Solo con `CONTACT_AI=1`: migliora il testo della mail al cliente (mai prima della mail al team). */
  improveClientBody: (form: ContactForm, signal: AbortSignal) => Promise<string>;
  randomId: () => string;
  log: { info: (line: string) => void; warn: (line: string) => void; error: (line: string) => void };
  channels: EmailChannels;
  env: { CONTACT_AI?: string; CONTACT_DRY_RUN?: string; VERCEL_ENV?: string };
}

export interface ContactState {
  limiter: RateLimiter;
  idempotency: IdempotencyCache<Promise<ContactOutcome>>;
}

export function createContactState(): ContactState {
  return { limiter: new RateLimiter(), idempotency: new IdempotencyCache() };
}

export interface ContactOutcome {
  status: number;
  body: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const TIMING = {
  teamAttemptMs: 4000,
  teamRetryAfterMs: 400,
  teamRetryAttemptMs: 3500,
  clientMs: 4000,
  aiMs: 4000,
} as const;

const MESSAGES = {
  rate: 'Hai inviato molte richieste in poco tempo. Aspetta qualche minuto e riprova, oppure scrivici su WhatsApp.',
  unavailable: (email: string) => `Non siamo riusciti a inviare la richiesta. Scrivici su WhatsApp o per email a ${email}: ti rispondiamo noi.`,
} as const;

function ok(reference: string, delivered: { team: boolean; client: boolean }): ContactOutcome {
  return { status: 200, body: { success: true, reference, delivered } };
}

function payloadHash(input: ContactInput): string {
  const { name, email, phone, company, service, budget, message } = input;
  return createHash('sha256').update(JSON.stringify([name, email, phone, company, service, budget, message])).digest('hex');
}

function withTimeout<T>(run: () => Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout dopo ${ms} ms`)), ms);
    run().then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function describeError(err: unknown): string {
  if (err && typeof err === 'object') {
    const e = err as { message?: string; code?: number | string; response?: { statusCode?: number } };
    return [e.message, e.code ? `codice ${e.code}` : '', e.response?.statusCode ? `stato ${e.response.statusCode}` : ''].filter(Boolean).join(' - ');
  }
  return String(err);
}

async function sendToTeam(form: ContactForm, deps: ContactDeps): Promise<{ ok: true } | { ok: false; error: string }> {
  const analysis = analyzeLead(form);
  const message: MailMessage = {
    to: TEAM_EMAILS,
    fromName: 'Righello Contact Form',
    ...(form.email ? { replyTo: { email: form.email, name: form.name } } : {}),
    subject: buildTeamSubject(form, analysis.priority),
    html: buildTeamEmailHtml(form, analysis),
    text: buildTeamEmailText(form, analysis),
  };
  try {
    await withTimeout(() => deps.sendMail(message), TIMING.teamAttemptMs);
    return { ok: true };
  } catch (first) {
    deps.log.warn(`[contact] mail al team: primo tentativo fallito (${form.reference}): ${describeError(first)}`);
  }
  await deps.sleep(TIMING.teamRetryAfterMs);
  try {
    await withTimeout(() => deps.sendMail(message), TIMING.teamRetryAttemptMs);
    return { ok: true };
  } catch (second) {
    return { ok: false, error: describeError(second) };
  }
}

async function sendToClient(form: ContactForm, deps: ContactDeps): Promise<boolean> {
  try {
    let enhanced = '';
    if (deps.env.CONTACT_AI === '1') {
      const controller = new AbortController();
      try {
        enhanced = await withTimeout(() => deps.improveClientBody(form, controller.signal), TIMING.aiMs);
      } catch (err) {
        controller.abort();
        deps.log.warn(`[contact] testo migliorato non disponibile (${form.reference}): ${describeError(err)}`);
      }
    }
    await withTimeout(
      () =>
        deps.sendMail({
          to: form.email,
          fromName: 'Righello',
          subject: buildClientSubject(form),
          html: buildClientEmailHtml(form, enhanced, deps.channels),
          text: buildClientEmailText(form, enhanced, deps.channels),
        }),
      TIMING.clientMs + (deps.env.CONTACT_AI === '1' ? TIMING.aiMs : 0),
    );
    return true;
  } catch (err) {
    deps.log.warn(`[contact] copia al cliente non inviata (${form.reference}): ${describeError(err)}`);
    return false;
  }
}

function isDryRun(deps: ContactDeps): boolean {
  if (deps.env.CONTACT_DRY_RUN !== '1') return false;
  if (deps.env.VERCEL_ENV === 'production') {
    deps.log.error('[contact] CONTACT_DRY_RUN=1 ignorato: in produzione i contatti si inviano sempre.');
    return false;
  }
  return true;
}

/** Una riga sola con il contatto completo, cosi' si recupera dai log (vedi docs/contatto.md). */
function logRecovery(form: ContactForm, reason: string, error: string, deps: ContactDeps) {
  deps.log.error(`[lead-recovery] ${JSON.stringify({ reference: form.reference, receivedAt: new Date(deps.now()).toISOString(), reason, error, contact: form })}`);
}

async function deliver(form: ContactForm, deps: ContactDeps, dryRun: boolean, startedAt: number): Promise<ContactOutcome> {
  if (dryRun) {
    deps.log.info(`[contact-dry-run] ${form.reference} nessuna mail inviata`);
    return ok(form.reference, { team: true, client: Boolean(form.email) });
  }

  const team = await sendToTeam(form, deps);
  if (!team.ok) {
    // Ultima rete di sicurezza: il contatto completo nei log, su una riga sola, per recuperarlo a mano.
    logRecovery(form, 'team-mail-failed', team.error, deps);
    return {
      status: 503,
      body: { success: false, code: 'unavailable', error: MESSAGES.unavailable(deps.channels.email) },
    };
  }

  // Senza email non c'e' nessuna copia da mandare. `sendToClient` non lancia mai.
  const clientDelivered = form.email ? await sendToClient(form, deps) : false;
  deps.log.info(`[contact] ok ${form.reference} team=1 client=${clientDelivered ? 1 : 0} ms=${deps.now() - startedAt}`);
  return ok(form.reference, { team: true, client: clientDelivered });
}

export async function handleContact(raw: unknown, ctx: { ip: string }, deps: ContactDeps, state: ContactState): Promise<ContactOutcome> {
  const startedAt = deps.now();
  let form: ContactForm | undefined;
  try {
    const parsed = validateContact(raw);
    if (!parsed.ok) {
      return { status: 400, body: { success: false, code: 'invalid', error: parsed.error, fields: parsed.fields } };
    }
    const { input, meta } = parsed;
    const requestId = meta.requestId || deps.randomId();
    form = { ...input, reference: referenceFor(requestId) };

    // 1. Trappola, tempo, testo: il bot riceve un successo identico a quello vero e non impara nulla.
    const spam = detectSpam(input, meta, startedAt);
    if (spam) {
      deps.log.warn(`[contact-spam] ${spam} ${form.reference}`);
      // Un falso positivo (orologio sfasato, testo insolito) non deve perdere un cliente: i motivi diversi dalla
      // trappola lasciano il contatto nei log, recuperabile come quelli non consegnati.
      if (spam !== 'honeypot') {
        deps.log.warn(`[lead-suspect] ${JSON.stringify({ reference: form.reference, reason: spam, contact: form })}`);
      }
      return ok(form.reference, { team: true, client: Boolean(form.email) });
    }

    const dryRun = isDryRun(deps);

    // 2. Stesso id e stesso contenuto = stesso esito, senza secondo invio (e senza consumare il limite).
    const hash = payloadHash(input);
    if (meta.requestId) {
      const existing = state.idempotency.get(meta.requestId, hash, startedAt);
      if (existing) {
        deps.log.info(`[contact] doppione ${form.reference}`);
        return await existing;
      }
    }

    // 3. Limite per indirizzo (in prova locale con CONTACT_DRY_RUN non si applica: i test ripetono gli invii).
    let release = () => {};
    if (!dryRun) {
      const decision = state.limiter.take(ctx.ip, startedAt);
      if (!decision.ok) {
        deps.log.warn(`[contact] limite raggiunto per ${ctx.ip} (${form.reference})`);
        return {
          status: 429,
          body: { success: false, code: 'rate', error: MESSAGES.rate },
          headers: { 'Retry-After': String(decision.retryAfterSec) },
        };
      }
      release = decision.release;
    }

    // 4. Consegna. L'esito si registra subito (in volo) cosi' un secondo tocco aspetta lo stesso risultato.
    const run = deliver(form, deps, dryRun, startedAt);
    if (meta.requestId) {
      state.idempotency.set(meta.requestId, hash, run, startedAt);
      run.then(
        (outcome) => {
          if (outcome.status !== 200) state.idempotency.delete(meta.requestId, hash);
        },
        () => state.idempotency.delete(meta.requestId, hash),
      );
    }
    const outcome = await run;
    // Se e' fallito per colpa nostra, il visitatore non paga il tentativo nel suo limite.
    if (outcome.status !== 200) release();
    return outcome;
  } catch (err) {
    // Non dovrebbe mai succedere: la rete finale, per non lasciare il visitatore con un errore di sistema.
    deps.log.error(`[contact] errore imprevisto: ${describeError(err)}`);
    if (form) logRecovery(form, 'unexpected-error', describeError(err), deps);
    return { status: 503, body: { success: false, code: 'unavailable', error: MESSAGES.unavailable(deps.channels.email) } };
  }
}
