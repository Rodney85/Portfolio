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
import { Plus, Pencil, Trash2, ExternalLink, Github, Image as ImageIcon, EyeIcon, Calendar, Tag, Laptop, Tablet, Smartphone } from 'lucide-react';
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
import MultiFileUpload from '@/components/ui/multi-file-upload';
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
  
  // State management
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    
    // Device-specific images
    desktopImageUrl: '',
    tabletImageUrl: '',
    mobileImageUrl: '',
    
    // Legacy field
    additionalImages: [] as string[],
    
    tags: [] as string[],
    githubUrl: '',
    liveUrl: '',
    detailedDescription: '',
    technologies: '',
    challenges: '',
    outcomes: '',
    duration: '',
    year: '',
    role: '',
    teamSize: '',
    
    // Storage IDs
    storageId: '', // Storage ID for main/fallback image
    desktopStorageId: '', // Storage ID for desktop image
    tabletStorageId: '', // Storage ID for tablet image
    mobileStorageId: '', // Storage ID for mobile image
    additionalStorageIds: [] as string[], // Legacy field
  });
  const [customTag, setCustomTag] = useState('');
  const [currentTab, setCurrentTab] = useState('details');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  
  // Convex queries and mutations
  const convexProjects = useQuery(api.projects.getAll as any);
  const createProject = useMutation(api.projects.create as any);
  const updateProject = useMutation(api.projects.update as any);
  const deleteProject = useMutation(api.projects.remove as any);
  
  // Effects
  useEffect(() => {
    if (convexProjects) {
      // Convert Convex projects to our ProjectProps format
      const formattedProjects = convexProjects.map(project => ({
        id: project._id,
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl || '',
        additionalImages: project.additionalImages || [],
        tags: project.tags,
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || ''
      }));
      setProjects(formattedProjects);
    }
  }, [convexProjects]);
  
  // Handle main file upload completion
  const handleFileUploaded = (storageId: string) => {
    console.log('Main file uploaded with storage ID:', storageId);
    
    // Store the storageId directly in the project
    setCurrentProject(prev => ({
      ...prev,
      // Store the storage ID for the main image
      storageId: storageId
    }));
  };

  // Handle multiple file uploads completion
  const handleMultipleFilesUploaded = (storageIds: string[]) => {
    console.log('Additional files uploaded with storage IDs:', storageIds);
    console.log('Number of additional files:', storageIds.length);
    
    // Store the additional storageIds in the project
    setCurrentProject(prev => {
      // Ensure we're keeping up to 4 additional images (5 total with main image)
      const limitedIds = storageIds.slice(0, 4);
      console.log('Limited to 4 additional images:', limitedIds);
      
      return {
        ...prev,
        additionalStorageIds: limitedIds
      };
    });
  };
  
  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };
  
  const resetForm = () => {
    setCurrentProject({
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      
      // Device-specific images
      desktopImageUrl: '',
      tabletImageUrl: '',
      mobileImageUrl: '',
      
      // Legacy field
      additionalImages: [] as string[],
      
      tags: [] as string[],
      githubUrl: '',
      liveUrl: '',
      detailedDescription: '',
      technologies: '',
      challenges: '',
      outcomes: '',
      duration: '',
      year: '',
      role: '',
      teamSize: '',
      
      // Storage IDs
      storageId: '', 
      desktopStorageId: '', 
      tabletStorageId: '', 
      mobileStorageId: '', 
      additionalStorageIds: [] as string[], 
    });
    setIsEditMode(false);
    setCurrentTab('details');
    setIsPreviewVisible(false);
  };
  
  const handleNewProject = () => {
    resetForm();
    setIsOpen(true);
  };
  
  const handleEditProject = (project: ProjectProps) => {
    setIsEditMode(true);
    setIsOpen(true);
    
    // Get the full project details from Convex
    const fullProject = convexProjects?.find(p => p._id === project.id);
    
    if (fullProject) {
      setCurrentProject({
        id: fullProject._id,
        title: fullProject.title,
        description: fullProject.description,
        imageUrl: fullProject.imageUrl || '',
        
        // Device-specific images with fallbacks
        desktopImageUrl: fullProject.desktopImageUrl || fullProject.imageUrl || '',
        tabletImageUrl: fullProject.tabletImageUrl || fullProject.imageUrl || '',
        mobileImageUrl: fullProject.mobileImageUrl || fullProject.imageUrl || '',
        
        // Legacy field
        additionalImages: fullProject.additionalImages || [],
        
        tags: fullProject.tags || [],
        githubUrl: fullProject.githubUrl || '',
        liveUrl: fullProject.liveUrl || '',
        detailedDescription: fullProject.detailedDescription || '',
        technologies: fullProject.technologies || '',
        challenges: fullProject.challenges || '',
        outcomes: fullProject.outcomes || '',
        duration: fullProject.duration || '',
        year: fullProject.year || '',
        role: fullProject.role || '',
        teamSize: fullProject.teamSize || '',
        
        // Storage IDs - reset for new uploads if needed
        storageId: '',
        desktopStorageId: '',
        tabletStorageId: '',
        mobileStorageId: '',
        additionalStorageIds: [],
      });
    }
    
    setCurrentTab('details');
    setIsPreviewVisible(false);
  };
  
  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject({ id });
      toast({
        title: "Project deleted",
        description: "The project has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete the project. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = (tag: string) => {
    if (!tag) return;
    
    // Clean up the tag
    const cleanTag = tag.trim();
    
    if (cleanTag && !currentProject.tags.includes(cleanTag)) {
      setCurrentProject(prev => ({
        ...prev,
        tags: [...prev.tags, cleanTag]
      }));
      setCustomTag('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setCurrentProject(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  const handleSubmit = async () => {
    // Validate required fields
    if (!currentProject.title || !currentProject.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Extract only the fields that the Convex schema expects
      const { 
        id, 
        // Storage IDs - we'll handle these differently
        storageId,
        desktopStorageId, 
        tabletStorageId,
        mobileStorageId,
        additionalStorageIds: existingAdditionalStorageIds,
        // Remove all image URL fields to prevent validation errors
        imageUrl: _imageUrl,
        desktopImageUrl: _desktopImageUrl, 
        tabletImageUrl: _tabletImageUrl,
        mobileImageUrl: _mobileImageUrl,
        // Keep all other fields
        ...projectData 
      } = currentProject;
      
      // Store device-specific storage IDs in additionalStorageIds to avoid validator errors
      // We'll use a specific format to identify which is which when we display them
      const additionalStorageIds = [
        ...(desktopStorageId ? [`desktop:${desktopStorageId}`] : []),
        ...(tabletStorageId ? [`tablet:${tabletStorageId}`] : []),
        ...(mobileStorageId ? [`mobile:${mobileStorageId}`] : []),
        ...(existingAdditionalStorageIds || [])
      ];
      
      console.log('Storing device storage IDs in additionalStorageIds:', additionalStorageIds);
      
      if (isEditMode) {
        // Update existing project
        await updateProject({
          id,
          ...projectData,
          // Main image
          storageId, 
          // Store all device-specific images in additionalStorageIds
          additionalStorageIds,
        });
        
        toast({
          title: "Project updated",
          description: "Your project has been successfully updated.",
        });
      } else {
        // Create new project
        await createProject({
          ...projectData,
          // Main image
          storageId,
          // Store all device-specific images in additionalStorageIds
          additionalStorageIds,
        });
        
        toast({
          title: "Project created",
          description: "Your new project has been successfully created.",
        });
      }
      
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} the project. Please try again.`,
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={handleNewProject} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-muted p-3 mb-3">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No projects yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Get started by creating your first project.</p>
            <Button onClick={handleNewProject} variant="default" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map(project => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="max-w-sm">{project.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-md hover:bg-accent"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-md hover:bg-accent"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditProject(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-destructive hover:text-destructive"
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
              <TabsTrigger value="images">Images</TabsTrigger>
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
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-1 mb-2">
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

            <TabsContent value="images" className="space-y-6 py-4">
              <div className="grid gap-6">
                {/* Main fallback image section removed as requested */}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Desktop image upload */}
                  <div className="space-y-2 border rounded-lg p-4">
                    <Label className="flex items-center gap-2">
                      <Laptop className="h-4 w-4" /> <span className="font-medium">Desktop View</span>
                    </Label>
                    <div className="text-xs text-muted-foreground mb-3">Optimized for desktop/laptop displays (16:10 ratio)</div>
                    <FileUpload 
                      onFileUploaded={(storageId) => {
                        console.log('Desktop image uploaded with ID:', storageId);
                        setCurrentProject(prev => ({
                          ...prev,
                          desktopStorageId: storageId
                        }));
                      }} 
                    />
                    {currentProject.desktopImageUrl && (
                      <p className="text-xs text-muted-foreground mt-2">Current: {currentProject.desktopImageUrl.split('/').pop()}</p>
                    )}
                  </div>

                  {/* Tablet image upload */}
                  <div className="space-y-2 border rounded-lg p-4">
                    <Label className="flex items-center gap-2">
                      <Tablet className="h-4 w-4" /> <span className="font-medium">Tablet View</span>
                    </Label>
                    <div className="text-xs text-muted-foreground mb-3">Optimized for tablet displays (4:3 ratio)</div>
                    <FileUpload 
                      onFileUploaded={(storageId) => {
                        console.log('Tablet image uploaded with ID:', storageId);
                        setCurrentProject(prev => ({
                          ...prev,
                          tabletStorageId: storageId
                        }));
                      }} 
                    />
                    {currentProject.tabletImageUrl && (
                      <p className="text-xs text-muted-foreground mt-2">Current: {currentProject.tabletImageUrl.split('/').pop()}</p>
                    )}
                  </div>

                  {/* Mobile image upload */}
                  <div className="space-y-2 border rounded-lg p-4">
                    <Label className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" /> <span className="font-medium">Mobile View</span>
                    </Label>
                    <div className="text-xs text-muted-foreground mb-3">Optimized for mobile displays (9:16 ratio)</div>
                    <FileUpload 
                      onFileUploaded={(storageId) => {
                        console.log('Mobile image uploaded with ID:', storageId);
                        setCurrentProject(prev => ({
                          ...prev,
                          mobileStorageId: storageId
                        }));
                      }} 
                    />
                    {currentProject.mobileImageUrl && (
                      <p className="text-xs text-muted-foreground mt-2">Current: {currentProject.mobileImageUrl.split('/').pop()}</p>
                    )}
                  </div>
                </div>
                
                <div className="rounded-lg border border-dashed p-4 bg-muted/50">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                    Device-Specific Images
                  </h3>
                  <p className="text-xs text-muted-foreground">Upload optimized images for each device view (desktop, tablet, and mobile). Each device type has a recommended aspect ratio for optimal display in the project showcase.</p>
                </div>
              </div>
            </TabsContent>

            {/* Advanced tab has been removed as requested */}
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
