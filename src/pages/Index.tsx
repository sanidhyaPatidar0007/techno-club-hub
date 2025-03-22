
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { ChevronRight, Users, Calendar, FolderArchive, Star, MessageSquare } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50/50">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-24 md:pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Techno Club Management Platform
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Streamline your technical club operations with our comprehensive management solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link to="/dashboard">
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Comprehensive Club Management
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to run multiple technical chapters from a single platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="ghost" className="gap-1">
                    <Link to={feature.link}>
                      Learn more <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your club management?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join dozens of technical clubs using our platform to manage their operations efficiently
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8">
            <Link to="/dashboard">Get Started Today</Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t text-center text-sm text-muted-foreground">
        <p>© 2023 Techno Club Management Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Feature details
const features = [
  {
    title: "Membership Hub",
    description: "Manage members across multiple chapters with unified profiles and permissions",
    icon: <Users className="h-6 w-6" />,
    link: "/membership"
  },
  {
    title: "Event Management",
    description: "Plan, schedule and organize events with registration tracking and attendance",
    icon: <Calendar className="h-6 w-6" />,
    link: "/events"
  },
  {
    title: "Resource Governance",
    description: "Store and share documents, presentations, and code repositories securely",
    icon: <FolderArchive className="h-6 w-6" />,
    link: "/resources"
  },
  {
    title: "Credit System",
    description: "Award participation credits and recognize active contributions",
    icon: <Star className="h-6 w-6" />,
    link: "/credits"
  },
  {
    title: "Collaboration Tools",
    description: "Enable seamless communication between chapters and members",
    icon: <MessageSquare className="h-6 w-6" />,
    link: "/collaboration"
  },
  {
    title: "Analytics Dashboard",
    description: "Track engagement metrics and visualize club growth over time",
    icon: <ChevronRight className="h-6 w-6" />,
    link: "/dashboard"
  }
];

export default Index;
