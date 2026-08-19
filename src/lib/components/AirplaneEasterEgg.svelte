<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { browser } from '$app/environment';

  let sectionEl: HTMLElement;
  let emojiZone: HTMLElement;
  let skyContainer: HTMLElement;
  let windowContainer: HTMLElement;
  let introText: HTMLElement;
  let midText: HTMLElement;
  let finalText: HTMLElement;
  let discountReveal: HTMLElement;
  let desktopWrapper: HTMLElement;

  let mSectionEl: HTMLElement;
  let mSkyContainer: HTMLElement;
  let mWindowContainer: HTMLElement;
  let mIntroText: HTMLElement;
  let mMidText: HTMLElement;
  let mFinalText: HTMLElement;
  let mDiscountReveal: HTMLElement;
  let mobileWrapper: HTMLElement;

  let preloadZone: HTMLElement;

  let ctx: any = null;
  let copied = false;
  let imagesLoaded = false;
  let preloadObserver: IntersectionObserver | null = null;
  let bodyResizeObserver: ResizeObserver | null = null;
  let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

  const DISCOUNT_CODE = 'scrollerevenue26';
  const WA_NUMBER = '393393998351';
  const WA_MSG = encodeURIComponent(
    `Ciao! Sono interessato/a a collaborare con Righello. Ho trovato il codice sconto "${DISCOUNT_CODE}" sul vostro sito. Vorrei saperne di più!`
  );
  const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

  const skyWebp = '/sky-easter-egg.webp';
  const skyJpg = '/sky-easter-egg.jpg';
  const windowWebp = '/window-easter-egg.webp';
  const windowPng = '/window-easter-egg.png';

  function preloadImages(): Promise<void> {
    if (imagesLoaded) return Promise.resolve();

    let supportsWebp = false;
    try {
      supportsWebp = document.createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0;
    } catch {
      supportsWebp = false;
    }

    const skyUrl = supportsWebp ? skyWebp : skyJpg;
    const windowUrl = supportsWebp ? windowWebp : windowPng;

    const loadImage = (src: string) => new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });

    return Promise.all([loadImage(skyUrl), loadImage(windowUrl)])
      .then(() => { imagesLoaded = true; })
      .catch(() => { imagesLoaded = true; });
  }

  function copyToClipboard() {
    if (!browser) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(DISCOUNT_CODE).catch(() => fallbackCopy());
      } else {
        fallbackCopy();
      }
    } catch {
      fallbackCopy();
    }
    copied = true;
    setTimeout(() => { copied = false; }, 2500);
  }

  function fallbackCopy() {
    const el = document.createElement('textarea');
    el.value = DISCOUNT_CODE;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  function handleDiscountClick(e: MouseEvent) {
    e.preventDefault();
    copyToClipboard();
    setTimeout(() => {
      window.location.href = WA_URL;
    }, 300);
  }

  onMount(async () => {
    if (!browser) return;

    if (preloadZone) {
      preloadObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            preloadImages();
            preloadObserver?.disconnect();
          }
        },
        { rootMargin: '800px 0px' }
      );
      preloadObserver.observe(preloadZone);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (prefersReducedMotion) return;

    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    await preloadImages();
    // Flush Svelte DOM update so `images-ready` class is applied before GSAP reads layout
    await tick();

    await new Promise<void>(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    // Guard: ensure all required DOM refs are available before entering GSAP context
    const missingRefs: string[] = [];
    if (!emojiZone) missingRefs.push('emojiZone');
    if (isDesktop) {
      if (!desktopWrapper) missingRefs.push('desktopWrapper');
      if (!sectionEl) missingRefs.push('sectionEl');
      if (!skyContainer) missingRefs.push('skyContainer');
      if (!windowContainer) missingRefs.push('windowContainer');
      if (!introText) missingRefs.push('introText');
      if (!midText) missingRefs.push('midText');
      if (!finalText) missingRefs.push('finalText');
      if (!discountReveal) missingRefs.push('discountReveal');
    } else {
      if (!mobileWrapper) missingRefs.push('mobileWrapper');
      if (!mSectionEl) missingRefs.push('mSectionEl');
      if (!mSkyContainer) missingRefs.push('mSkyContainer');
      if (!mWindowContainer) missingRefs.push('mWindowContainer');
      if (!mIntroText) missingRefs.push('mIntroText');
      if (!mMidText) missingRefs.push('mMidText');
      if (!mFinalText) missingRefs.push('mFinalText');
      if (!mDiscountReveal) missingRefs.push('mDiscountReveal');
    }
    if (missingRefs.length > 0) {
      console.warn('[AirplaneEasterEgg] Missing DOM refs, skipping GSAP init:', missingRefs);
      return;
    }

    // Extracted so it can be re-run (via ctx.revert() + a fresh gsap.context
    // call) once real layout is confirmed stable — see doRefresh below.
    const setupAnimations = () => {
      const emojiEls = emojiZone?.querySelectorAll('.emoji-float');
      if (emojiEls && emojiEls.length > 0) {
        // Time-based animation (NOT scrub) so emojis always appear regardless of
        // when ScrollTrigger calculates its positions. Scrub tied the animation to
        // scroll math that could be off by the time the user reaches the zone
        // (pin spacer from AppleScrolly shifts all positions), leaving them stuck
        // at opacity:0 forever. With toggleActions the timeline plays once on enter.
        gsap.set(Array.from(emojiEls), { opacity: 0, scale: 0.5, y: 40, force3D: true });

        const emojiTl = gsap.timeline({
          scrollTrigger: {
            trigger: emojiZone,
            start: 'top 80%',
            toggleActions: 'play none none reset',
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'back.out(1.4)', force3D: true }
        });

        Array.from(emojiEls).forEach((el, i) => {
          const rot = (i % 2 === 0 ? 1 : -1) * 12;
          const startAt = i * 0.22;
          // Enter: pop in with rotation snapping to 0
          emojiTl.fromTo(el,
            { opacity: 0, scale: 0.45, y: 45, rotation: rot },
            { opacity: 1, scale: 1,    y: 0,  rotation: 0, duration: 0.45 },
            startAt
          );
          // Exit: float up and fade out after a short hold
          emojiTl.to(el,
            { opacity: 0, scale: 0.75, y: -28, duration: 0.3, ease: 'power2.in' },
            startAt + 0.65
          );
        });
      }

      const vh = window.innerHeight;

      if (isDesktop) {
        if (desktopWrapper) desktopWrapper.style.height = `${vh * 6}px`;

        if (!sectionEl || !skyContainer || !windowContainer) return;

        gsap.set([introText, midText, finalText], { opacity: 0, yPercent: 30, force3D: true });
        gsap.set(discountReveal, { opacity: 0, scale: 0.8, force3D: true });

        // ── Two-phase animation ────────────────────────────────────────────────
        // Phase 1 (0 → WIN_ENTER):  window grows from a small oval to full
        //   horizontal size. Sky stays still so the user can appreciate the frame.
        // Phase 2 (WIN_ENTER → 1): sky scrolls + window zooms in. Text reveals
        //   happen in four equally-spaced sub-phases across the zoom.
        const WIN_ENTER  = 0.15;              // fraction of timeline for entry
        const ZOOM_START = WIN_ENTER;          // sky + zoom begin at this offset
        const ZOOM_DUR   = 1 - ZOOM_START;    // = 0.85

        const PHASE      = 0.20;
        const ENTER_DUR  = 0.05;
        const EXIT_DUR   = 0.05;
        const LABEL_OFFSET = PHASE / 2;        // = 0.10
        const TEXT_OFFSET  = 0.06;

        // Text labels are spaced inside the zoom section (ZOOM_START … 1.0)
        const L_INTRO    = ZOOM_START + LABEL_OFFSET;                 // 0.25
        const L_MID      = ZOOM_START + PHASE + LABEL_OFFSET;         // 0.45
        const L_FINAL    = ZOOM_START + PHASE * 2 + LABEL_OFFSET;     // 0.65
        const L_DISCOUNT = ZOOM_START + PHASE * 3 + LABEL_OFFSET;     // 0.85

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopWrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            snap: isSafari ? false : {
              snapTo: 'labels',
              duration: { min: 0.2, max: 0.5 },
              delay: 0.15,
              ease: 'power1.inOut',
            },
            invalidateOnRefresh: true,
            onRefresh() {
              const newVh = window.innerHeight;
              if (desktopWrapper) desktopWrapper.style.height = `${newVh * 6}px`;
            },
          }
        });

        // Phase 1: window is already at full horizontal coverage (scale 1).
        // Starting at scale 0.5 caused two issues: horizontal black borders on wide
        // screens (container shrank to 50 vw, exposing the dark background), and the
        // shrunk state was visible as the wrapper scrolled into view from below.
        // Now Phase 1 simply holds at scale 1 for WIN_ENTER (a brief pause before
        // the zoom kicks in), keeping the 'windowFull' snap anchor intact.
        tl.fromTo(windowContainer,
          { scale: 1, transformOrigin: '50% 55%', force3D: true },
          { scale: 1, duration: WIN_ENTER, ease: 'none', force3D: true },
          0
        );

        // Snap anchor so the user can pause at "window fully open" before zooming.
        tl.addLabel('windowFull', ZOOM_START);

        // Phase 2: window zooms in (1 → 4). Second fromTo locks its own from-state
        // (scale 1) independently of the entry tween — required for invalidateOnRefresh.
        // transformOrigin 50% 55% keeps the oval centred and hides the ceiling strip.
        tl.fromTo(windowContainer,
          { scale: 1, transformOrigin: '50% 55%', force3D: true },
          { scale: 4, duration: ZOOM_DUR, ease: 'none', force3D: true },
          ZOOM_START
        );

        // Phase 2: sky scrolls from top to bottom, in sync with the window zoom.
        // Arrow function: GSAP re-evaluates on invalidateOnRefresh.
        // Buffer is proportional to viewport height (0.5 %, min 8 px) so sub-pixel
        // rounding on high-DPI / very large screens never reveals the black strip.
        tl.to(skyContainer, {
          y: () => {
            const buf = Math.max(8, Math.round(window.innerHeight * 0.005));
            return -(Math.max(0, skyContainer.offsetHeight - window.innerHeight - buf));
          },
          duration: ZOOM_DUR, ease: 'none', force3D: true
        }, ZOOM_START);

        tl.addLabel('intro', L_INTRO);
        tl.to(introText, { opacity: 1, yPercent: 0, duration: ENTER_DUR, ease: 'none' }, L_INTRO - TEXT_OFFSET);
        tl.to(introText, { opacity: 0, yPercent: -15, duration: EXIT_DUR, ease: 'none' }, L_INTRO + TEXT_OFFSET);

        tl.addLabel('mid', L_MID);
        tl.to(midText, { opacity: 1, yPercent: 0, duration: ENTER_DUR, ease: 'none' }, L_MID - TEXT_OFFSET);
        tl.to(midText, { opacity: 0, yPercent: -15, duration: EXIT_DUR, ease: 'none' }, L_MID + TEXT_OFFSET);

        tl.addLabel('final', L_FINAL);
        tl.to(finalText, { opacity: 1, yPercent: 0, duration: ENTER_DUR, ease: 'none' }, L_FINAL - TEXT_OFFSET);

        tl.addLabel('discount', L_DISCOUNT);
        tl.to(discountReveal, { opacity: 1, scale: 1, duration: ENTER_DUR, ease: 'none' }, L_DISCOUNT - TEXT_OFFSET);

        tl.addLabel('end', 1);

      } else {
        if (mobileWrapper) mobileWrapper.style.height = `${vh * 6}px`;

        if (!mSectionEl || !mSkyContainer || !mWindowContainer) return;

        gsap.set([mIntroText, mMidText, mFinalText], { opacity: 0, y: 50, force3D: true });
        gsap.set(mDiscountReveal, { opacity: 0, y: 30, scale: 0.9, force3D: true });

        // Same two-phase logic as desktop (see comments above).
        const WIN_ENTER  = 0.15;
        const ZOOM_START = WIN_ENTER;
        const ZOOM_DUR   = 1 - ZOOM_START; // = 0.85

        const PHASE      = 0.20;
        const ENTER_DUR  = 0.05;
        const EXIT_DUR   = 0.05;
        const LABEL_OFFSET = PHASE / 2;
        const TEXT_OFFSET  = 0.06;

        const L_INTRO    = ZOOM_START + LABEL_OFFSET;
        const L_MID      = ZOOM_START + PHASE + LABEL_OFFSET;
        const L_FINAL    = ZOOM_START + PHASE * 2 + LABEL_OFFSET;
        const L_DISCOUNT = ZOOM_START + PHASE * 3 + LABEL_OFFSET;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileWrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            invalidateOnRefresh: true,
            onRefresh() {
              const newVh = window.innerHeight;
              if (mobileWrapper) mobileWrapper.style.height = `${newVh * 6}px`;
            },
          }
        });

        // Phase 1: window starts at full horizontal coverage (same fix as desktop —
        // scale 0.5 caused horizontal black borders and a premature-shrunk appearance).
        tl.fromTo(mWindowContainer,
          { scale: 1, transformOrigin: '50% 55%', force3D: true },
          { scale: 1, duration: WIN_ENTER, ease: 'none', force3D: true },
          0
        );

        // Phase 2: window zoom (1 → 4). Separate fromTo locks scale:1 from-state
        // for invalidateOnRefresh (same pattern as desktop).
        tl.fromTo(mWindowContainer,
          { scale: 1, transformOrigin: '50% 55%', force3D: true },
          { scale: 4, duration: ZOOM_DUR, ease: 'none', force3D: true },
          ZOOM_START
        );

        // Phase 2: sky scroll, starts in sync with zoom.
        tl.to(mSkyContainer, {
          y: () => {
            const buf = Math.max(8, Math.round(window.innerHeight * 0.005));
            return -(Math.max(0, mSkyContainer.offsetHeight - window.innerHeight - buf));
          },
          duration: ZOOM_DUR, ease: 'none', force3D: true
        }, ZOOM_START);

        tl.addLabel('intro', L_INTRO);
        tl.to(mIntroText, { opacity: 1, y: 0, duration: ENTER_DUR, ease: 'none' }, L_INTRO - TEXT_OFFSET);
        tl.to(mIntroText, { opacity: 0, y: -30, duration: EXIT_DUR, ease: 'none' }, L_INTRO + TEXT_OFFSET);

        tl.addLabel('mid', L_MID);
        tl.to(mMidText, { opacity: 1, y: 0, duration: ENTER_DUR, ease: 'none' }, L_MID - TEXT_OFFSET);
        tl.to(mMidText, { opacity: 0, y: -30, duration: EXIT_DUR, ease: 'none' }, L_MID + TEXT_OFFSET);

        tl.addLabel('final', L_FINAL);
        tl.to(mFinalText, { opacity: 1, y: 0, duration: ENTER_DUR, ease: 'none' }, L_FINAL - TEXT_OFFSET);

        tl.addLabel('discount', L_DISCOUNT);
        tl.to(mDiscountReveal, { opacity: 1, y: 0, scale: 1, duration: ENTER_DUR, ease: 'none' }, L_DISCOUNT - TEXT_OFFSET);

        tl.addLabel('end', 1);
      }
    };

    // Wait for the real dependency, not a proxy for it, before creating any
    // ScrollTrigger.
    //
    // Problem: AppleScrolly (the hero above this component) creates a GSAP
    // pin — on desktop this inserts a `.pin-spacer` element that shifts the
    // scroll offset of every section below it, including this one. Until
    // that spacer exists, any ScrollTrigger created here measures against
    // the wrong (pre-spacer) document layout.
    //
    // A first attempt waited on fixed timeouts (600ms/1400ms guesses), then
    // on generic "document height stopped changing" polling. Both still
    // raced AppleScrolly's own async init chain (fonts, dynamic imports) on
    // a slow load, and confirmed live: even calling ScrollTrigger.refresh()
    // well after the page had visibly settled did NOT correct an
    // already-created trigger's position here — a brand-new ScrollTrigger
    // measured correctly at the same moment refreshing the existing one did
    // not. So the fix isn't "refresh more/later" — it's don't create the
    // trigger until the actual precondition (the pin spacer existing) is
    // true, then create it once, fresh.
    const POLL_MS = 150;
    const STABLE_CHECKS_REQUIRED = 3;
    const MAX_WAIT_MS = 6000;

    const isDesktopPinExpected = window.matchMedia('(min-width: 1024px)').matches;

    const waitForReady = (onReady: () => void) => {
      let lastHeight = -1;
      let stableCount = 0;
      let elapsedMs = 0;

      const poll = () => {
        // On desktop AppleScrolly's own breakpoint (>=1024px) is what
        // actually creates the pin; below that it never runs, so a
        // `.pin-spacer` would never appear and we'd wait for nothing.
        const pinReady = !isDesktopPinExpected || !!document.querySelector('.pin-spacer');
        const height = document.body.scrollHeight;
        if (height === lastHeight) {
          stableCount++;
        } else {
          stableCount = 0;
          lastHeight = height;
        }

        elapsedMs += POLL_MS;
        const heightStable = stableCount >= STABLE_CHECKS_REQUIRED;
        if ((pinReady && heightStable) || elapsedMs >= MAX_WAIT_MS) {
          onReady();
          return;
        }
        refreshTimeout = setTimeout(poll, POLL_MS);
      };
      poll();
    };

    waitForReady(() => {
      ctx = gsap.context(setupAnimations);

      // Safety net for a shift that lands after this point (e.g. a web font
      // swap reflowing text below the fold, or AppleScrolly's pin resizing
      // on window resize). Rebuilds (not just .refresh()s) so trigger
      // positions come from a completely fresh measurement — see the note
      // above on why .refresh() alone was not reliable here.
      let resizeDebounce: ReturnType<typeof setTimeout> | null = null;
      bodyResizeObserver = new ResizeObserver(() => {
        if (resizeDebounce !== null) clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(() => {
          ctx?.revert();
          ctx = gsap.context(setupAnimations);
        }, 300);
      });
      bodyResizeObserver.observe(document.body);
    });
  });

  onDestroy(() => {
    ctx?.revert();
    preloadObserver?.disconnect();
    bodyResizeObserver?.disconnect();
    if (refreshTimeout !== null) clearTimeout(refreshTimeout);
  });
