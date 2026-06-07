<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { spring } from 'svelte/motion';
  import { browser } from '$app/environment';

  export let eyebrow = '';
  export let title = '';
  export let items: {
    label: string;
    title: string;
    description: string;
    metric: string;
  }[] = [];

  let section: HTMLElement;
  let activeIndex = 0;
  let progress = 0;
  let smoothedProgress = 0;
  let scrollHandler: (() => void) | null = null;
  let unsubscribeProgress: (() => void) | null = null;
  let rafPending = false;
  let reducedMotion = false;
  let isReady = false;
  const progressSpring = spring(0, {
    stiffness: 0.09,
    damping: 0.32,
    precision: 0.01,
  });

  $: activeItem = items[activeIndex] || items[0];
  $: titleChars = activeItem?.title.split('') ?? [];

  function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }

  function updateScrollState() {
    if (!section || items.length === 0) return;

    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    progress = total > 0 ? clamp((-rect.top / total) * 100, 0, 100) : 0;
    progressSpring.set(progress);

    const cards = Array.from(section.querySelectorAll<HTMLElement>('.story-step'));
    const focusLine = window.innerHeight * 0.52;
    let closest = 0;
    let distance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const center = cardRect.top + cardRect.height * 0.5;
      const nextDistance = Math.abs(center - focusLine);
      const reveal = clamp(1 - nextDistance / (window.innerHeight * 0.55), 0, 1);
      card.style.setProperty('--reveal', String(reveal));

      if (nextDistance < distance) {
        distance = nextDistance;
        closest = index;
      }
    });

    activeIndex = closest;
  }

  function onScroll() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      updateScrollState();
      rafPending = false;
    });
  }

  onMount(async () => {
    if (!browser) return;
    await tick();

    unsubscribeProgress = progressSpring.subscribe((value) => {
      smoothedProgress = value;
    });
    isReady = true;
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      progress = 100;
      progressSpring.set(100);
      return;
    }

    scrollHandler = onScroll;
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', scrollHandler, { passive: true });
    updateScrollState();
  });

  onDestroy(() => {
    unsubscribeProgress?.();
    if (!browser || !scrollHandler) return;
    window.removeEventListener('scroll', scrollHandler);
    window.removeEventListener('resize', scrollHandler);
  });
</script>

<section
  bind:this={section}
  class="scroll-story"
  class:ready={isReady}
  style={`--story-progress: ${smoothedProgress}%; --raw-progress: ${progress}%; --active-index: ${activeIndex};`}
