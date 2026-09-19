import { error, redirect } from '@sveltejs/kit';
import { getCaseStudyBySlug, getRelatedCaseStudies, validCaseStudySlugs } from '$lib/data/case-studies';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const { slug } = params;

  if (slug === 'buffr') {
    throw redirect(301, '/buffr');
  }

  if (!validCaseStudySlugs.includes(slug)) {
    throw error(404, { message: `Progetto "${slug}" non trovato` });
  }

  const study = getCaseStudyBySlug(slug);

  if (!study) {
    throw error(404, { message: `Progetto "${slug}" non trovato` });
  }

  return { study, related: getRelatedCaseStudies(study) };
};
