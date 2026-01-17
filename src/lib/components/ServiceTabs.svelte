<script lang="ts">
  import { onMount } from 'svelte';
  import GSAPReveal from './GSAPReveal.svelte';
  import GlowCard from './GlowCard.svelte';
  
  export let departments: {
    id: string;
    name: string;
    icon: string;
    tagline: string;
    description: string;
    services: { title: string; description: string }[];
    features: string[];
  }[];
  
  let activeTab = departments[0]?.id || '';
  let tabsContainer: HTMLElement;
  
  function setTab(id: string) {
    activeTab = id;
  }
  
  $: activeDepartment = departments.find(d => d.id === activeTab);
</script>

<div class="service-tabs">
  <div 
    bind:this={tabsContainer}
    class="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-fit mx-auto"
    role="tablist"
  >
    {#each departments as dept}
      <button
        role="tab"
        aria-selected={activeTab === dept.id}
        aria-controls="panel-{dept.id}"
        class="tab-button px-6 py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-300 whitespace-nowrap
               {activeTab === dept.id 
                 ? 'bg-gradient-to-r from-righello-pink to-cyan-500 text-white shadow-lg' 
                 : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/10'}"
        on:click={() => setTab(dept.id)}
      >
        <span class="mr-2">{dept.icon}</span>
        {dept.name}
      </button>
    {/each}
  </div>
  
  {#if activeDepartment}
    <div 
      id="panel-{activeDepartment.id}"
      role="tabpanel"
      class="tab-panel"
    >
      <div class="text-center mb-12">
        <GSAPReveal animation="fade-up">
          <p class="text-6xl mb-4">{activeDepartment.icon}</p>
          <h3 class="text-3xl md:text-4xl font-bold mb-4 gradient-text">{activeDepartment.tagline}</h3>
          <p class="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">{activeDepartment.description}</p>
        </GSAPReveal>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {#each activeDepartment.services as service, i}
          <GSAPReveal animation="fade-up" delay={i * 0.1}>
            <GlowCard class="h-full">
              <div class="p-6">
                <h4 class="text-xl font-semibold mb-3 text-white">{service.title}</h4>
                <p class="text-[var(--text-secondary)] leading-relaxed">{service.description}</p>
              </div>
            </GlowCard>
          </GSAPReveal>
        {/each}
      </div>
      
      <div class="glass-card rounded-2xl p-8">
        <GSAPReveal animation="fade-up">
          <h4 class="text-lg font-semibold mb-6 text-center text-white">Cosa include</h4>
          <div class="flex flex-wrap justify-center gap-3">
            {#each activeDepartment.features as feature}
              <span class="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[var(--text-secondary)] hover:border-righello-pink/50 hover:text-white transition-all duration-300">
                {feature}
              </span>
            {/each}
          </div>
        </GSAPReveal>
      </div>
    </div>
  {/if}
</div>

<style>
  .tab-button {
    position: relative;
    overflow: hidden;
  }
  
  .tab-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .tab-button[aria-selected="true"]::before {
    opacity: 1;
  }
  
  .tab-panel {
    animation: fadeIn 0.4s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
