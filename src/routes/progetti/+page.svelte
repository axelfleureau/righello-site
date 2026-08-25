<script lang="ts">
  import { onMount } from 'svelte';
  import { clients } from '$lib/data/projects';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import PhotoSpotlightShowcase from '$lib/components/PhotoSpotlightShowcase.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';

  type FeaturedProject = {
    name: string;
    eyebrow: string;
    title: string;
    text: string;
    href: string;
    image: string;
    imagePosition?: string;
    chips: string[];
  };

  type CaseStudy = {
    id: string;
    name: string;
    sector: string;
    category: string;
    headline: string;
    text: string;
    focus: string[];
    href?: string;
    logo?: string;
    image: string;
    imagePosition?: string;
  };

  const heroStats = [
    { value: '50+', label: 'brand e aziende seguite' },
    { value: '3', label: 'aree integrate: sito, contenuti, tecnologia' },
    { value: '1', label: 'obiettivo: farti scegliere meglio' },
  ];

  const featuredProjects: FeaturedProject[] = [
    {
      name: 'BUFFR',
      eyebrow: 'Prodotto iOS',
      title: 'Replay istantanei dal tuo iPhone.',
      text:
        'Una camera buffer per sport, live event e creator: registra in continuo e salva gli ultimi secondi quando succede l’azione.',
      href: '/buffr',
      image: '/products/buffr/replay-in-un-tap.jpg',
      imagePosition: 'center top',
      chips: ['App iOS', 'UX prodotto', 'Mobile', 'Brand'],
    },
    {
      name: 'Lumis',
      eyebrow: 'Web app proprietaria',
      title: 'Gallery eventi pensate per lavorare, non solo per mostrare foto.',
      text:
        'Un prodotto per organizzare, pubblicare e condividere raccolte fotografiche in modo pulito, veloce e riconoscibile.',
      href: 'https://lumis.wearerighello.com',
      image: '/projects/cards/lumis-card.jpg',
      imagePosition: 'center top',
      chips: ['SaaS', 'Frontend', 'Dashboard', 'Media'],
    },
    {
      name: 'Neura',
      eyebrow: 'Esperienza digitale',
      title: 'Un prodotto complesso reso più leggibile.',
      text:
        'Architettura informativa, interfaccia e copy per spiegare valore, funzione e prossima azione senza appesantire il percorso.',
      href: 'https://neura.wearerighello.com',
      image: '/projects/cards/neura-card.jpg',
      imagePosition: 'left top',
      chips: ['UX/UI', 'Copy', 'Frontend', 'Posizionamento'],
    },
  ];

  const pillars = [
    {
      title: 'Siti che chiariscono l’offerta',
      text:
        'Struttura, copy, SEO e interfaccia devono far capire subito cosa fai, perché sei diverso e quale azione compiere.',
    },
    {
      title: 'Contenuti che diventano asset',
      text:
        'Foto, video, reel e materiali social vengono progettati per essere riusati su campagne, sito, sales deck e comunicazione interna.',
    },
    {
      title: 'Software che toglie lavoro manuale',
      text:
        'App, dashboard e automazioni devono ridurre passaggi ripetitivi, errori e tempi morti. Non aggiungere complessità.',
    },
  ];

  const categories = [
    { id: 'all', label: 'Tutti' },
    { id: 'digital', label: 'Digital product' },
    { id: 'web', label: 'Siti web' },
    { id: 'content', label: 'Foto e video' },
    { id: 'marketing', label: 'Marketing' },
  ];

  const fiumedicaThumbnail =
    'https://res.cloudinary.com/dcqqiy7ok/video/upload/c_fill,q_auto,so_0,w_800/v1781002731/righello/testimonials/fiumedica-massimo-fausti.jpg';

  const caseStudies: CaseStudy[] = [
    {
      id: 'buffr',
      name: 'BUFFR',
      sector: 'Prodotto iOS',
      category: 'digital',
      headline: 'Da idea verticale a pagina prodotto e app pronta per App Store.',
      text:
        'Una videocamera buffer per creator e team sul campo, raccontata con una comunicazione chiara: cosa fa, quando serve e perché riduce il rischio di perdere il momento giusto.',
      focus: ['UX mobile', 'Pagina prodotto', 'App Store', 'Video demo'],
      href: '/buffr',
      logo: '/logo-icon.png',
      image: '/products/buffr/replay-in-un-tap.jpg',
      imagePosition: 'center top',
    },
    {
      id: 'lumis',
      name: 'Lumis',
      sector: 'Web app e media workflow',
      category: 'digital',
      headline: 'Un sistema per pubblicare gallery ordinate, brandizzate e condivisibili.',
      text:
        'Lumis trasforma raccolte foto ed eventi in un’esperienza più pulita rispetto ai link generici: più controllo, più ordine, più valore percepito.',
      focus: ['Web app', 'Gallery eventi', 'UX dashboard', 'Media delivery'],
      href: 'https://lumis.wearerighello.com',
      image: '/projects/cards/lumis-card.jpg',
    },
    {
      id: 'reguta',
      name: 'Reguta 1928',
      sector: 'Wine & lifestyle',
      category: 'marketing',
      headline: 'Heritage, territorio e persone trasformati in racconto commerciale.',
      text:
        'Per un brand storico il punto non è pubblicare di più: è costruire un’immagine coerente tra contenuti, posizionamento e materiali che supportano vendita, hospitality ed export.',
      focus: ['Storytelling', 'Contenuti', 'Campagne', 'Posizionamento'],
      href: 'https://www.instagram.com/reguta.1928/',
      logo: '/logos/reguta.png',
      image: '/thumbnails/thumb-f89791b0c4c7.jpg',
    },
    {
      id: 'elite-hotel-spa',
      name: 'Elite Hotel & Spa',
      sector: 'Hospitality',
      category: 'content',
      headline: 'Produzioni visuali per aumentare desiderabilità e fiducia prima della prenotazione.',
      text:
        'Nel turismo ogni immagine lavora sulla percezione. Abbiamo costruito materiali capaci di raccontare camere, atmosfera, servizi e qualità dell’esperienza.',
      focus: ['Shooting', 'Video', 'Advertising asset', 'Hospitality'],
      href: 'https://www.instagram.com/elitehotelandspa/',
      logo: '/logos/hotel-elite.png',
      image: '/thumbnails/thumb-ca926bab868e.jpg',
    },
    {
      id: 'fiumedica',
      name: 'Fiumedica',
      sector: 'Medical & healthcare',
      category: 'web',
      headline: 'Comunicazione più chiara per rendere l’expertise comprensibile prima del contatto.',
      text:
        'Quando il tema è sanitario, design e contenuti devono abbassare l’attrito: spiegare, rassicurare e guidare il paziente verso il passo successivo.',
      focus: ['Sito', 'Copy chiaro', 'Fiducia', 'Percorso utente'],
      image: fiumedicaThumbnail,
      imagePosition: 'center center',
    },
    {
      id: 'portopiccolo-apartments',
      name: 'Portopiccolo Apartments',
      sector: 'Short-term rental & Hospitality',
      category: 'web',
      headline: 'Un booking engine collegato in tempo reale al calendario Guesty, non un sito vetrina.',
      text:
        'Trentatré appartamenti nel borgo di Portopiccolo: prezzo "da" calcolato sul primo soggiorno davvero prenotabile — non sulla tariffa bassa stagione — e prenotazione diretta senza passare dal telefono o dal gestionale.',
      focus: ['Booking engine', 'Integrazione Guesty', 'Pricing dinamico', 'UX prenotazione'],
      href: 'https://www.portopiccoloapartments.com',
      image: '/thumbnails/thumb-portopiccolo-apartments.jpg',
    },
    {
      id: 'riviera-resort',
      name: 'Riviera Resort',
      sector: 'Hospitality',
      category: 'content',
      headline: 'Atmosfera, spazi e dettagli organizzati in asset pronti per campagne e canali digitali.',
      text:
        'Una produzione efficace non finisce nello shooting: deve generare immagini e video riutilizzabili, coerenti e facili da attivare su più canali.',
      focus: ['Video production', 'Foto', 'Social asset', 'Paid media'],
      href: 'https://www.instagram.com/rivieraresorthotel/',
      logo: '/logos/riviera-resort.png',
      image: '/thumbnails/thumb-8424e05df0ca.jpg',
    },
  ];

  const productionLinks = [
    {
      label: 'Tomasella',
      description: 'Gallery visuale per valutare ritmo, selezione e qualità dei materiali prodotti.',
      href: 'https://lumis.wearerighello.com/gallery?tenant=righello&event=tomasella',
    },
    {
      label: 'Play x Noiclub',
      description: 'Raccolta evento separata, utile per capire gestione e pubblicazione di contenuti live.',
      href: 'https://lumis.wearerighello.com/gallery?tenant=righello&event=play-x-noiclub',
    },
    {
      label: 'Appartamento Ernesto Sanato',
      description: 'Esempio real estate/interior con focus su spazio, atmosfera e dettagli.',
      href: 'https://lumis.wearerighello.com/gallery?tenant=righello&event=Appartament-Ernesto',
    },
  ];

  const productionSpotlightImages = [
    {
      src: '/thumbnails/thumb-18c674dd5ccb.jpg',
      alt: 'Riprese aeree per racconto immobiliare e territoriale',
      label: 'Real estate',
    },
    {
      src: '/thumbnails/thumb-8424e05df0ca.jpg',
      alt: 'Produzione Riviera Resort',
      label: 'Riviera Resort',
    },
    {
      src: '/thumbnails/thumb-f89791b0c4c7.jpg',
      alt: 'Produzione Reguta 1928',
      label: 'Reguta',
    },
    {
      src: '/thumbnails/thumb-0ff41fc20196.jpg',
      alt: 'Contenuti social per 3R Technology',
      label: '3R Technology',
    },
    {
      src: '/projects/cards/lumis-card.jpg',
      alt: 'Gallery Lumis',
      label: 'Lumis',
      position: 'center top',
    },
    {
      src: '/thumbnails/thumb-cd759b2f2273.jpg',
      alt: 'Produzione visuale per industria e territorio',
      label: 'Industria',
    },
    {
      src: '/thumbnails/thumb-6322be15ebae.jpg',
      alt: 'Riprese aeree per materiali commerciali',
      label: 'Advertising asset',
    },
    {
      src: '/thumbnails/thumb-d21d67febb70.jpg',
      alt: 'Racconto visuale per brand e social',
      label: 'Content',
    },
    {
      src: '/thumbnails/thumb-fe97a7333488.jpg',
      alt: 'Gallery evento pubblicata con Lumis',
      label: 'Evento',
    },
  ];

  const selectedClientLogos = clients
    .filter((client) => client.logo)
    .filter((client) =>
      [
        'Ricci Group',
        'Reguta',
        'Riviera Resort Hotel',
        '3R Technology',
        'Neura',
        'Barcolana',
        'Quellenhof',
        'VIP Motors',
        'Zanutta',
        'G&M Ambiente',
        'Comune di Pordenone',
        'Tomasella',
        'Hotel Elite',
        'La Busa del Sauc',
        'Noiclub',
        'Finestre Art',
      ].includes(client.name)
    );

  let selectedCategory = 'all';

  $: filteredCaseStudies =
    selectedCategory === 'all'
      ? caseStudies
      : caseStudies.filter((study) => study.category === selectedCategory);

  const schema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Case study e progetti Righello',
      description:
        'Case study, prodotti digitali, siti web, produzioni video e software custom realizzati da Righello S.r.l.',
      url: 'https://www.wearerighello.com/progetti',
      inLanguage: 'it-IT',
      publisher: {
        '@type': 'Organization',
        name: 'Righello S.r.l.',
        url: 'https://www.wearerighello.com',
        logo: 'https://www.wearerighello.com/logo-icon.png',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Progetti in evidenza Righello',
      itemListElement: featuredProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.name,
        url: project.href.startsWith('http')
          ? project.href
          : `https://www.wearerighello.com${project.href}`,
      })),
    },
  ]);

  const schemaMarkup = `<script type="application/ld+json">${schema.replace(/</g, '\\u003c')}<\/script>`;

  onMount(() => {
    if (window.location.hash) return;

    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => {
      history.scrollRestoration = previousScrollRestoration;
    };
  });
