<script lang="ts">
  import { onMount } from 'svelte';
  import { inview } from '$lib/actions/inview';
  
  export let value: number;
  export let suffix: string = '%';
  export let label: string;
  export let color: string = '#D6487E';
  export let span: string = '1';
  
  let displayValue = 0;
  let hasAnimated = false;
  
  function animateValue() {
    if (hasAnimated) return;
    hasAnimated = true;
    
    const duration = 2000;
    const start = performance.now();
    
    function update() {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      displayValue = Math.round(value * eased);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        displayValue = value;
      }
    }
    
    requestAnimationFrame(update);
  }
  
  function handleInView(e: CustomEvent<{inView: boolean}>) {
    if (e.detail.inView) {
      animateValue();
    }
  }
</script>

<div 
  class="stat-card"
  style="--accent-color: {color}; --span: {span};"
  use:inview={{ threshold: 0.5 }}
  on:inview={handleInView}
>
  <div class="stat-value">
    <span class="number">{displayValue}</span>
    <span class="suffix">{suffix}</span>
  </div>
  <p class="stat-label">{label}</p>
  <div class="stat-glow"></div>
</div>

<style>
  .stat-card {
    position: relative;
    grid-column: span var(--span);
    padding: 2rem;
    border-radius: 20px;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
  }
  
  @media (max-width: 639px) {
    .stat-card {
      grid-column: span 1;
    }
  }
  
  .stat-card:hover {
    border-color: var(--accent-color);
    transform: translateY(-4px);
  }
  
  .stat-value {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }
  
  .number {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--accent-color), #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
  
  .suffix {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent-color);
  }
  
  .stat-label {
    margin-top: 0.75rem;
    font-size: 0.95rem;
    color: var(--text-secondary, #a1a1aa);
    font-weight: 500;
  }
  
  .stat-glow {
    position: absolute;
    bottom: -50%;
    left: 50%;
    transform: translateX(-50%);
    width: 150%;
    height: 100%;
    background: radial-gradient(ellipse at center, var(--accent-color), transparent 60%);
    opacity: 0.15;
    pointer-events: none;
  }
  
  :global([data-theme="light"]) .stat-card {
    background: rgba(248, 250, 252, 0.9);
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="light"]) .stat-label {
    color: #475569;
  }
</style>
