<script lang="ts">
  import type { Demo } from '$lib/data/landing/types';
  import SectionHead from './SectionHead.svelte';
  import MediaFrame from './MediaFrame.svelte';
  import { ratioOf } from './layout';
  import { reveal } from './actions';

  export let demo: Demo;
  /** Posizione nella pagina: le sezioni alternano il tono dello sfondo. */
  export let tone = 0;

  /** Da 7 voci in su, e se hanno categorie, compare il filtro. */
  const FILTER_FROM = 7;

  $: groups = [...new Set(demo.items.map((i) => i.group).filter((g): g is string => !!g))];
  $: filterable = demo.items.length >= FILTER_FROM && groups.length > 1;

  let group = '';
  let activeId = demo.items[0]?.id ?? '';

  $: visible = group ? demo.items.filter((i) => i.group === group) : demo.items;
  $: index = Math.max(0, visible.findIndex((i) => i.id === activeId));
  $: current = visible[index] ?? visible[0];
  /** Cornice del media in mostra: il telefono sta di lato alla didascalia, gli altri sopra. */
  $: frame = current.media.frame ?? 'monitor';
  /** Il visore ha un'altezza massima uguale per tutte le voci: cambia la larghezza col rapporto, non l'altezza della sezione. */
  $: stageRatio = ratioOf(current.media, frame);

  function pick(id: string) {
    activeId = id;
  }

  function setGroup(g: string) {
    group = g;
    const list = g ? demo.items.filter((i) => i.group === g) : demo.items;
    if (!list.some((i) => i.id === activeId)) activeId = list[0].id;
  }

  function step(delta: number) {
    const next = visible[(index + delta + visible.length) % visible.length];
    activeId = next.id;
    focusTab(next.id);
  }

  function focusTab(id: string) {
    requestAnimationFrame(() => document.getElementById(`demo-tab-${id}`)?.focus({ preventScroll: true }));
  }

  /** Frecce sinistra/destra sulla fila delle schede, come in ogni tablist. */
  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
    else if (e.key === 'Home') { e.preventDefault(); activeId = visible[0].id; focusTab(activeId); }
    else if (e.key === 'End') { e.preventDefault(); activeId = visible[visible.length - 1].id; focusTab(activeId); }
  }
</script>