</script>

<svelte:head>
  <title>Case Study e Prodotti Digitali Righello | Siti Web, App e Software</title>
  <meta
    name="description"
    content="Case study Righello: BUFFR, Lumis, siti web, produzioni video, campagne marketing e software custom per aziende che vogliono vendere e comunicare meglio."
  />
  <link rel="canonical" href="https://www.wearerighello.com/progetti" />
  <meta property="og:title" content="Case Study e Prodotti Digitali | Righello" />
  <meta
    property="og:description"
    content="Progetti reali Righello: app, web app, siti, contenuti, campagne e software custom costruiti per aziende e brand."
  />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/progetti" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Case Study e Prodotti Digitali | Righello" />
  <meta
    name="twitter:description"
    content="BUFFR, Lumis, siti web, contenuti, campagne e software custom realizzati da Righello."
  />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=3" />
  <link rel="preload" as="image" href="/products/buffr/replay-in-un-tap.jpg" fetchpriority="high" />
  {@html schemaMarkup}
</svelte:head>

<section class="projects-hero">
  <div class="section-container hero-grid">
    <div class="hero-copy">
      <p class="section-subtitle">Case study e prodotti digitali Righello</p>
      <h1 class="heading-xl hero-title">Lavori reali per aziende che vogliono farsi scegliere meglio.</h1>
      <p class="hero-intro">
        Non una vetrina di “lavoretti”. Qui trovi prodotti, siti, contenuti e sistemi costruiti per rendere più chiara
        l’offerta, aumentare fiducia e dare al team strumenti utili per vendere.
      </p>
      <div class="hero-actions">
        <MagneticButton href="/contatti" variant="primary">Parliamo del tuo progetto</MagneticButton>
        <MagneticButton href="#case-study" variant="secondary">Guarda i casi studio</MagneticButton>
      </div>
    </div>

    <aside class="hero-proof" aria-label="Sintesi del metodo Righello">
      <div class="proof-kicker">
        <span>Cosa valutare</span>
        <strong>Portfolio operativo</strong>
      </div>
      <div class="proof-axis" aria-hidden="true">
        <span>Brand</span>
        <span>Contenuti</span>
        <span>Tecnologia</span>
      </div>
      <div class="proof-list">
        <p><span>01</span> La prima impressione deve spiegare valore, qualità e affidabilità.</p>
        <p><span>02</span> Foto, video e pagine devono diventare materiali che il team usa davvero.</p>
        <p><span>03</span> Sito, campagne e software devono ridurre confusione, non aggiungerla.</p>
      </div>
    </aside>
  </div>

  <div class="section-container hero-stats" aria-label="Numeri sintetici Righello">
    {#each heroStats as stat}
      <div>
        <strong>{stat.value}</strong>
        <span>{stat.label}</span>
      </div>
    {/each}
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section class="client-proof-section">
  <div class="section-container client-proof-grid">
    <div class="client-proof-copy">
      <p class="section-subtitle">Proof of work</p>
      <h2>Brand, aziende ed enti che ci hanno già messo alla prova.</h2>
    </div>
    <div class="client-logo-grid" aria-label="Loghi clienti Righello">
      {#each selectedClientLogos as client}
        <div class="client-logo-tile" title={client.name}>
          {#if client.logo}
            <img
              src={client.logo}
              alt={client.name}
              loading="lazy"
              decoding="async"
              class:no-filter={client.noFilter && !client.lightSurface}
              class:logo-lift={client.lightSurface}
            />
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<section class="section-padding featured-section">
  <div class="section-container">
    <div class="section-heading">
      <p class="section-subtitle">In evidenza</p>
      <h2 class="section-title">Prodotti e sistemi che raccontano come lavora Righello.</h2>
      <p>
        La parte bella deve servire alla parte utile: far capire più velocemente, generare fiducia, portare l’utente al
        prossimo passo.
      </p>
    </div>

    <div class="featured-grid">
      {#each featuredProjects as project}
        <a
          class="featured-card"
          href={project.href}
          target={project.href.startsWith('http') ? '_blank' : undefined}
          rel={project.href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={`Apri ${project.name}`}
        >
          <img
            src={project.image}
            alt=""
            loading={project.name === 'BUFFR' ? 'eager' : 'lazy'}
            decoding="async"
            style={`object-position: ${project.imagePosition || 'center center'};`}
            aria-hidden="true"
          />
          <span class="featured-card__shade" aria-hidden="true"></span>
          <span class="featured-card__arrow" aria-hidden="true">{project.href.startsWith('http') ? '↗' : '→'}</span>
          <div class="featured-card__content">
            <p>{project.eyebrow}</p>
            <h3>{project.name}</h3>
            <strong>{project.title}</strong>
            <span>{project.text}</span>
            <div class="chip-row">
              {#each project.chips as chip}
                <em>{chip}</em>
              {/each}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding system-section">
  <div class="section-container system-layout">
    <div class="system-copy">
      <p class="section-subtitle">Metodo Righello</p>
      <h2 class="section-title">Non separiamo estetica, marketing e prodotto.</h2>
      <p>
        La pagina deve essere bella, ma deve anche reggere quando il cliente chiede: “perché dovrei fidarmi?”.
        Per questo ogni progetto viene progettato come sistema.
      </p>
    </div>
    <div class="pillar-grid">
      {#each pillars as pillar, i}
        <article class="pillar-card">
          <span>{String(i + 1).padStart(2, '0')}</span>
          <h3>{pillar.title}</h3>
          <p>{pillar.text}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section id="case-study" class="section-padding case-section">
  <div class="section-container">
    <div class="case-heading">
      <div>
        <p class="section-subtitle">Case study selezionati</p>
        <h2 class="section-title">Esempi concreti, senza metriche riservate inventate.</h2>
      </div>
      <p>
        Mostriamo ciò che un cliente può valutare: chiarezza, qualità visiva, struttura, coerenza dei canali e utilità
        commerciale del lavoro prodotto.
      </p>
    </div>

    <div class="filter-bar" aria-label="Filtra case study per categoria">
      {#each categories as category}
        <button
          type="button"
          class:active-filter={selectedCategory === category.id}
          aria-pressed={selectedCategory === category.id}
          on:click={() => (selectedCategory = category.id)}
        >
          {category.label}
        </button>
      {/each}
    </div>

    <div class="case-grid">
      {#each filteredCaseStudies as study}
        <article id={study.id} class="case-card">
          <a
            class="case-media"
            href={study.href || '/contatti'}
            target={study.href?.startsWith('http') ? '_blank' : undefined}
            rel={study.href?.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={study.href ? `Apri riferimento ${study.name}` : `Contattaci per ${study.name}`}
          >
            <img
              src={study.image}
              alt=""
              loading="lazy"
              decoding="async"
              style={`object-position: ${study.imagePosition || 'center center'};`}
              aria-hidden="true"
            />
            <span>{study.href?.startsWith('http') ? '↗' : '→'}</span>
          </a>
          <div class="case-content">
            <div class="case-meta">
              <div class="client-mark" aria-hidden="true">
                {#if study.logo}
                  <img src={study.logo} alt="" loading="lazy" decoding="async" />
                {:else}
                  <span>{study.name.slice(0, 1)}</span>
                {/if}
              </div>
              <div>
                <p>{study.sector}</p>
                <h3>{study.name}</h3>
              </div>
            </div>
            <strong>{study.headline}</strong>
            <p>{study.text}</p>
            <div class="tag-row" aria-label={`Focus del progetto ${study.name}`}>
              {#each study.focus as item}
                <span>{item}</span>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<PhotoSpotlightShowcase
  eyebrow="Produzioni video e foto"
  title="Lo shooting è solo l’inizio. Il valore è nel riuso."
  text="Una produzione fatta bene non resta in una cartella: diventa sito, social, campagna, sales deck e archivio ordinato. Le gallery Lumis mostrano come trasformiamo foto ed eventi in materiali pronti da usare."
  images={productionSpotlightImages}
  links={productionLinks}
/>

<section class="final-cta">
  <div class="section-container">
    <div class="final-cta__inner">
      <p class="section-subtitle">Prossimo progetto</p>
      <h2>Vuoi capire quali lavori Righello sono più vicini al tuo caso?</h2>
      <p>
        Raccontaci settore, obiettivo e materiali disponibili. Ti mostriamo esempi coerenti e ti diciamo cosa serve
        davvero: sito, contenuti, campagne, software o un sistema più completo.
      </p>
      <MagneticButton href="/contatti" variant="primary">Richiedi una consulenza</MagneticButton>
    </div>
  </div>
</section>

<style>
  .projects-hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: clamp(7.5rem, 13vw, 12rem) 0 4rem;
    background:
      radial-gradient(circle at 12% 0%, rgba(214, 72, 126, 0.3), transparent 29rem),
      radial-gradient(circle at 92% 22%, rgba(4, 122, 140, 0.18), transparent 27rem),
      linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 36rem),
      var(--bg-primary);
  }

  .projects-hero::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    z-index: -1;
    height: 42%;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.34));
    pointer-events: none;
  }

  .hero-grid {
    display: grid;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }

  .hero-copy,
  .section-heading,
  .case-heading,
  .system-copy,
  .system-layout > div:first-child {
    max-width: 58rem;
  }

  .hero-title {
    max-width: 62rem;
    margin: 0 0 1.4rem;
  font-size: clamp(3.05rem, 7.1vw, 6.25rem);
    line-height: 0.92;
    letter-spacing: 0;
  }

  .hero-intro,
  .section-heading > p,
  .case-heading > p,
  .system-copy > p,
  .final-cta__inner > p {
    color: var(--text-secondary);
    font-size: clamp(1.02rem, 1.7vw, 1.22rem);
    line-height: 1.65;
  }

  .hero-intro {
    max-width: 49rem;
    margin: 0 0 2rem;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
  }

  .hero-proof {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 2rem;
    padding: clamp(1rem, 3vw, 1.55rem);
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03)),
      rgba(15, 16, 18, 0.78);
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);
  }

  .proof-kicker,
  .proof-list p {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .proof-kicker {
    align-items: center;
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }

  .proof-kicker strong {
    color: var(--text-primary);
  }

  .proof-axis {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.65rem;
    margin-bottom: 1rem;
  }

  .proof-axis span {
    min-height: 5.6rem;
    display: flex;
    align-items: end;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.05rem;
    padding: 0.85rem;
    background:
      radial-gradient(circle at 10% 0%, rgba(214, 72, 126, 0.24), transparent 4.5rem),
      rgba(255, 255, 255, 0.04);
    color: var(--text-primary);
    font-size: 0.82rem;
    font-weight: 800;
  }

  .proof-list {
    display: grid;
    gap: 0.7rem;
  }

  .proof-list p {
    margin: 0;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 1rem;
    padding: 0.9rem;
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-primary);
    line-height: 1.45;
  }

  .proof-list span {
    flex: 0 0 auto;
    color: var(--righello-pink, #d6487e);
    font-weight: 900;
  }

  .hero-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-top: 2rem;
  }

  .hero-stats div {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.85rem;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.2rem;
    padding: 0.8rem 0.9rem;
    background: rgba(255, 255, 255, 0.045);
  }

  .hero-stats strong {
    min-width: 3.35rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    padding: 0.48rem 0.7rem;
    background: var(--righello-pink, #d6487e);
    color: #fff;
    font-size: 0.95rem;
  }

  .hero-stats span {
    color: var(--text-secondary);
    line-height: 1.25;
  }

  .client-proof-section,
  .case-section {
    background: var(--bg-secondary);
  }

  .client-proof-section {
    padding: clamp(3rem, 7vw, 5rem) 0;
  }

  .client-proof-grid {
    display: grid;
    gap: 1.4rem;
    align-items: start;
  }

  .client-proof-copy h2 {
    margin: 0;
    max-width: 31rem;
    color: var(--text-primary);
    font-size: clamp(1.9rem, 5vw, 3.7rem);
    line-height: 0.98;
    letter-spacing: 0;
  }

  .client-logo-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .client-logo-tile {
    min-width: 0;
    min-height: 5.15rem;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.25rem;
    padding: 0.85rem;
    background: rgba(255, 255, 255, 0.028);
  }

  .client-logo-tile img {
    max-width: min(100%, 8.4rem);
    max-height: 2.45rem;
    object-fit: contain;
    filter: grayscale(1) brightness(1.9) contrast(0.96);
    opacity: 0.92;
  }

  .client-logo-tile img.no-filter {
    filter: none;
    opacity: 1;
  }

  .client-logo-tile img.logo-lift {
    filter: grayscale(1) invert(1) brightness(1.25) contrast(0.98);
  }

  .section-heading,
  .case-heading {
    display: grid;
    gap: 1rem;
    margin-bottom: clamp(1.8rem, 4vw, 3rem);
  }

  .featured-grid {
    display: grid;
    gap: 1rem;
  }

  .featured-card {
    position: relative;
    min-height: clamp(28rem, 70vw, 34rem);
    display: flex;
    align-items: end;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 2rem;
    padding: clamp(1.2rem, 4vw, 2rem);
    background: #0f1012;
    color: #fff;
    text-decoration: none;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.26);
    transform: translateZ(0);
  }

  .featured-card img,
  .case-media img {
    position: absolute;
    inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.08) contrast(1.04);
}

.featured-card img {
  opacity: 0.88;
  transition: transform 0.7s ease, opacity 0.7s ease;
}

  .featured-card__shade {
    position: absolute;
    inset: 0;
    background:
  linear-gradient(180deg, rgba(0, 0, 0, 0.34), transparent 36%, rgba(0, 0, 0, 0.76)),
  radial-gradient(circle at 16% 18%, rgba(214, 72, 126, 0.24), transparent 16rem);
  }

  .featured-card__arrow {
    position: absolute;
    top: 1.1rem;
    right: 1.1rem;
    z-index: 1;
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(14px);
    color: #fff;
    font-size: 1.25rem;
  }

  .featured-card__content {
    position: relative;
    z-index: 1;
    max-width: 29rem;
  }

  .featured-card__content p {
    margin: 0 0 0.8rem;
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.76rem;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .featured-card h3 {
    margin: 0;
    font-size: clamp(2.6rem, 10vw, 4.6rem);
    line-height: 0.9;
    letter-spacing: 0;
  }

  .featured-card strong {
    display: block;
    margin-top: 0.85rem;
    font-size: clamp(1.2rem, 3vw, 1.75rem);
    line-height: 1.08;
  }

  .featured-card__content > span {
    display: block;
    margin-top: 0.85rem;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.52;
  }

  .chip-row,
  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .chip-row {
    margin-top: 1.1rem;
  }

  .chip-row em,
  .tag-row span {
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    padding: 0.45rem 0.7rem;
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.82);
    font-size: 0.78rem;
    font-style: normal;
    font-weight: 750;
    line-height: 1;
  }

  .system-section,
  .final-cta {
    background: var(--bg-primary);
  }

  .system-layout {
    display: grid;
    gap: clamp(1.5rem, 4vw, 3rem);
    align-items: start;
  }

  .pillar-grid {
    display: grid;
    gap: 0.85rem;
  }

  .pillar-card {
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 1.35rem;
    padding: clamp(1rem, 2.5vw, 1.35rem);
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.02)),
      var(--bg-secondary);
  }

  .pillar-card span {
    display: inline-grid;
    place-items: center;
    min-width: 2.7rem;
    margin-bottom: 1rem;
    border-radius: 999px;
    padding: 0.45rem 0.75rem;
    background: rgba(214, 72, 126, 0.16);
    color: var(--righello-pink, #d6487e);
    font-weight: 900;
  }

  .pillar-card h3 {
    margin: 0 0 0.55rem;
    color: var(--text-primary);
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    line-height: 1.05;
  }

  .pillar-card p {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.55;
  }

  #case-study {
    scroll-margin-top: 7rem;
  }

  .case-heading {
    align-items: end;
  }

  .filter-bar {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    padding-bottom: 0.35rem;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .filter-bar::-webkit-scrollbar {
    display: none;
  }

  .filter-bar button {
    min-height: 44px;
    flex: 0 0 auto;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.58rem 1rem;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-weight: 750;
  }

  .filter-bar button.active-filter {
    border-color: var(--righello-pink, #d6487e);
    background: var(--righello-pink, #d6487e);
    color: #fff;
  }

  .case-grid {
    display: grid;
    gap: 1rem;
  }

  .case-card {
    display: grid;
    gap: 1rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 1.55rem;
    padding: 0.75rem;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.018)),
      var(--bg-primary);
  }

  .case-media {
    position: relative;
    min-height: 18rem;
    overflow: hidden;
    border-radius: 1.1rem;
    background: #101113;
    color: #fff;
  }

  .case-media::after {
    content: '';
    position: absolute;
    inset: 0;
background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), transparent 46%, rgba(0, 0, 0, 0.48));
  }

  .case-media span {
    position: absolute;
    right: 0.85rem;
    bottom: 0.85rem;
    z-index: 1;
    width: 2.7rem;
    height: 2.7rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(12px);
  }

  .case-content {
    min-width: 0;
    padding: 0.35rem 0.2rem 0.45rem;
  }

  .case-meta {
    display: flex;
    gap: 0.85rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .client-mark {
    width: 3rem;
    height: 3rem;
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
  }

  .client-mark img {
    max-width: 72%;
    max-height: 72%;
    object-fit: contain;
    filter: grayscale(1) brightness(1.7) contrast(0.96);
  }

  .client-mark span {
    color: var(--righello-pink, #d6487e);
    font-weight: 900;
  }

  .case-meta p {
    margin: 0 0 0.15rem;
    color: var(--righello-pink, #d6487e);
    font-size: 0.78rem;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .case-meta h3 {
    margin: 0;
    color: var(--text-primary);
    font-size: clamp(1.35rem, 4vw, 2rem);
    line-height: 1;
  }

  .case-content > strong {
    display: block;
    max-width: 42rem;
    color: var(--text-primary);
    font-size: clamp(1.18rem, 2.5vw, 1.45rem);
    line-height: 1.15;
  }

  .case-content > p {
    max-width: 48rem;
    margin: 0.8rem 0 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .tag-row span {
    border-color: rgba(214, 72, 126, 0.2);
    background: rgba(214, 72, 126, 0.1);
    color: var(--text-primary);
  }

  .final-cta {
    padding: 0 0 clamp(4rem, 8vw, 7rem);
  }

  .final-cta__inner {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 2rem;
    padding: clamp(1.4rem, 5vw, 3rem);
    background:
      radial-gradient(circle at 14% 18%, rgba(214, 72, 126, 0.24), transparent 24rem),
      linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.024)),
      var(--bg-secondary);
  }

  .final-cta__inner h2 {
    max-width: 48rem;
    margin: 0 0 1rem;
    color: var(--text-primary);
    font-size: clamp(2rem, 6vw, 4.7rem);
    line-height: 0.98;
    letter-spacing: 0;
  }

  .final-cta__inner p {
    max-width: 45rem;
    margin-bottom: 1.6rem;
  }

  @media (hover: hover) and (pointer: fine) {
    .featured-card:hover img,
    .case-media:hover img {
      transform: scale(1.055);
      opacity: 0.9;
    }

    .featured-card:hover {
      border-color: rgba(214, 72, 126, 0.45);
    }

    .case-card:hover,
    .pillar-card:hover {
      border-color: rgba(214, 72, 126, 0.26);
    }
  }

  @media (min-width: 700px) {
    .hero-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .client-logo-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .case-card {
      grid-template-columns: minmax(16rem, 0.78fr) minmax(0, 1fr);
      align-items: stretch;
      padding: 0.9rem;
    }

    .case-media {
      min-height: 100%;
    }

    .case-content {
      padding: 0.65rem 0.5rem;
    }
  }

  @media (min-width: 980px) {
    .hero-grid {
      grid-template-columns: minmax(0, 1.35fr) minmax(23rem, 0.65fr);
    }

    .client-proof-grid,
    .system-layout {
      grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
    }

    .featured-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .featured-card {
      min-height: 34rem;
    }

    .pillar-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .case-heading {
      grid-template-columns: minmax(0, 0.9fr) minmax(20rem, 0.55fr);
    }

    .case-grid {
      gap: 1.1rem;
    }
  }

  @media (max-width: 520px) {
    .projects-hero {
      padding-top: 7.25rem;
    }

    .hero-actions :global(.magnetic-button) {
      width: 100%;
    }

    .proof-kicker,
    .proof-list p {
      align-items: flex-start;
    }

    .proof-axis {
      grid-template-columns: 1fr;
    }

    .proof-axis span {
      min-height: 3.85rem;
    }

    .client-logo-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .client-logo-tile {
      min-height: 4.65rem;
      border-radius: 1rem;
    }

    .featured-card {
      border-radius: 1.55rem;
      min-height: 31rem;
    }

    .case-media {
      min-height: 16.5rem;
    }
  }
</style>
