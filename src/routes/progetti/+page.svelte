<script lang="ts">
  import { contactHref } from '$lib/data/contact';
  import '$lib/components/progetti/tokens.css';
  import { env } from '$env/dynamic/public';
  import { goto } from '$app/navigation';
  import { clients } from '$lib/data/projects';
  import { caseStudies, caseStudyHref, kindChoice, kindOrder, showcaseStudies } from '$lib/data/case-studies';
  import type { CaseStudy, ProjectKind } from '$lib/data/case-studies';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import LogoCarousel from '$lib/components/LogoCarousel.svelte';
  import ProgettiHero from '$lib/components/progetti/ProgettiHero.svelte';
  import ProductShowcase from '$lib/components/progetti/ProductShowcase.svelte';
  import RegiaSection from '$lib/components/progetti/RegiaSection.svelte';
  import WorkIndex from '$lib/components/progetti/WorkIndex.svelte';
  import ProgettiCta from '$lib/components/progetti/ProgettiCta.svelte';

  const schedulingUrl = env.PUBLIC_SCHEDULING_URL || contactHref();

  const dock = caseStudies.filter((s) => s.icon && s.kind !== 'sito');

  const kinds = kindOrder
    .map((kind) => ({ kind, ...kindChoice[kind], count: caseStudies.filter((s) => s.kind === kind).length }))
    .filter((k) => k.count > 0);

  const byId = (id: string) => caseStudies.find((s) => s.id === id)!;
  const stage = {
    laptop: byId('tetha'),
    tablet: byId('gusto-raffinato-sala'),
    phone: byId('buffr'),
  };

  let showcase: ProductShowcase;
  let index: WorkIndex;

  // Un prodotto della vetrina si apre sulla sua scena; tutti gli altri vanno alla loro scheda.
  function pick(event: CustomEvent<CaseStudy>) {
    const study = event.detail;
    if (showcaseStudies.some((s) => s.id === study.id)) showcase.goTo(study.id);
    else goto(caseStudyHref(study));
  }

  function pickKind(event: CustomEvent<ProjectKind>) {
    index.show(event.detail);
  }

  const selectedClientNames = [
    'Ricci Group',
    'Reguta',
    'Riviera Resort Hotel',
    '3R Technology',
    'Neura',
    'Barcolana',
    'Quellenhof',
    'VIP Motors',
    'Zanutta',
    'G&M Ambiente',
    'Comune di Pordenone',
    'Tomasella',
    'Hotel Elite',
    'La Busa del Sauc',
    'Noiclub',
    'Finestre Art',
  ];
  const clientLogos = clients.filter((c) => c.logo).filter((c) => selectedClientNames.includes(c.name));
</script>

<SeoHead
  path="/progetti"
  title="Progetti: app, gestionali, regia delle partite e siti"
  description="I prodotti costruiti da Righello: app come BUFFR, gestionali come Tetha e Óptima, regia delle partite, piattaforme web e siti, con lo stato vero di ognuno."
/>

<ProgettiHero {dock} {kinds} {stage} on:pick={pick} on:kind={pickKind} />

<ProductShowcase items={showcaseStudies} bind:this={showcase} />

<RegiaSection />

<WorkIndex items={caseStudies} bind:this={index} />

<section class="clients" aria-label="Alcuni clienti">
  <p class="clients__label">Con chi lavoriamo</p>
  <LogoCarousel items={clientLogos} speed={60} pauseOnHover={true} scaleOnHover={true} fadeEdges={false} gap={64} itemHeight={44} />
</section>

<ProgettiCta {schedulingUrl} />

<style>
  .clients {
    content-visibility: auto;
    contain-intrinsic-size: auto 223px;
    padding: clamp(2.5rem, 6vw, 4rem) 0;
    background: var(--bg-primary);
    border-top: 1px solid var(--border-color);
    overflow: hidden;
  }

  .clients__label {
    margin: 0 0 1.6rem;
    text-align: center;
    font: 600 0.74rem/1 var(--font-label);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
</style>
