<script lang="ts">
  import { onMount } from 'svelte';
  
  let rulerEl: HTMLDivElement;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  let rotation = -5;
  let prefersReducedMotion = false;
  
  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  
  function handleMouseDown(e: MouseEvent) {
    if (prefersReducedMotion) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    rulerEl.style.zIndex = '100';
    rulerEl.style.cursor = 'grabbing';
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    translateX = dx;
    translateY = dy;
    rotation = -5 + (dx * 0.02);
  }
  
  function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    rulerEl.style.zIndex = '';
    rulerEl.style.cursor = 'grab';
  }
  
  function handleTouchStart(e: TouchEvent) {
    if (prefersReducedMotion) return;
    const touch = e.touches[0];
    isDragging = true;
    startX = touch.clientX - translateX;
    startY = touch.clientY - translateY;
    rulerEl.style.zIndex = '100';
  }
  
  function handleTouchMove(e: TouchEvent) {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    translateX = dx;
    translateY = dy;
    rotation = -5 + (dx * 0.02);
  }
  
  function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    rulerEl.style.zIndex = '';
  }
</script>

<svelte:window 
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
/>

<div
  bind:this={rulerEl}
  class="draggable-ruler relative select-none cursor-grab {isDragging ? 'scale-105' : ''}"
  style="transform: translate({translateX}px, {translateY}px) rotate({rotation}deg); transition: {isDragging ? 'none' : 'transform 0.3s ease'};"
  on:mousedown={handleMouseDown}
  on:touchstart={handleTouchStart}
  aria-hidden="true"
>
  <div class="flex items-center">
    <div class="w-48 md:w-64 h-10 md:h-12 bg-gradient-to-r from-righello-pink to-righello-pink-light rounded-lg shadow-lg flex items-center px-3 relative overflow-hidden">
      <div class="absolute inset-0 flex items-end justify-between px-2 opacity-40">
        {#each Array(24) as _, i}
          <div class="w-px h-{i % 5 === 0 ? '4' : '2'} bg-white"></div>
        {/each}
      </div>
      <span class="text-white font-bold text-sm md:text-base relative z-10">Righello</span>
      <span class="text-white/80 text-xs ml-auto relative z-10">Creative Lab</span>
    </div>
    
    <div class="ml-2 text-xs text-gray-400 italic whitespace-nowrap">← trascinami!</div>
  </div>
</div>
