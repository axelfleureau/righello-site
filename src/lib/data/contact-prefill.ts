/**
 * Da dove si arriva al modulo di contatto, e cosa precompila.
 * Sta in un file a parte perche' legge le schede prodotto (~20 kB): il foglio di contatto lo
 * scarica solo quando serve, mentre i pulsanti (`contact.ts`) viaggiano con ogni pagina.
 */
import { CONTACT_TOPICS } from './contact';
import { getCaseStudyBySlug, type CaseStudy, type ProjectKind } from './case-studies';
import { departments } from './projects';
import { footerColumns, mainNav, serviceMenu } from './site';

/** Il punto da cui parte la richiesta: pagina, pulsante, e cio' che l'indirizzo del pulsante dichiara (`?da=`, `?servizio=`). */
export interface ContactContext {
  path: string;
  /** Posizione del pulsante nella pagina (testata, hero, chiusura, piede, barra...). */
  cta?: string;
  /** Id di una scheda prodotto (`?da=tetha`). */
  from?: string;
  /** Slug di un servizio del modulo (`?servizio=web`). */
  service?: string;
}

type TopicValue = (typeof CONTACT_TOPICS)[number]['value'];
const topicBySlug = (slug: string): TopicValue | '' => CONTACT_TOPICS.find((t) => t.slug === slug)?.value ?? '';

const topicByKind: Record<ProjectKind, TopicValue> = {
  app: 'Sviluppo Web & Software',
  gestionale: 'Sviluppo Web & Software',
  broadcast: 'Sviluppo Web & Software',
  piattaforma: 'Sviluppo Web & Software',
  sito: 'Sviluppo Web & Software',
  contenuti: 'Marketing & Social Media',
};

/** Pagina di servizio -> tema del modulo. Le pagine che non sono un servizio non ne scelgono uno. */
const topicByServiceSlug: Record<string, string> = {
  marketing: 'marketing',
  advertising: 'advertising',
  web: 'web',
  'agenti-ai': 'web',
};

const departmentName = (slug: string) => {
  const item = serviceMenu.find((s) => s.slug === slug);
  return departments.find((d) => d.id === item?.department)?.name ?? '';
};

function studyFromPath(path: string): CaseStudy | null {
  if (path === '/buffr') return getCaseStudyBySlug('buffr') ?? null;
  const m = /^\/progetti\/([^/]+)\/?$/.exec(path);
  return m ? (getCaseStudyBySlug(m[1]) ?? null) : null;
}

/** Nome leggibile della pagina da cui si arriva: e' cio' che il team legge nella riga "Da dove arrivi". */
export function describePath(path: string, cta?: string): string {
  if (cta === 'errore') return 'Pagina non trovata';
  const clean = path.replace(/\/$/, '') || '/';
  const study = studyFromPath(clean);
  if (study) return `Progetto: ${study.name}`;
  const service = /^\/servizi\/([^/]+)$/.exec(clean);
  if (service) return `Servizio: ${departmentName(service[1]) || service[1]}`;
  if (clean === '/') return 'Home';
  const links = [...mainNav, ...footerColumns.flatMap((c) => c.links)];
  const hit = links.find((l) => l.href === clean);
  return hit?.label ?? 'Altra pagina del sito';
}

export interface ResolvedContext {
  study: CaseStudy | null;
  /** Valore del tema da selezionare (vuoto = nessuno: home, chi siamo, contatti). */
  topic: string;
  /** Dove arriva: pagina, in parole. */
  where: string;
  /** Cio' che identifica la provenienza specifica (id scheda o slug servizio), per il team. */
  from: string;
}

export function resolveContactContext(ctx: ContactContext): ResolvedContext {
  const clean = ctx.path.replace(/\/$/, '') || '/';
  const study = (ctx.from ? getCaseStudyBySlug(ctx.from) : undefined) ?? studyFromPath(clean);
  const pageService = /^\/servizi\/([^/]+)$/.exec(clean)?.[1] ?? '';
  const serviceSlug = ctx.service || topicByServiceSlug[pageService] || (clean.startsWith('/agenzia-marketing-') ? 'marketing' : '');
  const topic = topicBySlug(serviceSlug) || (study ? topicByKind[study.kind] : '');
  // La pagina da cui si parte e' quella dove e' il pulsante; se l'indirizzo dichiara un prodotto (`?da=`) vale quello.
  const where = ctx.from && study && !studyFromPath(clean) ? `Progetto: ${study.name}` : describePath(clean, ctx.cta);
  return { study: study ?? null, topic, where, from: study?.id ?? (ctx.service || pageService) };
}
