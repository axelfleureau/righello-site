<script lang="ts">
  import { clients } from '$lib/data/projects';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';

  type CaseStudy = {
    id: string;
    name: string;
    sector: string;
    category: string;
    summary: string;
    challenge: string;
    approach: string;
    value: string[];
    services: string[];
    reference: string;
    logo?: string;
    cover?: string;
    coverPosition?: string;
  };

  type WebProject = {
    name: string;
    type: string;
    url: string;
    summary: string;
    proof: string;
    ctaLabel: string;
    image: string;
    imagePosition?: string;
    featured?: boolean;
  };

  type FeaturedProof = {
    name: string;
    label: string;
    href: string;
    intro: string;
    proof: string[];
    accent: string;
    image: string;
    imagePosition?: string;
    imageOpacity?: number;
    imageHoverOpacity?: number;
    imageFilter?: string;
    imageHoverFilter?: string;
  };

  const heroStats = [
    { value: '50+', label: 'clienti e brand seguiti' },
    { value: '10+', label: 'settori tra hospitality, tech e PMI' },
    { value: '3', label: 'contenuti, sito e tecnologia' },
  ];

  const categories = [
    { id: 'all', label: 'Tutti' },
    { id: 'hospitality', label: 'Hospitality' },
    { id: 'medical', label: 'Medical' },
    { id: 'automotive', label: 'Automotive' },
    { id: 'wine', label: 'Wine & Lifestyle' },
    { id: 'food', label: 'Food' },
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: 'elite-hotel-spa',
      name: 'Elite Hotel & Spa',
      sector: 'Hospitality & Wellness',
      category: 'hospitality',
      summary: 'Un sistema di contenuti premium per allineare percezione digitale, produzione visuale e campagne di prenotazione diretta.',
      challenge: 'Una struttura con esperienza reale di alto livello, ma una comunicazione digitale non ancora coerente con il valore percepito dal cliente.',
      approach: 'Produzione video, fotografia e short-form content pianificati come asset riutilizzabili su social, advertising e sito.',
      value: ['Identità visiva più premium', 'Libreria contenuti riutilizzabile', 'Materiali pronti per campagne e prenotazioni dirette'],
      services: ['Video production', 'Shooting fotografico', 'Social content', 'Advertising asset'],
      reference: 'https://www.instagram.com/elitehotelandspa/',
      logo: '/logos/hotel-elite.png',
      cover: '/thumbnails/thumb-ca926bab868e.jpg',
      coverPosition: 'center center',
    },
    {
      id: 'garden-hotel-michelangelo',
      name: 'Garden Hotel Michelangelo',
      sector: 'Hospitality',
      category: 'hospitality',
      summary: 'Storytelling visivo stagionale per elevare la percezione dell’hotel e parlare a un pubblico più internazionale e premium.',
      challenge: 'Un hotel consolidato con prodotto forte, pronto a rendere la comunicazione più curata, coerente e memorabile.',
      approach: 'Racconto di atmosfera, architettura ed esperienza ospite con produzioni pensate per durare nel tempo.',
      value: ['Percezione brand più alta', 'Asset coerenti per canali organici e paid', 'Produzione non usa e getta'],
      services: ['Strategia contenuti', 'Produzione video', 'Fotografia', 'Storytelling hospitality'],
      reference: 'https://www.instagram.com/gardenhotelmichelangelo/',
      logo: '/logos/hotel-michelangelo.png',
      cover: '/thumbnails/thumb-18c674dd5ccb.jpg',
      coverPosition: 'center center',
    },
    {
      id: 'fiumedica',
      name: 'Fiumedica',
      sector: 'Medical & Healthcare',
      category: 'medical',
      summary: 'Comunicazione chiara e rassicurante per rendere l’expertise clinica più comprensibile prima del primo appuntamento.',
      challenge: 'Una clinica privata con forte competenza medica, da raccontare con equilibrio, fiducia e standard adatti al settore.',
      approach: 'Contenuti pensati per rispondere alle domande dei pazienti, ridurre frizione e trasmettere cura senza linguaggio freddo.',
      value: ['Comunicazione più chiara per il paziente', 'Fiducia prima del contatto', 'Posizionamento professionale più solido'],
      services: ['Content strategy', 'Copywriting', 'Produzione contenuti', 'Posizionamento'],
      reference: 'https://www.instagram.com/fiumedica/',
    },
    {
      id: 'ricci-group',
      name: 'Ricci Group',
      sector: 'Automotive',
      category: 'automotive',
      summary: 'Contenuti automotive premium costruiti per portare il linguaggio visivo dei brand rappresentati dentro la comunicazione del concessionario.',
      challenge: 'Un concessionario premium deve vendere aspirazione, non solo schede tecniche e disponibilità veicoli.',
      approach: 'Approccio cinematografico alla presentazione dei modelli, con produzione ad alto volume in giornate organizzate.',
      value: ['Percezione premium più alta', 'Materiale utile per organico e paid', 'Maggiore coerenza con i marchi rappresentati'],
      services: ['Video production', 'Social media', 'Advertising creative', 'Content planning'],
      reference: 'https://www.instagram.com/riccigroup_concessionaria/',
      logo: '/logos/ricci-group.webp',
      cover: '/thumbnails/thumb-867948b42ce0.jpg',
      coverPosition: 'center center',
    },
    {
      id: 'reguta-1928',
      name: 'Reguta 1928',
      sector: 'Wine & Lifestyle',
      category: 'wine',
      summary: 'Heritage, territorio e persone trasformati in un racconto contemporaneo per un brand vinicolo storico.',
      challenge: 'Parlare a un pubblico moderno e premium senza perdere autenticità, storia e legame con la terra.',
      approach: 'Narrativa visiva su tenuta, processo produttivo, artigianalità e persone dietro al vino.',
      value: ['Identità coerente con storia e qualità', 'Contenuti con appeal internazionale', 'Racconto più forte per buyer, hospitality ed export'],
      services: ['Storytelling', 'Social media', 'Video content', 'Produzione fotografica'],
      reference: 'https://www.instagram.com/reguta.1928/',
      logo: '/logos/reguta.png',
      cover: '/thumbnails/thumb-f89791b0c4c7.jpg',
      coverPosition: 'center center',
    },
    {
      id: 'casa-rossa',
      name: 'Casa Rossa',
      sector: 'Food & Restaurant',
      category: 'food',
      summary: 'Un ristorante premium raccontato come destinazione per ospiti, eventi e business dining.',
      challenge: 'Attrarre clientela professionale e corporate mantenendo chiara l’identità gastronomica.',
      approach: 'Produzione e contenuti dual-audience: ospiti individuali da un lato, organizzatori di eventi e aziende dall’altro.',
      value: ['Identità premium più coerente', 'Materiali utili per vendita diretta e marketing eventi', 'Posizionamento B2B più leggibile'],
      services: ['Food content', 'Shooting', 'Social strategy', 'Advertising asset'],
      reference: 'https://www.instagram.com/casarossaristobusiness/',
    },
  ];

  const webProjects: WebProject[] = [
    {
      name: 'BUFFR',
      type: 'App iOS / camera buffer per replay istantanei',
      url: '/buffr',
      summary: 'App iOS firmata Righello: una camera buffer per salvare gli ultimi secondi durante sport, live event e backstage.',
      proof: 'Product design, UX mobile, pagina prodotto, App Store assets',
      ctaLabel: 'Apri pagina BUFFR',
      image: '/products/buffr/replay-in-un-tap.jpg',
      imagePosition: 'center 38%',
      featured: true,
    },
    {
      name: 'Lumis',
      type: 'Web application custom / prodotto digitale',
      url: 'https://lumis.wearerighello.com',
      summary: 'Applicazione web custom costruita come esperienza digitale proprietaria, non come semplice sito vetrina.',
      proof: 'Web app, interfaccia custom, sviluppo prodotto',
      ctaLabel: 'Visita Lumis',
      image: '/projects/cards/lumis-card.jpg',
      imagePosition: 'center top',
      featured: true,
    },
    {
      name: 'Neura',
      type: 'Web application custom / prodotto digitale',
      url: 'https://neura.wearerighello.com',
      summary: 'Prodotto digitale con posizionamento, architettura informativa e interfaccia pensati per spiegare valore e funzione.',
      proof: 'UX, frontend, prodotto digitale',
      ctaLabel: 'Visita Neura',
      image: '/projects/cards/neura-card.jpg',
      imagePosition: 'left top',
    },
    {
      name: 'Porto Piccolo Apartments',
      type: 'Real estate / landing page commerciale',
      url: 'https://portopiccolo-apartments-validation.wearerighello.com',
      summary: 'Landing commerciale per chiarire proposta, pubblico e qualità del traffico prima di scalare.',
      proof: 'Landing, conversione, real estate',
      ctaLabel: 'Apri progetto',
      image: '/thumbnails/thumb-6322be15ebae.jpg',
      imagePosition: 'center center',
    },
    {
      name: 'Solero Sport Village',
      type: 'Sport & fitness / landing page commerciale',
      url: 'https://solero-validation.wearerighello.com',
      summary: 'Esperienza web rapida e focalizzata per comunicare offerta, posizionamento e prossima azione.',
      proof: 'Landing, sport, lead generation',
      ctaLabel: 'Apri progetto',
      image: '/logos/solero.png',
      imagePosition: 'center center',
    },
    {
      name: 'TC Studio Immobiliare',
      type: 'Agenzia immobiliare / sito corporate',
      url: 'https://www.tcstudioimmobiliare.it',
      summary: 'Sito corporate per rendere più chiara l’offerta e sostenere il contatto commerciale.',
      proof: 'Corporate website, UX, SEO base',
      ctaLabel: 'Visita sito',
      image: '/logos/tubaro.png',
      imagePosition: 'center center',
    },
    {
      name: 'Clara Falomo',
      type: 'Personal brand / professionista',
      url: 'https://www.clarafalomo.it',
      summary: 'Presenza digitale personale, pulita e diretta, costruita per autorevolezza e contatto.',
      proof: 'Personal brand, sito, copy',
      ctaLabel: 'Visita sito',
      image: '/thumbnails/thumb-d21d67febb70.jpg',
      imagePosition: 'center center',
    },
    {
      name: 'Black & White S.r.l.s.',
      type: 'Corporate / sito aziendale',
      url: 'https://www.blackwhitesrls.com',
      summary: 'Sito aziendale essenziale e credibile, pensato per far capire subito attività e affidabilità.',
      proof: 'Corporate website, struttura, contenuti',
      ctaLabel: 'Visita sito',
      image: '/logo-white.png',
      imagePosition: 'center center',
    },
  ];

  const featuredProofs: FeaturedProof[] = [
    {
      name: 'BUFFR',
      label: 'App iOS proprietaria',
      href: '/buffr',
      intro: 'Un prodotto nato in Righello: camera buffer per iPhone, replay istantanei e pagina prodotto pronta per App Store.',
      proof: ['Product design', 'UX mobile', 'Go-to-market', 'Pagina prodotto'],
      accent: 'Dal prototipo allo store',
      image: '/products/buffr/replay-in-un-tap.jpg',
      imagePosition: 'center 40%',
    },
    {
      name: 'Lumis',
      label: 'Web app su misura',
      href: 'https://lumis.wearerighello.com',
      intro: 'Un’esperienza digitale proprietaria, costruita per spiegare valore e funzione senza sembrare un template.',
      proof: ['Interfaccia custom', 'Frontend', 'Design system', 'Storytelling prodotto'],
      accent: 'Esperienza proprietaria',
      image: '/projects/cards/lumis-card.jpg',
      imagePosition: 'center top',
    },
    {
      name: 'Neura',
      label: 'Prodotto digitale',
      href: 'https://neura.wearerighello.com',
      intro: 'Architettura informativa, UX e posizionamento per rendere comprensibile un prodotto digitale complesso.',
      proof: ['UX writing', 'Frontend', 'Posizionamento', 'Struttura commerciale'],
      accent: 'Chiarezza che vende',
      image: '/projects/cards/neura-card.jpg',
      imagePosition: 'left top',
      imageOpacity: 0.2,
      imageHoverOpacity: 0.3,
      imageFilter: 'blur(10px) saturate(0.75) contrast(0.9)',
      imageHoverFilter: 'blur(7px) saturate(0.82) contrast(0.96)',
    },
    {
      name: 'Contenuti',
      label: 'Produzioni e campagne',
      href: '#case-study-archive',
      intro: 'Shooting, video, social e advertising pensati per diventare materiali commerciali, non post isolati.',
      proof: ['Video', 'Foto', 'Paid asset', 'Materiali vendita'],
      accent: 'Asset riutilizzabili',
      image: '/thumbnails/thumb-f89791b0c4c7.jpg',
      imagePosition: 'center center',
    },
  ];

  const capabilityProofs = [
    {
      title: 'Prima impressione più forte',
      text: 'Quando un cliente arriva sul sito o sui social, deve capire subito che l’azienda è solida, curata e affidabile.',
    },
    {
      title: 'Più materiali per vendere',
      text: 'Un progetto ben fatto produce pagine, video, foto, presentazioni e asset che il team può usare ogni giorno.',
    },
    {
      title: 'Meno improvvisazione',
      text: 'Sito, contenuti e campagne devono lavorare insieme. Non trattiamo ogni canale come un pezzo separato.',
    },
  ];

  const archiveSignals = [
    { value: 'Hospitality', label: 'hotel, spa, resort e ristorazione' },
    { value: 'Medical', label: 'cliniche, studi e servizi alla persona' },
    { value: 'Automotive', label: 'concessionarie, showroom e brand premium' },
    { value: 'Tech', label: 'software, app, portali e prodotti digitali' },
  ];

  const archiveBullets = [
    'Selezioniamo esempi coerenti con il settore del cliente, invece di mandare un portfolio infinito.',
    'Distinguiamo tra sito, prodotto digitale, contenuti e campagne, così il valore è più facile da leggere.',
    'Mostriamo cosa è stato migliorato: percezione, chiarezza dell’offerta, materiali di vendita, velocità di pubblicazione.',
    'Quando i numeri sono riservati, usiamo prove pubbliche: contenuti, pagine, asset, canali e riferimenti verificabili.',
  ];

  const selectedClientLogos = clients
    .filter((client) => client.logo)
    .slice(0, 28);

  const seoServiceAreas = [
    'agenzia marketing Pordenone',
    'agenzia marketing Mestre',
    'siti web aziendali',
    'produzioni video e foto',
    'software custom',
    'automazioni AI',
    'social media marketing',
    'advertising',
  ];

  const productionLinks = [
    {
      label: 'Portfolio completo Righello',
      description: 'Una selezione curata di eventi, shooting, interni, prodotto e contenuti creator, organizzata per progetto.',
      href: 'https://lumis.wearerighello.com/gallery?tenant=righello&event=portfolio-completo',
    },
    {
      label: 'Tomasella',
      description: 'Esempio di contenuti e asset visuali preparati per raccontare meglio un brand e i suoi prodotti.',
      href: 'https://lumis.wearerighello.com/gallery?tenant=righello&event=tomasella',
    },
    {
      label: 'Play x Noiclub',
      description: 'Gallery evento separata e riconoscibile, utile per valutare gestione, ritmo e selezione dei contenuti live.',
      href: 'https://lumis.wearerighello.com/gallery?tenant=righello&event=play-x-noiclub',
    },
    {
      label: 'Appartamento Ernesto Sanato',
      description: 'Esempio real estate/interior: pochi scatti organizzati per mostrare spazio, atmosfera e dettagli.',
      href: 'https://lumis.wearerighello.com/gallery?tenant=righello&event=Appartament-Ernesto',
    },
    {
      label: 'Selezione su misura',
      description: 'Per lavori non pubblici prepariamo una selezione coerente con settore, obiettivo e canali, senza archivi generici.',
      href: '/contatti',
    },
  ];

  const referenceGroups = [
    {
      title: 'Hospitality, food e lifestyle',
      names: ['Elite Hotel & Spa', 'Garden Hotel Michelangelo', 'Casa Rossa', 'Busa del Sauc', 'Banshi Sushi', 'Riviera Resort', 'Quellenhof'],
    },
    {
      title: 'Sport, eventi e territorio',
      names: ['Scuola Sci Piancavallo', 'Solero Sport Village', 'Noi Club', 'Barcolana', 'Comune di Pordenone', 'Comune di Fanna', 'Ippodromo Merano'],
    },
    {
      title: 'Tech, web e business',
      names: ['3R Technology', 'Neura', 'Lumis', 'BUFFR', 'Tomasella', 'Ricci Group', 'Fiumedica', 'SystemDoc'],
    },
  ];

  let selectedCategory = 'all';

  $: filteredCaseStudies = selectedCategory === 'all'
    ? caseStudies
    : caseStudies.filter((study) => study.category === selectedCategory);

  const schema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Case study e progetti Righello',
      url: 'https://www.wearerighello.com/progetti',
      description: 'Case study, prodotti digitali Righello, siti web, produzioni video e campagne realizzati per aziende tra Pordenone, Mestre, Friuli Venezia Giulia e Veneto.',
      publisher: {
        '@type': 'Organization',
        name: 'Righello S.r.l.',
        url: 'https://www.wearerighello.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: caseStudies.map((study, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: study.name,
        url: `https://www.wearerighello.com/progetti#${study.id}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Progetti digitali Righello',
      itemListElement: featuredProofs.map((proof, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: proof.name,
        url: proof.href.startsWith('http')
          ? proof.href
          : proof.href.startsWith('#')
            ? `https://www.wearerighello.com/progetti${proof.href}`
            : `https://www.wearerighello.com${proof.href}`,
      })),
    },
  ]);

  const schemaMarkup = `<script type="application/ld+json">${schema.replace(/</g, '\\u003c')}<\/script>`;
