<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let dotX = 0;
  let dotY = 0;
  let ringX = 0;
  let ringY = 0;
  let isHovering = false;
  let isClicking = false;
  let isVisible = false;
  let shouldRender = false;
  let prefersReducedMotion = false;
  let rafId: number;

  const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-hover';
  const RING_LERP = 0.15;

  function handleMouseMove(e: MouseEvent) {
    dotX = e.clientX;
    dotY = e.clientY;
    if (!isVisible) isVisible = true;
  }

  function handleMouseDown() {
    isClicking = true;
    setTimeout(() => { isClicking = false; }, 150);
  }

  function handleMouseOver(e: MouseEvent) {
    const related = e.relatedTarget as HTMLElement | null;
    const target = e.target as HTMLElement;
    if (target?.closest(INTERACTIVE_SELECTOR) && !related?.closest(INTERACTIVE_SELECTOR)) {
      isHovering = true;
    }
  }

  function handleMouseOut(e: MouseEvent) {
    const related = e.relatedTarget as HTMLElement | null;
    const target = e.target as HTMLElement;
    if (target?.closest(INTERACTIVE_SELECTOR) && !related?.closest(INTERACTIVE_SELECTOR)) {
      isHovering = false;
    }
  }

  function handleMouseLeave() {
    isVisible = false;
  }

  function handleMouseEnter() {
    isVisible = true;
  }

  function animate() {
    ringX += (dotX - ringX) * RING_LERP;
    ringY += (dotY - ringY) * RING_LERP;
    rafId = requestAnimationFrame(animate);
  }

  onMount(() => {
    if (!browser) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.body.style.cursor = 'crosshair';
      return;
    }

    shouldRender = true;
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    rafId = requestAnimationFrame(animate);
  });

  onDestroy(() => {
    if (!browser) return;

    if (prefersReducedMotion) {
      document.body.style.cursor = '';
      return;
    }

    document.body.style.cursor = '';
    document.documentElement.style.cursor = '';

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    document.documentElement.removeEventListener('mouseenter', handleMouseEnter);

    if (rafId) cancelAnimationFrame(rafId);
  });
</script>

{#if shouldRender}
  <div
    class="cursor-dot"
    class:hidden={!isVisible}
    style="transform: translate({dotX}px, {dotY}px) scale({isHovering ? 0 : isClicking ? 0.6 : 1}); opacity: {isHovering ? 0 : 1};"
  ></div>
  <div
    class="cursor-ring"
    class:hovering={isHovering}
    class:clicking={isClicking}
    class:hidden={!isVisible}
    style="transform: translate({ringX}px, {ringY}px);"
  ></div>
{/if}

<style>
  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
  }

  .cursor-dot {
    width: 8px;
    height: 8px;
    margin-left: -4px;
    margin-top: -4px;
    background: #D6487E;
    border-radius: 50%;
    transition: opacity 0.15s ease;
  }

  .cursor-ring {
    width: 36px;
    height: 36px;
    margin-left: -18px;
    margin-top: -18px;
    border: 1.5px solid rgba(214, 72, 126, 0.5);
    border-radius: 50%;
    transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                height 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                margin 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                border-color 0.3s ease,
                opacity 0.2s ease;
  }

  .cursor-ring.hovering {
    width: 54px;
    height: 54px;
    margin-left: -27px;
    margin-top: -27px;
    border-color: rgba(214, 72, 126, 0.8);
  }

  .cursor-ring.clicking {
    width: 30px;
    height: 30px;
    margin-left: -15px;
    margin-top: -15px;
    border-color: rgba(214, 72, 126, 0.9);
  }

  .hidden {
    opacity: 0;
  }

  :global([id*="iubenda"], [id*="iubenda"] *,
          [class*="iubenda"], [class*="iubenda"] *) {
    cursor: auto !important;
  }

  :global([id*="iubenda"] a,
          [id*="iubenda"] button,
          [id*="iubenda"] [role="button"],
          [class*="iubenda"] a,
          [class*="iubenda"] button,
          [class*="iubenda"] [role="button"]) {
    cursor: pointer !important;
  }
</style>
