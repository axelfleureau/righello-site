import { describe, expect, it } from 'vitest';
import { MESSAGE_MAX, parseContact, validateAll, validateContact, validateField } from './contact-validation';

describe('validazione del modulo contatti', () => {
  it('accetta nome e solo l’email, senza messaggio', () => {
    expect(validateAll({ name: 'Mario', contact: 'mario@azienda.it', message: '' })).toEqual({});
  });

  it('accetta nome e solo il telefono, senza messaggio', () => {
    expect(validateAll({ name: 'Mario', contact: '+39 333 123 4567', message: '' })).toEqual({});
  });

  it('segnala nome e recapito mancanti con frasi che dicono cosa fare; il messaggio non e’ obbligatorio', () => {
    const errors = validateAll({ name: ' ', contact: '', message: '' });
    expect(Object.keys(errors)).toEqual(['name', 'contact']);
    expect(errors.contact).toContain('email');
    expect(errors.contact).toContain('telefono');
  });

  it('distingue l’email senza dominio e quella con lettere ma senza chiocciola', () => {
    expect(validateContact('mario@azienda')).toContain('dominio');
    expect(validateContact('mario.azienda.it')).toContain('chiocciola');
    expect(validateContact('mario@azienda.it')).toBe('');
  });

  it('chiede almeno 6 cifre e rifiuta le lettere nel telefono', () => {
    expect(validateContact('12345')).toContain('corto');
    expect(validateContact('333 abc 4567')).toContain('numeri');
    expect(validateContact('0434 123456')).toBe('');
    expect(validateContact('3'.repeat(40))).toContain('lungo');
  });

  it('riconosce che tipo di recapito e’ stato scritto', () => {
    expect(parseContact(' mario@azienda.it ')).toEqual({ kind: 'email', email: 'mario@azienda.it' });
    expect(parseContact('+39 333 123 4567')).toEqual({ kind: 'phone', phone: '+39 333 123 4567' });
    expect(parseContact('mario@')).toBeNull();
    expect(parseContact('12345')).toBeNull();
    expect(parseContact('')).toBeNull();
  });

  it('limita nome e messaggio come il server', () => {
    expect(validateField('name', 'x'.repeat(121))).toContain('lungo');
    expect(validateField('message', 'x'.repeat(MESSAGE_MAX))).toBe('');
    expect(validateField('message', 'x'.repeat(MESSAGE_MAX + 1))).toContain('lungo');
  });
});
