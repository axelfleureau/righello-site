import type { Handle } from '@sveltejs/kit';

const BLOCKED_BOTS = [
  'HTTrack', 'WebCopier', 'WebZIP', 'Teleport', 'SiteSnagger',
  'WebStripper', 'SiteSucker', 'WebReaper', 'NetAnts', 'BlackWidow',
  'Offline Explorer', 'Scrapy', 'scrapy', 'libwww-perl', 'lwp-trivial',
  'MJ12bot', 'DotBot', 'AhrefsBot', 'SemrushBot', 'BLEXBot',
  'DataForSeoBot', 'magpie-crawler', 'Bytespider', 'PetalBot',
  'GPTBot', 'CCBot', 'ChatGPT-User', 'anthropic-ai', 'ClaudeBot',
  'Google-Extended',
];

export const handle: Handle = async ({ event, resolve }) => {
  const ua = event.request.headers.get('user-agent') || '';

  const isLegitBot = /Googlebot|Bingbot|Slurp|DuckDuckBot|Applebot|facebookexternalhit|Twitterbot|LinkedInBot/i.test(ua);
  if (!isLegitBot && BLOCKED_BOTS.some(bot => ua.includes(bot))) {
    return new Response('Access denied', { status: 403 });
  }

  const response = await resolve(event);

  const pathname = event.url.pathname;

  const isStaticAsset =
    pathname.startsWith('/_app/') ||
    /\.(js|css|woff2|png|jpg|jpeg|svg|ico|gif|webp)$/i.test(pathname);

  if (isStaticAsset) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    response.headers.set(
      'Cache-Control',
      'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self'; frame-src 'self' https://la-busa-del-sauc.vercel.app https://www.youtube.com https://www.youtube-nocookie.com"
  );

  return response;
};

export const handleError = ({ error }: { error: unknown }) => {
  console.error('Server error:', error);
  return {
    message: 'Si è verificato un errore'
  };
};
