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
  let scrollHandler: (() => void) | null = null;
  let rafPending = false;
  
  onMount(() => {
    if (!browser || typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    function calculateActiveIndex() {
      const items = container.querySelectorAll('.content-item');
      if (items.length === 0) return;
      
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      items.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      
      if (closestIndex !== activeIndex) {
        activeIndex = closestIndex;
      }
    }
    
    function setupScrollHandler() {
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
        scrollHandler = null;
      }
      
      if (!mediaQuery.matches) {
        return;
      }
      
      scrollHandler = () => {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(() => {
          calculateActiveIndex();
          rafPending = false;
        });
      };
      
      window.addEventListener('scroll', scrollHandler, { passive: true });
      calculateActiveIndex();
    }
    
    setupScrollHandler();
    mediaQuery.addEventListener('change', setupScrollHandler);
    
    return () => {
      mediaQuery.removeEventListener('change', setupScrollHandler);
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
    };
  });
  
  onDestroy(() => {
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler);
    }
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
    padding: var(--section-padding-sm) var(--container-padding, 1.5rem);
    max-width: var(--container-max, 1280px);
    margin: 0 auto;
  }
  
  @media (min-width: 768px) {
    .sticky-scroll-section {
      padding: var(--section-padding-md) var(--space-lg, 1.5rem);
    }
  }
  
  @media (min-width: 1024px) {
    .sticky-scroll-section {
      padding: var(--section-padding-lg) var(--space-lg, 1.5rem);
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
    border-radius: 0;
    overflow: hidden;
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
    font-size: 12rem;
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
    background: transparent;
    border: 1px solid transparent;
    transition: all 0.4s ease;
  }
  
  @media (min-width: 1024px) {
    .content-item {
      min-height: 40vh;
      display: flex;
      align-items: center;
      padding: 2rem;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 1rem;
      opacity: 0.35;
      transform: scale(0.96);
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .content-item.active {
      opacity: 1;
      transform: scale(1);
      background: rgba(214, 72, 126, 0.08);
      border-color: rgba(214, 72, 126, 0.3);
      box-shadow: 0 0 30px rgba(214, 72, 126, 0.15);
    }
  }
  
  .step-indicator {
    flex-shrink: 0;
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #D6487E 0%, #a855f7 100%);
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
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
