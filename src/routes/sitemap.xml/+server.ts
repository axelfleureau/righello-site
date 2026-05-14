import type { RequestHandler } from '@sveltejs/kit';

const BASE_URL = 'https://www.wearerighello.com';
const TODAY = new Date().toISOString().split('T')[0];

const PAGES = [
  { loc: '/',                       priority: '1.0', changefreq: 'weekly'  },
  { loc: '/servizi',                priority: '0.9', changefreq: 'monthly' },
  { loc: '/servizi/marketing',      priority: '0.9', changefreq: 'monthly' },
  { loc: '/servizi/advertising',    priority: '0.9', changefreq: 'monthly' },
  { loc: '/servizi/web',            priority: '0.9', changefreq: 'monthly' },
  { loc: '/servizi/agenti-ai',      priority: '0.9', changefreq: 'monthly' },
  { loc: '/progetti',               priority: '0.8', changefreq: 'monthly' },
  { loc: '/chi-siamo',              priority: '0.8', changefreq: 'monthly' },
  { loc: '/contatti',               priority: '0.8', changefreq: 'monthly' },
];

export const GET: RequestHandler = () => {
  const urls = PAGES.map(
    ({ loc, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
