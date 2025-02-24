import React from 'react';
import { HeaderComponent, FooterComponent } from './';
import { useState } from 'react';
import { TopBar, SideDrawer, BottomTabBar } from './';

function Layout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header
          className={`bg-[#C30E59] text-white  shadow-xl sticky top-0 z-50 backdrop-blur-lg  hidden sm:block`}
        >
          <div className="container  flex justify-center items-center px-4">
            <HeaderComponent />
          </div>
        </header>
        <div className="sm:hidden z-200 " >
          <TopBar onMenuClick={() => setIsDrawerOpen(true)} notificationsCount={3} />
          <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </div>
        <div>{children}</div>
        <div className="sm:hidden z-200">
          <BottomTabBar />
        </div>
        <footer className={`bg-[#C30E59] text-white py-4 hidden sm:block `}>
          <div className="container mx-auto text-center">
            <FooterComponent />
          </div>
        </footer>
      </div>
    </>
  );
}

export default Layout;
