import { describe, expect, it } from 'vitest';
import { caseStudies, caseStudyHref } from './case-studies';
import { footerProducts, isCurrent, mainNav } from './site';

describe('site', () => {
  it('i prodotti del piede coincidono con case-studies (nome e indirizzo)', () => {
    for (const product of footerProducts) {
      const study = caseStudies.find((s) => s.id === product.id);
      expect(study, `manca ${product.id} in case-studies`).toBeDefined();
      expect(product.label).toBe(study!.name);
      expect(product.href).toBe(caseStudyHref(study!));
    }
  });

  it('la voce corrente della testata si riconosce dal percorso', () => {
    const by = (href: string) => mainNav.find((n) => n.href === href)!;
    expect(isCurrent(by('/'), '/')).toBe(true);
    expect(isCurrent(by('/'), '/servizi')).toBe(false);
    expect(isCurrent(by('/servizi'), '/servizi/web')).toBe(true);
    expect(isCurrent(by('/servizi'), '/agenzia-marketing-mestre')).toBe(true);
    expect(isCurrent(by('/progetti'), '/buffr')).toBe(true);
    expect(isCurrent(by('/progetti'), '/progetti/dico')).toBe(true);
    expect(isCurrent(by('/contatti'), '/progetti')).toBe(false);
  });
});
