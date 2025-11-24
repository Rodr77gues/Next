const CACHE_NAME = "nextstop-v1";
const FILES_TO_CACHE = [
  "/next/",
  "/next/index.html",
  "/next/style.css",
  "/next/app.js",
  "/next/manifest.json",
  "/next/estacoes.json",
  "/next/icon-192.png",
  "/next/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
