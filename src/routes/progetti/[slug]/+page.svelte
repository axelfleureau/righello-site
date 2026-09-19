<script lang="ts">
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import { categoryColors, categoryLabels, caseStudyHref } from '$lib/data/case-studies';
  import type { PageData } from './$types';

  export let data: PageData;

  $: study = data.study;
  $: related = data.related;
  $: color = categoryColors[study.category];
  $: canonical = `https://www.wearerighello.com/progetti/${study.id}`;
  $: seoTitle = `${study.name} — Case Study | Righello`;

  $: breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Progetti', item: 'https://www.wearerighello.com/progetti' },
      { '@type': 'ListItem', position: 2, name: study.name, item: canonical },
    ],
  }).replace(/</g, '\\u003c');
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={study.headline} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={study.headline} />
  <meta property="og:image" content={study.image} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seoTitle} />
  <meta name="twitter:description" content={study.headline} />
  <meta name="twitter:image" content={study.image} />
  {@html `<script type="application/ld+json">${breadcrumbSchema}<\/script>`}
</svelte:head>

<section class="case-hero" style="--dept-color: {color}">
  <div class="section-container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/progetti">Progetti</a>
      <span aria-hidden="true">/</span>
      <span>{study.name}</span>
    </nav>

    <RevealOnScroll animation="fly-up">
      <p class="hero-eyebrow" style="color: {color}">{study.sector} · {categoryLabels[study.category]}</p>
    </RevealOnScroll>
    <RevealOnScroll animation="fly-up" delay={80}>
      <h1 class="hero-title">{study.headline}</h1>
    </RevealOnScroll>
    <RevealOnScroll animation="fly-up" delay={160}>
      <p class="hero-text">{study.text}</p>
    </RevealOnScroll>
    <RevealOnScroll animation="fly-up" delay={220}>
      <div class="hero-cta">
        {#if study.href}
          <MagneticButton href={study.href} variant="primary" target="_blank" rel="noreferrer">
            Vedi il progetto live
            <svg class="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H9M17 7v8" />
            </svg>
          </MagneticButton>
          <MagneticButton href="/contatti" variant="secondary">Parliamo del tuo progetto</MagneticButton>
        {:else}
          <MagneticButton href="/contatti" variant="primary">
            Richiedi un progetto simile
            <svg class="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        {/if}
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="case-visual-section">
  <div class="section-container">
    <RevealOnScroll animation="scale">
      <figure class="case-visual">
        <img
          src={study.image}
          alt={`${study.name} — ${study.headline}`}
          style={`object-position: ${study.imagePosition || 'center center'};`}
          loading="eager"
          decoding="async"
        />
        {#if study.logo}
          <span class="case-visual__badge">
            <img src={study.logo} alt="" loading="lazy" decoding="async" />
          </span>
        {/if}
      </figure>
    </RevealOnScroll>
  </div>
</section>

<section class="section-padding focus-section" style="--dept-color: {color}">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">Cosa abbiamo seguito</p>
        <h2 class="section-title">Il focus del progetto {study.name}.</h2>
      </div>
    </RevealOnScroll>
    <div class="focus-grid">
      {#each study.focus as item, i}
        <RevealOnScroll animation="fly-up" stagger={70} index={i}>
          <span class="focus-chip">{item}</span>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

{#if related.length > 0}
  <section class="section-padding related-section">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
        <div class="section-header">
          <p class="section-subtitle">Altri progetti</p>
          <h2 class="section-title">Continua a esplorare i case study Righello.</h2>
        </div>
      </RevealOnScroll>
      <div class="related-grid">
        {#each related as item, i}
          <RevealOnScroll animation="fly-up" stagger={80} index={i}>
            <a class="related-card" href={caseStudyHref(item)}>
              <div class="related-media">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={`object-position: ${item.imagePosition || 'center center'};`}
                  aria-hidden="true"
                />
              </div>
              <div class="related-content">
                <p style="color: {categoryColors[item.category]}">{item.sector}</p>
                <h3>{item.name}</h3>
                <span>{item.headline}</span>
              </div>
            </a>
          </RevealOnScroll>
        {/each}
      </div>
    </div>
  </section>
{/if}

<section class="final-cta-section">
  <div class="section-container">
    <RevealOnScroll animation="scale">
      <div class="final-cta">
        <h2 class="cta-title">Pronto a Iniziare?</h2>
        <p class="cta-subtitle">
          Raccontaci settore, obiettivo e materiali disponibili: ti diciamo cosa serve davvero per il tuo progetto.
        </p>
        <div class="cta-buttons">
          <MagneticButton href="/contatti" variant="primary">
            Contattaci
            <svg class="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
          <MagneticButton href="/progetti" variant="secondary">Torna ai Progetti</MagneticButton>
        </div>
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .section-container {
    max-width: var(--container-max, 1280px);
    margin: 0 auto;
    padding: 0 1.5rem;
    min-width: 0;
  }

  .case-hero {
    position: relative;
    padding: clamp(7.5rem, 13vw, 10rem) 0 3rem;
    background:
      radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--dept-color) 28%, transparent), transparent 29rem),
      var(--bg-primary);
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.75rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .breadcrumb a {
    color: var(--text-secondary);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .breadcrumb a:hover {
    color: var(--text-primary);
  }

  .breadcrumb span:last-child {
    color: var(--text-primary);
    font-weight: 650;
  }

  .hero-eyebrow {
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 0.9rem;
  }

  .hero-title {
    max-width: 46rem;
    margin: 0 0 1.25rem;
    color: var(--text-primary);
    font-size: clamp(2.1rem, 5.2vw, 3.6rem);
    font-weight: 850;
    line-height: 1.05;
  }

  .hero-text {
    max-width: 42rem;
    margin: 0 0 2rem;
    color: var(--text-secondary);
    font-size: clamp(1.02rem, 1.7vw, 1.2rem);
    line-height: 1.65;
  }

  .hero-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .btn-arrow {
    width: 1.1rem;
    height: 1.1rem;
    margin-left: 0.5rem;
    display: inline-block;
  }

  .case-visual-section {
    padding: 0 0 clamp(2rem, 5vw, 3.5rem);
    background: var(--bg-primary);
  }

  .case-visual {
    position: relative;
    margin: 0;
    border-radius: 1.5rem;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background: #101113;
  }

  .case-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .case-visual__badge {
    position: absolute;
    left: 1.25rem;
    bottom: 1.25rem;
    width: 3.25rem;
    height: 3.25rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: rgba(15, 15, 17, 0.72);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .case-visual__badge img {
    width: 60%;
    height: 60%;
    object-fit: contain;
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

  .section-header {
    margin-bottom: 2rem;
    max-width: 44rem;
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
    font-size: clamp(1.6rem, 3.6vw, 2.25rem);
    font-weight: 800;
    color: var(--text-primary);
  }

  .focus-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .focus-chip {
    display: inline-flex;
    align-items: center;
    border: 1px solid color-mix(in srgb, var(--dept-color) 35%, transparent);
    background: color-mix(in srgb, var(--dept-color) 12%, transparent);
    color: var(--text-primary);
    font-weight: 650;
    font-size: 0.95rem;
    padding: 0.6rem 1.1rem;
    border-radius: 999px;
  }

  .related-section {
    background: var(--bg-secondary);
  }

  .related-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    min-width: 0;
  }

  @media (min-width: 700px) {
    .related-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .related-card {
    display: block;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 1.25rem;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.03);
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease, border-color 0.3s ease;
  }

  :global([data-theme="light"]) .related-card {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.08);
  }

  .related-media {
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }

  .related-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .related-content {
    padding: 1.1rem 1.25rem 1.4rem;
  }

  .related-content p {
    margin: 0 0 0.35rem;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .related-content h3 {
    margin: 0 0 0.5rem;
    color: var(--text-primary);
    font-size: 1.15rem;
    font-weight: 800;
  }

  .related-content span {
    display: block;
    color: var(--text-secondary);
    font-size: 0.92rem;
    line-height: 1.5;
  }

  @media (hover: hover) and (pointer: fine) {
    .related-card:hover {
      transform: translateY(-4px);
      border-color: rgba(214, 72, 126, 0.4);
    }

    .related-card:hover img {
      transform: scale(1.05);
    }
  }

  .final-cta-section {
    padding: var(--section-padding-sm) 0;
  }

  @media (min-width: 768px) {
    .final-cta-section {
      padding: var(--section-padding-md) 0;
    }
  }

  @media (min-width: 1024px) {
    .final-cta-section {
      padding: var(--section-padding-lg) 0;
    }
  }

  .final-cta {
    text-align: center;
    padding: clamp(2.5rem, 8vw, 4rem) clamp(1.25rem, 5vw, 2rem);
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.15), rgba(6, 182, 212, 0.1));
    border-radius: 2rem;
    border: 1px solid rgba(214, 72, 126, 0.2);
    min-width: 0;
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

  @media (max-width: 767px) {
    .final-cta {
      border-radius: 1.5rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .cta-buttons :global(.magnetic-button) {
      width: 100%;
      min-height: 56px;
    }
  }
</style>
