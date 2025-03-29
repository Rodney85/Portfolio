
import { ProjectProps } from '@/components/projects/ProjectCard';

export const projects: ProjectProps[] = [
  {
    id: "mobile-banking-app",
    title: "Mobile Banking App",
    description: "A secure and intuitive mobile banking application built with React Native. Features include transaction history, real-time notifications, and biometric authentication.",
    imageUrl: "https://placehold.co/600x400/2563eb/FFFFFF/png?text=Banking+App",
    tags: ["React Native", "TypeScript", "Mobile App"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "e-commerce-platform",
    title: "E-commerce Platform",
    description: "A responsive e-commerce platform with catalog management, shopping cart, and secure checkout functionality built with Next.js and Stripe integration.",
    imageUrl: "https://placehold.co/600x400/7c3aed/FFFFFF/png?text=E-commerce",
    tags: ["Next.js", "TypeScript", "Stripe", "Web App"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "ai-workflow-automation",
    title: "AI Workflow Automation",
    description: "Developed custom n8n workflows to automate customer support responses using NLP models, reducing response time by 60% and improving customer satisfaction.",
    imageUrl: "https://placehold.co/600x400/10b981/FFFFFF/png?text=AI+Workflow",
    tags: ["n8n", "Automation", "AI"],
    githubUrl: "https://github.com",
  },
  {
    id: "saas-landing-page",
    title: "SaaS Landing Page",
    description: "A conversion-optimized landing page for a software-as-a-service product with responsive design, animations, and integrated lead capture forms.",
    imageUrl: "https://placehold.co/600x400/f97316/FFFFFF/png?text=SaaS+Landing",
    tags: ["Next.js", "Tailwind CSS", "Landing Page"],
    liveUrl: "https://example.com",
  },
];

export const getProjectById = (id: string): ProjectProps | undefined => {
  return projects.find(project => project.id === id);
};
