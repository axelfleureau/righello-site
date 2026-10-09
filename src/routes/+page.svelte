<script lang="ts">
  import '$lib/components/progetti/tokens.css';
  import '$lib/components/progetti/landing/landing.css';
  import { clients } from '$lib/data/projects';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import LogoCarousel from '$lib/components/LogoCarousel.svelte';
  import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
  import AnimatedVideoTestimonials from '$lib/components/AnimatedVideoTestimonials.svelte';
  import StickyScrollReveal from '$lib/components/StickyScrollReveal.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import SocialReelShowcase from '$lib/components/SocialReelShowcase.svelte';
  import HorizontalVideoShowcase from '$lib/components/HorizontalVideoShowcase.svelte';
  import SectionNav from '$lib/components/progetti/landing/SectionNav.svelte';
  import ProgettiCta from '$lib/components/progetti/ProgettiCta.svelte';
  import HomeHero from '$lib/components/home/HomeHero.svelte';
  import HomeProducts from '$lib/components/home/HomeProducts.svelte';
  import HomeServices from '$lib/components/home/HomeServices.svelte';
  import HomeSites from '$lib/components/home/HomeSites.svelte';
  import { env } from '$env/dynamic/public';
  import type { PageData } from './$types';

  export let data: PageData;
  export let form: Record<string, unknown> | null = null;

  const schedulingUrl = env.PUBLIC_SCHEDULING_URL || '/contatti';

  // Le sezioni dopo l'apertura, nello stesso ordine e con la stessa mini-navigazione delle schede prodotto.
  const sections = [
    { id: 'prodotti', label: 'Prodotti' },
    { id: 'servizi', label: 'Cosa facciamo' },
    { id: 'lavori', label: 'Lavori' },
    { id: 'clienti', label: 'Clienti' },
    { id: 'metodo', label: 'Metodo' },
    { id: 'contatti', label: 'Contatti' },
  ];

  // Le tre strade dalla prima schermata: una per ogni cosa che Righello fa.
  const paths = [
    { n: '01', title: 'Prodotti nostri', text: 'App e gestionali che costruiamo noi.', href: '#prodotti' },
    { n: '02', title: 'Siti e software su misura', text: 'Per le aziende del territorio.', href: '#servizi' },
    { n: '03', title: 'Marketing e video', text: 'Social, campagne, foto e video.', href: '#video' },
  ];

  // DA CONFERMARE (Axel): numeri e riconoscimenti non verificabili dal codice. Lasciati come erano.
  const stats = [
    { value: 470, suffix: '+', label: 'Progetti completati' },
    { value: 25, suffix: 'M+', label: 'Views generate' },
    { value: 98, suffix: '%', label: 'Clienti soddisfatti' },
    { value: 8, suffix: '.5x', label: 'ROAS medio ads' },
  ];

  const credibilityBadges = [
    { icon: 'meta', label: 'Meta Partner' },
    { icon: 'google', label: 'Google Partner' },
    { icon: 'star', label: '5.0 Rating' },
  ];

  // Poster dell'apertura, caricato in anticipo: preferisce la miniatura Cloudinary (vale anche nei
  // browser interni di Instagram, Facebook e TikTok, che bloccano img.youtube.com).
  const heroYoutubeId = data.heroVideo?.youtubeId ?? 'Rj5N4BMF-Vw';
  const heroPosterUrl = data.heroVideo?.thumbnailUrl ?? `https://img.youtube.com/vi/${heroYoutubeId}/hqdefault.jpg`;

  const processSteps = [
    {
      title: 'Audit e benchmark',
      description: 'Mappiamo il tuo business, i canali attivi, i competitor di riferimento e i numeri storici. Da qui nascono gli obiettivi misurabili del progetto.',
      icon: 'audit',
    },
    {
      title: 'Strategia e roadmap',
      description: 'Roadmap operativa a 30, 60 e 90 giorni con priorità, canali, formati e budget. Ogni mese ha una soglia di uscita e indicatori di passaggio.',
      icon: 'roadmap',
    },
    {
      title: 'Esecuzione e test',
      description: 'Produzione di asset, campagne e automazioni in cicli brevi. A/B test settimanali su copy, creative e targeting per convergere sui formati che convertono.',
      icon: 'execution',
    },
    {
      title: 'Reportistica e crescita',
      description: 'Dashboard live con i KPI concordati, review mensili e call strategiche. Quando un canale è saturo, ridistribuiamo il budget verso il successivo.',
      icon: 'growth',
    },
  ];
