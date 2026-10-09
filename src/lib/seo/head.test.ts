import { describe, expect, it } from 'vitest';
import { dropOverriddenDefaults } from './head';

describe('dropOverriddenDefaults', () => {
  const head = [
    '<meta name="description" content="generica" data-seo-default>',
    '<meta property="og:image" content="/og.png" data-seo-default>',
    '<link rel="canonical" href="/a" data-seo-default>',
    '<meta name="description" content="della pagina">',
    '<link rel="canonical" href="/a">',
  ].join('\n');

  it('toglie il valore di partenza quando la pagina ne dichiara uno con la stessa chiave', () => {
    const out = dropOverriddenDefaults(head);
    expect(out).not.toContain('generica');
    expect(out).toContain('della pagina');
    expect(out.match(/rel="canonical"/g)).toHaveLength(1);
  });

  it('tiene il valore di partenza se la pagina non lo dichiara', () => {
    expect(dropOverriddenDefaults(head)).toContain('og:image');
  });
});
