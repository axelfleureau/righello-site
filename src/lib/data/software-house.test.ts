import { describe, expect, it } from 'vitest';
import { getCaseStudyBySlug } from './case-studies';
import { serviceDetails, serviceFaqs } from './service-details';
import { getSoftwareHouse, softwareHousePages, type SoftwareHousePage } from './software-house';
import { footerColumns, softwareHouseLinks } from './site';
import { sitePages } from '../seo/pages';

const words = (text: string) => text.trim().split(/\s+/).length;

/** Tutto il testo che una pagina «software house» mostra, una frase per riga. */
function textOf(p: SoftwareHousePage): string[] {
  return [
    p.kicker,
    p.title,
    p.highlight ?? '',
    p.lead,
    ...p.panel,
    ...p.scope.items.flatMap((x) => [x.title, x.text]),
    ...p.scope2.items.flatMap((x) => [x.title, x.text]),
    p.note.title,
    p.note.text,
    ...p.method.steps.flatMap((x) => [x.title, x.text]),
    ...p.proof.map((x) => x.note),
    ...p.local.paragraphs,
    ...p.faqs.flatMap((f) => [f.question, f.answer]),
    p.closing.text
  ].filter(Boolean);
}

/** Cose che il marketing non deve dire: strumenti e fornitori (Axel li ritiene troppo dettaglio) e affermazioni senza prova. */
export const FORBIDDEN_IN_MARKETING = [
  /\b(react|svelte|sveltekit|next\.?js|node\.?js|typescript|javascript|swift|swiftui|expo|cloudflare|firebase|vercel|postgres|sqlite|d1|openai|chatgpt|gpt|claude|codex|anthropic|gemini|llama|mistral|stripe|clerk|telegram bot api|docker|kubernetes|aws|azure)\b/i,
  /\b(\d+\s+anni di (esperienza|attivit))/i,
  /\bda (oltre )?\d+ anni\b/i,
  /\b(leader|numero 1|migliore|migliori|garantit\w*|premiat\w*|certificat\w* (iso|microsoft|google)|iso\s?\d{4,5}|recension\w*|stelle|partner (di|ufficiale))\b/i,
  /\b(industria 4\.0|mes\b|erp\b|computer vision|visione artificiale)\b(?!.*(non|no)\b)/i,
  /\b(addestrat\w*|fine[- ]?tuning)\b/i
];

