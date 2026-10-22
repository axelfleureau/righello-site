import { describe, expect, it } from 'vitest';
import { GUARD, IdempotencyCache, RateLimiter, clientKey, detectSpam } from './contact-guard';
import type { ContactInput } from './contact-validation';

const input = (over: Partial<ContactInput> = {}): ContactInput => ({ name: 'Anna', email: 'a@b.it', phone: '', company: '', service: '', budget: '', message: 'Ci serve un sito nuovo.', ...over });
const clean = { hp: '', openedAt: null as number | null };
const NOW = 1_700_000_000_000;

describe('detectSpam', () => {
  it('una richiesta normale passa', () => expect(detectSpam(input(), clean, NOW)).toBeNull());

  it('trappola nascosta', () => expect(detectSpam(input(), { ...clean, hp: 'x' }, NOW)).toBe('honeypot'));

  it('invio entro 1,5 s dall\'apertura', () => {
    expect(detectSpam(input(), { ...clean, openedAt: NOW - 400 }, NOW)).toBe('too-fast');
    expect(detectSpam(input(), { ...clean, openedAt: NOW - GUARD.minFillMs + 1 }, NOW)).toBe('too-fast');
    expect(detectSpam(input(), { ...clean, openedAt: NOW - GUARD.minFillMs }, NOW)).toBeNull();
    expect(detectSpam(input(), { ...clean, openedAt: NOW - 20_000 }, NOW)).toBeNull();
  });

  it('senza openedAt (pagine che non lo mandano) o con orologio del client in anticipo non scatta', () => {
    expect(detectSpam(input(), { ...clean, openedAt: null }, NOW)).toBeNull();
    expect(detectSpam(input(), { ...clean, openedAt: NOW + 3_600_000 }, NOW)).toBeNull();
  });

  it('troppi link', () => {
    const three = 'http://a.it http://b.it https://c.it';
    expect(detectSpam(input({ message: three }), clean, NOW)).toBeNull();
    expect(detectSpam(input({ message: `${three} http://d.it` }), clean, NOW)).toBe('links');
  });

  it('parole tipiche dello spam', () => {
    expect(detectSpam(input({ message: 'Buy VIAGRA now' }), clean, NOW)).toBe('keywords');
    expect(detectSpam(input({ message: 'guaranteed traffic for your site' }), clean, NOW)).toBe('keywords');
  });

  it('una richiesta vera di un\'agenzia non e\' spam (SEO, ads, social, crypto citate)', () => {
    for (const message of [
      'Vorremmo un preventivo per SEO, advertising e social per un\'azienda che vende software.',
      'Abbiamo un progetto crypto e un sito da rifare, https://nostrosito.it',
      'Cerchiamo un partner per automatizzare i preventivi.',
    ]) expect(detectSpam(input({ message }), clean, NOW)).toBeNull();
  });

  it('messaggio quasi tutto in cirillico', () => {
    expect(detectSpam(input({ message: 'Здравствуйте, предлагаем вам продвижение сайта недорого' }), clean, NOW)).toBe('script');
    // Una citazione in un'altra lingua dentro un messaggio italiano non conta.
    expect(detectSpam(input({ message: 'Il nostro slogan è "Привет" e vogliamo rifare il sito aziendale.' }), clean, NOW)).toBeNull();
  });
});

describe('clientKey', () => {
  const h = (o: Record<string, string>) => new Headers(o);
  it('legge le intestazioni del proxy in ordine di fiducia', () => {
    expect(clientKey(h({ 'cf-connecting-ip': '203.0.113.7', 'x-forwarded-for': '198.51.100.1' }))).toBe('203.0.113.7');
    expect(clientKey(h({ 'x-forwarded-for': '198.51.100.1, 10.0.0.1' }))).toBe('198.51.100.1');
  });
  it('indirizzi interni o assenti: secchio condiviso "unknown"', () => {
    expect(clientKey(h({ 'x-forwarded-for': '10.1.2.3' }))).toBe('unknown');
    expect(clientKey(h({}), () => '127.0.0.1')).toBe('unknown');
    expect(clientKey(h({}), () => { throw new Error('no address'); })).toBe('unknown');
    expect(clientKey(h({ 'x-forwarded-for': 'non un indirizzo; drop table' }))).toBe('unknown');
  });
  it('usa getClientAddress se le intestazioni mancano', () => {
    expect(clientKey(h({}), () => '2001:db8::1')).toBe('2001:db8::1');
  });
});

