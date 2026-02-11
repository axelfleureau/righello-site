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
</script>

<svelte:head>
  <title>Progetti | Righello Growth Agency</title>
  <meta name="description" content="Portfolio dei nostri progetti di marketing digitale. Case study con risultati concreti e misurabili per i nostri clienti." />
  <meta property="og:title" content="Progetti | Righello Growth Agency" />
  <meta property="og:description" content="Portfolio dei nostri progetti di marketing digitale. Case study con risultati concreti e misurabili per i nostri clienti." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png" />
  <meta property="og:url" content="https://www.wearerighello.com/progetti" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Progetti | Righello Growth Agency" />
  <meta name="twitter:description" content="Portfolio dei nostri progetti di marketing digitale. Case study con risultati concreti e misurabili per i nostri clienti." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png" />
</svelte:head>

<section id="portfolio" class="pt-32 pb-20 md:pt-40 md:pb-24">
  <div class="section-container">
    <ScrollReveal>
      <div class="section-header">
        <p class="section-subtitle">I nostri progetti</p>
        <h1 class="section-title">Una selezione dei nostri <span class="gradient-text"><TechWord>lavori</TechWord></span></h1>
        <p class="text-lg md:text-xl text-[var(--text-secondary)] mb-12">
          I migliori progetti realizzati per i nostri clienti, dai contenuti al web design fino alle soluzioni software personalizzate.
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
            <a 
              href="/progetti/{project.slug}" 
              class="group block"
            >
              <div class="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                <img 
                  src={project.image} 
                  alt={project.title}
                  class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span class="bg-white text-black px-4 py-2 rounded-full font-medium text-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    Vedi progetto
                  </span>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mb-2">
                {#each project.categories as cat}
                  <span class="text-xs font-medium text-righello-pink">
                    {cat === 'content' ? 'Content' : cat === 'photo-video' ? 'Foto&Video' : cat === 'web' ? 'Web' : cat === 'branding' ? 'Branding' : cat === 'software' ? 'Software' : cat}
                  </span>
                {/each}
              </div>
              <h3 class="text-xl font-semibold group-hover:text-righello-pink transition-colors">{project.title}</h3>
              <p class="text-[var(--text-secondary)] mt-2">{project.description}</p>
            </a>
          </TiltCard>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />
