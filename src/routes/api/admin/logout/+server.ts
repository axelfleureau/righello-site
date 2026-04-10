import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteAdminCookie } from '$lib/server/admin-auth';

export const POST: RequestHandler = async ({ cookies }) => {
  deleteAdminCookie(cookies);
  return json({ ok: true });
};
