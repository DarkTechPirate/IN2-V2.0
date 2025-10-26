import {
  Heart,
  ShoppingBag,
  Truck,
  User,
  Menu,
  ChevronLeft,
  LogOut,
  Package,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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

export function Navbar({
  currentPage,
  onNavigate,
  cartCount = 0,
  wishlistCount = 0,
  isAdmin = false,
  isLoggedIn = false,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = currentPage === "home";

  const navLinks = [
    { label: "Home", value: "home" },
    { label: "Shop", value: "shop" },
    { label: "Social Cause", value: "social-cause" },
    { label: "Gallery", value: "gallery" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-16"> {/* Reduced height */}
          {/* Left Section - Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {!isHomePage && (
              <button
                onClick={() => onNavigate("home")}
                className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Back"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-1.5 group"
          >
            <div
              className="text-3xl tracking-tight transition-all duration-300 group-hover:tracking-wide"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              IN<span style={{ color: "#2FF924" }}>2</span>
            </div>
          </button>

          </div>

          {/* Center Section - Nav Links */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => onNavigate(link.value)}
                className="relative py-1.5 transition-all duration-300 hover:text-primary_green group"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary_green transition-all duration-300 ${
                    currentPage === link.value
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}

            {/* Admin Dashboard Button */}
            {isAdmin && (
              <button
                onClick={() => onNavigate("admin-dashboard")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  currentPage === "admin-dashboard"
                    ? "bg-primary_green text-white"
                    : "bg-primary_green/10 text-primary_green hover:bg-primary_green/20"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            )}
          </div>

          {/* Right Section - Icons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-md"
                    aria-label="Profile"
                  >
                    <User className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => onNavigate("profile")}>
                    <User className="w-3.5 h-3.5 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onNavigate("order-tracking")}
                  >
                    <Package className="w-3.5 h-3.5 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => onNavigate("admin-dashboard")}
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="w-3.5 h-3.5 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="px-3 py-1.5 rounded-lg bg-primary_green/10 text-primary_green hover:bg-primary_green hover:text-white transition-all duration-300"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Login
              </button>
            )}

            <button
              onClick={() => onNavigate("wishlist")}
              className="relative p-1.5 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-md"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary_green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate("cart")}
              className="relative p-1.5 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-md"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary_green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate("order-tracking")}
              className="hidden lg:flex p-1.5 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-md"
              aria-label="Track Order"
            >
              <Truck className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-2 border-t border-gray-200 mt-1 pt-2">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => {
                    onNavigate(link.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg transition-colors ${
                    currentPage === link.value
                      ? "bg-primary_green/10 text-primary_green"
                      : "hover:bg-gray-100"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
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
