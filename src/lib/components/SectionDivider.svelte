<script lang="ts">
  export let fromColor = 'var(--bg-primary)';
  export let toColor = 'var(--bg-secondary)';
  export let height = '150px';
  export let mobileHeight = '40px';
  export let variant: 'gradient' | 'wave' | 'angle' = 'gradient';
</script>

{#if variant === 'gradient'}
  <div 
    class="section-divider gradient" 
    style="
      --desktop-height: {height};
      --mobile-height: {mobileHeight};
      background: linear-gradient(to bottom, {fromColor}, {toColor});
    "
  ></div>
{:else if variant === 'wave'}
  <div class="section-divider wave" style="background: {toColor};">
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none" 
      class="wave-svg"
      style="fill: {fromColor};"
    >
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
    </svg>
  </div>
{:else if variant === 'angle'}
  <div class="section-divider angle" style="background: {toColor};">
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none" 
      class="angle-svg"
      style="fill: {fromColor};"
    >
      <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
    </svg>
  </div>
{/if}

<style>
  .section-divider {
    width: 100%;
    position: relative;
    z-index: 1;
    margin-top: -1px;
    margin-bottom: -1px;
  }
  
  .section-divider.gradient {
    height: var(--mobile-height, 40px);
    pointer-events: none;
    opacity: 0.95;
  }
  
  @media (min-width: 768px) {
    .section-divider.gradient {
      height: calc((var(--desktop-height, 150px) + var(--mobile-height, 40px)) / 2);
    }
  }
  
  @media (min-width: 1024px) {
    .section-divider.gradient {
      height: var(--desktop-height, 150px);
    }
  }
  
  :global([data-theme="light"]) .section-divider.gradient {
    opacity: 1;
  }
  
  .section-divider.wave,
  .section-divider.angle {
    height: auto;
    line-height: 0;
  }
  
  .wave-svg,
  .angle-svg {
    display: block;
    width: 100%;
    height: 60px;
  }
  
  @media (min-width: 768px) {
    .wave-svg,
    .angle-svg {
      height: 80px;
    }
  }
  
  @media (min-width: 1024px) {
    .wave-svg,
    .angle-svg {
      height: 120px;
    }
  }
</style>
