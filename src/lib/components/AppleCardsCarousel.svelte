<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { getThumbnailUrl, getYoutubeThumbnailUrl } from '$lib/data/thumbnail-map';
  import ReelViewer from './ReelViewer.svelte';

  export let title = '';
  export let useReelViewer = false;
  export let items: {
    title: string;
    subtitle?: string;
    videoSrc?: string;
    youtubeId?: string;
    imageSrc?: string;
    posterSrc?: string;
    category?: string;
    isCta?: boolean;
    ctaHref?: string;
    ctaLabel?: string;
  }[] = [];
  
  let container: HTMLElement;
  let isDragging = false;
  let wasDragged = false;
  let startX = 0;
  let scrollLeft = 0;
  let activeVideo: HTMLVideoElement | null = null;
  let lightboxOpen = false;
  let lightboxVideo: string | null = null;
  let lightboxYoutubeId: string | null = null;
  let lightboxTitle = '';
  let reelViewerOpen = false;
  let reelViewerIndex = 0;
  
  $: reelItems = items.filter(i => (i.videoSrc || i.youtubeId) && !i.isCta);
  
  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    wasDragged = false;
    container.style.cursor = 'grabbing';
    container.style.scrollSnapType = 'none';
    container.dataset.dragging = 'true';
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) wasDragged = true;
    container.scrollLeft = scrollLeft - walk;
  }
  
  function handleMouseUp() {
    isDragging = false;
    container.style.cursor = 'grab';
    container.style.scrollSnapType = '';
    delete container.dataset.dragging;
  }
  
  function handleMouseLeave() {
    isDragging = false;
    container.style.cursor = 'grab';
    container.style.scrollSnapType = '';
    delete container.dataset.dragging;
  }
  
  function handleVideoHover(e: MouseEvent, video: HTMLVideoElement | null) {
    if (video && video !== activeVideo) {
      if (activeVideo) {
        activeVideo.pause();
        activeVideo.currentTime = 0;
      }
      activeVideo = video;
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }
  
  function handleVideoLeave(video: HTMLVideoElement | null) {
    if (video) {
      video.pause();
      video.currentTime = 0.1;
    }
    if (video === activeVideo) {
      activeVideo = null;
    }
  }
  
  function openLightbox(item: { title: string; videoSrc?: string; youtubeId?: string }) {
    lightboxYoutubeId = item.youtubeId ?? null;
    lightboxVideo = item.youtubeId ? null : (item.videoSrc ?? null);
    lightboxTitle = item.title;
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightboxOpen = false;
    lightboxVideo = null;
    lightboxYoutubeId = null;
    lightboxTitle = '';
    document.body.style.overflow = '';
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && lightboxOpen) {
      closeLightbox();
    }
  }
  
  let touchStartX = 0;
  let touchScrollLeft = 0;
  let isTouching = false;
  
  function handleTouchStart(e: TouchEvent) {
    isTouching = true;
    wasDragged = false;
    touchStartX = e.touches[0].pageX;
    container.style.scrollSnapType = 'none';
  }
  
  function handleTouchMove(e: TouchEvent) {
    if (!isTouching) return;
    const dx = Math.abs(e.touches[0].pageX - touchStartX);
    if (dx > 10) {
      wasDragged = true;
    }
  }
  
  function handleTouchEnd() {
    isTouching = false;
    container.style.scrollSnapType = '';
  }

  function handleTouchCancel() {
    isTouching = false;
    container.style.scrollSnapType = '';
  }
  
  function handleCardClick(item: { title: string; videoSrc?: string; youtubeId?: string }, itemIndex?: number) {
    if (wasDragged || isDragging) return;
    if (!item.videoSrc && !item.youtubeId) return;
    
    if (useReelViewer) {
      const reelIdx = reelItems.findIndex(i => (i.youtubeId && i.youtubeId === item.youtubeId) || (i.videoSrc && i.videoSrc === item.videoSrc));
      reelViewerIndex = reelIdx >= 0 ? reelIdx : 0;
      reelViewerOpen = true;
    } else {
      openLightbox(item);
    }
  }
  
  function closeReelViewer() {
    reelViewerOpen = false;
  }
  
  let videoRefs: (HTMLVideoElement | null)[] = items.map(() => null);
  let videoLoaded: boolean[] = items.map(() => false);


  function handleVideoLoaded(index: number) {
    videoLoaded[index] = true;
    videoLoaded = [...videoLoaded];
  }

  function handleVideoError(index: number) {
    videoLoaded[index] = true;
    videoLoaded = [...videoLoaded];
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  });
</script>

