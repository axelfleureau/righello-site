export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  categories: string[];
  featured?: boolean;
}

export const categories = [
  { id: 'all', label: 'Tutto' },
  { id: 'branding', label: 'Branding' },
  { id: 'content', label: 'Content Production' },
  { id: 'web', label: 'Sviluppo Web' },
  { id: 'photo-video', label: 'Produzione Foto&Video' },
  { id: 'software', label: 'Sviluppo Software' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Barcolana',
    slug: 'barcolana',
    description: 'Content production e produzione foto/video per l\'evento velico più grande del mondo.',
    image: 'https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?w=800&q=80',
    categories: ['content', 'photo-video'],
    featured: true,
  },
  {
    id: '2',
    title: 'Ippodromo di Merano',
    slug: 'ippodromo-merano',
    description: 'Produzione foto e video per il Gran Premio di Merano.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    categories: ['photo-video'],
    featured: true,
  },
  {
    id: '3',
    title: 'Salotto Mixology & Food',
    slug: 'salotto',
    description: 'Branding completo e sviluppo web per il locale più trendy della città.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    categories: ['branding', 'web'],
    featured: true,
  },
  {
    id: '4',
    title: 'Quellenhof Luxury Resorts',
    slug: 'quellenhof',
    description: 'Produzione foto e video per la catena di resort di lusso.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    categories: ['photo-video'],
  },
  {
    id: '5',
    title: 'Vip Motors Dubai',
    slug: 'vip-motors',
    description: 'Sviluppo web per concessionaria auto di lusso a Dubai.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    categories: ['web'],
  },
  {
    id: '6',
    title: 'Embassy Luxury Bar',
    slug: 'embassy',
    description: 'Branding e consulenza strategica per bar di lusso.',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
    categories: ['branding'],
  },
  {
    id: '7',
    title: 'NoleggioBar',
    slug: 'noleggio-bar',
    description: 'Branding, content production e sviluppo web completo.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
    categories: ['branding', 'content', 'web'],
  },
  {
    id: '8',
    title: 'Tubaro Immobiliare',
    slug: 'tubaro',
    description: 'Sviluppo web e software gestionale per agenzia immobiliare.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    categories: ['web', 'software'],
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
    name: 'Content & Social Media',
    tagline: 'Contenuti che convertono',
    description: 'Creiamo e gestiamo la tua presenza social con strategie data-driven. Ogni contenuto è pensato per generare engagement reale e conversioni misurabili.',
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
    name: 'Advertising & Performance',
    tagline: 'Ogni euro tracciato',
    description: 'Campagne pubblicitarie ottimizzate per il massimo ritorno sull\'investimento. Tracking avanzato, A/B testing continuo e reportistica trasparente.',
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
    ],
  },
  {
    id: 'digital-experience',
    name: 'Digital Experience',
    tagline: 'Infrastrutture digitali evolute',
    description: 'Progettiamo siti web, e-commerce e applicazioni con un approccio sistemico. Soluzioni integrate, scalabili e potenziate dall\'intelligenza artificiale.',
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
  { name: 'Barcolana', href: '/progetti/barcolana' },
  { name: 'Ippodromo Merano', href: '/progetti/ippodromo-merano' },
  { name: 'Quellenhof', href: '/progetti/quellenhof' },
  { name: 'Salotto', href: '/progetti/salotto' },
  { name: 'Embassy', href: '/progetti/embassy' },
  { name: 'VIP Motors', href: '/progetti/vip-motors' },
  { name: 'NoleggioBar', href: '/progetti/noleggio-bar' },
  { name: 'Tubaro' },
  { name: 'Zanutta' },
  { name: 'G&M Ambiente' },
  { name: 'Reginato' },
  { name: 'Ennevi' },
  { name: 'Dolfo' },
  { name: 'Reguta' },
  { name: 'Hotel Elite' },
  { name: 'Hotel Michelangelo' },
  { name: 'Banshi' },
  { name: 'Scuola Sci Piancavallo' },
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
  { name: 'Neura' },
  { name: 'Manuel Romanin' },
  { name: 'Level Up' },
  { name: 'Dancelife' },
  { name: 'Reformer' },
  { name: 'Ardea' },
  { name: 'Avis' },
  { name: 'Homnia Verona' },
  { name: 'Dual Factory' },
  { name: 'Black&White' },
  { name: 'Quinto della Luna' },
  { name: 'Tenuta Polvaro' },
  { name: 'Ricci Group' },
  { name: 'Marocco Dreams' },
  { name: 'Fiumedica' },
  { name: 'Fiumove' },
  { name: 'Locanda di Gio' },
  { name: 'Crystal' },
  { name: 'Adimo' },
  { name: 'Banca della Marca' },
  { name: 'MgGrill' },
  { name: 'Marina Sunset' },
  { name: 'Nabilah' },
];
