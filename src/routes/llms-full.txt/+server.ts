import type { RequestHandler } from '@sveltejs/kit';
import { llmsFullTxt } from '$lib/seo/llms';

/** Testo piano ricavato dai dati del sito: vedi `$lib/seo/llms`. */
export const GET: RequestHandler = () =>
  new Response(llmsFullTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
