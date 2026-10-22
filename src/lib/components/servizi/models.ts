import {
  agencyAccent,
  commonMethod,
  getNextService,
  faqsForService,
  getPrevService,
  localLandingLinks,
  serviceDetails,
  type ServiceDetail,
} from '$lib/data/service-details';
import { contactHref } from '$lib/data/contact';
import type { SoftwareHousePage } from '$lib/data/software-house';
import type { Heading, Link, LocalBlock, MethodStep, PageModel, ProofItem, ScopeItem, FaqItem } from './types';

/** Dalle schede dei servizi alla struttura comune: una funzione per il caso generale, una per la variante di agenzia. */

const CONTACT: Link = { href: '/contatti', label: 'Richiedi un preventivo' };
const ALL_PROJECTS: Link = { href: '/progetti', label: 'Tutti i progetti' };

export function serviceModel(s: ServiceDetail): PageModel {
  const next = getNextService(s.slug);
  const prev = getPrevService(s.slug);
  const faq: FaqItem[] = faqsForService(s.slug).map((f) => ({ q: f.question, a: f.answer }));

  return {
    accent: s.accent,
    variant: 'servizio',
    crumb: { trail: [{ href: '/servizi', label: 'Servizi' }], current: s.name },
    kicker: s.category,
    title: s.titleLine1,
    highlight: s.titleHighlight,
    lead: s.subtitle,
    primary: CONTACT,
    secondary: s.proof.length ? { href: '#lavori', label: 'Vedi i lavori' } : undefined,
    panel: { title: 'Cosa ottieni', items: s.outcomes },
    scope: {
      kicker: 'Cosa facciamo',
      title: 'Cosa facciamo, in concreto',
      highlight: 'in concreto',
      items: s.services.map((x) => ({ icon: x.icon, title: x.title, text: x.description })),
    },
    scope2: s.sections?.[0],
    extras: s.sections?.slice(1),
    note: s.note ? { kicker: s.note.kicker, title: s.note.title, text: s.note.text, link: { href: s.note.href, label: s.note.label } } : undefined,
    method: {
      kicker: 'Come lavoriamo',
      title: 'Il nostro metodo, passo dopo passo',
      highlight: 'passo dopo passo',
      steps: s.workflow.map((w) => ({ title: w.title, text: w.description })),
    },
    proof: {
      kicker: 'Lavori',
      title: s.proof.length === 1 ? 'Un lavoro da aprire' : 'Lavori veri, con la scheda da aprire',
      highlight: 'da aprire',
      lead: 'Ogni lavoro ha la sua scheda: cosa abbiamo fatto, per chi, a che punto è.',
      ...s.proofHead,
      items: s.proof,
      more: ALL_PROJECTS,
    },
    local: {
      kicker: s.localSeo.eyebrow,
      title: s.localSeo.title,
      paragraphs: [s.localSeo.copy],
      points: s.localSeo.points,
      links: s.localSeo.links,
    },
    faq: faq.length ? { kicker: 'Domande', title: 'Prima di iniziare', items: faq } : undefined,
    closing: {
      kicker: s.name,
      title: 'Parliamo del tuo progetto',
      highlight: 'tuo progetto',
      text: 'Raccontaci cosa ti serve: ti diciamo come possiamo aiutarti a raggiungere i tuoi obiettivi.',
      button: { href: '/contatti', label: 'Parliamone' },
    },
    flow: {
      nextKicker: 'Prossimo servizio',
      next: { href: `/servizi/${next.slug}`, name: next.name, sub: next.tagline, accent: next.accent },
      prev: { href: `/servizi/${prev.slug}`, name: prev.name },
      all: { href: '/servizi', label: 'Tutti i servizi' },
    },
  };
}

const AGENCY_ICONS: Record<string, ScopeItem['icon']> = { marketing: 'message', advertising: 'chart', web: 'globe', 'agenti-ai': 'sparkle' };

/** I quattro servizi come schede che portano alla loro pagina: lo stesso elenco per ogni pagina di agenzia. */
export function serviceLinks(texts: Record<string, string>): ScopeItem[] {
  return serviceDetails.map((s) => ({
    icon: AGENCY_ICONS[s.slug],
    title: s.name,
    text: texts[s.slug],
    href: `/servizi/${s.slug}`,
  }));
}

