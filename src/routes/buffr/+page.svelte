<script lang="ts">
  import { onMount } from 'svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';

  const appStoreUrl = 'https://apps.apple.com/it/app/buffr/id6769990725';
  const appStoreUsUrl = 'https://apps.apple.com/us/app/buffr/id6769990725';

  const screenshots = [
    {
      src: '/products/buffr/replay-in-un-tap.jpg',
      alt: 'BUFFR: schermata replay in un tap',
      label: 'Replay in un tap',
    },
    {
      src: '/products/buffr/modalita-calcio-live.jpg',
      alt: 'BUFFR: modalità calcio live',
      label: 'Calcio live',
    },
    {
      src: '/products/buffr/rivedi-ogni-azione.jpg',
      alt: 'BUFFR: gallery per rivedere ogni azione',
      label: 'Gallery clip',
    },
    {
      src: '/products/buffr/impostazioni-da-pro.jpg',
      alt: 'BUFFR: impostazioni camera da pro',
      label: 'Controlli pro',
    },
  ];

  const featureCards = [
    {
      title: 'Replay in un tap',
      description: 'Salva subito gli ultimi secondi del buffer senza cercare e tagliare un video lungo.',
    },
    {
      title: 'Buffer continuo',
      description: 'La camera registra in continuo e ti lascia catturare il momento quando succede davvero.',
    },
    {
      title: 'Gallery integrata',
      description: 'Rivedi le clip, scarica contenuti sincronizzati e mantieni ordinato il flusso sul campo.',
    },
    {
      title: 'Camera iPhone nativa',
      description: 'Zoom fluido, cambio rapido delle lenti e interfaccia immediata per sport, live e creator.',
    },
  ];

  const flow = [
    {
      step: '01',
      title: 'Avvia il buffer',
      description: 'Apri BUFFR, imposta la durata e lascia la camera pronta durante partita, evento o backstage.',
    },
    {
      step: '02',
      title: 'Cattura gli ultimi secondi',
      description: 'Quando succede l’azione, tocchi una volta e BUFFR salva subito la clip corretta.',
    },
    {
      step: '03',
      title: 'Rivedi e condividi',
      description: 'Le clip finiscono in gallery, pronte da riguardare, scaricare o usare nel workflow social.',
    },
  ];

  const useCases = [
    'Calcio e sport di squadra',
    'Eventi live e backstage',
    'Creator e contenuti social',
    'Team sul campo e operatori video',
  ];

  const productFacts = [
    {
      title: 'Nome app',
      value: 'BUFFR',
    },
    {
      title: 'Seller',
      value: 'RIGHELLO SRL',
    },
    {
      title: 'Categoria',
      value: 'Foto e video',
    },
    {
      title: 'Prezzo',
      value: 'Gratis su App Store',
    },
  ];

  const faqs = [
    {
      question: 'Che cos’è BUFFR di Righello?',
      answer: 'BUFFR è un’app iOS sviluppata da RIGHELLO SRL: una camera buffer per iPhone che registra in continuo e permette di salvare gli ultimi secondi come replay o clip.',
    },
    {
      question: 'A cosa serve una camera buffer per iPhone?',
      answer: 'Serve quando l’azione succede all’improvviso: durante sport, eventi live, backstage o contenuti social puoi salvare solo il momento utile senza tagliare lunghi video dopo.',
    },
    {
      question: 'BUFFR è disponibile su App Store?',
      answer: 'Sì. BUFFR è disponibile su App Store in Italia e negli Stati Uniti con seller RIGHELLO SRL.',
    },
    {
      question: 'BUFFR è gratis?',
      answer: 'La versione 1.0 di BUFFR è indicata come gratuita su App Store.',
    },
  ];

  const schema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'BUFFR Righello',
      url: 'https://www.wearerighello.com/buffr',
      description: 'Pagina prodotto ufficiale di BUFFR, app iOS di RIGHELLO SRL per replay istantanei e clip dagli ultimi secondi registrati su iPhone.',
      inLanguage: 'it-IT',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Righello',
        url: 'https://www.wearerighello.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': ['SoftwareApplication', 'MobileApplication'],
      name: 'BUFFR',
      alternateName: ['BUFFR Righello', 'BUFFR by Righello'],
      applicationCategory: 'PhotoApplication',
      operatingSystem: 'iOS 15.1 or later',
      softwareVersion: '1.0',
      bundleId: 'com.wearerighello.bufferello',
      downloadUrl: appStoreUrl,
      installUrl: appStoreUrl,
      image: 'https://www.wearerighello.com/products/buffr/replay-eventi-live.jpg',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: appStoreUrl,
      },
      author: {
        '@type': 'Organization',
        name: 'RIGHELLO SRL',
        url: 'https://www.wearerighello.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'RIGHELLO SRL',
        url: 'https://www.wearerighello.com',
      },
      url: 'https://www.wearerighello.com/buffr',
      sameAs: [appStoreUrl, appStoreUsUrl],
      description: 'BUFFR è una camera buffer per iPhone che registra in continuo e permette di salvare gli ultimi secondi come replay o clip pronte da rivedere e condividere.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.wearerighello.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'BUFFR',
          item: 'https://www.wearerighello.com/buffr',
        },
      ],
    },
  ]);

  const schemaMarkup = `<script type="application/ld+json">${schema.replace(/</g, '\\u003c')}<\/script>`;
  const demoFrameCount = 84;
  const demoSpriteColumns = 7;
  const demoSpriteFrameWidth = 320;
  const demoSpriteFrameHeight = 568;
  const demoFrameRatio = demoSpriteFrameHeight / demoSpriteFrameWidth;
  const demoSpriteSrc = '/products/buffr/buffr-scroll-sprite-v2.jpg';
  const demoFirstDynamicFrame = 8;
  const demoLastDynamicFrame = demoFrameCount - 1;

  let demoCanvas: HTMLCanvasElement;
  let demoSection: HTMLElement;
  let videoFrame: HTMLElement;

  onMount(() => {
    let ctx: { revert: () => void } | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let frameRequest = 0;
    let activeFrame = -1;
    let isDemoVisible = false;
    let renderLoopActive = false;
    let cancelled = false;
    let reduceMotion = false;
    let setFrameY: ((value: number) => void) | null = null;
    let setFrameScale: ((value: number) => void) | null = null;

    const setupScrollFrames = async () => {
      reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!demoCanvas || !demoSection) {
        return;
      }

      const canvasContext = demoCanvas.getContext('2d', { alpha: false });
      if (!canvasContext) return;

      const sprite = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Unable to load BUFFR scroll sprite'));
        image.src = demoSpriteSrc;
      });

      if (cancelled) return;

      const sizeCanvas = () => {
        const bounds = demoCanvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(bounds.width * dpr));
        const height = Math.max(1, Math.round(bounds.width * demoFrameRatio * dpr));

        if (demoCanvas.width !== width || demoCanvas.height !== height) {
          demoCanvas.width = width;
          demoCanvas.height = height;
        }
      };

      const drawFrame = (index: number) => {
        const column = index % demoSpriteColumns;
        const row = Math.floor(index / demoSpriteColumns);
        canvasContext.drawImage(
          sprite,
          column * demoSpriteFrameWidth,
          row * demoSpriteFrameHeight,
          demoSpriteFrameWidth,
          demoSpriteFrameHeight,
          0,
          0,
          demoCanvas.width,
          demoCanvas.height
        );
        activeFrame = index;
        demoCanvas.dataset.frame = String(index);
      };

      const getScrollProgress = () => {
        const bounds = demoSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const startRatio = isMobile ? 1.35 : 1.45;
        const endRatio = isMobile ? 0.04 : 0.08;
        const start = viewportHeight * startRatio;
        const travel = bounds.height + viewportHeight * (startRatio - endRatio);
        return Math.min(1, Math.max(0, (start - bounds.top) / travel));
      };

      const renderFromScroll = () => {
        const progress = reduceMotion ? 0 : getScrollProgress();
        const frameProgress = Math.min(1, Math.max(0, progress * 1.18));
        const nextFrame = progress <= 0.01
          ? 0
          : Math.min(
              demoLastDynamicFrame,
              Math.max(
                demoFirstDynamicFrame,
                Math.round(
                  demoFirstDynamicFrame + frameProgress * (demoLastDynamicFrame - demoFirstDynamicFrame)
                )
              )
            );

        if (nextFrame !== activeFrame) {
          drawFrame(nextFrame);
        }

        if (setFrameY && setFrameScale) {
          setFrameY(36 + progress * -58);
          setFrameScale(0.96 + progress * 0.04);
        }
      };

      const requestRender = () => {
        if (frameRequest || cancelled) return;
        frameRequest = window.requestAnimationFrame(() => {
          frameRequest = 0;
          renderFromScroll();
          if (renderLoopActive && !cancelled) {
            frameRequest = window.requestAnimationFrame(runRenderLoop);
          }
        });
      };

      const runRenderLoop = () => {
        if (!renderLoopActive || cancelled) {
          frameRequest = 0;
          return;
        }

        renderFromScroll();
        frameRequest = window.requestAnimationFrame(runRenderLoop);
      };

      const startRenderLoop = () => {
        if (reduceMotion) {
          requestRender();
          return;
        }

        if (renderLoopActive) return;
        renderLoopActive = true;
        if (!frameRequest) {
          frameRequest = window.requestAnimationFrame(runRenderLoop);
        }
      };

      const stopRenderLoop = () => {
        renderLoopActive = false;
      };

      resizeObserver = new ResizeObserver(() => {
        sizeCanvas();
        drawFrame(Math.max(0, activeFrame));
        requestRender();
      });
      resizeObserver.observe(demoCanvas);
      sizeCanvas();
      drawFrame(0);

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isDemoVisible = entry.isIntersecting;
          if (isDemoVisible) {
            startRenderLoop();
          } else {
            stopRenderLoop();
          }
        },
        { rootMargin: '220px 0px' }
      );
      intersectionObserver.observe(demoSection);

      const handleScroll = () => {
        requestRender();
        if (isDemoVisible) startRenderLoop();
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', requestRender, { passive: true });
      window.addEventListener('orientationchange', requestRender, { passive: true });
      requestRender();

      const cleanupScrollListeners = () => {
        stopRenderLoop();
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', requestRender);
        window.removeEventListener('orientationchange', requestRender);
      };

      if (reduceMotion) return cleanupScrollListeners;

      const gsapModule = await import('gsap');
      if (cancelled) return cleanupScrollListeners;

      const gsap = gsapModule.default;

      ctx = gsap.context(() => {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        if (videoFrame && !isMobile) {
          gsap.set(videoFrame, { y: 36, scale: 0.96, force3D: true });
          setFrameY = gsap.quickSetter(videoFrame, 'y', 'px') as (value: number) => void;
          setFrameScale = gsap.quickSetter(videoFrame, 'scale') as (value: number) => void;
        }
      }, demoSection);

      requestRender();

      return cleanupScrollListeners;
    };

    let cleanupScrollFrames: (() => void) | void;

    setupScrollFrames().then((cleanup) => {
      cleanupScrollFrames = cleanup;
    }).catch(() => {
      // Keep the poster background visible if a frame asset fails.
    });

    return () => {
      cancelled = true;
      if (frameRequest) window.cancelAnimationFrame(frameRequest);
      cleanupScrollFrames?.();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      ctx?.revert();
    };
  });
