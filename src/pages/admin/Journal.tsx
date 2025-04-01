
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
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  isPublic: boolean;
}

const AdminJournal = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: '',
    title: '',
    content: '',
    tags: [],
    createdAt: new Date().toISOString(),
    isPublic: false
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setCurrentEntry({
      id: '',
      title: '',
      content: '',
      tags: [],
      createdAt: new Date().toISOString(),
      isPublic: false
    });
    setIsEditOpen(true);
  };

  const handleOpenEdit = (entry: JournalEntry) => {
    setIsEditMode(true);
    setCurrentEntry({...entry});
    setIsEditOpen(true);
  };

  const handleOpenView = (entry: JournalEntry) => {
    setCurrentEntry({...entry});
    setIsViewOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setCurrentEntry(prev => ({
      ...prev,
      tags: tagsArray
    }));
  };

  const handlePublicToggle = () => {
    setCurrentEntry(prev => ({
      ...prev,
      isPublic: !prev.isPublic
    }));
  };

  const handleSubmit = () => {
    if (!currentEntry.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your entry.",
        variant: "destructive"
      });
      return;
    }
    
    if (isEditMode) {
      setEntries(prev => 
        prev.map(e => e.id === currentEntry.id ? currentEntry : e)
      );
      toast({
        title: "Journal entry updated",
        description: "Your journal entry has been updated."
      });
    } else {
      // Create a proper unique ID
      const newEntry = {
        ...currentEntry,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };
      setEntries(prev => [...prev, newEntry]);
      toast({
        title: "Journal entry created",
        description: "Your new journal entry has been saved."
      });
    }
    setIsEditOpen(false);
  };

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    toast({
      title: "Journal entry deleted",
      description: "The journal entry has been removed."
    });
  };

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Journal Entries</h2>
        <Button onClick={handleOpenCreate} size={isMobile ? "sm" : "default"}>
          <Plus className={`${isMobile ? "mr-0 h-4 w-4" : "mr-2 h-4 w-4"}`} />
          {!isMobile && "New Entry"}
        </Button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground mb-4">No journal entries yet</p>
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" /> 
            Create Your First Entry
          </Button>
        </div>
      ) : isMobile ? (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium truncate">{entry.title}</h3>
                  <span className={`inline-block ml-2 px-2 py-0.5 rounded text-xs ${
                    entry.isPublic 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    {entry.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{formatDate(entry.createdAt)}</p>
                <p className="text-sm mb-4 line-clamp-2">{truncateContent(entry.content, 80)}</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleOpenView(entry)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleOpenEdit(entry)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-destructive" 
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
                <TableHead>Preview</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell className="max-w-xs">
                    {truncateContent(entry.content, 100)}
                  </TableCell>
                  <TableCell>{formatDate(entry.createdAt)}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      entry.isPublic 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {entry.isPublic ? 'Public' : 'Private'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenView(entry)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleOpenEdit(entry)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-destructive" 
                        onClick={() => handleDelete(entry.id)}
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

      {/* Edit/Create Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Journal Entry' : 'Create New Journal Entry'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Make changes to your journal entry below.' : 'Fill in the details for your new journal entry.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={currentEntry.title}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={currentEntry.content}
                onChange={handleChange}
                rows={isMobile ? 6 : 10}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={currentEntry.tags.join(', ')}
                onChange={handleTagsChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox"
                id="isPublic"
                checked={currentEntry.isPublic}
                onChange={handlePublicToggle}
                className="w-4 h-4"
              />
              <Label htmlFor="isPublic" className="cursor-pointer">Public Entry</Label>
              <span className="text-sm text-muted-foreground ml-2">
                {currentEntry.isPublic ? 'Visible to visitors' : 'Private, only visible to you'}
              </span>
            </div>
          </div>
          <DialogFooter className={isMobile ? "flex-col space-y-2" : ""}>
            <Button variant="outline" onClick={() => setIsEditOpen(false)} className={isMobile ? "w-full" : ""}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className={isMobile ? "w-full" : ""}>
              {isEditMode ? 'Save Changes' : 'Create Entry'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentEntry.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
              <div>{formatDate(currentEntry.createdAt)}</div>
              <div className={`px-2 py-1 rounded ${
                currentEntry.isPublic 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
              }`}>
                {currentEntry.isPublic ? 'Public' : 'Private'}
              </div>
            </div>
            
            <Card>
              <CardContent className="p-4 whitespace-pre-wrap">
                {currentEntry.content}
              </CardContent>
            </Card>
            
            {currentEntry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {currentEntry.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <DialogFooter className={isMobile ? "flex-col space-y-2" : ""}>
            <Button variant="outline" onClick={() => setIsViewOpen(false)} className={isMobile ? "w-full" : ""}>
              Close
            </Button>
            <Button variant="outline" onClick={() => {
              setIsViewOpen(false);
              handleOpenEdit(currentEntry);
            }} className={isMobile ? "w-full" : ""}>
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJournal;
