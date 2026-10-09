import { describe, expect, it } from 'vitest';
import { validateAll, validateField } from './contact-validation';

describe('validazione del modulo contatti', () => {
  it('accetta un modulo completo', () => {
    expect(validateAll({ name: 'Mario', email: 'mario@azienda.it', phone: '+39 333 123 4567', message: 'Ciao' })).toEqual({});
  });

  it('segnala un campo vuoto con una frase che dice cosa fare', () => {
    const errors = validateAll({ name: ' ', email: '', phone: '', message: '' });
    expect(Object.keys(errors)).toEqual(['name', 'email', 'phone', 'message']);
    expect(errors.email).toContain('email');
  });

  it('distingue email senza chiocciola da email senza dominio', () => {
    expect(validateField('email', 'mario.azienda.it')).toContain('chiocciola');
    expect(validateField('email', 'mario@azienda')).toContain('dominio');
    expect(validateField('email', 'mario@azienda.it')).toBe('');
  });

  it('chiede almeno 6 cifre e rifiuta le lettere nel telefono', () => {
    expect(validateField('phone', '12345')).toContain('corto');
    expect(validateField('phone', '333 abc 4567')).toContain('numeri');
    expect(validateField('phone', '0434 123456')).toBe('');
  });
});
