import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavbarAdmin } from "../components/navbar/NavbarAdmin";
import { useEffect } from "react";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when navigating
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navbar */}
      <NavbarAdmin
        currentPage={location.pathname} // ✅ full pathname
        onNavigate={(path) => navigate(path)} // ✅ use as-is
      />

      {/* Main Admin Content */}
      <main className="pt-16 px-4 lg:px-8 bg-white min-h-[calc(100vh-4rem)] rounded-t-2xl shadow-inner">
        <Outlet />
      </main>
    </div>
  );
}
