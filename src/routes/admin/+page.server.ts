import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { checkAdminPassword, setAdminCookie, isAdminAuthenticated } from '$lib/server/admin-auth';

export const load: PageServerLoad = async ({ cookies }) => {
  if (isAdminAuthenticated(cookies)) {
    throw redirect(302, '/admin/dashboard');
  }
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get('password')?.toString() ?? '';

    if (!password) {
      return fail(400, { error: 'Inserisci la password.' });
    }

    if (!checkAdminPassword(password)) {
      return fail(401, { error: 'Password non corretta.' });
    }

    setAdminCookie(cookies);
    throw redirect(302, '/admin/dashboard');
  },
};
