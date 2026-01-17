<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import gsap from 'gsap';
  
  export let speed: number = 30;
  export let direction: 'left' | 'right' = 'left';
  export let pauseOnHover: boolean = true;
  
  let container: HTMLElement;
  let inner: HTMLElement;
  let animation: gsap.core.Tween | null = null;
  
  onMount(() => {
    if (!browser) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const setupAnimation = () => {
      if (!inner) return;
      
      const width = inner.offsetWidth / 2;
      const duration = width / speed;
      
      gsap.set(inner, { x: direction === 'left' ? 0 : -width });
      
      animation = gsap.to(inner, {
        x: direction === 'left' ? -width : 0,
        duration,
        ease: 'none',
        repeat: -1
      });
    };
    
    setupAnimation();
    
    if (pauseOnHover && container) {
      container.addEventListener('mouseenter', () => animation?.pause());
      container.addEventListener('mouseleave', () => animation?.resume());
    }
  });
  
  onDestroy(() => {
    if (animation) animation.kill();
  });
</script>

<div bind:this={container} class="overflow-hidden {$$restProps.class || ''}">
  <div bind:this={inner} class="flex whitespace-nowrap will-change-transform">
    <slot />
    <slot />
  </div>
</div>
