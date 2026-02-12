const VIDEO_CACHE = 'righello-video-cache-v1';
const THUMBNAIL_CACHE = 'righello-thumb-cache-v1';

const CACHEABLE_VIDEO_PATTERNS = [
  /firebasestorage\.googleapis\.com/,
  /\.firebasestorage\.app/,
];

const CACHEABLE_THUMB_PATTERN = /\/api\/video-thumbnail/;

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== VIDEO_CACHE && key !== THUMBNAIL_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

function isVideoRequest(url) {
  return CACHEABLE_VIDEO_PATTERNS.some((p) => p.test(url)) && /\.(mp4|webm)/i.test(url);
}

function isThumbnailRequest(url) {
  return CACHEABLE_THUMB_PATTERN.test(url);
}

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (event.request.method !== 'GET') return;

  if (event.request.headers.get('range')) return;

  if (isVideoRequest(url)) {
    event.respondWith(
      caches.open(VIDEO_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (response.ok && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }

  if (isThumbnailRequest(url)) {
    event.respondWith(
      caches.open(THUMBNAIL_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }
});
