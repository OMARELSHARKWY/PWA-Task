const filesToCache = [
    '/index.html',
    '/pages/offline.html',
    '/pages/404.html',
    '/pages/page1.html',
    '/CSS/main.css',
    '/CSS/page1.css',
    '/JS/main.js'
];

const staticDB = 'staticDB';

self.addEventListener('install', event => {
    console.log("Service Worker installed", event);
    event.waitUntil(
        caches.open(staticDB)
        .then(cache => cache.addAll(filesToCache))
        .catch(err => console.log("Service Worker not installed", err))
    );
});

self.addEventListener('activate', event => {
    console.log("Service Worker activated", event);
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response.status === 404) {
                    return caches.match('/pages/404.html');
                }
                return cacheAndReturn(event.request, response.clone());
            })
            .catch(() => {
                return caches.match(event.request).then(cached => {
                    return cached || caches.match('/pages/offline.html');
                });
            })
    );
});

// Helper function to cache new GET requests
function cacheAndReturn(request, response) {
    if (request.method === "GET") {
        caches.open(staticDB).then(cache => cache.put(request, response));
    }
    return response;
}
