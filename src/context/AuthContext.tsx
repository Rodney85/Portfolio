import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Create a context for authentication
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Get admin credentials from environment variables
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

// Check that credentials are defined
if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error('Admin credentials are not defined in environment variables');
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check local storage for existing authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('portfolioAuth');
    return storedAuth === 'true';
  });

  // Login function - returns true if successful
  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('portfolioAuth', 'true');
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('portfolioAuth');
  };

  // Provide the auth context
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
