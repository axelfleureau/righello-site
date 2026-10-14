# SEO e GEO: testi proposti (non inseriti nel sito)

Il sito non e' stato toccato nel suo aspetto: i testi qui sotto vanno decisi da Axel prima di comparire nelle pagine.
Ogni risposta e' scritta per essere **citabile da sola** da un motore di ricerca o da un assistente AI (poche righe, soggetto esplicito, solo fatti presi dal sito).

Convenzioni:

- **[DA CONFERMARE]** = l'affermazione non e' dimostrabile da quello che il sito dice oggi: serve la parola di Axel (o una prova) prima di pubblicarla.
- Tutto il resto e' gia' scritto, in altre parole, nelle pagine o nelle schede progetto.
- Dove va una risposta in apertura: subito sotto il titolo della pagina, prima dei pulsanti, in un paragrafo normale (non in un riquadro nascosto).

## 1. Risposte in apertura (40-60 parole)

Sono la frase che un motore di risposta puo' leggere come definizione della pagina: chi e' Righello, cosa fa, per chi.

| Pagina | Testo proposto | Parole |
|---|---|---|
| `/servizi/agenti-ai` | Righello è uno studio digitale con sede legale a Pordenone e base operativa a Mestre. Costruisce agenti AI su misura, collegati a gestionale, CRM, email e documenti dell’azienda: svolgono i compiti ripetitivi e passano al team i casi che chiedono una persona. Lavora con aziende, studi ed enti del Friuli-Venezia Giulia e del Veneto. | 54 |
| `/servizi/marketing` | Righello è uno studio digitale con sede legale a Pordenone e base operativa a Mestre. Per le aziende gestisce social media, piano editoriale e community, e produce in casa foto, video e testi. Ogni mese consegna un report su cosa ha funzionato. Lavora con hotel, marchi e attività locali del Friuli-Venezia Giulia e del Veneto. | 55 |
| `/servizi/advertising` | Righello è uno studio digitale con sede legale a Pordenone e base operativa a Mestre. Imposta e gestisce campagne Google Ads, Meta Ads e TikTok Ads, con il tracciamento di ogni contatto dal clic alla richiesta e prove continue su creatività, testi e pubblici. Lavora con aziende del Friuli-Venezia Giulia e del Veneto. | 53 |
| `/servizi/web` | Righello è uno studio digitale con sede legale a Pordenone e base operativa a Mestre. Progetta e sviluppa siti web, negozi online, web app e software su misura, collegati a CRM, gestionale e pagamenti. Tra i lavori: il sito con prenotazione diretta di Portopiccolo Apartments e il gestionale Tetha per le imprese edili. | 53 |
| `/agenzia-marketing-pordenone` | Righello ha sede legale a Pordenone e lavora con aziende di Pordenone e del Friuli-Venezia Giulia. Un solo team segue marketing, advertising, siti web, software e agenti AI, con un solo referente. Tra i lavori: Fiumedica, Scuola Sci Piancavallo, Reguta e il gestionale Tetha. La prima chiamata è gratuita. | 49 |
| `/agenzia-marketing-mestre` | Righello ha base operativa a Mestre, in Via Pio X 21, e lavora con aziende di Mestre, Venezia e del Veneto. Un solo team segue marketing, SEO locale, Google Ads, Meta Ads, social, siti web e automazioni. Tra i lavori: Bibione Sand Storm, Portopiccolo Apartments, Elite Hotel & Spa e Óptima. La prima chiamata è gratuita. | 56 |

