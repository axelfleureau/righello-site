<script lang="ts">
  import ProButton from '../progetti/ProButton.svelte';
  import SectionHead from '../progetti/landing/SectionHead.svelte';
  import { reveal } from '../progetti/landing/actions';
  import type { PageModel } from './types';

  export let c: PageModel['closing'];
  export let tone = 0;
</script>

<section id="chiusura" class="sc lp-section" class:lp-tone-alt={tone % 2 === 1}>
  <div class="section-container">
    <div class="sc__card lp-reveal" use:reveal>
      <div class="sc__glow" aria-hidden="true"></div>
      <div class="lp-rings sc__rings" aria-hidden="true"></div>
      <SectionHead align="center" kicker={c.kicker} title={c.title} highlight={c.highlight} lead={c.text} />
      <ProButton variant="solid" arrow="right" size="lg" href={c.button.href}>{c.button.label}</ProButton>
      <p class="sc__mail">Oppure scrivici a <a href="mailto:hello@wearerighello.com">hello@wearerighello.com</a></p>
    </div>
  </div>
</section>

<style>
  .sc { overflow-x: clip; }

  .sc__card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1.4rem, 3vw, 2rem);
    padding: clamp(2.6rem, 7vw, 5rem) clamp(1.2rem, 4vw, 3rem);
    border: 1px solid var(--lp-line-strong);
    border-radius: clamp(1.4rem, 3vw, 2.2rem);
    background: #08080a;
    text-align: center;
  }

  .sc__glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(60% 80% at 15% 0%, color-mix(in srgb, var(--a) 42%, transparent), transparent 70%),
      radial-gradient(60% 80% at 90% 100%, color-mix(in srgb, var(--b) 48%, transparent), transparent 70%);
  }

  .sc__rings { width: min(52rem, 140%); left: 50%; top: 50%; transform: translate(-50%, -50%); }

  .sc__mail { margin: 0; font-size: 0.92rem; color: var(--lp-ink-3); }
  .sc__mail a { display: inline-flex; align-items: center; min-height: 2.75rem; color: var(--lp-ink-2); text-underline-offset: 3px; }
</style>
