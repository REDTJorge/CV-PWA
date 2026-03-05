//Constante para el nombre del cache, se puede cambiar la versión para forzar la actualización del cache
const CACHE_NAME = 'cv-pwa-cache-v1';
//Son los archivos que se van a cachear para que la aplicación funcione sin conexión a internet

const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/manifest.json',
  '/img/16x16.png',
  '/img/32x32.png',
  '/img/64x64.png',
  '/img/96x96.png',
  '/img/128x128.png',
  '/img/192x192.png',
  '/img/256x256.png',
  '/img/384x384.png',
  '/img/512x512.png',
  '/img/1024x1024.png'
];

//Evento de instalación del Service Worker, se encarga de cachear los archivos definidos en urlsToCache
self.addEventListener('install', function(event) {
    event.waitUntil(
        //Abre el cache y agrega los archivos a cachear
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Error al instalar el service worker', err))
    );
});


self.addEventListener('activate', e=> {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// //Evento de activación del Service Worker, se encarga de eliminar los caches antiguos
// self.addEventListener('activate', function(event) { //Agrega un event listener para el evento 'activate' del Service Worker
//     event.waitUntil(//se llama a event.waitUntil() para asegurarse de que el Service Worker no se active hasta que se complete la operación de limpieza de caches antiguos
//         caches.keys()//Obtiene todas las claves de cache disponibles
//         .then(keys => {//
//             return Promise.all(keys
//                 .filter(key => key !== CACHE_NAME)
//                 .map(key => caches.delete(key))
//                 .then(() => self.clients.claim())
//             )
//         })
//         .catch(err => console.log('Error al activar el service worker', err))
//     );
// });