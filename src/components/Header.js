import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-purple-100' 
        : 'bg-white/10 backdrop-blur-xl border-b border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={closeMobileMenu}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                <span className="font-light">BE</span><span className="font-bold">PROMPTED</span>
              </span>
              <div className="h-0.5 w-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-full"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/') 
                  ? (isScrolled ? 'text-purple-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/services') 
                  ? (isScrolled ? 'text-purple-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/about') 
                  ? (isScrolled ? 'text-purple-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/contact') 
                  ? (isScrolled ? 'text-purple-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/faq" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/faq') 
                  ? (isScrolled ? 'text-purple-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              FAQ
            </Link>
            <Link 
              to="/blog" 
              className={`nav-link transition-colors duration-300 font-medium hover:scale-105 transform transition-transform ${
                isActive('/blog') 
                  ? (isScrolled ? 'text-purple-600' : 'text-white font-semibold') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-gray-200 hover:text-white')
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Header CTA */}
          <div className="hidden lg:flex">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg transition-colors duration-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-gray-700' : 'bg-white'
              } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-full h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-gray-700' : 'bg-white'
              } ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-full h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-gray-700' : 'bg-white'
              } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}>
          <div className="pt-4 space-y-4">
            <Link 
              to="/" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/') 
                  ? 'bg-purple-100 text-purple-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/services') 
                  ? 'bg-purple-100 text-purple-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/about') 
                  ? 'bg-purple-100 text-purple-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/contact') 
                  ? 'bg-purple-100 text-purple-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <Link 
              to="/faq" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/faq') 
                  ? 'bg-purple-100 text-purple-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              FAQ
            </Link>
            <Link 
              to="/blog" 
              className={`block py-2 px-4 rounded-lg transition-colors duration-300 font-medium ${
                isActive('/blog') 
                  ? 'bg-purple-100 text-purple-600' 
                  : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-white/10')
              }`}
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <div className="pt-4">
              <Link 
                to="/contact" 
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg"
                onClick={closeMobileMenu}
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;