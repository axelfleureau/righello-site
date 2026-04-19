import type { PageServerLoad } from './$types'; 
import { getAllVideos } from '$lib/server/cloudinary';
import { getHiddenFallbackIds } from '$lib/server/video-visibility';
import { getCache, setCache } from '$lib/server/page-cache';
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

const CACHE_TTL_MS = 5 * 60 * 1000;

// Extract the last path segment from a Cloudinary publicId.
// e.g. "righello/reels/ricci-scuolasci" → "ricci-scuolasci"
// Used to match a Cloudinary upload against a fallback video by ID convention.
function cloudinarySlug(publicId: string): string {
  return publicId.split('/').pop() ?? publicId;
}

async function getCachedData() {
  const now = Date.now();
  const cache = getCache();
  if (cache && now < cache.expiresAt) {
    return cache;
  }
  const [data, hiddenFallbackIds] = await Promise.all([
    getAllVideos(),
    getHiddenFallbackIds(),
  ]);
  const fresh = { data, hiddenFallbackIds, expiresAt: now + CACHE_TTL_MS };
  setCache(fresh);
  return fresh;
}

export const load: PageServerLoad = async () => {
  let cloudinaryData = { hero: [], showcase: [], reels: [], testimonials: [] } as Awaited<ReturnType<typeof getAllVideos>>;
  let hiddenFallbackIds: string[] = [];

  try {
    const cached = await getCachedData();
    cloudinaryData = cached.data;
    hiddenFallbackIds = cached.hiddenFallbackIds;
  } catch (err) {
    console.error('[page.server] Data fetch failed, using fallback data:', err);
  }

  // Visible Cloudinary videos (not hidden)
  const visibleCloudinaryHero = cloudinaryData.hero.filter((v) => !v.hidden);
  const visibleCloudinaryShowcase = cloudinaryData.showcase.filter((v) => !v.hidden);
  const visibleCloudinaryReels = cloudinaryData.reels.filter((v) => !v.hidden);
  const visibleCloudinaryTestimonials = cloudinaryData.testimonials.filter((v) => !v.hidden);

  // --- Hero ---
  const heroVideo: HeroVideo =
    visibleCloudinaryHero.length > 0
      ? {
          youtubeId: visibleCloudinaryHero[0].youtubeId,
          cloudinaryUrl: visibleCloudinaryHero[0].url || undefined,
          cloudinaryPublicId: visibleCloudinaryHero[0].publicId,
          // thumbnailUrl: Cloudinary auto-generates a JPEG thumbnail for every
          // uploaded video. Passing it to PhoneMockup lets the hero image load
          // correctly in in-app browsers (Instagram, Facebook, TikTok) that block
          // cross-origin requests to img.youtube.com.
          thumbnailUrl: visibleCloudinaryHero[0].thumbnailUrl || undefined,
        }
      : FALLBACK_HERO;

  // Cloudinary slug sets: if a Cloudinary video's publicId last segment matches
  // a fallback video's id, the Cloudinary version takes precedence and the
  // fallback is excluded from the merged list (deduplication rule).
  const cloudinaryShowcaseSlugs = new Set(visibleCloudinaryShowcase.map((v) => cloudinarySlug(v.publicId)));
  const cloudinaryReelSlugs    = new Set(visibleCloudinaryReels.map((v) => cloudinarySlug(v.publicId)));
  const cloudinaryTestiSlugs   = new Set(visibleCloudinaryTestimonials.map((v) => cloudinarySlug(v.publicId)));

  // --- Showcase: merge Cloudinary + fallback, filter hidden + covered, sort by order ---
  const fallbackShowcase: VideoItem[] = FALLBACK_SHOWCASE
    .filter((v) => !hiddenFallbackIds.includes(v.id) && !cloudinaryShowcaseSlugs.has(v.id))
    .map((v) => ({ ...v, order: v.order + 1000 }));

  const showcaseItems: VideoItem[] = [
    ...visibleCloudinaryShowcase.map((v) => ({
      id: v.publicId,
      title: v.title,
      subtitle: v.subtitle,
      category: v.category,
      youtubeId: v.youtubeId,
      cloudinaryUrl: v.url || undefined,
      cloudinaryPublicId: v.publicId,
      thumbnailUrl: v.thumbnailUrl,
      order: v.order,
    })),
    ...fallbackShowcase,
  ].sort((a, b) => a.order - b.order);

  // --- Reels: merge Cloudinary + fallback, filter hidden + covered, sort by order ---
  const fallbackReels: ReelItem[] = FALLBACK_REELS
    .filter((v) => !hiddenFallbackIds.includes(v.id) && !cloudinaryReelSlugs.has(v.id))
    .map((v) => ({ ...v, order: v.order + 1000 }));

  const reelItems: ReelItem[] = [
    ...visibleCloudinaryReels.map((v) => ({
      id: v.publicId,
      title: v.title,
      subtitle: v.subtitle,
      category: v.category,
      youtubeId: v.youtubeId,
      cloudinaryUrl: v.url || undefined,
      cloudinaryPublicId: v.publicId,
      thumbnailUrl: v.thumbnailUrl,
      order: v.order,
    })),
    ...fallbackReels,
  ].sort((a, b) => a.order - b.order);

  // --- Testimonials: merge Cloudinary + fallback, filter hidden + covered, sort by order ---
  const fallbackTestimonials: TestimonialItem[] = FALLBACK_TESTIMONIALS
    .filter((v) => !hiddenFallbackIds.includes(v.id) && !cloudinaryTestiSlugs.has(v.id))
    .map((v) => ({ ...v, order: v.order + 1000 }));

  const testimonialItems: TestimonialItem[] = [
    ...visibleCloudinaryTestimonials.map((v) => ({
      id: v.publicId,
      clientName: v.clientName || v.title,
      clientRole: v.clientRole || '',
      company: v.company || '',
      quote: v.quote || '',
      youtubeId: v.youtubeId,
      cloudinaryUrl: v.url || undefined,
      cloudinaryPublicId: v.publicId,
      thumbnailUrl: v.thumbnailUrl,
      order: v.order,
    })),
    ...fallbackTestimonials,
  ].sort((a, b) => a.order - b.order);

  return {
    heroVideo,
    showcaseItems,
    reelItems,
    testimonialItems,
  };
};
