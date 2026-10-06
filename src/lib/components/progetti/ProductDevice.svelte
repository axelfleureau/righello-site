<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { CaseStudy } from '$lib/data/case-studies';
  import PhoneFrame from './PhoneFrame.svelte';

  export let study: CaseStudy;
  export let eager = false;
  export let showIcon = true;

  let el: HTMLElement;
  let raf = 0;
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;

  $: stage = study.stage;
  $: host = (() => {
    if (study.href && study.href.startsWith('http')) {
      try {
        return new URL(study.href).host.replace(/^www\./, '');
      } catch {
        /* fall through */
      }
    }
    return `wearerighello.com/progetti/${study.id}`;
  })();
  $: trio = stage?.screens && stage.screens.length >= 4
    ? [stage.screens[1], stage.screens[0], stage.screens[3]]
    : stage ? [stage.src] : [];

  function step() {
    raf = 0;
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    if (el) {
      el.style.setProperty('--rx', `${(-cy * 7).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(cx * 9).toFixed(2)}deg`);
    }
    if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) {
      raf = requestAnimationFrame(step);
    }
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

{#if stage}
  <div
    class="dev dev--{stage.type}"
    style="--a:{study.accent[0]}; --b:{study.accent[1]}"
    bind:this={el}
    on:pointermove={onMove}
    on:pointerleave={onLeave}
    role="img"
    aria-label={stage.alt}
  >
    <div class="dev__glow" aria-hidden="true"></div>

    {#if stage.type === 'browser'}
      <div class="dev__frame">
        <div class="dev__bar" aria-hidden="true">
          <i></i><i></i><i></i>
          <span>{host}</span>
        </div>
        <img
          class="dev__shot"
          src={stage.src}
          alt=""
          width="1600"
          height="1000"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    {:else if stage.type === 'tablet'}
      <div class="tab">
        <img class="tab__shot" src={stage.src} alt="" width="1000" height="698" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </div>
      {#if stage.screens?.[0]}
        <div class="ph ph--pal" aria-hidden="true">
          <PhoneFrame><img class="shot" src={stage.screens[0]} alt="" width="800" height="1734" loading="lazy" decoding="async" /></PhoneFrame>
        </div>
      {/if}
    {:else}
      {#each trio as src, i}
        <div class="ph ph--{i}" aria-hidden="true">
          <PhoneFrame><img class="shot" src={src} alt="" width="720" height="1560" loading={eager ? 'eager' : 'lazy'} decoding="async" /></PhoneFrame>
        </div>
      {/each}
    {/if}

    {#if showIcon && study.icon}
      <img class="dev__icon" src={study.icon} alt="" width="88" height="88" loading="lazy" decoding="async" />
    {/if}
  </div>
{/if}

<style>
  .dev {
    position: relative;
    width: 100%;
    perspective: 1500px;
  }

  .dev__glow {
    position: absolute;
    inset: -14% -10%;
    background:
      radial-gradient(closest-side at 35% 40%, color-mix(in srgb, var(--a) 55%, transparent), transparent 70%),
      radial-gradient(closest-side at 70% 65%, color-mix(in srgb, var(--b) 60%, transparent), transparent 72%);
    filter: blur(28px);
    opacity: 0.85;
    pointer-events: none;
  }

  /* browser */
  .dev__frame {
    position: relative;
    border-radius: 1.05rem;
    overflow: hidden;
    background: #0b0b0e;
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow:
      0 70px 120px -40px color-mix(in srgb, var(--a) 60%, transparent),
      0 24px 60px rgba(0, 0, 0, 0.6);
    transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    transform-style: preserve-3d;
    will-change: transform;
  }

  .dev__bar {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    height: 2.1rem;
    padding: 0 0.85rem;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .dev__bar i {
    width: 0.62rem;
    height: 0.62rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
  }

  .dev__bar span {
    margin-left: 0.8rem;
    padding: 0.18rem 0.9rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.6);
    font: 500 0.66rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
    max-width: 62%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dev__shot {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
  }

  /* tablet: iPad con la sala, e a lato il palmare del cameriere */
  .tab {
    position: relative;
    padding: clamp(0.35rem, 1.1vw, 0.7rem);
    border-radius: clamp(1rem, 2.4vw, 1.7rem);
    background: linear-gradient(160deg, #2a2a30, #0e0e11);
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow:
      0 70px 120px -40px color-mix(in srgb, var(--a) 60%, transparent),
      0 24px 60px rgba(0, 0, 0, 0.6);
    transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    will-change: transform;
  }

  .tab__shot {
    display: block;
    width: 100%;
    height: auto;
    border-radius: clamp(0.6rem, 1.6vw, 1.1rem);
  }

  .dev .ph--pal {
    left: auto;
    right: -3%;
    top: auto;
    bottom: -10%;
    width: 30%;
    z-index: 4;
    transform: rotate(3deg);
  }

  .dev__icon {
    position: absolute;
    left: -1.3rem;
    bottom: -1.5rem;
    width: clamp(3.6rem, 7vw, 5.6rem);
    height: auto;
    aspect-ratio: 1;
    border-radius: 22.37%;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.18), 0 22px 40px rgba(0, 0, 0, 0.55);
    transform: rotate(-7deg);
    animation: dev-float 6s ease-in-out infinite;
  }

  @keyframes dev-float {
    0%, 100% { transform: translateY(0) rotate(-7deg); }
    50% { transform: translateY(-9px) rotate(-5deg); }
  }

  /* phones */
  .dev--phones {
    aspect-ratio: 10 / 9;
    max-width: 36rem;
    margin-inline: auto;
  }

  .ph {
    position: absolute;
    left: 50%;
    top: 4%;
    width: 38%;
    filter: drop-shadow(0 0 40px color-mix(in srgb, var(--a) 38%, transparent));
  }

  /* i laterali si aprono quanto basta perché di ognuno si legga la schermata */
  .ph--0 { transform: translateX(-130%) translateY(4%) rotate(-7deg) scale(0.84); z-index: 1; filter: brightness(0.85); }
  .ph--1 { transform: translateX(-50%); z-index: 3; }
  .ph--2 { transform: translateX(30%) translateY(4%) rotate(7deg) scale(0.84); z-index: 2; filter: brightness(0.85); }

  .dev--phones .dev__icon {
    left: 6%;
    bottom: 2%;
    z-index: 4;
  }

  @media (prefers-reduced-motion: reduce) {
    .dev__icon { animation: none; }
    .dev__frame { transform: none; }
  }
</style>
