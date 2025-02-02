import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-between items-center bg-[#93C5B5] rounded-2xl px-4 py-3 relative"
    >
      <Link to="/" className="text-[#FF7F6B] font-medium">Rodney Mutwiri</Link>
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden p-2 hover:bg-[#134E4A]/10 rounded-lg transition-colors"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-[#134E4A]" />
        ) : (
          <Menu className="w-6 h-6 text-[#134E4A]" />
        )}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-8 text-sm">
        <Link 
          to="/" 
          className={`text-[#134E4A] hover:text-[#FF7F6B] transition-colors ${location.pathname === '/' ? 'text-[#FF7F6B]' : ''}`}
        >
          HOME
        </Link>
        <Link 
          to="/about" 
          className={`text-[#134E4A] hover:text-[#FF7F6B] transition-colors ${location.pathname === '/about' ? 'text-[#FF7F6B]' : ''}`}
        >
          ABOUT
        </Link>
        <Link 
          to="/projects" 
          className={`text-[#134E4A] hover:text-[#FF7F6B] transition-colors ${location.pathname === '/projects' ? 'text-[#FF7F6B]' : ''}`}
        >
          PROJECTS
        </Link>
        <Link 
          to="/contact" 
          className={`text-[#134E4A] hover:text-[#FF7F6B] transition-colors ${location.pathname === '/contact' ? 'text-[#FF7F6B]' : ''}`}
        >
          CONTACT
        </Link>
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
          className="bg-[#134E4A] rounded-xl shadow-lg p-4"
        >
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`text-[#E8D5C4] hover:text-[#FF7F6B] text-sm font-medium px-2 py-1.5 transition-colors ${
                location.pathname === '/' ? 'text-[#FF7F6B]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link 
              to="/about" 
              className={`text-[#E8D5C4] hover:text-[#FF7F6B] text-sm font-medium px-2 py-1.5 transition-colors ${
                location.pathname === '/about' ? 'text-[#FF7F6B]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link 
              to="/projects" 
              className={`text-[#E8D5C4] hover:text-[#FF7F6B] text-sm font-medium px-2 py-1.5 transition-colors ${
                location.pathname === '/projects' ? 'text-[#FF7F6B]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              PROJECTS
            </Link>
            <Link 
              to="/contact" 
              className={`text-[#E8D5C4] hover:text-[#FF7F6B] text-sm font-medium px-2 py-1.5 transition-colors ${
                location.pathname === '/contact' ? 'text-[#FF7F6B]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
