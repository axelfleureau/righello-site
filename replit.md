# Righello - Growth Agency Website

## Overview
Sito web per Righello, una growth agency italiana orientata ai risultati. L'agenzia trasforma dati in crescita misurabile attraverso marketing, advertising e digital experience.

## Posizionamento
- **Tagline**: "Trasformiamo dati in crescita misurabile"
- **Focus**: Approccio data-driven, ROAS, conversioni tracciabili
- **NON siamo**: Content creator agency (i founder non sono content creator)

## Tech Stack
- **Framework**: SvelteKit 1.x
- **Styling**: TailwindCSS
- **Font**: Degular Display (custom font con tutti i pesi da Thin a Black)
- **Adapter**: Node adapter
- **Animazioni**: GSAP con ScrollTrigger

## Colori Brand (Dark Theme Premium)
- **Tema di default**: Dark mode
- Rosa Righello: #D6487E
- Ciano accent: #06B6D4
- Gradiente primario: Rosa → Ciano (usato per testo hero e accenti)
- Background primario: #050505
- Background secondario: #0a0a0a
- Background terziario: #111111
- Testo primario: #ffffff
- Testo secondario: #a1a1aa
- Border: rgba(255, 255, 255, 0.1)
- Glow rosa: rgba(214, 72, 126, 0.5)
- Glow ciano: rgba(6, 182, 212, 0.4)

## Dipartimenti Servizi (3 aree)
1. **Content & Social Media**
   - Gestione social media
   - Content production (reel, stories, video)
   - Shooting foto & video
   - Influencer marketing
   - UGC Strategy
   - Social listening

2. **Advertising & Performance**
   - Meta Ads (Facebook/Instagram)
   - Google Ads (Search, Display, Shopping)
   - TikTok Ads
   - Tracking & Analytics
   - CRO - Conversion Rate Optimization
   - Reporting & Attribution

3. **Digital Experience**
   - Siti Web B2B
   - E-Commerce
   - Web App & Software
   - AI & Automazioni
   - Design System
   - Integrazioni CRM & ERP

## Struttura Pagine
- `/` - Homepage con hero "Trasformiamo dati in crescita misurabile", statistiche animate, servizi, video testimonial, clienti marquee
- `/servizi` - Pagina con switch a schede moderno per i 3 dipartimenti
- `/progetti` - Galleria progetti con filtri per categoria e effetti tilt 3D
- `/progetti/[slug]` - Pagina dettaglio progetto
- `/chi-siamo` - Presentazione team con foto, statistiche animate
- `/contatti` - Form di contatto con animazioni e informazioni

## Componenti Interattivi
- **GSAPReveal**: Animazioni GSAP con scroll trigger (fade-up, fade-in, scale)
- **TextReveal**: Animazione testo carattere per carattere con GSAP
- **GlowCard**: Card con effetto glow che segue il cursore (rosa/ciano gradient)
- **InfiniteMarquee**: Scroll infinito orizzontale per loghi clienti
- **ServiceTabs**: Switch a schede moderno con angoli arrotondati per i dipartimenti
- **VideoTestimonials**: Sezione video recensioni clienti in formato reel (9:16)
- **ScrollReveal**: Animazioni fade-in al scroll (supporta prefers-reduced-motion)
- **AnimatedCounter**: Contatori che si animano quando visibili
- **MagneticButton**: Bottoni che seguono il cursore con effetto magnetico
- **Header Smart**: Si nasconde/mostra con lo scroll, transizione trasparente/scuro

## Tracking & Analytics
- **Meta Pixel**: Integrato via `src/lib/tracking/metaPixel.ts`
- Per attivare: impostare `PUBLIC_META_PIXEL_ID` nelle variabili d'ambiente
- Traccia automaticamente PageView su ogni navigazione
- Helper functions: `trackLead()`, `trackContact()`, `trackViewContent()`

## Video Testimonial
- Posizionare i video in `/static/testimonials/`
- Formato: MP4, aspect ratio 9:16 (verticale come reel)
- I dati testimonial sono in `src/routes/+page.svelte` → array `clientTestimonials`

## Sviluppo
Il dev server gira sulla porta 5000 usando `npm run dev`.

## Build Produzione
- `npm run build` - Crea la build nella directory `build/`
- Server produzione: `node build/index.js`
- Deployment target: autoscale

## Struttura File Principali
- `src/routes/` - Pagine SvelteKit
- `src/lib/components/` - Componenti UI
- `src/lib/data/` - Dati statici (progetti, servizi, clienti)
- `src/lib/tracking/` - Moduli tracking (Meta Pixel)
- `src/lib/stores/` - Svelte stores (tema, media queries)
- `src/styles/` - CSS globali con animazioni
- `static/` - Asset statici (loghi, favicon, video)
- `static/fonts/` - Font Degular Display (OTF)
- `static/testimonials/` - Video recensioni clienti

## Clienti
Zanutta, G&M Ambiente, Reginato, Ennevi, Dolfo, Reguta, Barcolana, Ippodromo Merano, Quellenhof, e altri

## Accessibilità
- Supporto `prefers-reduced-motion` per tutti i componenti animati
- ARIA labels dinamici per il menu mobile
- Semantic HTML con ruoli appropriati
