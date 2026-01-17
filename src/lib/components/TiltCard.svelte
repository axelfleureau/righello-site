<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let element: HTMLElement;
  let rotateX = 0;
  let rotateY = 0;
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    rotateY = ((x - centerX) / centerX) * 10;
    rotateX = -((y - centerY) / centerY) * 10;
  }
  
  function handleMouseEnter() {
    if (!prefersReducedMotion) {
      isHovering = true;
    }
  }
  
  function handleMouseLeave() {
    isHovering = false;
    rotateX = 0;
    rotateY = 0;
  }
</script>

<div
  bind:this={element}
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="article"
  class="tilt-card {$$restProps.class || ''}"
  style="transform: perspective(1000px) rotateX({rotateX}deg) rotateY({rotateY}deg) scale({isHovering ? 1.02 : 1}); transition: transform {isHovering ? '0.1s' : '0.5s'} ease-out;"
>
  <slot />
</div>

<style>
  .tilt-card {
    will-change: transform;
  }
</style>
