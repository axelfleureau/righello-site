<script lang="ts">
  import { onMount } from 'svelte';
  
  export let title: string = 'Design Systems';
  export let subtitle: string = 'Explore the fundamentals';
  export let description: string = 'Dive deep into the world of modern UI/UX design.';
  export let features: string[] = [];
  export let color: string = '#D6487E';
  export let span: string = '1';
  export let buttonText: string = 'Start today';
  export let buttonHref: string = '#';
  
  let isFlipped = false;
  let reducedMotion = false;
  
  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  
  function handleMouseEnter() {
    if (!reducedMotion) {
      isFlipped = true;
    }
  }
  
  function handleMouseLeave() {
    isFlipped = false;
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      isFlipped = !isFlipped;
    }
  }
  
  function handleFocus() {
    if (!reducedMotion) {
      isFlipped = true;
    }
  }
  
  function handleBlur() {
    isFlipped = false;
  }
  
  function closeCard(e: MouseEvent) {
    e.stopPropagation();
    isFlipped = false;
  }
</script>

<div
  class="card-flip-wrapper"
  class:flipped={isFlipped}
  style="--accent-color: {color}; --span: {span};"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:keydown={handleKeydown}
  on:focus={handleFocus}
  on:blur={handleBlur}
  role="button"
  tabindex="0"
  aria-label="{title} - hover o premi per maggiori dettagli"
