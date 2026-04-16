import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminAuthenticated } from '$lib/server/admin-auth';
import { getSignedUploadParams } from '$lib/server/cloudinary';
import type { VideoSection } from '$lib/server/cloudinary';

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!isAdminAuthenticated(cookies)) {
    throw error(401, 'Non autorizzato');
  }

  const body = await request.json();
  const { section, filename } = body as { section: VideoSection; filename: string };

  if (!section || !filename) {
    throw error(400, 'section e filename sono obbligatori');
  }

  try {
    const params = await getSignedUploadParams(section, filename);
    return json(params);
  } catch (err) {
    console.error('[admin/upload] getSignedUploadParams failed:', err);
    throw error(500, err instanceof Error ? err.message : 'Errore nella generazione della firma');
  }
};
