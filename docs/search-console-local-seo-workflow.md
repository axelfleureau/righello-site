# Search Console Local SEO Workflow

Obiettivo: capire quali URL Google sta scegliendo per le query locali e decidere
gli interventi senza basarsi sulle SERP viste a mano, che cambiano per area,
account, device e cronologia.

## Step 1 - Setup filtri

In Google Search Console aprire:

1. Performance
2. Risultati di ricerca
3. Tipo di ricerca: Web
4. Intervallo date: ultimi 28 giorni
5. Paese: Italia

Ripetere poi la stessa analisi su ultimi 3 mesi per capire il trend.

## Step 2 - Query da controllare

Partire da queste query:

- agenzia marketing pordenone
- agenzia di marketing pordenone
- agenzia marketing a pordenone
- agenzia marketing mestre
- agenzia di marketing mestre
- agenzia marketing a mestre
- agenzia siti web pordenone
- agenzia siti web mestre
- web agency pordenone
- web agency mestre
- google ads pordenone
- meta ads pordenone
- agenzia social media pordenone
- agenti ai pordenone

## Step 3 - Tabella da compilare

| Query | URL mostrato da Google | Click | Impression | CTR | Posizione media | Device forte | Decisione |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| agenzia marketing pordenone |  |  |  |  |  |  |  |
| agenzia di marketing pordenone |  |  |  |  |  |  |  |
| agenzia marketing mestre |  |  |  |  |  |  |  |
| agenzia siti web pordenone |  |  |  |  |  |  |  |

Decisioni possibili:

- Tenere URL: Google ha scelto la pagina giusta e va solo rafforzata.
- Migliorare snippet: molte impression, posizione discreta, CTR basso.
- Migliorare contenuto: posizione bassa ma URL giusto.
- Spostare intento: Google sceglie una pagina sbagliata o troppo generica.
- Creare pagina: l'intento non e' coperto da nessuna pagina esistente.

## Step 4 - URL Inspection

Controllare con "Ispezione URL" questi indirizzi:

- https://www.wearerighello.com/
- https://www.wearerighello.com/agenzia-marketing-pordenone
- https://www.wearerighello.com/agenzia-marketing-mestre
- https://www.wearerighello.com/servizi
- https://www.wearerighello.com/servizi/web
- https://www.wearerighello.com/servizi/marketing
- https://www.wearerighello.com/servizi/advertising
- https://www.wearerighello.com/servizi/agenti-ai

Per ogni URL segnare:

- URL e' indicizzato?
- Canonical scelto da Google coincide con quello dichiarato?
- Ultima scansione
- Pagina recuperabile?
- Mobile usability / page experience warnings

Se un URL importante non e' aggiornato, usare "Richiedi indicizzazione".

## Step 5 - Regole decisionali

- Se `/agenzia-marketing-pordenone` riceve impression per le query Pordenone,
  non va rimossa: va rafforzata e usata come ingresso locale verso home e
  contatti.
- Se la home riceve impression per query broad come "agenzia marketing
  pordenone", mantenere title e description allineati all'intento locale.
- Se `/servizi/web` riceve impression per "agenzia siti web pordenone", lavorare
  sulla pagina servizio prima di creare nuove landing.
- Se una query ha impression alte e CTR basso, intervenire prima su title/meta e
  testo above the fold.
- Se una query ha posizione oltre 20 ma URL corretto, servono contenuto migliore,
  link interni, prove, case study e segnali esterni.

## Step 6 - Output atteso

Dopo l'export Search Console produrre:

1. elenco delle query prioritarie;
2. URL che Google sta scegliendo;
3. opportunita' per CTR;
4. pagine da rafforzare;
5. nuove pagine da creare solo se giustificate;
6. prossime modifiche in ordine di impatto.

## Fonti

- https://developers.google.com/search/docs/monitor-debug/search-console-start
- https://support.google.com/webmasters/answer/9012289
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
