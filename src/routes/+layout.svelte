<script lang="ts">
  import '$styles/index.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import AirplaneEasterEgg from '$lib/components/AirplaneEasterEgg.svelte';
  import CustomCursor from '$lib/components/CustomCursor.svelte';
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { initMetaPixel, trackPageView } from '$lib/tracking/metaPixel';
  
  const PUBLIC_META_PIXEL_ID = import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined;
  
  onMount(() => {
    theme.init();
    
    if (PUBLIC_META_PIXEL_ID) {
      initMetaPixel(PUBLIC_META_PIXEL_ID);
    }
  });
  
  afterNavigate(() => {
    if (browser && PUBLIC_META_PIXEL_ID) {
      trackPageView();
    }
  });
  
  $: if (browser) {
    document.documentElement.setAttribute('data-theme', $theme);
  }
</script>

<svelte:head>
  <meta name="theme-color" content="#050505" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Righello",
    "legalName": "Righello S.r.l.",
    "url": "https://www.wearerighello.com",
    "logo": "https://www.wearerighello.com/logo-full.png",
    "description": "Agenzia di marketing orientata ai risultati. Marketing, advertising e sviluppo digitale con un approccio data-driven.",
    "email": "hello@wearerighello.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Pio X 21",
      "addressLocality": "Mestre",
      "addressRegion": "Venezia",
      "addressCountry": "IT"
    },
    "sameAs": [
      "https://www.instagram.com/wearerighello",
      "https://www.linkedin.com/company/righello",
      "https://www.tiktok.com/@wearerighello"
    ],
    "vatID": "IT01979970934",
    "foundingDate": "2023",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 4
    }
  })}</script>`}
</svelte:head>

<div data-theme={$theme}>
  {#if browser}
    <CustomCursor />
  {/if}
  {#if !$page.url.pathname.startsWith('/busadelsauc')}
    <Header />
  {/if}
  <main class="min-h-screen" style="background-color: var(--bg-primary);">
    <slot />
  </main>
  {#if !$page.url.pathname.startsWith('/busadelsauc')}
    <Footer />
  {/if}
  {#if $page.url.pathname === '/'}
    <AirplaneEasterEgg />
  {/if}
</div>