describe('RateLimiter', () => {
  it('5 ogni 10 minuti per indirizzo, poi attesa indicata', () => {
    const rl = new RateLimiter();
    for (let i = 0; i < 5; i++) expect(rl.take('1.1.1.1', NOW + i * 1000).ok).toBe(true);
    const sixth = rl.take('1.1.1.1', NOW + 6000);
    expect(sixth.ok).toBe(false);
    if (!sixth.ok) expect(sixth.retryAfterSec).toBeGreaterThan(500);
    expect(rl.take('2.2.2.2', NOW + 6000).ok).toBe(true); // un altro indirizzo non e' toccato
    expect(rl.take('1.1.1.1', NOW + GUARD.rateWindowMs + 1).ok).toBe(true); // la finestra scorre
  });

  it('30 al giorno', () => {
    const rl = new RateLimiter();
    let t = NOW;
    let accepted = 0;
    // 5 ogni 10 minuti e un po': ben piu' di 30 tentativi nel giorno.
    for (let i = 0; i < 80; i++) {
      t += 3 * 60_000;
      if (rl.take('3.3.3.3', t).ok) accepted++;
    }
    expect(accepted).toBeGreaterThan(20);
    expect(accepted).toBeLessThanOrEqual(30);
    const r = rl.take('3.3.3.3', t + 1);
    expect(r.ok).toBe(false);
  });

  it('release restituisce il tentativo', () => {
    const rl = new RateLimiter();
    const decisions = Array.from({ length: 5 }, () => rl.take('4.4.4.4', NOW));
    expect(rl.take('4.4.4.4', NOW).ok).toBe(false);
    const d = decisions[0];
    if (d.ok) d.release();
    expect(rl.take('4.4.4.4', NOW).ok).toBe(true);
  });

  it('il secchio "unknown" e\' molto piu\' largo', () => {
    const rl = new RateLimiter();
    for (let i = 0; i < GUARD.unknownRateMax; i++) expect(rl.take('unknown', NOW).ok).toBe(true);
    expect(rl.take('unknown', NOW).ok).toBe(false);
  });

  it('pulisce la memoria: chi non ha piu\' richieste nel giorno sparisce', () => {
    const rl = new RateLimiter();
    for (let i = 0; i < 100; i++) rl.take(`203.0.113.${i}`, NOW);
    expect(rl.size).toBe(100);
    rl.take('9.9.9.9', NOW + GUARD.dayMs + 120_000);
    expect(rl.size).toBe(1);
  });
});

describe('IdempotencyCache', () => {
  it('stesso id e stesso contenuto = stesso esito, per 15 minuti', () => {
    const c = new IdempotencyCache<string>();
    c.set('id1', 'h', 'esito', NOW);
    expect(c.get('id1', 'h', NOW + 1000)).toBe('esito');
    expect(c.get('id1', 'h', NOW + GUARD.idempotencyMs + 1)).toBeUndefined();
    expect(c.size).toBe(0);
  });

  it('stesso id con contenuto diverso e\' un invio nuovo', () => {
    const c = new IdempotencyCache<string>();
    c.set('id1', 'h1', 'esito', NOW);
    expect(c.get('id1', 'h2', NOW)).toBeUndefined();
  });

  it('delete toglie solo la voce con quel contenuto; la memoria ha un tetto', () => {
    const c = new IdempotencyCache<number>();
    c.set('a', 'h', 1, NOW);
    c.delete('a', 'altro');
    expect(c.get('a', 'h', NOW)).toBe(1);
    c.delete('a', 'h');
    expect(c.get('a', 'h', NOW)).toBeUndefined();
    for (let i = 0; i < GUARD.idempotencyMaxEntries + 50; i++) c.set(`id${i}`, 'h', i, NOW);
    expect(c.size).toBe(GUARD.idempotencyMaxEntries);
  });
});
