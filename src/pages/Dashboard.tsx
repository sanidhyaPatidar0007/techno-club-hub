
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  Users, 
  Clock,
  PlusCircle,
  TrendingUp,
  Bell,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import PageTransition from '@/components/PageTransition';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {!isMobile && <Sidebar isExpanded={sidebarExpanded} toggleSidebar={toggleSidebar} />}

      <PageTransition>
        <main className={`pt-24 transition-all duration-300 ${!isMobile && sidebarExpanded ? 'ml-64' : !isMobile && !sidebarExpanded ? 'ml-20' : 'ml-0'}`}>
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, Jason</h1>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">Here's what's happening with your tech clubs today.</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center mt-4 md:mt-0 gap-2 sm:gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Button size={isMobile ? "sm" : "sm"} variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  {!isMobile && "Activity Log"}
                </Button>
                <Button size={isMobile ? "sm" : "sm"}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {!isMobile && "New Event"}
                </Button>
              </motion.div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-3 sm:pb-2">
                      <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <div className={`p-1 rounded-full ${stat.iconBg}`}>
                        {stat.icon}
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                      <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs flex items-center mt-1">
                        <span className={`${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                          {stat.trend === 'up' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                            </svg>
                          }
                          {stat.changeValue}
                        </span>
                        <span className="text-muted-foreground ml-1">vs last month</span>
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Upcoming Events */}
              <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                    <div>
                      <CardTitle className="text-base sm:text-lg">Upcoming Events</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Events in the next 14 days</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/events">View all</Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <div className="space-y-4 sm:space-y-6">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-10 sm:w-12 text-center">
                            <div className="font-bold text-base sm:text-lg text-primary">{event.day}</div>
                            <div className="text-xs text-muted-foreground uppercase">{event.month}</div>
                          </div>
                          <div className="ml-2 sm:ml-4 flex-1 border-l pl-2 sm:pl-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <h4 className="font-semibold text-sm sm:text-base">{event.title}</h4>
                              <span className={`mt-1 sm:mt-0 inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                event.type === 'Workshop' ? 'bg-purple-100 text-purple-800' :
                                event.type === 'Meeting' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {event.type}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{event.time} • {event.location}</p>
                            <div className="flex items-center mt-2">
                              <div className="flex -space-x-2">
                                {[...Array(3)].map((_, i) => (
                                  <Avatar key={i} className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-background">
                                    <AvatarFallback className="text-xs">{`U${i+1}`}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground ml-2">+{event.attendees} attending</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Club Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Card className="h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Club Activity</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Recent updates from your clubs</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <div className="space-y-3 sm:space-y-5">
                      {activities.slice(0, isMobile ? 2 : 4).map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0">
                            <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                              <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="ml-2 sm:ml-3">
                            <p className="text-xs sm:text-sm">
                              <span className="font-medium">{activity.user.name}</span>
                              <span className="text-muted-foreground"> {activity.action}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                      <h4 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Your Credits</h4>
                      <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
                        <span>450 / 1000 points</span>
                        <span className="text-primary font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-1.5 sm:h-2" />
                      <p className="text-xs text-muted-foreground mt-2">Earn 550 more credits to reach Gold tier</p>
                      
                      <Button size="sm" variant="outline" className="w-full mt-3 sm:mt-4 text-xs sm:text-sm">
                        <TrendingUp className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        View Credit History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Resources and Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Resources */}
              <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                    <div>
                      <CardTitle className="text-base sm:text-lg">Recent Resources</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Latest shared documents and files</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/resources">Browse All</Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <div className="space-y-3 sm:space-y-4">
                      {resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center ${
                              resource.type === 'PDF' ? 'bg-red-100 text-red-600' :
                              resource.type === 'PPT' ? 'bg-orange-100 text-orange-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <div className="ml-3 sm:ml-4">
                              <h4 className="text-xs sm:text-sm font-medium">{resource.name}</h4>
                              <p className="text-xs text-muted-foreground">{resource.size} • {resource.date}</p>
                            </div>
                          </div>
                          <button className="text-gray-500 hover:text-gray-700">
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Tasks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Pending Tasks</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Your upcoming to-dos</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <div className="space-y-3 sm:space-y-4">
                      {tasks.slice(0, isMobile ? 3 : 4).map((task, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 pt-1">
                            <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                          </div>
                          <div className="ml-2 sm:ml-3">
                            <h4 className={`text-xs sm:text-sm font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">Due {task.dueDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 sm:mt-6">
                      <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                        <PlusCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Add New Task
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

// Sample data
const stats = [
  {
    title: 'Total Members',
    value: '1,274',
    iconBg: 'bg-blue-100 text-blue-600',
    icon: <Users className="h-4 w-4" />,
    trend: 'up',
    changeValue: '12%'
  },
  {
    title: 'Events This Month',
    value: '12',
    iconBg: 'bg-green-100 text-green-600',
    icon: <Calendar className="h-4 w-4" />,
    trend: 'up',
    changeValue: '8%'
  },
  {
    title: 'Resources Shared',
    value: '341',
    iconBg: 'bg-yellow-100 text-yellow-600',
    icon: <FileText className="h-4 w-4" />,
    trend: 'up',
    changeValue: '24%'
  },
  {
    title: 'Your Credits',
    value: '450',
    iconBg: 'bg-purple-100 text-purple-600',
    icon: <TrendingUp className="h-4 w-4" />,
    trend: 'up',
    changeValue: '18%'
  }
];

const upcomingEvents = [
  {
    title: 'Web Development Workshop',
    type: 'Workshop',
    day: '15',
    month: 'May',
    time: '3:00 PM - 5:00 PM',
    location: 'Room 302, Tech Building',
    attendees: 18
  },
  {
    title: 'Project Planning Meeting',
    type: 'Meeting',
    day: '17',
    month: 'May',
    time: '4:30 PM - 6:00 PM',
    location: 'Virtual (Zoom)',
    attendees: 12
  },
  {
    title: 'Tech Talk: AI in Healthcare',
    type: 'Seminar',
    day: '20',
    month: 'May',
    time: '5:00 PM - 6:30 PM',
    location: 'Auditorium A',
    attendees: 32
  }
];

const activities = [
  {
    user: {
      name: 'Emily Chen',
      initials: 'EC'
    },
    action: 'uploaded a new resource: "React Hooks Guide"',
    time: '10 minutes ago'
  },
  {
    user: {
      name: 'Alex Johnson',
      initials: 'AJ'
    },
    action: 'created a new event: "Web Development Workshop"',
    time: '1 hour ago'
  },
  {
    user: {
      name: 'Sara Miller',
      initials: 'SM'
    },
    action: 'commented on "Project Planning Meeting"',
    time: '2 hours ago'
  },
  {
    user: {
      name: 'David Lee',
      initials: 'DL'
    },
    action: 'earned 50 credits for organizing the Tech Talk',
    time: '3 hours ago'
  }
];

const resources = [
  {
    name: 'React Hooks Guide',
    type: 'PDF',
    size: '2.4 MB',
    date: 'May 15, 2023'
  },
  {
    name: 'Project Presentation',
    type: 'PPT',
    size: '5.1 MB',
    date: 'May 14, 2023'
  },
  {
    name: 'HTML/CSS Tutorial',
    type: 'DOC',
    size: '1.8 MB',
    date: 'May 12, 2023'
  },
  {
    name: 'Git Cheat Sheet',
    type: 'PDF',
    size: '0.9 MB',
    date: 'May 10, 2023'
  }
];

const tasks = [
  {
    title: 'Prepare workshop materials',
    dueDate: 'Today',
    status: 'pending'
  },
  {
    title: 'Review member applications',
    dueDate: 'Tomorrow',
    status: 'pending'
  },
  {
    title: 'Update event calendar',
    dueDate: 'May 18',
    status: 'pending'
  },
  {
    title: 'Submit project proposal',
    dueDate: 'May 10',
    status: 'completed'
  }
];

export default Dashboard;