<section id="in-azione" class="dm lp-section" class:lp-tone-alt={tone % 2 === 1}>
  <div class="lp-grid-bg" aria-hidden="true"></div>
  <div class="section-container">
    <SectionHead align="center" kicker={demo.kicker} title={demo.title} highlight={demo.highlight} lead={demo.lead} />

    <div class="dm__ui lp-reveal" use:reveal={80}>
      {#if filterable}
        <div class="dm__filter" role="group" aria-label="Categorie">
          <button type="button" class="dm__cat" class:is-on={!group} aria-pressed={!group} on:click={() => setGroup('')}>Tutte <span>{demo.items.length}</span></button>
          {#each groups as g}
            <button type="button" class="dm__cat" class:is-on={group === g} aria-pressed={group === g} on:click={() => setGroup(g)}>
              {g} <span>{demo.items.filter((i) => i.group === g).length}</span>
            </button>
          {/each}
        </div>
      {/if}

      <div class="dm__tabs" role="tablist" aria-label={demo.title} tabindex="-1" on:keydown={onKey}>
        {#each visible as item (item.id)}
          <button
            type="button"
            role="tab"
            id={`demo-tab-${item.id}`}
            class="dm__tab"
            class:is-on={item.id === current.id}
            aria-selected={item.id === current.id}
            aria-controls="demo-panel"
            tabindex={item.id === current.id ? 0 : -1}
            on:click={() => pick(item.id)}>{item.label}</button>
        {/each}
      </div>

      <div class="dm__panel" class:dm__panel--side={frame === 'phone'} id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${current.id}`}>
        <div class="dm__stage dm__stage--{frame}" style="--r:{stageRatio.toFixed(4)}">
          {#key current.id}
            <MediaFrame media={{ ...current.media, frame, caption: undefined }} eager />
          {/key}
        </div>
        <div class="dm__cap">
          <div class="dm__count" aria-hidden="true">{String(index + 1).padStart(2, '0')}<span> / {String(visible.length).padStart(2, '0')}</span></div>
          <div class="dm__txt" aria-live="polite">
            <h3>{current.label}</h3>
            {#if current.note}<p>{current.note}</p>{/if}
          </div>
          <div class="dm__arrows">
            <button type="button" class="dm__arrow" on:click={() => step(-1)} aria-label="Esempio precedente">
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M13 8H3.5M7.5 4l-4 4 4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </button>
            <button type="button" class="dm__arrow" on:click={() => step(1)} aria-label="Esempio successivo">
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .dm { overflow-x: clip; }

  .dm__ui { margin-top: clamp(2rem, 4vw, 3rem); display: flex; flex-direction: column; gap: 1.1rem; align-items: stretch; min-width: 0; }

  /* categorie: etichette piccole in maiuscolo, a capo su schermo largo e scorrevoli su telefono */
  .dm__filter, .dm__tabs {
    display: flex;
    gap: 0.4rem;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0.15rem 0.1rem;
    margin-inline: -0.1rem;
  }
  .dm__filter::-webkit-scrollbar, .dm__tabs::-webkit-scrollbar { display: none; }
  @media (min-width: 900px) {
    .dm__filter, .dm__tabs { flex-wrap: wrap; justify-content: center; overflow: visible; }
  }

  .dm__cat {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.75rem;
    padding: 0 0.7rem;
    border: 0;
    border-bottom: 2px solid transparent;
    background: none;
    font: 600 0.68rem/1 var(--lp-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--lp-ink-3);
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }
  .dm__cat span { font-weight: 500; opacity: 0.7; }
  .dm__cat:hover { color: var(--lp-ink); }
  .dm__cat.is-on { color: var(--lp-ink); border-color: var(--lp-pink); }

  .dm__tab {
    flex: none;
    min-height: 2.75rem;
    padding: 0 1.1rem;
    border: 1px solid var(--lp-line-strong);
    border-radius: 999px;
    background: transparent;
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--lp-ink-2);
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
  .dm__tab:hover { border-color: var(--lp-ink-2); color: var(--lp-ink); }
  .dm__tab.is-on { background: #fff; border-color: #fff; color: #0a0a0a; }

  .dm__panel { display: flex; flex-direction: column; gap: 1.2rem; margin-top: 0.6rem; min-width: 0; }

  /* il visore: larghezza = altezza massima x rapporto, con una luce del colore del prodotto dietro */
  .dm__stage { position: relative; width: calc(var(--lp-vis-stage) * var(--r)); max-width: 100%; margin-inline: auto; }
  .dm__stage::before {
    content: '';
    position: absolute;
    inset: 8% -4% -6%;
    z-index: -1;
    background:
      radial-gradient(closest-side at 30% 50%, color-mix(in srgb, var(--a) 40%, transparent), transparent 75%),
      radial-gradient(closest-side at 72% 55%, color-mix(in srgb, var(--b) 42%, transparent), transparent 78%);
  }

  .dm__cap {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 1rem 1.4rem;
    align-items: start;
    width: min(100%, 62rem);
    margin-inline: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--lp-line);
  }

  .dm__count { font: 600 1.5rem/1 var(--lp-mono); color: var(--lp-ink); }
  .dm__count span { font-size: 0.8rem; color: var(--lp-ink-3); }

  .dm__txt h3 { margin: 0 0 0.4rem; font-weight: var(--pg-display-weight); font-size: 1.3rem; line-height: 1.2; letter-spacing: var(--pg-display-tracking); }
  .dm__txt p { margin: 0; font-size: 0.96rem; line-height: 1.55; color: var(--lp-ink-2); text-wrap: pretty; }

  .dm__arrows { display: flex; gap: 0.5rem; }
  .dm__arrow {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border: 1px solid var(--lp-line-strong);
    border-radius: 50%;
    background: transparent;
    color: var(--lp-ink);
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }
  .dm__arrow:hover { background: #fff; color: #0a0a0a; }

  @media (min-width: 900px) {
    .dm__panel--side { display: grid; grid-template-columns: auto minmax(0, 24rem); gap: 3rem; align-items: center; justify-content: center; }
    .dm__panel--side .dm__stage { margin: 0; }
    .dm__panel--side .dm__cap { display: flex; flex-direction: column; align-items: flex-start; gap: 1.2rem; width: auto; padding-top: 0; border-top: 0; }
    .dm__panel--side .dm__txt h3 { font-size: 1.7rem; }
  }

  @media (max-width: 640px) {
    .dm__cap { grid-template-columns: minmax(0, 1fr) auto; }
    .dm__count { display: none; }
  }
</style>
