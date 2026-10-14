import type { Handle } from '@sveltejs/kit';
import { isBlockedUserAgent } from '$lib/seo/crawlers';
import { dropOverriddenDefaults } from '$lib/seo/head';

/** Una sola etichetta per chiave nel <head>: vince quella della pagina (vedi `$lib/seo/head`). */
function dedupeHead(html: string): string {
  const start = html.indexOf('<head');
  const end = html.indexOf('</head>');
  if (start === -1 || end === -1) return html;
  return html.slice(0, start) + dropOverriddenDefaults(html.slice(start, end)) + html.slice(end);
}

export const handle: Handle = async ({ event, resolve }) => {
  // Chi e' bloccato (copiatori di siti, analizzatori SEO di terzi) lo decide `$lib/seo/crawlers`,
  // la stessa lista che `/robots.txt` dichiara: i motori di ricerca e gli assistenti AI passano.
  if (isBlockedUserAgent(event.request.headers.get('user-agent') || '')) {
    return new Response('Access denied', { status: 403 });
  }

  const response = await resolve(event, { transformPageChunk: ({ html }) => dedupeHead(html) });

  if (response.status >= 400) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

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
    "frame-ancestors 'self'; frame-src 'self' https://la-busa-del-sauc.vercel.app https://www.youtube.com https://www.youtube-nocookie.com; media-src 'self' https://res.cloudinary.com https://firebasestorage.googleapis.com blob:;"
  );

  return response;
};

export const handleError = ({ error }: { error: unknown }) => {
  console.error('Server error:', error);
  return {
    message: 'Si è verificato un errore'
  };
};
