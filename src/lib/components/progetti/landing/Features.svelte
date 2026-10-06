<script lang="ts">
  import type { Feature } from '$lib/data/landing/types';
  import SectionHead from './SectionHead.svelte';
  import Icon from './Icon.svelte';
  import MediaFrame from './MediaFrame.svelte';
  import { reveal } from './actions';

  export let features: Feature[];
  export let title = 'Tutto quello che fa, già al suo posto';
  export let highlight: string | undefined = 'già al suo posto';
</script>

<section id="funzioni" class="ft lp-section">
  <div class="section-container">
    <SectionHead kicker="Funzioni" {title} {highlight} />
    <ul class="ft__grid">
      {#each features as f, i}
        <li class="ft__card lp-card lp-reveal" class:ft__card--wide={f.wide} use:reveal={(i % 3) * 70}>
          <div class="ft__body">
            <span class="ft__icon"><Icon name={f.icon} size={22} /></span>
            <h3>{f.title}</h3>
            {#if f.text}<p>{f.text}</p>{/if}
          </div>
          {#if f.wide && f.media}
            <div class="ft__media"><MediaFrame media={f.media} /></div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .ft { border-top: 1px solid var(--lp-line); }

  .ft__grid {
    margin: clamp(2.2rem, 5vw, 3.4rem) 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: var(--lp-gap);
    grid-template-columns: minmax(0, 1fr);
    grid-auto-flow: dense;
  }

  @media (min-width: 640px) { .ft__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1000px) { .ft__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

  .ft__card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: clamp(1.3rem, 2.2vw, 1.8rem);
    min-width: 0;
    transition: transform 0.35s var(--lp-ease), border-color 0.35s;
  }
  .ft__card:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--a) 70%, var(--lp-line-strong)); }

  @media (min-width: 640px) { .ft__card--wide { grid-column: span 2; } }
  @media (min-width: 900px) { .ft__card--wide { flex-direction: row; align-items: center; } .ft__card--wide .ft__body { flex: 1 1 46%; } .ft__card--wide .ft__media { flex: 1 1 54%; } }

  .ft__body { display: flex; flex-direction: column; gap: 0.7rem; min-width: 0; }
  .ft__media { min-width: 0; }

  .ft__icon {
    display: grid;
    place-items: center;
    width: 2.8rem;
    height: 2.8rem;
    margin-bottom: 0.6rem;
    border-radius: 0.85rem;
    color: #fff;
    border: 1px solid color-mix(in srgb, var(--a) 55%, transparent);
    background: linear-gradient(145deg, color-mix(in srgb, var(--a) 45%, transparent), color-mix(in srgb, var(--b) 30%, transparent));
  }

  .ft__card h3 { margin: 0; font-weight: var(--pg-display-weight); font-size: 1.35rem; line-height: 1.15; letter-spacing: var(--pg-display-tracking); }
  .ft__card p { margin: 0; font-size: 0.96rem; line-height: 1.55; color: var(--lp-ink-2); text-wrap: pretty; }

  @media (prefers-reduced-motion: reduce) { .ft__card { transition: none; } .ft__card:hover { transform: none; } }
</style>
