<script lang="ts">
  import { onMount } from 'svelte';
  import '$lib/components/progetti/tokens.css';
  import '$lib/components/progetti/landing/landing.css';
  import ProjectIcon from '$lib/components/progetti/ProjectIcon.svelte';
  import StatusBadge from '$lib/components/progetti/StatusBadge.svelte';
  import LandingHero from '$lib/components/progetti/landing/LandingHero.svelte';
  import SectionNav from '$lib/components/progetti/landing/SectionNav.svelte';
  import Chapters from '$lib/components/progetti/landing/Chapters.svelte';
  import HowItWorks from '$lib/components/progetti/landing/HowItWorks.svelte';
  import Features from '$lib/components/progetti/landing/Features.svelte';
  import Demo from '$lib/components/progetti/landing/Demo.svelte';
  import TechGrid from '$lib/components/progetti/landing/TechGrid.svelte';
  import ClosingCta from '$lib/components/progetti/landing/ClosingCta.svelte';
  import { hasDemo, hasOwnLanding, resolveLanding } from '$lib/components/progetti/landing/resolve';
  import { caseStudyHref, getNextCaseStudy, kindLabels } from '$lib/data/case-studies';
  import type { PageData } from './$types';

  export let data: PageData;

  $: study = data.study;
  $: related = data.related;
  $: next = getNextCaseStudy(study);
  $: landing = resolveLanding(study);
  $: own = hasOwnLanding(study);
  $: canonical = `https://www.wearerighello.com/progetti/${study.id}`;
  $: seoTitle = `${study.name} | ${kindLabels[study.kind]} | Righello`;
  $: ogImage = study.image.startsWith('http') ? study.image : `https://www.wearerighello.com${study.image}`;
  $: primary = study.storeUrl
    ? { href: study.storeUrl, label: 'Scarica su App Store' }
    : study.href?.startsWith('http')
      ? { href: study.href, label: 'Visita il sito' }
      : null;

  $: showDemo = hasDemo(landing);
  /** Infografica subito dopo la fascia dei numeri (prodotti per la PA) oppure dopo i capitoli. */
  $: graphicFirst = landing.variant === 'pa' && !!landing.graphic;

  /** L'ordine vero delle sezioni: la mini-navigazione e i toni dello sfondo lo seguono, cosi' non c'e' mai una voce o un tono per una sezione assente. */
  $: how = { id: 'come-funziona', label: 'Come funziona', on: !!landing.graphic, count: 1 };
  $: flow = [
    ...(graphicFirst ? [how] : []),
    { id: 'panoramica', label: 'Panoramica', on: landing.chapters.length > 0, count: landing.chapters.length },
    ...(graphicFirst ? [] : [how]),
    { id: 'funzioni', label: 'Funzioni', on: landing.features.length > 0, count: 1 },
    { id: 'in-azione', label: 'In azione', on: showDemo, count: 1 },
    { id: 'tecnologia', label: 'Tecnologia', on: landing.tech.length > 0, count: 1 },
  ].filter((s) => s.on);

  $: sections = flow;
  /** Indice di partenza di ogni sezione: toni alterni (pari = fondo base, dispari = fondo piu' chiaro). */
  $: toneOf = (() => {
    const t: Record<string, number> = {};
    let n = 0;
    for (const f of flow) {
      t[f.id] = n;
      n += f.count;
    }
    t.chiusura = n;
    return t;
  })();

  $: breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Progetti', item: 'https://www.wearerighello.com/progetti' },
      { '@type': 'ListItem', position: 2, name: study.name, item: canonical },
    ],
  }).replace(/</g, '\\u003c');

  // Le entrate al passaggio nascondono i blocchi solo quando il JavaScript c'e': senza, la pagina resta intera.
  let js = false;
  onMount(() => (js = true));
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={`${study.headline} ${study.text}`.slice(0, 300)} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={study.headline} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seoTitle} />
  <meta name="twitter:description" content={study.headline} />
  <meta name="twitter:image" content={ogImage} />
  {@html `<script type="application/ld+json">${breadcrumbSchema}<\/script>`}
</svelte:head>

