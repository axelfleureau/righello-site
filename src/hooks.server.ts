import type { Handle } from '@sveltejs/kit';
import { isBlockedUserAgent } from '$lib/seo/crawlers';
import { dropOverriddenDefaults, LD_ATTR, readHeadMeta } from '$lib/seo/head';
import { jsonLdFor } from '$lib/seo/schema';
import { stripLazyContactCss } from '$lib/contact/headCss';

/**
 * Il <head> che parte dal server:
 *  - una sola etichetta per chiave: vince quella della pagina (vedi `$lib/seo/head`);
 *  - i dati strutturati delle pagine pubbliche (vedi `$lib/seo/schema`), costruiti dal titolo e dalla
 *    descrizione che la pagina ha appena dichiarato. Stanno nel HTML iniziale e non pesano sul codice del browser.
 */
function transformHead(html: string, path: string): string {
  const start = html.indexOf('<head');
  const end = html.indexOf('</head>');
  if (start === -1 || end === -1) return html;
  let head = stripLazyContactCss(dropOverriddenDefaults(html.slice(start, end)), path);
  const meta = readHeadMeta(head);
  const ld = meta.title && meta.description ? jsonLdFor(path, { title: meta.title, description: meta.description, image: meta.image }) : null;
  if (ld) head += `<script type="application/ld+json" ${LD_ATTR}>${ld}</script>`;
  return html.slice(0, start) + head + html.slice(end);
}

export const handle: Handle = async ({ event, resolve }) => {
  // Il nome `dedupeHead` e la riga `resolve` qui sotto restano come sono: li cerca la patch del ponte
  // Cloudflare (righello-bridge/bridge-patch.diff), che altrimenti non si applica piu'.
  const path = event.url.pathname.replace(/\/$/, '') || '/';
  const dedupeHead = (html: string) => transformHead(html, path);

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
