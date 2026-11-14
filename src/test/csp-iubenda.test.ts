import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * La cookie policy e la privacy policy si aprono dal banner in una finestra che incorpora una pagina di iubenda:
 * se la regola frame-src dell'intestazione di sicurezza non la ammette, il browser blocca il frame e il visitatore
 * vede uno spinner all'infinito (segnalato da Axel il 14/11/2026).
 */
describe('intestazione di sicurezza (hooks.server.ts)', () => {
  const src = readFileSync('src/hooks.server.ts', 'utf8');
  const frameSrc = /frame-src ([^;"]*);/.exec(src)?.[1] ?? '';

  it('ammette iubenda fra i frame, per la finestra delle policy', () => {
    expect(frameSrc).toContain('https://www.iubenda.com');
  });

  it('non apre frame a chiunque', () => {
    expect(frameSrc).not.toMatch(/(^|\s)\*(\s|$)/);
    expect(frameSrc).toContain("'self'");
  });
});
