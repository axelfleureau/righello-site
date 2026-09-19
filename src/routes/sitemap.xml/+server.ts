import type { RequestHandler } from '@sveltejs/kit';
import { caseStudies, caseStudyHref } from '$lib/data/case-studies';
import { serviceDetails } from '$lib/data/service-details';

const BASE_URL = 'https://www.wearerighello.com';
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_PAGES = [
  { loc: '/',                       priority: '1.0',  changefreq: 'weekly'  },
  { loc: '/servizi',                priority: '0.9',  changefreq: 'monthly' },
  { loc: '/buffr',                  priority: '0.95', changefreq: 'weekly'  },
  { loc: '/bando-intelligenza-artificiale-fvg-2026', priority: '0.9', changefreq: 'weekly'  },
  { loc: '/agenzia-marketing-pordenone', priority: '0.9',  changefreq: 'monthly' },
  { loc: '/agenzia-marketing-mestre', priority: '0.95', changefreq: 'weekly'  },
  { loc: '/progetti',               priority: '0.9',  changefreq: 'weekly'  },
  { loc: '/chi-siamo',              priority: '0.8',  changefreq: 'monthly' },
  { loc: '/contatti',               priority: '0.8',  changefreq: 'monthly' },
];

// Service slugs (from service-details) — generated dynamically so adding a
// new service to $lib/data/service-details.ts auto-includes the page here.
const SERVICE_PAGES = serviceDetails.map((s) => ({
  loc: `/servizi/${s.slug}`,
  priority: '0.85',
  changefreq: 'monthly' as const,
}));

// Case study detail pages — generated dynamically so adding a case study to
// $lib/data/case-studies.ts auto-includes its page here. BUFFR is excluded:
// it resolves to /buffr, already listed in STATIC_PAGES.
const PROJECT_PAGES = caseStudies
  .filter((study) => study.id !== 'buffr')
  .map((study) => ({
    loc: caseStudyHref(study),
    priority: '0.7',
    changefreq: 'monthly' as const,
  }));

const PAGES = [...STATIC_PAGES, ...SERVICE_PAGES, ...PROJECT_PAGES];

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
