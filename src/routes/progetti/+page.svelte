<script lang="ts">
  import { projects, categories } from '$lib/data/projects';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import TiltCard from '$lib/components/TiltCard.svelte';
  import Highlight from '$lib/components/Highlight.svelte';
  import TechWord from '$lib/components/TechWord.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  
  let selectedCategory = 'all';
  
  $: filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.categories.includes(selectedCategory));

  function getThumbnailUrl(videoSrc: string): string {
    return `/api/video-thumbnail?url=${encodeURIComponent(videoSrc)}`;
  }

  function getCategoryLabel(cat: string): string {
    const found = categories.find(c => c.id === cat);
    return found ? found.label : cat;
  }
</script>

<svelte:head>
  <title>Progetti | Righello – Portfolio Marketing, Web & Software</title>
  <meta name="description" content="Portfolio di progetti di marketing digitale, sviluppo web e software. Case study con risultati concreti: siti, app, campagne adv e automazioni." />
  <meta property="og:title" content="Progetti | Righello – Portfolio Marketing, Web & Software" />
  <meta property="og:description" content="Portfolio di progetti di marketing digitale, sviluppo web e software. Case study con risultati concreti: siti, app, campagne adv e automazioni." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png" />
  <meta property="og:url" content="https://www.wearerighello.com/progetti" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Progetti | Righello – Portfolio Marketing, Web & Software" />
  <meta name="twitter:description" content="Portfolio di progetti di marketing digitale, sviluppo web e software. Case study con risultati concreti: siti, app, campagne adv e automazioni." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png" />
</svelte:head>

<section id="portfolio" class="pt-32 pb-20 md:pt-40 md:pb-24">
  <div class="section-container">
    <ScrollReveal>
      <div class="section-header">
        <p class="section-subtitle">I nostri progetti</p>
        <h1 class="section-title">Una selezione dei nostri <span class="gradient-text"><TechWord>lavori</TechWord></span></h1>
        <p class="text-lg md:text-xl text-[var(--text-secondary)] mb-12">
          Progetti di marketing digitale, sviluppo web e automazione realizzati per i nostri clienti nel Nord Italia e all'estero.
        </p>
      </div>
    </ScrollReveal>
    
    <ScrollReveal animation="fade-up" delay={100}>
      <div class="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
        {#each categories as category}
          <button
            class="px-4 py-2 md:px-5 md:py-2 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 {selectedCategory === category.id ? 'bg-righello-pink text-white shadow-lg shadow-righello-pink/30' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'}"
            style="border: 1px solid var(--border-color);"
            on:click={() => selectedCategory = category.id}
          >
            {category.label}
          </button>
        {/each}
      </div>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {#each filteredProjects as project, i (project.id)}
        <ScrollReveal animation="fade-up" delay={i * 80}>
          <TiltCard>
            <div class="project-card group">
              <div class="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                {#if project.videoUrl}
                  <img 
                    src={getThumbnailUrl(project.videoUrl)} 
                    alt={project.title}
                    class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    on:error={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.add('project-fallback--visible'); }}
                  />
                  <div class="project-fallback">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M8 5v14l11-7z"/></svg>
                    <span class="project-fallback__name">{project.title}</span>
                  </div>
                {:else if project.image}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                {:else}
                  <div class="project-fallback project-fallback--visible">
                    <span class="project-fallback__name">{project.title}</span>
                  </div>
                {/if}
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              </div>
              <div class="flex flex-wrap gap-2 mb-2">
                {#each project.categories as cat}
                  <span class="text-xs font-medium text-righello-pink">
                    {getCategoryLabel(cat)}
                  </span>
                {/each}
              </div>
              <h3 class="text-xl font-semibold group-hover:text-righello-pink transition-colors">{project.title}</h3>
              <p class="text-[var(--text-secondary)] mt-2">{project.description}</p>
            </div>
          </TiltCard>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<style>
  .project-card {
    cursor: default;
  }

  .project-fallback {
    display: none;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
  }

  :global(.project-fallback--visible) {
    display: flex !important;
  }

  .project-fallback__name {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    padding: 0 1rem;
  }
</style>
