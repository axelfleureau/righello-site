<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { browser } from '$app/environment';

  export let items: { title: string; subtitle?: string; videoSrc?: string; category?: string }[] = [];
  export let activeIndex: number = 0;
  export let open: boolean = false;

  const dispatch = createEventDispatcher();

  let currentIndex = activeIndex;
  let videoEl: HTMLVideoElement | null = null;
  let isMuted = true;
  let isPlaying = true;
  let showPlayPause = false;
  let playPauseIcon: 'play' | 'pause' = 'pause';
  let playPauseTimeout: ReturnType<typeof setTimeout>;
  let progress = 0;
  let transitioning = false;
  let transitionDirection: 'up' | 'down' = 'down';
  let dialogEl: HTMLElement;
  let closeBtn: HTMLButtonElement;
  let previousFocusedElement: HTMLElement | null = null;

  let touchStartY = 0;
  let touchDeltaY = 0;
  let isSwiping = false;

  $: currentItem = items[currentIndex];
  $: if (open) {
    currentIndex = activeIndex;
  }

  $: if (open && browser) {
    document.body.style.overflow = 'hidden';
    if (previousFocusedElement === null) {
      previousFocusedElement = document.activeElement as HTMLElement;
    }
    tick().then(() => {
      closeBtn?.focus();
    });
  }

  $: if (!open && browser) {
    document.body.style.overflow = '';
  }

  function close() {
    if (browser) document.body.style.overflow = '';
    if (previousFocusedElement) {
      previousFocusedElement.focus();
      previousFocusedElement = null;
    }
    dispatch('close');
  }

  function goTo(index: number, direction: 'up' | 'down') {
    if (index < 0 || index >= items.length) return;
    if (!items[index].videoSrc) return;

    transitionDirection = direction;
    transitioning = true;

    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
    }

    setTimeout(() => {
      currentIndex = index;
      progress = 0;
      transitioning = false;
    }, 250);
  }

  function goPrev() {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (items[i].videoSrc) {
        goTo(i, 'up');
        return;
      }
    }
  }

  function goNext() {
    for (let i = currentIndex + 1; i < items.length; i++) {
      if (items[i].videoSrc) {
        goTo(i, 'down');
        return;
      }
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return;
    switch (e.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        goPrev();
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        goNext();
        break;
      case 'Tab': {
        if (e.shiftKey && document.activeElement === closeBtn) {
          e.preventDefault();
          const focusableElements = dialogEl?.querySelectorAll(
            'button, [tabindex]:not([tabindex="-1"])'
          ) as NodeListOf<HTMLElement>;
          if (focusableElements && focusableElements.length > 0) {
            focusableElements[focusableElements.length - 1].focus();
          }
        } else if (!e.shiftKey) {
          const focusableElements = dialogEl?.querySelectorAll(
            'button, [tabindex]:not([tabindex="-1"])'
          ) as NodeListOf<HTMLElement>;
          if (focusableElements && focusableElements.length > 0) {
            const lastElement = focusableElements[focusableElements.length - 1];
            if (document.activeElement === lastElement) {
              e.preventDefault();
              closeBtn?.focus();
            }
          }
        }
        break;
      }
    }
  }

  let hasInteracted = false;

  function togglePlayPause() {
    if (!videoEl) return;

    if (!hasInteracted) {
      hasInteracted = true;
      isMuted = false;
      videoEl.muted = false;
    }

    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      isPlaying = true;
      playPauseIcon = 'play';
    } else {
      videoEl.pause();
      isPlaying = false;
      playPauseIcon = 'pause';
    }
    showPlayPause = true;
    clearTimeout(playPauseTimeout);
    playPauseTimeout = setTimeout(() => {
      showPlayPause = false;
    }, 300);
  }

  function toggleMute() {
    if (!videoEl) return;
    isMuted = !isMuted;
    videoEl.muted = isMuted;
  }

  function handleTimeUpdate() {
    if (!videoEl || !videoEl.duration) return;
    progress = (videoEl.currentTime / videoEl.duration) * 100;
  }

  function handleVideoReady() {
    if (!videoEl || !open) return;
    videoEl.muted = isMuted;
    videoEl.play().catch(() => {});
    isPlaying = true;
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0].clientY;
    touchDeltaY = 0;
    isSwiping = true;
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isSwiping) return;
    touchDeltaY = e.touches[0].clientY - touchStartY;
    if (Math.abs(touchDeltaY) > 10) {
      e.preventDefault();
    }
  }

  function handleTouchEnd() {
    if (!isSwiping) return;
    isSwiping = false;
    if (Math.abs(touchDeltaY) > 80) {
      if (touchDeltaY < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchDeltaY = 0;
  }

  let hasPrev = false;
  let hasNext = false;
  $: {
    hasPrev = false;
    hasNext = false;
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (items[i].videoSrc) { hasPrev = true; break; }
    }
    for (let i = currentIndex + 1; i < items.length; i++) {
      if (items[i].videoSrc) { hasNext = true; break; }
    }
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('keydown', handleKeydown);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
      clearTimeout(playPauseTimeout);
      previousFocusedElement = null;
    }
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
    }
  });
