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
  let imageNodes: HTMLImageElement[] = [];
  let ctx: { revert: () => void } | null = null;

  $: imageColumns = [images.slice(0, 3), images.slice(3, 6), images.slice(6, 9)];

  onMount(async () => {
    if (!browser || !section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 900px)').matches;
    if (reduceMotion || !desktop) return;

    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    const gsap = gsapModule.default;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.photo-spotlight__item', section);

      gsap.set(imageNodes, { scale: 1.06, force3D: true });
      gsap.set(cards, { y: 28, opacity: 0.82, force3D: true });

      cards.forEach((card, index) => {
        const offset = index % 3 === 0 ? -44 : index % 3 === 1 ? 22 : -18;
        gsap.to(card, {
          y: offset,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.to(imageNodes, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => section.classList.add('is-visible'),
      });
    }, section);
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section id={anchorId} class="photo-spotlight" bind:this={section} aria-label={title}>
  <div class="section-container photo-spotlight__layout">
    <div class="photo-spotlight__content">
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

    <div class="photo-spotlight__gallery" aria-label="Esempi visuali Righello">
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
  </div>
</section>

<style>
  .photo-spotlight {
    position: relative;
    scroll-margin-top: 7rem;
    overflow: hidden;
    padding: clamp(5rem, 11vw, 8rem) 0;
    background:
      radial-gradient(circle at 12% 22%, rgba(214, 72, 126, 0.16), transparent 24rem),
      radial-gradient(circle at 92% 72%, rgba(6, 182, 212, 0.1), transparent 26rem),
      #050505;
    color: #fff;
  }

  .photo-spotlight__layout {
    display: grid;
    gap: clamp(2rem, 6vw, 5rem);
    align-items: start;
  }

  .photo-spotlight__gallery {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(0.55rem, 1.1vw, 0.9rem);
    min-width: 0;
  }

  .photo-spotlight__col {
    display: grid;
    gap: clamp(0.55rem, 1.1vw, 0.9rem);
  }

  .photo-spotlight__col:nth-child(2) {
    padding-top: clamp(1.6rem, 5vw, 4rem);
  }

  .photo-spotlight__col:nth-child(3) {
    padding-top: clamp(0.8rem, 3vw, 2.4rem);
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
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
  }

  .photo-spotlight__item::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 48%, rgba(0, 0, 0, 0.54));
    pointer-events: none;
  }

  .photo-spotlight__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.08) contrast(1.04);
    transform-origin: center;
    will-change: transform;
  }

  .photo-spotlight__col:nth-child(1) .photo-spotlight__item:nth-child(1),
  .photo-spotlight__col:nth-child(2) .photo-spotlight__item:nth-child(2),
  .photo-spotlight__col:nth-child(3) .photo-spotlight__item:nth-child(1) {
    aspect-ratio: 0.82;
  }

  .photo-spotlight__col:nth-child(1) .photo-spotlight__item:nth-child(2),
  .photo-spotlight__col:nth-child(2) .photo-spotlight__item:nth-child(1),
  .photo-spotlight__col:nth-child(3) .photo-spotlight__item:nth-child(3) {
    aspect-ratio: 1.04;
  }

  .photo-spotlight__col:nth-child(1) .photo-spotlight__item:nth-child(3),
  .photo-spotlight__col:nth-child(2) .photo-spotlight__item:nth-child(3),
  .photo-spotlight__col:nth-child(3) .photo-spotlight__item:nth-child(2) {
    aspect-ratio: 1.28;
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

  .photo-spotlight__content {
    max-width: 43rem;
  }

  .photo-spotlight__content h2 {
    margin: 0;
    color: #fff;
    font-size: clamp(2.7rem, 6.2vw, 6rem);
    line-height: 0.88;
    letter-spacing: 0;
  }

  .photo-spotlight__content > p:not(.section-subtitle) {
    margin: 1.25rem 0 0;
    color: rgba(255, 255, 255, 0.72);
    font-size: clamp(1rem, 1.7vw, 1.18rem);
    line-height: 1.58;
  }

  .photo-spotlight__links {
    width: 100%;
    display: grid;
    gap: 0.65rem;
    margin-top: clamp(1.4rem, 4vw, 2.4rem);
  }

  .photo-spotlight__links a {
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 1.35rem;
    padding: 0.95rem;
    background: rgba(255, 255, 255, 0.055);
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
    font-size: 1rem;
    line-height: 1;
  }

  .photo-spotlight__links small {
    margin-top: 0.45rem;
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.35;
  }

  .photo-spotlight__links em {
    flex: 0 0 auto;
    width: 2.35rem;
    height: 2.35rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: var(--righello-pink, #d6487e);
    color: #fff;
    font-style: normal;
  }

  @media (hover: hover) and (pointer: fine) {
    .photo-spotlight__links a:hover {
      border-color: rgba(214, 72, 126, 0.55);
      background: rgba(255, 255, 255, 0.085);
      transform: translateY(-2px);
    }
  }

  @media (min-width: 900px) {
    .photo-spotlight__layout {
      grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
    }

    .photo-spotlight__content {
      position: sticky;
      top: 8rem;
      padding-top: 1rem;
    }
  }

  @media (max-width: 899px), (prefers-reduced-motion: reduce) {
    .photo-spotlight {
      padding: clamp(4rem, 14vw, 6rem) 0;
    }

    .photo-spotlight__gallery {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .photo-spotlight__col:nth-child(2),
    .photo-spotlight__col:nth-child(3) {
      padding-top: 0;
    }

    .photo-spotlight__item {
      aspect-ratio: 0.78;
      border-radius: 1rem;
    }

    .photo-spotlight__item img {
      transform: none;
    }

    .photo-spotlight__links {
      grid-template-columns: 1fr;
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
