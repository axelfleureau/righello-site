<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import AnimatedCounter from './AnimatedCounter.svelte';
  
  export let title = "Perché scegliere Righello?";
  export let subtitle = "I vantaggi";
  
  const benefits = [
    {
      icon: 'chart',
      title: 'ROI Misurabile',
      description: 'Ogni euro investito tracciato. Dashboard in tempo reale con KPI chiari.',
      stat: { value: 340, suffix: '%', label: 'ROI medio' },
    },
    {
      icon: 'target',
      title: 'Strategia Data-Driven',
      description: 'Decisioni basate sui dati, non sulle sensazioni. A/B testing continuo.',
      stat: { value: 85, suffix: '%', label: 'Conversioni migliorate' },
    },
    {
      icon: 'rocket',
      title: 'Crescita Scalabile',
      description: 'Processi replicabili e automazioni che scalano con il tuo business.',
      stat: { value: 3, suffix: 'x', label: 'Crescita media' },
    },
    {
      icon: 'shield',
      title: 'Team Dedicato',
      description: 'Un team di specialisti verticali, non generalisti. Esperti in ogni area.',
      stat: { value: 15, suffix: '+', label: 'Specialisti' },
    },
  ];
  
  const comparison = {
    before: [
      'Post senza strategia',
      'Budget pubblicitario sprecato',
      'Zero tracciamento conversioni',
      'Report mensili vaghi',
      'Creatività inconsistente',
    ],
    after: [
      'Content calendar strategico',
      'ROAS ottimizzato costantemente',
      'Pixel e tracking avanzato',
      'Dashboard real-time',
      'Brand identity coerente',
    ],
  };
</script>

<section class="benefits-section">
  <div class="section-container">
    <div class="text-center mb-16">
      <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4 font-medium">
        {subtitle}
      </p>
      <h2 class="heading-lg max-w-3xl mx-auto">
        {title.split(' ').slice(0, -1).join(' ')} <span class="gradient-text">{title.split(' ').slice(-1)}</span>
      </h2>
    </div>
    
    <div class="benefits-grid">
      {#each benefits as benefit, i}
        <div class="benefit-card glass-card" style="--index: {i}">
          <div class="icon-wrapper">
            {#if benefit.icon === 'chart'}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            {:else if benefit.icon === 'target'}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            {:else if benefit.icon === 'rocket'}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            {:else if benefit.icon === 'shield'}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            {/if}
          </div>
          
          <h3 class="text-xl font-semibold text-[var(--text-primary)] mb-3">{benefit.title}</h3>
          <p class="text-[var(--text-secondary)] mb-6 leading-relaxed">{benefit.description}</p>
          
          <div class="stat-display">
            <span class="stat-value gradient-text">
              <AnimatedCounter target={benefit.stat.value} duration={2000} />{benefit.stat.suffix}
            </span>
            <span class="stat-label">{benefit.stat.label}</span>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="comparison-section">
      <h3 class="text-2xl md:text-3xl font-bold text-center mb-12">
        <span class="text-[var(--text-primary)]">Prima vs </span>
        <span class="gradient-text">Dopo</span>
      </h3>
      
      <div class="comparison-grid">
        <div class="comparison-column before">
          <div class="column-header">
            <span class="header-icon before-icon">✕</span>
            <span>Prima</span>
          </div>
          <ul class="comparison-list">
            {#each comparison.before as item}
              <li class="comparison-item before-item">
                <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
        
        <div class="comparison-divider">
          <div class="divider-line"></div>
          <div class="divider-arrow">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <div class="divider-line"></div>
        </div>
        
        <div class="comparison-column after">
          <div class="column-header">
            <span class="header-icon after-icon">✓</span>
            <span>Dopo</span>
          </div>
          <ul class="comparison-list">
            {#each comparison.after as item}
              <li class="comparison-item after-item">
                <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .benefits-section {
    padding: var(--section-padding-sm) 0;
    position: relative;
  }
  
  @media (min-width: 768px) {
    .benefits-section {
      padding: var(--section-padding-md) 0;
    }
  }
  
  @media (min-width: 1024px) {
    .benefits-section {
      padding: var(--section-padding-lg) 0;
    }
  }
  
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    margin-bottom: 5rem;
  }
  
  @media (min-width: 640px) {
    .benefits-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .benefits-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .benefit-card {
    padding: 2rem;
    border-radius: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  
  .benefit-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 0 60px rgba(214, 72, 126, 0.1);
  }
  
  .icon-wrapper {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1rem;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.2), rgba(6, 182, 212, 0.2));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: #D6487E;
    transition: transform 0.3s ease;
  }
  
  .benefit-card:hover .icon-wrapper {
    transform: scale(1.1);
  }
  
  .stat-display {
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }
  
  .comparison-section {
    padding: 4rem 0;
  }
  
  .comparison-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  @media (min-width: 768px) {
    .comparison-grid {
      flex-direction: row;
      align-items: stretch;
      gap: 1.5rem;
    }
  }
  
  .comparison-column {
    flex: 1;
    padding: 2.5rem;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  :global([data-theme="light"]) .comparison-column {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }
  
  .comparison-column.before {
    border-color: rgba(239, 68, 68, 0.2);
  }
  
  .comparison-column.after {
    border-color: rgba(16, 185, 129, 0.2);
    background: rgba(16, 185, 129, 0.05);
  }
  
  :global([data-theme="light"]) .comparison-column.before {
    border-color: rgba(239, 68, 68, 0.3);
    background: rgba(239, 68, 68, 0.03);
  }
  
  :global([data-theme="light"]) .comparison-column.after {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.08);
  }
  
  .column-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .header-icon {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }
  
  .before-icon {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }
  
  .after-icon {
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
  }
  
  .comparison-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .comparison-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .before-item {
    text-decoration: line-through;
    opacity: 0.7;
  }
  
  .after-item {
    color: var(--text-primary);
  }
  
  .comparison-divider {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
  }
  
  @media (min-width: 768px) {
    .comparison-divider {
      display: flex;
    }
  }
  
  .divider-line {
    width: 2px;
    flex: 1;
    background: linear-gradient(to bottom, transparent, var(--border-color), transparent);
  }
  
  .divider-arrow {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 1rem 0;
  }
</style>
