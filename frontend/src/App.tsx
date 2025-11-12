import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingButtons } from "./components/FloatingButtons";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { Toaster } from "./components/ui/sonner";
import LoadingScreen from "./components/LoadingScreen";
import { ProductProvider } from "./components/ProductContext";
import { useAuth } from "./context/AuthContext";
import { UserRoutes } from "./routes/UserRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";

function AppContent() {
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [loaded, setLoaded] = useState(false);
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <ProductProvider>
      {!loaded && (
        <LoadingScreen
          duration={2800}
          onLoadingComplete={() => setLoaded(true)}
          bg="#ffffff"
          color="#050a30"
        />
      )}

      <div className="min-h-screen bg-white">
        {!hideLayout && (
          <Navbar
            currentPage={location.pathname}
            onNavigate={(p: string) => navigate(p)}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
          />
        )}

        <main>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Split Route Modules */}
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </main>

        {!hideLayout && (
          <>
            <Footer />
            <FloatingButtons />
          </>
        )}

        <Toaster position="top-center" />
      </div>
    </ProductProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
