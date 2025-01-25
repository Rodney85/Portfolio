import { ProjectGrid } from "@/components/ui/layout-grid";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function ProjectShowcase() {
  // Fetch projects from Convex
  const projects = useQuery(api.projects.list) || [];

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
