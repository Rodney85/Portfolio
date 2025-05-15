
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { HeroHeader } from './HeroHeader';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Add HeroHeader to all pages */}
      {!isHomePage && <HeroHeader />}
      <motion.main 
        className={`flex-1 ${!isHomePage ? 'pt-20' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      {/* Footer removed */}
    </div>
  );
};

export default Layout;
