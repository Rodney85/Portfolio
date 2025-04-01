
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const AdminLink = () => {
  return (
    <Link to="/admin">
      <Button variant="ghost" size="sm" className="gap-2">
        <Shield className="h-4 w-4" />
        <span className="hidden sm:inline">Admin</span>
      </Button>
    </Link>
  );
};

export default AdminLink;
