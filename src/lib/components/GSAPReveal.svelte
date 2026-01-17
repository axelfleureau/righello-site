<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  export let animation: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale' | 'stagger' | 'reveal' = 'fade-up';
  export let delay: number = 0;
  export let duration: number = 0.8;
  export let staggerDelay: number = 0.1;
  export let once: boolean = true;
  export let scrub: boolean = false;
  
  let element: HTMLElement;
  let ctx: gsap.Context | null = null;
  
  onMount(() => {
    if (!browser) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    ctx = gsap.context(() => {
      const getInitialState = () => {
        switch (animation) {
          case 'fade-up': return { opacity: 0, y: 60 };
          case 'fade-in': return { opacity: 0 };
          case 'fade-left': return { opacity: 0, x: -60 };
          case 'fade-right': return { opacity: 0, x: 60 };
          case 'scale': return { opacity: 0, scale: 0.9 };
          case 'reveal': return { clipPath: 'inset(100% 0 0 0)' };
          case 'stagger': return { opacity: 0, y: 40 };
          default: return { opacity: 0 };
        }
      };
      
      const getFinalState = () => {
        switch (animation) {
          case 'fade-up': return { opacity: 1, y: 0, duration, delay, ease: 'power3.out' };
          case 'fade-in': return { opacity: 1, duration, delay, ease: 'power2.out' };
          case 'fade-left': return { opacity: 1, x: 0, duration, delay, ease: 'power3.out' };
          case 'fade-right': return { opacity: 1, x: 0, duration, delay, ease: 'power3.out' };
          case 'scale': return { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.2)' };
          case 'reveal': return { clipPath: 'inset(0% 0 0 0)', duration, delay, ease: 'power4.out' };
          case 'stagger': return { opacity: 1, y: 0, duration: 0.6, stagger: staggerDelay, ease: 'power3.out' };
          default: return { opacity: 1, duration, delay };
        }
      };
      
      const target = animation === 'stagger' ? element.children : element;
      gsap.set(target, getInitialState());
      
      gsap.to(target, {
        ...getFinalState(),
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          scrub: scrub ? 1 : false,
        }
      });
    }, element);
  });
  
  onDestroy(() => {
    if (ctx) ctx.revert();
  });
</script>

<div bind:this={element} class={$$restProps.class || ''}>
  <slot />
</div>
