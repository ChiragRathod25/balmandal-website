import config from '../conf/config';
import databaseService from '../services/database.services';
export async function regSw() {
  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
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
  // //Unregister all Service Workers
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
  // return ;

  if (!serviceWorkerReg) {
    console.error('No Service Worker Registration available.', serviceWorkerReg);
    return;
  }

  try {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    console.log('Existing Subscription', subscription);


    //if there is service worker exist, no need to re create it, it is already register
    if (!subscription) {
      try {
        const appServerKey = urlBase64ToUint8Array(config.vapidPublicKey);

        const subscription = await serviceWorkerReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: appServerKey,
        });

        console.log('Subscription successful:', subscription);

        // if there is a new service worker, register it to database
        const response = await databaseService.createSubscription({ subscription });
        console.log('Subscription response', response);
      } 
      catch (err) {
        if (err instanceof DOMException) {
          console.error(`DOMException during subscribe: ${err.name} - ${err.message}`);
        } else {
          console.error('Unexpected error during subscribe:', err);
        }
      }
    }
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



//

async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Permission not granted for notifications');
  }
}

//for service worker creation :: It is a Main Function, which will be called first, and this function will call other required functions 
export const registerAndSubscribe = async () => {
  try {
    const serviceWorkerReg = await regSw();
    const readyReg = await navigator.serviceWorker.ready;
    console.log('Service Worker Ready:', readyReg);
    requestNotificationPermission();
    await subscribeUser(serviceWorkerReg);
  } catch (error) {
    console.log(`Error while registerAndSubscribe `, error);
  }
};