>
  <div class="card-inner">
    <div class="card-face card-front">
      <div class="card-front-bg">
        <div class="pulsing-circles">
          {#each Array(10) as _, i}
            <div
              class="pulse-circle"
              style="animation-delay: {i * 0.3}s"
            ></div>
          {/each}
        </div>
      </div>
      
      <div class="card-front-content">
        <div class="front-text">
          <h3 class="card-title">{title}</h3>
          <p class="card-subtitle">{subtitle}</p>
        </div>
        <div class="flip-icon-wrapper">
          <div class="flip-icon-glow"></div>
          <svg class="flip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 1l4 4-4 4" />
            <path d="M3 11V9a4 4 0 014-4h14" />
            <path d="M7 23l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 01-4 4H3" />
          </svg>
        </div>
      </div>
    </div>
    
    <div class="card-face card-back">
      <div class="card-back-content">
        <div class="back-header">
          <div class="back-header-row">
            <h3 class="card-title">{title}</h3>
            <button 
              class="close-button" 
              on:click={closeCard}
              aria-label="Chiudi dettagli"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="card-description">{description}</p>
        </div>
        
        {#if features.length > 0}
          <div class="features-list">
            {#each features as feature, i}
              <div
                class="feature-item"
                class:visible={isFlipped}
                style="transition-delay: {i * 100 + 200}ms"
              >
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span>{feature}</span>
              </div>
            {/each}
          </div>
        {/if}
        
        <div class="card-footer">
          <a href={buttonHref} class="cta-button" on:click|stopPropagation>
            <span>{buttonText}</span>
            <div class="cta-icon-wrapper">
              <div class="cta-icon-glow"></div>
              <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .card-flip-wrapper {
    perspective: 2000px;
    min-height: 420px;
    height: auto;
    width: 100%;
    max-width: 280px;
    cursor: pointer;
    grid-column: span var(--span);
    position: relative;
    z-index: 1;
    transition: z-index 0s 0s;
  }
  
  .card-flip-wrapper:hover,
  .card-flip-wrapper:focus,
  .card-flip-wrapper.flipped {
    z-index: 10;
    transition: z-index 0s 0s;
  }
  
  @media (max-width: 639px) {
    .card-flip-wrapper {
      grid-column: span 1;
      max-width: 100%;
    }
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .card-flip-wrapper.flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: box-shadow 700ms, border-color 300ms;
  }
  
  .card-flip-wrapper:hover .card-face,
  .card-flip-wrapper:focus .card-face {
    box-shadow: 0 0 40px -10px var(--accent-color);
    border-color: color-mix(in srgb, var(--accent-color) 40%, transparent);
  }
  
  .card-front {
    background: linear-gradient(to bottom, rgba(39, 39, 42, 0.8), rgba(24, 24, 27, 0.95));
  }
  
  .card-front-bg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 5rem;
    overflow: hidden;
  }
  
  .pulsing-circles {
    position: relative;
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pulse-circle {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 140px;
    opacity: 0;
    box-shadow: 0 0 50px var(--accent-color);
    animation: pulse-scale 3s linear infinite;
  }
  
  .card-flip-wrapper:hover .pulse-circle {
    animation-duration: 2s;
  }
  
  @keyframes pulse-scale {
    0% {
      transform: scale(2);
      opacity: 0;
      box-shadow: 0 0 50px var(--accent-color);
    }
    50% {
      transform: translateY(-5px) scale(1);
      opacity: 1;
      box-shadow: 0 8px 20px var(--accent-color);
    }
    100% {
      transform: translateY(5px) scale(0.1);
      opacity: 0;
      box-shadow: 0 10px 20px transparent;
    }
  }
  
  .card-front-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.25rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.75rem;
  }
  
  .front-text {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
  
  .card-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary, #fff);
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.02em;
    transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .card-flip-wrapper:hover .card-front .card-title {
    transform: translateY(-4px);
  }
  
  .card-subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary, #a1a1aa);
    margin: 0;
    line-height: 1.4;
    transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 50ms;
  }
  
  .card-flip-wrapper:hover .card-subtitle {
    transform: translateY(-4px);
  }
  
  .flip-icon-wrapper {
    position: relative;
    flex-shrink: 0;
  }
  
  .flip-icon-glow {
    position: absolute;
    inset: -8px;
    border-radius: 8px;
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent-color) 20%, transparent), transparent);
    opacity: 0;
    transition: opacity 300ms;
  }
  
  .card-flip-wrapper:hover .flip-icon-glow {
    opacity: 1;
  }
  
  .flip-icon {
    position: relative;
    width: 16px;
    height: 16px;
    color: var(--accent-color);
    transition: transform 300ms;
  }
  
  .card-flip-wrapper:hover .flip-icon {
    transform: scale(1.1) rotate(-12deg);
  }
  
  .card-back {
    transform: rotateY(180deg);
    background: linear-gradient(to bottom, rgba(39, 39, 42, 0.95), rgba(0, 0, 0, 0.98));
    display: flex;
    flex-direction: column;
  }
  
  .card-back-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.5rem;
  }
  
  .back-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .back-header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }
  
  .close-button {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    padding: 4px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms ease;
  }
  
  .close-button svg {
    width: 16px;
    height: 16px;
    color: var(--text-secondary, #a1a1aa);
    transition: color 200ms ease;
  }
  
  .close-button:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--accent-color);
  }
  
  .close-button:hover svg {
    color: var(--accent-color);
  }
  
  :global([data-theme="light"]) .close-button {
    background: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="light"]) .close-button svg {
    color: #64748b;
  }
  
  :global([data-theme="light"]) .close-button:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  
  .card-back .card-title {
    transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .card-flip-wrapper:hover .card-back .card-title {
    transform: translateY(-2px);
  }
  
  .card-description {
    font-size: 0.875rem;
    color: var(--text-secondary, #a1a1aa);
    margin: 0;
    line-height: 1.5;
    transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .card-flip-wrapper:hover .card-description {
    transform: translateY(-2px);
  }
  
  .features-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1.25rem;
    flex: 1;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary, #a1a1aa);
    transform: translateX(-10px);
    opacity: 0;
    transition: transform 500ms, opacity 500ms;
  }
  
  .feature-item.visible {
    transform: translateX(0);
    opacity: 1;
  }
  
  .arrow-icon {
    width: 12px;
    height: 12px;
    color: var(--accent-color);
    flex-shrink: 0;
  }
  
  .card-footer {
    margin-top: auto;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .cta-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    margin: -0.75rem;
    border-radius: 12px;
    text-decoration: none;
    color: var(--text-primary, #fff);
    font-weight: 500;
    font-size: 0.875rem;
    background: linear-gradient(to right, rgba(255,255,255,0.03), rgba(255,255,255,0.03));
    transition: background 300ms, transform 300ms;
  }
  
  .cta-button:hover {
    background: linear-gradient(to right, color-mix(in srgb, var(--accent-color) 10%, transparent), color-mix(in srgb, var(--accent-color) 5%, transparent));
    transform: scale(1.02);
  }
  
  .cta-button:hover span {
    color: var(--accent-color);
  }
  
  .cta-icon-wrapper {
    position: relative;
  }
  
  .cta-icon-glow {
    position: absolute;
    inset: -6px;
    border-radius: 8px;
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent-color) 20%, transparent), transparent);
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
  
  .cta-button:hover .cta-icon-glow {
    opacity: 1;
    transform: scale(1);
  }
  
  .cta-icon {
    position: relative;
    width: 16px;
    height: 16px;
    color: var(--accent-color);
    transition: transform 300ms;
  }
  
  .cta-button:hover .cta-icon {
    transform: translateX(2px) scale(1.1);
  }
  
  :global([data-theme="light"]) .card-front {
    background: linear-gradient(to bottom, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.98));
  }
  
  :global([data-theme="light"]) .card-back {
    background: linear-gradient(to bottom, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 1));
  }
  
  :global([data-theme="light"]) .card-face {
    border-color: rgba(0, 0, 0, 0.08);
  }
  
  :global([data-theme="light"]) .card-title {
    color: #0f172a;
  }
  
  :global([data-theme="light"]) .card-subtitle,
  :global([data-theme="light"]) .card-description {
    color: #475569;
  }
  
  :global([data-theme="light"]) .feature-item {
    color: #475569;
  }
  
  :global([data-theme="light"]) .cta-button {
    color: #0f172a;
  }
  
  :global([data-theme="light"]) .card-footer {
    border-color: rgba(0, 0, 0, 0.08);
  }
  
  @media (prefers-reduced-motion: reduce) {
    .card-inner {
      transition: none;
    }
    
    .pulse-circle {
      animation: none;
      opacity: 0.3;
      transform: scale(1);
    }
    
    .feature-item {
      opacity: 1;
      transform: none;
      transition: none;
    }
    
    .card-title,
    .card-subtitle,
    .card-description {
      transition: none;
    }
  }
  
  .card-flip-wrapper:focus {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }
  
  .card-flip-wrapper:focus:not(:focus-visible) {
    outline: none;
  }
</style>
