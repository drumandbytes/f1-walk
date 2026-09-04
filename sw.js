const CACHE = 'circuit-walk-v4';
const TILE_CACHE = 'circuit-tiles-v2';
// Tiles explicitly downloaded via each circuit's "Download map for offline
// use" button live here instead, and are never evicted by limitTileCache --
// only tiles seen incidentally while panning/zooming go through the capped
// general TILE_CACHE below. Corridor preloads across all 5 circuits total
// well under 1000 tiles combined, so this cache isn't capped.
const PRIORITY_TILE_CACHE = 'circuit-tiles-priority-v1';
const MAX_TILE_CACHE = 1000;
const SHELL = [
  '/vendor/leaflet/leaflet.css',
  '/vendor/leaflet/leaflet.js',
  '/geo.js',
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
          .filter(k => k !== CACHE && k !== TILE_CACHE && k !== PRIORITY_TILE_CACHE)
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
      caches.open(PRIORITY_TILE_CACHE).then(async priorityCache => {
        const priorityHit = await priorityCache.match(e.request);
        if (priorityHit) return priorityHit;

        const cache = await caches.open(TILE_CACHE);
        const cached = await cache.match(e.request);
        if (cached) return cached;
        try {
          const res = await fetch(e.request);
          if (res.ok) {
            e.waitUntil(cache.put(e.request, res.clone()).then(() => limitTileCache(cache)));
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
            const resClone = res.clone();
            e.waitUntil(caches.open(CACHE).then(c => c.put(e.request, resClone)));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const resClone = res.clone();
          e.waitUntil(caches.open(CACHE).then(c => c.put(e.request, resClone)));
        }
        return res;
      });
    })
  );
});
