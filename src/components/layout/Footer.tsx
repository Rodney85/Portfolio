
"use client"

import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1F2C] text-white">
      <div className="container-custom pt-12 pb-8">
        {/* Contact Section */}
        <div className="border-b border-gray-700 pb-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Let's Connect There</h2>
            <p className="text-gray-400">Get in touch for collaborations or just to say hello</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="bg-gray-800 hover:bg-gray-700 transition-colors w-12 h-12 rounded-full flex items-center justify-center">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 transition-colors w-12 h-12 rounded-full flex items-center justify-center">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 transition-colors w-12 h-12 rounded-full flex items-center justify-center">
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
            <p className="text-gray-400 mb-6">
              Building exceptional digital experiences through mobile apps, web applications, and AI automation workflows.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition-colors">
                  contact@example.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <a href="tel:+123456789" className="text-gray-400 hover:text-white transition-colors">
                  +1 (234) 567-89
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-400">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get my latest updates and news about development trends.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 px-4 py-2 rounded-l-md w-full focus:outline-none"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Rodney Mutwiri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
