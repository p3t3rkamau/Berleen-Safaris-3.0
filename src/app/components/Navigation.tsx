import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { logo } from '../assets/img/exports';
import { useAuth } from './AuthContext';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Our Safaris', path: '/safaris' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="ml-0">
                <div className="">
                  <img src={logo} alt="Berleen Safaris" className="h-20 w-auto" />
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  location.pathname === link.path
                    ? 'text-[var(--safari-gold-dark)] font-semibold'
                    : 'text-gray-700 hover:text-[var(--safari-gold-dark)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Admin Section - Desktop */}
            {/* {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <Shield size={16} />
                    <span>Admin Mode</span>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 hover:scale-105"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Shield size={18} />
                Admin Login
              </Link>
            )} */}
            
            <Link
              to="/contact"
              className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[var(--safari-gold-dark)]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`py-2 transition-colors ${
                      location.pathname === link.path
                        ? 'text-[var(--safari-gold-dark)] font-semibold'
                        : 'text-gray-700 hover:text-[var(--safari-gold-dark)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
            
                {/* {user ? (
                  <>
                    {isAdmin && (
                      <div className="flex items-center gap-1 text-green-600 text-sm font-medium py-2">
                        <Shield size={16} />
                        <span>Admin Mode Active</span>
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all duration-300"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/admin/login"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-full transition-all duration-300"
                  >
                    <Shield size={18} />
                    Admin Login
                  </Link>
                )} */}
                
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-6 py-2 rounded-full text-center hover:shadow-lg transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}