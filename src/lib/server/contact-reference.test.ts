import { describe, expect, it } from 'vitest';
import { REFERENCE_ALPHABET, REFERENCE_PATTERN, referenceFor } from './contact-reference';

describe('referenceFor', () => {
  it('stesso id = stesso codice', () => {
    expect(referenceFor('abc-12345678')).toBe(referenceFor('abc-12345678'));
  });

  it('id diversi = codici diversi (nessuna collisione su 20.000 id)', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 20_000; i++) seen.add(referenceFor(`richiesta-${i}-${i * 7919}`));
    expect(seen.size).toBe(20_000);
  });

  it('forma RH- + 6 simboli, mai ambigui', () => {
    for (let i = 0; i < 2000; i++) {
      const ref = referenceFor(`id-${i}`);
      expect(ref).toMatch(REFERENCE_PATTERN);
      expect(ref.slice(3)).not.toMatch(/[01OI]/);
    }
    expect(REFERENCE_ALPHABET).toHaveLength(32);
  });
});
