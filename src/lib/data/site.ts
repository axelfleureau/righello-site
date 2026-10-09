/**
 * Fatti del sito in un punto solo: indirizzo web, dati della societa', collegamenti di
 * testata e di piede. Testata, piede, dati strutturati e mappa del sito leggono da qui:
 * aggiungere una pagina o cambiare un recapito si fa una volta.
 */
import type { IconName } from './landing/types';

export const SITE_URL = 'https://www.wearerighello.com';

/** Immagine di condivisione di partenza: una pagina senza la sua usa questa (il `?v=` si cambia qui, una volta). */
export const OG_IMAGE = `${SITE_URL}/og.png?v=4`;

export const COMPANY = {
  name: 'Righello',
  legalName: 'Righello S.r.l.',
  email: 'hello@wearerighello.com',
  vat: '01979970934',
  legalSeat: 'Pordenone',
  operationsBase: 'Mestre - Venezia',
  street: 'Via Pio X 21',
  postalCode: '30174',
  city: 'Mestre',
  region: 'Veneto',
  founded: '2023',
} as const;

/** Privacy e cookie: la gestione e' di iubenda, qui servono solo gli indirizzi. */
export const PRIVACY_URL = 'https://www.iubenda.com/privacy-policy/47301653';
export const COOKIE_POLICY_URL = `${PRIVACY_URL}/cookie-policy`;

export interface SocialLink {
  href: string;
  label: string;
  /** Percorso del glifo (viewBox 24, riempito). */
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    href: 'https://www.instagram.com/wearerighello',
    label: 'Instagram',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    href: 'https://www.linkedin.com/company/righello',
    label: 'LinkedIn',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    href: 'https://www.tiktok.com/@wearerighello',
    label: 'TikTok',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
];

export const sameAs = socialLinks.map((s) => s.href);

export interface NavItem {
  href: string;
  label: string;
  /** Prefissi di percorso per cui la voce risulta "pagina corrente". */
  match?: string[];
}

/** Voci della testata, nell'ordine in cui si leggono. */
export const mainNav: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/servizi', label: 'Servizi', match: ['/servizi', '/agenzia-marketing-', '/bando-intelligenza-artificiale-fvg-2026'] },
  { href: '/progetti', label: 'Progetti', match: ['/progetti', '/buffr'] },
  { href: '/chi-siamo', label: 'Chi siamo' },
  { href: '/contatti', label: 'Contatti' },
];

export const NAV_CTA = { href: '/contatti', label: 'Parliamone' } as const;

/** La voce e' quella della pagina in cui ci si trova? "/" solo per la home. */
export function isCurrent(item: NavItem, pathname: string): boolean {
  if (item.href === '/') return pathname === '/';
  const prefixes = item.match ?? [item.href];
  return prefixes.some((p) => (p.endsWith('-') ? pathname.startsWith(p) : pathname === p || pathname.startsWith(`${p}/`)));
}

export interface ServiceMenuItem {
  /** Id del reparto in `departments` (titolo e frase vengono da li'). */
  department: string;
  slug: string;
  icon: IconName;
}

/** Le quattro pagine di servizio, nell'ordine del menu. */
export const serviceMenu: ServiceMenuItem[] = [
  { department: 'content-social', slug: 'marketing', icon: 'camera' },
  { department: 'advertising', slug: 'advertising', icon: 'chart' },
  { department: 'digital-experience', slug: 'web', icon: 'globe' },
  { department: 'agenti-ai', slug: 'agenti-ai', icon: 'sparkle' },
];

export interface FooterColumn {
  title: string;
  links: { href: string; label: string }[];
}

/**
 * Prodotti citati nel piede. Nome e indirizzo sono scritti qui (e non letti da
 * `case-studies`) perche' quel file pesa ~20 kB e il piede e' su ogni pagina; il test
 * `site.test.ts` verifica che restino uguali a `case-studies`.
 */
export const footerProducts = [
  { id: 'buffr', label: 'BUFFR', href: '/buffr' },
  { id: 'optima', label: 'Óptima', href: '/progetti/optima' },
  { id: 'tetha', label: 'Tetha', href: '/progetti/tetha' },
  { id: 'dico', label: 'DICO.ONLINE', href: '/progetti/dico' },
  { id: 'gusto-raffinato', label: 'Gusto Raffinato', href: '/progetti/gusto-raffinato' },
] as const;

export const footerColumns: FooterColumn[] = [
  {
    title: 'Righello',
    links: [
      { href: '/servizi', label: 'Servizi' },
      { href: '/progetti', label: 'Progetti' },
      { href: '/chi-siamo', label: 'Chi siamo' },
      { href: '/contatti', label: 'Contatti' },
    ],
  },
  {
    title: 'Dove lavoriamo',
    links: [
      { href: '/agenzia-marketing-pordenone', label: 'Agenzia a Pordenone' },
      { href: '/agenzia-marketing-mestre', label: 'Agenzia a Mestre' },
      { href: '/bando-intelligenza-artificiale-fvg-2026', label: 'Bando AI Friuli-Venezia Giulia' },
    ],
  },
];
