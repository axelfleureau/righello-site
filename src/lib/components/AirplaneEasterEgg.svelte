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
  let isMobile = false;

  onMount(async () => {
    if (!browser) return;

    isMobile = window.innerWidth < 768;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (isMobile) return;

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

<section bind:this={sectionEl} class="easter-egg-section" class:is-mobile={isMobile}>
  <div bind:this={skyContainer} class="sky-container">
    <img src="/sky-easter-egg.jpg" alt="" loading="lazy" draggable="false" />
  </div>
  <div bind:this={windowContainer} class="window-container">
    <img src="/window-easter-egg.png" alt="" loading="lazy" draggable="false" />
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
    <span class="discount-code">scrollerevenue26</span>
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

  .sky-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .window-container {
    height: 100svh;
    z-index: 2;
  }

  .window-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    display: inline-block;
    background: #D6487E;
    color: #ffffff;
    font-size: clamp(1.125rem, 3vw, 1.5rem);
    font-weight: 700;
    padding: 0.875rem 2rem;
    border-radius: 9999px;
    letter-spacing: 0.05em;
    min-height: 44px;
    min-width: 44px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(214, 72, 126, 0.4);
    user-select: all;
  }

  .easter-egg-section.is-mobile {
    height: auto;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    gap: 2rem;
  }

  .easter-egg-section.is-mobile .sky-container {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
  }

  .easter-egg-section.is-mobile .window-container {
    position: relative;
    width: 90%;
    max-width: 400px;
    height: auto;
    aspect-ratio: 1;
    transform: scale(1.5);
    margin: 2rem 0;
  }

  .easter-egg-section.is-mobile .window-container img {
    object-fit: contain;
  }

  .easter-egg-section.is-mobile .easter-text {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    opacity: 1 !important;
  }

  .easter-egg-section.is-mobile .discount-reveal {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    opacity: 1 !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .easter-egg-section .easter-text,
    .easter-egg-section .discount-reveal {
      opacity: 1 !important;
      transform: none !important;
    }

    .easter-egg-section .window-container {
      transform: scale(2.5) !important;
    }

    .easter-egg-section .sky-container {
      transform: translateY(-30%) !important;
    }
  }
</style>
