import { describe, expect, it } from 'vitest';
import { larghezzaRiquadroMax, logoSagoma, logoSagomaSuChiaro, logoSize } from './logos';

describe('logos', () => {
  it('conosce le dimensioni vere dei file e restituisce undefined per gli ignoti', () => {
    expect(logoSize('/logos/neura.png')).toEqual({ width: 192, height: 192 });
    expect(logoSize('/logos/non-esiste.png')).toBeUndefined();
  });

  it('sostituisce con la versione senza targa piena solo i file che ne hanno una', () => {
    expect(logoSagoma('/logos/neura.png')).toBe('/logos/mono/neura.png');
    expect(logoSagoma('/logos/ricci-group.webp')).toBe('/logos/mono/ricci-group.png');
    expect(logoSagoma('/logos/canale-77.webp')).toBe('/logos/canale-77.webp');
  });

  it('segnala i loghi a colori con parti bianche', () => {
    expect(logoSagomaSuChiaro('/logos/comune-pordenone.png')).toBe(true);
    expect(logoSagomaSuChiaro('/logos/mangio.png')).toBe(false);
  });

  it('lascia a 100 px il riquadro dei loghi normali e allarga solo i larghissimi', () => {
    expect(larghezzaRiquadroMax(480, 115)).toBe(100); // VIP Motors
    expect(larghezzaRiquadroMax(879, 157)).toBe(100); // Tubaro, 5,6:1
    expect(larghezzaRiquadroMax(1167, 100)).toBeGreaterThan(150); // Barcolana, 11,7:1
    expect(larghezzaRiquadroMax(1733, 204)).toBeGreaterThan(100); // Poles, 8,5:1
  });

  it('un logo larghissimo non scende mai sotto 12 px di altezza disegnata', () => {
    for (const [w, h] of [[1167, 100], [1733, 204], [3000, 100]]) {
      const contenuto = larghezzaRiquadroMax(w, h) - 24;
      expect(contenuto / (w / h)).toBeGreaterThanOrEqual(12);
    }
  });
});
