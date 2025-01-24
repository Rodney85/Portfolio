import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, Layout, Smartphone, Sparkles } from 'lucide-react';

export function Contact() {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 min-h-[calc(100vh-8rem)]"
    >
      {/* Contact Form */}
      <div className="flex-1 bg-[#DDE2C6] rounded-2xl p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl font-serif text-[#171738] mb-8">Let's work together</h1>
          <p className="text-[#171738]/80 mb-8">
            Got an idea brewing? I'm all ears. Whether it's a quick digital fix or a complex project,
            I'm excited to hear what you're thinking.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#171738] mb-2">
                What is your name or company name?
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white border border-[#171738]/10 focus:outline-none focus:ring-2 focus:ring-[#A72608] text-[#171738]"
                placeholder="John Doe / Acme Inc."
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#171738] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white border border-[#171738]/10 focus:outline-none focus:ring-2 focus:ring-[#A72608] text-[#171738]"
                placeholder="you@example.com"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-[#171738] mb-4">
                What project are you interested in?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'Website Development' })}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    formData.projectType === 'Website Development'
                      ? 'border-[#A72608] bg-[#A72608]/5'
                      : 'border-[#171738]/10 hover:border-[#A72608] hover:bg-[#A72608]/5'
                  } transition-all`}
                >
                  <Globe className="w-5 h-5 text-[#171738]" />
                  <div className="text-left">
                    <div className="font-medium text-[#171738]">Website Development</div>
                    <div className="text-sm text-[#171738]/60">Custom websites with modern design and optimal performance</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'Web Application' })}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    formData.projectType === 'Web Application'
                      ? 'border-[#A72608] bg-[#A72608]/5'
                      : 'border-[#171738]/10 hover:border-[#A72608] hover:bg-[#A72608]/5'
                  } transition-all`}
                >
                  <Layout className="w-5 h-5 text-[#171738]" />
                  <div className="text-left">
                    <div className="font-medium text-[#171738]">Web Application</div>
                    <div className="text-sm text-[#171738]/60">Full-featured web apps with robust functionality</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'Mobile App' })}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    formData.projectType === 'Mobile App'
                      ? 'border-[#A72608] bg-[#A72608]/5'
                      : 'border-[#171738]/10 hover:border-[#A72608] hover:bg-[#A72608]/5'
                  } transition-all`}
                >
                  <Smartphone className="w-5 h-5 text-[#171738]" />
                  <div className="text-left">
                    <div className="font-medium text-[#171738]">Mobile App</div>
                    <div className="text-sm text-[#171738]/60">Native mobile experiences for iOS and Android</div>
                    <div className="text-xs text-[#A72608] mt-1">(Coming Soon)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'Custom Solution' })}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    formData.projectType === 'Custom Solution'
                      ? 'border-[#A72608] bg-[#A72608]/5'
                      : 'border-[#171738]/10 hover:border-[#A72608] hover:bg-[#A72608]/5'
                  } transition-all`}
                >
                  <Sparkles className="w-5 h-5 text-[#171738]" />
                  <div className="text-left">
                    <div className="font-medium text-[#171738]">Custom Solution</div>
                    <div className="text-sm text-[#171738]/60">Tailored digital solutions for your unique needs</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-[#171738] mb-2">
                Tell me more about your project
              </label>
              <textarea
                id="details"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white border border-[#171738]/10 focus:outline-none focus:ring-2 focus:ring-[#A72608] text-[#171738]"
                placeholder="Share your vision, goals, and any specific requirements..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#171738] hover:bg-[#A72608] text-[#DDE2C6] rounded-lg transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
