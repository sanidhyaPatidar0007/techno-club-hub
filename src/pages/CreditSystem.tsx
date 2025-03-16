
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BarChart, Trophy, TrendingUp, History } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const CreditSystem = () => {
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
                <h1 className="text-3xl font-bold">Credit System</h1>
                <p className="text-muted-foreground mt-1">Track and reward member contributions</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center mt-4 md:mt-0 gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Button size="sm" variant="outline">
                  <History className="mr-2 h-4 w-4" />
                  History
                </Button>
                <Button size="sm">
                  <BarChart className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </motion.div>
            </div>
            
            {/* Your Credits */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Your Credits</CardTitle>
                  <CardDescription>Track your progress towards the next tier</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-3xl font-bold">450</span>
                          <span className="text-muted-foreground ml-2">credits</span>
                        </div>
                        <Badge className="bg-blue-500">Silver Tier</Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress to Gold Tier</span>
                            <span>450 / 800</span>
                          </div>
                          <Progress value={56} className="h-2" />
                        </div>
                        
                        <p className="text-sm text-muted-foreground">Earn 350 more credits to reach Gold Tier and unlock premium resources.</p>
                      </div>
                    </div>
                    
                    <div className="md:w-72 space-y-4">
                      <h4 className="font-medium">Recent Activity</h4>
                      
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            activity.change > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {activity.change > 0 ? '+' : ''}{activity.change}
                          </div>
                          <div>
                            <p className="font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Leaderboard</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topMembers.map((member, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className={`w-full h-1 ${
                      index === 0 ? 'bg-yellow-400' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-amber-600' : 
                      'bg-blue-400'
                    }`}></div>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <div className="mr-4 relative">
                          <Avatar className="h-14 w-14 border-2 border-background">
                            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-3 -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-background text-primary-foreground text-xs font-semibold border border-primary">
                            {index + 1}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <div className="flex items-center mt-1">
                            <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{member.credits} credits</span>
                          </div>
                          <div className="flex gap-1 mt-1">
                            {member.chapters.map((chapter, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {chapter}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
            
            {/* Available Rewards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Available Rewards</h2>
                <Button variant="outline" size="sm">Browse All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rewards.map((reward, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{reward.title}</CardTitle>
                        <Badge>{reward.credits} credits</Badge>
                      </div>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline">{reward.tier} Tier</Badge>
                        <Button variant="outline" size="sm">Redeem</Button>
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
const recentActivity = [
  {
    change: 50,
    description: 'Organized Web Development Workshop',
    date: 'Today'
  },
  {
    change: 25,
    description: 'Attended Project Planning Meeting',
    date: '2 days ago'
  },
  {
    change: -10,
    description: 'Missed Executive Board Meeting',
    date: '1 week ago'
  },
  {
    change: 30,
    description: 'Uploaded Resource: React Hooks Guide',
    date: '2 weeks ago'
  }
];

const topMembers = [
  {
    name: 'John Doe',
    credits: 780,
    chapters: ['IEEE', 'ACM']
  },
  {
    name: 'Jane Smith',
    credits: 720,
    chapters: ['IEEE']
  },
  {
    name: 'David Wilson',
    credits: 680,
    chapters: ['GDSC', 'ACM']
  },
  {
    name: 'Sarah Johnson',
    credits: 640,
    chapters: ['IEEE']
  },
  {
    name: 'Michael Brown',
    credits: 600,
    chapters: ['ACM']
  },
  {
    name: 'Emily Chen',
    credits: 560,
    chapters: ['GDSC']
  }
];

const rewards = [
  {
    title: 'Free Conference Ticket',
    description: 'Get a free ticket to the annual tech conference',
    credits: 500,
    tier: 'Gold'
  },
  {
    title: 'Tech Company Tour',
    description: 'Visit a leading tech company headquarters',
    credits: 350,
    tier: 'Silver'
  },
  {
    title: 'Workshop Priority Access',
    description: 'Get early access to all workshop registrations',
    credits: 200,
    tier: 'Bronze'
  }
];

export default CreditSystem;
