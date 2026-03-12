<script lang="ts">
  import BentoGrid from './BentoGrid.svelte';
  import CardFlip from './CardFlip.svelte';
  import StatCard from './StatCard.svelte';
  import CaseStudyCard from './CaseStudyCard.svelte';
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
      buttonHref: '/contatti'
    },
    {
      id: 'earned',
      title: 'EARNED Media',
      subtitle: 'Credibilità esterna',
      description: 'Rassegna stampa, menzioni, recensioni non pagate',
      features: ['Menzioni tracking', 'Sentiment analysis', 'PR digitale', 'Influencer UGC'],
      color: '#06B6D4',
      buttonText: 'Scopri Earned',
      buttonHref: '/contatti'
    },
    {
      id: 'shared',
      title: 'SHARED Media',
      subtitle: 'Community building',
      description: 'Social media organici: like, commenti, condivisioni e community building',
      features: ['Engagement rate', 'Crescita community', 'Content virali', 'Brand ambassador'],
      color: '#A855F7',
      buttonText: 'Scopri Shared',
      buttonHref: '/contatti'
    },
    {
      id: 'owned',
      title: 'OWNED Media',
      subtitle: 'Asset proprietari',
      description: 'Controllo del messaggio, base SEO, hub per contenuti da distribuire',
      features: ['Traffico organico', 'Lead generation', 'Email automation', 'Conversioni'],
      color: '#22C55E',
      buttonText: 'Scopri Owned',
      buttonHref: '/contatti'
    }
  ];
  
  const statCards = [
    {
      value: 54,
      suffix: '%',
      label: 'degli utenti naviga sui social per trovare ispirazione',
      color: '#D6487E'
    },
    {
      value: 91,
      suffix: '%',
      label: 'delle aziende usa 3+ piattaforme social',
      color: '#06B6D4'
    },
    {
      value: 3,
      suffix: 'x',
      label: 'amplificazione incrociata PESO',
      color: '#A855F7'
    },
    {
      value: 100,
      suffix: '%',
      label: 'ROI misurabile con KPI chiari',
      color: '#22C55E'
    }
  ];
  
  const kpiCards = [
    { type: 'P' as const, label: 'CTR, CPL', color: '#D6487E' },
    { type: 'E' as const, label: 'Menzioni, Sentiment', color: '#06B6D4' },
    { type: 'S' as const, label: 'Engagement, Crescita', color: '#A855F7' },
    { type: 'O' as const, label: 'Traffico, Lead', color: '#22C55E' }
  ];
  
  const caseStudies = [
    {
      title: 'Croce del Sud',
      client: 'Visibilità & Upselling',
      image: '',
      description: 'Visibilità costante su più canali (Instagram, Google, E-commerce). Il locale è diventato uno status symbol: i clienti condividono, alimentando la comunicazione in modo organico. Sistema di upselling per clienti fidelizzati con prodotti gourmet.',
      pesoTags: [
        { type: 'P' as const, label: 'Paid' },
        { type: 'S' as const, label: 'Shared' },
        { type: 'O' as const, label: 'Owned' }
      ],
      result: 'Status Symbol',
      href: '#'
    },
    {
      title: 'Mangio',
      client: 'Ecosistema Digitale',
      image: '',
      description: 'Web app (Owned) come piattaforma proprietaria. Instagram & Facebook (Shared + Paid) spingono traffico verso l\'app. PR & ADV per visibilità tramite collaborazioni. Sistema di guadagno multilivello dove comunicazione potenzia le attività.',
      pesoTags: [
        { type: 'P' as const, label: 'Paid' },
        { type: 'E' as const, label: 'Earned' },
        { type: 'S' as const, label: 'Shared' },
        { type: 'O' as const, label: 'Owned' }
      ],
      result: 'Full PESO',
      href: '#'
    }
  ];
  
  const tagColors = {
    P: '#D6487E',
    E: '#06B6D4',
    S: '#A855F7',
    O: '#22C55E'
  };
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
          <strong>ROI misurabile, KPI chiari, brand equity tangibile.</strong>
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
    
    <RevealOnScroll delay={400}>
      <div class="case-studies-section">
        <div class="case-studies-header">
          <h3 class="case-studies-title">Casi Vincenti</h3>
          <p class="case-studies-subtitle">Quando la strategia porta risultati reali</p>
        </div>
        
        <div class="case-studies-grid">
          {#each caseStudies as study}
            <div class="enhanced-case-card">
              <div class="case-card-header">
                <div class="case-tags">
                  {#each study.pesoTags as tag}
                    <span 
                      class="peso-chip"
                      style="--chip-color: {tagColors[tag.type]};"
                    >
                      {tag.type}
                    </span>
                  {/each}
                </div>
                <span class="case-result">{study.result}</span>
              </div>
              
              <h4 class="case-title">{study.title}</h4>
              <p class="case-client">{study.client}</p>
              <p class="case-description">{study.description}</p>
              
              <a href={study.href} class="case-link">
                Approfondisci
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          {/each}
        </div>
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
  
  .case-studies-section {
    margin-top: 1rem;
  }
  
  .case-studies-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .case-studies-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary, #fff);
    margin: 0 0 0.5rem 0;
  }
  
  .case-studies-subtitle {
    font-size: 1rem;
    color: var(--text-secondary, #a1a1aa);
    margin: 0;
  }
  
  .case-studies-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .case-studies-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .enhanced-case-card {
    padding: 1.5rem;
    border-radius: 16px;
    background: rgba(10, 10, 10, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  
  .enhanced-case-card:hover {
    border-color: rgba(214, 72, 126, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(214, 72, 126, 0.15);
  }
  
  .case-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .case-tags {
    display: flex;
    gap: 0.375rem;
  }
  
  .peso-chip {
    font-size: 0.65rem;
    font-weight: 700;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: color-mix(in srgb, var(--chip-color) 20%, transparent);
    color: var(--chip-color);
    border: 1px solid color-mix(in srgb, var(--chip-color) 40%, transparent);
  }
  
  .case-result {
    font-size: 0.75rem;
    font-weight: 600;
    color: #10b981;
    padding: 0.25rem 0.75rem;
    border-radius: 100px;
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
  }
  
  .case-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary, #fff);
    margin: 0 0 0.25rem 0;
  }
  
  .case-client {
    font-size: 0.875rem;
    color: var(--text-secondary, #a1a1aa);
    margin: 0 0 0.75rem 0;
  }
  
  .case-description {
    font-size: 0.875rem;
    color: var(--text-muted, #71717a);
    line-height: 1.6;
    margin: 0 0 1rem 0;
  }
  
  .case-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #D6487E;
    text-decoration: none;
    transition: gap 0.3s;
  }
  
  .case-link:hover {
    gap: 0.75rem;
  }
  
  .case-link svg {
    width: 16px;
    height: 16px;
  }
  
  :global([data-theme="light"]) .peso-section {
    background: var(--bg-secondary, #f1f5f9);
  }
  
  :global([data-theme="light"]) .section-title,
  :global([data-theme="light"]) .case-studies-title,
  :global([data-theme="light"]) .case-title,
  :global([data-theme="light"]) .kpi-title {
    color: #0f172a;
  }
  
  :global([data-theme="light"]) .section-description,
  :global([data-theme="light"]) .case-studies-subtitle,
  :global([data-theme="light"]) .case-client,
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
  
  :global([data-theme="light"]) .banner-example,
  :global([data-theme="light"]) .case-description {
    color: #64748b;
  }
  
  :global([data-theme="light"]) .enhanced-case-card {
    background: rgba(255, 255, 255, 0.8);
    border-color: rgba(0, 0, 0, 0.08);
  }
</style>
