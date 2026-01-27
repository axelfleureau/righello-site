<script lang="ts">
  export let frontTitle: string;
  export let frontIcon: string = '';
  export let backContent: string;
  export let color: string = '#D6487E';
  export let span: string = '1';
  
  let isFlipped = false;
  
  function toggleFlip() {
    isFlipped = !isFlipped;
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  }
</script>

<div 
  class="card-flip"
  class:flipped={isFlipped}
  style="--accent-color: {color}; --span: {span};"
  on:click={toggleFlip}
  on:keydown={handleKeydown}
  role="button"
  tabindex="0"
  aria-label="{frontTitle} - clicca per maggiori dettagli"
>
  <div class="card-inner">
    <div class="card-face card-front">
      {#if frontIcon}
        <div class="card-icon" aria-hidden="true">
          {@html frontIcon}
        </div>
      {/if}
      <h3 class="card-title">{frontTitle}</h3>
      <div class="flip-hint">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 1l4 4-4 4" />
          <path d="M3 11V9a4 4 0 014-4h14" />
          <path d="M7 23l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 01-4 4H3" />
        </svg>
      </div>
    </div>
    <div class="card-face card-back">
      <p class="card-content">{backContent}</p>
      <div class="flip-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </div>
    </div>
  </div>
</div>

<style>
  .card-flip {
    perspective: 1000px;
    cursor: pointer;
    grid-column: span var(--span);
    min-height: 200px;
  }
  
  @media (max-width: 639px) {
    .card-flip {
      grid-column: span 1;
    }
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 200px;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }
  
  .card-flip.flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(12px);
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  .card-flip:hover .card-face {
    border-color: var(--accent-color);
    box-shadow: 0 0 30px -5px var(--accent-color);
  }
  
  .card-front {
    background: linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(20, 20, 20, 0.9));
  }
  
  .card-back {
    transform: rotateY(180deg);
    background: linear-gradient(135deg, var(--accent-color), rgba(6, 182, 212, 0.8));
    color: white;
  }
  
  .card-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    color: var(--accent-color);
  }
  
  .card-icon :global(svg) {
    width: 100%;
    height: 100%;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary, #fff);
    margin: 0;
    line-height: 1.3;
  }
  
  .card-content {
    font-size: 0.95rem;
    line-height: 1.6;
    color: white;
    margin: 0;
    font-weight: 500;
  }
  
  .flip-hint, .flip-back {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 24px;
    height: 24px;
    opacity: 0.5;
    transition: opacity 0.3s;
  }
  
  .card-flip:hover .flip-hint,
  .card-flip:hover .flip-back {
    opacity: 1;
  }
  
  .flip-hint {
    color: var(--text-secondary, #a1a1aa);
  }
  
  .flip-back {
    color: white;
  }
  
  :global([data-theme="light"]) .card-front {
    background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="light"]) .card-title {
    color: #0f172a;
  }
  
  :global([data-theme="light"]) .flip-hint {
    color: #475569;
  }
</style>
