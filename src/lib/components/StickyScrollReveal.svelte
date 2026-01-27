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
  let activeIndex = 0;
  let ctx: any;
  
  onMount(() => {
    if (!browser || typeof window === 'undefined') return;
    
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      
      const mediaQuery = window.matchMedia('(min-width: 1024px)');
      
      function setupScrollTriggers() {
        if (ctx) ctx.revert();
        
        if (!mediaQuery.matches) {
          return;
        }
        
        ctx = gsap.context(() => {
          const items = container.querySelectorAll('.content-item');
          
          items.forEach((item, i) => {
            ScrollTrigger.create({
              trigger: item,
              start: 'center 40%',
              end: 'center 40%',
              onEnter: () => { activeIndex = i; },
              onEnterBack: () => { activeIndex = i; },
              onLeave: () => { if (i < content.length - 1) activeIndex = i + 1; },
              onLeaveBack: () => { if (i > 0) activeIndex = i - 1; },
            });
          });
        }, container);
      }
      
      setupScrollTriggers();
      mediaQuery.addEventListener('change', setupScrollTriggers);
      
      return () => {
        mediaQuery.removeEventListener('change', setupScrollTriggers);
      };
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
    <div class="section-header">
      {#if subtitle}
        <p class="section-subtitle">{subtitle}</p>
      {/if}
      {#if title}
        <h2 class="section-title">{title}</h2>
      {/if}
    </div>
  {/if}
  
  <div class="sticky-wrapper">
    <!-- Visual panel - sticky on desktop -->
    <div class="visual-column">
      <div class="visual-sticky">
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
    
    <!-- Content - scrolls naturally -->
    <div class="content-column">
      {#each content as item, i}
        <div class="content-item" class:active={activeIndex === i}>
          <div class="step-indicator">
            <span class="step-number">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <div class="content-inner">
            <h3 class="content-title">{item.title}</h3>
            <p class="content-description">{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .sticky-scroll-section {
    padding: var(--section-padding-sm) 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  @media (min-width: 768px) {
    .sticky-scroll-section {
      padding: var(--section-padding-md) 1.5rem;
    }
  }
  
  @media (min-width: 1024px) {
    .sticky-scroll-section {
      padding: var(--section-padding-lg) 1.5rem;
    }
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  @media (min-width: 1024px) {
    .section-header {
      margin-bottom: 4rem;
    }
  }
  
  .section-subtitle {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #D6487E;
    margin-bottom: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .section-title {
      font-size: 3rem;
    }
  }
  
  .sticky-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    .sticky-wrapper {
      flex-direction: row;
      gap: 4rem;
    }
  }
  
  /* Visual column - contains sticky element */
  .visual-column {
    display: none;
  }
  
  @media (min-width: 1024px) {
    .visual-column {
      display: block;
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
  
  .visual-sticky {
    position: sticky;
    top: 15vh;
    height: 70vh;
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .visual-panel {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.92) translateY(20px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }
  
  .visual-panel.active {
    opacity: 1;
    transform: scale(1) translateY(0);
    pointer-events: auto;
  }
  
  .visual-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .visual-icon {
    font-size: 8rem;
    filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3));
  }
  
  .visual-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    color: white;
    text-align: center;
    padding: 2rem;
  }
  
  .visual-number {
    font-size: 6rem;
    font-weight: 800;
    opacity: 0.2;
    line-height: 1;
  }
  
  .visual-label {
    font-size: 1.75rem;
    font-weight: 600;
    max-width: 250px;
    line-height: 1.3;
  }
  
  /* Content column */
  .content-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    .content-column {
      gap: 0;
      padding-top: 15vh;
      padding-bottom: 15vh;
    }
  }
  
  .content-item {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
    border-radius: 1rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    transition: all 0.4s ease;
  }
  
  @media (min-width: 1024px) {
    .content-item {
      min-height: 40vh;
      display: flex;
      align-items: center;
      padding: 2rem;
      background: transparent;
      border: none;
      opacity: 0.4;
      transition: opacity 0.5s ease;
    }
    
    .content-item.active {
      opacity: 1;
    }
  }
  
  .step-indicator {
    flex-shrink: 0;
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #D6487E 0%, #a855f7 100%);
    color: white;
    font-weight: 700;
    font-size: 1rem;
  }
  
  @media (min-width: 1024px) {
    .step-number {
      width: 4rem;
      height: 4rem;
      font-size: 1.25rem;
    }
  }
  
  .content-inner {
    flex: 1;
  }
  
  .content-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .content-title {
      font-size: 2rem;
      margin-bottom: 1rem;
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
  
  @media (prefers-reduced-motion: reduce) {
    .visual-panel,
    .content-item {
      transition: none;
    }
  }
</style>
