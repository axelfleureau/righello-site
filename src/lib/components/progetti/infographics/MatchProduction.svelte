<script lang="ts">
  import { tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import {
    matchSources,
    matchEngine,
    matchDestinations,
    matchGraphics,
    matchOtherGraphics,
    matchHint,
  } from '$lib/data/infographics';
  import type { FlowNode } from '$lib/data/infographics';
  import InfoIcon from './InfoIcon.svelte';
  import InfoFrame from './InfoFrame.svelte';
  import Chips from './Chips.svelte';

  /** Vero quando il palco non è quello in primo piano (vetrina a scene). */
  export let idle = false;

  const VIEW_H = 600;
  const ENGINE = { x: 500, y: 300, r: 100 };

  const wires = [
    ...matchSources.map((n, i) => ({ node: n, side: 'in' as const, y: 90 + i * 140 })),
    ...matchDestinations.map((n, i) => ({ node: n, side: 'out' as const, y: 130 + i * 170 })),
  ].map((w, i) => {
    const xIn = ENGINE.x - ENGINE.r;
    const xOut = ENGINE.x + ENGINE.r;
    return {
      ...w,
      i,
      d:
        w.side === 'in'
          ? `M280 ${w.y} C340 ${w.y} 340 ${ENGINE.y} ${xIn} ${ENGINE.y}`
          : `M${xOut} ${ENGINE.y} C660 ${ENGINE.y} 660 ${w.y} 720 ${w.y}`,
    };
  });

  const sideOf = new Map<string, 'in' | 'out' | 'engine'>([
    ...matchSources.map((n) => [n.id, 'in'] as const),
    ...matchDestinations.map((n) => [n.id, 'out'] as const),
    [matchEngine.id, 'engine'] as const,
  ]);
  const nodeById = new Map<string, FlowNode>([...matchSources, matchEngine, ...matchDestinations].map((n) => [n.id, n]));
  const order = [...matchSources, matchEngine, ...matchDestinations].map((n) => n.id);

  type Side = 'in' | 'out' | 'engine';

  let running = false;
  let reduced = false;
  let shownSide: Side | undefined;
  let hover: string | null = null;
  let picked: string | null = null;
  let panelOpen = false;
  let graphicIndex = 0;
  let graphEl: HTMLElement;
  let engineEl: HTMLButtonElement;
  let closeEl: HTMLButtonElement;

  $: shown = hover ?? picked;
  $: caption = shown ? nodeById.get(shown) ?? matchHint : matchHint;
  $: shownSide = shown ? sideOf.get(shown) : undefined;
  $: graphic = matchGraphics[graphicIndex];
  $: playing = running && !reduced && panelOpen;

  type Heat = 'hot' | 'warm' | 'dim' | '';

  function wireHeat(id: string, side: 'in' | 'out', current: string | null, currentSide: Side | undefined): Heat {
    if (!current) return '';
    if (current === id) return 'hot';
    if (currentSide === 'engine') return 'warm';
    return currentSide === side ? 'dim' : 'warm';
  }

  function linkHeat(side: 'in' | 'out', current: string | null, currentSide: Side | undefined): Heat {
    if (!current) return '';
    if (currentSide === 'engine' || currentSide === side) return 'hot';
    return 'warm';
  }

  function enter(id: string, event: PointerEvent) {
    if (event.pointerType === 'mouse') hover = id;
  }

  function leave() {
    hover = null;
  }

  function pick(id: string) {
    picked = id;
  }

  async function openPanel() {
    picked = matchEngine.id;
    panelOpen = true;
    await tick();
    closeEl?.focus({ preventScroll: true });
  }

  async function closePanel() {
    panelOpen = false;
    await tick();
    engineEl?.focus({ preventScroll: true });
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && panelOpen) {
      event.preventDefault();
      closePanel();
      return;
    }
    if (panelOpen) return;
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const dir = keys[event.key];
    if (!dir) return;
    const current = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-node]')?.dataset.node;
    if (!current) return;
    event.preventDefault();
    const next = order[(order.indexOf(current) + dir + order.length) % order.length];
    graphEl.querySelector<HTMLElement>(`[data-node="${next}"]`)?.focus();
  }

  /** Video muto e in ripetizione: parte solo se il palco è in vista e il pannello è aperto. */
  function player(node: HTMLVideoElement, on: boolean) {
    node.muted = true;
    const sync = (go: boolean) => {
      if (go) node.play().catch(() => {});
      else node.pause();
    };
    sync(on);
    return { update: sync, destroy: () => node.pause() };
  }
