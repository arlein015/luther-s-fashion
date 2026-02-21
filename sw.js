const CACHE_NAME = 'luther-fashion-v1';
const ASSETS = [
  './',
  './index.html',
  './badg noir.JPG',
  'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Poppins:wght@300;400;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Installation du Service Worker et mise en cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Mode hors-ligne : on sert les fichiers depuis le cache si possible
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
