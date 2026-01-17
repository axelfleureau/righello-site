<script lang="ts">
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import ServiceTabs from '$lib/components/ServiceTabs.svelte';
  import GSAPReveal from '$lib/components/GSAPReveal.svelte';
  import GlowCard from '$lib/components/GlowCard.svelte';
  import Highlight from '$lib/components/Highlight.svelte';
  import TechWord from '$lib/components/TechWord.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  
  const departments = [
    {
      id: 'content-social',
      name: 'Content & Social',
      icon: '📱',
      tagline: 'Contenuti che convertono',
      description: 'Creiamo e gestiamo la tua presenza social con contenuti strategici che generano engagement e portano risultati misurabili. Dalla produzione video alla gestione quotidiana.',
      services: [
        {
          title: 'Gestione Social Media',
          description: 'Piano editoriale, pubblicazione, community management e analisi performance su tutte le piattaforme.'
        },
        {
          title: 'Content Production',
          description: 'Reel, stories, post, video corporate e contenuti creativi ottimizzati per ogni formato e piattaforma.'
        },
        {
          title: 'Shooting Foto & Video',
          description: 'Produzioni professionali per brand, prodotti, eventi e contenuti social con team dedicato.'
        },
        {
          title: 'Influencer Marketing',
          description: 'Identificazione, contatto e gestione collaborazioni con creator e influencer del tuo settore.'
        },
        {
          title: 'UGC Strategy',
          description: 'Strategia e produzione di contenuti User Generated per aumentare autenticità e conversioni.'
        },
        {
          title: 'Social Listening',
          description: 'Monitoraggio conversazioni, trend e sentiment per anticipare opportunità e proteggere la reputation.'
        }
      ],
      features: ['Piano editoriale mensile', 'Report analytics', 'A/B testing contenuti', 'Trend analysis', 'Community management', 'Crisis management']
    },
    {
      id: 'advertising',
      name: 'Advertising & Performance',
      icon: '📊',
      tagline: 'Ogni euro tracciato',
      description: 'Campagne pubblicitarie data-driven su Meta, Google e TikTok. Ottimizziamo costantemente per massimizzare ROAS e ridurre il costo per acquisizione.',
      services: [
        {
          title: 'Meta Ads',
          description: 'Campagne Facebook e Instagram con targeting avanzato, retargeting e lookalike audiences ottimizzate.'
        },
        {
          title: 'Google Ads',
          description: 'Search, Display, Shopping e YouTube Ads per catturare domanda attiva e generare conversioni.'
        },
        {
          title: 'TikTok Ads',
          description: 'Campagne native per raggiungere Gen Z e Millennials con formati creativi ad alto engagement.'
        },
        {
          title: 'Tracking & Analytics',
          description: 'Setup pixel, conversion API, GA4, dashboard personalizzate per tracciare ogni touchpoint.'
        },
        {
          title: 'CRO - Conversion Rate Optimization',
          description: 'A/B testing landing page, funnel optimization e analisi comportamentale per aumentare le conversioni.'
        },
        {
          title: 'Reporting & Attribution',
          description: 'Report settimanali/mensili con KPI chiave, attribution modeling e insights actionable.'
        }
      ],
      features: ['Setup pixel completo', 'Dashboard real-time', 'A/B testing', 'Audience building', 'Retargeting avanzato', 'Budget optimization']
    },
    {
      id: 'digital-experience',
      name: 'Digital Experience',
      icon: '🚀',
      tagline: 'Soluzioni digitali evolute',
      description: 'Progettiamo esperienze digitali B2B e B2C: siti web, e-commerce, applicazioni e soluzioni AI. Strutture solide, misurabili e pronte a scalare.',
      services: [
        {
          title: 'Siti Web B2B',
          description: 'Siti ottimizzati per UX, contenuti e flussi di engagement che convertono visitatori in lead qualificati.'
        },
        {
          title: 'E-Commerce',
          description: 'Piattaforme di vendita online con listini personalizzati, integrazioni gestionali e checkout ottimizzato.'
        },
        {
          title: 'Web App & Software',
          description: 'Applicazioni web custom, dashboard, portali clienti e soluzioni software su misura.'
        },
        {
          title: 'AI & Automazioni',
          description: 'Chatbot intelligenti, automazioni marketing, lead scoring AI e integrazioni con sistemi aziendali.'
        },
        {
          title: 'Design System',
          description: 'UI Kit modulari, design token e librerie componenti per garantire coerenza e scalabilità.'
        },
        {
          title: 'Integrazioni CRM & ERP',
          description: 'Collegamento a HubSpot, Salesforce, SAP e altri sistemi per un ecosistema digitale connesso.'
        }
      ],
      features: ['UX Research', 'Prototipi interattivi', 'Design responsive', 'SEO tecnico', 'Performance optimization', 'Manutenzione evolutiva']
    }
  ];
