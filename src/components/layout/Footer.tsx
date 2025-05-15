
"use client"

import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-foreground dark:bg-[#1A1F2C] text-foreground dark:text-white border-t border-border">
      <div className="container-custom pt-12 pb-8">
        {/* Contact Section */}
        <div className="border-b border-muted dark:border-gray-700 pb-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Let's Connect There</h2>
            <p className="text-muted-foreground">Get in touch for collaborations or just to say hello</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="bg-muted dark:bg-gray-800 hover:bg-muted/80 dark:hover:bg-gray-700 transition-colors w-12 h-12 rounded-full flex items-center justify-center">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="bg-muted dark:bg-gray-800 hover:bg-muted/80 dark:hover:bg-gray-700 transition-colors w-12 h-12 rounded-full flex items-center justify-center">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="bg-muted dark:bg-gray-800 hover:bg-muted/80 dark:hover:bg-gray-700 transition-colors w-12 h-12 rounded-full flex items-center justify-center">
                <Linkedin size={20} />
              </a>
            </div>
            
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Send Message
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl md:text-2xl">Rodney Mutwiri</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Building exceptional digital experiences through mobile apps, web applications, and AI automation workflows.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-muted-foreground" />
                <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors">
                  contact@example.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-muted-foreground" />
                <a href="tel:+123456789" className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors">
                  +1 (234) 567-89
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">Subscribe to get my latest updates and news about development trends.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-muted dark:bg-gray-800 px-4 py-2 rounded-l-md w-full focus:outline-none border border-border"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-muted dark:border-gray-700 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Rodney Mutwiri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
