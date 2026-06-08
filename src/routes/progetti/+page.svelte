<script lang="ts">
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
      value: ['Identita visiva piu premium', 'Libreria contenuti riutilizzabile', 'Materiali pronti per campagne e prenotazioni dirette'],
      services: ['Video production', 'Shooting fotografico', 'Social content', 'Advertising asset'],
      reference: 'https://www.instagram.com/elitehotelandspa/',
      logo: '/logos/hotel-elite.png',
    },
    {
      id: 'garden-hotel-michelangelo',
      name: 'Garden Hotel Michelangelo',
      sector: 'Hospitality',
      category: 'hospitality',
      summary: 'Storytelling visivo stagionale per elevare la percezione dell’hotel e parlare a un pubblico piu internazionale e premium.',
      challenge: 'Un hotel consolidato con prodotto forte, pronto a rendere la comunicazione piu curata, coerente e memorabile.',
      approach: 'Racconto di atmosfera, architettura ed esperienza ospite con produzioni pensate per durare nel tempo.',
      value: ['Percezione brand piu alta', 'Asset coerenti per canali organici e paid', 'Produzione non usa e getta'],
      services: ['Strategia contenuti', 'Produzione video', 'Fotografia', 'Storytelling hospitality'],
      reference: 'https://www.instagram.com/gardenhotelmichelangelo/',
      logo: '/logos/hotel-michelangelo.png',
    },
    {
      id: 'fiumedica',
      name: 'Fiumedica',
      sector: 'Medical & Healthcare',
      category: 'medical',
      summary: 'Comunicazione chiara e rassicurante per rendere l’expertise clinica piu comprensibile prima del primo appuntamento.',
      challenge: 'Una clinica privata con forte competenza medica, da raccontare con equilibrio, fiducia e standard adatti al settore.',
      approach: 'Contenuti pensati per rispondere alle domande dei pazienti, ridurre frizione e trasmettere cura senza linguaggio freddo.',
      value: ['Comunicazione piu chiara per il paziente', 'Fiducia prima del contatto', 'Posizionamento professionale piu solido'],
      services: ['Content strategy', 'Copywriting', 'Produzione contenuti', 'Posizionamento'],
      reference: 'https://www.instagram.com/fiumedica/',
    },
    {
      id: 'ricci-group',
      name: 'Ricci Group',
      sector: 'Automotive',
      category: 'automotive',
      summary: 'Contenuti automotive premium costruiti per portare il linguaggio visivo dei brand rappresentati dentro la comunicazione del concessionario.',
      challenge: 'Un concessionario premium deve vendere aspirazione, non solo schede tecniche e disponibilita veicoli.',
      approach: 'Approccio cinematografico alla presentazione dei modelli, con produzione ad alto volume in giornate organizzate.',
      value: ['Percezione premium piu alta', 'Materiale utile per organico e paid', 'Maggiore coerenza con i marchi rappresentati'],
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
      challenge: 'Parlare a un pubblico moderno e premium senza perdere autenticita, storia e legame con la terra.',
      approach: 'Narrativa visiva su tenuta, processo produttivo, artigianalita e persone dietro al vino.',
      value: ['Identita coerente con storia e qualita', 'Contenuti con appeal internazionale', 'Racconto piu forte per buyer, hospitality ed export'],
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
      challenge: 'Attrarre clientela professionale e corporate mantenendo chiara l’identita gastronomica.',
      approach: 'Produzione e contenuti dual-audience: ospiti individuali da un lato, organizzatori di eventi e aziende dall’altro.',
      value: ['Identita premium piu coerente', 'Materiali utili per vendita diretta e marketing eventi', 'Posizionamento B2B piu leggibile'],
      services: ['Food content', 'Shooting', 'Social strategy', 'Advertising asset'],
      reference: 'https://www.instagram.com/casarossaristobusiness/',
    },
  ];

  const webProjects = [
    { name: 'Neura', type: 'Web application custom / prodotto digitale', url: 'https://neura.wearerighello.com' },
    { name: 'Lumis', type: 'Web application custom / prodotto digitale', url: 'https://lumis.wearerighello.com' },
    { name: 'Porto Piccolo Apartments', type: 'Real estate / landing page validazione', url: 'https://portopiccolo-apartments-validation.wearerighello.com' },
    { name: 'Solero Sport Village', type: 'Sport & fitness / landing page validazione', url: 'https://solero-validation.wearerighello.com' },
    { name: 'TC Studio Immobiliare', type: 'Agenzia immobiliare / sito corporate', url: 'https://www.tcstudioimmobiliare.it' },
    { name: 'Clara Falomo', type: 'Personal brand / professionista', url: 'https://www.clarafalomo.it' },
    { name: 'Black & White S.r.l.s.', type: 'Corporate / sito aziendale', url: 'https://www.blackwhitesrls.com' },
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
      names: ['Elite Hotel & Spa', 'Garden Hotel Michelangelo', 'Casa Rossa', 'Busa del Sauc', 'Banshi Sushi'],
    },
    {
      title: 'Sport, eventi e territorio',
      names: ['Scuola Sci Piancavallo', 'Solero Sport Village', 'Noi Club', 'Barcolana', 'Comune di Pordenone'],
    },
    {
      title: 'Tech, web e business',
      names: ['3R Technology', 'Neura', 'Tomasella', 'Ricci Group', 'Fiumedica'],
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
      name: 'Progetti e case study Righello',
      url: 'https://www.wearerighello.com/progetti',
      description: 'Case study, produzioni e progetti web realizzati da Righello per aziende, hospitality, medical, automotive, eventi e brand territoriali.',
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
  ]);
