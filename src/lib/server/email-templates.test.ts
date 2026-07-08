import { describe, expect, it } from 'vitest';
import {
  buildClientEmailHtml,
  buildPreviewContactForm,
  buildPreviewLeadAnalysis,
  buildTeamEmailHtml,
  getLeadPriority,
} from './email-templates';

describe('Righello email templates', () => {
  it('renders client and team emails with public Righello brand assets', () => {
    const form = buildPreviewContactForm();
    const priority = getLeadPriority(form.budget);

    const clientHtml = buildClientEmailHtml(form, 'Ciao Marco, grazie per averci scritto.');
    const teamHtml = buildTeamEmailHtml(form, buildPreviewLeadAnalysis(), priority);
    const combined = `${clientHtml}\n${teamHtml}`;

    expect(combined).toContain('https://www.wearerighello.com/logo-white.png');
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
    expect(clientHtml).toContain('Metodo Righello');
    expect(combined).toContain('Righello response system');
    expect(teamHtml).toContain('Lead cockpit');
    expect(teamHtml).toContain('Azione consigliata');
    expect(teamHtml).toContain('Primo messaggio utile');
  });

  it('escapes user supplied contact data', () => {
    const form = {
      ...buildPreviewContactForm(),
      name: '<Marco>',
      company: 'ACME & Partners',
      message: '<script>alert("x")</script>',
    };

    const html = buildClientEmailHtml(form, '');

    expect(html).toContain('&lt;Marco&gt;');
    expect(html).toContain('ACME &amp; Partners');
    expect(html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
    expect(html).not.toContain('<script>alert("x")</script>');
  });
});
