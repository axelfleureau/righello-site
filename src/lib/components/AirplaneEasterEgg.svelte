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
  let mWindowFrame: HTMLElement;
  let mIntroText: HTMLElement;
  let mMidText: HTMLElement;
  let mFinalText: HTMLElement;
  let mDiscountReveal: HTMLElement;

  let ctx: any = null;
  let copied = false;

  const DISCOUNT_CODE = 'scrollerevenue26';
  const WA_NUMBER = '393393998351';
  const WA_MSG = encodeURIComponent(
    `Ciao! Sono interessato/a a collaborare con Righello. Ho trovato il codice sconto "${DISCOUNT_CODE}" sul vostro sito. Vorrei saperne di più!`
  );
  const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    await new Promise(resolve => setTimeout(resolve, 150));

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    ctx = gsap.context(() => {
      const emojiEls = emojiZone?.querySelectorAll('.emoji-float');
      if (emojiEls && emojiEls.length > 0) {
        gsap.set(emojiEls, { opacity: 0, scale: 0.5, y: 40 });
        ScrollTrigger.create({
          trigger: emojiZone,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            emojiEls.forEach((el, i) => {
              const stagger = i * 0.12;
              const local = Math.max(0, Math.min(1, (p - stagger) / 0.3));
              const fadeOut = p > 0.7 ? Math.max(0, 1 - (p - 0.7) / 0.3) : 1;
              gsap.set(el, {
                opacity: local * fadeOut,
                scale: 0.5 + local * 0.5,
                y: 40 * (1 - local),
                rotation: (i % 2 === 0 ? 1 : -1) * 10 * (1 - local)
              });
            });
          }
        });
      }

      if (isDesktop) {
        if (!sectionEl || !skyContainer || !windowContainer) return;

        const skyHeight = skyContainer.offsetHeight;
        const vh = window.innerHeight;
        const skyMoveDistance = skyHeight - vh;

        gsap.set(introText, { opacity: 0, yPercent: 30 });
        gsap.set(midText, { opacity: 0, yPercent: 30 });
        gsap.set(finalText, { opacity: 0, yPercent: 30 });
        gsap.set(discountReveal, { opacity: 0, scale: 0.8 });

        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top top',
          end: `+=${vh * 3}px`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            let windowScale;
            if (progress <= 0.5) {
              windowScale = 1 + (progress / 0.5) * 3;
            } else {
              windowScale = 4;
            }
            gsap.set(windowContainer, { scale: windowScale });
            gsap.set(skyContainer, { y: -progress * skyMoveDistance });

            if (progress >= 0.05 && progress <= 0.3) {
              const p = (progress - 0.05) / 0.25;
              gsap.set(introText, { opacity: p < 0.5 ? p * 2 : 2 - p * 2, yPercent: 30 * (1 - p) });
            } else {
              gsap.set(introText, { opacity: 0 });
            }

            if (progress >= 0.35 && progress <= 0.6) {
              const p = (progress - 0.35) / 0.25;
              gsap.set(midText, { opacity: p < 0.5 ? p * 2 : 2 - p * 2, yPercent: 30 * (1 - p) });
            } else {
              gsap.set(midText, { opacity: 0 });
            }

            if (progress >= 0.6 && progress <= 0.85) {
              const p = (progress - 0.6) / 0.25;
              const fadeIn = Math.min(1, p * 3);
              gsap.set(finalText, { opacity: fadeIn, yPercent: 30 * (1 - p) });
            } else if (progress > 0.85) {
              gsap.set(finalText, { opacity: 1, yPercent: 0 });
            } else {
              gsap.set(finalText, { opacity: 0 });
            }

            if (progress >= 0.7) {
              const p = (progress - 0.7) / 0.3;
              gsap.set(discountReveal, { opacity: Math.min(1, p * 2), scale: 0.8 + 0.2 * Math.min(1, p * 2) });
            } else {
              gsap.set(discountReveal, { opacity: 0, scale: 0.8 });
            }
          }
        });
      } else {
        if (!mSectionEl) return;

        const vh = window.innerHeight;

        gsap.set(mIntroText, { opacity: 0, y: 50 });
        gsap.set(mWindowFrame, { opacity: 0, scale: 0.6 });
        gsap.set(mMidText, { opacity: 0, y: 50 });
        gsap.set(mFinalText, { opacity: 0, y: 50 });
        gsap.set(mDiscountReveal, { opacity: 0, y: 30, scale: 0.9 });

        ScrollTrigger.create({
          trigger: mSectionEl,
          start: 'top top',
          end: `+=${vh * 2.5}px`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress <= 0.15) {
              const p = progress / 0.15;
              gsap.set(mIntroText, { opacity: p, y: 50 * (1 - p) });
            } else if (progress <= 0.25) {
              gsap.set(mIntroText, { opacity: 1, y: 0 });
            } else if (progress <= 0.35) {
              const p = (progress - 0.25) / 0.1;
              gsap.set(mIntroText, { opacity: 1 - p, y: -30 * p });
            } else {
              gsap.set(mIntroText, { opacity: 0 });
            }

            if (progress >= 0.15 && progress <= 0.35) {
              const p = (progress - 0.15) / 0.2;
              gsap.set(mWindowFrame, { opacity: Math.min(1, p * 2), scale: 0.6 + 0.4 * Math.min(1, p * 1.5) });
            } else if (progress > 0.35 && progress <= 0.55) {
              gsap.set(mWindowFrame, { opacity: 1, scale: 1 });
            } else if (progress > 0.55 && progress <= 0.65) {
              const p = (progress - 0.55) / 0.1;
              gsap.set(mWindowFrame, { opacity: 1 - p * 0.7, scale: 1 + p * 0.1 });
            } else if (progress > 0.65) {
              gsap.set(mWindowFrame, { opacity: 0.3, scale: 1.1 });
            } else {
              gsap.set(mWindowFrame, { opacity: 0, scale: 0.6 });
            }

            if (progress >= 0.4 && progress <= 0.55) {
              const p = (progress - 0.4) / 0.15;
              gsap.set(mMidText, { opacity: p, y: 50 * (1 - p) });
            } else if (progress > 0.55 && progress <= 0.65) {
              gsap.set(mMidText, { opacity: 1, y: 0 });
            } else if (progress > 0.65 && progress <= 0.75) {
              const p = (progress - 0.65) / 0.1;
              gsap.set(mMidText, { opacity: 1 - p, y: -30 * p });
            } else if (progress > 0.75) {
              gsap.set(mMidText, { opacity: 0 });
            } else {
              gsap.set(mMidText, { opacity: 0, y: 50 });
            }

            if (progress >= 0.65 && progress <= 0.8) {
              const p = (progress - 0.65) / 0.15;
              gsap.set(mFinalText, { opacity: Math.min(1, p * 1.5), y: 50 * (1 - p) });
            } else if (progress > 0.8) {
              gsap.set(mFinalText, { opacity: 1, y: 0 });
            } else {
              gsap.set(mFinalText, { opacity: 0, y: 50 });
            }

            if (progress >= 0.75) {
              const p = (progress - 0.75) / 0.25;
              gsap.set(mDiscountReveal, {
                opacity: Math.min(1, p * 2),
                y: 30 * (1 - Math.min(1, p * 2)),
                scale: 0.9 + 0.1 * Math.min(1, p * 2)
              });
            } else {
              gsap.set(mDiscountReveal, { opacity: 0, y: 30, scale: 0.9 });
            }
          }
        });
      }
    });
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<div class="easter-egg-blend" aria-hidden="true"></div>

