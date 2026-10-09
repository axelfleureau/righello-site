<script lang="ts">
  import ServicePage from '$lib/components/servizi/ServicePage.svelte';
  import { serviceModel } from '$lib/components/servizi/models';
  import type { PageData } from './$types';

  export let data: PageData;

  $: service = data.service;
  $: m = serviceModel(service);
  $: url = `https://www.wearerighello.com/servizi/${service.slug}`;

  $: structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.category,
    description: service.seo.description,
    provider: {
      '@type': 'Organization',
      name: 'Righello',
      email: 'hello@wearerighello.com',
      url: 'https://www.wearerighello.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Via Pio X 21',
        addressLocality: 'Mestre',
        addressRegion: 'Venezia',
        addressCountry: 'IT',
      },
    },
    areaServed: ['Pordenone', 'Mestre', 'Venezia', 'Friuli-Venezia Giulia', 'Veneto', 'IT'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.category,
      itemListElement: service.services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title } })),
    },
  }).replace(/</g, '\\u003c');

  $: breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Servizi', item: 'https://www.wearerighello.com/servizi' },
      { '@type': 'ListItem', position: 2, name: service.name, item: url },
    ],
  }).replace(/</g, '\\u003c');
</script>

<svelte:head>
  <title>{service.seo.title}</title>
  <meta name="description" content={service.seo.description} />
  <meta property="og:title" content={service.seo.title} />
  <meta property="og:description" content={service.seo.description} />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <link rel="canonical" href={url} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={service.seo.title} />
  <meta name="twitter:description" content={service.seo.description} />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=2" />
  {@html `<script type="application/ld+json">${structuredData}<\/script>`}
  {@html `<script type="application/ld+json">${breadcrumbSchema}<\/script>`}
</svelte:head>

<ServicePage {m} />
