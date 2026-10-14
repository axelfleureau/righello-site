import { describe, expect, it } from 'vitest';
import { dropOverriddenDefaults, readHeadMeta } from './head';

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

describe('readHeadMeta', () => {
  it('legge titolo, descrizione e immagine che la pagina ha dichiarato, non quelli di partenza', () => {
    const head = [
      '<title>Agenti AI &amp; automazioni | Righello</title>',
      '<meta name="description" content="Generica" data-seo-default>',
      '<meta name="description" content="Meno lavoro &quot;ripetitivo&quot;">',
      '<meta property="og:image" content="https://www.wearerighello.com/og/home.jpg?v=1" data-seo-default>',
      '<meta property="og:image" content="https://www.wearerighello.com/og/servizi.jpg?v=1">'
    ].join('\n');
    expect(readHeadMeta(head)).toEqual({
      title: 'Agenti AI & automazioni | Righello',
      description: 'Meno lavoro "ripetitivo"',
      image: 'https://www.wearerighello.com/og/servizi.jpg?v=1'
    });
  });

  it('non inventa nulla se la pagina non dichiara niente', () => {
    expect(readHeadMeta('<meta charset="utf-8">')).toEqual({
      title: undefined,
      description: undefined,
      image: undefined
    });
  });
});
