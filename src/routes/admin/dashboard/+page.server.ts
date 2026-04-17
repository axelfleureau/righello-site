import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isAdminAuthenticated } from '$lib/server/admin-auth';
import { getAllVideos } from '$lib/server/cloudinary';
import { getHiddenFallbackIds } from '$lib/server/video-visibility';
import {
  FALLBACK_HERO,
  FALLBACK_SHOWCASE,
  FALLBACK_REELS,
  FALLBACK_TESTIMONIALS,
} from '$lib/data/videos-fallback';

export interface AdminVideo {
  id: string;
  source: 'cloudinary' | 'fallback';
  section: 'hero' | 'showcase' | 'reels' | 'testimonials';
  publicId?: string;
  title: string;
  subtitle: string;
  category: string;
  order: number;
  hidden: boolean;
  thumbnailUrl: string;
  url?: string;
  youtubeId?: string;
  videoSrc?: string;
  clientName?: string;
  clientRole?: string;
  company?: string;
  quote?: string;
}

export const load: PageServerLoad = async ({ cookies }) => {
  if (!isAdminAuthenticated(cookies)) {
    throw redirect(302, '/admin');
  }

  let cloudinaryVideos = { hero: [], showcase: [], reels: [], testimonials: [] } as Awaited<ReturnType<typeof getAllVideos>>;
  let hiddenFallbackIds: string[] = [];

  try {
    [cloudinaryVideos, hiddenFallbackIds] = await Promise.all([
      getAllVideos(),
      getHiddenFallbackIds(),
    ]);
  } catch (err) {
    console.error('[admin] Failed to load videos:', err);
  }

  // Cloudinary videos (all, including hidden, so admin can un-hide them)
  const toAdminCloudinary = (
    section: 'hero' | 'showcase' | 'reels' | 'testimonials',
    videos: typeof cloudinaryVideos.showcase
  ): AdminVideo[] =>
    videos.map((v) => ({
      id: v.publicId,
      source: 'cloudinary' as const,
      section,
      publicId: v.publicId,
      title: v.title,
      subtitle: v.subtitle,
      category: v.category,
      order: v.order,
      hidden: v.hidden,
      thumbnailUrl: v.thumbnailUrl,
      url: v.url || undefined,
      youtubeId: v.youtubeId,
      clientName: v.clientName,
      clientRole: v.clientRole,
      company: v.company,
      quote: v.quote,
    }));

  // Fallback hero
  const heroFallback: AdminVideo[] = [
    {
      id: 'fallback-hero',
      source: 'fallback',
      section: 'hero',
      title: 'Hero video (YouTube)',
      subtitle: FALLBACK_HERO.youtubeId ? `ID: ${FALLBACK_HERO.youtubeId}` : '',
      category: '',
      order: 999,
      hidden: hiddenFallbackIds.includes('fallback-hero'),
      thumbnailUrl: FALLBACK_HERO.youtubeId
        ? `https://img.youtube.com/vi/${FALLBACK_HERO.youtubeId}/hqdefault.jpg`
        : '',
      youtubeId: FALLBACK_HERO.youtubeId,
    },
  ];

  const toAdminFallbackShowcase = (): AdminVideo[] =>
    FALLBACK_SHOWCASE.map((v) => ({
      id: v.id,
      source: 'fallback' as const,
      section: 'showcase' as const,
      title: v.title,
      subtitle: v.subtitle,
      category: v.category,
      order: v.order,
      hidden: hiddenFallbackIds.includes(v.id),
      thumbnailUrl: v.youtubeId
        ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`
        : v.posterSrc || '',
      youtubeId: v.youtubeId,
      videoSrc: v.videoSrc,
    }));

  const toAdminFallbackReels = (): AdminVideo[] =>
    FALLBACK_REELS.map((v) => ({
      id: v.id,
      source: 'fallback' as const,
      section: 'reels' as const,
      title: v.title,
      subtitle: v.subtitle || '',
      category: v.category || '',
      order: v.order,
      hidden: hiddenFallbackIds.includes(v.id),
      thumbnailUrl: v.youtubeId
        ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`
        : v.imageSrc || '',
      youtubeId: v.youtubeId,
      videoSrc: v.videoSrc,
    }));

  const toAdminFallbackTestimonials = (): AdminVideo[] =>
    FALLBACK_TESTIMONIALS.map((v) => ({
      id: v.id,
      source: 'fallback' as const,
      section: 'testimonials' as const,
      title: v.clientName,
      subtitle: v.clientRole,
      category: v.company,
      order: v.order,
      hidden: hiddenFallbackIds.includes(v.id),
      thumbnailUrl: v.youtubeId
        ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`
        : v.thumbnailSrc || '',
      youtubeId: v.youtubeId,
      videoSrc: v.videoSrc,
      clientName: v.clientName,
      clientRole: v.clientRole,
      company: v.company,
      quote: v.quote,
    }));

  const videos = {
    hero: [
      ...toAdminCloudinary('hero', cloudinaryVideos.hero),
      ...heroFallback,
    ].sort((a, b) => a.order - b.order),
    showcase: [
      ...toAdminCloudinary('showcase', cloudinaryVideos.showcase),
      ...toAdminFallbackShowcase(),
    ].sort((a, b) => a.order - b.order),
    reels: [
      ...toAdminCloudinary('reels', cloudinaryVideos.reels),
      ...toAdminFallbackReels(),
    ].sort((a, b) => a.order - b.order),
    testimonials: [
      ...toAdminCloudinary('testimonials', cloudinaryVideos.testimonials),
      ...toAdminFallbackTestimonials(),
    ].sort((a, b) => a.order - b.order),
  };

  return { videos };
};
