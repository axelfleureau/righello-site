<script lang="ts">
  import { departments } from '$lib/data/projects';
  import ProButton from '../progetti/ProButton.svelte';

  /** Le aree sono quelle di /servizi (stessi id e stesso ordine): qui solo la sintesi, in parole semplici. */
  const slugs: Record<string, string> = {
    'digital-experience': 'web',
    'content-social': 'marketing',
    advertising: 'advertising',
  };

  const copy: Record<string, { title: string; text: string; points: string[] }> = {
    'digital-experience': {
      title: 'Siti e software su misura',
      text: 'Siti, negozi online e applicazioni fatti per la tua azienda, dalle stesse persone che costruiscono i nostri prodotti.',
      points: ['Siti e negozi online', 'Portali e applicazioni per i clienti', 'Collegamento con i gestionali che usi già'],
    },
    'content-social': {
      title: 'Marketing e contenuti',
      text: 'Piano editoriale, social, foto e video: contenuti fatti per portare clienti, non solo visualizzazioni.',
      points: ['Gestione dei social', 'Foto e video professionali', 'Reel e contenuti per ogni canale'],
    },
    advertising: {
      title: 'Pubblicità e automazioni',
      text: 'Campagne sui social e sui motori di ricerca, con la misurazione di quanto spendi e di quanto porta.',
      points: ['Campagne a pagamento', 'Rapporti mensili chiari', 'Automazioni per contatti e clienti'],
    },
  };

  const order = ['digital-experience', 'content-social', 'advertising'];
  const areas = order
    .filter((id) => departments.some((d) => d.id === id))
    .map((id) => ({ id, href: `/servizi/${slugs[id]}`, ...copy[id] }));

  // Pagine locali: restano collegate dalla home, in forma di link brevi.
  const zones = [
    { href: '/agenzia-marketing-pordenone', label: 'Agenzia marketing a Pordenone' },
    { href: '/agenzia-marketing-mestre', label: 'Agenzia marketing a Mestre' },
    { href: '/bando-intelligenza-artificiale-fvg-2026', label: 'Bando Intelligenza Artificiale FVG 2026' },
  ];
</script>

<section id="servizi" class="services section-padding">
  <div class="section-container">
    <div class="section-header">
      <p class="section-subtitle">Per le aziende</p>
      <h2 class="section-title">Cosa <span class="gradient-text">facciamo</span></h2>
      <p class="intro">Tre aree, una sola squadra: dal sito alla pubblicità, senza passaggi tra fornitori diversi.</p>
    </div>

    <div class="grid">
      {#each areas as area, i}
        <article class="area">
          <span class="area__n" aria-hidden="true">0{i + 1}</span>
          <h3 class="area__title">{area.title}</h3>
          <p class="area__text">{area.text}</p>
          <ul class="area__points">
            {#each area.points as point}<li>{point}</li>{/each}
          </ul>
          <a class="area__link" href={area.href}>Scopri di più <i aria-hidden="true">→</i></a>
        </article>
      {/each}
    </div>

    <div class="more">
      <ProButton href="/servizi" variant="primary" size="lg" arrow="right">Tutti i servizi</ProButton>
    </div>

    <nav class="zones" aria-label="Dove lavoriamo">
      <p>Lavoriamo in Friuli Venezia Giulia e in Veneto:</p>
      <ul>
        {#each zones as z}<li><a href={z.href}>{z.label}</a></li>{/each}
      </ul>
    </nav>
  </div>
</section>

<style>
  .services {
    scroll-margin-top: calc(var(--lp-nav-top, 5.4rem) + 3.4rem);
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

  .grid {
    display: grid;
    gap: 1.1rem;
    grid-template-columns: minmax(0, 1fr);
  }

  .area {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.4rem 1.4rem 1.2rem;
    border: 1px solid var(--border-color);
    border-radius: 1.3rem;
    background: color-mix(in srgb, var(--text-primary) 4%, var(--bg-primary));
  }

  .area__n {
    font: 600 0.74rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    color: var(--gradient-start);
  }

  .area__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }

  .area__text {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.5;
    color: var(--text-secondary);
  }

  .area__points {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.45rem;
    font-size: 0.95rem;
  }

  .area__points li {
    position: relative;
    padding-left: 1.2rem;
  }

  .area__points li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--gradient-start);
  }

  .area__link {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 2.75rem;
    font-weight: 600;
    color: var(--text-primary);
    text-decoration: none;
  }

  .area__link i {
    font-style: normal;
    transition: transform 0.25s;
  }

  .area__link:hover i {
    transform: translateX(4px);
  }

  .area__link:focus-visible {
    outline: 2px solid var(--gradient-start);
    outline-offset: 3px;
    border-radius: 0.4rem;
  }

  .more {
    display: flex;
    justify-content: center;
    margin-top: 2.2rem;
  }

  .zones {
    margin-top: 2.2rem;
    text-align: center;
    font-size: 0.92rem;
    color: var(--text-muted);
  }

  .zones p {
    margin: 0 0 0.5rem;
  }

  .zones ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0 1.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .zones a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    color: var(--text-secondary);
    text-decoration: underline;
    text-underline-offset: 0.25em;
    text-decoration-color: color-mix(in srgb, var(--text-secondary) 40%, transparent);
  }

  .zones a:hover {
    color: var(--text-primary);
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .area__link i {
      transition: none;
    }
  }
</style>
