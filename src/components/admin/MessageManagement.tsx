import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen, Trash2, Clock } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  budget: string;
  status: 'read' | 'unread';
  createdAt: string;
};

export function MessageManagement() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    setMessages(storedMessages);
  }, []);

  const markAsRead = (id: string) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, status: 'read' as const } : msg
    );
    localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  const deleteMessage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updatedMessages = messages.filter((msg) => msg.id !== id);
      localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex h-[calc(100vh-16rem)]">
      {/* Message List */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Messages</h3>
          <p className="text-sm text-gray-500">
            {messages.filter((m) => m.status === 'unread').length} unread
          </p>
        </div>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 border-b border-gray-200 cursor-pointer ${
              selectedMessage?.id === message.id ? 'bg-indigo-50' : ''
            } hover:bg-gray-50`}
            onClick={() => setSelectedMessage(message)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                {message.status === 'unread' ? (
                  <Mail className="w-4 h-4 text-indigo-600 mr-2" />
                ) : (
                  <MailOpen className="w-4 h-4 text-gray-400 mr-2" />
                )}
                <h4 className="font-medium">{message.name}</h4>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {formatDate(message.createdAt)}
              </div>
            </div>
            <p className="text-sm text-gray-600 truncate">{message.message}</p>
          </motion.div>
        ))}
      </div>

      {/* Message Detail */}
      <div className="flex-1 overflow-y-auto">
        {selectedMessage ? (
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedMessage.name}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="hover:text-indigo-600"
                  >
                    {selectedMessage.email}
                  </a>
                  <span>•</span>
                  <span>{formatDate(selectedMessage.createdAt)}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {selectedMessage.status === 'unread' && (
                  <button
                    onClick={() => markAsRead(selectedMessage.id)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md"
                  >
                    <MailOpen className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Project Budget
              </div>
              <div className="text-lg font-medium">{selectedMessage.budget}</div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-medium mb-2">Message</h3>
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a message to view details
          </div>
        )}
      </div>
    </div>
  );
}
