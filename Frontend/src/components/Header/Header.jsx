import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector(state => state.auth.status);
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Header</div>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/parent" className="hover:underline">Parent</Link>
          <Link to="/achievement" className="hover:underline">Achievement</Link>
          <Link to="/talent" className="hover:underline">Talent</Link>
          <Link to={authStatus ? "/logout" : "/login"} className="hover:underline">{authStatus ? "logout" : "login"}</Link>

        </nav>
      </div>
    </header>
  );
}

export default Header;