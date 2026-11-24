/**
 * Incentivi per hotel e strutture ricettive in Friuli-Venezia Giulia: fatti, fonti e la funzione del voucher.
 *
 * Una sola sorgente: la pagina, il calcolatore, le FAQ, `llms.txt` e i test leggono da qui.
 * Ogni numero viene da una pagina ufficiale della Regione, letta il 24/11/2026 (indirizzi in `officialSources`).
 * Dove le pagine ufficiali non concordano lo dice `officialInconsistencies`, invece di scegliere in silenzio.
 */

export const INCENTIVES_PATH = '/incentivi-hospitality-fvg-2026';

/** Data a cui sono verificate le pagine della Regione (da riscrivere a ogni aggiornamento). */
export const informationDate = '24 novembre 2026';

const REGION = 'https://www.regione.fvg.it/rafvg';
const TURISMO = `${REGION}/cms/RAFVG/economia-imprese/turismo`;
const ALLEGATI = `${REGION}/export/sites/default/RAFVG/economia-imprese/turismo/FOGLIA81/allegati`;

export interface OfficialSource {
  label: string;
  url: string;
  /** Vero se Righello ha letto il contenuto: i PDF delle linee guida sono linkati ma non riassunti. */
  read: boolean;
}

export const officialSources: OfficialSource[] = [
  { label: 'Voucher TUReSTA in FVG e tutti gli incentivi per il turismo (Regione FVG)', url: `${TURISMO}/FOGLIA81/`, read: true },
  { label: 'TUReSTA: informazioni per i cittadini', url: `${TURISMO}/FOGLIA81/FOGLIA1/`, read: true },
  { label: 'TUReSTA: informazioni per le strutture ricettive', url: `${TURISMO}/FOGLIA81/FOGLIA2/`, read: true },
  { label: 'TUReSTA: domande frequenti', url: `${TURISMO}/FOGLIA81/faq/`, read: true },
  { label: 'TUReSTA: portale delle adesioni', url: 'https://turesta.regione.fvg.it/', read: false },
  { label: 'TUReSTA: linee guida per l’adesione (PDF)', url: `${ALLEGATI}/LineeGuidaAdesione_TUReSTA_in_FVG_2.pdf`, read: false },
  { label: 'TUReSTA: linee guida per la prenotazione e conferma del voucher (PDF)', url: `${ALLEGATI}/LineeGuidaPrenotazione_TUReSTA_in_FVG_23.6.21.pdf`, read: false },
  { label: 'TUReSTA: linee guida per la rendicontazione (PDF)', url: `${ALLEGATI}/LineeGuidaRendicontazione_TUReSTA_in_FVG_1.7.21.pdf`, read: false },
  { label: 'TUReSTA: elenco dei Comuni (PDF)', url: `${ALLEGATI}/28112024_Lista_Comuni_TUReSTA.pdf`, read: false },
  { label: 'TUReSTA: elenco delle strutture aderenti (PDF)', url: `${ALLEGATI}/Ultimo_Aggiornamento_Strutture_Ricettive_accreditate.pdf`, read: false },
  { label: 'Aiuti per la competitività sostenibile e digitale delle imprese turistiche (Regione FVG)', url: `${TURISMO}/FOGLIA112/`, read: true },
  { label: 'Fondo turismo, LR 17/2025 art. 133, DPReg 60/2026 (Regione FVG)', url: `${TURISMO}/FOGLIA350/`, read: true }
];

/** Dove le pagine ufficiali non dicono la stessa cosa: va scritto, non nascosto. */
export const officialInconsistencies = [
  'Le pagine della Regione dicono che il limite di persone per nucleo familiare è passato da 4 a 6 (legge regionale 7/2024) e le domande frequenti confermano «non più di sei». Una risposta, però, parla ancora di «nuclei da una a quattro persone». Questa pagina usa sei, come l’avviso, e conviene confermarlo con la Regione prima di promettere un importo a un cliente.'
];

// ---------------------------------------------------------------------------------------------
// La funzione dell'incentivo (Voucher TUReSTA)
// ---------------------------------------------------------------------------------------------

/**
 * Dove si trova la struttura. Decide due cose: l'importo per persona e le notti minime.
 *  - `citta-unesco`: Gorizia, Pordenone, Udine, Trieste o un Comune con un sito culturale UNESCO regionale.
 *  - `montano-bc`: Comune montano delle zone omogenee B e C di svantaggio socioeconomico.
 *  - `montano-a`: Comune montano delle zone omogenee A.
 * L'elenco dei Comuni sta nel PDF ufficiale: la pagina chiede all'utente di scegliere e rimanda all'elenco.
 */
