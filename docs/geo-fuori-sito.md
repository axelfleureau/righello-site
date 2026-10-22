# SEO e GEO fuori dal sito: cosa fare e come misurarlo

Il sito ora dice le cose giuste (dati strutturati, immagini per pagina, `llms.txt`, mappa con date vere). Ma un motore di ricerca o un assistente AI **non si fida di quello che un'azienda dice di se'**: si fida di quello che dicono gli altri, e di quanto le fonti coincidono fra loro. Questa lista e' per Axel: passi concreti, ognuno con il modo di verificare che sia fatto.

Regola di fondo: **gli stessi dati dappertutto** (nome, indirizzo, email, descrizione). Quelli di riferimento sono nel sito, in `src/lib/data/site.ts` e `contact.ts`:

| Dato | Valore | Dove si legge nel codice |
|---|---|---|
| Nome | Righello S.r.l. (marchio: Righello) | `COMPANY.legalName`, `COMPANY.name` |
| Indirizzo operativo | Via Pio X 21, 30174 Mestre (VE) | `CONTACT.street` |
| Sede legale | Pordenone | `COMPANY.legalSeat` |
| Email | hello@wearerighello.com | `COMPANY.email` |
| Telefono | **nessuno pubblicato** (c'e' solo WhatsApp +39 339 399 8351) | `CONTACT.phone` e' `null` |
| Orari | Lun - Ven: 9:00 - 18:00 | `CONTACT.hours` |
| P.IVA | IT01979970934 | `COMPANY.vat` |
| Sito | https://www.wearerighello.com | `SITE_URL` |
| Fondata | 2023 | `COMPANY.founded` |

## A. Da fare subito dopo il deploy (mezz'ora)

1. **Search Console**: il sito e' gia' verificato (tag `google-site-verification` in `src/app.html`). Aggiungi la mappa `https://www.wearerighello.com/sitemap.xml` (Indicizzazione → Sitemap). Poi, in «Controllo URL», incolla e «Richiedi indicizzazione» per: home, `/servizi/agenti-ai`, `/servizi/web`, `/servizi/marketing`, `/servizi/advertising`, `/agenzia-marketing-pordenone`, `/agenzia-marketing-mestre`, `/progetti`, `/buffr`. *Verifica:* in «Pagine» le nove compaiono come «Indicizzata» entro pochi giorni.
2. **Bing Webmaster Tools** (alimenta anche Copilot e, indirettamente, la ricerca di ChatGPT): aggiungi il sito importandolo da Search Console (un clic), invia la stessa mappa. *Verifica:* «Sitemap» in stato «Operazione completata».
3. **IndexNow** (Bing, Yandex e altri): dopo il deploy, dalla cartella del sito: `node scripts/indexnow.mjs --dry-run` per vedere cosa invia, poi `node scripts/indexnow.mjs`. La chiave e' il file `static/cf7fa3bd42a46af23b0de7e655875bb9.txt`: deve rispondere 200 su `https://www.wearerighello.com/cf7fa3bd42a46af23b0de7e655875bb9.txt` **prima** di inviare. Google non usa IndexNow. Ripeti ad ogni pubblicazione che cambia dei contenuti.
4. **Anteprime dei link**: le immagini di condivisione sono nuove (`/og/*.jpg?v=1`). Per costringere i social a rileggerle: Facebook Sharing Debugger («Scrape again») e LinkedIn Post Inspector sulle pagine principali. *Verifica:* l'anteprima mostra l'immagine della pagina, non quella della home.
5. **Test dei dati strutturati**: Rich Results Test (search.google.com/test/rich-results) e validator.schema.org su `/`, `/servizi/agenti-ai`, `/agenzia-marketing-mestre`, `/buffr`, `/progetti/tetha`. *Verifica:* nessun errore; gli avvisi su «telefono» sono attesi (non c'e' un numero pubblico).
6. **Vecchia immagine di condivisione**: la vecchia `og.png` (con «Meta Partner / Google Partner / 5.0 Rating») non esiste piu'. Google la teneva in cache: la scheda dell'AI Overview mostrera' quella nuova alla prossima lettura (giorni o settimane).

