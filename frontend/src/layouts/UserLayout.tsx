// src/layouts/UserLayout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavbarUser } from "../components/navbar/NavbarUser";
import { Footer } from "../components/Footer";
import { FloatingButtons } from "../components/FloatingButtons";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

export function UserLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Measure navbar height dynamically (important!)
  useLayoutEffect(() => {
    if (navbarRef.current) {
      setNavHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  // Also handle window resize (in case of responsive height changes)
  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        setNavHeight(navbarRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide layout on auth routes
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-white">
      {!hideLayout && (
        <div ref={navbarRef}>
          <NavbarUser
            currentPage={location.pathname.replace("/", "") || "home"}
            onNavigate={(path) => navigate(`/${path}`)}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
          />
        </div>
      )}

      {/* Apply dynamic padding equal to navbar height */}
      <main style={{ paddingTop: `${navHeight}px` }}>
        <Outlet />
      </main>

      {!hideLayout && (
        <>
          <Footer />
          <FloatingButtons />
        </>
      )}
    </div>
  );
}
