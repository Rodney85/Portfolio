
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Smartphone, Code, LayoutGrid as LayoutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/ui/section-heading';
import { useQuery } from '@tanstack/react-query';
import LottieAnimation from '@/components/ui/lottie-animation';

const Home = () => {
  const stats = [
    { number: "50+", label: "Projects" },
    { number: "30+", label: "Clients" },
    { number: "5+", label: "Years" },
  ];

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
      {/* Hero Section with Orange Circle Background */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-400 to-orange-500 opacity-90 -translate-y-1/2 translate-x-1/4 z-0"></div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <motion.p 
                className="text-lg font-medium text-tech-purple mb-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                I'm
              </motion.p>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Rodney Mutwiri
              </motion.h1>
              
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 bg-gradient-to-r from-tech-purple to-tech-blue bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Product Developer
              </motion.h2>
              
              <motion.p 
                className="paragraph max-w-2xl mx-auto lg:mx-0 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                I build exceptional mobile apps, web applications, landing pages, and create powerful AI automation workflows that help businesses grow.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/projects">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    View Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Me
                  </Button>
                </Link>
              </motion.div>

              {/* Rating Stats */}
              <motion.div 
                className="mt-8 flex items-center justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">10+ Years</span>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                {/* Use DotLottie animation instead of static image */}
                <div className="relative h-72 w-72 md:h-96 md:w-96 mx-auto">
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 6,
                      ease: "easeInOut"
                    }}
                    className="h-full w-full"
                  >
                    <LottieAnimation 
                      src="https://lottie.host/580a4395-b55d-4d89-aa93-7ce4126015cb/Fpxn7zdf88.lottie" 
                      className="h-full w-full object-contain"
                      loop={true}
                      autoplay={true}
                      isDotLottie={true}
                    />
                  </motion.div>
                  
                  {/* Subtle pulse animation behind image */}
                  <div className="absolute inset-0 rounded-full bg-orange-400 opacity-20 pulse-slow -z-10"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container-custom">
          <SectionHeading
            title="Why Hire Me?"
            subtitle="Specialized services focusing on delivering value to your business"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
                icon: <LayoutIcon className="w-10 h-10 text-tech-light-purple" />,
                title: "Landing Page Design",
                description: "Conversion-optimized landing pages focused on delivering your brand message and generating leads."
              },
            ].map((service, index) => (
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

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-3xl md:text-4xl font-bold text-orange-500">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section - Now with empty state */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <SectionHeading 
            title="Let's have a look at my Portfolio"
            subtitle="Check out some of my recent work"
          />
          
          <EmptyProjects />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#1A1F2C] text-white">
        <div className="container-custom">
          <SectionHeading 
            title="Testimonials"
            subtitle="What clients say about working with me"
          />
          
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-300 italic">Testimonials coming soon...</p>
          </div>
        </div>
      </section>

      {/* Project Inquiry Section */}
      <section className="py-16 bg-orange-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Have an Awesome Project Idea?</h2>
              <p className="text-muted-foreground">Let's discuss and bring your vision to life</p>
            </div>
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600" size="lg">
                Let's Talk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Work Section - Now with empty state */}
      <section className="py-16">
        <div className="container-custom">
          <SectionHeading 
            title="From my Journal"
            subtitle="Check out my latest case studies and articles"
          />
          
          <EmptyJournal />
        </div>
      </section>
    </>
  );
};

export default Home;