Da confermare in questi testi: «con aziende, studi ed enti» (agenti AI: gli enti sono i Comuni di DICO e dell'assistente in sperimentazione), «produce in casa» (e' scritto nel metodo del servizio marketing), «Ogni mese consegna un report» (e' scritto nell'esito del servizio, ma e' un impegno).

## 2. Domande reali e risposte citabili

Le domande vengono dalle ricerche che le persone fanno davvero («agenti AI per aziende Pordenone», «sviluppo gestionale su misura Friuli», «agenzia marketing Mestre», «app per iPhone su misura», «assistente AI per Comuni»). Si possono mostrare come sezione «Domande» (la pagina ne ha gia' una) oppure come pagina `/domande`, e inserire nei file `src/lib/data/faqs/` (le domande sono visibili e, se non portano il flag `structured: false`, entrano da sole nei dati strutturati e in `llms-full.txt`).

### Agenti AI (`/servizi/agenti-ai`)

**Che cos'è un agente AI per un'azienda?**
Un agente AI è un programma che svolge compiti al posto di una persona: legge email e documenti, inserisce dati nel gestionale o nel CRM, risponde alle richieste più semplici. Righello li costruisce su misura sui flussi dell’azienda e li collega ai sistemi che già usa, lasciando al team i casi che chiedono una persona.

**Quali compiti si possono affidare a un agente AI?**
Amministrazione, assistenza ai clienti sulle richieste più frequenti, gestione dei documenti e report automatici. Righello parte dai flussi reali dell’azienda e decide con il cliente cosa automatizzare e cosa no.

**L’agente AI sostituisce il personale?**
No: lavora al fianco del team, non al suo posto. Si occupa dei compiti ripetitivi e passa a una persona i casi eccezionali, che restano sotto il controllo del team.

**Un agente AI si collega al mio gestionale o al mio CRM?**
Sì. Gli agenti dialogano con gestionale, CRM, email, database e servizi che l’azienda ha già, senza doverli cambiare.

**Esistono esempi di assistenti AI per i Comuni?**
Sì. Un assistente WhatsApp è in sperimentazione in un Comune del Friuli-Venezia Giulia: risponde usando le pagine ufficiali dell’ente (servizi, eventi, notizie), rimanda alla fonte e, se l’informazione non c’è, lo dice invece di inventarla. DICO.ONLINE, già online, porta le comunicazioni dei Comuni su WhatsApp e Telegram. (Schede: `/progetti/assistenti-pa`, `/progetti/dico`. Non nominare il Comune senza il suo consenso.)

**Dove finiscono i dati dei miei clienti?**
Si decide all’inizio del progetto. Nell’assistente per i Comuni, ad esempio, i dati personali vengono anonimizzati prima di essere elaborati; per DICO l’archivio e gli allegati sono ospitati in Europa. **[DA CONFERMARE: in quali paesi girano i modelli AI usati e se i dati escono dall’Unione Europea; scrivere una frase sola, vera e verificabile.]**

**Quanto costa un agente AI?**
Non c’è un listino: il costo dipende dai flussi da automatizzare e dai sistemi da collegare. Si parte da una chiamata gratuita, poi Righello prepara un preventivo scritto con tempi e consegne chiari. **[DA CONFERMARE: se Axel vuole indicare un punto di partenza in euro, come per «un sito aziendale parte da qualche migliaio di euro».]**

**Il Bando AI FVG 2026 è ancora aperto?**
No: lo sportello 2026 ha esaurito le risorse e al momento non è stato annunciato un nuovo round. Righello aiuta a individuare casi d’uso AI concreti e a progettare la soluzione, ma non è l’ente erogatore del contributo.

### Siti web e software (`/servizi/web`)

**Sviluppate gestionali su misura in Friuli-Venezia Giulia?**
Sì. Righello sviluppa gestionali e web app su misura per aziende e studi del Friuli-Venezia Giulia e del Veneto. Esempi sono Tetha, per le imprese edili, e Óptima, per agenzie e studi. Si parte da come lavora l’azienda, non da un prodotto già pronto.

**Fate siti con prenotazione diretta?**
Sì. Il sito di Portopiccolo Apartments, trentaquattro appartamenti nel borgo di Portopiccolo, è collegato al calendario del gestionale e permette di prenotare senza passare dal telefono; il prezzo «da» è calcolato sul primo soggiorno davvero prenotabile.

**Realizzate negozi online?**
Sì, su Shopify o su misura: catalogo, pagamento semplice e collegamento al gestionale, per vendere a privati e aziende.

**Il codice del sito o del software è mio?**
Sì: codice, design e materiali sono del cliente. Il cliente riceve accesso all’archivio del codice, alla documentazione e a tutti i materiali.

**Cosa succede dopo la pubblicazione?**
Righello forma chi userà il sito e consegna la documentazione. Per aggiornamenti, sicurezza e miglioramenti propone piani di manutenzione mensili con hosting gestito, copie di sicurezza, piccole modifiche e assistenza prioritaria.

**Fate anche la SEO del sito?**
Sì, SEO tecnico e dei contenuti per salire nei risultati di ricerca. Nessuno può garantire una posizione precisa: si può rendere la presenza più forte e coerente.

**Quanto tempo ci vuole per un sito?**
**[DA CONFERMARE: nella pagina è scritto «siti vetrina 4-6 settimane, e-commerce 6-10, web app su misura 8-16». Finché Axel non conferma i tempi, non vanno nei dati strutturati né in `llms.txt` (oggi sono esclusi).]**

### Marketing e social media (`/servizi/marketing`)

**Chi gestisce i social di un’azienda o di un hotel a Pordenone e Mestre?**
Righello: strategia, piano editoriale, produzione di foto, video e testi, risposta alla community e un report ogni mese. Per hotel e strutture ha prodotto, per esempio, i contenuti di Elite Hotel & Spa e il video aereo di Riviera Resort a Lignano Sabbiadoro.

**Cosa include la gestione dei social media?**
Strategia e pianificazione editoriale, produzione video, testi per social, pubblicità e sito, servizi fotografici, gestione della community e piano editoriale mensile con calendario e rubriche.

**Chi produce foto e video per un hotel?**
Righello li produce con il proprio team, dal servizio fotografico al montaggio, nei formati giusti per ogni piattaforma. Schede: `/progetti/elite-hotel-spa`, `/progetti/riviera-resort`.

**Ogni quanto ricevo un report?**
Una volta al mese: cosa ha funzionato e cosa si cambia nel mese successivo.

**Quanto costa la gestione dei social?**
Dipende dai servizi inclusi e dal budget da gestire. La prima chiamata è gratuita; dopo Righello prepara una proposta scritta con tempi e consegne.

**In quanto tempo si vedono i risultati?**
**[DA CONFERMARE: la pagina dice «i primi miglioramenti si vedono dai 3 mesi». È una promessa di risultato: oggi resta fuori dai dati strutturati e da `llms.txt`.]**

### Advertising (`/servizi/advertising`)

**Gestite campagne Google Ads e Meta Ads a Pordenone e Mestre?**
Sì: Google Ads (Ricerca, Display, Shopping, Performance Max), Meta Ads su Facebook e Instagram e TikTok Ads, con tracciamento e cruscotti su misura.

**Che differenza c’è tra Google Ads e Meta Ads?**
Google Ads intercetta chi sta già cercando qualcosa e lo porta a una richiesta. Meta Ads raggiunge pubblici ben definiti su Facebook e Instagram con creatività curate. Righello li imposta insieme, con lo stesso tracciamento.

**Come si misura il ritorno di una campagna?**
Con pixel, tracciamento lato server, GA4 e cruscotti su misura, seguendo ogni contatto dal clic alla richiesta. Si mettono alla prova creatività, testi e pubblici e si toglie ciò che non rende.

**Si può automatizzare la gestione dei contatti?**
Sì: flussi automatici accompagnano i contatti, inviano email e si collegano al CRM, anche quando il team è offline.

**Garantite i risultati delle campagne?**
**[DA CONFERMARE: oggi la pagina dice «definiamo obiettivi chiari… periodi di prova e ottimizzazione». Proposta: «No: nessuno può garantire un risultato. Righello fissa gli obiettivi all’inizio, misura ogni contatto e sposta il budget dove rende».]**

### Pagine per zona

**Pordenone (`/agenzia-marketing-pordenone`)**

- *Righello è un’agenzia marketing di Pordenone?* Righello ha la sede legale a Pordenone e la base operativa a Mestre. Lavora con aziende di Pordenone e del Friuli-Venezia Giulia su marketing, advertising, siti web, software e automazioni, con un solo team. **[DA CONFERMARE: se a Pordenone esiste un ufficio dove si lavora o si ricevono clienti; la pagina oggi dice solo «sede legale».]**
- *Lavorate anche fuori dal centro di Pordenone?* Sì, in tutta la provincia e nel Nord Italia, con incontri da remoto e sessioni sul territorio quando servono shooting, workshop o contenuti.
- *Che cosa include un progetto di marketing locale?* Di solito si parte da audit, posizionamento, tracciamento e piano di crescita; poi contenuti, campagne, sito o pagina di arrivo e report.
- *Come funziona la prima chiamata?* È gratuita: serve a capire obiettivi, mercato e situazione attuale. Poi arriva una proposta scritta.
- *Chi ha già lavorato con Righello in zona?* Fiumedica (sito, Fiume Veneto), Scuola Sci Piancavallo (sito), Reguta 1928 (contenuti social e gestionale), Tetha (gestionale per l’edilizia). Schede in `/progetti`.

**Mestre (`/agenzia-marketing-mestre`)**

- *Righello è un’agenzia marketing di Mestre?* Sì: la base operativa è a Mestre, in Via Pio X 21, 30174. Righello lavora con aziende di Mestre, Venezia e del Veneto su marketing, advertising, siti web, software e automazioni.
- *È la stessa azienda di Pordenone?* Sì: Righello S.r.l. ha sede legale a Pordenone e base operativa a Mestre. Un solo team, due luoghi.
- *Si può migliorare il posizionamento locale su Google?* Si può lavorare su sito, contenuti, SEO tecnica, pagine locali, scheda Google e segnali di fiducia. Nessuno può garantire una posizione precisa.
- *Meglio un’agenzia o un consulente freelance?* Dipende dal progetto: per una sola competenza può bastare un freelance; per collegare strategia, sito, contenuti, campagne e automazioni un team integrato riduce i passaggi.
- *Chi ha già lavorato con Righello in zona?* Bibione Sand Storm (sito), Portopiccolo Apartments (sito con prenotazione diretta), Elite Hotel & Spa (foto e video), Óptima (gestionale).

## 3. Affermazioni oggi nel sito che NON sono dimostrabili (vanno confermate o tolte)

Non le ho toccate (il testo visibile non si modifica in questo lavoro); le ho tolte da JSON-LD, `llms.txt` e `llms-full.txt`.

| Dove | Cosa dice | Perche' e' un rischio |
|---|---|---|
| Home, fascia numeri (`src/routes/+page.svelte`) | «470+ progetti completati», «25M+ views generate», «98% clienti soddisfatti», «8.5x ROAS medio ads» | Nessuna fonte pubblica; le schede progetto sono 21. Un assistente AI le cita come fatti. |
| Home, badge sotto l'apertura | «Meta Partner», «Google Partner», «5.0 Rating» | Sono qualifiche e valutazioni verificabili da terzi (elenchi dei partner, recensioni): senza prova sono un rischio legale e di fiducia. |
| Home, domande (`faqs/home.ts`) | «340% di engagement e ROAS 8.5x», «account manager dedicato», «senza esternalizzare», «esperienza diretta in energy, immobiliare, manifatturiero», «grandi aziende» | Stesse cifre; i settori non hanno una scheda progetto. |
| Servizi, domande (`service-details.ts`) | «clienti in tutta Europa», «dai 3 mesi», tempi in settimane, «correzione dei difetti per 6 mesi» | Impegni e promesse: confermare. Il pagamento «30% / 40% / 30%» e' rimasto nei dati strutturati: confermare anche questo. |
| Contatti, domande | «un sito aziendale parte da qualche migliaio di euro» | E' un prezzo: va deciso. |
| Immagine di condivisione precedente (`og.png`) | Mostrava «Meta Partner / Google Partner / 5.0 Rating» ed e' quella che Google ha ripreso nella scheda | Sostituita; il file e' stato tolto. |
| BUFFR su App Store | Lo sviluppatore e' «RIGHELLO SRL», nel sito «Righello S.r.l.» | Stessa persona giuridica, nomi diversi: allinearli nella scheda dello store. |

## 4. Pagine nuove che avrebbero senso

Solo dove ci sono **prove vere** da mostrare (schede progetto gia' pubbliche) e una domanda reale dietro. Una pagina per problema, non per parola chiave.

| Pagina | Per chi / che problema | Prove vere da usare |
|---|---|---|
| `/comuni` — Comunicazione e assistenti AI per i Comuni | Un Comune che vuole comunicare su WhatsApp e rispondere ai cittadini | DICO.ONLINE (online), assistente WhatsApp in sperimentazione in un Comune del FVG |
| `/edilizia` — Scadenze e documenti di cantiere | Imprese edili, lattonieri, subappaltatori | Tetha (online, app iPhone in prova) |
| `/hotel-e-strutture` — Siti e contenuti per chi ospita | Hotel, appartamenti, resort | Portopiccolo Apartments (prenotazione diretta), Elite Hotel & Spa, Riviera Resort |
| `/sport-locale` — Dirette, regia e risultati per lo sport locale | Societa' sportive, organizzatori, TV locali | BUFFR (App Store), BUFFR Live, Produzione delle partite, CH77+, Canale 77 On Demand, Rig Cast |
| `/gestionale-su-misura` — Quando un gestionale pronto non basta | Agenzie, studi, ristoranti | Óptima, Gusto Raffinato Sala, Reguta (conformita') |
| `/domande` — Le domande che ci fanno di piu' | Chi cerca risposte rapide (e gli assistenti AI) | Le risposte di questo documento, una volta confermate |
| `/prezzi` — Come si costruisce un preventivo | Chi vuole sapere «quanto costa» | Solo dopo che Axel decide cosa dichiarare (oggi nessuna cifra e' pubblica) |

Ognuna: una sola risposta in apertura (come sopra), tre-quattro schede progetto reali con il loro stato, domande e risposte, un invito. Si aggiungono a `src/lib/seo/pages.ts` e ricevono da sole sitemap, immagine di condivisione e `lastmod`.

## 5. Pagine da NON fare

- **Una pagina per ogni citta' dove Righello non ha sede** («agenzia marketing Treviso», «Udine», «Trieste», «Padova», «Verona»…): sono pagine-porta. Google le penalizza (spam di tipo «doorway») e un assistente AI non le cita perche' il luogo non e' vero. Il Veneto e il FVG sono gia' dichiarati nelle pagine di Mestre e Pordenone.
- **Varianti della stessa parola chiave** («agenzia SEO», «web agency», «agenzia grafica» Pordenone): una pagina sola per intento, con la risposta migliore.
- **Pagine per settori senza prove** (energy, immobiliare, manifatturiero): non c'e' una scheda progetto dietro.
- **Pagine con recensioni, premi, «numero uno», «migliore agenzia»**: nessuna prova pubblica.
- **Pagine con cifre di prezzo** finche' Axel non decide cosa dichiarare.
- **Copie di testo fra pagine** (stesso paragrafo con la citta' cambiata): si perde la citazione e si perde il posizionamento.
