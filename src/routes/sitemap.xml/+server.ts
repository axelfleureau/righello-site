import type { RequestHandler } from '@sveltejs/kit';
import { sitemapXml } from '$lib/seo/sitemap';

/** Le pagine e le loro date vengono da `$lib/seo/pages` e `page-dates.json`: niente elenco da tenere qui. */
export const GET: RequestHandler = () =>
  new Response(sitemapXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