export type VoucherZone = 'citta-unesco' | 'montano-bc' | 'montano-a';

export interface ZoneRule {
  label: string;
  /** Euro per persona. */
  perPerson: number;
  /** Notti consecutive minime nella stessa struttura. */
  minNights: number;
}

export const MAX_PEOPLE_PER_HOUSEHOLD = 6;

export const zoneRules: Record<VoucherZone, ZoneRule> = {
  'citta-unesco': { label: 'Gorizia, Pordenone, Udine, Trieste o Comune con sito UNESCO', perPerson: 80, minNights: 2 },
  'montano-bc': { label: 'Comune montano, zone omogenee B e C', perPerson: 80, minNights: 3 },
  'montano-a': { label: 'Comune montano, zone omogenee A', perPerson: 40, minNights: 3 }
};

/** Massimo per nucleo familiare: importo per persona per sei persone (480 € o 240 €). */
export const householdCap = (zone: VoucherZone): number => zoneRules[zone].perPerson * MAX_PEOPLE_PER_HOUSEHOLD;

export interface VoucherInput {
  zone: VoucherZone;
  /** Persone dello stesso nucleo familiare (anagrafe comunale) che usano il voucher; bambini compresi. */
  people: number;
  /** Notti consecutive nella stessa struttura. */
  nights: number;
  /** Costo complessivo del soggiorno, in euro. */
  stayCost: number;
}

export interface VoucherResult {
  eligible: boolean;
  /** Perché non spetta, se non spetta. */
  reason: string | null;
  /** Valore teorico del voucher: importo per persona, fino al massimo del nucleo. */
  voucher: number;
  /** Sconto vero: mai oltre il costo del soggiorno (la parte eccedente non si riutilizza). */
  discount: number;
  /** Cosa resta da pagare alla struttura. */
  toPay: number;
  /** Quota del soggiorno coperta, da 0 a 1. */
  coverage: number;
  /** Parte del voucher che non si usa perché supera il costo del soggiorno. */
  unused: number;
  /** Notti minime della zona. */
  minNights: number;
}

const clampPeople = (people: number) => Math.max(0, Math.min(MAX_PEOPLE_PER_HOUSEHOLD, Math.floor(people)));

/**
 * Quanto vale il voucher per un soggiorno.
 *
 *   voucher = importo per persona × min(persone, 6)          (80 € o 40 € a persona, massimo 480 € o 240 € a nucleo)
 *   sconto  = min(voucher, costo del soggiorno)               (la parte eccedente non si riutilizza)
 *   da pagare = costo del soggiorno − sconto
 *
 * Si ha diritto solo con almeno `minNights` notti consecutive nella stessa struttura (3, o 2 a Gorizia,
 * Pordenone, Udine, Trieste e nei Comuni con un sito UNESCO). Un residente lo usa una volta nell'anno solare.
 */
export function voucherFor({ zone, people, nights, stayCost }: VoucherInput): VoucherResult {
  const rule = zoneRules[zone];
  const persons = clampPeople(people);
  const cost = Math.max(0, Number.isFinite(stayCost) ? stayCost : 0);
  const gross = persons * rule.perPerson;
  const base = { minNights: rule.minNights };

  if (persons < 1)
    return { ...base, eligible: false, reason: 'Serve almeno una persona residente in Friuli-Venezia Giulia.', voucher: 0, discount: 0, toPay: cost, coverage: 0, unused: 0 };
  if (nights < rule.minNights)
    return {
      ...base,
      eligible: false,
      reason: `Servono almeno ${rule.minNights} notti consecutive nella stessa struttura.`,
      voucher: gross,
      discount: 0,
      toPay: cost,
      coverage: 0,
      unused: 0
    };

  const discount = Math.min(gross, cost);
  return {
    ...base,
    eligible: true,
    reason: null,
    voucher: gross,
    discount,
    toPay: cost - discount,
    coverage: cost > 0 ? discount / cost : 0,
    unused: gross - discount
  };
}

/** Quota del soggiorno coperta dal voucher, da 0 a 1, per più costi di soggiorno: serve a leggere la forma della funzione. */
export function coverageCurve(zone: VoucherZone, people: number, nights: number, costs: number[]): { cost: number; coverage: number; toPay: number }[] {
  return costs.map((stayCost) => {
    const r = voucherFor({ zone, people, nights, stayCost });
    return { cost: stayCost, coverage: r.coverage, toPay: r.toPay };
  });
}

