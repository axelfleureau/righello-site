<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { CaseStudy } from '$lib/data/case-studies';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import HeroStage from './HeroStage.svelte';

  export let dock: CaseStudy[];
  export let stats: Array<{ value: number; label: string }>;
  /** I prodotti che compongono la scena a destra. */
  export let stage: { laptop: CaseStudy; tablet: CaseStudy; phone: CaseStudy };

  const dispatch = createEventDispatcher<{ pick: CaseStudy }>();

  let dockEl: HTMLElement;
  let items: HTMLElement[] = [];
  let raf = 0;
  let pointerX: number | null = null;
  let statsEl: HTMLElement;
  let counted = false;
  let shown: number[] = stats.map((s) => s.value);
  let io: IntersectionObserver | null = null;

  // Come il Dock di macOS: l'icona sotto il mouse cresce, le vicine in proporzione,
  // e tutte si fanno spazio (tx) invece di sovrapporsi. Le posizioni di partenza
  // vengono dal layout a riposo (offsetLeft ignora le transform): niente effetto a catena.
  const PEAK = 0.62;
  const SIGMA = 74;

  function paint() {
    raf = 0;
    const nodes = items.filter(Boolean);
    if (!nodes.length || !dockEl) return;

    if (pointerX === null) {
      dockEl.style.setProperty('--gl', '0');
      dockEl.style.setProperty('--gr', '0');
      nodes.forEach((n) => {
        n.style.setProperty('--sc', '1');
        n.style.setProperty('--tx', '0');
      });
      return;
    }

    const w0 = nodes[0].offsetWidth;
    const gap = nodes.length > 1 ? nodes[1].offsetLeft - nodes[0].offsetLeft - w0 : 0;
    const rect = dockEl.getBoundingClientRect();
    const px = pointerX - rect.left - dockEl.clientLeft;
    const last = nodes.length - 1;

    const base = nodes.map((n) => n.offsetLeft + w0 / 2);
    const scales = base.map((c) => 1 + PEAK * Math.exp(-((px - c) ** 2) / (2 * SIGMA * SIGMA)));

    // nuovo layout partendo dal bordo sinistro, poi lo si trasla in modo che
    // il punto sotto il mouse resti sotto il mouse (come nel Dock vero)
    let x = nodes[0].offsetLeft;
    const centers = scales.map((sc) => {
      const w = w0 * sc;
      const c = x + w / 2;
      x += w + gap;
      return c;
    });

    let at: number;
    if (px <= base[0]) at = centers[0] + (px - base[0]);
    else if (px >= base[last]) at = centers[last] + (px - base[last]);
    else {
      let k = 0;
      while (k < last - 1 && px >= base[k + 1]) k++;
      const t = (px - base[k]) / (base[k + 1] - base[k]);
      at = centers[k] + t * (centers[k + 1] - centers[k]);
    }
    const shift = px - at;

    const left = centers[0] + shift - (w0 * scales[0]) / 2;
    const right = centers[last] + shift + (w0 * scales[last]) / 2;
    dockEl.style.setProperty('--gl', Math.max(0, base[0] - w0 / 2 - left).toFixed(1));
    dockEl.style.setProperty('--gr', Math.max(0, right - (base[last] + w0 / 2)).toFixed(1));

    nodes.forEach((n, i) => {
      n.style.setProperty('--sc', scales[i].toFixed(3));
      n.style.setProperty('--tx', (centers[i] + shift - base[i]).toFixed(1));
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
   <div class="hero__copy">
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

    <div class="hero__cta">
      <MagneticButton href="#vetrina" variant="primary">Guarda i prodotti</MagneticButton>
      <MagneticButton href="/contatti" variant="secondary">Parliamo di un progetto</MagneticButton>
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
   </div>

   <div class="hero__stage">
     <HeroStage {...stage} on:pick />
   </div>

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
    padding: clamp(6.6rem, 12vh, 8.6rem) 0 clamp(2.4rem, 5vh, 4rem);
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
    opacity: 0.55;
  }

  .hero__orb--a {
    width: 38rem;
    height: 38rem;
    left: -10rem;
    top: -8rem;
    background: radial-gradient(closest-side, var(--glow-pink), transparent);
  }

  .hero__orb--b {
    width: 34rem;
    height: 34rem;
    right: -12rem;
    top: 6rem;
    background: radial-gradient(closest-side, var(--glow-cyan), transparent);
  }

  /* stessa etichetta delle sezioni della home */
  .hero__kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    margin: 0 0 1.4rem;
    font-size: var(--text-sm);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gradient-start);
  }

  .hero__inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(2.4rem, 5vw, 3.4rem);
    align-items: center;
  }

  .hero__copy { min-width: 0; }
  .hero__stage { min-width: 0; padding: 0.6rem 1.2rem 1rem 0; }

  /* la prima icona si allinea al bordo del testo, la barra sporge */
  @media (min-width: 1024px) {
    .dock { margin-left: -1.1rem; }
  }

  .hero__cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: clamp(1.4rem, 2.4vw, 2rem);
    animation: fade-up 0.9s 0.42s cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }

  @media (min-width: 1024px) {
    .hero__inner {
      grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
      column-gap: clamp(2rem, 4vw, 4.5rem);
    }

    .hero__inner > .stats { grid-column: 1 / -1; }
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
    font-weight: var(--pg-display-weight);
    font-size: clamp(2.7rem, 6.2vw, 6rem);
    line-height: 0.9;
    letter-spacing: var(--pg-display-tracking);
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
    margin-top: clamp(1.2rem, 2vw, 1.8rem);
    max-width: 34rem;
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
    position: relative;
    isolation: isolate;
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    animation: fade-up 0.9s 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }

  .dock::-webkit-scrollbar { display: none; }

  /* la barra è un disegno a parte: si allarga con le icone, come il Dock */
  .dock::before {
    content: '';
    position: absolute;
    inset: 0 calc(var(--gr, 0) * -1px) 0 calc(var(--gl, 0) * -1px);
    z-index: -1;
    border-radius: 2rem;
    border: 1px solid var(--border-color);
    background: color-mix(in srgb, var(--bg-secondary) 88%, transparent);
    transition: inset 0.14s cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  /* Con il mouse le icone ingrandite escono dalla barra (e dall'alto): niente ritaglio.
     Su touch resta la riga scorrevole, dove non c'è ingrandimento. */
  @media (hover: hover) and (pointer: fine) and (min-width: 780px) {
    .dock {
      overflow: visible;
      margin-top: clamp(3.4rem, 6vw, 4.6rem);
    }
  }

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
    transform: translate3d(calc(var(--tx, 0) * 1px), calc((var(--sc) - 1) * -14px), 0) scale(var(--sc));
    transition: transform 0.14s cubic-bezier(0.2, 0.9, 0.2, 1);
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
    transform-origin: 50% 100%;
    transform: translateX(-50%) translateY(4px) scale(calc(1 / var(--sc)));
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
    transform: translateX(-50%) translateY(0) scale(calc(1 / var(--sc)));
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
    margin-top: clamp(1.6rem, 4vw, 3rem);
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

  /* numeri e didascalie come le statistiche della home: titolo 700, testo normale */
  .stats__num {
    font-weight: var(--pg-display-weight);
    font-size: clamp(2.2rem, 4.4vw, 3.4rem);
    line-height: 1;
    letter-spacing: var(--pg-display-tracking);
    font-variant-numeric: tabular-nums;
    background: linear-gradient(120deg, var(--gradient-start), var(--gradient-end, var(--gradient-start)));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .stats__label {
    font-size: 0.95rem;
    line-height: 1.4;
    color: var(--text-secondary);
    max-width: 15rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__line > span,
    .hero__lede,
    .dock { animation: none; }
    .dock__item { transition: none; }
  }
</style>
