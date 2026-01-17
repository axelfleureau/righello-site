<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  export let text: string = '';
  export let element: 'h1' | 'h2' | 'h3' | 'p' | 'span' = 'h2';
  export let delay: number = 0;
  export let stagger: number = 0.03;
  export let highlight: boolean = false;
  
  let container: HTMLElement;
  let ctx: gsap.Context | null = null;
  let words: string[] = [];
  
  $: words = text.split(' ');
  
  onMount(() => {
    if (!browser) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    ctx = gsap.context(() => {
      const chars = container.querySelectorAll('.char');
      
      gsap.set(chars, { opacity: 0, y: 50, rotateX: -90 });
      
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger,
        delay,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }, container);
  });
  
  onDestroy(() => {
    if (ctx) ctx.revert();
  });
</script>

<svelte:element 
  this={element} 
  bind:this={container} 
  class="{$$restProps.class || ''} perspective-1000"
  style="perspective: 1000px;"
>
  {#each words as word, i}
    <span class="inline-block mr-[0.25em]">
      {#each word.split('') as char, j}
        <span 
          class="char inline-block will-change-transform {highlight && i === 0 ? 'text-righello-pink' : ''}"
          style="display: inline-block; transform-origin: center bottom;"
        >{char}</span>
      {/each}
    </span>
  {/each}
</svelte:element>
