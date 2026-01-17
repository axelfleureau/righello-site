<script lang="ts">
  import { projects, services, clients } from '$lib/data/projects';
  import GSAPReveal from '$lib/components/GSAPReveal.svelte';
  import TextReveal from '$lib/components/TextReveal.svelte';
  import GlowCard from '$lib/components/GlowCard.svelte';
  import InfiniteMarquee from '$lib/components/InfiniteMarquee.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  const clientTestimonials = [
    {
      id: '1',
      clientName: 'Marco Zanutta',
      clientRole: 'CEO, Zanutta Group',
      videoUrl: '/testimonials/zanutta.mp4',
      quote: 'Hanno trasformato la nostra presenza digitale. I numeri parlano chiaro: +340% di lead qualificati.'
    },
    {
      id: '2',
      clientName: 'Elena Reginato',
      clientRole: 'Marketing Director, Reginato',
      videoUrl: '/testimonials/reginato.mp4',
      quote: 'Finalmente un\'agenzia che parla di ROI e non solo di like. Risultati concreti e misurabili.'
    },
    {
      id: '3',
      clientName: 'Giovanni Ennevi',
      clientRole: 'Founder, Ennevi',
      videoUrl: '/testimonials/ennevi.mp4',
      quote: 'Il team Righello ha portato la nostra campagna Meta a un ROAS di 8.5x. Impressionante.'
    },
    {
      id: '4',
      clientName: 'Laura Dolfo',
      clientRole: 'Owner, Dolfo Restaurant',
      videoUrl: '/testimonials/dolfo.mp4',
      quote: 'Gestiscono i nostri social con una creatività che non avrei mai immaginato. Sold out ogni weekend.'
    },
  ];
  
  const featuredProjects = projects.filter(p => p.featured);
  
  const stats = [
    { value: 50, suffix: '+', label: 'Progetti completati' },
    { value: 2, suffix: 'M+', label: 'Views generate' },
    { value: 98, suffix: '%', label: 'Clienti soddisfatti' },
    { value: 24, suffix: 'h', label: 'Risposta garantita' },
  ];
  
  const videoContent = [
    { title: 'Reel virali', views: '938K', desc: 'Contenuti per social' },
    { title: 'Video corporate', views: '550K', desc: 'Brand storytelling' },
    { title: 'Product demos', views: '220K', desc: 'Presentazioni prodotto' },
    { title: 'Behind the scenes', views: '350K', desc: 'Dietro le quinte' },
    { title: 'Testimonial', views: '120K', desc: 'Storie di successo' },
    { title: 'Event coverage', views: '180K', desc: 'Copertura eventi' },
  ];
  
  let heroContainer: HTMLElement;
  
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.to('.hero-gradient', {
        backgroundPosition: '100% 100%',
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
    });
    
    return () => ctx.revert();
  });
</script>

<svelte:head>
  <title>Righello - Growth Agency | Marketing, Advertising & Digital Experience</title>
  <meta name="description" content="Agenzia di marketing orientata ai risultati. Gestiamo social, creiamo contenuti e campagne pubblicitarie che generano conversioni misurabili." />
</svelte:head>

<section bind:this={heroContainer} class="min-h-screen flex items-center justify-center relative overflow-hidden">
  <div class="absolute inset-0 hero-gradient" style="background: radial-gradient(ellipse at 30% 20%, rgba(214, 72, 126, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), var(--bg-primary);"></div>
  
  <div class="absolute inset-0 noise-overlay"></div>
  
  <video 
    autoplay 
    loop 
    muted 
    playsinline
    class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>
  
  <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-10"></div>
  
  <div class="section-container text-center relative z-20 py-32">
    <GSAPReveal animation="fade-up" delay={0.2}>
      <p class="text-sm md:text-base uppercase tracking-[0.3em] text-righello-pink mb-6 font-medium">
        Growth Agency
      </p>
    </GSAPReveal>
    
    <GSAPReveal animation="fade-up" delay={0.4}>
      <h1 class="heading-xl mb-8 max-w-5xl mx-auto">
        <span class="block">Trasformiamo dati in</span>
        <span class="gradient-text">crescita misurabile.</span>
      </h1>
    </GSAPReveal>
    
    <GSAPReveal animation="fade-up" delay={0.6}>
      <p class="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
        Marketing, advertising e gestione social con un approccio data-driven. Ogni euro investito, ogni conversione tracciata.
      </p>
    </GSAPReveal>
    
    <GSAPReveal animation="fade-up" delay={0.8}>
      <div class="flex flex-wrap justify-center gap-4">
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
    </GSAPReveal>
  </div>
  
  <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
    <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
      <div class="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
    </div>
  </div>
