// "start_url": "./?source=pwa",

// window.addEventListener('load', function () {
//   var btnSave = document.getElementById('addPWA')
//   var savedPrompt

//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('sw_my.js')
//       .then(function (registration) {
//         console.log('ServiceWorker registration successful with scope:', registration.scope)
//         // alert('安裝成功')
//       }).catch(function (err) {
//         console.log('ServiceWorker registration failed:', err)
//         // alert('安裝失敗，請重新安裝')
//       })
//   }

//   window.addEventListener('beforeinstallprompt', function (e) {
//     e.preventDefault()
//     btnSave.removeAttribute('disabled')
//     savedPrompt = e
//     return false
//   })

//   btnSave.addEventListener('click', function () {
//     if (savedPrompt !== undefined) {
//       savedPrompt.prompt()

//       savedPrompt.userChoice.then(function (result) {

//         if (result.outcome == 'dismissed') {
//           //   alert('使用者關閉主營幕')
//           console.log('User dismissed homescreen install')
//         } else {
//           // alert('使用者加入主營幕')
//           console.log('User added to homescreen')
//         }
//         savedPrompt = null
//       })
//     }
//   })

// })
// ========================

const cacheName = 'pwa_viru';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        //   只要有一個載入失敗，就全部失敗，所以盡量少
        '/pwa_viru/index.html',
        '/pwa_viru/sw_my.js'
        // '/pwa_viru/sw.js',
        // '/pwa_viru/manifest.json',
        // '/pwa_viru/icons/virucana48.png',
        // '/pwa_viru/icons/virucana144.png',
        // '/pwa_viru/icons/virucana192.png',
        // '/pwa_viru/icons/virucana512.png'
      ]))
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(function (response) {
        if (response) {
          return response
        }

        var requestToCache = event.request.clone()

        return fetch(requestToCache).then(
          function (response) {
            if (!response || response.status !== 200) {
              return response
            }

            var requestToCache = response.clone()

            cache.open(cacheName)
              .then(function (cache) {
                cache.put(requestToCache, requestToCache)
              })
            return response
          }
        )
      })
  )
});