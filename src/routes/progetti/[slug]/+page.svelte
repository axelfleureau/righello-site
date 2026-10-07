<script lang="ts">
  import { onMount } from 'svelte';
  import '$lib/components/progetti/tokens.css';
  import '$lib/components/progetti/landing/landing.css';
  import ProductFlow from '$lib/components/progetti/ProductFlow.svelte';
  import LandingHero from '$lib/components/progetti/landing/LandingHero.svelte';
  import SectionNav from '$lib/components/progetti/landing/SectionNav.svelte';
  import Chapters from '$lib/components/progetti/landing/Chapters.svelte';
  import HowItWorks from '$lib/components/progetti/landing/HowItWorks.svelte';
  import Features from '$lib/components/progetti/landing/Features.svelte';
  import Demo from '$lib/components/progetti/landing/Demo.svelte';
  import TechGrid from '$lib/components/progetti/landing/TechGrid.svelte';
  import ClosingCta from '$lib/components/progetti/landing/ClosingCta.svelte';
  import { hasDemo, hasOwnLanding, resolveLanding } from '$lib/components/progetti/landing/resolve';
  import { kindLabels, listHref } from '$lib/data/case-studies';
  import type { PageData } from './$types';

  export let data: PageData;

  $: study = data.study;
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

  $: sections = [...flow, { id: 'chiusura', label: 'Parliamone' }];
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
    {#if sections.length > 1}<SectionNav items={sections} back={{ href: listHref(study), label: 'Progetti' }} />{/if}
    {#if graphicFirst && landing.graphic}<HowItWorks {study} graphic={landing.graphic} how={landing.how} tone={toneOf['come-funziona']} />{/if}
    {#if landing.chapters.length}<Chapters chapters={landing.chapters} variant={landing.variant} tone={toneOf['panoramica']} />{/if}
    {#if !graphicFirst && landing.graphic}<HowItWorks {study} graphic={landing.graphic} how={landing.how} tone={toneOf['come-funziona']} />{/if}
    {#if landing.features.length}<Features features={landing.features} tone={toneOf['funzioni']} {...own ? {} : { title: 'Su cosa abbiamo lavorato', highlight: 'lavorato' }} />{/if}
    {#if showDemo && landing.demo}<Demo demo={landing.demo} tone={toneOf['in-azione']} />{/if}
    {#if landing.tech.length}<TechGrid tech={landing.tech} tone={toneOf['tecnologia']} />{/if}
  </div>
  <ClosingCta {study} cta={landing.cta} {primary} tone={toneOf['chiusura']} />
</div>

<ProductFlow {study} />
