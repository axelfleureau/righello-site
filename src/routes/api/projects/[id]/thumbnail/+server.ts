import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { projects } from '$lib/data/projects';
import ffmpeg from 'fluent-ffmpeg';
import { existsSync, mkdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { createHash } from 'crypto';

const CACHE_DIR = join(process.cwd(), '.thumbnail-cache');
const THUMBNAIL_MAX_AGE = 60 * 60 * 24 * 7;
const FFMPEG_TIMEOUT = 30;
const ALLOWED_HOSTS = [
  'firebasestorage.googleapis.com',
  'storage.googleapis.com',
];

const ALLOWED_PATTERNS = [
  /\.firebasestorage\.app$/,
];

if (!existsSync(CACHE_DIR)) {
  mkdirSync(CACHE_DIR, { recursive: true });
}

function isAllowedUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    if (url.protocol !== 'https:') return false;
    if (ALLOWED_HOSTS.some(
      (host) => url.hostname === host || url.hostname.endsWith(`.${host}`)
    )) return true;
    if (ALLOWED_PATTERNS.some((pattern) => pattern.test(url.hostname))) return true;
    return false;
  } catch {
    return false;
  }
}

function getCacheKey(id: string, videoUrl: string): string {
  const hash = createHash('md5').update(videoUrl).digest('hex').slice(0, 8);
  return `project-${id}-${hash}.jpg`;
}

function extractFrame(videoUrl: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('FFmpeg timeout: video processing took too long'));
    }, FFMPEG_TIMEOUT * 1000);

    ffmpeg(videoUrl)
      .inputOptions([
        '-protocol_whitelist', 'file,http,https,tcp,tls',
        '-rw_timeout', String(FFMPEG_TIMEOUT * 1000000),
      ])
      .seekInput(1)
      .frames(1)
      .size('800x?')
      .outputOptions(['-q:v', '2'])
      .output(outputPath)
      .on('end', () => {
        clearTimeout(timeout);
        resolve();
      })
      .on('error', (err: Error) => {
        clearTimeout(timeout);
        reject(err);
      })
      .run();
  });
}

export const GET: RequestHandler = async ({ params }) => {
  const { id } = params;

  const project = projects.find((p) => p.id === id);
  if (!project) {
    throw error(404, 'Progetto non trovato');
  }

  if (!project.videoUrl) {
    throw error(404, 'Nessun video associato a questo progetto');
  }

  if (!isAllowedUrl(project.videoUrl)) {
    console.error(`Blocked thumbnail request for project ${id}: URL not allowed`);
    throw error(400, 'URL video non valido');
  }

  const cacheFilename = getCacheKey(id, project.videoUrl);
  const cachedPath = join(CACHE_DIR, cacheFilename);

  if (existsSync(cachedPath)) {
    const imageBuffer = await readFile(cachedPath);
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': `public, max-age=${THUMBNAIL_MAX_AGE}`,
        'X-Thumbnail-Source': 'cache',
      },
    });
  }

  try {
    await extractFrame(project.videoUrl, cachedPath);
  } catch (err) {
    console.error(`Thumbnail generation failed for project ${id}:`, err);
    throw error(502, 'Errore nella generazione della thumbnail dal video remoto');
  }

  const imageBuffer = await readFile(cachedPath);
  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': `public, max-age=${THUMBNAIL_MAX_AGE}`,
      'X-Thumbnail-Source': 'generated',
    },
  });
};