</script>

<svelte:head>
  <title>Progetti e Case Study | Righello</title>
  <meta name="description" content="Case study, produzioni video, campagne, siti e sistemi digitali realizzati da Righello per aziende, hospitality, medical, automotive, eventi e brand territoriali." />
  <link rel="canonical" href="https://www.wearerighello.com/progetti" />
  <meta property="og:title" content="Progetti e Case Study | Righello" />
  <meta property="og:description" content="Una selezione di lavori Righello: contenuti, campagne, siti e sistemi digitali costruiti su misura." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/progetti" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Progetti e Case Study | Righello" />
  <meta name="twitter:description" content="Case study, produzioni, siti e sistemi digitali realizzati da Righello." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=3" />
  <script type="application/ld+json">{schema}</script>
</svelte:head>

<section class="projects-hero">
  <div class="section-container hero-grid">
    <RevealOnScroll animation="fly-up" duration={420}>
      <div class="hero-copy">
        <p class="section-subtitle">Progetti Righello</p>
        <h1 class="heading-xl hero-title">Case study e produzioni costruite sul contesto reale.</h1>
        <p class="hero-intro">
          Strategia, contenuti, advertising, siti e sistemi digitali su misura per aziende, hospitality,
          medical, automotive, eventi e brand territoriali.
        </p>
        <div class="hero-actions">
          <MagneticButton href="/contatti" variant="primary">Parliamo del tuo progetto</MagneticButton>
          <MagneticButton href="#case-study" variant="secondary">Guarda i casi</MagneticButton>
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="scale" delay={120} duration={420}>
      <aside class="proof-panel" aria-label="Sintesi portfolio Righello">
        <div class="proof-panel__top">
          <span>Portfolio</span>
          <strong>50+ clienti</strong>
        </div>
        <div class="proof-list">
          <div>
            <span>01</span>
            <p>Contenuti pensati come asset commerciali, non come post isolati.</p>
          </div>
          <div>
            <span>02</span>
            <p>Siti e prodotti digitali custom, con performance e struttura SEO.</p>
          </div>
          <div>
            <span>03</span>
            <p>Materiali riutilizzabili su organico, paid, vendita e presentazioni.</p>
          </div>
        </div>
      </aside>
    </RevealOnScroll>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section id="case-study" class="section-padding case-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div class="section-heading-row">
        <div>
          <p class="section-subtitle">Case study principali</p>
          <h2 class="section-title">Pochi casi, raccontati bene.</h2>
        </div>
        <p>
          Non pubblichiamo metriche riservate dei clienti. Qui mostriamo metodo, qualita produttiva,
          valore di comunicazione e capacita di creare asset che restano utili nel tempo.
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

