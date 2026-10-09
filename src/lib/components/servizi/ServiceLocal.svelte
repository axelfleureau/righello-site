<script lang="ts">
  import SectionHead from '../progetti/landing/SectionHead.svelte';
  import { reveal } from '../progetti/landing/actions';
  import type { LocalBlock } from './types';

  export let id = 'zona';
  export let block: LocalBlock;
  export let tone = 0;
</script>

<section {id} class="sl lp-section" class:lp-tone-alt={tone % 2 === 1}>
  <div class="section-container sl__grid">
    <div class="sl__copy">
      <SectionHead kicker={block.kicker} title={block.title} highlight={block.highlight} />
      {#each block.paragraphs as p, k}
        <p class="sl__p lp-reveal" use:reveal={60 + k * 60}>{p}</p>
      {/each}
      {#if block.areas?.length}
        <ul class="sl__areas lp-reveal" use:reveal={120} aria-label="Aree servite">
          {#each block.areas as a}<li>{a}</li>{/each}
        </ul>
      {/if}
      {#if block.points?.length}
        <ol class="sl__points lp-reveal" use:reveal={140}>
          {#each block.points as pt, k}<li><span aria-hidden="true">{String(k + 1).padStart(2, '0')}</span><p>{pt}</p></li>{/each}
        </ol>
      {/if}
      {#if block.links?.length}
        <ul class="sl__links lp-reveal" use:reveal={160} aria-label="Pagine utili">
          {#each block.links as l}<li><a href={l.href}>{l.label}</a></li>{/each}
        </ul>
      {/if}
    </div>

    {#if block.signals?.length}
      <ul class="sl__signals">
        {#each block.signals as s, k (s.title)}
          <li class="sl__sig lp-card lp-reveal" use:reveal={k * 70}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</section>

<style>
  .sl__grid { display: grid; gap: clamp(2rem, 5vw, 3.4rem); }
  @media (min-width: 1000px) { .sl__grid:has(.sl__signals) { grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); align-items: start; } }

  .sl__copy { display: flex; flex-direction: column; gap: 1.1rem; min-width: 0; }
  .sl__p { margin: 0; max-width: 40rem; font-size: 1.02rem; line-height: 1.6; color: var(--lp-ink-2); text-wrap: pretty; }

  .sl__areas, .sl__links { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.3rem 0 0; padding: 0; list-style: none; }
  .sl__areas li { padding: 0.45rem 0.9rem; border: 1px solid var(--lp-line-strong); border-radius: 999px; font-size: 0.86rem; font-weight: 600; color: var(--lp-ink-2); }
  .sl__links a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0 0.2rem; font-size: 0.92rem; font-weight: 600; color: var(--lp-ink); text-decoration: none; border-bottom: 1px solid var(--lp-line-strong); }
  .sl__links a:hover { border-color: #fff; }
  .sl__links { gap: 0.4rem 1.4rem; }

  .sl__points { margin: 0.4rem 0 0; padding: 0; list-style: none; max-width: 44rem; }
  .sl__points li { display: flex; gap: 1rem; padding: 0.95rem 0; border-top: 1px solid var(--lp-line); }
  .sl__points li:last-child { border-bottom: 1px solid var(--lp-line); }
  .sl__points span { flex: none; width: 1.6rem; padding-top: 0.2rem; font: 600 0.72rem/1 var(--lp-mono); letter-spacing: 0.1em; color: var(--lp-pink); }
  .sl__points p { margin: 0; font-size: 0.98rem; line-height: 1.5; color: var(--lp-ink-2); text-wrap: pretty; }

  .sl__signals { display: grid; gap: var(--lp-gap); margin: 0; padding: 0; list-style: none; }
  @media (min-width: 640px) { .sl__signals { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .sl__sig { padding: 1.3rem 1.4rem; }
  .sl__sig h3 { margin: 0 0 0.5rem; font-weight: var(--pg-display-weight); font-size: 1.15rem; line-height: 1.2; letter-spacing: var(--pg-display-tracking); }
  .sl__sig p { margin: 0; font-size: 0.93rem; line-height: 1.55; color: var(--lp-ink-2); text-wrap: pretty; }
</style>
