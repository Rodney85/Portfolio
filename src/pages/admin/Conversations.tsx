
import React, { useState } from 'react';
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
  DialogFooter
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';

// Mock AI conversations data
const mockConversations = [
  {
    id: '1',
    user: 'visitor123',
    topic: 'Portfolio Inquiry',
    messages: [
      { role: 'user', content: 'Hi, can you tell me about your web development services?', timestamp: '2023-06-15T14:30:00Z' },
      { role: 'ai', content: 'Hello! I offer a range of web development services including front-end development with React, back-end development with Node.js, and full-stack applications. Would you like to know more about a specific area?', timestamp: '2023-06-15T14:30:10Z' },
      { role: 'user', content: 'What are your rates for a small business website?', timestamp: '2023-06-15T14:31:00Z' },
      { role: 'ai', content: 'For small business websites, my rates typically start at $2,000 for a basic site with 5-7 pages. The exact cost depends on your specific needs, desired features, and timeline. Would you like to discuss your project requirements in more detail?', timestamp: '2023-06-15T14:31:15Z' },
    ],
    createdAt: '2023-06-15T14:30:00Z',
    lastUpdated: '2023-06-15T14:31:15Z'
  },
  {
    id: '2',
    user: 'prospect456',
    topic: 'Project Collaboration',
    messages: [
      { role: 'user', content: 'I need help with a React project. Are you available?', timestamp: '2023-06-14T10:15:00Z' },
      { role: 'ai', content: 'Yes, I am currently taking on new React projects. Could you share more details about what you\'re looking to build?', timestamp: '2023-06-14T10:15:12Z' },
      { role: 'user', content: 'We need to build a dashboard for our SaaS product.', timestamp: '2023-06-14T10:16:00Z' },
      { role: 'ai', content: 'That sounds interesting! For a SaaS dashboard, I would typically use React with a state management solution like Redux or Context API, along with a charting library like Recharts or Chart.js. What kind of metrics and features would your dashboard need to display?', timestamp: '2023-06-14T10:16:22Z' },
    ],
    createdAt: '2023-06-14T10:15:00Z',
    lastUpdated: '2023-06-14T10:16:22Z'
  },
  {
    id: '3',
    user: 'client789',
    topic: 'Website Maintenance',
    messages: [
      { role: 'user', content: 'Our website is loading slowly. Can you help optimize it?', timestamp: '2023-06-13T09:45:00Z' },
      { role: 'ai', content: 'I\'d be happy to help optimize your website. Slow loading times can be caused by several factors including large image files, unoptimized code, or server issues. Could you share your website URL so I can take a look?', timestamp: '2023-06-13T09:45:18Z' },
      { role: 'user', content: 'It\'s www.example.com', timestamp: '2023-06-13T09:46:00Z' },
      { role: 'ai', content: 'Thank you. I\'ll analyze your website and provide some optimization recommendations. This typically takes about 24-48 hours for a thorough analysis. I\'ll reach out once I have some specific suggestions for improving your site speed.', timestamp: '2023-06-13T09:46:15Z' },
    ],
    createdAt: '2023-06-13T09:45:00Z',
    lastUpdated: '2023-06-13T09:46:15Z'
  }
];

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  user: string;
  topic: string;
  messages: Message[];
  createdAt: string;
  lastUpdated: string;
}

const AdminConversations = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setConversations(conversations.filter(conversation => conversation.id !== id));
    toast({
      title: "Conversation deleted",
      description: "The AI conversation has been removed."
    });
  };

  const viewConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">AI Assistant Conversations</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Messages</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conversations.map((conversation) => (
            <TableRow key={conversation.id}>
              <TableCell className="font-medium">{conversation.user}</TableCell>
              <TableCell>{conversation.topic}</TableCell>
              <TableCell>{conversation.messages.length}</TableCell>
              <TableCell>{formatDate(conversation.lastUpdated)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => viewConversation(conversation)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-destructive"
                    onClick={() => handleDelete(conversation.id)}
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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {selectedConversation?.topic} - Conversation with {selectedConversation?.user}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Started: {selectedConversation ? formatDate(selectedConversation.createdAt) : ''}
              </p>
            </div>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {selectedConversation?.messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <div className={`bg-${message.role === 'user' ? 'primary' : 'muted'}-foreground h-full w-full flex items-center justify-center text-xs`}>
                            {message.role === 'user' ? 'U' : 'AI'}
                          </div>
                        </Avatar>
                        <span className="text-xs">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
            {selectedConversation && (
              <Button 
                variant="destructive"
                onClick={() => {
                  handleDelete(selectedConversation.id);
                  setIsDialogOpen(false);
                }}
              >
                Delete Conversation
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminConversations;
