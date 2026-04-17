import type { getAllVideos } from './cloudinary';

interface Cache {
  data: Awaited<ReturnType<typeof getAllVideos>>;
  hiddenFallbackIds: string[];
  expiresAt: number;
}

let cache: Cache | null = null;

export function getCache(): Cache | null {
  return cache;
}

export function setCache(c: Cache): void {
  cache = c;
}

export function invalidateCache(): void {
  cache = null;
}
