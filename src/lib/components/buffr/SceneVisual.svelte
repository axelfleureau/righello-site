<script lang="ts">
  import { fly } from 'svelte/transition';
  import PhoneFrame from './PhoneFrame.svelte';
  import CameraScreen from './CameraScreen.svelte';
  import BufferRewind from './BufferRewind.svelte';
  import MomentList from './MomentList.svelte';
  import MontagePipeline from './MontagePipeline.svelte';
  import { moments } from './content';

  /** Scena mostrata: 0 buffer, 1 momenti, 2 montaggio. */
  export let index = 0;
  /** Avanzamento dentro la scena, 0..1. */
  export let local = 0;
  /** Disposizione verticale (telefono sopra, pannello sotto) per mobile e stack. */
  export let compact = false;
  export let instant = false;

  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const pad = (n: number) => String(n).padStart(2, '0');

  // ---- scena 0: il buffer che torna indietro
  $: rewinding = index === 0 && local >= 0.42 && local < 0.76;
  $: elapsed = Math.round(14 + local * 40);
  $: back = Math.round(clamp((local - 0.42) / 0.3) * 30);
  $: clock0 = rewinding ? `−00:${pad(back)}` : `00:${pad(elapsed % 60)}`;

  // ---- scena 1: un tocco per momento
  $: seg = Math.min(3, Math.floor(local * 4));
  $: s = local * 4 - seg;
  $: hit = index === 1 && s > 0.08 && s < 0.42 ? seg : -1;
  $: listOn = index === 1 && s > 0.08 ? seg : -1;
  $: who = index === 1 && seg === 0 && s > 0.32;
  $: toast =
    index === 1 && seg > 0 && s > 0.18 ? `${moments[seg].name} · ${moments[seg].seconds} s salvati` : '';
  $: score = index === 1 ? (seg > 0 || s > 0.32 ? '1 – 0' : '0 – 0') : '';

  // ---- scena 2: montaggio
  $: showMontage = clamp((local - 0.55) / 0.12);

  $: camera = index < 2;
</script>

<div class="vis" class:vis--compact={compact} class:vis--instant={instant}>
  <div class="vis__side">
    {#key index}
      <div class="vis__panel" in:fly={{ x: compact ? 0 : -24, y: compact ? 16 : 0, duration: instant ? 0 : 500 }}>
        {#if index === 0}
          <BufferRewind p={local} />
        {:else if index === 1}
          <MomentList active={listOn} />
        {:else}
          <MontagePipeline {local} />
        {/if}
      </div>
    {/key}
  </div>

  <div class="vis__phone">
    <PhoneFrame island={camera}>
      <div class="layer" class:is-on={camera}>
        <CameraScreen
          clock={index === 0 ? clock0 : '00:41'}
          fill={index === 0 ? (rewinding ? 1 - clamp((local - 0.42) / 0.3) : (elapsed % 30) / 30) : 0.62}
          {hit}
          {toast}
          {who}
          {score}
          {rewinding}
        />
      </div>
      <div class="layer" class:is-on={!camera}>
        <img class="shot" src="/products/buffr/libreria.webp" alt="" width="720" height="1560" loading="lazy" decoding="async" />
      </div>
      <div class="layer" style="opacity: {camera ? 0 : showMontage}">
        <img class="shot" src="/products/buffr/montaggio.webp" alt="" width="720" height="1560" loading="lazy" decoding="async" />
      </div>
    </PhoneFrame>
  </div>
</div>

<style>
  .vis {
    --phone-w: min(16rem, calc((100svh - 15.5rem) * 0.4615));
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(1.4rem, 3vw, 3rem);
    width: 100%;
  }

  .vis__side {
    flex: 0 1 22rem;
    min-width: 0;
  }

  .vis__phone {
    flex: none;
    width: var(--phone-w);
  }

  .layer {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .layer.is-on {
    opacity: 1;
  }

  .vis--instant .layer {
    transition: none;
  }

  /* telefono sopra, pannello sotto */
  .vis--compact {
    flex-direction: column-reverse;
    gap: 1.4rem;
    --phone-w: min(15rem, 62vw);
  }

  .vis--compact .vis__side {
    flex: none;
    width: min(100%, 24rem);
  }
</style>
