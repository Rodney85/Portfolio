import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

interface SignInProps {
  routing?: string;
  path?: string;
}

const SignIn: React.FC<SignInProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add debugging output for troubleshooting
    console.log('Login attempt with:', { 
      username: username,
      password: password ? '******' : 'empty', // Don't log actual password
      envUsername: import.meta.env.VITE_ADMIN_USERNAME ? 'defined' : 'undefined',
      envPassword: import.meta.env.VITE_ADMIN_PASSWORD ? 'defined' : 'undefined'
    });
    
    // Clear any previous errors
    setError('');
    
    // Validate inputs
    if (!username.trim() || !password.trim()) {
      setError('Both username and password are required');
      return;
    }
    
    // Attempt to log in
    const success = login(username, password);
    
    console.log('Login result:', { success });
    
    if (success) {
      setError('');
      navigate('/admin');
    } else {
      // More detailed error for troubleshooting
      console.log('Login failed. Environment variables may not be loaded properly.');
      // No hardcoded credentials - rely only on environment variables
      
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your admin password to access the dashboard.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
