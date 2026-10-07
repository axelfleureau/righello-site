<script lang="ts">
  import type { CaseStudy } from '$lib/data/case-studies';
  import { kindLabels } from '$lib/data/case-studies';
  import type { Landing } from '$lib/data/landing/types';
  import ProductDevice from '../ProductDevice.svelte';
  import ProButton from '../ProButton.svelte';
  import ProjectIcon from '../ProjectIcon.svelte';
  import StatusBadge from '../StatusBadge.svelte';
  import MediaFrame from './MediaFrame.svelte';
  import MetricsStrip from './MetricsStrip.svelte';

  export let study: CaseStudy;
  export let landing: Landing;
  export let primary: { href: string; label: string } | null;

  /** Gestionali e casi: il palco e' un browser con la sua didascalia, se la schermata non ha gia' una cornice. */
  $: heroMedia = landing.hero && landing.variant && ['gestionale', 'caso'].includes(landing.variant) && !landing.hero.frame ? { ...landing.hero, frame: 'browser' as const } : landing.hero;
  $: isPhone = heroMedia?.frame === 'phone';
  $: isIconImage = study.image.includes('/icons/');
  /** L'infografica, se la landing ne ha una, sta in "Come funziona": il palco del hero usa altro. */
  $: stage = landing.hero ? 'media' : study.stage && !(study.stage.type === 'infographic' && landing.graphic) ? 'device' : 'cover';
  $: meta = [
    { label: 'Dove', value: study.platform.join(' · ') },
    { label: 'Per chi', value: study.audience ?? study.sector },
  ];
</script>