</script>

<svelte:head>
  <title>Servizi - Righello | Marketing, Advertising & Digital Experience</title>
  <meta name="description" content="I nostri servizi: Content & Social Media, Advertising & Performance, Digital Experience. Soluzioni complete per la crescita del tuo business." />
</svelte:head>

<section class="py-20 md:py-32">
  <div class="section-container">
    <div class="max-w-4xl">
      <GSAPReveal animation="fade-up">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">I nostri servizi</p>
        <h1 class="heading-xl mb-6">
          Tre dipartimenti,<br/>
          <span class="gradient-text">un unico obiettivo.</span>
        </h1>
      </GSAPReveal>
      <GSAPReveal animation="fade-up" delay={0.2}>
        <p class="text-xl md:text-2xl mb-8 text-[var(--text-secondary)]">
          Combiniamo creatività, dati e tecnologia per costruire strategie di crescita <TechWord highlight>misurabili</TechWord> e <TechWord>scalabili</TechWord>.
        </p>
      </GSAPReveal>
    </div>
  </div>
</section>

<section class="pb-20 md:pb-32">
  <div class="section-container">
    <ServiceTabs {departments} />
  </div>
</section>

<section class="section-padding" style="background: var(--bg-secondary);">
  <div class="section-container">
    <GSAPReveal animation="fade-up">
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Il nostro approccio</p>
        <h2 class="heading-lg">
          Metodologia <span class="gradient-text">data-driven</span>
        </h2>
      </div>
    </GSAPReveal>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each [
        { num: '01', title: 'Analisi', desc: 'Studiamo il mercato, i competitor e i dati esistenti per definire la strategia.' },
        { num: '02', title: 'Strategia', desc: 'Definiamo obiettivi, KPI e roadmap con milestone misurabili.' },
        { num: '03', title: 'Esecuzione', desc: 'Implementiamo con agilità, testando e ottimizzando costantemente.' },
        { num: '04', title: 'Scaling', desc: 'Scaliamo ciò che funziona, eliminando ciò che non performa.' },
      ] as step, i}
        <GSAPReveal animation="fade-up" delay={i * 0.1}>
          <GlowCard class="h-full">
            <div class="p-6">
              <span class="text-5xl font-black text-white/10">{step.num}</span>
              <h3 class="text-xl font-bold mt-2 mb-3 text-white">{step.title}</h3>
              <p class="text-[var(--text-secondary)]">{step.desc}</p>
            </div>
          </GlowCard>
        </GSAPReveal>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding">
  <div class="section-container">
    <GSAPReveal animation="fade-up">
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">Perché Righello</p>
        <h2 class="heading-lg mb-6">
          I nostri <span class="gradient-text">punti di forza</span>
        </h2>
      </div>
    </GSAPReveal>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each [
        { icon: '📈', title: 'Orientamento ai numeri', desc: 'Ogni decisione è basata su dati. Ogni risultato è tracciato e misurabile.' },
        { icon: '🎯', title: 'Full-funnel approach', desc: 'Dalla awareness alla conversione, gestiamo l\'intero percorso del cliente.' },
        { icon: '🤝', title: 'Team dedicato', desc: 'Un referente unico che coordina specialisti di ogni dipartimento.' },
      ] as point, i}
        <GSAPReveal animation="fade-up" delay={i * 0.1}>
          <div class="text-center">
            <span class="text-5xl mb-4 block">{point.icon}</span>
            <h3 class="text-xl font-bold mb-3">{point.title}</h3>
            <p class="text-[var(--text-secondary)]">{point.desc}</p>
          </div>
        </GSAPReveal>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding" style="background: var(--bg-secondary);">
  <div class="section-container">
    <GSAPReveal animation="scale">
      <div class="relative rounded-3xl overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-righello-pink via-[#8B5CF6] to-cyan-500"></div>
        <div class="absolute inset-0 noise-overlay opacity-20"></div>
        
        <div class="relative z-10 p-12 md:p-20 text-center">
          <h2 class="heading-lg text-white mb-6">
            Parliamo del tuo <span class="font-black">progetto</span>
          </h2>
          <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            Prenota una call gratuita per analizzare insieme le opportunità di crescita.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a 
              href="/contatti" 
              class="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Richiedi una consulenza
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </GSAPReveal>
  </div>
</section>
