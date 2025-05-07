import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Key, Bot, Activity, Shield, ArrowUpRight, Info } from 'lucide-react';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useApiKeys } from '../context/ApiKeyContext';
import { useMCP } from '../context/MCPContext';
import { useAudit } from '../context/AuditContext';

// Register ChartJS components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  onClick?: () => void;
}> = ({ title, value, icon, trend, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
        <div className="p-2 bg-primary-100 text-primary-600 rounded-md">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-neutral-900 mb-2">{value}</p>
      {trend && (
        <div className="flex items-center">
          <span className={`text-sm font-medium ${trend.value >= 0 ? 'text-success-600' : 'text-error-600'}`}>
            {trend.value >= 0 ? '+' : ''}{trend.value}%
          </span>
          <span className="text-sm text-neutral-500 ml-1.5">{trend.label}</span>
        </div>
      )}
    </motion.div>
  );
};

const DashboardPage: React.FC = () => {
  const { getApiKeys, apiKeys } = useApiKeys();
  const { getConnections, connections } = useMCP();
  const { getEvents, events } = useAudit();
  
  useEffect(() => {
    getApiKeys();
    getConnections();
    getEvents();
  }, [getApiKeys, getConnections, getEvents]);
  
  const activeConnections = connections.filter(c => c.status === 'active').length;
  const activeApiKeys = apiKeys.filter(k => k.isActive).length;
  
  // Line chart data for user activity
  const userActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Logins',
        data: [65, 59, 80, 81, 56, 55, 70],
        fill: false,
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.4,
      },
    ],
  };
  
  // Bar chart data for permission requests
  const permissionRequestsData = {
    labels: ['Users', 'Roles', 'API Keys', 'AI Connections', 'Audit Logs'],
    datasets: [
      {
        label: 'Granted',
        data: [28, 19, 32, 15, 42],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: 'Denied',
        data: [8, 12, 5, 3, 2],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Dashboard</h1>
        <p className="text-neutral-600">Welcome to your AccessGuardian dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="125" 
          icon={<Users size={20} />} 
          trend={{ value: 12.5, label: 'vs. last month' }} 
        />
        <StatCard 
          title="Active API Keys" 
          value={activeApiKeys} 
          icon={<Key size={20} />} 
        />
        <StatCard 
          title="AI Connections" 
          value={activeConnections} 
          icon={<Bot size={20} />} 
        />
        <StatCard 
          title="Audit Events" 
          value={events.length} 
          icon={<Activity size={20} />} 
          trend={{ value: 3.2, label: 'vs. yesterday' }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-neutral-900">User Activity</h3>
            <button className="p-2 text-neutral-400 hover:text-neutral-600 rounded-md">
              <Info size={18} />
            </button>
          </div>
          <div className="h-72">
            <Line 
              data={userActivityData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }} 
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-neutral-900">Permission Requests</h3>
            <button className="p-2 text-neutral-400 hover:text-neutral-600 rounded-md">
              <Info size={18} />
            </button>
          </div>
          <div className="h-72">
            <Bar 
              data={permissionRequestsData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }} 
            />
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-neutral-900">Recent Activity</h3>
            <button className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all
              <ArrowUpRight size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {events.slice(0, 5).map((event) => (
                  <tr key={event.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-1.5 rounded-md bg-primary-50 text-primary-600 mr-3">
                          {event.type.startsWith('auth') ? (
                            <Shield size={16} />
                          ) : event.type.startsWith('user') ? (
                            <Users size={16} />
                          ) : event.type.startsWith('api-key') ? (
                            <Key size={16} />
                          ) : event.type.startsWith('ai-connection') ? (
                            <Bot size={16} />
                          ) : (
                            <Activity size={16} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {event.type.split(':').join(' ')}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {event.resourceType ? `${event.resourceType} ${event.resourceId}` : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm text-neutral-900">{event.userEmail || 'Anonymous'}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm text-neutral-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.severity === 'info' 
                            ? 'bg-primary-100 text-primary-800' 
                            : event.severity === 'warning'
                            ? 'bg-warning-100 text-warning-800'
                            : 'bg-error-100 text-error-800'
                        }`}
                      >
                        {event.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;