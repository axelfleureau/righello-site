<script lang="ts">
  import { contactHref } from '$lib/data/contact';
  import BentoGrid from './BentoGrid.svelte';
  import CardFlip from './CardFlip.svelte';
  import StatCard from './StatCard.svelte';
  import RevealOnScroll from './RevealOnScroll.svelte';
  import { inview } from '$lib/actions/inview';
  
  const pesoCards = [
    {
      id: 'paid',
      title: 'PAID Media',
      subtitle: 'Massima copertura',
      description: 'Massima copertura e targeting, ma percepita come meno credibile',
      features: ['CTR ottimizzato', 'CPL tracciato', 'ROAS continuo', 'A/B Testing'],
      color: '#D6487E',
      buttonText: 'Scopri Paid',
      buttonHref: contactHref()
    },
    {
      id: 'earned',
      title: 'EARNED Media',
      subtitle: 'Credibilità esterna',
      description: 'Rassegna stampa, menzioni, recensioni non pagate',
      features: ['Menzioni tracking', 'Sentiment analysis', 'PR digitale', 'Influencer UGC'],
      color: '#06B6D4',
      buttonText: 'Scopri Earned',
      buttonHref: contactHref()
    },
    {
      id: 'shared',
      title: 'SHARED Media',
      subtitle: 'Community building',
      description: 'Social media organici: like, commenti, condivisioni e community building',
      features: ['Engagement rate', 'Crescita community', 'Content virali', 'Brand ambassador'],
      color: '#A855F7',
      buttonText: 'Scopri Shared',
      buttonHref: contactHref()
    },
    {
      id: 'owned',
      title: 'OWNED Media',
      subtitle: 'Asset proprietari',
      description: 'Controllo del messaggio, base SEO, hub per contenuti da distribuire',
      features: ['Traffico organico', 'Lead generation', 'Email automation', 'Conversioni'],
      color: '#22C55E',
      buttonText: 'Scopri Owned',
      buttonHref: contactHref()
    }
  ];
  
  // Fatti del metodo, già scritti nelle pagine dei servizi: nessuna statistica esterna senza fonte.
  const statCards = [
    { value: 4, suffix: '', label: 'tipi di media nel metodo: pagati, guadagnati, condivisi, di proprietà', color: '#D6487E' },
    { value: 1, suffix: '', label: 'report al mese: cosa ha funzionato, cosa cambiamo', color: '#06B6D4' },
    { value: 3, suffix: ' mesi', label: 'di solito, per vedere i primi miglioramenti', color: '#A855F7' },
    { value: 72, suffix: ' ore', label: 'lavorative per la prima risposta', color: '#22C55E' }
  ];
  
  const kpiCards = [
    { type: 'P' as const, label: 'CTR, CPL', color: '#D6487E' },
    { type: 'E' as const, label: 'Menzioni, Sentiment', color: '#06B6D4' },
    { type: 'S' as const, label: 'Engagement, Crescita', color: '#A855F7' },
    { type: 'O' as const, label: 'Traffico, Lead', color: '#22C55E' }
  ];
  
</script>

