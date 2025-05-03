
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
import { Eye, Trash2, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

// Message interface
interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);
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

  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      
      {messages.length > 0 ? (
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
      ) : (
        <div className="text-center py-10 border rounded-lg bg-background/50">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">No messages yet</h3>
          <p className="text-muted-foreground mb-4">
            When you receive messages from your contact form, they will appear here.
          </p>
        </div>
      )}

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
