/**
 * Il percorso di contatto, una volta sola: lo usano il foglio sopra ogni pagina e la pagina /contatti.
 * Stato dei campi, convalida mentre si scrive, bozza che si ricorda, identificativo della richiesta
 * (cosi' un doppio invio e' un solo contatto), trappola anti-spam, provenienza, invio, ripresa dopo un
 * errore e misura. I componenti disegnano soltanto: non decidono nulla.
 *
 * Contratto con il server: vedi `docs/contatto.md` (POST /api/contact).
 */
import { writable, type Readable } from 'svelte/store';
import { contactEvents, type ContactOutcome } from '$lib/analytics/contact';
import { CONTACT_TOPICS, mailHref, whatsappHref } from '$lib/data/contact';
import { resolveContactContext, type ContactContext, type ResolvedContext } from '$lib/data/contact-prefill';
import { readAttribution } from '$lib/contact/attribution';
import {
  FIELD_ORDER,
  parseContact,
  validateAll,
  validateField,
  type ContactErrors,
  type ContactFields,
} from '$lib/utils/contact-validation';

export const DRAFT_KEY = 'righello-contatti-bozza';
export const SEND_TIMEOUT_MS = 20000;
/** Il server tratta come un programma chi invia prima di ~1,5 s dall'apertura: chi compila con il riempimento automatico non deve perdere la richiesta per questo. */
export const MIN_FILL_MS = 1700;

export type FlowStatus = 'idle' | 'sending' | 'sent' | 'failed';
export type FailureKind = 'invalid' | 'rate' | 'unavailable' | 'offline' | 'timeout' | 'network' | 'error';
export interface Failure {
  kind: FailureKind;
  text: string;
}

export interface FlowState {
  fields: ContactFields;
  /** Valore di `CONTACT_TOPICS` o vuoto. */
  service: string;
  company: string;
  budget: string;
  /** Trappola: un visitatore vero non la vede e non la riempie mai. */
  hp: string;
  errors: ContactErrors;
  touched: Partial<Record<keyof ContactFields, boolean>>;
  showSummary: boolean;
  status: FlowStatus;
  failure: Failure | null;
  /** Codice della richiesta, quello che il server ha dato (`RH-XXXXXX`). */
  reference: string;
  delivered: { team: boolean; client: boolean } | null;
  /** Cio' che e' stato inviato, per la conferma (nome di battesimo, dove risponderemo). */
  sent: { name: string; email: string; phone: string } | null;
  requestId: string;
  openedAt: number;
  context: ResolvedContext & { path: string; cta: string };
}

export interface FlowDeps {
  surface: 'sheet' | 'page';
  fetch?: typeof fetch;
  storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> | null;
  now?: () => number;
  uuid?: () => string;
  online?: () => boolean;
  timeoutMs?: number;
  sleep?: (ms: number) => Promise<void>;
  track?: Partial<typeof contactEvents>;
}

const EMPTY_CONTEXT: FlowState['context'] = { study: null, topic: '', where: '', from: '', path: '/', cta: 'pagina' };

const T = {
  invalid: 'Il messaggio non è partito: controlla i dati e riprova.',
  rate: 'Hai inviato diverse richieste in poco tempo. Aspetta qualche minuto, oppure scrivici su WhatsApp.',
  unavailable: 'Il messaggio non è partito per un problema nostro. Non perdere quello che hai scritto: scrivici su WhatsApp o per email.',
  offline: 'Sei senza connessione: la richiesta resta qui, pronta. Appena torna la rete premi di nuovo Invia, oppure scrivici su WhatsApp.',
  timeout: 'Ci sta mettendo più del solito. Riprova tra poco: la richiesta è ancora qui. Se hai fretta scrivici su WhatsApp.',
  network: 'Non riusciamo a collegarci. Controlla la rete e riprova: la richiesta è ancora qui.',
  error: 'Il messaggio non è partito per un problema nostro. La richiesta è ancora qui: riprova tra poco, oppure scrivici su WhatsApp.',
} as const;

const topicLabel = (value: string) => CONTACT_TOPICS.find((t) => t.value === value)?.label ?? '';

/** Una riga del brief: e' esattamente cio' che il team riceve. */
export interface BriefRow {
  key: 'name' | 'contact' | 'service' | 'message' | 'where';
  label: string;
  value: string;
  /** Non ancora compilata: si mostra un invito, non un dato. */
  empty: boolean;
  hint: string;
}

