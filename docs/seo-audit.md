# Audit SEO e dati strutturati di wearerighello.com

Stato: 14 ottobre 2026, ramo `seo/geo` (partenza `0c0cfc5`). Pagine pubbliche: 33, quelle della mappa del sito, piu' la pagina di errore 404.

## Come si rifa

```
npm run build
PORT=5300 HOST=127.0.0.1 node build &          # annota il PID, ferma solo il tuo
node scripts/seo-audit.mjs http://127.0.0.1:5300             # tabella
node scripts/seo-audit.mjs http://127.0.0.1:5300 --json      # dati grezzi
```

Lo script legge il HTML **cosi' come lo riceve un motore di ricerca** (nessun JavaScript eseguito) e segnala: title fuori da 30-60 caratteri, description fuori da 70-160, assente o uguale a quella della home, canonical non unico, H1 diverso da uno, `og:image` uguale a quella della home o senza testo alternativo, pagine senza `BreadcrumbList`, JSON-LD non valido, `@id` duplicati, piu' di un `Organization`, tipi (`AggregateRating`, `Review`) o testi (470, 98%, ROAS, 340%, Partner) che i dati strutturati non devono dire.

## Riepilogo prima / dopo

| Misura | Prima | Dopo |
|---|---|---|
| Pagine con `og:image` propria (non quella della home) | 21 su 33: le altre 12 usavano `og.png`, una schermata della home con «Meta Partner / Google Partner / 5.0 Rating» | 33 su 33, 1200 x 630, 40-92 kB ciascuna (le schede prodotto con la loro immagine vera) |
| `og:image:alt` | 0 | 33 |
| Pagine con title fuori da 30-60 caratteri | 9 | 0 |
| Pagine con description fuori da 70-160 | 24 (20 oltre i 200 caratteri, troncate nei risultati) | 0 |
| Pagine interne con `BreadcrumbList` | 28 su 32 (mancavano /servizi, /bando…, /chi-siamo, /contatti) | 32 su 32 |
| `Organization` per pagina | 2 nodi separati (`Organization` + `LocalBusiness`) in ogni pagina, piu' il `LocalBusiness` della pagina del bando con lo stesso `@id` (duplicato) | 1 nodo, `@id` `https://www.wearerighello.com/#organization`, tipi `Organization`, `ProfessionalService`, `LocalBusiness` |
| `FAQPage` | 5 pagine (home, contatti, /buffr, bando, Mestre) | 11 pagine (aggiunte /servizi, Pordenone e i quattro servizi): le stesse domande che la pagina mostra, tranne quelle con cifre o impegni da confermare |
| Dati strutturati con affermazioni non dimostrabili | `numberOfEmployees: 4`, `priceRange: €€€`, FAQ con «340%» e «ROAS 8.5x», `bundleId`, province e CAP scritti a mano in 6 punti | nessuno (test automatico su ogni pagina) |
| `llms.txt` | scritto a mano, fermo al 17/06/2026, parlava di «campagne che producono ROAS misurabili» | generato dai dati del sito, data = ultimo contenuto cambiato |
| `lastmod` nella mappa del sito | assente | data vera del contenuto di ogni pagina (git) |
| Crawler AI | `robots.txt` li ammetteva, il server rispondeva 403 a GPTBot, CCBot, ChatGPT-User, anthropic-ai, ClaudeBot, Google-Extended | una sola lista: tutti 200; 403 solo a copiatori di siti e analizzatori SEO |
| HTML medio per pagina | 60,2 kB | 62,7 kB |
| JSON-LD medio / massimo | 2,9 kB / 7,9 kB | 4,7 kB / 8,5 kB (limite: 15 kB) |
| JavaScript del sito (somma di `_app/*.js`) | 1.516 kB | 1.490 kB (-26 kB) |
| `<section>` con nome accessibile | 39 su 232 | 189 su 232 |

Titolo, descrizione, H1 (uno per pagina), `lang="it"`, un solo `<main>`, `<nav>` con nome e testo alternativo alle immagini erano gia' a posto: non e' stato cambiato altro.

Tutto cio' che si legge nel HTML iniziale (titolo, descrizione, canonical, Open Graph, JSON-LD, testo della pagina): verificato con `curl` sulla build di produzione, non con il browser.

