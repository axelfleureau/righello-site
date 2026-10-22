/**
 * `/llms.txt` e `/llms-full.txt`: il sito in testo piano, per chi lo legge con un assistente AI.
 *
 * Non sono file scritti a mano: si ricavano dagli stessi dati che producono le pagine (servizi, progetti con il loro
 * stato, domande, recapiti), cosi' non possono restare indietro. La data e' quella dell'ultima modifica vera di un contenuto.
 */
import { faqs as buffrFaqs, storeUrl as buffrStoreUrl } from '../components/buffr/content';
import { caseStudies, caseStudyHref, kindLabels, type CaseStudy } from '../data/case-studies';
import { CONTACT, formatPhone } from '../data/contact';
import { bandoFaqs } from '../data/faqs/bando';
import { contactFaqs } from '../data/faqs/contact';
import { homeFaqs } from '../data/faqs/home';
import { mestreFaqs } from '../data/faqs/mestre';
import { pordenoneFaqs } from '../data/faqs/pordenone';
import type { Faq } from '../data/faqs/types';
import { faqsForService, getServiceBySlug, localLandingLinks, serviceDetails } from '../data/service-details';
import { softwareHousePages } from '../data/software-house';
import { COMPANY, SITE_URL, socialLinks } from '../data/site';
import { AREAS_SERVED, COMPANY_SUMMARY } from '../data/profile';
import { founders } from '../data/team';
import { AI_CRAWLERS } from './crawlers';
import { lastModified } from './dates';
import { sitePages } from './pages';

const url = (path: string) => `${SITE_URL}${path}`;
const BANDO = '/bando-intelligenza-artificiale-fvg-2026';

/** La data (AAAA-MM-GG) dell'ultimo contenuto cambiato in una qualsiasi pagina. */
const updated = () =>
  sitePages
    .map((p) => lastModified(p.path) ?? '')
    .sort()
    .at(-1) ?? '';

const publicFaqs = (faqs: Faq[]) => faqs.filter((f) => f.structured !== false);
const qa = (faqs: Faq[]) =>
  publicFaqs(faqs)
    .map((f) => `D: ${f.question}\nR: ${f.answer}`)
    .join('\n\n');

/** Stato e piattaforma dichiarati dalla scheda: mai "disponibile" per chi e' in prova. */
const statusLine = (s: CaseStudy) =>
  `${s.status.label}${s.platform.length ? ` (${s.platform.join(', ')})` : ''}`;

const places = AREAS_SERVED.map((a) => a.name).join(', ');

function facts(): string[] {
  return [
    `Ragione sociale: ${COMPANY.legalName}, P.IVA IT${COMPANY.vat}.`,
    `Fondata nel ${COMPANY.founded}. Sede legale: ${COMPANY.legalSeat}. Base operativa: ${CONTACT.street}.`,
    `Fondatori: ${founders.map((f) => `${f.name} (${f.role.split(' e ')[0]})`).join(', ')}.`,
    `Dove lavora: ${places}; da remoto con clienti in tutta Italia.`,
    `Contatti: ${CONTACT.email}; WhatsApp ${formatPhone(CONTACT.whatsapp)}; modulo su ${url('/contatti')}. Risposta ${CONTACT.reply}. ${CONTACT.hours}.`,
    `Profili: ${socialLinks.map((l) => `${l.label} ${l.href}`).join('; ')}.`
  ];
}

/** I lavori che mostrano l'intelligenza artificiale all'opera: gli stessi che la pagina degli agenti AI dichiara come prova. */
const aiProof = () =>
  (getServiceBySlug('agenti-ai')?.proof ?? [])
    .map((p) => caseStudies.find((c) => c.id === p.id))
    .filter((c): c is CaseStudy => !!c);

export function llmsTxt(): string {
  const prodotti = caseStudies.filter((s) => s.category === 'digital');
  const lavori = caseStudies.filter((s) => s.category !== 'digital');
  const link = (title: string, path: string, note: string) => `- [${title}](${url(path)}): ${note}`;
  return `# Righello

> ${COMPANY_SUMMARY} Righello S.r.l. è fondata nel ${COMPANY.founded}.

Ultimo aggiornamento dei contenuti: ${updated()}. Le pagine dicono lo stato vero di ogni progetto (online, in prova, in uso interno): questo file fa lo stesso. Il testo completo e citabile è in ${url('/llms-full.txt')}.

## Chi è Righello

${facts()
  .map((f) => `- ${f}`)
  .join('\n')}

## Servizi

${serviceDetails.map((s) => link(s.name, `/servizi/${s.slug}`, s.seo.description)).join('\n')}
${localLandingLinks.map((l) => link(l.label, l.href, l.description)).join('\n')}

## Software house

${softwareHousePages.map((p) => link(p.name, p.path, `${p.seo.description} ${p.zone === 'pordenone' ? 'Sede legale' : 'Base operativa'}: ${p.zone === 'pordenone' ? COMPANY.legalSeat : CONTACT.street}.`)).join('\n')}

## AI

${link('Agenti AI e automazioni', '/servizi/agenti-ai', getServiceBySlug('agenti-ai')!.subtitle)}
${aiProof()
  .map((s) => link(s.name, caseStudyHref(s), `${s.seo.description} Stato: ${statusLine(s)}.`))
  .join('\n')}
${link('Bando Intelligenza Artificiale FVG 2026', BANDO, 'Guida al bando regionale: lo sportello 2026 si è chiuso con le risorse esaurite.')}

## Prodotti di Righello

${prodotti.map((s) => link(s.name, caseStudyHref(s), `${s.sector}. ${s.seo.description} Stato: ${statusLine(s)}.`)).join('\n')}

## Lavori per i clienti

${lavori.map((s) => link(s.name, caseStudyHref(s), `${kindLabels[s.kind]}. ${s.seo.description}`)).join('\n')}

## Pagine chiave

${link('Home', '/', 'Cosa fa Righello e come lavora')}
${link('Servizi', '/servizi', 'I quattro servizi, il metodo e le domande frequenti')}
${link('Progetti', '/progetti', 'Tutti i prodotti e i lavori, con lo stato di ognuno')}
${link('Chi siamo', '/chi-siamo', 'Lo studio, le persone e il modo di lavorare')}
${link('Contatti', '/contatti', 'WhatsApp, email e modulo; risposta entro 72 ore lavorative')}

## Per i crawler

I crawler dei motori di ricerca e degli assistenti AI (${AI_CRAWLERS.join(', ')}) possono leggere tutto il sito pubblico: vedi ${url('/robots.txt')}. Mappa del sito: ${url('/sitemap.xml')}. Sono esclusi solo i programmi che copiano interi siti e gli analizzatori SEO di terzi.

## Optional

- [Testo completo](${url('/llms-full.txt')}): servizi, prodotti, domande e risposte in testo piano
`;
}

