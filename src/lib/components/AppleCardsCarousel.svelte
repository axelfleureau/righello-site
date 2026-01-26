<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let title = '';
  export let items: {
    title: string;
    subtitle?: string;
    videoSrc?: string;
    imageSrc?: string;
    posterSrc?: string;
    category?: string;
  }[] = [];
  
  let container: HTMLElement;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let activeVideo: HTMLVideoElement | null = null;
  let lightboxOpen = false;
  let lightboxVideo: string | null = null;
  let lightboxTitle = '';
  
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
      video.currentTime = 0;
    }
    if (video === activeVideo) {
      activeVideo = null;
    }
  }
  
  function openLightbox(videoSrc: string, itemTitle: string) {
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
    role="list"
  >
    {#each items as item, i}
      {@const videoEl = null}
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
          {#if item.videoSrc}
            <div class="video-wrapper">
              <div class="video-placeholder"></div>
              <video 
                class="card-media"
                src={item.videoSrc}
                poster={item.posterSrc || ''}
                muted
                loop
                playsinline
                preload="metadata"
              >
                <track kind="captions" />
              </video>
            </div>
            <button 
              class="play-overlay"
              on:click={() => item.videoSrc && openLightbox(item.videoSrc, item.title)}
              aria-label="Play video fullscreen"
            >
              <div class="play-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
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
          
          <div class="card-overlay">
            {#if item.category}
              <span class="card-category">{item.category}</span>
            {/if}
            <h3 class="card-title">{item.title}</h3>
            {#if item.subtitle}
              <p class="card-subtitle">{item.subtitle}</p>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

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
      aria-label="Close"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
  .carousel-section {
    width: 100%;
    overflow: hidden;
  }
  
  .carousel-title {
    font-size: clamp(1.75rem, 4vw, 3rem);
    font-weight: 700;
    color: var(--text-primary);
    padding: 0 6%;
    margin-bottom: 1.5rem;
  }
  
  .carousel-container {
    display: flex;
    gap: 1.25rem;
    padding: 1rem 6% 2rem;
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
    aspect-ratio: 9/16;
    border-radius: 1.25rem;
    overflow: hidden;
    background: var(--bg-tertiary);
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
    will-change: transform;
  }
  
  .card-content:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(214, 72, 126, 0.2);
  }
  
  .video-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  
  .video-placeholder {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #D6487E 0%, #a855f7 50%, #06B6D4 100%);
    background-size: 200% 200%;
    animation: gradientMove 4s ease infinite;
  }
  
  .card-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
    z-index: 1;
  }
  
  .card-content:hover .card-media {
    transform: scale(1.05);
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
  
  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .card-content:hover .play-overlay {
    opacity: 1;
  }
  
  .play-icon {
    width: 60px;
    height: 60px;
    background: rgba(214, 72, 126, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(214, 72, 126, 0.4);
  }
  
  .play-icon svg {
    width: 24px;
    height: 24px;
    margin-left: 3px;
  }
  
  .play-overlay:hover .play-icon {
    transform: scale(1.15);
    box-shadow: 0 15px 40px rgba(214, 72, 126, 0.5);
  }
  
  .card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4rem 1.25rem 1.25rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%);
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
</style>