/** Il documento ordinato che si costruisce mentre si scrive. Stesse informazioni dell'email che arriva al team. */
export function buildBrief(s: Pick<FlowState, 'fields' | 'service' | 'context'>): BriefRow[] {
  const contact = parseContact(s.fields.contact);
  const contactLabel = contact?.kind === 'email' ? 'Email' : contact?.kind === 'phone' ? 'Telefono' : 'Recapito';
  const row = (key: BriefRow['key'], label: string, value: string, hint: string): BriefRow => ({ key, label, value, empty: !value, hint });
  return [
    row('name', 'Da', s.fields.name.trim(), 'Il tuo nome'),
    row('contact', contactLabel, s.fields.contact.trim(), 'Email o telefono'),
    row('service', 'Cosa serve', topicLabel(s.service), 'Scegli di cosa hai bisogno'),
    row('message', 'Messaggio', s.fields.message.trim(), 'Facoltativo: due righe bastano'),
    row('where', 'Da dove arrivi', s.context.where, ''),
  ];
}

/** Elenco dei campi ancora da compilare, nell'ordine del modulo. */
export function missingFields(fields: ContactFields): Array<'name' | 'contact'> {
  return (['name', 'contact'] as const).filter((f) => validateField(f, fields[f]) !== '');
}

/** Il messaggio gia' scritto per ripiegare su WhatsApp o posta quando l'invio dal sito non e' riuscito. */
export function fallbackText(s: Pick<FlowState, 'fields' | 'service' | 'context'>): string {
  const lines = [`Ciao, sono ${s.fields.name.trim() || '…'}.`];
  const service = topicLabel(s.service);
  if (service) lines.push(`Mi serve: ${service}.`);
  if (s.fields.message.trim()) lines.push(s.fields.message.trim());
  if (s.fields.contact.trim()) lines.push(`Mi trovi qui: ${s.fields.contact.trim()}`);
  if (s.context.where) lines.push(`(Ti scrivo dal sito: ${s.context.where})`);
  return lines.join('\n');
}

export const whatsappFallbackHref = (s: Pick<FlowState, 'fields' | 'service' | 'context'>) => whatsappHref(fallbackText(s));
export const mailFallbackHref = (s: Pick<FlowState, 'fields' | 'service' | 'context'>) =>
  mailHref(`Richiesta dal sito${s.fields.name.trim() ? ` - ${s.fields.name.trim()}` : ''}`, fallbackText(s));

/** WhatsApp dopo l'invio: il codice e' gia' nel testo, cosi' chi risponde ritrova subito la richiesta. */
export const whatsappConfirmHref = (reference: string, name: string) =>
  whatsappHref(`Ciao, sono ${name || '…'}: ho appena inviato la richiesta ${reference} dal sito.`);

export interface ContactFlow extends Readable<FlowState> {
  /** Nuova richiesta da questo punto: ripristina la bozza e precompila dal contesto. */
  open(ctx: ContactContext): void;
  /** Cambia il contesto (la pagina /contatti con un altro `?da=`) senza perdere quello che si e' scritto. */
  setContext(ctx: ContactContext): void;
  setField(field: keyof ContactFields, value: string): void;
  setExtra(field: 'company' | 'budget' | 'hp', value: string): void;
  blur(field: keyof ContactFields): void;
  pickTopic(value: string): void;
  /** Convalida e invia. Ritorna il primo campo sbagliato (per dargli il fuoco), se c'e'. */
  submit(): Promise<keyof ContactFields | null>;
  /** Una nuova richiesta dopo una andata a buon fine. */
  again(): void;
}

