<script lang="ts">
  export let title = "I nostri lavori";
  export let subtitle = "Reel & Social";
  
  const reels = [
    {
      id: '1',
      client: 'Zanutta',
      type: 'Reel Instagram',
      views: '125K',
      thumbnail: null,
    },
    {
      id: '2',
      client: 'Reginato',
      type: 'TikTok',
      views: '89K',
      thumbnail: null,
    },
    {
      id: '3',
      client: 'Ennevi',
      type: 'Reel Instagram',
      views: '210K',
      thumbnail: null,
    },
    {
      id: '4',
      client: 'Dolfo Restaurant',
      type: 'Story Highlight',
      views: '45K',
      thumbnail: null,
    },
    {
      id: '5',
      client: 'Reguta Wines',
      type: 'Reel Instagram',
      views: '156K',
      thumbnail: null,
    },
    {
      id: '6',
      client: 'Barcolana',
      type: 'TikTok',
      views: '320K',
      thumbnail: null,
    },
  ];
  
  let scrollContainer: HTMLElement;
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;
  
  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.cursor = 'grabbing';
  }
  
  function handleMouseUp() {
    isDragging = false;
    scrollContainer.style.cursor = 'grab';
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  }
</script>

<section class="reel-showcase">
  <div class="section-container">
    <div class="text-center mb-12">
      <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4 font-medium">
        {subtitle}
      </p>
      <h2 class="heading-lg">
        {title.split(' ').slice(0, -1).join(' ')} <span class="gradient-text">{title.split(' ').slice(-1)}</span>
      </h2>
    </div>
  </div>
  
  <div 
    bind:this={scrollContainer}
    class="reel-scroll"
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:mouseleave={handleMouseUp}
    on:mousemove={handleMouseMove}
    role="region"
    aria-label="Showcase dei nostri reel social"
  >
    <div class="reel-track">
      {#each reels as reel, i}
        <div class="reel-card" style="--index: {i}">
          <div class="reel-preview">
            <div class="reel-gradient"></div>
            <div class="play-button">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div class="reel-stats">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <span>{reel.views}</span>
            </div>
          </div>
          <div class="reel-info">
            <h3 class="reel-client">{reel.client}</h3>
            <p class="reel-type">{reel.type}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="section-container mt-8">
    <p class="text-center text-sm text-[var(--text-secondary)]">
      Trascina per esplorare i nostri lavori
    </p>
  </div>
</section>

<style>
  .reel-showcase {
    padding: 4rem 0 5rem;
    position: relative;
    overflow: hidden;
  }
  
  @media (min-width: 768px) {
    .reel-showcase {
      padding: 5rem 0 6rem;
    }
  }
  
  .reel-scroll {
    overflow-x: auto;
    cursor: grab;
    padding: 1rem 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .reel-scroll::-webkit-scrollbar {
    display: none;
  }
  
  .reel-track {
    display: flex;
    gap: 1.5rem;
    padding: 0 max(1rem, calc((100vw - 1280px) / 2 + 2rem));
    width: max-content;
  }
  
  .reel-card {
    flex-shrink: 0;
    width: 200px;
    transition: transform 0.3s ease;
  }
  
  @media (min-width: 768px) {
    .reel-card {
      width: 240px;
    }
  }
  
  .reel-card:hover {
    transform: translateY(-8px);
  }
  
  .reel-preview {
    position: relative;
    aspect-ratio: 9/16;
    border-radius: 1.25rem;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%);
    border: 2px solid rgba(214, 72, 126, 0.3);
    transition: all 0.3s ease;
  }
  
  .reel-card:hover .reel-preview {
    border-color: #D6487E;
    box-shadow: 0 20px 40px rgba(214, 72, 126, 0.2);
  }
  
  .reel-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, 
      transparent 0%, 
      transparent 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
  
  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: rgba(214, 72, 126, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0.8;
    transition: all 0.3s ease;
  }
  
  .reel-card:hover .play-button {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
    background: #D6487E;
  }
  
  .reel-stats {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: 2rem;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .reel-info {
    padding: 1rem 0.5rem 0;
  }
  
  .reel-client {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  .reel-type {
    font-size: 0.875rem;
    color: #D6487E;
  }
</style>
