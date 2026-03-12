<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { gsap } from '$lib/utils/gsap';
  import { fade, scale } from 'svelte/transition';
  
  export let testimonials: {
    id: string;
    clientName: string;
    clientRole: string;
    company: string;
    videoSrc?: string;
    thumbnailSrc?: string;
    quote: string;
  }[];
  
  let activeVideo: string | null = null;
  let videoElements: HTMLVideoElement[] = [];
  let lightboxOpen = false;
  let lightboxContent: typeof testimonials[0] | null = null;
  let lightboxVideo: HTMLVideoElement | null = null;
  
  let slider: HTMLElement;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  
  function getVideoRef(id: string): HTMLVideoElement | undefined {
    const index = testimonials.findIndex(t => t.id === id);
    return videoElements[index];
  }
  
  function playVideo(id: string) {
    if (!browser) return;
    const activeRef = activeVideo ? getVideoRef(activeVideo) : null;
    if (activeRef && activeVideo !== id) {
      activeRef.pause();
    }
    activeVideo = id;
    const ref = getVideoRef(id);
    if (ref) {
      ref.play().catch(() => {});
    }
  }
  
  function pauseVideo(id: string) {
    if (!browser) return;
    const ref = getVideoRef(id);
    if (ref) {
      ref.pause();
    }
    if (activeVideo === id) {
      activeVideo = null;
    }
  }
  
  function toggleVideo(id: string) {
    if (activeVideo === id) {
      pauseVideo(id);
    } else {
      playVideo(id);
    }
  }
  
  function openLightbox(testimonial: typeof testimonials[0]) {
    if (!testimonial.videoSrc) return;
    lightboxContent = testimonial;
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
    
    if (activeVideo) {
      pauseVideo(activeVideo);
    }
  }
  
  function closeLightbox() {
    if (lightboxVideo) {
      lightboxVideo.pause();
    }
    lightboxOpen = false;
    lightboxContent = null;
    document.body.style.overflow = '';
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && lightboxOpen) {
      closeLightbox();
    }
  }
  
  function handleMouseDown(e: MouseEvent) {
    if (!slider) return;
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.cursor = 'grabbing';
  }
  
  function handleMouseUp() {
    isDragging = false;
    if (slider) slider.style.cursor = 'grab';
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !slider) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  }
  
  function handleMouseLeave() {
    isDragging = false;
    if (slider) slider.style.cursor = 'grab';
  }
  
  onMount(() => {
    if (!browser) return;
    
    window.addEventListener('keydown', handleKeydown);
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div class="video-testimonials">
  <div 
    bind:this={slider}
    class="slider"
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    role="region"
    aria-label="Video testimonials carousel"
  >
    {#each testimonials as testimonial, i}
      <div 
        class="testimonial-reel"
        style="--index: {i}"
      >
        <div class="reel-card group">
          <div class="reel-content">
            {#if testimonial.videoSrc}
              <video
                bind:this={videoElements[i]}
                src={testimonial.videoSrc}
                poster={testimonial.thumbnailSrc}
                loop
                muted
                playsinline
                class="video-element"
                on:click={() => toggleVideo(testimonial.id)}
              ></video>
            {:else}
              <div class="placeholder-card">
                <div class="placeholder-inner">
                  <div class="avatar-large">
                    {testimonial.clientName.charAt(0)}
                  </div>
                  <p class="quote-text">"{testimonial.quote}"</p>
                </div>
              </div>
            {/if}
            
            <div class="gradient-overlay"></div>
            
            {#if testimonial.videoSrc}
              <button 
                class="play-overlay"
                on:click|stopPropagation={() => openLightbox(testimonial)}
                aria-label="Watch {testimonial.clientName}'s video in fullscreen"
              >
                <div class="play-button-inner">
                  <svg class="w-6 h-6 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span class="fullscreen-hint">Guarda</span>
              </button>
            {/if}
            
            <div class="info-overlay">
              <div class="info-header">
                <div class="avatar-small">
                  {testimonial.clientName.charAt(0)}
                </div>
                <div class="info-text">
                  <p class="name">{testimonial.clientName}</p>
                  <p class="role">{testimonial.clientRole}</p>
                </div>
              </div>
              <p class="company">{testimonial.company}</p>
            </div>
            
            <div class="stars">
              {#each Array(5) as _}
                <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              {/each}
            </div>
            
            <div class="reel-badge">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              Reel
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="drag-hint">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
    <span>Trascina per scorrere</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </div>
</div>

{#if lightboxOpen && lightboxContent}
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
      aria-label="Close video"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <div 
      class="lightbox-content"
      transition:scale={{ duration: 300, start: 0.9 }}
      on:click|stopPropagation
    >
      <div class="lightbox-video-container">
        <video
          bind:this={lightboxVideo}
          src={lightboxContent.videoSrc}
          autoplay
          loop
          playsinline
          controls
          class="lightbox-video"
        ></video>
      </div>
      
      <div class="lightbox-info">
        <div class="lightbox-avatar">
          {lightboxContent.clientName.charAt(0)}
        </div>
        <div>
          <p class="lightbox-name">{lightboxContent.clientName}</p>
          <p class="lightbox-role">{lightboxContent.clientRole} - {lightboxContent.company}</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .slider {
    display: flex;
    gap: 1rem;
    padding: 0 1rem 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    cursor: grab;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .slider::-webkit-scrollbar {
    display: none;
  }
  
  @media (min-width: 768px) {
    .slider {
      gap: 1.5rem;
      padding: 0 2rem 2rem;
    }
  }
  
  .testimonial-reel {
    scroll-snap-align: center;
    flex-shrink: 0;
    animation: fadeInUp 0.6s ease-out forwards;
    animation-delay: calc(var(--index) * 100ms);
    opacity: 0;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .reel-card {
    position: relative;
    border-radius: 1.5rem;
    overflow: hidden;
    background: #0a0a0a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
  }
  
  .reel-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.5),
      0 0 80px rgba(214, 72, 126, 0.15);
  }
  
  .reel-content {
    position: relative;
    aspect-ratio: 9/16;
    width: 240px;
    overflow: hidden;
  }
  
  @media (min-width: 768px) {
    .reel-content {
      width: 280px;
    }
  }
  
  .video-element {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder-card {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.3) 0%, #0a0a0a 50%, rgba(6, 182, 212, 0.3) 100%);
  }
  
  .placeholder-inner {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
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
  
  .gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 40%, rgba(0, 0, 0, 0.3) 100%);
    pointer-events: none;
  }
  
  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    z-index: 10;
    opacity: 0;
    background: rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s ease;
  }
  
  .reel-card:hover .play-overlay {
    opacity: 1;
  }
  
  .play-button-inner {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: rgba(214, 72, 126, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.3s ease, background 0.3s ease;
  }
  
  .play-overlay:hover .play-button-inner {
    transform: scale(1.1);
    background: #D6487E;
  }
  
  .fullscreen-hint {
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .info-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.25rem;
    z-index: 10;
  }
  
  .info-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .avatar-small {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
    ring: 2px solid rgba(255, 255, 255, 0.2);
  }
  
  .info-text {
    flex: 1;
    min-width: 0;
  }
  
  .name {
    font-weight: 600;
    color: white;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .role {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .company {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }
  
  .stars {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    display: flex;
    gap: 0.25rem;
  }
  
  .reel-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 9999px;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .drag-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.75rem;
    margin-top: 0.5rem;
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
  
  .lightbox-content {
    position: relative;
    z-index: 105;
    max-width: 400px;
    width: 100%;
  }
  
  .lightbox-video-container {
    border-radius: 1.5rem;
    overflow: hidden;
    background: #000;
    box-shadow: 0 25px 100px rgba(214, 72, 126, 0.3);
  }
  
  .lightbox-video {
    width: 100%;
    aspect-ratio: 9/16;
    object-fit: cover;
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
    .testimonial-reel {
      animation: none;
      opacity: 1;
    }
    
    .reel-card:hover {
      transform: none;
    }
  }
</style>
