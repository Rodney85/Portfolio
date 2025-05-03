
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch all projects from Convex
  const convexProjects = useQuery(api.projects.getAll as any);
  
  useEffect(() => {
    if (convexProjects === undefined) {
      // Still loading
      setIsLoading(true);
      return;
    }
    
    if (convexProjects && id) {
      // Find the project with matching ID
      const foundProject = convexProjects.find(p => p._id === id);
      
      if (foundProject) {
        // Format project data
        setProject({
          id: foundProject._id,
          title: foundProject.title,
          description: foundProject.description,
          imageUrl: foundProject.imageUrl || '',
          additionalImages: foundProject.additionalImages || [],
          tags: foundProject.tags,
          githubUrl: foundProject.githubUrl || '',
          liveUrl: foundProject.liveUrl || '',
          detailedDescription: foundProject.detailedDescription || '',
          technologies: foundProject.technologies || '',
          challenges: foundProject.challenges || '',
          outcomes: foundProject.outcomes || '',
          duration: foundProject.duration || '',
          year: foundProject.year || '',
          role: foundProject.role || '',
          teamSize: foundProject.teamSize || ''
        });
      } else {
        // Project not found
        navigate('/projects', { replace: true });
      }
    }
    
    setIsLoading(false);
  }, [convexProjects, id, navigate]);

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading project details...</p>
      </div>
    );
  }
  
  if (!project) return null;

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="mb-8">
          <Link to="/projects">
            <Button variant="ghost" className="pl-0 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <motion.h1 
                className="heading-lg mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {project.title}
              </motion.h1>
              
              <motion.div 
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </motion.div>
              
              <motion.div
                className="prose max-w-none mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="paragraph">{project.description}</p>
                
                {/* Display actual project details */}
                {project.detailedDescription && (
                  <>
                    <h3 className="text-xl font-bold mt-6 mb-3">Project Details</h3>
                    <p className="paragraph">{project.detailedDescription}</p>
                  </>
                )}
                
                {project.technologies && (
                  <>
                    <h3 className="text-xl font-bold mt-6 mb-3">Technologies</h3>
                    <p className="paragraph">{project.technologies}</p>
                  </>
                )}
                
                {project.challenges && (
                  <>
                    <h3 className="text-xl font-bold mt-6 mb-3">Challenges</h3>
                    <p className="paragraph">{project.challenges}</p>
                  </>
                )}
                
                {project.outcomes && (
                  <>
                    <h3 className="text-xl font-bold mt-6 mb-3">Outcomes</h3>
                    <p className="paragraph">{project.outcomes}</p>
                  </>
                )}
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="flex items-center">
                      <Github className="mr-2 h-4 w-4" /> GitHub Repository
                    </Button>
                  </a>
                )}
                
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="default" className="flex items-center bg-primary hover:bg-primary/90">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live URL
                    </Button>
                  </a>
                )}
              </motion.div>

              {/* Display project metadata */}
              {(project.duration || project.year || project.role || project.teamSize) && (
                <motion.div 
                  className="mt-8 grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {project.duration && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Duration</h4>
                      <p>{project.duration}</p>
                    </div>
                  )}
                  
                  {project.year && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Year</h4>
                      <p>{project.year}</p>
                    </div>
                  )}
                  
                  {project.role && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Role</h4>
                      <p>{project.role}</p>
                    </div>
                  )}
                  
                  {project.teamSize && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Team Size</h4>
                      <p>{project.teamSize}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sticky top-24">
                {/* Main image */}
                {project.imageUrl && (
                  <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
                    <img 
                      src={project.imageUrl} 
                      alt={`${project.title} preview`}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                
                {/* Additional images from the database */}
                {project.additionalImages && project.additionalImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {project.additionalImages.map((imageUrl, index) => (
                      <div key={index} className="rounded overflow-hidden border border-border/50 aspect-square">
                        <img 
                          src={imageUrl} 
                          alt={`${project.title} detail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;
