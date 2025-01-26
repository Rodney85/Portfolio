import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Project } from './admin/ProjectManagement';

export function LatestWorkCard() {
  const allProjects = useQuery(api.projects.list) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get the 5 most recent projects
  const recentProjects = allProjects
    .sort((a: Project, b: Project) => {
      const dateA = new Date(a._creationTime).getTime();
      const dateB = new Date(b._creationTime).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  useEffect(() => {
    // Auto-switch every 5 seconds
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === recentProjects.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [recentProjects.length]);

  if (!recentProjects.length) return null;

  const currentProject = recentProjects[currentIndex];

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-serif text-lg text-[#A72608]">Featured Projects</h4>
        <div className="flex gap-2">
          {recentProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-[#A72608]' : 'bg-[#171738]/20'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <motion.a
              href={currentProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full h-full"
            >
              <div className="relative w-full h-full bg-[#171738] rounded-2xl overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  {currentProject.thumbnail && (
                    <div className="relative w-full h-full">
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-[#171738]/40 z-10" />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#171738] via-[#171738]/90 to-[#171738]/60 z-10" />
                      <img
                        src={currentProject.thumbnail}
                        alt={currentProject.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-20 h-full p-8 flex flex-col justify-between">
                  <div className="max-w-[65%]">
                    <motion.h3 
                      className="text-3xl font-medium text-[#DDE2C6] mb-4 leading-tight drop-shadow-sm"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentProject.title}
                    </motion.h3>
                    <motion.p 
                      className="text-base text-[#DDE2C6]/90 line-clamp-3 leading-relaxed backdrop-blur-[2px] rounded-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentProject.description}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span className="relative text-sm font-medium text-[#DDE2C6] group-hover:text-[#A72608] transition-colors">
                      <span className="relative z-10">View Project</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A72608] group-hover:w-full transition-all duration-300" />
                    </span>
                    <ExternalLink className="w-4 h-4 transform group-hover:rotate-45 group-hover:text-[#A72608] transition-all" />
                  </motion.div>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
