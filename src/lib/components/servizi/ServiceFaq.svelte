<script lang="ts">
  import { reveal } from '../progetti/landing/actions';
  import type { FaqItem, Heading } from './types';

  export let id = 'domande';
  export let head: Heading;
  export let items: FaqItem[];
  export let tone = 0;
</script>

<section {id} class="sf lp-section" class:lp-tone-alt={tone % 2 === 1}>
  <div class="section-container sf__grid">
    <header class="sf__head lp-reveal" use:reveal>
      <p class="lp-kicker">{head.kicker}</p>
      <h2 class="lp-title">{head.title}</h2>
      {#if head.lead}<p class="lp-lead">{head.lead}</p>{/if}
    </header>
    <div class="sf__list lp-reveal" use:reveal={80}>
      {#each items as it (it.q)}
        <details class="sf__item" {...{ name: `faq-${id}` }}>
          <summary><span>{it.q}</span><i class="sf__plus" aria-hidden="true"></i></summary>
          <p>{it.a}</p>
        </details>
      {/each}
    </div>
  </div>
</section>

<style>
  .sf__grid { display: grid; gap: clamp(1.8rem, 4vw, 3rem); }
  @media (min-width: 900px) { .sf__grid { grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: clamp(2rem, 6vw, 5rem); align-items: start; } .sf__head { position: sticky; top: calc(var(--lp-nav-top) + 4.4rem); } }

  .sf__head { display: flex; flex-direction: column; gap: 1rem; align-items: flex-start; }
  .sf__head .lp-title { font-size: clamp(1.9rem, 3.6vw, 3rem); }

  .sf__item { border-top: 1px solid var(--lp-line-strong); }
  .sf__item:last-child { border-bottom: 1px solid var(--lp-line-strong); }

  .sf__item summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.2rem;
    min-height: 3.6rem;
    padding: 1rem 0;
    cursor: pointer;
    list-style: none;
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.35;
    -webkit-tap-highlight-color: transparent;
  }
  .sf__item summary::-webkit-details-marker { display: none; }
  .sf__item summary:hover { color: #fff; }

  .sf__plus { position: relative; flex: none; width: 1.1rem; height: 1.1rem; }
  .sf__plus::before, .sf__plus::after { content: ''; position: absolute; left: 0; top: 50%; width: 100%; height: 2px; margin-top: -1px; background: var(--lp-ink-2); border-radius: 2px; transition: transform 0.3s var(--lp-ease); }
  .sf__plus::after { transform: rotate(90deg); }
  .sf__item[open] .sf__plus::after { transform: rotate(0); }

  .sf__item p { margin: 0 0 1.3rem; max-width: 40rem; font-size: 0.98rem; line-height: 1.6; color: var(--lp-ink-2); text-wrap: pretty; }

  @media (prefers-reduced-motion: reduce) { .sf__plus::before, .sf__plus::after { transition: none; } }
</style>
