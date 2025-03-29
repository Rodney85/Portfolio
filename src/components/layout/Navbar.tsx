
"use client"

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../theme/ThemeToggle';

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
            <ThemeToggle />
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Let's Talk
              </Button>
            </Link>
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
