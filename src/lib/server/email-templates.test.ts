import { describe, expect, it } from 'vitest';
import { analyzeLead } from './contact-analysis';
import {
  buildClientEmailHtml,
  buildClientEmailText,
  buildClientSubject,
  buildPreviewContactForm,
  buildTeamEmailHtml,
  buildTeamEmailText,
  buildTeamSubject,
  type ContactForm,
  type EmailChannels,
} from './email-templates';

const channels: EmailChannels = {
  reply: 'entro 72 ore lavorative',
  email: 'hello@wearerighello.com',
  whatsappHref: (text) => `https://wa.me/393393998351?text=${encodeURIComponent(text)}`,
};

describe('Righello email templates', () => {
  it('renders client and team emails with public Righello brand assets', () => {
    const form = buildPreviewContactForm();
    const analysis = analyzeLead(form);

    const clientHtml = buildClientEmailHtml(form, 'Ciao Marco, grazie per averci scritto.', channels);
    const teamHtml = buildTeamEmailHtml(form, analysis);
    const combined = `${clientHtml}\n${teamHtml}`;

    expect(combined).toContain('https://www.wearerighello.com/logo-white.png');
    expect(combined).toContain('https://www.wearerighello.com/email/icon-target.png');
    expect(combined).toContain('https://www.wearerighello.com/email/icon-clock.png');
    expect(combined).toContain('https://www.wearerighello.com/fonts/DegularDisplay-Regular_1768475446675.woff2');
    expect(combined).toContain('#D6487E');
    expect(combined).toContain('#06B6D4');
    expect(combined).toContain('supported-color-schemes');
    expect(combined).toContain('light dark');
    expect(combined).toContain('prefers-color-scheme: dark');
    expect(combined).toContain('rh-card');
    expect(combined).toContain('rh-panel');
    expect(clientHtml).toContain('Riepilogo richiesta');
    expect(clientHtml).toContain('Cosa succede ora');
    expect(combined).toContain('Righello response system');
    expect(teamHtml).toContain('Lead cockpit');
    expect(teamHtml).toContain('Azione consigliata');
    expect(teamHtml).toContain('Primo messaggio utile');
    expect(teamHtml).toContain('Da dove arriva');
    expect(teamHtml).toContain('+39 333 123 4567');
  });

  it('il codice e\' nell\'oggetto e nel corpo di entrambe le mail', () => {
    const form = buildPreviewContactForm();
    const analysis = analyzeLead(form);
    expect(buildClientSubject(form)).toContain('RH-7K2M9Q');
    expect(buildTeamSubject(form, analysis.priority)).toContain('RH-7K2M9Q');
    for (const body of [
      buildClientEmailHtml(form, '', channels),
      buildClientEmailText(form, '', channels),
      buildTeamEmailHtml(form, analysis),
      buildTeamEmailText(form, analysis),
    ]) {
      expect(body).toContain('RH-7K2M9Q');
    }
  });

  it('la mail al team mette in alto codice, priorita\', nome e recapiti cliccabili', () => {
    const form = buildPreviewContactForm();
    const html = buildTeamEmailHtml(form, analyzeLead(form));
    const cockpit = html.slice(html.indexOf('Lead cockpit'), html.indexOf('Azione consigliata'));
    expect(cockpit).toContain('RH-7K2M9Q');
    expect(cockpit).toContain('Marco Bianchi');
    expect(cockpit).toContain('href="mailto:axel@wearerighello.com');
    expect(cockpit).toContain('href="tel:+393331234567"');
    expect(cockpit).toContain('href="https://wa.me/393331234567?text=');
  });

  it('la mail al team dice da dove arriva: pagina, pulsante, scheda, riferimento, UTM', () => {
    const form = buildPreviewContactForm();
    const text = buildTeamEmailText(form, analyzeLead(form));
    expect(text).toContain('Pagina: /progetti/tetha');
    expect(text).toContain('Pulsante: chiusura-pagina');
    expect(text).toContain('Scheda o servizio di provenienza: tetha');
    expect(text).toContain('Arrivato da: https://www.google.com/');
    expect(text).toContain('Campagna: google / cpc / sito-aziendale');
    const html = buildTeamEmailHtml(form, analyzeLead(form));
    expect(html).toContain('Da dove arriva');
    expect(html).toContain('google / cpc / sito-aziendale');
    // Senza dati di provenienza lo dice, non inventa.
    expect(buildTeamEmailText({ ...form, source: undefined }, analyzeLead({ ...form, source: undefined }))).toContain('Da dove arriva:\nNon indicata');
  });

  it('solo telefono: la mail al team non ha il tasto email e ha chiama e WhatsApp', () => {
    const form: ContactForm = { ...buildPreviewContactForm(), email: '' };
    const html = buildTeamEmailHtml(form, analyzeLead(form));
    expect(html).not.toContain('mailto:axel@wearerighello.com');
    expect(html).not.toContain('Rispondi per email');
    expect(html).toContain('Scrivi su WhatsApp');
    expect(html).toContain('>Chiama<');
    expect(buildTeamEmailText(form, analyzeLead(form))).not.toContain('Email:');
  });

  it('solo email: nessuna riga telefono e nessun WhatsApp', () => {
    const form: ContactForm = { ...buildPreviewContactForm(), phone: '' };
    const html = buildTeamEmailHtml(form, analyzeLead(form));
    expect(html).not.toContain('tel:');
    expect(html).not.toContain('wa.me');
  });

  it('un fisso senza prefisso: telefono cliccabile ma nessun WhatsApp inventato', () => {
    const form: ContactForm = { ...buildPreviewContactForm(), phone: '0432 123456' };
    const html = buildTeamEmailHtml(form, analyzeLead(form));
    expect(html).toContain('href="tel:0432123456"');
    expect(html).not.toContain('wa.me');
  });

  it('la mail al cliente e\' corta, senza nomi di strumenti, col tempo di risposta dei canali e il WhatsApp col codice', () => {
    const form = buildPreviewContactForm();
    const html = buildClientEmailHtml(form, '', channels);
    const text = buildClientEmailText(form, '', channels);
    expect(html).toContain('entro 72 ore lavorative');
    expect(html).toContain(`https://wa.me/393393998351?text=${encodeURIComponent('Ciao, ho inviato una richiesta dal sito (riferimento RH-7K2M9Q).')}`);
    expect(text).toContain('Il tuo codice di riferimento: RH-7K2M9Q');
    expect(text).toContain('entro 72 ore lavorative');
    for (const body of [html, text]) {
      expect(body).not.toMatch(/OpenAI|ChatGPT|GPT|SendGrid|Claude|analisi AI|intelligenza artificiale/i);
    }
    expect(html.length).toBeLessThan(26_000);
    // niente sezioni vuote quando mancano i dati
    const minimal = buildClientEmailHtml({ ...form, service: '', company: '', budget: '', message: '' }, '', channels);
    expect(minimal).not.toContain('Non indicato');
    expect(minimal).not.toContain('>Messaggio<');
  });

  it('il corpo migliorato dal modello entra solo se c\'e\' e si legge a paragrafi', () => {
    const form = buildPreviewContactForm();
    const html = buildClientEmailHtml(form, 'Primo paragrafo.\n\nSecondo paragrafo.', channels);
    expect(html).toContain('Primo paragrafo.');
    expect(html).toContain('Secondo paragrafo.');
  });
});

