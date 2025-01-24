import { motion } from 'framer-motion';
import { ExternalLink, Github, Instagram, Twitter, Menu, X } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#171738] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-2 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)]">
        {/* Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex justify-between items-center bg-[#DDE2C6] rounded-2xl px-4 sm:px-6 py-4"
        >
          <div className="text-xl font-serif text-[#A72608]">Rodney Mutwiri</div>
          
          {/* Mobile Menu Button */}
          <button 
            className="sm:hidden text-[#171738] hover:text-[#A72608]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#DDE2C6] rounded-2xl p-4 sm:hidden flex flex-col gap-4 shadow-lg z-50"
            >
              <a href="#about" className="text-[#171738] hover:text-[#A72608] text-center">ABOUT</a>
              <a href="#projects" className="text-[#171738] hover:text-[#A72608] text-center">PROJECTS</a>
              <a href="#contact" className="text-[#171738] hover:text-[#A72608] text-center">CONTACT</a>
            </motion.div>
          )}

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-8 text-sm">
            <a href="#about" className="text-[#171738] hover:text-[#A72608]">ABOUT</a>
            <a href="#projects" className="text-[#171738] hover:text-[#A72608]">PROJECTS</a>
            <a href="#contact" className="text-[#171738] hover:text-[#A72608]">CONTACT</a>
          </div>
        </motion.nav>

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-10 auto-rows-[minmax(100px,auto)] gap-3 flex-1">
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
              Let's create digital{' '}
              <span className="text-[#A72608] font-italic">experiences</span>{' '}
              for your next project
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
            className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-3 bg-[#171738] rounded-2xl overflow-hidden"
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
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.7,
                ease: "easeOut"
              }}
              className="flex-1 bg-[#171738] rounded-2xl p-6 text-[#DDE2C6] flex items-center justify-between hover:bg-[#A72608] transition-colors cursor-pointer group"
            >
              <h3 className="text-xl sm:text-2xl font-serif">Contact <em className="not-italic">me</em></h3>
              <ExternalLink className="w-5 h-5 transform group-hover:rotate-45 transition-transform" />
            </motion.div>

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
        </div>
      </div>
    </div>
  );
}

export default App;