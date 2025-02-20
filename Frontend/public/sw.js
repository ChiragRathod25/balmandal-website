self.addEventListener('push', event => {
  console.log('Notification will be displayed here')
    const data = event.data ? event.data.json() : {};

    if (Notification.permission !== 'granted') {
      console.error('❌ Notification permissions not granted');
    }
    
    const {title, description, image}=data
    console.log('Notification Data',data);

    const options = {
      body: description,
      icon: image,
      // actions: [
      //   {
      //     title: 'say hi',
      //        action: 'say-hi'
      //   },
      // ],
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  

  self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('Service Worker Installed');
  });
  
  self.addEventListener('activate', (event) => {

    console.log('Service Worker Activated');
  });

  