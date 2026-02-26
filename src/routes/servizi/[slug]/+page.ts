import { error } from '@sveltejs/kit';
import { getServiceBySlug, validSlugs } from '$lib/data/service-details';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const { slug } = params;

  if (!validSlugs.includes(slug)) {
    throw error(404, {
      message: `Servizio "${slug}" non trovato`
    });
  }

  const service = getServiceBySlug(slug);

  if (!service) {
    throw error(404, {
      message: `Servizio "${slug}" non trovato`
    });
  }

  return { service };
};
