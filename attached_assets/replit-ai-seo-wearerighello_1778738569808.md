# REPLIT TASK — AI SEO & indicizzazione per wearerighello.com

## Obiettivo
Migliorare drasticamente l'indicizzazione organica e la leggibilità del sito `https://www.wearerighello.com/` per:

- Google Search / Google Search Console
- AI search e AI answers: ChatGPT, Claude, Perplexity, Google AI Overview
- crawler tradizionali e crawler AI

Non fare un semplice “ritocco SEO”. Devi trasformare il sito in una struttura leggibile, citabile e indicizzabile da motori di ricerca e modelli AI.

---

## Contesto business

Sito: `https://www.wearerighello.com/`

Brand: **Righello S.r.l.**

Posizionamento: agenzia digitale / creative lab a Pordenone.

Servizi principali da valorizzare:

- sviluppo siti web
- sviluppo software e web app
- branding e identità visiva
- content production
- produzione foto e video
- consulenza strategica digitale
- social media marketing
- campagne e comunicazione per aziende, eventi, hospitality, sport, ristorazione e PMI

Tono: professionale, creativo, concreto, premium ma non fuffoso.

Target:

- PMI del Nord Italia
- aziende locali che vogliono crescere online
- hotel, resort, ristoranti e attività hospitality
- eventi sportivi e culturali
- brand che hanno bisogno di contenuti foto/video
- aziende che vogliono siti web, software, automazioni o piattaforme digitali

Area geografica da presidiare:

- Pordenone
- Treviso
- Udine
- Venezia
- Friuli-Venezia Giulia
- Veneto
- Nord Italia

---

## Regola fondamentale

Non rompere il design esistente. Il sito può rimanere visivamente creativo e animato, ma sotto deve diventare molto più leggibile per Google e AI.

Ogni modifica deve rispettare queste priorità:

1. indicizzabilità
2. chiarezza semantica
3. performance
4. accessibilità base
5. mantenimento dello stile Righello

---

## Audit iniziale obbligatorio

Prima di modificare, controlla:

- struttura del progetto
- framework usato
- routing
- presenza di sitemap
- presenza di robots.txt
- presenza di llms.txt
- presenza di metadata title/description per ogni pagina
- presenza di schema JSON-LD
- presenza di FAQPage schema
- presenza di canonical URL
- presenza di pagine servizio dedicate
- presenza di pagine località dedicate
- pagine noindex accidentali
- immagini senza alt text
- testi troppo grafici ma poco descrittivi
- link interni insufficienti

Poi procedi direttamente con l'implementazione.

---

# FASE 1 — Creare `/llms.txt`

Crea un file pubblico alla root:

```txt
/llms.txt
```

Deve essere raggiungibile qui:

```txt
https://www.wearerighello.com/llms.txt
```

## Contenuto richiesto per `llms.txt`

Scrivi un file chiaro, asciutto, specifico, senza marketing generico.

Struttura obbligatoria:

