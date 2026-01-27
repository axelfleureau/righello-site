<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  export let text: string = '';
  export let containerClass: string = '';
  export let textClass: string = '';
  export let animationDuration: number = 1;
  export let ease: string = 'back.inOut(2)';
  export let scrollStart: string = 'center bottom+=50%';
  export let scrollEnd: string = 'bottom bottom-=40%';
  export let stagger: number = 0.03;
  export let tag: 'h1' | 'h2' | 'h3' | 'p' | 'span' = 'h2';
  export let triggerElement: HTMLElement | null = null;
  export let useScrollTrigger: boolean = true;
  export let manualProgress: number | null = null;
  
  let container: HTMLElement;
  let ctx: any = null;
  let tween: any = null;
  
  $: characters = text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    index
  }));
  
  $: if (manualProgress !== null && tween && !useScrollTrigger) {
    tween.progress(Math.max(0, Math.min(1, manualProgress)));
  }
  
  onMount(async () => {
    if (!browser) return;
    
    const gsap = (await import('gsap')).default;
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    
    ctx = gsap.context(() => {
      const charElements = container.querySelectorAll('.scroll-float-char');
      
      const animationConfig: any = {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger
      };
      
      if (useScrollTrigger) {
        animationConfig.scrollTrigger = {
          trigger: triggerElement || container,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        };
      } else {
        animationConfig.paused = true;
      }
      
      tween = gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%'
        },
        animationConfig
      );
    }, container);
  });
  
  onDestroy(() => {
    ctx?.revert();
  });
</script>

<svelte:element this={tag} bind:this={container} class="scroll-float-container overflow-hidden {containerClass}">
  <span class="inline-block {textClass}">
    {#each characters as { char, index } (index)}
      <span class="scroll-float-char inline-block">{char}</span>
    {/each}
  </span>
</svelte:element>

<style>
  .scroll-float-container {
    overflow: hidden;
  }
  
  .scroll-float-char {
    display: inline-block;
    will-change: opacity, transform;
  }
</style>
