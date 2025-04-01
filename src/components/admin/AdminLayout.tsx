
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Separator } from '@/components/ui/separator';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="container-custom py-4 md:py-6 min-h-screen">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Portfolio Admin</h1>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      <Separator className="mb-4 md:mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <div className={`${isMobile ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity ' + (sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none') : ''}`}>
          <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background p-4 shadow-lg transition-transform ' + (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''}`}>
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
        {!isMobile && <AdminSidebar />}
        <main className="md:col-span-3 bg-background/50 rounded-lg border p-4 md:p-6 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
