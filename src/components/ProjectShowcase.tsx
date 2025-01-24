import { ProjectGrid, type ProjectCard } from "@/components/ui/layout-grid";
import { motion } from "framer-motion";

const projects: ProjectCard[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing my projects and skills, built with React and featuring smooth animations.",
    thumbnail: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&auto=format&fit=crop&q=60",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    githubUrl: "https://github.com/yourusername/portfolio",
  },
  {
    id: 2,
    title: "Windsurf IDE",
    description: "A powerful, AI-enhanced code editor that helps developers write better code faster.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    technologies: ["Electron", "React", "TypeScript", "AI Integration"],
    demoUrl: "https://your-demo-url.com",
  },
  {
    id: 3,
    title: "AI Flow Framework",
    description: "A revolutionary framework for building AI-powered applications with natural language processing.",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    technologies: ["Python", "Machine Learning", "NLP", "FastAPI"],
    githubUrl: "https://github.com/yourusername/ai-flow",
  },
  {
    id: 4,
    title: "Code Assistant",
    description: "An intelligent code assistant that provides real-time suggestions and code improvements.",
    thumbnail: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=60",
    technologies: ["TypeScript", "Node.js", "OpenAI", "WebSockets"],
    demoUrl: "https://your-demo-url.com",
    githubUrl: "https://github.com/yourusername/code-assistant",
  },
];

export function ProjectShowcase() {
  return (
    <div className="min-h-screen bg-[#171738] p-4 sm:p-6">
      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.h2 
            className="text-4xl font-bold text-[#DDE2C6] mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My Projects
          </motion.h2>
          <motion.p 
            className="text-[#DDE2C6]/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Here are some of the projects I've worked on. Each project demonstrates
            different skills and technologies in my development journey.
          </motion.p>
        </div>
        <ProjectGrid projects={projects} />
      </motion.div>
    </div>
  );
}