</script>
<svelte:head>
  <title>Righello | Agenzia Marketing a Pordenone e Mestre</title>
  <meta name="description" content="Agenzia marketing a Pordenone e Mestre: social media, advertising, siti web, software e automazioni AI per aziende in Friuli-Venezia Giulia e Veneto." />
  <link rel="canonical" href="https://www.wearerighello.com/" />
  <meta property="og:title" content="Righello | Agenzia Marketing a Pordenone e Mestre" />
  <meta property="og:description" content="Agenzia marketing a Pordenone e Mestre: social media, advertising, siti web, software e automazioni AI per aziende in Friuli-Venezia Giulia e Veneto." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Righello | Agenzia Marketing a Pordenone e Mestre" />
  <meta name="twitter:description" content="Agenzia marketing a Pordenone e Mestre: social media, advertising, siti web, software e automazioni AI per aziende in Friuli-Venezia Giulia e Veneto." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=2" />
  <!-- Preload hero poster: shaves ~500ms-1.5s off the cold-cache reveal of the
       iPhone mockup screen. heroPosterUrl prefers the Cloudinary thumbnail (universal)
       over img.youtube.com (blocked in Instagram/Facebook/TikTok in-app browsers). -->
  <link rel="preload" as="image" href={heroPosterUrl} fetchpriority="high" />
</svelte:head>

<HomeHero
  {credibilityBadges}
  {paths}
  heroVideoCloudinaryUrl={data.heroVideo?.cloudinaryUrl}
  heroVideoYoutubeId={heroYoutubeId}
  heroVideoThumbnailUrl={data.heroVideo?.thumbnailUrl}
/>

<!-- Tutto cio' che segue sta in un contenitore solo, cosi' la mini-navigazione resta attaccata finche' ci sono sezioni.
     "lp" porta con se' i colori della navigazione; "home-scope" lo rende trasparente al layout. -->
<div class="lp home-scope">
  <SectionNav items={sections} />

  <HomeProducts />

  <HomeServices />

  <HomeSites />

  <div id="video" class="video-band">
    <HorizontalVideoShowcase
      title="Creiamo esperienze memorabili"
      subtitle="Video Production"
      description="Video istituzionali, contenuti dimostrativi e casi studio per raccontare il tuo brand"
      items={data.showcaseItems}
    />
    <SocialReelShowcase externalItems={data.reelItems} />
  </div>

  <section id="clienti" class="clients section-padding">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
        <div class="section-header">
          <p class="section-subtitle">Chi lavora con noi</p>
          <h2 class="section-title">Chi si fida di <span class="gradient-text">noi</span></h2>
        </div>
      </RevealOnScroll>
    </div>

    <LogoCarousel items={clients} speed={60} pauseOnHover={true} scaleOnHover={true} fadeEdges={false} gap={64} itemHeight={48} />

    <div class="clients__voices">
      <AnimatedVideoTestimonials testimonials={data.testimonialItems} />
    </div>
  </section>

  <section id="risultati" class="results section-padding">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
        <div class="section-header">
          <p class="section-subtitle">Risultati reali</p>
          <h2 class="section-title max-w-4xl mx-auto">Numeri, non <span class="gradient-text">promesse</span></h2>
        </div>
      </RevealOnScroll>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8" style="grid-auto-rows: 1fr;">
        {#each stats as stat, i}
          <RevealOnScroll animation="scale" delay={0} stagger={100} index={i}>
            <div class="glass-card rounded-2xl p-6 md:p-8 text-center hover-lift h-full flex flex-col justify-center">
              <div class="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter target={stat.value} duration={2000} />{stat.suffix}
              </div>
              <p class="text-sm md:text-base text-[var(--text-secondary)]">{stat.label}</p>
            </div>
          </RevealOnScroll>
        {/each}
      </div>
    </div>
  </section>

  <section id="metodo" class="method">
    <StickyScrollReveal title="Il nostro metodo" subtitle="Come lavoriamo" content={processSteps} />
  </section>

  <div id="domande" class="faq-band">
    <FAQ />
  </div>

</div>

<div id="contatti" class="closing">
  <ProgettiCta {schedulingUrl} kicker="Contatti" />
</div>

<style>
  /* il contenitore serve solo a portare i colori della navigazione: non deve cambiare l'impaginazione */
  :global(.home-scope) {
    display: contents;
  }

  .video-band,
  .results,
  .faq-band {
    background: var(--bg-secondary);
  }

  .video-band,
  .clients,
  .results,
  .method,
  .faq-band,
  .closing {
    scroll-margin-top: calc(var(--lp-nav-top, 5.4rem) + 3.4rem);
  }

  .clients {
    overflow: hidden;
  }

  .clients__voices {
    margin-top: clamp(2rem, 5vw, 3.5rem);
  }
</style>
