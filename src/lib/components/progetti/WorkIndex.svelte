<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { flip } from 'svelte/animate';
  import { caseStudyHref, kindLabels } from '$lib/data/case-studies';
  import type { CaseStudy, ProjectKind } from '$lib/data/case-studies';
  import StatusBadge from './StatusBadge.svelte';
  import ProjectIcon from './ProjectIcon.svelte';

  export let items: CaseStudy[];

  const order: ProjectKind[] = ['app', 'gestionale', 'broadcast', 'piattaforma', 'sito', 'contenuti'];

  let filter: 'all' | ProjectKind = 'all';
  let hovered: CaseStudy | null = null;
  let pv: HTMLElement;
  let canHover = false;
  let mx = 0;
  let my = 0;
  let px = 0;
  let py = 0;
  let raf = 0;
  let listEl: HTMLElement;

  $: kinds = order.filter((k) => items.some((i) => i.kind === k));
  $: shown = filter === 'all' ? items : items.filter((i) => i.kind === filter);
  $: previewIsIcon = hovered ? hovered.image.includes('/icons/') : false;

  const pad = (n: number) => String(n).padStart(3, '0');
  const count = (k: ProjectKind) => items.filter((i) => i.kind === k).length;

  function loop() {
    raf = 0;
    px += (mx - px) * 0.18;
    py += (my - py) * 0.18;
    if (pv) pv.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
    if (Math.abs(mx - px) > 0.4 || Math.abs(my - py) > 0.4) raf = requestAnimationFrame(loop);
  }

  function target(clientX: number, clientY: number) {
    const w = 360;
    const h = 235;
    const flipLeft = clientX + 40 + w > window.innerWidth;
    mx = flipLeft ? clientX - w - 30 : clientX + 30;
    my = Math.min(Math.max(clientY - h / 2, 90), window.innerHeight - h - 20);
    if (!raf) raf = requestAnimationFrame(loop);
  }

  function onMove(e: PointerEvent) {
    if (!canHover) return;
    target(e.clientX, e.clientY);
  }

  function enter(study: CaseStudy, e: PointerEvent | FocusEvent) {
    if (!canHover) return;
    if (!hovered) {
      if (e instanceof PointerEvent) {
        px = mx = e.clientX + 30;
        py = my = e.clientY - 118;
      } else {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        px = mx = r.right - 380;
        py = my = Math.min(Math.max(r.top - 90, 90), window.innerHeight - 255);
      }
    }
    hovered = study;
  }

  function leave() {
    hovered = null;
  }

  onMount(() => {
    canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (canHover) window.addEventListener('pointermove', onMove, { passive: true });
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('pointermove', onMove);
    if (raf) cancelAnimationFrame(raf);
  });
</script>

