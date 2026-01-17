<script lang="ts">
  import { onMount } from 'svelte';
  
  export let label: string = '';
  
  let container: HTMLDivElement;
  let isHovered = false;
  let rotation = 0;
  let velocity = 0;
  let animationFrame: number;
  let prefersReducedMotion = false;
  
  const DAMPING = 0.95;
  const SPRING = 0.1;
  const HOVER_PUSH = 8;
  
  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      const animate = () => {
        if (!isHovered) {
          velocity += -rotation * SPRING;
          velocity *= DAMPING;
          rotation += velocity;
          
          if (Math.abs(rotation) < 0.01 && Math.abs(velocity) < 0.01) {
            rotation = 0;
            velocity = 0;
          }
        }
        animationFrame = requestAnimationFrame(animate);
      };
      animate();
    }
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  });
  
  function handleMouseEnter() {
    if (prefersReducedMotion) return;
    isHovered = true;
    velocity = (Math.random() - 0.5) * HOVER_PUSH;
    rotation += velocity * 2;
  }
  
  function handleMouseLeave() {
    if (prefersReducedMotion) return;
    isHovered = false;
  }
</script>

<div 
  bind:this={container}
  class="inline-flex flex-col items-center"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <div class="w-px h-8 bg-gray-300"></div>
  
  <div 
    class="relative transition-transform duration-100"
    style="transform: rotate({rotation}deg); transform-origin: top center;"
  >
    <div class="w-px h-6 bg-gray-300 mx-auto"></div>
    
    <div class="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <slot />
    </div>
    
    {#if label}
      <div class="mt-2 px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-full whitespace-nowrap">
        {label}
      </div>
    {/if}
  </div>
</div>
