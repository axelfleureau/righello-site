import type { Faq } from './types';
import { serviceFaqs, toFaq } from '../service-details';

/** Le domande della pagina di Pordenone: le sue e due scelte fra quelle dei servizi. */
const pordenoneOwnFaqs: Faq[] = [
  {
    question: 'Righello è una agenzia marketing di Pordenone?',
    answer:
      'Righello lavora con aziende a Pordenone e in Friuli-Venezia Giulia su marketing, advertising, siti web, software e automazioni. Siamo un partner operativo: strategia, contenuti, campagne e tecnologia nello stesso processo.'
  },
  {
    question: 'Lavorate anche con aziende fuori dal centro di Pordenone?',
    answer:
      'Si. Gestiamo progetti in tutta la provincia di Pordenone e nel Nord Italia, con incontri da remoto e sessioni operative sul territorio quando servono shooting, workshop o contenuti.'
  },
  {
    question: 'Che cosa include un progetto di marketing locale?',
    answer:
      'Di solito partiamo da audit, posizionamento, tracking e piano di crescita. Poi mettiamo in fila contenuti, campagne, sito o landing page e reportistica: il marketing locale deve essere riconoscibile, non solo geolocalizzato.'
  }
];

export const pordenoneFaqs: Faq[] = [
  ...pordenoneOwnFaqs,
  ...serviceFaqs
    .filter((f) =>
      ['Che garanzie offrite sui risultati?', 'Come funziona il pagamento?'].includes(f.q)
    )
    .map(toFaq)
];