## B. Profili e schede (una volta, poi aggiornare)

### Profilo dell'attivita' su Google (Google Business Profile)

- **Mestre: si.** Ha via, CAP e orari. Crea il profilo con l'indirizzo di Via Pio X 21 e la verifica richiesta da Google (di solito cartolina, video o telefonata).
- **Pordenone: solo se esiste un posto dove si lavora o si ricevono clienti.** Le regole di Google vietano profili per uffici virtuali, domiciliazioni o sole sedi legali; un profilo non conforme viene sospeso e danneggia anche l'altro. Se a Pordenone c'e' solo la sede legale, **non creare il profilo**: la presenza su Pordenone passa dalla pagina `/agenzia-marketing-pordenone` e dall'area di servizio del profilo di Mestre. *(Controlla le regole attuali di Google prima di decidere.)*
- **Categoria principale**: «Agenzia di marketing» (o la voce piu' vicina nell'elenco di Google). **Categorie aggiuntive** (max 9, solo quelle vere): agenzia web, sviluppatore di software, agenzia pubblicitaria, consulente di marketing. I nomi esatti cambiano: scegli dall'elenco.
- **Servizi** da inserire (uno per riga, con una frase): social media marketing, Google Ads, Meta Ads, TikTok Ads, siti web, e-commerce, applicazioni web, software su misura, agenti AI, automazione dei processi, produzione video, servizi fotografici.
- **Descrizione** (fino a 750 caratteri): la frase di `COMPANY_SUMMARY` + un servizio per riga + «prima chiamata gratuita». Niente numeri non dimostrabili, niente «migliore».
- **Sito web del profilo di Mestre**: `https://www.wearerighello.com/agenzia-marketing-mestre`. **Area di servizio**: Venezia, Mestre, Veneto; per Pordenone vedi sopra.
- **Orari**: Lun - Ven 9:00 - 18:00 (quelli del sito). **Foto**: ingresso, persone al lavoro, prodotti sullo schermo (solo se vere e recenti).
- *Verifica:* cerca «Righello Mestre» da un telefono, in navigazione privata: appare la scheda con orari e sito.

### Altre schede di luogo e di azienda

| Dove | Cosa | Verifica |
|---|---|---|
| **Bing Places for Business** | Importa il profilo Google (un clic). Alimenta Bing, Copilot e le risposte di ChatGPT con ricerca. | La scheda compare su bing.com/maps |
| **Apple Business Connect** | Scheda per Apple Mappe e Siri (gratis). Stessi nome, indirizzo, orari. | Compare in Mappe sull'iPhone |
| **LinkedIn (pagina azienda)** | Descrizione = `COMPANY_SUMMARY`, sito, sede, anno di fondazione 2023, settore, specialita' (le quattro dei servizi), logo e banner. I tre fondatori e le persone del team collegano il loro profilo alla pagina. Un post per ogni prodotto, con il link alla sua scheda. | `sameAs` del sito punta gia' a `linkedin.com/company/righello`: l'indirizzo deve restare quello |
| **Instagram e TikTok** | Biografia con la stessa frase e il link al sito (non a una pagina di link). Nome utente `wearerighello` (e' gia' nel sito). | I due indirizzi nel footer rispondono |
| **App Store, scheda di BUFFR** | Sito dello sviluppatore e «Sito web di marketing» = `https://www.wearerighello.com/buffr`; assistenza = `/contatti`; informativa privacy; nome del venditore allineato a «Righello S.r.l.». Nel testo, il nome «Righello» e il link al sito. | La scheda mostra il sito e il nome giusti |
| **Registro Imprese / Camera di Commercio** | Controlla che ragione sociale, sede legale e P.IVA coincidano con il sito. E' la fonte che molte directory e gli assistenti AI usano per verificare un'azienda. | Visura = dati del sito |
| **Crunchbase** (gratis) | Profilo azienda: stessa descrizione, sede, fondazione, sito, LinkedIn. | Il profilo e' pubblicato |
| **Wikidata** (opzionale) | Solo se ci sono almeno due fonti indipendenti (Registro Imprese, articoli di stampa). Se no, rimandare: una voce senza fonti viene cancellata. **Wikipedia: no.** | La voce resta online |

