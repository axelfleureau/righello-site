<script lang="ts">
  import '$lib/components/buffr/tokens.css';
  import BuffrHero from '$lib/components/buffr/BuffrHero.svelte';
  import SceneStage from '$lib/components/buffr/SceneStage.svelte';
  import SceneVisual from '$lib/components/buffr/SceneVisual.svelte';
  import TeamSection from '$lib/components/buffr/TeamSection.svelte';
  import FeatureBento from '$lib/components/buffr/FeatureBento.svelte';
  import Audience from '$lib/components/buffr/Audience.svelte';
  import FaqList from '$lib/components/buffr/FaqList.svelte';
  import FinalCta from '$lib/components/buffr/FinalCta.svelte';
  import ProductFlow from '$lib/components/progetti/ProductFlow.svelte';
  import { getCaseStudyBySlug } from '$lib/data/case-studies';
  import { faqs, pageUrl, scenes, storeUrl, storeUrlUs } from '$lib/components/buffr/content';

  const study = getCaseStudyBySlug('buffr')!;
  const site = 'https://www.wearerighello.com';
  const description =
    'BUFFR è l’app per iPhone di Righello che tiene gli ultimi secondi di quello che inquadri: un tocco e il gol, l’azione o il fischio diventano clip e montaggi pronti da condividere.';
  const ogImage = `${site}/products/buffr/replay-eventi-live.jpg`;

  const schema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'BUFFR | Righello',
      url: pageUrl,
      description,
      inLanguage: 'it-IT',
      isPartOf: { '@type': 'WebSite', name: 'Righello', url: site },
    },
    {
      '@context': 'https://schema.org',
      '@type': ['SoftwareApplication', 'MobileApplication'],
      name: 'BUFFR',
      alternateName: ['BUFFR Righello', 'BUFFR by Righello'],
      applicationCategory: 'PhotoApplication',
      operatingSystem: 'iOS',
      bundleId: 'com.wearerighello.bufferello',
      downloadUrl: storeUrl,
      installUrl: storeUrl,
      image: ogImage,
      screenshot: [`${site}/products/buffr/libreria-v2.webp`, `${site}/products/buffr/montaggio-v2.webp`],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: storeUrl,
      },
      author: { '@type': 'Organization', name: 'RIGHELLO SRL', url: site },
      publisher: { '@type': 'Organization', name: 'RIGHELLO SRL', url: site },
      url: pageUrl,
      sameAs: [storeUrl, storeUrlUs],
      description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site },
        { '@type': 'ListItem', position: 2, name: 'BUFFR', item: pageUrl },
      ],
    },
  ]);

  const schemaMarkup = `<script type="application/ld+json">${schema.replace(/</g, '\\u003c')}<\/script>`;
</script>

<svelte:head>
  <title>BUFFR | Camera per iPhone che salva gli ultimi secondi | Righello</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={pageUrl} />
  <meta property="og:title" content="BUFFR | Prima succede. Poi lo salvi." />
  <meta
    property="og:description"
    content="L’app per iPhone di Righello che tiene gli ultimi secondi di quello che inquadri. Un tocco e sono tuoi."
  />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="BUFFR | Prima succede. Poi lo salvi." />
  <meta name="twitter:description" content="La camera per iPhone che salva gli ultimi secondi: gol, azioni e montaggi in un tocco." />
  <meta name="twitter:image" content={ogImage} />
  {@html schemaMarkup}
</svelte:head>

<div class="buffr">
  <BuffrHero />

  <SceneStage {scenes}>
    <svelte:fragment slot="stage" let:index let:local>
      <SceneVisual {index} {local} />
    </svelte:fragment>
    <svelte:fragment slot="poster" let:index let:local>
      <SceneVisual {index} {local} compact instant />
    </svelte:fragment>
  </SceneStage>

  <TeamSection />
  <FeatureBento />
  <Audience />
  <FaqList />
  <FinalCta />
</div>

<ProductFlow {study} />
