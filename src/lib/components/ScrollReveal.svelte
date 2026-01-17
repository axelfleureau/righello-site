<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let animation: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale' = 'fade-up';
  export let delay: number = 0;
  export let duration: number = 600;
  export let threshold: number = 0.1;
  export let once: boolean = true;
  
  let element: HTMLElement;
  let isVisible = true;
  let hasAnimated = false;
  let prefersReducedMotion = false;
  
  onMount(() => {
    if (!browser) return;
    
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      isVisible = true;
      return;
    }
    
    isVisible = false;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              isVisible = true;
              if (once) {
                hasAnimated = true;
              }
            }, delay);
            if (once) {
              observer.disconnect();
            }
          } else if (!once && !entry.isIntersecting) {
            isVisible = false;
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  });
  
  $: animationClass = (() => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up': return 'opacity-0 translate-y-8';
        case 'fade-in': return 'opacity-0';
        case 'fade-left': return 'opacity-0 -translate-x-8';
        case 'fade-right': return 'opacity-0 translate-x-8';
        case 'scale': return 'opacity-0 scale-95';
        default: return 'opacity-0';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  })();
</script>

<div 
  bind:this={element} 
  class="transition-all ease-out {animationClass} {$$restProps.class || ''}"
  style="transition-duration: {duration}ms;"
>
  <slot />
</div>
