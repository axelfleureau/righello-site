export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  videoUrl?: string;
  categories: string[];
  featured?: boolean;
}

export const categories = [
  { id: 'all', label: 'Tutto' },
  { id: 'content', label: 'Content & Social' },
  { id: 'photo-video', label: 'Video Production' },
  { id: 'web', label: 'Sviluppo Web' },
  { id: 'branding', label: 'Branding' },
  { id: 'advertising', label: 'Advertising' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Ricci Group',
    slug: 'ricci-group',
    description: 'Social media management, content production e campagne advertising per il gruppo automotive con sedi nel Nord Italia.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/ricci_scuolasci.mp4?alt=media&token=1456b789-c161-45e2-9414-23074ce7fd53',
    image: '',
    categories: ['content', 'advertising'],
    featured: true,
  },
  {
    id: '2',
    title: 'Reguta',
    slug: 'reguta',
    description: 'Gestione social media e content production per la storica cantina veneta. Campagne virali e storytelling enogastronomico.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/vendemmioPOCOvolentieri.mp4?alt=media&token=76867423-5c67-4676-ae0e-a151d3e56325',
    image: '',
    categories: ['content'],
    featured: true,
  },
  {
    id: '3',
    title: 'Quinto della Luna',
    slug: 'quinto-della-luna',
    description: 'Video production e storytelling visivo per l\'azienda agricola. Produzione video esperienziale per valorizzare il territorio.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/quintodellaluna%201.mov?alt=media&token=9d2fea38-515a-44ee-b9d5-006fefdb7ada',
    image: '',
    categories: ['photo-video'],
    featured: true,
  },
  {
    id: '4',
    title: 'Riviera Resort Hotel',
    slug: 'riviera-resort',
    description: 'Video production per il resort a Lignano Sabbiadoro. Riprese aeree, interni e atmosfera per il settore hospitality.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/ennevi-6f853.firebasestorage.app/o/ennevi_1.mp4?alt=media&token=31325f81-6c72-4ae7-8b12-f9ab2d9a75ae',
    image: '',
    categories: ['photo-video'],
    featured: true,
  },
  {
    id: '5',
    title: 'Hotel Miramare',
    slug: 'hotel-miramare',
    description: 'Produzione video e contenuti visivi per l\'hotel a Lignano Sabbiadoro. Racconto dell\'esperienza ospite.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/ennevi-6f853.firebasestorage.app/o/ennevi_2.mp4?alt=media&token=601d71c1-deac-41f5-b49a-68c986b700c6',
    image: '',
    categories: ['photo-video'],
  },
  {
    id: '6',
    title: '3R Technology',
    slug: '3r-technology',
    description: 'Content production e social media per il centro riparazioni tecnologiche. Reel virali e contenuti engaging.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/3r_fast_replace.mp4?alt=media&token=def7dcaa-231d-42ff-bf40-9ffef861a6ba',
    image: '',
    categories: ['content'],
  },
  {
    id: '7',
    title: 'Neura',
    slug: 'neura',
    description: 'Branding, social media e content strategy per la startup che sviluppa soluzioni per ragazzi con DSA e difficoltà di apprendimento.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/neura_final.mp4?alt=media&token=27642e9f-c14b-49eb-b8e3-e802f4abdcb4',
    image: '',
    categories: ['content', 'branding'],
  },
  {
    id: '8',
    title: 'MgGrill',
    slug: 'mggrill',
    description: 'Social media management e content production per il ristorante. Storytelling food e reel creativi.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/MgGrill_1%201.mp4?alt=media&token=25f4eb3e-6b63-46de-916a-6eba1a9802a0',
    image: '',
    categories: ['content'],
  },
  {
    id: '9',
    title: 'Scuola Sci Piancavallo',
    slug: 'scuola-sci-piancavallo',
    description: 'Gestione social, campagne promozionali e video content per la scuola sci. Open day, eventi e promozione corsi.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/promo6dicembre%201.MOV?alt=media&token=96556913-1bc3-4e5d-9305-b62e64628f9a',
    image: '',
    categories: ['content', 'advertising'],
  },
  {
    id: '10',
    title: 'Geom. Mauro Poles',
    slug: 'mauro-poles',
    description: 'Video corporate e showcase professionale per lo studio tecnico. Produzione video istituzionale.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/poles-geometra.firebasestorage.app/o/viedo%20architetto.mp4?alt=media&token=a8a22a02-99d5-4d70-8991-654df9be3379',
    image: '',
    categories: ['photo-video'],
  },
  {
    id: '11',
    title: 'Living Door',
    slug: 'living-door',
    description: 'Video production industriale per Living Door. Riprese del capannone e produzione per il settore manifatturiero.',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/poles-geometra.firebasestorage.app/o/20.mp4?alt=media&token=5f0c2e7e-5086-4739-981e-b56083866e81',
    image: '',
    categories: ['photo-video'],
  },
];

