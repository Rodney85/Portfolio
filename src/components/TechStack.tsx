import { motion } from 'framer-motion';
import { Cpu, Database, Layout, Palette, Server, Terminal } from 'lucide-react';

const technologies = [
  { icon: <Terminal size={32} />, name: 'TypeScript', color: 'bg-blue-500' },
  { icon: <Layout size={32} />, name: 'React', color: 'bg-cyan-500' },
  { icon: <Palette size={32} />, name: 'Tailwind', color: 'bg-teal-500' },
  { icon: <Cpu size={32} />, name: 'Node.js', color: 'bg-green-500' },
  { icon: <Database size={32} />, name: 'PostgreSQL', color: 'bg-indigo-500' },
  { icon: <Server size={32} />, name: 'AWS', color: 'bg-orange-500' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const TechStack = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Tech Stack
        </motion.h2>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-16 h-16 ${tech.color} rounded-lg flex items-center justify-center text-white mb-4 mx-auto`}>
                {tech.icon}
              </div>
              <h3 className="text-lg font-semibold text-center">{tech.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};