export function createContactFlow(deps: FlowDeps): ContactFlow {
  const now = deps.now ?? (() => Date.now());
  const uuid = deps.uuid ?? (() => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`));
  const store = () => {
    if (deps.storage !== undefined) return deps.storage;
    try {
      return sessionStorage;
    } catch {
      return null;
    }
  };
  const track = { ...contactEvents, ...deps.track };
  const doFetch = () => deps.fetch ?? fetch;
  const online = deps.online ?? (() => (typeof navigator === 'undefined' ? true : navigator.onLine !== false));

  const fresh = (context = EMPTY_CONTEXT): FlowState => ({
    fields: { name: '', contact: '', message: '' },
    service: '',
    company: '',
    budget: '',
    hp: '',
    errors: {},
    touched: {},
    showSummary: false,
    status: 'idle',
    failure: null,
    reference: '',
    delivered: null,
    sent: null,
    requestId: uuid(),
    openedAt: now(),
    context,
  });

  let state = fresh();
  const { subscribe, set } = writable(state);
  const commit = (next: FlowState) => set((state = next));
  const patch = (p: Partial<FlowState>) => commit({ ...state, ...p });

  // --- Cio' che serve a non duplicare un contatto ---
  let started = false;
  let lastKey = '';
  let lastAmbiguous = false;
  let controller: AbortController | null = null;

  // --- Bozza ---
  const ctxKey = (c: ContactContext) => `${c.path}|${c.from ?? ''}|${c.service ?? ''}`;
  let currentKey = '';
  function saveDraft() {
    try {
      store()?.setItem(
        DRAFT_KEY,
        JSON.stringify({ ...state.fields, service: state.service, company: state.company, budget: state.budget, key: currentKey })
      );
    } catch {
      /* storage pieno o bloccato: la bozza e' solo una comodita' */
    }
  }
  function clearDraft() {
    try {
      store()?.removeItem(DRAFT_KEY);
    } catch {
      /* idem */
    }
  }
  function readDraft(): Partial<Record<string, string>> {
    try {
      const raw = store()?.getItem(DRAFT_KEY);
      return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
      return {};
    }
  }

  function begin(ctx: ContactContext) {
    // Un invio ancora in volo (foglio chiuso e riaperto subito) non si interrompe e non si duplica.
    if (state.status === 'sending') return;
    const resolved = resolveContactContext(ctx);
    const context = { ...resolved, path: ctx.path, cta: ctx.cta ?? 'pagina' };
    currentKey = ctxKey(ctx);
    const d = readDraft();
    const sameSpot = d.key === currentKey;
    started = false;
    lastKey = '';
    lastAmbiguous = false;
    const s = fresh(context);
    s.fields = { name: d.name ?? '', contact: d.contact ?? '', message: d.message ?? '' };
    // Il tema scelto dal punto di partenza vale; se si riapre dallo stesso punto resta la scelta fatta a mano.
    s.service = (sameSpot ? d.service : resolved.topic || d.service) ?? '';
    s.company = d.company ?? '';
    s.budget = d.budget ?? '';
    commit(s);
    track.open?.(deps.surface, context.cta, context.from);
  }

  function markStarted() {
    if (started) return;
    started = true;
    track.start?.(deps.surface);
  }

  const flow: ContactFlow = {
    subscribe,

    open: begin,

    setContext(ctx) {
      const resolved = resolveContactContext(ctx);
      const prevTopic = state.context.topic;
      currentKey = ctxKey(ctx);
      patch({
        context: { ...resolved, path: ctx.path, cta: ctx.cta ?? state.context.cta },
        // Il tema segue il contesto solo se chi scrive non ne ha scelto uno diverso a mano.
        service: !state.service || state.service === prevTopic ? resolved.topic || state.service : state.service,
      });
    },

    setField(field, value) {
      const fields = { ...state.fields, [field]: value };
      let errors = state.errors;
      // Dopo un errore mostrato il campo si ricontrolla mentre si scrive: sparisce non appena e' giusto.
      if (errors[field]) {
        const next = validateField(field, value);
        errors = { ...errors };
        if (next) errors[field] = next;
        else delete errors[field];
      }
      const showSummary = state.showSummary && Object.keys(errors).length > 0;
      commit({ ...state, fields, errors, showSummary, failure: state.failure?.kind === 'invalid' ? null : state.failure });
      if (value.trim()) markStarted();
      saveDraft();
    },

    setExtra(field, value) {
      commit({ ...state, [field]: value });
      if (field !== 'hp') saveDraft();
    },

    blur(field) {
      const message = validateField(field, state.fields[field]);
      const errors = { ...state.errors };
      if (message) errors[field] = message;
      else delete errors[field];
      patch({ errors, touched: { ...state.touched, [field]: true } });
    },

    pickTopic(value) {
      patch({ service: state.service === value ? '' : value });
      markStarted();
      saveDraft();
    },

    async submit() {
      if (state.status === 'sending' || state.status === 'sent') return null;
      const errors = validateAll(state.fields);
      const touched = { name: true, contact: true, message: true };
      const bad = FIELD_ORDER.find((f) => errors[f]) ?? null;
      if (bad) {
        patch({ errors, touched, showSummary: true, failure: null });
        return bad;
      }
      patch({ errors: {}, touched, showSummary: false, failure: null });
      saveDraft();

      if (!online()) {
        patch({ status: 'failed', failure: { kind: 'offline', text: T.offline } });
        track.submit?.(deps.surface, 'offline', state.service);
        return null;
      }

      const contact = parseContact(state.fields.contact)!;
      const attribution = readAttribution();
      const body = {
        name: state.fields.name.trim(),
        ...(contact.kind === 'email' ? { email: contact.email } : { phone: contact.phone }),
        service: state.service || undefined,
        budget: state.budget || undefined,
        company: state.company.trim() || undefined,
        message: state.fields.message.trim() || undefined,
        source: {
          path: state.context.path,
          cta: state.context.cta,
          from: state.context.from || undefined,
          referrer: attribution.referrer,
          utm: attribution.utm,
        },
      };

      // Stessa richiesta = stesso identificativo (il server la riconosce e non la duplica). Se invece e' cambiata
      // dopo un rifiuto netto del server, e' una richiesta nuova; dopo un'incertezza (rete, tempo scaduto) si tiene
      // l'identificativo: potrebbe essere gia' arrivata.
      const key = JSON.stringify(body);
      let requestId = state.requestId;
      if (lastKey && lastKey !== key && !lastAmbiguous) requestId = uuid();
      lastKey = key;
      patch({ status: 'sending', requestId });

      // Un invio troppo a ridosso dell'apertura (riempimento automatico + tocco): si aspetta il resto, non si rischia di essere scambiati per un programma.
      const early = state.openedAt + MIN_FILL_MS - now();
      if (early > 0) await (deps.sleep ?? ((ms) => new Promise<void>((r) => setTimeout(r, ms))))(early);

      controller = new AbortController();
      const timer = setTimeout(() => controller?.abort(), deps.timeoutMs ?? SEND_TIMEOUT_MS);
      const fail = (kind: FailureKind, text: string, extra: Partial<FlowState> = {}) => {
        lastAmbiguous = kind === 'timeout' || kind === 'network';
        patch({ status: 'failed', failure: { kind, text }, ...extra });
        track.submit?.(deps.surface, kind as ContactOutcome, state.service);
      };
      try {
        const res = await doFetch()('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({ requestId, ...body, hp: state.hp, openedAt: state.openedAt }),
        });
        const result = (await res.json().catch(() => ({}))) as {
          success?: boolean;
          reference?: string;
          delivered?: { team?: boolean; client?: boolean };
          code?: string;
          error?: string;
          fields?: { name?: string; contact?: string };
        };
        if (res.ok && result.success) {
          patch({
            status: 'sent',
            failure: null,
            reference: typeof result.reference === 'string' && /^RH-[A-Z0-9]{4,10}$/.test(result.reference) ? result.reference : '',
            delivered: { team: result.delivered?.team !== false, client: result.delivered?.client === true },
            sent: {
              name: state.fields.name.trim().split(/\s+/)[0] ?? '',
              email: contact.kind === 'email' ? contact.email : '',
              phone: contact.kind === 'phone' ? contact.phone : '',
            },
          });
          clearDraft();
          track.submit?.(deps.surface, 'ok', state.service);
          track.lead?.(deps.surface, state.service);
          return null;
        }
        if (res.status === 400 || result.code === 'invalid') {
          const serverErrors: ContactErrors = {};
          if (result.fields?.name) serverErrors.name = result.fields.name;
          if (result.fields?.contact) serverErrors.contact = result.fields.contact;
          fail('invalid', result.error || T.invalid, { errors: serverErrors, showSummary: Object.keys(serverErrors).length > 0 });
          return FIELD_ORDER.find((f) => serverErrors[f]) ?? null;
        }
        if (res.status === 429 || result.code === 'rate') fail('rate', result.error || T.rate);
        else if (res.status === 503 || result.code === 'unavailable') fail('unavailable', T.unavailable);
        else fail('error', T.error);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') fail('timeout', T.timeout);
        else fail('network', T.network);
      } finally {
        clearTimeout(timer);
        controller = null;
      }
      return null;
    },

    again() {
      const ctx = state.context;
      const s = fresh(ctx);
      s.service = ctx.topic;
      started = false;
      lastKey = '';
      lastAmbiguous = false;
      commit(s);
    },
  };
  return flow;
}

/** Il flusso del foglio: uno per pagina, cosi' un invio in corso sopravvive alla chiusura del foglio. */
let shared: ContactFlow | null = null;
export const sheetFlow = (): ContactFlow => (shared ??= createContactFlow({ surface: 'sheet' }));

