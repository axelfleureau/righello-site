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
  class="glow-card relative group cursor-pointer {$$restProps.class || ''}"
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="article"
  style="border-radius: {borderRadius};"
>
  <div 
    class="glow-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    style="
      background: radial-gradient(600px circle at {glowX}px {glowY}px, {glowColor}, transparent 40%);
      border-radius: {borderRadius};
    "
  ></div>
  
  <div 
    class="glow-card-bg absolute inset-[1px] transition-all duration-300"
    style="border-radius: calc({borderRadius} - 1px);"
  ></div>
  
  <div 
    class="glow-card-border absolute inset-0 transition-colors duration-300"
    style="border-radius: {borderRadius};"
  ></div>
  
  <div class="relative z-10">
    <slot />
  </div>
</div>

<style>
  .glow-card {
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  .glow-card:hover {
    transform: translateY(-4px);
  }
  
  .glow-card-bg {
    background: #0a0a0a;
  }
  
  .glow-card:hover .glow-card-bg {
    background: #111;
  }
  
  .glow-card-border {
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .glow-card:hover .glow-card-border {
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  :global([data-theme="light"]) .glow-card-bg {
    background: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }
  
  :global([data-theme="light"]) .glow-card:hover .glow-card-bg {
    background: #fafafa;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="light"]) .glow-card-border {
    border-color: rgba(0, 0, 0, 0.08);
  }
  
  :global([data-theme="light"]) .glow-card:hover .glow-card-border {
    border-color: rgba(214, 72, 126, 0.3);
  }
  
  :global([data-theme="light"]) .glow-effect {
    opacity: 0.5;
  }
</style>
