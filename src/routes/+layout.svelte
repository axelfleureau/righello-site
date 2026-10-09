<script lang="ts">
  import '$styles/index.css';
  import type { ComponentType } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CustomCursor from '$lib/components/CustomCursor.svelte';
  import { theme } from '$lib/stores/theme';
  import { onMount, tick } from 'svelte';
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { pauseOffscreenAnimations } from '$lib/utils/pauseOffscreenAnimations';
  import { COMPANY, OG_IMAGE, SITE_URL, sameAs } from '$lib/data/site';
  import { DEFAULT_ATTR, overriddenKeys } from '$lib/seo/head';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  onMount(() => {
    theme.init();
    tick().then(syncOverrides);

    // Backup handler: suppress non-Error unhandled rejections from WebGL libs (OGL).
    // The primary handler is in app.html (inline script, runs before any module).
    function handleUnhandledRejection(event: PromiseRejectionEvent) {
      if (!(event.reason instanceof Error)) {
        event.preventDefault();
      }
    }
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Animazioni CSS infinite: in pausa quando l'elemento esce dallo schermo (vedi il file)
    const stopPausingOffscreen = pauseOffscreenAnimations();

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      stopPausingOffscreen();
    };
  });

  $: if (browser) {
    document.documentElement.setAttribute('data-theme', $theme);
  }

  // Quali valori di partenza la pagina corrente sostituisce con i propri (nel browser; sul
  // server li toglie `hooks.server.ts`). Si rilegge a ogni cambio di pagina.
  let overridden = new Set<string>();
  function syncOverrides() {
    overridden = overriddenKeys(document.head);
  }
  afterNavigate(async () => {
    await tick();
    syncOverrides();
  });

  // Il blocco "Sei ancora qui?" vive solo in home: si scarica solo li' (~40 kB di codice
  // che altrimenti viaggiavano con ogni pagina del sito).
  let AirplaneEasterEgg: ComponentType | null = null;
  $: isHome = $page.url.pathname === '/';
  $: if (browser && isHome && !AirplaneEasterEgg) {
    import('$lib/components/AirplaneEasterEgg.svelte').then((m) => (AirplaneEasterEgg = m.default));
  }

  const DEFAULT_DESCRIPTION = 'Studio digitale a Pordenone e Mestre per siti web, software, advertising, contenuti foto/video e agenti AI. Operiamo in Friuli-Venezia Giulia, Veneto e Nord Italia.';
  const THEME_COLOR = { dark: '#050505', light: '#ffffff' } as const;

  // Valori di partenza del head: una pagina che dichiara i propri nel suo blocco head vince
  // (vedi `$lib/seo/head`). L'indirizzo canonico e' senza barra finale, come nella mappa del
  // sito; le pagine di errore non ne hanno.
  $: canonicalUrl = `${SITE_URL}${$page.url.pathname === '/' ? '/' : $page.url.pathname.replace(/\/$/, '')}`;
  $: isError = $page.status >= 400;
  $: seoDefaults = [
    { key: 'description', tag: 'meta', attrs: { name: 'description', content: DEFAULT_DESCRIPTION } },
    { key: 'og:type', tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { key: 'og:locale', tag: 'meta', attrs: { property: 'og:locale', content: 'it_IT' } },
    { key: 'og:image', tag: 'meta', attrs: { property: 'og:image', content: OG_IMAGE } },
    { key: 'twitter:card', tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { key: 'twitter:image', tag: 'meta', attrs: { name: 'twitter:image', content: OG_IMAGE } },
    ...(isError
      ? []
      : [
          { key: 'canonical', tag: 'link', attrs: { rel: 'canonical', href: canonicalUrl } },
          { key: 'og:url', tag: 'meta', attrs: { property: 'og:url', content: canonicalUrl } },
        ]),
  ].filter((d) => !overridden.has(d.key));

  $: showChrome = !$page.url.pathname.startsWith('/busadelsauc');

  const address = {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.street,
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.region,
    postalCode: COMPANY.postalCode,
    addressCountry: 'IT',
  };

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/logo-full.png`,
        description: 'Studio digitale operativo tra Pordenone e Mestre, specializzato in siti web, software, advertising, contenuti foto/video e automazioni per aziende, hospitality, eventi e PMI in Friuli-Venezia Giulia e Veneto.',
        email: COMPANY.email,
        address,
        sameAs,
        vatID: `IT${COMPANY.vat}`,
        foundingDate: COMPANY.founded,
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 4 },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: COMPANY.legalName,
        url: SITE_URL,
        email: COMPANY.email,
        address,
        areaServed: ['Pordenone', 'Venezia', 'Mestre', 'Treviso', 'Udine', 'Friuli-Venezia Giulia', 'Veneto', 'Italia'],
        priceRange: '€€€',
        description: 'Studio digitale per siti web, software, advertising, contenuti foto/video e automazioni. Operiamo tra Pordenone, Mestre, Friuli-Venezia Giulia, Veneto e Nord Italia.',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY.name,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'it-IT',
      },
    ],
  });
</script>

<svelte:head>
  <meta name="theme-color" content={THEME_COLOR[$theme]} />
  <meta property="og:site_name" content={COMPANY.name} />
  {#each seoDefaults as d (d.key)}
    {#if d.tag === 'link'}
      <link {...d.attrs} {...{ [DEFAULT_ATTR]: '' }} />
    {:else}
      <meta {...d.attrs} {...{ [DEFAULT_ATTR]: '' }} />
    {/if}
  {/each}
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<div data-theme={$theme}>
  {#if browser}
    <CustomCursor />
  {/if}
  {#if showChrome}
    <a href="#main" class="skip-link">Vai al contenuto</a>
    <Header />
  {/if}
  <main id="main" tabindex="-1" class="min-h-screen" style="background-color: var(--bg-primary);">
    <slot />
  </main>
  {#if showChrome}
    <Footer />
  {/if}
  {#if isHome && AirplaneEasterEgg}
    <svelte:component this={AirplaneEasterEgg} />
  {/if}
</div>