<section class="peso-section section-padding">
  <div class="section-container">
    <RevealOnScroll>
      <div id="pesoframework" class="section-header">
        <span class="section-subtitle">Il Metodo</span>
        <h2 class="section-title">PESO Framework</h2>
        <p class="section-description">
          Un approccio integrato che unisce Paid, Earned, Shared e Owned media 
          per creare ecosistemi di marketing che si amplificano a vicenda.
          <strong>Obiettivi chiari, numeri leggibili, un report ogni mese.</strong>
        </p>
      </div>
    </RevealOnScroll>
    
    <RevealOnScroll delay={100}>
      <div class="integration-banner" use:inview={{ threshold: 0.3 }}>
        <div class="banner-content">
          <span class="banner-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </span>
          <p class="banner-text">
            <strong>Il vero segreto:</strong> Integrazione tra PESO. Evitare silos, lavorare per amplificazione incrociata.
          </p>
        </div>
        <div class="banner-example">
          Un post su LinkedIn (Owned) → diventa ADS (Paid) → è condiviso (Shared) → finisce menzionato da blog o stampa (Earned)
        </div>
      </div>
    </RevealOnScroll>
    
    <RevealOnScroll delay={200}>
      <div class="peso-cards-grid">
        {#each pesoCards as card}
          <CardFlip 
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
            features={card.features}
            color={card.color}
            buttonText={card.buttonText}
            buttonHref={card.buttonHref}
          />
        {/each}
      </div>
    </RevealOnScroll>
    
    <RevealOnScroll delay={300}>
      <div class="kpi-section">
        <h3 class="kpi-title">KPI & Misurazione</h3>
        <div class="kpi-chips">
          {#each kpiCards as kpi}
            <div class="kpi-chip" style="--chip-color: {kpi.color}">
              <span class="chip-letter">{kpi.type}</span>
              <span class="chip-label">{kpi.label}</span>
            </div>
          {/each}
        </div>
      </div>
    </RevealOnScroll>
    
    <RevealOnScroll delay={350}>
      <div class="stats-row">
        {#each statCards as stat}
          <StatCard 
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            color={stat.color}
          />
        {/each}
      </div>
    </RevealOnScroll>
    
  </div>
</section>

<style>
  .peso-section {
    background: var(--bg-secondary, #0a0a0a);
    overflow: visible;
  }

  
  .section-header {
    text-align: center;
    margin-bottom: 2.5rem;
    scroll-margin-top: 100px;
  }

  
  .section-subtitle {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #D6487E;
    margin-bottom: 1rem;
  }

  
  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    color: var(--text-primary, #fff);
    margin: 0 0 1rem 0;
    line-height: 1.1;
  }

  
  .section-description {
    font-size: 1.125rem;
    color: var(--text-secondary, #a1a1aa);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }

  
  .section-description strong {
    color: var(--text-primary, #fff);
  }

  
  .integration-banner {
    padding: 1.5rem;
    margin-bottom: 2.5rem;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.1), rgba(6, 182, 212, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px);
  }

  
  .banner-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  
  .banner-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    padding: 0.5rem;
    border-radius: 10px;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    color: white;
  }

  
  .banner-icon svg {
    width: 100%;
    height: 100%;
  }

  
  .banner-text {
    font-size: 1rem;
    color: var(--text-secondary, #a1a1aa);
    margin: 0;
    line-height: 1.6;
  }

  
  .banner-text strong {
    color: var(--text-primary, #fff);
  }

  
  .banner-example {
    font-size: 0.875rem;
    color: var(--text-muted, #71717a);
    padding-left: 3.5rem;
    font-style: italic;
  }

  
  .peso-cards-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    justify-items: center;
    isolation: isolate;
    position: relative;
    transform-style: flat;
    overflow: visible;
  }

  
  @media (min-width: 640px) {

    .peso-cards-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  
  @media (min-width: 1024px) {

    .peso-cards-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  
  .kpi-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  
  .kpi-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary, #fff);
    margin: 0 0 1rem 0;
  }

  
  .kpi-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }

  
  .kpi-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 100px;
    background: color-mix(in srgb, var(--chip-color) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--chip-color) 30%, transparent);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  
  .kpi-chip:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px color-mix(in srgb, var(--chip-color) 30%, transparent);
  }

  
  .chip-letter {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--chip-color);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--chip-color) 25%, transparent);
  }

  
  .chip-label {
    font-size: 0.8rem;
    color: var(--text-secondary, #a1a1aa);
  }

  
  .stats-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 3rem;
  }

  
  @media (min-width: 768px) {

    .stats-row {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
  }

  

  
  :global([data-theme="light"]) .peso-section {
    background: var(--bg-secondary, #f1f5f9);
  }

  
  :global([data-theme="light"]) .section-title,
  :global([data-theme="light"]) .kpi-title {
    color: #0f172a;
  }

  
  :global([data-theme="light"]) .section-description,
  :global([data-theme="light"]) .banner-text,
  :global([data-theme="light"]) .chip-label {
    color: #475569;
  }

  
  :global([data-theme="light"]) .section-description strong,
  :global([data-theme="light"]) .banner-text strong {
    color: #0f172a;
  }

  
  :global([data-theme="light"]) .integration-banner {
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.08), rgba(6, 182, 212, 0.08));
    border-color: rgba(0, 0, 0, 0.08);
  }

  
  :global([data-theme="light"]) .banner-example {
    color: #64748b;
  }
</style>
