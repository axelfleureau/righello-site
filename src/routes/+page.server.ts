import type { PageServerLoad } from './$types';
import { getAllVideos } from '$lib/server/cloudinary';
import {
  FALLBACK_HERO,
  FALLBACK_SHOWCASE,
  FALLBACK_REELS,
  FALLBACK_TESTIMONIALS,
  type VideoItem,
  type ReelItem,
  type TestimonialItem,
  type HeroVideo,
} from '$lib/data/videos-fallback';

let cache: {
  data: Awaited<ReturnType<typeof getAllVideos>>;
  expiresAt: number;
} | null = null;

const CACHE_TTL_MS = 5 * 60 * 1000;

async function getCachedVideos() {
  const now = Date.now();
  if (cache && now < cache.expiresAt) {
    return cache.data;
  }
  const data = await getAllVideos();
  cache = { data, expiresAt: now + CACHE_TTL_MS };
  return data;
}

export const load: PageServerLoad = async () => {
  let cloudinaryData = { hero: [], showcase: [], reels: [], testimonials: [] } as Awaited<ReturnType<typeof getAllVideos>>;

  try {
    cloudinaryData = await getCachedVideos();
  } catch (err) {
    console.error('[page.server] Cloudinary fetch failed, using fallback data:', err);
  }

  const heroVideo: HeroVideo =
    cloudinaryData.hero.length > 0
      ? { cloudinaryUrl: cloudinaryData.hero[0].url, cloudinaryPublicId: cloudinaryData.hero[0].publicId }
      : FALLBACK_HERO;

  const showcaseItems: VideoItem[] =
    cloudinaryData.showcase.length > 0
      ? cloudinaryData.showcase.map((v) => ({
          id: v.publicId,
          title: v.title,
          subtitle: v.subtitle,
          category: v.category,
          cloudinaryUrl: v.url,
          cloudinaryPublicId: v.publicId,
          thumbnailUrl: v.thumbnailUrl,
          order: v.order,
        }))
      : FALLBACK_SHOWCASE;

  const reelItems: ReelItem[] =
    cloudinaryData.reels.length > 0
      ? cloudinaryData.reels.map((v) => ({
          id: v.publicId,
          title: v.title,
          subtitle: v.subtitle,
          category: v.category,
          cloudinaryUrl: v.url,
          cloudinaryPublicId: v.publicId,
          thumbnailUrl: v.thumbnailUrl,
          order: v.order,
        }))
      : FALLBACK_REELS;

  const testimonialItems: TestimonialItem[] =
    cloudinaryData.testimonials.length > 0
      ? cloudinaryData.testimonials.map((v) => ({
          id: v.publicId,
          clientName: v.clientName || v.title,
          clientRole: v.clientRole || '',
          company: v.company || '',
          quote: v.quote || '',
          cloudinaryUrl: v.url,
          cloudinaryPublicId: v.publicId,
          thumbnailUrl: v.thumbnailUrl,
          order: v.order,
        }))
      : FALLBACK_TESTIMONIALS;

  return {
    heroVideo,
    showcaseItems,
    reelItems,
    testimonialItems,
  };
};
