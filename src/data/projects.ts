
import { ProjectProps } from '@/components/projects/ProjectCard';

export const projects: ProjectProps[] = [
];

export const getProjectById = (id: string): ProjectProps | undefined => {
  return projects.find(project => project.id === id);
};
