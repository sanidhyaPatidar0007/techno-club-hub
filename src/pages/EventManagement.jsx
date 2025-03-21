import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, PlusCircle, Users, Image as ImageIcon, Upload } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const EventManagement = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventPhoto, setEventPhoto] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("File size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventPhoto(reader.result);
        toast.success("Photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const viewEventDetails = (event) => {
    setSelectedEvent(event);
  };

  const actionButtons = (
    <Button size="sm">
      <PlusCircle className="mr-2 h-4 w-4" />
      Create Event
    </Button>
  );

  return (
    <PageLayout 
      title="Event Management" 
      description="Plan, schedule, and manage your club events"
      backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10"
      actions={actionButtons}
    >
      {selectedEvent ? (
        <EventDetails 
          event={selectedEvent} 
          onBack={() => setSelectedEvent(null)} 
          eventPhoto={eventPhoto}
          onPhotoUpload={handleFileChange}
        />
      ) : (
        <>
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
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm">
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
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => viewEventDetails(event)}
                        >
                          View Details
                        </Button>
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
                <Card key={index} className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm">
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
        </>
      )}
    </PageLayout>
  );
};

// Event Details Component
const EventDetails = ({ event, onBack, eventPhoto, onPhotoUpload }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{event.title}</h2>
        <Badge variant={
          event.type === 'Workshop' ? 'secondary' : 
          event.type === 'Meeting' ? 'default' : 
          'outline'
        }>
          {event.type}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Event Details</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Date:</span>
                <span className="ml-2">{event.date}</span>
              </div>
              {event.time && (
                <div className="flex items-center text-sm">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium">Time:</span>
                  <span className="ml-2">{event.time}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{event.location}</span>
                </div>
              )}
              <div className="flex items-center text-sm">
                <Users className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Attendees:</span>
                <span className="ml-2">{event.attendees} {event.attendees ? 'registered' : 'attended'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-sm text-gray-600">
              {event.description || "Join us for this exciting event! More details will be shared with the registered participants."}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-2">Event Photo</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            {eventPhoto ? (
              <div className="relative">
                <img 
                  src={eventPhoto} 
                  alt="Event" 
                  className="w-full h-48 object-cover rounded-md"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute bottom-2 right-2"
                  onClick={() => document.getElementById('photo-upload').click()}
                >
                  Change Photo
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-sm text-gray-500 mb-2">No photo uploaded yet</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => document.getElementById('photo-upload').click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
            )}
            <Input 
              id="photo-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={onPhotoUpload}
            />
          </div>
          
          <div className="flex flex-col space-y-3 mt-6">
            <Button>Register for Event</Button>
            <Button variant="outline" onClick={onBack}>Back to Events</Button>
          </div>
        </div>
      </div>
    </motion.div>
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
    attendees: 18,
    description: 'Learn the fundamentals of web development in this hands-on workshop. We will cover HTML, CSS, and basic JavaScript. Bring your laptop and be ready to code along!'
  },
  {
    title: 'Project Planning Meeting',
    type: 'Meeting',
    date: 'May 17, 2023',
    time: '4:30 PM - 6:00 PM',
    location: 'Virtual (Zoom)',
    attendees: 12,
    description: 'Join us to plan our upcoming projects for the semester. We will discuss timelines, resources, and assign responsibilities to team members.'
  },
  {
    title: 'Tech Talk: AI in Healthcare',
    type: 'Seminar',
    date: 'May 20, 2023',
    time: '5:00 PM - 6:30 PM',
    location: 'Auditorium A',
    attendees: 32,
    description: 'A fascinating discussion on how artificial intelligence is transforming healthcare. Our guest speaker, Dr. Meenakshi Sharma, will share insights from her research.'
  }
];

const pastEvents = [
  {
    title: 'Introduction to Python',
    type: 'Workshop',
    date: 'April 25, 2023',
    attendees: 24,
    description: 'A beginner-friendly introduction to Python programming. Participants learned about variables, data types, control flow, and basic algorithms.'
  },
  {
    title: 'Executive Board Meeting',
    type: 'Meeting',
    date: 'April 20, 2023',
    attendees: 8,
    description: 'The executive board met to discuss club finances, membership growth strategies, and upcoming events for the next semester.'
  },
  {
    title: 'Industry Expert Panel',
    type: 'Seminar',
    date: 'April 15, 2023',
    attendees: 45,
    description: 'A panel discussion featuring experts from Infosys, TCS, and Wipro sharing insights about technology trends and career opportunities.'
  }
];

export default EventManagement;
