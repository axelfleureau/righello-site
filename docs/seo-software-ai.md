# SEO e GEO per il dipartimento tecnico (software) e per l'AI

Stato: 22 ottobre 2026, ramo `seo/software-ai` (partenza `343f9bb`). Seguito di `docs/seo-audit.md`, `docs/seo-proposte.md` e `docs/geo-fuori-sito.md`.

Punto di partenza (screenshot di Axel, iPhone): per «azienda sviluppo software pordenone» nei risultati e nell'AI Overview/AI Mode compaiono Magia, Logika Software, Mostrum, Alea, Prysma, tre.digital, Devangarde, Projecta, Noonic, Pagine Gialle e shugar.it; Righello non c'è. Nei «Luoghi» compaiono schede con valutazioni e categoria «Azienda informatica». Per «produzione ai a pordenone» la pagina `/servizi/agenti-ai` era seconda tra i risultati, ma nell'AI Overview Righello era solo nominato, senza link.

## 1. Analisi della concorrenza: cosa si e' potuto verificare

**Limiti onesti.** Lo strumento di ricerca a disposizione e' solo americano e non restituisce le pagine dei risultati di Google, le AI Overview o le schede dei Luoghi, e i motori alternativi bloccano i robot. Quindi:

- **Non e' stato possibile** riprodurre i risultati veri per le dieci query, ne' vedere cosa citano le AI. Le dieci query sono state cercate (risultati poveri: elenchi di annunci di lavoro e directory) e **le pagine che vincono sono state lette una per una**.
- **Verificato leggendo la pagina** (22/10/2026): Devangarde, Logika Software, Prysma, tre.digital, Noonic, Morfex (home e `/ai/`), e due pagine della directory shugar.it (`/software-house/pordenone`, `/software-house/venezia`).
- **Non verificabile**: Mostrum (il dominio provato non risponde), Projecta ed Extra Web (connessione rifiutata), Alea (il dominio provato porta a un altro sito), Pagine Gialle e le valutazioni dei Luoghi (non raggiungibili). Di questi si sa solo cio' che mostrano gli screenshot. Magia compare nell'elenco di shugar.it (Magia S.r.l., Pordenone: ERP Magia³ e MagiaEXP, app web e mobile, business intelligence).
- I dati strutturati dei concorrenti non si leggono con questo strumento (restituisce il testo, non il codice): non si dice nulla sul loro JSON-LD.

### Cosa fanno le pagine che vincono

| Sito | Title / H1 | Struttura | Prove | FAQ | Note |
|---|---|---|---|---|---|
| Devangarde (Pordenone) | «Devangarde \| Software house a Pordenone» / «Sviluppiamo software web e soluzioni innovative» | 4 blocchi: chi siamo, prodotti e servizi, portfolio per ambito (9 voci senza link), contatti. ~650 parole | Nessun numero di clienti o anni; citata una partnership con un produttore | No | Il titolo contiene la ricerca esatta («software house a Pordenone»); indirizzo vero in pagina |
| Logika Software (Pordenone) | «Mago4 gestionale e servizi web per le imprese» / «Da 30 anni a fianco della trasformazione digitale delle imprese» | ERP, CRM, estensioni, loghi clienti, modulo. ~1.000 parole | 300 imprese clienti, 30 anni, 20 professionisti, valutazione 4,72/5 su oltre 8.000 recensioni, ~24 loghi | No | Le prove sono numeri e valutazioni: sono la ragione per cui compare nelle risposte; incoerente («30 anni» e «ventennale») |
| Prysma (Pordenone) | «Innovazione e Software di Qualità» / «Creiamo con te il futuro» | Servizi, marchi, certificazioni. ~950 parole con menu e piede | «Dal 1993», certificati e rivendite di marchi | No | Pagina di un'azienda IT tradizionale (assistenza, reti), non di una software house |
| tre.digital (Chions, PN) | title di ~90 caratteri su BIM, digital twin e software cloud | Servizi in tre aree, portfolio di 6 titoli senza descrizione | Certificazione ISO 9001 e loghi clienti | No | Settore specifico (BIM); testi di un modello rimasti in inglese e indirizzo di Seattle nel piede |
| Noonic (sede Padova) | «L'hub digitale che porta la tua azienda nel futuro» | Tre divisioni, 22 casi, risorse (92 articoli), pagine per 12 citta' | «50+ clienti», «100+ progetti», badge di partner | No (rassicurazioni, non domande) | Sedi dichiarate: Padova, Milano, Barcellona, Bangalore; pagine per 12 citta' (anche Pordenone e Udine): e' il modello che qui NON si copia |
| Morfex (Trieste, sede legale Monfalcone) | «Sviluppo AI, Web e App su Misura per Aziende \| Morfex»; sulla pagina AI «Agenti AI e automazioni su misura» | Nove settori, 11 modelli, otto servizi, processo in 4 fasi con «6-8 settimane», 6 FAQ, blocco GDPR/AI Act, pagine locali per Gorizia, Udine, Pordenone, Trieste | Due casi studio sulla home; nessuno sulla pagina AI; «da cinque anni» | **Si**, 6 domande (costo, dati propri, integrazione, modelli, privacy, ritorno) | Le FAQ sono il suo punto forte per la GEO; i casi d'uso sono generici; dichiara tempi e «fine tuning» |
| shugar.it (directory) | «Le migliori software house a Pordenone» (12 schede) | Elenco con filtri, scheda per azienda con descrizione, sede, dipendenti, fatturato | Nessuna recensione: i dati sono quelli che le software house inseriscono; i profili piu' completi salgono | No | **Righello non e' fra le 12**; elenca Magia, Devangarde, MOLO17, Eye-Tech, DigiCorp e altre. A Venezia elenca 16 aziende |

