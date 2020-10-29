import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst , StaleWhileRevalidate} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
// Use the imported Workbox libraries to implement caching,
// routing, and other logic:
precacheAndRoute(self.__WB_MANIFEST || [
    {url: '/index.html', revision: '1' },
    {url: '/index.html', revision: '1' },
    {url: '/team.html', revision: '1' },
    {url: '/match.html', revision: '1' },
    {url: '/top-nav.html', revision: '1' },
    {url: '/nav-mobile.html', revision: '1' },
  ],
    {
    ignoreURLParametersMatching: [/.*/]
  });
precacheAndRoute(self.__precacheManifest || [
    {url: '/manifest.json', revision: 1 },
    {url: '/images/icon_72x72.png', revision: null },
    {url: '/images/icon_96x96.png', revision: null },
    {url: '/images/icon_128x128.png', revision: null },
    {url: '/images/icon_144x144.png', revision: null },
    {url: '/images/icon_256x256.png', revision: null},
    {url: '/images/icon_192x192.png', revision: null },
    {url: '/images/icon_384x384.png', revision: null },
    {url: '/images/icon_512x512.png', revision: null }
  ]);
registerRoute(
   /^https:\/\/api\.football-data\.org/,
     new StaleWhileRevalidate({
      cacheName: 'cache-api',
    })
  );

registerRoute(
    /\.(?:css|js|png|jpg|svg|gif)$/,
    new CacheFirst({
      cacheName: 'cache-assets',
    })
);

registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: 'cache-assets',
    })
  );


registerRoute(
   /^https:\/\/fonts\.gstatic\.com/,
      new StaleWhileRevalidate({
        cacheName: 'cache-assets',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
          }),
        ],
      })
);

self.addEventListener('push', (event) => {
    let body;
     if (event.data) {
       body = event.data.text();
     } else {
       body = 'Push message no payload';
     }
    let options = {
       body: body,
       icon: 'images/logo.png',
       vibrate: [100, 50, 100],
       data: {
         dateOfArrival: Date.now(),
         primaryKey: 1
       }
     };
     event.waitUntil(
       self.registration.showNotification('Push Notification', options)
     );
});