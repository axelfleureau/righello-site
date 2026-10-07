<script lang="ts">
  import './tokens.css';
  import ProjectIcon from './ProjectIcon.svelte';
  import StatusBadge from './StatusBadge.svelte';
  import {
    caseStudyHref,
    getCompanions,
    getNextCaseStudy,
    getPrevCaseStudy,
    getRelatedCaseStudies,
    kindLabels,
    listHref,
  } from '$lib/data/case-studies';
  import type { CaseStudy } from '$lib/data/case-studies';

  /** In fondo a ogni scheda di progetto (anche la landing di BUFFR): continua, torna all'elenco, scopri chi lavora insieme. */
  export let study: CaseStudy;

  $: next = getNextCaseStudy(study);
  $: prev = getPrevCaseStudy(study);
  $: companions = getCompanions(study);
  $: together = (id: string) => companions.some((c) => c.id === id);
  $: groups = [
    // chi lavora insieme e' gia' il precedente o il prossimo non si ripete: ne diventa un'etichetta
    { kicker: 'Lavora insieme a', items: companions.filter((c) => c.id !== next.id && c.id !== prev.id) },
    { kicker: 'Altri progetti', items: getRelatedCaseStudies(study) },
  ].filter((g) => g.items.length);
</script>

<a class="next" href={caseStudyHref(next)} style="--a:{next.accent[0]}; --b:{next.accent[1]}">
  <span class="next__bg" aria-hidden="true"></span>
  <span class="section-container next__in">
    <span class="next__kicker">Prossimo progetto{#if together(next.id)}{' '}· lavora insieme a {study.name}{/if}</span>
    <span class="next__row">
      <span class="next__name">{next.name}</span>
      <span class="next__arrow" aria-hidden="true">→</span>
    </span>
    <span class="next__sub">{kindLabels[next.kind]} · {next.status.label}</span>
  </span>
</a>

<nav class="bar" aria-label="Spostarsi fra i progetti" style="--a:{study.accent[0]}">
  <div class="section-container bar__in">
    <a class="bar__link" href={caseStudyHref(prev)}><span aria-hidden="true">←</span><span><small>Precedente{#if together(prev.id)}{' '}· lavora insieme{/if}</small><br />{prev.name}</span></a>
    <a class="bar__link" href={listHref(study)}>Tutti i progetti · {kindLabels[study.kind]} <span aria-hidden="true">↗</span></a>
  </div>
</nav>

{#each groups as group (group.kicker)}
  <section class="rel" aria-label={group.kicker}>
    <div class="section-container">
      <p class="rel__kicker">{group.kicker}</p>
      <ul class="rel__grid">
        {#each group.items as item (item.id)}
          <li>
            <a class="rel__card" href={caseStudyHref(item)} style="--a:{item.accent[0]}; --b:{item.accent[1]}">
              <span class="rel__top">
                <ProjectIcon study={item} size={44} />
                <StatusBadge status={item.status} compact />
              </span>
              <span class="rel__name">{item.name}</span>
              <span class="rel__kind">{kindLabels[item.kind]}</span>
              <span class="rel__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>
{/each}

<style>
  /* ---------- next ---------- */
  .next {
    position: relative;
    display: block;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(3.5rem, 8vw, 6rem) 0;
    color: #fff;
    text-decoration: none;
    background: #050505;
  }

  .next__bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(120deg, color-mix(in srgb, var(--a) 70%, #050505), color-mix(in srgb, var(--b) 80%, #050505));
    transition: filter 0.4s;
  }

  .next:hover .next__bg { filter: brightness(1.15) saturate(1.1); }

  .next__in { display: flex; flex-direction: column; gap: 0.9rem; }

  .next__kicker {
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
  }

  .next__row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }

  .next__name {
    font-weight: var(--pg-display-weight);
    font-size: clamp(2.6rem, 9vw, 9rem);
    line-height: 0.92;
    letter-spacing: var(--pg-display-tracking);
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .next__arrow {
    flex: none;
    font-size: clamp(2rem, 6vw, 5.5rem);
    transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .next:hover .next__arrow { transform: translateX(14px); }
  .next:focus-visible { outline: 3px solid #fff; outline-offset: -6px; }

  .next__sub {
    font: 500 0.8rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.82);
  }

  /* ---------- related ---------- */
  .rel { padding: clamp(3rem, 6vw, 4.5rem) 0 0; background: var(--bg-primary); }
  .rel:last-child { padding-bottom: clamp(4rem, 8vw, 6rem); }
  .rel + .rel { padding-top: clamp(2rem, 4vw, 3rem); }

  .rel__kicker {
    margin: 0 0 1.4rem;
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .rel__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 800px) {
    .rel__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .rel__card {
    position: relative;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 13rem;
    padding: 1.3rem;
    border-radius: 1.2rem;
    border: 1px solid var(--border-color);
    background:
      radial-gradient(90% 90% at 100% 0%, color-mix(in srgb, var(--a) 18%, transparent), transparent 65%),
      var(--bg-secondary);
    color: var(--text-primary);
    text-decoration: none;
    transition: transform 0.3s, border-color 0.3s;
  }

  .rel__card:hover { transform: translateY(-4px); border-color: var(--a); }
  .rel__card:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; }

  .rel__top { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; margin-bottom: auto; }

  .rel__name { font-weight: var(--pg-display-weight); font-size: 1.7rem; letter-spacing: var(--pg-display-tracking); line-height: 1; }

  .rel__kind {
    font: 500 0.72rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .rel__arrow {
    position: absolute;
    right: 1.2rem;
    bottom: 1.1rem;
    font-size: 1.3rem;
    color: var(--text-muted);
    transition: transform 0.3s, color 0.3s;
  }

  .rel__card:hover .rel__arrow { transform: translate(3px, -3px); color: var(--a); }

  /* ---------- precedente / elenco ---------- */
  .bar { background: var(--bg-primary); border-bottom: 1px solid var(--border-color); }

  .bar__in {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-between;
    gap: 0.5rem 1.5rem;
  }

  .bar__link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    min-height: 3.4rem;
    color: var(--text-secondary);
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.25s;
  }

  .bar__link:hover { color: var(--text-primary); }
  .bar__link:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; border-radius: 0.4rem; }
  .bar__link small { font: 500 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }

  @media (prefers-reduced-motion: reduce) {
    .next__arrow, .rel__card, .rel__arrow, .bar__link { transition: none; }
  }
</style>
