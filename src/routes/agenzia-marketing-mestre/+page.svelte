<script lang="ts">
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';

  const services = [
    {
      title: 'Marketing & Social Media',
      description: 'Strategia editoriale, contenuti foto/video, community e campagne social per aziende a Mestre, Venezia e Veneto.',
    },
    {
      title: 'Advertising',
      description: 'Meta Ads, Google Ads, TikTok Ads, tracking e dashboard per capire quali campagne generano lead e vendite.',
    },
    {
      title: 'Siti Web & Software',
      description: 'Siti, landing page, e-commerce e web app veloci, tracciabili e costruiti per convertire il traffico locale.',
    },
    {
      title: 'Automazioni e Agenti AI',
      description: 'Workflow e agenti digitali collegati a CRM, email, documenti e processi interni per ridurre il lavoro ripetitivo.',
    },
  ];

  const proofPoints = [
    'Sede indicata a Mestre e operatività diretta tra Venezia, Veneto e Nord Italia',
    'Produzione contenuti, campagne e sviluppo nello stesso team',
    'Metriche chiare: lead, conversioni, ROAS, traffico e richieste commerciali',
    'Approccio operativo per PMI, hospitality, sport, retail e servizi B2B',
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
      answer: 'Righello ha sede indicata a Mestre e lavora con aziende a Mestre, Venezia e Veneto su marketing, advertising, siti web, software e automazioni. Il team segue progetti locali e nazionali con un approccio data-driven.',
    },
    {
      question: 'Lavorate anche con aziende fuori da Mestre?',
      answer: 'Sì. Gestiamo progetti per aziende a Venezia, in Veneto e nel Nord Italia, con incontri da remoto e sessioni operative sul territorio quando servono contenuti, shooting o workshop.',
    },
    {
      question: 'Che cosa include un progetto di marketing locale?',
      answer: 'Di solito partiamo da audit, posizionamento, tracking e piano di crescita. Poi attiviamo contenuti, campagne advertising, sito o landing page e reportistica per misurare richieste, lead e vendite.',
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
      <h1>Agenzia marketing a Mestre per aziende che vogliono crescere</h1>
      <p class="hero-copy">
        Righello unisce marketing, advertising, sviluppo web e automazioni AI per costruire sistemi di crescita misurabili.
        Lavoriamo con aziende di Mestre, Venezia e Veneto che vogliono trasformare contenuti, campagne e sito in richieste concrete.
      </p>
      <div class="hero-actions">
        <MagneticButton href="/contatti" variant="primary">Parliamone</MagneticButton>
        <MagneticButton href="/servizi" variant="secondary">Guarda i servizi</MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="local-section local-section-alt">
  <div class="section-container split">
    <RevealOnScroll animation="fly-up">
      <div>
        <p class="eyebrow">Perché Righello</p>
        <h2>Un team unico per strategia, contenuti, campagne e tecnologia</h2>
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
        <h2>Servizi per aziende a Mestre</h2>
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
        <h2>Marketing per Mestre, Venezia e Veneto</h2>
        <p class="body-copy">
          La ricerca "agenzia marketing Mestre" premia rilevanza, vicinanza e autorevolezza.
          Per questo la pagina racconta chiaramente cosa facciamo sul territorio, partendo dalla sede indicata a Mestre e dalle aziende del Veneto.
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
        <h2>Vuoi posizionarti meglio a Mestre?</h2>
        <p>
          Analizziamo sito, Google Business Profile, contenuti, tracking e competitor locali.
          Poi definiamo le priorità per aumentare visibilità, lead e richieste commerciali.
        </p>
        <MagneticButton href="/contatti" variant="primary">Richiedi una consulenza</MagneticButton>
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
