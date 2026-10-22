import { describe, expect, it } from 'vitest';
import { PRIORITY_HIGH, PRIORITY_MEDIUM, PRIORITY_STANDARD, analyzeLead, budgetAmount } from './contact-analysis';

const lead = (over: Partial<Parameters<typeof analyzeLead>[0]> = {}) => ({ email: 'a@b.it', phone: '', company: '', service: '', budget: '', message: '', ...over });

describe('budgetAmount', () => {
  it.each([
    ['Meno di 5.000€', 2999],
    ['5.000€ - 10.000€', 10000],
    ['10.000€ - 25.000€', 25000],
    ['Oltre 25.000€', 25000],
    ['Da definire', 0],
    ['Da definire - contributo fino a 10.000€', 0],
    ['10.000 - 20.000 euro', 20000],
    ['5k', 5000],
    ['', 0],
  ])('%j = %i', (budget, expected) => expect(budgetAmount(budget)).toBe(expected));
});

describe('analyzeLead', () => {
  it('una richiesta ricca e' + ' alta priorità', () => {
    const a = analyzeLead(lead({ phone: '+39 333 1234567', company: 'ACME', service: 'Progetto Completo', budget: 'Oltre 25.000€', message: 'parola '.repeat(70) }));
    expect(a.score).toBe(10);
    expect(a.priority).toBe(PRIORITY_HIGH);
    expect(a.window).toBe('entro 24 ore');
  });

  it('solo il tema e un recapito: standard', () => {
    const a = analyzeLead(lead({ service: 'Altro' }));
    expect(a.priority).toBe(PRIORITY_STANDARD);
    expect(a.window).toBe('entro 72 ore');
  });

  it('un budget medio con messaggio moderato: media priorità', () => {
    const a = analyzeLead(lead({ service: 'Sviluppo Web & Software', budget: '5.000€ - 10.000€', message: 'parola '.repeat(25), company: 'ACME' }));
    expect(a.priority).toBe(PRIORITY_MEDIUM);
  });

  it('il budget "Meno di 5.000" non vale quanto 5.000-10.000 (prima valeva uguale a un tetto sbagliato)', () => {
    const basso = analyzeLead(lead({ budget: 'Meno di 5.000€' })).score;
    const medio = analyzeLead(lead({ budget: '5.000€ - 10.000€' })).score;
    expect(medio).toBeGreaterThan(basso);
  });

  it('i range non si sommano (10.000 - 25.000 non diventa un numero di 9 cifre)', () => {
    expect(analyzeLead(lead({ budget: '5.000€ - 10.000€' })).priority).not.toBe(PRIORITY_HIGH);
  });

  it('chi lascia solo il telefono: l\'azione dice di richiamare', () => {
    const a = analyzeLead(lead({ email: '', phone: '333 1234567' }));
    expect(a.lines.join('\n')).toMatch(/richiamare o scrivere su WhatsApp/);
    expect(a.lines.join('\n')).toMatch(/solo telefono/);
  });

  it('cita la provenienza e non dice mai che l\'analisi AI non c\'è', () => {
    const a = analyzeLead(lead({ source: { path: '/progetti/tetha', from: 'tetha' } }));
    const text = a.lines.join('\n');
    expect(text).toContain('tetha');
    expect(text).not.toMatch(/AI non disponibile/i);
  });
});