### Directory e riconoscimenti

- **Directory di agenzie** (Clutch, Sortlist, GoodFirms o equivalenti italiane): il profilo gratuito va bene, **niente piani a pagamento senza Axel**. Valgono solo le recensioni di clienti veri, verificate dalla piattaforma. Controlla ogni volta nome, indirizzo e sito.
- **Associazioni di categoria** della zona (Confindustria, Confcommercio, Confartigianato o simili, anche per Pordenone e Venezia): la pagina dei soci e' un link da una fonte locale autorevole. Verifica le condizioni prima di iscriverti.
- **Bando FVG**: la pagina `/bando-intelligenza-artificiale-fvg-2026` e' aggiornata al 2026 (sportello chiuso). Iscriviti alla newsletter degli incentivi della Regione per sapere se riapre; se riapre, aggiorna la pagina e invia gli indirizzi con `node scripts/indexnow.mjs /bando-intelligenza-artificiale-fvg-2026`. Segnala la pagina a consulenti e associazioni locali che spiegano il bando.

## C. Recensioni e prove (la leva piu' forte per Google e per gli assistenti AI)

1. **Recensioni vere su Google** dai clienti che hanno gia' lavorato con Righello: manda a ognuno il link breve del profilo («Scrivi una recensione»). Non offrire sconti o regali in cambio, non scriverle tu, non filtrarle. Rispondi a tutte, anche alle negative.
2. **Non metterle nei dati strutturati del sito**: per le imprese Google ignora le valutazioni «scritte da se' stessi» (`AggregateRating` su Organization o LocalBusiness) e puo' penalizzare il sito. Le recensioni valgono dove stanno (Google, directory): il sito le puo' citare nel testo con il link alla fonte.
3. **«Sito realizzato da Righello»**: chiedi ai clienti dei siti (Portopiccolo Apartments, Bibione Sand Storm, Scuola Sci Piancavallo, Fiumedica, Neura, Canale 77, DICO) un credito nel piede, con link a `https://www.wearerighello.com` (o alla scheda del progetto). Testo del link: «Righello», non una frase piena di parole chiave. *Verifica:* il link compare nel codice della pagina del cliente.
4. **Citazioni nella stampa locale** (Il Gazzettino, Messaggero Veneto, VeneziaToday e testate simili della zona): un comunicato per BUFFR su App Store, per i nuovi siti pubblicati (Bibione Sand Storm), per i progetti con enti **solo se l'ente acconsente a essere nominato**. Ogni articolo con il link al sito vale piu' di dieci directory.
5. **Casi d'uso con nome e cognome**: quando un cliente lo permette, una scheda progetto con il suo nome e una frase sua. E' il tipo di prova che un assistente AI cita.

## D. Misurare: 30 domande da fare ogni mese

Ogni primo lunedi' del mese, **da un browser in navigazione privata** (senza accessi), fai le stesse 30 domande su: Google (AI Overview e Modalita' AI), ChatGPT (con ricerca), Perplexity, Gemini e Claude (con ricerca web attiva). Compila una tabella per motore. Salva i risultati con la data nella cartella dove tieni gli audit.

### Le 30 domande

Locali e di zona

| N. | Domanda |
|---|---|
| 1 | agenzia marketing a Pordenone |
| 2 | agenzia marketing a Mestre |
| 3 | web agency Venezia Mestre |
| 4 | produzione AI a Pordenone |
| 5 | agenti AI per aziende Pordenone |
| 6 | agenzia siti web Pordenone |
| 7 | sviluppo software su misura Friuli-Venezia Giulia |
| 8 | sviluppo gestionale su misura Friuli |
| 9 | agenzia Google Ads Mestre |
| 10 | gestione social media per hotel in Friuli |
| 11 | agenzia foto e video per hotel e resort a Lignano o Bibione |
| 12 | assistente AI per i Comuni del Friuli-Venezia Giulia |
| 13 | chatbot WhatsApp per un Comune |
| 14 | messaggi dei Comuni su WhatsApp e Telegram |
| 15 | bando AI FVG 2026: chi può partecipare e il bando è ancora aperto |
| 16 | consulenza per il bando intelligenza artificiale FVG 2026 |
| 17 | sito con prenotazione diretta per appartamenti |

