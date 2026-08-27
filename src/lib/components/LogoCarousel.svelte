<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import GradualBlur from './GradualBlur.svelte';
  
  export interface LogoItem {
    name: string;
    logo?: string;
    href?: string;
    noFilter?: boolean;
  }
  
  export let items: LogoItem[] = [];
  export let speed: number = 80;
  export let direction: 'left' | 'right' = 'left';
  export let pauseOnHover: boolean = true;
  export let hoverSpeed: number = 0;
  export let scaleOnHover: boolean = true;
  export let fadeEdges: boolean = true;
  export let fadeSize: string = '8rem';
  export let gap: number = 48;
  export let itemHeight: number = 32;
  
  let container: HTMLElement;
  let track: HTMLElement;
  let seqElement: HTMLElement;
  
  let seqWidth = 0;
  let copyCount = 2;
  let isHovered = false;
  let isVisible = true;
  let offset = 0;
  let velocity = 0;
  let animationId: number;
  let lastTimestamp: number | null = null;
  
  const SMOOTH_TAU = 0.25;
  
  $: targetVelocity = direction === 'left' ? speed : -speed;
  $: effectiveVelocity = isHovered ? hoverSpeed : targetVelocity;
  
  function updateDimensions() {
    if (!seqElement || !container) return;
    
    const sequenceWidth = seqElement.getBoundingClientRect().width;
    const containerWidth = container.clientWidth;
    
    if (sequenceWidth > 0) {
      seqWidth = Math.ceil(sequenceWidth);
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + 3;
      copyCount = Math.max(2, copiesNeeded);
    }
  }

  /* Wait for all images in seqElement to load before measuring seqWidth.
     This prevents the overlap bug: images start at 0-width before load,
     so an early measurement underestimates seqWidth and causes the offset
     to wrap too soon, making copies visually collide. */
  function measureAfterImagesLoad() {
    if (!seqElement) return;
    const imgs = Array.from(seqElement.querySelectorAll('img')) as HTMLImageElement[];
    if (imgs.length === 0) {
      updateDimensions();
      return;
    }
    let pending = imgs.filter(img => !img.complete).length;
    if (pending === 0) {
      updateDimensions();
      return;
    }
    const onLoad = () => {
      pending--;
      if (pending <= 0) updateDimensions();
    };
    imgs.forEach(img => {
      if (!img.complete) img.addEventListener('load', onLoad, { once: true });
    });
    // Safety net: measure after 800ms even if some images never fire load
    setTimeout(updateDimensions, 800);
  }
  
  function animate(timestamp: number) {
    if (!isVisible) {
      lastTimestamp = null;
      animationId = requestAnimationFrame(animate);
      return;
    }

    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
    }
    
    const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    
    const easingFactor = 1 - Math.exp(-deltaTime / SMOOTH_TAU);
    velocity += (effectiveVelocity - velocity) * easingFactor;
    
    if (seqWidth > 0) {
      let nextOffset = offset + velocity * deltaTime;
      nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
      offset = nextOffset;
      
      if (track) {
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  onMount(() => {
    if (!browser) return;
    
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    
    // First rough measurement after a short delay, then accurate one after images load
    setTimeout(() => {
      updateDimensions();
      measureAfterImagesLoad();
    }, 100);
    
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    
    if (container) resizeObserver.observe(container);

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '100px' }
    );
    if (container) visibilityObserver.observe(container);
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
    };
  });
  
  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });
  
  function handleMouseEnter() {
    if (pauseOnHover) isHovered = true;
  }
  
  function handleMouseLeave() {
    if (pauseOnHover) isHovered = false;
  }

  function noNav(e: MouseEvent) {
    e.preventDefault();
  }
</script>

<div 
  bind:this={container}
  class="logo-carousel relative overflow-hidden"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  style="--logo-gap:{gap}px;--logo-height:{itemHeight}px"
  role="region"
  aria-label="Partner logos"
>
  {#if fadeEdges}
    <GradualBlur position="left" size={fadeSize} strength={3} divCount={6} curve="ease-out" zIndex={20} />
    <GradualBlur position="right" size={fadeSize} strength={3} divCount={6} curve="ease-out" zIndex={20} />
  {/if}
  
  <div bind:this={track} class="track flex will-change-transform">
    <ul bind:this={seqElement} class="sequence flex items-center list-none m-0 p-0" role="list">
      {#each items as item, itemIdx (itemIdx)}
        <li class="logo-item flex-none" class:scale-hover={scaleOnHover} role="listitem">
          {#if item.href}
            <a href={item.href} class="logo-link" aria-label={item.name} on:click={noNav}>
              {#if item.logo}
                <img src={item.logo} alt={item.name} class="logo-image{item.noFilter ? ' no-filter' : ''}" loading="lazy" decoding="async" />
              {:else}
                <span class="logo-text">{item.name}</span>
              {/if}
            </a>
          {:else}
            <span class="logo-content">
              {#if item.logo}
                <img src={item.logo} alt={item.name} class="logo-image{item.noFilter ? ' no-filter' : ''}" loading="lazy" decoding="async" />
              {:else}
                <span class="logo-text">{item.name}</span>
              {/if}
            </span>
          {/if}
        </li>
      {/each}
    </ul>
    
    {#each Array(copyCount - 1) as _}
      <ul class="sequence flex items-center list-none m-0 p-0" role="list" aria-hidden="true">
        {#each items as item, itemIdx (itemIdx)}
          <li class="logo-item flex-none" class:scale-hover={scaleOnHover} role="listitem">
            {#if item.href}
              <a href={item.href} class="logo-link" tabindex="-1" aria-label={item.name} on:click={noNav}>
                {#if item.logo}
                  <img src={item.logo} alt={item.name} class="logo-image{item.noFilter ? ' no-filter' : ''}" loading="lazy" decoding="async" />
                {:else}
                  <span class="logo-text">{item.name}</span>
                {/if}
              </a>
            {:else}
              <span class="logo-content">
                {#if item.logo}
                  <img src={item.logo} alt={item.name} class="logo-image{item.noFilter ? ' no-filter' : ''}" loading="lazy" decoding="async" />
                {:else}
                  <span class="logo-text">{item.name}</span>
                {/if}
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    {/each}
  </div>
</div>

<style>
  .logo-carousel {
    padding: 1rem 0;
  }
  
  .track {
    display: flex;
  }
  
  .sequence {
    display: flex;
    align-items: center;
  }
  
  .logo-item {
    margin-right: var(--logo-gap);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .logo-item.scale-hover:hover {
    transform: scale(1.15);
  }
  
  .logo-link,
  .logo-content {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: opacity 0.2s ease;
    cursor: default;
  }
  
  .logo-link:focus-visible {
    outline: 2px solid var(--righello-pink);
    outline-offset: 4px;
  }
  
  .logo-image {
    height: var(--logo-height);
    width: auto;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
    filter: brightness(0) invert(1);
    opacity: 0.72;
  }

  .logo-image.no-filter {
    filter: none;
    opacity: 0.8;
  }

  :global([data-theme='light']) .logo-image {
    filter: brightness(0);
    opacity: 0.58;
  }

  :global([data-theme='light']) .logo-image.no-filter {
    filter: none;
    opacity: 0.78;
  }
  
  .logo-text {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 700;
    color: var(--text-primary);
    opacity: 0.6;
    white-space: nowrap;
    transition: opacity 0.2s ease;
  }
</style>