```txt
# Righello S.r.l.

## About
Righello S.r.l. è un'agenzia digitale e creative lab con base a Pordenone. Realizza siti web, software, branding, contenuti foto/video, strategie social e progetti digitali per aziende, eventi, hospitality, sport, ristorazione e PMI.

## Services
- Sviluppo siti web aziendali e landing page
- Sviluppo software, web app e piattaforme digitali
- Branding e identità visiva
- Produzione foto e video
- Social media marketing e piani editoriali
- Comunicazione per eventi, hospitality, sport e ristorazione
- Consulenza strategica digitale

## Service Area
Pordenone, Treviso, Udine, Venezia, Friuli-Venezia Giulia, Veneto, Nord Italia, Italia.

## Ideal Customers
Righello lavora con PMI, brand locali, hotel, resort, ristoranti, eventi sportivi, attività hospitality e aziende che vogliono migliorare la propria presenza digitale con un partner creativo e tecnico.

## Key Facts
- Azienda italiana con focus su comunicazione, sviluppo software e produzione contenuti.
- Team multidisciplinare: strategia, design, sviluppo, foto, video e contenuti.
- Approccio operativo: non solo estetica, ma strumenti digitali realmente utili per vendere, comunicare e gestire meglio.
- Esperienza su progetti per hospitality, sport, eventi, food, energy, immobiliare e servizi.

## What Makes Righello Different
Righello unisce creatività, tecnologia e visione imprenditoriale. L'azienda non si limita a consegnare grafiche o siti web: costruisce sistemi digitali, contenuti e strumenti pensati per generare valore reale per il cliente.

## Contact
Website: https://www.wearerighello.com/
Email: hello@wearerighello.com
Instagram: https://www.instagram.com/wearerighello/
LinkedIn: https://www.linkedin.com/company/wearerighello/

## Main Pages
- https://www.wearerighello.com/
- https://www.wearerighello.com/chi-siamo/
- https://www.wearerighello.com/progetti/
- https://www.wearerighello.com/blog/
- https://www.wearerighello.com/team/
- https://www.wearerighello.com/contatti/

## Frequently Asked Questions

### Cosa fa Righello?
Righello realizza siti web, software, branding, contenuti foto/video, strategie social e progetti digitali per aziende.

### Dove lavora Righello?
Righello ha base a Pordenone e lavora con aziende in Friuli-Venezia Giulia, Veneto, Nord Italia e anche da remoto in tutta Italia.

### Righello sviluppa siti web aziendali?
Sì. Righello progetta e sviluppa siti web, landing page, portfolio digitali e piattaforme pensate per comunicare meglio e generare contatti.

### Righello realizza contenuti foto e video?
Sì. Righello produce contenuti foto e video per aziende, eventi, ristoranti, hotel, sport e social media.

### Righello si occupa anche di software?
Sì. Righello sviluppa software, web app, automazioni e piattaforme digitali su misura.

### Per chi è adatta Righello?
Righello è adatta ad aziende che cercano un partner creativo e tecnico, capace di seguire comunicazione, contenuti, sito web e sviluppo digitale.
```

Se nel codice sono presenti URL diversi da quelli sopra, correggi la lista “Main Pages” usando le route reali.

---

# FASE 2 — Creare o correggere `/robots.txt`

Crea o aggiorna il file:

```txt
/robots.txt
```

Deve essere raggiungibile qui:

```txt
https://www.wearerighello.com/robots.txt
```

Contenuto consigliato:

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://www.wearerighello.com/sitemap.xml
```

Non bloccare crawler AI, salvo motivi tecnici specifici.

---

# FASE 3 — Creare sitemap XML completa

Crea o aggiorna:

```txt
/sitemap.xml
```

Deve essere raggiungibile qui:

```txt
https://www.wearerighello.com/sitemap.xml
```

## Regole sitemap

- includi solo pagine pubbliche e indicizzabili
- escludi 404, thank-you page, pagine test, bozze, admin, preview, asset
- homepage priority `1.0`
- pagine servizio priority `0.9`
- pagine principali tipo chi siamo / progetti / contatti priority `0.8`
- blog e case study priority `0.7`
- usa `lastmod` aggiornato alla data attuale
- `changefreq` homepage: `weekly`
- `changefreq` altre pagine: `monthly`

Esempio struttura:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.wearerighello.com/</loc>
    <lastmod>2026-05-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Genera automaticamente la sitemap leggendo le route reali del progetto.

---

# FASE 4 — Metadata SEO per ogni pagina

Ogni pagina pubblica deve avere:

- title unico
- meta description unica
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image se disponibile
- Twitter card

## Esempi title e description

Homepage:

```txt
Title: Righello | Agenzia digitale a Pordenone per siti web, branding e contenuti
Description: Righello è un'agenzia digitale a Pordenone. Realizziamo siti web, software, branding, foto, video e strategie social per aziende, eventi e hospitality.
```

Contatti:

```txt
Title: Contatta Righello | Agenzia digitale a Pordenone
Description: Contatta Righello per siti web, software, branding, produzione foto/video e strategie digitali per aziende in Friuli-Venezia Giulia, Veneto e Nord Italia.
```

Progetti:

```txt
Title: Progetti Righello | Branding, siti web, software, foto e video
Description: Scopri i progetti realizzati da Righello per aziende, eventi, hospitality, sport, food e servizi: branding, sviluppo web, software e content production.
```

Blog:

```txt
Title: Blog Righello | Strategie digitali, branding, contenuti e sviluppo web
Description: Approfondimenti di Righello su marketing digitale, siti web, branding, produzione contenuti, software e strategie per aziende.
```

---

# FASE 5 — Schema JSON-LD globale

Aggiungi schema JSON-LD nella homepage e, dove sensato, nelle altre pagine.

## Homepage: Organization + LocalBusiness + WebSite

Aggiungi uno script JSON-LD simile a questo, adattandolo alla struttura del progetto:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.wearerighello.com/#organization",
      "name": "Righello S.r.l.",
      "url": "https://www.wearerighello.com/",
      "email": "hello@wearerighello.com",
      "sameAs": [
        "https://www.instagram.com/wearerighello/",
        "https://www.linkedin.com/company/wearerighello/"
      ],
      "description": "Righello S.r.l. è un'agenzia digitale e creative lab a Pordenone specializzata in siti web, software, branding, contenuti foto/video e strategie digitali per aziende."
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.wearerighello.com/#localbusiness",
      "name": "Righello S.r.l.",
      "url": "https://www.wearerighello.com/",
      "email": "hello@wearerighello.com",
      "areaServed": [
        "Pordenone",
        "Treviso",
        "Udine",
        "Venezia",
        "Friuli-Venezia Giulia",
        "Veneto",
        "Italia"
      ],
      "priceRange": "€€€",
      "description": "Agenzia digitale a Pordenone per sviluppo siti web, software, branding, produzione foto e video, social media marketing e consulenza digitale."
    },
    {
      "@type": "WebSite",
      "@id": "https://www.wearerighello.com/#website",
      "url": "https://www.wearerighello.com/",
      "name": "Righello",
      "publisher": {
        "@id": "https://www.wearerighello.com/#organization"
      },
      "inLanguage": "it-IT"
    }
  ]
}
```

