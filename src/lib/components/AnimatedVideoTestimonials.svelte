<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
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

  export let autoplay = false;
  export let interval = 5000;

  let activeIndex = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let videoElement: HTMLVideoElement | null = null;
  let isHovering = false;
  let lightboxOpen = false;
  let lightboxVideo: HTMLVideoElement | null = null;
  let containerEl: HTMLElement;
  let isInView = false;
  let observer: IntersectionObserver | null = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let isSwiping = false;
  const SWIPE_THRESHOLD = 40;
  let reducedMotion = false;
  let videoLoaded = false;
  let isAnimating = false;

  $: activeTestimonial = testimonials[activeIndex];
  $: quoteWords = activeTestimonial.quote.split(/\s+/);

  function getThumbnailUrl(videoSrc: string): string {
    return `/api/video-thumbnail?url=${encodeURIComponent(videoSrc)}`;
  }

  $: {
    activeIndex;
    videoLoaded = false;
  }

  $: if (videoElement && isInView && !lightboxOpen) {
    videoElement.play().catch(() => {});
  } else if (videoElement && (!isInView || lightboxOpen)) {
    videoElement.pause();
  }

  function getStackOrder(cardIndex: number): number {
    const total = testimonials.length;
    let diff = cardIndex - activeIndex;
    if (diff < 0) diff += total;
    return diff;
  }

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    activeIndex = (activeIndex + 1) % testimonials.length;
    setTimeout(() => { isAnimating = false; }, 550);
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    setTimeout(() => { isAnimating = false; }, 550);
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
    if (isInView) startAutoplay();
  }

  function openLightbox() {
    if (!activeTestimonial.videoSrc) return;
    lightboxOpen = true;
    stopAutoplay();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxVideo) lightboxVideo.pause();
    lightboxOpen = false;
    document.body.style.overflow = '';
    if (isInView) startAutoplay();
  }

  let stackEl: HTMLElement;

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchEndX = touchStartX;
    touchEndY = touchStartY;
    isSwiping = false;
  }

  function handleTouchMove(e: TouchEvent) {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
    const dx = Math.abs(touchEndX - touchStartX);
    const dy = Math.abs(touchEndY - touchStartY);
    if (dx > dy && dx > 10) {
      isSwiping = true;
      e.preventDefault();
    }
  }

  function handleTouchEnd() {
    if (!isSwiping) {
      if (activeTestimonial.videoSrc) openLightbox();
      return;
    }
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX = 0;
    touchStartY = 0;
    touchEndX = 0;
    touchEndY = 0;
    isSwiping = false;
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

  function handleVideoCanPlay() {
    videoLoaded = true;
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
              if (videoElement && !reducedMotion) videoElement.play().catch(() => {});
            } else if (!isHovering && !lightboxOpen) {
              stopAutoplay();
              if (videoElement) videoElement.pause();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (containerEl) observer.observe(containerEl);
    }
  });

  onDestroy(() => {
    stopAutoplay();
    if (browser) {
      window.removeEventListener('keydown', handleKeydown);
    }
    observer?.disconnect();
  });
</script>

