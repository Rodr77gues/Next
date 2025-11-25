const CACHE_NAME = "nextstop-v2";
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

// Instala e salva em cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
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
  self.clients.claim();
});

// Busca arquivos no cache ou na internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
