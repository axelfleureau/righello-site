import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  const pathname = event.url.pathname;

  // Detect static assets: paths starting with /_app/ or files with static extensions
  const isStaticAsset =
    pathname.startsWith('/_app/') ||
    /\.(js|css|woff2|png|jpg|jpeg|svg|ico|gif|webp)$/i.test(pathname);

  // Set appropriate Cache-Control header
  if (isStaticAsset) {
    // Static assets are hashed by SvelteKit, safe to cache for 1 year
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // HTML pages: no-cache to validate with CDN, but allow CDN caching for 1 hour
    response.headers.set(
      'Cache-Control',
      'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  // Security headers applied to all responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
};

export const handleError = ({ error }: { error: unknown }) => {
  console.error('Server error:', error);
  return {
    message: 'Si è verificato un errore'
  };
};
