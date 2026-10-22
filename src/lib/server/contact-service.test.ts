import { afterEach, describe, expect, it, vi } from 'vitest';
import { REFERENCE_PATTERN, referenceFor } from './contact-reference';
import { TEAM_EMAILS, TIMING, createContactState, handleContact, type ContactDeps, type MailMessage } from './contact-service';

const channels = { reply: 'entro 72 ore lavorative', email: 'hello@wearerighello.com', whatsappHref: (t: string) => `https://wa.me/393393998351?text=${encodeURIComponent(t)}` };
const T0 = 1_700_000_000_000;

function harness(over: Partial<ContactDeps> = {}) {
  let t = T0;
  const sent: MailMessage[] = [];
  const logs: string[] = [];
  const state = createContactState();
  const deps: ContactDeps = {
    now: () => t,
    sleep: async (ms) => {
      t += ms;
    },
    sendMail: async (m) => {
      sent.push(m);
    },
    improveClientBody: vi.fn(async () => 'Testo migliorato dal modello.'),
    randomId: () => 'casuale-0000',
    log: { info: (l) => logs.push(l), warn: (l) => logs.push(l), error: (l) => logs.push(l) },
    channels,
    env: {},
    ...over,
  };
  const post = (body: unknown, ip = '203.0.113.1') => handleContact(body, { ip }, deps, state);
  return { deps, sent, logs, state, post, advance: (ms: number) => (t += ms) };
}

const good = (over: Record<string, unknown> = {}) => ({
  requestId: 'req-1234567890',
  name: 'Marco Bianchi',
  email: 'marco@azienda.it',
  phone: '+39 333 123 4567',
  service: 'Sviluppo Web & Software',
  message: 'Ci serve un sito nuovo.',
  source: { path: '/progetti/tetha', cta: 'chiusura', from: 'tetha' },
  openedAt: T0 - 20_000,
  hp: '',
  ...over,
});

afterEach(() => {
  vi.useRealTimers();
});

describe('percorso normale', () => {
  it('manda la mail al team e la copia al cliente, risponde col codice', async () => {
    const h = harness();
    const r = await h.post(good());
    expect(r.status).toBe(200);
    expect(r.body).toEqual({ success: true, reference: referenceFor('req-1234567890'), delivered: { team: true, client: true } });
    expect(h.sent).toHaveLength(2);
    // Il team per primo.
    expect(h.sent[0].to).toEqual(TEAM_EMAILS);
    expect(h.sent[0].replyTo).toEqual({ email: 'marco@azienda.it', name: 'Marco Bianchi' });
    expect(h.sent[1].to).toBe('marco@azienda.it');
    for (const m of h.sent) {
      expect(m.subject).toContain(referenceFor('req-1234567890'));
      expect(m.html).toContain(referenceFor('req-1234567890'));
      expect(m.text).toContain(referenceFor('req-1234567890'));
    }
    expect(h.sent[0].html).toContain('/progetti/tetha');
  });

  it('il codice ha la forma giusta ed e\' lo stesso a ogni invio con lo stesso id', async () => {
    const a = await harness().post(good());
    const b = await harness().post(good());
    expect((a.body as { reference: string }).reference).toMatch(REFERENCE_PATTERN);
    expect(a.body).toEqual(b.body);
  });

  it('solo email: nessun telefono nella mail, copia al cliente', async () => {
    const h = harness();
    const r = await h.post(good({ phone: '' }));
    expect(r.body).toMatchObject({ delivered: { team: true, client: true } });
    expect(h.sent[0].text).not.toMatch(/Telefono:/);
    expect(h.sent).toHaveLength(2);
  });

  it('solo telefono: nessuna copia al cliente, nessun replyTo, il team ha tel e WhatsApp cliccabili', async () => {
    const h = harness();
    const r = await h.post(good({ email: '' }));
    expect(r.body).toMatchObject({ success: true, delivered: { team: true, client: false } });
    expect(h.sent).toHaveLength(1);
    expect(h.sent[0].replyTo).toBeUndefined();
    expect(h.sent[0].html).toContain('href="tel:+393331234567"');
    expect(h.sent[0].html).toContain('https://wa.me/393331234567');
    expect(h.sent[0].text).not.toMatch(/Email:/);
  });

  it('senza requestId (pagina del bando) il contatto passa e non c\'e\' idempotenza', async () => {
    const h = harness();
    const body = good({ requestId: undefined, openedAt: undefined });
    const a = await h.post(body);
    const b = await h.post(body);
    expect(a.status).toBe(200);
    expect(b.status).toBe(200);
    expect(h.sent.length).toBe(4);
  });

  it('nessuna chiamata a OpenAI di default', async () => {
    const h = harness();
    await h.post(good());
    expect(h.deps.improveClientBody).not.toHaveBeenCalled();
  });

  it('la risposta non e\' mai un\'eccezione, nemmeno se ogni pezzo e\' rotto', async () => {
    const h = harness({ sendMail: async () => { throw new Error('boom'); }, randomId: () => { throw new Error('rotto'); } });
    await expect(h.post(good({ requestId: undefined }))).resolves.toMatchObject({ status: 503 });
    await expect(h.post(null)).resolves.toMatchObject({ status: 400 });
  });
});

