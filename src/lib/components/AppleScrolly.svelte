<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import PhoneMockup from './PhoneMockup.svelte';
  import MagneticButton from './MagneticButton.svelte';
  import RippleGrid from './RippleGrid.svelte';
  
  export let credibilityBadges: { icon: string; label: string }[] = [];
  
  const heroSlide = {
    subtitle: 'Growth Agency',
    title: 'La tua crescita,',
    titleGradient: 'inquadrata alla perfezione.',
    description: 'Marketing, advertising e sviluppo digitale con un approccio data-driven. Ogni euro investito, ogni conversione tracciata.'
  };
  
  const slides = [
    {
      step: '01',
      title: 'Content che converte',
      description: 'Reel, stories e campagne UGC con risultati misurabili. Ogni contenuto è progettato per trasformare follower in clienti.',
      position: 'left',
      icon: '🎬'
    },
    {
      step: '02',
      title: 'Advertising di precisione',
      description: 'Meta Ads, Google Ads, TikTok Ads. Ogni euro investito è tracciato, ottimizzato e moltiplicato per massimizzare il ROAS.',
      position: 'right',
      icon: '📊'
    },
    {
      step: '03',
      title: 'Digital Experience',
      description: 'Siti web, e-commerce e web app che convertono. Design system, automazioni AI e integrazioni per scalare.',
      position: 'left',
      icon: '💻'
    }
  ];
  
  let container: HTMLElement;
  let phoneWrapper: HTMLElement;
  let heroContent: HTMLElement;
  let slideRefs: HTMLElement[] = [];
  let ctx: any = null;
  let currentSlide = -1;
  let activeStep = 0;
  let slideAnimated: boolean[] = [false, false, false];
  let scrollTriggerInstance: any = null;
  
  function scrollToStep(stepIndex: number) {
    if (!scrollTriggerInstance || !container) return;
    
    const totalSlides = slides.length + 1;
    const targetProgress = stepIndex / (totalSlides - 1);
    const scrollStart = scrollTriggerInstance.start;
    const scrollEnd = scrollTriggerInstance.end;
    const targetScroll = scrollStart + (scrollEnd - scrollStart) * targetProgress;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }
  
  let isInitialized = false;
  let ScrollTriggerModule: any = null;
  
  async function waitForCriticalAssets() {
    const promises: Promise<void>[] = [];
    
    // Wait for fonts
    if (document.fonts && document.fonts.ready) {
      promises.push(document.fonts.ready.then(() => {}));
    }
    
    // Wait for video in the container to load metadata
    const video = container?.querySelector('video');
    if (video) {
      if (video.readyState >= 1) {
        // Already loaded metadata
      } else {
        promises.push(new Promise<void>(resolve => {
          const onLoaded = () => {
            video.removeEventListener('loadedmetadata', onLoaded);
            video.removeEventListener('error', onLoaded);
            resolve();
          };
          video.addEventListener('loadedmetadata', onLoaded);
          video.addEventListener('error', onLoaded);
          // Timeout fallback
          setTimeout(resolve, 3000);
        }));
      }
    }
    
    // Wait for images
    const images = container?.querySelectorAll('img') || [];
    images.forEach(img => {
      if (!img.complete) {
        promises.push(new Promise<void>(resolve => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
          setTimeout(resolve, 3000);
        }));
      }
    });
    
    await Promise.all(promises);
  }
  
  async function initScrollTrigger() {
    if (!browser || isInitialized || !container) return;
    
    const gsap = (await import('gsap')).default;
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTriggerModule = ScrollTrigger;
    
    // Wait for all critical assets (fonts, video, images)
    await waitForCriticalAssets();
    
    // Additional delay for layout stability
    await new Promise(resolve => setTimeout(resolve, 150));
    
    isInitialized = true;
    
    ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
          const totalSlides = slides.length + 1;
          const snapPoints = Array.from({ length: totalSlides }, (_, i) => i / (totalSlides - 1));
          const scrollDistance = slides.length * 300;
          
          slideRefs.forEach((slideEl) => {
            if (!slideEl) return;
            gsap.set(slideEl, { opacity: 0, x: 0 });
          });
          
          scrollTriggerInstance = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollDistance}vh`,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: snapPoints,
              duration: { min: 0.4, max: 0.8 },
              delay: 0.05,
              ease: 'power2.inOut'
            },
            onUpdate: (self) => {
              const progress = self.progress;
              const slideIndex = Math.floor(progress * totalSlides);
              
              // Update active step for step indicator
              activeStep = Math.max(0, Math.min(slideIndex, slides.length));
              
              if (progress < 0.2) {
                const fadeProgress = progress / 0.2;
                gsap.set(heroContent, { opacity: 1 - fadeProgress, y: -40 * fadeProgress });
              } else {
                gsap.set(heroContent, { opacity: 0, y: -40 });
              }
              
              if (progress > 0.05 && progress < 0.35) {
                const phoneProgress = (progress - 0.05) / 0.30;
                const vw = window.innerWidth;
                const phoneWidth = 280;
                const startX = 0;
                const endX = -((vw * 0.42) - (phoneWidth / 2) - 20);
                const currentX = startX + (endX - startX) * Math.min(1, phoneProgress);
                gsap.set(phoneWrapper, { 
                  x: currentX,
                  scale: 1 - (0.08 * Math.min(1, phoneProgress))
                });
              }
              
              slideRefs.forEach((slideEl, i) => {
                if (!slideEl) return;
                const slideStart = (i + 1) / totalSlides;
                const slideEnd = (i + 2) / totalSlides;
                const slideMid = (slideStart + slideEnd) / 2;
                
                if (progress >= slideStart - 0.05 && progress < slideEnd + 0.05) {
                  let slideOpacity = 1;
                  if (progress < slideStart + 0.1) {
                    slideOpacity = (progress - (slideStart - 0.05)) / 0.15;
                  } else if (progress > slideEnd - 0.1) {
                    slideOpacity = 1 - ((progress - (slideEnd - 0.1)) / 0.15);
                  }
                  gsap.set(slideEl, { opacity: Math.max(0, Math.min(1, slideOpacity)) });
                  
                  if (i !== currentSlide && progress >= slideStart && progress < slideEnd) {
                    currentSlide = i;
                    if (!slideAnimated[i]) {
                      slideAnimated[i] = true;
                      animateSlideText(slideEl);
                    }
                  }
                } else {
                  gsap.set(slideEl, { opacity: 0 });
                }
              });
            }
          });
          
          function animateSlideText(slideEl: HTMLElement) {
            const title = slideEl.querySelector('.slide-title');
            const descChars = slideEl.querySelectorAll('.desc-char');
            
            if (title) {
              gsap.fromTo(title, 
                { opacity: 0, y: 40, scale: 0.95 },
                { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  duration: 0.6,
                  ease: 'power3.out'
                }
              );
            }
            
            gsap.fromTo(descChars, 
              { opacity: 0, y: 20 },
              { 
                opacity: 1, 
                y: 0, 
                stagger: 0.008,
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.3
              }
            );
          }
        }
      });
      
      // Additional refresh after short delay for late layout shifts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
      
    }, container);
  }
  
  onMount(() => {
    if (!browser) return;
    
    // Wait for window load to ensure all assets are ready
    const startInit = () => {
      initScrollTrigger();
    };
    
    if (document.readyState === 'complete') {
      // Page already loaded, init with short delay
      setTimeout(startInit, 50);
    } else {
      // Wait for window load
      window.addEventListener('load', () => {
        setTimeout(startInit, 100);
      }, { once: true });
      // Also try after DOMContentLoaded as fallback
      if (document.readyState === 'interactive') {
        setTimeout(startInit, 500);
      }
    }
    
    // Re-init on page visibility change (handles tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isInitialized && ScrollTriggerModule) {
        ScrollTriggerModule.refresh();
      }
    };
    
    // Handle resize events
    const handleResize = () => {
      if (isInitialized && ScrollTriggerModule) {
        ScrollTriggerModule.refresh();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  });
  
  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section bind:this={container} class="apple-scrolly">
  <div class="absolute inset-0 hero-bg"></div>
  <RippleGrid 
    gridColor="#D6487E"
    opacity={0.25}
    gridSize={12}
    gridThickness={18}
    rippleIntensity={0.03}
    fadeDistance={1.8}
    vignetteStrength={2.5}
    glowIntensity={0.15}
    mouseInteraction={true}
    mouseInteractionRadius={1.2}
  />
  <div class="absolute inset-0 noise-overlay opacity-20"></div>
  
  <!-- Step Progress Indicator (Desktop only) -->
  <div class="step-indicator">
    <div class="step-line">
      <div class="step-progress" style="height: {(activeStep / slides.length) * 100}%"></div>
    </div>
    <div class="step-dots">
      <button 
        class="step-dot" 
        class:active={activeStep === 0}
        aria-label="Intro"
        aria-current={activeStep === 0 ? 'step' : undefined}
        on:click={() => scrollToStep(0)}
      >
      </button>
      {#each slides as slide, i}
        <button 
          class="step-dot" 
          class:active={activeStep === i + 1}
          aria-label={slide.title}
          aria-current={activeStep === i + 1 ? 'step' : undefined}
          on:click={() => scrollToStep(i + 1)}
        >
        </button>
      {/each}
    </div>
  </div>
  
  <div class="scrolly-content">
    <div bind:this={heroContent} class="hero-text">
      <p class="text-sm md:text-base uppercase tracking-[0.3em] text-righello-pink mb-6 font-medium">
        {heroSlide.subtitle}
      </p>
      
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-[1.1]">
        <span class="block text-[var(--text-primary)]">{heroSlide.title}</span>
        <span class="gradient-text">{heroSlide.titleGradient}</span>
      </h1>
      
      <p class="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] mb-5 md:mb-8 max-w-xl leading-relaxed">
        {heroSlide.description}
      </p>
      
      <div class="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-10">
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
      
      <div class="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start">
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
      <PhoneMockup videoSrc="https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/caterina_4.mp4?alt=media&token=82ca60f4-1a84-4682-9e90-c65a50421daa" />
    </div>
    
    {#each slides as slide, i}
      <div 
        bind:this={slideRefs[i]}
        class="slide" 
        class:slide-left={slide.position === 'left'}
        class:slide-right={slide.position === 'right'}
      >
        <div class="slide-step-badge">
          <span class="slide-step-icon">{slide.icon}</span>
        </div>
        <h2 class="slide-title">
          {slide.title}
        </h2>
        <p class="slide-description overflow-hidden">
          {#each slide.description.split('') as char}
            <span class="desc-char">{char === ' ' ? '\u00A0' : char}</span>
          {/each}
        </p>
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
    min-height: auto;
    overflow: hidden;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  
  @media (min-width: 1024px) {
    .apple-scrolly {
      height: 100vh;
      height: 100svh;
      min-height: 700px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 120px 6% 60px;
    gap: 2.5rem;
  }
  
  @media (min-width: 1024px) {
    .scrolly-content {
      flex-direction: row;
      height: 100%;
      align-items: center;
      padding-top: 100px;
      padding-bottom: 0;
      gap: 0;
    }
  }
  
  .hero-text {
    flex-shrink: 0;
    max-width: 100%;
    text-align: center;
  }
  
  @media (min-width: 1024px) {
    .hero-text {
      flex: 1;
      max-width: 600px;
      text-align: left;
    }
  }
  
  .phone-area {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  
  @media (min-width: 1024px) {
    .phone-area {
      position: absolute;
      right: 8%;
      top: 55%;
      transform: translateY(-50%);
      z-index: 5;
    }
  }
  
  @media (max-width: 1023px) {
    .hero-text .flex {
      justify-content: center;
    }
  }
  
  @media (max-width: 1023px) {
    .scrolly-content {
      padding-top: 140px;
    }
  }
  
  @media (max-width: 480px) {
    .scrolly-content {
      padding-top: 130px;
      padding-left: 5%;
      padding-right: 5%;
      padding-bottom: 40px;
      gap: 2rem;
    }
  }
  
  .slide {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-width: 400px;
    opacity: 0;
    z-index: 20;
    min-height: clamp(200px, 30svh, 300px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .slide-left {
    left: 8%;
  }
  
  .slide-right {
    right: 8%;
  }
  
  @media (max-width: 1023px) {
    .slide {
      display: none;
    }
  }
  
  .slide-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    margin-bottom: 1.25rem;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
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
  
  .title-char,
  .desc-char {
    display: inline-block;
    will-change: opacity, transform;
  }
  
  /* Step Progress Indicator */
  .step-indicator {
    display: none;
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 30;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  
  @media (min-width: 1024px) {
    .step-indicator {
      display: flex;
    }
  }
  
  .step-line {
    position: absolute;
    width: 2px;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1px;
  }
  
  .step-progress {
    width: 100%;
    background: linear-gradient(to bottom, #D6487E, #06B6D4);
    border-radius: 1px;
    transition: height 0.3s ease;
  }
  
  .step-dots {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    z-index: 1;
  }
  
  .step-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .step-dot.active {
    background: #D6487E;
    border-color: #D6487E;
    box-shadow: 0 0 20px rgba(214, 72, 126, 0.5);
  }
  
  
  /* Slide Step Badge */
  .slide-step-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(214, 72, 126, 0.15);
    border: 1px solid rgba(214, 72, 126, 0.3);
    border-radius: 9999px;
    width: fit-content;
  }
  
  .slide-step-icon {
    font-size: 1.25rem;
  }
  
  
  :global([data-theme="light"]) .step-line {
    background: rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="light"]) .step-dot {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
  }
  
  :global([data-theme="light"]) .slide-step-badge {
    background: rgba(214, 72, 126, 0.1);
  }
  
  </style>