<div class="avt" bind:this={containerEl}>
  <div class="avt-container">
    <div
      class="avt-left"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
      role="region"
      aria-label="Video testimonial"
    >
      <div class="avt-stack" bind:this={stackEl}>
        {#each testimonials as testimonial, i}
          {@const order = getStackOrder(i)}
          {@const isActive = order === 0}
          {@const isVisible = order <= 3}
          {#if isVisible}
            <div
              class="avt-card"
              class:avt-card--active={isActive}
              class:avt-card--behind={!isActive}
              style="
                --stack-index: {order};
                --offset-y: {order * 14}px;
                --offset-x: {order * 6}px;
                --card-scale: {1 - order * 0.05};
                --card-rotate: {order * 2}deg;
                --card-opacity: {isActive ? 1 : Math.max(0.15, 1 - order * 0.25)};
                z-index: {20 - order};
              "
            >
              {#if isActive}
                {#if testimonial.videoSrc}
                  <img
                    src={getThumbnailUrl(testimonial.videoSrc)}
                    alt={testimonial.clientName}
                    class="avt-card__thumbnail"
                    loading="eager"
                    decoding="async"
                  />
                {:else}
                  <div class="avt-card__placeholder">
                    <div class="avt-card__initial">
                      {testimonial.clientName.charAt(0)}
                    </div>
                  </div>
                {/if}

                {#if testimonial.videoSrc}
                  {#key activeIndex}
                    <video
                      bind:this={videoElement}
                      src={testimonial.videoSrc + '#t=0.1'}
                      autoplay
                      muted
                      loop
                      playsinline
                      preload="auto"
                      class="avt-card__video"
                      class:avt-card__video--visible={videoLoaded}
                      on:canplay={handleVideoCanPlay}
                      on:loadeddata={handleVideoCanPlay}
                    >
                      <track kind="captions" />
                    </video>
                  {/key}
                {/if}

                <div class="avt-card__gradient"></div>

                <div class="avt-card__badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                  Reel
                </div>

                <div class="avt-card__info">
                  <p class="avt-card__name">{testimonial.clientName}</p>
                  <p class="avt-card__role">{testimonial.clientRole}</p>
                  <p class="avt-card__company">{testimonial.company}</p>
                </div>
              {:else}
                <div class="avt-card__bg">
                  {#if testimonial.videoSrc}
                    <img
                      src={getThumbnailUrl(testimonial.videoSrc)}
                      alt={testimonial.clientName}
                      class="avt-card__bg-thumb"
                      loading="lazy"
                      decoding="async"
                    />
                  {/if}
                  <div class="avt-card__bg-initial">
                    {testimonial.clientName.charAt(0)}
                  </div>
                </div>
              {/if}
            </div>
          {/if}
        {/each}

        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="avt-touch-overlay"
          on:touchstart={handleTouchStart}
          on:touchmove|nonpassive={handleTouchMove}
          on:touchend={handleTouchEnd}
        ></div>
      </div>

      {#if activeTestimonial.videoSrc}
        <button
          class="avt-play"
          on:click={openLightbox}
          aria-label="Guarda il video"
        >
          <div class="avt-play__icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span class="avt-play__text">Guarda</span>
        </button>
      {/if}

      <div class="avt-mobile-nav">
        <button class="avt-nav__btn avt-nav__btn--prev" on:click={prev} aria-label="Precedente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span class="avt-nav__counter">
          {activeIndex + 1}<span class="avt-nav__separator">/</span>{testimonials.length}
        </span>
        <button class="avt-nav__btn avt-nav__btn--next" on:click={next} aria-label="Successivo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>

    <div class="avt-right">
      {#key activeIndex}
        <div class="avt-content" class:avt-content--entering={true}>
          <h3 class="avt-content__name">{activeTestimonial.clientName}</h3>
          <p class="avt-content__role">{activeTestimonial.clientRole}, {activeTestimonial.company}</p>

          <blockquote class="avt-content__quote">
            {#each quoteWords as word, wi}
              <span
                class="avt-word"
                style="--word-index: {wi}"
              >{word}&nbsp;</span>
            {/each}
          </blockquote>
        </div>
      {/key}

      <div class="avt-nav avt-nav--desktop">
        <button class="avt-nav__btn avt-nav__btn--prev" on:click={prev} aria-label="Precedente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span class="avt-nav__counter">
          {activeIndex + 1}<span class="avt-nav__separator">/</span>{testimonials.length}
        </span>
        <button class="avt-nav__btn avt-nav__btn--next" on:click={next} aria-label="Successivo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

{#if lightboxOpen && activeTestimonial.videoSrc}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="avt-lightbox"
    transition:fade={{ duration: 200 }}
    on:click={closeLightbox}
    role="dialog"
    aria-modal="true"
    aria-label="Video player"
  >
    <div class="avt-lightbox__backdrop"></div>

    <button
      class="avt-lightbox__close"
      on:click={closeLightbox}
      aria-label="Chiudi"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    <div
      class="avt-lightbox__content"
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
        class="avt-lightbox__video"
      >
        <track kind="captions" />
      </video>

      <div class="avt-lightbox__info">
        <div class="avt-lightbox__avatar">
          {activeTestimonial.clientName.charAt(0)}
        </div>
        <div>
          <p class="avt-lightbox__name">{activeTestimonial.clientName}</p>
          <p class="avt-lightbox__role">{activeTestimonial.clientRole} — {activeTestimonial.company}</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .avt {
    width: 100%;
  }

  .avt-container {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    .avt-container {
      flex-direction: row;
      align-items: center;
      gap: 5rem;
    }
  }

  .avt-left {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 0.75rem;
  }

  @media (min-width: 1024px) {
    .avt-left {
      width: 340px;
      max-width: none;
      margin: 0;
      padding: 2rem 2rem 2.5rem;
    }
  }

  .avt-touch-overlay {
    position: absolute;
    inset: 0;
    z-index: 30;
    touch-action: pan-y;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    .avt-touch-overlay {
      display: none;
    }
  }

  .avt-mobile-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    margin-top: 1.25rem;
  }

  @media (min-width: 1024px) {
    .avt-mobile-nav {
      display: none;
    }
  }

  .avt-mobile-nav .avt-nav__btn {
    width: 3rem;
    height: 3rem;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.15);
  }

  :global([data-theme="light"]) .avt-mobile-nav .avt-nav__btn {
    background: rgba(0, 0, 0, 0.06);
    border-color: rgba(0, 0, 0, 0.12);
  }

  .avt-stack {
    position: relative;
    aspect-ratio: 9/16;
  }

  .avt-card {
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    overflow: hidden;
    transform-origin: center bottom;
    transform: translateY(var(--offset-y)) translateX(var(--offset-x)) rotate(var(--card-rotate)) scale(var(--card-scale));
    opacity: var(--card-opacity);
    transition: transform 0.55s cubic-bezier(0.32, 0.72, 0, 1),
                opacity 0.55s cubic-bezier(0.32, 0.72, 0, 1),
                filter 0.55s cubic-bezier(0.32, 0.72, 0, 1);
    will-change: transform, opacity;
    backface-visibility: hidden;
  }

  .avt-card--active {
    pointer-events: auto;
    box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .avt-card--behind {
    pointer-events: none;
    box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.3);
    filter: brightness(0.7);
  }

  .avt-card__thumbnail {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .avt-card__placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(110deg, #1a1a1a 25%, #2a2a2a 37%, #1a1a1a 63%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }

  .avt-card__bg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    overflow: hidden;
  }

  .avt-card__bg-thumb {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
  }

  .avt-card__bg-initial {
    position: relative;
    z-index: 1;
    font-size: 4rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.08);
    text-transform: uppercase;
    user-select: none;
    line-height: 1;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .avt-card__initial {
    font-size: 5rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.12);
    text-transform: uppercase;
    user-select: none;
    line-height: 1;
  }

  .avt-card__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .avt-card__video--visible {
    opacity: 1;
  }

  .avt-card__gradient {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.2) 35%,
      transparent 60%
    );
    pointer-events: none;
  }

  .avt-card__badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 5;
    padding: 0.3rem 0.6rem;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    line-height: 1;
  }

  .avt-card__badge svg {
    width: 0.75rem;
    height: 0.75rem;
  }

  .avt-card__info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.25rem;
    z-index: 5;
  }

  .avt-card__name {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    line-height: 1.3;
  }

  .avt-card__role {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 0.125rem;
  }

  .avt-card__company {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    margin-top: 0.25rem;
  }

  .avt-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }

  @media (min-width: 1024px) {
    .avt-play {
      display: flex;
    }
  }

  .avt-left:hover .avt-play {
    opacity: 1;
  }

  .avt-play__icon {
    width: 4rem;
    height: 4rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    background: rgba(214, 72, 126, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.25);
    transition: transform 0.3s ease, background-color 0.3s ease;
    box-shadow: 0 10px 30px rgba(214, 72, 126, 0.35);
  }

  .avt-play:hover .avt-play__icon {
    transform: scale(1.1);
    background-color: #D6487E;
  }

  .avt-play__icon svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.15rem;
  }

  .avt-play__text {
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .avt-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 280px;
  }

  .avt-content {
    margin-bottom: 2.5rem;
  }

  .avt-content--entering {
    animation: contentSlideIn 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards;
  }

  @keyframes contentSlideIn {
    0% {
      opacity: 0;
      transform: translateY(15px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .avt-content__name {
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--text-primary, #111);
    margin: 0 0 0.25rem;
    line-height: 1.3;
  }

  @media (min-width: 768px) {
    .avt-content__name {
      font-size: 1.5rem;
    }
  }

  .avt-content__role {
    font-size: 1rem;
    color: var(--text-secondary, #666);
    margin: 0 0 1.5rem;
    line-height: 1.4;
  }

  .avt-content__quote {
    font-size: 1.125rem;
    line-height: 1.75;
    color: var(--text-primary, #111);
    margin: 0;
    padding: 0;
    border: none;
    font-style: normal;
    display: flex;
    flex-wrap: wrap;
  }

  @media (min-width: 768px) {
    .avt-content__quote {
      font-size: 1.25rem;
    }
  }

  .avt-word {
    display: inline-block;
    opacity: 0;
    filter: blur(10px);
    transform: translateY(5px);
    animation: wordReveal 0.4s ease forwards;
    animation-delay: calc(0.03s * var(--word-index));
  }

  @keyframes wordReveal {
    0% {
      opacity: 0;
      filter: blur(10px);
      transform: translateY(5px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
      transform: translateY(0);
    }
  }

  .avt-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  .avt-nav--desktop {
    display: none;
  }

  @media (min-width: 1024px) {
    .avt-nav--desktop {
      display: flex;
      justify-content: flex-start;
    }
  }

  .avt-nav__counter {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary, #666);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.05em;
    min-width: 3rem;
    text-align: center;
  }

  .avt-nav__separator {
    margin: 0 0.15rem;
    opacity: 0.4;
  }

  .avt-nav__btn {
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary, #666);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .avt-nav__btn:hover {
    background: rgba(214, 72, 126, 0.15);
    border-color: rgba(214, 72, 126, 0.4);
    color: #D6487E;
  }

  .avt-nav__btn:hover svg {
    transform: rotate(-12deg);
  }

  .avt-nav__btn--next:hover svg {
    transform: rotate(12deg);
  }

  .avt-nav__btn svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s ease;
  }

  :global([data-theme="light"]) .avt-nav__btn {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.1);
  }

  :global([data-theme="light"]) .avt-nav__btn:hover {
    background: rgba(214, 72, 126, 0.08);
    border-color: rgba(214, 72, 126, 0.3);
  }

  :global([data-theme="light"]) .avt-card__bg {
    background: linear-gradient(135deg, #e8e8f0 0%, #d8d8e8 50%, #c8c8d8 100%);
  }

  :global([data-theme="light"]) .avt-card__bg-initial {
    color: rgba(0, 0, 0, 0.06);
  }

  :global([data-theme="light"]) .avt-card--behind {
    filter: brightness(0.92);
  }

  .avt-lightbox {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .avt-lightbox__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .avt-lightbox__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 110;
    width: 3rem;
    height: 3rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .avt-lightbox__close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .avt-lightbox__close svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .avt-lightbox__content {
    position: relative;
    z-index: 105;
    max-width: 400px;
    width: 100%;
  }

  .avt-lightbox__video {
    width: 100%;
    aspect-ratio: 9/16;
    object-fit: cover;
    border-radius: 1.5rem;
    box-shadow: 0 25px 100px rgba(214, 72, 126, 0.25);
  }

  .avt-lightbox__info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1.25rem;
    padding: 0 0.25rem;
  }

  .avt-lightbox__avatar {
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
    flex-shrink: 0;
  }

  .avt-lightbox__name {
    color: white;
    font-weight: 600;
    font-size: 1rem;
  }

  .avt-lightbox__role {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .avt-word {
      animation: none;
      opacity: 1;
      filter: none;
      transform: none;
    }

    .avt-card {
      transition: none;
    }

    .avt-content--entering {
      animation: none;
    }

    .avt-card__placeholder {
      animation: none;
    }

    .avt-nav__btn:hover svg {
      transform: none;
    }

    .avt-nav__btn--next:hover svg {
      transform: none;
    }
  }
</style>