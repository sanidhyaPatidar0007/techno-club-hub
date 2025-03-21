
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Award, Clock, Plus, ArrowUpRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const CreditSystem = () => {
  const actionButtons = (
    <Button size="sm">
      <Plus className="mr-2 h-4 w-4" />
      Create Challenge
    </Button>
  );

  return (
    <PageLayout 
      title="Credit System" 
      description="Track your credits and unlock rewards"
      backgroundImage="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10"
      actions={actionButtons}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          className="col-span-1 md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Your Credit Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Level Progress</span>
                    <span className="text-sm font-medium">450 / 1000</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Gold membership at 1000 credits</span>
                    <span>45% complete</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-sm">Current Rank</h3>
                        <p className="text-2xl font-bold mt-1">Silver</p>
                      </div>
                      <span className="p-2 bg-blue-100 text-blue-700 rounded-full">
                        <Award className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Next: Gold (550 more credits)</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-sm">Month Credits</h3>
                        <p className="text-2xl font-bold mt-1">75</p>
                      </div>
                      <span className="p-2 bg-green-100 text-green-700 rounded-full">
                        <TrendingUp className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-sm">Total Credits</h3>
                        <p className="text-2xl font-bold mt-1">450</p>
                      </div>
                      <span className="p-2 bg-purple-100 text-purple-700 rounded-full">
                        <Clock className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Member for 8 months</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Credit Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <Badge variant="outline" className="mb-1">500 Credits</Badge>
                    <p className="font-medium">Workshop Priority Access</p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span className="text-xs">Claim</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <Badge variant="outline" className="mb-1">750 Credits</Badge>
                    <p className="font-medium">Official Club T-Shirt</p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span className="text-xs">Claim</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <Badge variant="outline" className="mb-1">1000 Credits</Badge>
                    <p className="font-medium">Leadership Program Access</p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span className="text-xs">Claim</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="challenges">Credit Challenges</TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Credit Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${activity.type === 'earn' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                          {activity.type === 'earn' ? <TrendingUp className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <div className={`font-semibold ${activity.type === 'earn' ? 'text-green-600' : 'text-amber-600'}`}>
                        {activity.type === 'earn' ? '+' : '-'}{activity.credits}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="challenges">
            <Card>
              <CardHeader>
                <CardTitle>Available Credit Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {challenges.map((challenge, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <Badge>{challenge.credits} Credits</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{challenge.difficulty}</Badge>
                        <Button size="sm">Start Challenge</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </PageLayout>
  );
};

// Sample data
const recentActivity = [
  {
    type: 'earn',
    description: 'Workshop Attendance: React Basics',
    date: 'Today at 3:45 PM',
    credits: 25
  },
  {
    type: 'earn',
    description: 'Project Submission: Portfolio Website',
    date: 'Yesterday at 6:20 PM',
    credits: 50
  },
  {
    type: 'spend',
    description: 'Reward Redemption: Workshop Priority Access',
    date: 'Jul 25, 2023',
    credits: 100
  },
  {
    type: 'earn',
    description: 'Helping a Junior Member',
    date: 'Jul 23, 2023',
    credits: 15
  },
  {
    type: 'earn',
    description: 'Chapter Meeting Attendance',
    date: 'Jul 20, 2023',
    credits: 10
  }
];

const challenges = [
  {
    title: 'Complete Node.js Course',
    description: 'Finish the Node.js fundamentals course and implement a sample project.',
    credits: 100,
    difficulty: 'Intermediate'
  },
  {
    title: 'Mentor a New Member',
    description: 'Guide a new club member through their first project for at least 2 weeks.',
    credits: 150,
    difficulty: 'Easy'
  },
  {
    title: 'Organize a Tech Workshop',
    description: 'Plan and conduct a technical workshop on any technology topic.',
    credits: 200,
    difficulty: 'Hard'
  },
  {
    title: 'Open Source Contribution',
    description: 'Make at least 3 contributions to any open source project.',
    credits: 250,
    difficulty: 'Advanced'
  }
];

export default CreditSystem;
