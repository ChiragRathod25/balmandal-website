import  { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import databaseService from './services/database.services';
import { useDispatch } from 'react-redux';
import { login, logout } from './slices/userSlice/authSlice';
import useScrollToTop from './utils/useScrollToTop';
import MyToaster from './MyToaster';
import { registerAndSubscribe } from './utils/subscriptionHelper';
import config from './conf/config';

import { Layout } from './components';

//socket io connection
import socketClient from 'socket.io-client';
export const socket = socketClient(config.apiURL, {
  transports: ['websocket'],
});

//App Component
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useScrollToTop();

  useEffect(() => {
    const getCurrentUser = async () => {
      await databaseService
        .getCurrentuser()
        .then((response) => {
          if (response.data) {
            dispatch(login(response.data));
            //if the user is logged in then only create service worker
            setTimeout(() => {
              registerAndSubscribe();
            }, 10000);
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
      <Layout>
        <main>
          {/* <Toaster position="sm:top-right top-center" duration={3000} reverseOrder={false} /> */}
          <MyToaster />

          <Outlet />

        </main>
      </Layout>
    </div>
  );
}

export default App;
