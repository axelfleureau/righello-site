<script lang="ts">
  import { projects, services, clients } from '$lib/data/projects';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import SplitText from '$lib/components/SplitText.svelte';
  import TiltCard from '$lib/components/TiltCard.svelte';
  import Highlight from '$lib/components/Highlight.svelte';
  import TechWord from '$lib/components/TechWord.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import DraggableRuler from '$lib/components/DraggableRuler.svelte';
  import StickyNote from '$lib/components/StickyNote.svelte';
  import SwingingIcon from '$lib/components/SwingingIcon.svelte';
  
  const featuredProjects = projects.filter(p => p.featured);
</script>

<svelte:head>
  <title>Righello - Creative Lab</title>
  <meta name="description" content="Siamo un team dedicato e dinamico, uniti dalla passione per l'innovazione e l'eccellenza nel settore digitale." />
</svelte:head>

<section class="min-h-screen flex items-center justify-center relative overflow-hidden">
  <video 
    autoplay 
    loop 
    muted 
    playsinline
    class="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>
  
  <div class="absolute inset-0 bg-black/40"></div>
  <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent z-[5]"></div>
  
  <div class="absolute top-32 right-10 hidden lg:block z-10">
    <StickyNote variant="pink" rotation={-5}>
      Creatività ✨
    </StickyNote>
  </div>
  
  <div class="absolute top-48 left-10 hidden lg:block z-10">
    <StickyNote variant="black" rotation={3}>
      Innovazione 🚀
    </StickyNote>
  </div>
  
  <div class="absolute bottom-32 right-20 hidden lg:block z-10">
    <DraggableRuler />
  </div>
  
  <div class="section-container text-center py-20 relative z-10">
    <div>
      <ScrollReveal animation="scale" duration={800}>
        <img 
          src="/logo-full.png" 
          alt="Righello" 
          class="mx-auto h-24 sm:h-32 md:h-40 lg:h-48 mb-8 w-auto max-w-[90vw] object-contain brightness-0 invert"
        />
      </ScrollReveal>
      <ScrollReveal animation="fade-up" delay={200}>
        <p class="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 drop-shadow-lg">
          <SplitText text="Creative Lab." delay={80} startDelay={400} />
        </p>
      </ScrollReveal>
      <ScrollReveal animation="fade-up" delay={400}>
        <p class="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow-md">
          Aiutiamo le aziende a lavorare meglio attraverso <TechWord highlight>marketing strategico</TechWord> e <TechWord>sviluppo software</TechWord> innovativo.
        </p>
      </ScrollReveal>
      <ScrollReveal animation="fade-up" delay={600}>
        <div class="flex flex-wrap justify-center gap-4">
          <MagneticButton href="/progetti" variant="primary">
            Scopri i nostri progetti
          </MagneticButton>
          <MagneticButton href="/contatti" variant="outline-white">
            Contattaci
          </MagneticButton>
        </div>
      </ScrollReveal>
    </div>
  </div>
  
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>

