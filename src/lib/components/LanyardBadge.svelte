<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  export let logoSrc: string = '/logo-white.png';
  export let title: string = 'Righello';
  export let subtitle: string = 'Growth Agency';
  
  let canvas: HTMLCanvasElement;
  let container: HTMLElement;
  let animationId: number;
  let isDragging = false;
  let isHovered = false;
  
  const cardRotation = tweened({ x: 0, y: 0 }, { duration: 800, easing: cubicOut });
  const cardPosition = tweened({ x: 0, y: 0 }, { duration: 400, easing: cubicOut });
  
  let mouseX = 0;
  let mouseY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let swingAngle = 0;
  let swingVelocity = 0;
  
  const SWING_DAMPING = 0.97;
  const SWING_STIFFNESS = 0.02;
  const GRAVITY_INFLUENCE = 0.001;
  
  function handleMouseMove(e: MouseEvent) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX = (e.clientX - centerX) / (rect.width / 2);
    mouseY = (e.clientY - centerY) / (rect.height / 2);
    
    if (isDragging) {
      cardPosition.set({ x: mouseX * 50, y: mouseY * 50 });
      swingVelocity += mouseX * 0.5;
    } else if (isHovered) {
      cardRotation.set({ x: -mouseY * 15, y: mouseX * 15 });
    }
  }
  
  function handleMouseDown() {
    isDragging = true;
    if (container) container.style.cursor = 'grabbing';
  }
  
  function handleMouseUp() {
    isDragging = false;
    if (container) container.style.cursor = isHovered ? 'grab' : 'default';
    cardPosition.set({ x: 0, y: 0 });
  }
  
  function handleMouseEnter() {
    isHovered = true;
    if (container && !isDragging) container.style.cursor = 'grab';
  }
  
  function handleMouseLeave() {
    isHovered = false;
    isDragging = false;
    if (container) container.style.cursor = 'default';
    cardRotation.set({ x: 0, y: 0 });
    cardPosition.set({ x: 0, y: 0 });
  }
  
  let touchStartX = 0;
  let touchStartY = 0;
  let touchActive = false;
  let touchTimer: ReturnType<typeof setTimeout> | null = null;
  const TOUCH_HOLD_MS = 300;

  function handleTouchStart(e: TouchEvent) {
    if (!container) return;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchActive = false;

    touchTimer = setTimeout(() => {
      touchActive = true;
      isDragging = true;
      isHovered = true;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = (touch.clientX - centerX) / (rect.width / 2);
      mouseY = (touch.clientY - centerY) / (rect.height / 2);
    }, TOUCH_HOLD_MS);
  }

  function handleTouchMove(e: TouchEvent) {
    if (!container) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartX);
    const dy = Math.abs(touch.clientY - touchStartY);

    if (!touchActive && (dx > 10 || dy > 10)) {
      if (touchTimer) { clearTimeout(touchTimer); touchTimer = null; }
      return;
    }

    if (!touchActive) return;

    e.preventDefault();
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX = (touch.clientX - centerX) / (rect.width / 2);
    mouseY = (touch.clientY - centerY) / (rect.height / 2);

    cardPosition.set({ x: mouseX * 60, y: mouseY * 60 });
    cardRotation.set({ x: -mouseY * 20, y: mouseX * 20 });
    swingVelocity += (touch.clientX - touchStartX) * 0.02;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }

  function handleTouchEnd() {
    if (touchTimer) { clearTimeout(touchTimer); touchTimer = null; }
    touchActive = false;
    isDragging = false;
    isHovered = false;
    cardPosition.set({ x: 0, y: 0 });
    cardRotation.set({ x: 0, y: 0 });
  }

  function handleTouchCancel() {
    handleTouchEnd();
  }
  
  function animate() {
    swingVelocity -= swingAngle * SWING_STIFFNESS;
    swingVelocity += Math.sin(Date.now() * GRAVITY_INFLUENCE) * 0.01;
    swingVelocity *= SWING_DAMPING;
    swingAngle += swingVelocity;
    
    animationId = requestAnimationFrame(animate);
  }
  
  onMount(() => {
    if (!browser) return;
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  });
  
  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });
  
  $: cardStyle = `
    transform: 
      perspective(1000px)
      translateX(${$cardPosition.x}px)
      translateY(${$cardPosition.y}px)
      rotateX(${$cardRotation.x}deg)
      rotateY(${$cardRotation.y + swingAngle * 2}deg)
      rotateZ(${swingAngle}deg);
  `;
</script>

