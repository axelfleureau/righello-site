<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let variant: 'default' | 'subtle' | 'intense' = 'default';
  export let animated = true;
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="beams-container" class:animated class:subtle={variant === 'subtle'} class:intense={variant === 'intense'}>
  <div class="beam beam-1"></div>
  <div class="beam beam-2"></div>
  <div class="beam beam-3"></div>
  <div class="beam beam-4"></div>
  <div class="beam beam-5"></div>
  
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>
</div>

<style>
  .beams-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  
  .beam {
    position: absolute;
    width: 1px;
    height: 200%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(214, 72, 126, 0.3) 25%,
      rgba(6, 182, 212, 0.3) 50%,
      rgba(214, 72, 126, 0.3) 75%,
      transparent 100%
    );
    opacity: 0.4;
    filter: blur(1px);
  }
  
  .subtle .beam {
    opacity: 0.2;
  }
  
  .intense .beam {
    opacity: 0.6;
    width: 2px;
  }
  
  .animated .beam {
    animation: beamMove 20s ease-in-out infinite;
  }
  
  .beam-1 {
    left: 10%;
    animation-delay: 0s;
    transform: rotate(15deg);
  }
  
  .beam-2 {
    left: 30%;
    animation-delay: -4s;
    transform: rotate(-10deg);
  }
  
  .beam-3 {
    left: 50%;
    animation-delay: -8s;
    transform: rotate(5deg);
  }
  
  .beam-4 {
    left: 70%;
    animation-delay: -12s;
    transform: rotate(-15deg);
  }
  
  .beam-5 {
    left: 90%;
    animation-delay: -16s;
    transform: rotate(10deg);
  }
  
  @keyframes beamMove {
    0%, 100% {
      transform: translateY(-20%) rotate(var(--rotation, 15deg));
      opacity: 0.4;
    }
    50% {
      transform: translateY(-40%) rotate(var(--rotation, 15deg));
      opacity: 0.6;
    }
  }
  
  .glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
  }
  
  .subtle .glow {
    opacity: 0.15;
  }
  
  .intense .glow {
    opacity: 0.5;
  }
  
  .animated .glow {
    animation: glowPulse 10s ease-in-out infinite;
  }
  
  .glow-1 {
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(214, 72, 126, 0.5) 0%, transparent 70%);
    top: -20%;
    left: -10%;
    animation-delay: 0s;
  }
  
  .glow-2 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, transparent 70%);
    bottom: -20%;
    right: -10%;
    animation-delay: -5s;
  }
  
  @keyframes glowPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.5;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .animated .beam,
    .animated .glow {
      animation: none;
    }
  }
</style>
