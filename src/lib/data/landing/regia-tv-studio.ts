import type { Landing, MediaRef } from './types';

/**
 * Produzione delle partite (Motore TV Studio). Fatti verificati e galleria delle animazioni del 22/09.
 * Media: grafiche disegnate dal motore vero su riprese di partite vere senza grafiche, in campo lungo
 * (nessun volto in primo piano). Nomi, numeri, rose, arbitri e allenatore delle clip sono INVENTATI.
 * Schermate palmare e controllo marker: programmi veri avviati in locale su una partita dimostrativa (squadre e giocatori
 * inventati, video di prova senza persone). Palmare: righello-match-suite (web/app.js, server.py). Controllo: tv-studio/static/timeline.html,
 * editorial_approval.py (approvazioni con impronta), build_match_tv_studio.py (assert_export_branding), match_manager.py (/api/queue/add).
 * Rosa dalla foto della distinta: server.py run_roster_analysis. BUFFR: tv-studio/buffr_replay_import.py (proposte replay, tutte da approvare).
 */
const DIR = '/progetti/landing/regia-tv-studio';
const shared = '/progetti/regia';

const clip = (name: string, alt: string, extra: Partial<MediaRef> = {}): MediaRef => ({
  type: 'video',
  src: `${DIR}/${name}.mp4`,
  poster: `${DIR}/${name}.webp`,
  alt,
  frame: 'monitor',
  ...extra,
});

const gol: MediaRef = {
  type: 'video',
  src: `${shared}/gol-scorebug.mp4`,
  poster: `${shared}/gol-scorebug.webp`,
  alt: 'Il banner GOL entra nel tabellone di una partita di prova, con la sigla della squadra',
  frame: 'monitor',
};

const golBanner = clip(
  'gol-banner',
  'Un gol in diretta: il tabellone in alto mostra squadra, GOL e il nuovo risultato, poi in basso sale il banner con numero e nome del marcatore',
);

const golOspiti = clip('gol-ospiti', 'Un gol della squadra ospite: GOL e nuovo risultato nel tabellone, poi il banner del marcatore in basso');
const golFvg = clip('gol-fvg', 'Il gol con l\'identità di Calcio FVG, azzurra e gialla: tabellone, poi banner del marcatore');
const giallo = clip('giallo', 'Ammonizione: banner in basso al centro con cartellino giallo, numero, nome e squadra');
const rosso = clip('rosso', 'Espulsione: banner con cartellino rosso in basso e indicatore di espulsione nel tabellone');
const secondoGiallo = clip('secondo-giallo', 'Secondo giallo: un solo banner combinato di ammonizione ed espulsione');
const cambio = clip('cambio', 'Sostituzione: nel banner prima il giocatore che esce, poi quello che entra, con numeri e frecce');
const trattiniCambi = clip('trattini-cambi', 'I trattini sotto le sigle delle squadre contano i cambi già fatti');
const replayConsecutivi = clip('replay-consecutivi', 'Due replay di seguito con un solo stacco al centro, il bollino REPLAY in basso');
const replayCommento = clip('replay-commento', 'Tre replay inseriti nel commento, con lo stesso stacco a due pannelli');
const intervallo = clip('intervallo', 'La card dell\'intervallo con il risultato e il marcatore del primo tempo');
const formazioneCasa = clip('formazione-casa', 'La distinta della squadra di casa: carte con numero e nome dei titolari');
const formazioneOspiti = clip('formazione-ospiti', 'La distinta della squadra ospite, con lo stesso impianto della squadra di casa');
const arbitri = clip('arbitri', 'La direzione di gara: arbitro, assistenti e quarto ufficiale con ruolo, nome e sezione');
const intervista = clip('intervista', 'Sottopancia compatto in basso al centro durante un\'intervista, con nome e ruolo');
const saluti = clip('saluti-risultato', 'Il risultato finale e i marcatori in una fascia bassa durante i saluti');
const outroVeneto = clip('outro-veneto', 'Card di chiusura Calcio Veneto a schermo pieno con le due società e il risultato finale');
const outroFvg = clip('outro-fvg', 'Card di chiusura Calcio FVG a schermo pieno con le due società e il risultato finale');

