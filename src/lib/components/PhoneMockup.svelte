<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import { fade, scale } from 'svelte/transition';
  
  export let videoSrc: string | null = null;
  export let showPlaceholder = true;
  
  let mounted = false;
  let isHovered = false;
  
  const rotation = spring({ x: 0, y: 0 }, {
    stiffness: 0.05,
    damping: 0.3
  });
  
  const position = spring({ x: 0, y: 0 }, {
    stiffness: 0.08,
    damping: 0.4
  });
  
  function handleMouseMove(e: MouseEvent) {
    if (!mounted) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    rotation.set({ x: y * 15, y: -x * 15 });
    position.set({ x: x * 10, y: y * 10 });
  }
  
  function handleMouseLeave() {
    rotation.set({ x: 0, y: 0 });
    position.set({ x: 0, y: 0 });
    isHovered = false;
  }
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  onMount(() => {
    mounted = true;
  });
</script>

<div 
  class="phone-container"
  on:mousemove={handleMouseMove}
  on:mouseleave={handleMouseLeave}
  on:mouseenter={handleMouseEnter}
  role="img"
  aria-label="Smartphone mockup showing social media content"
>
  <div 
    class="phone-wrapper phone-entrance"
    style="
      transform: 
        perspective(1000px) 
        rotateX({$rotation.x}deg) 
        rotateY({$rotation.y}deg)
        translateX({$position.x}px)
        translateY({$position.y}px);
    "
  >
      <div class="phone-frame">
        <div class="phone-notch"></div>
        
        <div class="phone-screen">
          {#if videoSrc}
            <video 
              autoplay 
              loop 
              muted 
              playsinline
              class="w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          {:else if showPlaceholder}
            <div class="placeholder-content">
              <div class="gradient-animation"></div>
              
              <div class="overlay-content">
                <div class="play-button" class:pulse={!isHovered}>
                  <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                
                <div class="reel-ui">
                  <div class="reel-stats">
                    <div class="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>24.5K</span>
                    </div>
                    <div class="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M21 6h-2V3h-2v3h-2V3h-2v3h-2V3H9v3H7V3H5v3H3v15h18V6zm-2 13H5V8h14v11z"/>
                      </svg>
                      <span>1.2K</span>
                    </div>
                    <div class="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                      </svg>
                      <span>892</span>
                    </div>
                  </div>
                  
                  <div class="reel-caption">
                    <div class="brand-tag">
                      <span class="brand-avatar"></span>
                      <span class="brand-name">righello.lab</span>
                    </div>
                    <p class="caption-text">Risultati che parlano da soli 📈</p>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>
        
        <div class="phone-home-indicator"></div>
      </div>
      
      <div class="phone-glow" class:active={isHovered}></div>
    </div>
</div>

<style>
  .phone-container {
    position: relative;
    width: 280px;
    height: 560px;
    cursor: pointer;
  }
  
  @media (min-width: 768px) {
    .phone-container {
      width: 320px;
      height: 640px;
    }
  }
  
  .phone-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
  }
  
  .phone-entrance {
    animation: phoneScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
    opacity: 0;
  }
  
  @keyframes phoneScale {
    from {
      opacity: 0;
      transform: scale(0.8) perspective(1000px);
    }
    to {
      opacity: 1;
      transform: scale(1) perspective(1000px);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .phone-entrance {
      animation: none;
      opacity: 1;
    }
  }
  
  .phone-frame {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
    border-radius: 44px;
    padding: 12px;
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.05);
  }
  
  .phone-notch {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 28px;
    background: #000;
    border-radius: 20px;
    z-index: 10;
  }
  
  @media (min-width: 768px) {
    .phone-notch {
      width: 120px;
      height: 32px;
    }
  }
  
  .phone-screen {
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 36px;
    overflow: hidden;
    position: relative;
  }
  
  .phone-home-indicator {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  .placeholder-content {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .gradient-animation {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      #D6487E 0%,
      #a855f7 25%,
      #06B6D4 50%,
      #a855f7 75%,
      #D6487E 100%
    );
    background-size: 400% 400%;
    animation: gradientFlow 8s ease infinite;
  }
  
  @keyframes gradientFlow {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  .overlay-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }
  
  .play-button {
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
  }
  
  .play-button.pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  .play-button svg {
    margin-left: 4px;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(214, 72, 126, 0.5);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 0 15px rgba(214, 72, 126, 0);
    }
  }
  
  .phone-container:hover .play-button {
    background: #D6487E;
    border-color: #D6487E;
    transform: scale(1.1);
  }
  
  .reel-ui {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
  }
  
  .reel-stats {
    position: absolute;
    right: 12px;
    bottom: 100px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: white;
    font-size: 12px;
    font-weight: 600;
  }
  
  .reel-caption {
    padding-right: 50px;
  }
  
  .brand-tag {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .brand-avatar {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    border-radius: 50%;
    border: 2px solid white;
  }
  
  .brand-name {
    color: white;
    font-weight: 700;
    font-size: 14px;
  }
  
  .caption-text {
    color: white;
    font-size: 13px;
    line-height: 1.4;
  }
  
  .phone-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(
      ellipse at center,
      rgba(214, 72, 126, 0.3) 0%,
      rgba(6, 182, 212, 0.2) 40%,
      transparent 70%
    );
    border-radius: 60px;
    z-index: -1;
    opacity: 0.5;
    filter: blur(30px);
    transition: opacity 0.3s ease;
  }
  
  .phone-glow.active {
    opacity: 1;
  }
</style>
