
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { getProjectById } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;

  useEffect(() => {
    if (!project) {
      navigate('/projects', { replace: true });
    }
  }, [project, navigate]);

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
                
                {/* This is where you'd put more detailed project information */}
                <h3 className="text-xl font-bold mt-6 mb-3">Project Details</h3>
                <p className="paragraph">
                  This project was developed to solve specific business challenges and provide exceptional user experiences.
                  The implementation includes modern technologies and best practices to ensure scalability and performance.
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Key Features</h3>
                <ul className="list-disc pl-5 space-y-2 paragraph">
                  <li>Feature 1: Lorem ipsum dolor sit amet</li>
                  <li>Feature 2: Consectetur adipiscing elit</li>
                  <li>Feature 3: Sed do eiusmod tempor incididunt</li>
                  <li>Feature 4: Ut labore et dolore magna aliqua</li>
                </ul>
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
                    <Button variant="outline" className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Preview
                    </Button>
                  </a>
                )}
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sticky top-24">
                <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
                  <img 
                    src={project.imageUrl} 
                    alt={`${project.title} preview`}
                    className="w-full h-auto"
                  />
                </div>
                
                {/* More project images could go here */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="rounded overflow-hidden border border-border/50">
                    <img 
                      src={`https://placehold.co/300x200/${project.id === 'ai-workflow-automation' ? '10b981' : project.id === 'saas-landing-page' ? 'f97316' : project.id === 'e-commerce-platform' ? '7c3aed' : '2563eb'}/FFFFFF/png?text=Detail+1`} 
                      alt="Project detail 1"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded overflow-hidden border border-border/50">
                    <img 
                      src={`https://placehold.co/300x200/${project.id === 'ai-workflow-automation' ? '10b981' : project.id === 'saas-landing-page' ? 'f97316' : project.id === 'e-commerce-platform' ? '7c3aed' : '2563eb'}/FFFFFF/png?text=Detail+2`} 
                      alt="Project detail 2"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded overflow-hidden border border-border/50">
                    <img 
                      src={`https://placehold.co/300x200/${project.id === 'ai-workflow-automation' ? '10b981' : project.id === 'saas-landing-page' ? 'f97316' : project.id === 'e-commerce-platform' ? '7c3aed' : '2563eb'}/FFFFFF/png?text=Detail+3`} 
                      alt="Project detail 3"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;