describe('validazione', () => {
  it('400 con frase italiana e campi', async () => {
    const h = harness();
    const r = await h.post(good({ name: '', email: '', phone: '' }));
    expect(r.status).toBe(400);
    expect(r.body).toMatchObject({ success: false, code: 'invalid', fields: { name: expect.any(String) } });
    expect(h.sent).toHaveLength(0);
    const r2 = await h.post(good({ email: '', phone: '' }));
    expect(r2.body).toMatchObject({ code: 'invalid', fields: { contact: expect.stringMatching(/recapito/) } });
  });
});

describe('anti-spam silenzioso', () => {
  it('trappola piena: successo identico, niente invio, niente conteggio nel limite', async () => {
    const h = harness();
    const r = await h.post(good({ hp: 'http://spam.example' }));
    expect(r.status).toBe(200);
    expect(r.body).toMatchObject({ success: true, reference: expect.stringMatching(REFERENCE_PATTERN), delivered: { team: true, client: true } });
    expect(h.sent).toHaveLength(0);
    for (let i = 0; i < 20; i++) await h.post(good({ hp: 'x', requestId: `bot-${i}-0000000` }));
    expect(h.sent).toHaveLength(0);
    expect((await h.post(good({ requestId: 'vero-0000000001' }))).status).toBe(200);
    expect(h.sent).toHaveLength(2);
  });

  it('invio entro 1,5 s dall\'apertura: finto successo, ma il contatto resta nei log per recuperarlo', async () => {
    const h = harness();
    const r = await h.post(good({ openedAt: T0 - 300 }));
    expect(r.status).toBe(200);
    expect(h.sent).toHaveLength(0);
    const line = h.logs.find((l) => l.startsWith('[lead-suspect]'))!;
    expect(JSON.parse(line.replace('[lead-suspect] ', ''))).toMatchObject({ reason: 'too-fast', contact: { email: 'marco@azienda.it' } });
  });

  it('testo con troppi link: finto successo senza invio', async () => {
    const h = harness();
    const r = await h.post(good({ message: 'http://a.it http://b.it http://c.it http://d.it' }));
    expect(r.status).toBe(200);
    expect(h.sent).toHaveLength(0);
  });
});

describe('idempotenza', () => {
  it('stessa richiesta due volte (doppio tocco) = un solo contatto e lo stesso esito', async () => {
    const h = harness();
    const a = await h.post(good());
    const b = await h.post(good());
    expect(b).toEqual(a);
    expect(h.sent).toHaveLength(2); // team + cliente, una volta sola
  });

  it('due tocchi nello stesso istante (richiesta ancora in volo) = un solo invio', async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const h = harness({ sendMail: async (m) => { await gate; h.sent.push(m); } });
    const p1 = h.post(good());
    const p2 = h.post(good());
    release();
    const [a, b] = await Promise.all([p1, p2]);
    expect(a).toEqual(b);
    expect(h.sent).toHaveLength(2);
  });

  it('il doppione non consuma il limite per indirizzo', async () => {
    const h = harness();
    for (let i = 0; i < 12; i++) expect((await h.post(good())).status).toBe(200);
    expect((await h.post(good({ requestId: 'nuova-00000001' }))).status).toBe(200);
  });

  it('dopo 15 minuti lo stesso id e\' una richiesta nuova', async () => {
    const h = harness();
    await h.post(good());
    h.advance(16 * 60_000);
    await h.post(good());
    expect(h.sent).toHaveLength(4);
  });

  it('stesso id con testo corretto = invio nuovo (stesso codice)', async () => {
    const h = harness();
    const a = await h.post(good());
    const b = await h.post(good({ message: 'Testo corretto.' }));
    expect(h.sent).toHaveLength(4);
    expect((b.body as { reference: string }).reference).toBe((a.body as { reference: string }).reference);
  });

  it('un invio fallito non resta in memoria: si puo\' riprovare con lo stesso id', async () => {
    let fail = true;
    const h = harness({ sendMail: async (m) => { if (fail) throw new Error('giu'); h.sent.push(m); } });
    expect((await h.post(good())).status).toBe(503);
    fail = false;
    const r = await h.post(good());
    expect(r.status).toBe(200);
    expect(h.sent.length).toBeGreaterThan(0);
  });
});

