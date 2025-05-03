
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Separator } from '@/components/ui/separator';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '../theme/ThemeToggle';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`${isMobile 
          ? 'fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-200 ease-in-out ' + 
            (sidebarOpen ? 'translate-x-0' : '-translate-x-full')
          : 'w-64 border-r'}`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Minimal header */}
        <header className="h-16 border-b bg-background/95 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-bold">Portfolio Admin</h1>
          </div>
          <ThemeToggle />
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
