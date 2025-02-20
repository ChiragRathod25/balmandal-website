import config from './conf/config';
import databaseService from './services/database.services';
export async function regSw() {
  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.register('/sw.js',{scope:'/'});
      console.log('Service Worker Registered:', reg);
      console.log('Registered reg', reg);
      return reg;
    } else {
      console.log('Service workers are not supported in this browser.');
    }
  } catch (error) {
    console.error('Service Worker Registration Failed:', error);
  }
}

export const subscribeUser = async (serviceWorkerReg) => {


  // Unregister all Service Workers
// navigator.serviceWorker.getRegistrations().then((registrations) => {
//   registrations.forEach((reg) => {
//     reg.unregister().then(() => console.log('Service Worker unregistered:', reg));
//   });
// });

// // Remove old push subscriptions
// navigator.serviceWorker.ready.then((reg) => {
//   reg.pushManager.getSubscription().then((subscription) => {
//     if (subscription) {
//       subscription.unsubscribe().then(() => console.log('Old subscription removed.'));
//     } else {
//       console.log('No existing subscription found.');
//     }
//   });
// });


  if (!serviceWorkerReg) {
    console.error('No Service Worker Registration available.', serviceWorkerReg);
    return;
  }

  try {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    console.log('Existing Subscription', subscription);

    if (!subscription) {
      try {
        const appServerKey = urlBase64ToUint8Array(config.vapidPublicKey);

        const subscription = await serviceWorkerReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: appServerKey,
        });

        console.log('Subscription successful:', subscription);
      
      } catch (err) {
        if (err instanceof DOMException) {
          console.error(`DOMException during subscribe: ${err.name} - ${err.message}`);
        } else {
          console.error('Unexpected error during subscribe:', err);
        }
      }
    }
    const response = await databaseService.createSubscription({ subscription });
    console.log('Subscription response', response);

    
  } catch (err) {
    console.error('Error during subscription:', err);
  }
};

export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
