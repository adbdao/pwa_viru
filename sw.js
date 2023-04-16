// 引用workbox build
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// 使用cache功能
// 存任何的.js
workbox.routing.registerRoute(
  new RegExp('*\.js'),
  workbox.strategies.CacheOnly({
    cacheName: 'js-cache'
  })
);

// 存任何的html
workbox.routing.registerRoute(
  new RegExp('*\.html'),
  workbox.strategies.CacheOnly({
    cacheName: 'html-cache'
  })
);

// 存任何的css
workbox.routing.registerRoute(
  new RegExp('*\.css'),
  workbox.strategies.CacheOnly({
    cacheName: 'css-cache'
  })
);

// 存任何的images
workbox.routing.registerRoute(
  new RegExp('icons/*\.(?:png|jpg|jpeg|svg|gif)'),
  workbox.strategies.CacheOnly({
    cacheName: 'image-cache'
  })
);
// 不知道Github路徑，只好全部加入
// 存任何的.js
workbox.routing.registerRoute(
  new RegExp('/pwa_viru/*\.js'),
  workbox.strategies.CacheOnly({
    cacheName: 'js-cache-github'
  })
);

// 存任何的html
workbox.routing.registerRoute(
  new RegExp('/pwa_viru/*\.html'),
  workbox.strategies.CacheOnly({
    cacheName: 'html-cache-github'
  })
);

// 存任何的css
workbox.routing.registerRoute(
  new RegExp('/pwa_viru/*\.css'),
  workbox.strategies.CacheOnly({
    cacheName: 'css-cache-github'
  })
);

// 存任何的images
workbox.routing.registerRoute(
  new RegExp('/pwa_viru/icons/*\.(?:png|jpg|jpeg|svg|gif)'),
  workbox.strategies.CacheOnly({
    cacheName: 'image-cache-github'
  })
);


// ==============

// 使用precache功能，在offline下也可以執行
// 要存進cache storage裡的檔案清單
var cacheFiles = [
    // "assets/bootstrap.bundle.min.js",
    // "assets/bootstrap.min.css",
    // "assets/bootstrap.min.js",
    // "assets/jquery-3.3.1.slim.min.js",
    // "assets/test.jpg",
    {
      url: '/pwa_viru/index.html',
      revision: '00000001' // 加revision，版本改了以後，sw.js 在 application 上會更新
    }
  ];
  workbox.precaching.precacheAndRoute(cacheFiles);