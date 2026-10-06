<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { getCaseStudyBySlug, caseStudyHref } from '$lib/data/case-studies';
  import type { CaseStudy } from '$lib/data/case-studies';
  import { regiaNodes, regiaTabs } from '$lib/data/regia';
  import ProductDevice from './ProductDevice.svelte';
  import ProjectIcon from './ProjectIcon.svelte';
  import StatusBadge from './StatusBadge.svelte';

  const nodes = regiaNodes
    .map((n) => ({ ...n, study: getCaseStudyBySlug(n.projectId) }))
    .filter((n): n is typeof n & { study: CaseStudy } => Boolean(n.study));

  let active = 0;
  let tab = 0;
  let root: HTMLElement;
  let inView = false;
  let interacted = false;
  let timer: ReturnType<typeof setInterval> | null = null;
  let io: IntersectionObserver | null = null;
  let reduce = false;

  const pad = (n: number) => String(n).padStart(2, '0');

  $: current = nodes[active];

  function pick(i: number) {
    interacted = true;
    stop();
    active = i;
  }

  function start() {
    if (timer || reduce || interacted || !inView) return;
    timer = setInterval(() => {
      active = (active + 1) % nodes.length;
    }, 6500);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  onMount(() => {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.35 }
    );
    io.observe(root);
  });

  onDestroy(() => {
    stop();
    io?.disconnect();
  });
</script>

