
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

// Mock message data
const mockMessages = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Website Design Inquiry',
    message: 'I am interested in hiring you for our company website redesign project. Can we schedule a call to discuss the details?',
    createdAt: '2023-06-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    subject: 'Collaboration Opportunity',
    message: 'I came across your portfolio and I\'m impressed with your work. I have a project that I think would be a great fit for your skills. Let me know if you\'re interested in collaborating.',
    createdAt: '2023-06-14T10:15:00Z'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    subject: 'Job Opportunity',
    message: 'We have an open position at our tech startup that seems perfect for someone with your background. Would you be interested in discussing this opportunity?',
    createdAt: '2023-06-13T09:45:00Z'
  },
];

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = React.useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = React.useState<typeof mockMessages[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
    toast({
      title: "Message deleted",
      description: "The message has been removed."
    });
  };

  const viewMessage = (message: typeof mockMessages[0]) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell className="font-medium">{message.name}</TableCell>
              <TableCell>{message.email}</TableCell>
              <TableCell className="max-w-xs truncate">{message.subject}</TableCell>
              <TableCell>{formatDate(message.createdAt)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => viewMessage(message)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-destructive"
                    onClick={() => handleDelete(message.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">From:</p>
                <p>{selectedMessage?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Email:</p>
                <p>{selectedMessage?.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Date:</p>
              <p>{selectedMessage ? formatDate(selectedMessage.createdAt) : ''}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Message:</p>
              <div className="bg-muted/30 p-4 rounded-md mt-1">
                <p>{selectedMessage?.message}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
            {selectedMessage && (
              <Button 
                variant="destructive"
                onClick={() => {
                  handleDelete(selectedMessage.id);
                  setIsDialogOpen(false);
                }}
              >
                Delete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
