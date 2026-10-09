<script lang="ts">
  import { caseStudies } from '$lib/data/case-studies';
  import type { CaseStudy } from '$lib/data/case-studies';
  import HomeProjectCard from './HomeProjectCard.svelte';
  import ProButton from '../progetti/ProButton.svelte';

  const byId = (id: string) => caseStudies.find((s) => s.id === id) as CaseStudy;

  const lead = byId('buffr');
  // il resto della vetrina: un gestionale per ogni mestiere + la regia delle partite
  const products = ['optima', 'tetha', 'gusto-raffinato-sala', 'regia-tv-studio'].map(byId);

  // Numeri contati dai dati, mai scritti a mano: stessa regola della pagina Progetti.
  const software = caseStudies.filter((s) => ['app', 'gestionale', 'broadcast', 'piattaforma'].includes(s.kind));
  const facts = [
    `${software.length} prodotti software costruiti da noi`,
    `${caseStudies.filter((s) => s.platform.some((p) => p === 'iPhone' || p === 'iPad')).length} app per iPhone e iPad`,
    `${caseStudies.filter((s) => s.status.tone === 'store').length} già su App Store`,
  ];
</script>

<section id="prodotti" class="products section-padding">
  <div class="section-container">
    <div class="section-header">
      <p class="section-subtitle">Prodotti nostri</p>
      <h2 class="section-title">Quello che abbiamo <span class="gradient-text">costruito</span></h2>
      <p class="intro">Ogni prodotto con il suo stato vero: sullo store, online o ancora in prova.</p>
      <ul class="facts">
        {#each facts as f}<li>{f}</li>{/each}
      </ul>
    </div>

    <div class="grid">
      <div class="grid__lead"><HomeProjectCard study={lead} variant="lead" /></div>
      {#each products as study}
        <div class="grid__item"><HomeProjectCard {study} /></div>
      {/each}
    </div>

    <div class="more">
      <ProButton href="/progetti" variant="primary" size="lg" arrow="right">Tutti i progetti</ProButton>
    </div>
  </div>
</section>

<style>
  .products {
    scroll-margin-top: calc(var(--lp-nav-top, 5.4rem) + 3.4rem);
    content-visibility: auto;
    contain-intrinsic-size: auto 1200px;
  }

  /* l'intestazione di sezione piu' stretta del valore di base: il grosso della pagina sono le schede */
  .section-header {
    margin-bottom: clamp(1.8rem, 3.5vw, 2.6rem);
  }

  .intro {
    max-width: 38rem;
    margin: 1.1rem auto 0;
    font-size: 1.1rem;
    color: var(--text-secondary);
  }

  .facts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem 1.6rem;
    margin: 1.4rem 0 0;
    padding: 0;
    list-style: none;
    font: 600 0.74rem/1.4 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .grid {
    display: grid;
    gap: 1.1rem;
    grid-template-columns: minmax(0, 1fr);
  }

  .more {
    display: flex;
    justify-content: center;
    margin-top: 2.2rem;
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .grid__lead {
      grid-column: 1 / -1;
    }
  }

  /* sei colonne: il prodotto principale ne prende quattro, gli altri due ciascuno,
     cosi' le righe si chiudono (4+2, poi 2+2+2) senza buchi */
  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    .grid__lead {
      grid-column: span 4;
    }

    .grid__item {
      grid-column: span 2;
    }
  }
</style>
