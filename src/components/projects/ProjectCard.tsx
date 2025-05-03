
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  additionalImages?: string[]; // Array of additional image URLs
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  fileId?: string; // Storage ID for the image file
}

const ProjectCard: React.FC<{ project: ProjectProps; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full border border-border/50 hover:border-border/80 transition-all duration-300">
        <CardHeader className="p-0">
          <div className="aspect-video w-full overflow-hidden relative bg-muted/30">
            {project.imageUrl ? (
              <>
                <img 
                  src={project.imageUrl} 
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onLoad={() => {
                    console.log('Image loaded successfully:', project.imageUrl);
                  }}
                  onError={(e) => {
                    // Log the error
                    console.error('Failed to load image:', project.imageUrl);
                    
                    // Replace with placeholder
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    // Replace with a placeholder background
                    target.style.display = 'none';
                    // Add a placeholder icon to the parent div
                    const parent = target.parentElement;
                    if (parent) {
                      const placeholderDiv = document.createElement('div');
                      placeholderDiv.className = 'absolute inset-0 flex items-center justify-center bg-muted';
                      placeholderDiv.innerHTML = `
                        <div class="flex flex-col items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                          <span class="text-xs text-muted-foreground">${project.title}</span>
                        </div>
                      `;
                      parent.appendChild(placeholderDiv);
                    }
                  }}
                />
                
                {/* Show badge when project has multiple images */}
                {project.additionalImages && project.additionalImages.length > 0 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1.5">
                    <ImageIcon size={12} />
                    <span>{project.additionalImages.length + 1}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground">{project.title}</span>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 border-t border-border/50 bg-secondary/30 flex justify-between">
          <Link to={`/project/${project.id}`}>
            <Button variant="link" className="p-0 h-auto text-primary font-medium">
              View Details <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>

          <div className="flex gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost">
                  <Github size={16} />
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost">
                  <ExternalLink size={16} />
                </Button>
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
