<script lang="ts">
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import GlowCard from '$lib/components/GlowCard.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { env } from '$env/dynamic/public';
  
  const schedulingUrl = env.PUBLIC_SCHEDULING_URL || '/contatti';
  
  const deptSlugs = ['content-social', 'advertising', 'digital-experience'];
  
  const departments = [
    {
      icon: '📱',
      title: 'Marketing & Social Media',
      tagline: 'Strategie che generano risultati',
      description: 'Strategie di marketing integrate e gestione completa dei social media. Dalla pianificazione editoriale alla produzione di contenuti, ogni azione è pensata per generare engagement reale e conversioni misurabili.',
      services: [
        'Social Media Management',
        'Video Production (Reels, TikTok, YouTube)',
        'Shooting fotografici',
        'Copywriting & Storytelling',
        'Piano editoriale strategico',
        'Community management'
      ],
      color: '#D6487E',
      featured: true
    },
    {
      icon: '🎯',
      title: 'Advertising & Automazione',
      tagline: 'Ogni euro tracciato, ogni processo ottimizzato',
      description: 'Campagne pubblicitarie data-driven con tracking avanzato, combinate con automazioni intelligenti per ottimizzare i processi di marketing e vendita. Massimo ritorno, minimo spreco.',
      services: [
        'Meta Ads (Facebook & Instagram)',
        'Google Ads & YouTube Ads',
        'TikTok Ads',
        'Tracking & Attribution avanzato',
        'A/B Testing continuo',
        'Report e dashboard real-time',
        'Marketing Automation'
      ],
      color: '#06B6D4',
      featured: false
    },
    {
      icon: '💻',
      title: 'Sviluppo Web & Software',
      tagline: 'Soluzioni digitali su misura',
      description: 'Progettiamo e sviluppiamo siti web, e-commerce, web app e software custom. Soluzioni scalabili, integrate e potenziate dall\'intelligenza artificiale per far crescere il tuo business.',
      services: [
        'Siti web & Landing page',
        'E-commerce (Shopify, Custom)',
        'Web App su misura',
        'SEO tecnico & on-page',
        'UX/UI Design',
        'Integrazioni & Automazioni'
      ],
      color: '#8B5CF6',
      featured: false
    }
  ];

  const helpPoints = [
    { 
      icon: '🎬', 
      title: 'Content-First Approach', 
      desc: 'Il contenuto è il re. Partiamo sempre dalla strategia dei contenuti per costruire una presenza digitale che converte.'
    },
    { 
      icon: '📊', 
      title: 'Dati, Non Opinioni', 
      desc: 'Ogni decisione è basata su dati reali. Tracking avanzato, A/B testing e ottimizzazione continua.'
    },
    { 
      icon: '🤝', 
      title: 'Un Team, Tre Dipartimenti', 
      desc: 'Marketing, Advertising, Sviluppo: competenze integrate che lavorano insieme per massimizzare i risultati.'
    },
    { 
      icon: '📱', 
      title: 'Mobile-First, Sempre', 
      desc: 'Il 70%+ del traffico è mobile. Progettiamo per smartphone, poi adattiamo per desktop. Mai il contrario.'
    },
    { 
      icon: '🚀', 
      title: 'Velocità di Esecuzione', 
      desc: 'Dall\'idea alla pubblicazione in tempi record. Processi snelli e team dedicato al tuo progetto.'
    },
    { 
      icon: '🎯', 
      title: 'ROI Misurabile', 
      desc: 'Ogni progetto ha KPI chiari. Sappiamo quanto investiamo e quanto ritorna. Sempre.'
    },
  ];
  
  const pillars = [
    { icon: '🎨', title: 'Design che Converte', desc: 'UI/UX pensate per guidare l\'utente verso l\'azione, non solo per essere belle.' },
    { icon: '⚙️', title: 'Sito Veloce e Affidabile', desc: 'Pagine che caricano in pochi secondi, zero crash, aggiornamenti semplici.' },
    { icon: '📊', title: 'Dati e KPI Chiari', desc: 'Ogni progetto ha obiettivi misurabili: traffico, conversioni, performance.' },
    { icon: '🔄', title: 'Supporto Continuo', desc: 'Non ci fermiamo al lancio: aggiornamenti, SEO, ottimizzazioni ongoing.' },
    { icon: '🤖', title: 'AI × Human', desc: 'Automazioni intelligenti per velocità, esperienza umana per qualità.' },
    { icon: '🌍', title: 'Nord Italia & Oltre', desc: 'Base nel Nord Italia, operiamo in tutta Europa. Conosciamo il mercato locale, parliamo la tua lingua.' },
  ];
  
  const caseStudies = [
    {
      badge: 'MARKETING & SOCIAL | Food & Beverage',
      title: 'Settore Food & Beverage',
      description: 'Strategia editoriale completa con produzione video, shooting e gestione community per una catena di ristorazione in forte espansione.',
      metrics: [
        { value: 320, suffix: '%', label: 'Engagement rate in 6 mesi', prefix: '+' },
        { value: 15, suffix: 'K', label: 'Nuovi follower organici', prefix: '+' },
        { value: 2.4, suffix: 'M', label: 'Views sui contenuti video' },
      ]
    },
    {
      badge: 'ADVERTISING & AUTOMAZIONE | Beauty & Wellness',
      title: 'Settore Beauty & Wellness',
      description: 'Campagne Meta e Google Ads con tracking avanzato, funnel ottimizzato e budget scaling progressivo su tre mercati regionali.',
      metrics: [
        { value: 8.7, suffix: 'x', label: 'ROAS medio campagne' },
        { value: 62, suffix: '%', label: 'Riduzione costo per lead', prefix: '-' },
        { value: 140, suffix: '%', label: 'Crescita fatturato in 12 mesi', prefix: '+' },
      ]
    },
    {
      badge: 'SVILUPPO WEB & SOFTWARE | Hospitality',
      title: 'Settore Hospitality',
      description: 'Redesign completo del sito con UX ottimizzata per la prenotazione diretta, SEO tecnico e performance mobile al top.',
      metrics: [
        { value: 185, suffix: '%', label: 'Tasso di conversione', prefix: '+' },
        { value: 1.9, suffix: 's', label: 'Tempo di caricamento' },
        { value: 210, suffix: '%', label: 'Traffico organico in 8 mesi', prefix: '+' },
      ]
    },
  ];
  
  const workflow = [
    { num: '01', title: 'Analisi & Strategia', desc: 'Studiamo il tuo business, il pubblico e i competitor. Definiamo KPI, tone of voice, strategia dei contenuti e piano d\'azione su misura.', duration: '1-2 settimane' },

    { num: '02', title: 'Produzione Creativa', desc: 'Shooting, video editing, copywriting e visual identity: creiamo tutti i contenuti per i tuoi canali social e le campagne adv.', duration: '2-3 settimane' },
    { num: '03', title: 'Lancio & Campagne', desc: 'Pubblichiamo i contenuti e attiviamo le campagne advertising. A/B testing, ottimizzazione budget e monitoraggio performance in tempo reale.', duration: '2-4 settimane' },
    { num: '04', title: 'Ottimizzazione & Crescita', desc: 'Report mensili dettagliati, ottimizzazione continua di contenuti e campagne, scaling di ciò che funziona ed esplorazione di nuovi canali.', duration: 'Ongoing' },
  ];
  
    
  const testimonials = [
    {
      quote: 'Un team giovane e specializzato che ha capito subito le nostre esigenze. Ci hanno costruito un sito web su misura per gestire il nostro portafoglio immobiliare — funzionale, veloce e pensato per convertire.',
      name: 'Tubaro & Co',
      role: 'Immobiliare',
      company: 'Tubaro & Co'
    },
    {
      quote: 'Righello è il nostro punto di forza. Grazie a loro riusciamo a comunicare davvero il valore del nostro lavoro e a creare un legame autentico con i nostri clienti. Non è solo marketing, è relazione.',
      name: 'Reguta',
      role: 'Azienda Vitivinicola',
      company: 'Reguta'
    },
    {
      quote: 'Attenti, veloci, concreti. In Righello abbiamo trovato un partner che non offre pacchetti standard, ma soluzioni su misura per farci crescere. Ogni mese vediamo i numeri salire.',
      name: '3R Technology',
      role: 'Riparazioni & Tecnologia',
      company: '3R Technology'
    },
  ];

  const faqs = [
    {
      question: "Quanto tempo ci vuole per vedere i risultati?",
      answer: "I primi miglioramenti si vedono dai 3 mesi. In questo periodo costruiamo le fondamenta: strategia, contenuti, campagne e tracking. Per i siti web, i tempi di sviluppo variano da 4 a 12 settimane a seconda della complessità."
    },
    {
      question: "Quanto tempo ci vuole per un sito web?",
      answer: "Siti vetrina: 4-6 settimane. E-commerce: 6-10 settimane. Web app custom: 8-16 settimane. Includiamo sempre fasi di strategia, design, sviluppo e testing."
    },
    {
      question: "Lavorate solo con aziende del Veneto?",
      answer: "No, la nostra base è nel Nord Italia ma lavoriamo con clienti in tutta Europa. Gestiamo progetti da remoto con call regolari e strumenti collaborativi, e ci spostiamo sul posto quando serve."
    },
    {
      question: "Posso mantenere il sito da solo dopo il lancio?",
      answer: "Sì, forniamo formazione e documentazione. Tuttavia, consigliamo un piano di manutenzione per aggiornamenti, sicurezza e ottimizzazioni continue."
    },
    {
      question: "Che garanzie offrite sui risultati?",
      answer: "Definiamo KPI chiari all'inizio del progetto. Per l'advertising, offriamo periodi di test e ottimizzazione. Per lo sviluppo, garanzia bug-fix inclusa per 6 mesi post-lancio."
    },
    {
      question: "Come funziona il processo di pagamento?",
      answer: "Tipicamente: 30% all'avvio, 40% alla consegna design approvato, 30% al lancio. Per progetti ricorrenti (advertising, social), fatturazione mensile anticipata."
    },
    {
      question: "Posso vedere il codice sorgente?",
      answer: "Sì, proprietà totale del codice. Ti forniamo accesso al repository, documentazione e tutti gli asset. Niente lock-in, niente sorprese."
    },
    {
      question: "Offrite supporto post-lancio?",
      answer: "Sì, offriamo piani di manutenzione mensili che includono: hosting gestito, backup, aggiornamenti sicurezza, modifiche minori e supporto prioritario."
    }
  ];
  
  let openFaqIndex: number | null = null;
  
  function toggleFaq(index: number) {
    openFaqIndex = openFaqIndex === index ? null : index;
  }
