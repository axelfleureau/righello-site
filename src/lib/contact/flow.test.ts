import { describe, expect, it, vi } from 'vitest';
import { get } from 'svelte/store';
import { buildBrief, createContactFlow, DRAFT_KEY, fallbackText, missingFields, type FlowDeps } from './flow';
import { externalReferrer, utmFromSearch } from './attribution';
import { inferCta } from './cta';
import { parseContactHref } from './intercept';

function memoryStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
    raw: m,
  };
}

const ok = (extra = {}) => new Response(JSON.stringify({ success: true, reference: 'RH-7K2M9Q', delivered: { team: true, client: true }, ...extra }), { status: 200 });
const json = (status: number, body: object) => new Response(JSON.stringify(body), { status });

function setup(overrides: Partial<FlowDeps> & { fetch?: FlowDeps['fetch'] } = {}) {
  const storage = memoryStorage();
  let n = 0;
  let t = 1_000_000;
  const track = { open: vi.fn(), start: vi.fn(), submit: vi.fn(), lead: vi.fn() };
  const fetchMock = vi.fn(async () => ok());
  const flow = createContactFlow({
    surface: 'sheet',
    storage,
    uuid: () => `id-${++n}`,
    now: () => t,
    online: () => true,
    sleep: async () => {},
    track,
    fetch: fetchMock as unknown as typeof fetch,
    ...overrides,
  });
  return { flow, storage, track, fetchMock: (overrides.fetch ?? fetchMock) as ReturnType<typeof vi.fn>, tick: (ms: number) => (t += ms) };
}

const fill = (flow: ReturnType<typeof setup>['flow'], contact = 'mario@azienda.it') => {
  flow.setField('name', 'Mario Rossi');
  flow.setField('contact', contact);
};
const sentBody = (fetchMock: ReturnType<typeof vi.fn>, call = 0) => JSON.parse((fetchMock.mock.calls[call][1] as RequestInit).body as string);

