import { describe, expect, it } from 'vitest';
import type { ReelItem } from '$lib/data/videos-fallback';
import { staggerPortopiccoloReels } from './reel-order';

function reel(id: string): ReelItem {
  return { id, title: id, order: 0 };
}

describe('staggerPortopiccoloReels', () => {
  it('keeps the four Portopiccolo reels in order and separates them with other clients', () => {
    const items = [
      reel('dico'),
      reel('righello/reels/portopiccolo-capire-il-cliente'),
      reel('righello/reels/portopiccolo-paradiso-fiscale'),
      reel('righello/reels/portopiccolo-curriculum'),
      reel('righello/reels/portopiccolo-nascita-monfalcone'),
      reel('scuola-sci'),
      reel('mggrill'),
      reel('neura'),
      reel('3r'),
      reel('reguta'),
      reel('ricci-scuola-sci'),
      reel('ricci-group'),
      reel('scuola-sci-open-day')
    ];

    expect(staggerPortopiccoloReels(items).map((item) => item.id)).toEqual([
      'dico',
      'righello/reels/portopiccolo-capire-il-cliente',
      'scuola-sci',
      'mggrill',
      'righello/reels/portopiccolo-paradiso-fiscale',
      'neura',
      '3r',
      'righello/reels/portopiccolo-curriculum',
      'reguta',
      'ricci-scuola-sci',
      'righello/reels/portopiccolo-nascita-monfalcone',
      'ricci-group',
      'scuola-sci-open-day'
    ]);
  });
});
