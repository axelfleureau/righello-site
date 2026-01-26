<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  export let href: string;
  export let imageSrc: string = '';
  export let title: string = '';
  export let description: string = '';
  export let isStatic: boolean = false;
  
  let isHovering = false;
  let hoverTimeout: ReturnType<typeof setTimeout> | null = null;
  let leaveTimeout: ReturnType<typeof setTimeout> | null = null;
  let previewRef: HTMLDivElement;
  let linkRef: HTMLAnchorElement;
  
  function handleMouseEnter() {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
    
    hoverTimeout = setTimeout(() => {
      isHovering = true;
    }, 200);
  }
  
  function handleMouseLeave() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    
    leaveTimeout = setTimeout(() => {
      isHovering = false;
    }, 150);
  }
</script>

<span class="link-preview-wrapper">
  <a 
    bind:this={linkRef}
    {href}
    class="link-preview-trigger"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <slot />
  </a>
  
  {#if isHovering && (imageSrc || title)}
    <div
      bind:this={previewRef}
      class="preview-card"
      class:static={isStatic}
      in:scale={{ duration: 200, start: 0.95, easing: cubicOut }}
      out:fade={{ duration: 150 }}
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
      role="tooltip"
    >
      {#if imageSrc}
        <div class="preview-image-wrapper">
          <img 
            src={imageSrc} 
            alt={title}
            class="preview-image"
            loading="lazy"
          />
          <div class="image-overlay"></div>
        </div>
      {/if}
      
      <div class="preview-content">
        {#if title}
          <p class="preview-title">{title}</p>
        {/if}
        {#if description}
          <p class="preview-description">{description}</p>
        {/if}
        
        <div class="preview-footer">
          <svg class="preview-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          <span class="preview-url">{href}</span>
        </div>
      </div>
      
      <div class="preview-arrow"></div>
    </div>
  {/if}
</span>

<style>
  .link-preview-wrapper {
    position: relative;
    display: inline-block;
  }
  
  .link-preview-trigger {
    position: relative;
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .link-preview-trigger:hover {
    color: #D6487E;
  }
  
  .preview-card {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: 280px;
    background: var(--bg-secondary);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(214, 72, 126, 0.1);
    pointer-events: auto;
  }
  
  .preview-card.static {
    position: relative;
    bottom: auto;
    left: auto;
    transform: none;
    margin-top: 0.5rem;
  }
  
  :global([data-theme="light"]) .preview-card {
    background: white;
    border-color: var(--border-color);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .preview-image-wrapper {
    position: relative;
    width: 100%;
    height: 140px;
    overflow: hidden;
  }
  
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  
  .preview-card:hover .preview-image {
    transform: scale(1.05);
  }
  
  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 50%);
  }
  
  .preview-content {
    padding: 1rem;
  }
  
  .preview-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.375rem;
    line-height: 1.4;
  }
  
  .preview-description {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .preview-footer {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: var(--text-muted);
    font-size: 0.75rem;
  }
  
  .preview-icon {
    width: 0.875rem;
    height: 0.875rem;
    flex-shrink: 0;
  }
  
  .preview-url {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .preview-arrow {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: var(--bg-secondary);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  :global([data-theme="light"]) .preview-arrow {
    background: white;
    border-color: var(--border-color);
  }
  
  .preview-card.static .preview-arrow {
    display: none;
  }
</style>
