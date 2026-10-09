<script lang="ts">
  import PhoneFrame from './PhoneFrame.svelte';

  let root: HTMLElement;
</script>

<div
  class="stage"
  bind:this={root}
  role="img"
  aria-label="Tre schermate di BUFFR: la libreria delle clip, la camera con il buffer attivo e un montaggio pronto"
>
  <span class="stage__floor" aria-hidden="true"></span>

  <div class="ph ph--l">
    <PhoneFrame island={false}>
      <img class="shot" src="/products/buffr/libreria-v2.webp" alt="" width="720" height="1560" decoding="async" />
    </PhoneFrame>
  </div>

  <div class="ph ph--c">
    <PhoneFrame island={false}>
      <img class="shot" src="/products/buffr/campo-v2.webp" alt="" width="720" height="1560" decoding="async" />
    </PhoneFrame>
  </div>

  <div class="ph ph--r">
    <PhoneFrame island={false}>
      <img class="shot" src="/products/buffr/montaggio-v2.webp" alt="" width="720" height="1560" decoding="async" />
    </PhoneFrame>
  </div>
</div>

<style>
  .stage {
    --cw: 44%;
    --sw: 31%;
    position: relative;
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    aspect-ratio: 100 / 99;
  }

  .ph {
    position: absolute;
    width: var(--sw);
    top: 12%;
    animation: rise 1.1s var(--bf-ease) both;
  }

  .ph--c {
    width: var(--cw);
    left: calc(50% - var(--cw) / 2);
    top: 0;
    z-index: 3;
    animation-delay: 0.05s;
  }

  .ph--l {
    left: calc(50% - var(--cw) / 2 - var(--sw) * 0.86);
    --tilt: -5deg;
    z-index: 2;
    animation-delay: 0.2s;
  }

  .ph--r {
    left: calc(50% + var(--cw) / 2 - var(--sw) * 0.14);
    --tilt: 5deg;
    z-index: 2;
    animation-delay: 0.3s;
  }

  .ph--l,
  .ph--r {
    transform: rotate(var(--tilt));
  }

  /* i due telefoni laterali un filo più scuri, senza filtri: un velo sopra lo schermo */
  .ph--l::after,
  .ph--r::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 15.5% / 7.2%;
    background: rgba(0, 0, 0, 0.12);
    pointer-events: none;
  }

  .stage__floor {
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: -3%;
    height: 8%;
    background: radial-gradient(closest-side, rgba(214, 72, 126, 0.32), transparent 72%);
  }

  @media (min-width: 720px) {
    .stage {
      --cw: 28%;
      --sw: 21%;
      aspect-ratio: 100 / 64;
    }

    .ph--l,
    .ph--r {
      top: 8%;
    }
  }

  @keyframes rise {
    from {
      opacity: 0;
      translate: 0 3.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ph {
      animation: none;
    }
  }
</style>
