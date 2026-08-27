import type { ReelItem } from '$lib/data/videos-fallback';

const PORTOPICCOLO_REEL_SLUGS = new Set([
  'portopiccolo-capire-il-cliente',
  'portopiccolo-paradiso-fiscale',
  'portopiccolo-curriculum',
  'portopiccolo-nascita-monfalcone'
]);

function itemSlug(item: ReelItem): string {
  const publicId = item.cloudinaryPublicId || item.id;
  return publicId.split('/').pop() ?? publicId;
}

export function staggerPortopiccoloReels(items: ReelItem[]): ReelItem[] {
  const portopiccoloItems = items.filter((item) => PORTOPICCOLO_REEL_SLUGS.has(itemSlug(item)));
  if (portopiccoloItems.length < 2) return items;

  const otherItems = items.filter((item) => !PORTOPICCOLO_REEL_SLUGS.has(itemSlug(item)));
  if (otherItems.length === 0) return items;

  const staggered: ReelItem[] = [otherItems[0]];
  let otherIndex = 1;

  portopiccoloItems.forEach((item, index) => {
    staggered.push(item);

    if (index < portopiccoloItems.length - 1) {
      staggered.push(...otherItems.slice(otherIndex, otherIndex + 2));
      otherIndex += 2;
    }
  });

  staggered.push(...otherItems.slice(otherIndex));
  return staggered;
}
