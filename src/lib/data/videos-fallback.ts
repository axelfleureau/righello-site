export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  videoSrc?: string;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
  youtubeId?: string;
  posterSrc?: string;
  thumbnailUrl?: string;
  order: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  quote: string;
  videoSrc?: string;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
  youtubeId?: string;
  thumbnailSrc?: string;
  thumbnailUrl?: string;
  order: number;
}

export interface ReelItem {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  videoSrc?: string;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
  youtubeId?: string;
  imageSrc?: string;
  isCta?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  order: number;
}

export interface HeroVideo {
  youtubeId?: string;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
  // Cloudinary-hosted thumbnail image URL. When set, PhoneMockup uses it as
  // primary poster before the YouTube player loads — avoids the blank-screen
  // symptom in in-app browsers (Instagram, Facebook, TikTok) that block img.youtube.com.
  thumbnailUrl?: string;
}

export const FALLBACK_HERO: HeroVideo = {
  youtubeId: 'Rj5N4BMF-Vw',
};

export const FALLBACK_SHOWCASE: VideoItem[] = [
  {
    id: 'quinto-della-luna',
    title: 'Quinto della Luna',
    subtitle: 'Azienda agricola',
    category: 'Agricoltura',
    videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/quintodellaluna%201.mov?alt=media&token=9d2fea38-515a-44ee-b9d5-006fefdb7ada',
    order: 0,
  },
  {
    id: 'mauro-poles',
    title: 'Geom. Mauro Poles',
    subtitle: 'Video Showcase',
    category: 'Corporate',
    youtubeId: 'vBgqFc_Dls8',
    order: 1,
  },
  {
    id: 'living-door',
    title: 'Living Door',
    subtitle: 'Capannone industriale',
    category: 'Industrial',
    youtubeId: 'b5WBbuzS5lM',
    order: 2,
  },
  {
    id: 'riviera-resort',
    title: 'Riviera Resort Hotel',
    subtitle: 'Lignano Sabbiadoro',
    category: 'Hospitality',
    youtubeId: '2rS-ZnjuBjo',
    order: 3,
  },
  {
    id: 'hotel-miramare',
    title: 'Hotel Miramare',
    subtitle: 'Lignano Sabbiadoro',
    category: 'Hospitality',
    youtubeId: 'rpXZDOoJzqU',
    order: 4,
  },
  {
    id: 'zanutta',
    title: 'Zanutta',
    subtitle: 'Proof of Work',
    category: 'Corporate',
    youtubeId: 'Xz2G9BqWI50',
    order: 5,
  },
];

export const FALLBACK_REELS: ReelItem[] = [
  {
    id: 'ricci-scuolasci',
    title: 'Ricci Group × Scuola Sci Piancavallo',
    subtitle: 'Partnership per la promozione dei corsi di sci',
    youtubeId: '2EAJzZjnGUo',
    category: 'Partnership',
    order: 0,
  },
  {
    id: '3r-tech',
    title: '3R Technology',
    subtitle: 'Sostituzione fulminea di uno schermo',
    youtubeId: 'q0hHmap4xkM',
    category: 'Product',
    order: 1,
  },
  {
    id: 'reguta',
    title: 'Reguta',
    subtitle: '#IOVENDEMMIOVOLENTIERI2025',
    youtubeId: 'Yrq9lMebfUQ',
    category: 'Social',
    order: 2,
  },
  {
    id: 'neura',
    title: 'Neura',
    subtitle: 'Come migliorare le difficoltà di apprendimento',
    youtubeId: 'SzTxXsg27OM',
    category: 'Salute',
    order: 3,
  },
  {
    id: 'ricci-hyundai',
    title: 'Ricci Group',
    subtitle: 'Basta spendere in carburante, scegli Hyundai i20',
    youtubeId: '6oCjVbhG7Es',
    category: 'Automotive',
    order: 4,
  },
  {
    id: 'mggrill',
    title: 'MgGrill',
    subtitle: 'Per noi il cibo è una cosa seria',
    youtubeId: 'R4IzWaHu8z8',
    category: 'Food',
    order: 5,
  },
  {
    id: 'scuolasci-openday',
    title: 'Scuola Sci Piancavallo',
    subtitle: 'Tutto gratis al open day della scuola!',
    youtubeId: 'VZ-BqtFqx6w',
    category: 'Sport',
    order: 6,
  },
];

export const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: '3',
    clientName: 'Ardea',
    clientRole: 'Scuola Nautica e Guida auto',
    company: 'Ardea',
    quote: 'Hanno trasformato la nostra comunicazione digitale.',
    videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8017.mp4?alt=media&token=0f46ee6d-5bcd-4bfc-b341-eb41aae609d1',
    youtubeId: 'Wf3aN6uTolM',
    order: 0,
  },
  {
    id: '4',
    clientName: '3R Technology',
    clientRole: 'Technology',
    company: '3R Technology',
    quote: 'Marketing digitale efficace per il nostro settore tech.',
    videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8537.mp4?alt=media&token=029ac90a-7f59-4577-9066-b22594257f31',
    order: 1,
  },
  {
    id: '5',
    clientName: 'Reguta Vini',
    clientRole: 'Cantina',
    company: 'Reguta Vini',
    quote: 'La strategia social ha portato +180% di engagement.',
    videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8682.mp4?alt=media&token=a4376902-a831-4804-9817-cc6d5ce3cac2',
    youtubeId: '4Ndme0QfXrk',
    order: 2,
  },
  {
    id: '2',
    clientName: 'Clara Falomo',
    clientRole: 'Avvocato',
    company: 'Studio Avv. Clara Falomo',
    quote: 'Professionalità e risultati concreti per il mio studio legale.',
    videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_6534.mp4?alt=media&token=946280ac-3891-4a87-989a-d2804ad61080',
    youtubeId: 'kG0uofbW2cU',
    order: 3,
  },
];
