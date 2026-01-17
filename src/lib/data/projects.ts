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

export const services = [
  {
    id: 'social',
    title: 'Social Media Management',
    description: 'Gestiamo i tuoi canali social con strategia, creatività e analisi dei dati per massimizzare l\'engagement.',
    icon: 'sparkles',
  },
  {
    id: 'content',
    title: 'Content Production',
    description: 'Produciamo contenuti video e foto che convertono: reel, stories, video corporate e shooting professionali.',
    icon: 'camera',
  },
  {
    id: 'advertising',
    title: 'Performance Advertising',
    description: 'Campagne Meta, Google e TikTok Ads ottimizzate per massimizzare il ROAS e le conversioni.',
    icon: 'target',
  },
  {
    id: 'digital',
    title: 'Digital Experience',
    description: 'Siti web B2B, e-commerce, web app e soluzioni AI per una presenza digitale evoluta.',
    icon: 'code',
  },
  {
    id: 'analytics',
    title: 'Tracking & Analytics',
    description: 'Setup pixel, dashboard personalizzate e reportistica per tracciare ogni conversione.',
    icon: 'cpu',
  },
];

export const clients = [
  'Barcolana',
  'Ippodromo Merano',
  'Quellenhof',
  'Salotto',
  'Embassy',
  'VIP Motors',
  'NoleggioBar',
  'Tubaro',
  'Zanutta',
  'G&M Ambiente',
  'Reginato',
  'Ennevi',
  'Dolfo',
  'Reguta',
];
