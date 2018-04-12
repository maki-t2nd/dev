var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/dev/',
  '/dev/css/main.css',
  '/dev/js/main.js'
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
