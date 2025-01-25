import { useState } from 'react';
import { motion } from 'framer-motion';
import { Login } from '@/components/admin/Login';
import { Signup } from '@/components/admin/Signup';
import { Dashboard } from '@/components/admin/Dashboard';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (!isAuthenticated) {
    if (showSignup) {
      return (
        <Signup 
          onSignup={() => setIsAuthenticated(true)} 
          onSwitchToLogin={() => setShowSignup(false)}
        />
      );
    }
    return (
      <Login 
        onLogin={() => setIsAuthenticated(true)} 
        onSwitchToSignup={() => setShowSignup(true)}
      />
    );
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
