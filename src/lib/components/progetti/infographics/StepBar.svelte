<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { FlowStep } from '$lib/data/infographics';

  export let steps: FlowStep[];
  export let step: number;
  /** Riproduzione automatica: la barra sul passo attivo si riempie e poi chiede il passo dopo. */
  export let auto = false;
  /** Nome del gruppo di passi. */
  export let label: string;
  /** Cambia quando la riproduzione riparte da capo sullo stesso passo. */
  export let epoch = 0;

  const dispatch = createEventDispatcher<{ select: number; advance: void }>();
  const pad = (n: number) => String(n).padStart(2, '0');
  const arrows = { ArrowRight: 1, ArrowLeft: -1 } as const;

  let root: HTMLElement;

  $: current = steps[step];

  function select(index: number, focus = false) {
    const next = (index + steps.length) % steps.length;
    dispatch('select', next);
    if (focus) root.querySelector<HTMLElement>(`[data-step="${next}"]`)?.focus();
  }

  function onKey(event: KeyboardEvent) {
    const dir = arrows[event.key as keyof typeof arrows];
    if (!dir) return;
    event.preventDefault();
    select(step + dir, true);
  }
</script>

<div class="sb" bind:this={root}>
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div class="sb__row" role="group" aria-label={label} on:keydown={onKey}>
    <button type="button" class="sb__arrow" aria-label="Passo precedente" on:click={() => select(step - 1)}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
    </button>
    <ol class="sb__steps" style="--n:{steps.length}">
      {#each steps as s, i (s.id)}
        <li class:is-reached={i <= step}>
          <button
            type="button"
            class="sb__node"
            data-step={i}
            aria-label="Passo {i + 1}: {s.title}"
            aria-current={i === step ? 'step' : undefined}
            on:click={() => select(i)}
          >
            <span class="sb__n">{pad(i + 1)}</span>
            <span class="sb__bar" aria-hidden="true">
              {#if i === step}
                {#key `${step}:${epoch}`}
                  <i class:run={auto} style="--ms:{s.ms}ms" on:animationend={() => dispatch('advance')}></i>
                {/key}
              {:else if i < step}
                <i class="done"></i>
              {/if}
            </span>
          </button>
        </li>
      {/each}
    </ol>
    <button type="button" class="sb__arrow" aria-label="Passo successivo" on:click={() => select(step + 1)}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
    </button>
  </div>

  <div class="sb__now" aria-live="polite">
    <span class="sb__big" aria-hidden="true">{pad(step + 1)}</span>
    <div>
      <p class="sb__t">{current.title}</p>
      <p class="sb__x">{current.text}</p>
    </div>
  </div>
</div>

<style>
  .sb {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .sb__row {
    display: flex;
    align-items: flex-start;
    gap: 0.2rem;
  }

  .sb__steps {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(var(--n), minmax(0, 1fr));
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sb__steps li {
    position: relative;
    display: flex;
    justify-content: center;
  }

  /* la linea che collega un passo al precedente: si accende man mano che si avanza */
  .sb__steps li + li::before {
    content: '';
    position: absolute;
    top: 1.3rem;
    left: calc(-50% + 1.3rem);
    right: calc(50% + 1.3rem);
    height: 2px;
    border-radius: 2px;
    background: var(--line);
    transition: background-color 0.4s;
  }

  .sb__steps li.is-reached + li.is-reached::before {
    background: var(--hi);
  }

  .sb__node,
  .sb__arrow {
    appearance: none;
    border: 0;
    background: none;
    color: var(--ink);
    font: inherit;
    cursor: pointer;
  }

  .sb__node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    width: 100%;
    min-height: 2.75rem;
    padding: 0.1rem 0;
    color: var(--ink2);
  }

  .sb__n {
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    border: 1px solid var(--line);
    background: #0a0a0e;
    font: 700 0.82rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.02em;
    transition: background-color 0.25s, color 0.25s, border-color 0.25s;
  }

  .sb__node:hover .sb__n {
    border-color: color-mix(in srgb, var(--hi) 70%, transparent);
    color: var(--ink);
  }

  .sb__node[aria-current='step'] .sb__n {
    border-color: var(--hi);
    background: var(--hi);
    color: #0a0a0e;
  }

  .sb__bar {
    position: relative;
    display: block;
    width: 1.8rem;
    height: 3px;
    overflow: hidden;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.16);
  }

  .sb__bar i {
    position: absolute;
    inset: 0;
    border-radius: 3px;
    background: var(--hi);
    transform-origin: left;
  }

  .sb__bar i.done {
    background: rgba(255, 255, 255, 0.5);
  }

  .sb__bar i.run {
    animation: fill var(--ms) linear forwards;
  }

  @keyframes fill {
    from { transform: scaleX(0); }
  }

  .sb__arrow {
    flex: none;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    margin-top: 0.05rem;
    border-radius: 50%;
    border: 1px solid var(--line);
    transition: background-color 0.2s;
  }

  .sb__arrow svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  .sb__arrow:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .sb__node:focus-visible,
  .sb__arrow:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .sb__now {
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
    min-height: 5.6rem;
    padding: 0.85rem 1rem;
    border-radius: 0.9rem;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.04);
  }

  .sb__big {
    flex: none;
    font-weight: var(--pg-display-weight);
    font-size: 2.2rem;
    line-height: 0.95;
    letter-spacing: var(--pg-display-tracking);
    color: var(--hi);
  }

  .sb__t {
    margin: 0 0 0.25rem;
    font-weight: var(--pg-display-weight);
    font-size: 1.02rem;
    letter-spacing: var(--pg-display-tracking);
  }

  .sb__x {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.45;
    color: var(--ink2);
  }

  @container info (min-width: 520px) {
    .sb__now {
      min-height: 6.2rem;
    }

    .sb__t {
      font-size: 1.1rem;
    }

    .sb__x {
      font-size: 0.92rem;
    }
  }
</style>
