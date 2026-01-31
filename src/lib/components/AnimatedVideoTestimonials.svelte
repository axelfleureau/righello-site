<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { fade, fly, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  export let testimonials: {
    id: string;
    clientName: string;
    clientRole: string;
    company: string;
    videoSrc?: string;
    thumbnailSrc?: string;
    quote: string;
  }[];
  
  export let autoplay = false;
  export let interval = 5000;
  
  let activeIndex = 0;
  let direction = 1;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let videoElement: HTMLVideoElement | null = null;
  let isHovering = false;
  let lightboxOpen = false;
  let lightboxVideo: HTMLVideoElement | null = null;
  let containerEl: HTMLElement;
  let isInView = false;
  let observer: IntersectionObserver | null = null;
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50;
  let reducedMotion = false;
  
  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
  }
  
  function handleTouchMove(e: TouchEvent) {
    touchEndX = e.touches[0].clientX;
  }
  
  function handleTouchEnd() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartX = 0;
    touchEndX = 0;
  }
  
  $: activeTestimonial = testimonials[activeIndex];
  
  $: if (videoElement && isInView && !lightboxOpen) {
    videoElement.play().catch(() => {});
  } else if (videoElement && (!isInView || lightboxOpen)) {
    videoElement.pause();
  }
  
  function next() {
    direction = 1;
    activeIndex = (activeIndex + 1) % testimonials.length;
  }
  
  function prev() {
    direction = -1;
    activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
  }
  
  function goTo(index: number) {
    direction = index > activeIndex ? 1 : -1;
    activeIndex = index;
  }
  
  function startAutoplay() {
    if (autoplay && !intervalId && isInView && !reducedMotion) {
      intervalId = setInterval(next, interval);
    }
  }
  
  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  
  function handleMouseEnter() {
    isHovering = true;
    stopAutoplay();
  }
  
  function handleMouseLeave() {
    isHovering = false;
    if (isInView) {
      startAutoplay();
    }
  }
  
  function openLightbox() {
    if (!activeTestimonial.videoSrc) return;
    lightboxOpen = true;
    stopAutoplay();
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    if (lightboxVideo) {
      lightboxVideo.pause();
    }
    lightboxOpen = false;
    document.body.style.overflow = '';
    if (isInView) {
      startAutoplay();
    }
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && lightboxOpen) {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      next();
    } else if (e.key === 'ArrowLeft') {
      prev();
    }
  }
  
  onMount(() => {
    if (browser) {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      window.addEventListener('keydown', handleKeydown);
      
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isInView = entry.isIntersecting;
            if (isInView) {
              startAutoplay();
              if (videoElement && !reducedMotion) {
                videoElement.play().catch(() => {});
              }
            } else if (!isHovering && !lightboxOpen) {
              stopAutoplay();
              if (videoElement) {
                videoElement.pause();
              }
            }
          });
        },
        { threshold: 0.2 }
      );
      
      if (containerEl) {
        observer.observe(containerEl);
      }
      
      return () => {
        stopAutoplay();
        window.removeEventListener('keydown', handleKeydown);
        observer?.disconnect();
      };
    }
  });
  
  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<div class="animated-testimonials" bind:this={containerEl}>
  <div class="testimonials-container">
    <div 
      class="video-showcase"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}
      role="region"
      aria-label="Video testimonial"
    >
      <div class="video-stack">
        {#each testimonials as testimonial, i}
          <div 
            class="video-card"
            class:active={i === activeIndex}
            class:prev={i === (activeIndex - 1 + testimonials.length) % testimonials.length}
            class:next={i === (activeIndex + 1) % testimonials.length}
            style="--offset: {i - activeIndex}"
          >
            {#if testimonial.videoSrc}
              <div class="video-gradient-bg"></div>
              {#if i === activeIndex}
                <video
                  bind:this={videoElement}
                  src={testimonial.videoSrc}
                  autoplay
                  muted
                  loop
                  playsinline
                  preload="metadata"
                  class="video-element"
                  on:canplay={(e) => {
                    const video = e.currentTarget;
                    if (isInView) video.play().catch(() => {});
                  }}
                >
                  <track kind="captions" />
                </video>
              {:else}
                <video
                  src={testimonial.videoSrc}
                  muted
                  playsinline
                  preload="metadata"
                  class="video-element video-preview"
                >
                  <track kind="captions" />
                </video>
              {/if}
            {:else}
              <div class="quote-card">
                <div class="avatar-large">
                  {testimonial.clientName.charAt(0)}
                </div>
                <p class="quote-text">"{testimonial.quote}"</p>
              </div>
            {/if}
            
            <div class="card-gradient"></div>
            
            <div class="card-info">
              <div class="stars">
                {#each Array(5) as _}
                  <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                {/each}
              </div>
              <p class="client-name">{testimonial.clientName}</p>
              <p class="client-role">{testimonial.clientRole}</p>
              <p class="client-company">{testimonial.company}</p>
            </div>
            
            <div class="reel-badge">
              <svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              Reel
            </div>
          </div>
        {/each}
      </div>
      
      {#if activeTestimonial.videoSrc}
        <button 
          class="play-button"
          on:click={openLightbox}
          aria-label="Guarda il video"
        >
          <div class="play-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span class="play-text">Guarda</span>
        </button>
      {/if}
    </div>
    
    <div class="content-panel">
      {#key activeIndex}
        <div 
          class="testimonial-content"
          in:fly={{ x: direction * 40, duration: 400, easing: cubicOut }}
          out:fade={{ duration: 200 }}
        >
          <blockquote class="quote">
            "{activeTestimonial.quote}"
          </blockquote>
          
          <div class="author hide-mobile">
            <div class="author-avatar">
              {activeTestimonial.clientName.charAt(0)}
            </div>
            <div class="author-info">
              <p class="author-name">{activeTestimonial.clientName}</p>
              <p class="author-role">{activeTestimonial.clientRole}, {activeTestimonial.company}</p>
            </div>
          </div>
        </div>
      {/key}
      
      <div class="navigation">
        <button class="nav-button prev" on:click={prev} aria-label="Precedente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <div class="dots">
          {#each testimonials as _, i}
            <button 
              class="dot"
              class:active={i === activeIndex}
              on:click={() => goTo(i)}
              aria-label="Vai alla testimonianza {i + 1}"
            />
          {/each}
        </div>
        
        <button class="nav-button next" on:click={next} aria-label="Successivo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

{#if lightboxOpen && activeTestimonial.videoSrc}
  <div 
    class="lightbox"
    transition:fade={{ duration: 200 }}
    on:click={closeLightbox}
    role="dialog"
    aria-modal="true"
    aria-label="Video player"
  >
    <div class="lightbox-backdrop"></div>
    
    <button 
      class="lightbox-close"
      on:click={closeLightbox}
      aria-label="Chiudi"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <div 
      class="lightbox-content"
      transition:scale={{ duration: 300, start: 0.9 }}
      on:click|stopPropagation
    >
      <video
        bind:this={lightboxVideo}
        src={activeTestimonial.videoSrc}
        autoplay
        loop
        playsinline
        controls
        class="lightbox-video"
      >
        <track kind="captions" />
      </video>
      
      <div class="lightbox-info">
        <div class="lightbox-avatar">
          {activeTestimonial.clientName.charAt(0)}
        </div>
        <div>
          <p class="lightbox-name">{activeTestimonial.clientName}</p>
          <p class="lightbox-role">{activeTestimonial.clientRole} - {activeTestimonial.company}</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .animated-testimonials {
    width: 100%;
  }
  
  .testimonials-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    .testimonials-container {
      flex-direction: row;
      align-items: center;
      gap: 6rem;
    }
  }
  
  .video-showcase {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
  
  @media (min-width: 1024px) {
    .video-showcase {
      width: 340px;
      margin: 0;
    }
  }
  
  .video-stack {
    position: relative;
    aspect-ratio: 9/16;
    perspective: 1000px;
  }
  
  .video-card {
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    overflow: hidden;
    background: var(--bg-tertiary);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transform: scale(0.9) translateX(calc(var(--offset) * 30px)) rotateY(calc(var(--offset) * -5deg));
    opacity: 0.5;
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
    z-index: 0;
  }
  
  .video-card.active {
    transform: scale(1) translateX(0) rotateY(0);
    opacity: 1;
    pointer-events: auto;
    z-index: 10;
  }
  
  .video-card.prev {
    transform: scale(0.85) translateX(-40px) rotateY(8deg);
    opacity: 0.4;
    z-index: 5;
  }
  
  .video-card.next {
    transform: scale(0.85) translateX(40px) rotateY(-8deg);
    opacity: 0.4;
    z-index: 5;
  }
  
  .video-gradient-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      rgba(214, 72, 126, 0.5) 0%, 
      rgba(168, 85, 247, 0.4) 30%,
      rgba(6, 182, 212, 0.5) 70%,
      rgba(214, 72, 126, 0.4) 100%
    );
    background-size: 200% 200%;
    animation: gradientShift 4s ease infinite;
    z-index: 0;
    border-radius: 1.25rem;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .video-element {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .video-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .video-preview {
    pointer-events: none;
  }
  
  .author.hide-mobile {
    display: none !important;
  }
  
  @media (min-width: 1024px) {
    .author.hide-mobile {
      display: flex !important;
    }
  }
  
  .video-placeholder-bg {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.3) 0%, var(--bg-tertiary) 50%, rgba(6, 182, 212, 0.3) 100%);
  }
  
  .quote-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.2) 0%, var(--bg-tertiary) 50%, rgba(6, 182, 212, 0.2) 100%);
  }
  
  .avatar-large {
    width: 5rem;
    height: 5rem;
    margin-bottom: 1.5rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 2rem;
    box-shadow: 0 10px 30px rgba(214, 72, 126, 0.3);
  }
  
  .quote-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.875rem;
    line-height: 1.6;
    font-style: italic;
    text-align: center;
  }
  
  .card-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .card-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    z-index: 5;
  }
  
  .stars {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }
  
  .star-icon {
    width: 0.875rem;
    height: 0.875rem;
    color: #facc15;
  }
  
  .client-name {
    font-size: 1rem;
    font-weight: 600;
    color: white;
  }
  
  .client-role {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .client-company {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    margin-top: 0.25rem;
  }
  
  .reel-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 9999px;
    font-size: 0.75rem;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .badge-icon {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .video-showcase:hover .play-button {
    opacity: 1;
  }
  
  .play-icon {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: rgba(214, 72, 126, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.3s ease, background 0.3s ease;
    box-shadow: 0 10px 30px rgba(214, 72, 126, 0.4);
  }
  
  .play-button:hover .play-icon {
    transform: scale(1.1);
    background: #D6487E;
  }
  
  .play-icon svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.2rem;
  }
  
  .play-text {
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .content-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 300px;
  }
  
  .testimonial-content {
    margin-bottom: 2rem;
  }
  
  .quote {
    font-size: 1.25rem;
    line-height: 1.7;
    color: var(--text-primary);
    margin-bottom: 2rem;
    font-style: italic;
  }
  
  @media (min-width: 768px) {
    .quote {
      font-size: 1.5rem;
    }
  }
  
  .author {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .author-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
    box-shadow: 0 5px 15px rgba(214, 72, 126, 0.3);
  }
  
  .author-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .author-role {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  @media (min-width: 1024px) {
    .navigation {
      justify-content: flex-start;
    }
  }
  
  .nav-button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: all 0.3s ease;
  }
  
  .nav-button:hover {
    background: rgba(214, 72, 126, 0.2);
    border-color: rgba(214, 72, 126, 0.5);
    color: #D6487E;
  }
  
  .nav-button svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .dots {
    display: flex;
    gap: 0.5rem;
  }
  
  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }
  
  .dot.active {
    width: 1.5rem;
    border-radius: 0.25rem;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
  }
  
  .dot:hover:not(.active) {
    background: rgba(255, 255, 255, 0.4);
  }
  
  :global([data-theme="light"]) .nav-button {
    background: rgba(0, 0, 0, 0.05);
    border-color: var(--border-color);
  }
  
  :global([data-theme="light"]) .dot {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  
  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
  }
  
  .lightbox-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 110;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .lightbox-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
  
  .lightbox-close svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .lightbox-content {
    position: relative;
    z-index: 105;
    max-width: 400px;
    width: 100%;
  }
  
  .lightbox-video {
    width: 100%;
    aspect-ratio: 9/16;
    object-fit: cover;
    border-radius: 1.5rem;
    box-shadow: 0 25px 100px rgba(214, 72, 126, 0.3);
  }
  
  .lightbox-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
    padding: 0 0.5rem;
  }
  
  .lightbox-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
  }
  
  .lightbox-name {
    color: white;
    font-weight: 600;
    font-size: 1rem;
  }
  
  .lightbox-role {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .video-card {
      transition: none;
    }
  }
</style>
