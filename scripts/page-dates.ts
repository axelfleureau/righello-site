/**
 * Scrive `src/lib/seo/page-dates.json`: per ogni pagina pubblica, la data dell'ultima modifica
 * del suo CONTENUTO (testi e dati), letta da git. E' il `lastmod` della mappa del sito.
 *
 *   npx tsx scripts/page-dates.ts
 *
 * Va rilanciato quando cambia un contenuto, non quando cambia la grafica o il codice: una data che
 * si muove a ogni ritocco non dice niente a chi legge la mappa. Per i progetti conta solo il blocco
 * del progetto dentro `case-studies.ts` e il suo file in `data/landing/`.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { sitePages, type Source } from '../src/lib/seo/pages';

const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8' }).trim();

function lastChange(source: Source): string | null {
  if (typeof source === 'string') {
    if (!existsSync(source)) return null;
    return git('log', '-1', '--format=%cs', '--', source) || null;
  }
  // Solo il blocco dell'elemento: dalla riga d'apertura alla graffa che chiude l'oggetto.
  const range = `/^    ${source.opens}/,/^  },$/:${source.file}`;
  return git('log', '-1', '--format=%cs', '-s', `-L${range}`) || null;
}

const dates: Record<string, string> = {};
for (const page of sitePages) {
  const found = page.sources.map(lastChange).filter((d): d is string => !!d);
  if (!found.length) throw new Error(`nessuna data per ${page.path}: controlla le sorgenti in src/lib/seo/pages.ts`);
  dates[page.path] = found.sort().at(-1)!;
}

writeFileSync('src/lib/seo/page-dates.json', JSON.stringify(dates, null, 2) + '\n');
console.log(`scritte ${Object.keys(dates).length} date in src/lib/seo/page-dates.json`);
