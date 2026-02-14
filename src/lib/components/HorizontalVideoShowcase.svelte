<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import RevealOnScroll from './RevealOnScroll.svelte';
  
  export let title = "Creiamo esperienze memorabili";
  export let subtitle = "Video Production";
  export let description = "Video istituzionali, contenuti dimostrativi e proof of work per raccontare il tuo brand";
  
  interface VideoItem {
    title: string;
    subtitle: string;
    videoSrc?: string;
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
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/poles-geometra.firebasestorage.app/o/viedo%20architetto.mp4?alt=media&token=a8a22a02-99d5-4d70-8991-654df9be3379'
    },
    {
      title: 'Living Door',
      subtitle: 'Capannone industriale',
      category: 'Industrial',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/poles-geometra.firebasestorage.app/o/20.mp4?alt=media&token=5f0c2e7e-5086-4739-981e-b56083866e81'
    },
    {
      title: 'Riviera Resort Hotel',
      subtitle: 'Lignano Sabbiadoro',
      category: 'Hospitality',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/ennevi-6f853.firebasestorage.app/o/ennevi_1.mp4?alt=media&token=31325f81-6c72-4ae7-8b12-f9ab2d9a75ae'
    },
    {
      title: 'Hotel Miramare',
      subtitle: 'Lignano Sabbiadoro',
      category: 'Hospitality',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/ennevi-6f853.firebasestorage.app/o/ennevi_2.mp4?alt=media&token=601d71c1-deac-41f5-b49a-68c986b700c6'
    }
  ];
  
  let container: HTMLElement;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let activeVideo: HTMLVideoElement | null = null;
  let lightboxOpen = false;
  let lightboxVideo: string | null = null;
  let lightboxTitle = '';
  let loadedFrames: boolean[] = items.map(() => false);

  function markFrameLoaded(index: number) {
    if (!loadedFrames[index]) {
      loadedFrames[index] = true;
      loadedFrames = [...loadedFrames];
    }
  }

  function getThumbnailUrl(videoSrc: string): string {
    return `/api/video-thumbnail?url=${encodeURIComponent(videoSrc)}`;
  }

  function handleCanPlay(index: number, video: HTMLVideoElement) {
    markFrameLoaded(index);
  }
  
  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    container.style.cursor = 'grabbing';
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
  }
  
  function handleMouseLeave() {
    isDragging = false;
    container.style.cursor = 'grab';
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
  
  function openLightbox(videoSrc: string, itemTitle: string) {
    if (!videoSrc) return;
    lightboxVideo = videoSrc;
    lightboxTitle = itemTitle;
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightboxOpen = false;
    lightboxVideo = null;
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
  let touchScrollLeft = 0;
  
  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].pageX - container.offsetLeft;
    touchScrollLeft = container.scrollLeft;
  }
  
  function handleTouchMove(e: TouchEvent) {
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (touchStartX - x) * 1.2;
    container.scrollLeft = touchScrollLeft + walk;
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

<section class="section-padding overflow-hidden" aria-labelledby="horizontal-video-title">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <header class="section-header">
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
          {#if item.videoSrc}
            <div class="video-wrapper">
              <img
                src={getThumbnailUrl(item.videoSrc)}
                alt={item.title}
                class="card-media card-poster"
                loading="lazy"
                decoding="async"
                on:error={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.add('thumb-fallback--visible'); }}
              />
              <div class="thumb-fallback">
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M8 5v14l11-7z"/></svg>
              </div>
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
            </div>
            <button 
              class="play-overlay"
              on:click|stopPropagation={() => item.videoSrc && openLightbox(item.videoSrc, item.title)}
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

{#if lightboxOpen && lightboxVideo}
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
      <video 
        src={lightboxVideo}
        autoplay
        controls
        playsinline
        class="lightbox-video"
      >
        <track kind="captions" />
      </video>
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
    padding: 2rem 6%;
    overflow-x: auto;
    scroll-behavior: smooth;
    cursor: grab;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
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
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .card-content {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 1rem;
    overflow: hidden;
    background: var(--bg-tertiary);
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
    will-change: transform;
  }
  
  .card-content:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(214, 72, 126, 0.15);
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
  
  .card-content:hover .card-media {
    transform: scale(1.05);
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
