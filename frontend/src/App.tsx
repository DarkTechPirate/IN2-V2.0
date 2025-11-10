// App.tsx
import { useState, useEffect } from "react"; // --- 1. Import useEffect ---
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingButtons } from "./components/FloatingButtons";
import { ShopPage } from "./components/ShopPage";
import { SocialCausePage } from "./components/SocialCausePage";
import { GalleryPage } from "./components/GalleryPage";
import { ContactPage } from "./components/ContactPage";
import { ProfilePage } from "./components/ProfilePage";
import { WishlistPage } from "./components/WishlistPage";
import { CartPage } from "./components/CartPage";
import { OrderTrackingPage } from "./components/OrderTrackingPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { Toaster } from "./components/ui/sonner";
import { ProductProvider } from "./components/ProductContext";
import { HomePage } from "./components/homePage";
// import { GoogleOAuthProvider } from "@react-oauth/google"; // Removed as Passport.js is backend-centric
import LoadingScreen from "@/components/LoadingScreen";

interface UserData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  role?: string;
}

function AppContent() {
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // --- 2. Add this useEffect hook ---
  // This hook triggers on every route change (location.pathname)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  // ----------------------------------

  const handleLogin = (userType: "user" | "admin", user: UserData) => {
    setIsLoggedIn(true);
    setIsAdmin(userType === "admin");
    setUserData(user);
    if (userType === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }
  };

  const handleSignup = (user: UserData) => {
    setIsLoggedIn(true);
    setIsAdmin(false);
    setUserData(user);
    navigate("/");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserData(null);
    navigate("/");
  };

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
            // NOTE: update your Navbar to use useNavigate internally or accept a `MapsToPath` prop if needed
            onNavigate={(p: string) => navigate(p)}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        )}

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/social-cause" element={<SocialCausePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/profile"
              element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/wishlist"
              element={isLoggedIn ? <WishlistPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/cart"
              element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/order-tracking"
              element={
                isLoggedIn ? <OrderTrackingPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={
                <SignupPage
                  onLogin={(userType, userData) => handleSignup(userData)}
                />
              }
            />
            <Route
              path="/admin-dashboard"
              element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
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
    // GoogleOAuthProvider removed as Passport.js is a backend solution
    <Router>
      <AppContent />
    </Router>
  );
}