<section class="section-padding digital-section">
  <div class="section-container digital-grid">
    <RevealOnScroll animation="fly-up" duration={360}>
      <div>
        <p class="section-subtitle">Web e prodotto digitale</p>
        <h2 class="section-title">Niente template usati come scorciatoia.</h2>
        <p class="section-intro">
          Progettiamo siti, landing e applicazioni custom con architettura pulita, performance,
          struttura SEO e sistemi pensati per evolvere con il business.
        </p>
      </div>
    </RevealOnScroll>

    <div class="web-list">
      {#each webProjects as project, i}
        <RevealOnScroll animation="fly-up" stagger={60} index={i} duration={320}>
          <a class="web-row" href={project.url} target="_blank" rel="noreferrer">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{project.name}</strong>
              <p>{project.type}</p>
            </div>
            <em aria-hidden="true">↗</em>
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
        <h2 class="section-title">Asset che lavorano oltre il giorno dello shooting.</h2>
        <p>
          Ogni produzione viene progettata per generare materiale riutilizzabile su social,
          campagne paid, sito web, presentazioni commerciali e materiali interni.
        </p>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="fly-up" delay={100} duration={360}>
      <div class="archive-card">
        <p>Archivio selezionato</p>
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
          <h2 class="section-title">Settori diversi, stesso metodo.</h2>
        </div>
        <p>
          In una conversazione commerciale scegliamo 2 o 3 esempi coerenti con il cliente.
          Il portfolio serve come prova mirata, non come elenco infinito di loghi.
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
        <h2>Hai bisogno di far capire meglio quello che vendi?</h2>
        <p>
          Raccontaci contesto, obiettivi e materiali disponibili. Ti aiutiamo a capire quali asset
          servono davvero: contenuti, campagne, sito, software o un sistema piu completo.
        </p>
        <MagneticButton href="/contatti" variant="primary">Richiedi una proposta</MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .projects-hero {
    padding: 7.5rem 0 4rem;
    background:
      radial-gradient(circle at 16% 20%, rgba(214, 72, 126, 0.18), transparent 28rem),
      radial-gradient(circle at 86% 18%, rgba(6, 182, 212, 0.13), transparent 26rem),
      var(--bg-primary);
  }

  .hero-grid,
  .digital-grid,
  .production-grid {
    display: grid;
    gap: 2rem;
  }

  .hero-copy {
    max-width: 58rem;
  }

  .hero-title {
    max-width: 62rem;
    margin-bottom: 1.5rem;
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

  .proof-panel {
    align-self: end;
    border: 1px solid var(--border-color);
    border-radius: 1.5rem;
    background: color-mix(in srgb, var(--bg-secondary) 90%, transparent);
    padding: 1.25rem;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
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
    background: rgba(255, 255, 255, 0.03);
  }

  .proof-list span,
  .web-row > span {
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
  .references-section {
    background: var(--bg-secondary);
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
    padding: 1.1rem;
    min-height: 100%;
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
    font-size: 1.55rem;
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
    background: var(--bg-primary);
  }

  .web-list,
  .archive-links {
    display: grid;
    gap: 0.7rem;
  }

  .web-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.85rem;
    align-items: center;
    min-height: 4.5rem;
    border: 1px solid var(--border-color);
    border-radius: 1.1rem;
    padding: 0.85rem;
    background: var(--bg-secondary);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .web-row:hover {
    border-color: rgba(214, 72, 126, 0.45);
    transform: translateY(-2px);
  }

  .web-row strong {
    display: block;
    line-height: 1.1;
  }

  .web-row p {
    margin: 0.2rem 0 0;
    line-height: 1.25;
  }

  .web-row em {
    color: var(--text-muted);
    font-style: normal;
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

    .section-heading-row,
    .digital-grid,
    .production-grid {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    }

    .case-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
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
  }

  @media (prefers-reduced-motion: reduce) {
    .web-row,
    .filter-bar button {
      transition: none;
    }
  }
</style>
