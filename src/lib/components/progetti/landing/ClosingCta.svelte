<script lang="ts">
  import type { CaseStudy } from '$lib/data/case-studies';
  import type { Landing } from '$lib/data/landing/types';
  import ProButton from '../ProButton.svelte';
  import ProjectIcon from '../ProjectIcon.svelte';
  import SectionHead from './SectionHead.svelte';
  import { reveal } from './actions';

  export let study: CaseStudy;
  export let cta: Landing['cta'] = undefined;
  export let primary: { href: string; label: string } | null;

  $: action = cta?.primary ? { href: cta.primary.href, label: cta.primary.label, external: cta.primary.external ?? cta.primary.href.startsWith('http') } : primary ? { ...primary, external: true } : null;
  $: title = cta?.title ?? `Parliamo di ${study.name}`;
  $: text = cta?.text ?? 'Raccontaci che cosa ti serve: ti rispondiamo noi, senza giri.';
</script>

<section class="cc lp-section">
  <div class="section-container">
    <div class="cc__card lp-reveal" use:reveal>
      <div class="cc__glow" aria-hidden="true"></div>
      <div class="lp-rings cc__rings" aria-hidden="true"></div>
      <div class="cc__icon"><ProjectIcon {study} size={72} /></div>
      <SectionHead align="center" kicker={study.name} {title} highlight={cta?.highlight} lead={text} />
      <div class="cc__cta">
        {#if action}
          <ProButton variant="solid" arrow="up-right" external={action.external} size="lg" href={action.href}>{action.label}</ProButton>
        {/if}
        <ProButton variant={action ? 'ghost' : 'solid'} arrow="right" size="lg" href="/contatti">Parliamo di un progetto simile</ProButton>
      </div>
    </div>
  </div>
</section>

<style>
  .cc { border-top: 1px solid var(--lp-line); overflow-x: clip; }

  .cc__card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1.4rem, 3vw, 2rem);
    padding: clamp(2.6rem, 7vw, 5.5rem) clamp(1.2rem, 4vw, 3rem);
    border: 1px solid var(--lp-line-strong);
    border-radius: clamp(1.4rem, 3vw, 2.2rem);
    background: #08080a;
    text-align: center;
  }

  .cc__glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(60% 80% at 15% 0%, color-mix(in srgb, var(--a) 42%, transparent), transparent 70%),
      radial-gradient(60% 80% at 90% 100%, color-mix(in srgb, var(--b) 48%, transparent), transparent 70%);
  }

  .cc__rings { width: min(52rem, 140%); left: 50%; top: 50%; transform: translate(-50%, -50%); }

  .cc__icon { filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.5)); }

  .cc__cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.7rem; }
</style>
