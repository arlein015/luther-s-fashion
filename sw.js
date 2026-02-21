const CACHE_NAME = 'luther-fashion-v2';
const ASSETS = [
  './',
  './index.html',
  './badg noir.JPG',
  'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Poppins:wght@300;400;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Installation : on force l'activation immédiate
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activation : on supprime les anciens caches pour voir les nouveaux produits
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// Stratégie : Network First (on cherche d'abord sur internet pour voir les 100 produits)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
