
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  CalendarIcon, 
  FolderIcon, 
  StarIcon, 
  MessageSquareIcon, 
  SettingsIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
  LogOutIcon,
  MenuIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileSidebar } from '@/hooks/use-mobile';

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isExpanded, toggleSidebar }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState('/dashboard');
  const { isMobile, closeSidebar } = useMobileSidebar();
  
  let location = { pathname: "/dashboard" };
  let navigate = (path: string) => {
    window.location.href = path;
  };
  let isRouterAvailable = true;

  try {
    // These will throw errors if not in a Router context
    location = useLocation();
    const navHook = useNavigate();
    navigate = navHook;
  } catch (error) {
    isRouterAvailable = false;
    console.warn("Sidebar: Not in a Router context");
  }

  useEffect(() => {
    if (isRouterAvailable) {
      setActiveItem(location.pathname);
    }
  }, [location.pathname, isRouterAvailable]);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      closeSidebar();
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <HomeIcon className="w-5 h-5" /> },
    { name: 'Membership', path: '/membership', icon: <UsersIcon className="w-5 h-5" /> },
    { name: 'Events', path: '/events', icon: <CalendarIcon className="w-5 h-5" /> },
    { name: 'Resources', path: '/resources', icon: <FolderIcon className="w-5 h-5" /> },
    { name: 'Credits', path: '/credits', icon: <StarIcon className="w-5 h-5" /> },
    { name: 'Collaboration', path: '/collaboration', icon: <MessageSquareIcon className="w-5 h-5" /> },
    { name: 'Admin', path: '/admin', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <aside 
      id="sidebar"
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar z-40 border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-20",
        isMobile && !isExpanded && "transform -translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  activeItem === item.path
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <div className="flex-shrink-0 text-sidebar-foreground/60 group-hover:text-sidebar-foreground">
                  {item.icon}
                </div>
                <span 
                  className={cn(
                    "transition-opacity duration-200", 
                    isExpanded ? "opacity-100" : "opacity-0 hidden"
                  )}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-sidebar-border p-3">
          <button
            className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
            onClick={toggleSidebar}
          >
            <div className="flex items-center gap-3">
              {isExpanded ? (
                <ChevronLeftIcon className="w-5 h-5" />
              ) : (
                <ChevronRightIcon className="w-5 h-5" />
              )}
              <span 
                className={cn(
                  "transition-opacity duration-200", 
                  isExpanded ? "opacity-100" : "opacity-0 hidden"
                )}
              >
                Collapse
              </span>
            </div>
          </button>
          
          <button
            onClick={() => handleNavigation('/login')}
            className="mt-2 w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          >
            <LogOutIcon className="w-5 h-5" />
            <span 
              className={cn(
                "transition-opacity duration-200", 
                isExpanded ? "opacity-100" : "opacity-0 hidden"
              )}
            >
              Log out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
