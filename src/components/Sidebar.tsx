
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  LogOutIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isExpanded, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('/dashboard');

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

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
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar z-40 border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
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
              </Link>
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
          
          <Link
            to="/login"
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
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
