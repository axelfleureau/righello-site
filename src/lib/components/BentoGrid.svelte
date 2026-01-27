<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { inview } from '$lib/actions/inview';
  
  export let className: string = '';
  
  interface BentoItem {
    id: string;
    title: string;
    description: string;
    href?: string;
    feature?: 'spotlight' | 'counter' | 'timeline' | 'typing' | 'metrics' | 'icons';
    spotlightItems?: string[];
    timeline?: Array<{ year: string; event: string }>;
    typingText?: string;
    metrics?: Array<{ label: string; value: number; suffix?: string; color?: string; icon?: string }>;
    icons?: Array<{ name: string; svg: string }>;
    statistic?: { start: number; end: number; suffix?: string };
    size?: 'sm' | 'md' | 'lg';
    colSpan?: number;
    rowSpan?: number;
    color?: string;
  }
  
  export let items: BentoItem[] = [];
  
  let tiltState: { [key: string]: { x: number; y: number; hovered: boolean } } = {};
  let reducedMotion = false;
  let typedTexts: { [key: string]: string } = {};
  let counterValues: { [key: string]: number } = {};
  let metricsProgress: { [key: string]: number[] } = {};
  let visibleItems: { [key: string]: boolean } = {};
  
  let activeTimers: ReturnType<typeof setTimeout>[] = [];
  let activeRafs: number[] = [];
  
  function clearAllTimers() {
    activeTimers.forEach(timer => clearTimeout(timer));
    activeTimers = [];
    activeRafs.forEach(raf => cancelAnimationFrame(raf));
    activeRafs = [];
  }
  
  function initializeItems() {
    items.forEach(item => {
      tiltState[item.id] = { x: 0, y: 0, hovered: false };
      if (item.feature === 'typing' && item.typingText) {
        typedTexts[item.id] = '';
      }
      if (item.feature === 'counter' && item.statistic) {
        counterValues[item.id] = item.statistic.start;
      }
      if (item.feature === 'metrics' && item.metrics) {
        metricsProgress[item.id] = item.metrics.map(() => 0);
      }
      visibleItems[item.id] = false;
    });
  }
  
  $: if (items) {
    clearAllTimers();
    initializeItems();
  }
  
  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    initializeItems();
  });
  
  onDestroy(() => {
    clearAllTimers();
  });
  
  function handleMouseMove(e: MouseEvent, itemId: string) {
    if (reducedMotion) return;
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    tiltState[itemId] = { x: yPct * -3, y: xPct * 3, hovered: true };
  }
  
  function handleMouseLeave(itemId: string) {
    tiltState[itemId] = { x: 0, y: 0, hovered: false };
  }
  
  function handleMouseEnter(itemId: string) {
    tiltState[itemId] = { ...tiltState[itemId], hovered: true };
  }
  
  function handleInView(itemId: string, item: BentoItem) {
    if (visibleItems[itemId]) return;
    visibleItems[itemId] = true;
    
    if (item.feature === 'typing' && item.typingText && !reducedMotion) {
      typeText(itemId, item.typingText);
    }
    if (item.feature === 'counter' && item.statistic && !reducedMotion) {
      animateCounter(itemId, item.statistic.start, item.statistic.end);
    }
    if (item.feature === 'metrics' && item.metrics && !reducedMotion) {
      animateMetrics(itemId, item.metrics);
    }
  }
  
  function typeText(itemId: string, text: string) {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        typedTexts[itemId] = text.slice(0, i + 1);
        i++;
        const timer = setTimeout(type, Math.random() * 30 + 15);
        activeTimers.push(timer);
      }
    };
    type();
  }
  
  function animateCounter(itemId: string, start: number, end: number) {
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counterValues[itemId] = Math.round(start + (end - start) * eased);
      
      if (progress < 1) {
        const raf = requestAnimationFrame(animate);
        activeRafs.push(raf);
      }
    };
    const raf = requestAnimationFrame(animate);
    activeRafs.push(raf);
  }
  
  function animateMetrics(itemId: string, metrics: Array<{ value: number }>) {
    metrics.forEach((metric, i) => {
      const timer = setTimeout(() => {
        const duration = 1200;
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (!metricsProgress[itemId]) metricsProgress[itemId] = [];
          metricsProgress[itemId][i] = Math.min(100, metric.value) * eased;
          metricsProgress = { ...metricsProgress };
          
          if (progress < 1) {
            const raf = requestAnimationFrame(animate);
            activeRafs.push(raf);
          }
        };
        const raf = requestAnimationFrame(animate);
        activeRafs.push(raf);
      }, i * 150);
      activeTimers.push(timer);
    });
  }
  
  function getColSpan(item: BentoItem): number {
    if (item.colSpan) return item.colSpan;
    if (item.size === 'lg') return 2;
    if (item.size === 'md') return 2;
    return 1;
  }
