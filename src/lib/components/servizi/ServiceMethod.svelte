<script lang="ts">
  import SectionHead from '../progetti/landing/SectionHead.svelte';
  import { reveal } from '../progetti/landing/actions';
  import type { Heading, MethodStep } from './types';

  export let id = 'come-lavoriamo';
  export let head: Heading;
  export let steps: MethodStep[];
  export let tone = 0;

  const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<section {id} class="sm lp-section" class:lp-tone-alt={tone % 2 === 1}>
  <div class="section-container">
    <SectionHead kicker={head.kicker} title={head.title} highlight={head.highlight} lead={head.lead} />
    <ol class="sm__list" style="--n:{steps.length}">
      {#each steps as s, i (s.title)}
        <li class="sm__step lp-reveal" use:reveal={(i % 5) * 70}>
          <span class="sm__dot" aria-hidden="true"></span>
          <span class="sm__n">{pad(i)}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {#if s.when}<p class="sm__when">{s.when}</p>{/if}
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .sm { --sm-bg: var(--lp-bg); }
  .sm.lp-tone-alt { --sm-bg: var(--lp-bg-alt); }

  .sm__list {
    margin: clamp(2.2rem, 5vw, 3.4rem) 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 2.4rem var(--lp-gap);
    grid-template-columns: minmax(0, 1fr);
  }
  @media (min-width: 640px) { .sm__list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1000px) { .sm__list { grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 0 clamp(1rem, 2vw, 1.6rem); } }

  /* ogni passo pende da un filo con un puntino, come una tacca di righello */
  .sm__step { position: relative; padding-top: 1.7rem; border-top: 1px solid var(--lp-line-strong); min-width: 0; }
  .sm__dot {
    position: absolute;
    left: 0;
    top: -0.38rem;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    box-shadow: 0 0 0 4px var(--sm-bg);
    background: linear-gradient(135deg, var(--a), var(--b));
  }
  .sm__n { font: 600 0.72rem/1 var(--lp-mono); letter-spacing: 0.16em; color: var(--lp-pink); }
  .sm__step h3 { margin: 0.8rem 0 0.6rem; font-weight: var(--pg-display-weight); font-size: 1.25rem; line-height: 1.15; letter-spacing: var(--pg-display-tracking); }
  .sm__step p { margin: 0; font-size: 0.96rem; line-height: 1.55; color: var(--lp-ink-2); text-wrap: pretty; }
  .sm__step .sm__when { margin-top: 0.9rem; font: 500 0.7rem/1.3 var(--lp-mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--lp-ink-3); }
</style>