const sponsor: MediaRef = {
  type: 'video',
  src: `${shared}/sponsor.mp4`,
  poster: `${shared}/sponsor.webp`,
  alt: 'Un messaggio sponsor compare in basso a sinistra mentre la partita continua',
  frame: 'monitor',
};

const palmare: MediaRef = {
  type: 'image',
  src: `${DIR}/palmare-cronista.webp`,
  alt: 'Il palmare del cronista su telefono: tabellone con tempo e risultato, tasti grandi per gol, sostituzione, ammonizione, replay ed espulsione, e l\'elenco degli eventi appena segnati. Partita dimostrativa con squadre inventate',
  frame: 'phone',
};

const controllo: MediaRef = {
  type: 'image',
  src: `${DIR}/controllo-marker.webp`,
  alt: 'La pagina di revisione dei marker: il video del tempo e, sotto, la linea del tempo con gol, replay, ammonizione e cambio segnati dal palmare, da spostare o correggere prima del via. Partita dimostrativa con squadre inventate',
  frame: 'browser',
};

const secondoTempo = clip('secondo-tempo', 'Inizio del secondo tempo: il cronometro del tabellone riparte dal calcio d\'inizio');
const recupero = clip('recupero', 'Il recupero entra sotto il tabellone senza spostare il cronometro');
const replay = clip('replay-shutter', 'Un replay con lo stacco a due pannelli, il bollino REPLAY in basso');
const rigori = clip('rigori', 'Il pannello dei tiri di rigore, separato dal risultato della gara');
const lanner = clip('lanner', 'La partita in un riquadro con la pubblicità nella cornice a L');
const cooling = clip('cooling-break', 'Il sottopancia del cooling break, con la ripresa a seguire');
const introVeneto = clip('intro-veneto', 'Sigla di apertura Calcio Veneto: due società, giornata, campionato e stadio');
const introFvg = clip('intro-fvg', 'Sigla di apertura Calcio FVG: due società, giornata, campionato e data');

