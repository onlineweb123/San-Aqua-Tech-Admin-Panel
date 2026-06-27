const CACHE_NAME = 'aqua-tech-v2'; // வெர்ஷன் மாற்றப்பட்டுள்ளது
const ASSETS = [
  './',
  'index.html',
  'admin.html',
  'icon-128×128.png',
  'icon-144×144.png',
  'icon-152×152.png',
  'icon-192×192.png',
  'icon-256×256.png',
  'icon-512×512.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch Request
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
