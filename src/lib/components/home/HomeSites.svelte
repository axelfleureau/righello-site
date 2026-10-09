<script lang="ts">
  import { caseStudies } from '$lib/data/case-studies';
  import HomeProjectCard from './HomeProjectCard.svelte';
  import ProButton from '../progetti/ProButton.svelte';

  // Siti su misura gia' online, dalla stessa fonte della pagina Progetti.
  const sites = ['portopiccolo-apartments', 'bibione-sand-storm', 'scuola-sci-piancavallo', 'fiumedica']
    .map((id) => caseStudies.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => !!s);
</script>

<section id="lavori" class="sites section-padding">
  <div class="section-container">
    <div class="section-header">
      <p class="section-subtitle">Per i nostri clienti</p>
      <h2 class="section-title">Siti su misura, <span class="gradient-text">già online</span></h2>
      <p class="intro">Ognuno nasce da un bisogno preciso: prenotare, iscriversi, farsi trovare.</p>
    </div>

    <div class="grid">
      {#each sites as study}
        <div><HomeProjectCard {study} variant="site" /></div>
      {/each}
    </div>

    <div class="more">
      <ProButton href="/progetti?tipo=sito#indice" variant="ghost" size="lg" arrow="right">Vedi tutti i siti</ProButton>
    </div>
  </div>
</section>

<style>
  .sites {
    scroll-margin-top: calc(var(--lp-nav-top, 5.4rem) + 3.4rem);
    background: var(--bg-secondary);
  }

  /* l'intestazione di sezione piu' stretta del valore di base: il grosso della pagina sono le schede */
  .section-header {
    margin-bottom: clamp(1.8rem, 3.5vw, 2.6rem);
  }

  .intro {
    max-width: 36rem;
    margin: 1.1rem auto 0;
    font-size: 1.1rem;
    color: var(--text-secondary);
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
  }

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
</style>
