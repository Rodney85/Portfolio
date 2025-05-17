
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Smartphone, Code, LayoutGrid as LayoutIcon, Clock, Bot, Gitlab, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/ui/section-heading';
import ProjectCard from '@/components/projects/ProjectCard';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import LottieAnimation from '@/components/ui/lottie-animation';
import { HeroSection } from '@/components/layout/HeroSection';
import { WobbleCardDemo } from '@/components/ui/wobble-card-demo';
import DotBackground from '@/components/ui/dot-background-demo';

const Home = () => {
  // Stats section removed
  
  // Define the project type that matches ProjectCard's expected props
  interface Project {
    id: string;
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    desktopImageUrl: string;
    tabletImageUrl: string;
    mobileImageUrl: string;
    storageId: string;
    desktopStorageId: string;
    tabletStorageId: string;
    mobileStorageId: string;
    additionalImages: string[];
    tags: string[];
    githubUrl: string;
    liveUrl: string;
  }

  // Fetch projects from Convex with proper typing
  const convexProjects = useQuery(api.projects.getAll as any) as Project[] | undefined;
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  
  // Process projects when they arrive from Convex
  useEffect(() => {
    if (convexProjects && convexProjects.length > 0) {
      // Convert Convex projects to our ProjectProps format
      const projects: Project[] = convexProjects.map(project => ({
        // ID and basic info
        id: project._id, // Required by ProjectCard
        _id: project._id,
        title: project.title || 'Untitled Project',
        description: project.description || '',
        
        // Image URLs - include all possible image sources
        imageUrl: project.imageUrl || '',
        desktopImageUrl: project.desktopImageUrl || '',
        tabletImageUrl: project.tabletImageUrl || '',
        mobileImageUrl: project.mobileImageUrl || '',
        
        // Storage IDs (in case needed for direct URL construction)
        storageId: project.storageId || '',
        desktopStorageId: project.desktopStorageId || '',
        tabletStorageId: project.tabletStorageId || '',
        mobileStorageId: project.mobileStorageId || '',
        
        // Additional data
        additionalImages: Array.isArray(project.additionalImages) ? project.additionalImages : [],
        tags: Array.isArray(project.tags) ? project.tags : [],
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || ''
      }));
      
      // Sort by most recent and take up to 3
      const sorted = [...projects]
        .sort((a, b) => b._id.localeCompare(a._id))
        .slice(0, 3);
      
      setRecentProjects(sorted);
    }
  }, [convexProjects]);

  // Empty states for no projects and articles
  const EmptyProjects = () => (
    <div className="w-full py-12 text-center">
      <p className="text-muted-foreground">No projects available at the moment.</p>
      <div className="mt-4">
        <Link to="/contact">
          <Button className="bg-orange-500 hover:bg-orange-600">
            Contact me to discuss your project
          </Button>
        </Link>
      </div>
    </div>
  );

  const EmptyJournal = () => (
    <div className="w-full py-12 text-center">
      <p className="text-muted-foreground">No articles available at the moment.</p>
      <div className="mt-4">
        <Button className="bg-orange-500 hover:bg-orange-600" disabled>
          Check back later
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <HeroSection />

      {/* Services Section */}
      <section className="py-16">
        <div className="container-custom">
          <SectionHeading
            title="What We Build"
            subtitle="Custom solutions to streamline your business operations"
          />
          
          {/* WobbleCard Component */}
          <WobbleCardDemo />
        </div>
      </section>

      {/* Featured Projects Section */}
      <DotBackground className="py-16">
        <div className="container-custom relative z-10">
          <SectionHeading 
            title="Featured Work"
            subtitle="See how we've helped businesses just like yours"
          />
          
          {recentProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} index={recentProjects.indexOf(project)} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Link to="/projects">
                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    View All Projects <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </>
          ) : convexProjects === undefined ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : (
            <EmptyProjects />
          )}
        </div>
      </DotBackground>

      {/* Ready To Fix Your Workflow Section */}
      <section className="py-16 bg-primary/10 dark:bg-primary/5 text-foreground dark:text-white">
        <div className="container-custom">
          <SectionHeading 
            title="Ready to Fix Your Workflow?"
            subtitle="Stop wasting time with temporary fixes. Get a system that grows with you"
          />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-8">
            <div className="max-w-md">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-orange-500 rounded-full p-1 mt-1">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <p>Free 15-minute tech checkup</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-500 rounded-full p-1 mt-1">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <p>Find your biggest time/money drain</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-500 rounded-full p-1 mt-1">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <p>Get a clear plan to automate it</p>
                </li>
              </ul>
            </div>
            
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600" size="lg">
                Claim Your Free Checkup <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-16 bg-orange-50 dark:bg-orange-900/20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-3">
                <span 
                  className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent flex items-center gap-1.5"
                  style={{ fontFamily: "'Playpen Sans Arabic', cursive", fontWeight: 700 }}
                >
                  Dexor
                  <motion.div
                      animate={{ 
                          rotate: [0, 0, 0, 0, 10, -10, 0],
                          scale: [1, 1, 1, 1.1, 1.1, 1]
                      }}
                      transition={{ 
                          duration: 2.5, 
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 3
                      }}
                  >
                      <Gitlab className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  </motion.div>
                </span>
              </h2>
              <p className="text-muted-foreground mb-4">Business Apps & AI Automation</p>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Contact:</h3>
                <p>dexor8@gmail.com</p>
                <p>+254 737611756</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>
            
            {/* Center section - Connect with us */}
            <div className="mb-8 md:mb-0 text-center mx-auto">
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="flex justify-center space-x-4 mb-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-orange-100 transition-colors">
                  <Github size={20} className="text-orange-500" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-orange-100 transition-colors">
                  <Twitter size={20} className="text-orange-500" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-orange-100 transition-colors">
                  <Linkedin size={20} className="text-orange-500" />
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Follow us for the latest updates</p>
                <p>and development tips</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Quick Links:</h3>
              <div className="flex gap-3">
                <Link to="/" className="text-muted-foreground hover:text-orange-500">Home</Link>
                <span>|</span>
                <Link to="/services" className="text-muted-foreground hover:text-orange-500">Services</Link>
                <span>|</span>
                <Link to="/projects" className="text-muted-foreground hover:text-orange-500">Work</Link>
                <span>|</span>
                <Link to="/contact" className="text-muted-foreground hover:text-orange-500">Process</Link>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold mb-3">Free Bonus:</h3>
                <Link to="/guide">
                  <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                    Grab our guide: 5 Signs You Need a Custom App
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default Home;
