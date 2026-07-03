const CACHE_NAME = 'aqua-tech-admin-v1';
const ASSETS = [
  './',
  'index.html',
  'admin.html',
  'admin_login.html',
  'admin_setup.html',
  'biometric-control.html',
  'control_profile.html',
  'customer_detail.html',
  'login_members.html',
  'new_future.html',
  'online_bill.html',
  'online_bill_pdf.html',
  'online_quotation.html',
  'price_list.html',
  'manifest.json',
  'icon-128x128.png',
  'icon-144x144.png',
  'icon-152x152.png',
  'icon-192x192.png',
  'icon-256x256.png',
  'icon-512x512.png'
];

// Install Service Worker and Cache Assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Service Worker and Clear Old Caches
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
    }).then(() => self.clients.claim())
  );
});

// Fetch Requests from Cache or Network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