export interface AgencyInput {
  city: string;
  kicker: string;
  title: string;
  highlight?: string;
  lead: string;
  panel: { title: string; points: string[] };
  /** I quattro servizi con una frase ciascuno (`texts`), oppure schede proprie della pagina (`items`). */
  scope: Heading & ({ texts: Record<string, string> } | { items: ScopeItem[] });
  scope2?: PageModel['scope2'];
  method?: Heading & { steps: MethodStep[] };
  proof: ProofItem[];
  /** Titolo della sezione dei lavori, se non e' quello comune. */
  proofHead?: Partial<Heading>;
  local: LocalBlock;
  note?: PageModel['note'];
  faq: FaqItem[];
  closing: { kicker: string; title: string; highlight?: string; text: string; button?: Link };
  /** L'altra pagina di agenzia, come "precedente". */
  other?: { href: string; name: string };
  /** Il percorso dopo e prima, se non e' quello di una pagina di agenzia (indice dei servizi). */
  flow?: PageModel['flow'];
  /** Il collegamento verso i contatti, se non e' quello solito (le pagine nuove usano `contactHref()`). */
  contact?: Link;
}

export function agencyModel(a: AgencyInput): PageModel {
  return {
    accent: agencyAccent,
    variant: 'agenzia',
    crumb: { trail: [{ href: '/servizi', label: 'Servizi' }], current: a.city },
    kicker: a.kicker,
    title: a.title,
    highlight: a.highlight,
    lead: a.lead,
    primary: a.contact ?? { href: '/contatti', label: 'Parliamone' },
    secondary: { href: '#lavori', label: 'Vedi i lavori' },
    panel: { title: a.panel.title, items: a.panel.points.map((text) => ({ text })) },
    scope: {
      kicker: a.scope.kicker,
      title: a.scope.title,
      highlight: a.scope.highlight,
      lead: a.scope.lead,
      items: 'items' in a.scope ? a.scope.items : serviceLinks(a.scope.texts),
    },
    scope2: a.scope2,
    note: a.note,
    method: a.method ?? {
      kicker: 'Come lavoriamo',
      title: 'Il nostro metodo, passo dopo passo',
      highlight: 'passo dopo passo',
      steps: commonMethod.map((c) => ({ title: c.title, text: c.text, when: c.when })),
    },
    proof: {
      kicker: 'Lavori',
      title: 'Lavori veri, con la scheda da aprire',
      highlight: 'da aprire',
      lead: 'Prove, non promesse: ogni lavoro ha la sua scheda con cosa abbiamo fatto e a che punto è.',
      ...a.proofHead,
      items: a.proof,
      more: ALL_PROJECTS,
    },
    local: a.local,
    faq: { kicker: 'Domande', title: 'Prima di iniziare', items: a.faq },
    closing: { ...a.closing, button: a.closing.button ?? { href: '/contatti', label: 'Richiedi l’audit gratuito' } },
    flow: a.flow ?? {
      nextKicker: 'Prossimo: cosa facciamo',
      next: { href: '/servizi', name: 'Tutti i servizi', sub: serviceDetails.map((s) => s.name).join(' · ') },
      prev: a.other,
      all: ALL_PROJECTS,
    },
  };
}

/** Le pagine «software house»: la stessa struttura delle pagine di agenzia, con i testi di `software-house.ts` e il modulo di contatto dei prodotti. */
export function softwareHouseModel(p: SoftwareHousePage): PageModel {
  return agencyModel({
    city: p.name,
    kicker: p.kicker,
    title: p.title,
    highlight: p.highlight,
    lead: p.lead,
    panel: { title: 'Perché Righello', points: p.panel },
    scope: p.scope,
    scope2: p.scope2,
    note: { kicker: p.note.kicker, title: p.note.title, text: p.note.text, link: p.note.link },
    method: p.method,
    proof: p.proof,
    proofHead: p.proofHead,
    local: p.local,
    faq: p.faqs.map((f) => ({ q: f.question, a: f.answer })),
    closing: { ...p.closing, button: { href: contactHref(), label: 'Parliamone' } },
    contact: { href: contactHref(), label: 'Parliamone' },
    flow: {
      nextKicker: 'Prossimo: l’altra sede',
      next: { href: p.flow.next.href, name: p.flow.next.name, sub: p.flow.next.sub },
      prev: p.flow.prev,
      all: ALL_PROJECTS,
    },
  });
}

