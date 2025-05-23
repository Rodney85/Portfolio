
import React, { useState, useEffect } from 'react';
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
import { Plus, Pencil, Trash2, ExternalLink, Github, Image as ImageIcon, EyeIcon, Calendar, Tag } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import FileUpload from '@/components/ui/file-upload';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Predefined tags for easier selection
const COMMON_TAGS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js',
  'AI', 'Machine Learning', 'Python', 'Database', 'Mobile', 'Frontend', 'Backend',
  'Full Stack', 'UI/UX', 'Responsive', 'API', 'WordPress', 'E-commerce'
];

const AdminProjects = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Convex queries and mutations
  const convexProjects = useQuery(api.projects.getAll as any) || [];
  const createProject = useMutation(api.projects.create as any);
  const updateProject = useMutation(api.projects.update as any);
  const deleteProject = useMutation(api.projects.remove as any);
  // Using type assertion to fix TypeScript error
  const getFileUrl = useMutation(api.files.getUrlMutation as any);
  
  // Local state
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [currentTab, setCurrentTab] = useState('details');
  const [customTag, setCustomTag] = useState('');
  const [currentProject, setCurrentProject] = useState<ProjectProps & {
    detailedDescription?: string;
    technologies?: string;
    challenges?: string;
    outcomes?: string;
    duration?: string;
    role?: string;
    teamSize?: string;
    year?: string;
  }>({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    tags: [],
    detailedDescription: '',
    technologies: '',
    challenges: '',
    outcomes: '',
    duration: '',
    role: '',
    teamSize: '1',
    year: new Date().getFullYear().toString()
  });

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setCurrentProject({
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      tags: [],
      detailedDescription: '',
      technologies: '',
      challenges: '',
      outcomes: '',
      duration: '',
      role: '',
      teamSize: '1',
      year: new Date().getFullYear().toString(),
      githubUrl: '',
      liveUrl: ''
    });
    setIsOpen(true);
    setCurrentTab('details');
    setIsPreviewVisible(false);
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
  
  // Add a single tag to the project
  const handleAddTag = (tag: string) => {
    if (!tag) return;
    
    // Don't add duplicate tags
    if (currentProject.tags.includes(tag)) return;
    
    setCurrentProject(prev => ({
      ...prev,
      tags: [...prev.tags, tag]
    }));
    setCustomTag('');
  };
  
  // Remove a tag from the project
  const handleRemoveTag = (tagToRemove: string) => {
    setCurrentProject(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Load projects from Convex when they change
  useEffect(() => {
    if (convexProjects && convexProjects.length > 0) {
      // Convert Convex projects to our ProjectProps format
      const formattedProjects = convexProjects.map(project => ({
        id: project._id,
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl || '',
        tags: project.tags,
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || ''
      }));
      setProjects(formattedProjects);
    }
  }, [convexProjects]);

  // Handle file upload completion
  const handleFileUploaded = (storageId: string) => {
    console.log('File uploaded with storage ID:', storageId);
    
    // Store the storageId directly in the project
    setCurrentProject(prev => ({
      ...prev,
      // Store the storage ID for the image
      storageId: storageId
    }));
  };

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  const handleSubmit = async () => {
    if (!currentProject.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your project.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Clean up any empty fields to prevent validation issues
      // Prepare the project data with only valid fields
      const projectData: any = {
        title: currentProject.title.trim(),
        description: currentProject.description.trim(),
        tags: currentProject.tags.filter(tag => tag.trim() !== ''),
      };
      
      // Only include fields that have values
      // Use the imageUrl that was already generated from the file upload
      if (currentProject.imageUrl) projectData.imageUrl = currentProject.imageUrl;
      if (currentProject.githubUrl) projectData.githubUrl = currentProject.githubUrl.trim();
      if (currentProject.liveUrl) projectData.liveUrl = currentProject.liveUrl.trim();
      
      // Add additional metadata fields if they have values
      if (currentProject.detailedDescription) projectData.detailedDescription = currentProject.detailedDescription.trim();
      if (currentProject.technologies) projectData.technologies = currentProject.technologies.trim();
      if (currentProject.challenges) projectData.challenges = currentProject.challenges.trim();
      if (currentProject.outcomes) projectData.outcomes = currentProject.outcomes.trim();
      if (currentProject.duration) projectData.duration = currentProject.duration.trim();
      if (currentProject.role) projectData.role = currentProject.role.trim();
      if (currentProject.teamSize) projectData.teamSize = currentProject.teamSize.trim();
      if (currentProject.year) projectData.year = currentProject.year.trim();
      
      console.log("Saving project with data:", JSON.stringify(projectData, null, 2));

      if (isEditMode) {
        try {
          // Update existing project in Convex
          const updateData = {
            id: currentProject.id as any,
            ...projectData,
          };
          
          // Only update imageUrl if we've uploaded a new image
          // We're using the imageUrl that was already generated from the file upload
          if (currentProject.imageUrl) {
            updateData.imageUrl = currentProject.imageUrl;
          }
          
          console.log("Updating project with data:", JSON.stringify(updateData, null, 2));
          await updateProject(updateData);

          toast({
            title: "Project updated",
            description: `${currentProject.title} has been updated.`
          });
        } catch (error) {
          console.error("Error updating project:", error);
          toast({
            title: "Error",
            description: `Failed to update project: ${error.message || "Unknown error"}`,
            variant: "destructive"
          });
          return; // Don't close the modal
        }
      } else {
        try {
          // Make sure tags is an array with at least one item
          if (!projectData.tags || projectData.tags.length === 0) {
            projectData.tags = ["Other"];
          }
          
          // Make sure we use the newest imageUrl if it was just uploaded
          if (uploadedFileUrl) {
            projectData.imageUrl = uploadedFileUrl;
          }
          
          // Create new project in Convex
          console.log("Creating project with data:", JSON.stringify(projectData, null, 2));
          await createProject(projectData);

          toast({
            title: "Project created",
            description: `${currentProject.title} has been added to your projects.`
          });
        } catch (error) {
          console.error("Error creating project:", error);
          toast({
            title: "Error",
            description: `Failed to save project: ${error.message || "Unknown error"}`,
            variant: "destructive"
          });
          return; // Don't close the modal
        }
      }
      
      // Reset the uploaded file URL
      setUploadedFileUrl('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject({ id: id as any });
      toast({
        title: "Project deleted",
        description: "The project has been removed."
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive"
      });
    }
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
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {project.imageUrl && (
                        <div className="relative w-10 h-10 overflow-hidden rounded">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="object-cover w-full h-full"
                            onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=No+Image'}
                          />
                        </div>
                      )}
                      {project.title}
                    </div>
                  </TableCell>
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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Make changes to your project below.' : 'Fill in the details for your new project.'}
            </DialogDescription>

            <div className="flex justify-end space-x-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={togglePreview} 
                className="flex items-center gap-1"
              >
                <EyeIcon className="h-4 w-4" />
                {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>
          </DialogHeader>

          {isPreviewVisible && (
            <div className="border rounded-md p-4 mb-4 bg-secondary/10">
              <h3 className="text-lg font-semibold">{currentProject.title || 'Project Title'}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-2">{currentProject.description || 'Project description will appear here'}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {currentProject.tags.length > 0 ? (
                  currentProject.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No tags added yet</span>
                )}
              </div>
              {currentProject.imageUrl ? (
                <div className="aspect-video max-h-32 overflow-hidden rounded-md mb-3">
                  <img 
                    src={currentProject.imageUrl} 
                    alt={currentProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="bg-muted flex items-center justify-center aspect-video max-h-32 rounded-md mb-3">
                  <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                </div>
              )}
            </div>
          )}

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="details">Basic Details</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                    value={currentProject.title}
                    onChange={handleChange}
                    placeholder="e.g. E-commerce Website"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Short Description <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={currentProject.description}
                    onChange={handleChange}
                    placeholder="Brief summary of the project (1-2 sentences)"
                    rows={3}
                    {currentProject.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button 
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-white/20"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {currentProject.tags.length === 0 && (
                      <span className="text-xs text-muted-foreground">No tags added yet</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Select onValueChange={handleAddTag}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select tag" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMMON_TAGS.map(tag => (
                          <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex gap-2 flex-1">
                      <Input
                        placeholder="Add custom tag"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag(customTag);
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        onClick={() => handleAddTag(customTag)}
                        variant="secondary"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      placeholder="https://github.com/username/repo"
                      value={currentProject.githubUrl || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                      id="liveUrl"
                      name="liveUrl"
                      placeholder="https://example.com"
                      value={currentProject.liveUrl || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="detailedDescription">Detailed Description</Label>
                  <Textarea
                    id="detailedDescription"
                    name="detailedDescription"
                    value={currentProject.detailedDescription || ''}
                    onChange={handleChange}
                    placeholder="Comprehensive description of the project, its purpose, and functionality"
                    rows={5}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="technologies">Technologies Used</Label>
                  <Textarea
                    id="technologies"
                    name="technologies"
                    value={currentProject.technologies || ''}
                    onChange={handleChange}
                    placeholder="Detailed list of technologies, frameworks, and tools used"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="challenges">Challenges</Label>
                    <Textarea
                      id="challenges"
                      name="challenges"
                      value={currentProject.challenges || ''}
                      onChange={handleChange}
                      placeholder="Challenges faced and how they were overcome"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="outcomes">Outcomes</Label>
                    <Textarea
                      id="outcomes"
                      name="outcomes"
                      value={currentProject.outcomes || ''}
                      onChange={handleChange}
                      placeholder="Results and impact of the project"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={currentProject.duration || ''}
                      onChange={handleChange}
                      placeholder="e.g. 3 months"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      value={currentProject.year || ''}
                      onChange={handleChange}
                      placeholder="e.g. 2023"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input
                      id="role"
                      name="role"
                      value={currentProject.role || ''}
                      onChange={handleChange}
                      placeholder="e.g. Lead Developer"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input
                      id="teamSize"
                      name="teamSize"
                      value={currentProject.teamSize || ''}
                      onChange={handleChange}
                      placeholder="e.g. 3"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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

