#!/usr/bin/env node
/**
 * Audit SEO del sito in esecuzione (build locale o produzione): legge il HTML cosi' come lo
 * riceve un motore di ricerca (nessuna esecuzione di JavaScript) e riporta, pagina per pagina,
 * titolo, descrizione, canonical, immagine di condivisione, H1 e dati strutturati.
 *
 *   node scripts/seo-audit.mjs http://127.0.0.1:5300            tabella in Markdown
 *   node scripts/seo-audit.mjs http://127.0.0.1:5300 --json     dati grezzi
 *
 * Le pagine sono quelle della mappa del sito del server interrogato (con l'indirizzo di
 * produzione riscritto su quello locale) piu' `/_non-esiste` per controllare la pagina di errore.
 */

const base = (process.argv[2] ?? 'http://127.0.0.1:5300').replace(/\/$/, '');
const asJson = process.argv.includes('--json');

const TITLE = { min: 30, max: 60 };
const DESCRIPTION = { min: 70, max: 160 };
/** Cose che i dati strutturati non devono mai affermare (nessuna prova pubblica). */
const FORBIDDEN_TYPES = ['AggregateRating', 'Review', 'Rating'];
const FORBIDDEN_TEXT = [/\b470\b/, /98\s?%/, /ROAS/i, /\b340\s?%/, /8[.,]5x/i, /(Google|Meta) (Business )?Partner/i];

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const decode = (s = '') => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const metas = (head) => [...head.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0]);
const metaValues = (head, key) =>
  metas(head)
    .filter((t) => attr(t, 'name') === key || attr(t, 'property') === key)
    .map((t) => decode(attr(t, 'content') ?? ''));

function flatten(json) {
  const roots = Array.isArray(json) ? json : [json];
  return roots.flatMap((r) => (r && r['@graph'] ? r['@graph'] : [r]));
}

function inspect(html) {
  const head = html.slice(html.indexOf('<head'), html.indexOf('</head>'));
  const body = html.slice(html.indexOf('</head>'));
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let valid = true;
  const nodes = [];
  for (const raw of ld) {
    try {
      nodes.push(...flatten(JSON.parse(raw)));
    } catch {
      valid = false;
    }
  }
  const types = nodes.flatMap((n) => [n['@type']].flat()).filter(Boolean);
  const ids = nodes.map((n) => n['@id']).filter(Boolean);
  const orgs = nodes.filter((n) => [n['@type']].flat().some((t) => ['Organization', 'ProfessionalService', 'LocalBusiness'].includes(t)) && n['@id']?.endsWith('#organization'));
  const flat = ld.join('\n');
  const problems = [];
  if (!valid) problems.push('JSON-LD non valido');
  if (new Set(ids).size !== ids.length) problems.push('@id duplicati');
  if (orgs.length > 1) problems.push('piu\' Organization');
  for (const t of FORBIDDEN_TYPES) if (types.includes(t)) problems.push(`tipo vietato ${t}`);
  for (const re of FORBIDDEN_TEXT) if (re.test(flat)) problems.push(`testo vietato ${re}`);
  const h1 = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()));
  const canon = [...head.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]).filter((t) => attr(t, 'rel') === 'canonical').map((t) => attr(t, 'href'));
  const title = decode(head.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
  const description = metaValues(head, 'description');
  return {
    title,
    description,
    canonical: canon,
    ogImage: metaValues(head, 'og:image'),
    ogImageAlt: metaValues(head, 'og:image:alt'),
    ogTitle: metaValues(head, 'og:title'),
    twitterImage: metaValues(head, 'twitter:image'),
    robots: metaValues(head, 'robots'),
    h1,
    jsonLdTypes: [...new Set(types)],
    jsonLdBytes: Buffer.byteLength(flat),
    jsonLdBlocks: ld.length,
    jsonLdValid: valid,
    problems,
    htmlBytes: Buffer.byteLength(html),
    mainCount: (body.match(/<main\b/g) ?? []).length,
  };
}

