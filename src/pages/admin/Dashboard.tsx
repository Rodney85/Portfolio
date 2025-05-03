
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MessageSquare, Users, Book } from 'lucide-react';

const AdminDashboard = () => {
  // Set all initial counts to zero - will be populated by real data later
  const counts = {
    projects: 0,  // No projects by default
    messages: 0,  // No messages by default
    contacts: 0,  // No contacts by default
    journalEntries: 0  // No journal entries by default
  };

  const statsCards = [
    {
      title: "Total Projects",
      value: counts.projects,
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      link: "/admin/projects"
    },
    {
      title: "Messages",
      value: counts.messages,
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      link: "/admin/messages"
    },
    {
      title: "Contacts",
      value: counts.contacts,
      icon: <Users className="h-8 w-8 text-primary" />,
      link: "/admin/contacts"
    },
    {
      title: "Journal Entries",
      value: counts.journalEntries,
      icon: <Book className="h-8 w-8 text-primary" />,
      link: "/admin/journal"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((card) => (
          <Card key={card.title} className="border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <a href={card.link} className="text-primary hover:underline">
                  View all
                </a>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Welcome to your portfolio admin dashboard. This is where you can manage all your
              projects, messages, contacts, and journal entries.
            </p>
            <p className="text-muted-foreground mt-2">
              Use the navigation on the left to access different sections.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

