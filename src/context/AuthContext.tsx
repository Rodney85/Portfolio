import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check local storage for existing authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('portfolioAuth');
    return storedAuth === 'true';
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use string paths to reference Convex mutations for more flexibility
  // This avoids TypeScript errors when the API isn't fully generated yet
  const loginMutation = useMutation("auth:login");
  const initAdmin = useMutation("auth:initializeAdmin");
  
  // Initialize admin account - only runs once when component mounts
  useEffect(() => {
    const init = async () => {
      try {
        await initAdmin({});
      } catch (err) {
        console.error('Failed to initialize admin:', err);
      }
    };
    
    init();
  }, [initAdmin]);

  // Login function - returns Promise<boolean> for async operation
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await loginMutation({ username, password });
      
      if (result.status === 'success') {
        // Store auth token in localStorage
        localStorage.setItem('portfolioAuth', 'true');
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('username', result.username);
        
        setIsAuthenticated(true);
        return true;
      } else {
        setError(result.message || 'Login failed');
        return false;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('portfolioAuth');
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  // Provide the auth context
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