describe('limite per indirizzo', () => {
  it('5 richieste ogni 10 minuti, poi 429 con frase gentile e Retry-After', async () => {
    const h = harness();
    for (let i = 0; i < 5; i++) expect((await h.post(good({ requestId: `r-${i}-0000000` }))).status).toBe(200);
    const r = await h.post(good({ requestId: 'r-6-00000000' }));
    expect(r.status).toBe(429);
    expect(r.body).toMatchObject({ success: false, code: 'rate', error: expect.stringMatching(/aspetta qualche minuto/i) });
    expect(Number(r.headers?.['Retry-After'])).toBeGreaterThan(0);
    // Un altro visitatore passa.
    expect((await h.post(good({ requestId: 'r-7-00000000' }), '198.51.100.9')).status).toBe(200);
    // Passata la finestra, si riparte.
    h.advance(10 * 60_000 + 1000);
    expect((await h.post(good({ requestId: 'r-8-00000000' }))).status).toBe(200);
  });

  it('un invio fallito per colpa nostra non pesa sul limite del visitatore', async () => {
    const h = harness({ sendMail: async () => { throw new Error('giu'); } });
    for (let i = 0; i < 8; i++) expect((await h.post(good({ requestId: `f-${i}-0000000` }))).status).toBe(503);
  });
});

describe('SendGrid che fallisce', () => {
  it('una volta sola: secondo tentativo dopo 400 ms, il visitatore vede un successo', async () => {
    let calls = 0;
    const h = harness({
      sendMail: async (m) => {
        calls++;
        if (calls === 1) throw new Error('503 temporaneo');
        h.sent.push(m);
      },
    });
    const t0 = h.deps.now();
    const r = await h.post(good());
    expect(r.status).toBe(200);
    expect(r.body).toMatchObject({ delivered: { team: true, client: true } });
    expect(h.deps.now() - t0).toBe(TIMING.teamRetryAfterMs);
    expect(h.sent[0].to).toEqual(TEAM_EMAILS);
  });

  it('sempre: 503 solo perche\' il team non ha ricevuto nulla, riga [lead-recovery] col contatto completo, nessuna copia al cliente', async () => {
    const sendMail = vi.fn(async () => { throw Object.assign(new Error('Forbidden'), { code: 403 }); });
    const h = harness({ sendMail });
    const r = await h.post(good({ message: 'Riga uno\nriga due' }));
    expect(r.status).toBe(503);
    expect(r.body).toMatchObject({ success: false, code: 'unavailable', error: expect.stringContaining('WhatsApp') });
    expect((r.body as { error: string }).error).toContain('hello@wearerighello.com');
    expect(sendMail).toHaveBeenCalledTimes(2); // solo la mail al team, due tentativi, nessuna copia al cliente
    const line = h.logs.find((l) => l.startsWith('[lead-recovery] '))!;
    expect(line).not.toContain('\n');
    const rec = JSON.parse(line.slice('[lead-recovery] '.length));
    expect(rec).toMatchObject({ reference: referenceFor('req-1234567890'), reason: 'team-mail-failed', contact: { name: 'Marco Bianchi', email: 'marco@azienda.it', phone: '+39 333 123 4567', message: 'Riga uno\nriga due', source: { path: '/progetti/tetha' } } });
    expect(rec.error).toContain('Forbidden');
  });

  it('solo la copia al cliente fallisce: 200 con client:false', async () => {
    const h = harness({ sendMail: async (m) => { if (m.to === 'marco@azienda.it') throw new Error('mailbox piena'); h.sent.push(m); } });
    const r = await h.post(good());
    expect(r.status).toBe(200);
    expect(r.body).toMatchObject({ success: true, delivered: { team: true, client: false } });
    expect(h.sent).toHaveLength(1);
  });

  it('un invio che non risponde: tempo massimo di 4 s, poi il secondo tentativo', async () => {
    vi.useFakeTimers();
    let calls = 0;
    const h = harness({
      sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
      sendMail: (m) => {
        calls++;
        if (calls === 1) return new Promise(() => {}); // non risponde mai
        h.sent.push(m);
        return Promise.resolve();
      },
    });
    const p = h.post(good());
    await vi.advanceTimersByTimeAsync(TIMING.teamAttemptMs + TIMING.teamRetryAfterMs + 10);
    const r = await p;
    expect(r.status).toBe(200);
    expect(h.sent[0].to).toEqual(TEAM_EMAILS);
  });
});

