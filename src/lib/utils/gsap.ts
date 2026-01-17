import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMount, onDestroy } from 'svelte';
import { browser } from '$app/environment';

if (browser) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function useGsapContext(callback: (ctx: gsap.Context) => void) {
  let ctx: gsap.Context | null = null;
  
  onMount(() => {
    if (!browser) return;
    
    ctx = gsap.context(() => {
      callback(ctx!);
    });
  });
  
  onDestroy(() => {
    ctx?.revert();
  });
  
  return () => ctx;
}

export function createScrollTrigger(
  element: Element | string,
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) {
  if (!browser) return null;
  
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...triggerOptions,
    },
  });
}

export function createParallax(
  element: Element | string,
  yPercent: number = -20,
  triggerElement?: Element | string
) {
  if (!browser) return null;
  
  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerElement || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

export function createScrubAnimation(
  element: Element | string,
  animation: gsap.TweenVars,
  triggerOptions?: Partial<ScrollTrigger.Vars>
) {
  if (!browser) return null;
  
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      ...triggerOptions,
    },
  });
}

export function createPinnedSection(
  triggerElement: Element | string,
  duration: string | number = '+=100%',
  onUpdate?: (self: ScrollTrigger) => void
) {
  if (!browser) return null;
  
  return ScrollTrigger.create({
    trigger: triggerElement,
    start: 'top top',
    end: duration,
    pin: true,
    pinSpacing: true,
    onUpdate,
  });
}

export function refreshScrollTrigger() {
  if (browser) {
    ScrollTrigger.refresh();
  }
}

export function killAllScrollTriggers() {
  if (browser) {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
