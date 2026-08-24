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

const CLOUDINARY_VIDEO_BASE = 'https://res.cloudinary.com/dcqqiy7ok/video/upload';

function testimonialVideo(publicId: string, version: number): string {
  return `${CLOUDINARY_VIDEO_BASE}/q_auto/v${version}/${publicId}.mp4`;
}

function testimonialThumb(publicId: string, version: number): string {
  return `${CLOUDINARY_VIDEO_BASE}/c_fill,q_auto,so_0,w_800/v${version}/${publicId}.jpg`;
}

export const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'ardea-scuola-nautica-01',
    clientName: 'Ardea',
    clientRole: 'Scuola Nautica e Guida auto',
    company: 'Ardea',
    quote: 'Felici di collaborare con Righello: ci hanno aiutato a comunicare meglio scuola guida, scuola nautica e agenzia.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/ardea-scuola-nautica-01', 1781002649),
    cloudinaryPublicId: 'righello/testimonials/ardea-scuola-nautica-01',
    thumbnailUrl: testimonialThumb('righello/testimonials/ardea-scuola-nautica-01', 1781002649),
    order: 0,
  },
  {
    id: 'ardea-scuola-nautica-02',
    clientName: 'Ardea',
    clientRole: 'Scuola Nautica e Guida auto',
    company: 'Ardea',
    quote: 'Video, social e sito ci stanno aiutando a promuovere in modo più efficace tutti i servizi.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/ardea-scuola-nautica-02', 1781002666),
    cloudinaryPublicId: 'righello/testimonials/ardea-scuola-nautica-02',
    thumbnailUrl: testimonialThumb('righello/testimonials/ardea-scuola-nautica-02', 1781002666),
    order: 1,
  },
  {
    id: 'reguta-1928-alessandro',
    clientName: 'Reguta 1928',
    clientRole: 'Cantina',
    company: 'Reguta 1928',
    quote: 'La collaborazione con Righello ci ha portato risultati più grandi, più visibilità e più efficienza.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/reguta-1928-alessandro', 1781002684),
    cloudinaryPublicId: 'righello/testimonials/reguta-1928-alessandro',
    thumbnailUrl: testimonialThumb('righello/testimonials/reguta-1928-alessandro', 1781002684),
    order: 2,
  },
  {
    id: 'reguta-1928-commerciale',
    clientName: 'Reguta 1928',
    clientRole: 'Cantina',
    company: 'Reguta 1928',
    quote: 'Le persone ci riconoscono dai contenuti: complimenti a Righello per il lavoro fatto.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/reguta-1928-commerciale', 1781002699),
    cloudinaryPublicId: 'righello/testimonials/reguta-1928-commerciale',
    thumbnailUrl: testimonialThumb('righello/testimonials/reguta-1928-commerciale', 1781002699),
    order: 3,
  },
  {
    id: 'dual-factory-lara',
    clientName: 'Dual Factory',
    clientRole: 'Retail',
    company: 'Dual Factory',
    quote: 'Abbiamo scelto Righello per la professionalità e per il modo in cui capiscono quello che vogliamo per il negozio.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/dual-factory-lara', 1781002717),
    cloudinaryPublicId: 'righello/testimonials/dual-factory-lara',
    thumbnailUrl: testimonialThumb('righello/testimonials/dual-factory-lara', 1781002717),
    order: 4,
  },
  {
    id: 'fiumedica-massimo-fausti',
    clientName: 'Fiumedica',
    clientRole: 'Struttura sanitaria',
    company: 'Fiumedica',
    quote: 'Siamo molto soddisfatti: foto, video, sito e nuove funzionalità AI hanno dato più forza alla nostra presenza digitale.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/fiumedica-massimo-fausti', 1781002731),
    cloudinaryPublicId: 'righello/testimonials/fiumedica-massimo-fausti',
    thumbnailUrl: testimonialThumb('righello/testimonials/fiumedica-massimo-fausti', 1781002731),
    order: 5,
  },
  {
    id: 'ricci-group-fabrizio-ricci',
    clientName: 'Ricci Group',
    clientRole: 'Concessionarie Hyundai e Suzuki',
    company: 'Ricci Group',
    quote: 'Feedback estremamente positivo: consigliamo Righello per professionalità, rapidità e qualità del lavoro.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/ricci-group-fabrizio-ricci', 1781002745),
    cloudinaryPublicId: 'righello/testimonials/ricci-group-fabrizio-ricci',
    thumbnailUrl: testimonialThumb('righello/testimonials/ricci-group-fabrizio-ricci', 1781002745),
    order: 6,
  },
  {
    id: 'tc-studio-immobiliare-01',
    clientName: 'TC Studio Immobiliare',
    clientRole: 'Agenzia immobiliare',
    company: 'TC Studio Immobiliare',
    quote: 'Avevamo bisogno di un sito più moderno, smart e allineato ai portali attuali.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/tc-studio-immobiliare-01', 1781002851),
    cloudinaryPublicId: 'righello/testimonials/tc-studio-immobiliare-01',
    thumbnailUrl: testimonialThumb('righello/testimonials/tc-studio-immobiliare-01', 1781002851),
    order: 7,
  },
  {
    id: 'tc-studio-immobiliare-02',
    clientName: 'TC Studio Immobiliare',
    clientRole: 'Agenzia immobiliare',
    company: 'TC Studio Immobiliare',
    quote: 'Il nuovo sito è più moderno, immediato e più semplice per trovare le proposte nel territorio.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/tc-studio-immobiliare-02', 1781002863),
    cloudinaryPublicId: 'righello/testimonials/tc-studio-immobiliare-02',
    thumbnailUrl: testimonialThumb('righello/testimonials/tc-studio-immobiliare-02', 1781002863),
    order: 8,
  },
  {
    id: 'tc-studio-immobiliare-03',
    clientName: 'TC Studio Immobiliare',
    clientRole: 'Agenzia immobiliare',
    company: 'TC Studio Immobiliare',
    quote: 'Il team è stato professionale e veloce: ha colto le nostre richieste e reso i prodotti più facili da mostrare.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/tc-studio-immobiliare-03', 1781002873),
    cloudinaryPublicId: 'righello/testimonials/tc-studio-immobiliare-03',
    thumbnailUrl: testimonialThumb('righello/testimonials/tc-studio-immobiliare-03', 1781002873),
    order: 9,
  },
  {
    id: 'clara-falomo',
    clientName: 'Clara Falomo',
    clientRole: 'Avvocato',
    company: 'Studio Avv. Clara Falomo',
    quote: 'Volevo un sito diverso dagli altri: classico e professionale, ma giovane, fresco e immediato.',
    cloudinaryUrl: testimonialVideo('righello/testimonials/clara-falomo', 1781002883),
    cloudinaryPublicId: 'righello/testimonials/clara-falomo',
    thumbnailUrl: testimonialThumb('righello/testimonials/clara-falomo', 1781002883),
    order: 10,
  },
];