## Cosa e' cambiato, per punto

1. **Crawler**: `src/lib/seo/crawlers.ts` e' l'unica lista; `hooks.server.ts` risponde 403 a chi e' bloccato e `/robots.txt` (ora generato, non piu' un file) dichiara lo stesso. Test: `crawlers.test.ts`.
2. **Dati strutturati**: `src/lib/seo/schema.ts`. Le pagine non scrivono piu' JSON-LD: lo aggiunge il server al `<head>` (`hooks.server.ts`), partendo da titolo e descrizione che la pagina dichiara. Cosi' c'e' per chi non esegue JavaScript e non pesa sul codice del browser (-26 kB). Test: `schema.test.ts` (172 controlli, uno per pagina e per regola).
3. **Meta**: un solo componente, `src/lib/components/SeoHead.svelte`, al posto di 15 righe copiate in 14 pagine. Titoli e descrizioni dei progetti e dei servizi stanno nei dati (`case-studies.ts`, `service-details.ts`), con test sulle lunghezze.
4. **Immagini di condivisione**: `static/og/*.jpg`, disegnate da `scripts/og-images.ts` (testo in `src/lib/seo/og-cards.ts`). Le schede prodotto usano le immagini vere gia' presenti.
5. **Mappa e scoperta**: `sitemap.xml` con `lastmod` (da `src/lib/seo/page-dates.json`, scritto da `scripts/page-dates.ts`), `llms.txt` e `llms-full.txt` generati (`src/lib/seo/llms.ts`), `static/<chiave>.txt` + `scripts/indexnow.mjs`, `<link rel="alternate" type="text/plain" href="/llms.txt">` nel head.
6. **Struttura**: nome accessibile (`aria-labelledby`) alle sezioni dei servizi e delle schede progetto; l'aspetto non cambia (vedi sotto).

## Verifica visiva

Home e `/servizi/agenti-ai`, a 1440 x 900 e a 390 x 844, prima e dopo: **0 pixel diversi** (stessa pagina, stesso rendering). Pagine intere (`/servizi/agenti-ai`, `/progetti/tetha`, `/agenzia-marketing-mestre`, `/contatti`): differenze dello 0,000-0,033% dei pixel, dello stesso ordine di quelle fra due fotografie della stessa build (animazioni in corso).

## Cose che restano da fare o da decidere

Vedi `docs/seo-proposte.md` (affermazioni da confermare, testi proposti, pagine nuove) e `docs/geo-fuori-sito.md` (Google Business Profile, recensioni, Search Console, misura mensile).

## Tabella pagina per pagina: PRIMA (origin/main, `0c0cfc5`)

