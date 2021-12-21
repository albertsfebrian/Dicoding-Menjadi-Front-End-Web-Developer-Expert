import 'regenerator-runtime'
import { skipWaiting, clientsClaim, setCacheNameDetails } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute } from 'workbox-precaching'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

skipWaiting()
clientsClaim()
setCacheNameDetails({
  prefix: 'restorate-cache',
  precache: 'precache',
  runtime: 'runtime'
})

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(/https:\/\/pro\.fontawesome\.com\/releases\/v5\.10\.0\/css\/all.css'/,
  new CacheFirst({
    cacheName: 'font-awesome-cahce'
  })
)

// Google Fonts
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
)

registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30
      })
    ]
  })
)

// API
registerRoute(/^https:\/\/restaurant-api\.dicoding\.dev\/(?:(list|detail))/,
  new NetworkFirst({
    cacheName: 'restorate-cache-API',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 50 // only cache 50 request
      })
    ]
  })
)

// Images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)
