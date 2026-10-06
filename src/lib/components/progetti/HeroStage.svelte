<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import type { CaseStudy } from '$lib/data/case-studies';
  import ProductDevice from './ProductDevice.svelte';
  import PhoneFrame from './PhoneFrame.svelte';
  import StatusBadge from './StatusBadge.svelte';

  /** Il computer, l'iPad, il telefono e le icone che gli girano attorno. */
  export let laptop: CaseStudy;
  export let tablet: CaseStudy;
  export let phone: CaseStudy;

  const dispatch = createEventDispatcher<{ pick: CaseStudy }>();

  let el: HTMLElement;
  let raf = 0;
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;

  // Parallasse leggera: solo transform, solo con il mouse.
  function step() {
    raf = 0;
    cx += (tx - cx) * 0.1;
    cy += (ty - cy) * 0.1;
    el?.style.setProperty('--mx', cx.toFixed(3));
    el?.style.setProperty('--my', cy.toFixed(3));
    if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) raf = requestAnimationFrame(step);
  }

  function onMove(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || !el) return;
    const r = el.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width - 0.5;
    ty = (e.clientY - r.top) / r.height - 0.5;
    if (!raf) raf = requestAnimationFrame(step);
  }

  function onLeave() {
    tx = 0;
    ty = 0;
    if (!raf) raf = requestAnimationFrame(step);
  }

  onDestroy(() => {
    if (raf) cancelAnimationFrame(raf);
  });
</script>

<div class="hs" bind:this={el} on:pointermove={onMove} on:pointerleave={onLeave}>
  <div class="hs__glow" aria-hidden="true"></div>
  <i class="hs__ring hs__ring--a" aria-hidden="true"></i>
  <i class="hs__ring hs__ring--b" aria-hidden="true"></i>

  <button type="button" class="hs__hit hs__laptop" aria-label={`Apri ${laptop.name}`} on:click={() => dispatch('pick', laptop)}>
    <ProductDevice study={laptop} eager showIcon={false} />
  </button>

  <button type="button" class="hs__hit hs__tablet" aria-label={`Apri ${tablet.name}`} on:click={() => dispatch('pick', tablet)}>
    <ProductDevice study={tablet} eager showIcon={false} companion={false} />
  </button>

  <button type="button" class="hs__hit hs__phone" aria-label={`Apri ${phone.name}`} on:click={() => dispatch('pick', phone)}>
    <PhoneFrame>
      <img class="shot" src={phone.stage?.src} alt="" width="720" height="1560" loading="eager" decoding="async" />
    </PhoneFrame>
  </button>

  <div class="hs__chip" aria-hidden="true"><StatusBadge status={phone.status} compact /></div>

</div>

<style>
  .hs {
    container-type: inline-size;
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 0.92;
    --mx: 0;
    --my: 0;
  }

  .hs__glow {
    position: absolute;
    inset: 8% 4%;
    background:
      radial-gradient(closest-side at 30% 60%, var(--glow-pink), transparent 72%),
      radial-gradient(closest-side at 75% 30%, var(--glow-cyan), transparent 72%);
    opacity: 0.8;
    pointer-events: none;
  }

  .hs__hit {
    position: absolute;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    cursor: pointer;
    text-align: left;
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .hs__hit:focus-visible { outline: 2px solid #fff; outline-offset: 6px; border-radius: 1rem; }

  /* tre piani di profondità: più è vicino, più si sposta */
  .hs__laptop {
    z-index: 1;
    right: 0;
    top: 0;
    width: 80%;
    transform: translate3d(calc(var(--mx) * -10px), calc(var(--my) * -8px), 0);
  }

  .hs__tablet {
    z-index: 2;
    left: 0;
    bottom: 6%;
    width: 60%;
    transform: translate3d(calc(var(--mx) * 16px), calc(var(--my) * 12px), 0);
  }

  .hs__phone {
    z-index: 3;
    right: 7%;
    bottom: 0;
    width: 23%;
    transform: translate3d(calc(var(--mx) * 28px), calc(var(--my) * 20px), 0) rotate(4deg);
  }

  .hs__laptop:hover { transform: translate3d(calc(var(--mx) * -10px), calc(var(--my) * -8px - 6px), 0); }
  .hs__tablet:hover { transform: translate3d(calc(var(--mx) * 16px), calc(var(--my) * 12px - 6px), 0); }
  .hs__phone:hover { transform: translate3d(calc(var(--mx) * 28px), calc(var(--my) * 20px - 8px), 0) rotate(4deg); }

  /* lo stato di BUFFR sotto il telefono, con un filo che lo lega */
  .hs__chip {
    position: absolute;
    z-index: 4;
    right: 0;
    top: calc(100% + 0.9rem);
  }

  .hs__chip::before {
    content: '';
    position: absolute;
    right: 3.2rem;
    bottom: 100%;
    width: 1px;
    height: 0.9rem;
    background: linear-gradient(transparent, rgba(255, 255, 255, 0.5));
  }

  /* due cerchi concentrici: la geometria che tiene insieme i tre dispositivi */
  .hs__ring {
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    pointer-events: none;
    border: 1px solid color-mix(in srgb, var(--text-primary) 11%, transparent);
  }

  .hs__ring--a { width: 96%; aspect-ratio: 1; translate: -50% -50%; }

  .hs__ring--b {
    width: 62%;
    aspect-ratio: 1;
    translate: -50% -50%;
    border-style: dashed;
    animation: hs-turn 90s linear infinite;
  }

  @keyframes hs-turn { to { rotate: 360deg; } }

  @media (prefers-reduced-motion: reduce) {
    .hs__ring--b { animation: none; }
    .hs__hit { transition: none; }
  }
</style>
