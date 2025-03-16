
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, PlusCircle, Users } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const EventManagement = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar isExpanded={sidebarExpanded} toggleSidebar={toggleSidebar} />

      <PageTransition>
        <main className={`pt-24 transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}>
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-bold">Event Management</h1>
                <p className="text-muted-foreground mt-1">Plan, schedule, and manage your club events</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center mt-4 md:mt-0 gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </motion.div>
            </div>
            
            {/* Upcoming Events */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className={`w-full h-2 ${
                      event.type === 'Workshop' ? 'bg-purple-500' : 
                      event.type === 'Meeting' ? 'bg-blue-500' : 
                      'bg-green-500'
                    }`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge variant={
                          event.type === 'Workshop' ? 'secondary' : 
                          event.type === 'Meeting' ? 'default' : 
                          'outline'
                        }>
                          {event.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{event.attendees} attendees</span>
                        </div>
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
            
            {/* Past Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Past Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <Card key={index} className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                    <div className={`w-full h-2 ${
                      event.type === 'Workshop' ? 'bg-purple-500' : 
                      event.type === 'Meeting' ? 'bg-blue-500' : 
                      'bg-green-500'
                    }`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{event.attendees} attended</span>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">Analytics</Button>
                          <Button variant="outline" size="sm" className="flex-1">Feedback</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

// Sample data
const upcomingEvents = [
  {
    title: 'Web Development Workshop',
    type: 'Workshop',
    date: 'May 15, 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Room 302, Tech Building',
    attendees: 18
  },
  {
    title: 'Project Planning Meeting',
    type: 'Meeting',
    date: 'May 17, 2023',
    time: '4:30 PM - 6:00 PM',
    location: 'Virtual (Zoom)',
    attendees: 12
  },
  {
    title: 'Tech Talk: AI in Healthcare',
    type: 'Seminar',
    date: 'May 20, 2023',
    time: '5:00 PM - 6:30 PM',
    location: 'Auditorium A',
    attendees: 32
  }
];

const pastEvents = [
  {
    title: 'Introduction to Python',
    type: 'Workshop',
    date: 'April 25, 2023',
    attendees: 24
  },
  {
    title: 'Executive Board Meeting',
    type: 'Meeting',
    date: 'April 20, 2023',
    attendees: 8
  },
  {
    title: 'Industry Expert Panel',
    type: 'Seminar',
    date: 'April 15, 2023',
    attendees: 45
  }
];

export default EventManagement;
