
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchIcon, BellIcon, UserCircleIcon, MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Membership', path: '/membership' },
    { name: 'Events', path: '/events' },
    { name: 'Resources', path: '/resources' },
    { name: 'Credits', path: '/credits' },
    { name: 'Collaboration', path: '/collaboration' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 font-semibold text-xl"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white font-bold">
                TC
              </div>
              <span className="hidden md:inline">Techno Clubs</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "nav-item",
                  location.pathname === item.path && "nav-item-active"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <BellIcon className="w-5 h-5" />
            </button>
            <Link 
              to="/login" 
              className={cn(
                "p-2 rounded-full transition-colors",
                location.pathname !== '/login' 
                  ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100" 
                  : "text-primary hover:text-primary/90 hover:bg-gray-100"
              )}
            >
              <UserCircleIcon className="w-5 h-5" />
            </Link>
            <button
              className="md:hidden p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <button
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "w-full py-3 px-4 text-center rounded-md font-medium",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
              onClick={toggleMobileMenu}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="w-full py-3 px-4 mt-4 text-center rounded-md font-medium bg-primary text-white hover:bg-primary/90"
            onClick={toggleMobileMenu}
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
