import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/product/AdminProducts";
import { AddProductPage } from "../pages/admin/product/AddProductPage";
import { EditProductPage } from "../pages/admin/product/EditProductPage";
import { ProtectedRoute } from "../routes/ProtectedRoute";

export function AdminRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/add" element={<AddProductPage />} />
        {/* ✅ new pattern */}
        <Route path="products/edit/:id" element={<EditProductPage />} />

        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}
