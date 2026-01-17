<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
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
  
  function setTab(id: string) {
    activeTab = id;
  }
  
  $: activeDepartment = departments.find(d => d.id === activeTab);
  $: activeIndex = departments.findIndex(d => d.id === activeTab);
</script>

<div class="service-tabs">
  <div 
    class="tabs-container relative flex justify-center mb-16"
    role="tablist"
  >
    <div class="tabs-wrapper relative inline-flex p-1.5 bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl">
      <div 
        class="tab-indicator absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-righello-pink to-cyan-500 transition-all duration-500 ease-out shadow-lg"
        style="
          left: calc({activeIndex} * (100% / {departments.length}) + 6px);
          width: calc(100% / {departments.length} - 12px);
        "
      ></div>
      
      {#each departments as dept, i}
        <button
          role="tab"
          aria-selected={activeTab === dept.id}
          aria-controls="panel-{dept.id}"
          class="tab-button relative z-10 px-6 md:px-8 py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 whitespace-nowrap
                 {activeTab === dept.id 
                   ? 'text-white' 
                   : 'text-[var(--text-secondary)] hover:text-white'}"
          on:click={() => setTab(dept.id)}
        >
          <span class="hidden md:inline mr-2 text-lg">{dept.icon}</span>
          <span class="md:hidden mr-1.5 text-base">{dept.icon}</span>
          <span class="hidden sm:inline">{dept.name}</span>
          <span class="sm:hidden">{dept.name.split(' ')[0]}</span>
        </button>
      {/each}
    </div>
  </div>
  
  {#key activeTab}
    {#if activeDepartment}
      <div 
        id="panel-{activeDepartment.id}"
        role="tabpanel"
        class="tab-panel"
        in:fly={{ y: 20, duration: 400, easing: cubicOut }}
      >
        <div class="text-center mb-14">
          <p class="text-5xl md:text-6xl mb-5">{activeDepartment.icon}</p>
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 gradient-text">{activeDepartment.tagline}</h3>
          <p class="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">{activeDepartment.description}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {#each activeDepartment.services as service, i}
            <div 
              class="service-card-wrapper"
              in:fly={{ y: 30, duration: 400, delay: i * 80, easing: cubicOut }}
            >
              <GlowCard class="h-full">
                <div class="p-6 md:p-8">
                  <h4 class="text-xl font-semibold mb-3 text-white">{service.title}</h4>
                  <p class="text-[var(--text-secondary)] leading-relaxed">{service.description}</p>
                </div>
              </GlowCard>
            </div>
          {/each}
        </div>
        
        <div 
          class="glass-card rounded-3xl p-8 md:p-10"
          in:fade={{ duration: 400, delay: 400 }}
        >
          <h4 class="text-lg font-semibold mb-8 text-center text-white">Cosa include</h4>
          <div class="flex flex-wrap justify-center gap-3">
            {#each activeDepartment.features as feature, i}
              <span 
                class="feature-tag px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-[var(--text-secondary)] hover:border-righello-pink/50 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-default"
                in:fly={{ y: 10, duration: 300, delay: 500 + i * 50, easing: cubicOut }}
              >
                {feature}
              </span>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  {/key}
</div>

<style>
  .tabs-wrapper {
    box-shadow: 
      0 4px 30px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  
  .tab-indicator {
    box-shadow: 
      0 4px 20px rgba(214, 72, 126, 0.4),
      0 0 40px rgba(214, 72, 126, 0.2);
  }
  
  .tab-button {
    min-width: 100px;
  }
  
  @media (min-width: 768px) {
    .tab-button {
      min-width: 180px;
    }
  }
  
  .feature-tag:hover {
    box-shadow: 0 0 20px rgba(214, 72, 126, 0.2);
  }
</style>
