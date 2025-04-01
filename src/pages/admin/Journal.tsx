
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
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

// Mock journal entries data
const mockJournalEntries = [
  {
    id: '1',
    title: 'Reflections on My Latest Project',
    content: 'Today I completed the e-commerce platform for XYZ Corp. It was a challenging project that pushed me to learn new technologies, particularly in the area of payment processing and real-time inventory management.\n\nKey learnings:\n1. Stripe\'s webhook implementation for subscription management\n2. Optimistic UI updates for better user experience\n3. Server-side rendering strategies for performance\n\nI\'m particularly proud of the checkout process I designed, which reduced cart abandonment by 23% according to initial analytics.',
    tags: ['Project Completion', 'E-commerce', 'Learning'],
    createdAt: '2023-06-15T14:30:00Z',
    isPublic: false
  },
  {
    id: '2',
    title: 'Exploring New Web Animation Techniques',
    content: 'Spent the day diving into Framer Motion and GSAP to improve my animation skills. I created several prototypes with different animation approaches to see which ones provide the best balance of performance and visual appeal.\n\nFramer Motion seems more intuitive for React projects, while GSAP offers more fine-grained control. Will continue experimenting with both.',
    tags: ['Animation', 'Learning', 'Framer Motion', 'GSAP'],
    createdAt: '2023-06-10T09:15:00Z',
    isPublic: true
  },
  {
    id: '3',
    title: 'Client Meeting Notes - ABC Project',
    content: 'Met with the ABC team to discuss their project requirements. They need a new dashboard for their internal team to monitor marketing campaigns.\n\nRequirements:\n- Real-time data visualization\n- Campaign performance comparisons\n- Export functionality for reports\n- User role management\n\nNext steps: Create wireframes by next Friday and schedule a follow-up meeting.',
    tags: ['Client Meeting', 'Dashboard', 'Planning'],
    createdAt: '2023-06-05T11:45:00Z',
    isPublic: false
  },
];

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
  const [entries, setEntries] = useState<JournalEntry[]>(mockJournalEntries);
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
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
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
    if (isEditMode) {
      setEntries(prev => 
        prev.map(e => e.id === currentEntry.id ? currentEntry : e)
      );
      toast({
        title: "Journal entry updated",
        description: "Your journal entry has been updated."
      });
    } else {
      // In a real app, we would generate a proper unique ID
      const newEntry = {
        ...currentEntry,
        id: Date.now().toString(),
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
        <h2 className="text-2xl font-bold">Journal Entries</h2>
        <Button onClick={handleOpenCreate}>
          <Plus className="mr-2 h-4 w-4" /> New Entry
        </Button>
      </div>

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

      {/* Edit/Create Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Journal Entry' : 'Create New Journal Entry'}
            </DialogTitle>
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
                rows={10}
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
              <Label htmlFor="isPublic" className="cursor-pointer">Public Entry</Label>
              <input 
                type="checkbox"
                id="isPublic"
                checked={currentEntry.isPublic}
                onChange={handlePublicToggle}
                className="w-4 h-4"
              />
              <span className="text-sm text-muted-foreground ml-2">
                {currentEntry.isPublic ? 'Visible to visitors' : 'Private, only visible to you'}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {isEditMode ? 'Save Changes' : 'Create Entry'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[700px]">
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
            <Button variant="outline" onClick={() => {
              setIsViewOpen(false);
              handleOpenEdit(currentEntry);
            }}>
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJournal;
