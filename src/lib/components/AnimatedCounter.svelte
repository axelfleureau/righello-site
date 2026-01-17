<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let target: number;
  export let duration: number = 2000;
  export let prefix: string = '';
  export let suffix: string = '';
  
  let current = 0;
  let element: HTMLElement;
  let hasAnimated = false;
  
  onMount(() => {
    if (!browser) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      current = target;
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounter();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  });
  
  function animateCounter() {
    const startTime = performance.now();
    const startValue = 0;
    
    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      current = Math.floor(startValue + (target - startValue) * easeOut);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        current = target;
      }
    }
    
    requestAnimationFrame(update);
  }
</script>

<span bind:this={element} class={$$restProps.class}>
  {prefix}{current}{suffix}
</span>
