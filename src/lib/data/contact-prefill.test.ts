import { describe, expect, it } from 'vitest';
import { contactHref, pageLink, whatsappHref, mailHref } from './contact';
import { describePath, resolveContactContext } from './contact-prefill';

describe('da dove si arriva al modulo di contatto', () => {
  it('home e pagine generiche: nessun tema scelto, la pagina e’ descritta in parole', () => {
    expect(resolveContactContext({ path: '/' })).toMatchObject({ topic: '', where: 'Home', from: '', study: null });
    expect(resolveContactContext({ path: '/chi-siamo' })).toMatchObject({ topic: '', where: 'Chi siamo' });
  });

  it('scheda prodotto: tema e provenienza dal prodotto', () => {
    const r = resolveContactContext({ path: '/progetti/tetha' });
    expect(r.study?.id).toBe('tetha');
    expect(r.topic).toBe('Sviluppo Web & Software');
    expect(r.where).toBe('Progetto: Tetha');
    expect(r.from).toBe('tetha');
    expect(resolveContactContext({ path: '/buffr' }).where).toBe('Progetto: BUFFR');
  });

  it('pagina di servizio: quel servizio', () => {
    expect(resolveContactContext({ path: '/servizi/marketing' })).toMatchObject({ topic: 'Marketing & Social Media', from: 'marketing' });
    expect(resolveContactContext({ path: '/servizi/advertising' }).topic).toBe('Advertising & Automazione');
    expect(resolveContactContext({ path: '/servizi/agenti-ai' })).toMatchObject({ topic: 'Sviluppo Web & Software', from: 'agenti-ai' });
    expect(resolveContactContext({ path: '/servizi/web' }).where).toMatch(/^Servizio: /);
    expect(resolveContactContext({ path: '/agenzia-marketing-mestre' }).topic).toBe('Marketing & Social Media');
  });

  it('l’indirizzo del pulsante vince sulla pagina: ?da= e ?servizio=', () => {
    const r = resolveContactContext({ path: '/', from: 'optima' });
    expect(r.study?.id).toBe('optima');
    expect(r.where).toBe('Progetto: Óptima');
    expect(resolveContactContext({ path: '/chi-siamo', service: 'advertising' }).topic).toBe('Advertising & Automazione');
  });

  it('un parametro sconosciuto non si scrive mai cosi’ com’e’', () => {
    const r = resolveContactContext({ path: '/', from: '<script>alert(1)</script>', service: 'x"y' });
    expect(r.study).toBeNull();
    expect(r.topic).toBe('');
    expect(r.where).toBe('Home');
  });

  it('la pagina di errore si dice', () => {
    expect(describePath('/nonesiste', 'errore')).toBe('Pagina non trovata');
  });
});

describe('indirizzi di contatto', () => {
  it('contactHref e’ l’unico costruttore e codifica il prodotto', () => {
    expect(contactHref()).toBe('/contatti');
    expect(contactHref('tetha')).toBe('/contatti?da=tetha');
    expect(contactHref({ id: 'a b' })).toBe('/contatti?da=a%20b');
  });
  it('solo il "Contatti" dei menu e’ una voce di navigazione', () => {
    expect(pageLink('/contatti')).toBe('page');
    expect(pageLink('/servizi')).toBeUndefined();
  });
  it('il ripiego su WhatsApp e posta porta il testo gia’ scritto', () => {
    expect(decodeURIComponent(whatsappHref('Ciao, sono Mario'))).toContain('Ciao, sono Mario');
    const mail = mailHref('Richiesta dal sito', 'Ciao\nsono Mario');
    expect(mail.startsWith('mailto:')).toBe(true);
    expect(decodeURIComponent(mail)).toContain('body=Ciao\nsono Mario');
  });
});
