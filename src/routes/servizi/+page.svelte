<script lang="ts">
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import InteractiveTimeline from '$lib/components/InteractiveTimeline.svelte';
  import SwingingIcon from '$lib/components/SwingingIcon.svelte';
  import StickyNote from '$lib/components/StickyNote.svelte';
  import Highlight from '$lib/components/Highlight.svelte';
  import TechWord from '$lib/components/TechWord.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  
  const timelinePhases = [
    {
      name: 'Strategia',
      color: 'bg-righello-pink',
      items: [
        { name: 'Discovery', color: 'bg-righello-pink', offset: 5 },
        { name: 'Analisi mercato', color: 'bg-righello-pink', offset: 15 },
        { name: 'Definizione obiettivi', color: 'bg-righello-pink', offset: 25 }
      ]
    },
    {
      name: 'Design',
      color: 'bg-gray-800',
      items: [
        { name: 'Wireframe', color: 'bg-gray-700', offset: 20 },
        { name: 'User Testing', color: 'bg-gray-600', offset: 30 },
        { name: 'Look & Feel', color: 'bg-gray-700', offset: 40 },
        { name: 'UI Design', color: 'bg-gray-800', offset: 50 },
        { name: 'User Testing', color: 'bg-gray-600', offset: 60 },
        { name: 'Design System', color: 'bg-gray-800', offset: 70 }
      ]
    },
    {
      name: 'Sviluppo Web',
      color: 'bg-blue-600',
      items: [
        { name: 'Architettura', color: 'bg-blue-600', offset: 35 },
        { name: 'Frontend', color: 'bg-blue-600', offset: 50 },
        { name: 'Backend', color: 'bg-blue-500', offset: 60 },
        { name: 'QA', color: 'bg-cyan-600', offset: 75 },
        { name: 'QA', color: 'bg-cyan-600', offset: 80 },
        { name: 'Launch', color: 'bg-green-600', offset: 90 }
      ]
    },
    {
      name: 'Sviluppo App',
      color: 'bg-purple-600',
      items: [
        { name: 'UX Mobile', color: 'bg-purple-600', offset: 25 },
        { name: 'Prototipo', color: 'bg-purple-500', offset: 40 },
        { name: 'Sviluppo nativo', color: 'bg-purple-600', offset: 55 },
        { name: 'Testing', color: 'bg-purple-500', offset: 70 },
        { name: 'Store submission', color: 'bg-green-600', offset: 85 }
      ]
    },
    {
      name: 'Content & Shooting',
      color: 'bg-orange-500',
      items: [
        { name: 'Concept creativo', color: 'bg-orange-500', offset: 10 },
        { name: 'Shooting foto', color: 'bg-orange-500', offset: 30 },
        { name: 'Shooting video', color: 'bg-orange-400', offset: 45 },
        { name: 'Post-produzione', color: 'bg-orange-500', offset: 60 },
        { name: 'Consegna materiali', color: 'bg-orange-400', offset: 80 }
      ]
    },
    {
      name: 'Marketing',
      color: 'bg-green-600',
      items: [
        { name: 'Piano editoriale', color: 'bg-green-600', offset: 15 },
        { name: 'Campagne Ads', color: 'bg-green-500', offset: 35 },
        { name: 'SEO/SEM', color: 'bg-green-600', offset: 50 },
        { name: 'Analytics', color: 'bg-green-500', offset: 65 },
        { name: 'Ottimizzazione', color: 'bg-green-600', offset: 80 },
        { name: 'Scaling', color: 'bg-green-500', offset: 92 }
      ]
    }
  ];
  
  const serviceCategories = [
    {
      title: 'Digital Strategy',
      items: ['Analisi di mercato', 'Brand positioning', 'Digital advertising', 'Influencer marketing']
    },
    {
      title: 'Siti Web',
      items: ['Siti web aziendali', 'E-commerce', 'Landing page', 'Web app']
    },
    {
      title: 'Creative Design',
      items: ['UI/UX Design', 'Brand identity', 'Graphic design', 'Design system']
    },
    {
      title: 'Social Media Marketing',
      items: ['Piano editoriale', 'Community management', 'Campagne ads', 'Analytics']
    },
    {
      title: 'Shooting e Video',
      items: ['Video istituzionali', 'Fotografia prodotto', 'Reels e contenuti social', 'Post-produzione']
    },
    {
      title: 'Web Development',
      items: ['Frontend', 'Backend', 'Mobile app', 'Software custom']
    }
  ];
