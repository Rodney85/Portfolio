
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, ExternalLink, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProjectProps } from '@/components/projects/ProjectCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminProjects = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectProps>({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    tags: []
  });

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setCurrentProject({
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      tags: []
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (project: ProjectProps) => {
    setIsEditMode(true);
    setCurrentProject({...project});
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setCurrentProject(prev => ({
      ...prev,
      tags: tagsArray
    }));
  };

  const handleSubmit = () => {
    if (!currentProject.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your project.",
        variant: "destructive"
      });
      return;
    }

    if (isEditMode) {
      setProjects(prev => 
        prev.map(p => p.id === currentProject.id ? currentProject : p)
      );
      toast({
        title: "Project updated",
        description: `${currentProject.title} has been updated.`
      });
    } else {
      // Create a proper unique ID
      const newProject = {
        ...currentProject,
        id: crypto.randomUUID()
      };
      setProjects(prev => [...prev, newProject]);
      toast({
        title: "Project created",
        description: `${newProject.title} has been added to your projects.`
      });
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Project deleted",
      description: "The project has been removed."
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Manage Projects</h2>
        <Button onClick={handleOpenCreate} size={isMobile ? "sm" : "default"}>
          <Plus className={`${isMobile ? "mr-0 h-4 w-4" : "mr-2 h-4 w-4"}`} />
          {!isMobile && "Add Project"}
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground mb-4">No projects added yet</p>
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" /> 
            Add Your First Project
          </Button>
        </div>
      ) : isMobile ? (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline">
                          <Github className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleOpenEdit(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-destructive" 
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{project.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleOpenEdit(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-destructive" 
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Make changes to your project below.' : 'Fill in the details for your new project.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={currentProject.title}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={currentProject.description}
                onChange={handleChange}
                rows={isMobile ? 3 : 4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={currentProject.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={currentProject.tags.join(', ')}
                onChange={handleTagsChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={currentProject.githubUrl || ''}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="liveUrl">Live URL (optional)</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                value={currentProject.liveUrl || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter className={isMobile ? "flex-col space-y-2" : ""}>
            <Button variant="outline" onClick={() => setIsOpen(false)} className={isMobile ? "w-full" : ""}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className={isMobile ? "w-full" : ""}>
              {isEditMode ? 'Save Changes' : 'Add Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
