import { motion } from 'framer-motion';
import { ExternalLink, Github, Instagram, Twitter } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LatestWorkCard } from './components/LatestWorkCard';
import { preloadImage } from './utils/preloadImage';
import profileImage from './assets/shawar.jpg';
import React, { Suspense, lazy } from 'react';

// Lazy load components
const Contact = lazy(() => import('./pages/Contact'));
const Projects = lazy(() => import('./pages/Projects'));
const Admin = lazy(() => import('./pages/Admin'));
const About = lazy(() => import('./pages/About'));

const HomePage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-10 auto-rows-[minmax(100px,auto)] gap-3 flex-1"
  >
    {/* Hero Section */}
    <motion.div 
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }}
      className="col-span-1 sm:col-span-4 lg:col-span-4 row-span-3 bg-gradient-to-br from-[#93C5B5] to-[#93C5B5]/90 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center shadow-lg shadow-[#134E4A]/10 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <h1 className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#134E4A] leading-tight">
        I Build{' '}
        <span className="text-[#FF7F6B] font-italic relative">
          Innovative Digital Solutions
          <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FF7F6B]/20" />
        </span>{' '}
        Tailored Exactly to What You Need
      </h1>
    </motion.div>

    {/* Profile Image */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-3 rounded-2xl overflow-hidden shadow-lg shadow-[#134E4A]/10"
    >
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
        src={profileImage}
        alt="Rodney Mutwiri"
        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
      />
    </motion.div>

    {/* Latest Work Section */}
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut"
      }}
      className="col-span-1 sm:col-span-6 lg:col-span-4 row-span-4 rounded-2xl overflow-hidden shadow-lg shadow-[#134E4A]/10"
    >
      <LatestWorkCard />
    </motion.div>

    {/* Bio Card */}
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: 0.5,
        ease: "easeOut"
      }}
      className="col-span-1 sm:col-span-3 lg:col-span-3 bg-gradient-to-br from-[#93C5B5] to-[#93C5B5]/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-center min-h-[200px] shadow-lg shadow-[#134E4A]/10 backdrop-blur-sm relative group"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <p className="relative z-10 text-sm text-[#134E4A] leading-relaxed">
        Full-stack developer leveraging AI to build scalable web applications. 
        Specializing in React, Node.js, and intelligent cloud solutions that drive 
        business growth.
      </p>
    </motion.div>

    {/* Contact Section */}
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: 0.6,
        ease: "easeOut"
      }}
      className="col-span-1 sm:col-span-3 lg:col-span-3 flex flex-col gap-3 min-h-[200px]"
    >
      {/* Contact Card */}
      <Link
        to="/contact"
        className="bg-gradient-to-r from-[#134E4A] to-[#134E4A]/90 hover:from-[#FF7F6B] hover:to-[#FF7F6B]/90 p-6 rounded-2xl flex items-center justify-between group transition-all duration-300 shadow-lg shadow-[#134E4A]/10 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <span className="relative z-10 text-[#E8D5C4] group-hover:text-[#134E4A] text-xl sm:text-2xl font-medium transition-colors">Contact me</span>
        <ExternalLink className="relative z-10 w-5 h-5 text-[#E8D5C4] group-hover:text-[#134E4A] transform group-hover:rotate-45 transition-all" />
      </Link>

      {/* Social Links */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: 0.8,
          ease: "easeOut"
        }}
        className="flex-1 bg-gradient-to-br from-[#93C5B5] to-[#93C5B5]/90 rounded-2xl py-3 px-6 flex justify-center items-center gap-8 shadow-lg shadow-[#134E4A]/10 backdrop-blur-sm relative"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <a href="#" className="relative z-10 text-[#134E4A] hover:text-[#FF7F6B] transition-all hover:scale-110">
          <Github className="w-4 h-4" />
        </a>
        <a href="#" className="relative z-10 text-[#134E4A] hover:text-[#FF7F6B] transition-all hover:scale-110">
          <Twitter className="w-4 h-4" />
        </a>
        <a href="#" className="relative z-10 text-[#134E4A] hover:text-[#FF7F6B] transition-all hover:scale-110">
          <Instagram className="w-4 h-4" />
        </a>
      </motion.div>
    </motion.div>
  </motion.div>
);

export default function App() {
  React.useEffect(() => {
    preloadImage(profileImage);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#134E4A] via-[#134E4A] to-[#134E4A]/95 p-4 sm:p-6 relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      <div className="max-w-7xl mx-auto space-y-4 relative">
        <Navbar />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#93C5B5]"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}