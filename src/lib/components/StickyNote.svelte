<script lang="ts">
  import { onMount } from 'svelte';
  
  export let variant: 'pink' | 'black' | 'white' = 'pink';
  export let rotation: number = 0;
  export let draggable: boolean = true;
  
  let noteEl: HTMLDivElement;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  let currentRotation = rotation;
  let prefersReducedMotion = false;
  
  const variants = {
    pink: 'bg-righello-pink text-white',
    black: 'bg-black text-white',
    white: 'bg-white text-black border border-gray-200'
  };
  
  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    currentRotation = rotation + (Math.random() - 0.5) * 4;
  });
  
  function handleMouseDown(e: MouseEvent) {
    if (!draggable || prefersReducedMotion) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    noteEl.style.zIndex = '100';
    noteEl.style.cursor = 'grabbing';
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
  }
  
  function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    noteEl.style.zIndex = '';
    noteEl.style.cursor = 'grab';
  }
  
  function handleTouchStart(e: TouchEvent) {
    if (!draggable || prefersReducedMotion) return;
    const touch = e.touches[0];
    isDragging = true;
    startX = touch.clientX - translateX;
    startY = touch.clientY - translateY;
    noteEl.style.zIndex = '100';
  }
  
  function handleTouchMove(e: TouchEvent) {
    if (!isDragging) return;
    const touch = e.touches[0];
    translateX = touch.clientX - startX;
    translateY = touch.clientY - startY;
  }
  
  function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    noteEl.style.zIndex = '';
  }
</script>

<svelte:window 
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
/>

<div
  bind:this={noteEl}
  class="sticky-note inline-block px-4 py-2 rounded-lg font-medium shadow-md select-none {variants[variant]} {draggable ? 'cursor-grab' : ''} {isDragging ? 'scale-105' : ''}"
  style="transform: translate({translateX}px, {translateY}px) rotate({currentRotation}deg); transition: {isDragging ? 'none' : 'transform 0.3s ease, box-shadow 0.2s ease'};"
  on:mousedown={handleMouseDown}
  on:touchstart={handleTouchStart}
  aria-hidden="true"
>
  <slot />
</div>

<style>
  .sticky-note:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
</style>
