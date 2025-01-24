import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative flex justify-between items-center bg-[#DDE2C6] rounded-2xl px-4 sm:px-6 py-4"
    >
      <Link to="/" className="text-xl font-serif text-[#A72608]">I'm Rodney</Link>
      
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

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8">
        <Link 
          to="/" 
          className={`text-[#171738] hover:text-[#A72608] transition-colors ${isHome ? 'text-[#A72608]' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/contact" 
          className={`text-[#171738] hover:text-[#A72608] transition-colors ${!isHome ? 'text-[#A72608]' : ''}`}
        >
          Contact
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#DDE2C6] rounded-2xl lg:hidden flex flex-col gap-4"
        >
          <Link 
            to="/" 
            className={`text-[#171738] hover:text-[#A72608] transition-colors ${isHome ? 'text-[#A72608]' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/contact" 
            className={`text-[#171738] hover:text-[#A72608] transition-colors ${!isHome ? 'text-[#A72608]' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
