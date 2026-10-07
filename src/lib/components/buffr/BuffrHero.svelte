<script lang="ts">
  import AppStoreBadge from './AppStoreBadge.svelte';
  import HeroDevices from './HeroDevices.svelte';
</script>

<section class="hero" aria-labelledby="buffr-titolo">
  <div class="hero__glow" aria-hidden="true"></div>

  <div class="section-container hero__in">
    <p class="hero__kicker"><a class="hero__crumb" href="/progetti?tipo=app#indice">Progetti</a> <span aria-hidden="true">/</span> BUFFR · app per iPhone</p>
    <h1 id="buffr-titolo" class="hero__title">Prima succede.<br />Poi lo salvi.</h1>
    <p class="hero__lead">
      BUFFR tiene sempre gli ultimi secondi di quello che inquadri. Quando succede qualcosa, un tocco e sono tuoi.
    </p>

    <div class="hero__cta">
      <AppStoreBadge />
      <a class="hero__link" href="#funziona">Guarda come funziona <span aria-hidden="true">↓</span></a>
    </div>
    <p class="hero__note">Per iPhone · Gratis da scaricare</p>

    <div class="hero__devices">
      <HeroDevices />
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    overflow-x: clip;
    background: var(--bf-ink);
    color: var(--bf-text);
    padding: clamp(7rem, 12vw, 9.5rem) 0 clamp(3rem, 6vw, 5rem);
    text-align: center;
  }

  .hero__glow {
    position: absolute;
    inset: auto 0 0 0;
    height: 75%;
    background: radial-gradient(48% 50% at 50% 70%, rgba(214, 72, 126, 0.18), transparent 72%);
    pointer-events: none;
  }

  .hero__in {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero__kicker {
    margin: 0 0 1.4rem;
    font: 600 0.78rem/1 var(--bf-mono);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--bf-pink-text);
  }

  .hero__crumb {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    margin-block: -1.1rem;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  }

  .hero__crumb:hover { color: #fff; }

  .hero__title {
    margin: 0;
    font-weight: 900;
    font-size: clamp(2.9rem, 8.4vw, 6.4rem);
    line-height: 0.96;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  .hero__lead {
    margin: 1.6rem 0 0;
    max-width: 33rem;
    font-size: clamp(1.05rem, 1.6vw, 1.3rem);
    line-height: 1.5;
    color: var(--bf-text-2);
    text-wrap: balance;
  }

  .hero__cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.6rem 1.6rem;
    margin-top: 2.2rem;
  }

  .hero__link {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0 0.4rem;
    font-weight: 600;
    font-size: 0.98rem;
    color: var(--bf-text);
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.35);
    text-underline-offset: 0.3em;
    transition: text-decoration-color 0.2s;
  }

  .hero__link:hover {
    text-decoration-color: var(--bf-pink-text);
  }

  .hero__link:focus-visible {
    outline: 2px solid var(--bf-pink-text);
    outline-offset: 3px;
    border-radius: 0.4rem;
  }

  .hero__note {
    margin: 0.9rem 0 0;
    font-size: 0.86rem;
    color: var(--bf-text-3);
  }

  .hero__devices {
    width: 100%;
    margin-top: clamp(3.5rem, 8vw, 6.5rem);
  }
</style>
