
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, BrainCircuit, Rocket, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/section-heading';
import LottieAnimation from '@/components/ui/lottie-animation';

const About = () => {
  const benefits = [
    {
      icon: <BrainCircuit className="h-10 w-10 text-tech-purple" />,
      title: "Technical Excellence",
      description: "We build robust, scalable solutions using modern tech stacks that provide exceptional performance and user experience."
    },
    {
      icon: <Rocket className="h-10 w-10 text-tech-blue" />,
      title: "Accelerated Delivery",
      description: "Our streamlined development process ensures on-time project delivery without compromising on quality."
    },
    {
      icon: <Target className="h-10 w-10 text-tech-light-purple" />,
      title: "Goal-Oriented Solutions",
      description: "We focus on creating digital products that achieve your business objectives and deliver measurable results."
    },
    {
      icon: <Users className="h-10 w-10 text-tech-deep-blue" />,
      title: "Collaborative Approach",
      description: "We work closely with you throughout the development process, ensuring transparency and alignment with your vision."
    }
  ];

  const valuePropositions = [
    "Custom mobile apps that deliver exceptional user experiences",
    "Responsive web applications built with modern frameworks",
    "Conversion-optimized landing pages for your products",
    "AI-powered workflow automation to increase efficiency",
    "End-to-end project management from ideation to deployment",
    "Ongoing support and maintenance for your digital products"
  ];

  return (
    <>
      {/* About Intro Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="heading-xl mb-4">About Our Approach</h1>
              <p className="paragraph mb-6">
                We specialize in developing high-quality digital solutions that transform your ideas into reality. Our team focuses on creating exceptional user experiences through innovative technology and strategic design.
              </p>
              
              <p className="paragraph mb-6">
                What sets us apart is our commitment to understanding your business goals first, then crafting technical solutions that directly contribute to achieving those objectives. We're not just developers – we're strategic partners in your digital success.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button>
                    Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
                <LottieAnimation
                  src="https://lottie.host/8de5ae5a-f96e-4fb3-b0d1-4fabcc55649f/q37qoi4VwT.lottie"
                  className="w-full h-auto"
                  loop={true}
                  autoplay={true}
                  isDotLottie={true}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Help Clients */}
      <section className="py-16 bg-secondary/50">
        <div className="container-custom">
          <SectionHeading
            title="How We Help Our Clients"
            subtitle="Our client-focused approach delivers tangible business results"
            alignment="left"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title}
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mt-1 shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
                <LottieAnimation
                  src="https://lottie.host/a0c68b87-0ba6-4f32-ae5e-ede860c17539/akWR81t8J9.lottie"
                  className="w-full h-auto"
                  loop={true}
                  autoplay={true}
                  isDotLottie={true}
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">What We Deliver</h2>
              
              <div className="space-y-4">
                {valuePropositions.map((value, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="shrink-0 h-6 w-6 text-tech-purple mt-0.5" />
                    <p>{value}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/projects">
                  <Button variant="outline">
                    View Our Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container-custom">
          <div className="rounded-lg p-8 md:p-10 bg-gradient-to-r from-tech-deep-blue/90 to-tech-purple/90 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-lg mb-4">Ready to transform your business?</h2>
              <p className="paragraph text-white/80 mb-8">
                Let's discuss how our custom digital solutions can help you achieve your business goals and stay ahead of the competition.
              </p>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Schedule a Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
