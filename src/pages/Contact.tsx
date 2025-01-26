import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, Layout, Smartphone, Sparkles, Send } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';

export function Contact() {
  const submitContact = useMutation(api.contacts.submit);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    budget: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show loading toast
    const loadingToast = toast.loading('Sending your message...');
    
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType || 'Not specified',
        message: formData.message,
        budget: formData.budget ? `$${formData.budget} USD` : 'Not specified'
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
        budget: ''
      });

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Message sent successfully! I will get back to you soon.', {
        duration: 5000,
        position: 'bottom-right',
      });
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error('Failed to send message. Please try again.', {
        duration: 5000,
        position: 'bottom-right',
      });
      console.error('Error submitting form:', error);
    }
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
                required
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
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white border border-[#171738]/10 focus:outline-none focus:ring-2 focus:ring-[#A72608] text-[#171738]"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#171738] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white border border-[#171738]/10 focus:outline-none focus:ring-2 focus:ring-[#A72608] text-[#171738]"
                placeholder="+1 (123) 456-7890"
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

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#171738] mb-2">
                Tell me more about your project
              </label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white border border-[#171738]/10 focus:outline-none focus:ring-2 focus:ring-[#A72608] text-[#171738]"
                placeholder="Share your vision, goals, and any specific requirements..."
              />
            </div>

            {/* Budget Field */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-[#171738] mb-2">
                Project Budget
              </label>
              <input
                type="text"
                id="budget"
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white border border-[#171738]/10 focus:outline-none focus:ring-2 focus:ring-[#A72608] text-[#171738]"
                placeholder="Enter your budget (e.g. $1000)"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#A72608] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#8C1C06] transition-colors"
            >
              <Send size={20} />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
