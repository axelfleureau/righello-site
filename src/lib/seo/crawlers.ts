/**
 * Chi puo' leggere il sito, in un punto solo.
 *
 * `hooks.server.ts` (risponde 403 a chi e' elencato come bloccato) e `robots.txt` (lo dichiara)
 * leggono entrambi da qui: le due cose non possono piu' dire cose diverse.
 *
 * La scelta: il sito e' un biglietto da visita, quindi si lascia leggere a tutto cio' che
 * alimenta ricerca e risposte (motori di ricerca, assistenti AI, anteprime dei social).
 * Si tengono fuori solo gli strumenti che copiano il sito intero e gli analizzatori SEO di terzi.
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
  'Applebot',
] as const;

/** Chi costruisce l'anteprima di un link condiviso (social e messaggi). */
export const PREVIEW_CRAWLERS = ['facebookexternalhit', 'Facebot', 'Twitterbot', 'LinkedInBot', 'WhatsApp', 'TelegramBot', 'Slackbot', 'Discordbot'] as const;

/** Assistenti e motori di risposta AI: addestramento, ricerca e lettura di una pagina richiesta da una persona. */
export const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'cohere-ai',
  'Amazonbot',
  'MistralAI-User',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'DuckAssistBot',
  'YouBot',
] as const;

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
  'ia_archiver',
] as const;

export const ALLOWED_CRAWLERS = [...SEARCH_CRAWLERS, ...PREVIEW_CRAWLERS, ...AI_CRAWLERS] as const;

/** Percorsi che nessun motore deve leggere: area riservata e rotte di servizio. */
export const PRIVATE_PATHS = ['/api/', '/admin'] as const;

/** Vero se lo user agent contiene il nome di uno dei bot bloccati (senza badare alle maiuscole). */
export function isBlockedUserAgent(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BLOCKED_CRAWLERS.some((bot) => ua.includes(bot.toLowerCase()));
}

/** Il testo di `/robots.txt`. */
export function robotsTxt(): string {
  const group = (agents: readonly string[], rules: string[]) => [...agents.map((a) => `User-agent: ${a}`), ...rules].join('\n');
  const open = ['Allow: /', ...PRIVATE_PATHS.map((p) => `Disallow: ${p}`)];
  return [
    '# Righello: il sito si lascia leggere a motori di ricerca, assistenti AI e anteprime dei social.',
    '# L\'elenco vive in src/lib/seo/crawlers.ts (lo legge anche il server per rispondere 403 ai bot bloccati).',
    group(ALLOWED_CRAWLERS, open),
    group(BLOCKED_CRAWLERS, ['Disallow: /']),
    group(['*'], open),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n\n');
}
