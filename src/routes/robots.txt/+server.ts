import type { RequestHandler } from '@sveltejs/kit';
import { robotsTxt } from '$lib/seo/crawlers';

/** Il testo viene da `$lib/seo/crawlers`: e' la stessa lista che il server usa per rispondere 403 ai bot bloccati. */
export const GET: RequestHandler = () =>
  new Response(robotsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
