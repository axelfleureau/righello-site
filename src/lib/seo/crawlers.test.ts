import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  AI_ANSWER_CRAWLERS,
  AI_CRAWLERS,
  AI_TRAINING_CRAWLERS,
  ALLOWED_CRAWLERS,
  CLOSED_BY_DOMAIN_CRAWLERS,
  BLOCKED_CRAWLERS,
  isBlockedUserAgent,
  robotsTxt
} from './crawlers';

/** Lo user agent come lo scrive davvero un crawler: il nome sta in mezzo ad altro testo. */
const uaOf = (name: string) =>
  `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ${name}/1.0; +https://example.com/bot) Chrome/120 Safari/537.36`;

/** Le righe `User-agent` e le regole di ogni gruppo del robots.txt. */
function groups(txt: string): Array<{ agents: string[]; rules: string[] }> {
  return txt
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').filter((l) => l && !l.startsWith('#')))
    .filter((lines) => lines.some((l) => l.startsWith('User-agent:')))
    .map((lines) => ({
      agents: lines
        .filter((l) => l.startsWith('User-agent:'))
        .map((l) => l.replace('User-agent:', '').trim()),
      rules: lines.filter((l) => !l.startsWith('User-agent:'))
    }));
}

describe('crawler', () => {
  const txt = robotsTxt();
  const parsed = groups(txt);
  const agentsWith = (rule: string) =>
    parsed.filter((g) => g.rules.includes(rule)).flatMap((g) => g.agents);

  it('nessun nome sta insieme tra i consentiti e i bloccati', () => {
    const allowed = ALLOWED_CRAWLERS.map((n) => n.toLowerCase());
    for (const bot of BLOCKED_CRAWLERS) expect(allowed, bot).not.toContain(bot.toLowerCase());
  });

  it('il server risponde 403 solo a chi robots.txt blocca, e a nessun altro', () => {
    for (const bot of BLOCKED_CRAWLERS) expect(isBlockedUserAgent(uaOf(bot)), bot).toBe(true);
    for (const bot of ALLOWED_CRAWLERS) expect(isBlockedUserAgent(uaOf(bot)), bot).toBe(false);
    expect(
      isBlockedUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1'
      )
    ).toBe(false);
    expect(isBlockedUserAgent('')).toBe(false);
  });

  it('gli assistenti AI che rispondono alle persone sono consentiti', () => {
    for (const bot of [
      'OAI-SearchBot',
      'ChatGPT-User',
      'Claude-User',
      'Claude-SearchBot',
      'PerplexityBot',
      'Perplexity-User',
      'MistralAI-User'
    ]) {
      expect(AI_ANSWER_CRAWLERS as readonly string[], bot).toContain(bot);
      expect(agentsWith('Allow: /'), bot).toContain(bot);
      expect(agentsWith('Disallow: /'), bot).not.toContain(bot);
    }
  });

  it("i crawler che addestrano modelli AI sono chiusi, come nella parte di robots.txt gestita da Cloudflare", () => {
    for (const bot of [
      'GPTBot',
      'ClaudeBot',
      'anthropic-ai',
      'Google-Extended',
      'Applebot-Extended',
      'CCBot',
      'cohere-ai',
      'Amazonbot',
      'Meta-ExternalAgent',
      'GoogleOther'
    ]) {
      expect(AI_TRAINING_CRAWLERS as readonly string[], bot).toContain(bot);
      expect(agentsWith('Disallow: /'), bot).toContain(bot);
      expect(agentsWith('Allow: /'), bot).not.toContain(bot);
    }
  });

  it('nessun crawler e\' consentito e chiuso nello stesso robots.txt (le due serie di regole non si contraddicono)', () => {
    const aperti = new Set(agentsWith('Allow: /').map((n) => n.toLowerCase()));
    for (const bot of agentsWith('Disallow: /')) expect(aperti.has(bot.toLowerCase()), bot).toBe(false);
  });

  it("nessun crawler consentito dal sito e' chiuso dal robots.txt gestito da Cloudflare (elenco letto sul sito il 21/11/2026)", () => {
    const chiusiDaCloudflare = [
      'AhrefsBot', 'Amazonbot', 'Applebot-Extended', 'AwarioRssBot', 'AwarioSmartBot', 'BLEXBot', 'Baiduspider',
      'BlackWidow', 'BorderxBot', 'Bytespider', 'CCBot', 'CitibotSiteCrawler', 'Claude-Web', 'ClaudeBot', 'Cotoyogi',
      'DataForSeoBot', 'Diffbot', 'DotBot', 'FishBot', 'GPTBot', 'Google-CloudVertexBot', 'Google-Extended',
      'GoogleOther', 'HTTrack', 'ICC-Crawler', 'KimiBot', 'MJ12bot', 'MistralAI-Training', 'NavuBot', 'NetAnts',
      'Offline Explorer', 'PetalBot', 'QualifiedBot', 'Scrapy', 'SemrushBot', 'SemrushBot-SWA', 'SiteSnagger',
      'SiteSucker', 'Teleport', 'WARDBot', 'WebCopier', 'WebReaper', 'WebStripper', 'WebZIP', 'anthropic-ai',
      'atlassian-bot', 'cohere-ai', 'ia_archiver', 'libwww-perl', 'lwp-trivial', 'magpie-crawler',
      'meta-externalagent', 'omgili'
    ].map((n) => n.toLowerCase());
    for (const bot of ALLOWED_CRAWLERS)
      expect(chiusiDaCloudflare, `${bot}: Cloudflare lo chiude, il sito lo ammette`).not.toContain(bot.toLowerCase());
  });

  it('robots.txt chiude i bot bloccati dal server e quelli che addestrano modelli, e nessun altro', () => {
    expect(agentsWith('Disallow: /').sort()).toEqual(
      [...AI_TRAINING_CRAWLERS, ...CLOSED_BY_DOMAIN_CRAWLERS, ...BLOCKED_CRAWLERS].sort()
    );
  });

  it('non chiude codice, stili, immagini e il resto di quello che serve a leggere le pagine', () => {
    const disallowed = parsed
      .flatMap((g) => g.rules)
      .filter((r) => r.startsWith('Disallow:') && r !== 'Disallow: /');
    for (const path of ['/_app/', '/fonts/', '/og/', '/products/', '/progetti/', '/favicon.ico']) {
      expect(
        disallowed.some(
          (r) =>
            r.replace('Disallow:', '').trim() !== '' &&
            path.startsWith(r.replace('Disallow:', '').trim())
        ),
        path
      ).toBe(false);
    }
    expect(disallowed).toEqual(expect.arrayContaining(['Disallow: /api/', 'Disallow: /admin']));
  });

  it('indica la mappa del sito', () => {
    expect(txt).toMatch(/^Sitemap: https:\/\/www\.wearerighello\.com\/sitemap\.xml$/m);
  });

  it('il server non tiene una sua lista: usa quella condivisa', () => {
    const hooks = readFileSync('src/hooks.server.ts', 'utf8');
    expect(hooks).toContain('isBlockedUserAgent');
    for (const bot of [...BLOCKED_CRAWLERS, ...AI_CRAWLERS])
      expect(hooks, bot).not.toContain(`'${bot}'`);
  });

  it("non c'e' piu' un robots.txt scritto a mano che possa divergere", () => {
    expect(() => readFileSync('static/robots.txt')).toThrow();
  });
});
