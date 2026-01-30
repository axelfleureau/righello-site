<script lang="ts">
  import { fly, fade, scale } from 'svelte/transition';
  import { cubicOut, backOut } from 'svelte/easing';
  import { inview } from '$lib/actions/inview';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let animation: 'fade' | 'fly-up' | 'fly-left' | 'fly-right' | 'scale' | 'blur' = 'fly-up';
  export let delay: number = 0;
  export let duration: number = 600;
  export let threshold: number = 0.2;
  export let once: boolean = true;
  export let stagger: number = 0;
  export let index: number = 0;
  
  let visible = !browser;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    visible = false;
  });
  
  function handleInview(e: CustomEvent<{inView: boolean}>) {
    if (e.detail.inView) {
      visible = true;
    } else if (!once) {
      visible = false;
    }
  }
  
  $: totalDelay = delay + (stagger * index);
  
  $: flyParams = { y: animation === 'fly-up' ? 40 : 0, x: animation === 'fly-left' ? -40 : animation === 'fly-right' ? 40 : 0, duration, delay: totalDelay, easing: cubicOut };
  $: scaleParams = { start: 0.9, duration, delay: totalDelay, easing: backOut };
  $: fadeParams = { duration, delay: totalDelay };
</script>

<div 
  class="reveal-wrapper"
  use:inview={{ threshold, once }}
  on:inview={handleInview}
>
  {#if visible}
    {#if animation === 'fly-up' || animation === 'fly-left' || animation === 'fly-right'}
      <div class="reveal-content" in:fly={flyParams}>
        <slot />
      </div>
    {:else if animation === 'scale'}
      <div class="reveal-content" in:scale={scaleParams}>
        <slot />
      </div>
    {:else}
      <div class="reveal-content" class:blur-reveal={animation === 'blur'} in:fade={fadeParams}>
        <slot />
      </div>
    {/if}
  {:else}
    <div class="reveal-placeholder" aria-hidden="true">
      <slot />
    </div>
  {/if}
</div>

<style>
  .reveal-wrapper {
    position: relative;
    height: 100%;
  }
  
  .reveal-content {
    will-change: transform, opacity;
    height: 100%;
  }
  
  .reveal-placeholder {
    opacity: 0;
    pointer-events: none;
    height: 100%;
  }
  
  .blur-reveal {
    animation: unblur 0.6s ease forwards;
  }
  
  @keyframes unblur {
    from {
      filter: blur(10px);
    }
    to {
      filter: blur(0);
    }
  }
</style>