</script>

<svelte:head>
  <title>Servizi - Righello</title>
  <meta name="description" content="I nostri servizi: strategia, design, sviluppo e content. Soluzioni su misura per far crescere il tuo business." />
</svelte:head>

<section class="py-16">
  <div class="section-container">
    <div class="max-w-4xl">
      <ScrollReveal animation="fade-up">
        <h1 class="heading-xl mb-6 uppercase"><Highlight variant="pink">SOLUZIONI SU MISURA</Highlight></h1>
      </ScrollReveal>
      <ScrollReveal animation="fade-up" delay={100}>
        <p class="text-xl md:text-2xl mb-8" style="color: var(--text-secondary);">
          Strategie di <TechWord highlight>marketing</TechWord> e prodotti digitali costruiti per crescere con il tuo <TechWord>business</TechWord>.
        </p>
      </ScrollReveal>
    </div>
  </div>
</section>

<section class="py-8">
  <div class="section-container">
    <ScrollReveal animation="fade-up">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight" style="color: var(--text-primary);">
        Strategia. Marketing.<br/>
        Design. Sviluppo.
      </h2>
    </ScrollReveal>
  </div>
</section>

<section class="py-12 overflow-hidden">
  <div class="section-container">
    <ScrollReveal>
      <InteractiveTimeline phases={timelinePhases} />
    </ScrollReveal>
  </div>
</section>

<section class="py-20 bg-black text-white">
  <div class="section-container">
    <ScrollReveal animation="fade-up">
      <p class="text-sm uppercase tracking-widest text-gray-400 mb-4">COSA FACCIAMO</p>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-black mb-16 leading-tight">
        Servizi agenzia Web<br/>e Marketing
      </h2>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
      {#each serviceCategories as category, i}
        <ScrollReveal animation="fade-up" delay={i * 100}>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-white">{category.title}</h3>
            <ul class="space-y-2">
              {#each category.items as item}
                <li class="text-gray-400 hover:text-white transition-colors cursor-default">{item}</li>
              {/each}
            </ul>
          </div>
        </ScrollReveal>
      {/each}
    </div>
    
    <ScrollReveal animation="fade-up" delay={600}>
      <div class="mt-16">
        <MagneticButton href="/contatti" variant="outline-white">
          Scopri i servizi
        </MagneticButton>
      </div>
    </ScrollReveal>
  </div>
</section>

<section class="py-32 md:py-40 relative overflow-visible min-h-[600px] md:min-h-[700px]">
  <div class="section-container">
    <div class="absolute top-4 right-4 md:top-10 md:right-10">
      <StickyNote variant="pink" rotation={-3}>
        Soluzioni creative! ✨
      </StickyNote>
    </div>
    
    <div class="absolute bottom-4 left-4 md:bottom-16 md:left-10">
      <StickyNote variant="black" rotation={5}>
        Innovazione 🚀
      </StickyNote>
    </div>
    
    <ScrollReveal animation="scale">
      <div class="bg-black rounded-3xl p-12 md:p-20 lg:p-24 text-white text-center relative overflow-hidden">
        <div class="relative z-10">
          <h2 class="heading-lg mb-6 uppercase"><Highlight variant="white">INIZIAMO INSIEME?</Highlight></h2>
          <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Ogni grande progetto inizia con una <TechWord>conversazione</TechWord>. Parliamo del tuo.
          </p>
          <MagneticButton href="/contatti" variant="primary">
            Contattaci
            <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>
