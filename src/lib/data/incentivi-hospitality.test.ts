import { describe, expect, it } from 'vitest';
import {
  MAX_PEOPLE_PER_HOUSEHOLD,
  coverageCurve,
  householdCap,
  measures,
  officialSources,
  voucherFor,
  zoneRules
} from './incentivi-hospitality';

describe('funzione del voucher TUReSTA', () => {
  it('esempio ufficiale della Regione: 4 persone, 80 € a persona, 3 notti da 400 € → fattura da 80 €', () => {
    const r = voucherFor({ zone: 'montano-bc', people: 4, nights: 3, stayCost: 400 });
    expect(r.voucher).toBe(320);
    expect(r.discount).toBe(320);
    expect(r.toPay).toBe(80);
  });

  it('esempio ufficiale: voucher da 480 € e soggiorno da 400 € → sconto massimo 400 €, il resto non si riutilizza', () => {
    const r = voucherFor({ zone: 'citta-unesco', people: 6, nights: 3, stayCost: 400 });
    expect(r.voucher).toBe(480);
    expect(r.discount).toBe(400);
    expect(r.toPay).toBe(0);
    expect(r.unused).toBe(80);
    expect(r.coverage).toBe(1);
  });

  it('i massimali per nucleo sono 480 € e 240 €, cioè sei persone', () => {
    expect(MAX_PEOPLE_PER_HOUSEHOLD).toBe(6);
    expect(householdCap('citta-unesco')).toBe(480);
    expect(householdCap('montano-bc')).toBe(480);
    expect(householdCap('montano-a')).toBe(240);
  });

  it('oltre sei persone il voucher non cresce', () => {
    const sei = voucherFor({ zone: 'montano-bc', people: 6, nights: 3, stayCost: 2000 });
    const nove = voucherFor({ zone: 'montano-bc', people: 9, nights: 3, stayCost: 2000 });
    expect(nove.voucher).toBe(sei.voucher);
    expect(nove.voucher).toBe(480);
  });

  it('zona A: 40 € a persona, massimo 240 €', () => {
    expect(voucherFor({ zone: 'montano-a', people: 3, nights: 3, stayCost: 500 }).voucher).toBe(120);
    expect(voucherFor({ zone: 'montano-a', people: 6, nights: 3, stayCost: 900 }).voucher).toBe(240);
  });

  it('notti minime: 3, oppure 2 a Gorizia, Pordenone, Udine, Trieste e nei Comuni UNESCO', () => {
    expect(zoneRules['citta-unesco'].minNights).toBe(2);
    expect(zoneRules['montano-bc'].minNights).toBe(3);
    expect(zoneRules['montano-a'].minNights).toBe(3);
    expect(voucherFor({ zone: 'citta-unesco', people: 2, nights: 2, stayCost: 300 }).eligible).toBe(true);
    const montano = voucherFor({ zone: 'montano-bc', people: 2, nights: 2, stayCost: 300 });
    expect(montano.eligible).toBe(false);
    expect(montano.reason).toMatch(/3 notti/);
    expect(montano.discount).toBe(0);
    expect(montano.toPay).toBe(300);
  });

  it('senza persone o con costi strani non produce numeri negativi o non finiti', () => {
    for (const stayCost of [0, -50, NaN, Infinity]) {
      const r = voucherFor({ zone: 'citta-unesco', people: 2, nights: 3, stayCost });
      for (const n of [r.voucher, r.discount, r.toPay, r.coverage, r.unused]) {
        expect(Number.isFinite(n)).toBe(true);
        expect(n).toBeGreaterThanOrEqual(0);
      }
    }
    expect(voucherFor({ zone: 'citta-unesco', people: 0, nights: 3, stayCost: 300 }).eligible).toBe(false);
  });

  it('lo sconto non supera mai il costo del soggiorno e si paga sempre costo meno sconto', () => {
    for (const zone of ['citta-unesco', 'montano-bc', 'montano-a'] as const)
      for (let people = 1; people <= 8; people++)
        for (const stayCost of [50, 199, 320, 480, 1000]) {
          const r = voucherFor({ zone, people, nights: 3, stayCost });
          expect(r.discount).toBeLessThanOrEqual(stayCost);
          expect(r.toPay).toBeCloseTo(stayCost - r.discount, 6);
        }
  });

  it('la quota coperta scende al salire del prezzo: famiglia di 4, 3 notti, zona 80 €', () => {
    const curve = coverageCurve('citta-unesco', 4, 3, [300, 400, 600, 1200]);
    expect(curve.map((c) => c.coverage)).toEqual([1, 0.8, 320 / 600, 320 / 1200]);
    for (let i = 1; i < curve.length; i++) expect(curve[i].coverage).toBeLessThanOrEqual(curve[i - 1].coverage);
  });
});

describe('misure e fonti', () => {
  it('ogni misura ha stato, indirizzo ufficiale della Regione e una riga sul digitale', () => {
    expect(measures.map((m) => m.id)).toEqual(['turesta', 'fesr-a322', 'fondo-turismo']);
    for (const m of measures) {
      expect(m.officialUrl).toMatch(/^https:\/\/www\.regione\.fvg\.it\//);
      expect(m.statusLine.length).toBeGreaterThan(10);
      expect(m.digital.length).toBeGreaterThan(20);
    }
  });

  it('i collegamenti ufficiali sono https e senza duplicati', () => {
    const urls = officialSources.map((s) => s.url);
    for (const u of urls) expect(u).toMatch(/^https:\/\//);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('i PDF non letti non sono riassunti: la pagina li dichiara solo come collegamenti', () => {
    const nonLetti = officialSources.filter((s) => !s.read);
    expect(nonLetti.length).toBeGreaterThan(0);
    for (const s of nonLetti) expect(s.url).toMatch(/\.pdf$|turesta\.regione\.fvg\.it/);
  });
});
