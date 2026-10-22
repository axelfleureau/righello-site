import { describe, expect, it } from 'vitest';
import { CONTACT } from './contact';
import { CONTACT_STEPS as STEPS } from './contact-steps';

describe('i tre passi dopo la richiesta', () => {
  it('sono tre, ciascuno con il suo tempo', () => {
    expect(STEPS).toHaveLength(3);
    for (const s of STEPS) expect(s.when.length).toBeGreaterThan(2);
  });
  it('dicono solo i tempi che il sito dichiara gia\'', () => {
    expect(STEPS[1].when.toLowerCase()).toBe(CONTACT.reply);
    expect(STEPS[0].when).toBe('Adesso');
  });
  it('l\'italiano e\' giusto: "ai tre fondatori", mai "a i tre fondatori"', () => {
    const all = STEPS.map((s) => `${s.title} ${s.text}`).join(' ');
    expect(all).toContain('ai tre fondatori');
    expect(all).not.toMatch(/\ba i\b/);
    expect(CONTACT.recipientsTo).toBe('ai tre fondatori');
  });
});
