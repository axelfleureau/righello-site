<script lang="ts">
  type IconKey = 'percent' | 'wallet' | 'fund' | 'users' | 'brain' | 'chart' | 'file' | 'bot' | 'search' | 'dashboard' | 'quote' | 'workflow';

  const officialSourceUrl = 'https://www.consiglio.regione.fvg.it/pagineinterne/Portale/comunicatiStampaDettaglio.aspx?ID=944263';

  const icons: Record<IconKey, string> = {
    percent: '<path d="M19 5 5 19"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
    wallet: '<path d="M20 7H5a2 2 0 0 0 0 4h15v8H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14v4"/><path d="M16 13h.01"/>',
    fund: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15v-4"/><path d="M12 15V8"/><path d="M16 15v-6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    brain: '<path d="M9.5 2a3.5 3.5 0 0 0-3.35 4.5A3.5 3.5 0 0 0 5 13.25 4 4 0 0 0 9 20h1V2z"/><path d="M14.5 2a3.5 3.5 0 0 1 3.35 4.5A3.5 3.5 0 0 1 19 13.25 4 4 0 0 1 15 20h-1V2z"/><path d="M10 8H7"/><path d="M17 8h-3"/><path d="M10 14H7"/><path d="M17 14h-3"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    bot: '<path d="M12 8V4"/><rect x="4" y="8" width="16" height="12" rx="3"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M9 13h.01"/><path d="M15 13h.01"/><path d="M9 17h6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M8 11h6"/><path d="M11 8v6"/>',
    dashboard: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 17V9"/><path d="M12 17v-5"/><path d="M16 17v-8"/>',
    quote: '<path d="M4 7h16"/><path d="M4 12h10"/><path d="M4 17h7"/><path d="M17 14l3 3-3 3"/>',
    workflow: '<path d="M6 3v6a3 3 0 0 0 3 3h6"/><path d="M18 21v-6a3 3 0 0 0-3-3H9"/><circle cx="6" cy="3" r="2"/><circle cx="18" cy="21" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="6" cy="12" r="2"/>',
  };

  const grantCards = [
    { title: 'Fino al 75% coperto', text: 'Per ogni euro investito in un progetto AI, la Regione può coprirne fino a 75 centesimi.', icon: 'percent' },
    { title: 'Fino a 10.000€', text: 'Un aiuto concreto per partire con un progetto utile, senza bloccare mesi di budget.', icon: 'wallet' },
    { title: 'Fondo da 1 milione €', text: 'Le risorse previste non sono infinite. Chi arriva preparato parte meglio.', icon: 'fund' },
    { title: 'Per realtà FVG', text: 'Pensato per micro e piccole imprese e liberi professionisti con sede in Friuli Venezia Giulia.', icon: 'users' },
    { title: 'AI più formazione', text: 'Non solo strumenti: anche metodo, persone e uso quotidiano dentro l’azienda.', icon: 'brain' },
    { title: 'Meno sprechi operativi', text: 'Obiettivo semplice: risparmiare tempo, ridurre errori e aumentare produttività.', icon: 'chart' },
  ] satisfies Array<{ title: string; text: string; icon: IconKey }>;

  const useCases = [
    { title: 'Automazione documentale', text: 'Lettura intelligente di PDF, email, allegati e documentazione aziendale.', icon: 'file' },
    { title: 'Assistenti AI', text: 'Chat aziendali addestrate sui documenti e sulle procedure interne.', icon: 'bot' },
    { title: 'Knowledge Base Aziendale', text: 'Trasforma anni di documentazione in un motore di ricerca intelligente.', icon: 'search' },
    { title: 'Analisi Dati', text: 'Dashboard, KPI e strumenti di supporto alle decisioni.', icon: 'dashboard' },
    { title: 'Preventivi e Offerte', text: 'Riduci i tempi di preparazione delle offerte commerciali.', icon: 'quote' },
    { title: 'Workflow e Processi', text: 'Elimina attività ripetitive e riduci gli errori.', icon: 'workflow' },
  ] satisfies Array<{ title: string; text: string; icon: IconKey }>;

  const processSteps = [
    { title: 'Analisi gratuita', text: 'Guardiamo come lavorate oggi e dove si perde più tempo.' },
    { title: 'Opportunità ad alto impatto', text: 'Scegliamo un caso d’uso AI che abbia senso davvero: meno lavoro manuale, meno errori, più velocità.' },
    { title: 'Progetto chiaro', text: 'Mettiamo in fila obiettivo, costi, benefici e cosa serve per partire senza confusione.' },
    { title: 'Realizzazione', text: 'Sviluppiamo e integriamo la soluzione nel flusso di lavoro, pensando anche alle persone che la useranno.' },
  ];

  const examples = [
    { title: 'Azienda manifatturiera', points: ['Preventivi automatici', 'Documentazione tecnica', 'Controllo qualità'] },
    { title: 'Studio professionale', points: ['Gestione documenti', 'Ricerca normativa', 'Assistente interno'] },
    { title: 'PMI commerciale', points: ['CRM intelligente', 'Email automatiche', 'Supporto vendite'] },
  ];

  const faqs = [
    {
      question: 'Chi può partecipare?',
      answer: 'Dalle informazioni pubbliche, il bando è pensato per micro e piccole imprese e liberi professionisti con sede legale o operativa in Friuli Venezia Giulia.',
    },
    {
      question: 'Quanto posso ottenere?',
      answer: 'Il contributo può arrivare fino al 75% dell’investimento, con un massimo di 10.000 euro per progetto.',
    },
    {
      question: 'Posso finanziare software su misura?',
      answer: 'Sì, se il progetto rientra nell’adozione di tecnologie basate sull’intelligenza artificiale. I dettagli finali dipenderanno dal bando ufficiale.',
    },
    {
      question: 'Serve già un progetto definito?',
      answer: 'No. La prima consulenza serve proprio a trasformare un problema operativo in un progetto AI chiaro e realizzabile.',
    },
    {
      question: 'Righello segue anche la parte progettuale?',
      answer: 'Sì. Ti aiutiamo a capire dove usare l’AI, a progettare la soluzione e a realizzarla con un approccio concreto.',
    },
    {
      question: 'Quanto dura la consulenza iniziale?',
      answer: 'Circa 30 minuti. È gratuita e serve a capire requisiti, priorità e primi casi d’uso possibili.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': 'https://www.wearerighello.com/bando-intelligenza-artificiale-fvg-2026#faq',
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
        '@type': 'LocalBusiness',
        '@id': 'https://www.wearerighello.com/#localbusiness',
        name: 'Righello S.r.l.',
        url: 'https://www.wearerighello.com',
        image: 'https://www.wearerighello.com/logo-full.png',
        email: 'hello@wearerighello.com',
        priceRange: '€€€',
        vatID: 'IT01979970934',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Pio X 21',
          addressLocality: 'Mestre',
          addressRegion: 'Venezia',
          addressCountry: 'IT',
        },
        areaServed: ['Friuli-Venezia Giulia', 'Pordenone', 'Udine', 'Gorizia', 'Trieste', 'Mestre', 'Venezia'],
        description: 'Righello S.r.l. progetta siti web, software, automazioni e soluzioni di Intelligenza Artificiale per aziende, PMI e professionisti.',
      },
    ],
  };

  let formData = {
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  };

  let isSubmitting = false;
  let submitStatus: 'idle' | 'success' | 'error' = 'idle';
  let submitMessage = '';

  async function handleSubmit() {
    if (isSubmitting) return;

    isSubmitting = true;
    submitStatus = 'idle';
    submitMessage = '';

    const message = [
      formData.phone ? `Telefono: ${formData.phone}` : '',
      'Richiesta: consulenza gratuita per Bando Intelligenza Artificiale FVG 2026',
      formData.message,
    ].filter(Boolean).join('\n\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          service: 'Bando Intelligenza Artificiale FVG 2026',
          budget: 'Da definire - contributo fino a 10.000€',
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Errore durante l’invio');
      }

      submitStatus = 'success';
      submitMessage = 'Richiesta inviata. Ti ricontatteremo entro 72 ore lavorative.';
      formData = { name: '', company: '', email: '', phone: '', message: '' };
    } catch (error) {
      submitStatus = 'error';
      submitMessage = error instanceof Error ? error.message : 'Errore durante l’invio. Riprova più tardi.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Bando Intelligenza Artificiale FVG 2026 | Righello</title>
  <meta name="description" content="Ottieni fino a 10.000€ a fondo perduto per progetti di Intelligenza Artificiale in Friuli Venezia Giulia. Consulenza gratuita con Righello." />
  <link rel="canonical" href="https://www.wearerighello.com/bando-intelligenza-artificiale-fvg-2026" />
  <meta property="og:title" content="Bando Intelligenza Artificiale FVG 2026 | Righello" />
  <meta property="og:description" content="Ottieni fino a 10.000€ a fondo perduto per progetti di Intelligenza Artificiale in Friuli Venezia Giulia. Consulenza gratuita con Righello." />
  <meta property="og:url" content="https://www.wearerighello.com/bando-intelligenza-artificiale-fvg-2026" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Bando Intelligenza Artificiale FVG 2026 | Righello" />
  <meta name="twitter:description" content="Ottieni fino a 10.000€ a fondo perduto per progetti di Intelligenza Artificiale in Friuli Venezia Giulia. Consulenza gratuita con Righello." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=3" />
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<div class="ai-grant-page">
  <section class="hero-section">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="section-container hero-grid">
      <div class="hero-copy stagger-group">
        <a class="source-pill" href={officialSourceUrl} target="_blank" rel="noopener noreferrer">
          Opportunità AI per aziende FVG
        </a>
        <h1>Bando AI FVG 2026: fino a 10.000€ per portare l’AI nella tua azienda</h1>
        <p class="hero-subtitle">
          La Regione Friuli Venezia Giulia può coprire fino al 75% dell’investimento. Righello ti aiuta a capire dove usare l’AI, scegliere un progetto utile e trasformarlo in una soluzione pronta per lavorare meglio.
        </p>
        <div class="hero-actions" aria-label="Azioni principali">
          <a class="primary-cta" href="#consulenza">Richiedi una consulenza gratuita</a>
          <a class="secondary-cta" href="#requisiti">Verifica i requisiti</a>
        </div>
        <div class="badge-row" aria-label="Punti chiave del bando">
          <span><span aria-hidden="true">✓</span> Fino al 75% a fondo perduto</span>
          <span><span aria-hidden="true">✓</span> Fino a 10.000€</span>
          <span><span aria-hidden="true">✓</span> Per imprese e professionisti FVG</span>
        </div>
      </div>

      <div class="hero-panel" aria-label="Sintesi contributo">
        <div class="panel-topline">In pratica</div>
        <div class="grant-number">75%</div>
        <p>del progetto può essere coperto dal contributo regionale</p>
        <div class="panel-divider"></div>
        <div class="panel-stats">
          <div>
            <strong>10.000€</strong>
            <span>massimo previsto</span>
          </div>
          <div>
            <strong>1M€</strong>
            <span>fondo disponibile</span>
          </div>
        </div>
        <a class="panel-link" href="#consulenza">Partiamo dal tuo processo</a>
      </div>
    </div>
  </section>

  <section id="requisiti" class="section-padding">
    <div class="section-container">
      <div class="landing-section-header">
        <p>Cosa prevede</p>
        <h2>Un incentivo per portare l’AI dove serve davvero</h2>
      </div>

      <div class="card-grid">
        {#each grantCards as card}
          <article class="feature-card">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {@html icons[card.icon]}
              </svg>
            </div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        {/each}
      </div>

      <p class="source-note">
        Le informazioni sono basate sulle comunicazioni pubbliche della Regione Friuli Venezia Giulia. Aggiorneremo questa pagina quando uscirà la documentazione definitiva.
      </p>
    </div>
  </section>

  <section class="section-padding muted-section">
    <div class="section-container">
      <div class="landing-section-header">
        <p>Cosa puoi fare</p>
        <h2>Non “AI generica”. Soluzioni che fanno risparmiare ore ogni settimana</h2>
      </div>

      <div class="use-case-grid">
        {#each useCases as item}
          <article class="use-case-card">
            <div class="icon-box compact">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {@html icons[item.icon]}
              </svg>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section-padding">
    <div class="section-container">
      <div class="landing-section-header left">
        <p>Come lavora Righello</p>
        <h2>Prima capiamo il lavoro. Poi scegliamo l’AI giusta.</h2>
      </div>

      <div class="timeline">
        {#each processSteps as step, index}
          <article class="timeline-item">
            <div class="timeline-number">{index + 1}</div>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section-padding muted-section">
    <div class="section-container">
      <div class="landing-section-header">
        <p>Esempi concreti</p>
        <h2>Da dove potresti partire</h2>
      </div>

      <div class="example-grid">
        {#each examples as example}
          <article class="example-card">
            <h3>{example.title}</h3>
            <ul>
              {#each example.points as point}
                <li>
                  <span aria-hidden="true"></span>
                  {point}
                </li>
              {/each}
            </ul>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section-padding urgency-section">
    <div class="section-container urgency-grid">
      <div>
        <p class="eyebrow">Perché muoversi subito</p>
        <h2>Le risorse sono limitate</h2>
        <p>
          Il fondo disponibile è pari a 1 milione di euro. Prepararsi in anticipo significa scegliere il progetto giusto, capire quanto investire e non arrivare all’apertura dello sportello con idee confuse.
        </p>
      </div>
      <div class="counter-card" aria-label="Contatore visuale risorse bando">
        <div class="counter-label">
          <span>Fondo previsto</span>
          <strong>1.000.000€</strong>
        </div>
        <div class="progress-track">
          <div class="progress-bar"></div>
        </div>
        <div class="counter-details">
          <span>Idea AI chiara</span>
          <span>Investimento stimato</span>
          <span>Progetto pronto da presentare</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding">
    <div class="section-container faq-layout">
      <div class="landing-section-header left">
        <p>FAQ</p>
        <h2>Le domande che ci farebbe un imprenditore, non un ufficio tecnico</h2>
      </div>
      <div class="faq-list">
        {#each faqs as faq}
          <details>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        {/each}
      </div>
    </div>
  </section>

  <section id="consulenza" class="section-padding final-cta-section">
    <div class="section-container cta-grid">
      <div class="final-copy">
        <p class="eyebrow">Consulenza gratuita</p>
        <h2>Scopri se la tua azienda può ottenere il contributo</h2>
        <p>In 30 minuti capiamo se ha senso muoversi, quali processi migliorare e quale progetto AI può portare più valore.</p>
        <div class="final-points">
          <span>Requisiti</span>
          <span>Idea progetto</span>
          <span>Prossimi passi</span>
        </div>
      </div>

      <form class="lead-form" on:submit|preventDefault={handleSubmit}>
        <label>
          Nome
          <input bind:value={formData.name} name="name" type="text" autocomplete="name" required />
        </label>
        <label>
          Azienda
          <input bind:value={formData.company} name="company" type="text" autocomplete="organization" />
        </label>
        <label>
          Email
          <input bind:value={formData.email} name="email" type="email" autocomplete="email" required />
        </label>
        <label>
          Telefono
          <input bind:value={formData.phone} name="phone" type="tel" autocomplete="tel" />
        </label>
        <label class="full">
          Messaggio
          <textarea bind:value={formData.message} name="message" rows="5" required placeholder="Raccontaci quale attività vorresti velocizzare o semplificare"></textarea>
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Invio in corso...' : 'Richiedi la consulenza gratuita'}
        </button>
        {#if submitMessage}
          <p class:success-message={submitStatus === 'success'} class:error-message={submitStatus === 'error'}>
            {submitMessage}
          </p>
        {/if}
      </form>
    </div>
  </section>

  <section class="disclaimer-section">
    <div class="section-container">
      <p>
        Righello S.r.l. non è l’ente erogatore del contributo. Le informazioni riportate hanno finalità divulgativa e saranno aggiornate in base alla documentazione ufficiale pubblicata dalla Regione Friuli Venezia Giulia.
      </p>
    </div>
  </section>
</div>

<style>
  :global(html) {
    scroll-padding-top: 6rem;
  }

  .ai-grant-page {
    color: var(--text-primary);
    background:
      radial-gradient(circle at top left, rgba(214, 72, 126, 0.18), transparent 32rem),
      radial-gradient(circle at 82% 18%, rgba(6, 182, 212, 0.16), transparent 30rem),
      var(--bg-primary);
    overflow-x: clip;
  }

  .hero-section {
    position: relative;
    min-height: min(740px, 100svh);
    padding: 6.4rem 0 3rem;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: 4rem 4rem;
    mask-image: linear-gradient(to bottom, black, transparent 82%);
  }

  .hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 2rem;
  }

  .hero-copy {
    max-width: 56rem;
  }

  .source-pill,
  .eyebrow {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    padding: 0.55rem 0.85rem;
    border: 1px solid rgba(214, 72, 126, 0.3);
    border-radius: 999px;
    background: rgba(214, 72, 126, 0.08);
    color: #f0a4c1;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero-copy h1,
  .final-copy h2,
  .urgency-section h2,
  .landing-section-header h2 {
    color: var(--text-primary);
    letter-spacing: 0;
  }

  .hero-copy h1 {
    margin-top: 1.25rem;
    font-size: clamp(2.25rem, 5.1vw, 4rem);
    line-height: 1.02;
    font-weight: 800;
    max-width: 18ch;
  }

  .hero-subtitle {
    max-width: 48rem;
    margin-top: 1.5rem;
    color: var(--text-secondary);
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.45;
  }

  .hero-actions,
  .badge-row,
  .final-points {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 1.6rem;
  }

  .primary-cta,
  .secondary-cta,
  .panel-link,
  .lead-form button {
    min-height: 3.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding: 0.9rem 1.25rem;
    font-weight: 800;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .primary-cta,
  .lead-form button {
    background: linear-gradient(135deg, #d6487e, #06b6d4);
    color: white;
    box-shadow: 0 1.2rem 3rem rgba(214, 72, 126, 0.28);
  }

  .secondary-cta {
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.05);
  }

  .primary-cta:hover,
  .secondary-cta:hover,
  .panel-link:hover,
  .lead-form button:hover {
    transform: translateY(-2px);
  }

  .badge-row span,
  .final-points span {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 2.5rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 0.55rem 0.8rem;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.04);
    font-size: 0.92rem;
  }

  .badge-row span span {
    min-height: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: #70e1c8;
    font-weight: 900;
  }

  .hero-panel,
  .counter-card,
  .lead-form {
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.035));
    box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(18px);
  }

  .hero-panel {
    padding: 1.4rem;
    border-radius: 1.25rem;
  }

  .panel-topline {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .grant-number {
    margin-top: 0.75rem;
    font-size: clamp(5rem, 24vw, 8rem);
    line-height: 0.88;
    font-weight: 900;
    background: linear-gradient(135deg, #ffffff, #f0a4c1 55%, #83e6f4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-panel p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.45;
  }

  .panel-divider {
    height: 1px;
    margin: 1.25rem 0;
    background: var(--border-color);
  }

  .panel-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .panel-stats div {
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.06);
    padding: 0.85rem;
  }

  .panel-stats strong {
    display: block;
    font-size: 1.6rem;
    line-height: 1;
  }

  .panel-stats span {
    display: block;
    margin-top: 0.35rem;
    color: var(--text-muted);
    font-size: 0.84rem;
    line-height: 1.2;
  }

  .panel-link {
    width: 100%;
    margin-top: 1rem;
    color: white;
    background: rgba(214, 72, 126, 0.9);
  }

  .landing-section-header {
    max-width: 48rem;
    margin: 0 auto 2.25rem;
    text-align: center;
  }

  .landing-section-header.left {
    margin-left: 0;
    text-align: left;
  }

  .landing-section-header p {
    margin-bottom: 0.65rem;
    color: #d6487e;
    font-size: 0.86rem;
    font-weight: 800;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .landing-section-header h2,
  .final-copy h2,
  .urgency-section h2 {
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1;
    font-weight: 850;
  }

  .card-grid,
  .use-case-grid,
  .example-grid {
    display: grid;
    gap: 1rem;
  }

  .feature-card,
  .use-case-card,
  .example-card,
  .timeline-item {
    border: 1px solid var(--border-color);
    border-radius: 0.8rem;
    background: rgba(255, 255, 255, 0.045);
  }

  .feature-card,
  .example-card {
    padding: 1.15rem;
  }

  .feature-card h3,
  .use-case-card h3,
  .example-card h3,
  .timeline-item h3 {
    color: var(--text-primary);
    font-size: 1.2rem;
    font-weight: 800;
    line-height: 1.05;
  }

  .feature-card p,
  .use-case-card p,
  .timeline-item p,
  .urgency-section p,
  .final-copy p,
  .source-note,
  .disclaimer-section p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.55;
  }

  .feature-card p,
  .use-case-card p,
  .timeline-item p {
    margin-top: 0.55rem;
  }

  .icon-box {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 0.75rem;
    color: #ffffff;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.85), rgba(6, 182, 212, 0.78));
  }

  .icon-box.compact {
    width: 2.6rem;
    height: 2.6rem;
    margin: 0;
    flex: 0 0 auto;
  }

  .icon-box svg {
    width: 1.35rem;
    height: 1.35rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .source-note {
    margin-top: 1rem;
    padding: 1rem;
    border-left: 3px solid #d6487e;
    border-radius: 0.45rem;
    background: rgba(214, 72, 126, 0.08);
  }

  .muted-section {
    background: rgba(255, 255, 255, 0.025);
  }

  .use-case-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }

  .timeline {
    display: grid;
    gap: 0.85rem;
    position: relative;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .timeline-number {
    width: 2.6rem;
    height: 2.6rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: #ffffff;
    color: #050505;
    font-weight: 900;
  }

  .example-card ul {
    display: grid;
    gap: 0.7rem;
    margin-top: 1.25rem;
  }

  .example-card li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-secondary);
    font-size: 1rem;
  }

  .example-card li span {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    background: #70e1c8;
  }

  .urgency-section {
    background:
      linear-gradient(135deg, rgba(214, 72, 126, 0.16), rgba(6, 182, 212, 0.12)),
      var(--bg-secondary);
  }

  .urgency-grid,
  .cta-grid,
  .faq-layout {
    display: grid;
    gap: 2rem;
  }

  .urgency-section h2,
  .final-copy h2 {
    margin-top: 1rem;
  }

  .urgency-section p,
  .final-copy p {
    max-width: 42rem;
    margin-top: 1rem;
  }

  .counter-card {
    border-radius: 1.1rem;
    padding: 1.2rem;
  }

  .counter-label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }

  .counter-label span {
    color: var(--text-secondary);
    font-size: 0.92rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .counter-label strong {
    color: var(--text-primary);
    font-size: clamp(1.8rem, 8vw, 3rem);
    line-height: 1;
  }

  .progress-track {
    height: 0.9rem;
    margin: 1.4rem 0 1rem;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
  }

  .progress-bar {
    width: 74%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #70e1c8, #d6487e);
  }

  .counter-details {
    display: grid;
    gap: 0.6rem;
  }

  .counter-details span {
    min-height: 2.5rem;
    display: flex;
    align-items: center;
    border-radius: 0.65rem;
    padding: 0.55rem 0.75rem;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.055);
    font-size: 0.95rem;
  }

  .faq-list {
    display: grid;
    gap: 0.75rem;
  }

  details {
    border: 1px solid var(--border-color);
    border-radius: 0.8rem;
    background: rgba(255, 255, 255, 0.045);
  }

  summary {
    min-height: 3.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    color: var(--text-primary);
    cursor: pointer;
    font-weight: 800;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::after {
    content: '+';
    flex: 0 0 auto;
    color: #d6487e;
    font-size: 1.5rem;
    line-height: 1;
  }

  details[open] summary::after {
    content: '-';
  }

  details p {
    padding: 0 1rem 1rem;
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.55;
  }

  .final-cta-section {
    background: var(--bg-secondary);
  }

  .lead-form {
    display: grid;
    gap: 0.9rem;
    border-radius: 1.1rem;
    padding: 1rem;
  }

  .lead-form label {
    display: grid;
    gap: 0.45rem;
    color: var(--text-secondary);
    font-size: 0.92rem;
    font-weight: 800;
  }

  .lead-form input,
  .lead-form textarea {
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: 0.65rem;
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-primary);
    padding: 0.8rem 0.85rem;
    font: inherit;
    min-height: 2.9rem;
  }

  .lead-form textarea {
    resize: vertical;
  }

  .lead-form input:focus,
  .lead-form textarea:focus {
    outline: 2px solid rgba(214, 72, 126, 0.55);
    outline-offset: 2px;
  }

  .lead-form button {
    width: 100%;
    border: 0;
    cursor: pointer;
  }

  .lead-form button:disabled {
    cursor: wait;
    opacity: 0.72;
  }

  .success-message,
  .error-message {
    border-radius: 0.65rem;
    padding: 0.8rem;
    font-size: 0.95rem;
  }

  .success-message {
    color: #065f46;
    background: #d1fae5;
  }

  .error-message {
    color: #991b1b;
    background: #fee2e2;
  }

  .disclaimer-section {
    border-top: 1px solid var(--border-color);
    padding: 1.25rem 0;
    background: var(--bg-primary);
  }

  .disclaimer-section p {
    font-size: 0.9rem;
  }

  :global([data-theme='light']) .ai-grant-page {
    background:
      radial-gradient(circle at top left, rgba(214, 72, 126, 0.13), transparent 32rem),
      radial-gradient(circle at 82% 18%, rgba(6, 182, 212, 0.12), transparent 30rem),
      var(--bg-primary);
  }

  :global([data-theme='light']) .hero-bg {
    background-image:
      linear-gradient(rgba(17, 24, 39, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(17, 24, 39, 0.08) 1px, transparent 1px);
  }

  :global([data-theme='light']) .source-pill,
  :global([data-theme='light']) .eyebrow {
    color: #b63266;
    background: rgba(214, 72, 126, 0.09);
  }

  :global([data-theme='light']) .feature-card,
  :global([data-theme='light']) .use-case-card,
  :global([data-theme='light']) .example-card,
  :global([data-theme='light']) .timeline-item,
  :global([data-theme='light']) details {
    background: rgba(255, 255, 255, 0.78);
  }

  :global([data-theme='light']) .hero-panel,
  :global([data-theme='light']) .counter-card,
  :global([data-theme='light']) .lead-form {
    background: rgba(255, 255, 255, 0.86);
    box-shadow: 0 1.4rem 3rem rgba(17, 24, 39, 0.09);
  }

  :global([data-theme='light']) .grant-number {
    background: linear-gradient(135deg, #111827, #d6487e 55%, #047f95);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  :global([data-theme='light']) .lead-form input,
  :global([data-theme='light']) .lead-form textarea,
  :global([data-theme='light']) .secondary-cta,
  :global([data-theme='light']) .badge-row span,
  :global([data-theme='light']) .final-points span,
  :global([data-theme='light']) .panel-stats div,
  :global([data-theme='light']) .counter-details span {
    background: rgba(255, 255, 255, 0.9);
  }

  @media (min-width: 720px) {
    .hero-grid,
    .urgency-grid,
    .cta-grid {
      grid-template-columns: minmax(0, 1.2fr) minmax(20rem, 0.8fr);
      align-items: center;
    }

    .hero-panel {
      padding: 1.6rem;
    }

    .card-grid,
    .use-case-grid,
    .example-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .lead-form {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 1.25rem;
    }

    .lead-form .full,
    .lead-form button,
    .lead-form p {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 1024px) {
    .card-grid,
    .use-case-grid,
    .example-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .faq-layout {
      grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      align-items: start;
    }

    .hero-panel {
      transform: translateY(2rem);
    }
  }

  @media (max-width: 480px) {
    .hero-section {
      padding-top: 6.75rem;
    }

    .hero-actions a {
      width: 100%;
    }

    .counter-label {
      display: grid;
      gap: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .primary-cta,
    .secondary-cta,
    .panel-link,
    .lead-form button {
      transition: none;
    }
  }
</style>
