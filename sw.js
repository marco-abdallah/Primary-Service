const cacheName = 'khidma-v1';
const assets = [
  '/',
  '/index.html',
  '/Screenshot_20260215_205840_WhatsApp.jpg',
  '/files-kg.pdf',
  '/files-grade1.pdf',
  '/1.jpg',
  '/2.jpg',
  '/3.jpg',
  '/4.jpg',
  '/5.jpg',
  '/https://mega.nz/folder/0rpFnDqC#vLN2Pj-i_04RyR-wSgJgiw',
  // أضف هنا مسارات كل الصور والملفات التي تريدها أن تعمل بدون إنترنت
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});