<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { browser } from '$app/environment';
  import PhoneMockup from './PhoneMockup.svelte';
  import MagneticButton from './MagneticButton.svelte';
  import RippleGrid from './RippleGrid.svelte';
  
  export let credibilityBadges: { icon: string; label: string }[] = [];
  export let partnerNames: string[] = [];
  export let partners: { name: string; logo?: string }[] = [];
  export let heroVideoCloudinaryUrl: string | undefined = undefined;
  export let heroVideoYoutubeId: string | undefined = 'Rj5N4BMF-Vw';
  // Cloudinary thumbnail URL for the hero video. Passed to PhoneMockup as primary
  // poster image so in-app browsers (Instagram, Facebook WebViews) can show content
  // even when they block cross-origin requests to img.youtube.com.
  export let heroVideoThumbnailUrl: string | undefined = undefined;

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
  // slideAnimated removed — text animation now replays on every snap/re-entry
  // so each landing at a step feels alive and reinforces the magnetic snap.
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
  
  // Send unMute + setVolume to every YouTube iframe currently in the DOM.
  // MUST be called directly from a qualifying user-gesture handler (click,
  // pointerdown, keydown, touchstart).  Calling it from a Svelte reactive,
  // onReady, or a postMessage callback will trigger YouTube's autoplay-policy
  // guard and cause it to pause the video instead ("Unmuting failed…").
  function sendUnmuteToIframes() {
    if (!browser) return;
    document.querySelectorAll<HTMLIFrameElement>('iframe[src*="youtube"]').forEach(iframe => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*'
      );
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*'
      );
    });
  }

  function unlockAudio() {
    if (!audioUnlocked) {
      audioUnlocked = true;
      videoMuted = false;
      audioActiveVisible = true;
      setTimeout(() => { audioActiveVisible = false; }, 2500);

      // Send unMute synchronously while still in the gesture call-stack.
      // touchstart qualifies; wheel does NOT on some browsers/YouTube versions
      // (see retryUnmute below for the reliable fallback).
      sendUnmuteToIframes();
    }
  }

  // Called from click / pointerdown / keydown listeners — these are qualifying
  // user-activation events on every browser including Safari iOS.  If unlockAudio
  // was already triggered via wheel (which may NOT qualify) and YouTube rejected
  // the unMute (pausing the video), this will un-pause and unmute cleanly on the
  // user's next natural interaction with the page.
  function retryUnmute() {
    if (!audioUnlocked || videoMuted) return;
    sendUnmuteToIframes();
    // If YouTube paused the video because an earlier unMute failed, we also need
    // to resume playback.  Send playVideo so it resumes from where it froze.
    if (browser) {
      document.querySelectorAll<HTMLIFrameElement>('iframe[src*="youtube"]').forEach(iframe => {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*'
        );
      });
    }
  }

  onMount(async () => {
    if (!browser) return;
    
    // Wait for DOM bindings to be ready
    await tick();
    
    if (!container) return;

    // --- Audio management ---
    // Unlock audio on first user gesture.
    // wheel   = desktop scroll  (fires first, but is NOT a qualifying activation on
    //           some browsers/YouTube versions — retryUnmute below recovers from this)
    // touchstart = mobile touch (always a qualifying activation)
    window.addEventListener('wheel', unlockAudio, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });

    // Gesture-safe unMute retry: click / pointerdown / keydown ARE qualifying
    // user-activation events on every browser including Safari iOS.
    // retryUnmute is a no-op until audioUnlocked=true, so these listeners are
    // harmless during normal page interaction. They recover the case where wheel
    // fired unlockAudio but YouTube rejected the unMute (pausing the video) —
    // the user's next click or keypress will resume + unmute in proper context.
    window.addEventListener('pointerdown', retryUnmute, { passive: true });
    window.addEventListener('keydown', retryUnmute, { passive: true });

    // Mute/unmute based on whether the hero is in viewport
    audioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Re-enter viewport: unmute if user had already unlocked audio.
          // Also call sendUnmuteToIframes() directly: the Svelte reactive only
          // handles mute now (not unMute, to avoid gesture-policy rejections on
          // first load). For already-playing muted videos on re-entry this send
          // is safe — browsers only restrict starting playback, not unMuting a
          // video that is already in a playing state. retryUnmute() on pointerdown
          // acts as a fallback for strict browsers (Safari desktop).
          if (audioUnlocked) {
            videoMuted = false;
            sendUnmuteToIframes();
          }
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
            // Per-step scroll distance (in vh).  Higher = more scroll needed
            // to advance from one step to the next, giving the user more time
            // to read each panel before the next snap triggers.
            const scrollDistance = slides.length * 800;
            
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
              anticipatePin: 1,
              // scrub: 0.5 keeps the visual tightly coupled to the scroll position
              // so the snap animation and the visual are always in sync.
              // 0.8 was too slow — the scrub was still "chasing" scroll when snap fired,
              // creating a disjointed lag instead of a magnetic pull.
              scrub: 0.5,
              snap: {
                snapTo: snapPoints,
                // Firmer, more decisive pull toward each step.  With the longer
                // per-step distance (800vh), a slightly longer snap feels right —
                // it confirms "you've landed" rather than just nudging.
                duration: { min: 0.5, max: 0.9 },
                // Fire snap quickly after the user stops scrolling so the
                // alignment feels immediate and intentional, not delayed.
                delay: 0.08,
                // power3.out: stronger initial grab → smooth deceleration.
                // Reinforces the "magnet snapping to a surface" feel and helps
                // the user clearly perceive each step as a discrete reading unit.
                ease: 'power3.out',
                directional: true
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
                
                // Phone position: CSS sets left:50% xPercent:-50 (centred baseline).
                // We offset rightward with x (translateX) — a pure GPU transform that
                // does NOT trigger layout reflows. The old left:% animation recalculated
                // layout on every frame (60 fps), which caused the YouTube iframe GPU
                // composite layer to stutter/freeze during the slide-in.
                //
                // x = 25vw → 0 as phoneProgress goes 0 → 1
                //   (phone appears at 75% from left initially, slides to center)
                gsap.set(phoneWrapper, { 
                  x: (1 - phoneProgress) * window.innerWidth * 0.25,
                  xPercent: -50,
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
                      // Animate every time (no once-only guard) so each snap landing
                      // plays the entrance animation fresh — reinforces the magnetic feel.
                      animateSlideText(slideEl, gsap);
                    }
                  } else {
                    // Reset currentSlide so re-entry fires animateSlideText again.
                    // Without this: hero→slide0→hero→slide0 → second visit has
                    // i===currentSlide → animateSlideText never fires → headline stays
                    // opacity:0 from the gsap.set reset below.
                    if (currentSlide === i) currentSlide = -1;
                    gsap.set(slideEl, { opacity: 0 });
                    // Reset text elements so the entrance animation plays cleanly on re-entry.
                    // Without this, desc-chars would retain their animated-in state (opacity 1)
                    // and the next visit to the slide would skip the stagger animation.
                    const title = slideEl.querySelector('.slide-title');
                    const descChars = slideEl.querySelectorAll('.desc-char');
                    if (title) gsap.set(title, { opacity: 0, y: 40, scale: 0.95 });
                    if (descChars.length) gsap.set(descChars, { opacity: 0, y: 20 });
                  }
                });
              }
            });
            
            // Apply the phone's initial GSAP position immediately — before the first
            // onUpdate fires. Without this the CSS centres the phone (left:50%,
            // translate(-50%,-50%)) and then the first onUpdate jumps it rightward,
            // creating the visible "appears-at-centre-then-snaps" glitch on load.
            // At progress=0: phoneProgress=0, x = 0.25*vw, xPercent=-50, scale=1.
            gsap.set(phoneWrapper, {
              x: window.innerWidth * 0.25,
              xPercent: -50,
              yPercent: -50,
              scale: 1
            });

            // ⚠️ DO NOT call ScrollTrigger.refresh() here.
            //
            // GSAP 3's ScrollTrigger.matchMedia() re-runs ALL matching callbacks on
            // every refresh() call. Calling refresh() inside a matchMedia callback
            // therefore creates an infinite loop:
            //   matchMedia callback → ScrollTrigger.create() (adds event listeners)
            //                       → refresh() → matchMedia re-evals
            //                       → callback runs again → create() (more listeners)
            //                       → refresh() → … repeat thousands of times
            // This produced 15,000+ "non-passive event listener" violations in Chrome.
            //
            // The post-setup layout refresh is already provided by:
            //   1. AirplaneEasterEgg: calls ScrollTrigger.refresh() at 600 ms and 800 ms
            //      (outside any matchMedia callback — safe).
            //   2. window 'load' listener below: fires once when all assets are loaded.
            //   3. Debounced resize handler below: fires after viewport changes.
            // Those callers are outside the matchMedia callback, so they cannot loop.
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
    
    // Kill any in-flight tweens from a previous visit before re-animating.
    // Without this, repeated snapping to the same slide stacks tweens that
    // fight each other and produce a stuttering/flickering result.
    if (title) gsap.killTweensOf(title);
    if (descChars.length) gsap.killTweensOf(descChars);
    
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
      window.removeEventListener('pointerdown', retryUnmute);
      window.removeEventListener('keydown', retryUnmute);
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
      
      <!-- Desktop/tablet: credibility badges inside hero-text (left column) -->
      <div class="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start cred-badges-desktop">
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
    
    <!-- Phone column: on mobile this is in normal flex flow between buttons and badges -->
    <div bind:this={phoneWrapper} class="phone-area">
      <PhoneMockup 
        youtubeId={heroVideoCloudinaryUrl ? undefined : heroVideoYoutubeId}
        videoSrc={heroVideoCloudinaryUrl}
        thumbnailUrl={heroVideoThumbnailUrl}
        muted={videoMuted}
      />
    </div>

    <!-- Mobile only: credibility badges appear BELOW the phone mockup.
         On desktop/tablet these are hidden — the desktop version lives inside .hero-text above. -->
    <div class="cred-badges-mobile" aria-hidden="true">
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
  
  {#if partners.length > 0 || partnerNames.length > 0}
    <div class="partners-strip" aria-hidden="true">
      <p class="partners-label">Tra i nostri clienti</p>
      <div class="partners-marquee-wrapper">
        <div class="partners-marquee">
          {#if partners.length > 0}
            {#each [0,1,2,3,4,5].flatMap(() => partners) as p}
              {#if p.logo}
                <img src={p.logo} alt={p.name} class="partner-logo" loading="lazy" decoding="async" />
              {:else}
                <span class="partner-name">{p.name}</span>
              {/if}
              <span class="partner-sep">·</span>
            {/each}
          {:else}
            {#each [0,1,2,3,4,5].flatMap(() => partnerNames) as name}
              <span class="partner-name">{name}</span>
              <span class="partner-sep">·</span>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <!-- Audio state badges – ALWAYS in DOM, hidden via CSS class only.
       Using {#if} here caused a NotFoundError crash in GSAP's ScrollTrigger:
       when audioUnlocked/audioActiveVisible changed mid-scroll, Svelte removed
       these nodes from the pinned container and GSAP's insertBefore pin-spacer
       logic referenced a stale node → crash → full hero section re-render.
       Fix: keep both badge divs permanently in the DOM; toggle "audio-badge-gone"
       (display:none) so GSAP never sees a structural DOM change during scroll.
       Changing display:none → flex (or vice versa) also correctly re-triggers
       the CSS keyframe animations (audio-on-in / audio-on-out). -->
  <div class="audio-badge audio-on" aria-live="polite" class:audio-badge-gone={!audioActiveVisible}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="audio-icon">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
    Audio attivato
  </div>
  <div class="audio-badge audio-hint" class:audio-badge-gone={audioUnlocked}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="audio-icon">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
    Scorri per audio
  </div>

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

  /* ─── MOBILE phone: in normal flex flow between buttons and badges ───────────
   *
   * The phone is no longer absolutely positioned on mobile. It sits in the
   * flex column between .hero-text (title+buttons) and .cred-badges-mobile.
   *
   * scale(0.65) gives a visual height of ~351px (540 × 0.65) on small phones
   * and ~371px (570 × 0.65) on wider phones. The CSS layout box is still the
   * full unscaled height, so we use negative margins to collapse the dead space:
   *   margin = −(unscaledH × (1−0.65) / 2) ≈ −95px for 540px, −100px for 570px
   * Using −95px for both (3px discrepancy on wider phones is imperceptible).
   *
   * Total estimated height on 390×844 iPhone 14:
   *   100px padding-top + ~280px hero-text + 0 gap + (540−2×95)px phone + 0 gap
   *   + ~115px cred-badges-mobile  ≈ 850px  ← fits comfortably. */
  .phone-area {
    position: relative;
    bottom: auto;
    left: auto;
    transform: scale(0.65);
    transform-origin: center center;
    margin-top: -95px;
    margin-bottom: -95px;
    z-index: 2;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Mobile scrolly-content gap controls the visual spacing on BOTH sides of the phone.
   *
   * Because scale(0.65) is applied via CSS transform, the phone's layout box is still
   * its full unscaled height (540px or 570px). The negative margins collapse the dead
   * space above/below the visual phone, leaving a visual gap that equals:
   *
   *   visual_gap = CSS_gap + (phone_unscaled_H × (1 − scale) / 2) − |margin|
   *             ≈ CSS_gap + 94.5 − 95  =  CSS_gap − 0.5px
   *
   * With CSS_gap = 1.5rem (24px):
   *   visual_gap ≈ 23.5 px  on both sides of the phone  ✓ equal
   *
   * The third gap (badges → "Tra i nostri clienti" marquee) is set by padding-bottom
   * on .cred-badges-mobile: gap = padding-bottom − partners_strip_height (~86px).
   *   110px − 86px = 24px  ≈  same as the two phone gaps  ✓ */
  @media (max-width: 767px) {
    .scrolly-content {
      gap: 1.5rem;
    }
  }

  /* Reduce bottom gradient on mobile: phone is no longer at the section bottom */
  @media (max-width: 767px) {
    .apple-scrolly::after {
      height: 80px;
    }
  }

  /* This rule was previously max-height: 700px which incorrectly caught all iPhones
   * in portrait with Safari chrome visible (viewport ≈ 600–680px). Removed: the
   * landscape rule at max-height: 500px already handles truly short screens.
   * Portrait iPhones (SE included) should see the phone — they can scroll. */

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

    /* Override mobile flow positioning – tablet uses grid */
    .phone-area {
      position: relative;
      bottom: auto;
      left: auto;
      transform: scale(0.88);
      transform-origin: center center;
      /* Reset mobile negative margins */
      margin-top: 0;
      margin-bottom: 0;
    }

    /* Hide mobile duplicate badges on tablet+ */
    .cred-badges-mobile {
      display: none !important;
    }

    /* Show desktop badges on tablet+ */
    .cred-badges-desktop {
      display: flex !important;
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

    /* Phone area - GSAP controls exact position via transforms only (no left/top changes).
     * left:50% + xPercent:-50 centres the phone horizontally; GSAP then uses x (translateX)
     * to offset it rightward. This avoids per-frame layout reflows that the old left:%
     * animation caused — those reflows interrupted the YouTube iframe GPU composite layer
     * and produced visible video stutter/freeze during the phone slide-in animation.
     *
     * Initial CSS transform mirrors GSAP's starting state (phoneProgress=0):
     *   x = 0.25vw, xPercent = -50  →  net translateX = 25vw - 50% (element width)
     * This pre-positions the phone at ~75% from the left so it never appears centred
     * and then jumps rightward when GSAP initialises (~200ms after mount). */
    .phone-area {
      position: absolute;
      bottom: auto;
      left: 50%;
      top: 50%;
      transform: translateX(calc(25vw - 50%)) translateY(-50%);
      z-index: 5;
      transform-origin: center center;
      will-change: transform, opacity;
      /* Reset mobile negative margins — they would shift an absolute element */
      margin-top: 0;
      margin-bottom: 0;
    }

    /* Desktop: show badges inside hero-text, hide mobile duplicate */
    .cred-badges-mobile {
      display: none !important;
    }
    .cred-badges-desktop {
      display: flex !important;
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

  /* Hides badge without removing it from the DOM.
     display:none is used (not visibility/opacity) so GSAP's pin spacer never
     sees a structural DOM change — only a style change, which is safe. */
  .audio-badge-gone {
    display: none;
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

  /* ─── CREDIBILITY BADGES: desktop version (inside hero-text) ───────────── */
  /* Default: visible (desktop/tablet show them inside hero-text column).
   * Mobile overrides hide them and show .cred-badges-mobile instead. */
  .cred-badges-desktop {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 767px) {
    .cred-badges-desktop {
      display: none !important;
    }
  }

  /* ─── CREDIBILITY BADGES: mobile version (below phone mockup) ───────────── */
  /* Hidden by default (desktop/tablet); shown only on mobile. */
  .cred-badges-mobile {
    display: none;
  }

  @media (max-width: 767px) {
    .cred-badges-mobile {
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem 1.25rem;
      justify-content: center;
      align-items: center;
      width: 100%;
      position: relative;
      z-index: 6;
      /* padding-bottom = partners_strip_height (~75px) + desired_gap (24px) = 99px ≈ 6rem.
       * Strip height: label (~14px) + gap (10px) + marquee (~18px) + padding-bottom (32px) ≈ 74px.
       * This keeps the gap from the last badge to "Tra i nostri clienti" equal to
       * the two gaps on either side of the phone (~24px each). */
      padding-bottom: 6rem;
      pointer-events: auto;
    }
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

  .partner-logo {
    height: 22px;
    width: auto;
    object-fit: contain;
    flex-shrink: 0;
    padding: 0 0.75rem;
    filter: brightness(0) invert(1);
    opacity: 0.55;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
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
