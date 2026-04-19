<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { getThumbnailUrl, getYoutubeThumbnailUrl } from '$lib/data/thumbnail-map';
  import ReelViewer from './ReelViewer.svelte';

  export let title = '';
  export let useReelViewer = false;
  export let showArrows = true;
  export let items: {
    title: string;
    subtitle?: string;
    videoSrc?: string;
    cloudinaryUrl?: string;
    cloudinaryPublicId?: string;
    youtubeId?: string;
    imageSrc?: string;
    posterSrc?: string;
    thumbnailUrl?: string;
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

  // Navigation + autoplay state
  let currentIndex = 0;
  let reducedMotion = false;
  const scrollPlayingSet = new Set<number>();
  
  $: reelItems = items.filter(i => (i.cloudinaryUrl || i.videoSrc || i.youtubeId) && !i.isCta);
  
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
  
  function handleVideoLeave(video: HTMLVideoElement | null, idx: number) {
    if (scrollPlayingSet.has(idx)) return; // scroll-autoplay running, don't interrupt
    if (video) {
      video.pause();
      video.currentTime = 0.1;
    }
    if (video === activeVideo) activeVideo = null;
  }

  // ── Navigation ──────────────────────────────────────────────
  function scrollToIndex(index: number) {
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('[data-card-idx]');
    const target = cards[index];
    if (!target) return;
    const left =
      target.getBoundingClientRect().left -
      container.getBoundingClientRect().left +
      container.scrollLeft;
    container.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
    currentIndex = index;
  }

  function goNext() {
    const videoItems = items.filter(it => !it.isCta);
    if (currentIndex < videoItems.length - 1) scrollToIndex(currentIndex + 1);
  }

  function goPrev() {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  }

  function handleCarouselScroll() {
    if (!container) return;
    const cLeft = container.getBoundingClientRect().left;
    const cards = container.querySelectorAll<HTMLElement>('[data-card-idx]');
    let best = 0, bestDist = Infinity;
    cards.forEach((c, i) => {
      const dist = Math.abs(c.getBoundingClientRect().left - cLeft);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    currentIndex = best;
  }
  
  function openLightbox(item: { title: string; videoSrc?: string; cloudinaryUrl?: string; youtubeId?: string }) {
    lightboxYoutubeId = item.youtubeId ?? null;
    lightboxVideo = item.youtubeId ? null : (item.cloudinaryUrl ?? item.videoSrc ?? null);
    lightboxTitle = item.title;
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('righello:lightbox-open'));
  }
  
  function closeLightbox() {
    lightboxOpen = false;
    lightboxVideo = null;
    lightboxYoutubeId = null;
    lightboxTitle = '';
    document.body.style.overflow = '';
    document.dispatchEvent(new CustomEvent('righello:lightbox-close'));
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
  
  function handleCardClick(item: { title: string; videoSrc?: string; cloudinaryUrl?: string; youtubeId?: string }, itemIndex?: number) {
    if (wasDragged || isDragging) return;
    if (!item.cloudinaryUrl && !item.videoSrc && !item.youtubeId) return;
    
    if (useReelViewer) {
      const reelIdx = reelItems.findIndex(i =>
        (i.youtubeId && i.youtubeId === item.youtubeId) ||
        (i.cloudinaryUrl && i.cloudinaryUrl === item.cloudinaryUrl) ||
        (i.videoSrc && i.videoSrc === item.videoSrc)
      );
      reelViewerIndex = reelIdx >= 0 ? reelIdx : 0;
      reelViewerOpen = true;
      document.dispatchEvent(new CustomEvent('righello:lightbox-open'));
    } else {
      openLightbox(item);
    }
  }
  
  function closeReelViewer() {
    reelViewerOpen = false;
    document.dispatchEvent(new CustomEvent('righello:lightbox-close'));
  }
  
  let videoRefs: (HTMLVideoElement | null)[] = items.map(() => null);
  let videoLoaded: boolean[] = items.map(() => false);
  let progressBarEls: (HTMLElement | null)[] = items.map(() => null);
  let timeRemainingEls: (HTMLElement | null)[] = items.map(() => null);

  function formatTime(secs: number): string {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function handleVideoLoaded(index: number) {
    videoLoaded[index] = true;
    videoLoaded = [...videoLoaded];
  }

  function handleVideoError(index: number) {
    videoLoaded[index] = true;
    videoLoaded = [...videoLoaded];
  }

  onMount(() => {
    if (!browser) return;

    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('keydown', handleKeydown);
    container.addEventListener('scroll', handleCarouselScroll, { passive: true });

    let videoObserver: IntersectionObserver | null = null;
    let rafId: number | null = null;

    function tick() {
      items.forEach((item, idx) => {
        if (item.isCta || (!item.cloudinaryUrl && !item.videoSrc) || item.youtubeId) return;
        const bar = progressBarEls[idx];
        const video = videoRefs[idx];
        if (!bar || !video || !video.duration) return;
        bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
        const label = timeRemainingEls[idx];
        if (label) {
          label.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }
      });
      rafId = requestAnimationFrame(tick);
    }

    function startRaf() {
      if (!reducedMotion && rafId === null) rafId = requestAnimationFrame(tick);
    }

    function stopRaf() {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    }

    videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          const idx = parseInt(card.dataset.cardIdx ?? '-1');
          if (idx < 0) return;
          const video = card.querySelector<HTMLVideoElement>('.card-video-native');
          if (!video) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.60) {
            scrollPlayingSet.add(idx);
            video.play().catch(() => {});
            if (reducedMotion && progressBarEls[idx]) {
              progressBarEls[idx]!.style.transform = 'scaleX(1)';
            }
            startRaf();
          } else if (entry.intersectionRatio < 0.3) {
            scrollPlayingSet.delete(idx);
            video.pause();
            const bar = progressBarEls[idx];
            if (bar) bar.style.transform = 'scaleX(0)';
            const label = timeRemainingEls[idx];
            if (label) label.textContent = '';
            if (scrollPlayingSet.size === 0) stopRaf();
          }
        });
      },
      { root: container, threshold: [0, 0.3, 0.6, 0.85, 1.0] }
    );

    container.querySelectorAll<HTMLElement>('[data-card-idx]').forEach((card) => {
      videoObserver!.observe(card);
    });

    function handleTimeUpdate(e: Event) {
      if (reducedMotion) return;
      const video = e.target as HTMLVideoElement;
      if (!video.duration) return;
      const card = video.closest<HTMLElement>('[data-card-idx]');
      if (!card) return;
      const idx = parseInt(card.dataset.cardIdx ?? '-1');
      if (idx < 0) return;
      const bar = progressBarEls[idx];
      if (!bar) return;
      bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
    }
    container.addEventListener('timeupdate', handleTimeUpdate, { capture: true, passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      container?.removeEventListener('scroll', handleCarouselScroll);
      container?.removeEventListener('timeupdate', handleTimeUpdate, { capture: true });
      videoObserver?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  });
</script>

<div class="carousel-section">
  {#if title}
    <h2 class="carousel-title">{title}</h2>
  {/if}
  
  <div class="carousel-wrapper">
    {#if showArrows}
      <button
        class="arrow-btn arrow-prev"
        on:click={goPrev}
        disabled={currentIndex === 0}
        aria-label="Precedente"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
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
        data-card-idx={item.isCta ? undefined : i}
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
            const video = card?.querySelector('video') ?? null;
            handleVideoLeave(video, i);
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
          {:else if item.cloudinaryUrl || item.youtubeId || item.videoSrc}
            <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
            <div class="video-wrapper" on:click={() => handleCardClick(item)}>
              <img
                src={item.thumbnailUrl || (item.youtubeId ? getYoutubeThumbnailUrl(item.youtubeId) : getThumbnailUrl(item.videoSrc || ''))}
                alt={item.title}
                class="card-media card-poster"
                loading="lazy"
                decoding="async"
                on:error={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.add('thumb-fallback--visible'); }}
              />
              <div class="thumb-fallback">
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M8 5v14l11-7z"/></svg>
              </div>
              {#if (item.cloudinaryUrl || item.videoSrc) && !item.youtubeId}
                <video 
                  bind:this={videoRefs[i]}
                  class="card-media card-video-native"
                  class:video-ready={videoLoaded[i]}
                  src={item.cloudinaryUrl || item.videoSrc}
                  muted
                  loop
                  playsinline
                  preload="none"
                  on:canplay={() => handleVideoLoaded(i)}
                  on:error={() => handleVideoError(i)}
                >
                  <track kind="captions" />
                </video>
                <div class="video-progress-bar" bind:this={progressBarEls[i]} aria-hidden="true"></div>
                <span class="video-time-label" bind:this={timeRemainingEls[i]} aria-hidden="true"></span>
              {/if}
              {#if item.youtubeId}
                <div class="youtube-play-hint" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
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
    </div><!-- /.carousel-container -->

    {#if showArrows}
      <button
        class="arrow-btn arrow-next"
        on:click={goNext}
        disabled={currentIndex >= items.filter(it => !it.isCta).length - 1}
        aria-label="Successivo"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    {/if}
  </div><!-- /.carousel-wrapper -->

  {#if showArrows}
    <div class="dots-row" role="tablist" aria-label="Naviga tra i video">
      {#each items.filter(it => !it.isCta) as _, i}
        <button
          class="dot"
          class:dot--active={currentIndex === i}
          on:click={() => scrollToIndex(i)}
          role="tab"
          aria-selected={currentIndex === i}
          aria-label="Video {i + 1}"
        ></button>
      {/each}
    </div>
  {/if}
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
          src="https://www.youtube-nocookie.com/embed/{lightboxYoutubeId}?autoplay=1&mute=1&rel=0&controls=1&modestbranding=1&playsinline=1&loop=1&playlist={lightboxYoutubeId}&iv_load_policy=3"
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
    touch-action: pan-x pan-y;
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
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease;
  }
  
  .card-content:hover {
    will-change: transform;
    transform: translate3d(0, -10px, 0) scale(1.02);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(214, 72, 126, 0.2);
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
    width: min(95vw, 860px);
  }
  
  .lightbox-video {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 1rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    display: block;
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

  /* ── Carousel wrapper ── */
  .carousel-wrapper {
    position: relative;
  }

  /* ── Arrow buttons ── */
  .arrow-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(10, 10, 10, 0.65);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }

  .arrow-btn:hover:not(:disabled) {
    background: rgba(214, 72, 126, 0.75);
    border-color: rgba(214, 72, 126, 0.6);
    transform: translateY(-50%) scale(1.1);
  }

  .arrow-btn:disabled {
    opacity: 0.2;
    cursor: default;
    pointer-events: none;
  }

  .arrow-prev { left: 1rem; }
  .arrow-next { right: 1rem; }

  @media (pointer: coarse) {
    .arrow-btn { display: none; }
  }

  /* ── Dots ── */
  .dots-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 0 0.25rem;
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: width 0.3s ease, background 0.3s ease, border-radius 0.3s ease;
  }

  .dot--active {
    width: 22px;
    border-radius: 4px;
    background: #D6487E;
  }

  @media (prefers-reduced-motion: reduce) {
    .dot { transition: none; }
    .arrow-btn,
    .arrow-btn:hover:not(:disabled) { transition: none; transform: translateY(-50%); }
    .card-content { transition: none; }
  }

  /* ── Video progress bar ── */
  .video-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #D6487E 0%, #a855f7 100%);
    transform: scaleX(0);
    transform-origin: left center;
    z-index: 8;
    will-change: transform;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  .card-content:hover .video-progress-bar {
    opacity: 0;
  }

  /* ── Time label ── */
  .video-time-label {
    position: absolute;
    bottom: 7px;
    right: 8px;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
    z-index: 9;
    pointer-events: none;
    transition: opacity 0.2s ease;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  .card-content:hover .video-time-label {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .video-time-label { display: none; }
  }

  /* ── YouTube play hint ── */
  .youtube-play-hint {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    pointer-events: none;
    opacity: 0.55;
    animation: ytPulse 2.4s ease-in-out infinite;
    transition: opacity 0.2s ease;
  }

  .youtube-play-hint svg {
    filter: drop-shadow(0 0 8px rgba(0,0,0,0.6));
  }

  @keyframes ytPulse {
    0%, 100% { transform: scale(1); opacity: 0.55; }
    50% { transform: scale(1.15); opacity: 0.85; }
  }

  .card-content:hover .youtube-play-hint,
  .card-content:active .youtube-play-hint { opacity: 0; }

  @media (prefers-reduced-motion: reduce) {
    .youtube-play-hint { animation: none; opacity: 0.7; }
    .card-content:hover .youtube-play-hint { opacity: 0.7; }
  }
</style>
