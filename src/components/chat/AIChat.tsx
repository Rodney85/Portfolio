
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! How can I help you with your project today?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulated response
    simulateAIResponse(inputMessage);
  };



  const simulateAIResponse = (message: string) => {
    setTimeout(() => {
      const aiResponse = getSimulatedResponse(message);
      
      const assistantMsg: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  // Simple response simulation - provides helpful responses based on user input
  const getSimulatedResponse = (message: string): string => {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! How can I help you with your project today?";
    } else if (message.includes('mobile') || message.includes('app')) {
      return "I specialize in creating custom mobile apps for iOS and Android using React Native. Would you like to know more about my mobile development services?";
    } else if (message.includes('web') || message.includes('website')) {
      return "I build responsive web applications using React and Next.js. These are optimized for performance and provide an excellent user experience. What kind of web project are you considering?";
    } else if (message.includes('landing page')) {
      return "My landing pages are designed to convert visitors into customers with clear messaging and strategic CTA placement. Would you like to see some examples of my landing page work?";
    } else if (message.includes('automation') || message.includes('ai') || message.includes('workflow')) {
      return "I create custom automation workflows using n8n and make.com that save time and reduce manual work. How are you looking to automate your business processes?";
    } else if (message.includes('cost') || message.includes('price') || message.includes('quote')) {
      return "Project costs vary based on requirements, complexity, and timeline. I'd be happy to provide a personalized quote after we discuss your specific needs. Would you like to schedule a consultation call?";
    } else if (message.includes('timeline') || message.includes('how long')) {
      return "Project timelines depend on the scope and complexity. A simple landing page might take 1-2 weeks, while a full-featured mobile app could take 2-3 months. Let's discuss your project to provide a more accurate timeline.";
    } else {
      return "Thanks for your message! To better assist you with your project, could you provide more details about what you're looking to build? Or you can reach out directly through the contact form for a more detailed discussion.";
    }
  };



  return (
    <div className="flex flex-col h-[600px] border border-border rounded-lg overflow-hidden bg-background">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 flex gap-2 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary border border-border/50'
                }`}
              >
                <div className="mt-1 shrink-0">
                  {message.sender === 'user' 
                    ? <User className="h-4 w-4" /> 
                    : <Bot className="h-4 w-4" />
                  }
                </div>
                <div>
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Intl.DateTimeFormat('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing indicator */}
        {isTyping && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-secondary rounded-lg px-4 py-2 flex items-center gap-2 border border-border/50">
              <Bot className="h-4 w-4" />
              <span className="animate-pulse">Typing...</span>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={isTyping || !inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