export interface Department {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const departments: Department[] = [
  {
    id: 'content-social',
    name: 'Marketing & Social Media',
    tagline: 'Strategie che generano risultati',
    description: 'Strategie di marketing integrate e gestione completa dei social media. Dalla pianificazione editoriale alla produzione di contenuti, ogni azione è pensata per generare engagement reale e conversioni misurabili.',
    icon: 'camera',
    services: [
      {
        title: 'Gestione Social Media',
        description: 'Strategia, pianificazione editoriale e community management per i tuoi canali social con analisi delle performance.',
        icon: 'sparkles',
      },
      {
        title: 'Content Production',
        description: 'Reel, stories, video corporate e contenuti ottimizzati per ogni piattaforma. Produzione in-house con team dedicato.',
        icon: 'video',
      },
      {
        title: 'Shooting Foto & Video',
        description: 'Produzioni professionali per campagne advertising, e-commerce e branding con attrezzatura di ultima generazione.',
        icon: 'camera',
      },
      {
        title: 'Influencer Marketing',
        description: 'Selezione, gestione e coordinamento di creator e influencer per amplificare la reach delle tue campagne.',
        icon: 'users',
      },
      {
        title: 'UGC Strategy',
        description: 'Strategie per generare contenuti autentici dai tuoi clienti e trasformarli in asset di marketing.',
        icon: 'heart',
      },
      {
        title: 'Social Listening',
        description: 'Monitoraggio della brand reputation, analisi del sentiment e identificazione di trend e opportunità.',
        icon: 'ear',
      },
    ],
  },
  {
    id: 'advertising',
    name: 'Advertising & Automazione',
    tagline: 'Ogni euro tracciato, ogni processo ottimizzato',
    description: 'Campagne pubblicitarie data-driven con tracking avanzato, combinate con automazioni intelligenti per ottimizzare i processi di marketing e vendita. Massimo ritorno, minimo spreco.',
    icon: 'target',
    services: [
      {
        title: 'Meta Ads',
        description: 'Campagne Facebook e Instagram Ads con targeting avanzato, creatività ottimizzate e scaling progressivo.',
        icon: 'meta',
      },
      {
        title: 'Google Ads',
        description: 'Search, Display, Shopping e Performance Max per intercettare la domanda consapevole e generare conversioni.',
        icon: 'google',
      },
      {
        title: 'TikTok Ads',
        description: 'Campagne native per raggiungere nuove audience con formati creativi e virali su TikTok.',
        icon: 'tiktok',
      },
      {
        title: 'Tracking & Analytics',
        description: 'Setup pixel, server-side tracking, GA4 e dashboard personalizzate per tracciare ogni touchpoint del customer journey.',
        icon: 'chart',
      },
      {
        title: 'CRO - Conversion Rate',
        description: 'Ottimizzazione delle landing page e dei funnel per massimizzare il tasso di conversione con A/B testing.',
        icon: 'trending',
      },
      {
        title: 'Reporting & Attribution',
        description: 'Report mensili dettagliati con modelli di attribuzione avanzati per capire cosa genera realmente valore.',
        icon: 'report',
      },
      {
        title: 'Marketing Automation',
        description: 'Workflow automatizzati per lead nurturing, email marketing e CRM integration. Processi che lavorano per te 24/7.',
        icon: 'automation',
      },
    ],
  },
  {
    id: 'digital-experience',
    name: 'Sviluppo Web & Software',
    tagline: 'Soluzioni digitali su misura',
    description: 'Progettiamo e sviluppiamo siti web, e-commerce, web app e software custom. Soluzioni scalabili, integrate e potenziate dall\'intelligenza artificiale per far crescere il tuo business.',
    icon: 'code',
    services: [
      {
        title: 'Siti Web B2B',
        description: 'Siti istituzionali e corporate ottimizzati per UX, SEO e lead generation con design system personalizzati.',
        icon: 'globe',
      },
      {
        title: 'E-Commerce',
        description: 'Piattaforme e-commerce B2B e B2C con integrazioni ERP, gestione catalogo e checkout ottimizzati per la conversione.',
        icon: 'cart',
      },
      {
        title: 'Web App & Software',
        description: 'Applicazioni web custom, portali clienti, configuratori di prodotto e dashboard di business intelligence.',
        icon: 'app',
      },
      {
        title: 'AI & Automazioni',
        description: 'Chatbot intelligenti, automazioni di marketing, workflow AI-powered e integrazioni con LLM per efficienza operativa.',
        icon: 'brain',
      },
      {
        title: 'Design System',
        description: 'Sistemi di design modulari con UI Kit, componenti riutilizzabili e documentazione per garantire coerenza visiva.',
        icon: 'palette',
      },
      {
        title: 'Integrazioni CRM & ERP',
        description: 'Connessione di siti e app con HubSpot, Salesforce, SAP e sistemi gestionali per un flusso dati unificato.',
        icon: 'link',
      },
    ],
  },
];

export const services = departments.flatMap(d => d.services.map(s => ({ ...s, departmentId: d.id })));

export interface Client {
  name: string;
  logo?: string;
  href?: string;
}

export const clients: Client[] = [
  { name: 'Ricci Group', href: '/progetti/ricci-group' },
  { name: 'Reguta', href: '/progetti/reguta' },
  { name: 'Quinto della Luna', href: '/progetti/quinto-della-luna' },
  { name: 'Riviera Resort Hotel', href: '/progetti/riviera-resort' },
  { name: 'Hotel Miramare', href: '/progetti/hotel-miramare' },
  { name: '3R Technology', href: '/progetti/3r-technology' },
  { name: 'Neura', href: '/progetti/neura' },
  { name: 'MgGrill', href: '/progetti/mggrill' },
  { name: 'Scuola Sci Piancavallo', href: '/progetti/scuola-sci-piancavallo' },
  { name: 'Geom. Mauro Poles', href: '/progetti/mauro-poles' },
  { name: 'Living Door', href: '/progetti/living-door' },
  { name: 'Barcolana' },
  { name: 'Ippodromo Merano' },
  { name: 'Quellenhof' },
  { name: 'Salotto' },
  { name: 'Embassy' },
  { name: 'VIP Motors' },
  { name: 'NoleggioBar' },
  { name: 'Tubaro' },
  { name: 'Zanutta' },
  { name: 'G&M Ambiente' },
  { name: 'Reginato' },
  { name: 'Ennevi' },
  { name: 'Dolfo' },
  { name: 'Hotel Elite' },
  { name: 'Hotel Michelangelo' },
  { name: 'Banshi' },
  { name: '3R' },
  { name: 'Comune di Pordenone' },
  { name: 'Tomasella' },
  { name: 'Élite SPA' },
  { name: 'La Busa del Sauc' },
  { name: 'Casa Rossa' },
  { name: 'Solerò' },
  { name: 'Noiclub' },
  { name: 'Mangio' },
  { name: 'Razorpadel' },
  { name: 'Manuel Romanin' },
  { name: 'Level Up' },
  { name: 'Dancelife' },
  { name: 'Reformer' },
  { name: 'Ardea' },
  { name: 'Avis' },
  { name: 'Homnia Verona' },
  { name: 'Dual Factory' },
  { name: 'Black&White' },
  { name: 'Tenuta Polvaro' },
  { name: 'Marocco Dreams' },
  { name: 'Fiumedica' },
  { name: 'Fiumove' },
  { name: 'Locanda di Gio' },
  { name: 'Crystal' },
  { name: 'Adimo' },
  { name: 'Banca della Marca' },
  { name: 'Marina Sunset' },
  { name: 'Nabilah' },
];
