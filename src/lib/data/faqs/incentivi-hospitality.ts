import type { Faq } from './types';
import { adhesion, householdCap, informationDate, zoneRules } from '../incentivi-hospitality';

/** Quello che si legge nella pagina e quello che dichiariamo ai motori di ricerca: lo stesso elenco. Cifre dai dati, mai a mano. */
export const incentiviHospitalityFaqs: Faq[] = [
  {
    question: 'Cos’è il Voucher TUReSTA in FVG?',
    answer: `È un incentivo della Regione per i residenti in Friuli-Venezia Giulia: uno sconto di ${zoneRules['citta-unesco'].perPerson} € a persona (${zoneRules['montano-a'].perPerson} € nei Comuni montani di zona A) su due o tre notti consecutive in una struttura ricettiva aderente, fino a ${householdCap('citta-unesco')} € per nucleo familiare. Non dipende dall’ISEE.`
  },
  {
    question: 'Come si calcola il valore del voucher?',
    answer: `Si moltiplica l’importo per persona per le persone del nucleo, fino a sei. Lo sconto non supera mai il costo del soggiorno: se il voucher è di ${householdCap('citta-unesco')} € e il soggiorno costa 400 €, lo sconto è 400 € e il resto non si riutilizza. Ogni residente lo usa una volta nell’anno solare.`
  },
  {
    question: 'Quante notti servono?',
    answer: `Tre notti consecutive nella stessa struttura. Ne bastano due a Gorizia, Pordenone, Udine, Trieste e nei Comuni con un sito culturale UNESCO regionale. L’elenco dei Comuni è un PDF ufficiale della Regione, linkato in questa pagina.`
  },
  {
    question: 'Quante persone di una famiglia possono usare il voucher?',
    answer: 'Fino a sei per nucleo familiare, come risulta all’anagrafe comunale: la legge regionale 7/2024 ha portato il limite da quattro a sei. Alcune risposte sul sito della Regione parlano ancora di quattro: prima di promettere un importo a un cliente conviene chiedere conferma a turesta@regione.fvg.it.'
  },
  {
    question: 'Cosa succede alla struttura che applica lo sconto?',
    answer: 'La Regione scrive che rimborsa alla struttura le somme non incassate entro trenta giorni dalla presentazione delle richieste, con procedura informatizzata. Per i passaggi di prenotazione e rendicontazione fa fede il testo delle linee guida ufficiali (PDF), collegate in questa pagina.'
  },
  {
    question: 'Come aderisce una struttura ricettiva?',
    answer: `Deve essere gestita in forma imprenditoriale, iscritta al Registro delle imprese e attiva, e trovarsi in area montana, a Gorizia, Pordenone, Trieste, Udine o in un Comune UNESCO. L’adesione si fa dal portale TUReSTA con accreditamento LOGIN FVG. Assistenza tecnica Insiel: ${adhesion.assistance.technicalPhone}, ${adhesion.assistance.technicalHours}.`
  },
  {
    question: `Oggi (${informationDate}) c’è un bando per finanziare sito o software di un hotel?`,
    answer:
      'Non tra le tre misure che abbiamo verificato. Il bando regionale per la competitività sostenibile e digitale delle imprese turistiche ammetteva software, hardware e consulenze digitali (contributo del 50%) ma è chiuso dal 31 marzo 2025. Il Fondo turismo 2026 ha chiuso le domande il 24 settembre e non elenca il software tra le spese.'
  },
  {
    question: 'Righello può presentare la domanda o aderire per me?',
    answer:
      'No: non siamo l’ente che eroga né sostituiamo chi segue la pratica. Possiamo costruire la parte digitale (pagina e calcolatore del voucher sul sito della struttura, prenotazione diretta, comunicazione) e, quando un bando ammette quelle spese, preparare descrizione tecnica e preventivi. Un contributo non è mai garantito.'
  }
];