describe('OpenAI (CONTACT_AI)', () => {
  it('acceso: la mail al team parte PRIMA, poi il testo migliorato va solo al cliente', async () => {
    const order: string[] = [];
    const h = harness({
      env: { CONTACT_AI: '1' },
      sendMail: async (m) => { order.push(Array.isArray(m.to) ? 'team' : 'cliente'); h.sent.push(m); },
      improveClientBody: vi.fn(async () => { order.push('ai'); return 'Paragrafo del modello.'; }),
    });
    await h.post(good());
    expect(order).toEqual(['team', 'ai', 'cliente']);
    expect(h.sent[1].html).toContain('Paragrafo del modello.');
    expect(h.sent[0].html).not.toContain('Paragrafo del modello.');
  });

  it('acceso ma lento: dopo 4 s si manda il testo di sempre e il team ha gia\' tutto', async () => {
    vi.useFakeTimers();
    const h = harness({ env: { CONTACT_AI: '1' }, improveClientBody: () => new Promise(() => {}) });
    const p = h.post(good());
    await vi.advanceTimersByTimeAsync(TIMING.aiMs + 10);
    const r = await p;
    expect(r.status).toBe(200);
    expect(h.sent).toHaveLength(2);
    expect(h.sent[1].html).not.toContain('Paragrafo');
    expect(h.sent[1].html).toContain('Ti rispondiamo entro 72 ore lavorative');
  });

  it('acceso ma in errore: nessun effetto sul contatto', async () => {
    const h = harness({ env: { CONTACT_AI: '1' }, improveClientBody: async () => { throw new Error('quota'); } });
    expect((await h.post(good())).status).toBe(200);
    expect(h.sent).toHaveLength(2);
  });
});

describe('CONTACT_DRY_RUN', () => {
  it('non invia nulla e risponde come se fosse riuscito, con lo stesso codice', async () => {
    const h = harness({ env: { CONTACT_DRY_RUN: '1' } });
    const r = await h.post(good());
    expect(r.status).toBe(200);
    expect(r.body).toEqual({ success: true, reference: referenceFor('req-1234567890'), delivered: { team: true, client: true } });
    expect(h.sent).toHaveLength(0);
    expect(h.logs.some((l) => l.startsWith('[contact-dry-run]'))).toBe(true);
  });

  it('valida lo stesso e non applica il limite (i test locali ripetono gli invii)', async () => {
    const h = harness({ env: { CONTACT_DRY_RUN: '1' } });
    expect((await h.post(good({ name: '' }))).status).toBe(400);
    for (let i = 0; i < 12; i++) expect((await h.post(good({ requestId: `d-${i}-0000000` }))).status).toBe(200);
  });

  it('in produzione viene ignorato: i contatti si inviano sempre', async () => {
    const h = harness({ env: { CONTACT_DRY_RUN: '1', VERCEL_ENV: 'production' } });
    await h.post(good());
    expect(h.sent).toHaveLength(2);
    expect(h.logs.some((l) => l.includes('CONTACT_DRY_RUN=1 ignorato'))).toBe(true);
  });
});

describe('prestazioni dell\'invio', () => {
  it('con SendGrid a 300 ms il visitatore aspetta ~600 ms (team + copia), mai le chiamate a OpenAI', async () => {
    const h = harness({ sendMail: async (m) => { await new Promise((r) => setTimeout(r, 300)); h.sent.push(m); }, now: () => Date.now() });
    const t = performance.now();
    const r = await h.post(good({ openedAt: Date.now() - 20_000 }));
    const ms = performance.now() - t;
    expect(r.status).toBe(200);
    expect(ms).toBeLessThan(900);
    expect(h.deps.improveClientBody).not.toHaveBeenCalled();
  });
});
