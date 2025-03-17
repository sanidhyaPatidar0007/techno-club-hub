
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, MessageCircle, Users, Calendar, Link as LinkIcon } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const Collaboration = () => {
  const actionButtons = (
    <Button size="sm">
      <PlusCircle className="mr-2 h-4 w-4" />
      New Project
    </Button>
  );

  return (
    <PageLayout 
      title="Collaboration Hub" 
      description="Connect and collaborate with other club members on projects"
      backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10"
      actions={actionButtons}
    >
      <Tabs defaultValue="projects" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge 
                        variant={
                          project.status === 'Active' ? 'default' :
                          project.status === 'Planning' ? 'secondary' :
                          'outline'
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="mt-auto space-y-4">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{project.timeline}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{project.members} members</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-2">
                          {[...Array(3)].map((_, i) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-background">
                              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                {`T${i+1}`}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">+{project.members - 3} more</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" className="flex-1">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: projects.length * 0.1 }}
            >
              <Card className="h-full border-dashed flex items-center justify-center p-6">
                <Button variant="ghost" className="flex flex-col h-full w-full p-6">
                  <PlusCircle className="h-8 w-8 mb-2" />
                  <span className="font-medium">Create New Project</span>
                  <span className="text-xs text-muted-foreground mt-1">Add a new collaboration project</span>
                </Button>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="teams">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{team.description}</p>
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{team.members} members</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{team.projects} projects</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-1">
                        {team.focus.map((item, focusIndex) => (
                          <Badge key={focusIndex} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">View Team</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="discussions">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {discussions.map((discussion, index) => (
                  <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{discussion.user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{discussion.title}</h3>
                          <Badge variant="outline">{discussion.category}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{discussion.user.name}</span>
                          <span>•</span>
                          <span>{discussion.date}</span>
                        </div>
                        
                        <p className="text-sm mt-2">{discussion.content}</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <Button variant="ghost" size="sm" className="h-8">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {discussion.replies} replies
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="h-8">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

// Sample data
const projects = [
  {
    name: "Techno Club Website",
    description: "Developing a responsive website for our club with event management and member profiles.",
    tags: ["Web", "React", "UI/UX"],
    status: "Active",
    timeline: "2 months left",
    members: 6
  },
  {
    name: "AI Study Group",
    description: "Weekly meetups to study and implement machine learning algorithms together.",
    tags: ["AI", "ML", "Python"],
    status: "Active",
    timeline: "Ongoing",
    members: 8
  },
  {
    name: "IoT Smart Campus",
    description: "Building IoT devices to monitor and optimize campus resources.",
    tags: ["IoT", "Arduino", "Data"],
    status: "Planning",
    timeline: "Starting next month",
    members: 5
  },
  {
    name: "Mobile App Development",
    description: "Creating a companion app for club members to track events and credits.",
    tags: ["Mobile", "React Native", "UX"],
    status: "Active",
    timeline: "1 month left",
    members: 4
  },
  {
    name: "Hackathon Prep",
    description: "Preparing for the upcoming national hackathon with team exercises and practice projects.",
    tags: ["Hackathon", "Team", "Coding"],
    status: "Planning",
    timeline: "3 weeks left",
    members: 12
  }
];

const teams = [
  {
    name: "Web Development Team",
    description: "Focused on building and maintaining web applications for the club.",
    members: 12,
    projects: 3,
    focus: ["React", "Node.js", "UI/UX"]
  },
  {
    name: "AI Research Group",
    description: "Exploring cutting-edge AI technologies and applications.",
    members: 8,
    projects: 2,
    focus: ["Machine Learning", "Neural Networks", "Data Science"]
  },
  {
    name: "Mobile Dev Squad",
    description: "Creating mobile applications for Android and iOS platforms.",
    members: 6,
    projects: 1,
    focus: ["React Native", "Flutter", "Mobile UX"]
  },
  {
    name: "IoT Innovators",
    description: "Working on Internet of Things projects and smart devices.",
    members: 5,
    projects: 2,
    focus: ["Arduino", "Sensors", "Embedded Systems"]
  },
  {
    name: "Design Crew",
    description: "Handling the visual design and user experience for all club projects.",
    members: 7,
    projects: 4,
    focus: ["UI Design", "Graphics", "Prototyping"]
  }
];

const discussions = [
  {
    title: "Best practices for React project structure",
    content: "I'm starting a new React project and wondering what folder structure everyone recommends. Currently thinking of organizing by feature rather than type. Thoughts?",
    user: {
      name: "Rahul Mehta",
      initials: "RM"
    },
    date: "2 hours ago",
    category: "Web Dev",
    replies: 8
  },
  {
    title: "Anyone interested in forming an AI study group?",
    content: "I'm looking to start a weekly meetup where we can learn and implement ML algorithms together. We could follow a curriculum or work on small projects. Let me know if you're interested!",
    user: {
      name: "Priya Singh",
      initials: "PS"
    },
    date: "Yesterday",
    category: "AI/ML",
    replies: 12
  },
  {
    title: "Tips for first-time hackathon participants",
    content: "Our club will be participating in the national hackathon next month. For those who haven't done a hackathon before, what advice would you give? How should we prepare?",
    user: {
      name: "Arjun Kumar",
      initials: "AK"
    },
    date: "3 days ago",
    category: "Events",
    replies: 15
  }
];

export default Collaboration;
