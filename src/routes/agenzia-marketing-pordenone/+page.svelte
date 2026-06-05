<script lang="ts">
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';

  const services = [
    {
      title: 'Marketing & Social Media',
      description: 'Contenuti, social e direzione editoriale per non sembrare l\'ennesima azienda con il feed acceso e il mercato spento.',
    },
    {
      title: 'Advertising',
      description: 'Meta Ads, Google Ads, TikTok Ads e tracking: meno "speriamo funzioni", piu\' numeri leggibili.',
    },
    {
      title: 'Siti Web & Software',
      description: 'Siti, landing, e-commerce e strumenti su misura che non fanno solo presenza: fanno strada alle richieste.',
    },
    {
      title: 'Automazioni e Agenti AI',
      description: 'Workflow e agenti digitali collegati a CRM, email e documenti per togliere lavoro ripetitivo dal tavolo.',
    },
  ];

  const proofPoints = [
    'Strategia, produzione, campagne e sviluppo nello stesso tavolo: niente scaricabarile tra reparti.',
    'Partiamo dai numeri, ma non parliamo come un foglio Excel in giacca.',
    'Ogni contenuto deve sapere dove sta andando: attenzione, fiducia, richiesta, vendita.',
    'Il territorio conta, ma non basta: serve un sistema digitale che si faccia ricordare.',
  ];

  const localAreas = [
    'Pordenone',
    'Cordenons',
    'Porcia',
    'Sacile',
    'Spilimbergo',
    'San Vito al Tagliamento',
    'Maniago',
    'Friuli-Venezia Giulia',
  ];

  const faqs = [
    {
      question: 'Righello è una agenzia marketing di Pordenone?',
      answer: 'Righello lavora con aziende a Pordenone e in Friuli-Venezia Giulia su marketing, advertising, siti web, software e automazioni. Siamo un partner operativo: strategia, contenuti, campagne e tecnologia nello stesso processo.',
    },
    {
      question: 'Lavorate anche con aziende fuori dal centro di Pordenone?',
      answer: 'Si. Gestiamo progetti in tutta la provincia di Pordenone e nel Nord Italia, con incontri da remoto e sessioni operative sul territorio quando servono shooting, workshop o contenuti.',
    },
    {
      question: 'Che cosa include un progetto di marketing locale?',
      answer: 'Di solito partiamo da audit, posizionamento, tracking e piano di crescita. Poi mettiamo in fila contenuti, campagne, sito o landing page e reportistica: il marketing locale deve essere riconoscibile, non solo geolocalizzato.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.wearerighello.com/agenzia-marketing-pordenone#service',
        name: 'Agenzia marketing a Pordenone',
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
          { '@type': 'City', name: 'Pordenone' },
          { '@type': 'AdministrativeArea', name: 'Provincia di Pordenone' },
          { '@type': 'AdministrativeArea', name: 'Friuli-Venezia Giulia' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servizi marketing e sviluppo per aziende a Pordenone',
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
        '@id': 'https://www.wearerighello.com/agenzia-marketing-pordenone#breadcrumb',
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
            name: 'Agenzia marketing Pordenone',
            item: 'https://www.wearerighello.com/agenzia-marketing-pordenone',
          },
        ],
      },
    ],
  };
</script>

<svelte:head>
  <title>Agenzia Marketing Pordenone | Righello - Web, Advertising e AI</title>
  <meta
    name="description"
    content="Agenzia marketing a Pordenone: social media, advertising, siti web, software e automazioni AI per aziende in Friuli-Venezia Giulia."
  />
  <link rel="canonical" href="https://www.wearerighello.com/agenzia-marketing-pordenone" />
  <meta property="og:title" content="Agenzia Marketing Pordenone | Righello" />
  <meta
    property="og:description"
    content="Marketing, advertising, siti web e automazioni per aziende a Pordenone e in Friuli-Venezia Giulia."
  />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/agenzia-marketing-pordenone" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Agenzia Marketing Pordenone | Righello" />
  <meta
    name="twitter:description"
    content="Strategia, contenuti, campagne, siti web e automazioni per aziende a Pordenone."
  />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=3" />
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<section class="local-hero">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <p class="eyebrow">Pordenone, provincia e Friuli-Venezia Giulia</p>
      <h1>Agenzia marketing a Pordenone, ma senza la solita agenzia.</h1>
      <p class="hero-copy">
        Se il tuo marketing non si fa notare, non e' colpa di Pordenone. Righello costruisce sistemi digitali
        che mettono in fila strategia, contenuti, advertising, sito e automazioni: meno rumore, piu' direzione.
      </p>
      <div class="hero-actions">
        <MagneticButton href="/contatti" variant="primary">Parliamone</MagneticButton>
        <MagneticButton href="/servizi" variant="secondary">Vedi cosa facciamo</MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="local-section local-section-alt">
  <div class="section-container split">
    <RevealOnScroll animation="fly-up">
      <div>
        <p class="eyebrow">Perché Righello</p>
        <h2>Non vendiamo post. Costruiamo sistemi che tengono insieme attenzione e fatturato.</h2>
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
        <h2>Le leve giuste, nella sequenza giusta.</h2>
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
        <h2>Locali quando serve. Ambiziosi sempre.</h2>
        <p class="body-copy">
          La ricerca "agenzia marketing Pordenone" deve trovare una risposta chiara, ma la pagina non deve sembrare
          scritta per un motore di ricerca. Raccontiamo dove operiamo, cosa facciamo e perche' un'azienda dovrebbe
          ricordarsi di Righello dopo dieci risultati tutti uguali.
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
        <h2>Vuoi essere trovato a Pordenone e scelto per un motivo?</h2>
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

  .local-section {
    padding: 5rem 0;
    background: var(--bg-primary);
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

    .local-section,
    .local-cta {
      padding: 4rem 0;
    }

    .split,
    .service-grid {
      grid-template-columns: 1fr;
    }

    .service-card {
      min-height: auto;
    }
  }
</style>
