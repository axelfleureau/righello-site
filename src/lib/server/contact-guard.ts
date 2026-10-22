/**
 * Difese del modulo contatti, tutte senza attrito per chi scrive davvero (nessun CAPTCHA):
 *  - trappola nascosta (`hp`) e tempo minimo fra apertura e invio;
 *  - testo con troppi link o parole tipiche dello spam;
 *  - limite per indirizzo (5 ogni 10 minuti, 30 al giorno);
 *  - stesso `requestId` entro 15 minuti = stesso esito, senza secondo invio.
 *
 * Lo stato sta in memoria del processo: su un'istanza serverless e' un limite "best effort" per istanza,
 * non globale (vedi docs/contatto.md). Basta contro bot e doppi tocchi, non contro un attacco distribuito.
 */
import type { ContactInput } from './contact-validation';

export const GUARD = {
  minFillMs: 1500,
  maxLinks: 3,
  rateWindowMs: 10 * 60_000,
  rateMax: 5,
  dayMs: 24 * 60 * 60_000,
  dayMax: 30,
  /** Indirizzo non riconoscibile (proxy locale, intestazioni assenti): un solo secchio condiviso, quindi molto piu' largo. */
  unknownRateMax: 60,
  unknownDayMax: 400,
  idempotencyMs: 15 * 60_000,
  idempotencyMaxEntries: 2000,
} as const;

export type SpamReason = 'honeypot' | 'too-fast' | 'links' | 'keywords' | 'script';

// Parole che in un modulo di agenzia non compaiono mai in una richiesta vera.
const SPAM_WORDS =
  /\b(viagra|cialis|casino|porn|xxx|escort|payday\s*loan|forex\s*signals?|bitcoin\s*(investment|doubler)|make\s*money\s*fast|earn\s*\$|backlinks?\s*(package|service|offer)|guaranteed\s*(rank|traffic)|buy\s*followers|click\s*here)\b/i;

function letterShare(text: string, re: RegExp): { letters: number; match: number } {
  const letters = text.match(/\p{L}/gu)?.length ?? 0;
  const match = text.match(re)?.length ?? 0;
  return { letters, match };
}

/**
 * Restituisce il motivo se il contatto e' da scartare in silenzio, altrimenti `null`.
 * L'ora di apertura arriva dal client: se il suo orologio e' sfasato il confronto non e' affidabile,
 * quindi scatta solo quando la differenza e' fra 0 e 1,5 s (un orologio in anticipo non fa mai scattare nulla).
 */
export function detectSpam(input: ContactInput, meta: { hp: string; openedAt: number | null }, now: number): SpamReason | null {
  if (meta.hp) return 'honeypot';
  if (meta.openedAt !== null) {
    const elapsed = now - meta.openedAt;
    if (elapsed >= 0 && elapsed < GUARD.minFillMs) return 'too-fast';
  }
  const text = `${input.name}\n${input.company}\n${input.message}`;
  if ((text.match(/http/gi)?.length ?? 0) > GUARD.maxLinks) return 'links';
  if (SPAM_WORDS.test(text)) return 'keywords';
  // Messaggi scritti quasi tutti in cirillico o in ideogrammi: e' la forma piu' comune di spam da moduli italiani.
  const { letters, match } = letterShare(input.message, /[\p{Script=Cyrillic}\p{Script=Han}\p{Script=Hangul}\p{Script=Arabic}]/gu);
  if (letters >= 20 && match / letters >= 0.5) return 'script';
  return null;
}

/** Indirizzo del visitatore dalle intestazioni del proxy; `unknown` se non si riconosce o e' interno. */
export function clientKey(headers: Headers, getClientAddress?: () => string): string {
  const candidates = [
    headers.get('cf-connecting-ip'),
    headers.get('x-vercel-forwarded-for'),
    headers.get('x-forwarded-for')?.split(',')[0],
    headers.get('x-real-ip'),
  ];
  try {
    candidates.push(getClientAddress?.() ?? null);
  } catch {
    /* getClientAddress lancia se l'adapter non conosce l'indirizzo */
  }
  for (const raw of candidates) {
    const ip = raw?.trim().toLowerCase();
    if (!ip || ip.length > 45 || !/^[0-9a-f:.]+$/.test(ip)) continue;
    if (isInternal(ip)) continue;
    return ip;
  }
  return 'unknown';
}

