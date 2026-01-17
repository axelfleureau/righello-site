# Righello - Creative Lab Website

## Overview
Sito web per Righello Creative Lab, un'agenzia creativa italiana leader nel marketing e sviluppo software. L'azienda assiste le aziende per farle lavorare meglio attraverso soluzioni creative e tecnologicamente avanzate.

## Tech Stack
- **Framework**: SvelteKit 1.x
- **Styling**: TailwindCSS
- **Font**: Degular Display (custom font con tutti i pesi da Thin a Black)
- **Adapter**: Node adapter

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

## Tipografia Righello
- **Font principale**: Degular Display (pesi: Thin 100, Light 300, Regular 400, Medium 500, Semibold 600, Bold 700, Black 900)
- **Accenti in Black**: Usare `font-black` per enfatizzare parole importanti
- **Highlight**: Rettangoli colorati dietro al testo (rosa, nero, bianco) con inversione automatica del colore del testo
- **TechWord**: Parole tecniche in corsivo, opzionalmente evidenziate con rettangolo

## Componenti Tipografici
- **Highlight.svelte**: Rettangolo colorato dietro al testo con inversione automatica colore (varianti: pink, black, white)
- **TechWord.svelte**: Parole tecniche in corsivo (con opzione highlight)
- **Accent.svelte**: Testo enfatizzato in font-black

## Struttura Pagine
- `/` - Homepage con hero animato, video hero (con sfumature blend), sezione Reels social, clienti marquee
- `/servizi` - Pagina servizi con InteractiveTimeline (fasi progetto trascinabile) e headline grande "Strategia. Design. Sviluppo."
- `/progetti` - Galleria progetti con filtri per categoria e effetti tilt 3D
- `/progetti/[slug]` - Pagina dettaglio progetto
- `/chi-siamo` - Presentazione team con foto, statistiche animate
- `/contatti` - Form di contatto con animazioni e informazioni

## Componenti Interattivi
- **GSAPReveal**: Animazioni GSAP con scroll trigger (fade-up, fade-in, scale)
- **TextReveal**: Animazione testo carattere per carattere con GSAP
- **GlowCard**: Card con effetto glow che segue il cursore (rosa/ciano gradient)
- **InfiniteMarquee**: Scroll infinito orizzontale per loghi clienti
- **ScrollReveal**: Animazioni fade-in al scroll (supporta prefers-reduced-motion)
- **AnimatedCounter**: Contatori che si animano quando visibili
- **TiltCard**: Effetto 3D al passaggio del mouse
- **SplitText**: Animazione testo parola per parola
- **MagneticButton**: Bottoni che seguono il cursore con effetto magnetico
- **Header Smart**: Si nasconde/mostra con lo scroll, transizione trasparente/scuro
- **SwingingIcon**: Icone oscillanti con animazione fisica
- **StickyNote**: Post-it rosa trascinabili
- **DraggableRuler**: Righello interattivo con marchi Righello
- **InteractiveTimeline**: Timeline orizzontale stile Significa.co con righe per categoria (Strategia, Design, Sviluppo Web, Sviluppo App, Content & Shooting, Marketing) con:
  - Pill sfalsate posizionate tramite offset percentuale (0-100%)
  - Effetto reveal progressivo: le pill passano da grigie a colorate quando il cursore le attraversa
  - Animazione confetti (svelte-confetti) quando si raggiunge la fine
  - Supporta tastiera (frecce sinistra/destra) e accessibilità

## Tipografia Globale
- Font base: 18px (html)
- Body text: text-lg con responsive md:text-xl
- Descrizioni pagine: text-xl md:text-2xl

## Clienti
Zanutta, G&M Ambiente, Reginato, Ennevi, Dolfo, Reguta, e altri

## Video
- Hero video: `/static/hero-video.mp4` (autoplay, loop, muted, playsinline)

## Sviluppo
Il dev server gira sulla porta 5000 usando `npm run dev`.

## Build Produzione
- `npm run build` - Crea la build nella directory `build/`
- Server produzione: `node build/index.js`
- Deployment target: autoscale

## Struttura File Principali
- `src/routes/` - Pagine SvelteKit
- `src/lib/components/` - Componenti (Header, Footer, ScrollReveal, TiltCard, AnimatedCounter, SplitText, Highlight, TechWord, MagneticButton)
- `src/lib/data/` - Dati statici (progetti, servizi, clienti)
- `src/lib/actions/` - Azioni Svelte (drag-scrolling, intersection-observer)
- `src/styles/` - CSS globali con animazioni (marquee, hover effects)
- `static/` - Asset statici (loghi, favicon)
- `static/fonts/` - Font Degular Display (OTF)

## Accessibilità
- Supporto `prefers-reduced-motion` per tutti i componenti animati
- ARIA labels dinamici per il menu mobile
- Semantic HTML con ruoli appropriati
