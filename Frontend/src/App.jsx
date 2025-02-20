import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import databaseService from './services/database.services';
import { useDispatch } from 'react-redux';
import { login, logout } from './slices/userSlice/authSlice';
import { Header, Footer } from './pages';
import useScrollToTop from './utils/useScrollToTop';
import MyToaster from './MyToaster';
import { io } from 'socket.io-client';
import socketClient  from 'socket.io-client' 
const socket = socketClient('https://super-duper-pancake-976j9v5wrw9hxrg9-5000.app.github.dev',{
  transports: ['websocket'],
});

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useScrollToTop();
  useEffect(()=>{
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker Registered:', reg))
        .catch(err => console.error('Service Worker Registration Failed:', err));
    }

    socket.on('connect', () => {
      console.log('new user is connected', socket.id);
    });
    socket.on("disconnect", () => {
      console.log("User disconnect", socket.id); // undefined
    });
    socket.on("hello",(payload)=>{
      console.log('payload',payload)
    })
    socket.on('new',()=>{
      // alert('hey welcome')
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