export function llmsFullTxt(): string {
  const section = (title: string, body: string) => `## ${title}\n\n${body.trim()}\n`;

  const servizi = serviceDetails
    .map((s) => {
      const body = [
        `### ${s.name} (${url(`/servizi/${s.slug}`)})`,
        s.subtitle,
        `Cosa ottieni: ${s.outcomes.map((o) => `${o.title}: ${o.text}`).join(' ')}`,
        `Cosa facciamo:\n${s.services.map((x) => `- ${x.title}: ${x.description}`).join('\n')}`,
        `Come lavoriamo:\n${s.workflow.map((w, i) => `${i + 1}. ${w.title}: ${w.description}`).join('\n')}`,
        `Dove: ${s.localSeo.copy} ${s.localSeo.points.join(' ')}`,
        `Lavori che lo dimostrano: ${s.proof
          .map((p) => caseStudies.find((c) => c.id === p.id))
          .filter((c): c is CaseStudy => !!c)
          .map((c) => `${c.name} (${url(caseStudyHref(c))})`)
          .join(', ')}.`,
        `Domande frequenti:\n\n${qa(faqsForService(s.slug))}`
      ];
      return body.join('\n\n');
    })
    .join('\n\n');

  const software = softwareHousePages
    .map((p) =>
      [
        `### ${p.name} (${url(p.path)})`,
        p.lead,
        `Cosa costruiamo:\n${p.scope.items.map((x) => `- ${x.title}: ${x.text}`).join('\n')}`,
        `Prove (schede con lo stato vero): ${p.proof
          .map((it) => caseStudies.find((c) => c.id === it.id))
          .filter((c): c is CaseStudy => !!c)
          .map((c) => `${c.name} (${url(caseStudyHref(c))}, ${c.status.label})`)
          .join(', ')}.`,
        `Domande frequenti:\n\n${qa(p.faqs)}`
      ].join('\n\n')
    )
    .join('\n\n');

  const progetti = caseStudies
    .map((s) =>
      [
        `### ${s.name} (${url(caseStudyHref(s))})`,
        `${kindLabels[s.kind]}. ${s.sector}. Stato: ${statusLine(s)}.`,
        `${s.headline} ${s.text}`,
        s.audience ? `Per chi: ${s.audience}.` : '',
        `Temi: ${s.focus.join(', ')}.`,
        s.status.tone === 'store' && s.storeUrl
          ? `App Store: ${s.storeUrl}`
          : s.href?.startsWith('http')
            ? `Sito: ${s.href}`
            : ''
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n\n');

  const zone = [
    `### Agenzia marketing a Pordenone (${url('/agenzia-marketing-pordenone')})`,
    localLandingLinks[0].description,
    qa(pordenoneFaqs),
    `### Agenzia marketing a Mestre (${url('/agenzia-marketing-mestre')})`,
    localLandingLinks[1].description,
    qa(mestreFaqs)
  ].join('\n\n');

  return `# Righello: testo completo

> ${COMPANY_SUMMARY}

Ultimo aggiornamento dei contenuti: ${updated()}. Indice breve: ${url('/llms.txt')}.

${section(
  'Chi è Righello',
  facts()
    .map((f) => `- ${f}`)
    .join('\n')
)}
${section('Domande generali', qa(homeFaqs))}
${section('Servizi', servizi)}
${section('Software house', software)}
${section('Pagine per zona', zone)}
${section('Prodotti e lavori, con lo stato vero di ognuno', progetti)}
${section('BUFFR: domande frequenti', qa(buffrFaqs))}
${section(`Bando Intelligenza Artificiale FVG 2026 (${url(BANDO)})`, qa(bandoFaqs))}
${section('Come si lavora con Righello', qa(contactFaqs))}`;
}
