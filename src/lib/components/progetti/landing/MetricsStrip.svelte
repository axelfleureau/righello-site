<script lang="ts">
  import { onMount } from 'svelte';
  import type { Metric } from '$lib/data/landing/types';
  import { prefersReducedMotion } from './actions';

  export let metrics: Metric[];

  const fmt = new Intl.NumberFormat('it-IT');
  const DURATION = 1400;

  /** Valore mostrato: in SSR e' quello vero; in pagina conta da 0 quando la fascia entra in vista. */
  let shown: number[] = metrics.map((m) => m.value ?? 0);
  let root: HTMLElement;

  onMount(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    shown = shown.map(() => 0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / DURATION);
          const eased = 1 - Math.pow(1 - p, 3);
          shown = metrics.map((m) => Math.round((m.value ?? 0) * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  });
</script>

<ul class="ms" bind:this={root} style="--n:{Math.min(metrics.length, 4)}" data-n={metrics.length}>
  {#each metrics as m, i}
    {@const num = `${m.prefix ?? ''}${m.text ?? fmt.format(m.value ?? 0)}${m.suffix ?? ''}`}
    <!-- la misura segue il numero finale, non quello che sta contando: la cifra non cambia grandezza mentre sale -->
    <li class="ms__cell">
      <p class="ms__num" style="--ch:{num.length}" aria-label={num}>
        <span aria-hidden="true">{m.prefix ?? ''}{m.text ?? fmt.format(shown[i])}{m.suffix ?? ''}</span>
      </p>
      <p class="ms__label">{m.label}</p>
      {#if m.note}<p class="ms__note">{m.note}</p>{/if}
    </li>
  {/each}
</ul>

<style>
  /* 3 o 4 colonne in base al numero; su telefono 2x2 (con tre voci: una intera sopra, due sotto) */
  .ms {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: 1px solid var(--lp-line);
  }

  .ms__cell {
    container-type: inline-size;
    padding: 1.6rem 1rem 0.2rem 0;
    min-width: 0;
  }
  /* il contenitore e' la cella: la cifra si adatta alla sua larghezza e al numero di caratteri, senza uscire mai */
  .ms__cell > * { min-width: 0; }

  @media (max-width: 899px) {
    .ms__cell { padding-bottom: 1.4rem; }
    .ms__cell:nth-child(even) { padding-left: 1.2rem; border-left: 1px solid var(--lp-line); }
    .ms__cell:nth-child(n + 3) { border-top: 1px solid var(--lp-line); }
    /* tre voci: la prima occupa tutta la riga, le altre due si dividono la seconda */
    .ms[data-n='3'] .ms__cell:first-child { grid-column: 1 / -1; padding-right: 0; }
    .ms[data-n='3'] .ms__cell:nth-child(2) { border-left: 0; padding-left: 0; padding-right: 1rem; border-top: 1px solid var(--lp-line); }
    .ms[data-n='3'] .ms__cell:nth-child(3) { padding-left: 1.2rem; border-left: 1px solid var(--lp-line); border-top: 1px solid var(--lp-line); }
  }

  @media (min-width: 900px) {
    .ms { grid-template-columns: repeat(var(--n), minmax(0, 1fr)); }
    .ms__cell + .ms__cell { padding-left: 1.6rem; border-left: 1px solid var(--lp-line); }
  }

  .ms__num {
    margin: 0;
    font-weight: var(--pg-display-weight);
    /* 150cqw / caratteri: "1.200" resta grande, "90 giorni" scende fino a stare nella cella */
    font-size: clamp(1.7rem, calc(150cqw / max(var(--ch), 4)), 4.2rem);
    line-height: 1;
    letter-spacing: var(--pg-display-tracking);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    color: var(--lp-ink);
  }

  .ms__label { margin: 0.7rem 0 0; font-size: 0.98rem; font-weight: 600; line-height: 1.3; color: var(--lp-ink); text-wrap: balance; }

  .ms__note {
    margin: 0.4rem 0 0;
    font: 500 0.66rem/1.5 var(--lp-mono);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--lp-ink-3);
  }
</style>
