<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import RevealOnScroll from './RevealOnScroll.svelte';
  import { getThumbnailUrl, getYoutubeThumbnailUrl } from '$lib/data/thumbnail-map';
  
  export let title = "Creiamo esperienze memorabili";
  export let subtitle = "Video Production";
  export let description = "Video istituzionali, contenuti dimostrativi e proof of work per raccontare il tuo brand";
  
  interface VideoItem {
    title: string;
    subtitle: string;
    videoSrc?: string;
    youtubeId?: string;
    posterSrc?: string;
    category: string;
  }
  
  export let items: VideoItem[] = [
    {
      title: 'Quinto della Luna',
      subtitle: 'Azienda agricola',
      category: 'Agricoltura',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/quintodellaluna%201.mov?alt=media&token=9d2fea38-515a-44ee-b9d5-006fefdb7ada'
    },
    {
      title: 'Geom. Mauro Poles',
      subtitle: 'Video Showcase',
      category: 'Corporate',
      youtubeId: 'vBgqFc_Dls8'
    },
    {
      title: 'Living Door',
      subtitle: 'Capannone industriale',
      category: 'Industrial',
      youtubeId: 'b5WBbuzS5lM'
    },
    {
      title: 'Riviera Resort Hotel',
      subtitle: 'Lignano Sabbiadoro',
      category: 'Hospitality',
      youtubeId: '2rS-ZnjuBjo'
    },
    {
      title: 'Hotel Miramare',
      subtitle: 'Lignano Sabbiadoro',
      category: 'Hospitality',
      youtubeId: 'rpXZDOoJzqU'
    },
    {
      title: 'Zanutta',
      subtitle: 'Proof of Work',
      category: 'Corporate',
      youtubeId: 'Xz2G9BqWI50'
    }
  ];
  
  let container: HTMLElement;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let activeVideo: HTMLVideoElement | null = null;
  let lightboxOpen = false;
  let lightboxVideo: string | null = null;
  let lightboxYoutubeId: string | null = null;
  let lightboxTitle = '';
  let loadedFrames: boolean[] = items.map(() => false);

  function markFrameLoaded(index: number) {
    if (!loadedFrames[index]) {
      loadedFrames[index] = true;
      loadedFrames = [...loadedFrames];
    }
  }

  function handleCanPlay(index: number, video: HTMLVideoElement) {
    markFrameLoaded(index);
  }
  
  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
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
  
  function openLightbox(item: VideoItem) {
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
  
  function handleContainerKeydown(e: KeyboardEvent) {
    if (!container) return;
    const scrollAmount = 350;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
  
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDragDirection: 'horizontal' | 'vertical' | null = null;
  let hasTouchDragged = false;
  
  // Touch handlers: browser handles both pan-x (carousel) and pan-y (page scroll)
  // natively via `touch-action: pan-x pan-y`. We only track drag distance here
  // to distinguish a tap (open lightbox) from a swipe (scroll).
  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].pageX;
    touchStartY = e.touches[0].pageY;
    touchDragDirection = null;
    hasTouchDragged = false;
  }
  
  function handleTouchEnd() {
    touchDragDirection = null;
  }

  function handleTouchMove(e: TouchEvent) {
    const dx = e.touches[0].pageX - touchStartX;
    const dy = e.touches[0].pageY - touchStartY;
    if (touchDragDirection === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      touchDragDirection = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
    }
    if (touchDragDirection === 'horizontal' && Math.abs(dx) > 8) {
      hasTouchDragged = true;
    }
    // No e.preventDefault() — browser handles scroll natively via touch-action
  }
  
  function handleWheel(e: WheelEvent) {
    if (!container) return;
    // If the user is already scrolling horizontally (trackpad), let it through
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    // At the boundaries, allow the page to scroll normally
    const atStart = container.scrollLeft <= 0;
    const atEnd = container.scrollLeft >= maxScroll - 1;
    if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return;
    e.preventDefault();
    container.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('keydown', handleKeydown);
      container?.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        window.removeEventListener('keydown', handleKeydown);
        container?.removeEventListener('wheel', handleWheel);
      };
    }
  });
</script>