<section id="regia" class="rg" bind:this={root} style="--a:{current.study.accent[0]}; --b:{current.study.accent[1]}">
  <div class="rg__bg" aria-hidden="true"></div>

  <div class="rg__in section-container">
    <header class="rg__head">
      <p class="rg__kicker">02 · Regia e produzione delle partite</p>
      <h2 class="rg__title">Dal campo<br /><span class="gradient-text">allo schermo.</span></h2>
      <p class="rg__sub">
        Cinque strumenti che coprono tutta la produzione di una partita: dalla camera sul treppiede al catalogo
        sul televisore. Li abbiamo costruiti noi, uno per ogni passaggio.
      </p>
    </header>

    <div class="rg__grid">
      <ol class="rg__list">
        {#each nodes as node, i (node.projectId)}
          <li>
            <div
              class="node"
              class:is-active={i === active}
              style="--na:{node.study.accent[0]}"
            >
              <button
                type="button"
                class="node__btn"
                aria-pressed={i === active}
                on:click={() => pick(i)}
                on:mouseenter={() => { if (window.matchMedia('(hover: hover)').matches) pick(i); }}
              >
                <span class="node__num">{pad(i + 1)}</span>
                <span class="node__main">
                  <span class="node__verb">{node.verb}</span>
                  <span class="node__who">
                    <ProjectIcon study={node.study} size={22} />
                    <span>{node.study.name}</span>
                  </span>
                </span>
              </button>
              {#if i === active}
                <div class="node__more" transition:fade={{ duration: 160 }}>
                  <p>{node.line}</p>
                  <div class="node__meta">
                    <StatusBadge status={node.study.status} />
                    <a href={caseStudyHref(node.study)}>Scheda <span aria-hidden="true">→</span></a>
                  </div>
                </div>
              {/if}
            </div>
          </li>
        {/each}
      </ol>

      <div class="rg__stage">
        {#key active}
          <div class="vis" in:fly={{ y: 26, duration: 520, delay: 120 }} out:fade={{ duration: 140 }}>
            {#if current.visual === 'tally'}
              <div class="tally" role="img" aria-label="Rig Cast: l'iPhone in orizzontale con la luce tally di regia">
                <div class="tally__frame" aria-hidden="true">
                  <i class="c c--tl"></i><i class="c c--tr"></i><i class="c c--bl"></i><i class="c c--br"></i>
                  <span class="tally__rec"><b></b> REC</span>
                </div>
                <img class="tally__icon" src={current.study.icon} alt="" width="200" height="200" />
                <div class="tally__states" aria-hidden="true">
                  <span class="st st--standby">Standby</span>
                  <span class="st st--air">On air</span>
                </div>
                <ul class="tally__proto" aria-label="Protocolli">
                  <li>RTMP</li><li>RTMPS</li><li>SRT</li>
                </ul>
              </div>
            {:else if current.visual === 'monitor'}
              <div class="mon">
                <div class="mon__frame">
                  {#key tab}
                    {#if regiaTabs[tab].video && !reduce}
                      <video
                        class="mon__img"
                        src={regiaTabs[tab].video}
                        poster={regiaTabs[tab].src}
                        aria-label={regiaTabs[tab].alt}
                        width="960"
                        height="540"
                        autoplay
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        in:fade={{ duration: 260 }}
                      ></video>
                    {:else}
                      <img
                        class="mon__img"
                        src={regiaTabs[tab].src}
                        alt={regiaTabs[tab].alt}
                        width="1600"
                        height="900"
                        in:fade={{ duration: 260 }}
                      />
                    {/if}
                  {/key}
                  <div class="mon__calls" aria-hidden="true">
                    {#each regiaTabs[tab].callouts as c, k}
                      <span class="call" class:call--l={c.x > 60} style="left:{c.x}%; top:{c.y}%; --d:{k * 0.12}s">
                        <i></i><em>{c.label}</em>
                      </span>
                    {/each}
                  </div>
                </div>
                <div class="mon__tabs" role="tablist" aria-label="Grafiche della regia">
                  {#each regiaTabs as t, k}
                    <button
                      type="button"
                      role="tab"
                      aria-selected={k === tab}
                      class:is-active={k === tab}
                      on:click={() => { tab = k; interacted = true; stop(); }}
                    >{t.label}</button>
                  {/each}
                </div>
              </div>
            {:else}
              <ProductDevice study={current.study} />
            {/if}
          </div>
        {/key}
      </div>
    </div>
  </div>
</section>

<style>
  .rg {
    position: relative;
    overflow: hidden;
    background: #050505;
    color: #fff;
    isolation: isolate;
    --t2: rgba(255, 255, 255, 0.68);
    --line: rgba(255, 255, 255, 0.12);
    padding: clamp(4rem, 9vw, 7rem) 0;
  }

  .rg__bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(55% 60% at 78% 55%, color-mix(in srgb, var(--a) 30%, transparent), transparent 70%),
      radial-gradient(45% 50% at 5% 10%, color-mix(in srgb, var(--b) 40%, transparent), transparent 70%);
    transition: background 0.8s;
  }

  .rg__kicker {
    margin: 0 0 1.2rem;
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--t2);
  }

  .rg__title {
    margin: 0;
    font-weight: var(--pg-display-weight);
    font-size: clamp(2.5rem, 7vw, 6.4rem);
    line-height: 0.95;
    letter-spacing: var(--pg-display-tracking);
  }

  .rg__sub {
    margin: 1.4rem 0 0;
    max-width: 38rem;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.55;
    color: var(--t2);
  }

  .rg__grid {
    margin-top: clamp(2.4rem, 6vw, 4.5rem);
    display: grid;
    gap: clamp(1.6rem, 4vw, 3.5rem);
  }

  @media (min-width: 1024px) {
    .rg__grid {
      grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
      align-items: start;
    }
  }

  .rg__list {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--line);
  }

  .node {
    border-bottom: 1px solid var(--line);
    position: relative;
  }

  .node::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: -1px;
    width: 3px;
    background: var(--na);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .node.is-active::before { transform: scaleY(1); }

  .node__btn {
    width: 100%;
    display: grid;
    grid-template-columns: 3rem 1fr;
    align-items: center;
    gap: 0.4rem;
    padding: 1.15rem 0.4rem 1.15rem 1.1rem;
    border: 0;
    background: none;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }

  .node__num {
    font: 600 0.8rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    color: rgba(255, 255, 255, 0.45);
    transition: color 0.3s;
  }

  .node.is-active .node__num { color: var(--na); }

  .node__main {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .node__verb {
    font-weight: var(--pg-display-weight);
    font-size: clamp(1.6rem, 2.8vw, 2.4rem);
    letter-spacing: -0.02em;
    line-height: 1;
    color: rgba(255, 255, 255, 0.55);
    transition: color 0.3s;
  }

  .node.is-active .node__verb,
  .node__btn:hover .node__verb { color: #fff; }

  .node__who {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--t2);
  }

  .node__btn:focus-visible { outline: 2px solid #fff; outline-offset: -2px; }

  .node__more {
    padding: 0 0.4rem 1.3rem calc(1.1rem + 3.4rem);
  }

  .node__more p {
    margin: 0 0 0.9rem;
    color: rgba(255, 255, 255, 0.86);
    font-size: 1.02rem;
    line-height: 1.5;
    max-width: 30rem;
  }

  .node__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.9rem;
  }

  .node__meta a {
    color: #fff;
    font-size: 0.85rem;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }

  .node__meta a:hover { border-color: #fff; }

  /* stage */
  .rg__stage {
    position: relative;
    min-height: clamp(18rem, 44vw, 34rem);
    display: grid;
    align-items: center;
  }

  @media (min-width: 1024px) {
    .rg__stage {
      position: sticky;
      top: 7rem;
    }
  }

  .vis {
    grid-area: 1 / 1;
    padding: 0 1.4rem 1.6rem 0;
  }

  /* tally */
  .tally {
    position: relative;
    aspect-ratio: 16 / 10;
    border-radius: 1.2rem;
    overflow: hidden;
    border: 1px solid var(--line);
    background:
      radial-gradient(60% 70% at 50% 45%, color-mix(in srgb, var(--a) 28%, #0a0a0d), #07070a 78%);
    display: grid;
    place-items: center;
  }

  .tally__icon {
    width: clamp(7rem, 22vw, 12rem);
    height: auto;
    aspect-ratio: 1;
    border-radius: 22.37%;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.16), 0 30px 70px rgba(0, 0, 0, 0.6), 0 0 80px color-mix(in srgb, var(--a) 40%, transparent);
  }

  .tally__frame { position: absolute; inset: 7%; pointer-events: none; }

  .c {
    position: absolute;
    width: 1.6rem;
    height: 1.6rem;
    border: 2px solid rgba(255, 255, 255, 0.55);
  }

  .c--tl { left: 0; top: 0; border-right: 0; border-bottom: 0; }
  .c--tr { right: 0; top: 0; border-left: 0; border-bottom: 0; }
  .c--bl { left: 0; bottom: 0; border-right: 0; border-top: 0; }
  .c--br { right: 0; bottom: 0; border-left: 0; border-top: 0; }

  .tally__rec {
    position: absolute;
    left: 0.4rem;
    top: -2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font: 700 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    color: rgba(255, 255, 255, 0.8);
  }

  .tally__rec b {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #ef4444;
    animation: blink 1.4s steps(2, jump-none) infinite;
  }

  @keyframes blink { 50% { opacity: 0.15; } }

  .tally__states {
    position: absolute;
    right: 1.2rem;
    top: 1rem;
    width: 7.5rem;
    height: 2rem;
  }

  .st {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    border-radius: 0.4rem;
    font: 800 0.72rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    animation: cycle 5s ease-in-out infinite;
  }

  .st--standby { background: #f5b942; color: #231900; }
  .st--air { background: #ef4444; color: #fff; animation-delay: -2.5s; }

  @keyframes cycle {
    0%, 42% { opacity: 1; }
    50%, 92% { opacity: 0; }
    100% { opacity: 1; }
  }

  .tally__proto {
    position: absolute;
    left: 50%;
    bottom: 1.1rem;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tally__proto li {
    padding: 0.32rem 0.7rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    font: 600 0.68rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.78);
  }

  /* monitor */
  .mon__frame {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: #000;
    box-shadow: 0 60px 100px -40px color-mix(in srgb, var(--a) 60%, transparent), 0 24px 60px rgba(0, 0, 0, 0.6);
    aspect-ratio: 16 / 9;
  }

  .mon__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mon__calls { position: absolute; inset: 0; pointer-events: none; }

  .call {
    position: absolute;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    transform: translate(-0.4rem, -50%);
    animation: pop 0.5s var(--d) cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }

  .call--l { flex-direction: row-reverse; transform: translate(calc(-100% + 0.4rem), -50%); }

  .call i {
    flex: none;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: #fff;
    position: relative;
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
  }

  .call i::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    animation: ping 2.2s ease-out infinite;
  }

  .call em {
    font-style: normal;
    padding: 0.3rem 0.65rem;
    border-radius: 0.45rem;
    background: rgba(8, 8, 10, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
    font: 600 0.7rem/1.1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  @keyframes pop { from { opacity: 0; scale: 0.85; } }
  @keyframes ping { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(3); opacity: 0; } }

  @media (max-width: 640px) {
    .call em { display: none; }
  }

  .mon__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .mon__tabs button {
    padding: 0.5rem 0.95rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: none;
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .mon__tabs button:hover { border-color: #fff; color: #fff; }

  .mon__tabs button.is-active {
    background: #fff;
    border-color: #fff;
    color: #0a0a0a;
  }

  @media (prefers-reduced-motion: reduce) {
    .st, .call, .call i::after, .tally__rec b { animation: none; }
    .st--air { opacity: 0; }
  }
</style>
