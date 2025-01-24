import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, Layout, Smartphone, Sparkles, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#171738] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)]">
        {/* Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center bg-[#DDE2C6] rounded-2xl px-4 py-3 relative"
        >
          <div className="text-[#A72608] font-medium">Rodney Mutwiri</div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-[#171738]/5 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-[#171738]" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 text-sm font-medium">
            <Link to="/" className="text-[#171738] hover:text-[#A72608] transition-colors">HOME</Link>
            <Link to="/" className="text-[#171738] hover:text-[#A72608] transition-colors">ABOUT</Link>
            <Link to="/" className="text-[#171738] hover:text-[#A72608] transition-colors">PROJECTS</Link>
            <Link to="/contact" className="text-[#A72608] hover:text-[#DDE2C6] transition-colors">CONTACT</Link>
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
                  to="/" 
                  className="text-[#DDE2C6] hover:text-[#A72608] text-sm font-medium px-2 py-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link 
                  to="/" 
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

        <div className="max-w-2xl mx-auto w-full py-4 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#DDE2C6] rounded-2xl shadow-lg p-6 sm:p-8"
          >
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#A72608] tracking-tight">Let's work together</h2>
                <p className="text-[#171738] mt-2 sm:mt-3 text-base sm:text-lg leading-relaxed">
                  Got an idea brewing? I'm all ears. Whether it's a quick digital fix or a complex project, I'm excited to hear what you're thinking.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2 sm:space-y-2.5">
                    <label className="text-sm font-medium text-[#171738]">
                      What is your name or company name?
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="flex h-12 sm:h-11 w-full rounded-lg border border-[#171738]/20 bg-white/90 px-4 py-2 text-base text-[#171738] placeholder:text-[#171738]/50 focus:border-[#A72608] focus:outline-none focus:ring-2 focus:ring-[#A72608]/20 transition-colors"
                      placeholder="John Doe / Acme Inc."
                      required
                    />
                  </div>

                  <div className="space-y-2 sm:space-y-2.5">
                    <label className="text-sm font-medium text-[#171738]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="flex h-12 sm:h-11 w-full rounded-lg border border-[#171738]/20 bg-white/90 px-4 py-2 text-base text-[#171738] placeholder:text-[#171738]/50 focus:border-[#A72608] focus:outline-none focus:ring-2 focus:ring-[#A72608]/20 transition-colors"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#171738]">
                      What project are you interested in?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        {
                          value: 'Website Development',
                          label: 'Website Development',
                          description: 'Custom websites with modern design and optimal performance',
                          icon: Globe
                        },
                        {
                          value: 'Web Application',
                          label: 'Web Application',
                          description: 'Full-featured web apps with robust functionality',
                          icon: Layout
                        },
                        {
                          value: 'Mobile App',
                          label: 'Mobile App',
                          description: 'Native mobile experiences for iOS and Android',
                          disabled: true,
                          comingSoon: true,
                          icon: Smartphone
                        },
                        {
                          value: 'Other',
                          label: 'Other Project',
                          description: 'Have something else in mind? Let\'s discuss it',
                          icon: Sparkles
                        }
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`relative flex flex-col p-4 cursor-pointer rounded-lg border transition-all duration-200 ${
                            formData.projectType === option.value 
                              ? 'border-[#A72608] bg-[#A72608]/5' 
                              : 'border-[#171738]/20 hover:border-[#171738]/40 hover:bg-[#171738]/5'
                          } ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <input
                            type="radio"
                            name="projectType"
                            value={option.value}
                            checked={formData.projectType === option.value}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className="sr-only"
                            required
                            disabled={option.disabled}
                          />
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-md transition-colors ${
                              formData.projectType === option.value 
                                ? 'bg-[#A72608] text-[#DDE2C6]' 
                                : 'bg-[#171738]/10 text-[#171738]'
                            }`}>
                              <option.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-[#171738] truncate">
                                  {option.label}
                                  {option.comingSoon && (
                                    <span className="ml-2 text-xs text-[#A72608] font-medium">(Coming Soon)</span>
                                  )}
                                </div>
                              </div>
                              <div className="mt-1 text-xs text-[#171738]/70 leading-relaxed">
                                {option.description}
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-2.5">
                    <label className="text-sm font-medium text-[#171738]">
                      Project Budget
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 sm:top-3 text-[#171738]/50">$</span>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="flex h-12 sm:h-11 w-full rounded-lg border border-[#171738]/20 bg-white/90 pl-8 pr-4 py-2 text-base text-[#171738] placeholder:text-[#171738]/50 focus:border-[#A72608] focus:outline-none focus:ring-2 focus:ring-[#A72608]/20 transition-colors"
                        placeholder="5000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-2.5">
                    <label className="text-sm font-medium text-[#171738]">
                      Tell me about your project
                    </label>
                    <textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Tell me about your project goals, timeline, and any specific features you have in mind..."
                      className="flex min-h-[120px] w-full rounded-lg border border-[#171738]/20 bg-white/90 px-4 py-3 text-base text-[#171738] placeholder:text-[#171738]/50 focus:border-[#A72608] focus:outline-none focus:ring-2 focus:ring-[#A72608]/20 transition-colors"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#A72608] px-8 py-3.5 sm:py-3 text-base font-medium text-[#DDE2C6] hover:bg-[#8c1e06] focus:outline-none focus:ring-2 focus:ring-[#A72608] focus:ring-offset-2 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
