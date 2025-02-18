import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import databaseService from './services/database.services';
import { useDispatch } from 'react-redux';
import { login, logout } from './slices/userSlice/authSlice';
import { Header, Footer } from './pages';
import toast, { Toaster } from 'react-hot-toast';
import useScrollToTop from './utils/useScrollToTop';
import MyToaster from './MyToaster';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
 useScrollToTop()
 

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

      <main
      >
        {/* <Toaster position="sm:top-right top-center" duration={3000} reverseOrder={false} /> */}
        <MyToaster />

        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