/** L'indice dei servizi: stessa struttura, con i quattro servizi come righe numerate e il metodo comune. */
export function indexModel(): PageModel {
  const principles = [
    { title: 'Si parte dal contenuto', text: 'Partiamo sempre dalla strategia dei contenuti per costruire una presenza digitale che porta richieste.' },
    { title: 'Dati, non opinioni', text: 'Ogni decisione si basa su dati reali: misurazione precisa, prove A/B e miglioramento continuo.' },
    { title: 'Un team, un solo referente', text: 'Marketing, advertising, sviluppo e agenti AI lavorano insieme: parli con una persona sola.' },
  ];
  return {
    accent: agencyAccent,
    variant: 'indice',
    crumb: { trail: [{ href: '/', label: 'Home' }], current: 'Servizi' },
    kicker: 'I nostri servizi',
    title: 'Quattro servizi.',
    highlight: 'Un solo team.',
    lead: 'Marketing, advertising, siti web e agenti AI: competenze che lavorano insieme per far crescere la tua azienda. Un solo interlocutore, risultati che si misurano.',
    primary: { href: '/contatti', label: 'Richiedi un preventivo' },
    secondary: { href: '/progetti', label: 'Vedi i progetti' },
    panel: { title: 'Come lavoriamo', items: principles },
    scope: {
      kicker: 'I servizi',
      title: 'Quattro anime, una visione',
      highlight: 'una visione',
      items: serviceDetails.map((s) => ({
        title: s.name,
        tagline: s.tagline,
        text: s.outcomes[0].text + ' ' + s.outcomes[1].text,
        href: `/servizi/${s.slug}`,
        accent: s.accent,
        bullets: s.services.map((x) => x.title),
      })),
    },
    scope2: {
      id: 'dove-operiamo',
      label: 'Dove operiamo',
      kicker: 'Dove operiamo',
      title: 'Pordenone, Mestre e il Nord Italia dove serve davvero.',
      highlight: 'dove serve davvero',
      lead: 'La geografia conta quando porta contesto, fiducia e velocità operativa. Il metodo resta lo stesso: strategia, contenuti, campagne, tecnologia e numeri nello stesso tavolo.',
      items: localLandingLinks.map((l, i) => ({ icon: i === 2 ? 'file' : 'map', title: l.label, text: l.description, href: l.href })),
    },
    method: {
      kicker: 'Come lavoriamo',
      title: 'Dal primo incontro al risultato, e oltre',
      highlight: 'e oltre',
      lead: 'Un percorso chiaro che unisce strategia, progetto, sviluppo e miglioramento continuo.',
      steps: commonMethod.map((c) => ({ title: c.title, text: c.text, when: c.when })),
    },
    proof: {
      kicker: 'Lavori',
      title: 'Lavori veri, con la scheda da aprire',
      highlight: 'da aprire',
      lead: 'Prove, non promesse: ogni lavoro ha la sua scheda con cosa abbiamo fatto e a che punto è.',
      items: [{ id: 'reguta' }, { id: 'portopiccolo-apartments' }, { id: 'tetha' }, { id: 'elite-hotel-spa' }],
      more: ALL_PROJECTS,
    },
    faq: {
      kicker: 'Domande',
      title: 'Domande frequenti',
      items: faqsForService().map((f) => ({ q: f.question, a: f.answer })),
    },
    closing: {
      kicker: 'Parliamone',
      title: 'Parliamo del tuo progetto',
      highlight: 'tuo progetto',
      text: 'Prenota una call gratuita di 30 minuti per analizzare insieme le opportunità di crescita per il tuo lavoro.',
      button: { href: '/contatti', label: 'Richiedi una consulenza gratuita' },
    },
    flow: {
      nextKicker: 'Parti da qui',
      next: { href: `/servizi/${serviceDetails[0].slug}`, name: serviceDetails[0].name, sub: serviceDetails[0].tagline, accent: serviceDetails[0].accent },
      all: ALL_PROJECTS,
    },
  };
}
