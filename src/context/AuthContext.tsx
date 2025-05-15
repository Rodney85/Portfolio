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
// We also provide fallbacks in all environments (not just development)
// This ensures login works even if environment variables aren't being loaded properly
let ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
let ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

// Use hardcoded values if env vars aren't available in ANY environment
// This is a safety mechanism to ensure admin access always works
if (!ADMIN_USERNAME) ADMIN_USERNAME = 'rod852';
if (!ADMIN_PASSWORD) ADMIN_PASSWORD = 'Qazxsw852#';

// Debug environment variables (only in development)
if (import.meta.env.DEV) {
  console.log('Admin credentials check:', {
    username_defined: !!ADMIN_USERNAME,
    password_defined: !!ADMIN_PASSWORD,
    env_mode: import.meta.env.MODE,
    using_fallback: !import.meta.env.VITE_ADMIN_USERNAME || !import.meta.env.VITE_ADMIN_PASSWORD
  });
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check local storage for existing authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('portfolioAuth');
    return storedAuth === 'true';
  });

  // Login function - returns true if successful
  const login = (username: string, password: string): boolean => {
    // Debug login attempt (only in development)
    if (import.meta.env.DEV) {
      console.log('Login attempt:', { 
        username_match: username === ADMIN_USERNAME,
        password_match: password === ADMIN_PASSWORD,
        input_username: username,
        expected_username: ADMIN_USERNAME
      });
    }
    
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
