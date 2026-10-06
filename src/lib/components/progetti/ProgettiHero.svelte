<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { CaseStudy } from '$lib/data/case-studies';

  export let dock: CaseStudy[];
  export let stats: Array<{ value: number; label: string }>;

  const dispatch = createEventDispatcher<{ pick: CaseStudy }>();

  let dockEl: HTMLElement;
  let items: HTMLElement[] = [];
  let raf = 0;
  let pointerX: number | null = null;
  let statsEl: HTMLElement;
  let counted = false;
  let shown: number[] = stats.map((s) => s.value);
  let io: IntersectionObserver | null = null;

  function paint() {
    raf = 0;
    items.forEach((node) => {
      if (!node) return;
      let scale = 1;
      if (pointerX !== null) {
        const r = node.getBoundingClientRect();
        const dx = pointerX - (r.left + r.width / 2);
        scale = 1 + 0.62 * Math.exp(-(dx * dx) / (2 * 74 * 74));
      }
      node.style.setProperty('--sc', scale.toFixed(3));
    });
  }

  function onMove(e: PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    pointerX = e.clientX;
    if (!raf) raf = requestAnimationFrame(paint);
  }

  function onLeave() {
    pointerX = null;
    if (!raf) raf = requestAnimationFrame(paint);
  }

  function countUp() {
    if (counted) return;
    counted = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      shown = stats.map((s) => s.value);
      return;
    }
    const t0 = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      shown = stats.map((s) => Math.round(s.value * e));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counted = true;
      return;
    }
    shown = stats.map(() => 0);
    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) countUp();
      },
      { threshold: 0.4 }
    );
    if (statsEl) io.observe(statsEl);
  });

  onDestroy(() => {
    if (raf) cancelAnimationFrame(raf);
    io?.disconnect();
  });
</script>