</script>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div
    class="reel-overlay"
    bind:this={dialogEl}
    role="dialog"
    aria-modal="true"
    aria-label="Reels viewer"
    transition:fade={{ duration: 200 }}
  >
    <div class="progress-bar">
      <div class="progress-fill" style="width: {progress}%"></div>
    </div>

    <div class="top-bar">
      <button bind:this={closeBtn} class="close-btn" on:click={close} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <span class="reels-label">Reels</span>
      <button class="mute-btn" on:click={toggleMute} aria-label={isMuted ? 'Attiva audio' : 'Disattiva audio'}>
        {#if isMuted}
          <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        {/if}
      </button>
    </div>

    <div class="reel-viewport"
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}
    >
      {#if hasPrev}
        <button class="nav-btn nav-prev" on:click={goPrev} aria-label="Previous reel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      {/if}

      {#if hasNext}
        <button class="nav-btn nav-next" on:click={goNext} aria-label="Next reel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      {/if}

      <div class="video-container" class:transitioning class:slide-up={transitionDirection === 'up'} class:slide-down={transitionDirection === 'down'}>
        {#if currentItem?.videoSrc}
          {#key currentIndex}
            <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
            <div class="video-tap-area" on:click={togglePlayPause}>
              <video
                bind:this={videoEl}
                src={currentItem.videoSrc}
                loop
                playsinline
                muted={isMuted}
                class="reel-video"
                on:loadeddata={handleVideoReady}
                on:timeupdate={handleTimeUpdate}
              >
                <track kind="captions" />
              </video>
            </div>
          {/key}
        {/if}

        {#if showPlayPause}
          <div class="play-pause-indicator" class:fading={showPlayPause}>
            {#if playPauseIcon === 'pause'}
              <svg viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            {:else}
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            {/if}
          </div>
        {/if}

        <div class="bottom-overlay">
          <div class="bottom-info">
            <div class="username-row">
              <span class="username">@righello_agency</span>
              <span class="verified-dot"></span>
            </div>
            {#if currentItem}
              <p class="caption">
                {currentItem.title}{#if currentItem.subtitle} · {currentItem.subtitle}{/if}
              </p>
              {#if currentItem.category}
                <span class="category-pill">{currentItem.category}</span>
              {/if}
            {/if}
            <div class="audio-bar">
              <span class="audio-icon">♪</span>
              <div class="marquee-wrap">
                <span class="marquee-text">Audio originale · Righello</span>
              </div>
            </div>
          </div>

          <div class="action-sidebar">
            <button class="action-btn" aria-label="Like">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span class="action-count">847</span>
            </button>
            <button class="action-btn" aria-label="Comment">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span class="action-count">32</span>
            </button>
            <button class="action-btn" aria-label="Share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
            <button class="action-btn" aria-label="Save">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <button class="action-btn" aria-label="More options">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .reel-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    touch-action: none;
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.15);
    z-index: 20;
  }

  .progress-fill {
    height: 100%;
    background: #D6487E;
    transition: width 0.1s linear;
  }

  .top-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(12px + env(safe-area-inset-top)) 12px 12px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%);
    z-index: 15;
  }

  .close-btn {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .close-btn svg {
    width: 24px;
    height: 24px;
  }

  .mute-btn {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .mute-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .mute-btn svg {
    width: 22px;
    height: 24px;
  }

  .reels-label {
    color: white;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.02em;
  }

  .reel-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .video-container {
    position: relative;
    width: 100%;
    max-width: 420px;
    aspect-ratio: 9 / 16;
    max-height: 100%;
    border-radius: 0;
    overflow: hidden;
    transform: scale(1);
    opacity: 1;
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  }

  .video-container.transitioning {
    opacity: 0;
    transform: translateY(40px);
  }

  .video-container.transitioning.slide-up {
    transform: translateY(-40px);
  }

  .video-container.transitioning.slide-down {
    transform: translateY(40px);
  }

  .video-tap-area {
    position: absolute;
    inset: 0;
    cursor: pointer;
  }

  .reel-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .play-pause-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 72px;
    height: 72px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 12;
    pointer-events: none;
    animation: fadeIndicator 0.3s ease-out forwards;
  }

  .play-pause-indicator svg {
    width: 36px;
    height: 36px;
  }

  @keyframes fadeIndicator {
    0% { opacity: 1; }
    70% { opacity: 1; }
    100% { opacity: 0; }
  }

  .bottom-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: flex-end;
    padding: 0 12px calc(16px + env(safe-area-inset-bottom)) 12px;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
    min-height: 200px;
    z-index: 10;
    pointer-events: none;
  }

  .bottom-info {
    flex: 1;
    min-width: 0;
    padding-right: 56px;
    pointer-events: auto;
  }

  .username-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
  }

  .username {
    color: white;
    font-weight: 600;
    font-size: 14px;
  }

  .verified-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #D6487E;
    flex-shrink: 0;
  }

  .caption {
    color: white;
    font-size: 13px;
    line-height: 1.4;
    margin: 0 0 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .category-pill {
    display: inline-block;
    padding: 3px 10px;
    font-size: 11px;
    color: white;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 9999px;
    margin-bottom: 10px;
  }

  .audio-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .audio-icon {
    color: white;
    font-size: 12px;
    flex-shrink: 0;
  }

  .marquee-wrap {
    overflow: hidden;
    flex: 1;
    min-width: 0;
  }

  .marquee-text {
    display: inline-block;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
    animation: marqueeScroll 8s linear infinite;
  }

  @keyframes marqueeScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .action-sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding-bottom: 8px;
    pointer-events: auto;
  }

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    min-width: 44px;
    min-height: 44px;
    justify-content: center;
  }

  .action-btn svg {
    width: 26px;
    height: 26px;
  }

  .action-count {
    font-size: 11px;
    color: white;
    font-weight: 500;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    z-index: 15;
    transition: background 0.2s;
  }

  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .nav-btn svg {
    width: 24px;
    height: 24px;
  }

  .nav-prev {
    left: 12px;
  }

  .nav-next {
    right: 12px;
  }

  @media (max-width: 480px) {
    .video-container {
      max-width: 100%;
      width: 100%;
      height: 100%;
      aspect-ratio: auto;
      border-radius: 0;
    }

    .nav-btn {
      display: none;
    }
  }

  @media (min-width: 481px) {
    .video-container {
      border-radius: 12px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .video-container {
      transition: none;
    }

    .play-pause-indicator {
      animation: none;
    }

    .marquee-text {
      animation: none;
    }

    .video-container.transitioning {
      opacity: 0;
      transform: none;
    }
  }
</style>
