
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Separator } from '@/components/ui/separator';

const AdminLayout = () => {
  return (
    <div className="container-custom py-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Portfolio Admin</h1>
      <Separator className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminSidebar />
        <main className="md:col-span-3 bg-background/50 rounded-lg border p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
