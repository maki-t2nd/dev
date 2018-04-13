var CACHE_NAME = 'my-site-cache-v2';
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

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log(event.request, response);
        // キャッシュがあったのでそのレスポンスを返す
        if (response) {
          return response;
        }


        return fetch(event.request).then(
          function(response) {
            // レスポンスが正しいかをチェック
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, response.clone());
              });

            return response;
          }
        );
      }
    )
  );
});

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});
