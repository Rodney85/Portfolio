
"use client"

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '../auth/LoginModal';

// Admin button using key combination to show
const AdminButton = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Check if we're on the admin section
  const isAdminSection = location.pathname.startsWith('/admin');
  
  // Setup key combination listener (Alt+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show admin button when Alt+A is pressed
      if (e.altKey && e.key === 'a') {
        setShowAdmin(true);
        // Auto-hide after 5 seconds
        setTimeout(() => setShowAdmin(false), 5000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // If we're in the admin section and logged in, don't show any buttons
  if (isAdminSection && isAuthenticated) return null;
  
  // On the main site, don't show anything unless Alt+A is pressed
  if (!showAdmin && !isAuthenticated) return null;
  
  return (
    <>
      {isAuthenticated ? (
        <div className="flex gap-2">
          <Link to="/admin">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <User size={16} />
              Admin
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1.5 text-muted-foreground"
            onClick={logout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1.5"
          onClick={() => setShowLoginModal(true)}
        >
          <User size={16} />
          Admin Login
        </Button>
      )}
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

// Admin login button for mobile view
const AdminButtonMobile = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Check if we're on the admin section
  const isAdminSection = location.pathname.startsWith('/admin');
  
  // Share the same state as the desktop button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        setShowAdmin(true);
        setTimeout(() => setShowAdmin(false), 5000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // If we're in the admin section and logged in, don't show any buttons
  if (isAdminSection && isAuthenticated) return null;
  
  // On the main site, don't show anything unless Alt+A is pressed
  if (!showAdmin && !isAuthenticated) return null;
  
  return (
    <>
      {isAuthenticated ? (
        <div className="space-y-2">
          <Link to="/admin" className="block">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1.5">
              <User size={16} />
              Admin Panel
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full flex items-center justify-center gap-1.5 text-muted-foreground"
            onClick={logout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center gap-1.5"
          onClick={() => setShowLoginModal(true)}
        >
          <User size={16} />
          Admin Login
        </Button>
      )}
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-background/95 shadow-md backdrop-blur' : 'bg-transparent'}`}>
      <div className="container-custom flex h-16 items-center">
        <div className="flex w-full justify-between items-center">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-tech-purple to-orange-500 bg-clip-text text-transparent">
              Rodney.dev
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={isActive(link.path) 
                  ? "relative font-medium text-orange-500 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-orange-500 after:-bottom-1 after:left-0" 
                  : "relative text-foreground/80 hover:text-orange-500 transition-colors duration-200 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-orange-500 after:-bottom-1 after:left-0 after:transition-all hover:after:w-full"}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Contact Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Let's Talk
              </Button>
            </Link>
            {/* AdminButton removed from public navigation */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              className="p-2" 
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur shadow-lg"
          >
            <nav className="flex flex-col py-4 px-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`text-lg ${isActive(link.path) ? "text-orange-500 font-medium" : "text-foreground/80"}`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" onClick={closeMenu}>
                <Button className="w-full mt-2 bg-orange-500 hover:bg-orange-600">
                  Let's Talk
                </Button>
              </Link>
              {/* AdminButtonMobile removed from public navigation */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