</script>

<svelte:head>
  <title>Servizi | Righello – Marketing, Sviluppo Web & Automazione</title>
  <meta name="description" content="Marketing & Social Media, Advertising & Automazione, Sviluppo Web & Software. Servizi integrati di marketing digitale, sviluppo software e automazione per il tuo business." />
  <meta property="og:title" content="Servizi | Righello – Marketing, Sviluppo Web & Automazione" />
  <meta property="og:description" content="Marketing & Social Media, Advertising & Automazione, Sviluppo Web & Software. Servizi integrati di marketing digitale, sviluppo software e automazione per il tuo business." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=2" />
  <meta property="og:url" content="https://www.wearerighello.com/servizi" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Servizi | Righello – Marketing, Sviluppo Web & Automazione" />
  <meta name="twitter:description" content="Marketing & Social Media, Advertising & Automazione, Sviluppo Web & Software. Servizi integrati di marketing digitale, sviluppo software e automazione per il tuo business." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=2" />
  
  {@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Digital Agency Services",
      "provider": {
        "@type": "Organization",
        "name": "Righello",
        "email": "hello@wearerighello.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Pio X 21",
          "addressLocality": "Mestre",
          "addressRegion": "Venezia",
          "addressCountry": "IT"
        }
      },
      "areaServed": "IT",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servizi Digitali",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Siti Web"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "E-Commerce"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Web App Custom"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Marketing Automation"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sviluppo Software Custom"}}
        ]
      }
    }
  </script>`}
</svelte:head>

<!-- HERO SECTION -->
<section id="servizi-hero" class="hero-section">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <p class="eyebrow">I Nostri Servizi</p>
      <h1 class="hero-title">
        Tre Dipartimenti.<br/>
        <span class="gradient-text">Un Unico Team.</span>
      </h1>
    </RevealOnScroll>
    
    <RevealOnScroll animation="fly-up" delay={100}>
      <p class="hero-subtitle">
        Marketing, Sviluppo Web e Automazione: competenze integrate 
        che lavorano insieme per far crescere il tuo business. 
        Un solo interlocutore, risultati misurabili.
      </p>
    </RevealOnScroll>
    
    <RevealOnScroll animation="fly-up" delay={200}>
      <div class="cta-group">
        <MagneticButton href={schedulingUrl} variant="primary">
          Richiedi un Preventivo
          <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </MagneticButton>
        <MagneticButton href="/coming-soon" variant="secondary">
          Vedi i Progetti
        </MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<!-- I 3 DIPARTIMENTI -->
<section id="dipartimenti" class="section-padding">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">I Nostri Dipartimenti</p>
        <h2 class="section-title">
          Tre Anime, <span class="gradient-text">Una Visione</span>
        </h2>
      </div>
    </RevealOnScroll>
    
    <div class="departments-grid">
      {#each departments as dept, i}
        <RevealOnScroll animation="fly-up" stagger={100} index={i}>
          <div id={deptSlugs[i]} class="department-card" class:featured={dept.featured} style="--dept-color: {dept.color}">
            {#if dept.featured}
              <span class="featured-badge">Il nostro cavallo di battaglia</span>
            {/if}
            <div class="dept-header">
              <span class="dept-icon">{dept.icon}</span>
              <div>
                <h3 class="dept-title">{dept.title}</h3>
                <p class="dept-tagline">{dept.tagline}</p>
              </div>
            </div>
            <p class="dept-description">{dept.description}</p>
            <ul class="dept-services">
              {#each dept.services as service}
                <li>
                  <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {service}
                </li>
              {/each}
            </ul>
            <a href="/contatti" class="dept-cta" style="background: {dept.color}">
              Scopri di più
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<!-- IN COSA TI AIUTIAMO -->
<section id="cosa-facciamo" class="section-padding bg-secondary">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">Cosa facciamo</p>
        <h2 class="section-title">
          In Cosa Possiamo <span class="gradient-text">Aiutarti</span>
        </h2>
      </div>
    </RevealOnScroll>
    
    <div class="help-grid">
      {#each helpPoints as point, i}
        <RevealOnScroll animation="fly-up" stagger={80} index={i}>
          <GlowCard class="h-full">
            <div class="help-card">
              <span class="help-icon">{point.icon}</span>
              <h3 class="help-title">{point.title}</h3>
              <p class="help-desc">{point.desc}</p>
            </div>
          </GlowCard>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<!-- PERCHÉ RIGHELLO -->
<section id="perche-righello" class="section-padding">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">I nostri punti di forza</p>
        <h2 class="section-title">
          Perché Scegliere <span class="gradient-text">Righello</span>
        </h2>
        <p class="section-intro">
          Non solo sviluppo: uniamo strategia, design e performance 
          per progetti digitali che funzionano e crescono nel tempo.
        </p>
      </div>
    </RevealOnScroll>
    
    <div class="pillars-grid">
      {#each pillars as pillar, i}
        <RevealOnScroll animation="scale" stagger={80} index={i}>
          <GlowCard class="h-full">
            <div class="pillar-card">
              <span class="pillar-icon">{pillar.icon}</span>
              <h3 class="pillar-title">{pillar.title}</h3>
              <p class="pillar-desc">{pillar.desc}</p>
            </div>
          </GlowCard>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<!-- CASE STUDIES -->
<section id="case-studies" class="section-padding bg-secondary">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">I nostri risultati</p>
        <h2 class="section-title">
          Risultati Concreti, <span class="gradient-text">Non Promesse</span>
        </h2>
      </div>
    </RevealOnScroll>
    
    <div class="case-studies-grid">
      {#each caseStudies as study, i}
        <RevealOnScroll animation="fly-up" stagger={100} index={i}>
          <GlowCard class="h-full">
            <div class="case-study-card">
              <span class="case-badge">[ {study.badge} ]</span>
              <h3 class="case-title">{study.title}</h3>
              <p class="case-desc">{study.description}</p>
              
              <div class="case-metrics">
                {#each study.metrics as metric}
                  <div class="metric">
                    <strong class="metric-value">
                      {metric.prefix || ''}<AnimatedCounter target={metric.value} duration={2000} />{metric.suffix || ''}
                    </strong>
                    <span class="metric-label">{metric.label}</span>
                  </div>
                {/each}
              </div>
            </div>
          </GlowCard>
        </RevealOnScroll>
      {/each}
    </div>
    
    <RevealOnScroll animation="fly-up">
      <div class="text-center mt-12">
        <MagneticButton href="/coming-soon" variant="secondary">
          Vedi tutti i progetti
          <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </MagneticButton>
      </div>
    </RevealOnScroll>
  </div>
</section>

<!-- COME LAVORIAMO -->
<section id="come-lavoriamo" class="section-padding">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">Il nostro processo</p>
        <h2 class="section-title">
          Dal Brief al Lancio <span class="gradient-text">(e Oltre)</span>
        </h2>
        <p class="section-intro">
          Un flusso chiaro che unisce strategia, design, sviluppo 
          e ottimizzazione continua.
        </p>
      </div>
    </RevealOnScroll>
    
    <div class="workflow-grid">
      {#each workflow as step, i}
        <RevealOnScroll animation="fly-up" stagger={100} index={i}>
          <div class="workflow-step">
            <span class="step-number">{step.num}</span>
            <div class="step-content">
              <h3 class="step-title">{step.title}</h3>
              <p class="step-desc">{step.desc}</p>
              <span class="step-duration">{step.duration}</span>
            </div>
          </div>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section id="testimonials" class="section-padding">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">Cosa dicono di noi</p>
        <h2 class="section-title">
          I Clienti <span class="gradient-text">Parlano</span>
        </h2>
      </div>
    </RevealOnScroll>
    
    <div class="testimonials-grid">
      {#each testimonials as testimonial, i}
        <RevealOnScroll animation="fly-up" stagger={100} index={i}>
          <div class="testimonial-card">
            <div class="quote-mark">"</div>
            <p class="testimonial-quote">{testimonial.quote}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                {testimonial.name.charAt(0)}
              </div>
              <div class="author-info">
                <strong class="author-name">{testimonial.name}</strong>
                <span class="author-role">{testimonial.role}</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" class="section-padding bg-secondary">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">FAQ</p>
        <h2 class="section-title">
          Domande <span class="gradient-text">Frequenti</span>
        </h2>
      </div>
    </RevealOnScroll>
    
    <div class="faq-list">
      {#each faqs as faq, i}
        <RevealOnScroll animation="fly-up" stagger={50} index={i}>
          <div class="faq-item" class:open={openFaqIndex === i}>
            <button 
              class="faq-question"
              on:click={() => toggleFaq(i)}
              aria-expanded={openFaqIndex === i}
              aria-controls="faq-answer-{i}"
            >
              <span>{faq.question}</span>
              <svg 
                class="faq-icon" 
                class:rotated={openFaqIndex === i}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {#if openFaqIndex === i}
              <div id="faq-answer-{i}" class="faq-answer" transition:slide={{ duration: 300, easing: cubicOut }}>
                <p>{faq.answer}</p>
              </div>
            {/if}
          </div>
        </RevealOnScroll>
      {/each}
    </div>
  </div>
</section>

<!-- CTA FINALE -->
<section id="cta" class="section-padding">
  <div class="section-container">
    <RevealOnScroll animation="scale">
      <div class="final-cta">
        <h2 class="section-title">
          Parliamo del tuo <span class="gradient-text">progetto</span>
        </h2>
        <p class="cta-subtitle">
          Prenota una call gratuita di 30 minuti per analizzare insieme 
          le opportunità di crescita per il tuo business.
        </p>
        <div class="cta-buttons">
          <MagneticButton href={schedulingUrl} variant="primary" class="text-lg px-8 py-4">
            Richiedi una consulenza gratuita
            <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        </div>
        <p class="cta-contact">
          Oppure scrivici a <a href="mailto:hello@wearerighello.com" class="email-link">hello@wearerighello.com</a>
        </p>
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  /* Hero Section */
  .hero-section {
    padding: 8rem 0 4rem;
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .hero-section {
      padding: 10rem 0 5rem;
    }
  }
  
  .eyebrow {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #D6487E;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  
  .hero-title {
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }
  
  .hero-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--text-secondary);
    max-width: 650px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }
  
  .cta-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #D6487E, #B83B6A);
    color: white;
    font-weight: 600;
    border-radius: 9999px;
    transition: all 0.3s ease;
    min-height: 52px;
    font-size: 1rem;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(214, 72, 126, 0.4);
  }
  
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    font-weight: 600;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    min-height: 52px;
    font-size: 1rem;
  }
  
  :global([data-theme="light"]) .btn-secondary {
    background: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(214, 72, 126, 0.5);
  }
  
  .btn-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.875rem 1.75rem;
    border: 2px solid #D6487E;
    color: #D6487E;
    font-weight: 600;
    border-radius: 9999px;
    transition: all 0.3s ease;
    min-height: 48px;
  }
  
  .btn-outline:hover {
    background: #D6487E;
    color: white;
  }

  /* Departments Section */
  .departments-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media (min-width: 768px) {
    .departments-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  }
  
  .department-card {
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    padding: 2rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  :global([data-theme="light"]) .department-card {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.08);
  }
  
  .department-card:hover {
    border-color: var(--dept-color, #D6487E);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  .department-card.featured {
    border-color: rgba(214, 72, 126, 0.4);
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.1), rgba(214, 72, 126, 0.02));
  }
  
  .featured-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #D6487E, #B83B6A);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.4rem 1rem;
    border-radius: 9999px;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .dept-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .dept-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }
  
  .dept-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  .dept-tagline {
    font-size: 1rem;
    color: var(--dept-color, #D6487E);
    font-weight: 500;
  }
  
  .dept-description {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .dept-services {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
    flex-grow: 1;
  }
  
  .dept-services li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    color: var(--text-secondary);
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  :global([data-theme="light"]) .dept-services li {
    border-bottom-color: rgba(0, 0, 0, 0.05);
  }
  
  .dept-services li:last-child {
    border-bottom: none;
  }
  
  .check-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--dept-color, #D6487E);
    flex-shrink: 0;
  }
  
  .dept-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    min-height: 48px;
    text-align: center;
  }
  
  .dept-cta:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
  
  .dept-cta svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  /* Sections */
  .section-padding {
    padding: var(--section-padding-sm) 0;
  }
  
  @media (min-width: 768px) {
    .section-padding {
      padding: var(--section-padding-md) 0;
    }
  }
  
  @media (min-width: 1024px) {
    .section-padding {
      padding: var(--section-padding-lg) 0;
    }
  }
  
  .bg-secondary {
    background: var(--bg-secondary);
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #D6487E;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  .section-intro {
    font-size: 1.0625rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
  }
  
  /* Help Grid */
  .help-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 640px) {
    .help-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .help-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .help-grid > :global(*) {
    height: 100%;
  }

  .help-grid :global(.reveal-wrapper),
  .help-grid :global(.reveal-content),
  .help-grid :global(.reveal-placeholder),
  .help-grid :global(.glow-card) {
    height: 100%;
  }

  .help-card {
    padding: 1.5rem;
  }
  
  .help-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 1rem;
  }
  
  .help-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  
  .help-desc {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  /* Pillars Grid */
  .pillars-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 640px) {
    .pillars-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .pillars-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .pillars-grid > :global(*) {
    height: 100%;
  }

  .pillars-grid :global(.reveal-wrapper),
  .pillars-grid :global(.reveal-content),
  .pillars-grid :global(.reveal-placeholder),
  .pillars-grid :global(.glow-card) {
    height: 100%;
  }
  
  .pillar-card {
    padding: 1.5rem;
    text-align: center;
  }
  
  .pillar-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 1rem;
  }
  
  .pillar-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  
  .pillar-desc {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  /* Case Studies */
  .case-studies-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    .case-studies-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .case-studies-grid > :global(*) {
    height: 100%;
  }

  .case-studies-grid :global(.reveal-wrapper),
  .case-studies-grid :global(.reveal-content),
  .case-studies-grid :global(.reveal-placeholder),
  .case-studies-grid :global(.glow-card) {
    height: 100%;
  }
  
  .case-study-card {
    padding: 2rem;
  }
  
  .case-badge {
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #D6487E;
    margin-bottom: 1rem;
  }
  
  .case-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
  }
  
  .case-desc {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .case-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  :global([data-theme="light"]) .case-metrics {
    border-top-color: var(--border-color);
  }
  
  .metric {
    text-align: center;
  }
  
  .metric-value {
    display: block;
    font-size: 1.25rem;
    font-weight: 800;
    color: #D6487E;
  }
  
  .metric-label {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.3;
  }
  
  /* Workflow */
  .workflow-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .workflow-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .workflow-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .workflow-step {
    position: relative;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    transition: all 0.3s ease;
  }
  
  :global([data-theme="light"]) .workflow-step {
    background: rgba(255, 255, 255, 0.8);
    border-color: var(--border-color);
  }
  
  .workflow-step:hover {
    border-color: rgba(214, 72, 126, 0.3);
  }
  
  .step-number {
    display: block;
    font-size: 3rem;
    font-weight: 900;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.3;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .step-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  
  .step-desc {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .step-duration {
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    background: rgba(214, 72, 126, 0.1);
    color: #D6487E;
    border-radius: 9999px;
  }
  
  /* Testimonials */
  .testimonials-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .testimonials-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .testimonial-card {
    position: relative;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.25rem;
    transition: all 0.3s ease;
  }
  
  :global([data-theme="light"]) .testimonial-card {
    background: rgba(255, 255, 255, 0.9);
    border-color: var(--border-color);
  }
  
  .testimonial-card:hover {
    border-color: rgba(214, 72, 126, 0.3);
  }
  
  .quote-mark {
    font-size: 4rem;
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.3;
    position: absolute;
    top: 0.5rem;
    left: 1.5rem;
  }
  
  .testimonial-quote {
    font-size: 1rem;
    color: var(--text-primary);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
    font-style: italic;
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 1.125rem;
  }
  
  .author-info {
    display: flex;
    flex-direction: column;
  }
  
  .author-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .author-role {
    font-size: 1rem;
    color: var(--text-secondary);
  }
  
  /* FAQ */
  .faq-list {
    max-width: var(--container-max, 1280px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .faq-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  :global([data-theme="light"]) .faq-item {
    background: rgba(255, 255, 255, 0.9);
    border-color: var(--border-color);
  }
  
  .faq-item:hover {
    border-color: rgba(214, 72, 126, 0.3);
  }
  
  .faq-item.open {
    border-color: rgba(214, 72, 126, 0.5);
  }
  
  .faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    text-align: left;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;
    min-height: 56px;
  }
  
  .faq-question:hover {
    color: #D6487E;
  }
  
  .faq-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    color: #D6487E;
    transition: transform 0.3s ease;
  }
  
  .faq-icon.rotated {
    transform: rotate(180deg);
  }
  
  .faq-answer {
    padding: 0 1.5rem 1.25rem;
  }
  
  .faq-answer p {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.7;
  }
  
  /* Final CTA */
  .final-cta {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.15), rgba(6, 182, 212, 0.1));
    border-radius: 2rem;
    border: 1px solid rgba(214, 72, 126, 0.2);
  }
  
  .cta-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  .cta-subtitle {
    font-size: 1.0625rem;
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto 2rem;
    line-height: 1.7;
  }
  
  .cta-buttons {
    margin-bottom: 1.5rem;
  }
  
  .btn-primary-large {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem 2.5rem;
    background: linear-gradient(135deg, #D6487E, #B83B6A);
    color: white;
    font-weight: 600;
    font-size: 1.0625rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    min-height: 56px;
  }
  
  .btn-primary-large:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(214, 72, 126, 0.4);
  }
  
  .cta-contact {
    font-size: 0.9375rem;
    color: var(--text-secondary);
  }
  
  .email-link {
    color: #D6487E;
    font-weight: 500;
    transition: opacity 0.3s ease;
  }
  
  .email-link:hover {
    opacity: 0.8;
  }
  
  /* Utility classes */
  .gradient-text {
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .text-center {
    text-align: center;
  }
  
  .mt-12 {
    margin-top: 3rem;
  }
</style>
