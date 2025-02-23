// import databaseService from '../src/services/database.services';

self.addEventListener('push', (event) => {
  console.log('Notification will be displayed here');
  const data = event.data ? event.data.json() : {};

  if (Notification.permission !== 'granted') {
    console.error('❌ Notification permissions not granted');
  }

  const { title, message, poster, _id, link, badge } = data;
  console.log('Notification Data', data);

  const options = {
    body: message,
    tag: _id,
    icon: poster,
    badge: badge,
    image: link,
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

// self.addEventListener('notificationclick', (event) => {
//   const clickedNotification = event.notification;
//   clickedNotification.close();

//   // Do something as the result of the notification click
//   const promiseChain = self.clients.openWindow(clickedNotification.image).then(() => {
//     // Add notificationIsReadBy to the database
//     databaseService
//       .markNotificationAsRead({ notificationId: clickedNotification.tag })
//       .then((response) => response.data)
//       .catch((err) => console.error('Error while marking notification as read', err));
//   });
//   event.waitUntil(promiseChain);
// });

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('Service Worker Installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
});