</script>

<InfoFrame label="Come nasce una partita da televisione" {idle} bind:running bind:reduced on:keydown={onKey}>
<div class="mp" class:is-open={panelOpen}>
  <div class="mp__stage" bind:this={graphEl} inert={panelOpen}>
    <div class="mp__graph">
      <svg class="mp__wires" viewBox="0 0 1000 {VIEW_H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="mp-hot" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
            <stop offset="0" stop-color="var(--a)" />
            <stop offset="0.5" stop-color="var(--hi)" />
            <stop offset="1" stop-color="var(--a)" />
          </linearGradient>
        </defs>
        {#each wires as w (w.node.id)}
          {@const heat = wireHeat(w.node.id, w.side, shown, shownSide)}
          <g class="wire {heat && `is-${heat}`}" style="--i:{w.i}">
            <path class="wire__base" d={w.d} />
            <path class="wire__lit" d={w.d} stroke="url(#mp-hot)" />
            <path class="wire__pk" d={w.d} pathLength="100" />
          </g>
        {/each}
      </svg>

      <ul class="mp__col mp__col--in" aria-label="Quello che entra nel motore">
        {#each matchSources as n, i (n.id)}
          <li style="--y:{wires[i].y / (VIEW_H / 100)}%">
            <button
              type="button"
              class="node"
              class:is-on={shown === n.id}
              data-node={n.id}
              on:pointerenter={(e) => enter(n.id, e)}
              on:pointerleave={leave}
              on:focus={() => pick(n.id)}
              on:click={() => pick(n.id)}
            >
              <span class="node__ic"><InfoIcon name={n.icon} /></span>
              <span class="node__lb">{n.label}</span>
            </button>
          </li>
        {/each}
      </ul>

      <span class="vc {linkHeat('in', shown, shownSide) && `is-${linkHeat('in', shown, shownSide)}`}" aria-hidden="true"><i></i></span>

      <button
        type="button"
        class="engine"
        class:is-on={shown === matchEngine.id}
        data-node={matchEngine.id}
        aria-label="{matchEngine.label}: apri le grafiche"
        bind:this={engineEl}
        on:pointerenter={(e) => enter(matchEngine.id, e)}
        on:pointerleave={leave}
        on:focus={() => pick(matchEngine.id)}
        on:click={openPanel}
      >
        <i class="engine__ping" aria-hidden="true"></i>
        <svg class="engine__ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <circle class="engine__r1" cx="50" cy="50" r="47" />
          <circle class="engine__r2" cx="50" cy="50" r="40" />
        </svg>
        <span class="engine__core">
          <span class="engine__ic"><InfoIcon name={matchEngine.icon} /></span>
          <span class="engine__lb">{matchEngine.label}</span>
        </span>
        <span class="engine__hint" aria-hidden="true">Tocca per le grafiche</span>
      </button>

      <span class="vc {linkHeat('out', shown, shownSide) && `is-${linkHeat('out', shown, shownSide)}`}" aria-hidden="true"><i></i></span>

      <ul class="mp__col mp__col--out" aria-label="Quello che esce dal motore">
        {#each matchDestinations as n, i (n.id)}
          <li style="--y:{wires[matchSources.length + i].y / (VIEW_H / 100)}%">
            <button
              type="button"
              class="node node--out"
              class:is-on={shown === n.id}
              data-node={n.id}
              on:pointerenter={(e) => enter(n.id, e)}
              on:pointerleave={leave}
              on:focus={() => pick(n.id)}
              on:click={() => pick(n.id)}
            >
              <span class="node__ic"><InfoIcon name={n.icon} /></span>
              <span class="node__lb">{n.label}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <div class="mp__cap" aria-live="polite">
      <p class="mp__cap-t">{caption.label}</p>
      <p class="mp__cap-x">{caption.text}</p>
      {#if shown === matchEngine.id && !panelOpen}
        <button type="button" class="mp__cap-go" on:click={openPanel}>Vedi le grafiche <span aria-hidden="true">→</span></button>
      {/if}
    </div>
  </div>

  <div class="pn" role="region" aria-label="Le grafiche del motore">
    <div class="pn__head">
      <p class="pn__kicker">Le grafiche</p>
      <button type="button" class="pn__close" aria-label="Chiudi le grafiche" bind:this={closeEl} on:click={closePanel}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>

    <div class="pn__body">
      <div class="mon">
        {#key graphic.id}
          <div class="mon__media" in:fade={{ duration: reduced ? 0 : 240 }}>
            {#if graphic.video && !reduced}
              <video
                use:player={playing}
                src={graphic.video}
                poster={graphic.poster}
                loop
                muted
                playsinline
                preload="metadata"
                aria-label={graphic.alt}
              ></video>
            {:else}
              <img src={graphic.poster} alt={graphic.alt} width="1280" height="720" loading="lazy" decoding="async" />
            {/if}
          </div>
        {/key}
        <span class="mon__tag" aria-hidden="true"><i></i>{graphic.label}</span>
      </div>

      <div class="pn__side">
        <p class="pn__lbl">Guardane una</p>
        <Chips grid items={matchGraphics} active={graphicIndex} label="Scegli una grafica" on:pick={(e) => (graphicIndex = e.detail)} />
        <p class="pn__lbl">Ce ne sono altre</p>
        <ul class="pn__tags">
          {#each matchOtherGraphics as t}
            <li>{t}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
</InfoFrame>

<style>
  .mp__stage {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding: 1rem 0.9rem 1rem;
    transition: opacity 0.3s;
  }

  .is-open .mp__stage {
    opacity: 0;
  }

  /* ---------- schema, in verticale ---------- */
  .mp__graph {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .mp__wires {
    display: none;
  }

  .mp__col {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: 0.5rem;
  }

  .mp__col--in {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mp__col--out {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .mp__col li {
    display: flex;
  }

  .node {
    appearance: none;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 2.9rem;
    padding: 0.55rem 0.7rem;
    border-radius: 0.8rem;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.045);
    color: var(--ink);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    line-height: 1.2;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.25s, background-color 0.25s;
  }

  .node--out {
    flex-direction: column;
    justify-content: center;
    gap: 0.35rem;
    text-align: center;
  }

  .node__ic {
    flex: none;
    display: grid;
    place-items: center;
    width: 1.7rem;
    height: 1.7rem;
    padding: 0.32rem;
    border-radius: 50%;
    color: var(--hi);
    background: color-mix(in srgb, var(--a) 22%, transparent);
    transition: background-color 0.25s;
  }

  .node:hover,
  .node.is-on {
    border-color: var(--a);
    background: color-mix(in srgb, var(--a) 16%, #0a0a0e);
  }

  .node.is-on .node__ic {
    background: color-mix(in srgb, var(--a) 45%, transparent);
  }

  .node:focus-visible,
  .engine:focus-visible,
  .mp__cap-go:focus-visible,
  .pn__close:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  /* collegamenti verticali */
  .vc {
    position: relative;
    display: block;
    width: 2px;
    height: 1.9rem;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 2px;
    background: var(--line);
  }

  .vc i {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0.7rem;
    border-radius: 2px;
    background: linear-gradient(to bottom, transparent, var(--hi));
    opacity: 0.55;
    animation: drop 1.5s linear infinite;
  }

  .vc.is-hot i {
    opacity: 1;
    background: linear-gradient(to bottom, transparent, #fff);
  }

  .vc.is-warm i {
    opacity: 0.8;
  }

  @keyframes drop {
    from { transform: translateY(-0.7rem); }
    to { transform: translateY(1.9rem); }
  }

  /* motore */
  .engine {
    appearance: none;
    position: relative;
    display: block;
    width: 10rem;
    aspect-ratio: 1;
    margin: 0 auto 1.6rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--ink);
    font: inherit;
    cursor: pointer;
  }

  .engine__ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .engine__ring circle {
    fill: none;
    stroke-linecap: round;
    transform-origin: 50px 50px;
  }

  .engine__r1 {
    stroke: var(--a);
    stroke-width: 1.6;
    stroke-dasharray: 38 12 6 12;
    animation: spin 22s linear infinite;
  }

  .engine__r2 {
    stroke: var(--hi);
    stroke-width: 1.1;
    stroke-dasharray: 3 9;
    opacity: 0.8;
    animation: spin 34s linear infinite reverse;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .engine__ping {
    position: absolute;
    inset: 6%;
    border-radius: 50%;
    border: 2px solid var(--a);
    opacity: 0;
    animation: ping 3.2s ease-out infinite;
  }

  @keyframes ping {
    0% { transform: scale(0.9); opacity: 0.55; }
    80%, 100% { transform: scale(1.22); opacity: 0; }
  }

  .engine__core {
    position: absolute;
    inset: 11%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    padding: 0.4rem;
    border-radius: 50%;
    background:
      radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--a) 40%, #14141a), #0a0a0e 75%);
    border: 1px solid color-mix(in srgb, var(--a) 60%, transparent);
    text-align: center;
    transition: border-color 0.25s;
  }

  .engine:hover .engine__core,
  .engine.is-on .engine__core {
    border-color: var(--hi);
  }

  .engine__ic {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--hi);
  }

  .engine__lb {
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.15;
  }

  .engine__hint {
    position: absolute;
    left: 50%;
    top: calc(100% + 0.4rem);
    translate: -50% 0;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--line);
    color: var(--ink2);
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;
  }

  /* didascalia */
  .mp__cap {
    min-height: 5.6rem;
    padding: 0.85rem 1rem;
    border-radius: 0.9rem;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.04);
  }

  .mp__cap-t {
    margin: 0 0 0.25rem;
    font-weight: var(--pg-display-weight);
    font-size: 1.02rem;
    letter-spacing: var(--pg-display-tracking);
  }

  .mp__cap-x {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.45;
    color: var(--ink2);
  }

  .mp__cap-go {
    appearance: none;
    margin: 0.5rem 0 0;
    padding: 0;
    min-height: 2.75rem;
    border: 0;
    background: none;
    color: var(--hi);
    font: inherit;
    font-size: 0.86rem;
    font-weight: 700;
    cursor: pointer;
  }

  /* ---------- pannello delle grafiche ---------- */
  .pn {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding: 0.8rem 0.9rem 0.9rem;
    overflow: auto;
    background: #08080c;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.98);
    transition: opacity 0.3s, transform 0.3s, visibility 0s 0.3s;
  }

  .is-open .pn {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition: opacity 0.3s, transform 0.3s;
  }

  .pn__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pn__kicker {
    margin: 0;
    font: 600 0.72rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--hi);
  }

  .pn__close {
    appearance: none;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    margin: -0.4rem -0.5rem -0.4rem 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--ink);
    cursor: pointer;
  }

  .pn__close svg {
    width: 1.3rem;
    height: 1.3rem;
  }

  .pn__close:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .pn__body {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .mon {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 0.7rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: #000;
    box-shadow: 0 0 0 4px #14141a, 0 18px 40px -16px color-mix(in srgb, var(--a) 60%, transparent);
  }

  .mon__media,
  .mon video,
  .mon img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mon__tag {
    position: absolute;
    left: 0.5rem;
    bottom: 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.22rem 0.55rem;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.72);
    font-size: 0.7rem;
    font-weight: 700;
  }

  .mon__tag i {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--a);
  }

  .pn__side {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pn__lbl {
    margin: 0.2rem 0 0;
    font: 600 0.68rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink2);
  }

  .pn__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pn__tags li {
    padding: 0.28rem 0.65rem;
    border-radius: 999px;
    border: 1px dashed rgba(255, 255, 255, 0.28);
    color: var(--ink2);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: default;
  }

  /* ---------- scorrimento dei pacchetti luminosi ---------- */
  .wire__base,
  .wire__lit,
  .wire__pk {
    fill: none;
    stroke-linecap: round;
  }

  .wire__base {
    stroke: rgba(255, 255, 255, 0.16);
    stroke-width: 3;
  }

  .wire__lit {
    stroke-width: 4;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .wire__pk {
    stroke: #fff;
    stroke-width: 6;
    stroke-dasharray: 2.4 47.6;
    opacity: 0.55;
    animation: flow 3.4s linear infinite;
    animation-delay: calc(var(--i) * -0.55s);
  }

  @keyframes flow {
    from { stroke-dashoffset: 50; }
    to { stroke-dashoffset: 0; }
  }

  .wire.is-hot .wire__lit { opacity: 1; }
  .wire.is-hot .wire__pk { opacity: 1; }
  .wire.is-warm .wire__lit { opacity: 0.45; }
  .wire.is-warm .wire__pk { opacity: 0.85; }
  .wire.is-dim { opacity: 0.35; }

  /* ---------- schema, in orizzontale ---------- */
  @container info (min-width: 480px) {
    .mp__stage {
      padding: 3cqw 3cqw 3cqw;
      gap: 2.2cqw;
    }

    .mp__graph {
      display: block;
      aspect-ratio: 1000 / 600;
    }

    .mp__wires {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .vc {
      display: none;
    }

    .mp__col {
      display: block;
    }

    .mp__col li {
      position: absolute;
      top: calc(var(--y) - 9.165%);
      width: 28%;
      height: 18.33%;
    }

    .mp__col--in li { left: 0; }
    .mp__col--out li { right: 0; }

    .node,
    .node--out {
      flex-direction: row;
      justify-content: flex-start;
      gap: 1.6cqw;
      min-height: 0;
      padding: 0 1.8cqw;
      border-radius: 1.8cqw;
      font-size: max(11px, 2.15cqw);
      text-align: left;
    }

    .node__ic {
      width: 5cqw;
      height: 5cqw;
      padding: 1.15cqw;
    }

    .engine {
      position: absolute;
      left: 40%;
      top: 50%;
      width: 20%;
      margin: -10% 0 0;
    }

    .engine__ic {
      width: 4.4cqw;
      height: 4.4cqw;
    }

    .engine__core {
      gap: 0.6cqw;
    }

    .engine__lb {
      font-size: max(10px, 1.95cqw);
    }

    .engine__hint {
      top: calc(100% + 1.2cqw);
      font-size: max(10px, 1.85cqw);
      padding: 0.6cqw 1.6cqw;
    }

    .mp__cap {
      min-height: 7.4rem;
    }

    .mp__cap-t {
      font-size: 1.08rem;
    }

    .mp__cap-x {
      font-size: 0.92rem;
    }

    .pn {
      gap: 1rem;
      padding: 1.1rem 1.3rem 1.3rem;
    }

    .pn__body {
      flex: 1;
      flex-direction: row;
      align-items: center;
      gap: 1.4rem;
    }

    .mon {
      flex: 1.05;
      min-width: 0;
    }

    .pn__side {
      flex: 1;
      min-width: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .wire__pk,
    .vc i,
    .engine__ping {
      display: none;
    }
  }
</style>