<section class="hero">
  <div class="hero__bg" aria-hidden="true">
    <div class="hero__grid"></div>
    <div class="hero__orb hero__orb--a"></div>
    <div class="hero__orb hero__orb--b"></div>
  </div>

  <div class="section-container hero__inner">
    <p class="hero__kicker">
      <span class="hero__kdot" aria-hidden="true"></span>
      Righello · Progetti
    </p>

    <h1 class="hero__title">
      <span class="hero__line"><span>Costruiamo</span></span>
      <span class="hero__line"><span>prodotti.</span></span>
      <span class="hero__line hero__line--g"><span class="gradient-text">Non presentazioni.</span></span>
    </h1>

    <div class="hero__lede">
      <p>
        App per iPhone e iPad, gestionali che le imprese usano ogni giorno, la regia che porta le partite in
        onda e i siti dei nostri clienti. Tutto quello che abbiamo costruito, con lo stato vero di ognuno.
      </p>
    </div>

    <div class="dock" bind:this={dockEl} on:pointermove={onMove} on:pointerleave={onLeave} role="group" aria-label="Prodotti Righello">
      {#each dock as study, i (study.id)}
        <button
          type="button"
          class="dock__item"
          bind:this={items[i]}
          style="--a:{study.accent[0]}"
          aria-label={`Apri ${study.name}`}
          on:click={() => dispatch('pick', study)}
        >
          <span class="dock__tip">{study.name}</span>
          <img src={study.icon} alt="" width="72" height="72" loading="eager" decoding="async" />
        </button>
      {/each}
    </div>
    <p class="dock__hint">Tocca un'icona per aprire il prodotto</p>

    <div class="stats" bind:this={statsEl}>
      {#each stats as stat, i}
        <div class="stats__cell">
          <span class="stats__num">{shown[i]}</span>
          <span class="stats__label">{stat.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    padding: clamp(6.6rem, 12vh, 8.6rem) 0 clamp(3rem, 6vh, 5rem);
    isolation: isolate;
  }

  .hero__bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  .hero__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, color-mix(in srgb, var(--text-primary) 7%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, var(--text-primary) 7%, transparent) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 75%);
  }

  .hero__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.55;
  }

  .hero__orb--a {
    width: 38rem;
    height: 38rem;
    left: -10rem;
    top: -8rem;
    background: var(--glow-pink);
  }

  .hero__orb--b {
    width: 34rem;
    height: 34rem;
    right: -12rem;
    top: 6rem;
    background: var(--glow-cyan);
  }

  .hero__kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    margin: 0 0 1.6rem;
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .hero__kdot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: #d6487e;
    box-shadow: 0 0 14px #d6487e;
  }

  .hero__title {
    margin: 0;
    font-weight: 900;
    font-size: clamp(2.9rem, 8.2vw, 8.6rem);
    line-height: 0.9;
    letter-spacing: -0.03em;
    color: var(--text-primary);
  }

  .hero__line {
    display: block;
    overflow: hidden;
    padding-bottom: 0.06em;
  }

  .hero__line > span {
    display: inline-block;
    animation: rise 1s cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }

  .hero__line:nth-child(2) > span { animation-delay: 0.08s; }
  .hero__line:nth-child(3) > span { animation-delay: 0.16s; }

  .hero__line--g {
    font-size: 0.68em;
    line-height: 1.05;
    letter-spacing: -0.015em;
    margin-top: 0.1em;
  }

  @keyframes rise {
    from { transform: translateY(105%); }
    to { transform: translateY(0); }
  }

  .hero__lede {
    margin-top: clamp(1.4rem, 2.4vw, 2.2rem);
    max-width: 40rem;
    animation: fade-up 0.9s 0.35s cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }

  .hero__lede p {
    margin: 0;
    font-size: clamp(1.05rem, 1.55vw, 1.35rem);
    line-height: 1.5;
    color: var(--text-secondary);
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* dock */
  .dock {
    margin-top: clamp(1.6rem, 3vw, 2.4rem);
    display: inline-flex;
    align-items: flex-end;
    gap: clamp(0.4rem, 1vw, 0.8rem);
    padding: 0.9rem 1.1rem 0.8rem;
    border-radius: 2rem;
    border: 1px solid var(--border-color);
    background: color-mix(in srgb, var(--bg-secondary) 70%, transparent);
    backdrop-filter: blur(14px);
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    animation: fade-up 0.9s 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }

  .dock::-webkit-scrollbar { display: none; }

  .dock__item {
    --sc: 1;
    position: relative;
    flex: none;
    width: clamp(3rem, 6vw, 4.5rem);
    aspect-ratio: 1;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    transform-origin: 50% 100%;
    transform: translateY(calc((var(--sc) - 1) * -14px)) scale(var(--sc));
    transition: transform 0.18s cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .dock__item img {
    width: 100%;
    height: 100%;
    border-radius: 22.37%;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 10px 24px rgba(0, 0, 0, 0.35);
    transition: box-shadow 0.25s;
  }

  .dock__item:hover img,
  .dock__item:focus-visible img {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3), 0 14px 34px color-mix(in srgb, var(--a) 55%, transparent);
  }

  .dock__item:focus-visible {
    outline: 2px solid var(--a);
    outline-offset: 5px;
    border-radius: 22%;
  }

  .dock__tip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 0.7rem);
    transform: translateX(-50%) translateY(4px);
    padding: 0.32rem 0.7rem;
    border-radius: 0.5rem;
    background: var(--text-primary);
    color: var(--bg-primary);
    font-size: 0.72rem;
    font-weight: 700;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s, transform 0.15s;
  }

  .dock__item:hover .dock__tip,
  .dock__item:focus-visible .dock__tip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .dock__hint {
    margin: 0.9rem 0 0;
    font: 500 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  /* stats */
  .stats {
    margin-top: clamp(2.6rem, 6vw, 4.5rem);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: 1px solid var(--border-color);
  }

  @media (min-width: 900px) {
    .stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }

  .stats__cell {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem 1rem 0.5rem 0;
  }

  .stats__num {
    font-weight: 900;
    font-size: clamp(2.4rem, 5vw, 4rem);
    line-height: 1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
    color: var(--text-primary);
  }

  .stats__label {
    font: 500 0.72rem/1.4 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-secondary);
    max-width: 14rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__line > span,
    .hero__lede,
    .dock { animation: none; }
    .dock__item { transition: none; }
  }
</style>
