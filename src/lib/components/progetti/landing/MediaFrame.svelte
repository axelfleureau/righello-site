<script lang="ts">
  import type { MediaRef } from '$lib/data/landing/types';
  import PhoneFrame from '../PhoneFrame.svelte';
  import { onMount } from 'svelte';
  import { playInView, prefersReducedMotion } from './actions';

  /** Un media della landing (immagine o video) dentro la cornice scelta. Una sola definizione per tutte le sezioni. */
  export let media: MediaRef;
  export let eager = false;

  let video: HTMLVideoElement | undefined;
  let paused = false;
  /** Con movimento ridotto il video non parte da solo: si mostrano i comandi del browser. */
  let controls = false;
  onMount(() => (controls = prefersReducedMotion()));

  /** Chi mette in pausa decide: il video non riparte da solo quando rientra in vista. */
  function toggle() {
    if (!video) return;
    paused = !video.paused;
    video.dataset.userPaused = paused ? '1' : '0';
    if (paused) video.pause();
    else video.play().catch(() => {});
  }

  $: frame = media.frame ?? 'none';
  /** I video hanno sempre un rapporto (16/9 se non detto). Un'immagine senza `ratio` resta delle sue proporzioni: mai ritagliata. */
  $: ratio = media.ratio ?? (frame === 'phone' ? '9/19.5' : media.type === 'video' ? '16/9' : undefined);
  $: [rw, rh] = (ratio ?? '16/10').split('/').map(Number);
  /** Dentro la cornice del telefono una schermata con rapporto diverso da quello dell'iPhone si adatta invece di tagliarsi. */
  $: phoneFit = media.type === 'image' && !!media.ratio && Math.abs(rw / rh - 9 / 19.5) > 0.03;
  $: width = 1000;
  $: height = Math.round((1000 * rh) / rw);
  /** Il telefono ha un rapporto proprio (la cornice) e il media lo riempie. */
</script>

<figure class="mf mf--{frame}">
  {#if frame === 'phone'}
    <div class="mf__phone">
      <PhoneFrame>
        {#if media.type === 'video'}
          <video class="shot" bind:this={video} src={media.src} poster={media.poster} muted loop playsinline {controls} preload={eager ? 'metadata' : 'none'} aria-label={media.alt} use:playInView></video>
        {:else}
          <img class="shot" class:shot--fit={phoneFit} src={media.src} alt={media.alt} {width} {height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        {/if}
      </PhoneFrame>
    </div>
  {:else}
    <div class="mf__frame">
      {#if frame === 'browser'}
        <div class="mf__bar" aria-hidden="true"><i></i><i></i><i></i></div>
      {/if}
      <div class="mf__screen" class:mf__screen--natural={!ratio} style:aspect-ratio={ratio ? ratio.replace('/', ' / ') : undefined}>
        {#if media.type === 'video'}
          <video bind:this={video} src={media.src} poster={media.poster} muted loop playsinline {controls} preload={eager ? 'metadata' : 'none'} aria-label={media.alt} {width} {height} use:playInView></video>
          {#if !controls}
            <button type="button" class="mf__pause" on:click={toggle} aria-label={paused ? 'Riprendi il video' : 'Metti in pausa il video'}>
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                {#if paused}<path d="M4.5 3v10l8-5z" fill="currentColor" />{:else}<path d="M4.5 3h2.4v10H4.5zM9.1 3h2.4v10H9.1z" fill="currentColor" />{/if}
              </svg>
            </button>
          {/if}
        {:else}
          <img src={media.src} alt={media.alt} {width} {height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        {/if}
      </div>
    </div>
  {/if}
  {#if media.caption}<figcaption>{media.caption}</figcaption>{/if}
</figure>

<style>
  .mf { margin: 0; width: 100%; }

  .mf__phone { width: min(15rem, 100%); margin-inline: auto; }
  .mf__phone :global(video.shot) { display: block; width: 100%; height: 100%; object-fit: cover; }

  .mf__frame {
    position: relative;
    overflow: hidden;
    border-radius: var(--lp-radius-sm);
    border: 1px solid var(--lp-line-strong);
    background: #000;
    box-shadow:
      0 50px 90px -40px color-mix(in srgb, var(--a) 55%, transparent),
      0 18px 40px rgba(0, 0, 0, 0.55);
  }

  .mf__screen { position: relative; background: #000; }
  .mf__screen :is(img, video) { display: block; width: 100%; height: 100%; object-fit: contain; }
  .mf__screen--natural img { height: auto; }
  .mf__phone :global(img.shot--fit) { object-fit: contain; object-position: center; }

  .mf__pause {
    position: absolute;
    right: 0.6rem;
    bottom: 0.6rem;
    display: grid;
    place-items: center;
    /* area di tocco da 44 px, segno piccolo */
    width: 2.75rem;
    height: 2.75rem;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: #fff;
    cursor: pointer;
    isolation: isolate;
    opacity: 0.72;
    transition: opacity 0.2s;
  }
  .mf__pause::before {
    content: '';
    position: absolute;
    inset: 0.55rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }
  .mf__pause:hover, .mf__pause:focus-visible { opacity: 1; }

  .mf__bar {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    height: 2rem;
    padding: 0 0.8rem;
    background: rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid var(--lp-line);
  }
  .mf__bar i { width: 0.6rem; height: 0.6rem; border-radius: 50%; background: rgba(255, 255, 255, 0.24); }

  /* monitor: cornice sottile e luce sotto lo schermo */
  .mf--monitor .mf__frame {
    padding: clamp(0.3rem, 0.9vw, 0.55rem);
    border-radius: 1.1rem;
    background: linear-gradient(160deg, #26262c, #0b0b0d);
  }
  .mf--monitor .mf__screen { border-radius: 0.7rem; overflow: hidden; }

  .mf--tablet .mf__frame {
    padding: clamp(0.4rem, 1.1vw, 0.7rem);
    border-radius: 1.5rem;
    background: linear-gradient(160deg, #2a2a30, #0e0e11);
  }
  .mf--tablet .mf__screen { border-radius: 0.9rem; overflow: hidden; }

  figcaption { margin-top: 0.8rem; font-size: 0.86rem; line-height: 1.45; color: var(--lp-ink-3); text-align: center; text-wrap: pretty; }
</style>
