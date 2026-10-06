<script lang="ts">
  import { live } from './live';
  import type { LiveState } from './live';

  /** Nome del gruppo per chi usa uno screen reader. */
  export let label: string;
  /** Vero quando il palco non è quello in primo piano (vetrina a scene). */
  export let idle = false;
  /** In uscita: vero solo quando le animazioni devono girare (in vista e in primo piano). */
  export let running = false;
  /** In uscita: chi guarda ha chiesto meno movimento. */
  export let reduced = false;

  let visible = false;

  $: running = visible && !idle;

  function onLive(state: LiveState) {
    visible = state.visible;
    reduced = state.reduced;
  }
</script>

<!-- Isola scura comune a tutte le infografiche: fuori vista o con meno movimento richiesto le animazioni si fermano. -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="frame" class:is-running={running} role="group" aria-label={label} use:live={onLive} on:keydown>
  <slot />
</div>

<style>
  .frame {
    --line: rgba(255, 255, 255, 0.14);
    --ink: #fff;
    --ink2: rgba(255, 255, 255, 0.74);
    container: info / inline-size;
    position: relative;
    width: 100%;
    overflow: hidden;
    isolation: isolate;
    border-radius: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--ink);
    background-color: #06060a;
    background-image:
      radial-gradient(60% 55% at 50% 45%, color-mix(in srgb, var(--a) 24%, transparent), transparent 72%),
      radial-gradient(rgba(255, 255, 255, 0.075) 1px, transparent 1.4px);
    background-size: auto, 20px 20px;
    box-shadow: 0 50px 90px -40px color-mix(in srgb, var(--a) 55%, transparent), 0 20px 50px rgba(0, 0, 0, 0.55);
  }

  .frame :global(*) {
    box-sizing: border-box;
  }

  .frame:not(.is-running) :global(*) {
    animation-play-state: paused !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .frame :global(*) {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
