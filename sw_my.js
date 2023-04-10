if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw_my.js')
    .then(function (registration) {
      alert('安裝成功')
    }).catch(function (err) {
      alert('安裝失敗，請重新安裝')
    })
}

const cacheName = 'cache';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        'index.html'
      ]))
  )})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(function (response) {
        if (response) {
          return response
        }
        return fetch(e.request)
      }))
});