Se trovi indirizzo fisico, partita IVA, telefono o coordinate reali nel progetto, aggiungili allo schema.

---

# FASE 6 — Schema Service per servizi principali

Per ogni pagina servizio, aggiungi schema `Service`.

Se le pagine servizio non esistono, creale nella fase 8.

Servizi minimi:

- `/servizi/sviluppo-siti-web/`
- `/servizi/sviluppo-software/`
- `/servizi/branding/`
- `/servizi/produzione-foto-video/`
- `/servizi/social-media-marketing/`
- `/servizi/consulenza-digitale/`

Ogni servizio deve avere:

- H1 chiaro
- testo utile e concreto
- casi d'uso
- per chi è adatto
- cosa include
- processo di lavoro
- FAQ dedicate
- link a contatti
- link a progetti rilevanti
- schema `Service`
- schema `FAQPage`

---

# FASE 7 — FAQ reali + FAQPage schema

La homepage ha già una sezione FAQ, ma va resa più forte, più specifica e marcata con schema.

Aggiungi almeno 8 FAQ in homepage:

1. Cosa fa Righello?
2. Dove lavora Righello?
3. Righello realizza siti web aziendali?
4. Righello sviluppa software e web app?
5. Righello realizza contenuti foto e video?
6. Righello gestisce social media e piani editoriali?
7. Quanto costa lavorare con Righello?
8. Come inizia un progetto con Righello?
9. Per quali settori lavora Righello?
10. Cosa rende Righello diversa da una normale agenzia grafica?

## Regole FAQ

- risposte da 2-4 frasi
- niente superlativi vuoti
- scrittura quotabile da AI
- includi parole chiave naturali
- non inventare prezzi precisi se non presenti; usa range indicativi solo se confermati o frasi tipo “dipende dalla complessità”

Aggiungi schema `FAQPage` corrispondente alle FAQ visibili.

---

# FASE 8 — Creare pagine servizio SEO

Crea pagine dedicate per i servizi. Non basta avere tutto in homepage.

## Route consigliate

```txt
/servizi/sviluppo-siti-web/
/servizi/sviluppo-software/
/servizi/branding/
/servizi/produzione-foto-video/
/servizi/social-media-marketing/
/servizi/consulenza-digitale/
```

## Struttura pagina servizio

Ogni pagina deve avere:

