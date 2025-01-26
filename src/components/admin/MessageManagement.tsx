import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen, Clock, Phone, Briefcase } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

type Message = {
  _id: Id<"contacts">;
  _creationTime: number;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  budget: string;
  read: boolean;
};

export function MessageManagement() {
  const messages = useQuery(api.contacts.list) || [];
  const markAsRead = useMutation(api.contacts.markAsRead);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleMarkAsRead = async (id: Id<"contacts">) => {
    await markAsRead({ id });
  };

  return (
    <div className="flex h-[calc(100vh-16rem)]">
      {/* Message List */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Messages</h3>
          <p className="text-sm text-gray-500">
            {messages.filter((m) => !m.read).length} unread
          </p>
        </div>
        {messages.map((message) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 border-b border-gray-200 cursor-pointer ${
              selectedMessage?._id === message._id ? 'bg-indigo-50' : ''
            } hover:bg-gray-50`}
            onClick={() => {
              setSelectedMessage(message);
              if (!message.read) {
                handleMarkAsRead(message._id);
              }
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                {!message.read ? (
                  <Mail className="w-4 h-4 text-indigo-600" />
                ) : (
                  <MailOpen className="w-4 h-4 text-gray-400" />
                )}
                <span className="font-medium">{message.name}</span>
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-500 space-x-2">
              <Clock className="w-3 h-3" />
              <span>{formatDate(message._creationTime)}</span>
              <span>•</span>
              <span>{formatTime(message._creationTime)}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Detail */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {selectedMessage ? (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedMessage.name}</h2>
                  <div className="flex flex-col space-y-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="hover:text-indigo-600"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="hover:text-indigo-600"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{selectedMessage.projectType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Budget:</span>
                      <span className="text-green-600 font-medium">{selectedMessage.budget}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="text-sm text-gray-500 text-right">
                    {formatDate(selectedMessage._creationTime)}
                    <br />
                    {formatTime(selectedMessage._creationTime)}
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Message</h3>
                <p className="whitespace-pre-wrap text-gray-700">{selectedMessage.message}</p>
              </div>
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
