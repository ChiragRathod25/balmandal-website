import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import databaseService from "../../services/database.services";
import { Link } from "react-router-dom";

const SideDrawer = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      databaseService.getCurrentuser().then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sliding Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-64 h-full bg-[#C30E59] text-white shadow-lg z-50 p-4"
      >
        {/* Close Button */}
        <button onClick={onClose} className="mb-4 hover:text-[#F2AE66]">
          <X className="w-6 h-6" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-4 mb-4 border-b border-[#F2AE66] pb-4 flex-col">
          <img
            src={
              user?.avatar ||
              `https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png`
            }
            alt={user?.firstName}
            className="w-12 h-12 rounded-full"
          />
          <div className="text-center">
            <h2 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4">
          <Link to="/" className="hover:text-[#F2AE66] text-lg">
            Home
          </Link>
          <Link to="/event" className="hover:text-[#F2AE66] text-lg">
            Events
          </Link>
          <Link to="/profile" className="hover:text-[#F2AE66] text-lg">
            Profile
          </Link>
          <Link to="/logout" className="hover:text-[#F2AE66] text-lg">
            Logout
          </Link>
        </nav>
      </motion.div>
    </>
  );
};

export default SideDrawer;
