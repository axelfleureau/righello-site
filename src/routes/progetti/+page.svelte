<script lang="ts">
  import { projects, categories } from '$lib/data/projects';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import TiltCard from '$lib/components/TiltCard.svelte';
  import Highlight from '$lib/components/Highlight.svelte';
  import TechWord from '$lib/components/TechWord.svelte';
  
  let selectedCategory = 'all';
  
  $: filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.categories.includes(selectedCategory));
</script>

<svelte:head>
  <title>Progetti - Righello</title>
  <meta name="description" content="Scopri i progetti realizzati da Righello Creative Lab." />
</svelte:head>

<section class="py-16">
  <div class="section-container">
    <ScrollReveal>
      <h1 class="heading-xl mb-6 uppercase">I nostri progetti</h1>
      <p class="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12">
        Una selezione dei <TechWord>lavori</TechWord> che abbiamo realizzato per i nostri clienti.
      </p>
    </ScrollReveal>
    
    <ScrollReveal animation="fade-up" delay={100}>
      <div class="flex flex-wrap gap-3 mb-12">
        {#each categories as category}
          <button
            class="px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 {selectedCategory === category.id ? 'bg-righello-pink text-white shadow-lg shadow-righello-pink/30' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            on:click={() => selectedCategory = category.id}
          >
            {category.label}
          </button>
        {/each}
      </div>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <p class="text-gray-600 mt-2">{project.description}</p>
            </a>
          </TiltCard>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>
