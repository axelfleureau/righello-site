<script lang="ts">
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';

  const services = [
    {
      title: 'Marketing & Social Media',
      description: 'Contenuti, social e direzione editoriale per non confondersi nel rumore digitale tra Mestre, Venezia e Veneto.',
    },
    {
      title: 'Advertising',
      description: 'Meta Ads, Google Ads, TikTok Ads e tracking: meno budget bruciato, piu\' segnali leggibili.',
    },
    {
      title: 'Siti Web & Software',
      description: 'Siti, landing, e-commerce e strumenti su misura che trasformano attenzione locale in richieste concrete.',
    },
    {
      title: 'Automazioni e Agenti AI',
      description: 'Workflow e agenti digitali collegati a CRM, email e documenti per liberare tempo dove oggi si perde energia.',
    },
  ];

  const proofPoints = [
    'Sede indicata a Mestre e operativita\' diretta tra Venezia, Veneto e Nord Italia.',
    'Strategia, produzione, campagne e sviluppo nello stesso tavolo: meno passaggi, piu\' controllo.',
    'Misuriamo lead, conversioni, ROAS e richieste commerciali senza perdere il lato umano del brand.',
    'Lavoriamo per PMI, hospitality, sport, retail e servizi B2B che vogliono sembrare vivi, non compilati.',
  ];

  const homeFunnelLinks = [
    {
      href: '/#risultati',
      number: '01',
      title: 'Numeri prima delle promesse',
      description: 'Parti dai risultati: cosa misuriamo, perche\' lo misuriamo e dove vogliamo arrivare.',
    },
    {
      href: '/#servizi',
      number: '02',
      title: 'Il sistema completo',
      description: 'Marketing, advertising, web, software e AI nello stesso flusso operativo.',
    },
    {
      href: '/#testimonial',
      number: '03',
      title: 'Righello in movimento',
      description: 'Guarda video, casi e clienti: la parte che una landing locale non puo\' raccontare da sola.',
    },
  ];

  const localAreas = [
    'Mestre',
    'Venezia',
    'Marghera',
    'Mogliano Veneto',
    'Spinea',
    'Mirano',
    'Treviso',
    'Veneto',
  ];

  const faqs = [
    {
      question: 'Righello è una agenzia marketing di Mestre?',
      answer: 'Righello ha sede indicata a Mestre e lavora con aziende a Mestre, Venezia e Veneto su marketing, advertising, siti web, software e automazioni. Il team unisce strategia, contenuti, campagne e tecnologia in un processo unico.',
    },
    {
      question: 'Lavorate anche con aziende fuori da Mestre?',
      answer: 'Si. Gestiamo progetti per aziende a Venezia, in Veneto e nel Nord Italia, con incontri da remoto e sessioni operative sul territorio quando servono contenuti, shooting o workshop.',
    },
    {
      question: 'Che cosa include un progetto di marketing locale?',
      answer: 'Di solito partiamo da audit, posizionamento, tracking e piano di crescita. Poi costruiamo contenuti, campagne, sito o landing page e reportistica: il marketing locale deve farsi trovare, ma soprattutto scegliere.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.wearerighello.com/agenzia-marketing-mestre#service',
        name: 'Agenzia marketing a Mestre',
        serviceType: 'Marketing, advertising, sviluppo web e automazioni',
        provider: {
          '@type': 'LocalBusiness',
          '@id': 'https://www.wearerighello.com/#localbusiness',
          name: 'Righello S.r.l.',
          url: 'https://www.wearerighello.com',
          email: 'hello@wearerighello.com',
          image: 'https://www.wearerighello.com/og.png',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via Pio X 21',
            addressLocality: 'Mestre',
            addressRegion: 'Venezia',
            addressCountry: 'IT',
          },
        },
        areaServed: [
          { '@type': 'City', name: 'Mestre' },
          { '@type': 'City', name: 'Venezia' },
          { '@type': 'City', name: 'Marghera' },
          { '@type': 'City', name: 'Treviso' },
          { '@type': 'AdministrativeArea', name: 'Veneto' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servizi marketing e sviluppo per aziende a Mestre',
          itemListElement: services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.description,
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.wearerighello.com/agenzia-marketing-mestre#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.wearerighello.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Agenzia marketing Mestre',
            item: 'https://www.wearerighello.com/agenzia-marketing-mestre',
          },
        ],
      },
    ],
  };
</script>

