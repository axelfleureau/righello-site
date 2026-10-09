<script lang="ts">
  import { fly } from 'svelte/transition';
  import PhoneFrame from './PhoneFrame.svelte';
  import BufferRewind from './BufferRewind.svelte';
  import MomentList from './MomentList.svelte';
  import MontagePipeline from './MontagePipeline.svelte';
  import ExampleTag from '$lib/components/progetti/infographics/ExampleTag.svelte';

  /** Scena mostrata: 0 buffer, 1 momenti, 2 montaggio. */
  export let index = 0;
  /** Avanzamento dentro la scena, 0..1. */
  export let local = 0;
  /** Disposizione verticale (telefono sopra, pannello sotto) per mobile e stack. */
  export let compact = false;
  export let instant = false;

  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  // scena 1: quale dei quattro momenti si sta mostrando nello schema
  $: seg = Math.min(3, Math.floor(local * 4));
  $: s = local * 4 - seg;
  $: listOn = index === 1 && s > 0.08 ? seg : -1;

  // scena 2: lo schema del montaggio parte quando la libreria è già in vista
  $: showMontage = clamp((local - 0.55) / 0.12);

  // Il telefono mostra sempre schermate vere dell'app: l'accoglienza, la camera, la libreria e l'esportazione.
  const screens = [
    { src: '/progetti/landing/buffr/benvenuto.webp', alt: 'BUFFR, la prima schermata: «Tocchi dopo. La clip parte da prima.»' },
    { src: '/products/buffr/campo-v2.webp', alt: 'La camera di BUFFR con i quattro pulsanti dei momenti: gol, azione, fischio e inizio' },
    { src: '/products/buffr/libreria-v2.webp', alt: 'La libreria di BUFFR con le clip divise per giorno' },
  ];
</script>

<div class="vis" class:vis--compact={compact} class:vis--instant={instant}>
  <div class="vis__side">
    <span class="vis__tag" style="--ink:#fff"><ExampleTag /></span>
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
    <PhoneFrame island={false}>
      {#each screens as screen, i}
        <div class="layer" class:is-on={index === i}>
          <img class="shot" src={screen.src} alt={screen.alt} width="720" height="1560" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
        </div>
      {/each}
      <div class="layer" style="opacity: {index === 2 ? showMontage : 0}">
        <img class="shot" src="/products/buffr/montaggio-v2.webp" alt="Il foglio di esportazione di BUFFR: formato, colore delle grafiche e pulsante Monta" width="720" height="1560" loading="lazy" decoding="async" />
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

  /* lo schema accanto è un disegno che spiega, non una schermata: lo dice */
  .vis__tag {
    display: inline-block;
    margin-bottom: 0.7rem;
  }

  .vis__phone {
    position: relative;
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
