# Righello - Growth Agency Website

## Overview
Sito web per Righello, una growth agency italiana orientata ai risultati e ai numeri. L'agenzia trasforma dati in crescita misurabile attraverso creazione contenuti, advertising e digital experience.

## Posizionamento
- **Tagline Hero**: "La tua crescita, inquadrata alla perfezione"
- **Focus**: Approccio data-driven, ROAS, conversioni tracciabili, orientamento ai numeri
- **NON siamo**: Content creator agency (i founder non sono content creator)
- **Priorità**: Creazione contenuti, pubblicità, gestione social

## Tech Stack
- **Framework**: SvelteKit 1.x
- **Styling**: TailwindCSS
- **Font**: Degular Display (custom font con tutti i pesi da Thin a Black)
- **Adapter**: Node adapter
- **Animazioni**: GSAP + ScrollTrigger per scrollytelling avanzato, Svelte transitions per transizioni UI

## Colori Brand (Dual Theme)
- **Tema di default**: Dark mode (con switch light/dark nell'header)
- Rosa Righello: #D6487E
- Ciano accent: #06B6D4
- Gradiente primario: Rosa → Ciano (usato per testo hero e accenti)

### Dark Mode
- Background primario: #050505
- Background secondario: #0a0a0a
- Background terziario: #111111
- Testo primario: #ffffff
- Testo secondario: #a1a1aa
- Border: rgba(255, 255, 255, 0.1)
- Glow rosa: rgba(214, 72, 126, 0.5)
- Glow ciano: rgba(6, 182, 212, 0.4)

### Light Mode
- Background primario: #f8fafc (slate-50)
- Background secondario: #f1f5f9 (slate-100)
- Testo primario: #0f172a (slate-900)
- Testo secondario: #475569 (slate-600)
- Border: rgba(0, 0, 0, 0.1)
- Card glassmorphism con ombre

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
- `/` - Homepage con hero fullscreen (iPhone mockup 3D + nuovo tagline), statistiche animate, servizi, video testimonial reel, clienti marquee
- `/servizi` - Pagina con switch a schede moderno con angoli arrotondati per i 3 dipartimenti
- `/progetti` - Galleria progetti con filtri per categoria e effetti tilt 3D
- `/progetti/[slug]` - Pagina dettaglio progetto
- `/chi-siamo` - Presentazione team con foto, statistiche animate
- `/contatti` - Form di contatto con animazioni e informazioni

## Componenti Interattivi
- **PhoneMockup**: iPhone 3D mockup con spring physics, tilt hover effects, gradient animato
- **AppleScrolly**: Effetto scrollytelling stile Apple - hero con iPhone che si pinna e si sposta al centro durante lo scroll, con frasi ad impatto alternate a sinistra/destra sincronizzate allo scroll
- **RevealOnScroll**: Animazioni scroll-triggered con Svelte native (fly, fade, scale)
- **GlowCard**: Card con effetto glow che segue il cursore (rosa/ciano gradient)
- **InfiniteMarquee**: Scroll infinito orizzontale per loghi clienti
- **ServiceTabs**: Switch a schede moderno con indicatore animato e angoli arrotondati
- **VideoTestimonials**: Carousel video reel con drag-to-scroll e lightbox fullscreen
- **AnimatedCounter**: Contatori che si animano quando visibili
- **MagneticButton**: Bottoni che seguono il cursore con effetto magnetico
- **Header Smart**: Fixed transparent con backdrop-filter blur (glassmorphism), si nasconde/mostra con scroll
- **BenefitsSection**: Card glassmorphism con statistiche animate e confronto Prima/Dopo
- **FAQ**: Accordion con animazioni smooth (Svelte slide transition)
- **BackgroundBeams**: Effetti di luce animati per sezioni hero/accent
- **SectionDivider**: Transizioni sfumate tra sezioni (gradient blend)

## Hero Section
- Desktop: 100vh fullscreen, header trasparente sovrapposto
- Layout: Testo sinistra + iPhone mockup 3D destra
- iPhone mostra placeholder reel con gradient animato e UI social
- Animazioni CSS con delay staggerati

### Mobile Optimizations
- **PhoneMockup responsive**: 180x360px (mobile) → 320x640px (desktop) con max-height in svh
- **Padding ridotto**: 56px mobile → 100px desktop per evitare overlap con navbar
- **GSAP mobile**: scrub: 3 (più lento), scrollDistance: 200vh per slide (vs 120vh desktop)
- **Snap migliorato**: duration 0.4-1s con delay 0.15 per controllo preciso
- **Safe area iOS**: padding-bottom: env(safe-area-inset-bottom) per notch/home indicator
- **SectionDivider**: Gradienti sfumati 80px tra sezioni per transizioni morbide

## Tracking & Analytics
- **Meta Pixel**: Integrato via `src/lib/tracking/metaPixel.ts`
- Per attivare: impostare `PUBLIC_META_PIXEL_ID` nelle variabili d'ambiente
- Traccia automaticamente PageView su ogni navigazione
- Helper functions: `trackLead()`, `trackContact()`, `trackViewContent()`

## Video Testimonial
- Posizionare i video in `/static/testimonials/`
- Formato: MP4, aspect ratio 9:16 (verticale come reel)
- Nomi file: zanutta.mp4, reginato.mp4, ennevi.mp4, dolfo.mp4, reguta.mp4
- I dati testimonial sono in `src/routes/+page.svelte` → array `videoTestimonials`
- Se video non presente, mostra card con quote e avatar gradient

## Sviluppo
Il dev server gira sulla porta 5000 usando `npm run dev`.

## Build Produzione
- `npm run build` - Crea la build nella directory `build/`
- Server produzione: `node build/index.js`
- Deployment target: autoscale

## Struttura File Principali
- `src/routes/` - Pagine SvelteKit
- `src/lib/components/` - Componenti UI (PhoneMockup, AppleScrolly, VideoTestimonials, BenefitsSection, FAQ, etc.)
- `src/lib/data/projects.ts` - Dati statici (progetti, dipartimenti, servizi, clienti)
- `src/lib/utils/gsap.ts` - Utility GSAP per Svelte (useGsapContext, createScrollTrigger, createParallax, etc.)
- `src/lib/actions/inview.ts` - Svelte action per scroll detection
- `src/lib/tracking/` - Moduli tracking (Meta Pixel)
- `src/lib/stores/` - Svelte stores (tema, media queries)
- `src/styles/index.css` - CSS globali con animazioni (hero-animate, etc.)
- `static/` - Asset statici (loghi, favicon, video)
- `static/fonts/` - Font Degular Display (OTF)
- `static/testimonials/` - Video recensioni clienti

## Clienti
Zanutta, G&M Ambiente, Reginato, Ennevi, Dolfo, Reguta, Barcolana, Ippodromo Merano, Quellenhof, e altri

## Accessibilità
- Supporto `prefers-reduced-motion` per tutti i componenti animati
- ARIA labels dinamici per il menu mobile
- Semantic HTML con ruoli appropriati
