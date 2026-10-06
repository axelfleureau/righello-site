<script lang="ts">
  import type { TechItem } from '$lib/data/landing/types';
  import SectionHead from './SectionHead.svelte';
  import { reveal } from './actions';

  export let tech: TechItem[];

  const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<section id="tecnologia" class="tg lp-section">
  <div class="section-container">
    <SectionHead kicker="Sotto il cofano" title="Come è costruito" highlight="costruito" />
    <ol class="tg__grid">
      {#each tech as t, i}
        <li class="tg__item lp-reveal" use:reveal={(i % 3) * 80}>
          <span class="tg__dot" aria-hidden="true"></span>
          <span class="tg__n">{pad(i)}</span>
          <h3>{t.title}</h3>
          <p>{t.text}</p>
          {#if t.tags?.length}
            <ul class="tg__tags" aria-label="Tecnologie">
              {#each t.tags as tag}<li>{tag}</li>{/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .tg { border-top: 1px solid var(--lp-line); }

  .tg__grid {
    margin: clamp(2.2rem, 5vw, 3.4rem) 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 2.6rem var(--lp-gap);
    grid-template-columns: minmax(0, 1fr);
  }
  @media (min-width: 680px) { .tg__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1000px) { .tg__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

  /* ogni voce pende da una linea sottile: il puntino la aggancia come la tacca di un righello */
  .tg__item { position: relative; padding-top: 1.7rem; border-top: 1px solid var(--lp-line-strong); min-width: 0; }
  .tg__dot {
    position: absolute;
    left: 0;
    top: -0.38rem;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    box-shadow: 0 0 0 4px var(--lp-bg);
    background: linear-gradient(135deg, var(--a), var(--b));
  }

  .tg__n { font: 600 0.72rem/1 var(--lp-mono); letter-spacing: 0.16em; color: var(--lp-pink); }
  .tg__item h3 { margin: 0.8rem 0 0.6rem; font-weight: var(--pg-display-weight); font-size: 1.3rem; line-height: 1.15; letter-spacing: var(--pg-display-tracking); }
  .tg__item p { margin: 0; font-size: 0.96rem; line-height: 1.55; color: var(--lp-ink-2); text-wrap: pretty; }

  .tg__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 1.1rem 0 0; padding: 0; list-style: none; }
  .tg__tags li {
    padding: 0.32rem 0.7rem;
    border: 1px solid var(--lp-line-strong);
    border-radius: 999px;
    font: 500 0.7rem/1.2 var(--lp-mono);
    letter-spacing: 0.04em;
    color: var(--lp-ink-2);
  }
</style>
