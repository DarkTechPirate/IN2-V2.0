import { Heart, ShoppingBag, Truck, User, Menu, ChevronLeft, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import React from "react";


interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount?: number;
  wishlistCount?: number;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function Navbar({ currentPage, onNavigate, cartCount = 0, wishlistCount = 0, isAdmin = false, isLoggedIn = false, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = currentPage === 'home';

  const navLinks = [
    { label: 'Home', value: 'home' },
    { label: 'Shop', value: 'shop' },
    { label: 'Social Cause', value: 'social-cause' },
    { label: 'Gallery', value: 'gallery' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative flex items-center justify-between h-20">
          {/* Left - Logo */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {!isHomePage && (
              <button
                onClick={() => onNavigate('home')}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div
                className="text-2xl tracking-tight transition-all duration-300 group-hover:tracking-wide"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                IN<span style={{ color: '#2FF924' }}>2</span>
              </div>
            </button>
          </div>
  
          {/* Center - Nav Links (Desktop) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => onNavigate(link.value)}
                className="relative py-2 transition-all duration-300 hover:text-[#2FF924] group"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#2FF924] transition-all duration-300 ${
                    currentPage === link.value
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
  
            {/* Admin Dashboard Button - Only for Admins */}
            {isAdmin && (
              <button
                onClick={() => onNavigate('admin-dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === 'admin-dashboard'
                    ? 'bg-[#2FF924] text-white'
                    : 'bg-[#2FF924]/10 text-[#2FF924] hover:bg-[#2FF924]/20'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            )}
          </div>
  
          {/* Right - Icons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-md"
                    aria-label="Profile"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('order-tracking')}>
                    <Package className="w-4 h-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => onNavigate('admin-dashboard')}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 rounded-lg bg-[#2FF924]/10 text-[#2FF924] hover:bg-[#2FF924] hover:text-white transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Login
              </button>
            )}
  
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-md"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2FF924] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
  
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-md"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2FF924] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
  
            <button
              onClick={() => onNavigate('order-tracking')}
              className="hidden lg:flex p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-md"
              aria-label="Track Order"
            >
              <Truck className="w-5 h-5" />
            </button>
  
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => {
                    onNavigate(link.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage === link.value
                      ? 'bg-[#2FF924]/10 text-[#2FF924]'
                      : 'hover:bg-gray-100'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );  
}