```txt
H1: [Servizio] per aziende a Pordenone, Friuli-Venezia Giulia e Veneto
Intro: cosa fa Righello e per chi
Sezione: cosa include il servizio
Sezione: per chi è adatto
Sezione: processo di lavoro
Sezione: esempi o progetti collegati
Sezione: FAQ
CTA: contatta Righello
Link interni: homepage, progetti, contatti, servizi correlati
Schema: Service + FAQPage + BreadcrumbList
```

Lunghezza consigliata: 700-1000 parole reali per pagina, ma senza keyword stuffing.

---

# FASE 9 — Creare pagine località

Crea pagine località per intercettare query locali.

## Route consigliate

```txt
/agenzia-digitale-pordenone/
/agenzia-digitale-treviso/
/agenzia-digitale-udine/
/agenzia-digitale-venezia/
/agenzia-digitale-friuli-venezia-giulia/
/agenzia-digitale-veneto/
```

## Struttura pagina località

Ogni pagina deve avere:

```txt
H1: Agenzia digitale a [Città]
Intro specifica sulla città / area
Servizi offerti in quella zona
Tipologie di clienti locali
Perché lavorare con Righello
FAQ localizzate
CTA contatti
Link interni a servizi e progetti
Schema LocalBusiness + FAQPage + BreadcrumbList
```

Lunghezza consigliata: 500-800 parole per pagina.

Attenzione: non creare pagine duplicate cambiando solo il nome città. Ogni pagina deve avere dettagli e copy specifici.

---

# FASE 10 — Markdown mirrors `/index.md`

Crea una versione markdown pulita per ogni pagina pubblica.

Esempio:

```txt
https://www.wearerighello.com/index.md
https://www.wearerighello.com/chi-siamo/index.md
https://www.wearerighello.com/progetti/index.md
https://www.wearerighello.com/servizi/sviluppo-siti-web/index.md
```

## Obiettivo

Dare a ChatGPT, Claude, Perplexity e altri sistemi AI una versione pulita delle pagine, senza script, animazioni, menu, footer o elementi visuali inutili.

## Requisiti markdown

Ogni `index.md` deve contenere frontmatter:

```md
---
title: "Titolo pagina"
description: "Meta description pagina"
url: "https://www.wearerighello.com/percorso/"
last_updated: "2026-05-14"
---
```

Poi il contenuto pulito:

```md
# Titolo pagina

Testo descrittivo chiaro.

## Sezione

Contenuto utile.
```

## Script consigliato

Crea uno script in:

```txt
/scripts/generate-markdown-mirrors.js
```

Oppure Python se il progetto è più adatto.

Lo script deve:

- leggere tutte le route pubbliche
- escludere 404, thank-you, admin, preview, asset
- rimuovere nav, footer, script, style, iframe, cookie banner, classi decorative
- convertire contenuto principale in markdown
- aggiungere frontmatter
- salvare `index.md` accanto alla pagina corrispondente
- aggiornare automaticamente la sezione “Markdown Mirrors” dentro `llms.txt`

---

# FASE 11 — Servire `.md` come testo leggibile

Assicurati che i file `.md` siano serviti con:

```txt
Content-Type: text/plain; charset=utf-8
X-Robots-Tag: index, follow
```

## Se il progetto è su Vercel

Aggiungi o aggiorna `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*).md",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/plain; charset=utf-8"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        },
        {
          "key": "X-Robots-Tag",
          "value": "index, follow"
        }
      ]
    }
  ]
}
```

## Se il progetto è su Netlify / Cloudflare Pages

Aggiungi `_headers`:

```txt
/*.md
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=3600
  X-Robots-Tag: index, follow
```

Scegli la configurazione corretta in base al progetto reale.

---

# FASE 12 — Migliorare heading e contenuto homepage

La homepage deve comunicare subito cosa fa Righello, non solo essere estetica.

Assicurati che esista un solo H1 principale, per esempio:

```txt
Agenzia digitale a Pordenone per siti web, branding, software e contenuti
```

Poi usa H2 chiari:

```txt
Servizi digitali per aziende
Sviluppo siti web e software
Branding e identità visiva
Produzione foto e video
Social media e contenuti
Progetti realizzati
Domande frequenti
```

Non usare testi spezzati solo per effetto grafico se penalizzano la comprensione semantica.

Se serve per il design, mantieni il testo grafico, ma aggiungi testo semantico leggibile per crawler e screen reader.

---

