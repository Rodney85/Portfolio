
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Users, 
  MessageCircle,
  BookOpen
} from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <LayoutDashboard className="h-5 w-5 mr-2" /> 
    },
    { 
      name: 'Projects', 
      path: '/admin/projects', 
      icon: <Briefcase className="h-5 w-5 mr-2" /> 
    },
    { 
      name: 'Messages', 
      path: '/admin/messages', 
      icon: <MessageSquare className="h-5 w-5 mr-2" /> 
    },
    { 
      name: 'Contacts', 
      path: '/admin/contacts', 
      icon: <Users className="h-5 w-5 mr-2" /> 
    },
    { 
      name: 'Conversations', 
      path: '/admin/conversations', 
      icon: <MessageCircle className="h-5 w-5 mr-2" /> 
    },
    { 
      name: 'Journal', 
      path: '/admin/journal', 
      icon: <BookOpen className="h-5 w-5 mr-2" /> 
    },
  ];

  return (
    <aside className="bg-background/50 rounded-lg border p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`
            }
            end={item.path === '/admin'}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
