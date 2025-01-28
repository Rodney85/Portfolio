import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../admin/ProjectManagement";

export const ProjectGrid = ({ projects }: { projects: Project[] }) => {
  if (!projects) return null;

  console.log("Projects data:", projects);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        console.log("Project thumbnail:", project.thumbnail);
        return (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-custom-beige/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-custom-beige/20"
          >
            <div className="aspect-video relative overflow-hidden">
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error("Image failed to load:", project.thumbnail);
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-custom-beige">
                {project.title}
              </h3>
              <p className="text-custom-beige/80 mb-4 line-clamp-2">
                {project.description}
              </p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-custom-beige hover:text-[#FF4D4D] transition-colors duration-200 bg-custom-beige/10 px-4 py-2 rounded-lg hover:bg-custom-beige/20"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
