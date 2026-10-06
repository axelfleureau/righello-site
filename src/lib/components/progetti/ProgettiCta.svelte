<script lang="ts">
  import MagneticButton from '$lib/components/MagneticButton.svelte';

  export let schedulingUrl = '/contatti';
</script>

<section class="cta">
  <div class="cta__bg" aria-hidden="true"></div>
  <div class="section-container cta__in">
    <p class="cta__kicker">04 · Il prossimo sei tu</p>
    <h2 class="cta__title">Hai un progetto? <span class="gradient-text">Costruiamolo davvero.</span></h2>

    <a class="cta__mail" href="mailto:hello@wearerighello.com">
      <span>hello@wearerighello.com</span>
      <i aria-hidden="true">↗</i>
    </a>

    <div class="cta__row">
      <MagneticButton href={schedulingUrl} variant="primary">Prenota una call gratuita</MagneticButton>
      <p>Pordenone · Mestre</p>
    </div>
  </div>
</section>

<style>
  .cta {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(4.5rem, 10vw, 8rem) 0;
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
  }

  .cta__bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(50% 70% at 15% 100%, var(--glow-pink), transparent 70%),
      radial-gradient(45% 60% at 90% 0%, var(--glow-cyan), transparent 70%);
  }

  .cta__kicker {
    margin: 0 0 1.2rem;
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .cta__title {
    margin: 0;
    max-width: 16ch;
    font-weight: 900;
    font-size: clamp(2.2rem, 5.6vw, 5rem);
    line-height: 0.98;
    letter-spacing: -0.03em;
    color: var(--text-primary);
  }

  .cta__mail {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-top: clamp(2rem, 5vw, 3.5rem);
    padding: clamp(0.8rem, 2vw, 1.4rem) 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.3s, padding 0.35s cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .cta__mail span {
    font-weight: 900;
    font-size: clamp(1.5rem, 6.4vw, 6.4rem);
    letter-spacing: -0.035em;
    line-height: 1;
    overflow-wrap: anywhere;
  }

  .cta__mail i {
    font-style: normal;
    font-size: clamp(1.4rem, 4vw, 3.4rem);
    transition: transform 0.3s;
  }

  .cta__mail:hover { color: #d6487e; padding-left: 1rem; }
  .cta__mail:hover i { transform: translate(6px, -6px); }
  .cta__mail:focus-visible { outline: 2px solid #d6487e; outline-offset: 4px; }

  .cta__row {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.4rem;
  }

  .cta__row p {
    margin: 0;
    font: 500 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  @media (prefers-reduced-motion: reduce) {
    .cta__mail, .cta__mail i { transition: none; }
  }
</style>
