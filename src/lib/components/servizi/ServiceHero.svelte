<script lang="ts">
  import ProButton from '../progetti/ProButton.svelte';
  import type { PageModel } from './types';

  export let m: PageModel;

  const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<section class="sh">
  <div class="sh__glow" aria-hidden="true"></div>
  <div class="lp-grid-bg" aria-hidden="true"></div>
  <div class="lp-rings sh__rings" aria-hidden="true"></div>

  <div class="section-container">
    <nav class="sh__crumb" aria-label="Breadcrumb">
      {#each m.crumb.trail as l}<a href={l.href}>{l.label}</a><span aria-hidden="true">/</span>{/each}<span>{m.crumb.current}</span>
    </nav>

    <div class="sh__grid">
      <div class="sh__copy">
        <p class="lp-kicker">{m.kicker}</p>
        <h1 class="sh__title">{m.title}{#if m.highlight}<br /><span class="lp-hl">{m.highlight}</span>{/if}</h1>
        <p class="sh__lead">{m.lead}</p>
        <div class="sh__cta">
          <ProButton variant="solid" arrow="right" size="lg" href={m.primary.href}>{m.primary.label}</ProButton>
          {#if m.secondary}<ProButton variant="ghost" arrow="right" size="lg" href={m.secondary.href}>{m.secondary.label}</ProButton>{/if}
        </div>
      </div>

      <aside class="sh__panel lp-card" aria-label={m.panel.title}>
        <p class="sh__ptitle">{m.panel.title}</p>
        <ol class="sh__list">
          {#each m.panel.items as it, i}
            <li>
              <span class="sh__n" aria-hidden="true">{pad(i)}</span>
              <div>
                {#if it.title}<p class="sh__h">{it.title}</p>{/if}
                {#if it.text}<p class:sh__only={!it.title}>{it.text}</p>{/if}
              </div>
            </li>
          {/each}
        </ol>
      </aside>
    </div>
  </div>
</section>

<style>
  .sh {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(6.6rem, 12vh, 8.6rem) 0 clamp(3rem, 6vw, 4.6rem);
  }

  .sh__glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(to bottom, transparent 70%, var(--lp-bg) 100%),
      radial-gradient(60% 70% at 85% 25%, color-mix(in srgb, var(--a) 34%, transparent), transparent 70%),
      radial-gradient(50% 60% at 5% 95%, color-mix(in srgb, var(--b) 38%, transparent), transparent 72%);
  }

  .sh__rings { width: min(70rem, 120vw); right: -22%; top: -22%; }

  .sh__crumb {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: clamp(1.6rem, 4vw, 2.6rem);
    font: 500 0.74rem/1 var(--lp-mono);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--lp-ink-3);
  }
  .sh__crumb a { display: inline-flex; align-items: center; min-height: 2.75rem; margin-block: -1.1rem; color: inherit; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.3); }
  .sh__crumb a:hover { color: #fff; }

  .sh__grid { display: grid; gap: clamp(2.2rem, 5vw, 3.6rem); align-items: center; }
  @media (min-width: 1000px) { .sh__grid { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); } }

  .sh__copy { display: flex; flex-direction: column; align-items: flex-start; gap: 1.2rem; min-width: 0; }

  .sh__title {
    margin: 0;
    font-weight: var(--pg-display-weight);
    font-size: clamp(2.4rem, 5.2vw, 4.7rem);
    line-height: 1;
    letter-spacing: var(--pg-display-tracking);
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .sh__lead { margin: 0; max-width: 36rem; font-size: clamp(1.05rem, 1.5vw, 1.25rem); line-height: 1.5; color: var(--lp-ink-2); text-wrap: pretty; }

  .sh__cta { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 0.4rem; }

  .sh__panel { padding: clamp(1.3rem, 2.4vw, 1.9rem); min-width: 0; }

  .sh__ptitle { margin: 0 0 0.4rem; font: 600 0.7rem/1.2 var(--lp-mono); letter-spacing: 0.16em; text-transform: uppercase; color: var(--lp-ink-3); }

  .sh__list { margin: 0; padding: 0; list-style: none; }
  .sh__list li { display: flex; gap: 1rem; padding: 1.1rem 0; border-top: 1px solid var(--lp-line); }
  .sh__list li:first-child { border-top: 0; }
  .sh__n { flex: none; width: 1.6rem; padding-top: 0.2rem; font: 600 0.72rem/1 var(--lp-mono); letter-spacing: 0.1em; color: var(--lp-pink); }
  .sh__list .sh__h { margin: 0 0 0.3rem; color: var(--lp-ink); font-weight: var(--pg-display-weight); font-size: 1.15rem; line-height: 1.2; letter-spacing: var(--pg-display-tracking); }
  .sh__list p.sh__only { font-size: 1rem; color: var(--lp-ink); }
  .sh__list p:not(.sh__h) { margin: 0; font-size: 0.94rem; line-height: 1.5; color: var(--lp-ink-2); text-wrap: pretty; }
</style>