# FASE 13 — Alt text immagini

Tutte le immagini importanti devono avere alt text descrittivo.

Esempi:

```txt
alt="Progetto branding realizzato da Righello per Salotto Mixology & Food"
alt="Produzione foto e video Righello per evento sportivo"
alt="Sito web sviluppato da Righello per Black & White Energy Consulting"
```

Evita alt generici tipo:

```txt
Image
Project image
Hero Project 1
```

Le immagini decorative possono avere `alt=""`.

---

# FASE 14 — Internal linking

Aggiungi link interni naturali:

- homepage → servizi
- homepage → progetti
- homepage → contatti
- servizi → progetti correlati
- progetti → servizi usati
- blog → servizi e contatti
- pagine località → servizi
- footer → pagine principali e servizi

Ogni pagina servizio deve linkare almeno:

- homepage
- contatti
- 2 servizi correlati
- 1 o più progetti, se disponibili

---

# FASE 15 — Blog SEO

Se il blog esiste ma è sottile, miglioralo.

Crea o ottimizza almeno 6 articoli utili:

```txt
/blog/quanto-costa-un-sito-web-aziendale/
/blog/come-scegliere-agenzia-digitale/
/blog/sito-web-o-social-media-cosa-serve-a-un-azienda/
/blog/perche-i-contenuti-video-aiutano-le-aziende/
/blog/branding-per-pmi-cosa-significa/
/blog/software-su-misura-o-gestionale-standard/
```

Ogni articolo deve avere:

- title SEO
- description
- H1
- H2 ordinati
- FAQ finali
- Article schema
- BreadcrumbList schema
- link a servizi correlati
- CTA contatti

---

# FASE 16 — Canonical e redirect dominio

Assicurati che la versione canonica sia:

```txt
https://www.wearerighello.com/
```

Controlla che:

- `https://wearerighello.com/` rediriga a `https://www.wearerighello.com/`
- non ci siano duplicati http / https
- ogni pagina abbia canonical coerente

---

# FASE 17 — Validazioni finali

Dopo l'implementazione verifica:

```txt
https://www.wearerighello.com/llms.txt
https://www.wearerighello.com/robots.txt
https://www.wearerighello.com/sitemap.xml
https://www.wearerighello.com/index.md
```

Poi controlla:

- `curl -I https://www.wearerighello.com/index.md`
- `curl -I https://www.wearerighello.com/llms.txt`
- validator.schema.org
- Google Rich Results Test
- Lighthouse SEO
- pagine indicizzabili con status 200
- sitemap valida XML
- robots.txt con sitemap inclusa

---

# FASE 18 — Output richiesto da Replit

Alla fine mostrami:

1. file creati
2. file modificati
3. sitemap generata
4. robots.txt finale
5. llms.txt finale
6. lista delle pagine servizio create
7. lista delle pagine località create
8. lista markdown mirrors generati
9. schema JSON-LD aggiunti
10. problemi rimasti
11. istruzioni per inviare la sitemap in Google Search Console

---

# FASE 19 — Google Search Console

Non puoi configurare GSC direttamente se non hai accesso, ma prepara istruzioni chiare:

1. aprire Google Search Console
2. aggiungere proprietà dominio `wearerighello.com`
3. verificare via DNS TXT
4. inviare `https://www.wearerighello.com/sitemap.xml`
5. richiedere indicizzazione delle pagine principali
6. dopo 3-7 giorni controllare query, impression, CTR e posizione media

---

# FASE 20 — Priorità assoluta

Implementa in questo ordine:

1. robots.txt
2. sitemap.xml
3. llms.txt
4. metadata e canonical
5. schema JSON-LD
6. FAQPage schema
7. pagine servizio
8. pagine località
9. markdown mirrors
10. alt text immagini
11. internal linking
12. blog SEO
13. validazioni finali

---

## Nota importante

Non limitarti a creare file vuoti o placeholder. Ogni contenuto deve essere reale, utile e coerente con Righello.

Non inventare dati fiscali, indirizzi, numeri di telefono o prezzi se non presenti nel codice o nei contenuti forniti.

Se mancano dati certi, usa solo:

- nome azienda
- sito
- email pubblica
- servizi reali
- aree geografiche strategiche
- descrizioni qualitative non fuorvianti

