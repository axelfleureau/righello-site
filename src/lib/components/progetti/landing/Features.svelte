<script lang="ts">
  import type { Feature } from '$lib/data/landing/types';
  import SectionHead from './SectionHead.svelte';
  import Icon from './Icon.svelte';
  import MediaFrame from './MediaFrame.svelte';
  import { placeGrid } from './layout';
  import { reveal } from './actions';

  export let features: Feature[];
  export let title = 'Tutto quello che fa, già al suo posto';
  export let highlight: string | undefined = 'già al suo posto';
  /** Indice di posizione nella pagina: le sezioni alternano il tono dello sfondo. */
  export let tone = 0;

  /** Una scheda e' larga solo se ha un media da mostrare a lato: senza, e' una scheda come le altre. */
  const isWide = (f: Feature) => !!(f.wide && f.media);

  /** Colonne e larghezze scelte sul numero di voci e sulle larghe: ogni riga e' piena. */
  $: grid = placeGrid(features, isWide);
</script>

<section id="funzioni" class="ft lp-section" class:lp-tone-alt={tone % 2 === 1}>
  <div class="section-container">
    <SectionHead kicker="Funzioni" {title} {highlight} />
    <ul class="ft__grid lp-bento" data-cols={grid.cols}>
      {#each grid.items as { item: f, i, sd, sm, st, od, om, ot }, k (i)}
        {@const wide = isWide(f)}
        <li
          class="ft__card lp-card lp-reveal"
          class:ft__card--wide={wide}
          class:ft__card--phone={wide && f.media?.frame === 'phone'}
          style="--sd:{sd}; --sm:{sm}; --st:{st}; --od:{od}; --om:{om}; --ot:{ot}"
          use:reveal={(k % 3) * 70}>
          <div class="ft__inner">
            <div class="ft__body">
              <span class="ft__icon"><Icon name={f.icon} size={22} /></span>
              <h3>{f.title}</h3>
              {#if f.text}<p>{f.text}</p>{/if}
            </div>
            {#if wide && f.media}
              <div class="ft__media"><MediaFrame media={f.media} maxH={f.media.frame === 'phone' ? 'var(--lp-vis-feature-phone)' : 'var(--lp-vis-feature)'} /></div>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .ft__card {
    position: relative;
    display: flex;
    min-width: 0;
    container-type: inline-size;
    transition: transform 0.35s var(--lp-ease), border-color 0.35s;
  }
  .ft__card:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--a) 70%, var(--lp-line-strong)); }

  .ft__inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    min-width: 0;
    padding: clamp(1.3rem, 2.2vw, 1.8rem);
  }

  .ft__body { display: flex; flex-direction: column; gap: 0.7rem; min-width: 0; }
  .ft__media { min-width: 0; }

  /* scheda larga: testo e media affiancati quando c'e' posto (si misura la scheda, non lo schermo) */
  @container (min-width: 34rem) {
    .ft__card--wide .ft__inner { flex-direction: row; align-items: center; gap: clamp(1.4rem, 3vw, 2.4rem); }
    .ft__card--wide .ft__body { flex: 1 1 42%; }
    .ft__card--wide .ft__media { flex: 1 1 58%; }
  }

  /* il telefono sta sempre accanto al testo e ridotto: una cattura verticale non gonfia la scheda */
  .ft__card--phone .ft__inner { flex-direction: row; align-items: center; gap: 1.2rem; }
  .ft__card--phone .ft__body { flex: 1 1 auto; }
  .ft__card--phone .ft__media { flex: 0 0 auto; width: calc(var(--lp-vis-feature-phone) * 0.4615); }

  /* su telefono l'icona sta accanto al titolo: otto schede in colonna non diventano una pagina intera */
  @media (max-width: 639px) {
    .ft__body { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 0.7rem 0.9rem; }
    .ft__body p { grid-column: 1 / -1; }
    .ft__body .ft__icon { margin-bottom: 0; }
    .ft__inner { gap: 1rem; padding: 1.1rem 1.2rem; }
  }

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
