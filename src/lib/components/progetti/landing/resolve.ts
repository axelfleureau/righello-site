import type { CaseStudy } from '$lib/data/case-studies';
import { getLanding } from '$lib/data/landing';
import type { IconName, Landing } from '$lib/data/landing/types';

/** Icone per il ripiego, a rotazione: un set neutro che vale per ogni prodotto. */
const fallbackIcons: IconName[] = ['layers', 'bolt', 'link', 'shield', 'sparkle', 'gear'];

/**
 * Il contenuto di una pagina prodotto: il suo file landing, oppure (finche' non c'e') un ripiego
 * ricavato dalla scheda in case-studies.ts: il testo diventa il capitolo, i punti di lavoro le funzioni.
 */
/** Vero se il prodotto ha il suo file landing: serve a non promettere con i titoli del ripiego. */
export const hasOwnLanding = (study: CaseStudy) => !!getLanding(study.id);

export function resolveLanding(study: CaseStudy): Landing {
  const own = getLanding(study.id);
  if (own) return own;
  return {
    metrics: [],
    chapters: [
      {
        id: 'progetto',
        kicker: 'Il progetto',
        title: study.headline,
        text: study.text,
        layout: 'full',
      },
    ],
    features: study.focus.map((title, i) => ({ icon: fallbackIcons[i % fallbackIcons.length], title, text: '' })),
    tech: [],
  };
}

/** Quante schermate servono perche' la galleria abbia senso: con una o due non e' una galleria, la sezione non compare. */
export const DEMO_MIN = 3;

/** La galleria si mostra solo con almeno DEMO_MIN voci (e la nav di sezione la segue). */
export const hasDemo = (landing: Landing) => (landing.demo?.items.length ?? 0) >= DEMO_MIN;
