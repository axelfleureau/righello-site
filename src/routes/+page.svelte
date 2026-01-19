<script lang="ts">
  import { projects, departments, clients } from '$lib/data/projects';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import GlowCard from '$lib/components/GlowCard.svelte';
  import InfiniteMarquee from '$lib/components/InfiniteMarquee.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
  import VideoTestimonials from '$lib/components/VideoTestimonials.svelte';
  import AppleScrolly from '$lib/components/AppleScrolly.svelte';
  import BenefitsSection from '$lib/components/BenefitsSection.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import BackgroundBeams from '$lib/components/BackgroundBeams.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import SocialReelShowcase from '$lib/components/SocialReelShowcase.svelte';
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
      clientName: 'Marco Zanutta',
      clientRole: 'CEO',
      company: 'Zanutta Group',
      quote: 'Hanno trasformato la nostra presenza digitale. I numeri parlano chiaro: +340% di lead qualificati.',
    },
    {
      id: '2',
      clientName: 'Elena Reginato',
      clientRole: 'Marketing Director',
      company: 'Reginato',
      quote: 'Finalmente un\'agenzia che parla di ROI e non solo di like. Risultati concreti e misurabili.',
    },
    {
      id: '3',
      clientName: 'Giovanni Ennevi',
      clientRole: 'Founder',
      company: 'Ennevi',
      quote: 'Il team Righello ha portato la nostra campagna Meta a un ROAS di 8.5x. Impressionante.',
    },
    {
      id: '4',
      clientName: 'Laura Dolfo',
      clientRole: 'Owner',
      company: 'Dolfo Restaurant',
      quote: 'Gestiscono i nostri social con una creatività che non avrei mai immaginato. Sold out ogni weekend.',
    },
    {
      id: '5',
      clientName: 'Paolo Reguta',
      clientRole: 'Direttore Marketing',
      company: 'Reguta Wines',
      quote: 'La strategia social ha portato +180% di engagement e vendite dirette raddoppiate.',
    },
  ];
  
  const featuredProjects = projects.filter(p => p.featured);
  
  const stats = [
    { value: 50, suffix: '+', label: 'Progetti completati' },
    { value: 2, suffix: 'M+', label: 'Views generate' },
    { value: 98, suffix: '%', label: 'Clienti soddisfatti' },
    { value: 8, suffix: '.5x', label: 'ROAS medio' },
  ];
  
  const credibilityBadges = [
    { icon: 'meta', label: 'Meta Partner' },
    { icon: 'google', label: 'Google Partner' },
    { icon: 'star', label: '5.0 Rating' },
  ];
  
  import { browser } from '$app/environment';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Righello - Growth Agency | Marketing, Advertising & Digital Experience</title>
  <meta name="description" content="Agenzia di marketing orientata ai risultati. Gestiamo social, creiamo contenuti e campagne pubblicitarie che generano conversioni misurabili." />
</svelte:head>

<AppleScrolly {credibilityBadges} />

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" height="80px" />

<section class="section-padding relative overflow-hidden" style="background: var(--bg-secondary);">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Risultati reali</p>
        <h2 class="heading-lg max-w-4xl mx-auto">
          I numeri che <span class="gradient-text">fanno la differenza</span>
        </h2>
      </div>
    </RevealOnScroll>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {#each stats as stat, i}
        <RevealOnScroll animation="scale" delay={0} stagger={100} index={i}>
          <div class="glass-card rounded-2xl p-6 md:p-8 text-center hover-lift">
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

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" height="80px" />

<section class="section-padding relative">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">I nostri servizi</p>
        <h2 class="heading-lg mb-6">Cosa <span class="gradient-text">facciamo</span></h2>
        <p class="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Creiamo ecosistemi di conversione che trasformano views in clienti e fatturato ricorrente.
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

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" height="80px" />

<section class="section-padding relative overflow-hidden" style="background: var(--bg-secondary);">
  <div class="section-container mb-12">
    <RevealOnScroll animation="fly-up">
      <div class="text-center">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Video Recensioni</p>
        <h2 class="heading-lg mb-6">I clienti <span class="gradient-text">parlano di noi</span></h2>
        <p class="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Guarda le video testimonianze dei nostri clienti e scopri i risultati che abbiamo ottenuto insieme
        </p>
      </div>
    </RevealOnScroll>
  </div>
  
  <VideoTestimonials testimonials={videoTestimonials} />
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" height="60px" />

<section class="py-16 md:py-24 overflow-hidden relative">
  <div class="absolute inset-0 bg-gradient-to-r from-righello-pink/10 via-transparent to-righello-pink/10"></div>
  <div class="absolute top-0 left-0 w-64 h-64 bg-righello-pink/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
  <div class="absolute bottom-0 right-0 w-64 h-64 bg-righello-pink/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
  
  <RevealOnScroll animation="fade">
    <div class="section-container mb-8">
      <p class="text-sm uppercase tracking-[0.2em] text-righello-pink text-center">I nostri clienti</p>
    </div>
  </RevealOnScroll>
  
  <InfiniteMarquee speed={30}>
    {#each clients as client}
      <span class="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mx-8 md:mx-12 opacity-60 hover:opacity-100 transition-opacity">{client}</span>
    {/each}
  </InfiniteMarquee>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<div class="relative" style="background: var(--bg-secondary);">
  <SocialReelShowcase />
</div>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-secondary)" />

<BenefitsSection />

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<div class="relative">
  <BackgroundBeams variant="subtle" />
  <FAQ />
</div>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section class="section-padding relative overflow-hidden" style="background: var(--bg-secondary);">
  <div class="absolute inset-0 cta-gradient"></div>
  
  <div class="section-container relative z-10">
    <RevealOnScroll animation="scale">
      <div class="glass-card rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto">
        <h2 class="heading-lg mb-6">
          Pronto a <span class="gradient-text">crescere?</span>
        </h2>
        <p class="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
          Inizia oggi a trasformare il tuo business con strategie data-driven e risultati misurabili.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <MagneticButton href="/contatti" variant="primary" class="text-lg px-8 py-4">
            Richiedi una consulenza gratuita
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
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    .heading-lg {
      font-size: 2rem;
    }
  }
</style>