<div class="carousel-section">
  {#if title}
    <h2 class="carousel-title">{title}</h2>
  {/if}
  
  <div 
    bind:this={container}
    class="carousel-container"
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}
    on:mouseup={handleMouseUp}
    on:mouseleave={handleMouseLeave}
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
    on:touchcancel={handleTouchCancel}
    role="list"
  >
    {#each items as item, i}
      <div 
        class="carousel-card"
        style="--index: {i}"
        role="listitem"
      >
        <div 
          class="card-content"
          on:mouseenter={(e) => {
            const video = e.currentTarget.querySelector('video');
            handleVideoHover(e, video);
          }}
          on:mouseleave={() => {
            const card = container?.querySelectorAll('.card-content')[i];
            const video = card?.querySelector('video');
            handleVideoLeave(video);
          }}
        >
          {#if item.isCta}
            <div class="cta-card-inner">
              <div class="cta-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <h3 class="cta-card-title">{item.title}</h3>
              {#if item.subtitle}
                <p class="cta-card-subtitle">{item.subtitle}</p>
              {/if}
              {#if item.ctaHref}
                <a href={item.ctaHref} class="cta-card-btn">
                  {item.ctaLabel || 'Scopri di più'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cta-card-arrow"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              {/if}
            </div>
          {:else if item.youtubeId || item.videoSrc}
            <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
            <div class="video-wrapper" on:click={() => handleCardClick(item)}>
              <img
                src={item.youtubeId ? getYoutubeThumbnailUrl(item.youtubeId) : getThumbnailUrl(item.videoSrc || '')}
                alt={item.title}
                class="card-media card-poster"
                loading="lazy"
                decoding="async"
                on:error={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.add('thumb-fallback--visible'); }}
              />
              <div class="thumb-fallback">
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M8 5v14l11-7z"/></svg>
              </div>
              {#if item.videoSrc && !item.youtubeId}
                <video 
                  bind:this={videoRefs[i]}
                  class="card-media card-video-native"
                  class:video-ready={videoLoaded[i]}
                  src={item.videoSrc}
                  muted
                  loop
                  playsinline
                  preload="none"
                  on:canplay={() => handleVideoLoaded(i)}
                  on:error={() => handleVideoError(i)}
                >
                  <track kind="captions" />
                </video>
              {/if}
            </div>
            <button 
              class="play-btn-float"
              on:click|stopPropagation={() => handleCardClick(item)}
              aria-label="Play video fullscreen"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          {:else if item.imageSrc}
            <img 
              src={item.imageSrc} 
              alt={item.title}
              class="card-media"
              loading="lazy"
            />
          {:else}
            <div class="card-placeholder">
              <div class="placeholder-gradient"></div>
            </div>
          {/if}
          
          {#if !item.isCta}
          <div class="card-overlay">
            {#if item.category}
              <span class="card-category">{item.category}</span>
            {/if}
            <h3 class="card-title">{item.title}</h3>
            {#if item.subtitle}
              <p class="card-subtitle">{item.subtitle}</p>
            {/if}
          </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

{#if lightboxOpen && (lightboxVideo || lightboxYoutubeId)}
  <div 
    class="lightbox"
    on:click={closeLightbox}
    role="dialog"
    aria-modal="true"
    aria-label={lightboxTitle}
  >
    <button 
      class="lightbox-close"
      on:click={closeLightbox}
      aria-label="Close"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
    
    <div class="lightbox-content" on:click|stopPropagation>
      {#if lightboxYoutubeId}
        <iframe
          src="https://www.youtube.com/embed/{lightboxYoutubeId}?autoplay=1&rel=0"
          class="lightbox-video"
          allow="autoplay; fullscreen"
          allowfullscreen
          title={lightboxTitle}
        ></iframe>
      {:else}
        <video 
          src={lightboxVideo}
          autoplay
          controls
          playsinline
          class="lightbox-video"
        >
          <track kind="captions" />
        </video>
      {/if}
      <h3 class="lightbox-title">{lightboxTitle}</h3>
    </div>
  </div>
{/if}

{#if useReelViewer}
  <ReelViewer 
    items={reelItems} 
    activeIndex={reelViewerIndex} 
    open={reelViewerOpen} 
    on:close={closeReelViewer} 
  />
{/if}

<style>
  .carousel-section {
    width: 100%;
    overflow: hidden;
  }
  
  .carousel-title {
    font-size: clamp(1.75rem, 4vw, 3rem);
    font-weight: 700;
    color: var(--text-primary);
    padding: 0 var(--container-padding);
    margin-bottom: 1.5rem;
  }

  @media (min-width: 640px) {
    .carousel-title {
      padding-left: var(--space-lg);
      padding-right: var(--space-lg);
    }
  }
  
  .carousel-container {
    display: flex;
    gap: 1.25rem;
    padding: 1rem var(--container-padding) 2rem;
    overflow-x: auto;
    overflow-y: hidden;
    cursor: grab;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
    touch-action: pan-x;
    overscroll-behavior-x: contain;
  }

  @media (min-width: 640px) {
    .carousel-container {
      padding-left: var(--space-lg);
      padding-right: var(--space-lg);
    }
  }
  
  .carousel-container::-webkit-scrollbar {
    display: none;
  }
  
  .carousel-card {
    flex-shrink: 0;
    width: 280px;
    scroll-snap-align: start;
    animation: cardEnter 0.6s ease-out calc(var(--index) * 0.1s) backwards;
  }
  
  @media (min-width: 640px) {
    .carousel-card {
      width: 300px;
    }
  }
  
  @media (min-width: 1024px) {
    .carousel-card {
      width: 320px;
    }
  }
  
  @keyframes cardEnter {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  
  .card-content {
    position: relative;
    width: 100%;
    aspect-ratio: 9/16;
    border-radius: 1.25rem;
    overflow: hidden;
    background: var(--bg-tertiary);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease;
  }
  
  .card-content:hover {
    will-change: transform;
    transform: translate3d(0, -10px, 0) scale(1.02);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(214, 72, 126, 0.2);
  }

  /* Disable hover lift while drag-scrolling to prevent flicker */
  .carousel-container[data-dragging] .card-content:hover {
    transform: none;
    box-shadow: none;
    will-change: auto;
  }
  
  .video-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    touch-action: pan-x pan-y;
  }
  
  .card-poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .thumb-fallback {
    display: none;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    align-items: center;
    justify-content: center;
    z-index: 0;
    color: rgba(255, 255, 255, 0.3);
  }

  :global(.thumb-fallback--visible) {
    display: flex !important;
  }
  
  .card-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease, opacity 0.3s ease;
    z-index: 2;
    opacity: 1;
  }
  
  .card-video-native {
    opacity: 0;
    z-index: 2;
    transition: opacity 0.4s ease;
    pointer-events: none;
    touch-action: pan-x pan-y;
  }

  .card-video-native.video-ready {
    opacity: 1;
  }

  .card-placeholder {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .placeholder-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #D6487E 0%, #a855f7 50%, #06B6D4 100%);
    background-size: 200% 200%;
    animation: gradientMove 4s ease infinite;
  }
  
  @keyframes gradientMove {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .play-btn-float {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    width: 40px;
    height: 40px;
    background: rgba(214, 72, 126, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: none;
    cursor: pointer;
    z-index: 6;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 15px rgba(214, 72, 126, 0.3);
  }

  .play-btn-float svg {
    width: 18px;
    height: 18px;
    margin-left: 2px;
  }

  .play-btn-float:hover {
    transform: scale(1.15);
    box-shadow: 0 8px 25px rgba(214, 72, 126, 0.5);
  }

  .card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5rem 1rem 1rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 40%, transparent 100%);
    pointer-events: none;
    z-index: 5;
  }
  
  .card-category {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: white;
    background: rgba(214, 72, 126, 0.8);
    border-radius: 9999px;
    margin-bottom: 0.5rem;
  }
  
  .card-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: white;
    line-height: 1.3;
    margin-bottom: 0.25rem;
  }
  
  .card-subtitle {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.4;
  }
  
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .lightbox-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    transition: all 0.2s ease;
    z-index: 10;
  }
  
  .lightbox-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
  
  .lightbox-close svg {
    width: 24px;
    height: 24px;
  }
  
  .lightbox-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    max-height: 100%;
  }
  
  .lightbox-video {
    max-width: min(400px, 90vw);
    max-height: 80vh;
    border-radius: 1rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  
  .lightbox-title {
    margin-top: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    text-align: center;
  }

  .cta-card-inner {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 1.5rem;
    background: linear-gradient(160deg, rgba(214, 72, 126, 0.12) 0%, rgba(20, 20, 20, 0.95) 60%);
    border: 1px solid rgba(214, 72, 126, 0.25);
    border-radius: inherit;
    gap: 1rem;
  }

  .cta-card-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 2px solid rgba(214, 72, 126, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ctaPulse 2.5s ease-in-out infinite;
  }

  .cta-card-icon svg {
    width: 28px;
    height: 28px;
    color: #D6487E;
  }

  @keyframes ctaPulse {
    0%, 100% { transform: scale(1); border-color: rgba(214, 72, 126, 0.4); }
    50% { transform: scale(1.08); border-color: rgba(214, 72, 126, 0.7); }
  }

  .cta-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    line-height: 1.3;
  }

  .cta-card-subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary, #999);
    line-height: 1.5;
    max-width: 180px;
  }

  .cta-card-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.5rem;
    padding: 0.5rem 1.25rem;
    border-radius: 2rem;
    border: 1px solid rgba(214, 72, 126, 0.4);
    color: #D6487E;
    font-size: 0.8125rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .cta-card-btn:hover {
    background: rgba(214, 72, 126, 0.15);
    border-color: rgba(214, 72, 126, 0.7);
  }

  .cta-card-arrow {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  .cta-card-btn:hover .cta-card-arrow {
    transform: translateX(3px);
  }
</style>
