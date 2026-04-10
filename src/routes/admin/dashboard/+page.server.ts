import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isAdminAuthenticated } from '$lib/server/admin-auth';
import { getAllVideos } from '$lib/server/cloudinary';

export const load: PageServerLoad = async ({ cookies }) => {
  if (!isAdminAuthenticated(cookies)) {
    throw redirect(302, '/admin');
  }

  let videos = { hero: [], showcase: [], reels: [], testimonials: [] };
  try {
    videos = await getAllVideos();
  } catch (err) {
    console.error('[admin] Failed to load videos:', err);
  }

  return { videos };
};
