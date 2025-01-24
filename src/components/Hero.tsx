import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export const Hero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#DDE2C6] rounded-2xl p-6 sm:p-8 relative overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col gap-2 max-w-2xl"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#171738] leading-tight"
        >
          Let's create digital <span className="text-[#A72608]">experiences</span> for your next project
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <Code2 className="text-[#171738]" size={32} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};