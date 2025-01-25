import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().min(1, 'Please select a budget range')
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Get in Touch
        </motion.h2>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl p-8 shadow-lg"
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Tell me more about your project
            </label>
            <textarea
              {...register('message')}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Project Budget
            </label>
            <select
              {...register('budget')}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select a budget range</option>
              <option value="$1,000 - $5,000">$1,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000 - $20,000">$10,000 - $20,000</option>
              <option value="$20,000+">$20,000+</option>
            </select>
            {errors.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Send size={20} />
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};