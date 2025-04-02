
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Book,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar = ({ onClose }: AdminSidebarProps = {}) => {
  const isMobile = useIsMobile();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <LayoutDashboard className="h-5 w-5 mr-3" /> 
    },
    { 
      name: 'Projects', 
      path: '/admin/projects', 
      icon: <Briefcase className="h-5 w-5 mr-3" /> 
    },
    { 
      name: 'Messages', 
      path: '/admin/messages', 
      icon: <MessageSquare className="h-5 w-5 mr-3" /> 
    },
    { 
      name: 'Contacts', 
      path: '/admin/contacts', 
      icon: <Users className="h-5 w-5 mr-3" /> 
    },
    { 
      name: 'Journal', 
      path: '/admin/journal', 
      icon: <Book className="h-5 w-5 mr-3" /> 
    },
  ];

  return (
    <aside className="bg-background/50 rounded-lg border p-4 h-full flex flex-col">
      {isMobile && onClose && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Menu</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-4 py-2.5 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`
            }
            end={item.path === '/admin'}
            onClick={isMobile && onClose ? onClose : undefined}
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
