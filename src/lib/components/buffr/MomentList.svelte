<script lang="ts">
  import { moments } from './content';

  /** Momento acceso in questo istante (indice), oppure -1. */
  export let active = -1;
</script>

<div class="ml" aria-hidden="true">
  <p class="ml__head">I quattro pulsanti</p>
  <ul>
    {#each moments as moment, i}
      <li class:is-on={active === i} style="--c: {moment.color}">
        <i class="ml__dot"></i>
        <span class="ml__name">{moment.name}</span>
        <span class="ml__sec">ultimi {moment.seconds} s</span>
      </li>
    {/each}
  </ul>
  <p class="ml__foot">Dopo, in libreria, puoi cambiare il momento di ogni clip.</p>
</div>

<style>
  .ml {
    width: 100%;
    padding: 1.1rem 1.15rem 1.15rem;
    border-radius: 1.2rem;
    background: rgba(14, 14, 18, 0.94);
    border: 1px solid var(--bf-line);
    box-shadow: 0 30px 60px -28px rgba(0, 0, 0, 0.8);
    color: var(--bf-text);
  }

  .ml__head {
    margin: 0 0 0.8rem;
    font: 600 0.72rem/1 var(--bf-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--bf-text-2);
  }

  ul {
    display: grid;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.7rem;
    padding: 0.65rem 0.8rem;
    border-radius: 0.8rem;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.04);
    transition:
      background 0.3s,
      border-color 0.3s,
      transform 0.4s var(--bf-ease);
  }

  li.is-on {
    background: color-mix(in srgb, var(--c) 22%, transparent);
    border-color: var(--c);
    transform: translateX(0.3rem);
  }

  .ml__dot {
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    background: var(--c);
  }

  .ml__name {
    font-weight: 700;
    font-size: 0.98rem;
  }

  .ml__sec {
    font: 500 0.74rem/1 var(--bf-mono);
    color: var(--bf-text-2);
    font-variant-numeric: tabular-nums;
  }

  .ml__foot {
    margin: 0.9rem 0 0;
    font-size: 0.82rem;
    line-height: 1.4;
    color: var(--bf-text-3);
  }
</style>
