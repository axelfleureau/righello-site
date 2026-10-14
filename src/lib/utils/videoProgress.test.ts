import { describe, expect, it } from 'vitest';
import { paintVideoBar, paintVideoProgress } from './videoProgress';

// Segnaposto minimi: contano quante volte il DOM viene davvero toccato.
function fakeBar() {
  let writes = 0;
  let value = '';
  const style = {
    get transform() { return value; },
    set transform(v: string) { value = v; writes++; },
  };
  return { el: { style } as unknown as HTMLElement, writes: () => writes };
}
function fakeLabel() {
  let writes = 0;
  let value = '';
  const el = {
    get textContent() { return value; },
    set textContent(v: string) { value = v; writes++; },
  };
  return { el: el as unknown as HTMLElement, writes: () => writes, text: () => value };
}
const video = (currentTime: number, duration: number) => ({ currentTime, duration }) as HTMLVideoElement;

describe('videoProgress', () => {
  it('scrive la barra solo quando la posizione cambia', () => {
    const bar = fakeBar();
    paintVideoBar(bar.el, video(5, 20));
    paintVideoBar(bar.el, video(5, 20));
    paintVideoBar(bar.el, video(10, 20));
    expect(bar.writes()).toBe(2);
    expect(bar.el.style.transform).toBe('scaleX(0.5)');
  });

  it("riscrive l'etichetta solo quando il testo cambia (una volta al secondo)", () => {
    const bar = fakeBar();
    const label = fakeLabel();
    paintVideoProgress(bar.el, label.el, video(3.1, 15));
    paintVideoProgress(bar.el, label.el, video(3.6, 15));
    paintVideoProgress(bar.el, label.el, video(4.0, 15));
    expect(label.writes()).toBe(2);
    expect(label.text()).toBe('0:04 / 0:15');
  });

  it("formatta i minuti e accetta l'etichetta assente", () => {
    const bar = fakeBar();
    const label = fakeLabel();
    paintVideoProgress(bar.el, label.el, video(65, 125));
    expect(label.text()).toBe('1:05 / 2:05');
    expect(() => paintVideoProgress(bar.el, null, video(1, 2))).not.toThrow();
  });
});