async function get(path) {
  const res = await fetch(base + path, { headers: { 'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' } });
  return { status: res.status, html: await res.text() };
}

async function main() {
  const sitemap = (await get('/sitemap.xml')).html;
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const rows = [];
  for (const path of [...paths, '/_non-esiste']) {
    const { status, html } = await get(path);
    rows.push({ path, status, ...inspect(html) });
  }
  const dupes = (key) => {
    const seen = new Map();
    for (const r of rows.filter((r) => r.status === 200)) {
      const v = [r[key]].flat().join('|');
      seen.set(v, [...(seen.get(v) ?? []), r.path]);
    }
    return [...seen.values()].filter((p) => p.length > 1);
  };
  const summary = { titleDupes: dupes('title'), descriptionDupes: dupes('description'), ogImageDupes: dupes('ogImage') };

  if (asJson) return console.log(JSON.stringify({ rows, summary }, null, 1));

  const home = rows.find((r) => r.path === '/');
  const flag = (r) => {
    const f = [];
    if (r.status !== 200) return [];
    if (r.title.length < TITLE.min || r.title.length > TITLE.max) f.push(`title ${r.title.length}`);
    const d = r.description[0] ?? '';
    if (!d) f.push('senza description');
    else if (d.length < DESCRIPTION.min || d.length > DESCRIPTION.max) f.push(`description ${d.length}`);
    if (r.path !== '/' && d === home.description[0]) f.push('description della home');
    if (r.description.length > 1) f.push(`${r.description.length} description`);
    if (r.canonical.length !== 1) f.push(`${r.canonical.length} canonical`);
    if (r.h1.length !== 1) f.push(`${r.h1.length} H1`);
    if (r.ogImage.length !== 1) f.push(`${r.ogImage.length} og:image`);
    if (r.path !== '/' && r.ogImage[0] === home.ogImage[0]) f.push('og:image della home');
    if (!r.ogImageAlt.length) f.push('senza og:image:alt');
    if (!r.jsonLdTypes.includes('BreadcrumbList') && r.path !== '/') f.push('senza BreadcrumbList');
    return [...f, ...r.problems];
  };

  const out = [];
  out.push('| Pagina | Title (car.) | Description (car.) | Canonical | og:image | H1 | JSON-LD (tipi) | kB LD | Note |');
  out.push('|---|---|---|---|---|---|---|---|---|');
  for (const r of rows) {
    const note = r.status !== 200 ? `HTTP ${r.status}${r.robots.length ? ', ' + r.robots[0] : ''}` : flag(r).join('; ');
    const cell = (s) => String(s).replace(/\|/g, '\\|');
    out.push(
      `| ${r.path} | ${cell(r.title)} (${r.title.length}) | ${cell(r.description[0] ?? '-')} (${(r.description[0] ?? '').length}) | ${r.canonical[0]?.replace(/^https?:\/\/[^/]+/, '') || '-'} | ${r.ogImage[0]?.replace(/^https?:\/\/[^/]+/, '') || '-'} | ${r.h1.length}: ${cell(r.h1[0] ?? '-').slice(0, 60)} | ${r.jsonLdTypes.join(', ') || '-'} | ${(r.jsonLdBytes / 1024).toFixed(1)} | ${note || 'ok'} |`
    );
  }
  console.log(out.join('\n'));
  console.log('\nTitle duplicati:', JSON.stringify(summary.titleDupes));
  console.log('Description duplicate:', JSON.stringify(summary.descriptionDupes));
  console.log('og:image uguale su piu\' pagine:', JSON.stringify(summary.ogImageDupes));
  const totals = rows.filter((r) => r.status === 200);
  console.log(`HTML medio: ${(totals.reduce((s, r) => s + r.htmlBytes, 0) / totals.length / 1024).toFixed(1)} kB; JSON-LD medio: ${(totals.reduce((s, r) => s + r.jsonLdBytes, 0) / totals.length / 1024).toFixed(1)} kB; massimo JSON-LD: ${(Math.max(...totals.map((r) => r.jsonLdBytes)) / 1024).toFixed(1)} kB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
