<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { browser } from '$app/environment';
  import PhoneMockup from './PhoneMockup.svelte';
  import MagneticButton from './MagneticButton.svelte';
  import RippleGrid from './RippleGrid.svelte';
  
  export let credibilityBadges: { icon: string; label: string }[] = [];
  export let partnerNames: string[] = [];
  export let heroVideoCloudinaryUrl: string | undefined = undefined;
  export let heroVideoYoutubeId: string | undefined = 'Rj5N4BMF-Vw';

  let videoMuted = true;
  let audioUnlocked = false;
  let audioActiveVisible = false;
  let audioObserver: IntersectionObserver | null = null;
  
  const heroSlide = {
    subtitle: 'Growth Agency',
    title: 'La tua crescita,',
    titleGradient: 'inquadrata alla perfezione.',
    description: 'Marketing, advertising e sviluppo digitale con un approccio data-driven. Ogni euro investito, ogni conversione tracciata.'
  };
  
  const slides = [
    {
      step: '01',
      title: 'Marketing & Social Media',
      description: 'Strategie di marketing, contenuti e campagne social con risultati misurabili. Ogni azione è progettata per trasformare follower in clienti.',
      position: 'left',
      icon: '🎬'
    },
    {
      step: '02',
      title: 'Advertising & Automazione',
      description: 'Meta Ads, Google Ads, TikTok Ads + workflow automatizzati. Ogni euro è tracciato, ogni processo ottimizzato per massimizzare il ROAS.',
      position: 'right',
      icon: '📊'
    },
    {
      step: '03',
      title: 'Sviluppo Web & Software',
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
  let isInitialized = false;
  
  // CSS variable based progress - no pixel calculations
  let phoneProgress = 0;
  
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
  
  let ScrollTriggerModule: any = null;
  let resizeTimeout: ReturnType<typeof setTimeout>;
  
  // Wait only for critical layout assets (fonts) - NOT video
  // Video loading should not block scrollytelling functionality
  async function waitForAssets() {
    const ASSET_TIMEOUT = 1000;
    
    // Only wait for fonts - they affect layout
    if (document.fonts?.ready) {
      await Promise.race([
        document.fonts.ready,
        new Promise<void>(resolve => setTimeout(resolve, ASSET_TIMEOUT))
      ]);
    }
    
    // Skip video/image waiting - scrollytelling should work immediately
    // The phone mockup handles its own loading state
  }
  
  function unlockAudio() {
    if (!audioUnlocked) {
      audioUnlocked = true;
      videoMuted = false;
      audioActiveVisible = true;
      setTimeout(() => { audioActiveVisible = false; }, 2500);

      // Send unMute directly to all YouTube iframes *synchronously* inside the
      // user-gesture context (touchstart / wheel). On iOS Safari, postMessage
      // must be called inside the gesture; relying on Svelte reactive updates
      // (async microtask) is too late and the command gets silently ignored.
      if (browser) {
        document.querySelectorAll<HTMLIFrameElement>('iframe[src*="youtube"]').forEach(iframe => {
          iframe.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*'
          );
          iframe.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*'
          );
        });
      }
    }
  }

  onMount(async () => {
    if (!browser) return;
    
    // Wait for DOM bindings to be ready
    await tick();
    
    if (!container) return;

    // --- Audio management ---
    // Unlock audio on first user gesture (wheel on desktop, touchstart on mobile)
    window.addEventListener('wheel', unlockAudio, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });

    // Mute/unmute based on whether the hero is in viewport
    audioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Re-enter viewport: unmute if user had already unlocked audio
          if (audioUnlocked) videoMuted = false;
        } else {
          // Left viewport: always mute
          videoMuted = true;
        }
      });
    }, { threshold: 0.2 });

    audioObserver.observe(container);
    // --- end audio management ---
    
    // Single initialization - wait for window load
    const init = async () => {
      if (isInitialized || !container || !heroContent || !phoneWrapper) return;
      
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTriggerModule = ScrollTrigger;
      
      // Wait for all critical assets
      await waitForAssets();
      
      // Small delay for layout stability
      await new Promise(resolve => setTimeout(resolve, 100));
      
      isInitialized = true;
      
      ctx = gsap.context(() => {
        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": function() {
            const totalSlides = slides.length + 1;
            const snapPoints = Array.from({ length: totalSlides }, (_, i) => i / (totalSlides - 1));
            const scrollDistance = slides.length * 350;
            
            // Initialize slides as invisible
            slideRefs.forEach((slideEl) => {
              if (!slideEl) return;
              gsap.set(slideEl, { opacity: 0 });
            });
            
            scrollTriggerInstance = ScrollTrigger.create({
              trigger: container,
              start: 'top top',
              end: () => `+=${scrollDistance}vh`,
              pin: true,
              scrub: 0.1,
              snap: {
                snapTo: snapPoints,
                duration: { min: 0.5, max: 1 },
                delay: 0.15,
                ease: 'power4.inOut',
                directional: false
              },
              onUpdate: (self) => {
                const progress = self.progress;
                const slideIndex = Math.floor(progress * totalSlides);
                
                // Update active step only when it changes (avoid Svelte re-renders every frame)
                const newStep = Math.max(0, Math.min(slideIndex, slides.length));
                if (newStep !== activeStep) activeStep = newStep;
                
                // Hero content fade out (0 to 0.2 progress)
                if (progress < 0.2) {
                  const fadeProgress = progress / 0.2;
                  gsap.set(heroContent, { 
                    opacity: 1 - fadeProgress, 
                    yPercent: -10 * fadeProgress 
                  });
                } else {
                  gsap.set(heroContent, { opacity: 0, yPercent: -10 });
                }
                
                // Phone animation (0.05 to 0.35 progress)
                if (progress <= 0.05) {
                  phoneProgress = 0;
                } else if (progress >= 0.35) {
                  phoneProgress = 1;
                } else {
                  phoneProgress = (progress - 0.05) / 0.30;
                }
                
                // Phone position: animate 'left' from 75% to 50% of viewport
                // left: 75% = phone on right side
                // left: 50% = phone at center
                // xPercent: -50 = offset by half the phone width to truly center it
                const leftValue = 75 - (25 * phoneProgress);
                
                gsap.set(phoneWrapper, { 
                  left: `${leftValue}%`,
                  xPercent: -50,
                  top: '50%',
                  yPercent: -50,
                  scale: 1 - (0.08 * phoneProgress)
                });
                
                // Slides animation
                slideRefs.forEach((slideEl, i) => {
                  if (!slideEl) return;
                  const slideStart = (i + 1) / totalSlides;
                  const slideEnd = (i + 2) / totalSlides;
                  
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
                        animateSlideText(slideEl, gsap);
                      }
                    }
                  } else {
                    gsap.set(slideEl, { opacity: 0 });
                  }
                });
              }
            });
            
            // Single refresh after setup
            ScrollTrigger.refresh();
          }
        });
      }, container);
    };
    
    // Initialize immediately - don't wait for full page load
    // This ensures scrollytelling works even while videos are still loading
    await init();
    
    // Refresh ScrollTrigger after full load to ensure layout accuracy
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => {
        if (isInitialized && ScrollTriggerModule) {
          ScrollTriggerModule.refresh();
        }
      }, { once: true });
    }
    
    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (isInitialized && ScrollTriggerModule) {
          ScrollTriggerModule.refresh();
        }
      }, 200);
    };
    
    // Visibility change handler
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && isInitialized && ScrollTriggerModule) {
        ScrollTriggerModule.refresh();
      }
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(resizeTimeout);
    };
  });
  
  function animateSlideText(slideEl: HTMLElement, gsap: any) {
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
  
  onDestroy(() => {
    ctx?.revert();
    audioObserver?.disconnect();
    if (browser) {
      window.removeEventListener('wheel', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    }
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
  <div class="absolute inset-0 noise-overlay opacity-20 pointer-events-none"></div>
  
  <!-- Step Progress Indicator (Desktop only) -->
  <div class="step-indicator" style="pointer-events: auto;">
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
  
  <!-- Main content with CSS Grid layout -->
  <div class="scrolly-content" style="pointer-events: none;">
    <!-- Hero text column -->
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
      
      <div class="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-10 justify-center lg:justify-start">
        <MagneticButton href="/contatti" variant="primary">
          Iniziamo a parlare
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </MagneticButton>
        <MagneticButton href="/coming-soon" variant="outline-white">
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
    
    <!-- Phone column - positioned via CSS Grid, no absolute positioning -->
    <div bind:this={phoneWrapper} class="phone-area">
      <PhoneMockup 
        youtubeId={heroVideoCloudinaryUrl ? undefined : heroVideoYoutubeId}
        videoSrc={heroVideoCloudinaryUrl}
        muted={videoMuted}
      />
    </div>
    
    <!-- Slides overlay -->
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
  
  {#if partnerNames.length > 0}
    <div class="partners-strip" aria-hidden="true">
      <p class="partners-label">Tra i nostri clienti</p>
      <div class="partners-marquee-wrapper">
        <div class="partners-marquee">
          {#each [0,1,2,3,4,5].flatMap(() => partnerNames) as name}
            <span class="partner-name">{name}</span>
            <span class="partner-sep">·</span>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Audio state badges – section-level, above partners strip -->
  {#if audioActiveVisible}
    <div class="audio-badge audio-on" aria-live="polite">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="audio-icon">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
      Audio attivato
    </div>
  {:else if !audioUnlocked}
    <div class="audio-badge audio-hint">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="audio-icon">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <line x1="23" y1="9" x2="17" y2="15"/>
        <line x1="17" y1="9" x2="23" y2="15"/>
      </svg>
      Scorri per audio
    </div>
  {/if}

  <div class="scroll-hint" aria-hidden="true">
    <div class="scroll-hint-line"></div>
    <span class="scroll-hint-text">SCROLL</span>
  </div>
</section>

<style>
  .apple-scrolly {
    position: relative;
    min-height: 100svh;
    overflow: hidden;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  .apple-scrolly::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 220px;
    background: linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%);
    z-index: 5;
    pointer-events: none;
  }
  
  @media (min-width: 1024px) {
    .apple-scrolly {
      height: 100vh;
      height: 100svh;
      min-height: 700px;
    }

    .apple-scrolly::after {
      height: 220px;
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
  
  /* ─── MOBILE FIRST: stacked, full-viewport hero ─────────────────────────── */
  .scrolly-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100svh;
    padding: 100px 5% 0;
    gap: 1.75rem;
    /* hero text sits in the upper portion; phone is absolutely positioned below */
    justify-content: flex-start;
  }

  .hero-text {
    flex-shrink: 0;
    max-width: 100%;
    text-align: center;
    pointer-events: auto;
    width: 100%;
    /* Must be above phone-area (z-index:2) so text/buttons remain readable and tappable */
    position: relative;
    z-index: 6;
  }

  /* Mobile: phone peeking from the bottom, strictly behind all hero content.
   *
   * Playwright measurements (390×844 viewport):
   *   badgeBottom = 613px  (bottom of last badge row)
   *   phoneTop    = 473px  (visual top of phone with bottom:-50, scale:0.68)
   *   phone natural height H = 619px  →  H × 0.68 = 421px visible height
   *
   * Formula: phoneTop = (section_h + |bottom|) − H×scale
   *   To get phoneTop = 583px (30px below badges, acceptable since z-index:6 hero-text
   *   ensures badges always render ON TOP of the phone):
   *   |bottom| = 583 − 844 + 421 = 160px  →  bottom: -160px
   *
   * Visible phone on iPhone 14 (844px): 583–844 = 261px total
   *   - Non-faded (above 120px gradient): 583–724 = 141px  ← Dynamic Island + video
   *   - Fading: 724–844 = 120px (soft, gradual fade — no hard clip appearance)
   * Result on iPhone 14 real device (+34px safe area): phoneTop = 617px ✓ (4px above badges)
   * Result on iPhone 12 Mini (812px):                 phoneTop = 573px (40px overlap, z-index handles it) ✓
   * iPhone SE (≤700px height) hidden by rule below. */
  .phone-area {
    position: absolute;
    bottom: -160px;
    left: 50%;
    transform: translateX(-50%) scale(0.68);
    transform-origin: bottom center;
    z-index: 2;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Mobile bottom gradient: 120px soft fade lets 141px of phone show clearly
   * before fading, preventing any hard-clip appearance at the section boundary.
   * Gradient sits at z-index:5 (above phone:2, below hero-text:6) — it masks the
   * phone from bleeding through transparent ghost buttons in the hero-text layer. */
  @media (max-width: 767px) {
    .apple-scrolly::after {
      height: 120px;
    }
  }

  /* Hide phone on very short screens (iPhone SE ≤667px): overlap would be ~160px */
  @media (max-height: 700px) and (max-width: 767px) {
    .phone-area {
      display: none;
    }
  }

  /* ─── TABLET PORTRAIT (768px – 1023px): two-column layout ───────────────── */
  @media (min-width: 768px) and (max-width: 1023px) {
    .scrolly-content {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      padding: 110px 6% 80px;
      gap: 3rem;
      min-height: 100svh;
      justify-content: center;
    }

    .hero-text {
      text-align: left;
      max-width: 100%;
    }

    /* Override mobile absolute positioning – phone is in the grid flow */
    .phone-area {
      position: relative;
      bottom: auto;
      left: auto;
      transform: scale(0.88);
      transform-origin: center center;
    }
  }

  /* ─── LANDSCAPE MOBILE (short screen ≤ 500px height, < 1024px wide) ──────── */
  @media (max-height: 500px) and (max-width: 1023px) {
    .apple-scrolly {
      min-height: auto;
    }
    .scrolly-content {
      min-height: auto;
      padding-top: 72px;
      padding-bottom: 40px;
      gap: 1rem;
      justify-content: center;
    }
    /* Hide phone on landscape mobile – too cramped */
    .phone-area {
      display: none;
    }
  }

  /* ─── DESKTOP (1024px+): GSAP-controlled, full-screen pinned ────────────── */
  @media (min-width: 1024px) {
    .scrolly-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 100%;
      min-height: unset;
      align-items: center;
      padding: 100px 6% 0;
      gap: 2rem;
      justify-content: unset;
    }

    .hero-text {
      max-width: 600px;
      text-align: left;
      justify-self: start;
    }

    /* Phone area - GSAP controls exact position via inline styles */
    .phone-area {
      position: absolute;
      bottom: auto;
      left: 75%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      z-index: 5;
      transform-origin: center center;
      will-change: transform, opacity;
    }
  }
  
  /* Slides - absolute positioned overlay */
  .slide {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-width: 480px;
    opacity: 0;
    z-index: 20;
    min-height: clamp(200px, 30svh, 300px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .slide-left {
    left: 6%;
  }
  
  .slide-right {
    right: 6%;
  }

  @media (min-width: 1024px) {
    .slide-left,
    .slide-right {
      max-width: min(480px, calc(50% - 6% - 170px));
    }
  }
  
  @media (max-width: 1023px) {
    .slide {
      display: none;
    }
  }
  
  .slide-title {
    font-size: clamp(1.75rem, 3.5vw, 4.5rem);
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
    font-size: clamp(0.95rem, 1.1vw, 1.125rem);
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  /* Vertical scroll hint – left edge, no overlap with partners strip */
  .scroll-hint {
    position: absolute;
    left: 1.5rem;
    bottom: 22%;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    opacity: 0.45;
    pointer-events: none;
  }

  .scroll-hint-line {
    width: 1px;
    height: 3rem;
    background: linear-gradient(to bottom, var(--text-secondary, rgba(255,255,255,0.5)), transparent);
    transform-origin: top;
    animation: scroll-line-drop 2.4s ease-in-out infinite;
  }

  .scroll-hint-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 0.6rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--text-secondary, rgba(255,255,255,0.5));
    font-weight: 500;
  }

  @keyframes scroll-line-drop {
    0%   { transform: scaleY(0); opacity: 0; transform-origin: top; }
    45%  { transform: scaleY(1); opacity: 1; transform-origin: top; }
    55%  { transform: scaleY(1); opacity: 1; transform-origin: bottom; }
    100% { transform: scaleY(0); opacity: 0; transform-origin: bottom; }
  }

  @media (max-width: 1023px) {
    .scroll-hint {
      display: none;
    }
  }

  .desc-char {
    display: inline-block;
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
    gap: 0.625rem;
    margin-bottom: 1.25rem;
    padding: 0.625rem 1.25rem;
    background: rgba(214, 72, 126, 0.18);
    border: 1px solid rgba(214, 72, 126, 0.35);
    border-radius: 9999px;
    width: fit-content;
    backdrop-filter: blur(8px);
  }
  
  .slide-step-icon {
    font-size: 1.5rem;
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

  /* Audio state badges – section-level, right side above partners strip */
  .audio-badge {
    position: absolute;
    right: 2rem;
    bottom: 7rem;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
    pointer-events: none;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .audio-hint {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.5);
    animation: audio-hint-pulse 3s ease-in-out infinite;
  }

  .audio-on {
    background: rgba(214, 72, 126, 0.2);
    border: 1px solid rgba(214, 72, 126, 0.4);
    color: #D6487E;
    animation: audio-on-in 0.4s ease both, audio-on-out 0.5s ease 2s both;
  }

  .audio-icon {
    width: 0.85rem;
    height: 0.85rem;
    flex-shrink: 0;
  }

  @keyframes audio-hint-pulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }

  @keyframes audio-on-in {
    from { opacity: 0; transform: scale(0.9) translateY(4px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes audio-on-out {
    from { opacity: 1; }
    to   { opacity: 0; }
  }

  :global([data-theme="light"]) .audio-hint {
    background: rgba(0, 0, 0, 0.06);
    border-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.4);
  }

  /* Partners strip */
  .partners-strip {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 6;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
    mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%);
    animation: partners-fade-in 1.2s ease 0.8s both;
    pointer-events: none;
  }

  @keyframes partners-fade-in {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .partners-label {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--text-secondary, rgba(255,255,255,0.4));
    opacity: 0.6;
    margin: 0;
  }

  .partners-marquee-wrapper {
    width: 100%;
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  }

  .partners-marquee {
    display: flex;
    align-items: center;
    gap: 0;
    width: max-content;
    animation: partners-scroll 35s linear infinite;
  }

  @keyframes partners-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(calc(-100% / 6)); }
  }

  .partner-name {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-primary, rgba(255,255,255,0.7));
    opacity: 0.55;
    white-space: nowrap;
    padding: 0 0.5rem;
    letter-spacing: 0.03em;
    transition: opacity 0.2s;
  }

  .partner-sep {
    color: #D6487E;
    opacity: 0.45;
    font-size: 0.6rem;
    padding: 0 0.25rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .partners-marquee {
      animation: none;
    }
  }
</style>
