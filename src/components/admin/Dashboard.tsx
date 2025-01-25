import { useState } from 'react';
import { 
  FolderKanban, 
  MessageSquare, 
  BarChart3,
  LogOut
} from 'lucide-react';
import { ProjectManagement } from './ProjectManagement';
import { MessageManagement } from './MessageManagement';

type Tab = 'projects' | 'messages' | 'analytics';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  const handleLogout = () => {
    localStorage.removeItem('admin_credentials');
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-800"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('projects')}
              className={`${
                activeTab === 'projects'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
            >
              <FolderKanban className="w-5 h-5 mr-2" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`${
                activeTab === 'messages'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Messages
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`${
                activeTab === 'analytics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Analytics
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'projects' && <ProjectManagement />}
          {activeTab === 'messages' && <MessageManagement />}
          {activeTab === 'analytics' && (
            <div className="text-center text-gray-500 py-8">
              Analytics feature coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
