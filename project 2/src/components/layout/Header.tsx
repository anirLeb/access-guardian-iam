import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<{ id: string; message: string; read: boolean }[]>([
    { id: '1', message: 'New user registered', read: false },
    { id: '2', message: 'API key expiring soon', read: false },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/users') return 'Users & Roles';
    if (path === '/permissions') return 'Permissions';
    if (path === '/api-keys') return 'API Keys';
    if (path === '/ai-connections') return 'AI Connections';
    if (path === '/audit-logs') return 'Audit Logs';
    if (path === '/settings') return 'Settings';
    if (path === '/profile') return 'Profile';
    
    return 'AccessGuardian';
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-neutral-900 ml-2 lg:ml-0">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" 
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 relative"
          >
            <Bell size={18} className="text-neutral-600" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-error-500 rounded-full flex items-center justify-center text-xs text-white">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-dropdown z-10 py-2">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200">
                <h3 className="font-medium text-neutral-900">Notifications</h3>
                <button 
                  onClick={handleMarkAllRead}
                  className="text-xs text-primary-600 hover:text-primary-700"
                >
                  Mark all as read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center py-4 text-neutral-500">No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`px-4 py-3 border-b border-neutral-100 hover:bg-neutral-50 ${
                        !notification.read ? 'bg-primary-50' : ''
                      }`}
                    >
                      <p className="text-sm text-neutral-700">{notification.message}</p>
                      <p className="text-xs text-neutral-500 mt-1">Just now</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;