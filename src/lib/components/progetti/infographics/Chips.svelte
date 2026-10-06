<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let items: { id: string; label: string }[];
  export let active: number;
  /** Nome del gruppo di scelte. */
  export let label: string;
  /** A colonne invece che in riga. */
  export let grid = false;

  const dispatch = createEventDispatcher<{ pick: number }>();
</script>

<div class="chips" class:chips--grid={grid} role="group" aria-label={label}>
  {#each items as item, i (item.id)}
    <button type="button" class="chip" aria-pressed={i === active} on:click={() => dispatch('pick', i)}>{item.label}</button>
  {/each}
</div>

<style>
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  /* in colonne quante ne stanno: una sola se lo spazio è poco */
  .chips--grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(5.8rem, 1fr));
  }

  .chip {
    appearance: none;
    min-height: 2.75rem;
    padding: 0 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.05);
    color: var(--ink);
    font: inherit;
    font-size: 0.86rem;
    font-weight: 700;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;
  }

  .chips--grid .chip {
    padding: 0 0.4rem;
    border-radius: 0.7rem;
    font-size: 0.8rem;
  }

  .chip:hover {
    border-color: color-mix(in srgb, var(--hi) 70%, transparent);
  }

  .chip[aria-pressed='true'] {
    border-color: var(--hi);
    background: color-mix(in srgb, var(--a) 30%, #0a0a0e);
  }

  .chip:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
</style>
