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

  if (!serviceWorkerReg) {
    console.error('No Service Worker Registration available.', serviceWorkerReg);
    return;
  }

  try {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    console.log('Existing Subscription', subscription);

    //if there is service worker doest not exist, create it and register it to database
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
      } catch (err) {
        if (err instanceof DOMException) {
          console.error(`DOMException during subscribe: ${err.name} - ${err.message}`);
        } else {
          console.error('Unexpected error during subscribe:', err);
        }
      }
    } else {
      // if it is already subscribed, then check if it is already registered in the database
      try {
        console.log('Subscription endpoint:', subscription.endpoint);
        const RegistrationStatus = await databaseService.getSubscription({
          endPoint: subscription.endpoint,
        });
        console.log('RegistrationStatus', RegistrationStatus);
      } catch (err) {
        console.error('Error while checking subscription:', err);
        // if it is not registered, register it to database
        const response = await databaseService.createSubscription({ subscription });
        console.log('Subscription response', response);
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
