<script lang="ts">
  import { caseStudies, caseStudyHref } from '$lib/data/case-studies';
  import type { CaseStudy } from '$lib/data/case-studies';
  import StatusBadge from './StatusBadge.svelte';
  import PhoneFrame from './PhoneFrame.svelte';

  // Una sola composizione: telefono, computer e iPad, ognuno col prodotto vero.
  // Riferimento: Flighty (Mobbin), titolo corto e dispositivi su fondo vuoto.
  const ids = ['buffr', 'tetha', 'gusto-raffinato-sala'];
  const items = ids
    .map((id) => caseStudies.find((s) => s.id === id))
    .filter((s): s is CaseStudy => Boolean(s?.stage));

  const device = (s: CaseStudy) => (s.stage?.type === 'phones' ? 'phone' : s.stage?.type === 'tablet' ? 'tablet' : 'laptop');
  const where = (s: CaseStudy) => (s.platform.length ? s.platform.join(' · ') : '');
</script>

<section class="fam" aria-labelledby="fam-title">
  <div class="section-container">
    <p class="fam__kicker">In tasca, sul tavolo, in ufficio</p>
    <h2 id="fam-title" class="fam__title">Ogni prodotto sul dispositivo giusto.</h2>
    <p class="fam__lead">Il telefono per chi è sul campo, l'iPad per chi ha la sala, il computer per chi tiene i conti. Le schermate sono quelle vere.</p>

    <div class="fam__stage">
      {#each items as s (s.id)}
        {@const kind = device(s)}
        <a class="fam__item fam__item--{kind}" href={caseStudyHref(s)} style="--a:{s.accent[0]}">
          <span class="fam__dev fam__dev--{kind}">
            {#if kind === 'phone'}
              <PhoneFrame><img class="shot" src={s.stage?.src} alt="" width="720" height="1560" loading="lazy" decoding="async" /></PhoneFrame>
            {:else if kind === 'tablet'}
              <img src={s.stage?.src} alt="" width="1000" height="698" loading="lazy" decoding="async" />
            {:else}
              <img src={s.stage?.src} alt="" width="1600" height="1000" loading="lazy" decoding="async" />
            {/if}
          </span>
          <span class="fam__cap">
            <strong>{s.name}</strong>
            <small>{where(s)}</small>
            <StatusBadge status={s.status} compact />
          </span>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .fam {
    content-visibility: auto;
    contain-intrinsic-size: auto 1100px;
    padding: clamp(4rem, 9vw, 7.5rem) 0;
    background: var(--bg-primary);
    border-top: 1px solid var(--border-color);
    text-align: center;
  }

  .fam__kicker {
    margin: 0 0 1rem;
    font: 600 0.74rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .fam__title {
    margin: 0 auto;
    max-width: 18ch;
    font-weight: var(--pg-display-weight);
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1;
    letter-spacing: var(--pg-display-tracking);
    color: var(--text-primary);
  }

  .fam__lead {
    margin: 1.1rem auto 0;
    max-width: 38rem;
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    line-height: 1.55;
    color: var(--text-secondary);
  }

  .fam__stage {
    display: grid;
    grid-template-columns: 0.55fr 1.6fr 1.05fr;
    align-items: end;
    gap: clamp(1.2rem, 4vw, 3.5rem);
    margin-top: clamp(2.5rem, 6vw, 4.5rem);
  }

  .fam__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    color: inherit;
    text-decoration: none;
  }

  .fam__dev {
    position: relative;
    display: block;
    width: 100%;
    transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  .fam__item:hover .fam__dev,
  .fam__item:focus-visible .fam__dev { transform: translateY(-8px); }

  .fam__dev img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* iPad */
  .fam__dev--tablet {
    padding: 0.4rem;
    border-radius: 1.1rem;
    background: linear-gradient(160deg, #2a2a30, #0e0e11);
  }

  .fam__dev--tablet img { border-radius: 0.75rem; }

  /* computer: schermo con bordo sottile e base */
  .fam__dev--laptop {
    padding: 0.4rem 0.4rem 0;
    border-radius: 0.9rem 0.9rem 0 0;
    background: linear-gradient(160deg, #2a2a30, #0e0e11);
  }

  .fam__dev--laptop img {
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
    border-radius: 0.55rem 0.55rem 0 0;
  }

  .fam__dev--laptop::after {
    content: '';
    display: block;
    height: 0.7rem;
    margin: 0 -4%;
    border-radius: 0 0 0.9rem 0.9rem;
    background: linear-gradient(#c9ccd2, #8e929b);
  }

  .fam__cap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
  }

  .fam__cap strong {
    font-size: 1.15rem;
    font-weight: var(--pg-display-weight);
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  .fam__cap small {
    margin-bottom: 0.35rem;
    font: 500 0.72rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  @media (max-width: 800px) {
    .fam__stage {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: 3.2rem;
    }

    .fam__item { width: 100%; }
    .fam__item--phone { max-width: 14rem; }
    .fam__item--tablet { max-width: 26rem; }
    .fam__item--laptop { max-width: 34rem; }
    /* sul telefono il computer va per primo: è il più largo e regge il titolo */
    .fam__item--laptop { order: -1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .fam__dev { transition: none; }
  }
</style>