### Cosa se ne ricava

1. **Nessuna delle pagine lette ha una vera sezione di domande e risposte** tranne Morfex: e' il buco piu' semplice da riempire, e le risposte brevi sono cio' che le AI citano.
2. **Quasi nessuna mostra prove con stato e link** (un portfolio di nomi, non schede). Righello ha ventuno schede vere con lo stato di ognuno: e' un vantaggio, non va nascosto.
3. **Il titolo con la ricerca esatta** («software house a Pordenone») e' la regola, non l'eccezione, per chi vince.
4. **Dove ci sono numeri (Logika) sono recensioni e clienti**: Righello non puo' competere su quel terreno senza dati veri (vedi sotto); compete su prodotti propri, schede e risposte precise.
5. **Le AI citano elenchi e directory** («Principali software house»): per comparire servono profili completi nelle directory, non solo il sito (vedi sezione 5 e `docs/geo-fuori-sito.md`).
6. **Le pagine per citta' in cui non si ha sede** esistono (Noonic, Morfex) ma sono il rischio piu' grande per un sito piccolo: qui non si fanno.

## 2. Cosa manca a Righello (prima di questo lavoro)

- Nessuna pagina rispondeva a «software house», «software su misura», «gestionale su misura», «app per iPhone»: il dipartimento tecnico era descritto come «Agenzia siti web» (`/servizi/web`, che risponde bene a quell'intento e **resta com'e'**).
- Nessun profilo nelle directory di software house (shugar.it, Clutch e simili), nessuna scheda Google per il dipartimento tecnico, nessuna recensione verificabile.
- La pagina AI aveva un titolo e quattro lavori, ma nessuna risposta in apertura citabile, nessuna domanda specifica («cos'e' un agente AI», «produzione AI», «dati»), nessuna chiarezza su cosa Righello NON fa.

## 3. Cosa NON possiamo dire, e perche'

| Affermazione | Perche' no | Da cosa si vede |
|---|---|---|
| Anni di esperienza («da 10 anni», «trent'anni») | La societa' e' fondata nel 2023 | `COMPANY.founded` |
| Numero di clienti o di progetti («oltre 50 clienti», «100 progetti») | Non c'e' un dato pubblico: le schede progetto sono 21 | `case-studies.ts` |
| Recensioni, valutazioni, «5 stelle», premi | Nessuna recensione verificabile; i dati strutturati non le ammettono (test su ogni pagina) | `schema.test.ts` |
| Certificazioni (ISO) e partnership (Microsoft, Google, produttori di software) | Nessuna prova nel sito | — |
| «Leader», «migliore», «numero 1», «garantiamo» | Non dimostrabile | test `FORBIDDEN_IN_MARKETING` |
| Un indirizzo a Pordenone | Il sito dichiara solo la sede legale a Pordenone; l'indirizzo operativo e' a Mestre (Via Pio X 21) | `site.ts` |
| «Industria 4.0», ERP, MES, visione artificiale, manutenzione predittiva | Non c'e' una scheda progetto. Sulla pagina AI e' scritto, al contrario, che **non** sono un servizio | `service-details.ts` |
| Prezzi e tempi precisi per il software | Nessuna cifra pubblica decisa da Axel; i tempi in settimane dei servizi sono ancora «da confermare» | `docs/seo-proposte.md` |
| Tecnologie, linguaggi, fornitori, modelli AI | Axel li ritiene troppo dettaglio; un test li cerca nei testi | `software-house.test.ts` |
| «Addestrato», «fine tuning» | Le funzioni AI usano il recupero dei dati (DICO: «non e' riaddestrato») | `landing/dico.ts` |
| Nomi dei Comuni clienti | Solo con il loro consenso | `docs/seo-proposte.md` |
| «Clienti pubblici in Veneto» | Il sito non nomina alcun ente del Veneto; un solo lavoro per un cliente del Veneto e' pubblico (Bibione Sand Storm) | `case-studies.ts` |

## 4. Mappa query → pagina

| Query | Intento | Pagina Righello | Cosa risponde |
|---|---|---|---|
| azienda sviluppo software pordenone | Elenco di aziende, scelta del fornitore | `/software-house-pordenone` | Chi siamo, cosa costruiamo, prove con stato, domande |
| software house pordenone | Come sopra, piu' diretto | `/software-house-pordenone` | Titolo con la ricerca esatta |
| sviluppo software su misura pordenone | Capire se serve un fornitore e come si lavora | `/software-house-pordenone` | Metodo, «quanto costa», «quanto tempo», «su misura o gia' pronto» |
| gestionale su misura friuli | Un gestionale per la propria attivita' | `/software-house-pordenone` + schede `/progetti/optima`, `/progetti/tetha` | Software su misura e gestionali con esempi veri |
| sviluppo app iphone pordenone | Chi puo' costruire un'app | `/software-house-pordenone` + `/buffr` | «Sviluppate app per iPhone e iPad?»: BUFFR su App Store, le altre in prova |
| software house venezia mestre | Come sopra, in Veneto | `/software-house-mestre` | Base operativa, lavori nel Veneto, come si parte |
| intelligenza artificiale aziende pordenone | Cosa si puo' fare con l'AI in azienda | `/servizi/agenti-ai` | Risposta in apertura, dove l'AI lavora gia' |
| agenti ai per aziende pordenone | Un fornitore di agenti AI | `/servizi/agenti-ai` | «Cos'e' un agente AI aziendale», esempi, costo |
| produzione ai pordenone | Ambiguo: AI nella produzione industriale, oppure produzione con l'AI | `/servizi/agenti-ai` | Blocco «cosa facciamo e cosa no» e domanda dedicata |
| automazione processi aziendali ai friuli | Automatizzare compiti e documenti | `/servizi/agenti-ai` (+ «Automazioni» in `/software-house-pordenone`) | Processi, documenti, report, esempi di Tetha |

**Non cannibalizzazione**: `/servizi/web` (siti, e-commerce, web app: «agenzia siti web») non cambia titolo ne' descrizione; `/agenzia-marketing-*` restano marketing; la pagina AI resta una sola (nessuna `/agenti-ai-pordenone`). Le pagine di Pordenone e Mestre hanno titoli, descrizioni, risposte in apertura e domande diversi (un test controlla che meno di un sesto delle frasi sia in comune: sono i fatti uguali per tutti, come la chiamata gratuita e lo stato dei prodotti).

## 5. Cosa e' stato fatto nel sito

- `/software-house-pordenone` e `/software-house-mestre`: stessa struttura delle pagine di agenzia (`ServicePage`), dati in `src/lib/data/software-house.ts`. Una rotta sola (`software-house-[zona=zonasoftware]`) per entrambe; ogni altro indirizzo e' un 404.
- Pordenone: 6 voci di cosa si costruisce, 3 destinatari, un riquadro sui prodotti propri, 5 passi, 6 prove, luogo e 10 domande.
- Mestre (contenuto diverso): software per sport, eventi e turismo, dati di contatto e orari, 4 passi, 4 prove con il Veneto dentro, 7 domande.
- `/servizi/agenti-ai`: risposta in apertura di 40-60 parole, sezioni «Dove l'AI lavora gia'» e «Produzione AI: cosa facciamo e cosa no», titolo «Cosa abbiamo gia' costruito» sui lavori, 8 domande nuove (solo di questa pagina: l'indice dei servizi non le ripete).
- Collegamenti: piede («Dove lavoriamo»), riga «Pagine utili» in `/servizi/web` e `/servizi/agenti-ai`, riga di link nelle due pagine di agenzia, un link nella barra in fondo a ogni scheda prodotto (non per foto e video).
- Dati strutturati (`src/lib/seo/schema.ts`): `Service` con `provider`, `serviceType`, `areaServed`, `hasOfferCatalog` coi sotto-servizi; `FAQPage` dalle domande visibili; `BreadcrumbList`; `ItemList` delle prove con `SoftwareApplication` (il collegamento allo store solo per BUFFR); `WebPage` con `speakable` (titolo e risposta in apertura) per le due pagine nuove e per gli agenti AI; `Organization.knowsAbout` e `makesOffer`. Nessuna valutazione.
- `llms.txt` e `llms-full.txt`: sezioni «Software house» e «AI»; mappa del sito con `lastmod`; immagini 1200x630 per le due pagine.
- Test: `software-house.test.ts` (lunghezze delle risposte, parole vietate, stati veri, collegamenti), estesi `schema.test.ts`, `meta.test.ts`, `llms.test.ts`, `site.test.ts`.

## 6. Proposte non inserite

### Articoli e guide (da scrivere solo con fatti veri)

| Titolo | A chi serve | Fatti veri da usare | Cosa serve prima |
|---|---|---|---|
| Quanto costa un gestionale su misura | Chi cerca «gestionale su misura» | Da cosa dipende il prezzo (cosa deve fare, quanti sistemi collegare, quante persone) e come si stima: chiamata, proposta scritta | **Che Axel decida se dichiarare una cifra di partenza**; altrimenti l'articolo spiega solo i fattori |
| Software su misura o gestionale pronto? | Chi deve scegliere | Il criterio gia' scritto nella domanda della pagina; esempi: Óptima e Tetha sono prodotti pronti per un settore, i lavori per i clienti sono su misura | Niente |
| Assistente AI per il tuo Comune: cosa serve e cosa no | Un Comune che vuole rispondere ai cittadini | Pagine ufficiali come fonte, risposta che dice quando non sa, dati personali coperti, consenso e revoca (scheda `assistenti-pa`) | Il consenso del Comune per nominarlo; altrimenti anonimo |
| Cos'e' un agente AI aziendale e cosa fa davvero | Chi cerca «agenti AI per aziende» | La risposta della pagina, piu' due esempi veri (Tetha, Óptima) | Niente |
| Produzione AI: tre cose diverse con lo stesso nome | Chi cerca «produzione AI» | Il blocco della pagina agenti AI, piu' lungo | Niente |
| Come si prepara un software su misura: dalla chiamata alla messa online | Chi non ha mai commissionato un software | I cinque passi della pagina | Niente |

### Profili e schede fuori sito

La lista completa, con i passi e le verifiche, e' in `docs/geo-fuori-sito.md`, nuova sezione «Dipartimento tecnico e AI». In sintesi: scheda Google di Mestre con categorie adatte al software (scegliere dall'elenco di Google, per esempio quelle di sviluppatore di software e azienda informatica, solo se vere), servizi e foto vere; profilo gratuito e completo su shugar.it (oggi **non** compare nell'elenco di Pordenone ne' di Venezia, ed e' un elenco che le AI possono leggere) e su Pagine Gialle; Clutch e Sortlist con recensioni di clienti veri; la scheda App Store di BUFFR con il sito dello sviluppatore sulla pagina della software house; LinkedIn con le specialita' del software; le pagine delle persone (solo con il loro consenso).

## 7. Rischi

- **La pagina di Mestre e' la piu' debole delle due**: i fatti pubblici sul Veneto sono pochi (un sito di evento a Bibione e due prodotti sul calcio di Veneto e Friuli). E' stata fatta perche' ha un contenuto diverso e vero (base operativa, orari, lavori), ma se Axel puo' nominare altri lavori nel Veneto o confermare che si ricevono clienti in Via Pio X, va rafforzata.
- Senza recensioni e schede Google, le pagine nuove da sole non bastano a entrare negli elenchi dei Luoghi: e' il lavoro fuori sito.
- Il tempo per l'indicizzazione: Google puo' impiegare settimane; si misura con le 20 domande del mese.
- Le pagine di servizio hanno il menu in alto poco leggibile nel tema chiaro (testo scuro su fondo scuro del hero): e' un difetto che c'era gia' su tutte le pagine di servizio e di agenzia, non e' stato toccato.
