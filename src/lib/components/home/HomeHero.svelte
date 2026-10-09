<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import PhoneMockup from '../PhoneMockup.svelte';
  import RippleGrid from '../RippleGrid.svelte';
  import ProButton from '../progetti/ProButton.svelte';

  export let credibilityBadges: { icon: string; label: string }[] = [];
  export let heroVideoCloudinaryUrl: string | undefined = undefined;
  export let heroVideoYoutubeId: string | undefined = undefined;
  export let heroVideoThumbnailUrl: string | undefined = undefined;
  /** Le tre strade dalla prima schermata: ognuna porta alla sezione che la spiega. */
  export let paths: { n: string; title: string; text: string; href: string }[] = [];

  let section: HTMLElement;
  let videoMuted = true;
  let audioUnlocked = false;
  let io: IntersectionObserver | null = null;

  // L'audio parte solo dopo un tocco esplicito sul telefono; quando l'apertura esce
  // dalla vista torna muto, cosi' non resta voce mentre si legge altro.
  function sendUnmute() {
    document.querySelectorAll<HTMLIFrameElement>('iframe[src*="youtube"]').forEach((frame) => {
      frame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
      frame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
    });
  }

  function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    videoMuted = false;
    sendUnmute();
  }

  function retryUnmute() {
    if (audioUnlocked && !videoMuted) sendUnmute();
  }

  onMount(() => {
    window.addEventListener('pointerdown', retryUnmute, { passive: true });
    io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) videoMuted = true;
        else if (audioUnlocked) {
          videoMuted = false;
          sendUnmute();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(section);
  });

  onDestroy(() => {
    io?.disconnect();
    if (browser) window.removeEventListener('pointerdown', retryUnmute);
  });
</script>

