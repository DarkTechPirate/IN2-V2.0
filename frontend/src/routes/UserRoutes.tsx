import { Routes, Route, Navigate } from "react-router-dom";
import { UserLayout } from "../layouts/UserLayout";
import { HomePage } from "../pages/homePage";
import { ShopPage } from "../components/ShopPage";
import { ProductDetailPage } from "../components/ProductDetailPage";
import { SocialCausePage } from "../components/SocialCausePage";
import { GalleryPage } from "../components/GalleryPage";
import { ContactPage } from "../components/ContactPage";
import { ProfilePage } from "../pages/user/profile/ProfilePage";
import { WishlistPage } from "../components/WishlistPage";
import { CartPage } from "../components/CartPage";
import { OrderTrackingPage } from "../components/OrderTrackingPage";
import { ProtectedRoute } from "./ProtectedRoute";

export function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/social-cause" element={<SocialCausePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-tracking"
          element={
            <ProtectedRoute>
              <OrderTrackingPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
