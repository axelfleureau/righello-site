/**
 * Chi puo' leggere il sito, in un punto solo.
 *
 * `hooks.server.ts` (risponde 403 a chi e' elencato come bloccato) e `robots.txt` (lo dichiara)
 * leggono entrambi da qui: le due cose non possono piu' dire cose diverse.
 *
 * La scelta: il sito e' un biglietto da visita, quindi si lascia leggere a tutto cio' che
 * alimenta ricerca e risposte (motori di ricerca, assistenti AI che rispondono, anteprime dei
 * social). Restano fuori gli strumenti che copiano il sito intero, gli analizzatori SEO di terzi e
 * i crawler che servono ad ADDESTRARE modelli: e' la stessa linea che Cloudflare applica al
 * robots.txt gestito del dominio («ricerca si', addestramento no, uso come riferimento»), cosi'
 * le due parti del file non si contraddicono.
 */
import { SITE_URL } from '$lib/data/site';

/** Motori di ricerca. */
export const SEARCH_CRAWLERS = [
  'Googlebot',
  'Google-InspectionTool',
  'GoogleOther',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Applebot'
] as const;

/** Chi costruisce l'anteprima di un link condiviso (social e messaggi). */
export const PREVIEW_CRAWLERS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'TelegramBot',
  'Slackbot',
  'Discordbot'
] as const;

/** Assistenti e motori di risposta AI: leggono una pagina per rispondere a una persona o per citare il sito. Ammessi. */
export const AI_ANSWER_CRAWLERS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'MistralAI-User',
  'Meta-ExternalFetcher',
  'DuckAssistBot',
  'YouBot'
] as const;

/** Crawler che raccolgono testi per addestrare modelli AI: robots.txt li chiude (il server non risponde 403, e' una richiesta di cortesia). */
export const AI_TRAINING_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'cohere-ai',
  'Amazonbot',
  'Meta-ExternalAgent'
] as const;

export const AI_CRAWLERS = [...AI_ANSWER_CRAWLERS, ...AI_TRAINING_CRAWLERS] as const;

/** Copiatori di siti e analizzatori SEO di terzi: fuori. */
export const BLOCKED_CRAWLERS = [
  'HTTrack',
  'WebCopier',
  'WebZIP',
  'Teleport',
  'SiteSnagger',
  'WebStripper',
  'SiteSucker',
  'WebReaper',
  'NetAnts',
  'BlackWidow',
  'Offline Explorer',
  'Scrapy',
  'libwww-perl',
  'lwp-trivial',
  'MJ12bot',
  'DotBot',
  'AhrefsBot',
  'SemrushBot',
  'BLEXBot',
  'DataForSeoBot',
  'magpie-crawler',
  'Bytespider',
  'PetalBot',
  'ia_archiver'
] as const;

export const ALLOWED_CRAWLERS = [...SEARCH_CRAWLERS, ...PREVIEW_CRAWLERS, ...AI_ANSWER_CRAWLERS] as const;

/** Percorsi che nessun motore deve leggere: area riservata e rotte di servizio. */
export const PRIVATE_PATHS = ['/api/', '/admin'] as const;

/** Vero se lo user agent contiene il nome di uno dei bot bloccati (senza badare alle maiuscole). */
export function isBlockedUserAgent(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BLOCKED_CRAWLERS.some((bot) => ua.includes(bot.toLowerCase()));
}

/** Il testo di `/robots.txt`. */
export function robotsTxt(): string {
  const group = (agents: readonly string[], rules: string[]) =>
    [...agents.map((a) => `User-agent: ${a}`), ...rules].join('\n');
  const open = ['Allow: /', ...PRIVATE_PATHS.map((p) => `Disallow: ${p}`)];
  return [
    [
      '# Righello: il sito si lascia leggere a motori di ricerca, assistenti AI che rispondono e anteprime dei social.',
      "# I crawler che addestrano modelli AI sono esclusi, come nella parte gestita da Cloudflare.",
      "# L'elenco vive in src/lib/seo/crawlers.ts (lo legge anche il server per rispondere 403 ai bot bloccati)."
    ].join('\n'),
    group(ALLOWED_CRAWLERS, open),
    group([...AI_TRAINING_CRAWLERS, ...BLOCKED_CRAWLERS], ['Disallow: /']),
    group(['*'], open),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    ''
  ].join('\n\n');
}