<section bind:this={section} class="hero">
  <div class="hero__bg" aria-hidden="true"></div>
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
  <div class="hero__noise noise-overlay" aria-hidden="true"></div>

  <div class="section-container hero__inner">
    <div class="hero__copy">
      <p class="hero__eyebrow">Righello · Pordenone e Mestre</p>

      <h1 class="hero__title">
        <span class="hero__line">Software e prodotti nostri.</span>
        <span class="hero__line gradient-text">Siti e marketing su misura.</span>
      </h1>

      <p class="hero__lede">
        Costruiamo app e gestionali come BUFFR e Óptima. Alle aziende del territorio facciamo siti, campagne, foto e video.
      </p>

      <div class="hero__cta">
        <ProButton href="/progetti" variant="primary" size="lg" arrow="right">Guarda i progetti</ProButton>
        <ProButton href="/contatti" variant="ghost" size="lg">Parliamone</ProButton>
      </div>

      {#if credibilityBadges.length}
        <ul class="hero__badges">
          {#each credibilityBadges as badge}
            <li>
              {#if badge.icon === 'meta'}
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
              {:else if badge.icon === 'google'}
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              {:else if badge.icon === 'star'}
                <svg class="star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {/if}
              <span>{badge.label}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <div class="hero__phone">
      <div class="hero__phone-scale">
        <PhoneMockup
          youtubeId={heroVideoCloudinaryUrl ? undefined : heroVideoYoutubeId}
          videoSrc={heroVideoCloudinaryUrl}
          thumbnailUrl={heroVideoThumbnailUrl}
          muted={videoMuted}
          disable3dTilt={true}
          on:mobiletap={unlockAudio}
        />
      </div>
    </div>

    {#if paths.length}
      <nav class="hero__paths" aria-label="Cosa trovi in questa pagina">
        {#each paths as p}
          <a class="path" href={p.href}>
            <span class="path__n" aria-hidden="true">{p.n}</span>
            <span class="path__t">{p.title}</span>
            <span class="path__d">{p.text}</span>
            <svg class="path__a" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="M8 3v9.5M4 8.5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        {/each}
      </nav>
    {/if}
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(6.2rem, 11vh, 7.6rem) 0 clamp(1.4rem, 3vh, 2.2rem);
  }

  .hero__bg {
    position: absolute;
    inset: 0;
    z-index: -2;
    background:
      radial-gradient(ellipse at 20% 30%, rgba(214, 72, 126, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
      var(--bg-primary);
  }

  :global([data-theme='light']) .hero__bg {
    background:
      radial-gradient(ellipse at 20% 30%, rgba(214, 72, 126, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.06) 0%, transparent 50%),
      var(--bg-primary);
  }

  .hero__noise {
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.2;
    pointer-events: none;
  }

  .hero__inner {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1.6rem;
    justify-items: center;
  }

  .hero__copy {
    width: 100%;
    text-align: center;
  }

  .hero__eyebrow {
    margin: 0 0 1rem;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gradient-start);
  }

  .hero__title {
    margin: 0 0 1rem;
    font-weight: 700;
    font-size: clamp(1.9rem, 7.6vw, 3rem);
    text-wrap: balance;
    line-height: 1.06;
    letter-spacing: -0.015em;
    color: var(--text-primary);
  }

  .hero__line {
    display: block;
  }

  .hero__lede {
    margin: 0 auto 1.5rem;
    max-width: 36rem;
    font-size: 1.05rem;
    line-height: 1.55;
    color: var(--text-secondary);
  }

  .hero__cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-bottom: 1.4rem;
  }

  .hero__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.4rem;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .hero__badges li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .hero__badges svg {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--gradient-start);
  }

  .hero__badges svg.star {
    color: #facc15;
  }

  /* Telefono: il layout lo vede per intero, quindi lo si rimpicciolisce con la
     transform e si recupera lo spazio morto con i margini (altezza ~570 px). */
  .hero__phone {
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  .hero__phone-scale {
    transform: scale(0.62);
    transform-origin: top center;
    margin-bottom: -215px;
  }

  .hero__phone :global(.mobile-tap-hint) {
    pointer-events: auto;
  }

  /* Le tre strade: la riga sotto l'apertura. Sta dentro la prima schermata
     e fa vedere che sotto c'e' altro. */
  .hero__paths {
    width: 100%;
    display: grid;
    gap: 0;
    margin-top: 0.4rem;
  }

  .path {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'n t a' 'n d a';
    column-gap: 0.9rem;
    align-items: center;
    min-height: 3.6rem;
    padding: 0.7rem 0.2rem;
    border-top: 1px solid var(--border-color);
    color: var(--text-primary);
    text-decoration: none;
    text-align: left;
    transition: border-color 0.25s;
  }

  .path:last-child {
    border-bottom: 1px solid var(--border-color);
  }

  .path:hover,
  .path:focus-visible {
    border-top-color: var(--gradient-start);
  }

  .path:focus-visible {
    outline: 2px solid var(--gradient-start);
    outline-offset: 2px;
  }

  .path__n {
    grid-area: n;
    font: 600 0.74rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    color: var(--gradient-start);
  }

  .path__t {
    grid-area: t;
    font-size: 1.02rem;
    font-weight: 600;
  }

  .path__d {
    grid-area: d;
    font-size: 0.86rem;
    line-height: 1.35;
    color: var(--text-secondary);
  }

  .path__a {
    grid-area: a;
    color: var(--text-secondary);
    transition: transform 0.25s, color 0.25s;
  }

  .path:hover .path__a {
    transform: translateY(3px);
    color: var(--gradient-start);
  }

  @media (min-width: 640px) {
    .hero__title {
      font-size: clamp(2.4rem, 6vw, 3.4rem);
    }
  }

  @media (min-width: 1024px) {
    .hero__inner {
      grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
      align-items: center;
      column-gap: 2.5rem;
      row-gap: 1.6rem;
      justify-items: stretch;
    }

    .hero__copy {
      text-align: left;
      max-width: 38rem;
    }

    .hero__title {
      font-size: clamp(2.4rem, 4.3vw, 4rem);
    }

    .hero__lede {
      margin-left: 0;
      font-size: 1.15rem;
    }

    .hero__cta,
    .hero__badges {
      justify-content: flex-start;
    }

    .hero__phone-scale {
      transform: scale(0.88);
      transform-origin: center top;
      margin-bottom: -70px;
    }

    .hero__paths {
      grid-column: 1 / -1;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      column-gap: 1.6rem;
      margin-top: 0;
    }

    .path:last-child {
      border-bottom: 0;
    }
  }

  @media (min-width: 1024px) and (max-height: 820px) {
    .hero__phone-scale {
      transform: scale(0.8);
      margin-bottom: -115px;
    }
  }

  @media (max-height: 500px) and (max-width: 1023px) {
    .hero__phone {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .path,
    .path__a {
      transition: none;
    }
  }
</style>
