
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
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px] p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Total Credits</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">450</div>
                    <div className="text-xs text-blue-600 mt-1">+50 last month</div>
                  </div>
                  
                  <div className="flex-1 min-w-[200px] p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Current Tier</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">Silver</div>
                    <div className="text-xs text-purple-600 mt-1">550 more for Gold</div>
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
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-between" variant="outline">
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Claim Credits
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                
                <Button className="w-full justify-between" variant="outline">
                  <span className="flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    View Rewards
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                
                <Button className="w-full justify-between" variant="outline">
                  <span className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Credit History
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
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
        <Tabs defaultValue="opportunities">
          <TabsList className="mb-4">
            <TabsTrigger value="opportunities">Credit Opportunities</TabsTrigger>
            <TabsTrigger value="history">Recent History</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {creditOpportunities.map((opportunity, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <h3 className="font-medium">{opportunity.title}</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{opportunity.category}</Badge>
                          <span className="text-xs text-muted-foreground">{opportunity.deadline}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{opportunity.credits} credits</div>
                        <Button size="sm" variant="outline" className="mt-2">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {creditHistory.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{item.description}</h3>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <div className={`font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.amount > 0 ? `+${item.amount}` : item.amount} credits
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {leaderboard.map((member, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-bold mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-xs text-muted-foreground">{member.chapter}</p>
                        </div>
                      </div>
                      <div className="font-bold text-primary">
                        {member.credits} credits
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
const creditOpportunities = [
  {
    title: "Web Development Workshop",
    description: "Host a workshop to teach web development to beginners",
    category: "Teaching",
    credits: 100,
    deadline: "Due in 2 weeks"
  },
  {
    title: "Project Contribution",
    description: "Contribute to the club's open source project",
    category: "Development",
    credits: 75,
    deadline: "Ongoing"
  },
  {
    title: "Tech Blog Article",
    description: "Write a technical article for the club blog",
    category: "Content",
    credits: 50,
    deadline: "Due in 1 month"
  },
  {
    title: "Mentorship Program",
    description: "Mentor a junior member for a semester",
    category: "Mentorship",
    credits: 150,
    deadline: "Next semester"
  }
];

const creditHistory = [
  {
    description: "Hosted Python Workshop",
    date: "May 5, 2023",
    amount: 100
  },
  {
    description: "Attended Leadership Meeting",
    date: "May 3, 2023",
    amount: 25
  },
  {
    description: "Tech Blog Contribution",
    date: "April 28, 2023",
    amount: 50
  },
  {
    description: "Purchased Reward: Premium Course",
    date: "April 20, 2023",
    amount: -200
  },
  {
    description: "Project Collaboration",
    date: "April 15, 2023",
    amount: 75
  }
];

const leaderboard = [
  {
    name: "Ananya Gupta",
    chapter: "IEEE",
    credits: 850
  },
  {
    name: "Rajiv Kumar",
    chapter: "ACM",
    credits: 720
  },
  {
    name: "Priya Sharma",
    chapter: "GDSC",
    credits: 680
  },
  {
    name: "Vikram Singh",
    chapter: "IEEE",
    credits: 625
  },
  {
    name: "Neha Patel",
    chapter: "ACM",
    credits: 590
  }
];

export default CreditSystem;