| Pagina | Title (caratteri) | Descr. (car.) | og:image | H1 | JSON-LD (tipi) | kB | Note |
|---|---|---|---|---|---|---|---|
| / | Righello \| Agenzia Marketing a Pordenone e Mestre (49) | 149 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, FAQPage | 5.8 | senza og:image:alt; testo vietato /ROAS/i; testo vietato /\b340\s?%/; testo vietato /8[.,]5x/i |
| /servizi | Servizi \| Social, Advertising, Siti Web e AI - Righello (55) | 136 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, Service, ItemList | 3.3 | og:image della home; senza og:image:alt; senza BreadcrumbList |
| /buffr | BUFFR \| Camera per iPhone che salva gli ultimi secondi \| Righello (65) | 179 | /products/buffr/replay-eventi-live.jpg | 1 | Organization, LocalBusiness, WebSite, WebPage, SoftwareApplication, MobileApplication, FAQPage, BreadcrumbList | 5.7 | title 65; description 179; senza og:image:alt |
| /bando-intelligenza-artificiale-fvg-2026 | Bando AI FVG 2026: guida e contributo 75% \| Righello (52) | 138 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, WebPage, FAQPage | 7.6 | og:image della home; senza og:image:alt; senza BreadcrumbList; @id duplicati |
| /agenzia-marketing-pordenone | Agenzia Marketing Pordenone \| Righello - Web, Advertising e AI (62) | 131 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, Service, BreadcrumbList | 3.8 | title 62; og:image della home; senza og:image:alt |
| /agenzia-marketing-mestre | Agenzia di Marketing a Mestre \| SEO, Ads, Social \| Righello (59) | 149 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, WebPage, ProfessionalService, FAQPage, BreadcrumbList | 7.9 | og:image della home; senza og:image:alt |
| /progetti | Progetti \| App, gestionali, regia delle partite e siti \| Righello (65) | 196 | /og.png?v=4 | 1 | Organization, LocalBusiness, WebSite, CollectionPage, ItemList, BreadcrumbList | 5.0 | title 65; description 196; senza og:image:alt |
| /chi-siamo | Chi siamo \| Righello, studio digitale tra Pordenone e Mestre (60) | 173 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite | 1.7 | description 173; og:image della home; senza og:image:alt; senza BreadcrumbList |
| /contatti | Contatti \| Parla con Righello (29) | 167 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, FAQPage | 2.9 | title 29; description 167; og:image della home; senza og:image:alt; senza BreadcrumbList |
| /servizi/marketing | Agenzia Marketing e Social Media a Pordenone e Mestre \| Righello (64) | 131 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, Service, BreadcrumbList | 3.2 | title 64; og:image della home; senza og:image:alt |
| /servizi/advertising | Google Ads, Meta Ads e Advertising a Pordenone e Mestre \| Righello (66) | 146 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, Service, BreadcrumbList | 3.2 | title 66; og:image della home; senza og:image:alt |
| /servizi/web | Agenzia Siti Web Pordenone e Mestre \| Righello (46) | 127 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, Service, BreadcrumbList | 3.1 | og:image della home; senza og:image:alt |
| /servizi/agenti-ai | Agenti AI e Automazioni per Aziende a Pordenone e Mestre \| Righello (67) | 135 | /og.png?v=3 | 1 | Organization, LocalBusiness, WebSite, Service, BreadcrumbList | 3.2 | title 67; og:image della home; senza og:image:alt |
| /progetti/buffr-live | BUFFR Live \| App iOS \| Righello (31) | 217 | /progetti/stage/buffr-live.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 217; senza og:image:alt |
| /progetti/regia-tv-studio | Produzione delle partite \| Regia TV \| Righello (46) | 300 | /progetti/regia/gol-scorebug.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 300; senza og:image:alt |
| /progetti/ch77-plus | CH77+ \| Regia TV \| Righello (27) | 290 | /progetti/landing/ch77-plus/tv-codice-qr.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | title 27; description 290; senza og:image:alt |
| /progetti/optima | Óptima \| Gestionale \| Righello (30) | 206 | /progetti/stage/optima.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 206; senza og:image:alt |
| /progetti/tetha | Tetha \| Gestionale \| Righello (29) | 300 | /progetti/stage/tetha.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | title 29; description 300; senza og:image:alt |
| /progetti/gusto-raffinato | Gusto Raffinato \| App iOS \| Righello (36) | 294 | /progetti/stage/gusto-raffinato.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 294; senza og:image:alt |
| /progetti/gusto-raffinato-sala | Gusto Raffinato Sala \| Gestionale \| Righello (44) | 220 | /progetti/stage/gusto-sala-ipad.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 220; senza og:image:alt |
| /progetti/lumis | Lumis \| Piattaforma web \| Righello (34) | 255 | /progetti/stage/lumis.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 255; senza og:image:alt |
| /progetti/rigcast | Rig Cast \| Regia TV \| Righello (30) | 227 | /progetti/icons/rigcast.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 227; senza og:image:alt |
| /progetti/canale77 | Canale 77 On Demand \| Regia TV \| Righello (41) | 252 | /progetti/stage/canale77.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 252; senza og:image:alt |
| /progetti/dico | DICO.ONLINE \| Piattaforma web \| Righello (40) | 300 | /progetti/stage/dico.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 300; senza og:image:alt |
| /progetti/assistenti-pa | Assistenti AI per i Comuni \| Piattaforma web \| Righello (55) | 300 | /progetti/icons/assistenti-pa.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 300; senza og:image:alt |
| /progetti/neura | Neura \| Piattaforma web \| Righello (34) | 300 | /progetti/stage/neura.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 300; senza og:image:alt |
| /progetti/portopiccolo-apartments | Portopiccolo Apartments \| Sito su misura \| Righello (51) | 300 | /progetti/stage/portopiccolo-apartments.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.1 | description 300; senza og:image:alt |
| /progetti/bibione-sand-storm | Bibione Sand Storm \| Sito su misura \| Righello (46) | 206 | /progetti/stage/bibione-sand-storm.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 206; senza og:image:alt |
| /progetti/scuola-sci-piancavallo | Scuola Sci Piancavallo \| Sito su misura \| Righello (50) | 224 | /progetti/stage/scuola-sci-piancavallo.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.1 | description 224; senza og:image:alt |
| /progetti/fiumedica | Fiumedica \| Sito su misura \| Righello (37) | 259 | /progetti/stage/fiumedica.webp | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 259; senza og:image:alt |
| /progetti/reguta | Reguta 1928 \| Foto e video \| Righello (37) | 300 | /thumbnails/thumb-f89791b0c4c7.jpg | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 300; senza og:image:alt |
| /progetti/elite-hotel-spa | Elite Hotel & Spa \| Foto e video \| Righello (43) | 248 | /thumbnails/thumb-ca926bab868e.jpg | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 248; senza og:image:alt |
| /progetti/riviera-resort | Riviera Resort \| Foto e video \| Righello (40) | 219 | /thumbnails/thumb-8424e05df0ca.jpg | 1 | Organization, LocalBusiness, WebSite, BreadcrumbList | 2.0 | description 219; senza og:image:alt |
| /_non-esiste | Pagina non trovata \| Righello (29) | 164 | /og.png?v=4 | 1 | Organization, LocalBusiness, WebSite | 1.7 | HTTP 404, noindex, nofollow |

