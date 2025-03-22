
import { useState, ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMobileSidebar } from '@/hooks/use-mobile';
import { useThemeByRoute } from '@/hooks/use-theme-by-route';
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
  backgroundImage, 
  actions
}: PageLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { isMobile, isOpen, toggleSidebar } = useMobileSidebar();
  
  // Try to get route-specific theme, but fallback to default if not in Router context
  const routeTheme = useThemeByRoute();
  
  // Use provided backgroundImage or fall back to route-specific theme
  const bgImage = backgroundImage || routeTheme.backgroundImage;

  const handleToggleSidebar = () => {
    if (isMobile) {
      toggleSidebar();
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isOpen) {
        // Check if click is outside both sidebar and navbar
        const sidebarEl = document.getElementById('sidebar');
        const navbarEl = document.getElementById('navbar');
        
        if (sidebarEl && navbarEl) {
          if (!sidebarEl.contains(e.target as Node) && !navbarEl.contains(e.target as Node)) {
            toggleSidebar();
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen, toggleSidebar]);

  // Determine if sidebar should be shown
  const showSidebar = isMobile ? isOpen : true;
  // Determine sidebar width class
  const mainClass = !isMobile && sidebarExpanded 
    ? 'ml-64' 
    : !isMobile && !sidebarExpanded 
      ? 'ml-20' 
      : 'ml-0';

  return (
    <div className={`min-h-screen bg-background bg-[url('${bgImage}')] bg-fixed bg-no-repeat bg-cover bg-opacity-10`}>
      <div className="min-h-screen bg-background/85 backdrop-blur-sm">
        <Navbar />
        {showSidebar && <Sidebar isExpanded={sidebarExpanded} toggleSidebar={handleToggleSidebar} />}

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
