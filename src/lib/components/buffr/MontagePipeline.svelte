<script lang="ts">
  import Icon from './Icon.svelte';

  /** Avanzamento della scena, 0..1. */
  export let local = 0;

  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  const styles = [
    { name: 'Rosso', color: '#d63a45' },
    { name: 'Azzurro', color: '#2e6fd0' },
    { name: 'BUFFR', color: '#d6487e' },
  ];
  const sequence = ['Inizio', 'Gol', 'Azione', 'Gol', 'Fischio'];

  $: pick = local < 0.3 ? -1 : 1;
  $: bar = clamp((local - 0.4) / 0.2);
  $: ready = local >= 0.62;
  $: done = [local > 0.08, local > 0.26, local > 0.4, ready];
</script>

<ol class="mp" aria-hidden="true">
  <li class:is-done={done[0]}>
    <span class="mp__n">{#if done[0]}<Icon name="check" size={13} />{:else}1{/if}</span>
    <div>
      <b>Le clip della partita</b>
      <span class="mp__chips">
        {#each sequence as name}<i>{name}</i>{/each}
      </span>
    </div>
  </li>
  <li class:is-done={done[1]}>
    <span class="mp__n">{#if done[1]}<Icon name="check" size={13} />{:else}2{/if}</span>
    <div>
      <b>Lo stile</b>
      <span class="mp__chips">
        {#each styles as style, i}
          <i class:is-pick={pick === i} style="--c: {style.color}"><u></u>{style.name}</i>
        {/each}
      </span>
    </div>
  </li>
  <li class:is-done={done[2]}>
    <span class="mp__n">{#if done[2]}<Icon name="check" size={13} />{:else}3{/if}</span>
    <div>
      <b>La testata</b>
      <span class="mp__chips"><i class="is-logo"><u class="mp__logo"></u>Il logo di chi trasmette</i></span>
    </div>
  </li>
  <li class:is-done={done[3]}>
    <span class="mp__n">{#if done[3]}<Icon name="check" size={13} />{:else}4{/if}</span>
    <div>
      <b>{ready ? 'Montaggio pronto' : 'Montaggio in corso'}</b>
      <span class="mp__bar"><i style="transform: scaleX({ready ? 1 : bar})"></i></span>
    </div>
  </li>
</ol>

<style>
  .mp {
    display: grid;
    gap: 0.35rem;
    width: 100%;
    margin: 0;
    padding: 0.8rem;
    list-style: none;
    border-radius: 1.2rem;
    background: rgba(14, 14, 18, 0.78);
    border: 1px solid var(--bf-line);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 30px 60px -28px rgba(0, 0, 0, 0.8);
    color: var(--bf-text);
  }

  li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8rem;
    align-items: start;
    padding: 0.6rem 0.5rem;
    border-radius: 0.8rem;
    opacity: 0.6;
    transition: opacity 0.4s;
  }

  li.is-done {
    opacity: 1;
  }

  .mp__n {
    display: grid;
    place-items: center;
    width: 1.65rem;
    height: 1.65rem;
    border-radius: 50%;
    border: 1.5px solid var(--bf-line);
    font: 700 0.74rem/1 var(--bf-mono);
    color: var(--bf-text-2);
    transition:
      background 0.3s,
      border-color 0.3s,
      color 0.3s;
  }

  .is-done .mp__n {
    background: var(--bf-pink);
    border-color: var(--bf-pink);
    color: #fff;
  }

  b {
    display: block;
    font-size: 0.95rem;
  }

  .mp__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.45rem;
  }

  .mp__chips i {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.28rem 0.65rem;
    border-radius: 999px;
    font-style: normal;
    font-size: 0.76rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid transparent;
    transition:
      border-color 0.3s,
      background 0.3s;
  }

  .mp__chips i u {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: var(--c);
  }

  .mp__chips i.is-pick {
    border-color: var(--c);
    background: color-mix(in srgb, var(--c) 24%, transparent);
  }

  .mp__chips i u.mp__logo {
    border-radius: 0.2rem;
    background: transparent;
    border: 1.5px dashed var(--bf-text-2);
  }

  .mp__bar {
    display: block;
    height: 0.42rem;
    margin-top: 0.65rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.14);
    overflow: hidden;
  }

  .mp__bar i {
    display: block;
    height: 100%;
    background: var(--bf-pink);
    transform-origin: left;
  }
</style>
