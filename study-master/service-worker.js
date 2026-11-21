const CACHE_NAME = 'study-master-v1.0.0';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.webmanifest',
  './assets/logo.svg',
  './assets/illustrations/hero-study.svg',
  './assets/illustrations/exam-prep.svg',
  './assets/illustrations/empty-notes.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Do not cache external AI API requests
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic'
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response(
            '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Offline - Study Master</title><style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#f8fafc;color:#0f172a;text-align:center;padding:24px;}main{max-width:420px;background:#fff;padding:32px;border-radius:16px;box-shadow:0 10px 30px rgba(15,23,42,.08);}h1{color:#4f46e5;margin-top:0;}</style></head><body><main><h1>You are offline</h1><p>Study Master is running offline. Your saved notes, flashcards, planner, and demo MCQs remain available once cached.</p></main></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        });
    })
  );
});