<section id="indice" class="wi">
  <div class="section-container">
    <header class="wi__head">
      <p class="wi__kicker">03 · Tutto il lavoro</p>
      <h2 class="wi__title">Tutto quello che<br /><span class="gradient-text">abbiamo costruito.</span></h2>
    </header>
  </div>

  <div class="wi__bar">
    <div class="section-container wi__barin" role="tablist" aria-label="Filtra per tipo">
      <button
        type="button"
        role="tab"
        class="chip"
        class:is-active={filter === 'all'}
        aria-selected={filter === 'all'}
        on:click={() => (filter = 'all')}
      >Tutto <sup>{items.length}</sup></button>
      {#each kinds as k}
        <button
          type="button"
          role="tab"
          class="chip"
          class:is-active={filter === k}
          aria-selected={filter === k}
          on:click={() => (filter = k)}
        >{kindLabels[k]} <sup>{count(k)}</sup></button>
      {/each}
    </div>
  </div>

  <div class="section-container">
    <ul class="wi__list" bind:this={listEl} on:pointerleave={leave}>
      {#each shown as study, i (study.id)}
        <li animate:flip={{ duration: 360 }} style="--a:{study.accent[0]}">
          <a
            class="row"
            href={caseStudyHref(study)}
            on:pointerenter={(e) => enter(study, e)}
            on:focus={(e) => enter(study, e)}
            on:blur={leave}
          >
            <span class="row__n">{pad(i + 1)}</span>
            <span class="row__thumb" aria-hidden="true">
              {#if study.icon}
                <ProjectIcon {study} size={44} />
              {:else}
                <img src={study.image} alt="" width="88" height="55" loading="lazy" decoding="async" style:object-position={study.imagePosition ?? 'top'} />
              {/if}
            </span>
            <span class="row__name">{study.name}</span>
            <span class="row__kind">{kindLabels[study.kind]}</span>
            <span class="row__plat">{study.platform.join(' · ')}</span>
            <span class="row__status"><StatusBadge status={study.status} compact /></span>
            <span class="row__arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>

  {#if canHover}
    <div class="pv" class:is-on={hovered !== null} bind:this={pv} aria-hidden="true">
      {#if hovered}
        <div class="pv__card" style="--a:{hovered.accent[0]}; --b:{hovered.accent[1]}">
          <img
            class:pv__img--icon={previewIsIcon}
            src={hovered.image}
            alt=""
            style:object-position={hovered.imagePosition ?? 'top'}
          />
          <span class="pv__tag">{hovered.name}</span>
        </div>
      {/if}
    </div>
  {/if}
</section>

<style>
  .wi {
    position: relative;
    padding: clamp(4rem, 9vw, 7rem) 0 clamp(3rem, 6vw, 5rem);
    background: var(--bg-primary);
  }

  .wi__kicker {
    margin: 0 0 1.2rem;
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .wi__title {
    margin: 0 0 clamp(1.8rem, 4vw, 3rem);
    font-weight: 900;
    font-size: clamp(2.5rem, 7vw, 6.4rem);
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: var(--text-primary);
  }

  .wi__bar {
    position: sticky;
    top: 5.1rem;
    z-index: 20;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    background: color-mix(in srgb, var(--bg-primary) 82%, transparent);
    backdrop-filter: blur(14px);
  }

  .wi__barin {
    display: flex;
    gap: 0.5rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .wi__barin::-webkit-scrollbar { display: none; }

  .chip {
    flex: none;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--border-color);
    background: none;
    color: var(--text-secondary);
    font: 600 0.74rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .chip sup {
    font-size: 0.62rem;
    opacity: 0.6;
    margin-left: 0.2rem;
  }

  .chip:hover { border-color: var(--text-primary); color: var(--text-primary); }

  .chip.is-active {
    background: var(--text-primary);
    border-color: var(--text-primary);
    color: var(--bg-primary);
  }

  .wi__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .wi__list li { border-bottom: 1px solid var(--border-color); }

  .row {
    display: grid;
    grid-template-columns: 3.4rem 1fr auto;
    grid-template-areas:
      'n name arrow'
      'n kind arrow'
      'n status arrow';
    align-items: center;
    column-gap: 0.8rem;
    row-gap: 0.25rem;
    padding: 1.2rem 0;
    color: var(--text-primary);
    text-decoration: none;
    transition: padding 0.35s cubic-bezier(0.2, 0.9, 0.2, 1), background 0.3s;
  }

  .row__n {
    grid-area: n;
    font: 500 0.74rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    color: var(--text-muted);
  }

  .row__thumb { display: none; }
  .row__plat { display: none; }

  .row__name {
    grid-area: name;
    font-weight: 900;
    font-size: clamp(1.7rem, 6vw, 2.4rem);
    letter-spacing: -0.025em;
    line-height: 1;
    transition: color 0.25s, transform 0.35s cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .row__kind {
    grid-area: kind;
    font: 500 0.72rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .row__status { grid-area: status; font-size: 0.82rem; }

  .row__arrow {
    grid-area: arrow;
    font-size: 1.4rem;
    color: var(--text-muted);
    transition: transform 0.3s, color 0.3s;
  }

  .row:hover .row__arrow,
  .row:focus-visible .row__arrow { transform: translate(3px, -3px); color: var(--a); }

  .row:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }

  @media (min-width: 1024px) {
    .row {
      grid-template-columns: 3.4rem minmax(0, 1fr) 13rem 11rem 14rem 2rem;
      grid-template-areas: 'n name kind plat status arrow';
      padding: 1.55rem 0;
    }

    .row__plat {
      display: block;
      grid-area: plat;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .row__name { font-size: clamp(2rem, 3.6vw, 3.4rem); }

    .row:hover { padding-left: 1rem; background: color-mix(in srgb, var(--a) 7%, transparent); }
    .row:hover .row__name,
    .row:focus-visible .row__name { color: var(--a); transform: translateX(0.3rem); }
  }

  @media (max-width: 1023px) {
    .row {
      grid-template-columns: 3rem 3.2rem 1fr auto;
      grid-template-areas:
        'n thumb name arrow'
        'n thumb kind arrow'
        'n thumb status arrow';
    }

    .row__thumb {
      display: block;
      grid-area: thumb;
    }

    .row__thumb img {
      width: 3.2rem;
      height: 2.6rem;
      border-radius: 0.45rem;
      object-fit: cover;
    }

    .row__name { font-size: 1.45rem; }
  }

  /* preview */
  .pv {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 60;
    pointer-events: none;
    width: 360px;
    will-change: transform;
  }

  .pv__card {
    position: relative;
    width: 360px;
    aspect-ratio: 16 / 10;
    border-radius: 1rem;
    overflow: hidden;
    background: linear-gradient(135deg, var(--a), var(--b));
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 40px 90px -20px rgba(0, 0, 0, 0.7);
    animation: pv-in 0.28s cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }

  .pv__card img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pv__img--icon {
    inset: 22% !important;
    width: 56% !important;
    height: 56% !important;
    object-fit: contain !important;
    border-radius: 22%;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  }

  .pv__tag {
    position: absolute;
    left: 0.7rem;
    bottom: 0.7rem;
    padding: 0.3rem 0.65rem;
    border-radius: 0.4rem;
    background: rgba(8, 8, 10, 0.78);
    backdrop-filter: blur(8px);
    color: #fff;
    font: 700 0.72rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.06em;
  }

  @keyframes pv-in {
    from { opacity: 0; transform: scale(0.92) rotate(-1.5deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .pv__card { animation: none; }
    .row, .row__name { transition: none; }
  }
</style>
