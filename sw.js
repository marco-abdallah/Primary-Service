const cacheName = 'khidma-app-v3';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './Screenshot_20260215_205840_WhatsApp.jpg',
  './files-kg.pdf',
  './files-grade1.pdf',
  './files-grade2.pdf',
  './files-grade3.pdf',
  './files-grade4.pdf',
  './files-grade5.pdf',
  './files-grade6.pdf'
];

// تثبيت الـ Cache
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل وتحويل الطلبات للـ Cache في حال غياب الإنترنت
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request).catch(() => {
        if (e.request.url.includes('.pdf')) {
          return new Response("عذراً، هذا الملف غير متاح أوفلاين حالياً.");
        }
      });
    })
  );
});
