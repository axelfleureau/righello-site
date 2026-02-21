<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let sectionEl: HTMLElement;
  let emojiZone: HTMLElement;
  let skyContainer: HTMLElement;
  let windowContainer: HTMLElement;
  let introText: HTMLElement;
  let midText: HTMLElement;
  let finalText: HTMLElement;
  let discountReveal: HTMLElement;

  let mSectionEl: HTMLElement;
  let mSkyContainer: HTMLElement;
  let mWindowContainer: HTMLElement;
  let mIntroText: HTMLElement;
  let mMidText: HTMLElement;
  let mFinalText: HTMLElement;
  let mDiscountReveal: HTMLElement;

  let preloadZone: HTMLElement;

  let ctx: any = null;
  let copied = false;
  let imagesLoaded = false;
  let preloadObserver: IntersectionObserver | null = null;

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
    if (prefersReducedMotion) return;

    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    await preloadImages();

    await new Promise<void>(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    ctx = gsap.context(() => {
      const emojiEls = emojiZone?.querySelectorAll('.emoji-float');
      if (emojiEls && emojiEls.length > 0) {
        const emojiTl = gsap.timeline({
          scrollTrigger: {
            trigger: emojiZone,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          }
        });

        emojiEls.forEach((el, i) => {
          gsap.set(el, { opacity: 0, scale: 0.5, y: 40, rotation: (i % 2 === 0 ? 1 : -1) * 10, force3D: true });

          const enterStart = i * 0.1;
          const enterDur = 0.15;
          const holdDur = 0.2;
          const exitDur = 0.12;

          emojiTl.to(el, {
            opacity: 1, scale: 1, y: 0, rotation: 0,
            duration: enterDur, ease: 'none'
          }, enterStart);

          emojiTl.to(el, {
            opacity: 0, scale: 0.8, y: -20,
            duration: exitDur, ease: 'none'
          }, enterStart + enterDur + holdDur);
        });
      }

      const vh = window.innerHeight;

      if (isDesktop) {
        if (!sectionEl || !skyContainer || !windowContainer) return;

        const skyHeight = skyContainer.offsetHeight;
        const skyMoveDistance = skyHeight - vh;

        gsap.set([introText, midText, finalText], { opacity: 0, yPercent: 30, force3D: true });
        gsap.set(discountReveal, { opacity: 0, scale: 0.8, force3D: true });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: `+=${vh * 5}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            snap: {
              snapTo: 'labels',
              duration: { min: 0.2, max: 0.5 },
              delay: 0.15,
              ease: 'power1.inOut',
            },
            invalidateOnRefresh: true,
            onEnter: (self) => {
              const spacer = self.spacer;
              if (spacer) spacer.style.zIndex = '50';
            },
            onLeaveBack: (self) => {
              const spacer = self.spacer;
              if (spacer) spacer.style.zIndex = '';
            },
          }
        });

        tl.addLabel('start', 0);

        tl.to(windowContainer, { scale: 4, duration: 0.85, ease: 'none', force3D: true }, 0);
        tl.to(skyContainer, { y: -skyMoveDistance, duration: 0.95, ease: 'none', force3D: true }, 0);

        tl.addLabel('intro', 0.1);
        tl.to(introText, { opacity: 1, yPercent: 0, duration: 0.08, ease: 'none' }, 0.1);
        tl.to(introText, { opacity: 0, yPercent: -15, duration: 0.08, ease: 'none' }, 0.24);

        tl.addLabel('mid', 0.36);
        tl.to(midText, { opacity: 1, yPercent: 0, duration: 0.08, ease: 'none' }, 0.36);
        tl.to(midText, { opacity: 0, yPercent: -15, duration: 0.08, ease: 'none' }, 0.52);

        tl.addLabel('final', 0.64);
        tl.to(finalText, { opacity: 1, yPercent: 0, duration: 0.1, ease: 'none' }, 0.64);

        tl.addLabel('discount', 0.82);
        tl.to(discountReveal, { opacity: 1, scale: 1, duration: 0.1, ease: 'none' }, 0.82);
        tl.addLabel('end', 1);

      } else {
        if (!mSectionEl || !mSkyContainer || !mWindowContainer) return;

        const skyHeight = mSkyContainer.offsetHeight;
        const skyMoveDistance = skyHeight - vh;

        gsap.set([mIntroText, mMidText, mFinalText], { opacity: 0, y: 50, force3D: true });
        gsap.set(mDiscountReveal, { opacity: 0, y: 30, scale: 0.9, force3D: true });
        gsap.set(mWindowContainer, { scale: 1, force3D: true });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mSectionEl,
            start: 'top top',
            end: `+=${vh * 5}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onEnter: (self) => {
              const spacer = self.spacer;
              if (spacer) spacer.style.zIndex = '50';
            },
            onLeaveBack: (self) => {
              const spacer = self.spacer;
              if (spacer) spacer.style.zIndex = '';
            },
          }
        });

        tl.addLabel('start', 0);

        tl.to(mWindowContainer, { scale: 4, duration: 0.85, ease: 'none', force3D: true }, 0);
        tl.to(mSkyContainer, { y: -skyMoveDistance, duration: 0.95, ease: 'none', force3D: true }, 0);

        tl.addLabel('intro', 0.1);
        tl.to(mIntroText, { opacity: 1, y: 0, duration: 0.08, ease: 'none' }, 0.1);
        tl.to(mIntroText, { opacity: 0, y: -30, duration: 0.08, ease: 'none' }, 0.24);

        tl.addLabel('mid', 0.36);
        tl.to(mMidText, { opacity: 1, y: 0, duration: 0.08, ease: 'none' }, 0.36);
        tl.to(mMidText, { opacity: 0, y: -30, duration: 0.08, ease: 'none' }, 0.52);

        tl.addLabel('final', 0.64);
        tl.to(mFinalText, { opacity: 1, y: 0, duration: 0.1, ease: 'none' }, 0.64);

        tl.addLabel('discount', 0.82);
        tl.to(mDiscountReveal, { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: 'none' }, 0.82);
        tl.addLabel('end', 1);
      }
    });

    ScrollTrigger.refresh();
  });

  onDestroy(() => {
    ctx?.revert();
    preloadObserver?.disconnect();
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
<section bind:this={sectionEl} class="easter-egg-section desktop-only" class:images-ready={imagesLoaded}>
  <div class="section-top-gradient" aria-hidden="true"></div>
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

<!-- Mobile scrollytelling -->
<section bind:this={mSectionEl} class="easter-egg-section mobile-section" class:images-ready={imagesLoaded}>
  <div class="section-top-gradient" aria-hidden="true"></div>
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

  .easter-egg-section {
    position: relative;
    z-index: 50;
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

  .mobile-section {
    display: none;
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
    max-width: 600px;
    padding: 0 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 0, 0, 0.3);
    pointer-events: none;
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .easter-text h2 {
    font-size: clamp(1.75rem, 5vw, 3rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .easter-text p {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    line-height: 1.5;
    font-weight: 400;
  }

  .intro-text { top: 35%; }
  .mid-text { top: 40%; }
  .final-text { top: 30%; }

  .discount-reveal {
    position: absolute;
    z-index: 10;
    top: 55%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    pointer-events: auto;
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .discount-label {
    color: #ffffff;
    font-size: clamp(0.875rem, 2vw, 1rem);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 320px;
    line-height: 1.4;
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

    .mobile-section {
      display: block;
      position: relative;
      z-index: 50;
      height: 100vh;
      height: 100dvh;
      overflow: hidden;
      background: var(--bg-primary);
    }

    .section-top-gradient {
      height: 80px;
    }

    .easter-text h2 {
      font-size: clamp(1.375rem, 6vw, 1.75rem);
    }

    .easter-text p {
      font-size: 1rem;
    }

    .discount-code {
      font-size: 1.125rem;
      padding: 0.875rem 1.75rem;
    }

    .discount-label {
      max-width: 280px;
    }
  }

  @media (min-width: 768px) {
    .mobile-section {
      display: none !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .easter-text h2 {
      font-size: clamp(1.5rem, 4vw, 2.25rem);
    }

    .easter-text p {
      font-size: clamp(0.9375rem, 2vw, 1.125rem);
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
