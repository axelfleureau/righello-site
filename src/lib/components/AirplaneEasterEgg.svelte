<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let sectionEl: HTMLElement;
  let skyContainer: HTMLElement;
  let windowContainer: HTMLElement;
  let introText: HTMLElement;
  let midText: HTMLElement;
  let finalText: HTMLElement;
  let discountReveal: HTMLElement;
  let ctx: any = null;
  let mounted = false;
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
    mounted = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    await new Promise(resolve => setTimeout(resolve, 100));

    if (!sectionEl || !skyContainer || !windowContainer) return;

    const skyHeight = skyContainer.offsetHeight;
    const vh = window.innerHeight;
    const skyMoveDistance = skyHeight - vh;

    gsap.set(introText, { opacity: 0, yPercent: 30 });
    gsap.set(midText, { opacity: 0, yPercent: 30 });
    gsap.set(finalText, { opacity: 0, yPercent: 30 });
    gsap.set(discountReveal, { opacity: 0, scale: 0.8 });

    ctx = gsap.context(() => {
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
    }, sectionEl);
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<div class="easter-egg-blend" aria-hidden="true"></div>

<section bind:this={sectionEl} class="easter-egg-section">
  <!-- Desktop: absolute-positioned layers for GSAP scrollytelling -->
  <div bind:this={skyContainer} class="sky-container desktop-only">
    <img src="/sky-easter-egg.jpg" alt="" loading="lazy" decoding="async" draggable="false" />
  </div>
  <div bind:this={windowContainer} class="window-container desktop-only">
    <img src="/window-easter-egg.png" alt="" loading="lazy" decoding="async" draggable="false" />
  </div>

  <div bind:this={introText} class="easter-text intro-text desktop-only">
    <h2>Sei ancora qui?</h2>
    <p>Allora sei davvero interessato!</p>
  </div>

  <div bind:this={midText} class="easter-text mid-text desktop-only">
    <p>Per te che hai scrollato fino a qui, uno sconto che ti aiuterà a raggiungere i risultati che hai sempre sognato.</p>
  </div>

  <div bind:this={finalText} class="easter-text final-text desktop-only">
    <h2>Prendi il volo con il team di Righello!</h2>
  </div>

  <div bind:this={discountReveal} class="discount-reveal desktop-only">
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

  <!-- Mobile: stacked static layout -->
  <div class="mobile-content">
    <div class="easter-text intro-text">
      <h2>Sei ancora qui?</h2>
      <p>Allora sei davvero interessato!</p>
    </div>

    <div class="window-mobile-frame">
      <img src="/window-easter-egg.png" alt="" loading="lazy" decoding="async" draggable="false" />
      <div class="window-sky-peek">
        <img src="/sky-easter-egg.jpg" alt="" loading="lazy" decoding="async" draggable="false" />
      </div>
    </div>

    <div class="easter-text mid-text">
      <p>Per te che hai scrollato fino a qui, uno sconto che ti aiuterà a raggiungere i risultati che hai sempre sognato.</p>
    </div>

    <div class="easter-text final-text">
      <h2>Prendi il volo con il team di Righello!</h2>
    </div>

    <div class="discount-reveal">
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
  </div>
</section>

<style>
  .easter-egg-blend {
    position: relative;
    width: 100%;
    height: 200px;
    background: linear-gradient(to bottom, rgba(5, 5, 5, 1) 0%, #f5f5f5 100%);
    pointer-events: none;
    z-index: 1;
  }

  .easter-egg-section {
    position: relative;
    width: 100%;
    height: 100svh;
    overflow: hidden;
    background: #f5f5f5;
    perspective: 1000px;
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

  .mobile-content {
    display: none;
  }

  .window-mobile-frame {
    display: none;
  }

  .discount-reveal.desktop-only {
    display: flex;
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

  .intro-text {
    top: 35%;
  }

  .mid-text {
    top: 40%;
  }

  .final-text {
    top: 30%;
  }

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

  @media (max-width: 767px) {
    .easter-egg-blend {
      height: 120px;
    }

    .easter-egg-section {
      height: auto;
      min-height: auto;
      overflow: visible;
      perspective: none;
    }

    .desktop-only {
      display: none !important;
    }

    .mobile-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: calc(2rem + env(safe-area-inset-top, 0px)) calc(1.25rem + env(safe-area-inset-right, 0px)) calc(3rem + env(safe-area-inset-bottom, 0px)) calc(1.25rem + env(safe-area-inset-left, 0px));
      gap: 1.5rem;
      position: relative;
      z-index: 5;
    }

    .window-mobile-frame {
      display: block;
      position: relative;
      width: 80%;
      max-width: 280px;
      aspect-ratio: 4 / 3;
      margin: 0.5rem 0;
    }

    .window-mobile-frame > img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      z-index: 2;
    }

    .window-sky-peek {
      position: absolute;
      top: 12%;
      left: 18%;
      width: 64%;
      height: 68%;
      border-radius: 30% / 40%;
      overflow: hidden;
      z-index: 1;
    }

    .window-sky-peek img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .easter-text {
      position: relative;
      left: auto;
      top: auto;
      transform: none;
      opacity: 1;
      color: #1a1a2e;
      text-shadow: none;
      max-width: 100%;
      padding: 0;
    }

    .easter-text h2 {
      font-size: clamp(1.375rem, 6vw, 1.75rem);
      color: #1a1a2e;
    }

    .easter-text p {
      font-size: 1rem;
      color: #4a4a5a;
      line-height: 1.6;
    }

    .discount-reveal {
      position: relative;
      left: auto;
      top: auto;
      transform: none;
      opacity: 1;
      width: 100%;
    }

    .discount-label {
      color: #4a4a5a;
      text-shadow: none;
      font-size: 1rem;
    }

    .discount-code {
      font-size: 1.125rem;
      padding: 0.875rem 1.75rem;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .easter-egg-section {
      height: 100svh;
    }

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
  }

  @media (prefers-reduced-motion: reduce) {
    .easter-egg-section .easter-text,
    .easter-egg-section .discount-reveal {
      opacity: 1 !important;
      transform: translateX(-50%) !important;
    }

    .easter-egg-section .window-container {
      transform: scale(2.5) !important;
    }

    .easter-egg-section .sky-container {
      transform: translateY(-30%) !important;
    }
  }

  @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
    .easter-egg-section .easter-text,
    .easter-egg-section .discount-reveal {
      transform: none !important;
    }
  }
</style>
