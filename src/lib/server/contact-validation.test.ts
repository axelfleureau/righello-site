import { describe, expect, it } from 'vitest';
import { internationalDigits, isValidEmail, isValidPhone, LIMITS, multiLine, oneLine, telHref, validateContact } from './contact-validation';

const base = { name: 'Marco Bianchi', email: 'marco@azienda.it', message: 'Ci serve un sito.' };

function ok(data: unknown) {
  const r = validateContact(data);
  if (!r.ok) throw new Error(`atteso valido, errore: ${r.error}`);
  return r;
}

describe('validateContact: casi buoni', () => {
  it('accetta solo email, senza messaggio e senza telefono', () => {
    const { input } = ok({ name: 'Anna', email: 'anna@x.it' });
    expect(input).toMatchObject({ name: 'Anna', email: 'anna@x.it', phone: '', message: '' });
  });

  it('accetta solo telefono', () => {
    const { input } = ok({ name: 'Anna', phone: '+39 333 123 4567' });
    expect(input.email).toBe('');
    expect(input.phone).toBe('+39 333 123 4567');
  });

  it('accetta entrambi i recapiti e tutti i campi facoltativi', () => {
    const { input, meta } = ok({
      ...base,
      phone: '333 1234567',
      company: 'ACME',
      service: 'Sviluppo Web & Software',
      budget: 'Da definire',
      requestId: 'a1b2c3d4-e5f6-7890',
      openedAt: 1234,
      source: { path: '/progetti/tetha', cta: 'hero', from: 'tetha', referrer: 'https://www.google.com/', utm: { source: 'google', medium: 'cpc' } },
    });
    expect(input).toMatchObject({ company: 'ACME', service: 'Sviluppo Web & Software', budget: 'Da definire' });
    expect(input.source).toEqual({ path: '/progetti/tetha', cta: 'hero', from: 'tetha', referrer: 'https://www.google.com/', utm: { source: 'google', medium: 'cpc' } });
    expect(meta).toEqual({ requestId: 'a1b2c3d4-e5f6-7890', hp: '', openedAt: 1234 });
  });

  it('accetta cio\' che mandava la pagina del bando (senza requestId, budget libero)', () => {
    const { input, meta } = ok({ name: 'Luisa', company: 'Srl', email: 'l@srl.it', phone: '0432 123456', service: 'Bando Intelligenza Artificiale FVG 2026', budget: 'Da definire - contributo fino a 10.000€', message: 'Telefono: 0432 123456\n\nRichiesta: consulenza' });
    expect(input.budget).toContain('contributo');
    expect(meta.requestId).toBe('');
  });

  it('normalizza: dominio in minuscolo, spazi compattati, nome su una riga', () => {
    const { input } = ok({ name: '  Marco   \n Bianchi ', email: ' Marco@AZIENDA.IT ' });
    expect(input.name).toBe('Marco Bianchi');
    expect(input.email).toBe('Marco@azienda.it');
  });
});

describe('validateContact: casi cattivi', () => {
  const bad = (data: unknown) => {
    const r = validateContact(data);
    expect(r.ok).toBe(false);
    return r as Extract<ReturnType<typeof validateContact>, { ok: false }>;
  };

  it('rifiuta corpi che non sono oggetti', () => {
    for (const v of [null, undefined, 'x', 42, [], true]) expect(bad(v).error).toMatch(/non è leggibile/);
  });

  it('chiede il nome', () => {
    for (const name of [undefined, '', '   ', 12, null]) expect(bad({ ...base, name }).fields.name).toBeTruthy();
  });

  it('rifiuta un nome oltre 120 caratteri', () => {
    expect(bad({ ...base, name: 'a'.repeat(LIMITS.name + 1) }).fields.name).toMatch(/troppo lungo/);
    expect(ok({ ...base, name: 'a'.repeat(LIMITS.name) }).input.name).toHaveLength(LIMITS.name);
  });

  it('chiede almeno un recapito', () => {
    const r = bad({ name: 'Anna', message: 'ciao' });
    expect(r.fields.contact).toMatch(/un’email oppure un numero/);
    expect(bad({ name: 'Anna', email: '  ', phone: ' ' }).fields.contact).toBeTruthy();
  });

  it.each(['senza-chiocciola', 'a@b', 'a@@b.it', 'a b@c.it', 'a@b.it, c@d.it', 'a@b.it;c@d.it', '<a@b.it>', 'a@b.i'])('rifiuta l\'email %j', (email) => {
    expect(bad({ name: 'Anna', email }).fields.contact).toMatch(/email/);
  });

  it.each(['12345', 'abc', '333-ABC-1234', '1234567890123456', '+39 12'])('rifiuta il telefono %j', (phone) => {
    expect(bad({ name: 'Anna', phone }).fields.contact).toMatch(/telefono/);
  });

  it('un recapito sbagliato non si salva col recapito giusto accanto: lo si segnala', () => {
    expect(bad({ name: 'Anna', email: 'sbagliata', phone: '333 1234567' }).fields.contact).toMatch(/email/);
  });

  it('rifiuta un messaggio oltre 4000 caratteri', () => {
    expect(bad({ ...base, message: 'x'.repeat(4001) }).fields.message).toMatch(/4000/);
    expect(ok({ ...base, message: 'x'.repeat(4000) }).input.message).toHaveLength(4000);
  });

  it('un valore non testuale nei campi facoltativi non rompe nulla', () => {
    const { input } = ok({ ...base, company: { a: 1 }, service: 5, budget: [], message: 7, source: 'x' });
    expect(input).toMatchObject({ company: '', service: '', budget: '', message: '' });
    expect(input.source).toBeUndefined();
  });
});

