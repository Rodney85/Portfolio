import { motion } from 'framer-motion';
import { ExternalLink, Github, Instagram, Twitter, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#171738] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center bg-[#DDE2C6] rounded-2xl px-4 py-3 relative"
        >
          <div className="text-[#A72608]">Rodney Mutwiri</div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-[#171738]/5 rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#171738]" />
            ) : (
              <Menu className="w-6 h-6 text-[#171738]" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 text-sm">
            <Link to="/" className="text-[#171738] hover:text-[#A72608]">HOME</Link>
            <Link to="/about" className="text-[#171738] hover:text-[#A72608]">ABOUT</Link>
            <Link to="/projects" className="text-[#171738] hover:text-[#A72608]">PROJECTS</Link>
            <Link to="/contact" className="text-[#A72608] hover:text-[#DDE2C6]">CONTACT</Link>
          </div>

          {/* Mobile Menu Overlay */}
          <motion.div
            initial={false}
            animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            className={`${
              isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
            } absolute top-full left-0 right-0 mt-2 lg:hidden z-50`}
          >
            <motion.div
              initial={false}
              animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
              className="bg-[#171738] rounded-xl shadow-lg p-4"
            >
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-[#DDE2C6] hover:text-[#A72608] text-sm font-medium px-2 py-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link 
                  to="/about" 
                  className="text-[#DDE2C6] hover:text-[#A72608] text-sm font-medium px-2 py-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link 
                  to="/projects" 
                  className="text-[#DDE2C6] hover:text-[#A72608] text-sm font-medium px-2 py-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PROJECTS
                </Link>
                <Link 
                  to="/contact" 
                  className="text-[#A72608] hover:text-[#DDE2C6] text-sm font-medium px-2 py-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.nav>

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
            className="col-span-1 sm:col-span-4 lg:col-span-4 row-span-3 bg-[#DDE2C6] rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#171738] leading-tight">
              I Build{' '}
              <span className="text-[#A72608] font-italic">Innovative Digital Solutions</span>{' '}
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
            className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-3 rounded-2xl overflow-hidden"
          >
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
              src="/src/assets/shawar.jpg"
              alt="Rodney Mutwiri"
              className="w-full h-full object-cover object-center"
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
            className="col-span-1 sm:col-span-6 lg:col-span-4 row-span-4 bg-[#DDE2C6] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[300px]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-serif text-lg text-[#A72608]">Latest Work</h4>
                <ExternalLink className="w-4 h-4 text-[#171738]" />
              </div>
              <div className="space-y-3 text-sm flex-grow">
                <div className="border-b border-[#171738]/20 pb-2 text-[#171738] hover:text-[#A72608] cursor-pointer transition-colors">E-Commerce Platform</div>
                <div className="border-b border-[#171738]/20 pb-2 text-[#171738] hover:text-[#A72608] cursor-pointer transition-colors">AI Analytics Dashboard</div>
                <div className="text-[#171738] hover:text-[#A72608] cursor-pointer transition-colors">Cloud Infrastructure</div>
              </div>
            </div>
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
            className="col-span-1 sm:col-span-3 lg:col-span-3 bg-[#DDE2C6] rounded-2xl p-6 sm:p-8 flex flex-col justify-center min-h-[200px]"
          >
            <p className="text-sm text-[#171738] leading-relaxed">
              Full-stack developer specializing in crafting modern web applications. 
              With expertise in React, Node.js, and cloud architecture, I transform ideas into 
              scalable digital solutions.
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
              className="bg-[#A72608] hover:bg-[#171738] p-6 rounded-2xl flex items-center justify-between group transition-colors"
            >
              <span className="text-[#DDE2C6] group-hover:text-[#A72608] text-xl sm:text-2xl font-medium transition-colors">Contact me</span>
              <ExternalLink className="w-5 h-5 text-[#DDE2C6] group-hover:text-[#A72608] transform group-hover:rotate-45 transition-all" />
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
              className="flex-1 bg-[#DDE2C6] rounded-2xl py-3 px-6 flex justify-center items-center gap-8"
            >
              <a href="#" className="text-[#171738] hover:text-[#A72608] transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-[#171738] hover:text-[#A72608] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-[#171738] hover:text-[#A72608] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}