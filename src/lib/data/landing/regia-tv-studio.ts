import type { Landing, MediaRef } from './types';

/**
 * Produzione delle partite (Motore TV Studio). Fatti verificati e galleria delle animazioni del 22/09.
 * Media: scene senza nomi di persone e senza volti riconoscibili. Unica eccezione: la clip del gol, dove
 * il marcatore ("Marco Bianchi", n. 9) e' inventato; il motore l'ha disegnato su una ripresa vera senza grafiche.
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

const sponsor: MediaRef = {
  type: 'video',
  src: `${shared}/sponsor.mp4`,
  poster: `${shared}/sponsor.webp`,
  alt: 'Un messaggio sponsor compare in basso a sinistra mentre la partita continua',
  frame: 'monitor',
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
  tagline: 'Le grafiche si montano da sole: le guidano gli eventi della partita.',
  hero: gol,
  metrics: [
    { value: 27, label: 'scene nella galleria', note: 'animazioni in 8 categorie, del 22 settembre' },
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
      text: 'Durante la gara un operatore segna gli eventi dal palmare: gol, cartellini, cambi, recupero, replay, pause. Il motore li legge, trova il momento giusto nel video e disegna la grafica. Se arriva un evento che non conosce, non lo ignora: il montaggio si ferma finché non gli si dà un trattamento.',
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
    lead: 'Estratti di prove su riprese di partite vere, senza audio. Scegli una scena. Nella galleria completa ce ne sono 27 in 8 categorie: qui mostriamo quelle senza nomi di persone, più il gol, con un marcatore inventato.',
    items: [
      {
        id: 'gol-banner',
        group: 'Gol',
        label: 'Gol: tabellone e banner',
        media: golBanner,
        note: 'Come va in onda: prima il tabellone in alto (squadra, GOL, poi il nuovo risultato che scorre), dopo circa due secondi e mezzo sale in basso il banner con numero, nome e squadra del marcatore, il campionato e il risultato; poi esce. Il cronometro non si ferma. Marcatore e numero sono d\'esempio, inventati; le immagini sono di una partita vera.',
      },
      {
        id: 'gol',
        group: 'Gol',
        label: 'Gol: solo il tabellone',
        media: gol,
        note: 'Il banner GOL entra nel tabellone con la sigla della squadra; subito dopo si aggiorna il risultato.',
      },
      {
        id: 'replay',
        group: 'Replay',
        label: 'Replay con stacco',
        media: replay,
        note: 'Il cambio d\'immagine avviene sotto copertura piena. L\'uscita chiude sul replay e riapre sulla partita.',
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
