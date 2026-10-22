import { error } from '@sveltejs/kit';
import { getSoftwareHouse } from '$lib/data/software-house';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const page = getSoftwareHouse(params.zona);
  if (!page) throw error(404, { message: `Pagina "${params.zona}" non trovata` });
  return { page };
};
