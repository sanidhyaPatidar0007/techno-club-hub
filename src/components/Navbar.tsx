
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchIcon, BellIcon, UserCircleIcon, MenuIcon, XIcon, UploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileSidebar } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const location = useLocation();
  const { toggleSidebar, isOpen } = useMobileSidebar();

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    // Here you would typically upload to a server
    // For now we'll just simulate success
    toast.success("Event image uploaded successfully");
    
    // Reset the form
    setSelectedFile(null);
    setPreviewUrl(null);
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
            <button 
              className="md:hidden mr-2 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={toggleSidebar}
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <Link 
              to="/" 
              className="flex items-center gap-2 font-semibold text-xl"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white font-bold">
                TC
              </div>
              <span className="hidden md:inline">Techno Club</span>
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
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                  <UploadIcon className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload Event Image</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-image">Event Image</Label>
                    <Input 
                      id="event-image" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                    />
                  </div>
                  
                  {previewUrl && (
                    <div className="mt-4">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="rounded-md max-h-[200px] mx-auto"
                      />
                    </div>
                  )}
                  
                  <Button type="button" onClick={handleUpload} disabled={!selectedFile}>
                    Upload Image
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
            <XIcon className="h-6 w-6" />
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
