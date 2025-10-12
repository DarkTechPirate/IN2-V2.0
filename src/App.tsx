import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { SocialCausePage } from './components/SocialCausePage';
import { GalleryPage } from './components/GalleryPage';
import { ContactPage } from './components/ContactPage';
import { ProfilePage } from './components/ProfilePage';
import { WishlistPage } from './components/WishlistPage';
import { CartPage } from './components/CartPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { Toaster } from './components/ui/sonner';
import { ProductProvider } from './components/ProductContext';

type Page = 'home' | 'shop' | 'social-cause' | 'gallery' | 'contact' | 'profile' | 'wishlist' | 'cart' | 'order-tracking' | 'login' | 'signup' | 'admin-dashboard' | 'product-detail';

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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleNavigate = (page: string, productId?: string) => {
    // Redirect to login if trying to access protected pages
    const protectedPages = ['profile', 'wishlist', 'cart', 'order-tracking'];
    if (protectedPages.includes(page) && !isLoggedIn) {
      setCurrentPage('login');
      return;
    }

    // Redirect to login if trying to access admin dashboard without admin rights
    if (page === 'admin-dashboard' && !isAdmin) {
      setCurrentPage('login');
      return;
    }

    // Handle product detail page navigation
    if (page === 'product-detail' && productId) {
      setCurrentProductId(productId);
    }

    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userType: 'user' | 'admin', user: UserData) => {
    setIsLoggedIn(true);
    setIsAdmin(userType === 'admin');
    setUserData(user);
  };

  const handleSignup = (user: UserData) => {
    setIsLoggedIn(true);
    setIsAdmin(false);
    setUserData(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserData(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'shop':
        return <ShopPage onNavigate={handleNavigate} />;
      case 'product-detail':
        return currentProductId ? (
          <ProductDetailPage productId={currentProductId} onNavigate={handleNavigate} />
        ) : (
          <ShopPage onNavigate={handleNavigate} />
        );
      case 'social-cause':
        return <SocialCausePage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'profile':
        return <ProfilePage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <CartPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'signup':
        return <SignupPage onSignup={handleSignup} onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return isAdmin ? <AdminDashboard /> : <HomePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Don't show navbar/footer on login/signup pages
  const showNavAndFooter = currentPage !== 'login' && currentPage !== 'signup';

  return (
    <ProductProvider>
      <div className="min-h-screen bg-white">
        {showNavAndFooter && (
          <Navbar 
            currentPage={currentPage} 
            onNavigate={handleNavigate}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        )}
        
        <main>
          {renderPage()}
        </main>

        {showNavAndFooter && (
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
