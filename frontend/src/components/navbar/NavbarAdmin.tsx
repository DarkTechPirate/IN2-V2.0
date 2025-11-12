import { LayoutDashboard, Package, Users, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useAuth } from "../../context/AuthContext";

interface NavbarAdminProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function NavbarAdmin({ currentPage, onNavigate }: NavbarAdminProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate("/");
  };

  const navLinks = [
    { label: "Dashboard", value: "admin-dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Products", value: "admin-products", icon: <Package className="w-4 h-4" /> },
    { label: "Users", value: "admin-users", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-sm z-50">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <button onClick={() => onNavigate("/admin-dashboard")} className="flex items-center gap-1.5 group">
            <div className="text-2xl font-bold tracking-tight text-primary_green group-hover:text-green-400 transition">
              IN2
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white">Admin</span>
          </button>

          {/* Center: Nav Links (Desktop) */}
          <div className="hidden lg:flex gap-6">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => onNavigate(link.value)}
                className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  currentPage === link.value
                    ? "bg-primary_green text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Profile + Logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1.5 hover:bg-gray-800 rounded-full transition-all duration-300"
                aria-label="Profile"
              >
                <Menu className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-white text-gray-900">
              {navLinks.map((link) => (
                <DropdownMenuItem
                  key={link.value}
                  onClick={() => onNavigate(link.value)}
                  className="flex items-center gap-2"
                >
                  {link.icon}
                  {link.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-3.5 h-3.5 mr-2 text-red-600" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
