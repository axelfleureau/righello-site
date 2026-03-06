<script lang="ts">
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import RippleGrid from '$lib/components/RippleGrid.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: service = data.service;
</script>

<svelte:head>
  <title>{service.seo.title}</title>
  <meta name="description" content={service.seo.description} />
  <meta property="og:title" content={service.seo.title} />
  <meta property="og:description" content={service.seo.description} />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/servizi/{service.slug}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={service.seo.title} />
  <meta name="twitter:description" content={service.seo.description} />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=2" />

  {@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "${service.category}",
      "description": "${service.seo.description}",
      "provider": {
        "@type": "Organization",
        "name": "Righello",
        "email": "hello@wearerighello.com",
        "url": "https://www.wearerighello.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Pio X 21",
          "addressLocality": "Mestre",
          "addressRegion": "Venezia",
          "addressCountry": "IT"
        }
      },
      "areaServed": "IT",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "${service.category}",
        "itemListElement": [
          ${service.services.map(s => `{"@type": "Offer", "itemOffered": {"@type": "Service", "name": "${s.title}"}}`).join(',\n          ')}
        ]
      }
    }
  </script>`}
</svelte:head>

<section class="detail-hero" style="--dept-color: {service.color}">
  <div class="ripple-bg">
    <RippleGrid
      mouseInteraction={true}
      gridColor={service.color}
      opacity={0.2}
      rippleIntensity={0.04}
      gridSize={12}
      gridThickness={18}
      fadeDistance={1.8}
      vignetteStrength={2.5}
    />
  </div>
  <div class="hero-content">
    <RevealOnScroll animation="fly-up">
      <p class="hero-eyebrow" style="color: {service.color}">{service.category}</p>
    </RevealOnScroll>
    <RevealOnScroll animation="fly-up" delay={100}>
      <h1 class="hero-title">
        {service.titleLine1}<br/>
        <span class="gradient-text">{service.titleHighlight}</span>
      </h1>
    </RevealOnScroll>
    <RevealOnScroll animation="fly-up" delay={200}>
      <p class="hero-subtitle">{service.subtitle}</p>
    </RevealOnScroll>
    <RevealOnScroll animation="fly-up" delay={300}>
      <div class="hero-cta">
        <MagneticButton href={service.ctaHref} variant="primary">
          {service.ctaText}
          <svg class="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="services-section" style="--dept-color: {service.color}">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">Cosa offriamo</p>
        <h2 class="section-title">I Nostri Servizi</h2>
      </div>
    </RevealOnScroll>

    <div class="services-grid">
      {#each service.services as svc, i}
        <RevealOnScroll animation="fly-up" stagger={80} index={i}>
          <div class="service-card">
            <div class="service-icon-wrap" style="background: {service.color}20; color: {service.color}">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round" d={svc.icon} />
              </svg>
            </div>
            <h3 class="service-card-title">{svc.title}</h3>
            <p class="service-card-desc">{svc.description}</p>
          </div>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="workflow-section" style="--dept-color: {service.color}">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">Il nostro processo</p>
        <h2 class="section-title">Il Nostro Metodo</h2>
      </div>
    </RevealOnScroll>

    <div class="workflow-grid">
      {#each service.workflow as step, i}
        <RevealOnScroll animation="fly-up" stagger={100} index={i}>
          <div class="workflow-step">
            <span class="step-number">{step.num}</span>
            <div class="step-content">
              <h3 class="step-title">{step.title}</h3>
              <p class="step-desc">{step.description}</p>
            </div>
          </div>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="final-cta-section">
  <div class="section-container">
    <RevealOnScroll animation="scale">
      <div class="final-cta">
        <h2 class="cta-title">Pronto a Iniziare?</h2>
        <p class="cta-subtitle">
          Raccontaci il tuo progetto e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi.
        </p>
        <div class="cta-buttons">
          <MagneticButton href="/contatti" variant="primary">
            Contattaci
            <svg class="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
          <MagneticButton href="/servizi" variant="secondary">
            Torna ai Servizi
          </MagneticButton>
        </div>
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .detail-hero {
    position: relative;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 8rem 1.5rem 4rem;
  }

  .ripple-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: auto;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-eyebrow {
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 0.75rem;
  }

  .hero-title {
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
  }

  .gradient-text {
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 650px;
    margin: 0 auto 2.5rem;
  }

  .hero-cta {
    display: flex;
    justify-content: center;
  }

  .btn-arrow {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.5rem;
    display: inline-block;
  }

  .section-padding {
    padding: var(--section-padding-sm) 0;
  }

  @media (min-width: 768px) {
    .section-padding {
      padding: var(--section-padding-md) 0;
    }
  }

  @media (min-width: 1024px) {
    .section-padding {
      padding: var(--section-padding-lg) 0;
    }
  }

  .services-section {
    padding: var(--section-padding-sm) 1.5rem;
  }

  @media (min-width: 768px) {
    .services-section {
      padding: var(--section-padding-md) 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .services-section {
      padding: var(--section-padding-lg) 1.5rem;
    }
  }

  .section-container {
    max-width: var(--container-max, 1280px);
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-subtitle {
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #D6487E;
    margin-bottom: 0.75rem;
  }

  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 640px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .service-card {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    transition: all 0.3s ease;
  }

  :global([data-theme="light"]) .service-card {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.08);
  }

  .service-card:hover {
    border-color: var(--dept-color, #D6487E);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .service-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  .service-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
  }

  .service-card-desc {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .workflow-section {
    padding: var(--section-padding-sm) 1.5rem;
    background: var(--bg-secondary);
  }

  @media (min-width: 768px) {
    .workflow-section {
      padding: var(--section-padding-md) 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .workflow-section {
      padding: var(--section-padding-lg) 1.5rem;
    }
  }

  .workflow-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .workflow-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .workflow-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
  }

  .workflow-step {
    position: relative;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    transition: all 0.3s ease;
  }

  :global([data-theme="light"]) .workflow-step {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.08);
  }

  .workflow-step:hover {
    border-color: var(--dept-color, rgba(214, 72, 126, 0.3));
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .step-number {
    display: block;
    font-size: 3rem;
    font-weight: 900;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.3;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .step-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .step-desc {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .final-cta-section {
    padding: var(--section-padding-sm) 1.5rem;
  }

  @media (min-width: 768px) {
    .final-cta-section {
      padding: var(--section-padding-md) 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .final-cta-section {
      padding: var(--section-padding-lg) 1.5rem;
    }
  }

  .final-cta {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.15), rgba(6, 182, 212, 0.1));
    border-radius: 2rem;
    border: 1px solid rgba(214, 72, 126, 0.2);
  }

  .cta-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .cta-subtitle {
    font-size: 1.0625rem;
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto 2rem;
    line-height: 1.7;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