// ---------------------------------------------------------------------------------------------
// Le tre misure, con lo stato alla data di verifica
// ---------------------------------------------------------------------------------------------

export type MeasureStatus = 'attivo' | 'chiuso' | 'in-graduatoria';

export interface Measure {
  id: 'turesta' | 'fesr-a322' | 'fondo-turismo';
  name: string;
  status: MeasureStatus;
  /** Una riga: lo stato con la data. */
  statusLine: string;
  /** Per chi è e cosa dà, in una frase. */
  what: string;
  /** Cosa copre o non copre: è il punto che decide se serve a chi costruisce il digitale. */
  digital: string;
  officialUrl: string;
}

export const measures: Measure[] = [
  {
    id: 'turesta',
    name: 'Voucher TUReSTA in FVG',
    status: 'attivo',
    statusLine: 'Attivo anche nel 2026 (pagina della Regione aggiornata all’8 maggio 2026).',
    what: 'Incentivo alla domanda: i residenti in Friuli-Venezia Giulia comprano due o tre notti nelle strutture aderenti con 80 € o 40 € a persona di sconto, fino a 480 € o 240 € per nucleo. La Regione rimborsa alla struttura le somme non incassate.',
    digital: 'Non finanzia spese della struttura: porta clienti. Il digitale serve a farsi trovare, a mostrare il prezzo al netto del voucher e a gestire le prenotazioni.',
    officialUrl: `${TURISMO}/FOGLIA81/`
  },
  {
    id: 'fesr-a322',
    name: 'Aiuti per la competitività sostenibile e digitale (PR FESR 2021-2027, bando a.3.2.2)',
    status: 'chiuso',
    statusLine: 'Chiuso: domande dal 30 ottobre 2024 al 31 marzo 2025.',
    what: 'Contributo a fondo perduto del 50% della spesa ammissibile per alberghi e strutture ricettive (codici ATECO 55.10, 55.20, 55.30), con spesa minima di 30.000, 45.000 o 60.000 € secondo la dimensione dell’impresa e massimo 240.000 € di aiuto.',
    digital:
      'Tra le spese ammissibili: software, hardware, apparati di connettività e consulenze specialistiche per la digitalizzazione dei servizi alla clientela (fino al 20% del costo totale del progetto).',
    officialUrl: `${TURISMO}/FOGLIA112/`
  },
  {
    id: 'fondo-turismo',
    name: 'Fondo turismo (LR 17/2025 art. 133, DPReg 60/2026)',
    status: 'in-graduatoria',
    statusLine: 'Domande chiuse il 24 settembre 2026; graduatoria entro la fine del 2026.',
    what: 'Contributi in conto capitale per migliorare e realizzare strutture ricettive: fino al 50% in regime de minimis, oppure 10-30% secondo il regolamento europeo di esenzione, con un massimo di 300.000 €.',
    digital: 'Le spese ammesse sono arredi e attrezzature, lavori e immobili: software e consulenze digitali non sono tra le voci elencate dalla Regione.',
    officialUrl: `${TURISMO}/FOGLIA350/`
  }
];

/** Chi può aderire al voucher e dove chiedere aiuto: dalle pagine ufficiali per le strutture. */
export const adhesion = {
  requirements: [
    'Struttura gestita in forma imprenditoriale, iscritta al Registro delle imprese e attiva alla data di adesione.',
    'Struttura situata nell’area montana, a Gorizia, Pordenone, Trieste o Udine, o in un Comune con un sito culturale UNESCO regionale.'
  ],
  steps: [
    'Aderire dal portale TUReSTA, con accreditamento LOGIN FVG (linee guida per l’adesione).',
    'Il cliente residente prenota comunicando di voler usare il voucher, e consegna la «Dichiarazione del beneficiario» firmata con copia del documento d’identità, all’arrivo e comunque entro la fine del soggiorno.',
    'La struttura prenota il voucher sul portale regionale, da sette giorni prima del soggiorno fino alla fine del soggiorno (non lo prenota il cliente).',
    'La struttura applica lo sconto in fattura e rendiconta: la Regione scrive che rimborsa le somme non incassate entro trenta giorni dalla richiesta, con procedura informatizzata.'
  ],
  assistance: {
    info: 'turesta@regione.fvg.it',
    technicalPhone: '800 098 788',
    technicalHours: 'lunedì-venerdì, 08:00-18:00 (Service Desk Insiel: per l’applicativo TUReSTA e per LOGIN FVG)'
  }
};
