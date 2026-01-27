<script lang="ts">
  import BentoGrid from './BentoGrid.svelte';
  import CardFlip from './CardFlip.svelte';
  import StatCard from './StatCard.svelte';
  import CaseStudyCard from './CaseStudyCard.svelte';
  import RevealOnScroll from './RevealOnScroll.svelte';
  
  const pesoCards = [
    {
      id: 'paid',
      title: 'Paid Media',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>`,
      back: 'Campagne Meta Ads, Google Ads e TikTok con ottimizzazione ROAS continua. Budget gestiti con precisione chirurgica per massimizzare ogni euro investito.',
      color: '#D6487E'
    },
    {
      id: 'earned',
      title: 'Earned Media',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path d="M9 12h6" />
      </svg>`,
      back: 'PR digitale, influencer marketing strategico e UGC autentici. Costruiamo credibilità attraverso voci esterne che amplificano il tuo brand.',
      color: '#06B6D4'
    },
    {
      id: 'shared',
      title: 'Shared Media',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>`,
      back: 'Gestione social media che genera engagement reale. Community building, content virali e strategie che trasformano follower in brand ambassador.',
      color: '#A855F7'
    },
    {
      id: 'owned',
      title: 'Owned Media',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>`,
      back: 'Siti web ad alta conversione, landing page ottimizzate, email marketing automation. Asset digitali che lavorano 24/7 per il tuo business.',
      color: '#22C55E'
    }
  ];
  
  const caseStudies = [
    {
      title: 'E-commerce Growth +340%',
      client: 'Reguta Wines',
      image: '/projects/reguta-cover.jpg',
      pesoTags: [{type: 'P' as const, label: 'Paid'}, {type: 'O' as const, label: 'Owned'}],
      result: '+340% vendite',
      href: '/progetti/reguta'
    },
    {
      title: 'Lead Generation B2B',
      client: '3R Technology',
      image: '/projects/3r-cover.jpg',
      pesoTags: [{type: 'P' as const, label: 'Paid'}, {type: 'E' as const, label: 'Earned'}],
      result: '+180% lead',
      href: '/progetti/3r-technology'
    }
  ];
</script>

<section class="peso-section section-padding">
  <div class="section-container">
    <RevealOnScroll>
      <div class="section-header">
        <span class="section-subtitle">Il Metodo</span>
        <h2 class="section-title">PESO Framework</h2>
        <p class="section-description">
          Un approccio integrato che unisce Paid, Earned, Shared e Owned media 
          per creare ecosistemi di marketing che si amplificano a vicenda.
        </p>
      </div>
    </RevealOnScroll>
    
    <RevealOnScroll delay={200}>
      <BentoGrid className="peso-grid">
        {#each pesoCards as card}
          <CardFlip 
            frontTitle={card.title}
            frontIcon={card.icon}
            backContent={card.back}
            color={card.color}
          />
        {/each}
      </BentoGrid>
    </RevealOnScroll>
    
    <RevealOnScroll delay={300}>
      <div class="stats-row">
        <StatCard 
          value={54}
          suffix="%"
          label="Aumento medio ROAS"
          color="#D6487E"
        />
        <StatCard 
          value={91}
          suffix="%"
          label="Retention clienti"
          color="#06B6D4"
        />
        <StatCard 
          value={3}
          suffix="x"
          label="Crescita engagement"
          color="#A855F7"
        />
        <StatCard 
          value={24}
          suffix="/7"
          label="Monitoraggio attivo"
          color="#22C55E"
        />
      </div>
    </RevealOnScroll>
    
    <RevealOnScroll delay={400}>
      <div class="case-studies-header">
        <h3 class="case-studies-title">Case Studies</h3>
        <a href="/progetti" class="view-all-link">
          Vedi tutti
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      
      <div class="case-studies-grid">
        {#each caseStudies as study}
          <CaseStudyCard 
            title={study.title}
            client={study.client}
            image={study.image}
            pesoTags={study.pesoTags}
            result={study.result}
            href={study.href}
          />
        {/each}
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .peso-section {
    background: var(--bg-secondary, #0a0a0a);
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
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
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
  }
  
  .peso-grid {
    margin-bottom: 2rem;
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
  
  .case-studies-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  
  .case-studies-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary, #fff);
    margin: 0;
  }
  
  .view-all-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #D6487E;
    text-decoration: none;
    transition: gap 0.3s;
  }
  
  .view-all-link:hover {
    gap: 0.75rem;
  }
  
  .view-all-link svg {
    width: 16px;
    height: 16px;
  }
  
  .case-studies-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  @media (min-width: 768px) {
    .case-studies-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  :global([data-theme="light"]) .peso-section {
    background: var(--bg-secondary, #f1f5f9);
  }
  
  :global([data-theme="light"]) .section-title {
    color: #0f172a;
  }
  
  :global([data-theme="light"]) .section-description {
    color: #475569;
  }
  
  :global([data-theme="light"]) .case-studies-title {
    color: #0f172a;
  }
</style>
