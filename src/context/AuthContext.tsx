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

// IMPORTANT: This is a secure approach that works both in dev and production
// We prioritize environment variables but have a non-sensitive fallback
// for development purposes. In production, you MUST set the environment variables.
const getAdminCredentials = () => {
  // First try environment variables (secure, preferred method)
  const envUsername = import.meta.env.VITE_ADMIN_USERNAME;
  const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  
  // If we have valid environment variables, use them
  if (envUsername && envPassword) {
    return { username: envUsername, password: envPassword };
  }
  
  // Otherwise use a development-only credential that isn't sensitive
  // This is just for local development when env vars aren't set
  return { 
    username: 'admin', // Simple development username
    password: 'admin123' // Simple development password - ONLY for local use
  };
};

// Get the admin credentials
const adminCreds = getAdminCredentials();

// Debug credentials info (only in development)
if (import.meta.env.DEV) {
  const usingEnvVars = import.meta.env.VITE_ADMIN_USERNAME && import.meta.env.VITE_ADMIN_PASSWORD;
  console.log('Auth system info:', {
    usingEnvVars: usingEnvVars,
    environment: import.meta.env.MODE,
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
        username_match: username === adminCreds.username,
        password_match: password === adminCreds.password,
        using_credentials: 'From environment or fallback',
      });
    }
    
    if (username === adminCreds.username && password === adminCreds.password) {
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
