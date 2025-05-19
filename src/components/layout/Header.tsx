
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, BookOpen, Home, MapPin, LogIn, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from '@/components/common/Logo';
import { cn } from '@/lib/utils';

const navigation = [
  { name: "Real Estates", href:"/properties", icon: <Home size={18} /> },
  { name: "Research & Consultation", href: "/fcri", icon: <BookOpen size={18} /> },
  { name: "Agribusiness", href: "/agriculture", icon: <ShoppingCart size={18} /> },
  { name: "Enterprise", href: "/enterprise", icon: <Briefcase size={18} /> },
  { name: "About", href: "/about", icon: <User size={18} /> },
  { name: "Founder", href: "/founder", icon: <User size={18} /> },
  { name: "Contact", href: "/contact", icon: <MapPin size={18} /> }
];

const Header = () => {
  const location = useLocation(); // Get the current route location
  const [isScrolled, setIsScrolled] = useState(false); // State to track if the page is scrolled
  const isMobile = useIsMobile(); // Hook to detect if the device is mobile
  
  const isHomePage = location.pathname === '/'; // Check if the current page is the homepage

  // Watch for scroll position to add background to the header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Set `isScrolled` to true if the page is scrolled down
    };
    
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        {
          // Transparent only on the homepage when not scrolled
          "bg-transparent": isHomePage && !isScrolled,
          // White with blur on scroll or other pages
          "bg-white/80 backdrop-blur-md shadow-sm": isScrolled || !isHomePage,
        }
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo section */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {/* Only show icon when scrolled or not on homepage */}
            {(!isHomePage || isScrolled) && (
              <Logo 
                variant="icon" 
                theme={(isHomePage && !isScrolled) ? "light" : "dark"} 
                size="sm"
              />
            )}
            
            <Logo 
              variant="text"
              theme={(isHomePage && !isScrolled) ? "light" : "dark"}
              className="hidden md:block" 
              showOnLight={true} // Always show text
            />
          </Link>

          {/* Desktop Navigation - improved spacing and overflow handling */}
          <nav className="hidden md:flex items-center space-x-6 justify-end">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm transition-colors whitespace-nowrap",
                  (isHomePage && !isScrolled)
                    ? "text-white hover:text-mikado"
                    : "text-festari-700 hover:text-accent",
                  location.pathname === item.href && "font-medium" // Highlight active link
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Login/Register Buttons with improved responsive design */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <Link to="/login">
              <Button 
                variant={(isHomePage && !isScrolled) ? "ghost-light" : "outline"}
                className="flex items-center gap-2 px-4"
                size="sm"
              >
                <LogIn size={16} />
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                variant={(isHomePage && !isScrolled) ? "white" : "accent"}
                size="sm"
                className="px-4"
              >
                Register
              </Button>
            </Link>

            {/* User menu (when logged in) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full",
                    (isHomePage && !isScrolled) ? "text-white hover:bg-white/10" : "text-festari-900 hover:bg-festari-100/10"
                  )}
                >
                  <User size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md border border-festari-100">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/properties" className="w-full cursor-pointer">Saved Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/research" className="w-full cursor-pointer">My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu - improved spacing and button contrast */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full",
                    (isHomePage && !isScrolled) ? "text-white hover:bg-white/10" : "text-festari-900 hover:bg-festari-100/10"
                  )}
                >
                  <User size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md border border-festari-100 z-50">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/properties" className="w-full cursor-pointer">Saved Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/research" className="w-full cursor-pointer">My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile Navigation Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full",
                    (isHomePage && !isScrolled) ? "text-white hover:bg-white/10" : "text-festari-900 hover:bg-festari-100/10"
                  )}
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white/95 backdrop-blur-md pt-16 w-[300px]">
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center text-festari-900 text-lg ${
                        location.pathname === item.href ? 'font-medium text-accent' : ''
                      }`}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                <div className="flex flex-col space-y-3 pt-6 mt-6 border-t border-festari-100">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <LogIn className="mr-2" size={18} />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button className="w-full bg-festari-accent hover:bg-festari-accent/90 text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
