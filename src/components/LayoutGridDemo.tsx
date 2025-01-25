"use client";
import { ProjectGrid } from "@/components/ui/layout-grid";

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <ProjectGrid projects={projects} />
    </div>
  );
}

const projects = [
  {
    id: 1,
    title: "House in the woods",
    description: "A serene and tranquil retreat, this house in the woods offers a peaceful escape from the hustle and bustle of city life.",
    thumbnail: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Architecture", "Interior Design"],
    demoUrl: "https://example.com/demo1",
    githubUrl: "https://github.com/example/project1"
  },
  {
    id: 2,
    title: "Mountain View",
    description: "Experience breathtaking views of the mountains from this modern architectural masterpiece.",
    thumbnail: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Architecture", "Landscape Design"],
    demoUrl: "https://example.com/demo2",
    githubUrl: "https://github.com/example/project2"
  },
  {
    id: 3,
    title: "Urban Loft",
    description: "A modern urban loft that combines industrial elements with comfortable living spaces.",
    thumbnail: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Interior Design", "Urban Planning"],
    demoUrl: "https://example.com/demo3",
    githubUrl: "https://github.com/example/project3"
  },
  {
    id: 4,
    title: "Coastal Retreat",
    description: "A beautiful beachfront property that perfectly captures the essence of coastal living.",
    thumbnail: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Architecture", "Coastal Design"],
    demoUrl: "https://example.com/demo4",
    githubUrl: "https://github.com/example/project4"
  }
];
