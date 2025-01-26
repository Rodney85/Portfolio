import { ProjectGrid } from "@/components/ui/layout-grid";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export function ProjectShowcase() {
  const [error, setError] = useState<string | null>(null);
  
  // Fetch projects from Convex with error handling
  const projects = useQuery(api.projects.list, {
    onError: (e) => {
      console.error("Error fetching projects:", e);
      setError(e.message);
    }
  }) || [];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6 text-[#DDE2C6]">Oops!</h2>
        <p className="text-[#DDE2C6]/80 mb-4">
          There was an error loading the projects. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#DDE2C6]/10 text-[#DDE2C6] px-6 py-2 rounded-lg hover:bg-[#DDE2C6]/20 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-[#DDE2C6]">My Projects</h2>
      <ProjectGrid projects={projects} />
    </motion.div>
  );
}
