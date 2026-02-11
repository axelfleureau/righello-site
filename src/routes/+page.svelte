<script lang="ts">
  import { projects, departments, clients } from '$lib/data/projects';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import GlowCard from '$lib/components/GlowCard.svelte';
  import LogoCarousel from '$lib/components/LogoCarousel.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
  import AnimatedVideoTestimonials from '$lib/components/AnimatedVideoTestimonials.svelte';
  import TestimonialsParallax from '$lib/components/TestimonialsParallax.svelte';
  import StickyScrollReveal from '$lib/components/StickyScrollReveal.svelte';
  import AppleScrolly from '$lib/components/AppleScrolly.svelte';
  import BenefitsSection from '$lib/components/BenefitsSection.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import BackgroundBeams from '$lib/components/BackgroundBeams.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import SocialReelShowcase from '$lib/components/SocialReelShowcase.svelte';
  import HorizontalVideoShowcase from '$lib/components/HorizontalVideoShowcase.svelte';
  import PesoSection from '$lib/components/PesoSection.svelte';
  import RippleGrid from '$lib/components/RippleGrid.svelte';
  import { onMount } from 'svelte';
  
  const homepageServices = departments.map(dept => ({
    id: dept.id,
    title: dept.name,
    description: dept.description,
    icon: dept.icon === 'camera' ? 'sparkles' : dept.icon === 'target' ? 'target' : 'code',
  }));
  
  const videoTestimonials = [
    {
      id: '1',
      clientName: 'Tubaro & Co',
      clientRole: 'Agenzia Immobiliare',
      company: 'Tubaro & Co',
      quote: 'Un\'agenzia che capisce davvero il settore immobiliare.',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_1134.mp4?alt=media&token=636702a8-8849-4eb6-97ce-be802e849bc3',
    },
    {
      id: '2',
      clientName: 'Clara Falomo',
      clientRole: 'Avvocato',
      company: 'Studio Avv. Clara Falomo',
      quote: 'Professionalità e risultati concreti per il mio studio legale.',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_6534.mp4?alt=media&token=946280ac-3891-4a87-989a-d2804ad61080',
    },
    {
      id: '3',
      clientName: 'Ardea',
      clientRole: 'Scuola Nautica e Guida auto',
      company: 'Ardea',
      quote: 'Hanno trasformato la nostra comunicazione digitale.',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8017.mp4?alt=media&token=0f46ee6d-5bcd-4bfc-b341-eb41aae609d1',
    },
    {
      id: '4',
      clientName: '3R Technology',
      clientRole: 'Technology',
      company: '3R Technology',
      quote: 'Marketing digitale efficace per il nostro settore tech.',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8537.mp4?alt=media&token=029ac90a-7f59-4577-9066-b22594257f31',
    },
    {
      id: '5',
      clientName: 'Reguta Vini',
      clientRole: 'Cantina',
      company: 'Reguta Vini',
      quote: 'La strategia social ha portato +180% di engagement.',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8682.mp4?alt=media&token=a4376902-a831-4804-9817-cc6d5ce3cac2',
    },
  ];
  
  const featuredProjects = projects.filter(p => p.featured);
  
  const stats = [
    { value: 470, suffix: '+', label: 'Progetti completati' },
    { value: 25, suffix: 'M+', label: 'Views generate' },
    { value: 98, suffix: '%', label: 'Clienti soddisfatti' },
    { value: 8, suffix: '.5x', label: 'ROAS medio ads' },
  ];
  
  const credibilityBadges = [
    { icon: 'meta', label: 'Meta Partner' },
    { icon: 'google', label: 'Google Partner' },
    { icon: 'star', label: '5.0 Rating' },
  ];
  
  const processSteps = [
    {
      title: 'Discovery & Analisi',
      description: 'Analizziamo il tuo business, il mercato e i competitor. Identifichiamo opportunità di crescita e definiamo KPI chiari e misurabili.',
      icon: '🔍',
    },
    {
      title: 'Strategia & Pianificazione',
      description: 'Creiamo una roadmap personalizzata con obiettivi a breve, medio e lungo termine. Ogni azione è connessa a risultati concreti.',
      icon: '📋',
    },
    {
      title: 'Esecuzione & Ottimizzazione',
      description: 'Implementiamo la strategia con cicli di test continui. A/B testing, analisi dati e ottimizzazione costante per massimizzare i risultati.',
      icon: '🚀',
    },
    {
      title: 'Reporting & Crescita',
      description: 'Dashboard real-time con tutti i KPI. Report settimanali e call strategiche per scalare insieme i risultati ottenuti.',
      icon: '📈',
    },
  ];
  
  import { browser } from '$app/environment';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Righello | Growth Agency – Marketing, Advertising e Digital Experience</title>
  <meta name="description" content="Agenzia di marketing orientata ai risultati. Content & Social Media, Advertising & Performance, Digital Experience. Ogni euro investito, ogni conversione tracciata." />
  <meta property="og:title" content="Righello | Growth Agency – Marketing, Advertising e Digital Experience" />
  <meta property="og:description" content="Agenzia di marketing orientata ai risultati. Content & Social Media, Advertising & Performance, Digital Experience. Ogni euro investito, ogni conversione tracciata." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png" />
  <meta property="og:url" content="https://www.wearerighello.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Righello | Growth Agency – Marketing, Advertising e Digital Experience" />
  <meta name="twitter:description" content="Agenzia di marketing orientata ai risultati. Content & Social Media, Advertising & Performance, Digital Experience. Ogni euro investito, ogni conversione tracciata." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png" />