Per servizio e prodotto

| N. | Domanda |
|---|---|
| 18 | app per iPhone per salvare gli ultimi secondi di un video |
| 19 | app per salvare un gol appena successo mentre registro |
| 20 | software per imprese edili: scadenze e documenti di cantiere |
| 21 | gestionale per agenzie e studi con intelligenza artificiale |
| 22 | piattaforma per fotografi di eventi per vendere le foto online |
| 23 | app per prenotare nei ristoranti del Friuli-Venezia Giulia con tessera fedeltà |
| 24 | gestionale di sala per ristoranti su iPad |
| 25 | risultati del calcio dilettantistico in diretta in Veneto e Friuli |
| 26 | app iPhone per trasmettere video in RTMP o SRT verso la regia |
| 27 | Canale 77: partite on demand su HbbTV e smart TV |
| 28 | sito per una scuola di sci con corsi, prezzi e prenotazione online |

Marchio

| N. | Domanda |
|---|---|
| 29 | chi è Righello S.r.l. di Pordenone e Mestre |
| 30 | BUFFR: cos'è, è gratis, chi l'ha creata |

### Tabella da compilare (una per motore e per mese)

Motore: ____________ Data: ____/____/______ Chi ha controllato: ____________

| N. | Righello compare? (si/no) | Citata con link? (si/no/solo nome) | Posizione fra le fonti (1, 2, 3…) | Concorrenti citati | Pagina del sito citata | Note (testo sbagliato, immagine sbagliata, dato vecchio) |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |
| 8 | | | | | | |
| 9 | | | | | | |
| 10 | | | | | | |
| 11 | | | | | | |
| 12 | | | | | | |
| 13 | | | | | | |
| 14 | | | | | | |
| 15 | | | | | | |
| 16 | | | | | | |
| 17 | | | | | | |
| 18 | | | | | | |
| 19 | | | | | | |
| 20 | | | | | | |
| 21 | | | | | | |
| 22 | | | | | | |
| 23 | | | | | | |
| 24 | | | | | | |
| 25 | | | | | | |
| 26 | | | | | | |
| 27 | | | | | | |
| 28 | | | | | | |
| 29 | | | | | | |
| 30 | | | | | | |

### Riepilogo del mese