</script>

<div class="bento-grid {className}">
  {#each items as item (item.id)}
    {@const state = tiltState[item.id] || { x: 0, y: 0, hovered: false }}
    {@const colSpan = getColSpan(item)}
    {@const isRealLink = item.href && item.href !== '#'}
    <svelte:element
      this={isRealLink ? 'a' : 'div'}
      href={isRealLink ? item.href : undefined}
      role={isRealLink ? undefined : 'presentation'}
      class="bento-card"
      class:size-lg={item.size === 'lg'}
      style="
        --col-span: {colSpan};
        --accent-color: {item.color || 'var(--gradient-start)'};
        transform: perspective(1000px) rotateX({state.x}deg) rotateY({state.y}deg) translateY({state.hovered ? -5 : 0}px);
      "
      on:mousemove={(e) => handleMouseMove(e, item.id)}
      on:mouseleave={() => handleMouseLeave(item.id)}
      on:mouseenter={() => handleMouseEnter(item.id)}
      use:inview={{ threshold: 0.3 }}
      on:inview={() => handleInView(item.id, item)}
    >
      <div class="card-content">
        <div class="card-header">
          <h3 class="card-title">{item.title}</h3>
          <div class="arrow-icon" class:visible={state.hovered}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>
        </div>
        <p class="card-description">{item.description}</p>
        
        {#if item.feature === 'spotlight' && item.spotlightItems}
          <ul class="spotlight-list">
            {#each item.spotlightItems as spotItem, i}
              <li class="spotlight-item" style="animation-delay: {i * 100}ms">
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{spotItem}</span>
              </li>
            {/each}
          </ul>
        {/if}
        
        {#if item.feature === 'counter' && item.statistic}
          <div class="counter-wrapper">
            <span class="counter-value">{counterValues[item.id] ?? item.statistic.start}</span>
            <span class="counter-suffix">{item.statistic.suffix || ''}</span>
          </div>
        {/if}
        
        {#if item.feature === 'timeline' && item.timeline}
          <div class="timeline">
            <div class="timeline-line"></div>
            {#each item.timeline as timeItem, i}
              <div class="timeline-item" style="animation-delay: {i * 150}ms">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-year">{timeItem.year}</span>
                  <span class="timeline-event">{timeItem.event}</span>
                </div>
              </div>
            {/each}
          </div>
        {/if}
        
        {#if item.feature === 'typing' && item.typingText}
          <div class="code-terminal">
            <div class="terminal-header">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span class="terminal-filename">server.ts</span>
            </div>
            <div class="terminal-body">
              <pre class="code-text"><code>{typedTexts[item.id] || ''}</code><span class="cursor">|</span></pre>
            </div>
          </div>
        {/if}
        
        {#if item.feature === 'metrics' && item.metrics}
          <div class="metrics-list">
            {#each item.metrics as metric, i}
              <div class="metric-item" style="animation-delay: {i * 150}ms">
                <div class="metric-header">
                  <div class="metric-label">
                    {#if metric.icon === 'clock'}
                      <svg class="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    {:else if metric.icon === 'zap'}
                      <svg class="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    {:else if metric.icon === 'sparkles'}
                      <svg class="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 3L14 8L19 9L15 13L16 18L12 15L8 18L9 13L5 9L10 8L12 3Z" />
                      </svg>
                    {/if}
                    <span>{metric.label}</span>
                  </div>
                  <span class="metric-value">{metric.value}{metric.suffix || ''}</span>
                </div>
                <div class="metric-bar">
                  <div 
                    class="metric-progress" 
                    style="width: {metricsProgress[item.id]?.[i] ?? 0}%; background-color: {metric.color || 'var(--gradient-start)'}"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
        
        {#if item.feature === 'icons' && item.icons}
          <div class="icons-grid">
            {#each item.icons as icon, i}
              <div class="icon-card" style="animation-delay: {i * 50}ms">
                <div class="icon-wrapper">
                  {@html icon.svg}
                </div>
                <span class="icon-name">{icon.name}</span>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </svelte:element>
  {/each}
  <slot />
</div>

<style>
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    width: 100%;
  }
  
  @media (min-width: 640px) {
    .bento-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }
  }
  
  @media (min-width: 1024px) {
    .bento-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
  }
  
  .bento-card {
    position: relative;
    grid-column: span var(--col-span, 1);
    padding: 1.5rem;
    border-radius: 16px;
    background: linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0.6),
      rgba(10, 10, 10, 0.4),
      rgba(10, 10, 10, 0.3)
    );
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease, border-color 0.3s, box-shadow 0.3s;
    transform-style: preserve-3d;
    cursor: pointer;
    overflow: hidden;
  }
  
  .bento-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.05), transparent);
    opacity: 1;
    pointer-events: none;
  }
  
  .bento-card:hover {
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 639px) {
    .bento-card {
      grid-column: span 1 !important;
    }
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .bento-card {
      grid-column: span min(var(--col-span, 1), 2);
    }
  }
  
  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
    transform: translateZ(20px);
  }
  
  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary, #fff);
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.02em;
  }
  
  .arrow-icon {
    width: 20px;
    height: 20px;
    color: var(--text-secondary, #a1a1aa);
    opacity: 0;
    transition: opacity 0.2s;
    flex-shrink: 0;
  }
  
  .arrow-icon.visible {
    opacity: 1;
  }
  
  .arrow-icon svg {
    width: 100%;
    height: 100%;
  }
  
  .card-description {
    font-size: 0.875rem;
    color: var(--text-secondary, #a1a1aa);
    margin: 0;
    line-height: 1.5;
  }
  
  .spotlight-list {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .spotlight-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    transform: translateX(-10px);
    animation: slideIn 0.4s ease forwards;
  }
  
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .check-icon {
    width: 16px;
    height: 16px;
    color: #10b981;
    flex-shrink: 0;
  }
  
  .spotlight-item span {
    font-size: 0.875rem;
    color: var(--text-secondary, #a1a1aa);
  }
  
  .counter-wrapper {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
    margin-top: auto;
    padding-top: 0.75rem;
  }
  
  .counter-value {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
  
  .counter-suffix {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-primary, #fff);
  }
  
  .timeline {
    position: relative;
    margin-top: 0.75rem;
    padding-left: 1.5rem;
  }
  
  .timeline-line {
    position: absolute;
    left: 9px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .timeline-item {
    position: relative;
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    opacity: 0;
    transform: translateX(-10px);
    animation: slideIn 0.4s ease forwards;
  }
  
  .timeline-dot {
    position: absolute;
    left: -1.5rem;
    top: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--bg-tertiary, #111);
    border: 2px solid rgba(255, 255, 255, 0.2);
    z-index: 1;
  }
  
  .timeline-content {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .timeline-year {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary, #fff);
  }
  
  .timeline-event {
    font-size: 0.75rem;
    color: var(--text-secondary, #a1a1aa);
  }
  
  .code-terminal {
    margin-top: 0.75rem;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.6);
  }
  
  .terminal-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(0, 0, 0, 0.3);
  }
  
  .terminal-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  
  .terminal-dot.red { background: #ff5f57; }
  .terminal-dot.yellow { background: #febc2e; }
  .terminal-dot.green { background: #28c840; }
  
  .terminal-filename {
    margin-left: auto;
    font-size: 0.7rem;
    color: var(--text-muted, #71717a);
  }
  
  .terminal-body {
    padding: 0.75rem;
    max-height: 150px;
    overflow-y: auto;
  }
  
  .code-text {
    margin: 0;
    font-family: monospace;
    font-size: 0.7rem;
    color: #a5f3fc;
    white-space: pre-wrap;
    word-break: break-all;
  }
  
  .cursor {
    animation: blink 1s step-end infinite;
    color: #fff;
  }
  
  @keyframes blink {
    50% { opacity: 0; }
  }
  
  .metrics-list {
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .metric-item {
    opacity: 0;
    animation: fadeInUp 0.4s ease forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
    }
  }
  
  .metric-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
  
  .metric-label {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-secondary, #a1a1aa);
  }
  
  .metric-icon {
    width: 14px;
    height: 14px;
  }
  
  .metric-value {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary, #a1a1aa);
  }
  
  .metric-bar {
    height: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }
  
  .metric-progress {
    height: 100%;
    border-radius: 3px;
    transition: width 0.1s linear;
  }
  
  .icons-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-top: 0.75rem;
  }
  
  .icon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    padding: 0.75rem;
    border-radius: 12px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s;
    cursor: pointer;
    opacity: 0;
    animation: fadeInUp 0.3s ease forwards;
  }
  
  .icon-card:hover {
    border-color: rgba(255, 255, 255, 0.15);
    background: linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
  }
  
  .icon-wrapper {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon-wrapper :global(svg) {
    width: 100%;
    height: 100%;
  }
  
  .icon-name {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--text-muted, #71717a);
    text-align: center;
    transition: color 0.3s;
  }
  
  .icon-card:hover .icon-name {
    color: var(--text-secondary, #a1a1aa);
  }
  
  :global([data-theme="light"]) .bento-card {
    background: linear-gradient(
      to bottom,
      rgba(248, 250, 252, 0.6),
      rgba(248, 250, 252, 0.4),
      rgba(248, 250, 252, 0.3)
    );
    border-color: rgba(0, 0, 0, 0.08);
  }
  
  :global([data-theme="light"]) .bento-card::before {
    background: linear-gradient(to bottom, rgba(255,255,255,0.8), transparent);
  }
  
  :global([data-theme="light"]) .bento-card:hover {
    border-color: rgba(0, 0, 0, 0.15);
  }
  
  :global([data-theme="light"]) .card-title {
    color: #0f172a;
  }
  
  :global([data-theme="light"]) .card-description {
    color: #475569;
  }
  
  :global([data-theme="light"]) .spotlight-item span {
    color: #475569;
  }
  
  :global([data-theme="light"]) .timeline-line {
    background: rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="light"]) .timeline-dot {
    background: #f8fafc;
    border-color: rgba(0, 0, 0, 0.2);
  }
  
  :global([data-theme="light"]) .timeline-year {
    color: #0f172a;
  }
  
  :global([data-theme="light"]) .timeline-event {
    color: #475569;
  }
  
  :global([data-theme="light"]) .code-terminal {
    background: rgba(15, 23, 42, 0.9);
  }
  
  :global([data-theme="light"]) .icon-card {
    background: linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.01));
    border-color: rgba(0, 0, 0, 0.08);
  }
  
  :global([data-theme="light"]) .icon-card:hover {
    border-color: rgba(0, 0, 0, 0.15);
  }
  
  :global([data-theme="light"]) .metric-bar {
    background: rgba(0, 0, 0, 0.1);
  }
  
  @media (prefers-reduced-motion: reduce) {
    .bento-card {
      transition: none;
    }
    
    .spotlight-item,
    .timeline-item,
    .metric-item,
    .icon-card {
      animation: none;
      opacity: 1;
      transform: none;
    }
    
    .cursor {
      animation: none;
    }
  }
</style>
