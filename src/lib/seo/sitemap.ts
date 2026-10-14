import { SITE_URL } from '$lib/data/site';
import { lastModified } from './dates';
import { sitePages } from './pages';

/** Il testo di `/sitemap.xml`: le pagine pubbliche, ognuna con la data vera del suo contenuto. */
export function sitemapXml(): string {
  const urls = sitePages
    .map(({ path, priority, changefreq }) => {
      const lastmod = lastModified(path);
      return `
  <url>
    <loc>${SITE_URL}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}
