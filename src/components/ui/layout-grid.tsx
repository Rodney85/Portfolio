import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";

export type ProjectCard = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
};

export const ProjectGrid = ({ projects }: { projects: ProjectCard[] }) => {
  const [selected, setSelected] = useState<ProjectCard | null>(null);
  const [lastSelected, setLastSelected] = useState<ProjectCard | null>(null);

  const handleClick = (project: ProjectCard) => {
    setLastSelected(selected);
    setSelected(project);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {projects.map((project, i) => (
        <div key={i} className={cn("md:col-span-1", project.id === 1 && "md:col-span-2")}>
          <motion.div
            onClick={() => handleClick(project)}
            className={cn(
              "relative overflow-hidden",
              selected?.id === project.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === project.id
                ? "z-40 bg-[#DDE2C6] rounded-xl h-full w-full"
                : "bg-[#DDE2C6] rounded-xl h-full w-full hover:scale-[1.02] transition-transform duration-300"
            )}
            layoutId={`card-${project.id}`}
          >
            {selected?.id === project.id && <SelectedCard selected={selected} />}
            <ImageComponent project={project} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ project }: { project: ProjectCard }) => {
  return (
    <motion.img
      layoutId={`image-${project.id}-image`}
      src={project.thumbnail}
      height="500"
      width="500"
      className={cn(
        "object-cover object-center absolute inset-0 h-full w-full transition duration-200"
      )}
      alt={project.title}
    />
  );
};

const SelectedCard = ({ selected }: { selected: ProjectCard | null }) => {
  if (!selected) return null;
  
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-[#171738] opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        <h3 className="font-bold md:text-4xl text-xl text-[#DDE2C6] mb-2">
          {selected.title}
        </h3>
        <p className="text-[#DDE2C6]/80 mb-4">{selected.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-[#DDE2C6]/10 text-[#DDE2C6] px-2 py-1 rounded-md text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {selected.demoUrl && (
            <a
              href={selected.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#DDE2C6] text-[#171738] px-4 py-2 rounded-md hover:bg-[#DDE2C6]/90 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Demo
            </a>
          )}
          {selected.githubUrl && (
            <a
              href={selected.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#A72608] text-[#DDE2C6] px-4 py-2 rounded-md hover:bg-[#A72608]/90 transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};
