<script lang="ts">
  import type { CaseStudy } from '$lib/data/case-studies';
  import type { Landing } from '$lib/data/landing/types';
  import ProductDevice from '../ProductDevice.svelte';
  import SectionHead from './SectionHead.svelte';
  import { reveal } from './actions';

  export let study: CaseStudy;
  export let graphic: NonNullable<Landing['graphic']>;
  export let how: Landing['how'] = undefined;
  /** Posizione nella pagina: le sezioni alternano il tono dello sfondo. */
  export let tone = 0;

  /** L'infografica e' una sola, quella di ProductDevice: qui si presenta a tutta colonna con un palco costruito al volo. */
  $: staged = {
    ...study,
    stage: { type: 'infographic' as const, graphic, src: study.image, alt: `Schema interattivo: come funziona ${study.name}` },
  };
</script>

<section id="come-funziona" class="hw lp-section" class:lp-tone-alt={tone % 2 === 1}>
  <div class="lp-grid-bg" aria-hidden="true"></div>
  <div class="section-container">
    <SectionHead
      align="center"
      kicker="Come funziona"
      title={how?.title ?? 'Guarda come funziona'}
      highlight={how?.highlight}
      lead={how?.lead ?? 'Tocca un passaggio dello schema per vedere cosa succede.'}
    />
    <div class="hw__stage lp-reveal" use:reveal={100}>
      <ProductDevice study={staged} showIcon={false} />
    </div>
  </div>
</section>

<style>
  .hw { overflow-x: clip; }
  .hw__stage { margin-top: clamp(2.4rem, 5vw, 3.8rem); }
</style>