<svelte:head>
  <title>Agenzia Marketing Mestre | Righello - Web, Advertising e AI</title>
  <meta
    name="description"
    content="Agenzia marketing a Mestre: social media, advertising, siti web, software e automazioni AI per aziende a Venezia, Mestre e Veneto."
  />
  <link rel="canonical" href="https://www.wearerighello.com/agenzia-marketing-mestre" />
  <meta property="og:title" content="Agenzia Marketing Mestre | Righello" />
  <meta
    property="og:description"
    content="Marketing, advertising, siti web e automazioni per aziende a Mestre, Venezia e Veneto."
  />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/agenzia-marketing-mestre" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Agenzia Marketing Mestre | Righello" />
  <meta
    name="twitter:description"
    content="Strategia, contenuti, campagne, siti web e automazioni per aziende a Mestre e Venezia."
  />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=3" />
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<section class="local-hero">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <p class="eyebrow">Mestre, Venezia e Veneto</p>
      <h1>Agenzia marketing a Mestre, senza fare rumore a vuoto.</h1>
      <p class="hero-copy">
        A Mestre non serve un'altra pagina che promette "comunicazione a 360 gradi". Serve un sistema che tiene insieme
        strategia, contenuti, advertising, sito e automazioni: riconoscibile, misurabile, difficile da ignorare.
      </p>
      <div class="hero-actions">
        <MagneticButton href="/contatti" variant="primary">Parliamone</MagneticButton>
        <MagneticButton href="/" variant="secondary">Entra nella home</MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="home-funnel">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="home-funnel-head">
        <p class="eyebrow">La pagina giusta e' la home</p>
        <h2>Questa pagina ti ha trovato. La home ti fa capire se siamo quelli giusti.</h2>
        <p>
          Qui confermiamo una cosa semplice: lavoriamo da Mestre, Venezia e Veneto.
          Ma la vera identita' Righello vive nella home, con ritmo, casi, video, metodo e tutto il sistema in movimento.
        </p>
        <MagneticButton href="/" variant="primary">Guarda Righello davvero</MagneticButton>
      </div>
    </RevealOnScroll>

    <div class="funnel-grid">
      {#each homeFunnelLinks as link}
        <RevealOnScroll animation="fly-up">
          <a href={link.href} class="funnel-card">
            <span>{link.number}</span>
            <h3>{link.title}</h3>
            <p>{link.description}</p>
          </a>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="local-section local-section-alt">
  <div class="section-container split">
    <RevealOnScroll animation="fly-up">
      <div>
        <p class="eyebrow">Perché Righello</p>
        <h2>Non facciamo presenza digitale. Facciamo sistemi che meritano attenzione.</h2>
      </div>
    </RevealOnScroll>
    <RevealOnScroll animation="fly-up" delay={120}>
      <div class="proof-list">
        {#each proofPoints as point}
          <div class="proof-item">
            <span aria-hidden="true">✓</span>
            <p>{point}</p>
          </div>
        {/each}
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="local-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-heading">
        <p class="eyebrow">Cosa facciamo</p>
        <h2>Leve diverse, una direzione sola.</h2>
      </div>
    </RevealOnScroll>

    <div class="service-grid">
      {#each services as service}
        <RevealOnScroll animation="fly-up">
          <article class="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="local-section local-section-alt">
  <div class="section-container split">
    <RevealOnScroll animation="fly-up">
      <div>
        <p class="eyebrow">Copertura locale</p>
        <h2>Mestre e Venezia sono il punto di partenza, non il limite.</h2>
        <p class="body-copy">
          La ricerca "agenzia marketing Mestre" deve trovare una risposta precisa, ma non una pagina senz'anima.
          Qui teniamo insieme rilevanza locale, identita' Righello e una promessa semplice: meno comunicazione decorativa,
          piu' lavoro che porta da qualche parte.
        </p>
      </div>
    </RevealOnScroll>
    <RevealOnScroll animation="fly-up" delay={120}>
      <div class="area-tags" aria-label="Aree servite">
        {#each localAreas as area}
          <span>{area}</span>
        {/each}
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="local-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-heading">
        <p class="eyebrow">Domande frequenti</p>
        <h2>Prima di iniziare</h2>
      </div>
    </RevealOnScroll>

    <div class="faq-list">
      {#each faqs as faq}
        <RevealOnScroll animation="fly-up">
          <article class="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<section class="local-cta">
  <div class="section-container">
    <RevealOnScroll animation="scale">
      <div class="cta-panel">
        <p class="eyebrow">Audit gratuito</p>
        <h2>Vuoi essere trovato a Mestre e ricordato dopo il primo click?</h2>
        <p>
          Guardiamo sito, contenuti, Google Business Profile, tracking e competitor locali.
          Poi decidiamo cosa va sistemato prima: visibilita', messaggio o conversione.
        </p>
        <MagneticButton href="/contatti" variant="primary">Mettiamo ordine</MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .local-hero {
    padding: 10rem 0 5rem;
    background:
      radial-gradient(circle at 20% 20%, rgba(214, 72, 126, 0.22), transparent 32rem),
      radial-gradient(circle at 80% 10%, rgba(6, 182, 212, 0.18), transparent 28rem),
      var(--bg-primary);
  }

  .local-hero h1 {
    max-width: 880px;
    margin: 0 0 1.5rem;
    color: var(--text-primary);
    font-size: clamp(2.6rem, 8vw, 5.4rem);
    font-weight: 800;
    line-height: 0.98;
  }

  .hero-copy,
  .body-copy {
    max-width: 720px;
    color: var(--text-secondary);
    font-size: clamp(1.05rem, 2vw, 1.3rem);
    line-height: 1.65;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
  }

  .home-funnel,
  .local-section {
    padding: 5rem 0;
    background: var(--bg-primary);
  }

  .home-funnel {
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    background:
      radial-gradient(circle at 15% 20%, rgba(214, 72, 126, 0.18), transparent 28rem),
      radial-gradient(circle at 85% 40%, rgba(255, 255, 255, 0.08), transparent 22rem),
      var(--bg-primary);
  }

  .home-funnel-head {
    display: grid;
    max-width: 920px;
    gap: 1.35rem;
  }

  .home-funnel-head h2 {
    max-width: 900px;
  }

  .home-funnel-head p {
    max-width: 760px;
    color: var(--text-secondary);
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.65;
  }

  .funnel-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 2rem;
    min-width: 0;
  }

  .funnel-card {
    display: grid;
    min-height: 15rem;
    align-content: start;
    gap: 0.85rem;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.04);
    color: inherit;
    text-decoration: none;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
  }

  .funnel-card:hover {
    transform: translateY(-4px);
    border-color: rgba(214, 72, 126, 0.55);
    background: rgba(214, 72, 126, 0.1);
  }

  .funnel-card span {
    color: #D6487E;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.14em;
  }

  .funnel-card h3 {
    color: var(--text-primary);
    font-size: 1.3rem;
    font-weight: 800;
    line-height: 1.15;
  }

  .funnel-card p {
    color: var(--text-secondary);
    line-height: 1.55;
  }

  .local-section-alt {
    background: var(--bg-secondary);
  }

  .eyebrow {
    margin-bottom: 0.85rem;
    color: #D6487E;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h2 {
    max-width: 760px;
    color: var(--text-primary);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.05;
  }

  .section-heading {
    margin-bottom: 2rem;
  }

  .split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
    min-width: 0;
  }

  .proof-list,
  .faq-list {
    display: grid;
    gap: 1rem;
  }

  .proof-item {
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 0.75rem;
    align-items: start;
    color: var(--text-secondary);
    font-size: 1.05rem;
    line-height: 1.55;
  }

  .proof-item span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: rgba(214, 72, 126, 0.14);
    color: #D6487E;
    font-weight: 800;
  }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    min-width: 0;
  }

  .service-card,
  .faq-item,
  .cta-panel {
    border: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.035);
  }

  .service-card {
    min-height: 15rem;
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .service-card h3,
  .faq-item h3 {
    margin-bottom: 0.75rem;
    color: var(--text-primary);
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .service-card p,
  .faq-item p,
  .cta-panel p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
  }

  .area-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .area-tags span {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.45rem 1rem;
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.04);
    font-weight: 600;
  }

  .faq-item {
    border-radius: 1rem;
    padding: 1.5rem;
  }

  .local-cta {
    padding: 5rem 0 6rem;
    background: var(--bg-secondary);
  }

  .cta-panel {
    max-width: 900px;
    margin: 0 auto;
    border-radius: 1.25rem;
    padding: clamp(2rem, 5vw, 3.5rem);
    text-align: center;
    min-width: 0;
  }

  .cta-panel h2 {
    margin: 0 auto 1rem;
  }

  .cta-panel p {
    max-width: 680px;
    margin: 0 auto 2rem;
  }

  @media (max-width: 1024px) {
    .service-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    .local-hero {
      padding: 8rem 0 4rem;
    }

    .home-funnel,
    .local-section,
    .local-cta {
      padding: 4rem 0;
    }

    .split,
    .funnel-grid,
    .service-grid {
      grid-template-columns: 1fr;
    }

    .funnel-card {
      min-height: auto;
    }

    .service-card {
      min-height: auto;
    }

    .cta-panel :global(.magnetic-button) {
      width: 100%;
      min-height: 56px;
    }
  }
</style>
