<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';

  export type PhotoSpotlightItem = {
    src: string;
    alt: string;
    label?: string;
    position?: string;
  };

  export type PhotoSpotlightLink = {
    label: string;
    description: string;
    href: string;
  };

  export let eyebrow = 'Produzioni foto e video';
  export let title = 'Una gallery deve far venire voglia di aprire tutto il lavoro.';
  export let text =
    'Usiamo foto, video e gallery come asset commerciali: selezionati, ordinati e pronti per sito, social, campagne e presentazioni.';
  export let anchorId = 'produzioni-foto-video';
  export let images: PhotoSpotlightItem[] = [];
  export let links: PhotoSpotlightLink[] = [];

  let section: HTMLElement;
  let gallery: HTMLElement;
  let overlay: HTMLElement;
  let content: HTMLElement;
  let footer: HTMLElement;
  let imageNodes: HTMLImageElement[] = [];
  let ctx: { revert: () => void } | null = null;
  let scrollTrigger: { kill: () => void } | null = null;

  const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
  $: imageColumns = [images.slice(0, 3), images.slice(3, 6), images.slice(6, 9)];

  onMount(async () => {
    if (!browser || !section || !gallery) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 900px)').matches;
    if (reduceMotion || !desktop) return;

    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    const gsap = gsapModule.default;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      gsap.set(gallery, { scale: 1.12, force3D: true });
      gsap.set(imageNodes, { scale: 1.16, force3D: true });
      gsap.set(content, { y: 28, opacity: 0.18 });
      gsap.set(footer, { y: 22, opacity: 0.55, filter: 'blur(0px)' });

      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const focusProgress = gsap.utils.clamp(0, 1, progress / 0.72);
          const contentProgress = gsap.utils.clamp(0, 1, (progress - 0.1) / 0.42);
          const exitProgress = gsap.utils.clamp(0, 1, (progress - 0.72) / 0.28);

          gsap.set(gallery, {
            scale: lerp(1.12, 0.58, focusProgress),
            yPercent: lerp(0, -5, exitProgress),
          });

          gsap.set(imageNodes, {
            scale: lerp(1.16, 1, focusProgress),
          });

          gsap.set(content, {
            y: lerp(28, 0, contentProgress),
            opacity: lerp(0.18, 1, contentProgress),
          });

          gsap.set(footer, {
            y: lerp(22, -22, exitProgress),
            opacity: lerp(0.55, 0, exitProgress),
            filter: `blur(${lerp(0, 16, exitProgress)}px)`,
          });

          gsap.set(overlay, {
            opacity: lerp(0.12, 0.52, contentProgress),
          });
        },
      });
    }, section);
  });

  onDestroy(() => {
    scrollTrigger?.kill();
    ctx?.revert();
  });
</script>