</section>

<section class="section-padding relative overflow-hidden" style="background: var(--bg-secondary);">
  <div class="section-container">
    <GSAPReveal animation="fade-up">
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Risultati reali</p>
        <h2 class="heading-lg max-w-4xl mx-auto">
          I numeri che <span class="gradient-text">fanno la differenza</span>
        </h2>
      </div>
    </GSAPReveal>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {#each stats as stat, i}
        <GSAPReveal animation="scale" delay={i * 0.1}>
          <div class="glass-card rounded-2xl p-6 md:p-8 text-center hover-lift">
            <div class="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-2">
              <AnimatedCounter target={stat.value} duration={2000} />{stat.suffix}
            </div>
            <p class="text-sm md:text-base text-[var(--text-secondary)]">{stat.label}</p>
          </div>
        </GSAPReveal>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding relative">
  <div class="section-container">
    <GSAPReveal animation="fade-up">
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">I nostri servizi</p>
        <h2 class="heading-lg mb-6">Cosa <span class="gradient-text">facciamo</span></h2>
        <p class="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Creiamo ecosistemi di conversione che trasformano views in clienti e fatturato ricorrente.
        </p>
      </div>
    </GSAPReveal>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each services as service, i}
        <GSAPReveal animation="fade-up" delay={i * 0.1}>
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
        </GSAPReveal>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding relative overflow-hidden" style="background: var(--bg-secondary);">
  <div class="section-container mb-12">
    <GSAPReveal animation="fade-up">
      <div class="text-center">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Case studies</p>
        <h2 class="heading-lg mb-6">Campagne con <span class="gradient-text">risultati tracciabili</span></h2>
        <p class="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Ogni progetto misura ROI, conversioni e crescita reale per i nostri clienti
        </p>
      </div>
    </GSAPReveal>
  </div>
  
  <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-8">
    {#each videoContent as video, i}
      <GSAPReveal animation="fade-up" delay={i * 0.1}>
        <div class="flex-shrink-0 snap-center">
          <div class="video-preview w-[260px] md:w-[300px] group">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-righello-pink/10 to-cyan-500/10"></div>
            
            <div class="absolute inset-0 flex items-center justify-center z-20">
              <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-righello-pink group-hover:border-righello-pink transition-all duration-300 group-hover:scale-110">
                <svg class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            
            <div class="absolute top-4 right-4 z-20">
              <span class="px-3 py-1 bg-righello-pink/90 text-white text-xs font-bold rounded-full">
                +{video.views} conversioni
              </span>
            </div>
            
            <div class="absolute bottom-0 left-0 right-0 p-5 z-20">
              <p class="text-lg font-bold text-white mb-1">{video.title}</p>
              <p class="text-sm text-gray-300">{video.desc}</p>
            </div>
          </div>
        </div>
      </GSAPReveal>
    {/each}
  </div>
  
  <div class="text-center mt-8">
    <MagneticButton href="/progetti" variant="secondary">
      Vedi tutti i progetti
      <svg class="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </MagneticButton>
  </div>
</section>

<section class="section-padding relative overflow-hidden" style="background: var(--bg-secondary);">
  <div class="section-container mb-12">
    <GSAPReveal animation="fade-up">
      <div class="text-center">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Dicono di noi</p>
        <h2 class="heading-lg mb-6">Le <span class="gradient-text">storie dei clienti</span></h2>
        <p class="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Ascolta direttamente dai nostri clienti i risultati che abbiamo ottenuto insieme
        </p>
      </div>
    </GSAPReveal>
  </div>
  
  <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-8">
    {#each clientTestimonials as testimonial, i}
      <GSAPReveal animation="fade-up" delay={i * 0.1}>
        <div class="flex-shrink-0 snap-center">
          <div class="testimonial-reel w-[260px] md:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden relative cursor-pointer group">
            <div class="absolute inset-0 bg-gradient-to-br from-righello-pink/30 to-cyan-500/30"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div class="absolute inset-0 flex items-center justify-center z-20">
              <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-righello-pink group-hover:border-righello-pink transition-all duration-300 group-hover:scale-110">
                <svg class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            
            <div class="absolute bottom-0 left-0 right-0 p-5 z-20">
              <p class="text-sm text-white/80 mb-3 line-clamp-3 italic">"{testimonial.quote}"</p>
              <p class="text-lg font-bold text-white">{testimonial.clientName}</p>
              <p class="text-sm text-gray-400">{testimonial.clientRole}</p>
            </div>
          </div>
        </div>
      </GSAPReveal>
    {/each}
  </div>
</section>

<section class="py-16 md:py-24 overflow-hidden relative">
  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-righello-pink/5 to-transparent"></div>
  
  <GSAPReveal animation="fade-in">
    <div class="section-container mb-8">
      <p class="text-sm uppercase tracking-[0.2em] text-righello-pink text-center">I nostri clienti</p>
    </div>
  </GSAPReveal>
  
  <InfiniteMarquee speed={40} class="mask-fade-edges">
    {#each clients as client}
      <span class="text-4xl md:text-6xl font-bold mx-8 text-white/20 hover:text-righello-pink transition-colors duration-500 cursor-default whitespace-nowrap">
        {client}
      </span>
    {/each}
  </InfiniteMarquee>
</section>

<section class="section-padding relative overflow-hidden" style="background: var(--bg-secondary);">
  <div class="section-container">
    <GSAPReveal animation="fade-up">
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Come funziona</p>
        <h2 class="heading-lg">Il tuo percorso di <span class="gradient-text">crescita</span></h2>
      </div>
    </GSAPReveal>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each [
        { step: '01', title: 'Analisi', desc: 'Compila il form o scrivici. Analizziamo il tuo brand e i tuoi obiettivi.' },
        { step: '02', title: 'Strategia', desc: 'Organizziamo un incontro dove definiamo la strategia su misura per te.' },
        { step: '03', title: 'Esecuzione', desc: 'Produciamo contenuti e gestiamo le campagne per massimizzare i risultati.' },
      ] as item, i}
        <GSAPReveal animation="fade-up" delay={i * 0.15}>
          <div class="relative">
            <div class="text-8xl font-black text-white/5 absolute -top-8 -left-4">{item.step}</div>
            <div class="glass-card rounded-2xl p-8 relative z-10 h-full">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-righello-pink to-cyan-500 flex items-center justify-center text-white font-bold mb-6">
                {item.step}
              </div>
              <h3 class="text-2xl font-bold mb-4">{item.title}</h3>
              <p class="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          </div>
        </GSAPReveal>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding">
  <div class="section-container">
    <GSAPReveal animation="scale">
      <div class="relative rounded-3xl overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-righello-pink via-[#8B5CF6] to-cyan-500"></div>
        <div class="absolute inset-0 noise-overlay opacity-20"></div>
        
        <div class="relative z-10 p-12 md:p-20 text-center">
          <h2 class="heading-lg text-white mb-6">
            Pronto a far <span class="font-black">crescere</span> il tuo brand?
          </h2>
          <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            Candidati ora e scopri se sei tra i pochi che possiamo seguire personalmente.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a 
              href="/contatti" 
              class="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Candidati ora
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a 
              href="https://wa.me/393514613439" 
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      </div>
    </GSAPReveal>
  </div>
</section>
