<script lang="ts">
  import Icon from './Icon.svelte';
  import { moments } from './content';

  /** Tempo mostrato nella pillola (testo già pronto, es. "00:12" o "−00:30"). */
  export let clock = '00:00';
  /** Riempimento della barra sotto la pillola, 0..1. */
  export let fill = 0;
  /** Pulsante appena premuto: indice in `moments`, oppure -1. */
  export let hit = -1;
  /** Avviso che compare sopra i pulsanti (es. "Azione · 40 s salvati"). */
  export let toast = '';
  /** Mostra il pannello "Gol salvato · di chi?". */
  export let who = false;
  /** Punteggio nella pillola, es. "1 – 0". */
  export let score = '';
  /** Stato della pillola. */
  export let rewinding = false;
</script>

<div class="cam" class:cam--rewind={rewinding}>
  <img class="cam__bg" src="/products/buffr/campo.webp" alt="" width="720" height="1560" decoding="async" />
  <div class="cam__shade" aria-hidden="true"></div>

  <div class="cam__top">
    <div class="pill" class:pill--rewind={rewinding}>
      <span class="pill__row">
        <i class="pill__dot" aria-hidden="true"></i>
        <b>{rewinding ? 'Torno indietro' : 'Buffer attivo'}</b>
        <span class="pill__clock">{clock}</span>
        {#if score}<span class="pill__score">{score}</span>{/if}
      </span>
      <span class="pill__bar" aria-hidden="true"><i style="transform: scaleX({fill})"></i></span>
    </div>
    <span class="cam__icons" aria-hidden="true">
      <Icon name="users" size={18} />
      <Icon name="settings" size={18} />
      <Icon name="flip" size={18} />
    </span>
  </div>

  {#if who}
    <div class="who" role="presentation">
      <b>Gol salvato</b>
      <span>Di chi è?</span>
      <span class="who__row"><i>Casa</i><i>Ospiti</i></span>
    </div>
  {/if}

  {#if toast}
    <div class="toast">
      <Icon name="check" size={14} />
      {toast}
    </div>
  {/if}

  <div class="cam__bottom">
    <div class="zoom"><i class="is-on">0,5×</i><i>1×</i><i>2×</i></div>
    <div class="dock">
      <span class="lib" aria-hidden="true"><Icon name="film" size={16} /></span>
      {#each moments as moment, i}
        <span
          class="btn btn--{moment.id}"
          class:is-hit={hit === i}
          style="--c: {moment.color}"
        >
          <small>{moment.label}</small>
          <b>{moment.seconds}s</b>
        </span>
      {/each}
    </div>
    <i class="home" aria-hidden="true"></i>
  </div>
</div>

<style>
  .cam {
    position: absolute;
    inset: 0;
    color: #fff;
    font-family: 'Degular Display', system-ui, sans-serif;
    line-height: 1.2;
  }

  .cam__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cam__shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(0, 0, 0, 0.45), transparent 22%),
      linear-gradient(0deg, rgba(0, 0, 0, 0.55), transparent 34%);
  }

  .cam__top {
    position: absolute;
    top: 13.5cqw;
    left: 5cqw;
    right: 5cqw;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .cam__icons {
    display: flex;
    gap: 3.4cqw;
    margin-top: 1.6cqw;
    color: #fff;
  }

  .cam__icons :global(svg) {
    width: 5.4cqw;
    height: 5.4cqw;
  }

  /* pillola di stato */
  .pill {
    display: grid;
    gap: 1.5cqw;
    padding: 2cqw 3.2cqw 2.2cqw;
    border-radius: 4cqw;
    border: 0.4cqw solid var(--bf-pink);
    background: rgba(8, 8, 10, 0.4);
    backdrop-filter: blur(3cqw);
    -webkit-backdrop-filter: blur(3cqw);
    min-width: 40cqw;
    transition: border-color 0.3s;
  }

  .pill__row {
    display: flex;
    align-items: center;
    gap: 2cqw;
    font-size: 3.2cqw;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .pill__row b {
    font-weight: 700;
  }

  .pill__dot {
    width: 2.4cqw;
    height: 2.4cqw;
    border-radius: 50%;
    background: var(--bf-pink);
    animation: dot 1.4s ease-in-out infinite;
  }

  .pill--rewind .pill__dot {
    background: #fff;
  }

  .pill__clock {
    font-variant-numeric: tabular-nums;
    color: rgba(255, 255, 255, 0.82);
  }

  .pill__score {
    padding: 0.3cqw 1.8cqw;
    border-radius: 2cqw;
    background: #fff;
    color: #0b0b0b;
    font-weight: 800;
  }

  .pill__bar {
    display: block;
    height: 0.7cqw;
    border-radius: 1cqw;
    background: rgba(255, 255, 255, 0.22);
    overflow: hidden;
  }

  .pill__bar i {
    display: block;
    height: 100%;
    background: var(--bf-pink);
    transform-origin: left;
  }

  .pill--rewind .pill__bar i {
    background: #fff;
  }

  /* pannello "di chi è il gol" e avviso */
  .who {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
    display: grid;
    gap: 1.2cqw;
    justify-items: center;
    padding: 4cqw 5cqw 4.4cqw;
    border-radius: 5cqw;
    background: rgba(10, 10, 12, 0.72);
    backdrop-filter: blur(4cqw);
    -webkit-backdrop-filter: blur(4cqw);
    border: 0.3cqw solid rgba(255, 255, 255, 0.2);
    text-align: center;
    animation: pop 0.35s var(--bf-ease);
  }

  .who b {
    font-size: 4.2cqw;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--bf-goal);
  }

  .who > span {
    font-size: 3.4cqw;
    color: rgba(255, 255, 255, 0.82);
  }

  .who__row {
    display: flex;
    gap: 2.4cqw;
    margin-top: 1.2cqw;
  }

  .who__row i {
    font-style: normal;
    font-size: 3.4cqw;
    padding: 2cqw 5cqw;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    border: 0.3cqw solid rgba(255, 255, 255, 0.3);
  }

  .toast {
    position: absolute;
    left: 50%;
    bottom: 49cqw;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 1.6cqw;
    padding: 2cqw 3.6cqw;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.94);
    color: #0b0b0b;
    font-size: 3.2cqw;
    font-weight: 700;
    letter-spacing: 0.02em;
    white-space: nowrap;
    animation: pop 0.35s var(--bf-ease);
  }

  .toast :global(svg) {
    width: 3.6cqw;
    height: 3.6cqw;
    color: #1f8a4c;
  }

  /* zona bassa */
  .cam__bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 3cqw;
  }

  .zoom {
    display: flex;
    justify-content: center;
    gap: 3cqw;
    margin-bottom: 4cqw;
    font-size: 3.2cqw;
    font-style: normal;
  }

  .zoom i {
    flex: none;
    font-style: normal;
    white-space: nowrap;
    padding: 1.2cqw 3cqw;
    border-radius: 999px;
  }

  .zoom .is-on {
    background: var(--bf-pink);
    color: #fff;
  }

  .dock {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.2cqw;
    padding: 0 3cqw;
  }

  .lib {
    display: grid;
    place-items: center;
    width: 11cqw;
    height: 11cqw;
    border-radius: 2.6cqw;
    background: rgba(30, 30, 34, 0.9);
    border-bottom: 0.7cqw solid #d9484f;
    color: #fff;
    flex: none;
  }

  .lib :global(svg) {
    width: 5cqw;
    height: 5cqw;
  }

  .btn {
    display: grid;
    place-content: center;
    justify-items: center;
    width: 15.6cqw;
    height: 15.6cqw;
    border-radius: 50%;
    background: var(--c);
    color: #0b0b0b;
    text-align: center;
    line-height: 1;
    flex: none;
    transition:
      transform 0.25s var(--bf-ease),
      box-shadow 0.25s;
  }

  .btn--action {
    width: 19cqw;
    height: 19cqw;
  }

  .btn--whistle,
  .btn--start {
    color: #fff;
    width: 14.4cqw;
    height: 14.4cqw;
  }

  .btn small {
    font-size: 2.3cqw;
    letter-spacing: 0.06em;
    opacity: 0.85;
  }

  .btn b {
    margin-top: 0.8cqw;
    font-size: 4.2cqw;
    font-weight: 700;
  }

  .btn.is-hit {
    transform: scale(1.14);
    box-shadow:
      0 0 0 1cqw rgba(255, 255, 255, 0.28),
      0 0 7cqw var(--c);
  }

  .home {
    display: block;
    width: 34cqw;
    height: 1.1cqw;
    margin: 4.4cqw auto 0;
    border-radius: 1cqw;
    background: rgba(255, 255, 255, 0.7);
  }

  @keyframes dot {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.35;
    }
  }

  @keyframes pop {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.92);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pill__dot,
    .who,
    .toast {
      animation: none;
    }
  }
</style>
