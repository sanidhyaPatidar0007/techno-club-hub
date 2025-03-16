
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart3,
  Cog,
  Shield,
  UserPlus,
  UserX,
  Users,
  Lock
} from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminPanel = () => {
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage portal settings and user permissions</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center mt-4 md:mt-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Button size={isMobile ? "sm" : "default"} variant="destructive">
                  <Shield className="mr-2 h-4 w-4" />
                  {!isMobile && "Administrator Mode"}
                </Button>
              </motion.div>
            </div>
            
            {/* Admin Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Tabs defaultValue="user-management">
                <TabsList className="grid grid-cols-3 mb-6 sm:mb-8">
                  <TabsTrigger value="user-management" className="flex items-center text-xs sm:text-sm">
                    <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className={isMobile ? "hidden sm:inline" : ""}>User Management</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center text-xs sm:text-sm">
                    <Cog className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className={isMobile ? "hidden sm:inline" : ""}>Settings</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center text-xs sm:text-sm">
                    <BarChart3 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className={isMobile ? "hidden sm:inline" : ""}>Analytics</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* User Management Tab */}
                <TabsContent value="user-management" className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader className="pb-2 sm:pb-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <CardTitle className="text-base sm:text-lg">User Management</CardTitle>
                          <CardDescription className="text-xs sm:text-sm">Manage users, roles, and permissions</CardDescription>
                        </div>
                        <Button size={isMobile ? "sm" : "default"} className="mt-2 sm:mt-0">
                          <UserPlus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          {!isMobile && "Add User"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4">
                      <div className="rounded-md border shadow-sm overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs sm:text-sm">Name</TableHead>
                              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Email</TableHead>
                              <TableHead className="text-xs sm:text-sm">Role</TableHead>
                              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Status</TableHead>
                              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Last Active</TableHead>
                              <TableHead className="text-xs sm:text-sm text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {users.map((user, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-xs sm:text-sm font-medium">{user.name}</TableCell>
                                <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{user.email}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{user.role}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <span className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {user.status}
                                  </span>
                                </TableCell>
                                <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{user.lastActive}</TableCell>
                                <TableCell className="text-xs sm:text-sm text-right">
                                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Edit</Button>
                                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive">
                                    <UserX className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Role Permissions</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Configure access levels for each role</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4">
                      <div className="rounded-md border shadow-sm overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs sm:text-sm">Permission</TableHead>
                              <TableHead className="text-xs sm:text-sm">Admin</TableHead>
                              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Chapter Leader</TableHead>
                              <TableHead className="text-xs sm:text-sm">Member</TableHead>
                              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Guest</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {permissions.slice(0, isMobile ? 4 : permissions.length).map((permission, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-xs sm:text-sm font-medium">{permission.name}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{permission.admin ? "✓" : "✗"}</TableCell>
                                <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{permission.chapterLeader ? "✓" : "✗"}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{permission.member ? "✓" : "✗"}</TableCell>
                                <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{permission.guest ? "✓" : "✗"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      {isMobile && permissions.length > 4 && (
                        <div className="mt-2 text-center">
                          <Button variant="link" size="sm" className="text-xs">
                            View All Permissions
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Portal Settings</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Configure general portal settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {portalSettings.slice(0, isMobile ? 2 : portalSettings.length).map((setting, index) => (
                          <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                            <div className="bg-primary/10 p-2 rounded flex-shrink-0">
                              {setting.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm sm:text-base font-medium">{setting.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{setting.description}</p>
                              <Button variant="outline" size="sm" className="mt-2 text-xs">Configure</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {isMobile && portalSettings.length > 2 && (
                        <div className="text-center">
                          <Button variant="link" size="sm" className="text-xs">
                            View All Settings
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Credit System Rules</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Configure how credits are earned and spent</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4">
                      <div className="rounded-md border shadow-sm overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs sm:text-sm">Action</TableHead>
                              <TableHead className="text-xs sm:text-sm">Credits</TableHead>
                              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Description</TableHead>
                              <TableHead className="text-xs sm:text-sm text-right">Edit</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {creditRules.slice(0, isMobile ? 3 : creditRules.length).map((rule, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-xs sm:text-sm font-medium">{rule.action}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{rule.credits > 0 ? `+${rule.credits}` : rule.credits}</TableCell>
                                <TableCell className="text-xs sm:text-sm text-muted-foreground hidden sm:table-cell">{rule.description}</TableCell>
                                <TableCell className="text-xs sm:text-sm text-right">
                                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Edit</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      {isMobile && creditRules.length > 3 && (
                        <div className="mt-2 text-center">
                          <Button variant="link" size="sm" className="text-xs">
                            View All Rules
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                    {analyticsCards.slice(0, isMobile ? 4 : analyticsCards.length).map((card, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2 p-3 sm:p-4">
                          <CardTitle className="text-xs sm:text-base">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 p-3 sm:p-4">
                          <div className="text-xl sm:text-3xl font-bold">{card.value}</div>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center">
                            <span className={`inline-flex items-center ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                              {card.trend === 'up' ? '↑' : '↓'} {card.trendValue}
                            </span>
                            <span className="ml-1">vs. last month</span>
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {isMobile && analyticsCards.length > 4 && (
                    <div className="text-center mb-4">
                      <Button variant="link" size="sm" className="text-xs">
                        View All Analytics
                      </Button>
                    </div>
                  )}
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Activity By Chapter</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Event participation and resource usage by chapter</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] sm:h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                        <p className="text-xs sm:text-sm text-muted-foreground">Bar chart visualization would be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">System Logs</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Recent system activity and errors</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4">
                      <div className="rounded-md border shadow-sm overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs sm:text-sm">Timestamp</TableHead>
                              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">User</TableHead>
                              <TableHead className="text-xs sm:text-sm">Action</TableHead>
                              <TableHead className="text-xs sm:text-sm">Status</TableHead>
                              <TableHead className="text-xs sm:text-sm text-right">Details</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {systemLogs.slice(0, isMobile ? 3 : systemLogs.length).map((log, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-xs sm:text-sm">{log.timestamp}</TableCell>
                                <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{log.user}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{log.action}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    log.status === 'Success' ? 'bg-green-100 text-green-800' : 
                                    log.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {log.status}
                                  </span>
                                </TableCell>
                                <TableCell className="text-xs sm:text-sm text-right">
                                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">View</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      {isMobile && systemLogs.length > 3 && (
                        <div className="mt-2 text-center">
                          <Button variant="link" size="sm" className="text-xs">
                            View All Logs
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

// Sample data
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: 'Today'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Chapter Leader',
    status: 'Active',
    lastActive: 'Yesterday'
  },
  {
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Member',
    status: 'Active',
    lastActive: '3 days ago'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Member',
    status: 'Inactive',
    lastActive: '2 weeks ago'
  },
  {
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'Guest',
    status: 'Active',
    lastActive: 'Today'
  }
];

const permissions = [
  {
    name: 'View Dashboard',
    admin: true,
    chapterLeader: true,
    member: true,
    guest: false
  },
  {
    name: 'Manage Members',
    admin: true,
    chapterLeader: true,
    member: false,
    guest: false
  },
  {
    name: 'Create Events',
    admin: true,
    chapterLeader: true,
    member: false,
    guest: false
  },
  {
    name: 'Upload Resources',
    admin: true,
    chapterLeader: true,
    member: true,
    guest: false
  },
  {
    name: 'View Analytics',
    admin: true,
    chapterLeader: true,
    member: false,
    guest: false
  },
  {
    name: 'Modify Settings',
    admin: true,
    chapterLeader: false,
    member: false,
    guest: false
  }
];

const portalSettings = [
  {
    name: 'General Settings',
    description: 'Configure portal name, logo, and basic information',
    icon: <Cog className="h-5 w-5 text-primary" />
  },
  {
    name: 'Security',
    description: 'Configure password policies and two-factor authentication',
    icon: <Lock className="h-5 w-5 text-primary" />
  },
  {
    name: 'Email Notifications',
    description: 'Configure email templates and notification settings',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  },
  {
    name: 'Chapter Management',
    description: 'Configure chapter settings and permissions',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
    </svg>
  }
];

const creditRules = [
  {
    action: 'Attend Event',
    credits: 10,
    description: 'Credits earned for attending an event'
  },
  {
    action: 'Organize Event',
    credits: 50,
    description: 'Credits earned for organizing an event'
  },
  {
    action: 'Upload Resource',
    credits: 25,
    description: 'Credits earned for uploading a resource'
  },
  {
    action: 'Complete Task',
    credits: 15,
    description: 'Credits earned for completing an assigned task'
  },
  {
    action: 'Miss Meeting',
    credits: -10,
    description: 'Credits deducted for missing a required meeting'
  }
];

const analyticsCards = [
  {
    title: 'Total Members',
    value: '1,274',
    trend: 'up',
    trendValue: '12%'
  },
  {
    title: 'Active Members',
    value: '928',
    trend: 'up',
    trendValue: '8%'
  },
  {
    title: 'New Registrations',
    value: '64',
    trend: 'down',
    trendValue: '3%'
  },
  {
    title: 'Events This Month',
    value: '12',
    trend: 'up',
    trendValue: '20%'
  },
  {
    title: 'Resources Uploaded',
    value: '341',
    trend: 'up',
    trendValue: '15%'
  },
  {
    title: 'Average Engagement',
    value: '78%',
    trend: 'up',
    trendValue: '5%'
  }
];

const systemLogs = [
  {
    timestamp: '2023-05-17 09:32:45',
    user: 'John Doe',
    action: 'User Login',
    status: 'Success'
  },
  {
    timestamp: '2023-05-17 08:45:12',
    user: 'Jane Smith',
    action: 'Created Event',
    status: 'Success'
  },
  {
    timestamp: '2023-05-16 18:22:30',
    user: 'Michael Brown',
    action: 'Resource Upload',
    status: 'Warning'
  },
  {
    timestamp: '2023-05-16 14:10:05',
    user: 'System',
    action: 'Backup',
    status: 'Success'
  },
  {
    timestamp: '2023-05-15 11:45:33',
    user: 'Sarah Johnson',
    action: 'Password Reset',
    status: 'Error'
  }
];

export default AdminPanel;
