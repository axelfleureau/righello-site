/**
 * Chi e' Righello e dove lavora, per descrizioni e dati strutturati (solo sul server: la testata e il piede,
 * che vanno su ogni pagina, leggono `site.ts` e non devono portarsi dietro anche questo).
 */
import { COMPANY } from './site';

/** Chi e' Righello in una frase: stesse parole di "Chi siamo". */
export const COMPANY_SUMMARY = `Studio digitale con sede legale a ${COMPANY.legalSeat} e base operativa a ${COMPANY.city}: app, gestionali, siti web, contenuti e campagne per aziende del Friuli-Venezia Giulia, del Veneto e del Nord Italia.`;

/** Regione della sede legale (la base operativa e' in `COMPANY.region`). */
export const LEGAL_SEAT_REGION = 'Friuli-Venezia Giulia';

/** Dove lavoriamo: i luoghi dichiarati sul sito. */
export const AREAS_SERVED = [
  { type: 'City', name: 'Pordenone' },
  { type: 'City', name: 'Venezia' },
  { type: 'City', name: 'Mestre' },
  { type: 'AdministrativeArea', name: 'Friuli-Venezia Giulia' },
  { type: 'AdministrativeArea', name: 'Veneto' },
] as const;

/**
 * Di cosa si occupa Righello, per `knowsAbout` dei dati strutturati: solo cio' che le pagine dei servizi e le schede dei progetti dimostrano.
 * (Niente industria 4.0, visione artificiale, ERP: non ci sono schede.)
 */
export const KNOWS_ABOUT = [
  'Sviluppo di software su misura',
  'Gestionali',
  'App per iPhone e iPad',
  'Piattaforme web',
  'Integrazioni tra sistemi',
  'Agenti AI e automazioni',
  'Assistenti AI per i Comuni',
  'Siti web e e-commerce',
  'Social media marketing',
  'Advertising online'
] as const;
