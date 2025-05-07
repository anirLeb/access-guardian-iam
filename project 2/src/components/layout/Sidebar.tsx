import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Shield, 
  Key, 
  Activity, 
  Bot, 
  Settings, 
  LogOut, 
  ChevronDown,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, onClick }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-3 text-sm transition-colors rounded-md ${
        isActive 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary-600'
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
      {isActive && (
        <motion.div
          className="absolute left-0 h-full w-1 bg-primary-600 rounded-r-md"
          layoutId="activeIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navigation = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: <Activity size={20} />,
      permission: null
    },
    { 
      path: '/users', 
      label: 'Users & Roles', 
      icon: <Users size={20} />,
      permission: 'users:read'
    },
    { 
      path: '/permissions', 
      label: 'Permissions', 
      icon: <Shield size={20} />,
      permission: 'roles:read'
    },
    { 
      path: '/api-keys', 
      label: 'API Keys', 
      icon: <Key size={20} />, 
      permission: 'api-keys:read'
    },
    { 
      path: '/ai-connections', 
      label: 'AI Connections', 
      icon: <Bot size={20} />,
      permission: 'ai-connections:read'
    },
    { 
      path: '/audit-logs', 
      label: 'Audit Logs', 
      icon: <Activity size={20} />,
      permission: 'logs:read'
    },
    { 
      path: '/settings', 
      label: 'Settings', 
      icon: <Settings size={20} />,
      permission: null
    },
  ];

  // Filter navigation items based on user permissions
  const filteredNavigation = navigation.filter(item => {
    if (!item.permission) return true;
    return user?.permissions.includes(item.permission as any);
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-neutral-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-primary-600 mr-2" />
          <h1 className="text-xl font-bold text-neutral-900">AccessGuardian</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <nav className="space-y-1 relative">
          {filteredNavigation.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-neutral-200">
        {user && (
          <div className="flex items-center px-3 py-2">
            <div className="flex-shrink-0 mr-3">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <User size={16} className="text-primary-600" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-neutral-500 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;