<div class="lp {landing.variant ? `lp--${landing.variant}` : ''}" class:lp-js={js} style="--a:{study.accent[0]}; --b:{study.accent[1]}">
  <LandingHero {study} {landing} {primary} />

  <!-- la mini-navigazione resta attaccata solo finche' ci sono sezioni da scorrere: finisce con questo blocco -->
  <div>
    {#if sections.length > 1}<SectionNav items={sections} />{/if}
    {#if graphicFirst && landing.graphic}<HowItWorks {study} graphic={landing.graphic} how={landing.how} tone={toneOf['come-funziona']} />{/if}
    {#if landing.chapters.length}<Chapters chapters={landing.chapters} variant={landing.variant} tone={toneOf['panoramica']} />{/if}
    {#if !graphicFirst && landing.graphic}<HowItWorks {study} graphic={landing.graphic} how={landing.how} tone={toneOf['come-funziona']} />{/if}
    {#if landing.features.length}<Features features={landing.features} tone={toneOf['funzioni']} {...own ? {} : { title: 'Su cosa abbiamo lavorato', highlight: 'lavorato' }} />{/if}
    {#if showDemo && landing.demo}<Demo demo={landing.demo} tone={toneOf['in-azione']} />{/if}
    {#if landing.tech.length}<TechGrid tech={landing.tech} tone={toneOf['tecnologia']} />{/if}
  </div>
  <ClosingCta {study} cta={landing.cta} {primary} tone={toneOf['chiusura']} />
</div>

<a class="next" href={caseStudyHref(next)} style="--a:{next.accent[0]}; --b:{next.accent[1]}">
  <span class="next__bg" aria-hidden="true"></span>
  <span class="section-container next__in">
    <span class="next__kicker">Prossimo progetto</span>
    <span class="next__row">
      <span class="next__name">{next.name}</span>
      <span class="next__arrow" aria-hidden="true">→</span>
    </span>
    <span class="next__sub">{kindLabels[next.kind]} · {next.status.label}</span>
  </span>
</a>

<section class="rel">
  <div class="section-container">
    <p class="rel__kicker">Altri progetti</p>
    <ul class="rel__grid">
      {#each related as item (item.id)}
        <li>
          <a class="rel__card" href={caseStudyHref(item)} style="--a:{item.accent[0]}; --b:{item.accent[1]}">
            <span class="rel__top">
              <ProjectIcon study={item} size={44} />
              <StatusBadge status={item.status} compact />
            </span>
            <span class="rel__name">{item.name}</span>
            <span class="rel__kind">{kindLabels[item.kind]}</span>
            <span class="rel__arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  /* ---------- next ---------- */
  .next {
    position: relative;
    display: block;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(3.5rem, 8vw, 6rem) 0;
    color: #fff;
    text-decoration: none;
    background: #050505;
  }

  .next__bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(120deg, color-mix(in srgb, var(--a) 70%, #050505), color-mix(in srgb, var(--b) 80%, #050505));
    transition: filter 0.4s;
  }

  .next:hover .next__bg { filter: brightness(1.15) saturate(1.1); }

  .next__in { display: flex; flex-direction: column; gap: 0.9rem; }

  .next__kicker {
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
  }

  .next__row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }

  .next__name {
    font-weight: var(--pg-display-weight);
    font-size: clamp(2.6rem, 9vw, 9rem);
    line-height: 0.92;
    letter-spacing: var(--pg-display-tracking);
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .next__arrow {
    flex: none;
    font-size: clamp(2rem, 6vw, 5.5rem);
    transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .next:hover .next__arrow { transform: translateX(14px); }
  .next:focus-visible { outline: 3px solid #fff; outline-offset: -6px; }

  .next__sub {
    font: 500 0.8rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.82);
  }

  /* ---------- related ---------- */
  .rel { padding: clamp(3.5rem, 7vw, 5rem) 0 clamp(4rem, 8vw, 6rem); background: var(--bg-primary); }

  .rel__kicker {
    margin: 0 0 1.4rem;
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .rel__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 800px) {
    .rel__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .rel__card {
    position: relative;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 13rem;
    padding: 1.3rem;
    border-radius: 1.2rem;
    border: 1px solid var(--border-color);
    background:
      radial-gradient(90% 90% at 100% 0%, color-mix(in srgb, var(--a) 18%, transparent), transparent 65%),
      var(--bg-secondary);
    color: var(--text-primary);
    text-decoration: none;
    transition: transform 0.3s, border-color 0.3s;
  }

  .rel__card:hover { transform: translateY(-4px); border-color: var(--a); }
  .rel__card:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; }

  .rel__top { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; margin-bottom: auto; }
  /* le etichette di stato lunghe vanno a capo dentro la scheda invece di spingerla fuori dallo schermo */
  .rel__top :global(.sb.sb--compact) { min-width: 0; max-width: 100%; white-space: normal; }

  .rel__name { font-weight: var(--pg-display-weight); font-size: 1.7rem; letter-spacing: var(--pg-display-tracking); line-height: 1; }

  .rel__kind {
    font: 500 0.72rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .rel__arrow {
    position: absolute;
    right: 1.2rem;
    bottom: 1.1rem;
    font-size: 1.3rem;
    color: var(--text-muted);
    transition: transform 0.3s, color 0.3s;
  }

  .rel__card:hover .rel__arrow { transform: translate(3px, -3px); color: var(--a); }

  @media (prefers-reduced-motion: reduce) {
    .next__arrow, .rel__card, .rel__arrow { transition: none; }
  }
</style>
