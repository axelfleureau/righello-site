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
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  const PUBLIC_META_PIXEL_ID = import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined;
  
  onMount(() => {
    theme.init();
    
    if (PUBLIC_META_PIXEL_ID) {
      initMetaPixel(PUBLIC_META_PIXEL_ID);
    }

    // Backup handler: suppress non-Error unhandled rejections from WebGL libs (OGL).
    // The primary handler is in app.html (inline script, runs before any module).
    function handleUnhandledRejection(event: PromiseRejectionEvent) {
      if (!(event.reason instanceof Error)) {
        event.preventDefault();
      }
    }
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
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
  <meta property="og:site_name" content="Righello" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.wearerighello.com/#organization",
        "name": "Righello",
        "legalName": "Righello S.r.l.",
        "url": "https://www.wearerighello.com",
        "logo": "https://www.wearerighello.com/logo-full.png",
        "description": "Studio digitale operativo tra Pordenone e Mestre, specializzato in siti web, software, advertising, contenuti foto/video e automazioni per aziende, hospitality, eventi e PMI in Friuli-Venezia Giulia e Veneto.",
        "email": "hello@wearerighello.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Pio X 21",
          "addressLocality": "Mestre",
          "addressRegion": "Veneto",
          "postalCode": "30174",
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
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.wearerighello.com/#localbusiness",
        "name": "Righello S.r.l.",
        "url": "https://www.wearerighello.com",
        "email": "hello@wearerighello.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Pio X 21",
          "addressLocality": "Mestre",
          "addressRegion": "Veneto",
          "postalCode": "30174",
          "addressCountry": "IT"
        },
        "areaServed": [
          "Pordenone",
          "Venezia",
          "Mestre",
          "Treviso",
          "Udine",
          "Friuli-Venezia Giulia",
          "Veneto",
          "Italia"
        ],
        "priceRange": "€€€",
        "description": "Studio digitale per siti web, software, advertising, contenuti foto/video e automazioni. Operiamo tra Pordenone, Mestre, Friuli-Venezia Giulia, Veneto e Nord Italia."
      },
      {
        "@type": "WebSite",
        "@id": "https://www.wearerighello.com/#website",
        "url": "https://www.wearerighello.com",
        "name": "Righello",
        "publisher": {
          "@id": "https://www.wearerighello.com/#organization"
        },
        "inLanguage": "it-IT"
      }
    ]
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