<section class="section-padding overflow-hidden" style="padding-bottom: 1.5rem;" aria-labelledby="horizontal-video-title">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <header class="section-header hvs-header">
        <p class="section-subtitle">{subtitle}</p>
        <h2 id="horizontal-video-title" class="section-title-highlight mb-4">
          <span class="highlight-box">{title}</span>
        </h2>
        <p class="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
          {description}
        </p>
      </header>
    </RevealOnScroll>
  </div>
  
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
    on:touchcancel={handleTouchEnd}
    on:keydown={handleContainerKeydown}
    tabindex="0"
    role="list"
    aria-label="Carousel video orizzontali - usa le frecce sinistra/destra per navigare"
  >
    {#each items as item, i}
      <article 
        class="carousel-card"
        style="--index: {i}"
        role="listitem"
      >
        <div 
          class="card-content"
          on:mouseenter={(e) => {
            const video = e.currentTarget.querySelector('video');
            if (video) handleVideoHover(e, video);
          }}
          on:mouseleave={() => {
            const card = container?.querySelectorAll('.card-content')[i];
            const video = card?.querySelector('video');
            if (video) handleVideoLeave(video);
          }}
        >
          {#if item.youtubeId || item.videoSrc}
            <div class="video-wrapper">
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
                  class="card-media card-video-layer"
                  class:video-playing={loadedFrames[i]}
                  src={item.videoSrc}
                  muted
                  loop
                  playsinline
                  preload="none"
                  on:canplay={(e) => handleCanPlay(i, e.currentTarget)}
                >
                  <track kind="captions" />
                </video>
              {/if}
            </div>
            <button 
              class="play-overlay"
              on:click|stopPropagation={() => { if (!hasTouchDragged) openLightbox(item); }}
              aria-label="Riproduci video {item.title}"
            >
              <div class="play-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          {:else}
            <div class="card-placeholder">
              <div class="placeholder-gradient"></div>
              <div class="placeholder-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          {/if}
          
          <div class="card-overlay">
            <h3 class="card-title">{item.title}</h3>
            <p class="card-subtitle">{item.subtitle}</p>
          </div>
        </div>
      </article>
    {/each}
    
    <article class="carousel-card cta-card-wrapper" role="listitem">
      <a href="/contatti" class="cta-end-card">
        <div class="cta-end-card__inner">
          <div class="cta-end-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
              <path d="M12 4v16m0 0l-4-4m4 4l4-4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="cta-end-card__title">E molto altro<br/>in arrivo</p>
          <p class="cta-end-card__subtitle">Nuovi progetti ogni mese</p>
          <span class="cta-end-card__btn">Scopri di più</span>
        </div>
      </a>
    </article>
  </div>
</section>

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
      aria-label="Chiudi video"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
    
    <div class="lightbox-content" on:click|stopPropagation>
      {#if lightboxYoutubeId}
        <iframe
          src="https://www.youtube.com/embed/{lightboxYoutubeId}?autoplay=1&rel=0&controls=0&modestbranding=1&playsinline=1&loop=1&playlist={lightboxYoutubeId}&iv_load_policy=3"
          class="lightbox-video"
          allow="autoplay; fullscreen; encrypted-media"
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

<style>
  .section-title-highlight {
    font-size: clamp(1.75rem, 5vw, 3rem);
    font-weight: 800;
    color: var(--text-primary);
    text-align: center;
    line-height: 1.6;
  }
  
  @media (min-width: 640px) {
    .section-title-highlight {
      line-height: 1.4;
    }
  }
  
  .highlight-box {
    display: inline;
    background: linear-gradient(135deg, #D6487E 0%, #a855f7 100%);
    padding: 0.1em 0.4em;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
  
  .carousel-container {
    display: flex;
    gap: 1.5rem;
    padding: 2rem var(--container-padding);
    overflow-x: auto;
    cursor: grab;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
    overscroll-behavior-x: contain;
    /* pan-x pan-y: browser handles both horizontal (carousel) and vertical (page)
       scroll natively — eliminates the vertical-scroll block on touch. */
    touch-action: pan-x pan-y;
  }

  /* Tighter vertical spacing on mobile — the global section-header margin-bottom
     (3rem) + carousel top padding (2rem) created ~80px of gap on small screens. */
  @media (max-width: 639px) {
    .hvs-header {
      margin-bottom: 1.5rem;
    }
    .carousel-container {
      padding-top: 0.75rem;
      padding-bottom: 1rem;
      gap: 1rem;
    }
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
  
  .carousel-container:focus-visible {
    outline: 2px solid var(--righello-pink, #D6487E);
    outline-offset: 4px;
    border-radius: 1rem;
  }
  
  .carousel-card {
    flex-shrink: 0;
    width: 320px;
    scroll-snap-align: start;
    animation: cardEnter 0.6s ease-out calc(var(--index) * 0.1s) backwards;
  }
  
  @media (min-width: 640px) {
    .carousel-card {
      width: 380px;
    }
  }
  
  @media (min-width: 1024px) {
    .carousel-card {
      width: 420px;
    }
  }
  
  @keyframes cardEnter {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  
  .card-content {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 1rem;
    overflow: hidden;
    background: var(--bg-tertiary);
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
  }
  
  .card-content:hover {
    will-change: transform;
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(214, 72, 126, 0.15);
  }

  /* Disable hover lift + restore grab cursor while drag-scrolling */
  .carousel-container:global([data-dragging]) .card-content,
  .carousel-container:global([data-dragging]) .card-content:hover {
    cursor: grabbing;
    transform: none;
    box-shadow: none;
    will-change: auto;
  }
  
  .video-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  
  .card-media {
    transition: transform 0.6s ease;
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

  .card-poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .card-video-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .card-video-layer.video-playing {
    opacity: 1;
  }
  
  .card-placeholder {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .placeholder-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(6, 182, 212, 0.15) 100%);
  }
  
  .placeholder-icon {
    position: relative;
    z-index: 2;
    width: 56px;
    height: 56px;
    background: rgba(214, 72, 126, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
  }
  
  .placeholder-icon svg {
    width: 24px;
    height: 24px;
    margin-left: 2px;
  }
  
  .card-content:hover .placeholder-icon {
    transform: scale(1.1);
    background: rgba(214, 72, 126, 0.8);
  }
  
  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    opacity: 1;
    transition: opacity 0.3s ease, background 0.3s ease;
    z-index: 5;
  }
  
  .card-content:hover .play-overlay {
    background: rgba(0, 0, 0, 0.35);
  }
  
  .play-icon {
    width: 56px;
    height: 56px;
    background: rgba(214, 72, 126, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(214, 72, 126, 0.4);
  }
  
  .play-icon svg {
    width: 22px;
    height: 22px;
    margin-left: 2px;
  }
  
  .play-overlay:hover .play-icon {
    transform: scale(1.12);
    box-shadow: 0 12px 35px rgba(214, 72, 126, 0.5);
  }
  
  .card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.5rem 1.25rem 1rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
    z-index: 4;
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
    max-width: min(900px, 95vw);
    max-height: 80vh;
    border-radius: 0.75rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  
  .lightbox-title {
    margin-top: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    text-align: center;
  }

  .cta-end-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 1rem;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.08), rgba(6, 182, 212, 0.08));
    border: 1.5px dashed rgba(214, 72, 126, 0.3);
    text-decoration: none;
    color: var(--text-primary);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .cta-end-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(214, 72, 126, 0.6);
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.12), rgba(6, 182, 212, 0.12));
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(214, 72, 126, 0.1);
  }

  .cta-end-card__inner {
    text-align: center;
    padding: 1.5rem;
  }

  .cta-end-card__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(214, 72, 126, 0.1);
    color: #D6487E;
    margin-bottom: 1rem;
    animation: pulseIcon 2s ease-in-out infinite;
  }

  @keyframes pulseIcon {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
  }

  .cta-end-card__title {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .cta-end-card__subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 1.25rem;
  }

  .cta-end-card__btn {
    display: inline-block;
    padding: 0.5rem 1.25rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    border-radius: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .cta-end-card:hover .cta-end-card__btn {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(214, 72, 126, 0.4);
  }
</style>
