import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Login } from '@/components/admin/Login';
import { Dashboard } from '@/components/admin/Dashboard';
import { LogOut } from 'lucide-react';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('admin_auth');
      if (!authData) return false;

      try {
        const { timestamp } = JSON.parse(authData);
        const isValid = Date.now() - timestamp < SESSION_DURATION;
        if (!isValid) {
          localStorage.removeItem('admin_auth');
          return false;
        }
        return true;
      } catch {
        return false;
      }
    };

    setIsAuthenticated(checkAuth());
  }, []);

  const handleLogin = () => {
    localStorage.setItem('admin_auth', JSON.stringify({ timestamp: Date.now() }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md shadow-sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
      <Dashboard />
    </motion.div>
  );
}
