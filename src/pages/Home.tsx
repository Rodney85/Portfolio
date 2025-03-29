
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Layout, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/ui/section-heading';
import ProjectCard from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';

const Home = () => {
  // Show only featured projects (first 3)
  const featuredProjects = projects.slice(0, 3);

  const services = [
    {
      icon: <Smartphone className="w-10 h-10 text-tech-purple" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications built with React Native and TypeScript for iOS and Android."
    },
    {
      icon: <Code className="w-10 h-10 text-tech-blue" />,
      title: "Web App Development",
      description: "High-performance, responsive web applications built with modern frameworks like React and Next.js."
    },
    {
      icon: <Layout className="w-10 h-10 text-tech-light-purple" />,
      title: "Landing Page Design",
      description: "Conversion-optimized landing pages focused on delivering your brand message and generating leads."
    },
    {
      icon: <Bot className="w-10 h-10 text-tech-deep-blue" />,
      title: "AI Workflow Automation",
      description: "Custom automation workflows using n8n and make.com to streamline processes and reduce manual tasks."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1 
                className="heading-xl mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Transforming Ideas Into
                <span className="bg-gradient-to-r from-tech-purple to-tech-blue bg-clip-text text-transparent"> Digital Reality</span>
              </motion.h1>
              
              <motion.p 
                className="paragraph max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                I build exceptional mobile apps, web applications, landing pages, and create powerful AI automation workflows that help businesses grow.
              </motion.p>
              
              <motion.div 
                className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/projects">
                  <Button size="lg">
                    View Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
                <img 
                  src="https://placehold.co/600x400/7c3aed/FFFFFF/png?text=Developer+Portfolio" 
                  alt="Portfolio Preview" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container-custom">
          <SectionHeading
            title="What I Do"
            subtitle="Specialized services focusing on delivering value to your business"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="container-custom">
          <SectionHeading 
            title="Featured Projects"
            subtitle="Check out some of my recent work"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/projects">
              <Button variant="outline" size="lg">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container-custom">
          <div className="rounded-lg p-8 md:p-10 lg:p-12 bg-gradient-to-r from-tech-purple/90 to-tech-blue/90 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-lg mb-4">Ready to bring your idea to life?</h2>
              <p className="paragraph text-white/80 mb-8">
                Let's collaborate to create something amazing together. Whether you need a mobile app, web application, or an automated workflow.
              </p>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Let's Talk About Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
