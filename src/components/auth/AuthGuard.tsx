import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated);
  
  // If user is not authenticated, show login modal instead of redirecting
  if (!isAuthenticated) {
    return (
      <>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
            <p className="text-muted-foreground mb-4">Please login to access the admin area</p>
          </div>
        </div>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </>
    );
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default AuthGuard;
