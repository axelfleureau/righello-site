import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminAuthenticated } from '$lib/server/admin-auth';
import { getOpenAI } from '$lib/server/openai';
import { getAllVideos } from '$lib/server/cloudinary';
import {
  FALLBACK_SHOWCASE,
  FALLBACK_REELS,
  FALLBACK_TESTIMONIALS,
} from '$lib/data/videos-fallback';

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchedTitle: string | null;
  matchedId: string | null;
  reason: string;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
  if (!isAdminAuthenticated(cookies)) {
    throw error(401, 'Non autorizzato');
  }

  const body = await request.json() as {
    section: 'hero' | 'showcase' | 'reels' | 'testimonials';
    filename: string;
    title?: string;
    subtitle?: string;
  };

  if (!body.section || !body.filename) {
    throw error(400, 'section e filename sono obbligatori');
  }

  // Build existing video list for this section (Cloudinary + fallback)
  let existingVideos: { id: string; title: string; subtitle: string }[] = [];
  try {
    const cloudinaryData = await getAllVideos();
    const cloudinaryList = cloudinaryData[body.section].map((v) => ({
      id: v.publicId,
      title: v.title,
      subtitle: v.subtitle,
    }));

    const fallbackMap = {
      showcase: FALLBACK_SHOWCASE.map((v) => ({ id: v.id, title: v.title, subtitle: v.subtitle })),
      reels:    FALLBACK_REELS.map((v) => ({ id: v.id, title: v.title, subtitle: v.subtitle ?? '' })),
      testimonials: FALLBACK_TESTIMONIALS.map((v) => ({ id: v.id, title: v.clientName, subtitle: v.clientRole })),
      hero: [],
    };

    existingVideos = [...cloudinaryList, ...fallbackMap[body.section]];
  } catch (err) {
    console.error('[check-duplicate] Failed to load existing videos:', err);
    // Non-fatal: return no-duplicate if we can't load data
    return json({ isDuplicate: false, matchedTitle: null, matchedId: null, reason: 'Impossibile caricare i video esistenti' } satisfies DuplicateCheckResult);
  }

  if (existingVideos.length === 0) {
    return json({ isDuplicate: false, matchedTitle: null, matchedId: null, reason: 'Nessun video presente nella sezione' } satisfies DuplicateCheckResult);
  }

  // Build a compact prompt for GPT-4o-mini
  const existingList = existingVideos
    .map((v) => `- id:"${v.id}" titolo:"${v.title}" sottotitolo:"${v.subtitle}"`)
    .join('\n');

  const newVideoDesc = [
    `filename: "${body.filename}"`,
    body.title    ? `titolo: "${body.title}"`    : null,
    body.subtitle ? `sottotitolo: "${body.subtitle}"` : null,
  ].filter(Boolean).join(', ');

  const prompt = `Sei un assistente che controlla se un video è un duplicato.

Sezione: ${body.section}
Video esistenti:
${existingList}

Nuovo video: ${newVideoDesc}

Rispondi SOLO con JSON valido (niente altro):
{"isDuplicate": true|false, "matchedId": "id-del-match-o-null", "matchedTitle": "titolo-del-match-o-null", "reason": "spiegazione breve in italiano"}

Considera duplicato se il nome del file, il titolo o il sottotitolo sono molto simili a un video esistente (stesso brand/soggetto, non semplice coincidenza). Sii conservativo: meglio un falso negativo che un falso positivo.`;

  try {
    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 120,
      temperature: 0,
      response_format: { type: 'json_object' },
    });

    const raw = response.choices[0]?.message?.content ?? '{}';
    const result = JSON.parse(raw) as DuplicateCheckResult;

    return json({
      isDuplicate: result.isDuplicate ?? false,
      matchedTitle: result.matchedTitle ?? null,
      matchedId: result.matchedId ?? null,
      reason: result.reason ?? '',
    } satisfies DuplicateCheckResult);
  } catch (err) {
    console.error('[check-duplicate] OpenAI call failed:', err);
    // Non-fatal: if AI fails, let the upload proceed without blocking it
    return json({ isDuplicate: false, matchedTitle: null, matchedId: null, reason: 'Analisi AI non disponibile' } satisfies DuplicateCheckResult);
  }
};
