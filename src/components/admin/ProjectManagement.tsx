import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { ImageUpload } from "@/components/ui/image-upload";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

// Project type definition
export type Project = {
  _id: Id<"projects">;
  _creationTime: number;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  createdAt: number;
  updatedAt: number;
};

// Form validation schema
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  url: z.string().url('Must be a valid URL'),
});

type ProjectForm = z.infer<typeof projectSchema>;

export function ProjectManagement() {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Convex hooks
  const projects = useQuery(api.projects.list) || [];
  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  const deleteProject = useMutation(api.projects.remove);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: editingProject || {
      title: '',
      description: '',
      thumbnail: '',
      url: '',
    },
  });

  const handleImageUpload = async (url: string) => {
    setValue('thumbnail', url);
  };

  const onSubmit = async (data: ProjectForm) => {
    try {
      console.log("Submitting project data:", data);
      if (editingProject) {
        console.log("Updating project:", editingProject._id);
        await updateProject({
          id: editingProject._id,
          ...data,
        });
      } else {
        console.log("Creating new project");
        const projectId = await createProject(data);
        console.log("Created project with ID:", projectId);
      }

      setIsFormOpen(false);
      setEditingProject(null);
      reset();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = async (id: Id<"projects">) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject({ id });
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
    reset({
      title: project.title,
      description: project.description,
      thumbnail: project.thumbnail,
      url: project.url,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Projects</h2>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingProject(null);
            reset();
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>
      </div>

      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
        >
          <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl my-8 p-6 relative">
            <button
              onClick={() => {
                setIsFormOpen(false);
                setEditingProject(null);
                reset();
              }}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-semibold mb-4">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Title</label>
                <input
                  {...register('title')}
                  className="w-full p-2 rounded-md border border-input bg-transparent"
                  placeholder="Project Title"
                />
                {errors.title && (
                  <p className="text-destructive text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full p-2 rounded-md border border-input bg-transparent min-h-[80px]"
                  placeholder="Project Description"
                />
                {errors.description && (
                  <p className="text-destructive text-sm">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Project Image</label>
                <ImageUpload onUpload={handleImageUpload} />
                <input type="hidden" {...register('thumbnail')} />
                {errors.thumbnail && (
                  <p className="text-destructive text-sm">{errors.thumbnail.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Project URL</label>
                <input
                  {...register('url')}
                  className="w-full p-2 rounded-md border border-input bg-transparent"
                  placeholder="https://example.com"
                />
                {errors.url && (
                  <p className="text-destructive text-sm">{errors.url.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-card">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingProject(null);
                    reset();
                  }}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg"
                >
                  {isSubmitting ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-card rounded-lg overflow-hidden shadow-lg"
          >
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full aspect-video object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  View Project
                </a>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="p-2 hover:bg-accent rounded-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
