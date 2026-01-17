<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { Confetti } from 'svelte-confetti';
  
  interface TimelineItem {
    name: string;
    color: string;
    offset?: number;
  }
  
  interface TimelinePhase {
    name: string;
    color: string;
    items: TimelineItem[];
  }
  
  export let phases: TimelinePhase[] = [];
  
  let containerEl: HTMLDivElement;
  let trackEl: HTMLDivElement;
  let prefersReducedMotion = false;
  let mounted = false;
  
  let isDragging = false;
  let needlePosition = 0;
  let trackWidth = 0;
  let trackLeft = 0;
  
  let showConfetti = false;
  let confettiTriggered = false;
  
  $: {
    if (needlePosition >= 95 && !confettiTriggered) {
      showConfetti = true;
      confettiTriggered = true;
      setTimeout(() => {
        showConfetti = false;
      }, 3000);
    }
    if (needlePosition < 90) {
      confettiTriggered = false;
    }
  }
  
  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    mounted = true;
    
    setTimeout(updateTrackBounds, 100);
    
    const resizeObserver = new ResizeObserver(updateTrackBounds);
    if (trackEl) resizeObserver.observe(trackEl);
    
    return () => resizeObserver.disconnect();
  });
  
  function updateTrackBounds() {
    if (!trackEl || !browser) return;
    const rect = trackEl.getBoundingClientRect();
    trackLeft = rect.left;
    trackWidth = rect.width;
  }
  
  function handleMouseDown(e: MouseEvent) {
    if (prefersReducedMotion) return;
    e.preventDefault();
    isDragging = true;
    updateNeedlePosition(e.clientX);
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    updateNeedlePosition(e.clientX);
  }
  
  function handleMouseUp() {
    isDragging = false;
  }
  
  function handleTouchStart(e: TouchEvent) {
    if (prefersReducedMotion) return;
    isDragging = true;
    updateNeedlePosition(e.touches[0].clientX);
  }
  
  function handleTouchMove(e: TouchEvent) {
    if (!isDragging) return;
    updateNeedlePosition(e.touches[0].clientX);
  }
  
  function handleTouchEnd() {
    isDragging = false;
  }
  
  function handleKeyDown(e: KeyboardEvent) {
    const step = 5;
    if (e.key === 'ArrowLeft') {
      needlePosition = Math.max(0, needlePosition - step);
    } else if (e.key === 'ArrowRight') {
      needlePosition = Math.min(100, needlePosition + step);
    }
  }
  
  function updateNeedlePosition(clientX: number) {
    if (trackWidth === 0) return;
    const relativeX = clientX - trackLeft;
    const percentage = (relativeX / trackWidth) * 100;
    needlePosition = Math.max(0, Math.min(100, percentage));
  }
  
  function getItemColor(item: TimelineItem): string {
    if (item.color.includes('righello-pink')) return '#D6487E';
    if (item.color.includes('orange-500')) return '#f97316';
    if (item.color.includes('orange-400')) return '#fb923c';
    if (item.color.includes('purple-600')) return '#9333ea';
    if (item.color.includes('purple-500')) return '#a855f7';
    if (item.color.includes('green-600')) return '#16a34a';
    if (item.color.includes('green-500')) return '#22c55e';
    if (item.color.includes('blue-600')) return '#2563eb';
    if (item.color.includes('blue-500')) return '#3b82f6';
    if (item.color.includes('cyan-600')) return '#0891b2';
    if (item.color.includes('cyan-500')) return '#06b6d4';
    if (item.color.includes('gray-800')) return '#1f2937';
    if (item.color.includes('gray-700')) return '#374151';
    if (item.color.includes('gray-600')) return '#4b5563';
    if (item.color.includes('gray-500')) return '#6b7280';
    if (item.color.includes('gray-400')) return '#9ca3af';
    if (item.color.includes('gray-900')) return '#111827';
    if (item.color.includes('black')) return '#000000';
    return '#1f2937';
  }
  
  function isItemRevealed(itemOffset: number): boolean {
    return needlePosition >= itemOffset;
  }
</script>

<svelte:window 
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
  on:resize={updateTrackBounds}
/>

<div class="relative" bind:this={containerEl}>
  {#if showConfetti}
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <Confetti 
        x={[-0.5, 0.5]} 
        y={[0.25, 1]}
        delay={[0, 50]}
        duration={2000}
        amount={200}
        fallDistance="100vh"
        colorArray={['#D6487E', '#f97316', '#9333ea', '#16a34a', '#2563eb', '#ffffff']}
      />
    </div>
  {/if}

  <div bind:this={trackEl} class="relative py-8">
    {#each phases as phase, phaseIndex}
      <div class="flex items-start py-6 border-b" style="border-color: var(--border-color);">
        <div class="w-32 md:w-40 flex-shrink-0 pr-4">
          <h3 class="text-base md:text-lg font-bold" style="color: var(--text-primary);">
            {phase.name}
          </h3>
        </div>
        
        <div class="flex-1 relative min-h-[80px]">
          <div class="flex flex-wrap items-start gap-x-3 gap-y-3">
            {#each phase.items as item, itemIndex}
              {@const itemColor = getItemColor(item)}
              {@const offset = item.offset ?? (itemIndex * (80 / phase.items.length) + 5)}
              {@const revealed = isItemRevealed(offset)}
              {@const marginTop = (itemIndex % 2 === 1) ? '32px' : '0px'}
              
              <div
                class="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
                style="
                  background: {revealed ? itemColor : 'var(--bg-secondary)'};
                  color: {revealed ? '#ffffff' : 'var(--text-muted)'};
                  box-shadow: {revealed ? `0 4px 12px ${itemColor}30` : 'none'};
                  margin-top: {marginTop};
                  border: 2px solid {revealed ? itemColor : 'var(--border-color)'};
                "
              >
                {item.name}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
    
    {#if mounted}
      <div 
        class="absolute top-0 bottom-0 z-20 flex flex-col items-center cursor-ew-resize pointer-events-auto"
        style="left: {needlePosition}%;"
        on:mousedown={handleMouseDown}
        on:touchstart={handleTouchStart}
        on:keydown={handleKeyDown}
        role="slider"
        aria-label="Trascina per esplorare le fasi del progetto"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(needlePosition)}
        tabindex="0"
      >
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-grab active:cursor-grabbing z-30"
          style="background: linear-gradient(135deg, #D6487E 0%, #f97316 100%); border: 3px solid white;"
          class:scale-110={isDragging}
        >
          <span class="text-xl select-none">📐</span>
        </div>
        <div class="w-0.5 flex-1" style="background: linear-gradient(180deg, #D6487E 0%, #f97316 50%, #9333ea 100%);"></div>
      </div>
    {/if}
  </div>
  
  <div class="mt-6 flex items-center justify-center gap-3">
    <div class="flex items-center gap-2 text-sm" style="color: var(--text-muted);">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18M17 8l4 4m0 0l-4 4" />
      </svg>
      <span class="italic">Trascina il righello per scoprire il nostro processo</span>
    </div>
  </div>
  
  {#if needlePosition >= 95}
    <div class="mt-6 text-center animate-bounce">
      <span class="text-2xl">🎉</span>
      <p class="text-sm font-medium mt-2" style="color: var(--text-primary);">
        Progetto completato con successo!
      </p>
    </div>
  {/if}
</div>

<style>
  [role="slider"] {
    touch-action: none;
    transform: translateX(-50%);
  }
  
  @media (prefers-reduced-motion: reduce) {
    [role="slider"],
    div {
      transition: none !important;
      animation: none !important;
    }
  }
</style>
