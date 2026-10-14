import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { AI_CRAWLERS, ALLOWED_CRAWLERS, BLOCKED_CRAWLERS, isBlockedUserAgent, robotsTxt } from './crawlers';

/** Lo user agent come lo scrive davvero un crawler: il nome sta in mezzo ad altro testo. */
const uaOf = (name: string) => `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ${name}/1.0; +https://example.com/bot) Chrome/120 Safari/537.36`;

/** Le righe `User-agent` e le regole di ogni gruppo del robots.txt. */
function groups(txt: string): Array<{ agents: string[]; rules: string[] }> {
  return txt
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').filter((l) => l && !l.startsWith('#')))
    .filter((lines) => lines.some((l) => l.startsWith('User-agent:')))
    .map((lines) => ({
      agents: lines.filter((l) => l.startsWith('User-agent:')).map((l) => l.replace('User-agent:', '').trim()),
      rules: lines.filter((l) => !l.startsWith('User-agent:')),
    }));
}

describe('crawler', () => {
  const txt = robotsTxt();
  const parsed = groups(txt);
  const agentsWith = (rule: string) => parsed.filter((g) => g.rules.includes(rule)).flatMap((g) => g.agents);

  it('nessun nome sta insieme tra i consentiti e i bloccati', () => {
    const allowed = ALLOWED_CRAWLERS.map((n) => n.toLowerCase());
    for (const bot of BLOCKED_CRAWLERS) expect(allowed, bot).not.toContain(bot.toLowerCase());
  });

  it('il server risponde 403 solo a chi robots.txt blocca, e a nessun altro', () => {
    for (const bot of BLOCKED_CRAWLERS) expect(isBlockedUserAgent(uaOf(bot)), bot).toBe(true);
    for (const bot of ALLOWED_CRAWLERS) expect(isBlockedUserAgent(uaOf(bot)), bot).toBe(false);
    expect(isBlockedUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1')).toBe(false);
    expect(isBlockedUserAgent('')).toBe(false);
  });

  it('i crawler AI che alimentano ricerca e risposte sono tutti consentiti', () => {
    for (const bot of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'cohere-ai', 'Amazonbot', 'MistralAI-User']) {
      expect(AI_CRAWLERS as readonly string[], bot).toContain(bot);
      expect(agentsWith('Allow: /'), bot).toContain(bot);
      expect(agentsWith('Disallow: /'), bot).not.toContain(bot);
    }
  });

  it('robots.txt dichiara come bloccati gli stessi bot del server, e solo quelli', () => {
    expect(agentsWith('Disallow: /').sort()).toEqual([...BLOCKED_CRAWLERS].sort());
  });

  it('non chiude codice, stili, immagini e il resto di quello che serve a leggere le pagine', () => {
    const disallowed = parsed.flatMap((g) => g.rules).filter((r) => r.startsWith('Disallow:') && r !== 'Disallow: /');
    for (const path of ['/_app/', '/fonts/', '/og/', '/products/', '/progetti/', '/favicon.ico']) {
      expect(disallowed.some((r) => r.replace('Disallow:', '').trim() !== '' && path.startsWith(r.replace('Disallow:', '').trim())), path).toBe(false);
    }
    expect(disallowed).toEqual(expect.arrayContaining(['Disallow: /api/', 'Disallow: /admin']));
  });

  it('indica la mappa del sito', () => {
    expect(txt).toMatch(/^Sitemap: https:\/\/www\.wearerighello\.com\/sitemap\.xml$/m);
  });

  it('il server non tiene una sua lista: usa quella condivisa', () => {
    const hooks = readFileSync('src/hooks.server.ts', 'utf8');
    expect(hooks).toContain('isBlockedUserAgent');
    for (const bot of [...BLOCKED_CRAWLERS, ...AI_CRAWLERS]) expect(hooks, bot).not.toContain(`'${bot}'`);
  });

  it('non c\'e\' piu\' un robots.txt scritto a mano che possa divergere', () => {
    expect(() => readFileSync('static/robots.txt')).toThrow();
  });
});
