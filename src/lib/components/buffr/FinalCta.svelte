<script lang="ts">
  import AppStoreBadge from './AppStoreBadge.svelte';
  import { storeUrlUs } from './content';

  const facts = [
    ['Piattaforma', 'iPhone'],
    ['Categoria', 'Foto e video'],
    ['Venditore', 'RIGHELLO SRL'],
  ];
</script>

<section class="cta" aria-labelledby="cta-titolo">
  <div class="cta__glow" aria-hidden="true"></div>
  <div class="section-container cta__in">
    <img class="cta__icon" src="/progetti/icons/buffr.webp" alt="" width="96" height="96" loading="lazy" decoding="async" />
    <h2 id="cta-titolo" class="cta__title">Accendi il buffer.<br />Poi goditi la partita.</h2>
    <p class="cta__lead">Al gol, un tocco. BUFFR ha già salvato quello che ti serve.</p>

    <AppStoreBadge large />
    <p class="cta__note">Gratis da scaricare · Per iPhone</p>

    <dl class="cta__facts">
      {#each facts as [name, value]}
        <div><dt>{name}</dt><dd>{value}</dd></div>
      {/each}
    </dl>
    <a class="cta__us" href={storeUrlUs} target="_blank" rel="noopener noreferrer">Scheda App Store per gli Stati Uniti</a>
  </div>
</section>

<style>
  .cta {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(5rem, 11vw, 9rem) 0;
    background: var(--bf-ink);
    color: var(--bf-text);
    text-align: center;
    border-top: 1px solid var(--bf-line);
  }

  .cta__glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(50% 60% at 50% 100%, rgba(214, 72, 126, 0.3), transparent 72%),
      radial-gradient(40% 50% at 50% 0%, rgba(122, 43, 143, 0.18), transparent 70%);
  }

  .cta__in {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cta__icon {
    width: clamp(4.6rem, 9vw, 6rem);
    height: auto;
    aspect-ratio: 1;
    border-radius: 22.37%;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.16),
      0 26px 50px -12px rgba(214, 72, 126, 0.55);
  }

  .cta__title {
    margin: 2rem 0 0;
    font-weight: 900;
    font-size: clamp(2.5rem, 7.4vw, 5.6rem);
    line-height: 0.98;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  .cta__lead {
    margin: 1.4rem 0 2.2rem;
    max-width: 30rem;
    font-size: clamp(1.05rem, 1.6vw, 1.25rem);
    line-height: 1.5;
    color: var(--bf-text-2);
  }

  .cta__note {
    margin: 1rem 0 0;
    font-size: 0.86rem;
    color: var(--bf-text-3);
  }

  .cta__facts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem 2.4rem;
    margin: 3rem 0 0;
    padding: 1.6rem 0 0;
    border-top: 1px solid var(--bf-line);
    width: min(100%, 38rem);
  }

  .cta__facts div {
    display: grid;
    gap: 0.3rem;
  }

  .cta__facts dt {
    font: 500 0.7rem/1 var(--bf-mono);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--bf-text-3);
  }

  .cta__facts dd {
    margin: 0;
    font-weight: 700;
  }

  .cta__us {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    margin-top: 0.6rem;
    font-size: 0.86rem;
    color: var(--bf-text-3);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }

  .cta__us:hover {
    color: var(--bf-text);
  }
</style>
