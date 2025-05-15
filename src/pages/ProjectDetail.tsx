
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
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
          // Device-specific images
          desktopImageUrl: foundProject.desktopImageUrl || foundProject.imageUrl || '',
          tabletImageUrl: foundProject.tabletImageUrl || foundProject.imageUrl || '',
          mobileImageUrl: foundProject.mobileImageUrl || foundProject.imageUrl || '',
          // Other project data
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
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container-custom max-w-screen-xl mx-auto">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 h-full">
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
                  <a href={project.githubUrl.startsWith('http') ? project.githubUrl : `https://${project.githubUrl}`} target="_blank" rel="noopener noreferrer">
                    <Button className="flex items-center">
                      <Github className="mr-2 h-4 w-4" /> GitHub Repository
                    </Button>
                  </a>
                )}
                
                {project.liveUrl && (
                  <a href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`} target="_blank" rel="noopener noreferrer">
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
              className="h-full"
            >
              <div className="sticky top-4 md:top-12 lg:top-24 h-full">
                {/* Device view selector */}
                <div className="flex items-center justify-center mb-4 bg-muted/30 p-2 rounded-lg">
                  <div className="flex space-x-1 bg-background rounded-md p-1 border border-border/50">
                    <button
                      type="button"
                      onClick={() => setActiveView('desktop')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${activeView === 'desktop' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    >
                      <Monitor size={16} />
                      <span className="text-xs">Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveView('tablet')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${activeView === 'tablet' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    >
                      <Tablet size={16} />
                      <span className="text-xs">Tablet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveView('mobile')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${activeView === 'mobile' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    >
                      <Smartphone size={16} />
                      <span className="text-xs">Mobile</span>
                    </button>
                  </div>
                </div>
                
                {/* Device-specific project images */}
                <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
                  <div className={`relative w-full max-h-[calc(100vh-250px)] overflow-hidden ${activeView === 'mobile' ? 'aspect-[9/16] max-w-[350px] mx-auto' : 'aspect-[16/9]'}`}>
                    {activeView === 'desktop' && project.desktopImageUrl && (
                      <img 
                        src={project.desktopImageUrl} 
                        alt={`${project.title} desktop preview`}
                        className="w-full h-full object-contain object-center"
                        onLoad={(e) => {
                          const img = e.target as HTMLImageElement;
                          if (img.naturalHeight > img.naturalWidth) {
                            img.className = 'w-full h-full object-contain object-center';
                          } else {
                            img.className = 'max-w-full max-h-full w-auto h-auto object-contain object-center mx-auto';
                          }
                        }}
                      />
                    )}
                    
                    {activeView === 'tablet' && project.tabletImageUrl && (
                      <img 
                        src={project.tabletImageUrl} 
                        alt={`${project.title} tablet preview`}
                        className="w-full h-full object-contain object-center"
                        onLoad={(e) => {
                          const img = e.target as HTMLImageElement;
                          if (img.naturalHeight > img.naturalWidth) {
                            img.className = 'w-full h-full object-contain object-center';
                          } else {
                            img.className = 'max-w-full max-h-full w-auto h-auto object-contain object-center mx-auto';
                          }
                        }}
                      />
                    )}
                    
                    {activeView === 'mobile' && project.mobileImageUrl && (
                      <img 
                        src={project.mobileImageUrl} 
                        alt={`${project.title} mobile preview`}
                        className="max-w-[300px] h-full object-contain object-center mx-auto"
                        onLoad={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.className = 'max-w-[300px] h-full object-contain object-center mx-auto';
                        }}
                      />
                    )}
                    
                    {/* Fallback if no device-specific image is available */}
                    {((activeView === 'desktop' && !project.desktopImageUrl) ||
                      (activeView === 'tablet' && !project.tabletImageUrl) ||
                      (activeView === 'mobile' && !project.mobileImageUrl)) && (
                      <div className="flex flex-col items-center justify-center h-full bg-muted/30 p-4 text-center">
                        <p className="text-muted-foreground mb-2">No {activeView} preview available</p>
                        <p className="text-xs text-muted-foreground">Try selecting a different device view</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Additional images from the database */}
                {project.additionalImages && project.additionalImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-4">
                    {project.additionalImages.map((imageUrl, index) => (
                      <div key={index} className="rounded-md overflow-hidden border border-border/50 shadow-sm">
                        <div className="relative aspect-square overflow-hidden bg-muted/30">
                          <img 
                            src={imageUrl} 
                            alt={`${project.title} detail ${index + 1}`}
                            className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                            loading="lazy" 
                            onError={(e) => {
                              // Handle error by hiding the image
                              const img = e.target as HTMLImageElement;
                              img.style.display = 'none';
                              img.parentElement!.className = 'flex items-center justify-center w-full h-full bg-muted/40';
                              img.parentElement!.innerHTML = '<span class="text-xs text-muted-foreground">Image unavailable</span>';
                            }}
                          />
                        </div>
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
