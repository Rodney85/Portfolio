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
    <div className="h-full w-full relative group">
      {/* Featured Projects Title */}
      <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-center">
        <h4 className="font-serif text-lg text-[#FF7F6B] drop-shadow-sm">Featured Projects</h4>
        <div className="flex gap-2">
          {recentProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#FF7F6B] w-6' 
                  : 'bg-[#134E4A]/20 hover:bg-[#FF7F6B]/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <motion.a
              href={currentProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full h-full bg-gradient-to-br from-[#134E4A] to-[#134E4A]/90 relative"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                {currentProject.thumbnail && (
                  <div className="relative w-full h-full">
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#134E4A]/30 to-[#134E4A]/60 z-10" />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#134E4A]/90 via-[#134E4A]/40 to-transparent z-10" />
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

              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] z-20" />

              {/* Content */}
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <div>
                  <motion.h3 
                    className="text-2xl font-medium text-[#93C5B5] mb-2 drop-shadow-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentProject.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-[#E8D5C4] line-clamp-2 mb-4 drop-shadow-sm"
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
                  className="flex items-center gap-2 self-end relative"
                >
                  <div className="absolute -left-12 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#93C5B5]/30 to-[#93C5B5]/10" />
                  <span className="text-sm font-medium text-[#93C5B5] group-hover:text-[#FF7F6B] transition-all group-hover:translate-x-1">
                    View Project
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#93C5B5] group-hover:text-[#FF7F6B] transform group-hover:rotate-45 transition-all" />
                </motion.div>
              </div>
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
