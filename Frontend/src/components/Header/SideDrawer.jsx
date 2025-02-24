import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import databaseService from '../../services/database.services';

const SideDrawer = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      databaseService.getCurrentuser().then((res) => {
        setUser(res.data);
      });
    }
  }, []);
  useEffect(() => {
    if (user) {
      console.log('user', user);
    }
  }, [user]);
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-40" onClick={onClose} />
      )}

      {/* Sliding Drawer */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4"
      >
        {/* Close Button */}
        <button onClick={onClose} className="mb-4">
          <X className="w-6 h-6" />
        </button>
        {/* Profile  */}
        <div className="flex items-center gap-4 mb-4 
        border-b border-gray-200 pb-4
        flex-col
        "> 
          <img
            src={
              user?.avatar ||
              `https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png`
            }
            alt={user?.firstName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-gray-500"></p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4">
          <a href="/" className="text-lg">
            Home
          </a>
          <a href="/event" className="text-lg">
            Events
          </a>
          <a href="/profile" className="text-lg">
            Profile
          </a>
          <a href="/logout" className="text-lg">
            Logout
          </a>
        </nav>
      </motion.div>
    </>
  );
};

export default SideDrawer;
