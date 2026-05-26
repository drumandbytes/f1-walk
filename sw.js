const CACHE = 'monaco-walk-v2';
const TILE_CACHE = 'monaco-tiles-v1';
const MAX_TILE_CACHE = 1000;
const SHELL = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE && k !== TILE_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

async function limitTileCache(cache) {
  const keys = await cache.keys();
  if (keys.length > MAX_TILE_CACHE) {
    const toDelete = keys.slice(0, keys.length - MAX_TILE_CACHE);
    await Promise.all(toDelete.map(k => cache.delete(k)));
  }
}

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  if (url.hostname.endsWith('tile.openstreetmap.org')) {
    e.respondWith(
      caches.open(TILE_CACHE).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        try {
          const res = await fetch(e.request);
          if (res.ok) {
            cache.put(e.request, res.clone());
            limitTileCache(cache);
          }
          return res;
        } catch {
          return new Response('', { status: 503 });
        }
      })
    );
    return;
  }

  if (e.request.mode === 'navigate' || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) {
            caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
