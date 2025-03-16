
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

const AdminPanel = () => {
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
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground mt-1">Manage portal settings and user permissions</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center mt-4 md:mt-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Button size="sm" variant="destructive">
                  <Shield className="mr-2 h-4 w-4" />
                  Administrator Mode
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
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="user-management" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    User Management
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center">
                    <Cog className="mr-2 h-4 w-4" />
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
                
                {/* User Management Tab */}
                <TabsContent value="user-management" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>User Management</CardTitle>
                          <CardDescription>Manage users, roles, and permissions</CardDescription>
                        </div>
                        <Button>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add User
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border shadow-sm overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Last Active</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {users.map((user, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {user.status}
                                  </span>
                                </TableCell>
                                <TableCell>{user.lastActive}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                  <Button variant="ghost" size="sm" className="text-destructive">
                                    <UserX className="h-4 w-4" />
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
                      <CardTitle>Role Permissions</CardTitle>
                      <CardDescription>Configure access levels for each role</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border shadow-sm overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Permission</TableHead>
                              <TableHead>Admin</TableHead>
                              <TableHead>Chapter Leader</TableHead>
                              <TableHead>Member</TableHead>
                              <TableHead>Guest</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {permissions.map((permission, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{permission.name}</TableCell>
                                <TableCell>{permission.admin ? "✓" : "✗"}</TableCell>
                                <TableCell>{permission.chapterLeader ? "✓" : "✗"}</TableCell>
                                <TableCell>{permission.member ? "✓" : "✗"}</TableCell>
                                <TableCell>{permission.guest ? "✓" : "✗"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Portal Settings</CardTitle>
                      <CardDescription>Configure general portal settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {portalSettings.map((setting, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-2 rounded">
                              {setting.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{setting.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{setting.description}</p>
                              <Button variant="outline" size="sm" className="mt-2">Configure</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Credit System Rules</CardTitle>
                      <CardDescription>Configure how credits are earned and spent</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border shadow-sm overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Action</TableHead>
                              <TableHead>Credits</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead className="text-right">Edit</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {creditRules.map((rule, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{rule.action}</TableCell>
                                <TableCell>{rule.credits > 0 ? `+${rule.credits}` : rule.credits}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{rule.description}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {analyticsCards.map((card, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{card.value}</div>
                          <p className="text-sm text-muted-foreground mt-1 flex items-center">
                            <span className={`inline-flex items-center ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                              {card.trend === 'up' ? '↑' : '↓'} {card.trendValue}
                            </span>
                            <span className="ml-1">vs. last month</span>
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity By Chapter</CardTitle>
                      <CardDescription>Event participation and resource usage by chapter</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                        <p className="text-muted-foreground">Bar chart visualization would be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>System Logs</CardTitle>
                      <CardDescription>Recent system activity and errors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border shadow-sm overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Timestamp</TableHead>
                              <TableHead>User</TableHead>
                              <TableHead>Action</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Details</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {systemLogs.map((log, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-sm">{log.timestamp}</TableCell>
                                <TableCell>{log.user}</TableCell>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    log.status === 'Success' ? 'bg-green-100 text-green-800' : 
                                    log.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {log.status}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">View</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
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
