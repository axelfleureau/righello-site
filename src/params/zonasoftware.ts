import type { ParamMatcher } from '@sveltejs/kit';
import { softwareHouseLinks } from '$lib/data/site';

/** Le sedi con una pagina «software house» (`/software-house-<sede>`): ogni altro indirizzo e' un 404. */
export const match: ParamMatcher = (param) => softwareHouseLinks.some((l) => l.zone === param);
