
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import SectionHeading from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);

  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.tags)
    )
  ).sort();

  // Filter projects based on selected tag
  const filteredProjects = filter 
    ? projects.filter(project => project.tags.includes(filter))
    : projects;

  return (
    <>
      <section className="py-16">
        <div className="container-custom">
          <SectionHeading
            title="My Projects"
            subtitle="Explore the range of web apps, mobile applications, landing pages, and automation workflows I've created"
          />

          {/* Filter buttons */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-10 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              variant={filter === null ? "default" : "outline"}
              onClick={() => setFilter(null)}
              className="mb-2"
            >
              All
            </Button>
            
            {allTags.map(tag => (
              <Button 
                key={tag}
                variant={filter === tag ? "default" : "outline"}
                onClick={() => setFilter(tag)}
                className="mb-2"
              >
                {tag}
              </Button>
            ))}
          </motion.div>

          {/* Projects grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No projects found with this filter.</p>
              <Button 
                variant="link" 
                onClick={() => setFilter(null)}
                className="mt-4"
              >
                View all projects
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