<section id={anchorId} class="photo-spotlight" bind:this={section} aria-label={title}>
  <div class="photo-spotlight__stage">
    <div class="photo-spotlight__gallery" bind:this={gallery}>
      {#each imageColumns as column, col}
        <div class="photo-spotlight__col">
          {#each column as image, row}
            <figure class="photo-spotlight__item">
              <img
                bind:this={imageNodes[col * 3 + row]}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={`object-position: ${image.position || 'center center'};`}
              />
              {#if image.label}
                <figcaption>{image.label}</figcaption>
              {/if}
            </figure>
          {/each}
        </div>
      {/each}
    </div>

    <div class="photo-spotlight__overlay" bind:this={overlay}></div>

    <div class="photo-spotlight__content" bind:this={content}>
      <p class="section-subtitle">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
      {#if links.length}
        <div class="photo-spotlight__links">
          {#each links as link}
            <a href={link.href} target="_blank" rel="noreferrer">
              <span>
                <strong>{link.label}</strong>
                <small>{link.description}</small>
              </span>
              <em aria-hidden="true">↗</em>
            </a>
          {/each}
        </div>
      {/if}
    </div>

    <div class="photo-spotlight__footer" bind:this={footer} aria-hidden="true">
      <span>Gallery Lumis</span>
      <span>scrolla</span>
    </div>
  </div>
</section>

<style>
  .photo-spotlight {
    position: relative;
    height: 220svh;
    min-height: 72rem;
    overflow: hidden;
    background: #050505;
    color: #fff;
  }

  .photo-spotlight__stage {
    position: sticky;
    top: 0;
    height: 100svh;
    min-height: 42rem;
    overflow: hidden;
    isolation: isolate;
  }

  .photo-spotlight__gallery {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    width: min(190vw, 150rem);
    height: min(180svh, 92rem);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(0.65rem, 1.4vw, 1.15rem);
    transform: translate(-50%, -50%);
    transform-origin: center;
    will-change: transform;
  }

  .photo-spotlight__col {
    display: grid;
    gap: clamp(0.65rem, 1.4vw, 1.15rem);
  }

  .photo-spotlight__col:nth-child(2) {
    transform: translateY(-4%);
  }

  .photo-spotlight__col:nth-child(3) {
    transform: translateY(3%);
  }

  .photo-spotlight__item {
    position: relative;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    margin: 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(1.15rem, 2.4vw, 2rem);
    background: #111;
  }

  .photo-spotlight__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.08) contrast(1.04);
    transform-origin: center;
    will-change: transform;
  }

  .photo-spotlight__item figcaption {
    position: absolute;
    left: 0.85rem;
    bottom: 0.85rem;
    z-index: 1;
    max-width: calc(100% - 1.7rem);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    padding: 0.42rem 0.65rem;
    background: rgba(0, 0, 0, 0.38);
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.72rem;
    font-weight: 850;
    line-height: 1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    backdrop-filter: blur(12px);
  }

  .photo-spotlight__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background:
      radial-gradient(circle at 50% 48%, rgba(214, 72, 126, 0.08), transparent 18rem),
      linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.72));
    opacity: 0.2;
    pointer-events: none;
    will-change: opacity;
  }

  .photo-spotlight__content {
    position: absolute;
    inset: 0;
    z-index: 2;
    width: min(100% - 2rem, 58rem);
    height: max-content;
    margin: auto;
    display: grid;
    place-items: center;
    text-align: center;
    will-change: transform, opacity;
  }

  .photo-spotlight__content h2 {
    margin: 0;
    max-width: 54rem;
    color: #fff;
    font-size: clamp(2.5rem, 7.5vw, 6.2rem);
    line-height: 0.9;
    letter-spacing: 0;
  }

  .photo-spotlight__content > p:not(.section-subtitle) {
    max-width: 42rem;
    margin: 1.05rem auto 0;
    color: rgba(255, 255, 255, 0.78);
    font-size: clamp(1rem, 1.7vw, 1.18rem);
    line-height: 1.58;
  }

  .photo-spotlight__links {
    width: min(100%, 48rem);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.65rem;
    margin-top: clamp(1.35rem, 3vw, 2rem);
  }

  .photo-spotlight__links a {
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    min-height: 9.6rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 1.2rem;
    padding: 1rem;
    background: rgba(8, 8, 8, 0.56);
    color: #fff;
    text-align: left;
    text-decoration: none;
    backdrop-filter: blur(18px);
  }

  .photo-spotlight__links strong,
  .photo-spotlight__links small {
    display: block;
  }

  .photo-spotlight__links strong {
    font-size: 1.05rem;
    line-height: 1;
  }

  .photo-spotlight__links small {
    margin-top: 0.45rem;
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.35;
  }

  .photo-spotlight__links em {
    align-self: flex-end;
    width: 2.35rem;
    height: 2.35rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: var(--righello-pink, #d6487e);
    color: #fff;
    font-style: normal;
  }

  .photo-spotlight__footer {
    position: absolute;
    right: clamp(1rem, 4vw, 2rem);
    bottom: clamp(1rem, 4vw, 2rem);
    z-index: 2;
    display: flex;
    gap: 0.55rem;
    align-items: center;
    color: rgba(255, 255, 255, 0.76);
    font-size: 0.75rem;
    font-weight: 850;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    will-change: transform, opacity, filter;
  }

  .photo-spotlight__footer span {
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    padding: 0.5rem 0.7rem;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(14px);
  }

  @media (hover: hover) and (pointer: fine) {
    .photo-spotlight__links a:hover {
      border-color: rgba(214, 72, 126, 0.55);
      background: rgba(8, 8, 8, 0.72);
    }
  }

  @media (max-width: 899px), (prefers-reduced-motion: reduce) {
    .photo-spotlight {
      height: auto;
      min-height: 0;
      overflow: hidden;
      padding: clamp(4rem, 14vw, 6rem) 0;
    }

    .photo-spotlight__stage {
      position: relative;
      height: auto;
      min-height: 0;
      display: grid;
      gap: 1.35rem;
      padding: 0 1rem;
    }

    .photo-spotlight__gallery {
      position: relative;
      top: auto;
      left: auto;
      width: min(100%, 54rem);
      height: auto;
      order: 2;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin: 0 auto;
      transform: none;
    }

    .photo-spotlight__col,
    .photo-spotlight__col:nth-child(2),
    .photo-spotlight__col:nth-child(3) {
      transform: none;
    }

    .photo-spotlight__item {
      aspect-ratio: 0.78;
      border-radius: 1rem;
    }

    .photo-spotlight__item img {
      transform: none;
    }

    .photo-spotlight__overlay {
      opacity: 0.22;
    }

    .photo-spotlight__content {
      position: relative;
      inset: auto;
      width: min(100%, 52rem);
      order: 1;
      margin: 0 auto;
      opacity: 1 !important;
      transform: none !important;
    }

    .photo-spotlight__links {
      grid-template-columns: 1fr;
    }

    .photo-spotlight__links a {
      min-height: 0;
    }

    .photo-spotlight__footer {
      display: none;
    }
  }

  @media (max-width: 520px) {
    .photo-spotlight__gallery {
      gap: 0.45rem;
    }

    .photo-spotlight__col {
      gap: 0.45rem;
    }

    .photo-spotlight__item {
      border-radius: 0.7rem;
    }

    .photo-spotlight__item figcaption {
      left: 0.45rem;
      bottom: 0.45rem;
      max-width: calc(100% - 0.9rem);
      padding: 0.32rem 0.45rem;
      font-size: 0.58rem;
    }
  }
</style>