<div bind:this={emojiZone} class="emoji-transition-zone" aria-hidden="true">
  <span class="emoji-float emoji-left emoji-1">👀</span>
  <span class="emoji-float emoji-right emoji-2">💭</span>
  <span class="emoji-float emoji-left emoji-3">🤔</span>
  <span class="emoji-float emoji-right emoji-4">👀</span>
  <span class="emoji-float emoji-left emoji-5">✈️</span>
  <span class="emoji-float emoji-right emoji-6">🤫</span>
</div>

<!-- Desktop scrollytelling -->
<section bind:this={sectionEl} class="easter-egg-section desktop-only">
  <div bind:this={skyContainer} class="sky-container">
    <img src="/sky-easter-egg.jpg" alt="" loading="lazy" decoding="async" draggable="false" />
  </div>
  <div bind:this={windowContainer} class="window-container">
    <img src="/window-easter-egg.png" alt="" loading="lazy" decoding="async" draggable="false" />
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
<section bind:this={mSectionEl} class="easter-egg-section mobile-section">
  <div class="mobile-sky-bg">
    <img src="/sky-easter-egg.jpg" alt="" decoding="async" draggable="false" />
  </div>

  <div bind:this={mIntroText} class="m-text m-intro">
    <h2>Sei ancora qui?</h2>
    <p>Allora sei davvero interessato!</p>
  </div>

  <div bind:this={mWindowFrame} class="m-window-frame">
    <img src="/window-easter-egg.png" alt="Finestrino aereo" decoding="async" draggable="false" />
    <div class="m-window-sky">
      <img src="/sky-easter-egg.jpg" alt="" decoding="async" draggable="false" />
    </div>
  </div>

  <div bind:this={mMidText} class="m-text m-mid">
    <p>Per te che hai scrollato fino a qui, uno sconto che ti aiuterà a raggiungere i risultati che hai sempre sognato.</p>
  </div>

  <div bind:this={mFinalText} class="m-text m-final">
    <h2>Prendi il volo con il team di Righello!</h2>
  </div>

  <div bind:this={mDiscountReveal} class="m-discount">
    <span class="m-discount-label">Codice sconto da comunicare in fase di preventivo</span>
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
    background: linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-primary) 100%);
    pointer-events: none;
    z-index: 1;
  }

  .emoji-transition-zone {
    position: relative;
    width: 100%;
    height: 80svh;
    background: var(--bg-primary);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .emoji-float {
    position: absolute;
    font-size: 2.5rem;
    opacity: 0;
    will-change: transform, opacity;
    user-select: none;
    pointer-events: none;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
  }

  .emoji-left { left: 8%; }
  .emoji-right { right: 8%; }
  .emoji-1 { top: 12%; }
  .emoji-2 { top: 25%; }
  .emoji-3 { top: 42%; }
  .emoji-4 { top: 58%; }
  .emoji-5 { top: 72%; }
  .emoji-6 { top: 85%; }

  .easter-egg-section {
    position: relative;
    width: 100%;
    height: 100svh;
    overflow: hidden;
    background: var(--bg-primary);
    perspective: 1000px;
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
  }

  .sky-container {
    height: 350svh;
    z-index: 1;
  }

  .sky-container img,
  .window-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .window-container {
    height: 100svh;
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

  /* ===== MOBILE SECTION ===== */

  .mobile-sky-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.15;
  }

  .mobile-sky-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .m-text {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 85%;
    max-width: 400px;
    pointer-events: none;
    will-change: transform, opacity;
  }

  .m-text h2 {
    font-size: clamp(1.5rem, 7vw, 2rem);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .m-text p {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .m-window-frame {
    position: absolute;
    z-index: 5;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    max-width: 380px;
    aspect-ratio: 16 / 9;
    border-radius: 1rem;
    overflow: hidden;
    will-change: transform, opacity;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  }

  .m-window-frame > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
  }

  .m-window-sky {
    position: absolute;
    top: 11%;
    left: 31%;
    width: 38%;
    height: 76%;
    border-radius: 42% / 46%;
    overflow: hidden;
    z-index: 1;
  }

  .m-window-sky img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .m-discount {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 65%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 90%;
    pointer-events: auto;
    will-change: transform, opacity;
  }

  .m-discount-label {
    color: var(--text-secondary);
    font-size: 1rem;
    text-align: center;
    max-width: 300px;
    line-height: 1.4;
  }

  @media (max-width: 767px) {
    .easter-egg-blend {
      height: 100px;
    }

    .emoji-transition-zone {
      height: 70svh;
    }

    .emoji-float {
      font-size: 2rem;
    }

    .emoji-left { left: 6%; }
    .emoji-right { right: 6%; }

    .desktop-only {
      display: none !important;
    }

    .mobile-section {
      display: block;
      height: 100svh;
      overflow: hidden;
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
      font-size: 3rem;
    }
  }

  @media (min-width: 1025px) {
    .emoji-float {
      font-size: 3.5rem;
    }

    .emoji-left { left: 12%; }
    .emoji-right { right: 12%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .easter-egg-section .easter-text,
    .easter-egg-section .discount-reveal,
    .m-text,
    .m-window-frame,
    .m-discount {
      opacity: 1 !important;
      transform: translate(-50%, -50%) !important;
    }

    .m-discount {
      transform: translate(-50%, 0) !important;
    }

    .easter-egg-section .window-container {
      transform: scale(2.5) !important;
    }

    .easter-egg-section .sky-container {
      transform: translateY(-30%) !important;
    }

    .emoji-float {
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style>
