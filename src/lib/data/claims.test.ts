import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Affermazioni commerciali che il sito non puo' dimostrare. Un claim entra qui quando una
 * verifica (archivio clienti, App Store, contratti) non ne trova la fonte, e ci resta finche'
 * non ne esiste una scritta. Regola di tutto il sito: una frase promette un risultato solo se
 * accanto ci sono chi, quanto e quando; altrimenti promette un metodo.
 *
 * Per rimettere un claim: scrivere la fonte (documento, data, cliente) nel commit e togliere
 * la riga da questo elenco con lo stesso commit, non aggirare il test.
 */
const CLAIM_NON_PROVATI: { regola: RegExp; perche: string }[] = [
  { regola: /Meta Partner|Google Partner/i, perche: 'badge di programma partner: servono iscrizione e certificato' },
  { regola: /5\.0 Rating/i, perche: 'valutazione senza fonte (BUFFR su App Store ha 3 valutazioni)' },
  { regola: /ROAS medio|ROI medio|Views generate|Clienti soddisfatti|% clienti soddisfatti|Specialisti['"]/, perche: 'statistica aziendale senza fonte nei documenti' },
  { regola: /Progetti completati/i, perche: 'il conteggio vero viene da case-studies.ts, non scritto a mano' },
  { regola: /massimo ritorno|minimo spreco/i, perche: 'superlativo promesso, la FAQ dice che i risultati non si garantiscono' },
  { regola: /generano risultati|generare risultati/i, perche: 'promessa di esito: dire cosa si fa e come si misura' },
  { regola: /ogni conversione tracciata|ogni euro (e|è) tracciato|ogni euro tracciato/i, perche: 'assoluto: dove il tracciamento non arriva la frase e\' falsa' },
  { regola: /trasformare follower in clienti|web app che convertono/i, perche: 'promessa di esito senza metodo' },
  { regola: /(nuovi|nuove|aggiungiamo nuove) [a-z ]*ogni mese|Ogni mese aggiungiamo/i, perche: 'cadenza mensile non dimostrata: i lavori si aggiungono quando sono pronti e il cliente da l\'ok' },
  { regola: /Status Symbol|guadagno multilivello/i, perche: 'risultato di un caso cliente non documentato' },
];

const RADICI = ['src/lib/data', 'src/lib/components', 'src/routes'];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((nome) => {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(svelte|ts)$/.test(nome) && !/\.test\.ts$/.test(nome) ? [p] : [];
  });
}

describe('claim commerciali', () => {
  const sorgenti = RADICI.flatMap((r) => files(r)).map((p) => ({ p, t: readFileSync(p, 'utf8') }));

  it('il sito ha testi da controllare', () => {
    expect(sorgenti.length).toBeGreaterThan(20);
  });

  for (const { regola, perche } of CLAIM_NON_PROVATI) {
    it(`non compare ${regola}`, () => {
      const trovati = sorgenti.filter(({ t }) => regola.test(t)).map(({ p }) => p);
      expect(trovati, `${perche} (vedi src/lib/data/claims.test.ts)`).toEqual([]);
    });
  }
});
