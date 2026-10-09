<script lang="ts">
  import { CONTACT } from '$lib/data/contact';
  import ServicePage from '$lib/components/servizi/ServicePage.svelte';
  import { indexModel } from '$lib/components/servizi/models';
  import { serviceDetails } from '$lib/data/service-details';

  const m = indexModel();

  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital Agency Services',
    provider: {
      '@type': 'Organization',
      name: 'Righello',
      email: CONTACT.email,
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
      name: 'Servizi Digitali',
      itemListElement: [
        'Siti Web',
        'E-Commerce',
        'Web App Custom',
        'Marketing Automation',
        'Sviluppo Software Custom',
        'Agenti AI su Misura',
        'Automazione Processi Aziendali',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    },
  }).replace(/</g, '\\u003c');

  const listSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: serviceDetails.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: `https://www.wearerighello.com/servizi/${s.slug}` })),
  }).replace(/</g, '\\u003c');

  const title = 'Servizi | Social, Advertising, Siti Web e AI - Righello';
  const description = 'Servizi Righello: social media, advertising, siti web, e-commerce, software e agenti AI per aziende tra Pordenone, Mestre e Nord Italia.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <link rel="canonical" href="https://www.wearerighello.com/servizi" />
  <meta property="og:url" content="https://www.wearerighello.com/servizi" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=2" />
  {@html `<script type="application/ld+json">${structuredData}<\/script>`}
  {@html `<script type="application/ld+json">${listSchema}<\/script>`}
</svelte:head>

<ServicePage {m} />
