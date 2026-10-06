<script lang="ts">
  import '$lib/components/progetti/tokens.css';
  import { env } from '$env/dynamic/public';
  import { clients } from '$lib/data/projects';
  import { caseStudies, caseStudyHref, showcaseStudies } from '$lib/data/case-studies';
  import type { CaseStudy } from '$lib/data/case-studies';
  import LogoCarousel from '$lib/components/LogoCarousel.svelte';
  import ProgettiHero from '$lib/components/progetti/ProgettiHero.svelte';
  import ProductShowcase from '$lib/components/progetti/ProductShowcase.svelte';
  import RegiaSection from '$lib/components/progetti/RegiaSection.svelte';
  import WorkIndex from '$lib/components/progetti/WorkIndex.svelte';
  import ProgettiCta from '$lib/components/progetti/ProgettiCta.svelte';

  const schedulingUrl = env.PUBLIC_SCHEDULING_URL || '/contatti';

  const software = caseStudies.filter((s) => ['app', 'gestionale', 'broadcast', 'piattaforma'].includes(s.kind));
  const dock = caseStudies.filter((s) => s.icon && s.kind !== 'sito');

  const stats = [
    { value: software.length, label: 'prodotti software costruiti da noi' },
    { value: caseStudies.filter((s) => s.platform.some((p) => p === 'iPhone' || p === 'iPad')).length, label: 'app per iPhone e iPad' },
    { value: caseStudies.filter((s) => s.kind === 'sito').length, label: 'siti su misura in vetrina' },
    { value: caseStudies.filter((s) => s.status.tone === 'store').length, label: 'già pubblicata su App Store' },
  ];

  const byId = (id: string) => caseStudies.find((s) => s.id === id)!;
  const stage = {
    laptop: byId('tetha'),
    tablet: byId('gusto-raffinato-sala'),
    phone: byId('buffr'),
  };

  let showcase: ProductShowcase;

  function pick(event: CustomEvent<CaseStudy>) {
    const study = event.detail;
    if (showcaseStudies.some((s) => s.id === study.id)) {
      showcase.goTo(study.id);
    } else {
      document.getElementById('regia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  const schema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Progetti Righello: app, gestionali, regia delle partite e siti',
      description:
        'App per iPhone e iPad, gestionali, la regia che produce le partite, piattaforme web e siti su misura realizzati da Righello S.r.l.',
      url: 'https://www.wearerighello.com/progetti',
      inLanguage: 'it-IT',
      publisher: {
        '@type': 'Organization',
        name: 'Righello S.r.l.',
        url: 'https://www.wearerighello.com',
        logo: 'https://www.wearerighello.com/logo-icon.png',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Prodotti e progetti Righello',
      itemListElement: caseStudies.map((study, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: study.name,
        url: `https://www.wearerighello.com${caseStudyHref(study)}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.wearerighello.com' },
        { '@type': 'ListItem', position: 2, name: 'Progetti', item: 'https://www.wearerighello.com/progetti' },
      ],
    },
  ]);

  const schemaMarkup = `<script type="application/ld+json">${schema.replace(/</g, '\\u003c')}<\/script>`;
</script>

<svelte:head>
  <title>Progetti | App, gestionali, regia delle partite e siti | Righello</title>
  <meta
    name="description"
    content="I prodotti costruiti da Righello: app per iPhone e iPad come BUFFR, gestionali come Tetha e Óptima, la regia che produce le partite, piattaforme web e siti su misura. Con lo stato reale di ognuno."
  />
  <link rel="canonical" href="https://www.wearerighello.com/progetti" />
  <meta property="og:title" content="Progetti | Righello: costruiamo prodotti, non presentazioni" />
  <meta
    property="og:description"
    content="App negli store, gestionali in uso ogni giorno, la regia delle partite e i siti dei nostri clienti. Tutto quello che abbiamo costruito."
  />
  <meta property="og:url" content="https://www.wearerighello.com/progetti" />
  <meta name="twitter:title" content="Progetti | Righello" />
  <meta
    name="twitter:description"
    content="App negli store, gestionali, regia delle partite e siti su misura costruiti da Righello."
  />
  {@html schemaMarkup}
</svelte:head>

<ProgettiHero {dock} {stats} {stage} on:pick={pick} />

<ProductShowcase items={showcaseStudies} bind:this={showcase} />

<RegiaSection />

<WorkIndex items={caseStudies} />

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
    font: 600 0.74rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
</style>
