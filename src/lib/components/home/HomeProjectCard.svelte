<script lang="ts">
  import type { CaseStudy } from '$lib/data/case-studies';
  import { caseStudyHref, kindLabels } from '$lib/data/case-studies';
  import StatusBadge from '../progetti/StatusBadge.svelte';
  import PhoneFrame from '../progetti/PhoneFrame.svelte';

  export let study: CaseStudy;
  /** lead: prodotto principale (largo, con i telefoni); product: prodotto; site: lavoro per un cliente. */
  export let variant: 'lead' | 'product' | 'site' = 'product';

  $: screens = study.stage?.screens ?? [];
</script>

<a class="card card--{variant}" href={caseStudyHref(study)} style="--a:{study.accent[0]}; --b:{study.accent[1]}">
  <div class="card__media">
    {#if variant === 'lead' && screens.length >= 2}
      <div class="phones" aria-hidden="true">
        <div class="phones__a">
          <PhoneFrame><img class="shot" src={screens[0]} alt="" width="720" height="1560" loading="lazy" decoding="async" /></PhoneFrame>
        </div>
        <div class="phones__b">
          <PhoneFrame><img class="shot" src={screens[1]} alt="" width="720" height="1560" loading="lazy" decoding="async" /></PhoneFrame>
        </div>
      </div>
    {:else}
      <img
        class="card__img"
        src={study.image}
        alt=""
        width="1600"
        height="1000"
        loading="lazy"
        decoding="async"
        style="object-position:{study.imagePosition ?? 'center top'}"
      />
    {/if}
  </div>

  <div class="card__body">
    <div class="card__head">
      {#if study.icon && variant !== 'site'}
        <img class="card__icon" src={study.icon} alt="" width="44" height="44" loading="lazy" decoding="async" />
      {/if}
      <div class="card__titles">
        <p class="card__kind">{variant === 'site' ? study.sector : kindLabels[study.kind]}</p>
        <h3 class="card__name">{study.name}</h3>
      </div>
    </div>

    <p class="card__line">{study.headline}</p>

    <div class="card__foot">
      {#if variant !== 'site'}<StatusBadge status={study.status} />{:else}<span></span>{/if}
      <span class="card__more">Apri <i aria-hidden="true">→</i></span>
    </div>
  </div>
</a>

<style>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: 1.3rem;
    background: color-mix(in srgb, var(--text-primary) 4%, var(--bg-primary));
    color: var(--text-primary);
    text-decoration: none;
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--a) 60%, transparent);
  }

  .card:focus-visible {
    outline: 2px solid var(--gradient-start);
    outline-offset: 3px;
  }

  .card__media {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: linear-gradient(140deg, color-mix(in srgb, var(--a) 38%, #0b0b0f), color-mix(in srgb, var(--b) 30%, #0b0b0f));
  }

  .card__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.1rem 1.2rem 1rem;
  }

  .card__head {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    min-width: 0;
  }

  .card__icon {
    flex: none;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.7rem;
  }

  .card__titles {
    min-width: 0;
  }

  .card__kind {
    margin: 0 0 0.2rem;
    font: 600 0.68rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .card__name {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }

  .card__line {
    margin: 0;
    flex: 1;
    font-size: 0.98rem;
    line-height: 1.45;
    color: var(--text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .card__more {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    gap: 0.35rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .card__more i {
    font-style: normal;
    transition: transform 0.25s;
  }

  .card:hover .card__more i {
    transform: translateX(4px);
  }

  /* i siti dei clienti: piu' compatti, senza icona ne' stato (sono tutti online) */
  .card--site .card__name {
    font-size: 1.2rem;
  }

  .card--site .card__line {
    -webkit-line-clamp: 3;
    font-size: 0.92rem;
  }

  /* prodotto principale: sul telefono la scena e' piu' alta, cosi' i due telefoni si leggono */
  .card--lead .card__media {
    aspect-ratio: 4 / 3;
  }

  /* prodotto principale: testo a sinistra, i due telefoni veri a destra */
  .phones {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    padding-top: 9%;
  }

  .phones__a,
  .phones__b {
    width: 37%;
    max-width: 11.5rem;
    flex: none;
  }

  .phones__b {
    margin-top: 9%;
  }

  @media (min-width: 768px) {
    .card--lead {
      flex-direction: row-reverse;
    }

    .card--lead .card__media {
      flex: 1 1 52%;
      aspect-ratio: auto;
      min-height: 100%;
    }

    .card--lead .card__body {
      flex: 1 1 48%;
      justify-content: center;
      gap: 1rem;
      padding: 1.8rem;
    }

    .card--lead .card__name {
      font-size: 2.1rem;
    }

    .card--lead .card__line {
      flex: none;
      font-size: 1.08rem;
      -webkit-line-clamp: 4;
    }

    .phones {
      padding-top: 7%;
    }

    .phones__a,
    .phones__b {
      width: 42%;
      max-width: 12.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .card__more i {
      transition: none;
    }
    .card:hover {
      transform: none;
    }
  }
</style>
