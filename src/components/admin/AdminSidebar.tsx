import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  BarChart,
  X,
  LogOut,
  Settings,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar = ({ onClose }: AdminSidebarProps = {}) => {
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    // Redirect happens automatically via AuthGuard
  };

  const mainNavItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'Projects', 
      path: '/admin/projects', 
      icon: <Briefcase className="h-5 w-5" /> 
    },
    { 
      name: 'Messages', 
      path: '/admin/messages', 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
    { 
      name: 'Analytics', 
      path: '/admin/analytics', 
      icon: <BarChart className="h-5 w-5" /> 
    },
  ];

  const utilityNavItems = [
    { 
      name: 'Settings', 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
    { 
      name: 'View Site', 
      path: '/', 
      icon: <LogOut className="h-5 w-5" />,
      external: true
    },
  ];

  const NavItem = ({ item, onClick }: { item: any, onClick?: () => void }) => (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) => 
        `flex items-center px-4 py-2.5 rounded-md transition-colors ${
          isActive && !item.external
            ? 'bg-primary text-primary-foreground font-medium' 
            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
        }`
      }
      end={item.path === '/admin'}
      onClick={onClick}
    >
      <span className="mr-3">{item.icon}</span>
      <span>{item.name}</span>
    </NavLink>
  );

  return (
    <aside className="flex flex-col h-full bg-background">
      {/* Logo/Brand section */}
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl bg-gradient-to-r from-tech-purple to-orange-500 bg-clip-text text-transparent">
            Dexor
          </span>
        </Link>
      </div>
      
      {/* Mobile close button */}
      {isMobile && onClose && (
        <div className="flex justify-end p-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      {/* Scrollable navigation area */}
      <ScrollArea className="flex-1 py-2">
        <div className="px-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mx-4 mb-2">Main</div>
          <nav className="space-y-1 mb-6">
            {mainNavItems.map((item) => (
              <NavItem 
                key={item.path}
                item={item} 
                onClick={isMobile && onClose ? onClose : undefined} 
              />
            ))}
          </nav>
          
          <Separator className="my-4" />
          
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mx-4 mb-2">Utilities</div>
          <nav className="space-y-1">
            {utilityNavItems.map((item) => (
              <NavItem 
                key={item.path}
                item={item} 
                onClick={isMobile && onClose ? onClose : undefined} 
              />
            ))}
          </nav>
        </div>
      </ScrollArea>
      
      {/* User section */}
      <div className="p-4 border-t mt-auto">
        <div className="mt-auto flex items-center gap-2 py-4 px-3 border-t">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users size={16} className="text-primary" />
            </div>
          </div>
          <div className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-medium">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
