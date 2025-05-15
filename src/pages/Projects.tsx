import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import SectionHeading from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [formattedProjects, setFormattedProjects] = useState<any[]>([]);
  const [activeView, setActiveView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const isMobile = useIsMobile();
  
  // Fetch projects from Convex
  const convexProjects = useQuery(api.projects.getAll as any);
  const isLoading = convexProjects === undefined;
  
  // Process projects from Convex when they arrive
  useEffect(() => {
    if (convexProjects && convexProjects.length > 0) {
      // Convert Convex projects to our ProjectProps format with all necessary properties
      const projects = convexProjects.map(project => ({
        id: project._id,
        title: project.title,
        description: project.description,
        
        // Include all image URLs
        imageUrl: project.imageUrl || '',
        // Device-specific images with fallbacks
        desktopImageUrl: project.desktopImageUrl || project.imageUrl || '',
        tabletImageUrl: project.tabletImageUrl || project.imageUrl || '',
        mobileImageUrl: project.mobileImageUrl || project.imageUrl || '',
        
        // Include storage IDs for future reference
        fileId: project.fileId,
        desktopStorageId: project.desktopStorageId,
        tabletStorageId: project.tabletStorageId,
        mobileStorageId: project.mobileStorageId,
        
        additionalImages: project.additionalImages || [],
        tags: project.tags,
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || ''
      }));
      setFormattedProjects(projects);
    } else if (convexProjects && convexProjects.length === 0) {
      // If we have an empty array (not undefined), set projects to empty
      setFormattedProjects([]);
    }
  }, [convexProjects]);

  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(
      formattedProjects.flatMap(project => project.tags)
    )
  ).sort();

  // Filter projects based on selected tag
  const filteredProjects = filter 
    ? formattedProjects.filter(project => project.tags.includes(filter))
    : formattedProjects;

  return (
    <>
      <section className="py-10 md:py-16">
        <div className="container-custom">
          <SectionHeading
            title="My Projects"
            subtitle="Explore the range of web apps, mobile applications, landing pages, and automation workflows I've created"
          />

          {/* Filter buttons */}
          {formattedProjects.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2 mb-6 md:mb-10 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                variant={filter === null ? "default" : "outline"}
                onClick={() => setFilter(null)}
                className="mb-2"
                size={isMobile ? "sm" : "default"}
              >
                All
              </Button>
              
              {allTags.map(tag => (
                <Button 
                  key={tag}
                  variant={filter === tag ? "default" : "outline"}
                  onClick={() => setFilter(tag)}
                  className="mb-2"
                  size={isMobile ? "sm" : "default"}
                >
                  {tag}
                </Button>
              ))}
            </motion.div>
          )}

          {/* Projects grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">Loading projects...</p>
            </div>
          ) : formattedProjects.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-lg">
              <p className="text-xl text-muted-foreground">No projects available yet.</p>
              <p className="mt-2 text-muted-foreground">Check back soon for updates!</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
