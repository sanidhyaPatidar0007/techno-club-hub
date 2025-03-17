
import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMobileSidebar } from '@/hooks/use-mobile';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import PageTransition from '@/components/PageTransition';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  backgroundImage?: string;
  actions?: ReactNode;
}

const PageLayout = ({ 
  children, 
  title, 
  description, 
  backgroundImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10',
  actions
}: PageLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { isMobile, isOpen } = useMobileSidebar();

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Determine if sidebar should be shown
  const showSidebar = isMobile ? isOpen : true;
  // Determine sidebar width class
  const mainClass = !isMobile && sidebarExpanded 
    ? 'ml-64' 
    : !isMobile && !sidebarExpanded 
      ? 'ml-20' 
      : 'ml-0';

  return (
    <div className={`min-h-screen bg-background bg-[url('${backgroundImage}')] bg-fixed bg-no-repeat bg-cover bg-opacity-10`}>
      <div className="min-h-screen bg-background/85 backdrop-blur-sm">
        <Navbar />
        {showSidebar && <Sidebar isExpanded={sidebarExpanded} toggleSidebar={toggleSidebar} />}

        <PageTransition>
          <main className={`pt-24 transition-all duration-300 ${mainClass}`}>
            <div className="container mx-auto px-4 md:px-6 py-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                  {description && <p className="text-muted-foreground mt-1">{description}</p>}
                </motion.div>
                
                {actions && (
                  <motion.div 
                    className="flex items-center mt-4 md:mt-0 gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {actions}
                  </motion.div>
                )}
              </div>
              
              {children}
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
};

export default PageLayout;
