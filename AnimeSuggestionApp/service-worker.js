const CACHE_NAME = "animexo-v1";

const ASSETS = [
  "./",
  "./index.jsp",
  "./style.css",
  "./js/script.js",
  "./manifest.json",
  "./icons/icon1.png",
  "./icons/icon2.jpeg"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
