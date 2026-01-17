<script lang="ts">
  import { page } from '$app/stores';
  import { projects } from '$lib/data/projects';
  
  $: project = projects.find(p => p.slug === $page.params.slug);
  $: relatedProjects = projects.filter(p => p.slug !== $page.params.slug).slice(0, 3);
</script>

<svelte:head>
  <title>{project?.title || 'Progetto'} - Righello</title>
  <meta name="description" content={project?.description || ''} />
</svelte:head>

{#if project}
  <section class="py-16">
    <div class="section-container">
      <a href="/progetti" class="inline-flex items-center text-gray-600 hover:text-righello-pink transition-colors mb-8">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Torna ai progetti
      </a>
      
      <div class="flex flex-wrap gap-3 mb-6">
        {#each project.categories as cat}
          <span class="text-sm font-medium px-3 py-1 bg-righello-pink/10 text-righello-pink rounded-full">
            {cat === 'content' ? 'Content Production' : cat === 'photo-video' ? 'Produzione Foto&Video' : cat === 'web' ? 'Sviluppo Web' : cat === 'branding' ? 'Branding' : cat === 'software' ? 'Sviluppo Software' : cat}
          </span>
        {/each}
      </div>
      
      <h1 class="heading-xl mb-6">{project.title}</h1>
      <p class="text-xl text-gray-600 max-w-3xl mb-12">{project.description}</p>
      
      <div class="rounded-3xl overflow-hidden mb-16">
        <img 
          src={project.image} 
          alt={project.title}
          class="w-full aspect-video object-cover"
        />
      </div>
      
      <div class="prose max-w-3xl">
        <h2 class="text-2xl font-semibold mb-4">Il progetto</h2>
        <p class="text-gray-600 text-lg leading-relaxed mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
        </p>
        <p class="text-gray-600 text-lg leading-relaxed mb-6">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Cras ultricies ligula sed magna dictum porta.
        </p>
      </div>
    </div>
  </section>
  
  <section class="py-20 bg-gray-50">
    <div class="section-container">
      <h2 class="heading-lg mb-12">Altri progetti</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each relatedProjects as p}
          <a 
            href="/progetti/{p.slug}" 
            class="group block"
          >
            <div class="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
              <img 
                src={p.image} 
                alt={p.title}
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 class="text-xl font-semibold group-hover:text-righello-pink transition-colors">{p.title}</h3>
          </a>
        {/each}
      </div>
    </div>
  </section>
{:else}
  <section class="py-32 text-center">
    <div class="section-container">
      <h1 class="heading-lg mb-6">Progetto non trovato</h1>
      <p class="text-gray-600 mb-8">Il progetto che stai cercando non esiste.</p>
      <a href="/progetti" class="btn-primary">Torna ai progetti</a>
    </div>
  </section>
{/if}
