import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

function Header() {
  const authStatus = useSelector(state => state.auth.status);
  const isAdmin = useSelector(state => state.auth.userData?.isAdmin);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#C30E59] text-white py-5 shadow-xl sticky top-0 z-50 backdrop-blur-lg w-full">
      <div className="container  flex justify-around items-center px-6 gap-5 w-full">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide uppercase">APC  Bal Mandal</div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-[#C30E59] md:bg-transparent md:flex md:space-x-8 p-5  md:p-0 text-lg font-medium shadow-lg md:shadow-none
          transition-all duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <Link to="/" className="block md:inline hover:text-[#F2AE66] transition-all px-00 py-2">Home</Link>
          <Link to="/parent" className="block md:inline hover:text-[#F2AE66] transition-all px-00 py-2">Parent</Link>
          <Link to="/achievement" className="block md:inline hover:text-[#F2AE66] transition-all px-00 py-2">Achievement</Link>
          <Link to="/talent" className="block md:inline hover:text-[#F2AE66] transition-all px-00 py-2">Talent</Link>
          <Link to="/profile" className="block md:inline hover:text-[#F2AE66] transition-all px-00 py-2">Profile</Link>
          {isAdmin && <Link to="/dashboard" className="block md:inline hover:text-[#F2AE66] transition-all px-00 py-2">Dashboard</Link>}
          <Link
            to={authStatus ? "/logout" : "/login"}
            className="block md:inline bg-white text-[#C30E59] px-6 py-2 rounded-lg hover:bg-[#E8E7AB] transition-all shadow-md"
          >
            {authStatus ? "Logout" : "Login"}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
