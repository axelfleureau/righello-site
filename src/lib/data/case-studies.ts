export interface CaseStudy {
  id: string;
  name: string;
  sector: string;
  category: 'digital' | 'web' | 'content' | 'marketing';
  headline: string;
  text: string;
  focus: string[];
  href?: string;
  logo?: string;
  image: string;
  imagePosition?: string;
}

export const categoryColors: Record<CaseStudy['category'], string> = {
  digital: '#D6487E',
  web: '#06B6D4',
  content: '#8B5CF6',
  marketing: '#10B981',
};

export const categoryLabels: Record<CaseStudy['category'], string> = {
  digital: 'Digital product',
  web: 'Sito web',
  content: 'Foto e video',
  marketing: 'Marketing',
};

const fiumedicaThumbnail =
  'https://res.cloudinary.com/dcqqiy7ok/video/upload/c_fill,q_auto,so_0,w_800/v1781002731/righello/testimonials/fiumedica-massimo-fausti.jpg';

export const caseStudies: CaseStudy[] = [
  {
    id: 'buffr',
    name: 'BUFFR',
    sector: 'Prodotto iOS',
    category: 'digital',
    headline: 'Da MVP per l\'App Store a un redesign che toglie invece di aggiungere.',
    text:
      'Una videocamera buffer per creator e team sul campo. Il redesign ha ridotto le schermate, sostituito le etichette fisse con icone che compaiono solo quando c\'è un\'eccezione da segnalare, e reso ogni schermata riconoscibile dalle stesse poche componenti.',
    focus: ['UX mobile', 'Design system', 'App Store', 'Redesign iterativo'],
    href: '/buffr',
    logo: '/logo-icon.png',
    image: '/products/buffr/replay-in-un-tap.jpg',
    imagePosition: 'center top',
  },
  {
    id: 'lumis',
    name: 'Lumis',
    sector: 'Web app e media workflow',
    category: 'digital',
    headline: 'Un sistema per pubblicare gallery ordinate, brandizzate e condivisibili.',
    text:
      'Lumis trasforma raccolte foto ed eventi in un’esperienza più pulita rispetto ai link generici: più controllo, più ordine, più valore percepito.',
    focus: ['Web app', 'Gallery eventi', 'UX dashboard', 'Media delivery'],
    href: 'https://lumis.wearerighello.com',
    image: '/projects/cards/lumis-card.jpg',
  },
  {
    id: 'reguta',
    name: 'Reguta 1928',
    sector: 'Wine & lifestyle',
    category: 'marketing',
    headline: 'Heritage, territorio e persone trasformati in racconto commerciale.',
    text:
      'Per un brand storico il punto non è pubblicare di più: è costruire un’immagine coerente tra contenuti, posizionamento e materiali che supportano vendita, hospitality ed export.',
    focus: ['Storytelling', 'Contenuti', 'Campagne', 'Posizionamento'],
    href: 'https://www.instagram.com/reguta.1928/',
    logo: '/logos/reguta.png',
    image: '/thumbnails/thumb-f89791b0c4c7.jpg',
  },
  {
    id: 'elite-hotel-spa',
    name: 'Elite Hotel & Spa',
    sector: 'Hospitality',
    category: 'content',
    headline: 'Produzioni visuali per aumentare desiderabilità e fiducia prima della prenotazione.',
    text:
      'Nel turismo ogni immagine lavora sulla percezione. Abbiamo costruito materiali capaci di raccontare camere, atmosfera, servizi e qualità dell’esperienza.',
    focus: ['Shooting', 'Video', 'Advertising asset', 'Hospitality'],
    href: 'https://www.instagram.com/elitehotelandspa/',
    logo: '/logos/hotel-elite.png',
    image: '/thumbnails/thumb-ca926bab868e.jpg',
  },
  {
    id: 'fiumedica',
    name: 'Fiumedica',
    sector: 'Medical & healthcare',
    category: 'web',
    headline: 'Comunicazione più chiara per rendere l’expertise comprensibile prima del contatto.',
    text:
      'Quando il tema è sanitario, design e contenuti devono abbassare l’attrito: spiegare, rassicurare e guidare il paziente verso il passo successivo.',
    focus: ['Sito', 'Copy chiaro', 'Fiducia', 'Percorso utente'],
    href: 'https://www.fiumepolosanitario.it',
    image: fiumedicaThumbnail,
    imagePosition: 'center center',
  },
  {
    id: 'portopiccolo-apartments',
    name: 'Portopiccolo Apartments',
    sector: 'Short-term rental & Hospitality',
    category: 'web',
    headline: 'Un booking engine collegato in tempo reale al calendario Guesty, non un sito vetrina.',
    text:
      'Trentatré appartamenti nel borgo di Portopiccolo: prezzo "da" calcolato sul primo soggiorno davvero prenotabile — non sulla tariffa bassa stagione — e prenotazione diretta senza passare dal telefono o dal gestionale.',
    focus: ['Booking engine', 'Integrazione Guesty', 'Pricing dinamico', 'UX prenotazione'],
    href: 'https://www.portopiccoloapartments.com',
    image: '/thumbnails/thumb-portopiccolo-apartments.jpg',
  },
  {
    id: 'riviera-resort',
    name: 'Riviera Resort',
    sector: 'Hospitality',
    category: 'content',
    headline: 'Atmosfera, spazi e dettagli organizzati in asset pronti per campagne e canali digitali.',
    text:
      'Una produzione efficace non finisce nello shooting: deve generare immagini e video riutilizzabili, coerenti e facili da attivare su più canali.',
    focus: ['Video production', 'Foto', 'Social asset', 'Paid media'],
    href: 'https://www.instagram.com/rivieraresorthotel/',
    logo: '/logos/riviera-resort.png',
    image: '/thumbnails/thumb-8424e05df0ca.jpg',
  },
  {
    id: 'neura',
    name: 'Neura',
    sector: 'EdTech per famiglie',
    category: 'digital',
    headline: 'Un assistente AI pensato per chi non impara come tutti gli altri, non un chatbot generico.',
    text:
      'Le famiglie con figli con difficoltà di apprendimento spendono in ripetizioni private senza sapere se il gap si sta davvero colmando. Neura segue lo studente quando si blocca, spiega passo passo e si adatta al suo modo di studiare, in abbonamento invece che a ripetizione.',
    focus: ['AI education', 'UX inclusiva', 'Prodotto in abbonamento', 'Onboarding famiglie'],
    href: 'https://neura.wearerighello.com',
    image: '/projects/cards/neura-card.jpg',
    imagePosition: 'left top',
  },
  {
    id: 'tetha',
    name: 'Tetha',
    sector: 'SaaS per l\'edilizia',
    category: 'digital',
    headline: 'Un software che tiene il cantiere in regola prima che un documento scaduto lo fermi.',
    text:
      'Imprese edili, lattonieri e subappaltatori tenevano scadenze e idoneità sanitarie su fogli Excel sparsi. Tetha riconosce i documenti mandati su Telegram, avvisa trenta giorni prima di ogni scadenza e prepara in un clic il dossier che il committente chiede al cancello del cantiere.',
    focus: ['SaaS verticale', 'Bot Telegram', 'Automazione documentale', 'Dashboard'],
    href: 'https://tetha.wearerighello.com',
    image: '/thumbnails/thumb-tetha.jpg',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === slug);
}

export const validCaseStudySlugs = caseStudies.map((study) => study.id);

export function getRelatedCaseStudies(current: CaseStudy, count = 3): CaseStudy[] {
  const pool = caseStudies.filter((study) => study.id !== current.id);
  const sameCategory = pool.filter((study) => study.category === current.category);
  const rest = pool.filter((study) => study.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}

export function caseStudyHref(study: CaseStudy): string {
  if (study.id === 'buffr') return '/buffr';
  return `/progetti/${study.id}`;
}
