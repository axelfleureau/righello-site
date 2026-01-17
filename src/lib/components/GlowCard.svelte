<script lang="ts">
  import { onMount } from 'svelte';
  
  export let glowColor: string = 'rgba(214, 72, 126, 0.4)';
  export let borderRadius: string = '24px';
  
  let card: HTMLElement;
  let glowX = 0;
  let glowY = 0;
  let isHovering = false;
  
  function handleMouseMove(e: MouseEvent) {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    glowX = e.clientX - rect.left;
    glowY = e.clientY - rect.top;
  }
  
  function handleMouseEnter() {
    isHovering = true;
  }
  
  function handleMouseLeave() {
    isHovering = false;
  }
</script>

<div 
  bind:this={card}
  class="relative group cursor-pointer {$$restProps.class || ''}"
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="article"
  style="border-radius: {borderRadius};"
>
  <div 
    class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    style="
      background: radial-gradient(600px circle at {glowX}px {glowY}px, {glowColor}, transparent 40%);
      border-radius: {borderRadius};
    "
  ></div>
  
  <div 
    class="absolute inset-[1px] bg-[#0a0a0a] transition-all duration-300 group-hover:bg-[#111]"
    style="border-radius: calc({borderRadius} - 1px);"
  ></div>
  
  <div 
    class="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors duration-300"
    style="border-radius: {borderRadius};"
  ></div>
  
  <div class="relative z-10">
    <slot />
  </div>
</div>
