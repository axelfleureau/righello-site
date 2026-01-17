<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import PhoneMockup from './PhoneMockup.svelte';
  import MagneticButton from './MagneticButton.svelte';
  import BackgroundBeams from './BackgroundBeams.svelte';
  
  export let credibilityBadges: { icon: string; label: string }[] = [];
  
  const slides = [
    {
      title: 'Content che converte',
      description: 'Reel, stories e campagne UGC con risultati misurabili. Ogni contenuto è progettato per trasformare follower in clienti.',
      position: 'left'
    },
    {
      title: 'Advertising di precisione',
      description: 'Meta Ads, Google Ads, TikTok Ads. Ogni euro investito è tracciato, ottimizzato e moltiplicato per massimizzare il ROAS.',
      position: 'right'
    },
    {
      title: 'Digital Experience',
      description: 'Siti web, e-commerce e web app che convertono. Design system, automazioni AI e integrazioni per scalare.',
      position: 'left'
    }
  ];
  
  let container: HTMLElement;
  let phoneWrapper: HTMLElement;
  let heroContent: HTMLElement;
  let slideRefs: HTMLElement[] = [];
  let ctx: any = null;
  
  onMount(async () => {
    if (!browser) return;
    
    const gsap = (await import('gsap')).default;
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    
    ctx = gsap.context(() => {
      const totalSlides = slides.length + 1;
      const snapPoints = Array.from({ length: totalSlides }, (_, i) => i / (totalSlides - 1));
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${slides.length * 120}vh`,
          pin: true,
          scrub: 2,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.2, max: 0.6 },
            ease: 'power1.inOut'
          }
        }
      });
      
      tl.to(heroContent, {
        opacity: 0,
        y: -50,
        duration: 0.3
      }, 0);
      
      tl.to(phoneWrapper, {
        x: () => {
          const vw = window.innerWidth;
          if (vw < 1024) return 0;
          return -(vw / 2 - 160 - (vw * 0.08));
        },
        scale: 0.85,
        duration: 0.4
      }, 0.1);
      
      slideRefs.forEach((slideEl, i) => {
        if (!slideEl) return;
        const slide = slides[i];
        const startTime = 0.3 + (i * 0.7 / slides.length);
        const endTime = startTime + (0.5 / slides.length);
        
        tl.fromTo(slideEl, 
          { 
            opacity: 0, 
            x: slide.position === 'left' ? -100 : 100,
            scale: 0.9
          },
          { 
            opacity: 1, 
            x: 0,
            scale: 1,
            duration: 0.15
          }, 
          startTime
        );
        
        if (i < slides.length - 1) {
          tl.to(slideEl, 
            { 
              opacity: 0, 
              x: slide.position === 'left' ? -50 : 50,
              duration: 0.1
            }, 
            endTime
          );
        }
      });
    }, container);
  });
  
  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section bind:this={container} class="apple-scrolly">
  <div class="absolute inset-0 hero-bg"></div>
  <BackgroundBeams variant="subtle" />
  <div class="absolute inset-0 noise-overlay opacity-30"></div>
  
  <div class="scrolly-content">
    <div bind:this={heroContent} class="hero-text">
      <p class="text-sm md:text-base uppercase tracking-[0.3em] text-righello-pink mb-6 font-medium">
        Growth Agency
      </p>
      
      <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1]">
        <span class="block text-[var(--text-primary)]">La tua crescita,</span>
        <span class="gradient-text">inquadrata alla perfezione.</span>
      </h1>
      
      <p class="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-xl leading-relaxed">
        Marketing, advertising e sviluppo digitale con un approccio data-driven. 
        Ogni euro investito, ogni conversione tracciata.
      </p>
      
      <div class="flex flex-wrap gap-4 mb-10">
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
      
      <div class="flex flex-wrap gap-6">
        {#each credibilityBadges as badge}
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
    
    <div bind:this={phoneWrapper} class="phone-area">
      <PhoneMockup />
    </div>
    
    {#each slides as slide, i}
      <div 
        bind:this={slideRefs[i]}
        class="slide" 
        class:slide-left={slide.position === 'left'}
        class:slide-right={slide.position === 'right'}
      >
        <h2 class="slide-title">{slide.title}</h2>
        <p class="slide-description">{slide.description}</p>
      </div>
    {/each}
  </div>
  
  <div class="scroll-hint">
    <div class="scroll-indicator">
      <div class="scroll-dot"></div>
    </div>
  </div>
</section>

<style>
  .apple-scrolly {
    position: relative;
    height: 100vh;
    min-height: 700px;
    overflow: hidden;
  }
  
  @media (max-width: 768px) {
    .apple-scrolly {
      min-height: 100svh;
    }
  }
  
  .hero-bg {
    background: 
      radial-gradient(ellipse at 20% 30%, rgba(214, 72, 126, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
      var(--bg-primary);
  }
  
  :global([data-theme="light"]) .hero-bg {
    background: 
      radial-gradient(ellipse at 20% 30%, rgba(214, 72, 126, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.06) 0%, transparent 50%),
      var(--bg-primary);
  }
  
  .scrolly-content {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 5%;
    padding-top: 100px;
  }
  
  @media (min-width: 1024px) {
    .scrolly-content {
      padding-top: 120px;
    }
  }
  
  .hero-text {
    flex: 1;
    max-width: 600px;
    text-align: left;
  }
  
  .phone-area {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
  }
  
  @media (max-width: 1023px) {
    .scrolly-content {
      flex-direction: column;
      justify-content: flex-start;
      text-align: center;
      padding-top: 100px;
      padding-bottom: 80px;
    }
    
    .hero-text {
      max-width: 100%;
      text-align: center;
      margin-bottom: 1.5rem;
      flex-shrink: 0;
    }
    
    .hero-text .flex {
      justify-content: center;
    }
    
    .phone-area {
      position: relative;
      right: auto;
      top: auto;
      transform: none;
      flex-shrink: 0;
    }
  }
  
  @media (max-width: 480px) {
    .scrolly-content {
      padding-top: 90px;
      padding-left: 4%;
      padding-right: 4%;
    }
  }
  
  .slide {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-width: 400px;
    opacity: 0;
    z-index: 20;
  }
  
  .slide-left {
    left: 8%;
  }
  
  .slide-right {
    right: 8%;
  }
  
  @media (max-width: 1023px) {
    .slide {
      left: 50% !important;
      right: auto !important;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 90%;
      max-width: 400px;
      top: 25%;
    }
  }
  
  .slide-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .slide-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  .scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-10px); }
  }
  
  .scroll-indicator {
    width: 24px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 9999px;
    display: flex;
    justify-content: center;
  }
  
  .scroll-dot {
    width: 6px;
    height: 12px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 9999px;
    margin-top: 8px;
    animation: bounce 1s ease-in-out infinite;
  }
  
  :global([data-theme="light"]) .scroll-indicator {
    border-color: rgba(0, 0, 0, 0.2);
  }
  
  :global([data-theme="light"]) .scroll-dot {
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
  
  @media (max-width: 768px) {
    .scroll-hint {
      display: none;
    }
  }
</style>
