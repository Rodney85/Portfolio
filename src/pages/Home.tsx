
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Clock, Code, Smartphone, Layout as LayoutIcon } from 'lucide-react';
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
      icon: <LayoutIcon className="w-10 h-10 text-tech-light-purple" />,
      title: "Landing Page Design",
      description: "Conversion-optimized landing pages focused on delivering your brand message and generating leads."
    },
  ];

  const workExperience = [
    {
      position: "Senior Full Stack Developer",
      company: "TechFusion",
      period: "2020 - Present",
    },
    {
      position: "Mobile App Developer",
      company: "InnovateApps",
      period: "2018 - 2020",
    },
    {
      position: "Web Developer",
      company: "CreativeSolutions",
      period: "2016 - 2018",
    },
  ];

  const testimonials = [
    {
      text: "Rodney delivered an exceptional mobile application that exceeded our expectations. His attention to detail and technical expertise were invaluable.",
      author: "Sarah Johnson",
      company: "TechStart Inc.",
      rating: 5,
    },
    {
      text: "Working with Rodney was a pleasure. He understood our requirements perfectly and delivered a polished product on time and within budget.",
      author: "Michael Chang",
      company: "InnovateCo",
      rating: 5,
    },
    {
      text: "Rodney's ability to translate our ideas into a functional web application was impressive. Highly recommended for any development project.",
      author: "Lisa Rodriguez",
      company: "CreativeMinds",
      rating: 5,
    },
  ];

  const stats = [
    { number: "50+", label: "Projects" },
    { number: "30+", label: "Clients" },
    { number: "5+", label: "Years" },
  ];

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
                <img 
                  src="https://placehold.co/600x600/ffffff/000000.png?text=Rodney+Mutwiri" 
                  alt="Rodney Mutwiri" 
                  className="w-full max-w-md mx-auto rounded-full object-cover z-10 relative"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Experience Timeline */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <SectionHeading
            title="My Work Experience"
            subtitle="My professional journey in the tech industry"
          />
          
          <div className="relative max-w-3xl mx-auto mt-12">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-orange-500"></div>
            
            {workExperience.map((experience, index) => (
              <motion.div 
                key={experience.company}
                className="relative flex items-center justify-between mb-12 last:mb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-5/12 pr-8 text-right ${index % 2 !== 0 ? 'order-last' : ''}`}>
                  <h3 className="font-bold text-lg">{experience.position}</h3>
                  <p className="text-muted-foreground">{experience.company}</p>
                </div>
                
                <div className="z-10">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <div className={`w-5/12 pl-8 ${index % 2 === 0 ? 'order-last' : ''}`}>
                  <p className="font-medium">{experience.period}</p>
                </div>
              </motion.div>
            ))}
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

      {/* Featured Projects Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <SectionHeading 
            title="Let's have a look at my Portfolio"
            subtitle="Check out some of my recent work"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/projects">
              <Button className="bg-orange-500 hover:bg-orange-600" size="lg">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#1A1F2C] text-white">
        <div className="container-custom">
          <SectionHeading 
            title="Testimonials That"
            subtitle="What clients say about working with me"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 p-6 rounded-lg"
              >
                <div className="flex mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                    />
                  ))}
                </div>
                <p className="mb-4 text-gray-300">{testimonial.text}</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
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

      {/* Recent Work Section */}
      <section className="py-16">
        <div className="container-custom">
          <SectionHeading 
            title="From my Journal"
            subtitle="Check out my latest case studies and articles"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <img 
                    src={`https://placehold.co/600x400/7c3aed/FFFFFF.png?text=Case+Study+${item}`} 
                    alt={`Case Study ${item}`} 
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Case Study {item}: Mobile App Development</h3>
                <p className="text-muted-foreground mb-4">How I helped a startup launch their flagship mobile application</p>
                <Link to={`/case-study-${item}`}>
                  <Button variant="link" className="p-0 h-auto text-orange-500">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-orange-500 hover:bg-orange-600">
              View All Articles
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
