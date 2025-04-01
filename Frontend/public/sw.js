// import databaseService from '../src/services/database.services';

self.addEventListener('push', (event) => {
  console.log('Notification will be displayed here');
  const data = event.data ? event.data.json() : {};

  if (Notification.permission !== 'granted') {
    console.error('❌ Notification permissions not granted');
  }

  const { title, message, poster, _id, badge, link } = data;
  console.log('Notification Data', data);

  const options = {
    body: message,
    tag: _id,
    icon: poster,
    badge: badge,
    data: { url: link }, 
    actions: [],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification popup

  const urlToOpen = event.notification.data?.url || 'https://your-default-url.com';
  console.log('🔗 URL to open:', urlToOpen);

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      let matchingClient = null;

      // If PWA is open, focus it
      for (const client of clientList) {
        if (client.url.includes(self.origin) && 'focus' in client) {
          matchingClient = client;
          break;
        }
      }

      if (matchingClient) {
        console.log('Focusing existing PWA instance');
        return matchingClient.navigate(urlToOpen).then(() => matchingClient.focus());
      } else {
        console.log('🆕 Opening new window');
        return clients.openWindow(urlToOpen).catch(() => {
          // As a fallback, open manually
          location.href = urlToOpen;
        });
      }
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/main.js',
        '/icons/icon-192x192.png',
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
