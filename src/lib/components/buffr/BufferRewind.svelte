<script lang="ts">
  import Icon from './Icon.svelte';

  /** Avanzamento della scena, 0..1. */
  export let p = 0;
  export let seconds = 30;

  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const TICKS = 96;

  $: scroll = clamp(p / 0.3); // 1) il buffer scorre
  $: tap = clamp((p - 0.3) / 0.1); // 2) tocco: si evidenziano gli ultimi secondi
  $: rew = clamp((p - 0.42) / 0.3); // 3) la testina torna indietro
  $: lift = clamp((p - 0.76) / 0.2); // 4) i secondi diventano clip

  $: phase = p < 0.3 ? 0 : p < 0.42 ? 1 : p < 0.76 ? 2 : 3;
  $: label = ['Registra in continuo', 'Tocco: gol!', `Torno indietro di ${seconds} s`, 'Clip salvata'][phase];
  $: back = Math.round(rew * seconds);
</script>

<div class="br" style="--n: {seconds}" aria-hidden="true">
  <header class="br__head">
    <span class="br__label" class:is-on={phase > 0}>
      <i class="br__dot"></i>
      {label}
    </span>
    {#if phase === 2}<span class="br__back">−{String(back).padStart(2, '0')} s</span>{/if}
  </header>

  <div class="br__track">
    <div class="br__ticks" style="transform: translateX({-scroll * 4.8}rem)">
      {#each Array(TICKS) as _, i}
        <i class:is-long={i % 5 === 0}></i>
      {/each}
    </div>

    <div class="br__window" style="opacity: {tap * (1 - lift * 0.85)}; transform: scaleX({tap}) translateY({lift * 4.4}rem)">
      <span>ultimi {seconds} s</span>
    </div>

    <div class="br__head-line" style="opacity: {rew > 0 && lift < 1 ? 1 : 0}; left: calc(100% - 0.8rem - var(--w) * {rew})"></div>
    <div class="br__now" class:is-flash={phase === 1}>
      <span>adesso</span>
    </div>
  </div>

  <div class="br__clip" style="opacity: {lift}; transform: translateY({(1 - lift) * -0.8}rem)">
    <img src="/products/buffr/campo.webp" alt="" width="720" height="1560" loading="lazy" decoding="async" />
    <span class="br__clip-text">
      <b>GOL · {seconds} s</b>
      <small><Icon name="check" size={11} /> Salvata nella libreria</small>
    </span>
  </div>
</div>

<style>
  .br {
    --u: 0.4rem;
    --w: calc(var(--n) * (var(--u) + 2px));
    width: 100%;
    padding: 1.1rem 1.15rem 1.2rem;
    border-radius: 1.2rem;
    background: rgba(14, 14, 18, 0.94);
    border: 1px solid var(--bf-line);
    box-shadow: 0 30px 60px -28px rgba(0, 0, 0, 0.8);
    color: var(--bf-text);
  }

  .br__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 1.6rem;
    font: 600 0.72rem/1 var(--bf-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .br__label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--bf-text-2);
  }

  .br__label.is-on {
    color: var(--bf-pink-text);
  }

  .br__dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--bf-pink);
  }

  .br__back {
    color: #fff;
    font-variant-numeric: tabular-nums;
  }

  .br__track {
    position: relative;
    height: 4.6rem;
    margin-top: 0.8rem;
    overflow: hidden;
    border-radius: 0.6rem;
    background: rgba(255, 255, 255, 0.04);
    mask-image: linear-gradient(90deg, transparent, #000 12%);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%);
  }

  .br__ticks {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -4.8rem;
    display: flex;
    align-items: center;
    gap: var(--u);
    padding-right: 0.8rem;
    will-change: transform;
  }

  .br__ticks i {
    flex: none;
    width: 2px;
    height: 1.3rem;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.26);
  }

  .br__ticks i.is-long {
    height: 2.2rem;
    background: rgba(255, 255, 255, 0.5);
  }

  /* gli ultimi N secondi: stessa unità dei segni (0,4 rem + 2 px) */
  .br__window {
    position: absolute;
    top: 0.5rem;
    bottom: 0.5rem;
    right: 0.8rem;
    width: var(--w);
    transform-origin: right;
    border-radius: 0.5rem;
    background: color-mix(in srgb, var(--bf-pink) 38%, transparent);
    border: 1.5px solid var(--bf-pink);
    display: grid;
    place-items: end start;
    padding: 0 0.5rem 0.3rem;
  }

  .br__window span {
    font: 600 0.62rem/1 var(--bf-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
  }

  .br__head-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #fff;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
  }

  .br__now {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 0.4rem;
    background: linear-gradient(90deg, transparent, rgba(214, 72, 126, 0.55));
  }

  .br__now span {
    position: absolute;
    right: 0.5rem;
    top: 0.25rem;
    font: 600 0.58rem/1 var(--bf-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--bf-pink-text);
  }

  .br__now.is-flash {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85));
  }

  .br__clip {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-top: 0.9rem;
    padding: 0.55rem 0.7rem 0.55rem 0.55rem;
    border-radius: 0.8rem;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid var(--bf-line);
    border-top: 3px solid var(--bf-goal);
  }

  .br__clip img {
    width: 2.6rem;
    height: 3.4rem;
    object-fit: cover;
    object-position: 50% 45%;
    border-radius: 0.4rem;
  }

  .br__clip-text {
    display: grid;
    gap: 0.3rem;
  }

  .br__clip-text b {
    font-size: 0.95rem;
    letter-spacing: 0.04em;
  }

  .br__clip-text small {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.74rem;
    color: #8fe0b0;
  }
</style>