<section class="lh" class:lh--bc={landing.variant === 'broadcast'}>
  <div class="lh__glow" aria-hidden="true"></div>
  <div class="lp-grid-bg" aria-hidden="true"></div>
  <div class="lp-rings lh__rings" aria-hidden="true"></div>

  <div class="section-container">
    <nav class="lh__crumb" aria-label="Breadcrumb">
      <a href="/progetti">Progetti</a><span aria-hidden="true">/</span><span>{study.name}</span>
    </nav>

    <div class="lh__grid">
      <div class="lh__copy">
        <p class="lh__kicker">
          <ProjectIcon {study} size={38} />
          <span>{study.name}</span>
          <span class="lh__kind">{kindLabels[study.kind]}</span>
        </p>
        <h1 class="lh__title"><span class="sr-only">{study.name}: </span>{landing.tagline ?? study.headline}</h1>
        <div><StatusBadge status={study.status} /></div>
        {#if landing.tagline}<p class="lh__lead">{study.headline}</p>{/if}
        <div class="lh__cta">
          {#if primary}
            <ProButton variant="solid" arrow="up-right" external size="lg" href={primary.href}>{primary.label}</ProButton>
          {/if}
          <ProButton variant="ghost" arrow="right" size="lg" href="/contatti">Parliamo di un progetto simile</ProButton>
        </div>
        <dl class="lh__meta">
          {#each meta as m}
            <div><dt>{m.label}</dt><dd>{m.value}</dd></div>
          {/each}
        </dl>
      </div>

      <div class="lh__stage" class:lh__stage--phone={stage === 'media' && isPhone}>
        {#if stage === 'media' && heroMedia}
          <MediaFrame media={heroMedia} eager maxH={isPhone ? 'var(--lp-vis-hero-phone)' : undefined} />
        {:else if stage === 'device'}
          <ProductDevice {study} eager />
        {:else}
          <figure class="lh__fig" class:lh__fig--icon={isIconImage}>
            <img
              src={study.image}
              alt={`${study.name}: ${study.headline}`}
              style:object-position={study.imagePosition ?? 'center center'}
              width="1200"
              height="750"
              loading="eager"
              decoding="async"
            />
          </figure>
        {/if}
      </div>
    </div>

    {#if landing.metrics.length}
      <div class="lh__metrics"><MetricsStrip metrics={landing.metrics} /></div>
    {/if}
  </div>
</section>

<style>
  .lh {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(6.6rem, 12vh, 8.6rem) 0 clamp(2.2rem, 5vw, 3.6rem);
  }

  .lh__glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    /* l'ultimo strato sfuma nel fondo della pagina: il bagliore non finisce mai su un taglio netto */
    background:
      linear-gradient(to bottom, transparent 70%, var(--lp-bg) 100%),
      radial-gradient(60% 70% at 80% 28%, color-mix(in srgb, var(--a) 36%, transparent), transparent 70%),
      radial-gradient(50% 60% at 5% 90%, color-mix(in srgb, var(--b) 40%, transparent), transparent 72%);
  }

  .lh__rings { width: min(70rem, 120vw); right: -22%; top: -18%; }

  .lh__crumb {
    display: flex;
    gap: 0.6rem;
    margin-bottom: clamp(1.6rem, 4vw, 2.6rem);
    font: 500 0.74rem/1 var(--lp-mono);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--lp-ink-3);
  }
  .lh__crumb a { display: inline-flex; align-items: center; min-height: 2.75rem; margin-block: -1.1rem; color: inherit; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.3); }
  .lh__crumb a:hover { color: #fff; }

  .lh__grid { display: grid; gap: clamp(2.4rem, 5vw, 4rem); align-items: center; }
  @media (min-width: 1024px) { .lh__grid { grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); } }

  .lh__copy { display: flex; flex-direction: column; align-items: flex-start; gap: 1.2rem; min-width: 0; }

  .lh__kicker {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.7rem;
    font: 600 0.76rem/1.2 var(--lp-mono);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--lp-ink-2);
  }
  .lh__kind { color: var(--lp-ink-3); }

  .lh__title {
    margin: 0;
    font-weight: var(--pg-display-weight);
    font-size: clamp(2.5rem, 5.6vw, 5.2rem);
    line-height: 0.98;
    letter-spacing: var(--pg-display-tracking);
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .lh__lead { margin: 0; max-width: 34rem; font-size: clamp(1.05rem, 1.5vw, 1.3rem); line-height: 1.45; color: var(--lp-ink-2); text-wrap: pretty; }

  .lh__cta { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 0.4rem; }

  .lh__meta { display: flex; flex-wrap: wrap; gap: 0.6rem 2rem; margin: 0.6rem 0 0; }
  .lh__meta dt { margin-bottom: 0.35rem; font: 500 0.68rem/1 var(--lp-mono); letter-spacing: 0.14em; text-transform: uppercase; color: var(--lp-ink-3); }
  .lh__meta dd { margin: 0; font-size: 0.92rem; font-weight: 600; color: var(--lp-ink); }

  /* piattaforme di trasmissione: piu' spazio al video che al testo */
  @media (min-width: 1024px) { .lh--bc .lh__grid { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); } }

  .lh__stage { min-width: 0; padding: 0 1.2rem 1.6rem 0; }
  .lh--bc .lh__stage { padding-right: 0; }

  /* telefono nel palco: una luce del colore del prodotto dietro, cosi' non resta perso accanto al testo */
  .lh__stage--phone { position: relative; isolation: isolate; padding: 0 0 1.6rem; }
  .lh__stage--phone::before {
    content: '';
    position: absolute;
    inset: -6% 4% -2%;
    z-index: -1;
    background:
      radial-gradient(closest-side at 35% 45%, color-mix(in srgb, var(--a) 36%, transparent), transparent 80%),
      radial-gradient(closest-side at 70% 60%, color-mix(in srgb, var(--b) 34%, transparent), transparent 82%);
  }

  .lh__fig {
    margin: 0;
    aspect-ratio: 16 / 10;
    border-radius: 1.1rem;
    overflow: hidden;
    border: 1px solid var(--lp-line-strong);
    background: linear-gradient(135deg, var(--a), var(--b));
    box-shadow: 0 70px 120px -40px color-mix(in srgb, var(--a) 60%, transparent), 0 24px 60px rgba(0, 0, 0, 0.6);
  }
  .lh__fig img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .lh__fig--icon { display: grid; place-items: center; }
  .lh__fig--icon img { width: 42%; height: auto; aspect-ratio: 1; border-radius: 22.37%; box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55); }

  .lh__metrics { margin-top: clamp(2.6rem, 6vw, 4.4rem); }
</style>