describe('flusso di contatto', () => {
  it('convalida: senza nome e recapito non parte e dice quale campo guardare per primo', async () => {
    const { flow, fetchMock } = setup();
    flow.open({ path: '/' });
    expect(await flow.submit()).toBe('name');
    expect(fetchMock).not.toHaveBeenCalled();
    const s = get(flow);
    expect(Object.keys(s.errors)).toEqual(['name', 'contact']);
    expect(s.showSummary).toBe(true);
    expect(missingFields(s.fields)).toEqual(['name', 'contact']);
  });

  it('l’errore di un campo sparisce mentre si scrive, appena e’ giusto', async () => {
    const { flow } = setup();
    flow.open({ path: '/' });
    await flow.submit();
    flow.setField('contact', 'mario@');
    expect(get(flow).errors.contact).toContain('dominio');
    flow.setField('contact', 'mario@azienda.it');
    expect(get(flow).errors.contact).toBeUndefined();
  });

  it('invia solo l’email o solo il telefono, col messaggio facoltativo', async () => {
    const a = setup();
    a.flow.open({ path: '/' });
    fill(a.flow);
    await a.flow.submit();
    const mail = sentBody(a.fetchMock);
    expect(mail).toMatchObject({ name: 'Mario Rossi', email: 'mario@azienda.it' });
    expect(mail.phone).toBeUndefined();
    expect(mail.message).toBeUndefined();

    const b = setup();
    b.flow.open({ path: '/' });
    fill(b.flow, '+39 333 123 4567');
    await b.flow.submit();
    const tel = sentBody(b.fetchMock);
    expect(tel.phone).toBe('+39 333 123 4567');
    expect(tel.email).toBeUndefined();
  });

  it('porta con se provenienza, trappola vuota, requestId e orario di apertura', async () => {
    const { flow, fetchMock } = setup();
    flow.open({ path: '/progetti/tetha', cta: 'hero' });
    fill(flow);
    await flow.submit();
    const body = sentBody(fetchMock);
    expect(body.requestId).toMatch(/^id-\d+$/);
    expect(body.hp).toBe('');
    expect(body.openedAt).toBe(1_000_000);
    expect(body.source).toMatchObject({ path: '/progetti/tetha', cta: 'hero', from: 'tetha' });
    expect(get(flow).service).toBe('Sviluppo Web & Software');
  });

  it('successo: codice di riferimento, copia inviata, bozza cancellata', async () => {
    const { flow, storage, track } = setup();
    flow.open({ path: '/' });
    fill(flow);
    expect(storage.raw.has(DRAFT_KEY)).toBe(true);
    await flow.submit();
    const s = get(flow);
    expect(s.status).toBe('sent');
    expect(s.reference).toBe('RH-7K2M9Q');
    expect(s.delivered).toEqual({ team: true, client: true });
    expect(s.sent).toEqual({ name: 'Mario', email: 'mario@azienda.it', phone: '' });
    expect(storage.raw.has(DRAFT_KEY)).toBe(false);
    expect(track.submit).toHaveBeenCalledWith('sheet', 'ok', '');
    expect(track.lead).toHaveBeenCalledTimes(1);
  });

  it('un invio a ridosso dell’apertura aspetta il minimo che il server richiede (niente richiesta scambiata per un programma)', async () => {
    const sleep = vi.fn(async (_ms: number) => {});
    const a = setup({ sleep });
    a.flow.open({ path: '/' });
    fill(a.flow);
    a.tick(500); // 0,5 s dopo l'apertura
    await a.flow.submit();
    expect(sleep).toHaveBeenCalledTimes(1);
    expect(sleep.mock.calls[0][0]).toBe(1200);
    expect(sentBody(a.fetchMock).openedAt).toBe(1_000_000);

    const sleep2 = vi.fn(async (_ms: number) => {});
    const b = setup({ sleep: sleep2 });
    b.flow.open({ path: '/' });
    fill(b.flow);
    b.tick(5000);
    await b.flow.submit();
    expect(sleep2).not.toHaveBeenCalled();
  });

  it('doppio tocco: una sola richiesta in volo', async () => {
    let release!: (r: Response) => void;
    const fetch = vi.fn(() => new Promise<Response>((r) => (release = r)));
    const { flow } = setup({ fetch: fetch as unknown as typeof globalThis.fetch });
    flow.open({ path: '/' });
    fill(flow);
    const first = flow.submit();
    const second = flow.submit();
    await new Promise((r) => setTimeout(r, 0)); // la richiesta parte dopo l'attesa minima
    release(ok());
    await Promise.all([first, second]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('il requestId resta lo stesso tra un tentativo e l’altro della stessa richiesta', async () => {
    const calls: Response[] = [json(503, { success: false, code: 'unavailable', error: 'x' }), ok()];
    const fetch = vi.fn(async () => calls.shift()!);
    const { flow } = setup({ fetch: fetch as unknown as typeof globalThis.fetch });
    flow.open({ path: '/' });
    fill(flow);
    await flow.submit();
    expect(get(flow).failure?.kind).toBe('unavailable');
    await flow.submit();
    expect(get(flow).status).toBe('sent');
    expect(sentBody(fetch, 0).requestId).toBe(sentBody(fetch, 1).requestId);
  });

  it('dopo un rifiuto netto, una richiesta cambiata e’ una richiesta nuova; dopo un’incertezza resta la stessa', async () => {
    const netto = vi.fn(async () => json(503, { success: false, code: 'unavailable' }));
    const a = setup({ fetch: netto as unknown as typeof globalThis.fetch });
    a.flow.open({ path: '/' });
    fill(a.flow);
    await a.flow.submit();
    a.flow.setField('message', 'Aggiungo due righe');
    await a.flow.submit();
    expect(sentBody(netto, 0).requestId).not.toBe(sentBody(netto, 1).requestId);

    const incerta = vi.fn(async () => {
      throw new TypeError('Failed to fetch');
    });
    const b = setup({ fetch: incerta as unknown as typeof globalThis.fetch });
    b.flow.open({ path: '/' });
    fill(b.flow);
    await b.flow.submit();
    expect(get(b.flow).failure?.kind).toBe('network');
    b.flow.setField('message', 'Aggiungo due righe');
    await b.flow.submit();
    expect(sentBody(incerta, 0).requestId).toBe(sentBody(incerta, 1).requestId);
  });

  it('errore: la bozza resta, il foglio dice cosa fare e offre WhatsApp e posta col testo gia’ scritto', async () => {
    const { flow, storage } = setup({ fetch: (async () => json(500, {})) as unknown as typeof fetch });
    flow.open({ path: '/servizi/web', cta: 'chiusura' });
    fill(flow);
    flow.setField('message', 'Vorrei rifare il sito');
    await flow.submit();
    const s = get(flow);
    expect(s.status).toBe('failed');
    expect(s.failure?.kind).toBe('error');
    expect(JSON.parse(storage.raw.get(DRAFT_KEY)!)).toMatchObject({ name: 'Mario Rossi', message: 'Vorrei rifare il sito' });
    const text = fallbackText(s);
    expect(text).toContain('Mario Rossi');
    expect(text).toContain('Vorrei rifare il sito');
    expect(text).toContain('mario@azienda.it');
    expect(text).toContain('Servizio:');
  });

  it('429: frase gentile; 400: i campi segnalati dal server; offline: lo dice senza provare la rete', async () => {
    const rate = setup({ fetch: (async () => json(429, { success: false, code: 'rate', error: 'Troppe richieste, riprova fra poco.' })) as unknown as typeof fetch });
    rate.flow.open({ path: '/' });
    fill(rate.flow);
    await rate.flow.submit();
    expect(get(rate.flow).failure).toEqual({ kind: 'rate', text: 'Troppe richieste, riprova fra poco.' });

    const bad = setup({ fetch: (async () => json(400, { success: false, code: 'invalid', error: 'Controlla i dati.', fields: { contact: 'Il numero non è valido.' } })) as unknown as typeof fetch });
    bad.flow.open({ path: '/' });
    fill(bad.flow);
    expect(await bad.flow.submit()).toBe('contact');
    expect(get(bad.flow).errors.contact).toBe('Il numero non è valido.');

    const offline = setup({ online: () => false });
    offline.flow.open({ path: '/' });
    fill(offline.flow);
    await offline.flow.submit();
    expect(get(offline.flow).failure?.kind).toBe('offline');
    expect(offline.fetchMock).not.toHaveBeenCalled();
  });

  it('la bozza sopravvive alla chiusura e il tema scelto a mano vale se si riapre dallo stesso punto', () => {
    const { flow, storage } = setup();
    flow.open({ path: '/servizi/web' });
    flow.setField('name', 'Mario');
    flow.pickTopic('Altro');
    const again = createContactFlow({ surface: 'sheet', storage, uuid: () => 'x', now: () => 1 });
    again.open({ path: '/servizi/web' });
    expect(get(again).fields.name).toBe('Mario');
    expect(get(again).service).toBe('Altro');
    // da un'altra pagina il tema torna quello della pagina
    again.open({ path: '/progetti/optima' });
    expect(get(again).fields.name).toBe('Mario');
    expect(get(again).service).toBe('Sviluppo Web & Software');
  });

  it('il brief riporta cio’ che arrivera’ al team, e lascia in chiaro cosa manca', () => {
    const { flow } = setup();
    flow.open({ path: '/progetti/tetha' });
    flow.setField('name', 'Mario Rossi');
    flow.setField('contact', '+39 333 123 4567');
    const rows = buildBrief(get(flow));
    expect(rows.map((r) => r.label)).toEqual(['Da', 'Telefono', 'Cosa serve', 'Messaggio', 'Da dove arrivi']);
    expect(rows.find((r) => r.key === 'where')?.value).toBe('Progetto: Tetha');
    expect(rows.find((r) => r.key === 'message')?.empty).toBe(true);
  });

  it('misura: apertura e inizio una volta sola, senza dati personali', () => {
    const { flow, track } = setup();
    flow.open({ path: '/', cta: 'testata' });
    flow.setField('name', 'M');
    flow.setField('name', 'Ma');
    expect(track.open).toHaveBeenCalledWith('sheet', 'testata', '');
    expect(track.start).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(track.open.mock.calls)).not.toContain('Ma');
  });

  it('un invio in volo non si azzera riaprendo il foglio', async () => {
    let release!: (r: Response) => void;
    const fetch = vi.fn(() => new Promise<Response>((r) => (release = r)));
    const { flow } = setup({ fetch: fetch as unknown as typeof globalThis.fetch });
    flow.open({ path: '/' });
    fill(flow);
    const pending = flow.submit();
    await new Promise((r) => setTimeout(r, 0));
    flow.open({ path: '/chi-siamo' });
    expect(get(flow).status).toBe('sending');
    expect(get(flow).fields.name).toBe('Mario Rossi');
    release(ok());
    await pending;
    expect(get(flow).status).toBe('sent');
  });
});

describe('provenienza', () => {
  it('UTM e referrer: solo origine e percorso, mai la query; i link interni non contano', () => {
    expect(utmFromSearch('?utm_source=google&utm_medium=cpc&x=1')).toEqual({ source: 'google', medium: 'cpc' });
    expect(utmFromSearch('?x=1')).toBeUndefined();
    expect(externalReferrer('https://www.google.com/search?q=privato', 'www.wearerighello.com')).toBe('https://www.google.com/search');
    expect(externalReferrer('https://www.wearerighello.com/servizi', 'www.wearerighello.com')).toBeUndefined();
    expect(externalReferrer('', 'www.wearerighello.com')).toBeUndefined();
  });
});

describe('intercettazione dei link', () => {
  const base = 'https://www.wearerighello.com/servizi/web';
  it('riconosce /contatti con o senza parametri e ne legge il contesto', () => {
    expect(parseContactHref('/contatti', base)).toEqual({ from: undefined, service: undefined });
    expect(parseContactHref('/contatti/', base)).not.toBeNull();
    expect(parseContactHref('/contatti?da=tetha', base)).toEqual({ from: 'tetha', service: undefined });
    expect(parseContactHref('/contatti?servizio=web#modulo', base)).toEqual({ from: undefined, service: 'web' });
    expect(parseContactHref('https://www.wearerighello.com/contatti?da=optima', base)?.from).toBe('optima');
  });
  it('lascia stare gli altri indirizzi e gli altri siti', () => {
    expect(parseContactHref('/contatti-extra', base)).toBeNull();
    expect(parseContactHref('/servizi', base)).toBeNull();
    expect(parseContactHref('https://altro.it/contatti', base)).toBeNull();
    expect(parseContactHref('mailto:hello@wearerighello.com', base)).toBeNull();
    expect(parseContactHref('#modulo', base)).toBeNull();
  });
  it('la posizione dichiarata con data-cta vince su quella ricavata', () => {
    const el = { closest: (sel: string) => (sel === '[data-cta]' ? { getAttribute: () => 'barra' } : null) } as unknown as Element;
    expect(inferCta(el)).toBe('barra');
  });
});
