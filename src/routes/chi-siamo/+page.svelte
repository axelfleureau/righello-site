<script lang="ts">
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
  import ProfileCard from '$lib/components/ProfileCard.svelte';
  import Highlight from '$lib/components/Highlight.svelte';
  import TechWord from '$lib/components/TechWord.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import LanyardBadge from '$lib/components/LanyardBadge.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  
  const team = [
    {
      name: 'Edis Bali',
      role: 'CEO & Co-Founder',
      description: 'Visione strategica e leadership. Trasforma obiettivi di business in roadmap concrete.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Paolo Aileni',
      role: 'COO & Co-Founder',
      description: 'Operations e project management. Garantisce delivery puntuale e qualità costante.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    },
    {
      name: 'Axel N. L. Fleureau',
      role: 'CTO & Co-Founder',
      description: 'Architettura tecnica e sviluppo. Dal design system al codice production-ready.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    },
    {
      name: 'Omar ElKharroubi',
      role: 'Agente di Commercio',
      description: 'Sviluppo business e relazioni. Collega le esigenze dei clienti alle nostre soluzioni.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    },
  ];
  
  const departments = [
    {
      title: 'Marketing & Social Media',
      subtitle: 'Il nostro cavallo di battaglia',
      description: 'Strategie di marketing, piano editoriale, shooting, video, copy. Contenuti che generano engagement misurabile e community attive.',
      icon: '🎬',
      highlight: true,
    },
    {
      title: 'Advertising & Automazione',
      subtitle: 'ROAS tracciabile + processi automatizzati',
      description: 'Campagne Meta, Google, TikTok. Budget ottimizzati, conversioni tracciate, workflow automatizzati e scaling data-driven.',
      icon: '📈',
      highlight: false,
    },
    {
      title: 'Sviluppo Web & Software',
      subtitle: 'Design + Performance + Codice',
      description: 'Siti web, e-commerce, web app e software custom. Mobile-first, SEO integrato, automazioni intelligenti.',
      icon: '💻',
      highlight: false,
    },
  ];
  
  const workflow = [
    {
      step: '01',
      title: 'Strategia',
      description: 'Definiamo obiettivi chiari, KPI misurabili, target e competitor. Brief tecnico prima di ogni azione.',
    },
    {
      step: '02',
      title: 'Produzione',
      description: 'Shooting, video, copy, design. Contenuti calibrati per ogni canale e formato.',
    },
    {
      step: '03',
      title: 'Distribuzione',
      description: 'Formati ottimizzati per ogni piattaforma. Calendario editoriale e pubblicazione sincronizzata.',
    },
    {
      step: '04',
      title: 'Ottimizzazione AI & Scaling',
      description: 'Test, learn, scale. Insight AI-powered, ottimizzazione continua, crescita sostenibile.',
    },
  ];
  
  const values = [
    {
      title: 'Dati Prima di Tutto',
      description: 'Ogni decisione è supportata da numeri. No intuizioni, solo evidenze.',
      icon: '📊',
    },
    {
      title: 'Trasparenza Totale',
      description: 'Dashboard condivise, report settimanali, comunicazione diretta.',
      icon: '🔍',
    },
    {
      title: 'Ownership Completa',
      description: 'Codice, design, asset: tutto è di proprietà del cliente.',
      icon: '🔑',
    },
    {
      title: 'Mobile-First',
      description: 'Il 70%+ del traffico è mobile. Progettiamo per smartphone, sempre.',
      icon: '📱',
    },
  ];
  
  const stats = [
    { value: 50, suffix: '+', label: 'Progetti completati' },
    { value: 30, suffix: '+', label: 'Clienti attivi' },
    { value: 3, suffix: '', label: 'Dipartimenti integrati' },
  ];
</script>

<svelte:head>
  <title>Chi Siamo | Righello – Growth Agency Nord Italia</title>
  <meta name="description" content="Growth agency con sede a Mestre, Venezia. Esperti in marketing digitale, sviluppo web e automazione. Operiamo nel Nord Italia e all'estero." />
  <meta property="og:title" content="Chi Siamo | Righello – Growth Agency Nord Italia" />
  <meta property="og:description" content="Growth agency con sede a Mestre, Venezia. Esperti in marketing digitale, sviluppo web e automazione. Operiamo nel Nord Italia e all'estero." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png" />
  <meta property="og:url" content="https://www.wearerighello.com/chi-siamo" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Chi Siamo | Righello – Growth Agency Nord Italia" />
  <meta name="twitter:description" content="Growth agency con sede a Mestre, Venezia. Esperti in marketing digitale, sviluppo web e automazione. Operiamo nel Nord Italia e all'estero." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png" />
</svelte:head>

<section id="chi-siamo-hero" class="pt-20 pb-8 md:pt-32 md:pb-20">
  <div class="section-container">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
      <div class="order-2 lg:order-1">
        <ScrollReveal animation="fade-up">
          <p class="section-subtitle text-left">Chi Siamo</p>
          <h1 class="section-title text-left mb-6">
            <span class="block">Crescita Misurabile.</span>
            <span class="block"><Highlight variant="pink">Nessuna Promessa Vuota.</Highlight></span>
          </h1>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={100}>
          <p class="text-lg md:text-xl mb-6" style="color: var(--text-secondary);">
            Siamo una <TechWord>growth agency</TechWord> specializzata in marketing digitale, sviluppo web e automazione. Tre Co-Founder con competenze complementari — strategia, creatività e tecnologia — con base nel Nord Italia e progetti in tutta Europa.
          </p>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={200}>
          <p class="text-lg md:text-xl mb-8" style="color: var(--text-secondary);">
            Il nostro approccio? <TechWord highlight>Zero dispersioni</TechWord>. Un interlocutore unico, KPI condivisi, risultati tracciabili. Non vendiamo ore, vendiamo crescita.
          </p>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={300}>
          <div class="flex flex-col sm:flex-row gap-4">
            <MagneticButton href="/contatti" variant="primary">
              Parliamone
              <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
            <MagneticButton href="/servizi" variant="secondary">
              Scopri i servizi
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
      
      <div class="order-1 lg:order-2 flex justify-center">
        <ScrollReveal animation="scale" delay={200}>
          <LanyardBadge 
            logoSrc="/logo-white.png"
            title="RIGHELLO"
            subtitle="Growth Agency"
          />
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<div class="mt-16 md:mt-24">
  <SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />
</div>

<section id="team" class="section-padding" style="background-color: var(--bg-secondary);">
  <div class="section-container">
    <ScrollReveal>
      <div class="section-header">
        <p class="section-subtitle">Il Team</p>
        <h2 class="section-title text-center mb-4">I Volti di Righello</h2>
        <p class="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12" style="color: var(--text-secondary);">
          Tre Co-Founder, competenze complementari, un obiettivo comune: far crescere il tuo business.
        </p>
      </div>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {#each team as member, i}
        <ScrollReveal animation="fade-up" delay={i * 100}>
          <div class="team-card group">
            <div class="relative overflow-hidden rounded-2xl mb-4">
              <img 
                src={member.image} 
                alt={member.name}
                class="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 class="text-xl font-bold mb-1">{member.name}</h3>
            <p class="text-righello-pink font-medium mb-2">{member.role}</p>
            <p class="text-base" style="color: var(--text-secondary);">{member.description}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<section id="dipartimenti" class="section-padding">
  <div class="section-container">
    <ScrollReveal>
      <div class="section-header">
        <p class="section-subtitle">I 3 Dipartimenti</p>
        <h2 class="section-title text-center mb-4">Tre Anime, Un Unico Team</h2>
        <p class="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12" style="color: var(--text-secondary);">
          Marketing, Advertising e Sviluppo Software: competenze integrate per progetti completi.
        </p>
      </div>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {#each departments as dept, i}
        <ScrollReveal animation="fade-up" delay={i * 100}>
          <div 
            class="department-card p-6 md:p-8 rounded-2xl border transition-all duration-300 h-full {dept.highlight ? 'featured' : ''}"
            style="background-color: var(--bg-secondary); border-color: {dept.highlight ? 'var(--righello-pink)' : 'var(--border-color)'};"
          >
            {#if dept.highlight}
              <span class="inline-block px-3 py-1 text-sm font-medium bg-righello-pink text-white rounded-full mb-4">
                Cavallo di Battaglia
              </span>
            {/if}
            <div class="text-4xl mb-4">{dept.icon}</div>
            <h3 class="text-xl md:text-2xl font-bold mb-2">{dept.title}</h3>
            <p class="text-righello-pink font-medium mb-3">{dept.subtitle}</p>
            <p class="text-base" style="color: var(--text-secondary);">{dept.description}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section class="section-padding" style="background-color: var(--bg-secondary);">
  <div class="section-container">
    <ScrollReveal>
      <div class="section-header">
        <p class="section-subtitle">Come Lavoriamo</p>
        <h2 class="section-title text-center mb-4">Il Nostro Workflow</h2>
        <p class="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12" style="color: var(--text-secondary);">
          4 step chiari, risultati tracciabili. Dalla strategia allo scaling.
        </p>
      </div>
    </ScrollReveal>
    
    <div class="workflow-grid">
      {#each workflow as step, i}
        <ScrollReveal animation="fade-up" delay={i * 100}>
          <div class="workflow-step group">
            <div class="step-number">{step.step}</div>
            <div class="step-content">
              <h3 class="text-xl md:text-2xl font-bold mb-2 group-hover:text-righello-pink transition-colors">{step.title}</h3>
              <p class="text-base" style="color: var(--text-secondary);">{step.description}</p>
            </div>
            {#if i < workflow.length - 1}
              <div class="step-connector hidden md:block"></div>
            {/if}
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<section class="section-padding">
  <div class="section-container">
    <ScrollReveal>
      <div class="section-header">
        <p class="section-subtitle">I Nostri Valori</p>
        <h2 class="section-title text-center mb-4">Cosa Ci Guida</h2>
        <p class="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12" style="color: var(--text-secondary);">
          Principi concreti, non buzzword. Ecco come lavoriamo.
        </p>
      </div>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each values as value, i}
        <ScrollReveal animation="fade-up" delay={i * 100}>
          <div class="value-card p-6 rounded-2xl border transition-all duration-300 hover:border-righello-pink/50 h-full" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
            <div class="text-3xl mb-4">{value.icon}</div>
            <h3 class="text-lg font-bold mb-2">{value.title}</h3>
            <p class="text-base" style="color: var(--text-secondary);">{value.description}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section class="section-padding" style="background-color: var(--bg-secondary);">
  <div class="section-container">
    <ScrollReveal>
      <div class="section-header">
        <p class="section-subtitle">I Numeri</p>
        <h2 class="section-title text-center mb-12">Il Nostro Impatto</h2>
      </div>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center">
      {#each stats as stat, i}
        <ScrollReveal animation="scale" delay={i * 100}>
          <div class="p-8 group rounded-2xl transition-colors duration-300" style="background-color: var(--bg-primary);">
            <div class="text-5xl md:text-6xl font-bold text-righello-pink mb-4">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2000} />
            </div>
            <p class="text-base" style="color: var(--text-secondary);">{stat.label}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="black" />

<section class="section-padding bg-black text-white">
  <div class="section-container text-center">
    <ScrollReveal animation="fade-up">
      <div class="section-header">
        <h2 class="section-title mb-4"><Highlight variant="white">Pronto a Crescere?</Highlight></h2>
      </div>
    </ScrollReveal>
    <ScrollReveal animation="fade-up" delay={100}>
      <p class="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        Risposta garantita in 72 ore. Parliamo del tuo progetto e vediamo come possiamo aiutarti.
      </p>
    </ScrollReveal>
    <ScrollReveal animation="fade-up" delay={200}>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <MagneticButton href="/contatti" variant="primary">
          Contattaci Ora
          <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </MagneticButton>
        <MagneticButton href="mailto:hello@wearerighello.com" variant="secondary">
          hello@wearerighello.com
        </MagneticButton>
      </div>
    </ScrollReveal>
    <ScrollReveal animation="fade-up" delay={300}>
      <p class="text-gray-500 mt-8 text-base">
        Via Pio X 21, Mestre - Venezia
      </p>
    </ScrollReveal>
  </div>
</section>

<style>
  .team-card {
    text-align: center;
  }
  
  .department-card.featured {
    position: relative;
    box-shadow: 0 0 30px rgba(214, 72, 126, 0.15);
  }
  
  .workflow-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .workflow-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
    }
  }
  
  .workflow-step {
    position: relative;
    padding: 1.5rem;
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .workflow-step {
      text-align: left;
      padding: 1.5rem 2rem;
    }
  }
  
  .step-number {
    font-size: 3rem;
    font-weight: 800;
    color: var(--righello-pink);
    opacity: 0.3;
    line-height: 1;
    margin-bottom: 1rem;
  }
  
  .step-connector {
    position: absolute;
    top: 2rem;
    right: 0;
    width: 2rem;
    height: 2px;
    background: linear-gradient(90deg, var(--righello-pink), transparent);
    transform: translateX(50%);
  }
  
  .value-card:hover {
    transform: translateY(-4px);
  }
</style>
