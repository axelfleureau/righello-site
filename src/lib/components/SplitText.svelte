<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let text: string;
  export let delay: number = 50;
  export let startDelay: number = 0;
  export let animation: 'words' | 'chars' = 'words';
  
  let element: HTMLElement;
  let isVisible = true;
  let items: string[] = [];
  let prefersReducedMotion = false;
  
  $: {
    if (animation === 'words') {
      items = text.split(' ');
    } else {
      items = text.split('');
    }
  }
  
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
          if (entry.isIntersecting) {
            setTimeout(() => {
              isVisible = true;
            }, startDelay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<span bind:this={element} class="split-text {$$restProps.class || ''}">
  {#each items as item, i}
    <span
      class="split-item"
      style="
        display: inline-block;
        opacity: {isVisible ? 1 : 0};
        transform: translateY({isVisible ? 0 : 20}px);
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        transition-delay: {i * delay}ms;
      "
    >{item}{animation === 'words' && i < items.length - 1 ? '\u00A0' : ''}</span>
  {/each}
</span>

<style>
  .split-text {
    display: inline;
  }
</style>
