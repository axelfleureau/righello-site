import { cloudinary } from './cloudinary';

const CONFIG_PUBLIC_ID = 'righello/config/site-config';

// Tiny 1×1 transparent PNG — used as a placeholder resource to store site config
// in Cloudinary context (key-value metadata attached to any resource).
const PLACEHOLDER_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

async function ensureConfigExists(): Promise<void> {
  try {
    await cloudinary.api.resource(CONFIG_PUBLIC_ID, { resource_type: 'image' });
  } catch {
    await cloudinary.uploader.upload(PLACEHOLDER_PNG, {
      public_id: CONFIG_PUBLIC_ID,
      resource_type: 'image',
      overwrite: false,
    });
  }
}

function parseContext(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== 'object') return {};
  const obj = raw as Record<string, unknown>;
  if (obj.custom && typeof obj.custom === 'object') {
    return obj.custom as Record<string, string>;
  }
  return obj as Record<string, string>;
}

export async function getHiddenFallbackIds(): Promise<string[]> {
  try {
    const resource = await cloudinary.api.resource(CONFIG_PUBLIC_ID, {
      resource_type: 'image',
    });
    const ctx = parseContext(resource.context);
    const raw: string = ctx.hidden_fallback_ids || '';
    return raw ? raw.split(',').map((s) => s.trim()).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export async function setFallbackHidden(id: string, hidden: boolean): Promise<void> {
  await ensureConfigExists();
  const current = await getHiddenFallbackIds();
  const updated = hidden
    ? current.includes(id) ? current : [...current, id]
    : current.filter((s) => s !== id);
  await cloudinary.uploader.add_context(
    `hidden_fallback_ids=${updated.join(',')}`,
    [CONFIG_PUBLIC_ID],
    { resource_type: 'image' }
  );
}

export async function setCloudinaryHidden(publicId: string, hidden: boolean): Promise<void> {
  const context = `hidden=${hidden ? '1' : '0'}`;
  try {
    await cloudinary.uploader.add_context(context, [publicId], { resource_type: 'video' });
  } catch {
    await cloudinary.uploader.add_context(context, [publicId], { resource_type: 'image' });
  }
}