describe('pagine software house: dati', () => {
  it('ci sono le due sedi, e il piede le dichiara con gli stessi indirizzi e nomi', () => {
    expect(softwareHousePages.map((p) => p.zone)).toEqual(softwareHouseLinks.map((l) => l.zone));
    const footer = footerColumns.flatMap((c) => c.links);
    for (const link of softwareHouseLinks) {
      expect(footer, link.href).toContainEqual({ href: link.href, label: link.label });
      const page = getSoftwareHouse(link.zone)!;
      expect(page.path).toBe(link.href);
      expect(page.name).toBe(link.label);
      expect(sitePages.map((p) => p.path)).toContain(link.href);
    }
    expect(getSoftwareHouse('milano')).toBeUndefined();
  });

  describe.each(softwareHousePages)('$path', (p) => {
    it('la risposta in apertura sta fra 40 e 60 parole e dice chi, cosa e dove', () => {
      expect(words(p.lead), p.lead).toBeGreaterThanOrEqual(40);
      expect(words(p.lead), p.lead).toBeLessThanOrEqual(60);
      expect(p.lead).toMatch(/Righello/);
      expect(p.lead).toMatch(/software su misura/i);
      expect(p.lead).toMatch(/Pordenone/);
      expect(p.lead).toMatch(/Mestre/);
    });

    it('ha da 7 a 10 domande, con risposte da 40 a 60 parole, tutte diverse', () => {
      expect(p.faqs.length).toBeGreaterThanOrEqual(7);
      expect(p.faqs.length).toBeLessThanOrEqual(10);
      for (const f of p.faqs) {
        expect(words(f.answer), `${f.question} (${words(f.answer)} parole)`).toBeGreaterThanOrEqual(40);
        expect(words(f.answer), `${f.question} (${words(f.answer)} parole)`).toBeLessThanOrEqual(60);
        expect(f.structured, f.question).toBeUndefined();
      }
      expect(new Set(p.faqs.map((f) => f.question)).size).toBe(p.faqs.length);
    });

    it('titolo (30-60) e descrizione (70-160) della lunghezza giusta, e il titolo contiene la ricerca', () => {
      expect(p.seo.title.length).toBeGreaterThanOrEqual(30);
      expect(p.seo.title.length).toBeLessThanOrEqual(60);
      expect(p.seo.description.length).toBeGreaterThanOrEqual(70);
      expect(p.seo.description.length).toBeLessThanOrEqual(160);
      expect(p.seo.title.toLowerCase()).toContain('software house a');
    });

    it('ogni prova e una scheda vera, con una nota; le schede dei lavori non si ripetono', () => {
      expect(p.proof.length).toBeGreaterThanOrEqual(4);
      for (const it of p.proof) {
        expect(getCaseStudyBySlug(it.id), it.id).toBeDefined();
        expect(it.note.length).toBeGreaterThan(20);
      }
      expect(new Set(p.proof.map((x) => x.id)).size).toBe(p.proof.length);
    });

    it('non dice stato falso: «App Store» solo accanto a BUFFR, e «online» o «in prova» come nelle schede', () => {
      for (const line of textOf(p))
        for (const sentence of line.split(/(?<=[.;:])\s+/))
          if (/App Store/.test(sentence)) expect(sentence, sentence).toMatch(/BUFFR|nostra app/);
      for (const it of p.proof) {
        const study = getCaseStudyBySlug(it.id)!;
        if (study.status.tone !== 'store') expect(it.note, `${it.id} non e su App Store`).not.toMatch(/App Store/);
        if (/in prova/.test(study.status.label)) expect(it.note, it.id).not.toMatch(/disponibile/i);
      }
    });

    it('nessuno strumento, fornitore, premio, recensione, anno di esperienza o promessa senza prova', () => {
      for (const line of textOf(p)) for (const re of FORBIDDEN_IN_MARKETING) expect(line, `${re}`).not.toMatch(re);
    });

    it('nessun indirizzo a Pordenone e nessun Comune cliente nominato', () => {
      const all = textOf(p).join('\n');
      expect(all).not.toMatch(/Pordenone,?\s+(via|viale|piazza|corso)\b/i);
      // L'unico indirizzo che le pagine scrivono e' quello vero della base operativa (Via Pio X, Mestre).
      for (const street of all.match(/\b(Via|Viale|Piazza|Corso) [A-Z][^,.\d\n]*/g) ?? []) expect(street).toMatch(/^Via Pio X/);
      expect(all).not.toMatch(/\b(Noventa|Trevignano|Maniago|Codroipo|Azzano|Comune di (?!Esempio))\b/);
    });

    it('ogni collegamento interno porta a una pagina che esiste', () => {
      const hrefs = [
        ...p.scope.items.map((x) => x.href),
        ...(p.local.links ?? []).map((x) => x.href),
        p.note.link.href,
        p.flow.next.href,
        p.flow.prev.href
      ].filter((h): h is string => !!h);
      const known = new Set(sitePages.map((x) => x.path));
      for (const href of hrefs) expect(known.has(href.split(/[?#]/)[0]), href).toBe(true);
    });
  });

  it('le due pagine non si copiano: titoli, risposte in apertura e domande sono diversi, e quasi nessuna frase e uguale', () => {
    const [a, b] = softwareHousePages;
    expect(a.lead).not.toBe(b.lead);
    expect(a.seo.title).not.toBe(b.seo.title);
    expect(a.seo.description).not.toBe(b.seo.description);
    const sentences = (p: SoftwareHousePage) =>
      new Set(textOf(p).flatMap((t) => t.split(/(?<=[.!?])\s+/)).filter((s) => words(s) > 6));
    const sa = sentences(a);
    const shared = [...sentences(b)].filter((s) => sa.has(s));
    const total = Math.min(sa.size, sentences(b).size);
    // Le frasi condivise sono i fatti comuni (formazione, chiamata gratuita, stato dei prodotti): meno di un sesto del testo.
    expect(shared.length / total, shared.join(' | ')).toBeLessThan(1 / 6);
  });
});

describe('pagina degli agenti AI: parti aggiunte', () => {
  const ai = serviceDetails.find((s) => s.slug === 'agenti-ai')!;
  const added = serviceFaqs.filter((f) => f.onlyOnPage);

  it('la risposta in apertura sta fra 40 e 60 parole', () => {
    expect(words(ai.subtitle), ai.subtitle).toBeGreaterThanOrEqual(40);
    expect(words(ai.subtitle), ai.subtitle).toBeLessThanOrEqual(60);
  });

  it('le domande nuove (da 8) hanno risposte da 40 a 60 parole, sono solo della pagina e non finiscono nell’indice dei servizi', () => {
    expect(added.length).toBeGreaterThanOrEqual(8);
    for (const f of added) {
      expect(f.services).toEqual(['agenti-ai']);
      expect(words(f.a), `${f.q} (${words(f.a)})`).toBeGreaterThanOrEqual(40);
      expect(words(f.a), `${f.q} (${words(f.a)})`).toBeLessThanOrEqual(60);
    }
  });

  it('il blocco «produzione AI» dice cosa non si fa, e nessun testo promette o nomina strumenti', () => {
    const lines = [
      ai.subtitle,
      ...(ai.sections ?? []).flatMap((s) => [s.kicker, s.title, s.lead ?? '', ...s.items.flatMap((i) => [i.title, i.text])]),
      ...added.flatMap((f) => [f.q, f.a])
    ];
    const produzione = ai.sections!.find((s) => s.id === 'produzione-ai')!;
    expect(produzione.items.map((i) => i.title).join(' ')).toMatch(/: no$/m);
    for (const line of lines) for (const re of [FORBIDDEN_IN_MARKETING[0], FORBIDDEN_IN_MARKETING[1], FORBIDDEN_IN_MARKETING[2], FORBIDDEN_IN_MARKETING[3]]) expect(line, `${re}`).not.toMatch(re);
    // Il «no» sulle macchine di fabbrica e' l'unico punto in cui si nominano visione artificiale e manutenzione predittiva.
    for (const line of lines.filter((l) => /visione artificiale|manutenzione predittiva/i.test(l))) expect(line).toMatch(/\bno\b|non /i);
    // Mai «addestrato» come qualita': nelle risposte solo per dire che non succede.
    for (const f of added.filter((x) => /addestra/i.test(x.a))) expect(f.a).toMatch(/non |riaddestrat/i);
  });
});
