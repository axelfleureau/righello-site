<script lang="ts">
  import { projects, departments, clients } from '$lib/data/projects';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import GlowCard from '$lib/components/GlowCard.svelte';
  import InfiniteMarquee from '$lib/components/InfiniteMarquee.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
  import PhoneMockup from '$lib/components/PhoneMockup.svelte';
  import VideoTestimonials from '$lib/components/VideoTestimonials.svelte';
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
      videoSrc: '/testimonials/zanutta.mp4',
    },
    {
      id: '2',
      clientName: 'Elena Reginato',
      clientRole: 'Marketing Director',
      company: 'Reginato',
      quote: 'Finalmente un\'agenzia che parla di ROI e non solo di like. Risultati concreti e misurabili.',
      videoSrc: '/testimonials/reginato.mp4',
    },
    {
      id: '3',
      clientName: 'Giovanni Ennevi',
      clientRole: 'Founder',
      company: 'Ennevi',
      quote: 'Il team Righello ha portato la nostra campagna Meta a un ROAS di 8.5x. Impressionante.',
      videoSrc: '/testimonials/ennevi.mp4',
    },
    {
      id: '4',
      clientName: 'Laura Dolfo',
      clientRole: 'Owner',
      company: 'Dolfo Restaurant',
      quote: 'Gestiscono i nostri social con una creatività che non avrei mai immaginato. Sold out ogni weekend.',
      videoSrc: '/testimonials/dolfo.mp4',
    },
    {
      id: '5',
      clientName: 'Paolo Reguta',
      clientRole: 'Direttore Marketing',
      company: 'Reguta Wines',
      quote: 'La strategia social ha portato +180% di engagement e vendite dirette raddoppiate.',
      videoSrc: '/testimonials/reguta.mp4',
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

<section class="h-screen min-h-[600px] flex items-center relative overflow-hidden">
  <div class="absolute inset-0 hero-bg"></div>
  <div class="absolute inset-0 noise-overlay opacity-30"></div>
  
  <div class="section-container relative z-10 pt-24 pb-12 md:pt-28 md:pb-16">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
      <div class="order-2 lg:order-1 text-center lg:text-left">
        <p class="text-sm md:text-base uppercase tracking-[0.3em] text-righello-pink mb-6 font-medium hero-animate" style="--delay: 0ms">
          Growth Agency
        </p>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1] hero-animate" style="--delay: 100ms">
          <span class="block text-white">La tua crescita,</span>
          <span class="gradient-text">inquadrata alla perfezione.</span>
        </h1>
        
        <p class="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed hero-animate" style="--delay: 200ms">
          Marketing, advertising e sviluppo digitale con un approccio data-driven. 
          Ogni euro investito, ogni conversione tracciata.
        </p>
        
        <div class="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 hero-animate" style="--delay: 300ms">
          <MagneticButton href="/contatti" variant="primary">
            Iniziamo a parlare
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
          <MagneticButton href="/progetti" variant="outline-white">
            Guarda i progetti
          </MagneticButton>
        </div>
        
        <div class="flex flex-wrap justify-center lg:justify-start gap-6 hero-animate" style="--delay: 400ms">
          {#each credibilityBadges as badge, i}
            <div class="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                {#if badge.icon === 'meta'}
                  <svg class="w-5 h-5 text-righello-pink" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                {:else if badge.icon === 'google'}
                  <svg class="w-5 h-5 text-righello-pink" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                {:else if badge.icon === 'star'}
                  <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                {/if}
                <span class="font-medium">{badge.label}</span>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="order-1 lg:order-2 flex justify-center lg:justify-end">
        <div class="hero-animate" style="--delay: 200ms">
          <PhoneMockup />
        </div>
      </div>
    </div>
  </div>
  
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
    <div class="scroll-indicator hero-animate" style="--delay: 800ms">
      <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
        <div class="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
      </div>
    </div>
  </div>
</section>

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
              <h3 class="text-xl font-semibold mb-3 text-white">{service.title}</h3>
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

<section class="py-16 md:py-24 overflow-hidden relative">
  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-righello-pink/5 to-transparent"></div>
  
  <RevealOnScroll animation="fade">
    <div class="section-container mb-8">
      <p class="text-sm uppercase tracking-[0.2em] text-righello-pink text-center">I nostri clienti</p>
    </div>
  </RevealOnScroll>
  
  <InfiniteMarquee items={clients} speed={30} />
</section>

<section class="section-padding relative overflow-hidden">
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
  .hero-bg {
    background: 
      radial-gradient(ellipse at 20% 30%, rgba(214, 72, 126, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
      var(--bg-primary);
  }
  
  .cta-gradient {
    background: 
      radial-gradient(ellipse at center, rgba(214, 72, 126, 0.1) 0%, transparent 70%);
  }
  
  .scroll-indicator {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
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