</script>

<svelte:head>
  <title>Case Study e Prodotti Digitali Righello | Siti Web, App e Software</title>
  <meta name="description" content="Case study e prodotti digitali Righello: BUFFR, Lumis, Neura, siti web, produzioni video, campagne marketing e software custom per aziende." />
  <link rel="canonical" href="https://www.wearerighello.com/progetti" />
  <meta property="og:title" content="Case Study e Prodotti Digitali | Righello" />
  <meta property="og:description" content="BUFFR, Lumis, Neura, siti web, campagne, contenuti e software custom realizzati da Righello." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/progetti" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Case Study e Prodotti Digitali | Righello" />
  <meta name="twitter:description" content="Case study Righello: BUFFR, Lumis, Neura, siti web, produzioni, campagne e software custom." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=3" />
  {@html schemaMarkup}
</svelte:head>

<section class="projects-hero">
  <div class="hero-glass" aria-hidden="true"></div>
  <div class="section-container hero-grid">
    <RevealOnScroll animation="fly-up" duration={420}>
      <div class="hero-copy">
        <p class="section-subtitle">Case study e prodotti digitali Righello</p>
        <h1 class="heading-xl hero-title">Lavori reali per aziende che vogliono essere scelte meglio.</h1>
        <p class="hero-intro">
          Siti web, produzioni video, campagne, software custom, app e prodotti digitali Righello. Qui trovi una selezione
          di progetti costruiti per rendere più chiara l’offerta, aumentare fiducia e dare al team materiali
          utili per vendere.
        </p>
        <div class="hero-actions">
          <MagneticButton href="/contatti" variant="primary">Parliamo del tuo progetto</MagneticButton>
          <MagneticButton href="#case-study" variant="secondary">Guarda i casi studio</MagneticButton>
        </div>
        <div class="hero-stats" aria-label="Sintesi progetti Righello">
          {#each heroStats as stat}
            <div>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          {/each}
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="scale" delay={120} duration={420}>
      <aside class="proof-panel" aria-label="Sintesi portfolio Righello">
        <div class="proof-panel__top">
          <span>Cosa guardare</span>
          <strong>Non solo estetica</strong>
        </div>
        <div class="proof-hero-line">
          <span>Brand</span>
          <span>Contenuti</span>
          <span>Prodotto</span>
        </div>
        <div class="proof-list">
          <div>
            <span>01</span>
            <p>La prima impressione deve spiegare valore, qualità e affidabilità.</p>
          </div>
          <div>
            <span>02</span>
            <p>Un buon progetto genera contenuti, pagine e asset riutilizzabili.</p>
          </div>
          <div>
            <span>03</span>
            <p>Sito, social, advertising e software devono lavorare come un sistema.</p>
          </div>
        </div>
      </aside>
    </RevealOnScroll>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section class="client-proof-section">
  <div class="section-container">
    <RevealOnScroll animation="fade" duration={260}>
      <div class="client-proof-heading">
        <p>Alcuni brand, aziende ed enti con cui abbiamo lavorato</p>
        <div class="seo-chip-row" aria-label="Aree di lavoro Righello">
          {#each seoServiceAreas as area}
            <span>{area}</span>
          {/each}
        </div>
      </div>
    </RevealOnScroll>

    <div class="client-logo-grid">
      {#each selectedClientLogos as client, i}
        <RevealOnScroll animation="fade" stagger={22} index={i} duration={220}>
          <div class="client-logo-tile">
            {#if client.logo}
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                class:no-filter={client.noFilter && !client.lightSurface}
                class:logo-lift={client.lightSurface}
              />
            {:else}
              <span>{client.name}</span>
            {/if}
          </div>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-secondary)" />

<section class="section-padding featured-proof-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="section-heading-row">
        <div>
          <p class="section-subtitle">Progetti in evidenza</p>
          <h2 class="section-title">Dal sito vetrina al sistema che aiuta davvero a vendere.</h2>
        </div>
        <p>
          Alcuni lavori sono pagine, altri sono app, software o contenuti. Il punto è lo stesso:
          creare strumenti che il cliente può usare per presentarsi meglio, spiegare meglio e muoversi più velocemente.
        </p>
      </div>
    </RevealOnScroll>

    <div class="featured-proof-grid">
      {#each featuredProofs as proof, i}
        <RevealOnScroll animation="fly-up" stagger={80} index={i} duration={340}>
          <a
            class="featured-proof-card"
            href={proof.href}
            target={proof.href.startsWith('http') ? '_blank' : undefined}
            rel={proof.href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={`Apri progetto ${proof.name}`}
          >
            <img
              class="featured-proof-card__media"
              src={proof.image}
              alt=""
              loading="lazy"
              decoding="async"
              style={`object-position: ${proof.imagePosition || 'center center'}; --proof-media-opacity: ${proof.imageOpacity ?? 0.58}; --proof-media-hover-opacity: ${proof.imageHoverOpacity ?? 0.74}; --proof-media-filter: ${proof.imageFilter || 'saturate(1) contrast(1)'}; --proof-media-hover-filter: ${proof.imageHoverFilter || 'saturate(1.08) contrast(1.04)'};`}
              aria-hidden="true"
            />
            <span class="featured-proof-card__shade" aria-hidden="true"></span>
            <div class="featured-proof-card__top">
              <span>{proof.label}</span>
              <em>{proof.href.startsWith('http') ? '↗' : '→'}</em>
            </div>
            <div class="featured-proof-card__body">
              <strong class="featured-accent">{proof.accent}</strong>
              <h3>{proof.name}</h3>
              <p>{proof.intro}</p>
              <div class="proof-chip-row" aria-label={`Competenze coinvolte per ${proof.name}`}>
                {#each proof.proof as item}
                  <span>{item}</span>
                {/each}
              </div>
            </div>
            <span class="featured-proof-card__cta" aria-hidden="true">→</span>
          </a>
        </RevealOnScroll>
      {/each}
    </div>

    <div class="capability-proof-grid">
      {#each capabilityProofs as capability, i}
        <RevealOnScroll animation="fade" stagger={70} index={i} duration={300}>
          <article class="capability-proof-card">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <h3>{capability.title}</h3>
            <p>{capability.text}</p>
          </article>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<section id="product-work" class="section-padding digital-section">
  <div class="section-container digital-shell">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="digital-copy">
        <p class="section-subtitle">Prodotti digitali Righello</p>
        <h2 class="section-title">App, siti web, landing e software che non nascono da un template.</h2>
        <p class="section-intro">
          BUFFR, Lumis, Neura e gli altri progetti digitali raccontano il modo in cui lavoriamo:
          siti aziendali, landing page, app e software custom con architettura pulita,
          performance, struttura SEO e interfacce pensate per evolvere con il business.
        </p>
        <div class="digital-points" aria-label="Punti di forza dei progetti digitali Righello">
          <span>UX/UI</span>
          <span>SEO tecnico</span>
          <span>Performance</span>
          <span>Software custom</span>
        </div>
      </div>
    </RevealOnScroll>

    <div class="web-grid">
      {#each webProjects as project, i}
        <RevealOnScroll animation="fly-up" stagger={60} index={i} duration={320}>
          <a
            class="web-card"
            class:web-card--featured={project.featured}
            href={project.url}
            target={project.url.startsWith('http') ? '_blank' : undefined}
            rel={project.url.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={`${project.ctaLabel}: ${project.name}`}
          >
            <img
              class="web-card__media"
              class:web-card__media--logo={project.image.startsWith('/logos/') || project.image === '/logo-white.png'}
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              style={`object-position: ${project.imagePosition || 'center center'};`}
              aria-hidden="true"
            />
            <span class="web-card__shade" aria-hidden="true"></span>
            <div class="web-card__top">
              <span>{project.type}</span>
              <em aria-hidden="true">{project.url.startsWith('http') ? '↗' : '→'}</em>
            </div>
            <div class="web-card__body">
              <span class="web-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <small>{project.proof}</small>
              <b>{project.ctaLabel}</b>
            </div>
          </a>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section id="case-study" class="section-padding case-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="section-heading-row">
        <div>
          <p class="section-subtitle">Case study selezionati</p>
          <h2 class="section-title">Ogni settore ha un problema diverso. Il metodo resta concreto.</h2>
        </div>
        <p>
          Non pubblichiamo metriche riservate. Mostriamo ciò che un potenziale cliente può valutare:
          chiarezza del posizionamento, qualità dei contenuti, coerenza dei canali e utilità commerciale degli asset prodotti.
        </p>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="fade" delay={80} duration={280}>
      <div class="filter-bar" aria-label="Filtra case study per settore">
        {#each categories as category}
          <button
            type="button"
            class:active-filter={selectedCategory === category.id}
            aria-pressed={selectedCategory === category.id}
            on:click={() => selectedCategory = category.id}
          >
            {category.label}
          </button>
        {/each}
      </div>
    </RevealOnScroll>

    <div class="case-grid">
      {#each filteredCaseStudies as study, i (study.id)}
        <RevealOnScroll animation="fly-up" stagger={70} index={i} duration={360}>
          <article id={study.id} class="case-card">
            {#if study.cover}
              <img
                class="case-card__cover"
                src={study.cover}
                alt=""
                loading="lazy"
                decoding="async"
                style={`object-position: ${study.coverPosition || 'center center'};`}
                aria-hidden="true"
              />
              <span class="case-card__cover-shade" aria-hidden="true"></span>
            {/if}
            <span class="case-index">{String(i + 1).padStart(2, '0')}</span>
            <div class="case-card__main">
              <div class="case-card__intro">
                <div class="case-card__header">
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

                <p class="case-summary">{study.summary}</p>

                <div class="tag-row" aria-label="Servizi coinvolti">
                  {#each study.services as service}
                    <span>{service}</span>
                  {/each}
                </div>

                <a class="reference-link" href={study.reference} target="_blank" rel="noreferrer">
                  Vedi riferimento pubblico
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div class="case-card__proof">
                <div class="case-body">
                  <div>
                    <span>Sfida</span>
                    <p>{study.challenge}</p>
                  </div>
                  <div>
                    <span>Metodo Righello</span>
                    <p>{study.approach}</p>
                  </div>
                </div>

                <div class="case-outcomes">
                  <span>Risultati visibili</span>
                  <ul class="value-list">
                    {#each study.value as item}
                      <li>{item}</li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<section id="case-study-archive" class="section-padding archive-proof-section">
  <div class="section-container archive-proof-shell">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="archive-proof-copy">
        <p class="section-subtitle">Come scegliamo i riferimenti</p>
        <h2 class="section-title">Il portfolio funziona quando parla al problema giusto.</h2>
        <p>
          Se ci contatti, non ti mandiamo un elenco infinito. Selezioniamo i casi più simili al tuo contesto:
          settore, obiettivo, canali da migliorare, materiali già disponibili e livello di maturità digitale.
        </p>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="scale" delay={90} duration={360}>
      <div class="archive-proof-panel">
        <div class="archive-proof-stats" aria-label="Dati archivio case study Righello">
          {#each archiveSignals as signal}
            <div>
              <strong>{signal.value}</strong>
              <span>{signal.label}</span>
            </div>
          {/each}
        </div>
        <ul class="archive-proof-list">
          {#each archiveBullets as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="section-padding production-section">
  <div class="section-container production-grid">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="production-copy">
        <p class="section-subtitle">Produzioni video e foto</p>
        <h2 class="section-title">Lo shooting è solo l’inizio. Il valore è nel riuso.</h2>
        <p>
          Ogni produzione viene progettata per generare materiale riutilizzabile su social,
          campagne paid, sito web, presentazioni commerciali e materiali interni.
        </p>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="fly-up" delay={100} duration={360}>
      <div class="archive-card">
        <p>Portfolio e gallery proprietarie</p>
        <div class="archive-links">
          {#each productionLinks as link}
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <span>
                <strong>{link.label}</strong>
                <small>{link.description}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          {/each}
        </div>
      </div>
    </RevealOnScroll>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section class="section-padding references-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="section-heading-row">
        <div>
          <p class="section-subtitle">Referenze</p>
          <h2 class="section-title">Abbiamo lavorato con aziende locali, brand nazionali, eventi ed enti.</h2>
        </div>
        <p>
          La varietà conta: hospitality, food, sport, automotive, tecnologia, pubblica amministrazione e prodotti digitali
          richiedono linguaggi diversi, ma sempre una comunicazione più chiara e vendibile.
        </p>
      </div>
    </RevealOnScroll>

    <div class="reference-grid">
      {#each referenceGroups as group, i}
        <RevealOnScroll animation="fly-up" stagger={80} index={i} duration={320}>
          <article class="reference-card">
            <h3>{group.title}</h3>
            <div class="reference-names">
              {#each group.names as name}
                <span>{name}</span>
              {/each}
            </div>
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
        <p class="section-subtitle">Prossimo progetto</p>
        <h2>Vuoi capire quali lavori Righello sono più vicini al tuo caso?</h2>
        <p>
          Raccontaci settore, obiettivo e materiali disponibili. Ti mostriamo esempi coerenti e ti diciamo
          cosa serve davvero: sito, contenuti, campagne, software o un sistema più completo.
        </p>
        <MagneticButton href="/contatti" variant="primary">Richiedi una consulenza</MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .projects-hero {
    position: relative;
    isolation: isolate;
    padding: 8rem 0 4.5rem;
    overflow: hidden;
    background:
      radial-gradient(circle at 14% 10%, rgba(214, 72, 126, 0.28), transparent 32rem),
      radial-gradient(circle at 94% 20%, rgba(6, 182, 212, 0.14), transparent 30rem),
      linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 32rem),
      var(--bg-primary);
  }

  .hero-glass {
    display: none;
  }

  .hero-grid,
  .digital-shell,
  .production-grid {
    display: grid;
    gap: 2rem;
  }

  .hero-copy {
    max-width: 58rem;
  }

  .hero-title {
    max-width: 58rem;
    margin-bottom: 1.5rem;
    font-size: clamp(3.35rem, 8vw, 7.2rem);
    line-height: 0.92;
    letter-spacing: 0;
  }

  .hero-intro,
  .section-intro,
  .production-copy p,
  .section-heading-row > p,
  .final-cta p {
    color: var(--text-secondary);
  }

  .hero-intro {
    max-width: 48rem;
    margin-bottom: 2rem;
    font-size: clamp(1.15rem, 2.2vw, 1.55rem);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
  }

  .hero-stats {
    display: grid;
    gap: 0.7rem;
    margin-top: 2rem;
  }

  .hero-stats div {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 1.1rem;
    padding: 0.65rem;
    background: rgba(255, 255, 255, 0.04);
  }

  .hero-stats strong {
    display: grid;
    place-items: center;
    min-width: 3.2rem;
    min-height: 2.25rem;
    border-radius: 999px;
    color: #fff;
    background: var(--righello-pink, #D6487E);
    font-size: 0.95rem;
    line-height: 1;
  }

  .hero-stats span {
    color: var(--text-secondary);
    font-size: 0.92rem;
    line-height: 1.2;
    text-wrap: pretty;
  }

  .proof-panel {
    align-self: end;
    border: 1px solid var(--border-color);
    border-radius: 2rem;
    background:
      linear-gradient(160deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.025)),
      color-mix(in srgb, var(--bg-secondary) 86%, transparent);
    padding: 1.25rem;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.26);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .proof-panel__top {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .proof-panel__top strong {
    color: var(--text-primary);
  }

  .proof-hero-line {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .proof-hero-line span {
    min-height: 5.2rem;
    display: grid;
    place-items: end start;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    padding: 0.7rem;
    color: var(--text-primary);
    background:
      radial-gradient(circle at 0% 0%, rgba(214, 72, 126, 0.22), transparent 4.5rem),
      rgba(255, 255, 255, 0.035);
    font-size: 0.85rem;
    font-weight: 850;
  }

  .proof-list {
    display: grid;
    gap: 0.75rem;
  }

  .proof-list div {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8rem;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.045);
  }

  .proof-list span,
  .web-index {
    color: var(--righello-pink, #D6487E);
    font-weight: 800;
    font-size: 0.9rem;
  }

  .proof-list p {
    margin: 0;
    color: var(--text-primary);
    font-size: 1rem;
    line-height: 1.35;
  }

  .section-heading-row {
    display: grid;
    gap: 1rem;
    align-items: end;
    margin-bottom: 2rem;
  }

  .section-heading-row > p {
    max-width: 40rem;
    font-size: 1.08rem;
  }

  .case-section,
  .references-section,
  .featured-proof-section {
    background: var(--bg-secondary);
  }

  .client-proof-section {
    padding: 2.5rem 0 3.25rem;
    background: var(--bg-secondary);
  }

  #product-work,
  #case-study,
  #case-study-archive {
    scroll-margin-top: 7.5rem;
  }

  .client-proof-heading {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .client-proof-heading p {
    margin: 0;
    color: var(--text-primary);
    font-size: clamp(1.35rem, 4vw, 2.4rem);
    font-weight: 800;
    line-height: 1.05;
  }

  .seo-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .seo-chip-row span {
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.38rem 0.68rem;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.035);
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1;
  }

  .client-logo-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem;
  }

  .client-logo-tile {
    position: relative;
    isolation: isolate;
    min-height: 5.4rem;
    display: grid;
    place-items: center;
    border: 1px solid var(--border-color);
    border-radius: 1.1rem;
    padding: 0.8rem;
    overflow: hidden;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.072), rgba(255, 255, 255, 0.018)),
      var(--bg-primary);
  }

  .client-logo-tile::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(circle at 30% 12%, rgba(255, 255, 255, 0.12), transparent 4.5rem),
      linear-gradient(135deg, rgba(255, 255, 255, 0.035), transparent 62%);
    opacity: 0.6;
  }

  .client-logo-tile img {
    max-width: min(100%, 8.5rem);
    max-height: 2.35rem;
    object-fit: contain;
    filter: grayscale(1) brightness(1.85) contrast(0.98);
    opacity: 0.9;
  }

  .client-logo-tile img.no-filter {
    filter: none;
    opacity: 1;
  }

  .client-logo-tile img.logo-lift {
    max-width: min(100%, 8.95rem);
    max-height: 2.65rem;
    filter:
      grayscale(1)
      invert(1)
      brightness(1.35)
      contrast(0.96)
      drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.12));
    opacity: 0.92;
  }

  .client-logo-tile:hover img {
    opacity: 1;
    filter: grayscale(0.35) brightness(1.95) contrast(1.02);
  }

  .client-logo-tile:hover img.logo-lift {
    filter:
      grayscale(0.35)
      invert(1)
      brightness(1.42)
      contrast(1.02)
      drop-shadow(0 0 0.85rem rgba(255, 255, 255, 0.14));
  }

  .client-logo-tile:hover img.no-filter {
    filter: none;
  }

  .client-logo-tile img.logo-lift[src*='salotto'],
  .client-logo-tile img.logo-lift[src*='hotel-elite'],
  .client-logo-tile img.logo-lift[src*='hotel-michelangelo'] {
    max-height: 3.35rem;
  }

  .client-logo-tile img.logo-lift[src*='poles'] {
    max-width: min(100%, 8rem);
  }

  .client-logo-tile span {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 750;
    text-align: center;
  }

  .featured-proof-grid {
    display: grid;
    gap: 1rem;
  }

  .featured-proof-card {
    position: relative;
    isolation: isolate;
    display: flex;
    min-height: 27.5rem;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: clamp(1.45rem, 3vw, 2rem);
    padding: 1.25rem;
    color: var(--text-primary);
    background: #111;
    text-decoration: none;
    transform: translateZ(0);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
    transition: transform 0.34s ease, border-color 0.34s ease, box-shadow 0.34s ease;
  }

  .featured-proof-card__media,
  .featured-proof-card__shade {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .featured-proof-card__media {
    z-index: -3;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: var(--proof-media-opacity, 0.58);
    filter: var(--proof-media-filter, saturate(1) contrast(1));
    transform: scale(1.01);
    transition: transform 0.7s ease, opacity 0.7s ease, filter 0.7s ease;
  }

  .featured-proof-card__shade {
    z-index: -2;
    background:
      radial-gradient(circle at 18% 12%, rgba(214, 72, 126, 0.42), transparent 16rem),
      linear-gradient(180deg, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.16) 38%, rgba(0, 0, 0, 0.78) 100%),
      linear-gradient(90deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.26) 58%, rgba(0, 0, 0, 0.62));
  }

  .featured-proof-card::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.12), transparent 28%),
      linear-gradient(0deg, rgba(255, 255, 255, 0.035), transparent 42%);
    opacity: 0.72;
    pointer-events: none;
  }

  .featured-proof-card:hover {
    border-color: rgba(214, 72, 126, 0.5);
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.34);
    transform: translateY(-5px);
  }

  .featured-proof-card:hover .featured-proof-card__media {
    opacity: var(--proof-media-hover-opacity, 0.74);
    filter: var(--proof-media-hover-filter, saturate(1.08) contrast(1.04));
    transform: scale(1.065);
  }

  .featured-proof-card__top {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: rgba(255, 255, 255, 0.74);
    font-size: 0.82rem;
    font-weight: 850;
    line-height: 1.1;
  }

  .featured-proof-card__top em {
    color: rgba(255, 255, 255, 0.76);
    font-size: 1.25rem;
    font-style: normal;
  }

  .featured-proof-card__body {
    position: relative;
    z-index: 1;
    max-width: 24rem;
  }

  .featured-accent {
    display: inline-flex;
    width: fit-content;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    padding: 0.42rem 0.75rem;
    color: #fff;
    background: rgba(214, 72, 126, 0.86);
    font-size: 0.82rem;
    line-height: 1;
  }

  .featured-proof-card h3 {
    margin: 0.8rem 0 0.75rem;
    color: #fff;
    font-size: clamp(2.4rem, 7vw, 3.75rem);
    line-height: 0.88;
    font-weight: 900;
    text-shadow: 0 12px 34px rgba(0, 0, 0, 0.48);
  }

  .featured-proof-card p {
    max-width: 29rem;
    margin: 0 0 1rem;
    color: rgba(255, 255, 255, 0.78);
    font-size: 1.05rem;
    line-height: 1.42;
  }

  .proof-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .proof-chip-row span {
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    padding: 0.34rem 0.62rem;
    color: rgba(255, 255, 255, 0.72);
    background: rgba(0, 0, 0, 0.26);
    backdrop-filter: blur(10px);
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .featured-proof-card__cta {
    position: absolute;
    right: 1.2rem;
    bottom: 1.2rem;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 2.9rem;
    height: 2.9rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(14px);
    opacity: 0;
    transform: translate3d(0, 0.65rem, 0);
    transition: opacity 0.32s ease, transform 0.32s ease, background 0.32s ease;
  }

  .featured-proof-card:hover .featured-proof-card__cta {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .capability-proof-grid {
    display: grid;
    gap: 0.85rem;
    margin-top: 1rem;
  }

  .capability-proof-card {
    display: grid;
    gap: 0.7rem;
    border: 1px solid var(--border-color);
    border-radius: 1.25rem;
    padding: 1rem;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.018)),
      var(--bg-primary);
  }

  .capability-proof-card span {
    color: var(--righello-pink, #D6487E);
    font-size: 0.88rem;
    font-weight: 850;
  }

  .capability-proof-card h3 {
    margin: 0;
    font-size: 1.15rem;
    line-height: 1.1;
  }

  .capability-proof-card p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.96rem;
    line-height: 1.35;
  }

  .filter-bar {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    padding-bottom: 0.35rem;
    scrollbar-width: none;
  }

  .filter-bar::-webkit-scrollbar {
    display: none;
  }

  .filter-bar button {
    min-height: 44px;
    flex: 0 0 auto;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.55rem 1rem;
    color: var(--text-primary);
    background: var(--bg-primary);
    font-weight: 650;
    transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
  }

  .filter-bar button.active-filter {
    border-color: var(--righello-pink, #D6487E);
    background: var(--righello-pink, #D6487E);
    color: #fff;
  }

  .case-grid,
  .reference-grid {
    display: grid;
    gap: 1rem;
  }

  .case-card,
  .archive-card,
  .reference-card,
  .final-cta__inner {
    border: 1px solid var(--border-color);
    border-radius: 1.35rem;
    background: var(--bg-primary);
  }

  .case-card {
    position: relative;
    isolation: isolate;
    padding: clamp(1rem, 2vw, 1.35rem);
    min-height: 100%;
    overflow: hidden;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015) 58%, rgba(214, 72, 126, 0.045)),
      var(--bg-primary);
    transition: transform 0.24s ease, border-color 0.24s ease, background 0.24s ease;
  }

  .case-card__cover,
  .case-card__cover-shade {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .case-card__cover {
    z-index: -3;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.24;
    filter: saturate(0.9) contrast(1.08);
    transform: scale(1.02);
    transition: opacity 0.38s ease, transform 0.58s ease, filter 0.58s ease;
  }

  .case-card__cover-shade {
    z-index: -2;
    background:
      linear-gradient(90deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.54) 52%, rgba(0, 0, 0, 0.82)),
      linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.78));
  }

  .case-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(circle at 0% 0%, rgba(214, 72, 126, 0.18), transparent 17rem),
      radial-gradient(circle at 100% 80%, rgba(6, 182, 212, 0.08), transparent 18rem);
    opacity: 0.72;
    transition: opacity 0.24s ease;
  }

  .case-card:hover {
    border-color: rgba(214, 72, 126, 0.42);
    transform: translateY(-2px);
  }

  .case-card:hover .case-card__cover {
    opacity: 0.34;
    filter: saturate(1.03) contrast(1.12);
    transform: scale(1.055);
  }

  .case-card:hover::before {
    opacity: 1;
  }

  .case-index {
    position: absolute;
    right: 1rem;
    top: 0.85rem;
    z-index: 0;
    color: color-mix(in srgb, var(--text-primary) 5%, transparent);
    font-size: clamp(3.2rem, 10vw, 6.4rem);
    font-weight: 900;
    line-height: 1;
    pointer-events: none;
  }

  .case-card__main {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1rem;
  }

  .case-card__intro,
  .case-card__proof {
    min-width: 0;
  }

  .case-card__intro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .case-card__proof {
    display: grid;
    gap: 0.85rem;
  }

  .case-card__header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.9rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .client-mark {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 1rem;
    display: grid;
    place-items: center;
    border: 1px solid var(--border-color);
    background: #fff;
    overflow: hidden;
  }

  .client-mark img {
    max-width: 78%;
    max-height: 78%;
    object-fit: contain;
  }

  .client-mark span {
    color: #111;
    font-weight: 800;
    font-size: 1.35rem;
  }

  .case-card__header p {
    margin: 0 0 0.1rem;
    color: var(--righello-pink, #D6487E);
    font-size: 0.88rem;
    font-weight: 750;
  }

  .case-card__header h3,
  .reference-card h3 {
    margin: 0;
    font-size: clamp(1.55rem, 3vw, 2.05rem);
    line-height: 1.05;
  }

  .case-summary {
    margin: 0 0 1rem;
    color: var(--text-primary);
    font-size: clamp(1.04rem, 1.5vw, 1.22rem);
    line-height: 1.43;
  }

  .case-body {
    display: grid;
    gap: 0.75rem;
  }

  .case-body > div,
  .case-outcomes {
    border: 1px solid rgba(255, 255, 255, 0.085);
    border-radius: 1.1rem;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018)),
      rgba(255, 255, 255, 0.025);
    padding: 0.9rem;
  }

  .case-body span,
  .case-outcomes > span {
    display: inline-block;
    margin-bottom: 0.25rem;
    color: var(--righello-pink, #D6487E);
    font-size: 0.82rem;
    font-weight: 820;
    letter-spacing: -0.01em;
    text-transform: uppercase;
  }

  .case-body p,
  .value-list,
  .web-card p {
    color: var(--text-secondary);
    font-size: 1rem;
  }

  .tag-row,
  .reference-names {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .tag-row {
    margin-top: auto;
    padding-top: 0.2rem;
  }

  .tag-row span,
  .reference-names span {
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.32rem 0.65rem;
    color: var(--text-secondary);
    font-size: 0.88rem;
    line-height: 1.15;
  }

  .value-list {
    display: grid;
    gap: 0.45rem;
    margin: 0.65rem 0 0;
    padding: 0;
    list-style: none;
  }

  .value-list li {
    position: relative;
    padding-left: 1.1rem;
  }

  .value-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.68rem;
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 999px;
    background: var(--righello-pink, #D6487E);
  }

  .reference-link,
  .archive-links a,
  .web-card {
    color: var(--text-primary);
    text-decoration: none;
  }

  .reference-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 42px;
    margin-top: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    padding: 0.5rem 0.85rem;
    background: rgba(255, 255, 255, 0.035);
    font-weight: 750;
    line-height: 1.15;
    transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
  }

  .reference-link:hover {
    border-color: rgba(214, 72, 126, 0.42);
    background: rgba(214, 72, 126, 0.11);
    transform: translateY(-1px);
  }

  .digital-section {
    background:
      radial-gradient(circle at 12% 16%, rgba(214, 72, 126, 0.11), transparent 26rem),
      radial-gradient(circle at 88% 78%, rgba(6, 182, 212, 0.09), transparent 24rem),
      var(--bg-primary);
  }

  .archive-proof-section {
    background:
      linear-gradient(135deg, rgba(214, 72, 126, 0.08), rgba(6, 182, 212, 0.06)),
      var(--bg-primary);
  }

  .archive-proof-shell {
    display: grid;
    gap: 1.25rem;
  }

  .archive-proof-copy {
    max-width: 48rem;
  }

  .archive-proof-copy p:not(.section-subtitle) {
    color: var(--text-secondary);
    font-size: 1.08rem;
    line-height: 1.45;
  }

  .archive-proof-panel {
    min-width: 0;
    border: 1px solid var(--border-color);
    border-radius: 1.55rem;
    padding: 1rem;
    background:
      radial-gradient(circle at 0% 0%, rgba(214, 72, 126, 0.18), transparent 18rem),
      linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.02)),
      var(--bg-secondary);
  }

  .archive-proof-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .archive-proof-stats div {
    min-width: 0;
    min-height: 6.7rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--border-color);
    border-radius: 1.1rem;
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.04);
  }

  .archive-proof-stats strong {
    max-width: 100%;
    color: var(--text-primary);
    font-size: clamp(1.28rem, 3vw, 1.8rem);
    line-height: 1;
    font-weight: 900;
    overflow-wrap: anywhere;
  }

  .archive-proof-stats span {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.18;
    overflow-wrap: break-word;
  }

  .archive-proof-list {
    display: grid;
    gap: 0.65rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .archive-proof-list li {
    position: relative;
    border: 1px solid var(--border-color);
    border-radius: 1.1rem;
    padding: 0.7rem 0.85rem 0.7rem 2rem;
    color: var(--text-secondary);
    background: rgba(0, 0, 0, 0.16);
    font-size: 0.92rem;
    line-height: 1.25;
    overflow-wrap: break-word;
  }

  .archive-proof-list li::before {
    content: '';
    position: absolute;
    left: 0.85rem;
    top: 50%;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
    background: var(--righello-pink, #D6487E);
    transform: translateY(-50%);
  }

  .digital-copy {
    align-self: start;
    max-width: 58rem;
  }

  .digital-points,
  .archive-links {
    display: grid;
    gap: 0.7rem;
  }

  .digital-points {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 1.4rem;
  }

  .digital-points span {
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.65rem 0.8rem;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.035);
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1;
  }

  .web-grid {
    display: grid;
    gap: 1rem;
  }

  .web-card {
    position: relative;
    isolation: isolate;
    min-height: 23rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: clamp(1.55rem, 3vw, 2.2rem);
    padding: 1.2rem;
    overflow: hidden;
    background: #101010;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
    transform: translateZ(0);
    transition: transform 0.36s ease, border-color 0.36s ease, box-shadow 0.36s ease;
  }

  .web-card__media,
  .web-card__shade {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .web-card__media {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0.62;
    filter: saturate(0.95) contrast(1.04);
    transform: scale(1.02);
    transition: transform 0.72s ease, opacity 0.72s ease, filter 0.72s ease;
  }

  .web-card__media--logo {
    object-fit: contain;
    padding: 4.5rem 2.2rem;
    opacity: 0.42;
    filter: grayscale(0.15) brightness(1.4) contrast(1.05);
    background:
      radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.08), transparent 11rem),
      linear-gradient(145deg, rgba(214, 72, 126, 0.16), rgba(6, 182, 212, 0.08));
  }

  .web-card:hover .web-card__media--logo {
    opacity: 0.64;
    filter: grayscale(0) brightness(1.55) contrast(1.08);
  }

  .web-card__shade {
    z-index: 0;
    background:
      radial-gradient(circle at 16% 16%, rgba(214, 72, 126, 0.44), transparent 16rem),
      linear-gradient(180deg, rgba(0, 0, 0, 0.64) 0%, rgba(0, 0, 0, 0.2) 38%, rgba(0, 0, 0, 0.84) 100%),
      linear-gradient(90deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.26) 52%, rgba(0, 0, 0, 0.64));
  }

  .web-card--featured {
    border-color: rgba(214, 72, 126, 0.34);
  }

  .web-card:hover {
    border-color: rgba(214, 72, 126, 0.45);
    box-shadow: 0 32px 95px rgba(0, 0, 0, 0.34);
    transform: translateY(-5px);
  }

  .web-card:hover .web-card__media {
    opacity: 0.82;
    filter: saturate(1.08) contrast(1.08);
    transform: scale(1.075);
  }

  .web-card__top,
  .web-card__body {
    position: relative;
    z-index: 1;
  }

  .web-card__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    color: rgba(255, 255, 255, 0.74);
    font-size: 0.78rem;
    font-weight: 850;
    line-height: 1.15;
  }

  .web-card__top span {
    max-width: 15rem;
  }

  .web-card__top em {
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    flex: 0 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
    font-size: 1.2rem;
    font-style: normal;
    backdrop-filter: blur(12px);
    transition: transform 0.28s ease, background 0.28s ease;
  }

  .web-card:hover .web-card__top em {
    background: rgba(214, 72, 126, 0.7);
    transform: translate3d(0.12rem, -0.12rem, 0);
  }

  .web-index {
    display: inline-flex;
    width: fit-content;
    margin-bottom: 0.75rem;
    border-radius: 999px;
    padding: 0.42rem 0.62rem;
    color: #fff;
    background: rgba(214, 72, 126, 0.88);
    font-size: 0.78rem;
    font-weight: 900;
    line-height: 1;
  }

  .web-card h3 {
    margin: 0 0 0.75rem;
    color: #fff;
    font-size: clamp(2.05rem, 3.8vw, 3rem);
    line-height: 0.9;
    font-weight: 900;
    text-shadow: 0 12px 34px rgba(0, 0, 0, 0.48);
  }

  .web-card p {
    max-width: 27rem;
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.02rem;
    line-height: 1.42;
  }

  .web-card small {
    display: inline-flex;
    max-width: 100%;
    width: fit-content;
    margin-top: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    padding: 0.38rem 0.7rem;
    color: rgba(255, 255, 255, 0.72);
    background: rgba(0, 0, 0, 0.28);
    font-size: 0.78rem;
    font-weight: 750;
    line-height: 1.15;
    backdrop-filter: blur(10px);
  }

  .web-card b {
    display: inline-flex;
    width: fit-content;
    min-height: 2.45rem;
    margin-top: 1rem;
    border-radius: 999px;
    padding: 0.72rem 1rem;
    color: #fff;
    background: var(--righello-pink, #D6487E);
    font-size: 0.9rem;
    line-height: 1;
  }

  .production-section {
    background:
      linear-gradient(135deg, rgba(214, 72, 126, 0.08), rgba(6, 182, 212, 0.06)),
      var(--bg-primary);
  }

  .production-copy {
    max-width: 44rem;
  }

  .archive-card {
    padding: 1.1rem;
  }

  .archive-card > p {
    margin: 0 0 1rem;
    color: var(--text-muted);
    font-size: 0.95rem;
    font-weight: 750;
    text-transform: uppercase;
  }

  .archive-links a {
    display: flex;
    justify-content: space-between;
    gap: 0.9rem;
    min-height: 5.2rem;
    align-items: center;
    border: 1px solid var(--border-color);
    border-radius: 1.15rem;
    padding: 0.85rem 0.95rem;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.025);
    transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
  }

  .archive-links a:hover {
    border-color: rgba(214, 72, 126, 0.42);
    background: rgba(214, 72, 126, 0.09);
    transform: translateY(-1px);
  }

  .archive-links a > span:first-child {
    display: grid;
    min-width: 0;
    gap: 0.25rem;
  }

  .archive-links strong {
    color: var(--text-primary);
    font-size: 1rem;
    line-height: 1.15;
  }

  .archive-links small {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.3;
  }

  .archive-links a > span:last-child {
    width: 2.25rem;
    height: 2.25rem;
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.035);
  }

  .reference-card {
    padding: 1.1rem;
  }

  .reference-card h3 {
    margin-bottom: 1rem;
  }

  .final-cta {
    padding: 4rem 0 5rem;
    background: var(--bg-secondary);
  }

  .final-cta__inner {
    padding: 1.4rem;
    text-align: center;
    background:
      radial-gradient(circle at 50% 0%, rgba(214, 72, 126, 0.16), transparent 30rem),
      var(--bg-primary);
  }

  .final-cta h2 {
    max-width: 48rem;
    margin: 0 auto 1rem;
    font-size: clamp(2.35rem, 7vw, 5rem);
    line-height: 0.98;
    font-weight: 800;
  }

  .final-cta p:not(.section-subtitle) {
    max-width: 42rem;
    margin: 0 auto 1.5rem;
  }

  @media (min-width: 768px) {
    .projects-hero {
      padding-top: 9rem;
      padding-bottom: 5rem;
    }

    .hero-grid {
      grid-template-columns: minmax(0, 1.55fr) minmax(20rem, 0.8fr);
      align-items: end;
    }

    .hero-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      max-width: 44rem;
    }

    .hero-stats div {
      grid-template-columns: 1fr;
      align-content: space-between;
      min-height: 7rem;
      border-radius: 1.25rem;
      padding: 0.8rem;
    }

    .hero-stats strong {
      width: fit-content;
      min-width: 3.45rem;
    }

    .section-heading-row,
    .production-grid,
    .archive-proof-shell {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    }

    .digital-copy {
      max-width: 64rem;
    }

    .digital-points {
      max-width: 42rem;
    }

    .case-grid {
      grid-template-columns: 1fr;
      gap: 1.15rem;
    }

    .client-proof-heading {
      grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
      align-items: end;
    }

    .client-logo-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .capability-proof-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .featured-proof-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .featured-proof-card {
      min-height: 29rem;
      padding: 1.25rem;
    }

    .archive-proof-panel {
      padding: 1.2rem;
    }

    .archive-proof-stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .reference-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .web-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.1rem;
    }

    .case-card,
    .archive-card,
    .reference-card {
      padding: 1.35rem;
    }

    .case-card__main {
      grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
      align-items: stretch;
    }

    .case-card__intro {
      min-height: 100%;
      padding-right: 0.15rem;
    }

    .case-body {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .final-cta__inner {
      padding: 3rem;
    }
  }

  @media (min-width: 1120px) {
    .case-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }

    .featured-proof-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .featured-proof-card {
      min-height: 28.5rem;
      padding: 1.45rem;
    }

    .client-logo-grid {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }

    .web-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.2rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .web-card,
    .web-card__media,
    .web-card__top em,
    .filter-bar button,
    .featured-proof-card,
    .featured-proof-card__media,
    .featured-proof-card__cta {
      transition: none;
    }
  }
</style>