## Tabella pagina per pagina: DOPO (ramo `seo/geo`)

| Pagina | Title (caratteri) | Descr. (car.) | og:image | H1 | JSON-LD (tipi) | kB | Note |
|---|---|---|---|---|---|---|---|
| / | Righello \| Agenzia Marketing a Pordenone e Mestre (49) | 149 | /og/home.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, FAQPage | 4.1 | ok |
| /servizi | Servizi \| Social, Advertising, Siti Web e AI - Righello (55) | 136 | /og/servizi.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, CollectionPage, BreadcrumbList, ItemList, FAQPage | 5.0 | ok |
| /buffr | BUFFR: app per iPhone che salva gli ultimi secondi (50) | 137 | /og/buffr.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication, MobileApplication, FAQPage | 6.7 | ok |
| /bando-intelligenza-artificiale-fvg-2026 | Bando AI FVG 2026: guida, requisiti e documenti \| Righello (58) | 147 | /og/bando-intelligenza-artificiale-fvg-2026.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, FAQPage | 8.5 | ok |
| /agenzia-marketing-pordenone | Agenzia marketing a Pordenone: social, ads e siti web (53) | 131 | /og/agenzia-marketing-pordenone.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage | 6.4 | ok |
| /agenzia-marketing-mestre | Agenzia di Marketing a Mestre \| SEO, Ads, Social \| Righello (59) | 149 | /og/agenzia-marketing-mestre.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage | 7.4 | ok |
| /progetti | Progetti: app, gestionali, regia delle partite e siti (53) | 155 | /og/progetti.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, CollectionPage, BreadcrumbList, ItemList | 5.7 | ok |
| /chi-siamo | Chi siamo \| Righello, studio digitale tra Pordenone e Mestre (60) | 131 | /og/chi-siamo.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, AboutPage, BreadcrumbList | 3.2 | ok |
| /contatti | Contatti \| Parla con Righello a Pordenone e Mestre (50) | 132 | /og/contatti.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, ContactPage, BreadcrumbList, FAQPage | 4.1 | ok |
| /servizi/marketing | Social media marketing a Pordenone e Mestre \| Righello (54) | 131 | /og/servizi-marketing.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage | 5.9 | ok |
| /servizi/advertising | Google Ads e Meta Ads a Pordenone e Mestre \| Righello (53) | 146 | /og/servizi-advertising.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage | 5.9 | ok |
| /servizi/web | Agenzia siti web a Pordenone e Mestre \| Righello (48) | 127 | /og/servizi-web.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage | 6.6 | ok |
| /servizi/agenti-ai | Agenti AI e automazioni a Pordenone e Mestre \| Righello (55) | 137 | /og/servizi-agenti-ai.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage | 6.5 | ok |
| /progetti/buffr-live | BUFFR Live: calcio dilettanti in diretta, Veneto e Friuli (57) | 148 | /og/progetti-buffr-live.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication, MobileApplication | 4.1 | ok |
| /progetti/regia-tv-studio | Produzione delle partite: regia automatica per lo sport (55) | 145 | /og/progetti-regia-tv-studio.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication | 4.1 | ok |
| /progetti/ch77-plus | CH77+: dirette in esclusiva sulla TV, attivate dal telefono (59) | 138 | /og/progetti-ch77-plus.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication | 4.1 | ok |
| /progetti/optima | Óptima: gestionale con AI per agenzie e studi \| Righello (56) | 155 | /og/progetti-optima.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication, MobileApplication | 4.0 | ok |
| /progetti/tetha | Tetha: software per scadenze e documenti del cantiere (53) | 150 | /og/progetti-tetha.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication, MobileApplication | 4.0 | ok |
| /progetti/gusto-raffinato | Gusto Raffinato: app per prenotare nei locali del FVG (53) | 160 | /og/progetti-gusto-raffinato.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication, MobileApplication | 4.2 | ok |
| /progetti/gusto-raffinato-sala | Gusto Raffinato Sala: gestionale per ristoranti su iPad (55) | 148 | /og/progetti-gusto-raffinato-sala.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication, MobileApplication | 4.3 | ok |
| /progetti/lumis | Lumis: gallery e vendita foto per fotografi di eventi (53) | 147 | /og/progetti-lumis.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication | 4.0 | ok |
| /progetti/rigcast | Rig Cast: l’iPhone come camera di regia in RTMP e SRT (53) | 137 | /og/progetti-rigcast.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication, MobileApplication | 4.0 | ok |
| /progetti/canale77 | Canale 77 On Demand: partite su sito, TV e HbbTV (48) | 157 | /og/progetti-canale77.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication | 4.1 | ok |
| /progetti/dico | DICO.ONLINE: messaggi dei Comuni su WhatsApp e Telegram (55) | 136 | /og/progetti-dico.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication | 4.0 | ok |
| /progetti/assistenti-pa | Assistenti AI per i Comuni: risposte dalle pagine dell’ente (59) | 151 | /og/progetti-assistenti-pa.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, SoftwareApplication | 4.1 | ok |
| /progetti/neura | Neura Education: marchio, sito e video per una startup (54) | 153 | /og/progetti-neura.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, CreativeWork | 3.9 | ok |
| /progetti/portopiccolo-apartments | Portopiccolo Apartments: sito con prenotazione diretta (54) | 150 | /og/progetti-portopiccolo-apartments.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, CreativeWork | 4.1 | ok |
| /progetti/bibione-sand-storm | Bibione Sand Storm: il sito dell’evento su sabbia (49) | 133 | /og/progetti-bibione-sand-storm.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, CreativeWork | 4.0 | ok |
| /progetti/scuola-sci-piancavallo | Scuola Sci Piancavallo: sito con corsi e prenotazione (53) | 144 | /og/progetti-scuola-sci-piancavallo.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, CreativeWork | 4.1 | ok |
| /progetti/fiumedica | Fiumedica: sito del polo sanitario di Fiume Veneto (50) | 146 | /og/progetti-fiumedica.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, CreativeWork | 3.9 | ok |
| /progetti/reguta | Reguta 1928: contenuti social e gestionale di conformità (56) | 144 | /og/progetti-reguta.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, CreativeWork | 3.8 | ok |
| /progetti/elite-hotel-spa | Elite Hotel & Spa: foto e video per profilo e campagne (54) | 134 | /og/progetti-elite-hotel-spa.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, CreativeWork | 3.9 | ok |
| /progetti/riviera-resort | Riviera Resort: video aereo del resort a Lignano (48) | 141 | /og/progetti-riviera-resort.jpg?v=1 | 1 | Organization, ProfessionalService, LocalBusiness, WebSite, WebPage, BreadcrumbList, CreativeWork | 3.9 | ok |
| /_non-esiste | Pagina non trovata \| Righello (29) | 164 | /og/home.jpg?v=1 | 1 | - | 0.0 | HTTP 404, noindex, nofollow |