export default {
  tagline: 'Il gestionale dei sogni di chi produce partite per la TV.',
  hero: gol,
  metrics: [
    { value: 27, label: 'scene nella galleria', note: 'tutte qui sotto, in 8 categorie' },
    { value: 29, label: 'tipi di evento gestiti', note: 'ognuno con il suo trattamento scritto' },
    { value: 478, label: 'test automatici', note: 'tutti superati, a ogni modifica del motore' },
    { text: '1080p50', label: 'formato dei filmati', note: 'partita di prova: 1920×1080, 50 fotogrammi' },
  ],
  chapters: [
    {
      id: 'tempo',
      kicker: 'Perché esiste',
      title: 'Una grafica per ogni cosa che succede',
      highlight: 'ogni cosa che succede',
      text: 'In una partita succedono molte cose: un gol, un cartellino, un cambio, un recupero. Metterle a mano sulla ripresa vuol dire ricominciare da capo ad ogni gara. Qui gli eventi si segnano mentre si gioca e il motore li trasforma in grafica, ognuna al suo posto e con lo stesso disegno per tutta la partita.',
      bullets: [
        'Un evento segnato, una grafica sul video',
        'Il cronometro parte dal calcio d\'inizio, non dall\'inizio del file',
        'Stesso risultato su ogni partita, senza rifare il lavoro',
      ],
      media: [{ ...secondoTempo, caption: 'Il secondo tempo: ingresso video e fischio sono due riferimenti distinti, il cronometro riparte dal calcio d\'inizio.' }],
    },
    {
      id: 'eventi',
      kicker: 'Come lavora',
      title: 'Sono gli eventi a guidare il video',
      highlight: 'eventi',
      text: 'È un gestionale in tre momenti. Il cronista segna gli eventi dal palmare mentre si gioca. Tu controlli marker, dati, loghi e approvazioni. Solo dopo parte la produzione automatica, che trova il momento giusto nel video e disegna la grafica. Un evento che il motore non conosce non viene ignorato: il montaggio si ferma finché non gli si dà un trattamento.',
      bullets: [
        '29 tipi di evento, ognuno con il suo trattamento scritto',
        'I minuti di recupero vengono dall\'evento, non dalla durata della ripresa',
        'I rigori hanno un punteggio a parte: non diventano gol della partita',
        'Il gol si vede in due tempi: prima nel tabellone, poi il banner del marcatore',
      ],
      media: [{ ...recupero, caption: 'Il recupero entra nel tabellone senza spostare il cronometro: i minuti sono quelli segnati.' }],
    },
    {
      id: 'replay',
      kicker: 'Il montaggio',
      title: 'Replay con lo stacco di una regia vera',
      highlight: 'stacco',
      text: 'Il replay entra con due pannelli sagomati e il cambio d\'immagine avviene sotto copertura piena, come in una regia televisiva. Due replay vicini hanno un solo raccordo. E nessun replay va in onda senza approvazione: se il taglio cambia, l\'approvazione decade e torna da rivedere.',
      bullets: [
        'Stacco di 1,12 secondi, 28 fotogrammi, con il logo del circuito',
        'Replay consecutivi: un solo raccordo, niente lampeggi del live',
        'Approvazione legata al contenuto: cambia il taglio, torna da approvare',
      ],
      media: [{ ...replay, caption: 'Il replay singolo: ingresso e uscita con lo stacco a due pannelli.' }],
      layout: 'media-right',
    },
    {
      id: 'identita',
      kicker: 'Identità',
      title: 'Ogni campionato ha il suo volto',
      highlight: 'suo volto',
      text: 'Le grafiche non sono un modello unico. Colori, stemmi e movimento cambiano con il circuito: Calcio Veneto in amaranto e oro, Calcio FVG in blu e oro, Calcio Carnico con la sua palette. La sigla di apertura mette in scena le due società, la giornata e lo stadio, senza anticipare il risultato.',
      media: [
        { ...introVeneto, caption: 'Calcio Veneto' },
        { ...introFvg, caption: 'Calcio FVG' },
      ],
      layout: 'full',
    },
  ],
  graphic: 'match-production',
  how: {
    title: 'Dal campo alla partita in TV',
    highlight: 'alla partita in TV',
    lead: 'Riprese, squadre, eventi e sponsor entrano nel motore. Escono la partita con le grafiche al loro posto, i replay e i programmi per il televisore. Tocca un blocco per vedere cosa fa.',
  },
  features: [
    {
      icon: 'device',
      title: 'Palmare del cronista',
      text: 'Chi segue la partita segna gol, cartellini, cambi, recupero e replay con un tocco, senza sapere nulla di montaggio.',
      wide: true,
      media: palmare,
    },
    {
      icon: 'scan',
      title: 'Rosa dalla foto della distinta',
      text: 'L\'intelligenza artificiale legge la foto della distinta e propone le rose. Le controlli e le correggi tu: se la lettura non riesce, si inserisce a mano.',
    },
    {
      icon: 'shield',
      title: 'Controllo prima del via',
      text: 'Marker, dati, loghi e approvazioni si rivedono prima di premere play: senza quelle, la produzione non parte.',
      wide: true,
      media: controllo,
    },
    {
      icon: 'link',
      title: 'Con BUFFR e BUFFR Live',
      text: 'Gli stessi eventi del palmare alimentano BUFFR Live e diventano i marker della produzione. I momenti salvati in BUFFR arrivano come proposte di replay, tutte da approvare (oggi il passaggio è in parte manuale).',
    },
    { icon: 'clock', title: 'Tabellone sempre vero', text: 'Tempo, risultato, sigle delle squadre e cartellini rossi restano nel tabellone e seguono gli eventi segnati.' },
    { icon: 'bolt', title: 'Gol in due tempi', text: 'Nel tabellone entrano squadra, GOL e nuovo risultato; poi in basso sale il banner del marcatore. Il cronometro non si muove.' },
    { icon: 'play', title: 'Replay con stacco', text: 'Stacco a due pannelli, un solo raccordo tra replay vicini, approvazione obbligatoria.' },
    {
      icon: 'layers',
      title: 'Sponsor fuori dal gioco',
      text: 'Il Blink compare in basso, il Lanner stringe la partita in un riquadro. Mai pubblicità a schermo pieno durante il gioco, cooling break compreso.',
      wide: true,
      media: { ...lanner, frame: 'monitor' },
    },
    { icon: 'users', title: 'Cartellini e cambi', text: 'Ammonizioni, espulsioni e sostituzioni escono in basso al centro. Il secondo giallo è un solo annuncio e una sola espulsione.' },
    {
      icon: 'chart',
      title: 'Rigori a parte',
      text: 'I tiri di rigore hanno un pannello e un punteggio propri: un tentativo per riga, l\'esito accanto, il risultato della gara resta com\'è.',
      wide: true,
      media: { ...rigori, frame: 'monitor' },
    },
    { icon: 'device', title: 'Verticale per i social', text: 'MyLights Reel rifà i replay in 9:16, con stemmi, logo del circuito e risultato.' },
  ],
  demo: {
    kicker: 'In azione',
    title: 'Le grafiche, in scena',
    highlight: 'in scena',
    lead: 'Estratti di prove su riprese di partite vere, senza audio. Dati d\'esempio inventati: nomi, numeri, rose, arbitri e allenatore non sono di persone reali. Sono tutte le 27 scene della galleria, in 8 categorie.',
    items: [
      {
        id: 'gol-banner',
        group: 'Gol e cartellini',
        label: 'Gol: tabellone e banner',
        media: golBanner,
        note: 'Come va in onda: prima il tabellone in alto (squadra, GOL, poi il nuovo risultato che scorre), dopo circa due secondi e mezzo sale in basso il banner con numero, nome e squadra del marcatore, il campionato e il risultato; poi esce. Il cronometro non si ferma.',
      },
      {
        id: 'gol-ospiti',
        group: 'Gol e cartellini',
        label: 'Gol degli ospiti',
        media: golOspiti,
        note: 'La stessa sequenza sul lato ospite: gli stemmi non si invertono né si deformano. Prima GOL e risultato nel tabellone, poi il banner del marcatore.',
      },
      {
        id: 'gol-fvg',
        group: 'Gol e cartellini',
        label: 'Gol: identità FVG',
        media: golFvg,
        note: 'La stessa animazione con i colori di Calcio FVG, azzurro e giallo. Stessi ingombri, stessi tempi.',
      },
      {
        id: 'giallo',
        group: 'Gol e cartellini',
        label: 'Ammonizione',
        media: giallo,
        note: 'Cartellino, numero, nome e squadra nella fascia bassa al centro, per sei secondi. Niente ritratti indovinati: la foto compare solo se è verificata.',
      },
      {
        id: 'rosso',
        group: 'Gol e cartellini',
        label: 'Espulsione diretta',
        media: rosso,
        note: 'Annuncio in basso. Nel tabellone resta l\'indicatore di espulsione sotto la sigla della squadra.',
      },
      {
        id: 'secondo-giallo',
        group: 'Gol e cartellini',
        label: 'Secondo giallo, espulsione',
        media: secondoGiallo,
        note: 'Un solo annuncio combinato e una sola espulsione conteggiata, non due avvisi separati.',
      },
      {
        id: 'cambio',
        group: 'Sostituzioni',
        label: 'Cambio: esce, entra',
        media: cambio,
        note: 'Nome e numero cambiano a metà annuncio, prima chi esce e poi chi entra. La larghezza si calcola sul nome più lungo, quindi il banner non salta.',
      },
      {
        id: 'trattini-cambi',
        group: 'Sostituzioni',
        label: 'Indicatori dei cambi',
        media: trattiniCambi,
        note: 'I trattini sotto le sigle contano i cambi già fatti. Qui il limite è 5 per dimostrazione: in partita vale il regolamento della competizione e, se non è noto, gli indicatori restano nascosti.',
      },
      {
        id: 'replay',
        group: 'Replay',
        label: 'Replay con stacco',
        media: replay,
        note: 'Il cambio d\'immagine avviene sotto copertura piena. L\'uscita chiude sul replay e riapre sulla partita.',
      },
      {
        id: 'replay-consecutivi',
        group: 'Replay',
        label: 'Replay di seguito',
        media: replayConsecutivi,
        note: 'Due replay vicini hanno un solo raccordo al centro: niente doppia uscita e ingresso, niente lampi della partita in mezzo. Tre stacchi in tutto: ingresso, raccordo, uscita. Replay a velocità dimezzata.',
      },
      {
        id: 'replay-commento',
        group: 'Replay',
        label: 'Replay nel commento',
        media: replayCommento,
        note: 'Le selezioni entrano sopra la ripresa del commento con lo stesso stacco. La voce del cronista non si tocca: qui la clip è senza audio.',
      },
      {
        id: 'recupero',
        group: 'Tempi e risultato',
        label: 'Recupero',
        media: recupero,
        note: 'Ingresso del recupero senza spostare il cronometro. I minuti derivano dall\'evento segnato.',
      },
      {
        id: 'secondo-tempo',
        group: 'Tempi e risultato',
        label: 'Secondo tempo',
        media: secondoTempo,
        note: 'Il cronometro di gara parte dal calcio d\'inizio, anche se il video entra prima.',
      },
      {
        id: 'intervallo',
        group: 'Tempi e risultato',
        label: 'Intervallo',
        media: intervallo,
        note: 'Card editoriale a gioco fermo: risultato e marcatori del primo tempo al centro dello schermo.',
      },
      {
        id: 'rigori',
        group: 'Tempi e risultato',
        label: 'Rigori',
        media: rigori,
        note: 'Punteggio dei rigori separato da quello della gara. Sequenza dimostrativa su una partita in cui i rigori non sono stati tirati.',
      },
      {
        id: 'blink',
        group: 'Pause e sponsor',
        label: 'Blink',
        media: sponsor,
        note: 'Un messaggio sponsor compare in basso senza coprire il gioco. Materiale d\'esempio: durata e frequenza dipendono dal palinsesto.',
      },
      {
        id: 'lanner',
        group: 'Pause e sponsor',
        label: 'Lanner',
        media: lanner,
        note: 'La partita nel riquadro e la pubblicità nella cornice, con il campo sempre visibile.',
      },
      {
        id: 'cooling',
        group: 'Pause e sponsor',
        label: 'Cooling break',
        media: cooling,
        note: 'Sottopancia animato in basso, senza interrompere la ripresa. Un evento di fine pausa lo può chiudere prima.',
      },
      {
        id: 'formazione-casa',
        group: 'Formazioni e arbitri',
        label: 'Formazione di casa',
        media: formazioneCasa,
        note: 'Prima pagina di quattro: undici titolari e otto a disposizione, sei carte per pagina, con numero, nome e stemma. Senza foto verificata resta la maglia col numero.',
      },
      {
        id: 'formazione-ospiti',
        group: 'Formazioni e arbitri',
        label: 'Formazione ospiti',
        media: formazioneOspiti,
        note: 'La seconda distinta ha lo stesso impianto di quella di casa: cambia solo la squadra.',
      },
      {
        id: 'arbitri',
        group: 'Formazioni e arbitri',
        label: 'Direzione di gara',
        media: arbitri,
        note: 'Arbitro in primo piano, assistenti e quarto ufficiale su moduli separati: ruolo, nome e sezione. Nessuna foto arbitrale.',
      },
      {
        id: 'intervista',
        group: 'Interviste',
        label: 'Intervista, banner basso',
        media: intervista,
        note: 'Sottopancia compatto in basso al centro per cinque secondi e mezzo, poi esce. Il volto resta libero. Il testo lo scrive una persona: il motore non riconosce chi parla.',
      },
      {
        id: 'saluti-risultato',
        group: 'Interviste',
        label: 'Saluti: risultato in basso',
        media: saluti,
        note: 'Risultato e marcatori in una fascia bassa per sette secondi, mentre si parla. Non è la card finale a schermo pieno.',
      },
      {
        id: 'apertura-veneto',
        group: 'Intro e outro',
        label: 'Apertura Veneto',
        media: introVeneto,
        note: 'Sigla con le due società, la giornata, il campionato e lo stadio. Non anticipa il risultato.',
      },
      {
        id: 'apertura-fvg',
        group: 'Intro e outro',
        label: 'Apertura FVG',
        media: introFvg,
        note: 'La stessa sigla con l\'identità di Calcio FVG: blu federale e oro.',
      },
      {
        id: 'chiusura-veneto',
        group: 'Intro e outro',
        label: 'Chiusura Veneto',
        media: outroVeneto,
        note: 'Card finale a schermo pieno con le due società e il risultato, mostrato solo se confermato. Il migliore in campo compare soltanto con scelta e ritratto approvati.',
      },
      {
        id: 'chiusura-fvg',
        group: 'Intro e outro',
        label: 'Chiusura FVG',
        media: outroFvg,
        note: 'La stessa card di chiusura con l\'identità di Calcio FVG.',
      },
    ],
  },
  tech: [
    {
      title: 'Grafiche nate come pagine web',
      text: 'Ogni grafica è una piccola pagina web trasparente, trasformata in immagine fotogramma per fotogramma e composta sul video insieme al cronometro e al risultato. Cambiare un disegno vuol dire cambiare una pagina.',
      tags: ['Pagine web trasformate in immagini', 'Grafiche trasparenti'],
    },
    {
      title: 'Un solo montaggio, a 50 fotogrammi',
      text: 'Riprese, grafiche, sponsor e replay passano in un\'unica catena di composizione automatica. L\'uscita predefinita è a 50 fotogrammi al secondo.',
      tags: ['Montaggio automatico', '50 fotogrammi al secondo'],
    },
    {
      title: 'Ogni evento ha il suo trattamento',
      text: 'Il contratto degli eventi elenca 29 tipi e come si disegna ciascuno. Un evento sconosciuto blocca il montaggio e lo dice, invece di sparire in silenzio.',
      tags: ['Contratto degli eventi', 'Palmare'],
    },
    {
      title: 'Niente va in onda senza via libera',
      text: 'Replay e sponsor passano da un\'approvazione registrata con origine, ora e impronta del contenuto: le proposte automatiche restano bozze finché un operatore non le approva. Cambia il taglio e l\'approvazione decade da sola.',
      tags: ['Approvazioni', 'Controllo umano'],
    },
    {
      title: 'Controlli prima del montaggio',
      text: 'Prima di un montaggio lungo il motore verifica pubblicità dichiarate, formazioni e replay approvati. Se qualcosa non torna, il lavoro non parte.',
      tags: ['Controlli', 'Consegna verificata'],
    },
    {
      title: 'Collaudato da 478 test',
      text: 'I test coprono la geometria delle grafiche, gli eventi, i replay, la consegna e le pagine della regia, provate su più browser.',
      tags: ['Test automatici'],
    },
  ],
  cta: {
    title: 'Una partita da televisione, senza regia a mano',
    highlight: 'senza regia a mano',
    text: 'Oggi è il motore che usiamo noi, in produzione interna. Se produci sport locale e vuoi lo stesso risultato, parliamone.',
  },
} satisfies Landing;
