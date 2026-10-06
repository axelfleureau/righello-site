<script lang="ts">
  import Icon from './Icon.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import { features } from './content';

  const styleSwatches = ['#d63a45', '#2e6fd0', '#d6487e'];
</script>

<section class="bento" aria-labelledby="bento-titolo">
  <div class="section-container">
    <RevealOnScroll animation="fly-up" duration={420}>
      <header class="bento__head">
        <p class="bento__kicker">Dentro l’app</p>
        <h2 id="bento-titolo" class="bento__title">Poche cose, fatte bene.</h2>
        <p class="bento__lead">Tutto quello che serve dal fischio d’inizio al video finito. Niente di più.</p>
      </header>
    </RevealOnScroll>

    <RevealOnScroll animation="fly-up" duration={460} delay={60}>
    <div class="bento__grid">
      {#each features as feature}
          <article class="card" class:card--wide={feature.wide}>
            <span class="card__icon"><Icon name={feature.icon} size={22} /></span>
            <h3 class="card__title">{feature.title}</h3>
            <p class="card__text">{feature.text}</p>

            {#if feature.visual === 'ticks'}
              <span class="card__ticks" aria-hidden="true">
                {#each Array(36) as _, t}<i class:is-hot={t >= 22}></i>{/each}
              </span>
            {:else if feature.visual === 'styles'}
              <span class="card__swatches" aria-hidden="true">
                {#each styleSwatches as color}<i style="background: {color}"></i>{/each}
              </span>
            {/if}
          </article>
      {/each}
    </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .bento {
    padding: var(--bf-section-y) 0;
    background: var(--bg-primary);
    color: var(--text-primary);
    border-top: 1px solid var(--border-color);
  }

  .bento__head {
    max-width: 40rem;
    margin-bottom: clamp(2rem, 5vw, 3.5rem);
  }

  .bento__kicker {
    margin: 0 0 1rem;
    font: 600 0.78rem/1 var(--bf-mono);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--bf-accent-text);
  }

  .bento__title {
    margin: 0;
    font-weight: 900;
    font-size: clamp(2.2rem, 5.4vw, 4rem);
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .bento__lead {
    margin: 1.1rem 0 0;
    font-size: 1.1rem;
    line-height: 1.5;
    color: var(--text-secondary);
  }

  .bento__grid {
    display: grid;
    gap: 1rem;
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
    box-sizing: border-box;
    padding: 1.5rem;
    border-radius: 1.4rem;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    overflow: hidden;
    transition:
      transform 0.35s var(--bf-ease),
      border-color 0.25s;
  }

  .card:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--bf-pink) 55%, var(--border-color));
  }

  .card__icon {
    display: grid;
    place-items: center;
    width: 2.7rem;
    height: 2.7rem;
    margin-bottom: 0.6rem;
    border-radius: 0.8rem;
    background: color-mix(in srgb, var(--bf-pink) 14%, transparent);
    color: var(--bf-pink);
  }

  .card__title {
    margin: 0;
    font-size: 1.28rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    line-height: 1.15;
  }

  .card__text {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.5;
    color: var(--text-secondary);
    max-width: 30rem;
  }

  .card__ticks {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: auto;
    padding-top: 1.4rem;
  }

  .card__ticks i {
    flex: none;
    width: 2px;
    height: 1.4rem;
    border-radius: 2px;
    background: var(--border-color);
  }

  .card__ticks i:nth-child(5n + 1) {
    height: 2.1rem;
  }

  .card__ticks i.is-hot {
    background: var(--bf-pink);
  }

  .card__swatches {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 1.2rem;
  }

  .card__swatches i {
    width: 2.4rem;
    height: 1.4rem;
    border-radius: 0.5rem;
  }

  @media (min-width: 640px) {
    .bento__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .card--wide {
      grid-column: span 2;
    }
  }

  @media (min-width: 1024px) {
    .bento__grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .card--wide {
      grid-column: span 2;
    }

    .card {
      padding: 1.8rem;
    }
  }
</style>
