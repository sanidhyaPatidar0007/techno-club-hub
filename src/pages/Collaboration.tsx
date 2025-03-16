
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileUp, ListTodo, PlusCircle, Send } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const Collaboration = () => {
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
                <h1 className="text-3xl font-bold">Collaboration Workspace</h1>
                <p className="text-muted-foreground mt-1">Work together with your team members</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center mt-4 md:mt-0 gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </motion.div>
            </div>
            
            {/* Project Selection */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Current Project: Website Redesign</CardTitle>
                  <CardDescription>IEEE Chapter • Due: June 15, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-4">
                        {[...Array(4)].map((_, i) => (
                          <Avatar key={i} className="border-2 border-background">
                            <AvatarFallback>{`T${i+1}`}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">+2 more members</span>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex gap-2">
                      <Badge variant="outline">In Progress</Badge>
                      <Badge variant="secondary">High Priority</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Collaboration Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="chat" className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="flex items-center">
                    <ListTodo className="mr-2 h-4 w-4" />
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger value="files" className="flex items-center">
                    <FileUp className="mr-2 h-4 w-4" />
                    Files
                  </TabsTrigger>
                </TabsList>
                
                {/* Chat Tab */}
                <TabsContent value="chat" className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 h-[400px] overflow-y-auto flex flex-col gap-4">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender !== 'You' && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div 
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.sender === 'You' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          {message.sender !== 'You' && (
                            <p className="text-xs font-semibold mb-1">{message.sender}</p>
                          )}
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs text-right mt-1 opacity-70">{message.time}</p>
                        </div>
                        
                        {message.sender === 'You' && (
                          <Avatar className="h-8 w-8 ml-2">
                            <AvatarFallback>Y</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Tasks Tab */}
                <TabsContent value="tasks" className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">Task Board</h3>
                    <Button size="sm" variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* To Do Column */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">To Do (3)</h4>
                      
                      {tasks.filter(task => task.status === 'todo').map((task, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-4">
                            <h5 className="font-medium">{task.title}</h5>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                            <div className="flex justify-between items-center mt-4">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <Badge variant="outline">{task.dueDate}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {/* In Progress Column */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">In Progress (2)</h4>
                      
                      {tasks.filter(task => task.status === 'inprogress').map((task, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-4">
                            <h5 className="font-medium">{task.title}</h5>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                            <div className="flex justify-between items-center mt-4">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <Badge variant="outline">{task.dueDate}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {/* Done Column */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Done (1)</h4>
                      
                      {tasks.filter(task => task.status === 'done').map((task, index) => (
                        <Card key={index} className="overflow-hidden opacity-70">
                          <CardContent className="p-4">
                            <h5 className="font-medium">{task.title}</h5>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                            <div className="flex justify-between items-center mt-4">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <Badge variant="outline">{task.dueDate}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Files Tab */}
                <TabsContent value="files" className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">Shared Files</h3>
                    <Button size="sm" variant="outline">
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <div className={`p-2 rounded mr-3 ${
                              file.type === 'PDF' ? 'bg-red-100 text-red-600' :
                              file.type === 'PPT' ? 'bg-orange-100 text-orange-600' :
                              file.type === 'DOC' ? 'bg-blue-100 text-blue-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              <FileUp className="h-5 w-5" />
                            </div>
                            
                            <div className="flex-1">
                              <h5 className="font-medium">{file.name}</h5>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-muted-foreground">{file.size} • {file.uploadDate}</span>
                                <span className="text-xs text-muted-foreground mx-2">•</span>
                                <span className="text-xs">Uploaded by {file.uploadedBy}</span>
                              </div>
                            </div>
                            
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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
const messages = [
  {
    sender: 'John',
    text: "Hey team, I've started working on the homepage redesign.",
    time: '10:30 AM'
  },
  {
    sender: 'Sarah',
    text: "Great! I'll work on the about page then.",
    time: '10:32 AM'
  },
  {
    sender: 'You',
    text: "Sounds good. I'll focus on the navigation menu and header.",
    time: '10:35 AM'
  },
  {
    sender: 'David',
    text: "I've uploaded some design references to the files section.",
    time: '10:40 AM'
  },
  {
    sender: 'You',
    text: "Thanks David, I'll check them out!",
    time: '10:41 AM'
  },
  {
    sender: 'Emily',
    text: 'When is our next meeting scheduled?',
    time: '10:45 AM'
  },
  {
    sender: 'John',
    text: "Tomorrow at 3 PM. I'll send a calendar invite.",
    time: '10:47 AM'
  }
];

const tasks = [
  {
    title: 'Design Homepage Mockup',
    description: 'Create wireframes for the new homepage design',
    assignee: 'John',
    dueDate: 'May 20',
    status: 'inprogress'
  },
  {
    title: 'Implement Navigation',
    description: 'Develop responsive navigation menu',
    assignee: 'You',
    dueDate: 'May 22',
    status: 'todo'
  },
  {
    title: 'Create About Page',
    description: 'Design and implement About Us page',
    assignee: 'Sarah',
    dueDate: 'May 25',
    status: 'todo'
  },
  {
    title: 'Setup Project Repository',
    description: 'Initialize Git repo and invite team members',
    assignee: 'David',
    dueDate: 'May 15',
    status: 'done'
  },
  {
    title: 'Test Contact Form',
    description: 'Verify form submissions and validation',
    assignee: 'Emily',
    dueDate: 'May 23',
    status: 'todo'
  },
  {
    title: 'Optimize Images',
    description: 'Compress and optimize all website images',
    assignee: 'John',
    dueDate: 'May 21',
    status: 'inprogress'
  }
];

const files = [
  {
    name: 'Website Redesign Proposal',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: 'May 15, 2023',
    uploadedBy: 'John'
  },
  {
    name: 'Homepage Mockups',
    type: 'PNG',
    size: '5.1 MB',
    uploadDate: 'May 16, 2023',
    uploadedBy: 'Sarah'
  },
  {
    name: 'Project Timeline',
    type: 'DOC',
    size: '1.8 MB',
    uploadDate: 'May 14, 2023',
    uploadedBy: 'You'
  },
  {
    name: 'Design Guidelines',
    type: 'PDF',
    size: '3.2 MB',
    uploadDate: 'May 13, 2023',
    uploadedBy: 'David'
  }
];

export default Collaboration;
