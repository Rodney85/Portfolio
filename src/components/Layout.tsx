import { Navbar } from './Navbar';
import { Toaster } from 'sonner';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#171738] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <Navbar />
        {/* Page Content */}
        {children}
        <Toaster richColors />
      </div>
    </div>
  );
}
