# Percorso di contatto: lato server

Stato: 22 ottobre 2026, ramo `contatto/server`. Chi scrive dal sito (foglio sopra ogni pagina, pagina `/contatti`, pagina del bando) arriva a `POST /api/contact`. Questo documento descrive cosa fa il server, il contratto con l'interfaccia, le variabili d'ambiente, come recuperare un contatto dai log e i limiti noti.

## Flusso

```
validazione -> trappola / tempo / testo -> idempotenza -> limite per indirizzo
  -> MAIL AL TEAM (2 tentativi) -> mail al cliente (best effort) -> risposta
```

1. **Validazione** (`src/lib/server/contact-validation.ts`): nome obbligatorio (max 120); recapito = email **oppure** telefono (almeno uno, valido: email con chiocciola e dominio, telefono 6-15 cifre); messaggio facoltativo (max 4000). Tutti i campi su una riga sola perdono a capo, caratteri di controllo e segni che invertono il verso del testo: nessuna iniezione di intestazioni negli oggetti delle email.
2. **Anti-spam senza attrito** (`contact-guard.ts`): trappola nascosta `hp` non vuota; invio entro 1,5 s da `openedAt`; piu' di 3 `http` nel testo; parole tipiche di spam; messaggio quasi tutto in cirillico/ideogrammi. In tutti questi casi risposta di **successo finta**, stessa forma di quella vera, nessun invio (il bot non impara). Per i motivi diversi dalla trappola il contatto resta in una riga `[lead-suspect]` dei log (un falso positivo non perde il cliente).
3. **Idempotenza**: stesso `requestId` con lo stesso contenuto entro 15 minuti = stesso esito, senza secondo invio e senza consumare il limite (anche se il primo e' ancora in volo: doppio tocco). Stesso id con testo corretto = invio nuovo, stesso codice. Un invio fallito non resta in memoria: si puo' riprovare con lo stesso id.
4. **Limite per indirizzo**: 5 richieste ogni 10 minuti e 30 al giorno. Se l'invio fallisce per colpa nostra il tentativo viene restituito. Indirizzi interni o non riconoscibili (proxy locale, intestazioni assenti) condividono un solo secchio piu' largo (60 / 400).
5. **Mail al team** (`TEAM_EMAILS` in `contact-service.ts`): prima di qualunque altra cosa; tempo massimo 4 s, secondo tentativo dopo 400 ms (3,5 s). Se fallisce due volte: riga `[lead-recovery]` e `503`.
6. **Mail al cliente**: solo se c'e' l'email, dopo quella al team, tempo massimo 4 s, mai un'eccezione. Con solo telefono non parte e `delivered.client` e' `false`.

## Contratto

`POST /api/contact`, JSON.

```
{ requestId, name, email?, phone?, service?, budget?, company?, message?,
  source?: { path, cta?, from?, referrer?, utm?: { source, medium, campaign, term, content } },
  hp?, openedAt? }
```

| Esito | Corpo |
|---|---|
| 200 | `{ success:true, reference:"RH-XXXXXX", delivered:{ team, client } }` (anche per spam e doppioni) |
| 400 | `{ success:false, code:"invalid", error:"frase italiana", fields?:{ name?, contact?, message? } }` |
| 429 | `{ success:false, code:"rate", error }` con intestazione `Retry-After` (secondi) |
| 503 | `{ success:false, code:"unavailable", error }` solo se il team non ha ricevuto nulla |

- `reference` = `RH-` + 6 simboli dall'alfabeto `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (niente 0/O/1/I), derivati da SHA-256 di `requestId`: stesso id = stesso codice.
- `requestId`: 8-80 caratteri `A-Za-z0-9_-`. Se manca o non e' valido (la pagina del bando non lo manda) il server ne crea uno: il contatto passa, senza idempotenza.
- `openedAt`: ms epoch del client. Scatta solo se `0 <= ora_server - openedAt < 1500`: un orologio in anticipo non fa mai scattare nulla.
- Il campo `fields.message` e' un'aggiunta al contratto (messaggio oltre 4000 caratteri).
- `source.path` deve cominciare con `/` (mai indirizzi interi); `service`, `budget` e `company` sono testo libero troncato a 120 (`CONTACT_TOPICS` e `CONTACT_BUDGETS` sono solo i valori che manda l'interfaccia).

## Variabili d'ambiente

| Variabile | Effetto |
|---|---|
| `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL` | invio (esistenti, invariate) |
| `CONTACT_AI=1` | **spenta di default.** Dopo la mail al team, prova a migliorare il testo della mail al cliente con OpenAI (max 4 s, annullata se lenta). Costa a consumo: non attivarla senza deciderlo |
| `CONTACT_DRY_RUN=1` | prova in locale: valida, applica trappola e idempotenza, **non invia nulla**, non applica il limite per indirizzo, risponde come se fosse riuscito. **Ignorata se `VERCEL_ENV=production`** |

## Recuperare un contatto dai log

Ogni riga e' un JSON su una riga sola, con il contatto completo (nome, recapiti, messaggio, provenienza).

- `[lead-recovery] {...}`: il team **non** ha ricevuto la mail (SendGrid giu', chiave scaduta). Il visitatore ha visto l'invito a scrivere su WhatsApp o per email, quindi puo' anche aver scritto da solo: controllare il `reference`.
- `[lead-suspect] {...}`: scartato dall'anti-spam per motivo diverso dalla trappola (tempo, link, parole, alfabeto). Se e' un cliente vero, il motivo dice quale regola va allentata.
- Righe senza dati personali: `[contact] ok RH-... team=1 client=1 ms=...`, `[contact] doppione`, `[contact-spam] <motivo>`, `[contact] limite raggiunto`.

Su Vercel: `vercel logs <deployment> | grep lead-recovery` oppure il filtro testo nella dashboard dei log della funzione.

## Limiti noti

- **Il limite e la memoria dei doppioni stanno nel processo.** Su un'istanza serverless vale per istanza, non per tutto il sito: ferma bot e doppi tocchi, non un attacco distribuito. Per un limite globale servirebbe un archivio condiviso (KV / Redis): non c'e', e non l'ho aggiunto per non introdurre un servizio nuovo.
- L'indirizzo si legge da `cf-connecting-ip`, `x-vercel-forwarded-for`, `x-forwarded-for`, `x-real-ip`, poi da `getClientAddress()`. Dietro un proxy che non sovrascrive queste intestazioni un client puo' falsificarle.
- `openedAt` viene dal client: un bot puo' mandarlo vecchio. La trappola e il testo sono le difese principali, il tempo minimo prende solo i bot piu' rozzi.
- Un tempo massimo non annulla la richiesta a SendGrid: se il primo tentativo e' solo lento e il secondo parte, il team puo' ricevere due mail identiche (stesso codice). Preferito a perdere un contatto.
- La mail al cliente parte dopo quella al team (non in parallelo): non si conferma al cliente cio' che il team non ha ricevuto. Costo: una chiamata SendGrid in piu' nel tempo di risposta.
- `hooks.server.ts` imposta `Cache-Control: public, s-maxage` su tutte le risposte non statiche, anche sulla `/api/contact`; le POST non sono mai messe in cache dalle CDN, quindi non ha effetto, ma l'intestazione `no-store` dell'endpoint viene sovrascritta.

## Prima e dopo (misurato in locale, SendGrid simulato a 300 ms per invio)

| Misura | Prima | Dopo |
|---|---|---|
| Chiamate OpenAI per contatto | 2 (`gpt-5.2`: una senza tempo massimo, una con 15 s), in parallelo, **prima** della mail | **0** (solo con `CONTACT_AI=1`, dopo la mail al team, max 4 s) |
| Tempo di risposta con OpenAI simulato istantaneo | ~310 ms (le due mail partivano insieme) | ~610 ms (team poi cliente, in serie) |
| Tempo di risposta con OpenAI simulato a 2 s | ~2.310 ms | ~610 ms |
| Tempo di risposta con OpenAI reale | 2 s + (non misurabile senza pagare), con la prima chiamata senza limite | invariato dal modello: non c'e' |
| Mail al team se SendGrid fallisce | persa, errore 500 al visitatore | secondo tentativo dopo 400 ms; se anche questo fallisce, riga `[lead-recovery]` e 503 con invito a WhatsApp |
| Consumo a pagamento per contatto | due chiamate al modello | nessuno |
| Protezione da spam | nessuna | trappola, tempo, testo, limite 5/10 min e 30/giorno, doppioni |
| Codice di riferimento, provenienza | no | `RH-XXXXXX` in oggetto e corpo; pagina, pulsante, scheda, referrer, UTM nella mail al team |

Il tempo "dopo" e' la somma di due invii SendGrid in serie: con un invio reale da ~150-400 ms resta sotto il secondo.

## File

`src/routes/api/contact/+server.ts` (solo HTTP), `src/lib/server/contact-service.ts` (flusso), `contact-validation.ts`, `contact-guard.ts`, `contact-reference.ts`, `contact-analysis.ts` (priorita' e analisi calcolate), `contact-ai.ts` (opzionale), `contact-runtime.ts` (SendGrid, ambiente, canali), `email-templates.ts` (le due mail). Test accanto a ciascuno e `src/routes/api/contact/contact-endpoint.test.ts`. Anteprima delle mail: `npm run email:previews` (invia davvero se SendGrid e' configurato: non lanciarlo senza volerlo).
