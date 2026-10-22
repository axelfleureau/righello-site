<script lang="ts">
  import { contactHref } from '$lib/data/contact';
  import { onMount, onDestroy, tick } from 'svelte';
  import { browser } from '$app/environment';
  import PhoneMockup from './PhoneMockup.svelte';
  import MagneticButton from './MagneticButton.svelte';
  import RippleGrid from './RippleGrid.svelte';
  import { logoSize, logoSagoma, logoSagomaSuChiaro, larghezzaRiquadroMax } from '$lib/data/logos';
  
  export let credibilityBadges: { icon: string; label: string }[] = [];
  export let partners: { name: string; logo?: string; noFilter?: boolean }[] = [];
  export let heroVideoCloudinaryUrl: string | undefined = undefined;
  export let heroVideoYoutubeId: string | undefined = 'Rj5N4BMF-Vw';
  // Cloudinary thumbnail URL for the hero video. Passed to PhoneMockup as primary
  // poster image so in-app browsers (Instagram, Facebook WebViews) can show content
  // even when they block cross-origin requests to img.youtube.com.
  export let heroVideoThumbnailUrl: string | undefined = undefined;

  /**
   * Fascia «Tra i nostri clienti»: i loghi vanno due volte (la seconda copia riempie il vuoto mentre
   * la prima esce, translateX(-50%) = esattamente una copia) e sono divisi in 4 tronconi, ognuno nel
   * suo livello composito: un unico livello largo ~7800 px (x3 sugli iPhone = ~23000 px di texture)
   * supera il limite delle GPU mobili; ogni troncone ne resta sotto la meta' di quel limite.
   * La prima copia e' eager (serve subito); la seconda e' lazy: sono gli stessi file, quindi non costa
   * una richiesta in piu' (arrivano dalla cache) ma 41 immagini non si decodificano al caricamento.
   */
  let marqueeEl: HTMLElement;
  let logoRotti: Record<string, boolean> = {};
  type LogoFascia = { name: string; logo?: string; src?: string; w?: number; h?: number; maxW?: number; noFilter: boolean; sagomaChiaro: boolean };
  function logoFascia(p: { name: string; logo?: string; noFilter?: boolean }): LogoFascia {
    const dim = p.logo ? logoSize(p.logo) : undefined;
    const maxW = dim ? larghezzaRiquadroMax(dim.width, dim.height) : 100;
    return {
      name: p.name, logo: p.logo, noFilter: !!p.noFilter,
      // in sagoma (filtro) si usa la versione senza targa piena; a colori il file vero
      src: p.logo ? (p.noFilter ? p.logo : logoSagoma(p.logo)) : undefined,
      w: dim?.width, h: dim?.height, maxW: maxW === 100 ? undefined : maxW,
      sagomaChiaro: !!p.logo && !!p.noFilter && logoSagomaSuChiaro(p.logo)
    };
  }
  $: partnerSegments = [0, 1].flatMap((copia) => {
    const logos = partners.map(logoFascia);
    const meta = Math.ceil(logos.length / 2);
    return [logos.slice(0, meta), logos.slice(meta)].map((seg) => ({ lazy: copia > 0, logos: seg }));
  });
  onMount(() => {
    // Un logo che non si e' caricato prima dell'idratazione non manda piu' l'evento `error` a Svelte:
    // si cerca qui e ricade sul nome, invece di lasciare un buco nella corsia.
    marqueeEl?.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) {
        const logo = partnerSegments.flatMap((s) => s.logos).find((p) => p.src === img.getAttribute('src'))?.logo;
        if (logo) logoRotti = { ...logoRotti, [logo]: true };
      }
    });
  });

  let videoMuted = true;
  let audioUnlocked = false;
  let audioActiveVisible = false;
  let audioObserver: IntersectionObserver | null = null;
  // L'audio parte alla prima attivazione utente valida (clic, tocco, tasto) con la hero in vista:
  // lo scorrimento (rotella, trackpad, swipe) NON e' un'attivazione e nessun browser lo permette.
  // heroInView alimenta il controllo «Attiva l'audio» sul telefono per chi scorre soltanto.
  let heroInView = false;
  let reduceMotion = false;
  let audioFailures = 0;
  let audioActiveTimer: ReturnType<typeof setTimeout>;
  let audioVerifyTimer: ReturnType<typeof setTimeout>;
  let audioRampFrame = 0;
  $: audioOn = audioUnlocked && !videoMuted;
  $: showAudioCue = heroInView && !audioOn;
  /** Entrata progressiva del volume, per non spaventare chi si trova il suono all'improvviso. */
  const AUDIO_FADE_MS = 400;
  /** Dopo tanti rifiuti del browser (iOS in risparmio energetico, Safari) non si insiste da soli: si aspetta il gesto successivo. */
  const AUDIO_MAX_AUTO_FAILURES = 2;
  /** Tasti che non esprimono l'intenzione di guardare il video: modificatori, Esc e Tab (sposta solo il focus: chi naviga a tastiera o con un lettore di schermo non si trova il suono addosso). */
  const IGNORED_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Fn', 'NumLock', 'ScrollLock', 'Escape', 'AltGraph', 'OS', 'ContextMenu', 'Tab']);
  
  const heroSlide = {
    subtitle: 'Agenzia Marketing',
    title: 'La tua crescita,',
    titleGradient: 'inquadrata alla perfezione.',
    description: 'Marketing, advertising e sviluppo digitale a Pordenone e Mestre con un approccio data-driven. Ogni euro investito, ogni conversione tracciata.'
  };
  
  /** Scroll (in altezze di finestra x100) per ogni passo della hero fissa: regola la lunghezza della hero. */
  const HERO_STEP_VH = 200;

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
  let mm: any = null;
  let lastPhoneX = -Infinity;
  let currentSlide = -1;
  let activeStep = 0;
  // Fuori dal proprio intervallo ogni pannello e il testo di apertura vanno riportati a
  // "spento" UNA volta, non a ogni tick dello scroll: lo stesso valore riscritto su ~400
  // elementi per fotogramma costava uno ricalcolo di stile continuo per niente.
  let heroHidden = false;
  let slideIdle: boolean[] = [];
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
  let heroVideoPauseTimer: ReturnType<typeof setTimeout>;
  
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

  function heroVideoEl(): HTMLVideoElement | null {
    return container?.querySelector<HTMLVideoElement>('.phone-screen video') ?? null;
  }

  function rampVolume(v: HTMLVideoElement) {
    cancelAnimationFrame(audioRampFrame);
    const t0 = performance.now();
    const step = (now: number) => {
      // il tempo del fotogramma puo' precedere t0 di qualche ms: senza il minimo a 0 il volume va sotto zero e lancia
      const k = Math.min(1, Math.max(0, (now - t0) / AUDIO_FADE_MS));
      v.volume = k;
      if (k < 1) audioRampFrame = requestAnimationFrame(step);
    };
    audioRampFrame = requestAnimationFrame(step);
  }

  /** Il browser ha rifiutato il suono (video fermato o ancora muto): si torna a muto in riproduzione, senza schermo fermo. */
  function revertToMuted() {
    cancelAnimationFrame(audioRampFrame);
    const v = heroVideoEl();
    if (v) { v.muted = true; v.volume = 1; if (!reduceMotion) v.play().catch(() => {}); }
    audioUnlocked = false;
    videoMuted = true;
    audioActiveVisible = false;
    clearTimeout(audioActiveTimer);
    audioFailures++;
  }

  function verifyAudio() {
    clearTimeout(audioVerifyTimer);
    audioVerifyTimer = setTimeout(() => {
      const v = heroVideoEl();
      if (!v || !audioUnlocked || !heroInView || document.hidden) return;
      if (v.paused || v.muted) revertToMuted();
    }, AUDIO_FADE_MS + 150);
  }

  // Toglie il muto al video della hero. Va chiamata DENTRO un gesto (o, a gesto gia' dato, perche' l'attivazione
  // e' persistente per la pagina). Idempotente. Il percorso YouTube resta sulle postMessage (stesso gesto).
  function requestHeroAudio() {
    if (!browser) return;
    const v = heroVideoEl();
    const first = !audioUnlocked;
    audioUnlocked = true;
    videoMuted = false;
    if (v) {
      if (v.muted || v.volume === 1) v.volume = 0;
      v.muted = false;
      if (v.paused) v.play().catch(() => {});
      rampVolume(v);
      verifyAudio();
    }
    sendUnmuteToIframes();
    // Gesto successivo a un unMute rifiutato (YouTube lo ferma): oltre a togliere il muto, riprende la riproduzione.
    if (!first) playYoutube();
    if (first) {
      audioActiveVisible = true;
      clearTimeout(audioActiveTimer);
      audioActiveTimer = setTimeout(() => { audioActiveVisible = false; }, 2500);
    }
  }

  // Chiamata dal tocco sul play del telefono (percorso YouTube con autoplay bloccato).
  function unlockAudio() {
    if (!audioUnlocked) requestHeroAudio();
  }

  // Vale come attivazione solo cio' che il browser stesso conta: clic/pressione del mouse, tocco (alla
  // fine, solo se non e' uno scorrimento), tasti veri. Esc e i soli modificatori no, rotella e swipe no.
  function onUserActivation(e: Event) {
    if (e instanceof KeyboardEvent && IGNORED_KEYS.has(e.key)) return;
    if (e.type === 'pointerdown' && (e as PointerEvent).pointerType === 'touch') return;
    if (!heroInView && !audioUnlocked) return;
    // Movimento ridotto: il video parte solo dal controllo esplicito, non da un clic qualunque.
    if (reduceMotion) return;
    if (audioUnlocked && audioOn) {
      // Gia' attivo: se il browser lo aveva fermato/silenziato (iframe non pronto, Safari), ritenta col gesto nuovo.
      const v = heroVideoEl();
      if (v && !v.paused && !v.muted) return;
    }
    requestHeroAudio();
  }

  function onAudioCue() {
    if (reduceMotion) { const v = heroVideoEl(); v?.play().catch(() => {}); }
    audioFailures = 0;
    requestHeroAudio();
  }

  // Scheda in secondo piano: video fermo (e niente audio che continua); al ritorno riprende, con suono se era attivo.
  function onVisibilityChange() {
    const v = heroVideoEl();
    if (document.hidden) {
      clearTimeout(heroVideoPauseTimer);
      v?.pause();
      pauseYoutube();
    } else if (heroInView && v && (!reduceMotion || audioUnlocked)) {
      v.play().catch(() => { if (audioUnlocked) revertToMuted(); });
      if (audioUnlocked) verifyAudio();
    }
  }

  function playYoutube() {
    if (!browser) return;
    document.querySelectorAll<HTMLIFrameElement>('iframe[src*="youtube"]').forEach(iframe => {
      iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
    });
  }

  function pauseYoutube() {
    if (!browser) return;
    document.querySelectorAll<HTMLIFrameElement>('iframe[src*="youtube"]').forEach(iframe => {
      iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
    });
  }

  // Alcuni browser (Safari con «Consenti sempre», Firefox con permesso, Chrome con alto coinvolgimento
  // sul sito) dichiarano che il suono automatico e' permesso: li' il suono parte senza alcun gesto.
  function tryPolicyAutounmute() {
    const v = heroVideoEl();
    const nav = navigator as Navigator & { getAutoplayPolicy?: (el: HTMLMediaElement) => string };
    if (!v || reduceMotion || audioFailures >= AUDIO_MAX_AUTO_FAILURES) return;
    try {
      if (nav.getAutoplayPolicy?.(v) === 'allowed') requestHeroAudio();
      // Gesto gia' dato su questa pagina (banner dei cookie, menu, clic precedente): l'attivazione e'
      // persistente, il suono puo' partire senza altro gesto. Se il browser rifiuta, verifyAudio torna a muto.
      else if ((navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive) requestHeroAudio();
    } catch { /* API non disponibile: si resta sul gesto */ }
  }

  // Primo movimento della pagina (rotella, dito, scorrimento): se nel frattempo il browser ha concesso il suono
  // (attivazione data prima dello scorrimento) parte ora; altrimenti nulla, ci pensa il controllo sul telefono.
  function onFirstMove() {
    ['wheel', 'touchmove', 'scroll'].forEach(t => window.removeEventListener(t, onFirstMove));
    if (heroInView && !audioUnlocked) tryPolicyAutounmute();
  }

  onMount(async () => {
    if (!browser) return;
    
    // Wait for DOM bindings to be ready
    await tick();
    
    if (!container) return;

    // --- Audio management ---
    // Lo scorrimento non sblocca l'audio (nessun browser lo consente e un unMute fuori da un
    // gesto fa FERMARE il video: provato su Chrome). Il primo clic / tocco / tasto qualunque con la
    // hero in vista toglie il muto; chi scorre soltanto ha il controllo «Attiva l'audio» sul
    // telefono. L'attivazione e' persistente: alla riapertura della hero il suono torna da solo.
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const activationEvents = ['pointerdown', 'pointerup', 'click', 'keydown'] as const;
    activationEvents.forEach(t => window.addEventListener(t, onUserActivation, { passive: true, capture: true }));
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Mute/unmute based on whether the hero is in viewport.
    // Lo stesso osservatore ferma anche il video del telefono quando la hero e' lontana:
    // prima restava in riproduzione (decodifica 1080p) per tutta la pagina, a 40 000 px di
    // distanza. L'arresto e' ritardato di 400 ms: lo spostamento del contenitore nel
    // pin-spacer di GSAP puo' dare un "fuori vista" spurio che non deve fermare niente.
    audioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        clearTimeout(heroVideoPauseTimer);
        heroInView = entry.isIntersecting;
        if (entry.isIntersecting) {
          const v = heroVideoEl();
          if (!reduceMotion || audioUnlocked) v?.play().catch(() => {});
          // Rientro nella hero: se l'utente aveva gia' attivato l'audio torna da solo (l'attivazione
          // della pagina e' persistente; se il browser rifiuta, verifyAudio riporta a muto senza fermare il video).
          if (audioUnlocked) requestHeroAudio();
        } else {
          // Left viewport: always mute
          videoMuted = true;
          heroVideoPauseTimer = setTimeout(() => heroVideoEl()?.pause(), 400);
        }
      });
    }, { threshold: 0.2 });

    audioObserver.observe(container);
    tryPolicyAutounmute();
    ['wheel', 'touchmove', 'scroll'].forEach(t => window.addEventListener(t, onFirstMove, { passive: true }));
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
      
      // gsap.matchMedia() (GSAP 3.11+ API) — unlike the deprecated
      // ScrollTrigger.matchMedia(), this does NOT re-run callbacks on every
      // ScrollTrigger.refresh() call. It only re-evaluates when the viewport
      // actually crosses the breakpoint. This eliminates the "phone flickers
      // multiple times on load" bug caused by the ScrollTrigger teardown-and-
      // recreate cycle that happened on each of the 3 post-load refresh() calls
      // (load event + AirplaneEasterEgg at +600ms and +1400ms).
      mm = gsap.matchMedia();
      ctx = gsap.context(() => {
        mm.add("(min-width: 1024px)", () => {
          const totalSlides = slides.length + 1;
          const snapPoints = Array.from({ length: totalSlides }, (_, i) => i / (totalSlides - 1));
          // Quanto si scorre per passare da un passo al successivo (in vh): una sola
          // costante, cosi' la lunghezza della hero si regola in un punto.
          // Era 800 (24 schermate di scroll fisso in tutto, oltre 21.000 px su un
          // 900 px di altezza): troppo. Con il passo agganciato (snap) bastano poche
          // schermate per leggere ogni pannello.
          const scrollDistance = slides.length * HERO_STEP_VH;
          
          heroHidden = false;
          slideIdle = [];

          // Initialize slides as invisible
          slideRefs.forEach((slideEl) => {
            if (!slideEl) return;
            gsap.set(slideEl, { opacity: 0 });
          });

          scrollTriggerInstance = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            // A relative "+=Nvh" end string does not get unit-converted by
            // GSAP the way an absolute "Nvh" value does — it resolves the
            // number as raw pixels, registering a pin duration of 2400px
            // instead of the intended 2400vh (24 viewport heights). That
            // silently shrinks this pin's real scroll-jacked length, which
            // throws off the absolute scroll position of every ScrollTrigger
            // below it on the page (confirmed live: AirplaneEasterEgg's
            // emoji reveal never fired because its calculated trigger
            // position was off by exactly this gap). Converting to pixels
            // ourselves avoids the unit ambiguity entirely.
            end: () => `+=${(scrollDistance / 100) * window.innerHeight}`,
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
                heroHidden = false;
              } else if (!heroHidden) {
                heroHidden = true;
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
              //
              // ⚠️ NO scale transform here.
              // Applying a continuously-changing scale to a composited layer that
              // contains a YouTube iframe forces Chrome to re-rasterize the texture
              // on every frame — this interrupts the video decode pipeline and causes
              // visible video frame-freeze during the slide-in animation. Pure
              // translation (x) is compositor-only and does not affect the decoder.
              const targetX = (1 - phoneProgress) * window.innerWidth * 0.25;
              if (targetX !== lastPhoneX) {
                lastPhoneX = targetX;
                gsap.set(phoneWrapper, { 
                  x: targetX,
                  xPercent: -50,
                  yPercent: -50
                });
              }
              
              // Slides animation
              slideRefs.forEach((slideEl, i) => {
                if (!slideEl) return;
                const slideStart = (i + 1) / totalSlides;
                const slideEnd = (i + 2) / totalSlides;
                
                if (progress >= slideStart - 0.05 && progress < slideEnd + 0.05) {
                  slideIdle[i] = false;
                  // Il pannello deve essere pieno (1) esattamente dove lo snap si ferma: i punti di
                  // aggancio sono 1/3, 2/3 e 1, la rampa originale arrivava a 1 solo fra .35 e .4 /
                  // .6 e .65 / .85 e .9, cosi' il pannello restava a 0,89 - 0,89 - 0,33 da fermo.
                  // Le rampe sono quelle di prima, il plateau si allarga fino al punto di aggancio.
                  const snapAt = (i + 1) / (totalSlides - 1);
                  const inFine = Math.min(slideStart + 0.1, snapAt);
                  const outInizio = Math.max(slideEnd - 0.1, snapAt);
                  let slideOpacity = 1;
                  if (progress < inFine) {
                    slideOpacity = (progress - (slideStart - 0.05)) / (inFine - (slideStart - 0.05));
                  } else if (progress > outInizio) {
                    slideOpacity = 1 - ((progress - outInizio) / (slideEnd + 0.05 - outInizio));
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
                  if (!slideIdle[i]) {
                    slideIdle[i] = true;
                    gsap.set(slideEl, { opacity: 0 });
                    // Reset text elements so the entrance animation plays cleanly on re-entry.
                    // Without this, desc-chars would retain their animated-in state (opacity 1)
                    // and the next visit to the slide would skip the stagger animation.
                    const title = slideEl.querySelector('.slide-title');
                    const descChars = slideEl.querySelectorAll('.desc-char');
                    if (title) gsap.set(title, { opacity: 0, y: 40 });
                    if (descChars.length) gsap.set(descChars, { opacity: 0, y: 20 });
                  }
                }
              });
            }
          });
          
          // Apply the phone's initial GSAP position immediately — before the first
          // onUpdate fires. Without this the CSS centres the phone (left:50%,
          // translate(-50%,-50%)) and then the first onUpdate jumps it rightward,
          // creating the visible "appears-at-centre-then-snaps" glitch on load.
          // At progress=0: phoneProgress=0, x = 0.25*vw, xPercent=-50 (no scale).
          const initialX = window.innerWidth * 0.25;
          lastPhoneX = initialX;
          gsap.set(phoneWrapper, {
            x: initialX,
            xPercent: -50,
            yPercent: -50
          });

          // Pre-promote heroContent's compositing layer BEFORE the first scroll.
          //
          // Why this fixes the desktop "video freeze on first scroll" bug:
          //   The onUpdate callback applies gsap.set(heroContent, { opacity, yPercent })
          //   on every frame as the user scrolls. Before this fix, heroContent had
          //   no GSAP-managed transform until the first scroll event — so the very
          //   first gsap.set introduced a brand-new transform matrix on the element,
          //   which forces the browser to create a new compositing layer at that
          //   exact moment. That layer-creation event briefly pre-empts the GPU
          //   compositor and disconnects the YouTube iframe's video texture for
          //   one paint cycle, producing the visible video freeze that users see
          //   the instant they start scrolling.
          //
          //   By pre-applying the identity transform here (yPercent: 0, opacity: 1
          //   match the at-rest visual state), we force the browser to allocate the
          //   compositing layer at mount time — when nothing else is going on —
          //   so the first scroll's gsap.set merely UPDATES an existing matrix
          //   instead of CREATING a new one. No layer creation → no decoder stall →
          //   smooth video during scroll-start.
          //
          //   This is the same defensive pattern already applied to phoneWrapper
          //   above; heroContent was missing it, hence the regression.
          gsap.set(heroContent, { opacity: 1, yPercent: 0 });

          // NOTE: The opacity entrance tween that previously animated phoneWrapper
          // from opacity:0 → 1 over 0.8s has been intentionally removed.
          //
          // Root cause of the desktop "video freeze during scroll" bug:
          //   Animating opacity on phoneWrapper (which contains the YouTube iframe)
          //   forces the GPU compositor to re-blend the iframe's video texture with
          //   the updated opacity value on every single frame for 0.8 seconds.
          //   If the user starts scrolling during that window (very common, since
          //   the tween ran 0.3–1.1s after init), the ScrollTrigger onUpdate fires
          //   concurrently with the opacity tween, creating two simultaneous GPU
          //   compositing demands on the same element. This stalls the video decoder
          //   pipeline and produces the visible freeze reported by the user.
          //
          // The phone already has a smooth entrance via the translateX slide-in
          // (x: 0.25*vw → 0 driven by scroll progress 0.05→0.35). No additional
          // opacity animation is needed — the translateX alone reads as a natural
          // entrance, and eliminating the opacity tween removes the freeze entirely.
          //
          // The cleanup return below still calls clearProps:'opacity' to ensure
          // mobile/tablet (where this branch doesn't run) always sees opacity:1.

          // Return cleanup: clear the stored instance reference when the breakpoint
          // condition is no longer met (e.g. viewport shrinks below 1024px).
          return () => {
            scrollTriggerInstance = null;
            // Clear GSAP-managed opacity so the phone is visible on mobile/tablet
            // (where the GSAP entrance tween above doesn't run).
            if (phoneWrapper) gsap.set(phoneWrapper, { clearProps: 'opacity' });
          };
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
    
    // Debounced resize handler.
    // Su iPhone la barra di Safari che si ritira/ricompare lancia 'resize' cambiando solo
    // l'altezza (~15%): ricalcolare tutti i ScrollTrigger a ogni scorrimento e' uno stop
    // garantito. Stessa regola di ScrollTrigger.ignoreMobileResize: su touch si rifa il
    // calcolo solo se cambia la larghezza (rotazione) o l'altezza di oltre il 25%.
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    let baseW = window.innerWidth;
    let baseH = window.innerHeight;
    const handleResize = () => {
      if (isTouchDevice) {
        const sameWidth = window.innerWidth === baseW;
        const smallHeightChange = Math.abs(window.innerHeight - baseH) <= window.innerHeight * 0.25;
        if (sameWidth && smallHeightChange) return;
        baseW = window.innerWidth;
        baseH = window.innerHeight;
      }
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
      // ⚠️ NO scale transform here — same reason as phoneWrapper.
      // Animating scale on .slide-title (even though it's a text element, not
      // the iframe) creates a new compositor layer for that element inside the
      // GSAP-pinned container. Layer creation inside a pinned container that
      // already contains a composited YouTube iframe forces the browser to
      // rebuild the compositor layer tree, which can stall the video decode
      // pipeline and cause the same frame-freeze the user sees in the phone.
      // Pure y+opacity are compositor-only: they reuse the existing layer
      // without triggering a rasterization or layer-tree rebuild.
      gsap.fromTo(title, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0,
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
    mm?.revert();
    ctx?.revert();
    audioObserver?.disconnect();
    clearTimeout(heroVideoPauseTimer);
    clearTimeout(audioActiveTimer);
    clearTimeout(audioVerifyTimer);
    if (browser) {
      cancelAnimationFrame(audioRampFrame);
      (['pointerdown', 'pointerup', 'click', 'keydown'] as const).forEach(t => window.removeEventListener(t, onUserActivation, { capture: true }));
      ['wheel', 'touchmove', 'scroll'].forEach(t => window.removeEventListener(t, onFirstMove));
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
        <MagneticButton href={contactHref()} variant="primary">
          Iniziamo a parlare
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </MagneticButton>
        <MagneticButton href="/progetti" variant="outline-white">
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
      <!-- .phone-fit: unico punto dove il telefono si rimpicciolisce nelle finestre basse, DENTRO
           il contenitore che GSAP muove: cosi' non interferisce con x/xPercent. -->
      <div class="phone-fit">
        <PhoneMockup 
          youtubeId={heroVideoCloudinaryUrl ? undefined : heroVideoYoutubeId}
          videoSrc={heroVideoCloudinaryUrl}
          thumbnailUrl={heroVideoThumbnailUrl}
          muted={videoMuted}
          audioCue={showAudioCue}
          disableVisibilityObserver={true}
          disable3dTilt={true}
          disableEntranceAnimation={true}
          on:mobiletap={unlockAudio}
          on:audiocue={onAudioCue}
        />
      </div>
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
          {#each slide.description.split(' ') as word, wi}
            <span class="desc-word">{#each word.split('') as char}<span class="desc-char">{char}</span>{/each}{#if wi < slide.description.split(' ').length - 1}<span class="desc-char">{'\u00A0'}</span>{/if}</span>
          {/each}
        </p>
      </div>
    {/each}
  </div>
  
  {#if partners.length > 0}
    <div class="partners-strip" aria-hidden="true">
      <p class="partners-label">Tra i nostri clienti</p>
      <div class="partners-marquee-wrapper">
        <div class="partners-marquee" bind:this={marqueeEl}>
          {#each partnerSegments as seg}
            <div class="partners-seg">
              {#each seg.logos as p}
                {#if p.src && !logoRotti[p.logo ?? '']}
                  <img src={p.src} alt={p.name} class="partner-logo{p.noFilter ? ' no-filter' : ''}{p.sagomaChiaro ? ' sagoma-chiaro' : ''}" width={p.w} height={p.h} style={p.maxW ? `max-width:${p.maxW}px` : undefined} loading={seg.lazy ? 'lazy' : 'eager'} decoding="async" on:error={() => (logoRotti = { ...logoRotti, [p.logo ?? '']: true })} />
                {:else}
                  <span class="partner-name">{p.name}</span>
                {/if}
                <span class="partner-sep">·</span>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Badge «Audio attivato» – ALWAYS in DOM, hidden via CSS class only.
       (Il controllo «Attiva l'audio» vive nello schermo del telefono, in PhoneMockup.)
       Using {#if} here caused a NotFoundError crash in GSAP's ScrollTrigger:
       when audioUnlocked/audioActiveVisible changed mid-scroll, Svelte removed
       these nodes from the pinned container and GSAP's insertBefore pin-spacer
       logic referenced a stale node → crash → full hero section re-render.
       Fix: keep the badge div permanently in the DOM; toggle "audio-badge-gone"
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

  /* Allow the tap-to-play button inside the phone to receive pointer events
     even though .phone-area has pointer-events:none (needed to prevent the
     phone's large layout box from blocking page scroll on mobile). */
  .phone-area :global(.mobile-tap-hint),
  .phone-area :global(.audio-cue:not(.audio-cue-hidden)) {
    pointer-events: auto;
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
      will-change: transform;
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

  /* ─── TELEFONO NELLE FINESTRE BASSE (≥ 1024px di larghezza) ────────────────
   * Il telefono e' alto 600px e sta al centro dell'altezza: sotto circa 840px di
   * finestra il suo bordo basso arriva sulla scritta "Tra i nostri clienti" e la
   * tocca. Lo si rimpicciolisce a gradini quanto basta perche' resti un respiro
   * fra il telefono e la fascia dei clienti (fascia ~130px + margine).
   * La scala sta su .phone-fit, dentro .phone-area: GSAP muove solo .phone-area
   * (x e xPercent) e la scala resta fissa, mai animata (vedi la nota sul livello
   * del video). Su telefono e tablet vale 1: ci pensa gia' .phone-area. */
  .phone-fit {
    transform: scale(var(--phone-fit, 1));
    transform-origin: center center;
  }
  @media (min-width: 1024px) and (max-height: 880px) { .phone-area { --phone-fit: 0.97; } }
  @media (min-width: 1024px) and (max-height: 840px) { .phone-area { --phone-fit: 0.9; } }
  @media (min-width: 1024px) and (max-height: 800px) { .phone-area { --phone-fit: 0.84; } }
  @media (min-width: 1024px) and (max-height: 760px) { .phone-area { --phone-fit: 0.77; } }
  @media (min-width: 1024px) and (max-height: 720px) { .phone-area { --phone-fit: 0.7; } }
  @media (min-width: 1024px) and (max-height: 680px) { .phone-area { --phone-fit: 0.63; } }
  @media (min-width: 1024px) and (max-height: 640px) { .phone-area { --phone-fit: 0.57; } }

  /* ─── SHORT DESKTOP VIEWPORTS (≤ 1050px tall, ≥ 1024px wide) ──────────────
   * Keep the intro centred in the usable stage between the header and the
   * absolutely-positioned partners strip. The asymmetric padding reserves
   * real space for the strip, so centring cannot reintroduce the previous
   * credibility-badge overlap. */
  @media (min-width: 1024px) and (max-height: 1050px) {
    .scrolly-content {
      padding-top: clamp(72px, 10svh, 104px);
      padding-bottom: clamp(112px, 16svh, 160px);
    }

    .hero-text {
      align-self: center;
    }

    .hero-text > p:first-child {
      margin-bottom: 0.5rem;
    }

    /* Tailwind's text-3xl…xl:text-7xl steps are width-only — right at this
     * media query's own 1024px floor, lg:text-6xl jumps the title to its
     * biggest fixed size with no regard for a short viewport, which was the
     * worst measured case (1024×680: title alone at 202px tall, margin
     * -50px into the strip even with the fixes above). Fluid clamp() tied
     * to vw keeps the title compact and predictable across this whole
     * width range instead of jumping at the same breakpoint this query
     * starts at. */
    .hero-text > h1 {
      font-size: clamp(1.75rem, 3.2vw, 2.75rem);
      margin-bottom: 0.75rem;
    }

    .hero-text > p:nth-child(3) {
      margin-bottom: 1rem;
    }

    .hero-text > div:nth-child(4) {
      margin-bottom: 1.25rem;
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

  /* Ogni lettera e' un inline-block per l'animazione: senza questo raggruppamento il browser puo'
     andare a capo fra due lettere qualsiasi («misurabi-/li»). La parola (con il suo spazio) non si spezza. */
  .desc-word {
    display: inline-block;
    white-space: nowrap;
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

  @keyframes audio-on-in {
    from { opacity: 0; transform: scale(0.9) translateY(4px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes audio-on-out {
    from { opacity: 1; }
    to   { opacity: 0; }
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
    min-height: 2rem;
    overflow: hidden;
    /* Use px-based fade zones so narrow mobile screens don't clip logos.
       48px fade is enough to soften the edge without swallowing logos. */
    mask-image: linear-gradient(to right, transparent 0px, black 48px, black calc(100% - 48px), transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0px, black 48px, black calc(100% - 48px), transparent 100%);
  }

  .partners-marquee {
    display: flex;
    align-items: center;
    gap: 0;
    width: max-content;
    animation: partners-scroll 35s linear infinite;
    /* will-change + backface-visibility: hidden forces the browser to promote
       this element to its own GPU compositing layer. On Safari mobile this
       prevents the full-page repaint that caused shimmer/glitch artefacts. */
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  /* Two copies instead of six + translate by exactly -50%.
   * -50% = precisely one copy width regardless of fractional pixel widths.
   * The old calc(-100% / 6) divided a non-integer max-content width by 6,
   * producing a sub-pixel remainder that browsers rounded inconsistently —
   * causing a visible jump at every loop reset. -50% is an exact CSS value:
   * no rounding, no jump. Both halves are built from the same list and every <img> has its
   * real width/height, so their widths cannot diverge while the logos load. */
  @keyframes partners-scroll {
    from { transform: translate3d(0, 0, 0); }
    to   { transform: translate3d(-50%, 0, 0); }
  }

  /* Un troncone = un quarto della corsia, nel suo livello composito (vedi lo script). */
  .partners-seg {
    display: flex;
    align-items: center;
    flex: none;
    will-change: transform;
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
    height: 28px;
    /* width: auto preserves each logo's natural proportions at the fixed 28px
       height, so all logos are perfectly aligned on the same baseline.
       max-width caps very wide logos; 100px is enough for horizontal brand
       marks (e.g. Mangio, Barcolana) without making icon-style logos too large. */
    width: auto;
    max-width: 100px;
    object-fit: contain;
    flex-shrink: 0;
    padding: 0 0.75rem;
    filter: brightness(0) invert(1);
    opacity: 0.68;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
    /* Transizione fluida al cambio tema — coerente con body transition */
    transition: filter 0.3s ease, opacity 0.3s ease;
  }

  /* Loghi che richiedono i colori originali — nessuna inversione */
  .partner-logo.no-filter {
    filter: none;
    opacity: 0.75;
  }

  /* ─── Tema light: sfondo bianco → logo invertito (bianco) diventa invisibile ─ *
   * Fix: in dark mode brightness(0)+invert(1) = bianco su scuro → OK.            *
   * In light mode sostituiamo con brightness(0) = nero/grigio su bianco → OK.    *
   * Opacità leggermente ridotta perché su bianco il nero puro è più "pesante"    *
   * visivamente rispetto al bianco su scuro.                                      */
  :global([data-theme="light"]) .partner-logo {
    filter: brightness(0);
    opacity: 0.55;
  }

  /* Loghi a colori in light: manteniamo la palette ma abbassiamo l'opacità
   * e aggiungiamo un leggero grayscale per evitare che siano troppo saturi
   * rispetto al resto della palette del tema chiaro.                              */
  :global([data-theme="light"]) .partner-logo.no-filter {
    filter: grayscale(0.25);
    opacity: 0.72;
  }

  /* Colori veri sullo scuro, ma con parti bianche (Comune di Pordenone, Fanna, Tomasella): sul chiaro
   * il bianco sparirebbe e resterebbero scritte a meta', quindi sagoma scura come gli altri. */
  :global([data-theme="light"]) .partner-logo.no-filter.sagoma-chiaro {
    filter: brightness(0);
    opacity: 0.55;
  }

  @media (max-width: 767px) {
    .partners-strip {
      mask-image: none;
      -webkit-mask-image: none;
    }

    .partners-marquee-wrapper {
      display: flex;
      align-items: center;
    }

    .partner-logo {
      opacity: 0.72;
    }
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
