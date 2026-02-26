export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface WorkflowStep {
  num: string;
  title: string;
  description: string;
}

export interface ServiceSeo {
  title: string;
  description: string;
}

export interface ServiceDetail {
  slug: string;
  category: string;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  color: string;
  services: ServiceItem[];
  workflow: WorkflowStep[];
  seo: ServiceSeo;
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'marketing',
    category: 'Marketing & Social Media',
    titleLine1: 'Strategie di Marketing',
    titleHighlight: 'Che Generano Risultati',
    subtitle: 'Gestione completa dei social media, produzione contenuti e strategie editoriali pensate per generare engagement reale e conversioni misurabili.',
    ctaText: 'Richiedi un Preventivo',
    ctaHref: '/contatti',
    color: '#D6487E',
    services: [
      {
        icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
        title: 'Social Media Management',
        description: 'Strategia, pianificazione editoriale e community management per i tuoi canali social con analisi delle performance e report mensili.'
      },
      {
        icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
        title: 'Video Production',
        description: 'Reel, TikTok, YouTube: produzione video completa con storytelling, editing professionale e formati ottimizzati per ogni piattaforma.'
      },
      {
        icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        title: 'Copywriting & Storytelling',
        description: 'Testi persuasivi per social, advertising e web. Tone of voice su misura, caption efficaci e storytelling che converte.'
      },
      {
        icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z',
        title: 'Shooting Fotografici',
        description: 'Produzioni fotografiche professionali per campagne, e-commerce e branding con attrezzatura di ultima generazione e team dedicato.'
      },
      {
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        title: 'Community Management',
        description: 'Gestione attiva della community, moderazione, risposte rapide e creazione di relazioni autentiche con il tuo pubblico.'
      },
      {
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
        title: 'Piano Editoriale',
        description: 'Pianificazione strategica dei contenuti su base mensile con calendario editoriale, rubriche tematiche e analisi dei trend.'
      }
    ],
    workflow: [
      {
        num: '01',
        title: 'Audit & Analisi',
        description: 'Analizziamo la tua presenza digitale, il pubblico e i competitor. Identifichiamo opportunità, definiamo tone of voice e KPI.'
      },
      {
        num: '02',
        title: 'Strategia Editoriale',
        description: 'Creiamo il piano editoriale con rubriche, format e calendario di pubblicazione ottimizzato per ogni piattaforma.'
      },
      {
        num: '03',
        title: 'Produzione Contenuti',
        description: 'Shooting, video editing, copywriting: produciamo tutti i contenuti necessari con il nostro team creativo interno.'
      },
      {
        num: '04',
        title: 'Pubblicazione & Community',
        description: 'Pubblichiamo i contenuti, gestiamo la community e monitoriamo le performance in tempo reale.'
      },
      {
        num: '05',
        title: 'Report & Ottimizzazione',
        description: 'Report mensili dettagliati con insight e ottimizzazioni continue per massimizzare engagement e conversioni.'
      }
    ],
    seo: {
      title: 'Marketing & Social Media | Righello – Gestione Social, Video, Contenuti',
      description: 'Gestione social media, video production, copywriting e piano editoriale strategico. Contenuti che generano engagement reale e conversioni misurabili.'
    }
  },
  {
    slug: 'advertising',
    category: 'Advertising & Automazione',
    titleLine1: 'Campagne Advertising',
    titleHighlight: 'Data-Driven',
    subtitle: 'Campagne pubblicitarie con tracking avanzato e automazioni intelligenti per ottimizzare ogni euro investito. Massimo ritorno, minimo spreco.',
    ctaText: 'Richiedi un Preventivo',
    ctaHref: '/contatti',
    color: '#06B6D4',
    services: [
      {
        icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11',
        title: 'Meta Ads',
        description: 'Campagne Facebook e Instagram Ads con targeting avanzato, creatività ottimizzate e scaling progressivo per massimizzare il ROAS.'
      },
      {
        icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        title: 'Google Ads',
        description: 'Search, Display, Shopping e Performance Max per intercettare la domanda consapevole e generare conversioni ad alto valore.'
      },
      {
        icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        title: 'TikTok Ads',
        description: 'Campagne native con formati creativi e virali su TikTok per raggiungere nuove audience e generare awareness ad alto impatto.'
      },
      {
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        title: 'Tracking & Attribution',
        description: 'Setup pixel, server-side tracking, GA4 e dashboard personalizzate per tracciare ogni touchpoint del customer journey.'
      },
      {
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
        title: 'A/B Testing',
        description: 'Test continui su creatività, copy, landing page e audience per ottimizzare le performance e ridurre il costo per conversione.'
      },
      {
        icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        title: 'Marketing Automation',
        description: 'Workflow automatizzati per lead nurturing, email marketing e CRM integration. Processi che lavorano per te 24/7.'
      }
    ],
    workflow: [
      {
        num: '01',
        title: 'Analisi & Setup',
        description: 'Audit dell\'account, setup tracking avanzato, definizione audience e struttura delle campagne con obiettivi chiari.'
      },
      {
        num: '02',
        title: 'Strategia & Creatività',
        description: 'Definiamo la strategia di bidding, creiamo le creatività e costruiamo i funnel di conversione ottimizzati.'
      },
      {
        num: '03',
        title: 'Lancio & Testing',
        description: 'Attiviamo le campagne con A/B testing su creatività, copy e audience. Monitoraggio quotidiano delle performance.'
      },
      {
        num: '04',
        title: 'Ottimizzazione & Scaling',
        description: 'Ottimizzazione continua basata sui dati, scaling del budget sulle campagne performanti e esplorazione di nuovi canali.'
      }
    ],
    seo: {
      title: 'Advertising & Automazione | Righello – Meta Ads, Google Ads, TikTok Ads',
      description: 'Campagne Meta Ads, Google Ads, TikTok Ads con tracking avanzato e marketing automation. Ogni euro tracciato, ogni processo ottimizzato.'
    }
  },
  {
    slug: 'web',
    category: 'Sviluppo Web & Software',
    titleLine1: 'Soluzioni Digitali',
    titleHighlight: 'Su Misura',
    subtitle: 'Progettiamo e sviluppiamo siti web, e-commerce, web app e software custom. Soluzioni scalabili, integrate e potenziate dall\'intelligenza artificiale.',
    ctaText: 'Richiedi un Preventivo',
    ctaHref: '/contatti',
    color: '#8B5CF6',
    services: [
      {
        icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
        title: 'Siti Web',
        description: 'Siti istituzionali, landing page e portali corporate ottimizzati per UX, SEO e lead generation con design system personalizzati.'
      },
      {
        icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z',
        title: 'E-Commerce',
        description: 'Piattaforme e-commerce Shopify e custom con gestione catalogo, checkout ottimizzato e integrazioni ERP per B2B e B2C.'
      },
      {
        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
        title: 'Web App',
        description: 'Applicazioni web custom, portali clienti, configuratori di prodotto e dashboard di business intelligence su misura.'
      },
      {
        icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        title: 'SEO',
        description: 'SEO tecnico e on-page per migliorare il posizionamento organico, aumentare il traffico qualificato e le conversioni.'
      },
      {
        icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
        title: 'UX/UI Design',
        description: 'Interfacce utente intuitive e accessibili, wireframe, prototipi interattivi e design system modulari per garantire coerenza.'
      },
      {
        icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
        title: 'Integrazioni',
        description: 'Connessione di siti e app con CRM, ERP, sistemi di pagamento e API di terze parti per un flusso dati unificato.'
      }
    ],
    workflow: [
      {
        num: '01',
        title: 'Discovery & UX',
        description: 'Analisi dei requisiti, architettura dell\'informazione, wireframe e prototipi interattivi per validare la struttura.'
      },
      {
        num: '02',
        title: 'UI Design',
        description: 'Design delle interfacce con design system, componenti riutilizzabili e visual identity coerente con il brand.'
      },
      {
        num: '03',
        title: 'Sviluppo & Testing',
        description: 'Sviluppo frontend e backend con tecnologie moderne, testing automatizzato e code review per garantire qualità.'
      },
      {
        num: '04',
        title: 'Lancio & Supporto',
        description: 'Deploy, monitoring, formazione e supporto post-lancio con manutenzione e ottimizzazioni continue.'
      }
    ],
    seo: {
      title: 'Sviluppo Web & Software | Righello – Siti Web, E-Commerce, Web App',
      description: 'Siti web, e-commerce, web app e software custom. Soluzioni scalabili con UX/UI design, SEO e integrazioni su misura per il tuo business.'
    }
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find(s => s.slug === slug);
}

export const validSlugs = serviceDetails.map(s => s.slug);