</script>

<div class="easter-egg-blend" aria-hidden="true"></div>

<div bind:this={preloadZone} class="preload-trigger" aria-hidden="true"></div>

<div bind:this={emojiZone} class="emoji-transition-zone" aria-hidden="true">
  <span class="emoji-float emoji-left emoji-1">👀</span>
  <span class="emoji-float emoji-right emoji-2">💭</span>
  <span class="emoji-float emoji-left emoji-3">🤔</span>
  <span class="emoji-float emoji-right emoji-4">👀</span>
  <span class="emoji-float emoji-left emoji-5">✈️</span>
  <span class="emoji-float emoji-right emoji-6">🤫</span>
</div>

<!-- Desktop scrollytelling -->
<div bind:this={desktopWrapper} class="scroll-wrapper desktop-only">
<section bind:this={sectionEl} class="easter-egg-section" class:images-ready={imagesLoaded}>
    <div class="section-top-gradient" aria-hidden="true"></div>
    <div class="section-bottom-gradient" aria-hidden="true"></div>
    <div bind:this={skyContainer} class="sky-container">
      <picture>
        <source srcset={skyWebp} type="image/webp" />
        <img src={skyJpg} alt="" decoding="async" draggable="false" />
      </picture>
    </div>
    <div bind:this={windowContainer} class="window-container">
      <picture>
        <source srcset={windowWebp} type="image/webp" />
        <img src={windowPng} alt="" decoding="async" draggable="false" />
      </picture>
    </div>

    <div bind:this={introText} class="easter-text intro-text">
      <h2>Sei ancora qui?</h2>
      <p>Allora sei davvero interessato!</p>
    </div>

    <div bind:this={midText} class="easter-text mid-text">
      <p>Per te che hai scrollato fino a qui, uno sconto che ti aiuterà a raggiungere i risultati che hai sempre sognato.</p>
    </div>

    <div bind:this={finalText} class="easter-text final-text">
      <h2>Prendi il volo con il team di Righello!</h2>
    </div>

    <div bind:this={discountReveal} class="discount-reveal">
      <span class="discount-label">Codice sconto da comunicare in fase di preventivo</span>
      <a href={WA_URL} class="discount-code" on:click={handleDiscountClick} aria-label="Copia codice sconto e contattaci su WhatsApp" rel="noopener noreferrer">
        {#if copied}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          Copiato!
        {:else}
          {DISCOUNT_CODE}
        {/if}
      </a>
    </div>
</section>
</div>

<!-- Mobile scrollytelling -->
<div bind:this={mobileWrapper} class="scroll-wrapper mobile-only">
<section bind:this={mSectionEl} class="easter-egg-section" class:images-ready={imagesLoaded}>
    <div class="section-top-gradient" aria-hidden="true"></div>
    <div class="section-bottom-gradient" aria-hidden="true"></div>
    <div bind:this={mSkyContainer} class="sky-container">
      <picture>
        <source srcset={skyWebp} type="image/webp" />
        <img src={skyJpg} alt="" decoding="async" draggable="false" />
      </picture>
    </div>
    <div bind:this={mWindowContainer} class="window-container">
      <picture>
        <source srcset={windowWebp} type="image/webp" />
        <img src={windowPng} alt="" decoding="async" draggable="false" />
      </picture>
    </div>

    <div bind:this={mIntroText} class="easter-text intro-text">
      <h2>Sei ancora qui?</h2>
      <p>Allora sei davvero interessato!</p>
    </div>

    <div bind:this={mMidText} class="easter-text mid-text">
      <p>Per te che hai scrollato fino a qui, uno sconto che ti aiuterà a raggiungere i risultati che hai sempre sognato.</p>
    </div>

    <div bind:this={mFinalText} class="easter-text final-text">
      <h2>Prendi il volo con il team di Righello!</h2>
    </div>

    <div bind:this={mDiscountReveal} class="discount-reveal">
      <span class="discount-label">Codice sconto da comunicare in fase di preventivo</span>
      <a href={WA_URL} class="discount-code" on:click={handleDiscountClick} aria-label="Copia codice sconto e contattaci su WhatsApp" rel="noopener noreferrer">
        {#if copied}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          Copiato!
        {:else}
          {DISCOUNT_CODE}
        {/if}
      </a>
    </div>
</section>
</div>

<style>
  .easter-egg-blend {
    position: relative;
    width: 100%;
    height: 200px;
    background: var(--bg-primary);
    pointer-events: none;
    z-index: 1;
  }

  .preload-trigger {
    position: relative;
    width: 100%;
    height: 1px;
    pointer-events: none;
  }

  .emoji-transition-zone {
    position: relative;
    width: 100%;
    height: 80vh;
    height: 80dvh;
    background: var(--bg-primary);
    overflow: visible;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .emoji-float {
    position: absolute;
    font-size: 6rem;
    opacity: 0;
    will-change: transform, opacity;
    user-select: none;
    pointer-events: none;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .emoji-left { left: 8%; }
  .emoji-right { right: 8%; }
  .emoji-1 { top: 8%; }
  .emoji-2 { top: 22%; }
  .emoji-3 { top: 39%; }
  .emoji-4 { top: 56%; }
  .emoji-5 { top: 73%; }
  .emoji-6 { top: 90%; }

  .scroll-wrapper {
    position: relative;
    z-index: 40;
    min-height: 600vh;
  }

  .easter-egg-section {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    background: var(--bg-primary);
    margin: 0;
    padding: 0;
    border: none;
  }


  .easter-egg-section .sky-container,
  .easter-egg-section .window-container {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .easter-egg-section.images-ready .sky-container,
  .easter-egg-section.images-ready .window-container {
    opacity: 1;
  }

  .section-top-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    background: linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%);
    z-index: 15;
    pointer-events: none;
  }

  .section-bottom-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(to top, var(--bg-primary) 0%, transparent 100%);
    z-index: 15;
    pointer-events: none;
  }

  .sky-container,
  .window-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
  }

  .sky-container {
    height: 350vh;
    height: 350dvh;
    z-index: 1;
  }

  .sky-container img,
  .window-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .window-container {
    height: 100vh;
    height: 100dvh;
    z-index: 2;
  }

  .easter-text {
    position: absolute;
    z-index: 10;
    color: #ffffff;
    text-align: center;
    width: 90%;
    max-width: 1000px;
    padding: 0 2rem;
    left: 50%;
    transform: translateX(-50%);
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.7), 0 0 60px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .easter-text h2 {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 700;
    margin-bottom: 0.75rem;
    line-height: 1.05;
  }

  .easter-text p {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    line-height: 1.5;
    font-weight: 400;
  }

  /* Mid-text gets a larger, more statement-like treatment */
  .mid-text {
    max-width: 820px;
  }

  .mid-text p {
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    line-height: 1.35;
    font-weight: 400;
  }

  /* Final text is the hero moment — biggest type */
  .final-text h2 {
    font-size: clamp(3rem, 7.5vw, 5.5rem);
    line-height: 0.95;
    margin-bottom: 0;
  }

  .intro-text { top: 38%; }
  .mid-text   { top: 36%; }
  .final-text { top: 22%; }

  .discount-reveal {
    position: absolute;
    z-index: 10;
    top: 62%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    pointer-events: auto;
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .discount-label {
    color: #ffffff;
    font-size: clamp(0.9rem, 2vw, 1.0625rem);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 360px;
    line-height: 1.45;
  }

  .discount-code {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #D6487E;
    color: #ffffff;
    font-size: clamp(1.125rem, 3vw, 1.5rem);
    font-weight: 700;
    font-family: inherit;
    padding: 0.875rem 2rem;
    border-radius: 9999px;
    border: none;
    letter-spacing: 0.05em;
    min-height: 44px;
    min-width: 44px;
    text-align: center;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(214, 72, 126, 0.4);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .discount-code:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 28px rgba(214, 72, 126, 0.5);
  }

  .discount-code:active {
    transform: scale(0.97);
  }

  @media (max-width: 767px) {
    .easter-egg-blend {
      height: 100px;
    }

    .emoji-transition-zone {
      height: 70vh;
      height: 70dvh;
    }

    .emoji-float {
      font-size: 4.5rem;
    }

    .emoji-left { left: 6%; }
    .emoji-right { right: 6%; }

    .desktop-only {
      display: none !important;
    }

    .mobile-only {
      display: block;
    }

    .section-top-gradient {
      height: 80px;
    }

    .easter-text {
      width: 92%;
    }

    .easter-text h2 {
      font-size: clamp(1.75rem, 7vw, 2.375rem);
    }

    .easter-text p {
      font-size: clamp(1rem, 4vw, 1.1875rem);
    }

    .mid-text p {
      font-size: clamp(1.125rem, 5vw, 1.5rem);
    }

    .final-text h2 {
      font-size: clamp(2rem, 9vw, 3rem);
    }

    .discount-code {
      font-size: 1.125rem;
      padding: 0.875rem 1.75rem;
    }

    .discount-label {
      max-width: 300px;
      font-size: 0.9375rem;
    }
  }

  @media (min-width: 768px) {
    .mobile-only {
      display: none !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .easter-text h2 {
      font-size: clamp(2rem, 4.5vw, 3rem);
    }

    .easter-text p {
      font-size: clamp(1rem, 2vw, 1.25rem);
    }

    .mid-text p {
      font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    }

    .final-text h2 {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
    }

    .discount-code {
      font-size: 1.25rem;
      padding: 0.75rem 1.5rem;
    }

    .emoji-float {
      font-size: 6.5rem;
    }
  }

  @media (min-width: 1025px) {
    .emoji-float {
      font-size: 8rem;
    }

    .emoji-left { left: 12%; }
    .emoji-right { right: 12%; }
  }

  /* ── Large screens (1440px+) ──────────────────────────────────────────── */
  @media (min-width: 1440px) {
    .easter-text {
      max-width: 1100px;
    }

    .mid-text {
      max-width: 900px;
    }

    .final-text h2 {
      font-size: clamp(4rem, 7vw, 6.5rem);
    }

    .discount-label {
      max-width: 440px;
      font-size: clamp(1rem, 1.25vw, 1.125rem);
    }

    .section-top-gradient {
      height: 160px;
    }

    .section-bottom-gradient {
      height: 120px;
    }

    .emoji-float {
      font-size: 9rem;
    }

    .emoji-left { left: 14%; }
    .emoji-right { right: 14%; }
  }

  /* ── Very large screens (1920px+) ─────────────────────────────────────── */
  @media (min-width: 1920px) {
    .easter-text {
      max-width: 1280px;
    }

    .mid-text {
      max-width: 1040px;
    }

    .easter-text h2 {
      font-size: clamp(3rem, 5vw, 5.5rem);
    }

    .easter-text p {
      font-size: clamp(1.25rem, 1.75vw, 1.75rem);
    }

    .mid-text p {
      font-size: clamp(1.75rem, 2.5vw, 2.5rem);
    }

    .final-text h2 {
      font-size: clamp(4.5rem, 6vw, 7rem);
    }

    .discount-label {
      max-width: 520px;
      font-size: clamp(1rem, 1.1vw, 1.25rem);
    }

    .discount-code {
      font-size: clamp(1.5rem, 1.75vw, 2rem);
      padding: 1rem 2.5rem;
    }

    .section-top-gradient {
      height: 200px;
    }

    .section-bottom-gradient {
      height: 160px;
    }

    .emoji-float {
      font-size: 10rem;
    }

    .emoji-left { left: 16%; }
    .emoji-right { right: 16%; }
  }

  /* ── Landscape mobile / short viewport (≤ 500px tall) ─────────────────── *
   * On landscape iPhone (e.g. 844×390), isDesktop=true so the desktop branch  *
   * runs. Default top-gradient is 120px (31% of 390px) which covers final-text *
   * at top:22% (86px) — it gets faded out by its own gradient overlay.         *
   * Fix: shrink gradients, adjust text positions, compact font sizes.           */
  @media (max-height: 500px) {
    .easter-egg-blend {
      height: 60px;
    }

    .emoji-transition-zone {
      height: 60dvh;
    }

    .section-top-gradient {
      height: 50px;
    }

    .section-bottom-gradient {
      height: 40px;
    }

    /* Move texts below the now-shorter top gradient */
    .final-text    { top: 27%; }
    .discount-reveal { top: 58%; }

    /* Compact heading so final-text + discount don't overlap */
    .final-text h2 {
      font-size: clamp(1.5rem, 4.5vw, 2.5rem);
      line-height: 1.05;
    }

    /* Smaller body copy */
    .easter-text p,
    .mid-text p {
      font-size: clamp(0.875rem, 2.5vw, 1.1rem);
      line-height: 1.4;
    }

    /* Compact discount pill and label */
    .discount-label {
      font-size: 0.8125rem;
      max-width: 280px;
    }

    .discount-code {
      font-size: 1rem;
      padding: 0.625rem 1.25rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .easter-egg-section .easter-text,
    .easter-egg-section .discount-reveal {
      opacity: 1 !important;
      transform: translateX(-50%) !important;
    }

    .easter-egg-section .window-container {
      opacity: 1 !important;
      transform: scale(2.5) !important;
    }

    .easter-egg-section .sky-container {
      opacity: 1 !important;
      transform: translateY(-30%) !important;
    }

    .emoji-float {
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style>