describe('normalizzazione e iniezione di intestazioni', () => {
  it('toglie a capo e caratteri di controllo dai campi su una riga', () => {
    const { input } = ok({
      name: 'Marco\r\nBcc: spia@example.com',
      email: 'marco@azienda.it',
      company: 'ACME\nSubject: falso',
      service: 'Altro\u0000',
      budget: 'Da\tdefinire\u2028x',
    });
    for (const v of [input.name, input.company, input.service, input.budget]) expect(v).not.toMatch(/[\r\n\u0000\u2028\t]/);
    expect(input.name).toBe('Marco Bcc: spia@example.com');
  });

  it('un indirizzo con a capo non passa (niente destinatari aggiunti)', () => {
    const r = validateContact({ name: 'A', email: 'a@b.it\r\nBcc: x@y.it' });
    // L'a capo diventa uno spazio: la stringa non e' piu' un indirizzo valido.
    expect(r.ok).toBe(false);
  });

  it('toglie i segni che invertono il verso del testo e gli spazi invisibili', () => {
    expect(oneLine('Mar\u202Eco\u200B', 50)).toBe('Mar co');
    expect(multiLine('a\u202Eb')).toBe('ab');
  });

  it('il messaggio tiene i paragrafi ma non piu\' di una riga vuota', () => {
    expect(multiLine('uno\r\n\r\n\r\n\r\ndue   \n tre')).toBe('uno\n\ndue\n tre');
  });

  it('percorso della provenienza: solo percorsi del sito, mai indirizzi interi', () => {
    expect(ok({ ...base, source: { path: 'https://evil.example/x', cta: 'hero' } }).input.source).toEqual({ path: '', cta: 'hero' });
    expect(ok({ ...base, source: { path: '/' + 'a'.repeat(500) } }).input.source!.path).toHaveLength(LIMITS.path);
  });

  it('requestId non valido = ignorato (il contatto passa lo stesso)', () => {
    expect(ok({ ...base, requestId: 'a b' }).meta.requestId).toBe('');
    expect(ok({ ...base, requestId: 'x'.repeat(200) }).meta.requestId).toBe('');
  });

  it('la trappola scatta con qualsiasi valore non vuoto', () => {
    expect(ok({ ...base, hp: '' }).meta.hp).toBe('');
    expect(ok({ ...base, hp: 'http://spam' }).meta.hp).toBeTruthy();
    expect(ok({ ...base, hp: 1 }).meta.hp).toBeTruthy();
    expect(ok({ ...base, hp: {} }).meta.hp).toBeTruthy();
  });
});

describe('recapiti', () => {
  it('email e telefono', () => {
    expect(isValidEmail('nome.cognome+x@sub.azienda.it')).toBe(true);
    expect(isValidEmail("o'brien@x.ie")).toBe(true);
    expect(isValidPhone('+39 (333) 123-4567')).toBe(true);
    expect(isValidPhone('0432/123456')).toBe(true);
  });

  it('numero internazionale per WhatsApp solo se sicuro', () => {
    expect(internationalDigits('+39 333 123 4567')).toBe('393331234567');
    expect(internationalDigits('0039 333 123 4567')).toBe('393331234567');
    expect(internationalDigits('333 1234567')).toBe('393331234567');
    expect(internationalDigits('0432 123456')).toBeNull(); // fisso senza prefisso: nessun link da inventare
    expect(internationalDigits('+44 20 7946 0958')).toBe('442079460958');
  });

  it('link per chiamare', () => {
    expect(telHref('+39 333 123 4567')).toBe('tel:+393331234567');
    expect(telHref('0432 123456')).toBe('tel:0432123456');
  });
});
