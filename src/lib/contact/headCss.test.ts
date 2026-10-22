import { describe, expect, it } from 'vitest';
import { stripLazyContactCss } from './headCss';

const head = (names: string[]) => names.map((n) => `<link href="./_app/immutable/assets/${n}.css" rel="stylesheet">`).join('');

describe('CSS dei pezzi pigri del contatto fuori dall\'intestazione', () => {
  const html = `<head>${head(['0.e7f56b1a', 'ContactSheetBody.bfa61bb9', 'ContactForm.b4652f78', 'CxButton.bba0cca8', 'ContactBar.fe71dce7', 'ProButton.73daa128'])}</head>`;
  it('toglie i quattro fogli dei pezzi pigri e lascia gli altri', () => {
    const out = stripLazyContactCss(html, '/servizi/web');
    expect(out).toContain('0.e7f56b1a');
    expect(out).toContain('ProButton.73daa128');
    for (const n of ['ContactSheetBody', 'ContactForm', 'CxButton', 'ContactBar']) expect(out).not.toContain(n);
  });
  it('sulla pagina /contatti non tocca niente: il modulo e\' disegnato dal server', () => {
    expect(stripLazyContactCss(html, '/contatti')).toBe(html);
  });
  it('non tocca altri file che iniziano diversamente', () => {
    const other = head(['ContactFormExtra.aaaa', 'MyContactBar.bbbb']);
    expect(stripLazyContactCss(other, '/')).toBe(other);
  });
});
