import { beforeEach, describe, expect, it, vi } from 'vitest';

const send = vi.fn(async (_msg: unknown) => {});
const getOpenAI = vi.fn(() => {
  throw new Error('OpenAI non deve essere chiamato dal percorso del contatto');
});

vi.mock('$lib/server/sendgrid', () => ({
  getUncachableSendGridClient: async () => ({ fromEmail: 'hello@wearerighello.com', client: { send } }),
}));
vi.mock('$lib/server/openai', () => ({ getOpenAI }));

import { POST } from './+server';

type Event = Parameters<typeof POST>[0];

let n = 0;
async function post(body: unknown, headers: Record<string, string> = {}, raw?: string) {
  const request = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: raw ?? JSON.stringify(body),
  });
  const res = await POST({ request, getClientAddress: () => '127.0.0.1' } as unknown as Event);
  return { status: res.status, json: await res.json(), headers: res.headers };
}

const good = () => ({
  requestId: `endpoint-test-${++n}-aaaa`,
  name: 'Marco Bianchi',
  email: 'marco@azienda.it',
  service: 'Altro',
  message: 'Ci serve un sito.',
  openedAt: Date.now() - 10_000,
});

beforeEach(() => {
  send.mockClear();
  getOpenAI.mockClear();
  delete process.env.CONTACT_AI;
  delete process.env.CONTACT_DRY_RUN;
});

describe('POST /api/contact', () => {
  it('200 col codice, due mail (team e cliente), nessuna chiamata a OpenAI', async () => {
    const r = await post(good(), { 'x-forwarded-for': '203.0.113.10' });
    expect(r.status).toBe(200);
    expect(r.json).toMatchObject({ success: true, reference: expect.stringMatching(/^RH-[A-Z2-9]{6}$/), delivered: { team: true, client: true } });
    expect(send).toHaveBeenCalledTimes(2);
    expect(getOpenAI).not.toHaveBeenCalled();
    expect(r.headers.get('cache-control')).toBe('no-store');
    const first = send.mock.calls[0][0] as { to: string[]; from: { email: string; name: string }; replyTo: { email: string } };
    expect(first.to).toContain('axel@wearerighello.com');
    expect(first.from).toEqual({ email: 'hello@wearerighello.com', name: 'Righello Contact Form' });
    expect(first.replyTo.email).toBe('marco@azienda.it');
  });

  it('400 se il corpo non e\' JSON o e\' troppo grande', async () => {
    const a = await post(null, {}, '{non json');
    expect(a.status).toBe(400);
    expect(a.json).toMatchObject({ success: false, code: 'invalid' });
    const b = await post(null, {}, JSON.stringify({ name: 'a'.repeat(40_000) }));
    expect(b.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('400 con i campi che mancano', async () => {
    const r = await post({ name: 'Anna' }, { 'x-forwarded-for': '203.0.113.11' });
    expect(r.status).toBe(400);
    expect(r.json.fields.contact).toBeTruthy();
  });

  it('429 dopo 5 richieste dallo stesso indirizzo, con Retry-After', async () => {
    const ip = { 'x-forwarded-for': '203.0.113.12' };
    for (let i = 0; i < 5; i++) expect((await post(good(), ip)).status).toBe(200);
    const r = await post(good(), ip);
    expect(r.status).toBe(429);
    expect(r.json).toMatchObject({ success: false, code: 'rate' });
    expect(Number(r.headers.get('retry-after'))).toBeGreaterThan(0);
  });

  it('503 solo se il team non riceve nulla', async () => {
    send.mockRejectedValueOnce(new Error('giu')).mockRejectedValueOnce(new Error('giu'));
    const r = await post(good(), { 'x-forwarded-for': '203.0.113.13' });
    expect(r.status).toBe(503);
    expect(r.json).toMatchObject({ success: false, code: 'unavailable' });
  });

  it('con CONTACT_DRY_RUN=1 non invia nulla', async () => {
    process.env.CONTACT_DRY_RUN = '1';
    const r = await post(good());
    expect(r.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });
});
