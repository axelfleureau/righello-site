<script lang="ts">
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import ServiceTabs from '$lib/components/ServiceTabs.svelte';
  import GlowCard from '$lib/components/GlowCard.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import { departments as baseDepartments } from '$lib/data/projects';
  
  const departments = baseDepartments.map(dept => ({
    ...dept,
    features: dept.id === 'content-social' 
      ? ['Piano editoriale mensile', 'Report analytics', 'A/B testing contenuti', 'Trend analysis', 'Community management', 'Crisis management']
      : dept.id === 'advertising'
      ? ['Setup pixel completo', 'Dashboard real-time', 'A/B testing', 'Audience building', 'Retargeting avanzato', 'Budget optimization']
      : ['UX Research', 'Prototipi interattivi', 'Design responsive', 'SEO tecnico', 'Performance optimization', 'Manutenzione evolutiva']
  }));
  
  const methodology = [
    { num: '01', title: 'Analisi', desc: 'Studiamo il mercato, i competitor e i dati esistenti per definire la strategia.' },
    { num: '02', title: 'Strategia', desc: 'Definiamo obiettivi, KPI e roadmap con milestone misurabili.' },
    { num: '03', title: 'Esecuzione', desc: 'Implementiamo con agilità, testando e ottimizzando costantemente.' },
    { num: '04', title: 'Scaling', desc: 'Scaliamo ciò che funziona, eliminando ciò che non performa.' },
  ];
  
  const strengths = [
    { icon: '📈', title: 'Orientamento ai numeri', desc: 'Ogni decisione è basata su dati. Ogni risultato è tracciato e misurabile.' },
    { icon: '🎯', title: 'Full-funnel approach', desc: 'Dalla awareness alla conversione, gestiamo l\'intero percorso del cliente.' },
    { icon: '🤝', title: 'Team dedicato', desc: 'Un referente unico che coordina specialisti di ogni dipartimento.' },
  ];
</script>

<svelte:head>
  <title>Servizi - Righello | Marketing, Advertising & Digital Experience</title>
  <meta name="description" content="I nostri servizi: Content & Social Media, Advertising & Performance, Digital Experience. Soluzioni complete per la crescita del tuo business." />
</svelte:head>

<section class="pt-32 pb-20 md:pt-40 md:pb-28">
  <div class="section-container">
    <div class="max-w-4xl">
      <RevealOnScroll animation="fly-up">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">I nostri servizi</p>
        <h1 class="heading-xl mb-6">
          Tre dipartimenti,<br/>
          <span class="gradient-text">un unico obiettivo.</span>
        </h1>
      </RevealOnScroll>
      <RevealOnScroll animation="fly-up" delay={100}>
        <p class="text-xl md:text-2xl mb-8 text-[var(--text-secondary)]">
          Combiniamo creatività, dati e tecnologia per costruire strategie di crescita 
          <span class="text-righello-pink font-medium">misurabili</span> e 
          <span class="text-cyan-400 font-medium">scalabili</span>.
        </p>
      </RevealOnScroll>
    </div>
  </div>
</section>

<section class="pb-24 md:pb-32">
  <div class="section-container">
    <ServiceTabs {departments} />
  </div>
</section>

<section class="section-padding" style="background: var(--bg-secondary);">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Il nostro approccio</p>
        <h2 class="heading-lg">
          Metodologia <span class="gradient-text">data-driven</span>
        </h2>
      </div>
    </RevealOnScroll>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each methodology as step, i}
        <RevealOnScroll animation="fly-up" stagger={100} index={i}>
          <GlowCard class="h-full">
            <div class="p-6">
              <span class="text-5xl font-black text-white/10">{step.num}</span>
              <h3 class="text-xl font-bold mt-2 mb-3 text-white">{step.title}</h3>
              <p class="text-[var(--text-secondary)]">{step.desc}</p>
            </div>
          </GlowCard>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Perché Righello</p>
        <h2 class="heading-lg mb-6">
          I nostri <span class="gradient-text">punti di forza</span>
        </h2>
      </div>
    </RevealOnScroll>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each strengths as point, i}
        <RevealOnScroll animation="scale" stagger={100} index={i}>
          <div class="text-center">
            <span class="text-5xl mb-4 block">{point.icon}</span>
            <h3 class="text-xl font-bold mb-3">{point.title}</h3>
            <p class="text-[var(--text-secondary)]">{point.desc}</p>
          </div>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding" style="background: var(--bg-secondary);">
  <div class="section-container">
    <RevealOnScroll animation="scale">
      <div class="relative rounded-3xl overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-righello-pink via-[#8B5CF6] to-cyan-500"></div>
        <div class="absolute inset-0 noise-overlay opacity-20"></div>
        
        <div class="relative z-10 p-12 md:p-20 text-center">
          <h2 class="heading-lg text-white mb-6">
            Parliamo del tuo <span class="font-black">progetto</span>
          </h2>
          <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            Prenota una call gratuita per analizzare insieme le opportunità di crescita.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a 
              href="/contatti" 
              class="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Richiedi una consulenza
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  </div>
</section>
