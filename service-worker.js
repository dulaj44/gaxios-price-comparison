const CACHE_NAME = 'gaxios-cache-v1';
const URLs_TO_CACHE = [
    '/',
    '/index.html',
    '/script.js',
    '/styles.css',  // Ensure you add styles.css if you're using it
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// Installing service worker and caching files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(URLs_TO_CACHE);
        })
    );
});

// Fetch event: serving cached content if available
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached response if available, otherwise fetch from network
            return cachedResponse || fetch(event.request);
        })
    );
});

// Activating service worker and cleaning up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);  // Delete old caches
                    }
                })
            );
        })
    );
});