</svelte:head>

<AppleScrolly {credibilityBadges} />

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section id="risultati" class="section-padding relative overflow-hidden" style="background: var(--bg-secondary);">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">Risultati reali</p>
        <h2 class="section-title max-w-4xl mx-auto">
          Numeri, non <span class="gradient-text">promesse</span>
        </h2>
      </div>
    </RevealOnScroll>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8" style="grid-auto-rows: 1fr;">
      {#each stats as stat, i}
        <RevealOnScroll animation="scale" delay={0} stagger={100} index={i}>
          <div class="glass-card rounded-2xl p-6 md:p-8 text-center hover-lift h-full flex flex-col justify-center">
            <div class="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
              <AnimatedCounter target={stat.value} duration={2000} />{stat.suffix}
            </div>
            <p class="text-sm md:text-base text-[var(--text-secondary)]">{stat.label}</p>
          </div>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<section id="servizi" class="section-padding relative">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">I nostri servizi</p>
        <h2 class="section-title mb-4">Cosa <span class="gradient-text">facciamo</span></h2>
        <p class="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Tre dipartimenti integrati che lavorano insieme per trasformare il tuo marketing in un sistema di crescita misurabile.
        </p>
      </div>
    </RevealOnScroll>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each homepageServices as service, i}
        <RevealOnScroll animation="fly-up" stagger={80} index={i}>
          <GlowCard class="h-full">
            <div class="p-8">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-righello-pink/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {#if service.icon === 'palette'}
                  <svg class="w-7 h-7 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                {:else if service.icon === 'sparkles'}
                  <svg class="w-7 h-7 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                {:else if service.icon === 'code'}
                  <svg class="w-7 h-7 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                {:else if service.icon === 'camera'}
                  <svg class="w-7 h-7 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                {:else if service.icon === 'cpu'}
                  <svg class="w-7 h-7 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                {:else if service.icon === 'target'}
                  <svg class="w-7 h-7 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                {:else}
                  <svg class="w-7 h-7 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                {/if}
              </div>
              <h3 class="text-xl font-semibold mb-3 text-[var(--text-primary)]">{service.title}</h3>
              <p class="text-[var(--text-secondary)] leading-relaxed">{service.description}</p>
            </div>
          </GlowCard>
        </RevealOnScroll>
      {/each}
    </div>
    
    <RevealOnScroll animation="fly-up" delay={400}>
      <div class="text-center mt-12">
        <MagneticButton href="/servizi" variant="secondary">
          Scopri tutti i servizi
          <svg class="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<div style="background: var(--bg-secondary);">
  <HorizontalVideoShowcase 
    title="Creiamo esperienze memorabili"
    subtitle="Video Production"
    description="Video istituzionali, contenuti dimostrativi e proof of work per raccontare il tuo brand"
  />
</div>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<section id="testimonial" class="section-padding relative overflow-hidden">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">Video Recensioni</p>
        <h2 class="section-title mb-4">I clienti <span class="gradient-text">parlano di noi</span></h2>
        <p class="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Guarda le video testimonianze dei nostri clienti e scopri i risultati che abbiamo ottenuto insieme
        </p>
      </div>
    </RevealOnScroll>
  </div>
  
  <AnimatedVideoTestimonials testimonials={videoTestimonials} />
</section>

<section id="clienti" class="section-padding overflow-hidden relative">
  <div class="absolute inset-0 bg-gradient-to-r from-righello-pink/10 via-transparent to-righello-pink/10"></div>
  <div class="absolute top-0 left-0 w-64 h-64 bg-righello-pink/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
  <div class="absolute bottom-0 right-0 w-64 h-64 bg-righello-pink/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
  
  <RevealOnScroll animation="fade">
    <div class="section-container">
      <div class="section-header">
        <p class="section-subtitle">I nostri clienti</p>
        <h2 class="section-title">Chi si fida di <span class="gradient-text">noi</span></h2>
      </div>
    </div>
  </RevealOnScroll>
  
  <LogoCarousel 
    items={clients} 
    speed={60} 
    pauseOnHover={true}
    scaleOnHover={true}
    fadeEdges={false}
    gap={64}
    itemHeight={32}
  />
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<div class="relative" style="background: var(--bg-secondary);">
  <SocialReelShowcase />
</div>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<div style="background: var(--bg-primary);">
  <BenefitsSection />
</div>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section id="metodo" class="relative" style="background: var(--bg-secondary);">
  <StickyScrollReveal 
    title="Il nostro metodo"
    subtitle="Come lavoriamo"
    content={processSteps}
  />
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<PesoSection />

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<div class="relative overflow-hidden">
  <div class="absolute inset-0">
    <RippleGrid 
      gridColor="#D6487E"
      opacity={0.15}
      gridSize={12}
      gridThickness={18}
      rippleIntensity={0.02}
      fadeDistance={1.8}
      vignetteStrength={2.5}
      glowIntensity={0.1}
      mouseInteraction={true}
      mouseInteractionRadius={1.2}
    />
  </div>
  <FAQ />
</div>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section id="contattaci" class="section-padding relative overflow-hidden" style="background: var(--bg-secondary);">
  <div class="absolute inset-0 cta-gradient"></div>
  
  <div class="section-container relative z-10">
    <RevealOnScroll animation="scale">
      <div class="glass-card rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto">
        <h2 class="heading-lg mb-6">
          Pronto a <span class="gradient-text">crescere?</span>
        </h2>
        <p class="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
          Ogni mese che passa senza una strategia è fatturato lasciato sul tavolo. Parliamo dei tuoi obiettivi e creiamo un piano d'azione concreto.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <MagneticButton href="/contatti" variant="primary" class="text-lg px-8 py-4">
            Prenota una call gratuita
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .cta-gradient {
    background: 
      radial-gradient(ellipse at center, rgba(214, 72, 126, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 80%, rgba(214, 72, 126, 0.1) 0%, transparent 50%);
  }
  
  @media (max-width: 768px) {
    .heading-lg {
      font-size: 2rem;
    }
  }
</style>