describe('HTML mai non escapato dai campi dell\'utente', () => {
  const attack = (tag: string) => `<b id="${tag}">"><script>alert('${tag}')</script><img src=x onerror=alert(1)>&amp;`;
  const hostile: ContactForm = {
    name: attack('NAME'),
    email: "o'brien@azienda.it",
    phone: '+39 333 123 4567',
    company: attack('COMPANY'),
    service: attack('SERVICE'),
    budget: attack('BUDGET'),
    message: attack('MESSAGE'),
    reference: 'RH-7K2M9Q',
    source: {
      path: `/${attack('PATH')}`,
      cta: attack('CTA'),
      from: attack('FROM'),
      referrer: attack('REFERRER'),
      utm: { source: attack('USRC'), medium: attack('UMED'), campaign: attack('UCAM'), term: attack('UTERM'), content: attack('UCON') },
    },
  };

  const bodies = () => {
    const analysis = analyzeLead(hostile);
    return {
      cliente: buildClientEmailHtml(hostile, attack('AI'), channels),
      team: buildTeamEmailHtml(hostile, analysis),
    };
  };

  it('nessun tag o attributo dell\'utente sopravvive nelle due mail', () => {
    for (const [nome, html] of Object.entries(bodies())) {
      for (const tag of ['NAME', 'COMPANY', 'SERVICE', 'BUDGET', 'MESSAGE', 'PATH', 'CTA', 'FROM', 'REFERRER', 'USRC', 'UMED', 'UCAM', 'UTERM', 'UCON', 'AI']) {
        expect(html, `${nome}: ${tag}`).not.toContain(`<b id="${tag}">`);
        expect(html, `${nome}: ${tag}`).not.toContain(`alert('${tag}')</script>`);
      }
      expect(html, nome).not.toContain('<img src=x');
      expect(html, nome).not.toMatch(/<script/i);
      // Solo i <script> e gli <img> del modello restano: nessun onerror in nessun tag.
      expect(html, nome).not.toMatch(/<[^>]*onerror=/i);
      expect(html, nome).toContain('&lt;b id=&quot;');
    }
  });

  it('le uniche etichette <script> o <img> sono quelle dei modelli (nessuna in piu\' dei campi dell\'utente)', () => {
    const { team, cliente } = bodies();
    const clean = buildPreviewContactForm();
    const base = {
      team: buildTeamEmailHtml(clean, analyzeLead(clean)),
      cliente: buildClientEmailHtml(clean, '', channels),
    };
    const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;
    expect(count(team, /<img /g)).toBe(count(base.team, /<img /g));
    expect(count(cliente, /<img /g)).toBe(count(base.cliente, /<img /g));
    expect(count(team, /<a /g)).toBeLessThanOrEqual(count(base.team, /<a /g) + 1);
  });

  it('negli attributi href non entra nulla di non codificato', () => {
    const { team, cliente } = bodies();
    const hrefs = [...team.matchAll(/href="([^"]*)"/g), ...cliente.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      expect(href, href).not.toMatch(/[<>]|javascript:/i);
      expect(href, href).toMatch(/^(mailto:|tel:|https:\/\/|http:\/\/)/);
    }
  });

  it('le versioni testo e gli oggetti non contengono a capo che aprano intestazioni', () => {
    const analysis = analyzeLead(hostile);
    const subject = (s: string) => expect(s).not.toMatch(/[\r\n]/);
    subject(buildClientSubject(hostile));
    subject(buildTeamSubject(hostile, analysis.priority));
  });

  it('un nome o un messaggio con a capo e HTML restano leggibili senza rompere la tabella', () => {
    const form: ContactForm = { ...buildPreviewContactForm(), message: 'Riga uno\n<i>riga due</i>\n\nRiga tre' };
    const html = buildTeamEmailHtml(form, analyzeLead(form));
    expect(html).toContain('Riga uno\n&lt;i&gt;riga due&lt;/i&gt;\n\nRiga tre');
    expect(html).toContain('white-space:pre-line');
  });
});
