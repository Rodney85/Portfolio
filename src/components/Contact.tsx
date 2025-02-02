import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  project_type: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactForm) => {
    const message = {
      id: crypto.randomUUID(),
      ...data,
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    // Get existing messages
    const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    
    // Add new message
    localStorage.setItem('contact_messages', JSON.stringify([message, ...existingMessages]));
    
    // Reset form
    reset();
    
    // Show success message
    alert('Message sent successfully!');
  };

  return (
    <section id="contact" className="min-h-screen bg-[#134E4A] p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#E8D5C4] rounded-3xl p-8 sm:p-12">
          <h1 className="text-[32px] font-serif text-[#1A1A1A] mb-4">Let's work together</h1>
          <p className="text-[#4A4A4A] mb-8 text-base">
            Got an idea brewing? I'm all ears. Whether it's a quick digital fix or a complex project, I'm excited to hear what you're thinking.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-[#4A4A4A] mb-2">
                What is your name or company name?
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#134E4A] focus:border-[#134E4A] text-base"
                placeholder="John Doe / Acme Inc."
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-[#4A4A4A] mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#134E4A] focus:border-[#134E4A] text-base"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm text-[#4A4A4A] mb-2">
                Phone Number
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#134E4A] focus:border-[#134E4A] text-base"
                placeholder="+1 (123) 456-7890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
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
                    value="Website Development"
                    {...register('project_type')}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="website"
                    className="flex flex-col h-full p-4 rounded-lg border border-[#D1D5DB] bg-white cursor-pointer hover:border-[#134E4A] peer-checked:border-[#134E4A] peer-checked:bg-[#F3F4F6] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#134E4A]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
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
                    value="Web Application"
                    {...register('project_type')}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="web-app"
                    className="flex flex-col h-full p-4 rounded-lg border border-[#D1D5DB] bg-white cursor-pointer hover:border-[#134E4A] peer-checked:border-[#134E4A] peer-checked:bg-[#F3F4F6] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#134E4A]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 18H12.01M7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
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
                    value="Mobile App"
                    {...register('project_type')}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="mobile-app"
                    className="flex flex-col h-full p-4 rounded-lg border border-[#D1D5DB] bg-white cursor-pointer hover:border-[#134E4A] peer-checked:border-[#134E4A] peer-checked:bg-[#F3F4F6] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#134E4A]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
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
                    value="Custom Solution"
                    {...register('project_type')}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="custom"
                    className="flex flex-col h-full p-4 rounded-lg border border-[#D1D5DB] bg-white cursor-pointer hover:border-[#134E4A] peer-checked:border-[#134E4A] peer-checked:bg-[#F3F4F6] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#134E4A]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6V4M12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10M12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10M6 18C7.10457 18 8 17.1046 8 16C8 14.8954 7.10457 14 6 14M6 18C4.89543 18 4 17.1046 4 16C4 14.8954 4.89543 14 6 14M6 18V20M6 14V4M12 10V20M18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14M18 18C16.8954 18 16 17.1046 16 16C16 14.8954 16.8954 14 18 14M18 18V20M18 14V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
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

            <div>
              <label htmlFor="message" className="block text-sm text-[#4A4A4A] mb-2">
                Tell me more about your project
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#134E4A] focus:border-[#134E4A] text-base resize-none"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#134E4A] text-white py-2.5 rounded-md hover:bg-[#0F3D39] transition-colors font-medium text-base flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};