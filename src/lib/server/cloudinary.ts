import { v2 as cloudinary } from 'cloudinary';
import { env } from '$env/dynamic/private';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type VideoSection = 'hero' | 'showcase' | 'reels' | 'testimonials';

export interface CloudinaryVideo {
  publicId: string;
  url: string;
  thumbnailUrl: string;
  section: VideoSection;
  title: string;
  subtitle: string;
  category: string;
  order: number;
  clientName?: string;
  clientRole?: string;
  company?: string;
  quote?: string;
  createdAt: string;
}

function parseContext(context: Record<string, string> | undefined): Record<string, string> {
  if (!context || typeof context !== 'object') return {};
  return context;
}

function buildVideoUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'mp4',
    quality: 'auto',
    fetch_format: 'auto',
  });
}

function buildThumbnailUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'jpg',
    quality: 80,
    width: 800,
    crop: 'fill',
    start_offset: '0',
  });
}

export async function getVideosBySection(section: VideoSection): Promise<CloudinaryVideo[]> {
  try {
    const folder = `righello/${section}`;
    const result = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .with_field('context')
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute();

    if (!result.resources || result.resources.length === 0) return [];

    const videos: CloudinaryVideo[] = result.resources.map((r: Record<string, unknown>) => {
      const ctx = parseContext(r.context as Record<string, string>);
      return {
        publicId: r.public_id as string,
        url: buildVideoUrl(r.public_id as string),
        thumbnailUrl: buildThumbnailUrl(r.public_id as string),
        section,
        title: ctx.title || (r.public_id as string).split('/').pop() || '',
        subtitle: ctx.subtitle || '',
        category: ctx.category || '',
        order: parseInt(ctx.order || '99', 10),
        clientName: ctx.clientName,
        clientRole: ctx.clientRole,
        company: ctx.company,
        quote: ctx.quote,
        createdAt: r.created_at as string,
      };
    });

    return videos.sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error(`[Cloudinary] Failed to fetch videos for section "${section}":`, err);
    return [];
  }
}

export async function getAllVideos(): Promise<Record<VideoSection, CloudinaryVideo[]>> {
  const [hero, showcase, reels, testimonials] = await Promise.all([
    getVideosBySection('hero'),
    getVideosBySection('showcase'),
    getVideosBySection('reels'),
    getVideosBySection('testimonials'),
  ]);
  return { hero, showcase, reels, testimonials };
}

export async function updateVideoMetadata(
  publicId: string,
  metadata: {
    title?: string;
    subtitle?: string;
    category?: string;
    order?: number;
    clientName?: string;
    clientRole?: string;
    company?: string;
    quote?: string;
  }
): Promise<void> {
  const context = Object.entries(metadata)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}=${String(v).replace(/[|=]/g, ' ')}`)
    .join('|');

  await cloudinary.uploader.add_context(context, [publicId], { resource_type: 'video' });
}

export async function deleteVideo(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
}

export async function getSignedUploadParams(
  section: VideoSection,
  filename: string
): Promise<{ signature: string; timestamp: number; cloudName: string; apiKey: string; folder: string; publicId: string }> {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = `righello/${section}`;
  const safeName = filename.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
  const publicId = `${folder}/${safeName}_${timestamp}`;

  const paramsToSign = { folder, public_id: publicId, timestamp };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, env.CLOUDINARY_API_SECRET);

  return {
    signature,
    timestamp,
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    folder,
    publicId,
  };
}

export { cloudinary };