function isInternal(ip: string): boolean {
  return (
    ip === '::1' ||
    ip.startsWith('127.') ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    ip.startsWith('169.254.') ||
    ip.startsWith('fc') ||
    ip.startsWith('fd') ||
    ip.startsWith('fe80:')
  );
}

export type RateDecision = { ok: true; release: () => void } | { ok: false; retryAfterSec: number };

export class RateLimiter {
  private hits = new Map<string, number[]>();
  private lastSweep = 0;

  /** Conta una richiesta per `key`. `release` la restituisce (usata se l'invio fallisce per colpa nostra). */
  take(key: string, now: number): RateDecision {
    this.sweep(now);
    const unknown = key === 'unknown';
    const max = unknown ? GUARD.unknownRateMax : GUARD.rateMax;
    const dayMax = unknown ? GUARD.unknownDayMax : GUARD.dayMax;
    const list = (this.hits.get(key) ?? []).filter((t) => now - t < GUARD.dayMs);
    const recent = list.filter((t) => now - t < GUARD.rateWindowMs);

    if (recent.length >= max) {
      return { ok: false, retryAfterSec: Math.max(1, Math.ceil((recent[0] + GUARD.rateWindowMs - now) / 1000)) };
    }
    if (list.length >= dayMax) {
      return { ok: false, retryAfterSec: Math.max(1, Math.ceil((list[0] + GUARD.dayMs - now) / 1000)) };
    }
    list.push(now);
    this.hits.set(key, list);
    return {
      ok: true,
      release: () => {
        const cur = this.hits.get(key);
        if (!cur) return;
        const i = cur.lastIndexOf(now);
        if (i >= 0) cur.splice(i, 1);
        if (!cur.length) this.hits.delete(key);
      },
    };
  }

  /** Pulizia pigra: una volta al minuto toglie chi non ha piu' richieste nella finestra del giorno. */
  private sweep(now: number) {
    if (now - this.lastSweep < 60_000) return;
    this.lastSweep = now;
    for (const [key, list] of this.hits) {
      const live = list.filter((t) => now - t < GUARD.dayMs);
      if (live.length) this.hits.set(key, live);
      else this.hits.delete(key);
    }
  }

  get size() {
    return this.hits.size;
  }
}

/** Esiti recenti per `requestId`: chi tocca due volte (o riprova su rete lenta) ottiene lo stesso esito. */
export class IdempotencyCache<T> {
  private entries = new Map<string, { at: number; hash: string; value: T }>();

  /** Lo stesso id con un contenuto diverso e' un invio diverso (il cliente ha corretto il testo): non e' un doppione. */
  get(id: string, hash: string, now: number): T | undefined {
    this.sweep(now);
    const entry = this.entries.get(id);
    return entry && entry.hash === hash ? entry.value : undefined;
  }

  set(id: string, hash: string, value: T, now: number) {
    this.entries.delete(id);
    this.entries.set(id, { at: now, hash, value });
    while (this.entries.size > GUARD.idempotencyMaxEntries) {
      const oldest = this.entries.keys().next().value;
      if (oldest === undefined) break;
      this.entries.delete(oldest);
    }
  }

  delete(id: string, hash: string) {
    const entry = this.entries.get(id);
    if (entry && entry.hash === hash) this.entries.delete(id);
  }

  private sweep(now: number) {
    for (const [id, entry] of this.entries) {
      if (now - entry.at < GUARD.idempotencyMs) break; // le voci sono in ordine di inserimento
      this.entries.delete(id);
    }
  }

  get size() {
    return this.entries.size;
  }
}
