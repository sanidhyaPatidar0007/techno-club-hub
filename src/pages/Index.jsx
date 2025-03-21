
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="pt-16 sm:pt-24 pb-12 sm:pb-16">
        {/* Hero section */}
        <section className="container mx-auto px-4 pt-8 sm:pt-12 md:pt-24 flex flex-col items-center text-center">
          <motion.div
            className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-blue-100 text-blue-800 mb-4 sm:mb-6">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
                <span>Launching Summer 2023</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight"
              variants={itemVariants}
            >
              <span className="block">PLAN</span>
              <span className="block">CONNECT</span>
              <span className="block">COLLABORATE</span>
            </motion.h1>
            
            <motion.p 
              className="mt-4 sm:mt-6 text-base sm:text-xl text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              The all-in-one platform for tech clubs to manage members, events, resources, and collaboration across multiple chapters.
            </motion.p>
            
            <motion.div 
              className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              variants={itemVariants}
            >
              <Button 
                asChild
                size="lg" 
                className="group"
              >
                <Link to="/dashboard">
                  <span>Explore Dashboard</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                asChild
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Features section */}
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold">Everything you need to run your tech club</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              An integrated platform that simplifies club management across multiple chapters.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="glass-card rounded-xl p-4 sm:p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 font-semibold text-xl">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white font-bold">
                  TC
                </div>
                <span>Techno Clubs</span>
              </div>
              <p className="mt-2 text-gray-600 text-sm">© 2023 Techno Clubs. All rights reserved.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
              <div>
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Product</h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Company</h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Legal</h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Features data
const features = [
  {
    title: "Membership Management",
    description: "Track member profiles, roles, and chapter affiliations all in one place.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  },
  {
    title: "Event Planning",
    description: "Create, schedule, and manage events with attendance tracking and feedback collection.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  },
  {
    title: "Resource Library",
    description: "Centralized storage for documents, presentations, and code repositories with role-based access control.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  },
  {
    title: "Credit System",
    description: "Reward member participation and contributions with credits that can be redeemed for benefits.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  },
  {
    title: "Collaboration Tools",
    description: "Integrated chat, forums, and project management tools to foster teamwork and innovation.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  },
  {
    title: "Analytics Dashboard",
    description: "Comprehensive insights into club activities, member engagement, and event performance.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  }
];

export default Index;
