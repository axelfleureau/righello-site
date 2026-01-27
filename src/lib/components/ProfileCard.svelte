<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  export let avatarUrl: string = '';
  export let name: string = '';
  export let title: string = '';
  export let handle: string = '';
  export let status: string = 'Online';
  export let enableTilt: boolean = true;
  export let behindGlowColor: string = 'rgba(214, 72, 126, 0.5)';
  
  let wrapRef: HTMLDivElement;
  let shellRef: HTMLDivElement;
  let isActive = false;
  
  let pointerX = 50;
  let pointerY = 50;
  let rotateX = 0;
  let rotateY = 0;
  let backgroundX = 50;
  let backgroundY = 50;
  
  const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
  const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
  const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
    round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));
  
  function handlePointerMove(event: PointerEvent) {
    if (!enableTilt || !shellRef) return;
    
    const rect = shellRef.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const width = shellRef.clientWidth || 1;
    const height = shellRef.clientHeight || 1;
    
    const percentX = clamp((100 / width) * x);
    const percentY = clamp((100 / height) * y);
    
    const centerX = percentX - 50;
    const centerY = percentY - 50;
    
    pointerX = percentX;
    pointerY = percentY;
    rotateX = round(-(centerX / 5));
    rotateY = round(centerY / 4);
    backgroundX = adjust(percentX, 0, 100, 35, 65);
    backgroundY = adjust(percentY, 0, 100, 35, 65);
  }
  
  function handlePointerEnter() {
    isActive = true;
  }
  
  function handlePointerLeave() {
    isActive = false;
    pointerX = 50;
    pointerY = 50;
    rotateX = 0;
    rotateY = 0;
    backgroundX = 50;
    backgroundY = 50;
  }
</script>

<div 
  bind:this={wrapRef}
  class="profile-card-wrap"
  style="
    --pointer-x: {pointerX}%;
    --pointer-y: {pointerY}%;
    --rotate-x: {rotateX}deg;
    --rotate-y: {rotateY}deg;
    --background-x: {backgroundX}%;
    --background-y: {backgroundY}%;
    --behind-glow-color: {behindGlowColor};
  "
>
  <div 
    bind:this={shellRef}
    class="profile-card-shell"
    class:active={isActive}
    on:pointerenter={handlePointerEnter}
    on:pointermove={handlePointerMove}
    on:pointerleave={handlePointerLeave}
    role="article"
  >
    <div class="profile-card">
      <div class="profile-card-inner">
        <div class="profile-card-shine"></div>
        <div class="profile-card-glare"></div>
        
        <div class="profile-content">
          <div class="avatar-container">
            {#if avatarUrl}
              <img src={avatarUrl} alt={name} class="avatar" />
            {:else}
              <div class="avatar-placeholder">
                <span>{name.charAt(0)}</span>
              </div>
            {/if}
            <div class="status-dot" class:online={status === 'Online'}></div>
          </div>
          
          <div class="profile-info">
            <h3 class="profile-name">{name}</h3>
            <p class="profile-title">{title}</p>
            {#if handle}
              <p class="profile-handle">@{handle}</p>
            {/if}
          </div>
        </div>
      </div>
    </div>
    
    <div class="behind-glow"></div>
  </div>
</div>

<style>
  .profile-card-wrap {
    --card-radius: 24px;
    perspective: 1200px;
    width: 100%;
    max-width: 280px;
  }
  
  .profile-card-shell {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.15s ease-out;
    cursor: pointer;
  }
  
  .profile-card-shell.active {
    transform: rotateY(var(--rotate-x)) rotateX(var(--rotate-y));
  }
  
  .profile-card {
    position: relative;
    border-radius: var(--card-radius);
    overflow: hidden;
    z-index: 2;
  }
  
  .profile-card-inner {
    position: relative;
    background: linear-gradient(145deg, rgba(96, 73, 110, 0.55) 0%, rgba(113, 196, 255, 0.27) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--card-radius);
    padding: 2rem;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  
  .profile-card-shine {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--pointer-x) var(--pointer-y),
      rgba(255, 255, 255, 0.15) 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 3;
  }
  
  .profile-card-shell.active .profile-card-shine {
    opacity: 1;
  }
  
  .profile-card-glare {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      rgba(255, 255, 255, 0.05) 100%
    );
    pointer-events: none;
    z-index: 2;
  }
  
  .profile-content {
    position: relative;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
  
  .avatar-container {
    position: relative;
    width: 100px;
    height: 100px;
  }
  
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.2);
  }
  
  .avatar-placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
  }
  
  .status-dot {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #6b7280;
    border: 3px solid rgba(0, 0, 0, 0.5);
  }
  
  .status-dot.online {
    background: #22c55e;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .profile-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin: 0;
  }
  
  .profile-title {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
  
  .profile-handle {
    font-size: 0.75rem;
    color: #D6487E;
    margin: 0;
    font-weight: 500;
  }
  
  .behind-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--pointer-x) var(--pointer-y),
      var(--behind-glow-color) 0%,
      transparent 70%
    );
    filter: blur(40px);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
    transform: translateZ(-10px);
  }
  
  .profile-card-shell.active .behind-glow {
    opacity: 1;
  }
  
  :global([data-theme="light"]) .profile-card-inner {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 240, 255, 0.6) 100%);
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="light"]) .profile-name {
    color: #1a1a1a;
  }
  
  :global([data-theme="light"]) .profile-title {
    color: rgba(0, 0, 0, 0.6);
  }
  
  :global([data-theme="light"]) .avatar {
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="light"]) .status-dot {
    border-color: rgba(255, 255, 255, 0.8);
  }
</style>
