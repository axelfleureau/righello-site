import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminAuthenticated } from '$lib/server/admin-auth';
import { getAllVideos, updateVideoMetadata, deleteVideo } from '$lib/server/cloudinary';
import { setCloudinaryHidden, setFallbackHidden } from '$lib/server/video-visibility';
import { invalidateCache } from '$lib/server/page-cache';

export const GET: RequestHandler = async ({ cookies }) => {
  if (!isAdminAuthenticated(cookies)) {
    throw error(401, 'Non autorizzato');
  }
  const videos = await getAllVideos();
  return json(videos);
};

export const PUT: RequestHandler = async ({ request, cookies }) => {
  if (!isAdminAuthenticated(cookies)) {
    throw error(401, 'Non autorizzato');
  }

  const body = await request.json();
  const { publicId, ...metadata } = body as { publicId: string; [key: string]: unknown };

  if (!publicId) {
    throw error(400, 'publicId obbligatorio');
  }

  const cleanMeta: Record<string, string | number | undefined> = {};
  for (const [k, v] of Object.entries(metadata)) {
    if (v !== undefined && v !== null && v !== '') {
      cleanMeta[k] = typeof v === 'number' ? v : String(v);
    }
  }

  await updateVideoMetadata(publicId, cleanMeta as Parameters<typeof updateVideoMetadata>[1]);
  return json({ ok: true });
};

// PATCH — toggle visibility (hidden/visible) for any video (Cloudinary or fallback)
export const PATCH: RequestHandler = async ({ request, cookies }) => {
  if (!isAdminAuthenticated(cookies)) {
    throw error(401, 'Non autorizzato');
  }

  const body = await request.json() as {
    id: string;
    source: 'cloudinary' | 'fallback';
    hidden: boolean;
  };

  if (!body.id || typeof body.hidden !== 'boolean') {
    throw error(400, 'id e hidden obbligatori');
  }

  if (body.source === 'cloudinary') {
    await setCloudinaryHidden(body.id, body.hidden);
  } else {
    await setFallbackHidden(body.id, body.hidden);
  }

  // Bust the homepage cache so the next visit reflects the change immediately
  invalidateCache();

  return json({ ok: true });
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
  if (!isAdminAuthenticated(cookies)) {
    throw error(401, 'Non autorizzato');
  }

  const { publicId } = await request.json() as { publicId: string };
  if (!publicId) {
    throw error(400, 'publicId obbligatorio');
  }

  await deleteVideo(publicId);
  invalidateCache();
  return json({ ok: true });
};
