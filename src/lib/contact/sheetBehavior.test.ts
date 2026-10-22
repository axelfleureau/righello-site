import { describe, expect, it } from 'vitest';
import { DRAG_CLOSE_PX, FLICK_PX_PER_MS, shouldDismiss } from './sheetBehavior';

describe('trascinamento del foglio', () => {
  it('non si chiude per un trascinamento breve e lento: torna su', () => {
    expect(shouldDismiss(40, 0.1)).toBe(false);
    expect(shouldDismiss(DRAG_CLOSE_PX, 0.2)).toBe(false);
  });
  it('si chiude oltre la soglia, anche piano', () => {
    expect(shouldDismiss(DRAG_CLOSE_PX + 1, 0)).toBe(true);
    expect(shouldDismiss(300, 0.05)).toBe(true);
  });
  it('si chiude con un gesto veloce anche corto, ma non per un tocco che sfiora', () => {
    expect(shouldDismiss(40, FLICK_PX_PER_MS + 0.2)).toBe(true);
    expect(shouldDismiss(10, 2)).toBe(false);
  });
  it('un gesto verso l\'alto (velocita\' negativa) non chiude mai', () => {
    expect(shouldDismiss(0, -3)).toBe(false);
  });
});
