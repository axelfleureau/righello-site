/**
 * Da dove arriva chi scrive: la prima pagina vista nella scheda del browser e le campagne (UTM).
 * Si salva alla prima visita e viaggia con il contatto, cosi' il team vede quale canale lavora.
 * Si legge una volta sola per scheda (sessionStorage): niente cookie, niente profilazione.
 */
export interface Attribution {
  referrer?: string;
  utm?: Partial<Record<'source' | 'medium' | 'campaign' | 'term' | 'content', string>>;
}

const KEY = 'righello-arrivo';
const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;
const clip = (v: string, n = 120) => v.trim().slice(0, n);

/** Solo l'origine e il percorso del sito di provenienza (mai la query: puo' contenere dati altrui); i link interni non contano. */
export function externalReferrer(referrer: string, ownHost: string): string | undefined {
  try {
    const u = new URL(referrer);
    return u.host === ownHost ? undefined : clip(`${u.origin}${u.pathname}`, 200);
  } catch {
    return undefined;
  }
}

export function utmFromSearch(search: string): Attribution['utm'] | undefined {
  const params = new URLSearchParams(search);
  const utm: NonNullable<Attribution['utm']> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(`utm_${k}`);
    if (v) utm[k] = clip(v);
  }
  return Object.keys(utm).length ? utm : undefined;
}

/** Da chiamare una volta al caricamento. Una nuova campagna nell'indirizzo sostituisce la precedente; senza campagna non tocca nulla. */
export function captureAttribution(): void {
  try {
    const utm = utmFromSearch(location.search);
    const stored = sessionStorage.getItem(KEY);
    if (stored && !utm) return;
    const found: Attribution = {
      referrer: stored ? (JSON.parse(stored) as Attribution).referrer : externalReferrer(document.referrer, location.host),
      utm: utm ?? undefined,
    };
    sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    /* storage non disponibile (navigazione privata, blocco): il contatto parte senza provenienza */
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || '{}') as Attribution;
  } catch {
    return {};
  }
}
