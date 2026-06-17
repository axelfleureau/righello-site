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
  };

  type WebProject = {
    name: string;
    type: string;
    url: string;
    summary: string;
    proof: string;
    ctaLabel: string;
    featured?: boolean;
  };

  type FeaturedProof = {
    name: string;
    label: string;
    href: string;
    intro: string;
    proof: string[];
    accent: string;
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
      featured: true,
    },
    {
      name: 'Lumis',
      type: 'Web application custom / prodotto digitale',
      url: 'https://lumis.wearerighello.com',
      summary: 'Applicazione web custom costruita come esperienza digitale proprietaria, non come semplice sito vetrina.',
      proof: 'Web app, interfaccia custom, sviluppo prodotto',
      ctaLabel: 'Visita Lumis',
      featured: true,
    },
    {
      name: 'Neura',
      type: 'Web application custom / prodotto digitale',
      url: 'https://neura.wearerighello.com',
      summary: 'Prodotto digitale con posizionamento, architettura informativa e interfaccia pensati per spiegare valore e funzione.',
      proof: 'UX, frontend, prodotto digitale',
      ctaLabel: 'Visita Neura',
    },
    {
      name: 'Porto Piccolo Apartments',
      type: 'Real estate / landing page commerciale',
      url: 'https://portopiccolo-apartments-validation.wearerighello.com',
      summary: 'Landing commerciale per chiarire proposta, pubblico e qualità del traffico prima di scalare.',
      proof: 'Landing, conversione, real estate',
      ctaLabel: 'Apri progetto',
    },
    {
      name: 'Solero Sport Village',
      type: 'Sport & fitness / landing page commerciale',
      url: 'https://solero-validation.wearerighello.com',
      summary: 'Esperienza web rapida e focalizzata per comunicare offerta, posizionamento e prossima azione.',
      proof: 'Landing, sport, lead generation',
      ctaLabel: 'Apri progetto',
    },
    {
      name: 'TC Studio Immobiliare',
      type: 'Agenzia immobiliare / sito corporate',
      url: 'https://www.tcstudioimmobiliare.it',
      summary: 'Sito corporate per rendere più chiara l’offerta e sostenere il contatto commerciale.',
      proof: 'Corporate website, UX, SEO base',
      ctaLabel: 'Visita sito',
    },
    {
      name: 'Clara Falomo',
      type: 'Personal brand / professionista',
      url: 'https://www.clarafalomo.it',
      summary: 'Presenza digitale personale, pulita e diretta, costruita per autorevolezza e contatto.',
      proof: 'Personal brand, sito, copy',
      ctaLabel: 'Visita sito',
    },
    {
      name: 'Black & White S.r.l.s.',
      type: 'Corporate / sito aziendale',
      url: 'https://www.blackwhitesrls.com',
      summary: 'Sito aziendale essenziale e credibile, pensato per far capire subito attività e affidabilità.',
      proof: 'Corporate website, struttura, contenuti',
      ctaLabel: 'Visita sito',
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
    },
    {
      name: 'Lumis',
      label: 'Web app su misura',
      href: 'https://lumis.wearerighello.com',
      intro: 'Un’esperienza digitale proprietaria, costruita per spiegare valore e funzione senza sembrare un template.',
      proof: ['Interfaccia custom', 'Frontend', 'Design system', 'Storytelling prodotto'],
      accent: 'Esperienza proprietaria',
    },
    {
      name: 'Neura',
      label: 'Prodotto digitale',
      href: 'https://neura.wearerighello.com',
      intro: 'Architettura informativa, UX e posizionamento per rendere comprensibile un prodotto digitale complesso.',
      proof: ['UX writing', 'Frontend', 'Posizionamento', 'Struttura commerciale'],
      accent: 'Chiarezza che vende',
    },
    {
      name: 'Contenuti',
      label: 'Produzioni e campagne',
      href: '#case-study-archive',
      intro: 'Shooting, video, social e advertising pensati per diventare materiali commerciali, non post isolati.',
      proof: ['Video', 'Foto', 'Paid asset', 'Materiali vendita'],
      accent: 'Asset riutilizzabili',
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
    { label: 'Portfolio completo', href: 'https://1drv.ms/f/c/8e8043fff9e6e829/IgCF6y9QuDYLSZIE7CyYG0fWAUmlUH8AJxGKvnIdEnaRXUc' },
    { label: 'Archivio produzioni video/foto', href: 'https://1drv.ms/f/c/8e8043fff9e6e829/IgCctAk1dekaSqNLIVfJmFMKAX-3qsFqNlK7m6SLOhBU4Ik' },
    { label: 'Casa Rossa', href: 'https://1drv.ms/f/c/8e8043fff9e6e829/IgA6sdW-66v4QoP1Rz4XVc76Aeed2ENOJ9zl0Z8KhOeDB8U' },
    { label: 'Tomasella', href: 'https://1drv.ms/f/c/8e8043fff9e6e829/IgDHhhDLOkg6SY_6Zn-g7008Ab9mChH_ASM4ggBLiYnT3c4' },
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
                class:no-filter={client.noFilter}
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
            <div class="featured-proof-card__top">
              <span>{proof.label}</span>
              <em>{proof.href.startsWith('http') ? '↗' : '→'}</em>
            </div>
            <strong class="featured-accent">{proof.accent}</strong>
            <h3>{proof.name}</h3>
            <p>{proof.intro}</p>
            <div class="proof-chip-row" aria-label={`Competenze coinvolte per ${proof.name}`}>
              {#each proof.proof as item}
                <span>{item}</span>
              {/each}
            </div>
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

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-secondary)" />

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
            <span class="case-index">{String(i + 1).padStart(2, '0')}</span>
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

            <div class="tag-row" aria-label="Servizi coinvolti">
              {#each study.services as service}
                <span>{service}</span>
              {/each}
            </div>

            <ul class="value-list">
              {#each study.value as item}
                <li>{item}</li>
              {/each}
            </ul>

            <a class="reference-link" href={study.reference} target="_blank" rel="noreferrer">
              Vedi riferimento pubblico
              <span aria-hidden="true">↗</span>
            </a>
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

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-primary)" />

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
            class="web-row"
            class:web-row--featured={project.featured}
            href={project.url}
            target={project.url.startsWith('http') ? '_blank' : undefined}
            rel={project.url.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={`${project.ctaLabel}: ${project.name}`}
          >
            <span class="web-index">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{project.name}</strong>
              <p>{project.type}</p>
              <small>{project.summary}</small>
              <span class="web-proof">{project.proof}</span>
            </div>
            <em aria-hidden="true">{project.url.startsWith('http') ? '↗' : '→'}</em>
            <b>{project.ctaLabel}</b>
          </a>
        </RevealOnScroll>
      {/each}
    </div>
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
        <p>Materiali pubblici selezionati</p>
        <div class="archive-links">
          {#each productionLinks as link}
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
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
    padding: 7.5rem 0 4rem;
    overflow: hidden;
    background:
      radial-gradient(circle at 12% 12%, rgba(214, 72, 126, 0.26), transparent 30rem),
      radial-gradient(circle at 92% 18%, rgba(6, 182, 212, 0.18), transparent 28rem),
      linear-gradient(145deg, rgba(255, 255, 255, 0.03), transparent 34rem),
      var(--bg-primary);
  }

  .hero-glass {
    position: absolute;
    inset: 6rem 1rem 1.35rem;
    z-index: -1;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.075);
    border-radius: clamp(1.5rem, 3vw, 2.35rem);
    background:
      radial-gradient(circle at 12% 0%, rgba(214, 72, 126, 0.14), transparent 34rem),
      radial-gradient(circle at 92% 8%, rgba(6, 182, 212, 0.12), transparent 30rem),
      linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.018)),
      rgba(255, 255, 255, 0.02);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 32px 90px rgba(0, 0, 0, 0.28);
    pointer-events: none;
  }

  .hero-glass::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.04), transparent 34%),
      linear-gradient(180deg, transparent 72%, rgba(0, 0, 0, 0.24));
    opacity: 0.82;
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
    border-radius: 1.65rem;
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
    min-height: 5.4rem;
    display: grid;
    place-items: center;
    border: 1px solid var(--border-color);
    border-radius: 1.1rem;
    padding: 0.8rem;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.018)),
      var(--bg-primary);
  }

  .client-logo-tile img {
    max-width: 8.5rem;
    max-height: 2.35rem;
    object-fit: contain;
    filter: grayscale(1) brightness(1.6) contrast(0.92);
    opacity: 0.82;
  }

  .client-logo-tile img.no-filter {
    filter: none;
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
    min-height: 27rem;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: 1.55rem;
    padding: 1.1rem;
    color: var(--text-primary);
    background:
      linear-gradient(160deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.018)),
      var(--bg-primary);
    text-decoration: none;
    transform: translateZ(0);
    transition: transform 0.24s ease, border-color 0.24s ease, background 0.24s ease;
  }

  .featured-proof-card::before,
  .featured-proof-card::after {
    content: '';
    position: absolute;
    z-index: -1;
    pointer-events: none;
  }

  .featured-proof-card::before {
    inset: -35% -25% auto;
    height: 19rem;
    border-radius: 999px;
    background:
      radial-gradient(circle at 35% 45%, rgba(214, 72, 126, 0.38), transparent 10rem),
      radial-gradient(circle at 70% 35%, rgba(6, 182, 212, 0.2), transparent 9rem);
    filter: blur(8px);
    opacity: 0.86;
  }

  .featured-proof-card::after {
    inset: 42% 1rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.15rem;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.018)),
      rgba(255, 255, 255, 0.02);
  }

  .featured-proof-card:hover {
    border-color: rgba(214, 72, 126, 0.48);
    transform: translateY(-4px);
  }

  .featured-proof-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: var(--text-secondary);
    font-size: 0.92rem;
    font-weight: 750;
  }

  .featured-proof-card__top em {
    color: var(--text-muted);
    font-size: 1.25rem;
    font-style: normal;
  }

  .featured-accent {
    display: inline-flex;
    width: fit-content;
    margin-top: auto;
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
    font-size: clamp(2.45rem, 10vw, 5rem);
    line-height: 0.9;
    font-weight: 900;
  }

  .featured-proof-card p {
    max-width: 29rem;
    margin: 0 0 1rem;
    color: var(--text-secondary);
    font-size: 1.05rem;
    line-height: 1.42;
  }

  .proof-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .proof-chip-row span {
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.34rem 0.62rem;
    color: var(--text-secondary);
    background: rgba(0, 0, 0, 0.18);
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.1;
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
    padding: 1.1rem;
    min-height: 100%;
    overflow: hidden;
    transition: transform 0.24s ease, border-color 0.24s ease, background 0.24s ease;
  }

  .case-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(circle at 10% 0%, rgba(214, 72, 126, 0.16), transparent 14rem),
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 55%);
    opacity: 0;
    transition: opacity 0.24s ease;
  }

  .case-card:hover {
    border-color: rgba(214, 72, 126, 0.42);
    transform: translateY(-3px);
  }

  .case-card:hover::before {
    opacity: 1;
  }

  .case-index {
    position: absolute;
    right: 1rem;
    top: 0.85rem;
    color: color-mix(in srgb, var(--text-muted) 55%, transparent);
    font-size: clamp(2.7rem, 8vw, 4.6rem);
    font-weight: 900;
    line-height: 1;
    pointer-events: none;
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
    margin-bottom: 1.1rem;
    color: var(--text-primary);
    font-size: 1.12rem;
    line-height: 1.4;
  }

  .case-body {
    display: grid;
    gap: 0.9rem;
    margin-bottom: 1rem;
  }

  .case-body span {
    display: inline-block;
    margin-bottom: 0.25rem;
    color: var(--text-muted);
    font-size: 0.82rem;
    font-weight: 750;
    text-transform: uppercase;
  }

  .case-body p,
  .value-list,
  .web-row p {
    color: var(--text-secondary);
    font-size: 1rem;
  }

  .tag-row,
  .reference-names {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
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
    margin: 1rem 0;
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
  .web-row {
    color: var(--text-primary);
    text-decoration: none;
  }

  .reference-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 750;
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .archive-proof-stats div {
    min-height: 7rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--border-color);
    border-radius: 1.1rem;
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.04);
  }

  .archive-proof-stats strong {
    color: var(--text-primary);
    font-size: clamp(1.45rem, 6vw, 2.25rem);
    line-height: 0.95;
    font-weight: 900;
  }

  .archive-proof-stats span {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.18;
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
    border-radius: 999px;
    padding: 0.7rem 0.85rem 0.7rem 2rem;
    color: var(--text-secondary);
    background: rgba(0, 0, 0, 0.16);
    font-size: 0.92rem;
    line-height: 1.25;
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
    gap: 0.85rem;
  }

  .web-row {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.85rem;
    align-items: start;
    min-height: 8.25rem;
    border: 1px solid var(--border-color);
    border-radius: 1.35rem;
    padding: 1rem;
    overflow: hidden;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02)),
      var(--bg-secondary);
    transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
  }

  .web-row::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(circle at 0% 0%, rgba(214, 72, 126, 0.2), transparent 16rem),
      radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.14), transparent 16rem);
    opacity: 0;
    transition: opacity 0.22s ease;
  }

  .web-row--featured {
    min-height: 11rem;
    border-color: rgba(214, 72, 126, 0.34);
  }

  .web-row:hover {
    border-color: rgba(214, 72, 126, 0.45);
    transform: translateY(-2px);
  }

  .web-row:hover::before,
  .web-row--featured::before {
    opacity: 1;
  }

  .web-row strong {
    display: block;
    font-size: clamp(1.55rem, 3.5vw, 2.45rem);
    line-height: 1.1;
  }

  .web-row p {
    margin: 0.2rem 0 0;
    line-height: 1.25;
  }

  .web-row small {
    display: block;
    margin-top: 0.85rem;
    color: var(--text-primary);
    font-size: 1rem;
    line-height: 1.35;
  }

  .web-proof {
    display: inline-flex;
    width: fit-content;
    margin-top: 0.85rem;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.38rem 0.65rem;
    color: var(--text-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1.15;
  }

  .web-row em {
    color: var(--text-muted);
    font-size: 1.35rem;
    font-style: normal;
  }

  .web-row b {
    grid-column: 2 / -1;
    width: fit-content;
    border-radius: 999px;
    padding: 0.65rem 0.9rem;
    color: #fff;
    background: var(--righello-pink, #D6487E);
    font-size: 0.92rem;
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
    gap: 1rem;
    min-height: 44px;
    align-items: center;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.65rem 0.9rem;
    font-weight: 700;
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
    .digital-shell,
    .production-grid,
    .archive-proof-shell {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    }

    .digital-copy {
      position: sticky;
      top: 7.5rem;
    }

    .case-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .client-proof-heading {
      grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
      align-items: end;
    }

    .client-logo-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .featured-proof-grid,
    .capability-proof-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .featured-proof-card {
      min-height: 31rem;
      padding: 1.25rem;
    }

    .featured-proof-grid > :first-child {
      grid-column: span 2;
    }

    .archive-proof-panel {
      padding: 1.2rem;
    }

    .archive-proof-stats {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .reference-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .case-card,
    .archive-card,
    .reference-card {
      padding: 1.35rem;
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
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .featured-proof-card {
      min-height: 34rem;
      padding: 1.45rem;
    }

    .client-logo-grid {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .web-row,
    .filter-bar button,
    .featured-proof-card {
      transition: none;
    }
  }
</style>
