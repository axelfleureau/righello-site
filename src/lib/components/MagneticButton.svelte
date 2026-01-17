<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let href: string = '';
  export let variant: 'primary' | 'secondary' | 'outline-white' = 'primary';
  export let strength: number = 0.3;
  let className: string = '';
  export { className as class };
  
  let element: HTMLElement;
  let x = 0;
  let y = 0;
  let isHovering = false;
  let prefersReducedMotion = false;
  
  onMount(() => {
    if (browser) {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  });
  
  function handleMouseMove(e: MouseEvent) {
    if (!element || prefersReducedMotion) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x = (e.clientX - centerX) * strength;
    y = (e.clientY - centerY) * strength;
  }
  
  function handleMouseEnter() {
    if (!prefersReducedMotion) {
      isHovering = true;
    }
  }
  
  function handleMouseLeave() {
    isHovering = false;
    x = 0;
    y = 0;
  }
  
  const variants = {
    primary: 'bg-righello-pink text-white hover:bg-righello-pink-dark',
    secondary: 'border-2 border-[var(--border-color)] text-[var(--text-primary)] hover:bg-righello-pink hover:text-white hover:border-righello-pink',
    'outline-white': 'border-2 border-[var(--border-color)] text-[var(--text-primary)] hover:bg-righello-pink hover:text-white hover:border-righello-pink'
  };
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  bind:this={element}
  href={href || undefined}
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click
  class="magnetic-button inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-all duration-300 {variants[variant]} {className}"
  style="transform: translate({x}px, {y}px); transition: transform {isHovering ? '0.1s' : '0.3s'} ease-out, background-color 0.3s, color 0.3s;"
>
  <slot />
</svelte:element>

<style>
  .magnetic-button {
    will-change: transform;
  }
</style>
