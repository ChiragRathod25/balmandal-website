// import databaseService from '../src/services/database.services';

self.addEventListener('push', (event) => {
  console.log('Notification will be displayed here');
  const data = event.data ? event.data.json() : {};

  if (Notification.permission !== 'granted') {
    console.error('❌ Notification permissions not granted');
  }

  const { title, message, poster, _id, badge } = data;
  console.log('Notification Data', data);

  const options = {
    body: message,
    tag: _id,
    icon: poster,
    badge: badge,
    // image: poster,
    actions: [],
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
    // .then(() =>
    //   databaseService
    //     .markNotificationAsDelivered({ notificationId: _id })
    //     .then((response) => response.data)
    //     .catch((err) => console.error('Error while marking notification as delivered', err))
    // )
  );
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

//   // Do something as the result of the notification click
//   const promiseChain = self.clients.openWindow(clickedNotification.image).then(() => {
//     // Add notificationIsReadBy to the database
//     databaseService
//       .markNotificationAsRead({ notificationId: clickedNotification.tag })
//       .then((response) => response.data)
//       .catch((err) => console.error('Error while marking notification as read', err));
//   });
//   event.waitUntil(promiseChain);
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/main.js',
        '/icons/icon-192x192.png'
      ]);
    })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
});