</script>

<svelte:head>
  <title>BUFFR Righello | Camera buffer iPhone per replay istantanei</title>
  <meta name="description" content="BUFFR è l’app iOS di Righello S.r.l.: una camera buffer per iPhone che salva gli ultimi secondi come replay e clip per sport, eventi live e creator." />
  <link rel="canonical" href="https://www.wearerighello.com/buffr" />
  <meta property="og:title" content="BUFFR Righello | Camera buffer iPhone" />
  <meta property="og:description" content="L’app iOS di Righello S.r.l. per replay istantanei: salva gli ultimi secondi durante sport, live event, backstage e contenuti social." />
  <meta property="og:image" content="https://www.wearerighello.com/products/buffr/replay-eventi-live.jpg" />
  <meta property="og:url" content="https://www.wearerighello.com/buffr" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="BUFFR Righello | Replay istantanei dal tuo iPhone" />
  <meta name="twitter:description" content="Camera buffer iOS di Righello S.r.l. per sport, live event e creator." />
  <meta name="twitter:image" content="https://www.wearerighello.com/products/buffr/replay-eventi-live.jpg" />
  {@html schemaMarkup}
</svelte:head>

<section class="buffr-hero">
  <div class="section-container hero-grid">
    <RevealOnScroll animation="fly-up" duration={420}>
      <div class="hero-copy">
        <p class="product-kicker">BUFFR by Righello S.r.l.</p>
        <h1 class="hero-title">BUFFR: replay istantanei dal tuo iPhone.</h1>
        <p class="hero-intro">
          BUFFR è l’app iOS di Righello: una camera buffer per creare replay istantanei durante eventi live, sport,
          backstage e contenuti social. Avvia il buffer, registra in continuo e salva gli ultimi
          secondi in clip pronte da rivedere o condividere.
        </p>

        <div class="hero-actions">
          <a class="app-store-button" href={appStoreUrl} target="_blank" rel="noreferrer">
            <svg class="app-store-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.6 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.5-1.7-3-1.7-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5 0-.1-2.7-1.1-2.7-3.3zM15.6 6.5c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1 1.8-.9 2.8 1 .1 2-.5 2.6-1.3z" />
            </svg>
            <span class="app-store-copy">
              <span>Scarica su</span>
              <strong>App Store</strong>
            </span>
          </a>
          <MagneticButton href="#demo" variant="secondary">Guarda BUFFR</MagneticButton>
        </div>

        <div class="hero-meta" aria-label="Informazioni app">
          <span>Gratis</span>
          <span>iOS</span>
          <span>Foto e video</span>
          <span>Versione 1.0</span>
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="scale" delay={120} duration={420}>
      <div class="hero-device" aria-label="Anteprima BUFFR">
        <div class="phone-shell">
          <img
            src="/products/buffr/replay-in-un-tap.jpg"
            alt="Screenshot BUFFR con replay in un tap"
            loading="eager"
            decoding="async"
          />
        </div>
        <div class="live-chip">
          <span></span>
          Buffer attivo
        </div>
      </div>
    </RevealOnScroll>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section class="section-padding feature-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="section-heading">
        <p class="product-kicker">Per sport, live e creator</p>
        <h2>Salva gli ultimi secondi. Non perdere mai l’azione.</h2>
        <p>
          Goal, highlight, scene improvvise e momenti dietro le quinte possono diventare clip
          ordinate senza registrare tutto e tagliare dopo.
        </p>
      </div>
    </RevealOnScroll>

    <div class="feature-grid">
      {#each featureCards as feature, i}
        <RevealOnScroll animation="fly-up" stagger={70} index={i} duration={320}>
          <article class="feature-card">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section id="demo" class="demo-section" bind:this={demoSection}>
  <div class="section-container demo-grid">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="demo-copy">
        <p class="product-kicker">Demo reale</p>
        <h2>Una camera pronta prima che succeda qualcosa.</h2>
        <p>
          BUFFR resta pronta mentre l’evento va avanti: apri la camera, lasci scorrere il buffer
          e salvi il replay appena succede l’azione.
        </p>
      </div>
    </RevealOnScroll>

    <div class="demo-stage">
      <div class="demo-phone" bind:this={videoFrame}>
        <canvas
          bind:this={demoCanvas}
          width="540"
          height="960"
          aria-label="Demo BUFFR controllata dallo scroll"
        ></canvas>
      </div>
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section class="section-padding screenshots-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="section-heading section-heading--left">
        <p class="product-kicker">Dentro l’app</p>
        <h2>Screenshot grandi, flusso semplice.</h2>
        <p>Registri, salvi, rivedi. I controlli restano vicini all’azione.</p>
      </div>
    </RevealOnScroll>

    <div class="screenshot-rail" aria-label="Screenshot BUFFR">
      {#each screenshots as screenshot, i}
        <RevealOnScroll animation="fly-up" stagger={70} index={i} duration={320}>
          <figure class="screenshot-card">
            <img src={screenshot.src} alt={screenshot.alt} loading="eager" decoding="async" />
            <figcaption>{screenshot.label}</figcaption>
          </figure>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding flow-section">
  <div class="section-container flow-grid">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="section-heading section-heading--left">
        <p class="product-kicker">Come funziona</p>
        <h2>Tre passaggi, zero montaggio inutile.</h2>
      </div>
    </RevealOnScroll>

    <div class="flow-list">
      {#each flow as item, i}
        <RevealOnScroll animation="fly-up" stagger={80} index={i} duration={320}>
          <article class="flow-item">
            <span>{item.step}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding use-case-section">
  <div class="section-container use-case-grid">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div>
        <p class="product-kicker">Casi d’uso</p>
        <h2>Quando l’azione non aspetta.</h2>
        <p>
          BUFFR è pensata per creator, editor e operatori sul campo che devono catturare il momento
          giusto senza interrompere il lavoro.
        </p>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="scale" delay={100} duration={360}>
      <div class="use-case-card">
        {#each useCases as useCase}
          <span>{useCase}</span>
        {/each}
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="section-padding product-seo-section">
  <div class="section-container product-seo-grid">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="product-seo-copy">
        <p class="product-kicker">Pagina prodotto ufficiale</p>
        <h2>BUFFR è un prodotto Righello, nato per catturare momenti che non si ripetono.</h2>
        <p>
          Questa è la pagina ufficiale di BUFFR su wearerighello.com. L’app è pubblicata su App Store
          da RIGHELLO SRL e nasce per chi lavora con sport, eventi live, backstage, creator e contenuti
          social. Il valore è semplice: apri la camera, lasci attivo il buffer e salvi subito il replay
          quando succede qualcosa di importante.
        </p>
        <p>
          Per chi cerca “BUFFR Righello”, “camera buffer iPhone” o “app replay istantanei”, qui trova
          descrizione, screenshot, link App Store e informazioni sul seller ufficiale.
        </p>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="scale" delay={90} duration={360}>
      <div class="product-facts" aria-label="Informazioni ufficiali BUFFR">
        {#each productFacts as fact}
          <div>
            <span>{fact.title}</span>
            <strong>{fact.value}</strong>
          </div>
        {/each}
        <a href={appStoreUsUrl} target="_blank" rel="noreferrer">Apri scheda App Store US ↗</a>
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="section-padding faq-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="section-heading">
        <p class="product-kicker">FAQ BUFFR</p>
        <h2>Domande rapide sull’app.</h2>
      </div>
    </RevealOnScroll>

    <div class="faq-grid">
      {#each faqs as faq, i}
        <RevealOnScroll animation="fly-up" stagger={60} index={i} duration={300}>
          <article class="faq-card">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="final-cta">
  <div class="section-container">
    <RevealOnScroll animation="scale" duration={360}>
      <div class="final-cta__inner">
        <p class="product-kicker">BUFFR per iPhone</p>
        <h2>Apri il buffer. Salva il replay.</h2>
        <p>
          Scarica BUFFR gratis su App Store e prova una camera pensata per sport, live event,
          backstage e contenuti social.
        </p>
        <a class="app-store-button app-store-button--large" href={appStoreUrl} target="_blank" rel="noreferrer">
          <svg class="app-store-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.6 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.5-1.7-3-1.7-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5 0-.1-2.7-1.1-2.7-3.3zM15.6 6.5c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1 1.8-.9 2.8 1 .1 2-.5 2.6-1.3z" />
          </svg>
          <span class="app-store-copy">
            <span>Scarica su</span>
            <strong>App Store</strong>
          </span>
        </a>
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .buffr-hero {
    padding: 7.5rem 0 4rem;
    background:
      radial-gradient(circle at 16% 18%, rgba(214, 72, 126, 0.18), transparent 24rem),
      radial-gradient(circle at 88% 12%, rgba(6, 182, 212, 0.16), transparent 26rem),
      linear-gradient(180deg, var(--bg-primary), #030406);
    overflow: hidden;
  }

  .hero-grid,
  .demo-grid,
  .flow-grid,
  .use-case-grid {
    display: grid;
    gap: 2rem;
    align-items: center;
  }

  .product-kicker {
    margin: 0 0 0.8rem;
    color: var(--righello-pink, #D6487E);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .hero-title {
    max-width: 50rem;
    margin: 0 0 1.25rem;
    font-size: clamp(4rem, 10vw, 7.2rem);
    line-height: 0.9;
    font-weight: 900;
    letter-spacing: 0;
  }

  .hero-intro,
  .section-heading p,
  .demo-copy p,
  .flow-item p,
  .use-case-grid p,
  .feature-card p,
  .final-cta p {
    color: var(--text-secondary);
  }

  .hero-intro {
    max-width: 45rem;
    margin-bottom: 1.5rem;
    font-size: clamp(1.12rem, 2vw, 1.42rem);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .app-store-button {
    min-height: 60px;
    width: fit-content;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.72rem;
    border: 1px solid rgba(255, 255, 255, 0.82);
    border-radius: 999px;
    padding: 0.55rem 1.45rem;
    background: #050505;
    color: #fff;
    text-decoration: none;
    line-height: 1;
    box-shadow: 0 16px 44px rgba(0, 0, 0, 0.28);
    transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
  }

  .app-store-button:hover {
    border-color: #fff;
    background: #0b0b0b;
    transform: translateY(-1px);
  }

  .app-store-icon {
    width: 1.65rem;
    height: 1.65rem;
    flex: 0 0 auto;
    fill: currentColor;
  }

  .app-store-copy {
    display: grid;
    gap: 0.16rem;
    text-align: left;
  }

  .app-store-button span {
    font-size: 0.65rem;
    font-weight: 300;
    letter-spacing: 0;
  }

  .app-store-button strong {
    font-size: 1.16rem;
    font-weight: 300;
    letter-spacing: 0;
  }

  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .hero-meta span,
  .use-case-card span {
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.42rem 0.72rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1;
  }

  .hero-device {
    position: relative;
    max-width: 22rem;
    margin: 0 auto;
  }

  .phone-shell,
  .demo-phone {
    position: relative;
    border-radius: 2.4rem;
    padding: 0.62rem;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.04));
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow: 0 34px 100px rgba(0, 0, 0, 0.55);
  }

  .demo-stage,
  .demo-phone,
  .demo-phone canvas {
    touch-action: pan-y;
  }

  .demo-phone {
    contain: layout paint;
    transform: translateZ(0);
    will-change: transform;
  }

  .phone-shell img,
  .demo-phone canvas {
    display: block;
    width: 100%;
    aspect-ratio: 9 / 16;
    object-fit: cover;
    border-radius: 1.9rem;
    background:
      url('/products/buffr/buffr-demo-poster.jpg') center / cover no-repeat,
      #050505;
    transform: translateZ(0);
  }

  .live-chip {
    position: absolute;
    right: -0.5rem;
    bottom: 12%;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    padding: 0.55rem 0.75rem;
    background: rgba(5, 5, 5, 0.78);
    backdrop-filter: blur(18px);
    color: #fff;
    font-weight: 800;
    font-size: 0.85rem;
  }

  .live-chip span {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: #34d399;
    box-shadow: 0 0 18px #34d399;
  }

  .section-heading {
    max-width: 48rem;
    margin: 0 auto 2rem;
    text-align: center;
  }

  .section-heading--left {
    margin-left: 0;
    text-align: left;
  }

  .section-heading h2,
  .demo-copy h2,
  .use-case-grid h2,
  .final-cta h2 {
    margin: 0 0 1rem;
    font-size: clamp(2.4rem, 6vw, 5.2rem);
    line-height: 0.95;
    font-weight: 900;
  }

  .feature-section,
  .screenshots-section {
    background: var(--bg-secondary);
  }

  .feature-grid {
    display: grid;
    gap: 1rem;
  }

  .feature-card,
  .flow-item,
  .use-case-card,
  .final-cta__inner {
    border: 1px solid var(--border-color);
    border-radius: 1.3rem;
    background: var(--bg-primary);
  }

  .feature-card {
    min-height: 12rem;
    padding: 1.15rem;
  }

  .feature-card span,
  .flow-item span {
    display: inline-block;
    margin-bottom: 1.2rem;
    color: var(--righello-pink, #D6487E);
    font-size: 0.9rem;
    font-weight: 900;
  }

  .feature-card h3,
  .flow-item h3 {
    margin: 0 0 0.5rem;
    font-size: 1.55rem;
    line-height: 1;
  }

  .demo-section {
    min-height: 120vh;
    display: grid;
    align-items: center;
    padding: 5rem 0;
    background:
      radial-gradient(circle at 78% 46%, rgba(6, 182, 212, 0.12), transparent 24rem),
      var(--bg-primary);
  }

  .demo-copy {
    max-width: 38rem;
  }

  .demo-stage {
    display: flex;
    justify-content: center;
  }

  .demo-phone {
    width: min(100%, 22rem);
  }

  .screenshot-rail {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(15.5rem, 72vw);
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 0.8rem;
    scrollbar-width: none;
  }

  .screenshot-rail::-webkit-scrollbar {
    display: none;
  }

  .screenshot-card {
    margin: 0;
    border: 1px solid var(--border-color);
    border-radius: 1.4rem;
    overflow: hidden;
    background: var(--bg-primary);
  }

  .screenshot-card img {
    display: block;
    width: 100%;
    aspect-ratio: 1290 / 2796;
    object-fit: cover;
  }

  .screenshot-card figcaption {
    padding: 0.75rem;
    color: var(--text-primary);
    font-weight: 800;
  }

  .flow-section {
    background: var(--bg-primary);
  }

  .flow-list {
    display: grid;
    gap: 0.9rem;
  }

  .flow-item {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    padding: 1.1rem;
  }

  .flow-item span {
    margin: 0;
  }

  .use-case-section {
    background:
      linear-gradient(135deg, rgba(214, 72, 126, 0.08), rgba(6, 182, 212, 0.08)),
      var(--bg-primary);
  }

  .use-case-card {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    padding: 1.1rem;
  }

  .product-seo-section,
  .faq-section {
    background: var(--bg-secondary);
  }

  .product-seo-grid {
    display: grid;
    gap: 1.2rem;
    align-items: stretch;
  }

  .product-seo-copy {
    max-width: 52rem;
  }

  .product-seo-copy h2 {
    margin: 0 0 1rem;
    font-size: clamp(2.25rem, 6vw, 4.7rem);
    line-height: 0.98;
    font-weight: 900;
  }

  .product-seo-copy p {
    color: var(--text-secondary);
    font-size: 1.05rem;
    line-height: 1.55;
  }

  .product-facts,
  .faq-card {
    border: 1px solid var(--border-color);
    border-radius: 1.3rem;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.018)),
      var(--bg-primary);
  }

  .product-facts {
    display: grid;
    gap: 0.75rem;
    padding: 1rem;
  }

  .product-facts div {
    display: grid;
    gap: 0.3rem;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 0.85rem;
    background: rgba(255, 255, 255, 0.035);
  }

  .product-facts span {
    color: var(--righello-pink, #D6487E);
    font-size: 0.78rem;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .product-facts strong {
    color: var(--text-primary);
    font-size: clamp(1.25rem, 4vw, 2rem);
    line-height: 1.05;
  }

  .product-facts a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.75rem 1rem;
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 800;
  }

  .faq-grid {
    display: grid;
    gap: 0.9rem;
  }

  .faq-card {
    padding: 1.05rem;
  }

  .faq-card h3 {
    margin: 0 0 0.6rem;
    color: var(--text-primary);
    font-size: clamp(1.25rem, 4vw, 1.75rem);
    line-height: 1.1;
  }

  .faq-card p {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.45;
  }

  .final-cta {
    padding: 4rem 0 5rem;
    background: var(--bg-secondary);
  }

  .final-cta__inner {
    max-width: 70rem;
    margin: 0 auto;
    padding: 1.4rem;
    text-align: center;
    background:
      radial-gradient(circle at 50% 0%, rgba(214, 72, 126, 0.18), transparent 30rem),
      var(--bg-primary);
  }

  .final-cta p:not(.product-kicker) {
    max-width: 42rem;
    margin: 0 auto 1.5rem;
  }

  .app-store-button--large {
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .buffr-hero {
      padding-top: 9rem;
      padding-bottom: 5rem;
    }

    .hero-grid {
      grid-template-columns: minmax(0, 1.1fr) minmax(20rem, 0.75fr);
    }

    .feature-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .demo-grid,
    .flow-grid,
    .use-case-grid,
    .product-seo-grid {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    }

    .faq-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .screenshot-rail {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-auto-flow: unset;
      grid-auto-columns: unset;
      overflow: visible;
    }

    .final-cta__inner {
      padding: 3rem;
    }
  }

  @media (max-width: 767px) {
    .hero-actions :global(.magnetic-button) {
      width: 100%;
    }

    .app-store-button {
      width: 100%;
      justify-content: center;
    }

    .demo-section {
      min-height: auto;
      padding: 3rem 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .phone-shell,
    .demo-phone {
      transform: none !important;
    }
  }
</style>
