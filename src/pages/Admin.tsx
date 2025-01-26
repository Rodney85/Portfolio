import { useState } from 'react';
import { motion } from 'framer-motion';
import { Login } from '@/components/admin/Login';
import { Dashboard } from '@/components/admin/Dashboard';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-4"
    >
      <Dashboard />
    </motion.div>
  );
}
