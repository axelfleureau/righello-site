<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { gsap } from '$lib/utils/gsap';
  
  export let title = "";
  export let subtitle = "";
  
  export let content: {
    title: string;
    description: string;
    color?: string;
    imageSrc?: string;
    icon?: string;
  }[] = [];
  
  let container: HTMLElement;
  let contentPanel: HTMLElement;
  let activeIndex = 0;
  let ctx: any;
  
  onMount(() => {
    if (!browser || typeof window === 'undefined') return;
    
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      
      ctx = gsap.context(() => {
        const items = container.querySelectorAll('.content-item');
        
        items.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => { activeIndex = i; },
            onEnterBack: () => { activeIndex = i; },
          });
        });
      }, container);
    });
  });
  
  onDestroy(() => {
    if (ctx) ctx.revert();
  });
  
  const defaultColors = [
    'linear-gradient(135deg, #D6487E 0%, #a855f7 100%)',
    'linear-gradient(135deg, #06B6D4 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    'linear-gradient(135deg, #10b981 0%, #06B6D4 100%)',
  ];
</script>

<section bind:this={container} class="sticky-scroll-section">
  {#if title || subtitle}
    <div class="section-container mb-12 md:mb-20">
      <div class="text-center">
        {#if subtitle}
          <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">{subtitle}</p>
        {/if}
        {#if title}
          <h2 class="heading-lg">{title}</h2>
        {/if}
      </div>
    </div>
  {/if}
  
  <div class="sticky-container">
    <div class="content-side">
      {#each content as item, i}
        <div class="content-item" class:active={activeIndex === i}>
          <div class="content-inner">
            <h3 class="content-title">{item.title}</h3>
            <p class="content-description">{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="visual-side">
      <div bind:this={contentPanel} class="visual-sticky">
        {#each content as item, i}
          <div 
            class="visual-panel"
            class:active={activeIndex === i}
            style="background: {item.color || defaultColors[i % defaultColors.length]}"
          >
            {#if item.imageSrc}
              <img src={item.imageSrc} alt={item.title} class="visual-image" />
            {:else if item.icon}
              <div class="visual-icon">
                {item.icon}
              </div>
            {:else}
              <div class="visual-placeholder">
                <span class="visual-number">{String(i + 1).padStart(2, '0')}</span>
                <span class="visual-label">{item.title}</span>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .sticky-scroll-section {
    padding: 4rem 0;
    overflow: hidden;
  }
  
  .sticky-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    .sticky-container {
      flex-direction: row;
      gap: 4rem;
    }
  }
  
  .content-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    .content-side {
      gap: 0;
    }
  }
  
  .content-item {
    padding: 2rem 0;
    opacity: 0.4;
    transition: opacity 0.4s ease;
  }
  
  @media (min-width: 1024px) {
    .content-item {
      min-height: 60vh;
      display: flex;
      align-items: center;
    }
  }
  
  .content-item.active {
    opacity: 1;
  }
  
  .content-inner {
    max-width: 500px;
  }
  
  .content-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .content-title {
      font-size: 2.25rem;
    }
  }
  
  .content-description {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-secondary);
  }
  
  @media (min-width: 768px) {
    .content-description {
      font-size: 1.125rem;
    }
  }
  
  .visual-side {
    flex: 1;
    display: none;
  }
  
  @media (min-width: 1024px) {
    .visual-side {
      display: block;
    }
  }
  
  .visual-sticky {
    position: sticky;
    top: 20vh;
    height: 60vh;
    border-radius: 1.5rem;
    overflow: hidden;
  }
  
  .visual-panel {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .visual-panel.active {
    opacity: 1;
    transform: scale(1);
  }
  
  .visual-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .visual-icon {
    font-size: 6rem;
  }
  
  .visual-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: white;
    text-align: center;
    padding: 2rem;
  }
  
  .visual-number {
    font-size: 5rem;
    font-weight: 800;
    opacity: 0.3;
    line-height: 1;
  }
  
  .visual-label {
    font-size: 1.5rem;
    font-weight: 600;
    max-width: 200px;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .visual-panel {
      transition: none;
    }
    
    .content-item {
      transition: none;
    }
  }
</style>
