<script lang="ts">
  import MagneticButton from '$lib/components/MagneticButton.svelte';
</script>

<svelte:head>
  <title>Coming Soon | Righello – Growth Agency</title>
  <meta name="description" content="Questa sezione è in arrivo. Stiamo lavorando per mostrarti i nostri migliori progetti. Torna presto!" />
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="coming-soon">
  <div class="coming-soon__inner">
    <div class="coming-soon__badge">IN ARRIVO</div>
    <h1 class="coming-soon__title">
      Ci stiamo<br /><span class="gradient-text">lavorando.</span>
    </h1>
    <p class="coming-soon__text">
      Stiamo preparando qualcosa di speciale. Molto presto potrai esplorare tutti i nostri progetti e i risultati ottenuti con i nostri clienti.
    </p>
    <div class="coming-soon__actions">
      <MagneticButton href="/contatti" variant="primary">
        Contattaci nel frattempo
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </MagneticButton>
      <MagneticButton href="/" variant="outline-white">
        Torna alla home
      </MagneticButton>
    </div>
  </div>
</section>

<style>
  .coming-soon {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 1.5rem 4rem;
    text-align: center;
  }

  .coming-soon__inner {
    max-width: 600px;
  }

  .coming-soon__badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #D6487E;
    border: 1px solid rgba(214, 72, 126, 0.3);
    border-radius: 2rem;
    padding: 0.375rem 1.25rem;
    margin-bottom: 2rem;
    animation: badgePulse 2.5s ease-in-out infinite;
  }

  @keyframes badgePulse {
    0%, 100% { border-color: rgba(214, 72, 126, 0.3); }
    50% { border-color: rgba(214, 72, 126, 0.7); }
  }

  .coming-soon__title {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .coming-soon__text {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
  }

  .coming-soon__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
</style>
