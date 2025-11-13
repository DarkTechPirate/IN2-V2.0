import { LayoutDashboard, Package, Users, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
    onNavigate("/"); // back to home
  };

  // ✅ Full absolute paths for admin routes
  const navLinks = [
    { label: "Dashboard", value: "dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Products", value: "products", icon: <Package className="w-4 h-4" /> },
    { label: "Users", value: "users", icon: <Users className="w-4 h-4" /> },
  ];


  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-gray-900 shadow-md z-50 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <button
            onClick={() => onNavigate("/admin/dashboard")}
            className="flex items-center gap-1.5 group"
          >
            <div className="text-2xl font-bold tracking-tight text-primary_green group-hover:text-green-600 transition">
              IN2
            </div>
            <span className="text-sm text-gray-500 group-hover:text-gray-800">
              Admin
            </span>
          </button>

          {/* Center: Nav Links (Desktop) */}
          <div className="hidden lg:flex gap-6">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => onNavigate(`/admin/${link.value}`)}
                className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  currentPage ===`/admin/${link.value}`
                    ? "bg-primary_green text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Dropdown for mobile */}
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 border border-gray-200"
                aria-label="Menu"
              >
                <Menu className="w-4 h-4 text-gray-700" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 bg-white text-gray-900 shadow-lg border border-gray-200 rounded-lg"
            >
              {navLinks.map((link) => (
                <DropdownMenuItem
                  key={link.value}
                  onClick={() => {
                    onNavigate(`/admin/${link.value}`);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 text-sm py-2 px-2 rounded-md ${
                    currentPage === `/admin/${link.value}`
                      ? "bg-primary_green/10 text-primary_green"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
