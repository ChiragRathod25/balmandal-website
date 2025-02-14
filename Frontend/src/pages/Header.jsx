import React from 'react';
import { HeaderComponent } from '../components';

function Header() {
  return (
    <header className="bg-[#C30E59] text-white  shadow-xl sticky top-0 z-50 backdrop-blur-lg">
      <div className="container  flex justify-center items-center px-6">
        <HeaderComponent />
      </div>
    </header>
  );
}

export default Header;
