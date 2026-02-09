<script lang="ts">
  import { page } from '$app/stores';
  import { projects } from '$lib/data/projects';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  
  $: project = projects.find(p => p.slug === $page.params.slug);
  $: relatedProjects = projects.filter(p => p.slug !== $page.params.slug).slice(0, 3);

  const categoryLabels: Record<string, string> = {
    content: 'Content Production',
    'photo-video': 'Produzione Foto&Video',
    web: 'Sviluppo Web',
    branding: 'Branding',
    software: 'Sviluppo Software',
  };

  const narrativeCards = [
    {
      number: '01',
      title: 'La Sfida',
      description: 'Ogni progetto inizia con una sfida. Abbiamo analizzato il contesto, il mercato e gli obiettivi per definire una strategia personalizzata.',
    },
    {
      number: '02',
      title: 'La Soluzione',
      description: 'Abbiamo sviluppato un approccio integrato, combinando creatività e dati per costruire un ecosistema di comunicazione efficace.',
    },
    {
      number: '03',
      title: 'I Risultati',
      description: 'Il progetto ha generato risultati concreti e misurabili, superando le aspettative iniziali e creando le basi per una crescita sostenibile.',
    },
  ];
</script>

<svelte:head>
  {#if project}
    <title>{project.title} - Righello</title>
    <meta name="description" content={project.description} />
    <meta property="og:title" content={`${project.title} - Righello`} />
    <meta property="og:description" content={project.description} />
    <meta property="og:image" content={project.image} />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
  {:else}
    <title>Progetto non trovato - Righello</title>
  {/if}
</svelte:head>

{#if project}
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="section-container">
      <RevealOnScroll animation="fade" duration={400}>
        <a href="/progetti" class="back-link">
          <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Torna ai progetti
        </a>
      </RevealOnScroll>

      <RevealOnScroll animation="fly-up" delay={100}>
        <div class="category-chips">
          {#each project.categories as cat}
            <span class="category-chip">
              {categoryLabels[cat] || cat}
            </span>
          {/each}
        </div>
      </RevealOnScroll>

      <RevealOnScroll animation="fly-up" delay={200}>
        <h1 class="heading-xl hero-title">{project.title}</h1>
      </RevealOnScroll>

      <RevealOnScroll animation="fly-up" delay={300}>
        <p class="hero-description">{project.description}</p>
      </RevealOnScroll>

      <RevealOnScroll animation="scale" delay={400}>
        <div class="hero-image-wrapper">
          <div class="hero-image-parallax">
            <img
              src={project.image}
              alt={project.title}
              class="hero-image"
              loading="lazy"
            />
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

  <!-- Il Progetto - Narrative Section -->
  <section class="narrative-section">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
        <h2 class="heading-lg narrative-heading">Il Progetto</h2>
      </RevealOnScroll>

      <div class="narrative-grid">
        {#each narrativeCards as card, i}
          <RevealOnScroll animation="fly-up" delay={i * 150} index={i}>
            <div class="narrative-card">
              <span class="narrative-number">{card.number}</span>
              <h3 class="narrative-card-title">{card.title}</h3>
              <p class="narrative-card-description">{card.description}</p>
            </div>
          </RevealOnScroll>
        {/each}
      </div>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="section-container">
      <RevealOnScroll animation="scale">
        <div class="cta-card">
          <h2 class="cta-title">Hai un progetto simile?</h2>
          <p class="cta-description">Raccontaci la tua idea. Insieme possiamo trasformarla in qualcosa di straordinario.</p>
          <MagneticButton href="/contatti" variant="primary">
            Parliamone
            <svg class="cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        </div>
      </RevealOnScroll>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

  <!-- Related Projects -->
  <section class="related-section">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
        <h2 class="heading-lg related-heading">Altri progetti</h2>
      </RevealOnScroll>

      <div class="related-grid">
        {#each relatedProjects as p, i}
          <RevealOnScroll animation="fly-up" delay={i * 120} index={i}>
            <a href="/progetti/{p.slug}" class="related-card">
              <div class="related-image-wrapper">
                <img
                  src={p.image}
                  alt={p.title}
                  class="related-image"
                  loading="lazy"
                />
              </div>
              <div class="related-meta">
                <div class="related-categories">
                  {#each p.categories.slice(0, 2) as cat}
                    <span class="related-category">{categoryLabels[cat] || cat}</span>
                  {/each}
                </div>
                <h3 class="related-title">{p.title}</h3>
              </div>
            </a>
          </RevealOnScroll>
        {/each}
      </div>
    </div>
  </section>
{:else}
  <section class="not-found-section">
    <div class="section-container" style="text-align: center;">
      <h1 class="heading-lg" style="margin-bottom: 1.5rem;">Progetto non trovato</h1>
      <p class="not-found-text">Il progetto che stai cercando non esiste.</p>
      <MagneticButton href="/progetti" variant="primary">Torna ai progetti</MagneticButton>
    </div>
  </section>
{/if}

<style>
  /* Hero Section */
  .hero-section {
    padding-top: 8rem;
    padding-bottom: 4rem;
    background: var(--bg-primary);
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    color: var(--text-secondary);
    text-decoration: none;
    margin-bottom: 2.5rem;
    transition: color 0.3s, transform 0.3s;
    min-height: 44px;
  }

  .back-link:hover {
    color: var(--righello-pink, #e91e63);
    transform: translateX(-4px);
  }

  .back-icon {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s;
  }

  .back-link:hover .back-icon {
    transform: translateX(-3px);
  }

  .category-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .category-chip {
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.375rem 1rem;
    background: rgba(233, 30, 99, 0.1);
    color: var(--righello-pink, #e91e63);
    border-radius: 9999px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  .hero-title {
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .hero-description {
    font-size: 1.25rem;
    line-height: 1.75;
    color: var(--text-secondary);
    max-width: 48rem;
    margin-bottom: 3rem;
  }

  .hero-image-wrapper {
    border-radius: 1.5rem;
    overflow: hidden;
    position: relative;
  }

  .hero-image-parallax {
    overflow: hidden;
    border-radius: 1.5rem;
  }

  .hero-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
    transform: scale(1.05);
    transition: transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hero-image-wrapper:hover .hero-image {
    transform: scale(1);
  }

  /* Narrative Section */
  .narrative-section {
    padding: 5rem 0;
    background: var(--bg-secondary);
  }

  .narrative-heading {
    color: var(--text-primary);
    margin-bottom: 3.5rem;
  }

  .narrative-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .narrative-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  .narrative-card {
    position: relative;
    padding: 2.5rem 2rem;
    border-radius: 1.25rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    transition: border-color 0.4s, box-shadow 0.4s, transform 0.3s;
    height: 100%;
  }

  .narrative-card:hover {
    border-color: var(--righello-pink, #e91e63);
    box-shadow: 0 0 0 1px var(--righello-pink, #e91e63), 0 8px 32px rgba(233, 30, 99, 0.08);
    transform: translateY(-4px);
  }

  .narrative-number {
    display: inline-block;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--righello-pink, #e91e63);
    letter-spacing: 0.05em;
    margin-bottom: 1.25rem;
    opacity: 0.7;
  }

  .narrative-card-title {
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .narrative-card-description {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-secondary);
  }

  /* CTA Section */
  .cta-section {
    padding: 5rem 0;
    background: var(--bg-primary);
  }

  .cta-card {
    text-align: center;
    padding: 4rem 2rem;
    border-radius: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .cta-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .cta-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    max-width: 32rem;
    margin: 0 auto 2rem;
    line-height: 1.7;
  }

  .cta-arrow {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.5rem;
    transition: transform 0.3s;
  }

  :global(.magnetic-button:hover) .cta-arrow {
    transform: translateX(4px);
  }

  /* Related Projects */
  .related-section {
    padding: 5rem 0 6rem;
    background: var(--bg-secondary);
  }

  .related-heading {
    color: var(--text-primary);
    margin-bottom: 3rem;
  }

  .related-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .related-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .related-card {
    display: block;
    text-decoration: none;
    min-height: 44px;
  }

  .related-image-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    aspect-ratio: 4 / 3;
    margin-bottom: 1rem;
  }

  .related-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .related-card:hover .related-image {
    transform: scale(1.08);
  }

  .related-meta {
    padding: 0 0.25rem;
  }

  .related-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .related-category {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    opacity: 0.8;
  }

  .related-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    transition: color 0.3s;
    line-height: 1.4;
  }

  .related-card:hover .related-title {
    color: var(--righello-pink, #e91e63);
  }

  /* 404 Not Found */
  .not-found-section {
    padding: 10rem 0;
    background: var(--bg-primary);
  }

  .not-found-text {
    font-size: 1.125rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  @media (max-width: 767px) {
    .hero-section {
      padding-top: 6rem;
      padding-bottom: 2rem;
    }

    .hero-description {
      font-size: 1.125rem;
    }

    .cta-card {
      padding: 3rem 1.5rem;
    }

    .cta-title {
      font-size: 1.625rem;
    }

    .narrative-section,
    .cta-section,
    .related-section {
      padding: 3rem 0;
    }
  }
</style>
