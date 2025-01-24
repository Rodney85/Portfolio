import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
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

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
