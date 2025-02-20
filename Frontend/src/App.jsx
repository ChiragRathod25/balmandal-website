import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import databaseService from './services/database.services';
import { useDispatch } from 'react-redux';
import { login, logout } from './slices/userSlice/authSlice';
import { Header, Footer } from './pages';
import useScrollToTop from './utils/useScrollToTop';
import MyToaster from './MyToaster';
import {subscribeUser,regSw} from "./subscriptionHelper"
import { io } from 'socket.io-client';
import socketClient  from 'socket.io-client' 
export const socket = socketClient('https://x0qzmk95-5000.inc1.devtunnels.ms/',{
  transports: ['websocket'],
});
``
function App() {
  async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permission not granted for notifications');
    }
  }

  const registerAndSubscribe =async ()=>{
    try {
        const serviceWorkerReg=await regSw();
        const readyReg = await navigator.serviceWorker.ready;
    console.log('Service Worker Ready:', readyReg);

    requestNotificationPermission()
        await subscribeUser(serviceWorkerReg)
    } catch (error) {
      console.log(`Error while registerAndSubscribe `,error)
    }
  }
  registerAndSubscribe()
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useScrollToTop();
  useEffect(()=>{
   

    socket.on('connect', () => {
      console.log('new user is connected', socket.id);
    });
    socket.on("disconnect", () => {
      console.log("User disconnect", socket.id); // undefined
    });
    socket.on("hello",(payload)=>{
      console.log('payload',payload)
    })
    socket.on('notify',(data)=>{
      Notification.requestPermission().then((perm)=>{
        if(perm==='granted'){
          navigator.serviceWorker.getRegistration().then((reg)=>{
            if(reg){
              reg.showNotification(data?.title,{
                body:data?.message,
                tag:data?._id
              })
            }
          })
        }
      })
    })
    // socket.on('event',(data)=>{

    //   Notification.requestPermission().then((perm)=>{
    //     if(perm==="granted"){
    //       console.log(data)
    //       new Notification("Hii",{
    //         body:data?.title,
    //         tag:data?.title
    //       })
    //     }
    //   })
    // })
    socket.on('event', (data) => {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          navigator.serviceWorker.getRegistration().then(reg => {
            if (reg) {
              reg.showNotification(data.title, {
                body: data.body,
                tag: data.tag,
              });
            }
          });
        }
      });
    });

  })
  useEffect(() => {
    const getCurrentUser = async () => {
      await databaseService
        .getCurrentuser()
        .then((response) => {
          if (response.data) {
            dispatch(login(response.data));
          } else {
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false));
    };
    getCurrentUser();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main>
        {/* <Toaster position="sm:top-right top-center" duration={3000} reverseOrder={false} /> */}
        <MyToaster />

        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