>
  <div class="story-header">
    {#if eyebrow}
      <p>{eyebrow}</p>
    {/if}
    <h2>{title}</h2>
  </div>

  <div class="story-grid">
    <div class="story-visual" aria-hidden="true">
      <div class="visual-shell">
        <div class="visual-progress">
          <span></span>
        </div>
        <div class="visual-orbit"></div>
        <div class="visual-number">{activeItem?.label}</div>
        {#key activeIndex}
          <div class="visual-copy">
            <p>{activeItem?.metric}</p>
            <h3>
              {#each titleChars as char, index}
                <span style={`--char-delay: ${index * 18}ms`}>{char === ' ' ? '\u00A0' : char}</span>
              {/each}
            </h3>
          </div>
        {/key}
      </div>
    </div>

    <div class="story-steps">
      {#each items as item, index}
        <article class="story-step" class:active={activeIndex === index} style="--reveal: 1">
          <div class="step-label">{item.label}</div>
          <div>
            <p>{item.metric}</p>
            <h3>{item.title}</h3>
            <span>{item.description}</span>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .scroll-story {
    max-width: var(--container-max, 1280px);
    margin: 0 auto;
    padding: clamp(4rem, 8vw, 7rem) var(--container-padding, 1.5rem);
  }

  .story-header {
    display: grid;
    justify-items: center;
    gap: 1rem;
    max-width: 920px;
    margin: 0 auto clamp(2.5rem, 6vw, 5rem);
    text-align: center;
  }

  .story-header p {
    color: #D6487E;
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .story-header h2 {
    color: var(--text-primary);
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 850;
    line-height: 1;
    letter-spacing: 0;
  }

  .scroll-story.ready .story-header p,
  .scroll-story.ready .story-header h2 {
    animation: story-header-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .scroll-story.ready .story-header h2 {
    animation-delay: 0.08s;
  }

  .story-grid {
    display: grid;
    gap: 2rem;
  }

  .story-visual {
    display: none;
  }

  .story-steps {
    display: grid;
    gap: 1rem;
  }

  .story-step {
    --local-reveal: var(--reveal, 0);
    display: grid;
    grid-template-columns: 4.2rem 1fr;
    gap: 1.1rem;
    align-items: start;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 1.5rem;
    padding: 1.1rem;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
    opacity: calc(0.64 + var(--local-reveal) * 0.36);
    transform: translateY(calc((1 - var(--local-reveal)) * 1.6rem)) scale(calc(0.97 + var(--local-reveal) * 0.03));
    transition:
      opacity 0.16s linear,
      transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .story-step.active {
    border-color: rgba(214, 72, 126, 0.42);
    box-shadow: 0 1.3rem 3.5rem rgba(214, 72, 126, 0.12);
  }

  .step-label {
    display: grid;
    place-items: center;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 999px;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    color: #ffffff;
    font-size: 1rem;
    font-weight: 900;
    box-shadow: 0 1rem 2.4rem rgba(214, 72, 126, 0.22);
    transform: rotate(calc((1 - var(--local-reveal)) * -8deg)) scale(calc(0.9 + var(--local-reveal) * 0.1));
    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .story-step p {
    margin-bottom: 0.45rem;
    color: #D6487E;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: calc(0.52 + var(--local-reveal) * 0.48);
    transform: translateY(calc((1 - var(--local-reveal)) * 0.45rem));
    transition:
      opacity 0.18s linear,
      transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .story-step h3 {
    color: var(--text-primary);
    font-size: clamp(1.3rem, 4vw, 2rem);
    font-weight: 850;
    line-height: 1.08;
    opacity: calc(0.66 + var(--local-reveal) * 0.34);
    transform: translateY(calc((1 - var(--local-reveal)) * 0.65rem));
    transition:
      opacity 0.18s linear,
      transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .story-step span {
    display: block;
    margin-top: 0.8rem;
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.65;
    opacity: calc(0.55 + var(--local-reveal) * 0.45);
    transform: translateY(calc((1 - var(--local-reveal)) * 0.85rem));
    transition:
      opacity 0.18s linear,
      transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @media (min-width: 1024px) {
    .story-grid {
      grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
      gap: clamp(3rem, 6vw, 5rem);
      align-items: start;
    }

    .story-visual {
      display: block;
      position: sticky;
      top: 15vh;
      min-height: 70vh;
    }

    .visual-shell {
      position: relative;
      min-height: 70vh;
      overflow: hidden;
      border: 1px solid rgba(214, 72, 126, 0.25);
      border-radius: 2rem;
      background:
        radial-gradient(circle at calc(18% + var(--story-progress) * 0.55) 28%, rgba(214, 72, 126, 0.32), transparent 17rem),
        radial-gradient(circle at 76% calc(76% - var(--story-progress) * 0.32), rgba(6, 182, 212, 0.22), transparent 18rem),
        linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.025));
      box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.22);
    }

    .visual-progress {
      position: absolute;
      top: 1.4rem;
      left: 1.4rem;
      right: 1.4rem;
      height: 0.35rem;
      overflow: hidden;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.1);
    }

    .visual-progress span {
      display: block;
      width: var(--story-progress);
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #D6487E, #06B6D4);
      transition: width 0.12s linear;
    }

    .visual-orbit {
      position: absolute;
      inset: 5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      transform: rotate(calc(var(--story-progress) * 2.8deg)) scale(calc(0.9 + var(--story-progress) / 1000));
      transition: transform 0.16s linear;
    }

    .visual-orbit::before,
    .visual-orbit::after {
      content: '';
      position: absolute;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 999px;
      background: #D6487E;
      box-shadow: 0 0 2.5rem rgba(214, 72, 126, 0.75);
    }

    .visual-orbit::before {
      top: 12%;
      right: 10%;
    }

    .visual-orbit::after {
      bottom: 10%;
      left: 18%;
      background: #06B6D4;
      box-shadow: 0 0 2.5rem rgba(6, 182, 212, 0.7);
    }

    .visual-number {
      position: absolute;
      left: clamp(1.5rem, 4vw, 3rem);
      bottom: clamp(1.5rem, 4vw, 3rem);
      color: rgba(255, 255, 255, 0.1);
      font-size: clamp(7rem, 15vw, 12rem);
      font-weight: 950;
      line-height: 0.72;
      letter-spacing: -0.08em;
      transform: translateY(calc((100 - var(--story-progress)) * 0.05px));
      transition: transform 0.16s linear;
    }

    .visual-copy {
      position: absolute;
      top: 50%;
      left: clamp(1.5rem, 4vw, 3rem);
      right: clamp(1.5rem, 4vw, 3rem);
      transform: translateY(-50%);
    }

    .visual-copy p {
      margin-bottom: 0.8rem;
      color: #D6487E;
      font-size: 0.82rem;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .visual-copy h3 {
      max-width: 10ch;
      color: #ffffff;
      font-size: clamp(2.5rem, 5vw, 4.8rem);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: 0;
    }

    .visual-copy h3 span {
      display: inline-block;
      animation: char-rise 0.58s cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: var(--char-delay);
      transform-origin: center bottom;
    }

    .story-steps {
      gap: 0;
      padding: 8vh 0 12vh;
    }

    .story-step {
      min-height: 46vh;
      align-items: center;
      padding: clamp(1.25rem, 3vw, 2rem);
      will-change: transform, opacity;
    }
  }

  @keyframes char-rise {
    from {
      opacity: 0;
      transform: translateY(0.8em) rotateX(-70deg) scaleY(1.35);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0) scaleY(1);
      filter: blur(0);
    }
  }

  @keyframes story-header-in {
    from {
      opacity: 0;
      transform: translateY(1.4rem) scale(0.98);
      filter: blur(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .story-step,
    .story-step p,
    .story-step h3,
    .story-step span,
    .step-label,
    .story-header p,
    .story-header h2,
    .visual-progress span,
    .visual-orbit,
    .visual-number,
    .visual-copy h3 span {
      animation: none;
      transition: none;
      transform: none;
      opacity: 1;
    }
  }
</style>
