import { useState } from 'react';
import { Globe, Layout, Smartphone, Sparkles, Send } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';

const Contact = () => {
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
    
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType || '',
        message: formData.message,
        budget: formData.budget || ''
      });
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
        budget: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="min-h-screen bg-[#134E4A] p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#E8D5C4] rounded-3xl p-8 sm:p-12">
          <h1 className="text-[32px] font-serif text-[#1A1A1A] mb-4">Let's work together</h1>
          <p className="text-[#4A4A4A] mb-8 text-base">
            Got an idea brewing? I'm all ears. Whether it's a quick digital fix or a complex project, I'm excited to hear what you're thinking.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-[#4A4A4A] mb-2">
                What is your name or company name?
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#134E4A] focus:border-[#134E4A] text-base"
                placeholder="John Doe / Acme Inc."
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-[#4A4A4A] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#134E4A] focus:border-[#134E4A] text-base"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm text-[#4A4A4A] mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#134E4A] focus:border-[#134E4A] text-base"
                placeholder="+1 (123) 456-7890"
                required
              />
            </div>

            <div className="pt-2">
              <label className="block text-sm text-[#4A4A4A] mb-4">
                What project are you interested in?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="radio"
                    id="website"
                    name="projectType"
                    value="Website Development"
                    checked={formData.projectType === 'Website Development'}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="website"
                    className="flex flex-col h-full p-4 rounded-lg border border-[#D1D5DB] bg-white cursor-pointer hover:border-[#134E4A] peer-checked:border-[#134E4A] peer-checked:bg-[#F3F4F6] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#134E4A]">
                        <Globe size={24} />
                      </span>
                      <div>
                        <span className="font-medium text-[#1A1A1A] block mb-1">Website Development</span>
                        <span className="text-sm text-[#4A4A4A]">Custom websites with modern design and optimal performance</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="radio"
                    id="web-app"
                    name="projectType"
                    value="Web Application"
                    checked={formData.projectType === 'Web Application'}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="web-app"
                    className="flex flex-col h-full p-4 rounded-lg border border-[#D1D5DB] bg-white cursor-pointer hover:border-[#134E4A] peer-checked:border-[#134E4A] peer-checked:bg-[#F3F4F6] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#134E4A]">
                        <Layout size={24} />
                      </span>
                      <div>
                        <span className="font-medium text-[#1A1A1A] block mb-1">Web Application</span>
                        <span className="text-sm text-[#4A4A4A]">Full-featured web apps with robust functionality</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="radio"
                    id="mobile-app"
                    name="projectType"
                    value="Mobile App"
                    checked={formData.projectType === 'Mobile App'}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="mobile-app"
                    className="flex flex-col h-full p-4 rounded-lg border border-[#D1D5DB] bg-white cursor-pointer hover:border-[#134E4A] peer-checked:border-[#134E4A] peer-checked:bg-[#F3F4F6] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#134E4A]">
                        <Smartphone size={24} />
                      </span>
                      <div>
                        <span className="font-medium text-[#1A1A1A] block mb-1">Mobile App</span>
                        <span className="text-sm text-[#4A4A4A]">Native mobile experiences for iOS and Android</span>
                        <span className="text-xs text-[#DC2626] mt-1 block">(Coming Soon)</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="radio"
                    id="custom"
                    name="projectType"
                    value="Custom Solution"
                    checked={formData.projectType === 'Custom Solution'}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="custom"
                    className="flex flex-col h-full p-4 rounded-lg border border-[#D1D5DB] bg-white cursor-pointer hover:border-[#134E4A] peer-checked:border-[#134E4A] peer-checked:bg-[#F3F4F6] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#134E4A]">
                        <Sparkles size={24} />
                      </span>
                      <div>
                        <span className="font-medium text-[#1A1A1A] block mb-1">Custom Solution</span>
                        <span className="text-sm text-[#4A4A4A]">Tailored digital solutions for your unique needs</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="message" className="block text-sm text-[#4A4A4A] mb-2">
                  Tell me more about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#134E4A] focus:border-[#134E4A] text-base resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm text-[#4A4A4A] mb-2">
                  Project Budget (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]">$</span>
                  <input
                    id="budget"
                    name="budget"
                    type="number"
                    min="0"
                    step="100"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#134E4A] focus:border-[#134E4A] text-base"
                    placeholder="5000"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#134E4A] text-white py-2.5 rounded-md hover:bg-[#0F3D39] transition-colors font-medium text-base flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
