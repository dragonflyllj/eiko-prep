const CACHE = 'eiko-prep-v5';
const ASSETS = [
  '/', '/index.html', '/manifest.json',
  '/phonics/', '/phonics/index.html', '/phonics/style.css',
  '/phonics/art.js', '/phonics/data.js', '/phonics/app.js',
  '/daily/', '/daily/index.html', '/daily/style.css',
  '/daily/data.js', '/daily/app.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() =>
      caches.match('/index.html')
    ))
  );
});