| Motore | Domande in cui compare (su 30) | Con link | Primo/seconda fonte | Concorrenti piu' citati |
|---|---|---|---|---|
| Google (AI Overview) | | | | |
| Google (Modalita' AI) | | | | |
| ChatGPT | | | | |
| Perplexity | | | | |
| Gemini | | | | |
| Claude | | | | |

**Punto di partenza (fine settembre 2026)**, dagli screenshot di Axel: per «produzione ai a pordenone» la pagina `/servizi/agenti-ai` era seconda fra i risultati organici; nell'AI Overview Righello era solo nominata, senza link, e la scheda mostrava la home. Morfex ed Extra Web avevano link e schede. Obiettivo del prossimo controllo: link alla pagina `/servizi/agenti-ai` con la sua immagine.

**Come leggere i numeri**: un cambiamento conta se si ripete per due mesi. Gli assistenti AI rispondono in modo diverso a ogni richiesta: ripeti la domanda tre volte e annota la maggioranza. Se una risposta contiene un dato sbagliato su Righello (indirizzo, servizio, stato di un prodotto), correggi **la fonte** (sito, scheda Google, directory), non la risposta.

## E. Dipartimento tecnico e AI (software house, gestionali, app, agenti AI)

Aggiunta del 22/10/2026. Il lavoro sul sito (pagine `/software-house-pordenone` e `/software-house-mestre`, pagina `/servizi/agenti-ai` rafforzata) e' descritto in `docs/seo-software-ai.md`. Qui sta quello che si fa **fuori** dal sito, perche' per «azienda sviluppo software Pordenone» le AI citano elenchi e directory (shugar.it, Pagine Gialle) e le schede dei Luoghi, non solo i siti.

Stessa regola di fondo: **gli stessi dati dappertutto** (tabella all'inizio del documento). In piu': la sede operativa e' Mestre; **non scrivere un indirizzo a Pordenone**, solo «sede legale».

### E1. Subito dopo il deploy (Search Console e Bing)

1. In Search Console, «Controllo URL» → «Richiedi indicizzazione» per `/software-house-pordenone`, `/software-house-mestre` e `/servizi/agenti-ai`. *Verifica:* compaiono come «Indicizzata» (anche dopo giorni).
2. `node scripts/indexnow.mjs` dopo il deploy (cambiano due pagine nuove e la pagina AI). *Verifica:* la chiave risponde 200 prima dell'invio.
3. Facebook Sharing Debugger e LinkedIn Post Inspector sulle due pagine nuove: l'anteprima deve mostrare «Software house a Pordenone» / «a Mestre», non la home.
4. Rich Results Test e validator.schema.org sulle tre pagine: `Service`, `FAQPage`, `ItemList`, `BreadcrumbList` senza errori; nessun `AggregateRating` (e' voluto).

### E2. Scheda Google (Profilo dell'attivita')

- Il profilo e' quello di **Mestre** (vedi sezione B): per il dipartimento tecnico si aggiungono **categorie aggiuntive vere**, scelte dall'elenco di Google (i nomi cambiano: cerca quelle vicine a «sviluppatore di software» e «azienda informatica», senza aggiungere categorie che non descrivono il lavoro).
- **Servizi**, uno per riga con una frase: software su misura, gestionali, app per iPhone e iPad, piattaforme web, integrazioni, automazioni, agenti AI. Stesse parole delle pagine.
- **Sito web** del profilo: `/agenzia-marketing-mestre` resta; nel testo di presentazione si puo' citare `/software-house-mestre`. Non cambiare il sito del profilo con una pagina diversa senza guardare cosa risponde meglio.
- **Foto**: persone al lavoro, schermate di prodotti **con dati d'esempio** (mai dati veri di clienti).
- **Recensioni**: solo di clienti veri, su richiesta (sezione C). Non offrire nulla in cambio. *Verifica:* da un telefono, in navigazione privata, cerca «software house Mestre»: compare la scheda.

### E3. Directory di software house (dove le AI pescano gli elenchi)

| Dove | Cosa fare | Nota |
|---|---|---|
| **shugar.it** | Registrare Righello come software house (sezione «Per le Software House»). Il profilo piu' completo sale nell'elenco. Oggi Righello **non e' fra le 12 di Pordenone ne' fra le 16 di Venezia**. | Controllare se e' gratuito e cosa chiede; **nessun piano a pagamento senza Axel**. Descrizione = la risposta in apertura della pagina di Pordenone; sede legale Pordenone, base operativa Mestre. |
| **Pagine Gialle** | Verificare se esiste gia' una scheda e allinearla (nome, indirizzo operativo, sito, categoria). | Solo scheda gratuita. |
| **Clutch / Sortlist / GoodFirms** | Profilo gratuito, con le schede progetto come casi. | Contano solo le recensioni verificate dalla piattaforma. |
| **LinkedIn** | Specialita' della pagina azienda: software su misura, app, gestionali, AI; un post per ogni prodotto, con il link alla sua scheda. | Vedi sezione B. |
| **App Store, scheda di BUFFR** | «Sito web dello sviluppatore» = `https://www.wearerighello.com/software-house-pordenone`, «Sito web di marketing» = `/buffr`. Nome del venditore «Righello S.r.l.». | E' l'unico prodotto su App Store: e' la prova piu' forte per «app per iPhone». |
| **Associazioni di categoria** | Come in sezione B: un link da una fonte locale. | Verificare le condizioni. |
| **Pagine delle persone** | Solo con il loro consenso: profilo LinkedIn collegato alla pagina azienda. Nessuna pagina persona e' stata creata nel sito. | Nel brief si parlava del sito «brain» delle persone: non e' stato trovato nel repository, quindi non e' stato toccato. |

### E4. Prove da raccogliere (le sole che contano per «software house»)

1. Il consenso di almeno **un cliente** a nominare il lavoro con una frase sua: e' il dato che le AI citano. Candidati dalle schede gia' pubbliche: i siti (Portopiccolo Apartments, Bibione Sand Storm, Scuola Sci Piancavallo, Fiumedica), con il link «Sito realizzato da Righello» (sezione C).
2. Per l'AI nei Comuni: **il consenso del Comune** a essere nominato; senza, la scheda resta anonima.
3. Una frase di Axel (o del cliente) su cosa e' cambiato dopo la messa online: solo se vera e misurabile.

### E5. Le 20 domande di prova per questo tema

Stesso metodo della sezione D (navigazione privata, Google AI Overview e Modalita' AI, ChatGPT con ricerca, Perplexity, Gemini, Claude con ricerca; tre ripetizioni, vale la maggioranza). Il primo lunedi' del mese.

| N. | Domanda |
|---|---|
| 1 | azienda sviluppo software Pordenone |
| 2 | software house Pordenone |
| 3 | sviluppo software su misura Pordenone |
| 4 | gestionale su misura Friuli |
| 5 | sviluppo app iPhone Pordenone |
| 6 | software house Venezia Mestre |
| 7 | quanto costa un software su misura |
| 8 | software su misura o gestionale già pronto |
| 9 | app per iPhone e iPad su misura per un'azienda del Friuli-Venezia Giulia |
| 10 | chi è Righello S.r.l., software house di Pordenone e Mestre |
| 11 | intelligenza artificiale per aziende Pordenone |
| 12 | agenti AI per aziende Pordenone |
| 13 | produzione AI Pordenone |
| 14 | automazione dei processi aziendali con l'AI in Friuli |
| 15 | cos'è un agente AI aziendale |
| 16 | assistente AI per il sito o WhatsApp di un Comune |
| 17 | funzioni di intelligenza artificiale dentro un gestionale |
| 18 | come proteggere i dati con un assistente AI aziendale |
| 19 | Righello fa intelligenza artificiale per le macchine di produzione |
| 20 | Righello agenti AI: cosa ha già costruito |

Una tabella da compilare per motore e per mese:

Motore: ____________ Data: ____/____/______ Chi ha controllato: ____________

| N. | Righello compare? (si/no) | Citata con link? (si/no/solo nome) | Posizione fra le fonti | Concorrenti citati | Pagina del sito citata | Note |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |
| 8 | | | | | | |
| 9 | | | | | | |
| 10 | | | | | | |
| 11 | | | | | | |
| 12 | | | | | | |
| 13 | | | | | | |
| 14 | | | | | | |
| 15 | | | | | | |
| 16 | | | | | | |
| 17 | | | | | | |
| 18 | | | | | | |
| 19 | | | | | | |
| 20 | | | | | | |

**Punto di partenza (22/10/2026)**, dagli screenshot di Axel: per «azienda sviluppo software pordenone» Righello non compare (compaiono Magia, Logika Software, Mostrum, Alea, Prysma, tre.digital, Devangarde, Projecta, Noonic, Pagine Gialle, shugar.it); per «produzione ai a pordenone» la pagina `/servizi/agenti-ai` e' seconda fra i risultati ma nell'AI Overview Righello e' solo nominato, senza link. **Obiettivi del prossimo controllo**: (1) Righello compare con la pagina `/software-house-pordenone` per le domande 1-5; (2) link alla pagina `/servizi/agenti-ai` per le domande 11-14; (3) nessun dato sbagliato: in particolare nessun indirizzo a Pordenone, nessun servizio di AI per le macchine di fabbrica, nessun numero di clienti.
