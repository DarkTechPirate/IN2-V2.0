// src/layouts/AdminLayout.tsx
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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Top Navbar */}
      <NavbarAdmin
        currentPage={location.pathname.split("/").pop() || "admin-dashboard"}
        onNavigate={(path) => navigate(`/${path}`)}
      />

      {/* Main Admin Content */}
      <main className="pt-16 px-4 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