<section class="py-20 relative" style="background-color: var(--bg-secondary);">
  <div class="section-container">
    <ScrollReveal animation="fade-up">
      <h2 class="heading-lg mb-6 uppercase text-center">
        <Highlight variant="pink">CREIAMO ESPERIENZE MEMORABILI</Highlight>
      </h2>
    </ScrollReveal>
    <ScrollReveal animation="fade-up" delay={200}>
      <p class="text-xl md:text-2xl max-w-3xl mx-auto text-center mb-12" style="color: var(--text-secondary);">
        Video istituzionali, contenuti dimostrativi e proof of work per raccontare il tuo brand
      </p>
    </ScrollReveal>
    
    <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide" style="overflow-y: hidden;">
      {#each [
        { title: 'Video Istituzionale', desc: 'Racconta la tua azienda' },
        { title: 'Demo Prodotto', desc: 'Mostra come funziona' },
        { title: 'Testimonial', desc: 'Le storie dei clienti' },
        { title: 'Behind the Scenes', desc: 'Il dietro le quinte' },
        { title: 'Case Study', desc: 'Risultati concreti' }
      ] as video, i}
        <ScrollReveal animation="fade-up" delay={i * 100}>
          <div class="flex-shrink-0 snap-center">
            <div class="relative w-[400px] aspect-video rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300" style="background-color: var(--bg-primary);">
              <div class="absolute inset-0 bg-gradient-to-br from-righello-pink/20 to-black/60"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-righello-pink/80 transition-colors duration-300">
                  <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <p class="text-lg font-bold">{video.title}</p>
                <p class="text-sm text-gray-300">{video.desc}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<section class="py-20 relative overflow-hidden" style="background-color: var(--bg-secondary);">
  <div class="section-container">
    <ScrollReveal>
      <h2 class="heading-lg text-center mb-4 uppercase">Cosa facciamo</h2>
      <p class="text-xl text-center max-w-2xl mx-auto mb-12" style="color: var(--text-secondary);">
        Creiamo <TechWord>esperienze digitali</TechWord> per le aziende che vogliono crescere
      </p>
    </ScrollReveal>
    
    <div class="flex flex-wrap justify-center gap-6 mb-16">
      <ScrollReveal animation="fade-up" delay={0}>
        <SwingingIcon label="Strategia">
          <svg class="w-10 h-10 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        </SwingingIcon>
      </ScrollReveal>
      
      <ScrollReveal animation="fade-up" delay={100}>
        <SwingingIcon label="Design">
          <svg class="w-10 h-10 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </SwingingIcon>
      </ScrollReveal>
      
      <ScrollReveal animation="fade-up" delay={200}>
        <SwingingIcon label="Sviluppo">
          <svg class="w-10 h-10 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </SwingingIcon>
      </ScrollReveal>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each services as service, i}
        <ScrollReveal animation="fade-up" delay={i * 100}>
          <div class="p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2" style="background-color: var(--bg-primary);">
            <div class="w-14 h-14 rounded-xl bg-righello-pink/10 flex items-center justify-center mb-6 group-hover:bg-righello-pink group-hover:scale-110 transition-all duration-300">
              {#if service.icon === 'palette'}
                <svg class="w-7 h-7 text-righello-pink group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              {:else if service.icon === 'sparkles'}
                <svg class="w-7 h-7 text-righello-pink group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              {:else if service.icon === 'code'}
                <svg class="w-7 h-7 text-righello-pink group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              {:else if service.icon === 'camera'}
                <svg class="w-7 h-7 text-righello-pink group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              {:else if service.icon === 'cpu'}
                <svg class="w-7 h-7 text-righello-pink group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              {/if}
            </div>
            <h3 class="text-xl font-semibold mb-3 group-hover:text-righello-pink transition-colors">{service.title}</h3>
            <p style="color: var(--text-secondary);">{service.description}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<section class="py-20">
  <div class="section-container">
    <ScrollReveal>
      <div class="text-center mb-12">
        <h2 class="heading-lg mb-4 uppercase">Cosa facciamo sui social</h2>
        <p class="text-xl max-w-xl mx-auto" style="color: var(--text-secondary);">
          Dai un'occhiata ai nostri contenuti in formato reel
        </p>
      </div>
    </ScrollReveal>
    
    <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide" style="overflow-y: hidden;">
      {#each [1, 2, 3, 4, 5, 6] as reel, i}
        <ScrollReveal animation="fade-up" delay={i * 100}>
          <div class="flex-shrink-0 snap-center">
            <div class="relative w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-righello-pink/80 transition-colors duration-300">
                  <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
                <p class="text-sm font-medium">Reel #{reel}</p>
                <p class="text-xs text-gray-300">Contenuto social</p>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-righello-pink/20 to-black/40"></div>
            </div>
          </div>
        </ScrollReveal>
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
  </div>
</section>

<section class="py-20 bg-black text-white overflow-hidden">
  <ScrollReveal>
    <div class="section-container mb-12">
      <h2 class="heading-lg text-center uppercase">I nostri clienti</h2>
    </div>
  </ScrollReveal>
  
  <div class="relative">
    <div class="flex animate-marquee whitespace-nowrap hover:pause-animation">
      {#each [...clients, ...clients, ...clients] as client}
        <span class="text-4xl md:text-6xl font-bold mx-8 text-gray-600 hover:text-righello-pink transition-colors duration-300 cursor-default">
          {client}
        </span>
      {/each}
    </div>
  </div>
</section>

<section class="py-20">
  <div class="section-container">
    <ScrollReveal animation="scale">
      <div class="bg-gradient-to-r from-righello-pink to-righello-pink-light rounded-3xl p-12 md:p-16 text-white text-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div class="relative z-10">
          <h2 class="heading-lg mb-6 uppercase">HAI UN PROGETTO IN MENTE?</h2>
          <p class="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto">
            Parliamone insieme! Siamo sempre pronti a trasformare le tue <Highlight variant="white">idee</Highlight> in <em>realtà</em>.
          </p>
          <a href="/contatti" class="inline-flex items-center justify-center px-8 py-4 bg-white text-righello-pink font-black rounded-full transition-all duration-300 hover:bg-black hover:text-white hover:scale-105">
            Contattaci ora
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>
