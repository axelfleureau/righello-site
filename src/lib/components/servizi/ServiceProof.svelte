<script lang="ts">
  import SectionHead from '../progetti/landing/SectionHead.svelte';
  import StatusBadge from '../progetti/StatusBadge.svelte';
  import ProjectIcon from '../progetti/ProjectIcon.svelte';
  import { reveal } from '../progetti/landing/actions';
  import { caseStudyHref, getCaseStudyBySlug, kindLabels } from '$lib/data/case-studies';
  import type { Heading, Link, ProofItem } from './types';

  export let id = 'lavori';
  export let head: Heading;
  export let items: ProofItem[];
  export let more: Link;
  export let tone = 0;

  const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

  $: cases = items
    .map((it) => ({ study: getCaseStudyBySlug(it.id), note: it.note }))
    .filter((c): c is { study: NonNullable<typeof c.study>; note: string | undefined } => !!c.study);
</script>

<section {id} class="sp lp-section" class:lp-tone-alt={tone % 2 === 1}>
  <div class="section-container">
    <SectionHead kicker={head.kicker} title={head.title} highlight={head.highlight} lead={head.lead} />
    <ul class="sp__grid" data-n={cases.length}>
      {#each cases as { study, note }, k (study.id)}
        <li class="sp__cell lp-reveal" use:reveal={(k % 4) * 70}>
          <a class="sp__card lp-card" href={caseStudyHref(study)} style="--a:{study.accent[0]}; --b:{study.accent[1]}">
            <!-- sul telefono nessuna immagine grande: solo l'icona del progetto -->
            <span class="sp__fig">
              <picture>
                <!-- sotto i 640 px la sorgente non si sceglie: resta il gif vuoto e la foto non viene scaricata -->
                <source media="(min-width: 640px)" srcset={study.image} />
                <img
                  src={BLANK}
                  alt=""
                  width="1200"
                  height="750"
                  loading="lazy"
                  decoding="async"
                  style:object-position={study.imagePosition ?? 'center top'} />
              </picture>
            </span>
            <span class="sp__body">
              <span class="sp__top">
                <span class="sp__icon"><ProjectIcon {study} size={44} /></span>
                <span class="sp__kind">{kindLabels[study.kind]}</span>
              </span>
              <span class="sp__name">{study.name}</span>
              <span class="sp__text">{note ?? study.headline}</span>
              <span class="sp__foot">
                <StatusBadge status={study.status} compact />
                <span class="sp__go">Vedi la scheda <span aria-hidden="true">→</span></span>
              </span>
            </span>
          </a>
        </li>
      {/each}
    </ul>
    <p class="sp__more"><a href={more.href}>{more.label} <span aria-hidden="true">→</span></a></p>
  </div>
</section>

<style>
  .sp__grid {
    margin: clamp(2rem, 4.5vw, 3rem) 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: var(--lp-gap);
    grid-template-columns: minmax(0, 1fr);
  }
  @media (min-width: 640px) { .sp__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  /* una scheda sola non si allarga a tutta la pagina; tre stanno in fila, quattro 2x2 (4 in fila solo su schermo molto largo) */
  .sp__grid[data-n='1'] { grid-template-columns: minmax(0, 36rem); }
  @media (min-width: 1000px) { .sp__grid[data-n='3'] { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (min-width: 1180px) { .sp__grid[data-n='4'] { grid-template-columns: repeat(4, minmax(0, 1fr)); } }

  .sp__cell { min-width: 0; display: flex; }

  .sp__card {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    color: inherit;
    text-decoration: none;
    transition: transform 0.35s var(--lp-ease), border-color 0.35s;
  }
  .sp__card:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--a) 70%, var(--lp-line-strong)); }

  .sp__fig { display: none; aspect-ratio: 5 / 2; overflow: hidden; background: linear-gradient(135deg, var(--a), var(--b)); }
  @media (min-width: 640px) { .sp__fig { display: block; } .sp__icon { display: none; } }
  .sp__top { display: flex; align-items: center; gap: 0.8rem; }
  .sp__fig picture { display: block; height: 100%; }
  .sp__fig img { display: block; width: 100%; height: 100%; object-fit: cover; }

  .sp__body { display: flex; flex: 1; flex-direction: column; gap: 0.5rem; padding: 1.2rem 1.3rem 1.3rem; }
  .sp__icon { display: inline-flex; }
  .sp__kind { font: 500 0.68rem/1 var(--lp-mono); letter-spacing: 0.14em; text-transform: uppercase; color: var(--lp-ink-3); }
  .sp__name { font-weight: var(--pg-display-weight); font-size: 1.35rem; line-height: 1.1; letter-spacing: var(--pg-display-tracking); }
  .sp__text { font-size: 0.93rem; line-height: 1.5; color: var(--lp-ink-2); text-wrap: pretty; }
  .sp__foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.6rem 1rem; margin-top: auto; padding-top: 0.8rem; }
  .sp__go { font-size: 0.86rem; font-weight: 600; color: var(--lp-ink-2); transition: color 0.25s; }
  .sp__card:hover .sp__go { color: #fff; }

  .sp__more { margin: clamp(1.6rem, 3vw, 2.2rem) 0 0; }
  .sp__more a { display: inline-flex; align-items: center; gap: 0.5rem; min-height: 2.75rem; font-weight: 600; color: var(--lp-ink); text-decoration: none; border-bottom: 1px solid var(--lp-line-strong); }
  .sp__more a:hover { border-color: #fff; }

  @media (prefers-reduced-motion: reduce) { .sp__card { transition: none; } }
</style>
