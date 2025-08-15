'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  User,
  LogOut,
  Menu,
  X,
  HomeIcon,
  BookOpen,
  Settings,
  MessageSquare
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/courses', label: 'My Courses', icon: BookOpen },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Fixed navbar that stays on top */}
      <motion.nav 
        className={cn(
          "fixed w-full z-50 transition-all duration-300 border  border-b-black/40",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
  
          boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <GraduationCap className="h-8 w-8 text-primary mr-2 group-hover:text-primary/80 transition-colors" />
                  <span className="font-bold text-xl text-gray-900 group-hover:text-primary/80 transition-colors">
                    LearnHub Pro
                  </span>
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 bo">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      isActive 
                        ? "bg-primary/10 text-primary font-semibold" 
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 mr-2", isActive ? "text-primary" : "text-gray-500")} />
                    {item.label}
                   
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center px-3 py-2 rounded-lg bg-gray-50 cursor-pointer"
              >
                <div className="relative">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  size="sm"
                  className="border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-7 w-7 text-gray-700" />
                ) : (
                  <Menu className="h-7 w-7 text-gray-700" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary font-semibold" 
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary" : "text-gray-500")} />
                      {item.label}
                    </Link>
                  );
                })}
                
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex items-center px-4 py-3 rounded-lg bg-gray-50">
                    <div className="relative">
                      <User className="h-6 w-6 text-gray-600" />
                      <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={handleLogout}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center w-full px-4 py-3 mt-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign out
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to push content down */}
      <div className="h-20 w-full"></div>
    </>
  );
};