<div 
  bind:this={container}
  class="lanyard-container"
  on:mousemove={handleMouseMove}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mouseleave={handleMouseLeave}
  on:mouseenter={handleMouseEnter}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
  on:touchcancel={handleTouchCancel}
  role="presentation"
>
  <div class="lanyard-rope">
    <div class="rope-segment"></div>
    <div class="rope-segment"></div>
    <div class="rope-segment"></div>
    <div class="clip"></div>
  </div>
  
  <div 
    class="badge-card"
    style={cardStyle}
  >
    <div class="card-inner">
      <div class="card-front">
        <div class="card-hole"></div>
        <div class="card-content">
          <div class="logo-container">
            <img src={logoSrc} alt={title} class="logo-image" />
          </div>
          <div class="card-text">
            <h3 class="card-title">{title}</h3>
            <p class="card-subtitle">{subtitle}</p>
          </div>
          <div class="card-footer">
            <div class="stars">
              {#each Array(5) as _}
                <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              {/each}
            </div>
          </div>
        </div>
        <div class="card-shine"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .lanyard-container {
    position: relative;
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 20px;
    touch-action: pan-y;
    user-select: none;
  }
  
  @media (min-width: 768px) {
    .lanyard-container {
      height: 600px;
    }
  }
  
  .lanyard-rope {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
  
  .rope-segment {
    width: 12px;
    height: 40px;
    background: linear-gradient(90deg, 
      #2a2a2a 0%, 
      #4a4a4a 20%, 
      #3a3a3a 50%, 
      #4a4a4a 80%, 
      #2a2a2a 100%
    );
    border-radius: 6px;
    position: relative;
  }
  
  .rope-segment::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    transform: translateX(-50%);
    width: 8px;
    height: 4px;
    background: #333;
    border-radius: 50%;
  }
  
  .clip {
    width: 20px;
    height: 30px;
    background: linear-gradient(135deg, #888 0%, #aaa 50%, #777 100%);
    border-radius: 4px 4px 8px 8px;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .clip::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 8px;
    background: #666;
    border-radius: 2px;
  }
  
  .badge-card {
    width: 280px;
    height: 380px;
    transform-style: preserve-3d;
    will-change: transform;
    margin-top: -5px;
  }
  
  @media (min-width: 768px) {
    .badge-card {
      width: 320px;
      height: 420px;
    }
  }
  
  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
  }
  
  .card-front {
    position: absolute;
    inset: 0;
    background: linear-gradient(145deg, 
      #1a1a1a 0%, 
      #0a0a0a 50%, 
      #151515 100%
    );
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    overflow: hidden;
    backface-visibility: hidden;
  }
  
  .card-hole {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 12px;
    background: #000;
    border-radius: 6px;
    border: 2px solid #333;
  }
  
  .card-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 30px 40px;
    gap: 20px;
  }
  
  .logo-container {
    width: 180px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (min-width: 768px) {
    .logo-container {
      width: 220px;
    }
  }
  
  .logo-image {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 4px 12px rgba(214, 72, 126, 0.3));
  }
  
  .card-text {
    text-align: center;
  }
  
  .card-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: white;
    margin-bottom: 4px;
    letter-spacing: 0.05em;
  }
  
  @media (min-width: 768px) {
    .card-title {
      font-size: 2rem;
    }
  }
  
  .card-subtitle {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
  
  .card-footer {
    margin-top: auto;
  }
  
  .stars {
    display: flex;
    gap: 4px;
  }
  
  .star {
    width: 20px;
    height: 20px;
    color: #facc15;
  }
  
  .card-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 0%,
      transparent 40%,
      rgba(255, 255, 255, 0.03) 45%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.03) 55%,
      transparent 60%,
      transparent 100%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .lanyard-container:hover .card-shine {
    opacity: 1;
  }
  
  :global([data-theme="light"]) .card-front {
    background: linear-gradient(145deg, 
      #f0f0f0 0%, 
      #e0e0e0 50%, 
      #f5f5f5 100%
    );
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  
  :global([data-theme="light"]) .card-title {
    color: #1a1a1a;
  }
  
  :global([data-theme="light"]) .card-subtitle {
    color: rgba(0, 0, 0, 0.5);
  }
  
  :global([data-theme="light"]) .rope-segment {
    background: linear-gradient(90deg, 
      #D6487E 0%, 
      #e65f91 20%, 
      #D6487E 50%, 
      #e65f91 80%, 
      #D6487E 100%
    );
  }
  
  :global([data-theme="light"]) .card-hole {
    background: #ccc;
    border-color: #999;
  }
</style>
