import { Home, Calendar, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const tabs = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Events', icon: Calendar, path: '/event' },
  { name: 'Profile', icon: User, path: '/profile' },
];

const BottomTabBar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner flex justify-around py-2">
      {tabs.map(({ name, icon: Icon, path }) => {
        const isActive = location.pathname === path;
        return (
          <Link key={name} to={path} className="flex flex-col items-center">
            <Icon className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
            <span className={`text-xs ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
              {name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomTabBar;
